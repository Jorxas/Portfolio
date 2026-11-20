import Link from "./link";
import stil from "./geschuetztes-projekt.module.css";
import {assetPath} from "@/lib/asset-path";

const projekte = {
  hermes: {
    name: "Hermes — Multi-Agent AI Orchestrator",
    bereich: "Entwicklungswerkzeuge · Python · MCP",
    ziel: "Mehrere KI-Werkzeuge an einer gemeinsamen Mission arbeiten lassen.",
    problem: "Parallele KI-Sitzungen verlieren schnell den gemeinsamen Stand oder ändern dieselben Dateien. Hermes hält Aufträge, Voraussetzungen, Schreibreservierungen und Ausführungsbelege an einer Stelle zusammen.",
    architektur: "ChatGPT (Direktion) → Hermes/MS (Orchestrierung) → Claude Code, Codex und Antigravity; Gemini wird über Antigravity angesprochen.",
    technik: ["Python", "MCP", "SQLite", "Prozesssteuerung", "WebGL2"],
    funktionen: [
      ["Missionen und Abhängigkeiten", "Aufträge und Schritte bleiben dauerhaft gespeichert. Voraussetzungen begrenzen, wann ein Schritt beginnen darf; mehrere Projekte behalten getrennte Zustände."],
      ["Begründete Auswahl", "Das Routing berücksichtigt zulässige Anbieter, Kontingentgruppen und vergleichbare Qualitätsbelege, danach die beobachtete Gesamtzeit. Fehlende Historie bleibt unbekannt."],
      ["Planen und Implementieren", "Schreibzugriffe werden ausdrücklich freigegeben. Reservierungen und Speicherprüfungen begrenzen Parallelität; ein Arbeitsbaum erhält höchstens einen Schreiber."],
      ["Fortsetzung und Audit", "Ein Kontingentwechsel verlangt ein belegtes Prozessende. Unklare Zustellung wird abgeglichen. Gespeichertes Ergebnis, Abruf und tatsächliche Modellausführung sind unterschiedliche Belege."],
    ],
    entscheidung: "Dauerhafte Zustände statt einer bloßen Weiterleitung von Prompts. Anbieter sind getrennte Ausführungswege; der Leitstand liest einen gemeinsamen Missionszustand in klassischer 2D-Ansicht oder als 3D-Stadt.",
    schwierigkeit: "Bei einer verlorenen Antwort ist unklar, ob ein Agent schon arbeitet. Ein erneuter Versand könnte dieselbe Arbeit doppelt starten. Hermes hält den Auftrag deshalb zur Abstimmung an und fordert Ausführungs- beziehungsweise Beendigungsbelege an.",
    status: "Lokaler Entwicklungsstand mit mehreren Anbindungen. Die Präsentation vereinfacht ausgewählte Regeln. Sieben Zustandsprüfungen und ein Browserlauf belegen die synthetische Demo; sie ersetzen keinen neuen Live-Test der Anbieter. Vier bekannte erwartete Testfehler des historischen Kernexports bleiben offen.",
    demo: "In der eigenständigen 2D-Simulation einen Takt fortschalten und die zugewiesenen Modelle vergleichen. Kontingentwechsel, Schreibsperre oder unklare Zustellung untersuchen. Der zusätzliche 3D-Einblick zeigt bereinigte Aufnahmen des privaten Originalleitstands; sein Motor wird nicht ausgeliefert. Alle Daten und Prozessbelege sind erfunden.",
    code: "Quellcode privat — Vorführung mit synthetischen Daten.",
  },
  thot: {
    name: "THOT — Multi-Platform Publishing SaaS",
    bereich: "Webentwicklung · Automatisierung · Schnittstellen",
    ziel: "Inhalte für mehrere Plattformen vorbereiten, kontrolliert freigeben und terminieren.",
    problem: "Mehrere Konten und Sprachfassungen machen die Veröffentlichung fehleranfällig: falsches Ziel, geänderte Metadaten nach einer Freigabe oder ein doppelter Upload nach einem Netzfehler. THOT bündelt diese Schritte in einer Kampagne.",
    architektur: "Browser → Dienst und Freigabeprüfung → Planer → Plattformadapter. Die lokale Variante verwendet SQLite; der separate SaaS-Prototyp verwendet Supabase mit Auth, Postgres-Richtlinien und Storage.",
    technik: ["JavaScript", "Node.js", "SQLite", "REST", "Supabase"],
    funktionen: [
      ["Inhalte und Kampagnen", "Medien, Metadaten, Konten und Sprachfassungen zusammenstellen; ein Status je Veröffentlichungsziel. Die Demo zeigt fiktive Konten und Beitragsvorschauen."],
      ["Gebundene Freigabe", "Eine Prüfsumme bindet die Zustimmung an den geprüften Stand. Geänderte Inhalte benötigen eine neue Freigabe; der Planer prüft unmittelbar vor dem Senden erneut."],
      ["Terminierung und Fehlerfälle", "Zeitpunkte, Zeitzonen und Zeitumstellungen werden berücksichtigt. Ein ungewisser Versand wird nicht automatisch wiederholt, sondern lesend abgeglichen oder manuell entschieden."],
      ["Authentifizierung und Isolation", "Lokale Anmeldung und ein separater Supabase-Prototyp sind implementiert. Sitzungssicherheit und getrennte Nutzerzugriffe wurden im lokalen Emulator geprüft; das ersetzt keinen produktiven Mehrbenutzertest."],
    ],
    entscheidung: "Die Oberfläche, fachliche Regeln und Plattformadapter bleiben getrennt. Der Planer hat explizite Zustände; Zugriffsrechte und Freigaben werden vor einer Aktion erneut geprüft. Die Demo übernimmt ausgewählte Regeln, führt aber keine echten Adapter aus.",
    schwierigkeit: "Ein Timeout beweist keinen fehlgeschlagenen Upload. Der Zustand „uncertain“ verhindert eine automatische Wiederholung. Bei mehrdeutigen Uhrzeiten verlangt die Planung eine ausdrückliche Auswahl statt einer stillen Annahme.",
    status: "Lokale Anwendung und SaaS-Prototyp, kein kommerziell freigegebener SaaS. 32 gezielte Tests zu Demo, Planung, Anmeldung und Isolation bestanden. Plattformantworten werden in diesen Tests simuliert. TikTok Direct Post bleibt deaktiviert; Plattformfreigaben und reale Cloud-Bereitstellung sind nicht belegt.",
    demo: "Die bestehende Kampagne ansehen, einen Beitrag bearbeiten und die Freigabe erneuern. Einen Termin prüfen und den Planer fortschalten. Im Szenario „Fehlerfälle“ einen ungewissen Versand untersuchen. Kein Konto wird verbunden und nichts wird veröffentlicht.",
    code: "Quellcode privat — Vorführung mit synthetischen Daten.",
  },
};

