export type Auftragszustand = "offen" | "erledigt";
export interface Wartungsauftrag { kennung: string; bezeichnung: string; prioritaet: "normal" | "hoch"; zustand: Auftragszustand; }
export type Auftragseingabe = Pick<Wartungsauftrag, "bezeichnung" | "prioritaet">;
