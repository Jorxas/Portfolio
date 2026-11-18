"use client";

import { useMemo, useState } from "react";
import { Database, FileText, Search, Package, ArrowRight, Check, RotateCcw } from "lucide-react";
import daten from "@/data/beispieldaten.json";
import antworten from "@/data/dokumentantworten.json";
import { Kennzahlen, Hinweis, Status, Tabelle, euro } from "./hilfen";

export function Datenqualitaet() {
  const [csv, csvSetzen] = useState(daten.P01.text);
  const [monat, monatSetzen] = useState("alle");
  const pruefung = useMemo(() => {
    const zeilen = csv.trim().split(/\r?\n/), gesehen = new Set<string>();
    const kopf = zeilen.shift()?.trim();
    if (kopf !== "bestellung_id,datum,kategorie,betrag") return { gueltig: [] as { id: string; monat: string; kategorie: string; cent: number }[], fehler: [["1", "Vier Spalten erwartet: bestellung_id,datum,kategorie,betrag"]] };
    const gueltig: { id: string; monat: string; kategorie: string; cent: number }[] = [], fehler: string[][] = [];
    zeilen.forEach((zeile, i) => {
      const felder = zeile.split(",").map(f => f.trim()), [id, datum, kategorie, betrag] = felder, gruende = [];
      if (felder.length !== 4) gruende.push("Spaltenzahl ungleich vier");
      if (!id) gruende.push("Kennung fehlt"); else if (gesehen.has(id)) gruende.push("Kennung bereits vorhanden");
      if (id) gesehen.add(id);
      if (!/^\d{4}-\d{2}-\d{2}$/.test(datum || "") || !Number.isFinite(Date.parse(datum)) || new Date(datum).toISOString().slice(0, 10) !== datum) gruende.push("Datum ungültig");
      if (!["ersatzteile", "wartung"].includes(kategorie)) gruende.push("Kategorie ungültig");
      if (!/^\d+(\.\d{1,2})?$/.test(betrag || "") || !Number.isSafeInteger(Math.round(Number(betrag) * 100))) gruende.push("Betrag fehlt oder ist ungültig");
      if (gruende.length) fehler.push([String(i + 2), gruende.join(" · ")]);
      else gueltig.push({ id, monat: datum.slice(0, 7), kategorie, cent: Math.round(Number(betrag) * 100) });
    });
    return { gueltig, fehler };
  }, [csv]);
  const auswahl = pruefung.gueltig.filter(z => monat === "alle" || z.monat === monat);
  const summe = auswahl.reduce((a, z) => a + z.cent, 0);
  return <div className="demo-datenlabor">
    <div className="demo-werkzeugkopf"><span><Database size={17} /> Werkstatt / Auswertung</span><label>Zeitraum<select aria-label="Monat filtern" value={monat} onChange={e => monatSetzen(e.target.value)}><option value="alle">Alle Monate</option><option value="2026-01">Januar 2026</option><option value="2026-02">Februar 2026</option></select></label></div>
    <Kennzahlen werte={[["Gesamtumsatz", euro(summe)], ["Bestellungen im Filter", auswahl.length], ["Abgelehnte Zeilen gesamt", pruefung.fehler.length]]} />
    <div className="demo-zweispaltig"><div className="demo-panel"><h3>Umsatz nach Monat</h3>{["2026-01", "2026-02"].map(m => { const cent = auswahl.filter(z => z.monat === m).reduce((s, z) => s + z.cent, 0); return <div className="demo-balkenzeile" key={m}><span>{m.endsWith("01") ? "Januar" : "Februar"}</span><div><i style={{ width: `${Math.min(100, cent / Math.max(summe, 1) * 100)}%` }} /></div><strong>{euro(cent)}</strong></div>; })}<p>Filter verändert die Auswertung. Die Qualitätsprüfung betrifft immer den gesamten Import.</p></div><div className="demo-panel"><h3>Datenqualität</h3><Tabelle kopf={["CSV-Zeile", "Ablehnungsgrund"]} zeilen={pruefung.fehler} /><p>Zuerst prüfen, dann rechnen. Dubletten werden nicht doppelt gezählt.</p></div></div>
    <details className="demo-details"><summary>CSV ansehen und selbst ändern</summary><label>Beispiel-CSV<textarea aria-label="Bestellungen CSV" value={csv} onChange={e => csvSetzen(e.target.value)} rows={10} spellCheck={false} /></label><p>Vereinfachte Browseransicht für vier einfache CSV-Spalten ohne Anführungszeichen. Der vollständige Python-Parser steht im Originalprojekt.</p><button onClick={() => { csvSetzen(daten.P01.text); monatSetzen("alle"); }}><RotateCcw size={15} /> Beispieldaten zurücksetzen</button></details>
  </div>;
}