/** Statische öffentliche Vitrine; optionaler lokaler Prüfursprung, niemals eine Produktanbindung. */
function demoAdresse(slug: "hermes" | "thot") {
  const wert = slug === "hermes" ? process.env.HERMES_PORTFOLIO_DEMO : process.env.THOT_PORTFOLIO_DEMO;
  const oeffentlich=assetPath(`/demos/${slug}/`);
  if (!wert) return oeffentlich;
  try {
    const url = new URL(wert);
    return url.protocol === "http:" && url.hostname === "127.0.0.1" && !url.username && !url.password && !url.search && !url.hash ? url.href : oeffentlich;
  } catch { return oeffentlich; }
}

export function GeschuetztesProjekt({ slug }: { slug: "hermes" | "thot" }) {
  const projekt = projekte[slug], demo = demoAdresse(slug);
  return <article className={`seitenbreite ${stil.projekt}`}>
    <Link href="/projects/">Alle Projekte</Link>
    <header className={stil.kopf}>
      <p className="kleine-ueberschrift">{projekt.bereich}</p>
      <h1>{projekt.name}</h1><p className={stil.ziel}>{projekt.ziel}</p>
      <p>{projekt.problem}</p>
      <ul className={stil.techniken}>{projekt.technik.map(t => <li key={t}>{t}</li>)}</ul>
      <p className={stil.hinweis}>{projekt.code}</p>
      <nav className={stil.navigation} aria-label="Projektübersicht"><a href="#demo">Demonstration</a><a href="#architektur">Architektur</a><a href="#stand">Stand und Grenzen</a></nav>
    </header>
    <section id="architektur" className={stil.abschnitt}>
      <p className="kleine-ueberschrift">PROBLEM UND LÖSUNG</p><h2>So arbeitet {slug === "hermes" ? "Hermes" : "THOT"}.</h2>
      <p className={stil.architektur}>{projekt.architektur}</p>
      <div className={stil.raster}>{projekt.funktionen.map(([titel, text]) => <section key={titel} className={stil.karte}><h3>{titel}</h3><p>{text}</p></section>)}</div>
    </section>
    <section className={`${stil.abschnitt} ${stil.raster}`}>
      <div><h2>Architekturentscheidung</h2><p>{projekt.entscheidung}</p></div>
      <div><h2>Eine technische Schwierigkeit</h2><p>{projekt.schwierigkeit}</p></div>
    </section>
    <section id="demo" className={stil.abschnitt}>
      <p className="kleine-ueberschrift">BESTEHENDE DEMONSTRATION</p><h2>Den Ablauf selbst nachvollziehen.</h2><p>{projekt.demo}</p>
      <p className={stil.hinweis}>Simulation mit erfundenen Daten. Keine echten Konten, Anbieteraufrufe oder Veröffentlichungen. Die Demo ist vom persönlichen Produkt getrennt.</p>
      <iframe className={stil.demo} src={demo} title={`${projekt.name}: getrennte Simulation`} sandbox="allow-scripts allow-same-origin" referrerPolicy="no-referrer" /><p><a href={demo} target="_blank" rel="noopener noreferrer">Demo in voller Größe öffnen</a></p>
    </section>
    <section id="stand" className={stil.abschnitt}><h2>Stand und Grenzen</h2><p>{projekt.status}</p></section>
    <section className={stil.abschnitt}><h2>Entwicklung und eigener Beitrag</h2><p>Eigenes persönliches Softwareprojekt, mit KI-gestützten Entwicklungswerkzeugen umgesetzt. Der Einblick erläutert die vorhandene Architektur, Integrationsentscheidungen und identifizierbare Tests. Die Portfolio-Simulation ist keine Berufserfahrung oder unbeaufsichtigte Produktfreigabe.</p></section>
  </article>;
}
