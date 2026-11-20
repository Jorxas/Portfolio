/* Publication – Offline-Demo: Oberfläche.
 * Alle Inhalte entstehen über createElement/textContent (nie aus HTML-Zeichenketten), damit auch eingegebener Text
 * nie als HTML ausgeführt wird. Kein Netzwerk, kein Browserspeicher, keine Hintergrund-Timer: Der Zustand ändert sich
 * nur durch Klicks und Eingaben und ist nach dem Neuladen wieder im Ausgangszustand. */
(function () {
  'use strict';
  const L = window.DemoLogik, D = window.DemoDaten;
  const $ = id => document.getElementById(id);
  const ZONE = D.ANZEIGE_ZONE;

  function h(tag, attrs, ...kinder) {
    const el = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs || {})) {
      if (v === null || v === undefined || v === false) continue;
      if (k === 'class') el.className = v;
      else if (k === 'text') el.textContent = v;
      else if (k === 'key') el.dataset.key = v;
      else if (k.startsWith('on')) el.addEventListener(k.slice(2), v);
      else el.setAttribute(k, v === true ? '' : v);
    }
    for (const kind of kinder.flat()) if (kind !== null && kind !== undefined && kind !== false) el.append(kind instanceof Node ? kind : String(kind));
    return el;
  }
  const fuelle = (el, ...kinder) => { el.replaceChildren(); for (const k of kinder.flat()) if (k) el.append(k); };

  let welt = D.welt('beispiel');
  const ui = { zielId: null, wocheStart: null, wahl: null };

  // ── Formatierung (deutsch, immer mit ausdrücklicher Zeitzone) ─────────────────────────────────────────────
  const fmtCache = new Map();
  function fmt(ms, tz, o) {
    const key = tz + JSON.stringify(o);
    let f = fmtCache.get(key);
    if (!f) fmtCache.set(key, f = new Intl.DateTimeFormat('de-DE', { timeZone: tz, ...o }));
    return f.format(new Date(ms));
  }
  const datumZeit = (ms, tz) => fmt(ms, tz, { weekday: 'short', day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  const kurz = (ms, tz) => fmt(ms, tz, { weekday: 'short', day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
  const uhrzeit = (ms, tz) => fmt(ms, tz, { hour: '2-digit', minute: '2-digit' });
  const zahl = n => n.toLocaleString('de-DE');
  const zielName = k => `${L.PLATTFORMEN[k.plattform].name} · ${k.name}`;
  const kontoVon = p => welt.konten.find(k => k.id === p.kontoId);
  const entwurfVon = k => welt.entwuerfe.find(e => e.sprache === k.sprache);

  const badge = status => { const s = L.STATUS[status]; return h('span', { class: 'badge ton-' + s.ton }, h('span', { class: 'symbol', 'aria-hidden': 'true', text: s.symbol }), s.label); };
  const chip = plattform => h('span', { class: 'chip', 'aria-hidden': 'true', text: L.PLATTFORMEN[plattform].kuerzel });
  const hinweis = (ton, symbol, ...text) => h('p', { class: 'hinweis ton-' + ton }, h('span', { class: 'symbol', 'aria-hidden': 'true', text: symbol }), h('span', {}, ...text));

  function melde(text, ton = 'info') {
    const m = $('meldung');
    m.className = 'meldung sichtbar ton-' + ton;
    m.textContent = '';
    m.textContent = text;
  }

  // ── Bereiche ───────────────────────────────────────────────────────────────────────────────────────────────
  function renderSteuerung() {
    $('uhr').textContent = `${datumZeit(welt.uhr, ZONE)} (${ZONE})`;
    const s = D.SZENARIEN.find(x => x.id === welt.szenario);
    $('szenario-text').textContent = s.text;
    for (const r of document.querySelectorAll('input[name="szenario"]')) r.checked = r.value === welt.szenario;
  }

  function renderKennzahlen() {
    const k = L.kennzahlen(welt);
    fuelle($('kennzahlen'), [
      ['Geplant', k.geplant, ''], ['In Arbeit', k.inArbeit, ''], ['Erledigt (simuliert)', k.erledigt, k.erledigt ? 'gut' : ''], ['Braucht Aufmerksamkeit', k.aufmerksamkeit, k.aufmerksamkeit ? 'warnung' : ''],
    ].map(([label, wert, ton]) => h('li', { class: 'kennzahl' + (ton ? ' ton-' + ton : '') }, h('span', { class: 'kennzahl-label', text: label }), h('strong', { class: 'kennzahl-wert', text: zahl(wert) }))));
  }

  function zustimmungsBlock(e, schluessel) {
    if (L.zustimmungAktuell(welt, e)) return hinweis('gut', '✓', `Zustimmung gültig · Prüfsumme ${e.zustimmung}`);
    return h('div', { class: 'zustimmung-offen' },
      hinweis('warnung', '!', 'Zusammenfassung geändert – erneute Zustimmung nötig. Bis dahin wird für diese Fassung nichts gesendet.'),
      h('button', { type: 'button', class: 'sekundaer klein', key: schluessel, onclick: () => {
        const r = L.zustimmen(welt, e.id);
        if (r.probleme.length) melde('Zustimmung nicht möglich: ' + r.probleme.join(' · '), 'kritisch');
        else melde(`Zustimmung für Fassung ${e.sprache.toUpperCase()} erteilt (simuliert). Neue Prüfsumme ${e.zustimmung}.`, 'gut');
        renderAll(schluessel === 'ed-zustimmen' ? 'vorschau-titel' : 'kampagne-titel');
      } }, 'Zusammenfassung bestätigen (simuliert)'));
  }

  function renderKampagne() {
    const ziel = $('kampagne-inhalt');
    if (!welt.kampagne) {
      return fuelle(ziel, h('div', { class: 'leer' },
        h('strong', { text: 'Noch keine Kampagne' }),
        h('p', { text: 'In der echten Anwendung wird hier ein Video hochgeladen und je Sprachfassung beschrieben. Erst nach ausdrücklicher Zustimmung zur Zusammenfassung kann etwas geplant werden.' }),
        h('button', { type: 'button', class: 'primaer', key: 'leer-laden', onclick: () => ladeSzenario('beispiel', 'kampagne-titel') }, 'Beispielkampagne laden')));
    }
    const k = L.kennzahlen(welt);
    const fertig = k.geplant + k.inArbeit + k.aufmerksamkeit === 0 && k.erledigt > 0;
    fuelle(ziel,
      h('div', { class: 'kampagne-kopf' }, h('p', { class: 'kampagne-name', text: welt.kampagne.name }), h('p', { class: 'hilfe', text: welt.kampagne.studio })),
      h('p', { text: welt.kampagne.text }),
      fertig && hinweis('gut', '✓', 'Alle Ziele erledigt (simuliert). Nichts wurde wirklich veröffentlicht.'),
      h('ul', { class: 'fassungen' }, welt.entwuerfe.map(e => h('li', { class: 'fassung' },
        h('div', { class: 'fassung-kopf' }, h('span', { class: 'sprache', text: e.sprache.toUpperCase() }), h('strong', { text: e.titel, lang: e.sprache })),
        h('p', { class: 'hilfe', text: `${e.medium.datei} · ${e.medium.dauer} · ${e.medium.format} · ${e.medium.groesse} (fiktiv)` }),
        h('p', { class: 'ziele' }, 'Ziele: ', L.zieleVon(welt, e).map(zielName).join(', ')),
        zustimmungsBlock(e, 'zustimmen-' + e.id)))));
  }

  function neuPlanen(p) {
    const zeitpunkt = Math.ceil((welt.uhr + 3600000) / 3600000) * 3600000;
    const r = L.planen(welt, { kontoId: p.kontoId, zeitpunkt, zeitzone: p.zeitzone });
    if (r.fehler.length) melde('Neu planen nicht möglich: ' + r.fehler.join(' '), 'warnung');
    else melde(`Neu geplant (simuliert) für ${datumZeit(zeitpunkt, p.zeitzone)}.`, 'gut');
    renderAll(r.planung ? 'aufgabe-' + r.planung.id : 'aufgabe-' + p.id);
  }

  function aufgabeAktionen(p) {
    const knoepfe = [];
    if (p.status === 'scheduled' || (p.status === 'claimed' && !p.abbruchAngefragt)) {
      knoepfe.push(h('button', { type: 'button', class: 'sekundaer klein', key: 'abbrechen-' + p.id, onclick: () => {
        const r = L.abbrechen(welt, p.id);
        melde(r === 'abgebrochen' ? 'Planung abgebrochen (simuliert).' : 'Abbruch angefordert – wird direkt vor dem Senden beachtet.', 'info');
        renderAll('aufgabe-' + p.id);
      } }, 'Abbrechen'));
    }
    if (p.status === 'uncertain') {
      knoepfe.push(h('button', { type: 'button', class: 'sekundaer klein', key: 'pruefen-' + p.id, onclick: () => {
        const r = L.fernpruefung(welt, p.id);
        melde(r === 'gefunden' ? 'Fernprüfung (nur lesend): Beitrag gefunden – Status „Nachträglich bestätigt“.' : r === 'limit' ? 'Höchstzahl an Fernprüfungen erreicht – ein Mensch entscheidet.' : 'Fernprüfung (nur lesend): nicht gefunden. Es wird nichts erneut gesendet.', r === 'gefunden' ? 'gut' : 'warnung');
        renderAll('aufgabe-' + p.id);
      } }, 'Fernprüfung (nur lesend)'));
    }
    if (p.status === 'blocked' || p.status === 'failed') {
      knoepfe.push(h('button', { type: 'button', class: 'sekundaer klein', key: 'neu-' + p.id, onclick: () => neuPlanen(p) }, 'Neu planen (+1 Std.)'));
    }
    return knoepfe.length ? h('div', { class: 'aktionen' }, knoepfe) : null;
  }

  function renderAufgaben() {
    const ziel = $('aufgaben');
    if (!welt.planungen.length) {
      return fuelle(ziel, h('div', { class: 'leer' }, h('strong', { text: 'Keine Aufgaben in der Warteschlange' }), h('p', { text: welt.kampagne ? 'Unter „Kalender“ lässt sich ein Termin planen.' : 'Ohne Kampagne und verbundenes Konto gibt es nichts zu planen.' })));
    }
    const liste = [...welt.planungen].sort((a, b) => a.zeitpunkt - b.zeitpunkt || a.id.localeCompare(b.id));
    fuelle(ziel, h('ol', { class: 'aufgaben-liste' }, liste.map(p => {
      const k = kontoVon(p), e = entwurfVon(k), s = L.STATUS[p.status];
      const offen = p.status === 'scheduled' || p.status === 'claimed';
      const fremdeZone = p.zeitzone !== ZONE ? ` · ${p.zeitzone}, ${uhrzeit(p.zeitpunkt, ZONE)} Uhr in Berlin` : '';
      return h('li', { class: 'aufgabe ton-' + s.ton, tabindex: '-1', key: 'aufgabe-' + p.id },
        h('div', { class: 'aufgabe-kopf' }, chip(k.plattform), h('strong', { class: 'aufgabe-ziel', text: zielName(k) }), badge(p.status)),
        h('p', { class: 'aufgabe-zeit' }, h('time', { datetime: new Date(p.zeitpunkt).toISOString(), text: datumZeit(p.zeitpunkt, p.zeitzone) }), ` (${L.offsetLabel(L.offsetMinuten(p.zeitzone, p.zeitpunkt))})${fremdeZone}`),
        h('p', { class: 'aufgabe-text', text: p.grund ? `${L.GRUENDE[p.grund] || p.grund}. ${s.text}` : s.text }),
        offen && !L.zustimmungAktuell(welt, e) && hinweis('warnung', '!', 'Zustimmung veraltet – würde vor dem Senden blockiert.'),
        offen && k.status !== 'connected' && hinweis('warnung', '!', 'Konto muss erneut verbunden werden – würde blockiert.'),
        p.abbruchAngefragt && p.status === 'claimed' && hinweis('info', 'i', 'Abbruch angefordert.'),
        p.letztePruefung && h('p', { class: 'pruefung' }, `Letzte Fernprüfung: ${p.letztePruefung.ergebnis === 'gefunden' ? 'gefunden' : 'nicht gefunden'} · ${kurz(p.letztePruefung.zeit, ZONE)} (${p.pruefungen}/${L.GRENZEN.maxFernpruefungen})`),
        aufgabeAktionen(p));
    })));
  }

  // Vorschau: Editor nur bei Zielwechsel neu aufbauen, damit Cursor und Fokus beim Tippen erhalten bleiben.
  function renderVorschau() {
    const ziel = $('vorschau-inhalt');
    if (!welt.konten.length || !welt.entwuerfe.length) {
      return fuelle(ziel, h('div', { class: 'leer' }, h('strong', { text: 'Keine Vorschau' }), h('p', { text: 'Zuerst eine Kampagne anlegen und ein Konto verbinden.' })));
    }
    if (!welt.konten.some(k => k.id === ui.zielId)) ui.zielId = welt.konten[0].id;
    const k = welt.konten.find(x => x.id === ui.zielId), e = entwurfVon(k);
    const geaendert = () => { renderVorschauKarte(); renderEditorZustimmung(); renderKampagne(); renderAufgaben(); };
    const geschwister = L.zieleVon(welt, e).map(z => L.PLATTFORMEN[z.plattform].name).join(', ');
    const feld = (label, eingabe, hilfe) => h('label', { class: 'feld' }, h('span', { text: label }), eingabe, hilfe && h('span', { class: 'hilfe', text: hilfe }));
    fuelle(ziel,
      h('form', { class: 'editor', id: 'editor', novalidate: true, onsubmit: ev => ev.preventDefault() },
        feld('Ziel', h('select', { id: 'ed-ziel', key: 'ed-ziel', onchange: ev => { ui.zielId = ev.target.value; renderVorschau(); restoreFocus('ed-ziel'); } },
          welt.konten.map(z => h('option', { value: z.id, selected: z.id === k.id }, `${zielName(z)} (${z.sprache.toUpperCase()})`)))),
        h('p', { class: 'hilfe', text: `Fassung ${e.sprache.toUpperCase()} – Änderungen gelten für alle Ziele dieser Sprache: ${geschwister}.` }),
        feld('Titel', h('input', { type: 'text', id: 'ed-titel', key: 'ed-titel', value: e.titel, oninput: ev => { e.titel = ev.target.value; geaendert(); } })),
        feld('Text', h('textarea', { id: 'ed-text', key: 'ed-text', rows: '4', oninput: ev => { e.legende = ev.target.value; geaendert(); } }, e.legende)),
        feld('Hashtags', h('input', { type: 'text', id: 'ed-tags', key: 'ed-tags', value: e.hashtags.join(' '), oninput: ev => { e.hashtags = ev.target.value.split(/[\s,]+/).filter(Boolean); geaendert(); } }), 'Durch Leerzeichen getrennt, ohne #.'),
        h('label', { class: 'feld-check' }, h('input', { type: 'checkbox', id: 'ed-ki', key: 'ed-ki', checked: e.kiHinweis, onchange: ev => { e.kiHinweis = ev.target.checked; geaendert(); } }), h('span', { text: 'KI-Kennzeichnung (Bluesky/Telegram: Hinweistext, YouTube: Kennzeichen „synthetische Medien“)' })),
        k.plattform === 'youtube' && feld('Sichtbarkeit auf YouTube', h('select', { id: 'ed-sicht', key: 'ed-sicht', onchange: ev => { k.optionen.sichtbarkeit = ev.target.value; geaendert(); } },
          Object.entries(L.SICHTBARKEIT).map(([wert, label]) => h('option', { value: wert, selected: k.optionen.sichtbarkeit === wert }, label))), 'Muss ausdrücklich gewählt werden; Teil der Zusammenfassung.'),
        h('div', { id: 'editor-zustimmung' })),
      h('div', { id: 'vorschau-karte', 'aria-live': 'polite' }));
    renderVorschauKarte();
    renderEditorZustimmung();
  }
  function renderEditorZustimmung() {
    const ort = $('editor-zustimmung');
    if (!ort) return;
    const k = welt.konten.find(x => x.id === ui.zielId), e = entwurfVon(k);
    fuelle(ort, zustimmungsBlock(e, 'ed-zustimmen'));
  }
  function renderVorschauKarte() {
    const ort = $('vorschau-karte');
    if (!ort) return;
    const k = welt.konten.find(x => x.id === ui.zielId), e = entwurfVon(k), P = L.PLATTFORMEN[k.plattform];
    const text = L.zielText(e, k.plattform), probleme = L.zielProbleme(e, k);
    fuelle(ort,
      h('article', { class: 'post', 'aria-label': `Vorschau für ${zielName(k)}` },
        h('header', { class: 'post-kopf' }, chip(k.plattform), h('span', {}, h('strong', { text: k.name }), h('span', { class: 'hilfe', text: ` · ${P.name}` }))),
        h('div', { class: 'video' }, h('span', { class: 'video-play', 'aria-hidden': 'true', text: '▶' }), h('span', { text: `Video (fiktiv) · ${e.medium.dauer} · 9:16` })),
        k.plattform === 'youtube' && h('p', { class: 'post-titel', text: e.titel.trim() || '(ohne Titel)', lang: e.sprache }),
        k.plattform === 'tiktok' && h('p', { class: 'hilfe', text: 'Beim Entwurf überträgt TikTok keinen Text – diese Legende wird in der App eingefügt:' }),
        h('p', { class: 'post-text', text: text || '(kein Text)', lang: e.sprache }),
        h('dl', { class: 'post-meta' },
          h('dt', { text: 'Modus' }), h('dd', { text: P.modus }),
          k.plattform === 'youtube' && [h('dt', { text: 'Sichtbarkeit' }), h('dd', { text: L.SICHTBARKEIT[k.optionen.sichtbarkeit] || 'nicht gewählt' })],
          k.plattform === 'youtube' && [h('dt', { text: 'KI-Kennzeichen' }), h('dd', { text: e.kiHinweis ? 'gesetzt (containsSyntheticMedia)' : 'nicht gesetzt' })],
          k.plattform === 'tiktok' && [h('dt', { text: 'KI-Kennzeichen' }), h('dd', { text: 'in der TikTok-App setzen' })])),
      h('ul', { class: 'zaehler' }, L.zaehler(e, k.plattform).map(z => h('li', { class: z.wert > z.max ? 'zu-lang' : '' }, `${z.feld}: ${zahl(z.wert)} / ${zahl(z.max)} ${z.einheit}`))),
      probleme.length ? hinweis('kritisch', '✕', `Nicht zulässig: ${probleme.join(' · ')}. Zustimmung und Planung sind gesperrt, bis es passt.`) : null);
  }

  function renderKalender() {
    if (!ui.wocheStart) ui.wocheStart = L.wochenStart(L.tagSchluessel(welt.uhr, ZONE));
    const tage = Array.from({ length: 7 }, (_, i) => L.tagePlus(ui.wocheStart, i));
    const heute = L.tagSchluessel(welt.uhr, ZONE);
    const [ersterJ, ersterM, ersterT] = tage[0].split('-'), [letzterJ, letzterM, letzterT] = tage[6].split('-');
    $('woche-label').textContent = `KW ${L.kalenderwoche(tage[0])} · ${ersterT}.${ersterM}.${ersterJ !== letzterJ ? ersterJ : ''}–${letzterT}.${letzterM}.${letzterJ}`;
    const wochentag = k => fmt(Date.parse(k + 'T12:00:00Z'), 'UTC', { weekday: 'short', day: '2-digit', month: '2-digit' });
    fuelle($('woche'), tage.map(tag => {
      const termine = welt.planungen.filter(p => L.tagSchluessel(p.zeitpunkt, ZONE) === tag).sort((a, b) => a.zeitpunkt - b.zeitpunkt);
      const umstellung = L.zeitumstellung(tag, ZONE);
      return h('li', { class: 'tag' + (tag === heute ? ' heute' : '') },
        h('p', { class: 'tag-kopf' }, h('strong', { text: wochentag(tag) }), tag === heute && h('span', { class: 'heute-marke', text: 'Demo-Uhr' })),
        umstellung && h('p', { class: 'umstellung' }, umstellung.nachher > umstellung.vorher ? 'Sommerzeit beginnt: 02:00 → 03:00' : 'Winterzeit beginnt: 03:00 → 02:00'),
        termine.length
          ? h('ul', { class: 'termine' }, termine.map(p => { const k = kontoVon(p); return h('li', { class: 'termin ton-' + L.STATUS[p.status].ton }, h('span', { class: 'termin-zeit', text: uhrzeit(p.zeitpunkt, ZONE) }), chip(k.plattform), h('span', { class: 'termin-name', text: zielName(k) }), badge(p.status)); }))
          : h('p', { class: 'tag-leer', text: 'Keine Termine' }));
    }));
  }

  function renderPlattformen() {
    const status = { connected: ['gut', '✓', 'Verbunden (simuliert)'], reauth_required: ['warnung', '!', 'Erneute Anmeldung nötig'] };
    const grenzen = { youtube: 'OAuth 2.0 mit PKCE, fortsetzbarer Upload · Titel ≤ 100 Zeichen, Beschreibung ≤ 5.000 Byte', tiktok: 'Nur Entwurf in der Inbox, Direct Post deaktiviert · Legende ≤ 2.200 Zeichen (in der App)', bluesky: 'AT Protocol · Text ≤ 300 Grapheme', telegram: 'Bot API · Legende ≤ 1.024 Zeichen' };
    fuelle($('plattformen-liste'), Object.keys(L.PLATTFORMEN).map(id => {
      const konten = welt.konten.filter(k => k.plattform === id);
      return h('li', { class: 'plattform' },
        h('div', { class: 'plattform-kopf' }, chip(id), h('strong', { text: L.PLATTFORMEN[id].name })),
        h('p', { class: 'hilfe', text: grenzen[id] }),
        konten.length ? h('ul', { class: 'konten' }, konten.map(k => {
          const [ton, symbol, label] = status[k.status] || ['neutral', '–', 'Nicht verbunden'];
          return h('li', { class: 'konto' }, h('span', { text: `${k.name} (${k.sprache.toUpperCase()})` }), h('span', { class: 'badge ton-' + ton }, h('span', { class: 'symbol', 'aria-hidden': 'true', text: symbol }), label),
            k.status === 'reauth_required' && h('button', { type: 'button', class: 'sekundaer klein', key: 'verbinden-' + k.id, onclick: () => { L.verbinden(welt, k.id); melde(`${zielName(k)} erneut verbunden (simuliert). Bereits blockierte Planungen bleiben blockiert und müssen neu geplant werden.`, 'gut'); renderAll('plattformen-titel'); } }, 'Erneut verbinden (simuliert)'));
        })) : h('p', { class: 'tag-leer', text: 'Kein Konto verbunden' }));
    }));
    $('plattformen-liste').append(h('li', { class: 'plattform plattform-hinweis' }, h('p', { class: 'hilfe', text: 'Weitere Adapter (Instagram/Facebook Reels, Threads) warten auf die App-Prüfung der Plattform und sind nicht aktiv.' })));
  }

  function renderProtokoll() {
    fuelle($('protokoll'), welt.protokoll.slice(0, 60).map(e => h('li', { class: 'ton-' + e.ton }, h('time', { datetime: new Date(e.zeit).toISOString(), text: kurz(e.zeit, ZONE) }), h('span', { text: e.text }))));
    if (!welt.protokoll.length) $('protokoll').append(h('li', { class: 'tag-leer', text: 'Noch keine Ereignisse.' }));
  }

  function renderPlanenFormular() {
    fuelle($('planen-ziel'), welt.konten.map(k => h('option', { value: k.id }, `${zielName(k)} (${k.sprache.toUpperCase()})`)));
    const leer = !welt.konten.length;
    for (const el of $('planen').querySelectorAll('input, select, button')) el.disabled = leer;
    if (leer) zeigePlanenMeldung('Ohne verbundenes Konto kann nichts geplant werden.', 'neutral');
  }

  // ── Fokus nach dem Neuzeichnen wiederherstellen (Tastaturbedienung) ────────────────────────────────────────
  function restoreFocus(...schluessel) {
    for (const s of schluessel) {
      if (!s) continue;
      const el = document.querySelector(`[data-key="${s}"]`) || document.getElementById(s);
      if (el) { el.focus({ preventScroll: false }); return; }
    }
  }
  function renderAll(fokus) {
    const aktiv = document.activeElement && document.activeElement.dataset ? document.activeElement.dataset.key : null;
    renderSteuerung(); renderKennzahlen(); renderKampagne(); renderAufgaben(); renderVorschau(); renderKalender(); renderPlattformen(); renderProtokoll();
    if (document.activeElement === document.body || fokus) restoreFocus(aktiv, fokus);
  }

  function ladeSzenario(id, fokus) {
    welt = D.welt(id);
    ui.zielId = null; ui.wocheStart = null; ui.wahl = null;
    renderPlanenFormular();
    setzePlanenStandard();
    renderAll(fokus);
    const s = D.SZENARIEN.find(x => x.id === id);
    melde(`Szenario „${s.label}“ geladen. ${s.text}`, 'info');
  }

  // ── Planen-Formular ────────────────────────────────────────────────────────────────────────────────────────
  function zeigePlanenMeldung(text, ton) {
    const m = $('planen-meldung');
    m.className = 'formular-meldung' + (text ? ' sichtbar ton-' + ton : '');
    m.textContent = text || '';
  }
  function setzePlanenStandard() {
    $('planen-datum').value = L.tagePlus(L.tagSchluessel(welt.uhr, ZONE), 1);
    $('planen-zeit').value = '10:00';
    $('planen-zone').value = ZONE;
    zuruecksetzenWahl();
    if (welt.konten.length) zeigePlanenMeldung('', '');
  }
  function zuruecksetzenWahl() {
    ui.wahl = null;
    fuelle($('planen-wahl'));
    $('planen-zeit').removeAttribute('aria-invalid');
  }
  function planenAbsenden(ev) {
    if (ev) ev.preventDefault();
    const datum = $('planen-datum').value, zeit = $('planen-zeit').value, zone = $('planen-zone').value, kontoId = $('planen-ziel').value;
    if (!datum || !zeit) { zeigePlanenMeldung('Bitte Datum und Uhrzeit angeben.', 'kritisch'); return; }
    const r = L.loeseLokaleZeit(`${datum}T${zeit}`, zone, ui.wahl);
    if (r.status === 'ungueltig') { zeigePlanenMeldung('Ungültige Eingabe.', 'kritisch'); return; }
    if (r.status === 'nicht_vorhanden') {
      $('planen-zeit').setAttribute('aria-invalid', 'true');
      zeigePlanenMeldung(`Diese Uhrzeit gibt es am ${datum.split('-').reverse().join('.')} in ${zone} nicht (Umstellung auf Sommerzeit). Bitte eine andere Uhrzeit wählen – es wird nie stillschweigend verschoben.`, 'kritisch');
      return;
    }
    if (r.status === 'mehrdeutig') {
      fuelle($('planen-wahl'), h('fieldset', { class: 'wahl' },
        h('legend', { text: 'Diese Uhrzeit kommt zweimal vor (Umstellung auf Winterzeit). Welche ist gemeint?' }),
        r.kandidaten.map(c => h('label', { class: 'feld-check' }, h('input', { type: 'radio', name: 'wahl', value: c.wahl, key: 'wahl-' + c.wahl, onchange: () => { ui.wahl = c.wahl; } }),
          h('span', { text: `${c.wahl === 'frueher' ? 'Früher' : 'Später'}: ${c.lokal.slice(11, 16)} Uhr mit Abstand ${c.lokal.slice(16)} zu UTC` })))));
      zeigePlanenMeldung('Bitte eine der beiden Uhrzeiten wählen und erneut planen.', 'warnung');
      restoreFocus('wahl-frueher');
      return;
    }
    const ergebnis = L.planen(welt, { kontoId, zeitpunkt: r.zeitpunkt, zeitzone: zone });
    if (ergebnis.fehler.length) { zeigePlanenMeldung('Nicht geplant: ' + ergebnis.fehler.join(' '), 'kritisch'); return; }
    zuruecksetzenWahl();
    zeigePlanenMeldung('', '');
    ui.wocheStart = L.wochenStart(L.tagSchluessel(r.zeitpunkt, ZONE));
    renderAll();
    const k = welt.konten.find(x => x.id === kontoId);
    melde(`Geplant (simuliert): ${zielName(k)} am ${datumZeit(r.zeitpunkt, zone)} (${L.offsetLabel(L.offsetMinuten(zone, r.zeitpunkt))}, ${zone}).`, 'gut');
  }

  // ── Start ─────────────────────────────────────────────────────────────────────────────────────────────────
  function start() {
    fuelle($('szenarien'), D.SZENARIEN.map(s => h('label', { class: 'segment' },
      h('input', { type: 'radio', name: 'szenario', value: s.id, onchange: () => ladeSzenario(s.id) }), h('span', { text: s.label }))));
    $('schritt').addEventListener('click', () => {
      const vorher = welt.protokoll.length, r = L.planerSchritt(welt);
      ui.wocheStart = null;
      renderAll();
      if (!r.uebergaenge) melde('Keine fälligen oder laufenden Aufgaben – nichts zu tun.', 'neutral');
      else melde(`Planer-Schritt um ${uhrzeit(welt.uhr, ZONE)} Uhr: ` + welt.protokoll.slice(0, welt.protokoll.length - vorher).reverse().map(e => e.text).join(' · '), 'info');
    });
    $('abspielen').addEventListener('click', () => {
      const n = L.allesAbspielen(welt), k = L.kennzahlen(welt);
      ui.wocheStart = null;
      renderAll();
      melde(n ? `${n} Planer-Schritte ausgeführt. Erledigt: ${k.erledigt}, braucht Aufmerksamkeit: ${k.aufmerksamkeit}.` : 'Keine fälligen oder laufenden Aufgaben – nichts zu tun.', n ? 'info' : 'neutral');
    });
    $('zuruecksetzen').addEventListener('click', () => ladeSzenario(welt.szenario));
    $('woche-zurueck').addEventListener('click', () => { ui.wocheStart = L.tagePlus(ui.wocheStart, -7); renderKalender(); });
    $('woche-vor').addEventListener('click', () => { ui.wocheStart = L.tagePlus(ui.wocheStart, 7); renderKalender(); });
    $('woche-heute').addEventListener('click', () => { ui.wocheStart = null; renderKalender(); });
    $('planen').addEventListener('submit', planenAbsenden);
    for (const id of ['planen-datum', 'planen-zeit', 'planen-zone', 'planen-ziel']) $(id).addEventListener('change', () => { zuruecksetzenWahl(); zeigePlanenMeldung('', ''); });
    const beispiel = (datum, zeit) => () => { $('planen-datum').value = datum; $('planen-zeit').value = zeit; $('planen-zone').value = 'Europe/Berlin'; zuruecksetzenWahl(); planenAbsenden(); };
    $('beispiel-luecke').addEventListener('click', beispiel('2027-03-28', '02:30'));
    $('beispiel-doppelt').addEventListener('click', beispiel('2027-10-31', '02:30'));
    renderPlanenFormular();
    setzePlanenStandard();
    renderAll();
    document.documentElement.dataset.bereit = 'ja';
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