interface Ereignis { ereignis_id: string; umgebung: string; stufe: string; nachricht: string; zeitpunkt: string }
export function DataHub() {
  const [eingang, eingangSetzen] = useState(daten.P02.text), [ereignisse, speichern] = useState<Ereignis[]>([]);
  const [umgebung, filtern] = useState("alle"), [bericht, berichten] = useState({ neu: 0, ignoriert: 0, fehler: 0, laeufe: 0 });
  function importieren() {
    const speicher = new Map(ereignisse.map(e => [e.ereignis_id, e])); let neu = 0, ignoriert = 0, fehler = 0;
    for (const zeile of eingang.trim().split(/\r?\n/)) {
      try { const e = JSON.parse(zeile) as Ereignis;
        if (!e.ereignis_id || !e.umgebung || !e.nachricht || !["INFO", "WARN", "ERROR"].includes(e.stufe) || !Number.isFinite(Date.parse(e.zeitpunkt))) throw Error();
        if (speicher.has(e.ereignis_id)) ignoriert++; else { speicher.set(e.ereignis_id, e); neu++; }
      } catch { fehler++; }
    }
    speichern([...speicher.values()]); berichten({ neu, ignoriert, fehler, laeufe: bericht.laeufe + 1 });
  }
  const auswahl = ereignisse.filter(e => umgebung === "alle" || e.umgebung === umgebung);
  return <div className="demo-datahub"><div className="demo-werkzeugkopf"><span><Database size={18} /> JSONL → Prüfen → Speicher → API</span><span className="demo-mikro">Speicher nur im Browser</span></div><div className="demo-zweispaltig"><div className="demo-panel"><label>Protokolle<textarea value={eingang} onChange={e => eingangSetzen(e.target.value)} aria-label="JSONL-Protokolle" rows={10} spellCheck={false} /></label><div className="demo-aktionen"><button className="demo-primaer" onClick={importieren}>Import ausführen <ArrowRight size={15} /></button><button onClick={() => { speichern([]); berichten({ neu: 0, ignoriert: 0, fehler: 0, laeufe: 0 }); }}>Speicher leeren</button></div></div><div className="demo-panel"><h3>Letzter Import</h3><Kennzahlen werte={[["Neu", bericht.neu], ["Ignoriert", bericht.ignoriert], ["Fehler", bericht.fehler]]} /><Hinweis kinder={bericht.laeufe ? `Lauf ${bericht.laeufe}: ${ereignisse.length} eindeutige Ereignisse im Speicher. Erneut importieren verändert diese Anzahl nicht.` : "Ersten Import ausführen, dann mit identischen Daten wiederholen."} /><label>Umgebung<select value={umgebung} onChange={e => filtern(e.target.value)}><option value="alle">Alle</option><option value="entwicklung">Entwicklung</option><option value="test">Test</option></select></label><pre className="demo-code">{JSON.stringify({ httpStatus: 200, hinweis: "Simulierte Antwort", ereignisse: auswahl.length, fehlerereignisse: auswahl.filter(e => e.stufe === "ERROR").length }, null, 2)}</pre></div></div><Tabelle kopf={["Kennung", "Umgebung", "Stufe", "Nachricht"]} zeilen={auswahl.map(e => [e.ereignis_id, e.umgebung, <Status key={e.ereignis_id} text={e.stufe} gut={e.stufe === "INFO"} />, e.nachricht])} /></div>;
}

