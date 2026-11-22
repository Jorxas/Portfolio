"use client";
import { useState } from "react";
import { Search, ArrowUpRight } from "lucide-react";
import { projects } from "@/data/portfolio-data";
import { ProjectCard } from "@/components/project-card";
import { Einblenden } from "@/components/bewegung";
const bereiche = [
  "Alle",
  "Software & Systeme",
  "Daten & KI",
  "Automatisierung & GIS",
];
function bereich(p: (typeof projects)[number]) {
  return p.category === "Web App"
    ? "Software & Systeme"
    : p.category === "Data Science"
      ? "Daten & KI"
      : p.category;
}
export default function Projekte() {
  const [alle, setzenAlle] = useState(false),
    [filter, setzenFilter] = useState("Alle"),
    [suche, setzenSuche] = useState("");
  const sichtbar = projects.filter(
    (p) =>
      (alle || filter !== "Alle" || suche.trim() || p.ausgewaehlt) &&
      (filter === "Alle" || bereich(p) === filter) &&
      (p.title + " " + p.description + " " + p.techStack.join(" "))
        .toLocaleLowerCase("de")
        .includes(suche.trim().toLocaleLowerCase("de")),
  );
  return (
    <div className="projekte-seite seitenbreite">
      <Einblenden klasse="seiten-intro">
        <p className="kleine-ueberschrift">PROJEKTE / VOM CODE ZUR ANWENDUNG</p>
        <h1>
          Weniger Beliebigkeit.
          <br />
          <span>Mehr Substanz.</span>
        </h1>
        <p>
          Software, Daten und technische Abläufe: Eine Auswahl aus Studien-,
          Lern- und eigenen Projekten, mit Link zum Quellcode und, wo
          vorhanden, zur Demo.
        </p>
      </Einblenden>
      <div className="projektauswahl">
        <div
          className="ansichtschalter"
          role="group"
          aria-label="Projektauswahl"
        >
          <button
            aria-pressed={!alle}
            onClick={() => {
              setzenAlle(false);
              setzenFilter("Alle");
              setzenSuche("");
            }}
          >
            Auswahl <span>{projects.filter((p) => p.ausgewaehlt).length}</span>
          </button>
          <button aria-pressed={alle} onClick={() => setzenAlle(true)}>
            Alle Arbeiten <span>{projects.length}</span>
          </button>
        </div>
        <label className="projektsuche">
          <Search size={18} />
          <input
            type="search"
            value={suche}
            onChange={(e) => setzenSuche(e.target.value)}
            placeholder="Projekt oder Technologie suchen"
            aria-label="Projekte suchen"
          />
        </label>
      </div>
      <div
        className="bereichsfilter"
        role="group"
        aria-label="Nach Themen filtern"
      >
        {bereiche.map((b) => (
          <button
            key={b}
            aria-pressed={filter === b}
            onClick={() => setzenFilter(b)}
          >
            {b}
          </button>
        ))}
      </div>
      <p className="ergebniszeile" aria-live="polite">
        {sichtbar.length} {sichtbar.length === 1 ? "Projekt" : "Projekte"}
        {filter !== "Alle" ? " · " + filter : ""}
      </p>
      <div className="projektgitter">
        {sichtbar.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} />
        ))}
      </div>
      {!sichtbar.length && (
        <div className="leerzustand">
          <h2>Hier gibt es noch keinen Treffer.</h2>
          <p>Versuche eine andere Technologie oder setze die Suche zurück.</p>
          <button
            className="knopf knopf-blau"
            onClick={() => {
              setzenSuche("");
              setzenFilter("Alle");
              setzenAlle(true);
            }}
          >
            Alle Projekte anzeigen
          </button>
        </div>
      )}
      <aside className="projektarchivhinweis">
        <div>
          <h2>Code und Demos.</h2>
          <p>
            „Code“ führt zum Repository, „Demo“ öffnet die Anwendung in einem
            neuen Tab. Projekte ohne Demo-Link haben nur den Quellcode; bei privaten
            Repositories steht ein Hinweis. Ältere kleine Frontend-Übungen
            bleiben auf GitHub im Archiv.
          </p>
        </div>
        <a
          className="textlink"
          href="https://github.com/Jorxas?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub-Archiv <ArrowUpRight size={18} />
        </a>
      </aside>
    </div>
  );
}
