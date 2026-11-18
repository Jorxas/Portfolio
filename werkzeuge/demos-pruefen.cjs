/** Echte Browserprüfung der 13 statischen Demoseiten, einschließlich mobilem Layout. */
const fs = require('node:fs'), path = require('node:path'), assert = require('node:assert/strict');
const { chromium } = require(process.env.PLAYWRIGHT_MODUL || 'playwright');
const projekte = require('../src/data/projektstudien.json');
const basis = process.argv[2];
if (!basis?.startsWith('http://127.0.0.1:')) throw Error('Explizite lokale Vorschau-URL erforderlich.');
const wurzel = path.resolve(__dirname, '..'), nachweise = path.join(wurzel, '.demo-nachweise');
const bilder = path.join(wurzel, 'public/images/projektstudien');
fs.mkdirSync(nachweise, { recursive: true }); fs.mkdirSync(bilder, { recursive: true });
const bericht = { beginn: new Date().toISOString(), erfolgreich: false, projekte: [], echte_backendanfragen: [], konsolenfehler: [] };
if (process.argv[3] === 'fortsetzen' && fs.existsSync(path.join(nachweise, 'bericht.json'))) {
  const vorher = JSON.parse(fs.readFileSync(path.join(nachweise, 'bericht.json'), 'utf8'));
  bericht.projekte = vorher.projekte;
  bericht.erster_pruefbeginn = vorher.erster_pruefbeginn || vorher.beginn;
}
const text = async (seite, selektor) => (await seite.locator(selektor).textContent()).replace(/\s/g, '');
(async () => {
  const browser = await chromium.launch({ headless: true });
  try {
    const seite = await browser.newPage({ viewport: { width: 1440, height: 1050 }, locale: 'de-DE' });
    seite.setDefaultTimeout(10000);
    seite.on('pageerror', e => bericht.konsolenfehler.push(e.message));
    seite.on('request', r => { if (/\/api\//.test(r.url()) || !['GET', 'HEAD'].includes(r.method())) bericht.echte_backendanfragen.push({ url: r.url(), methode: r.method() }); });
    for (const projekt of projekte) {
      if (bericht.projekte.some(p => p.projekt === projekt.id && p.desktop)) continue;
      const start = new Date().toISOString();
      await seite.goto(basis + 'projects/' + projekt.slug + '/', { waitUntil: 'networkidle' });
      assert.equal(await seite.locator('h1').first().textContent(), projekt.kopfzeile);
      assert.match(await seite.locator('.studie-simulationshinweis').textContent(), /Backend simuliert/);
      switch (projekt.id) {
        case 'P01':
          assert.match(await text(seite, '.demo-kennzahlen strong >> nth=0'), /820,00/);
          await seite.getByLabel('Monat filtern').selectOption('2026-01');
          assert.match(await text(seite, '.demo-kennzahlen strong >> nth=0'), /340,00/);
          await seite.getByLabel('Monat filtern').selectOption('alle'); break;
        case 'P02':
          await seite.getByRole('button', { name: 'Import ausführen' }).click();
          assert.match(await seite.locator('.demo-hinweis').textContent(), /3 eindeutige/);
          await seite.getByRole('button', { name: 'Import ausführen' }).click();
          assert.equal(await text(seite, '.demo-kennzahlen strong >> nth=0'), '0');
          assert.equal(await text(seite, '.demo-kennzahlen strong >> nth=1'), '4'); break;
        case 'P03':
          await seite.getByRole('button', { name: /Wie hoch ist das Budget/ }).click();
          assert.match(await seite.locator('.demo-antwort').textContent(), /ANTWORT ZURÜCKGEHALTEN/);
          await seite.getByRole('button', { name: /Welchen Port/ }).click();
          assert.match(await seite.locator('.demo-antwort').textContent(), /8081/); break;
        case 'P04': {
          const rahmen = seite.frameLocator('iframe');
          await rahmen.getByRole('link', { name: 'Details A01' }).click();
          await rahmen.getByRole('button', { name: 'Als erledigt markieren' }).click();
          await rahmen.getByText('Zustand gespeichert: erledigt.').waitFor();
          await rahmen.getByRole('link', { name: 'Zur Liste' }).click();
          await rahmen.getByRole('link', { name: 'Neuer Auftrag', exact: true }).click();
          await rahmen.getByLabel('Bezeichnung (Pflichtfeld)').fill('Demo-Lager prüfen');
          await rahmen.getByLabel('Priorität (Pflichtfeld)').selectOption('hoch');
          await rahmen.getByRole('button', { name: 'Auftrag anlegen' }).click();
          await rahmen.getByRole('heading', { name: 'Auftrag A03', exact: true }).waitFor();
          await rahmen.getByRole('checkbox').check();
          await rahmen.getByRole('button', { name: 'Als erledigt markieren' }).click();
          await rahmen.getByRole('alert').waitFor();
          await rahmen.getByRole('checkbox').uncheck();
          await rahmen.getByRole('link', { name: 'Zur Liste' }).click(); break;
        }
        case 'P05':
          await seite.getByLabel('Messwert M01', { exact: true }).fill('10.6');
          assert.equal(await text(seite, '.demo-kennzahlen strong >> nth=1'), '2');
          await seite.getByLabel('Messwert M01', { exact: true }).fill('9.5');
          assert.equal(await text(seite, '.demo-kennzahlen strong >> nth=0'), '3'); break;
        case 'P06':
          await seite.getByRole('button', { name: 'Nächster Messwert' }).click({ clickCount: 1 });
          await seite.getByRole('button', { name: 'Nächster Messwert' }).click();
          assert.equal(await seite.locator('.demo-instrument .demo-status').textContent(), 'Warnung');
          await seite.getByRole('button', { name: 'Nächster Messwert' }).click();
          assert.equal(await seite.locator('.demo-instrument .demo-status').textContent(), 'Warnung');
          await seite.getByRole('button', { name: 'Nächster Messwert' }).click();
          assert.equal(await seite.locator('.demo-instrument .demo-status').textContent(), 'Normal');
          await seite.getByRole('button', { name: 'Nächster Messwert' }).click();
          assert.match(await seite.locator('.demo-instrument .demo-status').textContent(), /Ungültiger/); break;
        case 'P07':
          await seite.getByLabel('Szenario').selectOption('konfiguration');
          await seite.getByRole('button', { name: 'Prüflauf simulieren' }).click();
          assert.equal(await seite.locator('.demo-httpcode strong').textContent(), '503'); break;
        case 'P08':
          assert.equal(await text(seite, '.demo-kennzahlen strong >> nth=1'), '3');
          await seite.getByLabel('Verantwortlich', { exact: true }).fill('demo-team');
          await seite.getByLabel('Gruppenzuordnung').selectOption('demo-leser');
          await seite.getByLabel('Inaktivitätskennzeichen gesetzt').uncheck();
          assert.equal(await text(seite, '.demo-kennzahlen strong >> nth=1'), '0');
          await seite.getByRole('button', { name: 'Originalbeispiele wiederherstellen' }).click(); break;
        case 'P09':
          await seite.getByRole('button', { name: '7 Beispielzeilen importieren' }).click();
          assert.equal(await seite.locator('.demo-produkte article').count(), 5);
          await seite.getByRole('button', { name: 'Erneut importieren' }).click();
          assert.equal(await seite.locator('.demo-produkte article').count(), 5);
          assert.match(await seite.locator('.demo-produkte article').first().textContent(), /5,50/); break;
        case 'P10':
          await seite.getByRole('button', { name: 'Start', exact: true }).click();
          await seite.getByRole('button', { name: 'Not-Halt', exact: true }).click();
          await seite.getByRole('button', { name: 'Start', exact: true }).click();
          assert.equal(await seite.locator('.demo-maschine .demo-status').textContent(), 'NOT-HALT');
          await seite.getByRole('button', { name: 'Zurücksetzen', exact: true }).click();
          assert.equal(await seite.locator('.demo-maschine .demo-status').textContent(), 'BEREIT'); break;
        case 'P11':
          await seite.getByLabel('Bezirk', { exact: true }).selectOption('nord');
          assert.equal(await text(seite, '.demo-kennzahlen strong >> nth=0'), '6');
          assert.equal(await text(seite, '.demo-kennzahlen strong >> nth=1'), '4');
          await seite.getByLabel('Bezirk', { exact: true }).selectOption('alle');
          await seite.getByRole('button', { name: 'Wartungsauftrag G3', exact: true }).click();
          assert.equal(await seite.locator('.demo-kartendetail h3').textContent(), 'G3'); break;
        case 'P12': {
          await seite.getByLabel('Beschaffungsbetrag').fill('600.00');
          await seite.getByRole('button', { name: 'Antrag einreichen' }).click();
          await seite.getByRole('button', { name: 'Genehmigen', exact: true }).click();
          assert.equal(await seite.locator('.demo-beschaffung .demo-status').textContent(), 'eingereicht');
          await seite.getByRole('button', { name: 'Ablehnen', exact: true }).click();
          assert.equal(await seite.locator('.demo-beschaffung .demo-status').textContent(), 'abgelehnt');
          await seite.getByRole('button', { name: 'Demo zurücksetzen' }).click();
          await seite.getByRole('button', { name: 'Antrag einreichen' }).click();
          await seite.getByRole('button', { name: 'Genehmigen', exact: true }).click();
          await seite.getByRole('button', { name: 'Exportvorschau anzeigen' }).click();
          const einmal = await seite.locator('.demo-code').textContent();
          await seite.getByRole('button', { name: 'Exportvorschau anzeigen' }).click();
          assert.equal(await seite.locator('.demo-code').textContent(), einmal); break;
        }
        case 'P13':
          assert.equal(await seite.locator('.demo-ml-ergebnis>strong').textContent(), '6 / 18');
          await seite.getByRole('button', { name: 'TF-IDF + Naive Bayes', exact: true }).click();
          assert.equal(await seite.locator('.demo-ml-ergebnis>strong').textContent(), '18 / 18');
          await seite.getByRole('button', { name: 'Textwiederholungen sichtbar machen' }).click(); break;
      }
      await seite.locator('.demo-oberflaeche').screenshot({ path: path.join(bilder, projekt.slug + '.png'), animations: 'disabled' });
      bericht.projekte.push({ projekt: projekt.id, desktop: true, beginn: start, ende: new Date().toISOString() });
      console.log(projekt.id + ': Interaktion und Bildschirmbild bestanden');
      fs.writeFileSync(path.join(nachweise, 'bericht.json'), JSON.stringify(bericht, null, 2) + '\n');
    }
    await seite.setViewportSize({ width: 390, height: 844 });
    for (const projekt of projekte) {
      await seite.goto(basis + 'projects/' + projekt.slug + '/', { waitUntil: 'networkidle' });
      const rahmen = await seite.locator('.demo-oberflaeche').boundingBox();
      assert(rahmen.x >= 0 && rahmen.x + rahmen.width <= 391, 'Mobile Demo außerhalb des Bildschirms: ' + projekt.id);
      assert(await seite.locator('.studie-simulationshinweis').isVisible());
      bericht.projekte.find(p => p.projekt === projekt.id).mobil = true;
      if (['P01', 'P04', 'P11', 'P13'].includes(projekt.id)) await seite.screenshot({ path: path.join(nachweise, projekt.id + '-mobil.png'), fullPage: true });
    }
    assert.deepEqual(bericht.echte_backendanfragen, []);
    assert.deepEqual(bericht.konsolenfehler, []);
    bericht.erfolgreich = true;
  } catch (fehler) { bericht.fehler = fehler.stack; console.error(fehler.stack); process.exitCode = 1; }
  finally { await browser.close(); bericht.ende = new Date().toISOString(); fs.writeFileSync(path.join(nachweise, 'bericht.json'), JSON.stringify(bericht, null, 2) + '\n'); }
})();