export function Dokumentensuche() {
  const [index, waehlen] = useState(1);
  const antwort = antworten[index];
  return <div className="demo-dokumente"><div className="demo-werkzeugkopf"><span><Search size={18} /> Dokumente / überprüfbare Antworten</span><Status text="Gespeicherter Prüflauf" /></div><div className="demo-zweispaltig"><div className="demo-panel"><p className="demo-mikro">BEISPIELFRAGE WÄHLEN</p><div className="demo-fragen">{antworten.map((a, i) => <button className={index === i ? "aktiv" : ""} key={a.frage} onClick={() => waehlen(i)}>{a.frage}<ArrowRight size={14} /></button>)}</div></div><div className="demo-antwort" aria-live="polite"><span className="demo-mikro">{antwort.antwort ? "BELEG GEFUNDEN" : "ANTWORT ZURÜCKGEHALTEN"}</span><h3>{antwort.frage}</h3>{antwort.antwort ? <><blockquote>„{antwort.antwort.zitat}“</blockquote><span className="demo-quellenname"><FileText size={16} /> {antwort.antwort.quelle}</span></> : <Hinweis fehler kinder="Kein überprüfter wörtlicher Beleg. Deshalb wird keine Antwort ausgegeben." />}<p>{antwort.hinweis}</p><hr /><p className="demo-mikro">Kein Sprachmodell im Browser. Die Auswahl zeigt echte gespeicherte Ergebnisse des lokalen Projekts.</p></div></div></div>;
}

interface Produkt { id: string; name: string; cent: number; bestand: number }
export function Produktkatalog() {
  const [produkte, setzen] = useState<Produkt[]>([]), [suche, suchen] = useState(""), [laeufe, zaehlen] = useState(0);
  function importieren() {
    const gesehen = new Set<string>(), kartei = new Map(produkte.map(p => [p.id, p]));
    daten.P09.text.trim().split(/\r?\n/).slice(1).forEach(z => { const [id, name, preis, bestand] = z.split(",");
      if (gesehen.has(id)) return; gesehen.add(id);
      if (!/^P\d{2}$/.test(id) || !/^\d+\.\d{2}$/.test(preis) || !/^\d+$/.test(bestand)) return;
      kartei.set(id, { id, name, cent: Math.round(Number(preis) * 100), bestand: Number(bestand) });
    }); setzen([...kartei.values()]); zaehlen(laeufe + 1);
  }
  return <div className="demo-katalog"><div className="demo-werkzeugkopf"><span><Package size={18} /> Kleiner Laden / Produktdaten</span><span>Kein Shop · keine Zahlung</span></div><div className="demo-katalogkopf"><div><span className="demo-mikro">AUS DATEN WIRD EIN KATALOG</span><h3>Ordentlich importiert.<br />Verlässlich bepreist.</h3></div><div className="demo-aktionen"><button className="demo-primaer" onClick={importieren}>{laeufe ? "Erneut importieren" : "7 Beispielzeilen importieren"}</button><button onClick={() => { setzen([]); zaehlen(0); }}>Zurücksetzen</button></div></div><Hinweis kinder={laeufe ? `Importlauf ${laeufe}: ${produkte.length} Produkte. 2 Zeilen abgewiesen: interner Doppelartikel und fehlender Preis. P01 bleibt bei 5,50 €.` : "Originalbeispiele: fünf gültige Produkte, eine Dublette mit anderem Preis und ein Artikel ohne Preis."} /><label className="demo-suche">Katalog filtern<input value={suche} onChange={e => suchen(e.target.value)} placeholder="Bezeichnung oder Artikelnummer" /></label><div className="demo-produkte">{produkte.filter(p => `${p.name} ${p.id}`.toLowerCase().includes(suche.toLowerCase())).map((p, i) => <article key={p.id}><div className={`demo-produktbild demo-produktbild-${i % 3}`}><Package size={50} strokeWidth={1.2} /></div><span className="demo-mikro">{p.id}</span><h4>{p.name}</h4><strong>{euro(p.cent)}</strong><p>{p.bestand} Stück im synthetischen Bestand</p></article>)}</div></div>;
}

