# Portfolio — Jordan Freddy Pokem Tezo

Dies ist der Quellcode meiner Portfolio-Website. Ich studiere Informatik an der THM in Gießen und nutze die Seite, um meine Projekte, Kenntnisse und Erfahrungen an einem Ort vorzustellen.

[Portfolio ansehen](https://jorxas.github.io/Portfolio/) · [GitHub-Profil](https://github.com/Jorxas)

## Die Website

Die Projektübersicht zeigt eine Auswahl und über „Alle Arbeiten“, Suche und Themenfilter alle Projekte. Jede Karte führt direkt zur echten Demo oder, wenn es keine gibt, zum Quellcode. Demos öffnen in einem neuen Tab, ohne Zwischenseite und ohne Einbettung.

- **Externe Demos:** JobPilot, PPS, Horror Studio 3D, Vie, Concal.
- **Demos in diesem Repository:** das Quiz unter `public/demos/quiz/` (vorhandenes Frontend mit lokalem Adapter) und das Wartungsportal unter `public/demos/wartungsportal/` (kompiliertes Angular-Frontend, Quelle in `demo-quellen/wartungsportal/`, siehe [DEMOSEITEN.md](DEMOSEITEN.md)).
- **Ohne Demo:** Hermes und THOT (privater Quellcode), CNN, RNN und die übrigen Studienprojekte (nur Link zum Repository).

Die Seite enthält eine Startseite, eine Projektübersicht, Informationen über mich und eine Kontaktseite. Projekttexte und Profildaten sind in [`src/data/portfolio-data.ts`](src/data/portfolio-data.ts), [`src/data/persoenliche-projekte.ts`](src/data/persoenliche-projekte.ts) und [`src/data/lernprojekte.ts`](src/data/lernprojekte.ts) gesammelt, damit ich Inhalte pflegen kann, ohne sie an vielen Stellen im UI zu ändern.

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
- [`src/data/`](src/data/) — Inhalte und Projektlisten.
- [`public/`](public/) — Bilder und weitere statische Dateien.

Weitere Projekte, die auf der Website vorgestellt werden: [Concal](https://github.com/Jorxas/Concal), [Multiplayer Trivia Quiz](https://github.com/Jorxas/quizgame), [CNN Clothing Classification](https://github.com/Jorxas/cnn-clothing-classification) und [Musikgenerierung mit RNNs](https://github.com/Jorxas/eidl-abgabe3-musikgenerierung).

## Prüfen

```powershell
npm ci
npm run lint
$env:NEXT_PUBLIC_BASE_PATH = '/Portfolio'
npm run build
node werkzeuge/vorschau.cjs
```

`werkzeuge/vorschau.cjs` liefert `out/` lokal unter dem Basispfad `/Portfolio/` aus. Interne Links verwenden vollständige Dokumentnavigation: Der Export benötigt auf GitHub Pages keine RSC-Rewrite-Regeln.
