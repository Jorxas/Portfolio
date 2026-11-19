# Sechzehn eigenständige Projektseiten

Jede Seite unter `projects/<projektname>/` erklärt Fachbereich, Vorgehensweise, Ergebnisse und Grenzen. Die 13 technischen Lernprojekte verwenden synthetische Daten. Die drei zusätzlichen Kursprojektseiten (CNN, RNN und Quiz) verwenden veröffentlichte Originalartefakte; ihre zusätzliche Interaktion wird ausdrücklich eingeordnet. Die Seiten benötigen keinen bezahlten Server oder API-Schlüssel und werden statisch auf GitHub Pages veröffentlicht.

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

Jede Projektkarte hat getrennte Code- und Demo-Links. Acht Arbeiten sind ausgewählt; alle 17 sind über Filter und Suche zugänglich. Kleine redundante Frontend-Übungen wurden aus der Präsentation genommen, ohne ihre Repositories zu löschen.

## Zusätzliche Kursprojekte

- **CNN:** `src/data/legacy-daten.json` enthält originale Matrix, Messwerte und Quellen. Die Matrix summiert sich zu 392 Testbildern und 284 richtigen Vorhersagen. Grafiken unter `public/images/lernstudien/` stammen aus dem Original-Repository; keine rekonstruierten Kurvenwerte, keine neue Bilderkennung.
- **RNN:** Das Datenartefakt enthält zehn Epochen je Modell, getrennte Testergebnisse und drei originale ABC-Texte. Der Browser spielt auf Wunsch eine vereinfachte Sinus-Synthese ab. Keine historischen Audiodateien, kein Modell-Sampling und keine belastbare Aussage zur musikalischen Qualität.
- **Quiz:** `public/demos/quiz/` enthält das originale Frontend mit ergänztem lokalem Adapter. Externe MQTT-Bibliothek und ursprüngliche Umgebungskonfiguration werden nicht verwendet. Kein Broker, keine echte Anmeldung, keine Hardware-Controller. Antwortklicks am Host sind eine Demo-Ergänzung. Die fünf Fragen stammen aus den Original-SQL-Dateien. Lobby, Mitspieler, Highscores und 100 Punkte pro richtiger Antwort sind simuliert. Andere Spielkonfigurationen sind ausgeblendet.

Originalquellen sind in `src/data/legacy-daten.json` und `public/demos/quiz/fragen.json` dokumentiert. Concal führt zur externen Anwendung; deren Anmeldung, Datenbank und Gemini-Anbindung werden durch die statischen Portfolio-Prüfungen nicht validiert. Die ergänzende Präsentation wurde mit KI-Unterstützung erstellt.

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

Am 19. November 2026 wurden zusätzlich die interaktive CNN-Matrix samt Originalgrafiken, der LSTM-/GRU-Vergleich mit lokaler Audiowiedergabe und eine komplette Quizrunde mit fünf Fragen geprüft. Die 13 bisherigen Demos bestanden ihre Interaktions- und Mobilprüfungen erneut. `werkzeuge/portfolio-pruefen.cjs` prüft außerdem Projektauswahl, Suche, Code-/Demo-Links, Kontakt ohne Versand, mobile Navigation und reduzierte Bewegung. Die lokalen Läufe zeigten keine JavaScript-Laufzeitfehler, fehlenden Dateien oder echten Backend-Anfragen. Diese Prüfung gilt für die Browseransichten, nicht für externe oder native Systeme.
