# Portfolio — Jordan Freddy Pokem Tezo

Dies ist der Quellcode meiner Portfolio-Website. Ich studiere Informatik an der THM in Gießen und nutze die Seite, um meine Projekte, Kenntnisse und Erfahrungen an einem Ort vorzustellen.

[Portfolio ansehen](https://jorxas.github.io/Portfolio/) · [GitHub-Profil](https://github.com/Jorxas)

## Die Website

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
