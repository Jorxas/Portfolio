"use client";

import {
  Datenqualitaet,
  DataHub,
  Dokumentensuche,
  Produktkatalog,
  Klassifikation,
} from "./daten-demos";
import {
  Messwerte,
  Sensor,
  Betrieb,
  Inventar,
  Maschine,
  Wartungskarte,
  Beschaffung,
} from "./technik-demos";
import { assetPath } from "@/lib/asset-path";
import { Kleidungsnetz, Musiknetz, Quizstudie } from "./lernstudien";

export function ProjektDemo({ projekt }: { projekt: string }) {
  switch (projekt) {
    case "JP":
      return (
        <div>
          <div className="demo-werkzeugkopf">
            <span>JobPilot · öffentliche portable Fassung</span>
            <span>Synthetische Stellen · Quellenzugriffe simuliert</span>
          </div>
          <iframe
            src={assetPath("/demos/jobpilot/")}
            title="JobPilot: Stellensuche und Formularassistent mit synthetischen Beispielen"
            className="jobpilot-rahmen"
            sandbox="allow-scripts allow-same-origin allow-popups allow-downloads"
          />
          <p className="demo-mikro">
            Stellen filtern, den Vergleich verstehen, Suchpläne wechseln oder
            den Formularmotor am Übungsformular testen.{" "}
            <a
              href="https://jorxas.github.io/JobPilot/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Demo in voller Größe öffnen ↗
            </a>
          </p>
        </div>
      );
    case "CNN":
      return <Kleidungsnetz />;
    case "RNN":
      return <Musiknetz />;
    case "QUIZ":
      return <Quizstudie />;
    case "P01":
      return <Datenqualitaet />;
    case "P02":
      return <DataHub />;
    case "P03":
      return <Dokumentensuche />;
    case "P04":
      return (
        <div className="demo-angular">
          <div className="demo-werkzeugkopf">
            <span>Originales Angular-Frontend</span>
            <span>HTTP-Backend lokal simuliert</span>
          </div>
          <iframe
            src={assetPath("/demos/wartungsportal/")}
            title="Wartungsportal: echtes Angular-Frontend mit simuliertem Backend"
            className="demo-angular-rahmen"
          />
          <p className="demo-mikro">
            Auftrag öffnen, Status ändern oder einen neuen Auftrag anlegen. Zum
            Zurücksetzen die Seite neu laden.
          </p>
        </div>
      );
    case "P05":
      return <Messwerte />;
    case "P06":
      return <Sensor />;
    case "P07":
      return <Betrieb />;
    case "P08":
      return <Inventar />;
    case "P09":
      return <Produktkatalog />;
    case "P10":
      return <Maschine />;
    case "P11":
      return <Wartungskarte />;
    case "P12":
      return <Beschaffung />;
    case "P13":
      return <Klassifikation />;
    default:
      return null;
  }
}
