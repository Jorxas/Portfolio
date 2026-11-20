/* Publication – Offline-Demo: fachliche Logik ohne DOM und ohne Netzwerk.
 *
 * Bildet die Regeln des echten Codes vereinfacht nach:
 *   - Zustandsmaschine des Planers ........ supabase/functions/_shared/scheduler.mjs
 *   - Zustimmung an Prüfsumme gebunden ..... supabase/functions/_shared/recap.mjs
 *   - Zeitzonen / Zeitumstellung ........... supabase/functions/_shared/timezone.mjs (Funktionen hier 1:1 portiert)
 *   - Grenzwerte ........................... supabase/functions/_shared/limits.mjs, lib/providers/adapters/*.cjs
 *
 * Läuft im Browser als klassisches Skript (window.DemoLogik, damit index.html per Doppelklick ohne Server
 * funktioniert) und in Node für die Tests (module.exports).
 */
(function (wurzel, fabrik) {
  const api = fabrik();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else wurzel.DemoLogik = api;
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  // Auszug aus limits.mjs (Plan „free_beta“) – nur die Werte, die die Demo sichtbar macht.
  const GRENZEN = Object.freeze({
    maxVerspaetungMs: 21600 * 1000, // maxLatenessSeconds: mehr als 6 Std. zu spät ⇒ nie nachträglich senden
    minVorlaufMs: 60 * 1000,        // minLeadSeconds
    maxAktivePlanungen: 20,         // maxActiveSchedules
    maxFernpruefungen: 5,           // remoteCheckMax
  });

  // Textgrenzen aus den Adaptern (youtube.cjs, tiktok.cjs, bluesky.cjs, telegram.cjs).
  const PLATTFORMEN = Object.freeze({
    youtube: { name: 'YouTube', kuerzel: 'YT', modus: 'Upload mit ausdrücklich gewählter Sichtbarkeit', titelMax: 100, beschreibungMaxBytes: 5000 },
    tiktok: { name: 'TikTok', kuerzel: 'TT', modus: 'Nur Entwurf (Inbox) – Direct Post ist deaktiviert', legendeMax: 2200 },
    bluesky: { name: 'Bluesky', kuerzel: 'BS', modus: 'Sofort nach der Videoverarbeitung', textMaxGrapheme: 300 },
    telegram: { name: 'Telegram', kuerzel: 'TG', modus: 'Sofort im Kanal', legendeMax: 1024 },
  });

  // Wortgleich mit AI_NOTICE in bluesky.cjs / telegram.cjs.
  const KI_HINWEIS = Object.freeze({ fr: 'Contenu généré ou modifié par IA.', en: 'Content generated or altered by AI.', de: 'Von KI erzeugter oder veränderter Inhalt.' });

  const SICHTBARKEIT = Object.freeze({ private: 'Privat', unlisted: 'Nicht gelistet', public: 'Öffentlich' });

  // Zustände wie in scheduler.mjs; „handoff“ entspricht HANDOFF_REQUIRED der lokalen Version (TikTok-Entwurf).
  const STATUS = Object.freeze({
    scheduled: { label: 'Geplant', ton: 'info', symbol: '◷', text: 'Wartet auf den Zeitpunkt.' },
    claimed: { label: 'Reserviert', ton: 'info', symbol: '◔', text: 'Vom Planer übernommen. Zustimmung, Konto und Medium werden vor dem Senden erneut geprüft.' },
    sending: { label: 'Wird gesendet', ton: 'info', symbol: '↑', text: 'Punkt ohne Rückkehr überschritten – Abbrechen ist nicht mehr möglich.' },
    published: { label: 'Veröffentlicht (simuliert)', ton: 'gut', symbol: '✓', text: 'Die Plattform hat den Beitrag angenommen (simuliert).' },
    handoff: { label: 'Entwurf übergeben', ton: 'info', symbol: '→', text: 'Liegt als Entwurf in der TikTok-Inbox. Veröffentlichen erfolgt von Hand in der App.' },
    failed: { label: 'Fehlgeschlagen', ton: 'kritisch', symbol: '✕', text: 'Die Plattform hat eindeutig abgelehnt. Es wurde nichts veröffentlicht.' },
    uncertain: { label: 'Ungewiss', ton: 'warnung', symbol: '?', text: 'Ergebnis unbekannt. Wird nie automatisch erneut gesendet; nur eine lesende Fernprüfung oder ein Mensch entscheidet.' },
    blocked: { label: 'Blockiert', ton: 'warnung', symbol: '⊘', text: 'Vor dem Senden gestoppt. Es wurde nichts übertragen.' },
    cancelled: { label: 'Abgebrochen', ton: 'neutral', symbol: '–', text: 'Vor dem Senden abgebrochen.' },
    resolved_published: { label: 'Nachträglich bestätigt', ton: 'gut', symbol: '✓', text: 'Die lesende Fernprüfung hat den Beitrag gefunden.' },
  });

  const GRUENDE = Object.freeze({
    consent_stale: 'Zusammenfassung wurde nach der Zustimmung geändert',
    reauth_required: 'Konto muss erneut verbunden werden',
    missed_window: 'Zeitfenster verpasst (über 6 Std. zu spät) – wird nie verspätet gesendet',
    user_cancelled: 'Vom Nutzer abgebrochen',
    provider_rejected: 'Von der Plattform abgelehnt (simuliert)',
    result_unknown: 'Zeitüberschreitung nach dem Senden (simuliert)',
    remote_verified: 'Durch lesende Fernprüfung bestätigt',
  });

  const AKTIV = new Set(['scheduled', 'claimed', 'sending']);
  const ERLEDIGT = new Set(['published', 'handoff', 'resolved_published']);
  const AUFMERKSAMKEIT = new Set(['failed', 'uncertain', 'blocked']);

  // ── Zeitzonen: Port von timezone.mjs (ein Test vergleicht beide Implementierungen) ──────────────────────────
  function istGueltigeZeitzone(tz) {
    if (typeof tz !== 'string' || !tz || tz.length > 64 || !/^[A-Za-z0-9_+\-/]+$/.test(tz)) return false;
    try { new Intl.DateTimeFormat('en-US', { timeZone: tz }); return true; } catch { return false; }
  }
  const teileCache = new Map();
  function teile(tz, ms) {
    let f = teileCache.get(tz);
    if (!f) teileCache.set(tz, f = new Intl.DateTimeFormat('en-US', { timeZone: tz, hourCycle: 'h23', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    return Object.fromEntries(f.formatToParts(new Date(ms)).map(p => [p.type, p.value]));
  }
  // Abstand zu UTC in Minuten (positiv östlich von Greenwich) zum Zeitpunkt `ms`.
  function offsetMinuten(tz, ms) {
    const p = teile(tz, ms);
    const alsUtc = Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour, +p.minute, +p.second);
    return Math.round((alsUtc - Math.floor(ms / 1000) * 1000) / 60000);
  }
  const zwei = n => String(Math.abs(n)).padStart(2, '0');
  const offsetLabel = min => (min < 0 ? '-' : '+') + zwei(Math.trunc(Math.abs(min) / 60)) + ':' + zwei(Math.abs(min) % 60);
  function formatLokal(ms, tz) {
    const p = teile(tz, ms);
    return `${p.year}-${p.month}-${p.day}T${p.hour}:${p.minute}${offsetLabel(offsetMinuten(tz, ms))}`;
  }
  const LOKAL_RE = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::(\d{2}))?$/;
  // Mögliche Zeitpunkte einer lokalen Uhrzeit: 0 = gibt es nicht (Sprung), 1 = normal, 2 = doppelt. null = ungültige Eingabe.
  function lokaleKandidaten(lokal, tz) {
    const m = LOKAL_RE.exec(String(lokal));
    if (!m) return null;
    const [y, mo, d, h, mi, s] = m.slice(1).map(x => (x === undefined ? 0 : Number(x)));
    if (mo < 1 || mo > 12 || d < 1 || d > 31 || h > 23 || mi > 59 || s > 59) return null;
    const schaetzung = Date.UTC(y, mo - 1, d, h, mi, s);
    const probe = new Date(schaetzung);
    if (probe.getUTCMonth() !== mo - 1 || probe.getUTCDate() !== d) return null;
    const offsets = new Set([offsetMinuten(tz, schaetzung - 86400000), offsetMinuten(tz, schaetzung + 86400000)]);
    const aus = new Set();
    for (const o of offsets) { const t = schaetzung - o * 60000; if (offsetMinuten(tz, t) === o) aus.add(t); }
    return [...aus].sort((a, b) => a - b);
  }
  // Wie resolveLocal: nie eine stille Wahl. Fehlende Stunde ⇒ Ablehnung, doppelte Stunde ⇒ ausdrückliche Wahl.
  function loeseLokaleZeit(lokal, tz, wahl) {
    if (!istGueltigeZeitzone(tz)) return { status: 'ungueltig' };
    const k = lokaleKandidaten(lokal, tz);
    if (!k) return { status: 'ungueltig' };
    if (k.length === 0) return { status: 'nicht_vorhanden' };
    if (k.length === 1) return { status: 'ok', zeitpunkt: k[0] };
    if (wahl !== 'frueher' && wahl !== 'spaeter') {
      return { status: 'mehrdeutig', kandidaten: k.map((ms, i) => ({ wahl: i === 0 ? 'frueher' : 'spaeter', zeitpunkt: ms, lokal: formatLokal(ms, tz) })) };
    }
    return { status: 'ok', zeitpunkt: wahl === 'frueher' ? k[0] : k[1] };
  }

  // ── Kalenderhilfen (Tage als „JJJJ-MM-TT“ in der Anzeigezone) ──────────────────────────────────────────────
  function tagSchluessel(ms, tz) { const p = teile(tz, ms); return `${p.year}-${p.month}-${p.day}`; }
  const ausSchluessel = k => { const [y, m, d] = k.split('-').map(Number); return Date.UTC(y, m - 1, d, 12); };
  const zuSchluessel = ms => new Date(ms).toISOString().slice(0, 10);
  const tagePlus = (k, n) => zuSchluessel(ausSchluessel(k) + n * 86400000);
  const wochenStart = k => tagePlus(k, -((new Date(ausSchluessel(k)).getUTCDay() + 6) % 7));
  function kalenderwoche(k) {
    const t = new Date(ausSchluessel(k)), tag = (t.getUTCDay() + 6) % 7;
    t.setUTCDate(t.getUTCDate() - tag + 3);
    const ersterDonnerstag = new Date(Date.UTC(t.getUTCFullYear(), 0, 4));
    return 1 + Math.round(((t - ersterDonnerstag) / 86400000 - 3 + ((ersterDonnerstag.getUTCDay() + 6) % 7)) / 7);
  }
  // Zeitumstellung an diesem Tag? Vergleicht den Offset kurz nach Mitternacht mit dem kurz vor Mitternacht.
  function zeitumstellung(k, tz) {
    const [y, m, d] = k.split('-').map(Number);
    const vorher = offsetMinuten(tz, Date.UTC(y, m - 1, d, 0, 1) - offsetMinuten(tz, ausSchluessel(k) - 86400000) * 60000);
    const nachher = offsetMinuten(tz, Date.UTC(y, m - 1, d, 23, 59) - offsetMinuten(tz, ausSchluessel(k) + 86400000) * 60000);
    return vorher === nachher ? null : { vorher, nachher };
  }

  // ── Texte und Grenzen je Plattform ──────────────────────────────────────────────────────────────────────────
  // Wie normalizeHashtags/withHashtags in lib/providers/adapters/base.cjs.
  function normalisiereHashtags(liste) {
    const roh = Array.isArray(liste) ? liste : String(liste || '').split(/[\s,]+/);
    return [...new Set(roh.map(t => String(t).trim().replace(/^#+/, '').replace(/\s+/g, '')).filter(t => /^[\p{L}\p{N}_]+$/u.test(t)))];
  }
  const hashtagZeile = tags => normalisiereHashtags(tags).map(t => '#' + t).join(' ');
  function grapheme(text) {
    try { return [...new Intl.Segmenter('de', { granularity: 'grapheme' }).segment(text)].length; } catch { return [...text].length; }
  }
  const utf8Bytes = text => new TextEncoder().encode(text).length;

  // Text, den die jeweilige Plattform erhalten würde (YouTube: Beschreibung; TikTok-Entwurf: nichts).
  function zielText(entwurf, plattform) {
    const tags = hashtagZeile(entwurf.hashtags);
    if (plattform === 'youtube') return [entwurf.legende.trim(), tags].filter(Boolean).join('\n\n');
    if (plattform === 'tiktok') return [entwurf.legende.trim(), tags].filter(Boolean).join(' ');
    const basis = [String(entwurf.legende || entwurf.titel).trim(), tags].filter(Boolean).join(' ');
    return [basis, entwurf.kiHinweis ? KI_HINWEIS[entwurf.sprache] || KI_HINWEIS.en : ''].filter(Boolean).join('\n\n');
  }
  // Zähler für die Vorschau: welcher Wert gegen welche Grenze gemessen wird.
  function zaehler(entwurf, plattform) {
    const text = zielText(entwurf, plattform);
    switch (plattform) {
      case 'youtube': return [
        { feld: 'Titel', wert: entwurf.titel.trim().length, max: PLATTFORMEN.youtube.titelMax, einheit: 'Zeichen' },
        { feld: 'Beschreibung', wert: utf8Bytes(text), max: PLATTFORMEN.youtube.beschreibungMaxBytes, einheit: 'Byte' },
      ];
      case 'tiktok': return [{ feld: 'Legende (in der App einfügen)', wert: text.length, max: PLATTFORMEN.tiktok.legendeMax, einheit: 'Zeichen' }];
      case 'bluesky': return [{ feld: 'Text', wert: grapheme(text), max: PLATTFORMEN.bluesky.textMaxGrapheme, einheit: 'Grapheme' }];
      case 'telegram': return [{ feld: 'Legende', wert: text.length, max: PLATTFORMEN.telegram.legendeMax, einheit: 'Zeichen' }];
      default: return [];
    }
  }
  function zielProbleme(entwurf, konto) {
    const p = [];
    if (konto.plattform === 'youtube' && !entwurf.titel.trim()) p.push(`${PLATTFORMEN.youtube.name}: Titel fehlt`);
    if (konto.plattform === 'youtube' && !SICHTBARKEIT[konto.optionen && konto.optionen.sichtbarkeit]) p.push('YouTube: Sichtbarkeit muss ausdrücklich gewählt werden');
    for (const z of zaehler(entwurf, konto.plattform)) if (z.wert > z.max) p.push(`${PLATTFORMEN[konto.plattform].name}: ${z.feld} ${z.wert}/${z.max} ${z.einheit}`);
    return p;
  }

  // ── Zusammenfassung und Zustimmung (vgl. recap.mjs) ────────────────────────────────────────────────────────
  // Demo: FNV-1a (32 Bit) statt SHA-256 – synchron und ohne Web-Crypto. Das Prinzip ist dasselbe: jede Änderung
  // an Text, Medium, Ziel oder Option ergibt eine andere Prüfsumme ⇒ alte Zustimmung gilt nicht mehr.
  function stabilesJson(x) {
    if (Array.isArray(x)) return '[' + x.map(stabilesJson).join(',') + ']';
    if (x && typeof x === 'object') return '{' + Object.keys(x).sort().map(k => JSON.stringify(k) + ':' + stabilesJson(x[k])).join(',') + '}';
    return JSON.stringify(x);
  }
  function pruefsumme(x) {
    let h = 0x811c9dc5;
    for (const b of new TextEncoder().encode(stabilesJson(x))) { h ^= b; h = Math.imul(h, 0x01000193) >>> 0; }
    return h.toString(16).padStart(8, '0');
  }
  const zieleVon = (welt, entwurf) => welt.konten.filter(k => k.sprache === entwurf.sprache);
  function zusammenfassung(welt, entwurf) {
    return {
      entwurf: { sprache: entwurf.sprache, titel: entwurf.titel, legende: entwurf.legende, hashtags: normalisiereHashtags(entwurf.hashtags), kiHinweis: entwurf.kiHinweis },
      medium: entwurf.medium,
      ziele: zieleVon(welt, entwurf).map(k => ({ id: k.id, plattform: k.plattform, name: k.name, optionen: k.optionen || {} })),
    };
  }
  const aktuellePruefsumme = (welt, entwurf) => pruefsumme(zusammenfassung(welt, entwurf));
  const zustimmungAktuell = (welt, entwurf) => !!entwurf.zustimmung && entwurf.zustimmung === aktuellePruefsumme(welt, entwurf);
  // Zustimmung nur, wenn alle Ziele der Sprachfassung die Plattformgrenzen einhalten.
  function zustimmen(welt, entwurfId) {
    const e = welt.entwuerfe.find(x => x.id === entwurfId);
    if (!e) return { probleme: ['Unbekannte Sprachfassung'] };
    const probleme = zieleVon(welt, e).flatMap(k => zielProbleme(e, k));
    if (probleme.length) return { probleme };
    e.zustimmung = aktuellePruefsumme(welt, e);
    protokolliere(welt, `Zustimmung erteilt: Fassung ${e.sprache.toUpperCase()} (Prüfsumme ${e.zustimmung})`, 'gut');
    return { probleme: [] };
  }

  // ── Planer (vgl. scheduler.mjs) ────────────────────────────────────────────────────────────────────────────
  const kontoVon = (welt, p) => welt.konten.find(k => k.id === p.kontoId);
  const entwurfVon = (welt, p) => welt.entwuerfe.find(e => e.id === p.entwurfId);
  const zielName = (welt, p) => { const k = kontoVon(welt, p); return k ? `${PLATTFORMEN[k.plattform].name} · ${k.name}` : 'Unbekanntes Ziel'; };
  function protokolliere(welt, text, ton = 'info') { welt.protokoll.unshift({ zeit: welt.uhr, text, ton }); }

  // Erster Grund, warum diese Planung JETZT nicht gesendet werden darf (gleiche Reihenfolge wie deliverableProblem), sonst null.
  function lieferProblem(welt, p) {
    if (p.abbruchAngefragt) return 'user_cancelled';
    const k = kontoVon(welt, p), e = entwurfVon(welt, p);
    if (!k || !e) return 'target_missing';
    if (k.status === 'reauth_required') return 'reauth_required';
    if (k.status !== 'connected') return 'account_not_connected';
    if (welt.uhr - p.zeitpunkt > GRENZEN.maxVerspaetungMs) return 'missed_window';
    if (!zustimmungAktuell(welt, e)) return 'consent_stale';
    return null;
  }
  function setze(welt, p, status, grund = null) {
    p.status = status; p.grund = grund;
    const g = grund ? ` – ${GRUENDE[grund] || grund}` : '';
    protokolliere(welt, `${zielName(welt, p)}: ${STATUS[status].label}${g}`, STATUS[status].ton);
  }
  // Ein Schritt des Planers. Zur Anschauung macht die Demo pro Schritt nur EINEN Übergang je Planung
  // (der echte Planer erledigt reservieren → senden → Ergebnis in einem Lauf).
  function planerSchritt(welt) {
    const faellig = p => p.status === 'scheduled' && p.zeitpunkt <= welt.uhr;
    const laufend = p => p.status === 'claimed' || p.status === 'sending';
    if (welt.planungen.some(laufend) || welt.planungen.some(faellig)) welt.uhr += 60000;
    else {
      const naechste = welt.planungen.filter(p => p.status === 'scheduled').map(p => p.zeitpunkt).sort((a, b) => a - b)[0];
      if (naechste === undefined) return { uebergaenge: 0 };
      welt.uhr = Math.max(welt.uhr, naechste);
    }
    let uebergaenge = 0;
    for (const p of [...welt.planungen].sort((a, b) => a.zeitpunkt - b.zeitpunkt)) {
      if (p.status === 'scheduled' && p.zeitpunkt <= welt.uhr) {
        const problem = lieferProblem(welt, p);
        if (problem === 'user_cancelled') setze(welt, p, 'cancelled', problem);
        else if (problem) setze(welt, p, 'blocked', problem);
        else setze(welt, p, 'claimed');
      } else if (p.status === 'claimed') {
        // Widerrufsfenster: letzte Prüfung direkt vor dem Punkt ohne Rückkehr.
        const problem = lieferProblem(welt, p);
        if (problem === 'user_cancelled') setze(welt, p, 'cancelled', problem);
        else if (problem) setze(welt, p, 'blocked', problem);
        else setze(welt, p, 'sending');
      } else if (p.status === 'sending') {
        if (p.ergebnis === 'failed') setze(welt, p, 'failed', 'provider_rejected');
        else if (p.ergebnis === 'uncertain') setze(welt, p, 'uncertain', 'result_unknown');
        else setze(welt, p, p.ergebnis === 'handoff' ? 'handoff' : 'published');
      } else continue;
      uebergaenge++;
    }
    return { uebergaenge };
  }
  function allesAbspielen(welt, maxSchritte = 200) {
    let schritte = 0;
    while (schritte < maxSchritte && planerSchritt(welt).uebergaenge > 0) schritte++;
    return schritte;
  }

  // Abbrechen: vor der Reservierung sofort; reserviert ⇒ Abbruch angefordert, wird vor dem Senden beachtet; danach unmöglich.
  function abbrechen(welt, id) {
    const p = welt.planungen.find(x => x.id === id);
    if (!p) return 'unbekannt';
    if (p.status === 'scheduled') { setze(welt, p, 'cancelled', 'user_cancelled'); return 'abgebrochen'; }
    if (p.status === 'claimed' && !p.abbruchAngefragt) { p.abbruchAngefragt = true; protokolliere(welt, `${zielName(welt, p)}: Abbruch angefordert – wird vor dem Senden beachtet`); return 'angefordert'; }
    return 'zu_spaet';
  }

  // Lesende Fernprüfung eines ungewissen Versands. Sendet nie erneut; die letzte Prüfung wird getrennt vom Verlauf gespeichert.
  // Demo-Regel: die erste Prüfung findet nichts, ab der zweiten wird der Beitrag gefunden.
  function fernpruefung(welt, id) {
    const p = welt.planungen.find(x => x.id === id);
    if (!p || p.status !== 'uncertain') return null;
    if ((p.pruefungen || 0) >= GRENZEN.maxFernpruefungen) return 'limit';
    p.pruefungen = (p.pruefungen || 0) + 1;
    const gefunden = p.pruefungen >= 2;
    p.letztePruefung = { zeit: welt.uhr, ergebnis: gefunden ? 'gefunden' : 'nicht_gefunden' };
    if (gefunden) setze(welt, p, 'resolved_published', 'remote_verified');
    else protokolliere(welt, `${zielName(welt, p)}: Fernprüfung (nur lesend) – nicht gefunden, Status bleibt „Ungewiss“`, 'warnung');
    return p.letztePruefung.ergebnis;
  }

  function verbinden(welt, kontoId) {
    const k = welt.konten.find(x => x.id === kontoId);
    if (!k || k.status === 'connected') return false;
    k.status = 'connected';
    protokolliere(welt, `${PLATTFORMEN[k.plattform].name} · ${k.name}: erneut verbunden (simuliert)`, 'gut');
    return true;
  }

  // Neue Planung – dieselben Vorabprüfungen wie die echte API: Konto, Zustimmung, Grenzen, Vorlauf, Kontingent.
  function planen(welt, { kontoId, zeitpunkt, zeitzone }) {
    const k = welt.konten.find(x => x.id === kontoId);
    const e = k && welt.entwuerfe.find(x => x.sprache === k.sprache);
    const fehler = [];
    if (!k || !e) fehler.push('Für dieses Ziel gibt es keine passende Sprachfassung.');
    else {
      if (k.status !== 'connected') fehler.push('Das Konto ist nicht verbunden.');
      if (!zustimmungAktuell(welt, e)) fehler.push('Zustimmung fehlt oder ist veraltet – erst die Zusammenfassung bestätigen.');
      fehler.push(...zielProbleme(e, k));
    }
    if (!(zeitpunkt >= welt.uhr + GRENZEN.minVorlaufMs)) fehler.push('Der Zeitpunkt muss mindestens 1 Minute nach der Demo-Uhr liegen.');
    if (welt.planungen.filter(p => AKTIV.has(p.status)).length >= GRENZEN.maxAktivePlanungen) fehler.push(`Höchstens ${GRENZEN.maxAktivePlanungen} aktive Planungen (Plan „free_beta“).`);
    if (fehler.length) return { fehler };
    const p = { id: 'p' + welt.naechsteId++, kontoId, entwurfId: e.id, zeitpunkt, zeitzone, status: 'scheduled', grund: null, ergebnis: k.plattform === 'tiktok' ? 'handoff' : 'published' };
    welt.planungen.push(p);
    protokolliere(welt, `${zielName(welt, p)}: geplant für ${formatLokal(zeitpunkt, zeitzone)} (${zeitzone})`);
    return { fehler: [], planung: p };
  }

  function kennzahlen(welt) {
    const z = { geplant: 0, inArbeit: 0, erledigt: 0, aufmerksamkeit: 0 };
    for (const p of welt.planungen) {
      if (p.status === 'scheduled') z.geplant++;
      else if (AKTIV.has(p.status)) z.inArbeit++;
      else if (ERLEDIGT.has(p.status)) z.erledigt++;
      else if (AUFMERKSAMKEIT.has(p.status)) z.aufmerksamkeit++;
    }
    return z;
  }

  return {
    GRENZEN, PLATTFORMEN, KI_HINWEIS, SICHTBARKEIT, STATUS, GRUENDE,
    istGueltigeZeitzone, offsetMinuten, offsetLabel, formatLokal, lokaleKandidaten, loeseLokaleZeit,
    tagSchluessel, tagePlus, wochenStart, kalenderwoche, zeitumstellung,
    normalisiereHashtags, hashtagZeile, grapheme, zielText, zaehler, zielProbleme,
    pruefsumme, zusammenfassung, aktuellePruefsumme, zustimmungAktuell, zustimmen, zieleVon,
    lieferProblem, planerSchritt, allesAbspielen, abbrechen, fernpruefung, verbinden, planen, kennzahlen, protokolliere,
  };
});
