# Demos im Repository

Projektkarten öffnen ihre Demo direkt in einem neuen Tab. Zwei Demos liegen als statische Dateien unter `public/demos/`.

## Wartungsportal

`public/demos/wartungsportal/` enthält den kompilierten Angular-Frontendcode. Liste, Detail, Formular, Dienst und Fachmodell wurden unverändert übernommen. Nur die Zusammensetzung in `main.ts`, der HTTP-Demo-Interceptor und die Hash-Navigation unterscheiden sich; der Interceptor beantwortet Aufträge im Arbeitsspeicher, es läuft kein Java-Server. Die Frontendkopie liegt unter `demo-quellen/wartungsportal/`; `HERKUNFT.json` bezeichnet Originalsnapshot und unveränderte Dateien.

Neu bauen:

```powershell
Set-Location demo-quellen/wartungsportal
npm ci
npm run bauen -- --base-href /Portfolio/demos/wartungsportal/
```

Den Inhalt von `ausgabe/oberflaeche/browser/` danach nach `public/demos/wartungsportal/` übernehmen. Die Sprachumschaltung (`sprache.js`, Deutsch als Standard, Französisch per DE/FR-Schalter) ist in `angular.json` als Skript eingetragen; liegt `sprache.js` nach dem Bau nur als gehashte Datei vor, das eingebundene Skript im `index.html` auf diese Datei umstellen.

## Quiz

`public/demos/quiz/` enthält das vorhandene Frontend mit ergänztem lokalem Adapter (`adapter.js`). Es gibt keinen Broker und keine Anmeldung; Herkunft in `HERKUNFT.json`. `sprache.js` schaltet die Oberfläche zwischen Deutsch (Standard) und Französisch um; die französischen Fragen stehen in `fragen-fr.json`.

## Weitere Demos

JobPilot, PPS, Horror Studio 3D, Vie und Concal sind eigene, extern veröffentlichte Anwendungen und werden nur verlinkt.
