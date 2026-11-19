"use client";
import { useState } from "react";
import Link from "./link";
import { ArrowUpRight, Braces } from "lucide-react";
const felder = [
  {
    name: "Software",
    titel: "Hermes: Entwicklungssitzungen koordinieren",
    code: "Python → MCP → dauerhafte Aufgaben",
    href: "https://jorxas.github.io/Hermes/",
  },
  {
    name: "Daten",
    titel: "PPS: Sprache lokal verarbeiten",
    code: "FastAPI → Modellprozesse → Wortausrichtung",
    href: "https://jorxas.github.io/PPS/",
  },
  {
    name: "Automatisierung",
    titel: "THOT: Veröffentlichungen begleiten",
    code: "Prüfsumme → Freigabe → Zustellstatus",
    href: "https://jorxas.github.io/THOT/",
  },
];
export function Projektkompass() {
  const [auswahl, setzen] = useState(0);
  const feld = felder[auswahl];
  return (
    <div className="projektkompass">
      <div className="kompass-raster" />
      <div className="kompass-top">
        <span>
          <span className="verfuegbar-punkt" /> PROJEKTLABOR
        </span>
        <Braces size={20} />
      </div>
      <svg
        className="kompass-zeichnung"
        viewBox="0 0 500 320"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="wuerfel" x2="1" y2="1">
            <stop stopColor="#347bff" stopOpacity=".35" />
            <stop offset="1" stopColor="#347bff" stopOpacity=".04" />
          </linearGradient>
        </defs>
        <path
          d="M250 30 388 110 250 190 112 110Z"
          fill="url(#wuerfel)"
          stroke="#165dff"
        />
        <path
          d="M112 110v105l138 80V190m138-80v105l-138 80"
          fill="url(#wuerfel)"
          stroke="#165dff"
        />
        <path
          d="M250 30v107m-94-2 94 55 94-55M250 295V190"
          stroke="#165dff"
          fill="none"
          strokeDasharray="4 5"
        />
        <path
          className="kompass-linie"
          d="M25 220h65l160-93 165 95h60M250 0v30M250 295v25"
          stroke="#165dff"
          fill="none"
        />
        <circle
          className="kompass-knoten knoten-eins"
          cx="112"
          cy="110"
          r="7"
          fill="#165dff"
        />
        <circle
          className="kompass-knoten knoten-zwei"
          cx="388"
          cy="215"
          r="7"
          fill="#165dff"
        />
        <circle cx="250" cy="190" r="9" fill="#165dff" />
        <text x="30" y="55" fill="#6b83a8" fontSize="11" fontFamily="monospace">
          01 / STRUKTUR
        </text>
        <text
          x="337"
          y="284"
          fill="#6b83a8"
          fontSize="11"
          fontFamily="monospace"
        >
          02 / VERBINDUNG
        </text>
      </svg>
      <div className="kompass-auswahl" role="group" aria-label="Projektfokus">
        {felder.map((f, i) => (
          <button
            key={f.name}
            onClick={() => setzen(i)}
            aria-pressed={i === auswahl}
          >
            {f.name}
          </button>
        ))}
      </div>
      <Link className="kompass-vorschau" href={feld.href}>
        <div>
          <p className="kompass-code">{feld.code}</p>
          <strong>{feld.titel}</strong>
        </div>
        <ArrowUpRight size={23} />
      </Link>
    </div>
  );
}