export function Klassifikation() {
  const [modell, modellSetzen] = useState(false), [duplikate, zeigen] = useState(false);
  const klassen = ["Anwendung", "Netzwerk", "Zugriff"], matrix = modell ? [[6, 0, 0], [0, 6, 0], [0, 0, 6]] : [[6, 0, 0], [6, 0, 0], [6, 0, 0]];
  return <div className="demo-ml"><div className="demo-werkzeugkopf"><span><Database size={18} /> Evaluation / gespeicherte Prüfergebnisse</span><Status text="Kein Training im Browser" /></div><div className="demo-aktionen demo-schalter"><button className={!modell ? "aktiv" : ""} onClick={() => modellSetzen(false)}>Mehrheitsbaseline</button><button className={modell ? "aktiv" : ""} onClick={() => modellSetzen(true)}>TF-IDF + Naive Bayes</button></div><div className="demo-zweispaltig"><div className="demo-panel"><h3>Konfusionsmatrix</h3><p>Zeilen: tatsächliche Klasse · Spalten: Vorhersage</p><table className="demo-matrix"><thead><tr><th scope="col">Soll ↓ / Prognose →</th>{klassen.map(k => <th key={k} scope="col">{k}</th>)}</tr></thead><tbody>{matrix.map((zeile, i) => <tr key={i}><th scope="row">{klassen[i]}</th>{zeile.map((n, j) => <td key={j} data-wert={n}>{n}</td>)}</tr>)}</tbody></table></div><div className="demo-ml-ergebnis"><span className="demo-mikro">TREFFER IM GESPEICHERTEN TEST</span><strong>{modell ? "18 / 18" : "6 / 18"}</strong><p>{modell ? "Alle Testtexte sind bereits aus dem Training bekannt. Die perfekte Trefferzahl sagt hier nichts über neue Meldungen aus." : "Die Baseline sagt immer „Anwendung“. Dadurch trifft sie sechs Fälle und verfehlt die zwölf Fälle der beiden anderen Klassen."}</p><Hinweis fehler kinder="Kennungen sind getrennt, Textinhalte wiederholen sich. Diese Übung ist keine unabhängige Messung industrieller Modellgüte." /></div></div><div className="demo-datenteilung"><div className="demo-werkzeugkopf"><h3>Warum 18/18 täuschen kann</h3><button onClick={() => zeigen(!duplikate)}>{duplikate ? <Check size={15} /> : <Search size={15} />}{duplikate ? "Texte nach Farbe gruppiert" : "Textwiederholungen sichtbar machen"}</button></div>{[["Training", 42], ["Test", 18]].map(([titel, n]) => <div className="demo-punktzeile" key={titel}><span>{titel}</span><div>{Array.from({ length: Number(n) }, (_, i) => <i key={i} style={{ background: duplikate ? ["#7c3aed", "#0891b2", "#d97706", "#e11d48", "#16a34a", "#475569"][i % 6] : undefined }} title={`Schematische Darstellung: Textmuster ${i % 6 + 1}`} />)}</div><b>{n}</b></div>)}<p>Schematische Visualisierung der sechs wiederholten Textmuster. Die Datensätze enthalten 60 Meldungen, aber nur sechs verschiedene Texte.</p></div></div>;
}
