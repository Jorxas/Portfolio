# Portfolio — Jordan Freddy Pokem Tezo

Dies ist der Quellcode meiner Portfolio-Website. Ich studiere Informatik an der THM in Gießen und nutze die Seite, um meine Projekte, Kenntnisse und Erfahrungen an einem Ort vorzustellen.

[Portfolio ansehen](https://jorxas.github.io/Portfolio/) · [GitHub-Profil](https://github.com/Jorxas)

## Die Website

Die Projektübersicht zeigt **acht ausgewählte Arbeiten**. Über „Alle Arbeiten“, Suche und Themenfilter sind **17 Projekte** zugänglich. Jede Karte hat getrennte Links zum **Quellcode** und zur **Demo**. Ältere, redundante Frontend-Übungen werden nicht mehr hervorgehoben; ihre Repositories bleiben erhalten.

**16 eigenständige Demo- und Erklärseiten** behandeln Software, Daten und technische Abläufe; Concal verlinkt seine externe Anwendung. Die 13 technischen Lernprojekte verwenden synthetische Beispiele und klar gekennzeichnete simulierte Backends. Beim Wartungsportal läuft das kompilierte Angular-Frontend. Das Quiz verwendet sein vorhandenes Frontend mit lokalem HTTP-/MQTT-Adapter. CNN und RNN zeigen gespeicherte Originalauswertungen statt neuer Modellaufrufe. [Aufbau und Reproduktion](DEMOSEITEN.md).

Das blau-weiße Layout verbindet eine interaktive Projektvorschau, dezente Bewegungen, Tastaturbedienung und eine mobile Navigation. Die Einstellung für reduzierte Bewegung wird berücksichtigt. Fähigkeiten werden anhand von Projekten erklärt, ohne subjektive Prozentbalken. Kontakt erfolgt per E-Mail-Link oder Zwischenablage; die Website versendet keine Nachrichten.

Die Seite enthält eine Startseite, eine Projektübersicht, Informationen über mich und eine Kontaktseite. Projekttexte und Profildaten sind in [`src/data/portfolio-data.ts`](src/data/portfolio-data.ts) gesammelt, damit ich Inhalte pflegen kann, ohne sie an vielen Stellen im UI zu ändern.

Umgesetzt mit **Next.js**, **React**, **TypeScript**, **Tailwind CSS** und **Framer Motion**. Das Layout ist responsive; die Next.js-Konfiguration erstellt einen statischen Export für GitHub Pages.

## Lokal starten

Voraussetzungen: Node.js und npm.

```bash
git clone https://github.com/Jorxas/Portfolio.git
cd Portfolio
npm install
npm run dev
```

Öffne [http://localhost:3000](http://localhost:3000). Mit `npm run build` wird der statische Export in `out/` erstellt. Beim Build auf GitHub Actions wird der Repository-Pfad als Base Path gesetzt; für andere Umgebungen lässt er sich über `NEXT_PUBLIC_BASE_PATH` anpassen.

## Aufbau

- [`src/app/`](src/app/) — Seiten, Layout und globale Styles.
- [`src/components/`](src/components/) — wiederverwendbare Komponenten.
- [`src/data/portfolio-data.ts`](src/data/portfolio-data.ts) — Inhalte und Projektliste.
- [`public/`](public/) — Bilder und weitere statische Dateien.

Einige Projekte, die auf der Website vorgestellt werden: [Concal](https://github.com/Jorxas/Concal), [Multiplayer Trivia Quiz](https://github.com/Jorxas/quizgame), [CNN Clothing Classification](https://github.com/Jorxas/cnn-clothing-classification) und [Musikgenerierung mit RNNs](https://github.com/Jorxas/eidl-abgabe3-musikgenerierung).

## Prüfen

```powershell
npm ci
npm run lint
$env:NEXT_PUBLIC_BASE_PATH = '/Portfolio'
npm run build
node werkzeuge/vorschau.cjs
# In einer zweiten Konsole, mit installiertem Playwright:
node werkzeuge/portfolio-pruefen.cjs http://127.0.0.1:<Port>/Portfolio/
node werkzeuge/demos-pruefen.cjs http://127.0.0.1:<Port>/Portfolio/
```

`PLAYWRIGHT_MODUL` kann auf eine vorhandene Playwright-Installation zeigen. Berichte und Bildschirmbilder bleiben unter `.demo-nachweise/`. Interne Links verwenden vollständige Dokumentnavigation: Der Export benötigt auf GitHub Pages keine RSC-Rewrite-Regeln. Die Website und ihre zusätzlichen Demos wurden mit KI-Unterstützung überarbeitet.
