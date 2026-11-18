# Dreizehn eigenständige Projektseiten

Jede neue Seite unter `projects/<projektname>/` erklärt einen eigenen Fachbereich, stellt die Vorgehensweise dar und trennt gespeicherte Originalergebnisse von der zusätzlichen Browser-Demo. Alle Beispieldaten sind synthetisch. Die Seiten benötigen keinen bezahlten Server oder API-Schlüssel und werden zusammen mit dem bestehenden Portfolio statisch auf GitHub Pages veröffentlicht.

## Echte Oberfläche und simuliertes Backend

Beim Wartungsportal läuft der tatsächlich kompilierte Angular-Frontendcode. Liste, Detail, Formular, Dienst und Fachmodell wurden unverändert übernommen. Nur die Zusammensetzung in `main.ts`, der HTTP-Demo-Interceptor und die Hash-Navigation unterscheiden sich. Die vollständige reproduzierbare Frontendkopie liegt unter `demo-quellen/wartungsportal/`; `HERKUNFT.json` bezeichnet Originalsnapshot und unveränderte Dateien. Der Interceptor beantwortet Aufträge im Arbeitsspeicher; es läuft kein Java-Server.

Die übrigen Seiten verwenden zusätzliche React-/SVG-Veranschaulichungen. Sie behaupten keine Ausführung von WPF, C++, Docker, QGIS, SAP, Power Automate, Power BI oder eines Sprachmodells im Browser. Der Dokumentenassistent und die ML-Auswertung zeigen gespeicherte tatsächliche Prüfergebnisse. Die ML-Seite weist ausdrücklich auf nur sechs verschiedene wiederholte Texte und fehlende Generalisierungsaussage hin.

## Aufbau

- `src/data/projektstudien.json`: öffentliche Inhalte und Grenzen der 13 Projekte.
- `src/data/beispieldaten.json`: synthetische Originalbeispiele.
- `src/data/dokumentantworten.json`: gespeicherte Modellantworten mit Quellen.
- `src/components/projektdemos/`: unterschiedliche interaktive Browseransichten.
- `src/app/projects/[slug]/`: statisch erzeugte Erklärseiten mit eigenen URLs.
- `public/demos/wartungsportal/`: fertiger Angular-Browserbuild samt Lizenzhinweisen.
- `public/projektstand.json`: rein statischer Veröffentlichungsstatus; keine Backend-API.

Die vorhandenen anderen Portfolio-Projekte und externen Links bleiben erhalten. Neue Projektkarten führen zuerst zur jeweiligen Demo- und Erklärseite. Noch nicht vorhandene Quellrepositorys führen vorübergehend zum GitHub-Profil; sie werden nicht als vorhanden behauptet.

## Lokal prüfen

```powershell
npm ci
$env:NEXT_PUBLIC_BASE_PATH = '/Portfolio'
npm run build
node werkzeuge/vorschau.cjs
```

Angular-Demo bei Bedarf unabhängig neu bauen:

```powershell
Set-Location demo-quellen/wartungsportal
npm ci
npm run bauen -- --base-href /Portfolio/demos/wartungsportal/
```

Den Inhalt von `ausgabe/oberflaeche/browser/` danach nach `public/demos/wartungsportal/` übernehmen. Nicht die früheren unveränderlichen Projektsnapshots überschreiben. Alle neuen Inhalte wurden mit KI-Unterstützung entwickelt und geprüft; keine menschliche Entwicklungsdauer oder zusätzliche Produktkompetenz ableiten.

## Tatsächliche Browserprüfung

Am 18. November 2026 wurden alle 13 Seiten mit ihren unterschiedlichen Interaktionen im Browser ausgeführt und anschließend bei 390 Pixeln Breite geprüft. Datenfilter, Importwiederholung, Quellenrückhaltung, echter Angular-Frontendablauf mit simulierter API-Störung, Toleranzgrenzen, Sensorzustände, Befunde, Katalogimport, Not-Halt, Kartenfilter, Freigabe/Exportwiederholung und gespeicherte ML-Ergebnisse wurden kontrolliert. Dabei wurden keine echten Backend-Anfragen oder JavaScript-Laufzeitfehler beobachtet. Die Galerieprüfung umfasst Suche und Navigation unter dem GitHub-Pages-Basispfad.

Für eine Wiederholung wird Playwright als Entwicklungswerkzeug benötigt. Die Vorschau-URL muss ausdrücklich angegeben werden:

```powershell
node werkzeuge/demos-pruefen.cjs http://127.0.0.1:<Vorschau-Port>/Portfolio/
```

Optional kann `PLAYWRIGHT_MODUL` auf eine vorhandene Playwright-Installation zeigen. Der Bericht bleibt unter `.demo-nachweise/` lokal. Die Prüfung aktualisiert die echten Browserbilder für die Projektkarten unter `public/images/projektstudien/`.
