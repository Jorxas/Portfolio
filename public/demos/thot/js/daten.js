/* Publication – Offline-Demo: fiktive Szenarien. Alle Namen, Konten, Texte und Dateien sind erfunden;
 * es gibt keine Zugangsdaten, keine Adressen und keine echten Medien. Jeder Aufruf von DemoDaten.welt()
 * liefert einen frischen Zustand – gespeichert wird nichts, weder im Browser noch auf dem Datenträger. */
(function (wurzel, fabrik) {
  const logik = typeof module === 'object' && module.exports ? require('./logik.js') : wurzel.DemoLogik;
  const api = fabrik(logik);
  if (typeof module === 'object' && module.exports) module.exports = api;
  else wurzel.DemoDaten = api;
})(typeof self !== 'undefined' ? self : this, function (L) {
  'use strict';

  const ANZEIGE_ZONE = 'Europe/Berlin';
  const utc = (j, m, t, h, min = 0) => Date.UTC(j, m - 1, t, h, min);

  const SZENARIEN = Object.freeze([
    { id: 'beispiel', label: 'Beispiel', text: 'Fünf Ziele sind geplant. Mit „Nächster Planer-Schritt“ lässt sich jeder Übergang verfolgen.' },
    { id: 'fehler', label: 'Fehlerfälle', text: 'Ungewisses Ergebnis, verpasstes Zeitfenster, abgelaufene Kontoverbindung und eine Ablehnung (alles simuliert).' },
    { id: 'erfolg', label: 'Alles erledigt', text: 'Alle Ziele sind abgeschlossen (simuliert).' },
    { id: 'leer', label: 'Leer', text: 'Noch keine Kampagne und keine verbundenen Konten.' },
  ]);

  function entwuerfe() {
    const medium = sprache => ({ datei: `stadtgeschichten-01-${sprache}.mp4`, dauer: '0:58', format: '1080 × 1920 (9:16)', groesse: '38 MB' });
    return [
      { id: 'e-de', sprache: 'de', titel: 'Die alte Brücke – Stadtgeschichten #1', legende: 'Was die alte Brücke in 200 Jahren gesehen hat – erzählt in 58 Sekunden.', hashtags: ['Stadtgeschichten', 'Kurzfilm'], kiHinweis: true, medium: medium('de'), zustimmung: null },
      { id: 'e-en', sprache: 'en', titel: 'The Old Bridge – City Stories #1', legende: 'What the old bridge has seen in 200 years – told in 58 seconds.', hashtags: ['CityStories', 'ShortFilm'], kiHinweis: true, medium: medium('en'), zustimmung: null },
      { id: 'e-fr', sprache: 'fr', titel: 'Le vieux pont – Histoires de ville #1', legende: 'Ce que le vieux pont a vu en 200 ans – raconté en 58 secondes.', hashtags: ['HistoiresDeVille'], kiHinweis: true, medium: medium('fr'), zustimmung: null },
    ];
  }
  // Fünf Konten = Obergrenze maxSocialAccounts des Plans „free_beta“. Sprache des Kontos = Sprache der Fassung.
  function konten() {
    return [
      { id: 'k-yt-de', plattform: 'youtube', name: 'Nordlicht DE', sprache: 'de', status: 'connected', optionen: { sichtbarkeit: 'unlisted' } },
      { id: 'k-bs-de', plattform: 'bluesky', name: 'Nordlicht DE', sprache: 'de', status: 'connected' },
      { id: 'k-tg-de', plattform: 'telegram', name: 'Nordlicht-Kanal', sprache: 'de', status: 'connected' },
      { id: 'k-yt-en', plattform: 'youtube', name: 'Nordlicht EN', sprache: 'en', status: 'connected', optionen: { sichtbarkeit: 'public' } },
      { id: 'k-tt-fr', plattform: 'tiktok', name: 'Nordlicht FR', sprache: 'fr', status: 'connected' },
    ];
  }
  const planung = (id, kontoId, entwurfId, zeitpunkt, zeitzone, status, ergebnis, grund = null) => ({ id, kontoId, entwurfId, zeitpunkt, zeitzone, status, ergebnis, grund });

  function welt(szenario = 'beispiel') {
    const w = { szenario, uhr: utc(2027, 3, 22, 8), anzeigeZone: ANZEIGE_ZONE, kampagne: null, entwuerfe: [], konten: [], planungen: [], protokoll: [], naechsteId: 10 };
    if (szenario === 'leer') return w;

    w.kampagne = { name: 'Stadtgeschichten – Folge 1', studio: 'Studio Nordlicht (fiktiv)', text: 'Ein Kurzvideo in drei Sprachfassungen, verteilt auf vier Plattformen und fünf Konten.' };
    w.entwuerfe = entwuerfe();
    w.konten = konten();
    w.uhr = utc(2027, 3, 21, 18);
    for (const e of w.entwuerfe) L.zustimmen(w, e.id);
    w.uhr = utc(2027, 3, 22, 8);

    // Zeitpunkte in UTC; die Zeitzone gehört zur Planung (EN-Kanal plant in New Yorker Ortszeit).
    w.planungen = [
      planung('p1', 'k-yt-de', 'e-de', utc(2027, 3, 22, 9), 'Europe/Berlin', 'scheduled', 'published'),
      planung('p2', 'k-tg-de', 'e-de', utc(2027, 3, 22, 9), 'Europe/Berlin', 'scheduled', 'published'),
      planung('p3', 'k-bs-de', 'e-de', utc(2027, 3, 23, 17), 'Europe/Berlin', 'scheduled', 'published'),
      planung('p4', 'k-yt-en', 'e-en', utc(2027, 3, 24, 16), 'America/New_York', 'scheduled', 'published'),
      planung('p5', 'k-tt-fr', 'e-fr', utc(2027, 3, 25, 11), 'Europe/Berlin', 'scheduled', 'handoff'),
    ];
    const ereignis = (zeit, text, ton = 'info') => w.protokoll.unshift({ zeit, text, ton });
    ereignis(utc(2027, 3, 21, 18, 5), 'Fünf Ziele geplant (Kampagne „Stadtgeschichten – Folge 1“)');

    if (szenario === 'fehler') {
      w.uhr = utc(2027, 3, 22, 9, 5);
      const [p1, p2, p3, p4] = w.planungen;
      p1.status = 'published';
      p2.status = 'uncertain'; p2.grund = 'result_unknown'; p2.ergebnis = 'uncertain';
      p3.ergebnis = 'failed';
      p4.zeitpunkt = utc(2027, 3, 21, 19); p4.status = 'blocked'; p4.grund = 'missed_window';
      w.konten.find(k => k.id === 'k-tt-fr').status = 'reauth_required';
      ereignis(utc(2027, 3, 22, 9, 0), 'YouTube · Nordlicht EN: Blockiert – ' + L.GRUENDE.missed_window, 'warnung');
      ereignis(utc(2027, 3, 22, 9, 2), 'YouTube · Nordlicht DE: Veröffentlicht (simuliert)', 'gut');
      ereignis(utc(2027, 3, 22, 9, 2), 'Telegram · Nordlicht-Kanal: Ungewiss – ' + L.GRUENDE.result_unknown, 'warnung');
      ereignis(utc(2027, 3, 22, 9, 4), 'TikTok · Nordlicht FR: Anmeldung abgelaufen – erneut verbinden', 'warnung');
    }
    if (szenario === 'erfolg') {
      w.uhr = utc(2027, 3, 26, 8);
      for (const p of w.planungen) p.status = p.ergebnis;
      ereignis(utc(2027, 3, 25, 11, 2), 'TikTok · Nordlicht FR: Entwurf übergeben – Abschluss in der TikTok-App', 'info');
      ereignis(utc(2027, 3, 25, 11, 3), 'Alle fünf Ziele erledigt (simuliert)', 'gut');
    }
    return w;
  }

  return { SZENARIEN, ANZEIGE_ZONE, welt };
});
