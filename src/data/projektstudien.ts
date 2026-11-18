import daten from "./projektstudien.json";

export interface ProjektStudie {
  id: string;
  slug: string;
  titel: string;
  bereich: string;
  kopfzeile: string;
  problem: string;
  nutzen: string;
  ergebnis: string;
  grenze: string;
  farbe: string;
  technologien: string[];
  kennzahlen: { wert: string; text: string }[];
  vorgehen: { titel: string; text: string }[];
  repository: string;
  original: string;
}

export const projektstudien = daten as ProjektStudie[];
