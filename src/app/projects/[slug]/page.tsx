import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowDown, ArrowLeft, CheckCircle2, Layers3 } from "lucide-react";
import { projektstudien } from "@/data/projektstudien";
import { ProjektDemo } from "@/components/projektdemos/projekt-demo";
import { GitHubVerweis } from "@/components/projektdemos/github-verweis";
import type { CSSProperties } from "react";
import "./studie.css";

export const dynamicParams = false;
export function generateStaticParams() {
  return projektstudien.map((projekt) => ({ slug: projekt.slug }));
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const projekt = projektstudien.find((p) => p.slug === slug);
  return { title: projekt?.titel, description: projekt?.problem };
}
export default async function Projektseite({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const projekt = projektstudien.find((p) => p.slug === slug);
  if (!projekt) notFound();
  return (
    <article className="projektstudie" data-projekt={projekt.id} style={{ "--studie-farbe": projekt.farbe } as CSSProperties}>
      <div className="studie-inhalt">
        <Link href="/projects" className="studie-zurueck"><ArrowLeft size={16} /> Alle Projekte</Link>
        <header className="studie-kopf">
          <div>
            <p className="studie-marke"><span /> {projekt.bereich} <span className="studie-nummer">{projekt.id}</span></p>
            <h1>{projekt.kopfzeile}</h1>
            <p className="studie-einleitung">{projekt.problem}</p>
            <div className="studie-technologien">{projekt.technologien.map((t) => <span key={t}>{t}</span>)}</div>
            <a className="studie-hauptknopf" href="#ausprobieren">Projekt erkunden <ArrowDown size={16} /></a>
          </div>
          <aside className="studie-beleg">
            <Layers3 size={28} aria-hidden="true" />
            <p className="studie-kleinschrift">DAS PROJEKT IN ZAHLEN</p>
            {projekt.kennzahlen.map((k) => <div className="studie-kennzahl" key={k.text}><strong>{k.wert}</strong><span>{k.text}</span></div>)}
            <p className="studie-belegfuss"><CheckCircle2 size={15} /> Ergebnisse aus dem lokalen Lernprojekt</p>
          </aside>
        </header>

        <nav className="studie-kapitelnavigation" aria-label="Auf dieser Projektseite">
          <a href="#ausprobieren"><b>01</b> Ausprobieren</a>
          <a href="#vorgehen"><b>02</b> Vorgehen</a>
          <a href="#ergebnis"><b>03</b> Ergebnis & Grenzen</a>
        </nav>

        <section id="ausprobieren" className="studie-abschnitt">
          <div className="studie-abschnittskopf"><div><p className="studie-kleinschrift">01 / IM BROWSER VERSTEHEN</p><h2>{projekt.titel}</h2></div><span className="studie-demomarke">Frontend-Demo</span></div>
          <div className="studie-simulationshinweis" role="note"><strong>Backend simuliert.</strong> Synthetische Beispieldaten. Alle Interaktionen bleiben im Browser; keine Verbindung zu Datenbank, KI-Dienst, Hardware oder ERP. Änderungen werden beim Neuladen zurückgesetzt.</div>
          <div className="demo-oberflaeche"><ProjektDemo projekt={projekt.id} /></div>
          <p className="studie-originalhinweis"><strong>Einordnung:</strong> {projekt.original} Diese Webansicht erklärt das Projekt; sie ersetzt keinen nativen Produktlauf.</p>
        </section>

        <section id="vorgehen" className="studie-abschnitt studie-vorgehen">
          <div><p className="studie-kleinschrift">02 / VOM PROBLEM ZUR LÖSUNG</p><h2>So ist die Lösung aufgebaut.</h2><p>{projekt.nutzen}</p></div>
          <ol>{projekt.vorgehen.map((schritt, i) => <li key={schritt.titel}><span>{String(i + 1).padStart(2, "0")}</span><div><h3>{schritt.titel}</h3><p>{schritt.text}</p></div></li>)}</ol>
        </section>

        <section id="ergebnis" className="studie-ergebnis">
          <div><p className="studie-kleinschrift">03 / WAS TATSÄCHLICH GEPRÜFT WURDE</p><h2>Ein Ergebnis mit klaren Grenzen.</h2><p>{projekt.ergebnis}</p></div>
          <div className="studie-grenzen"><h3>Was daraus nicht folgt</h3><p>{projekt.grenze}</p></div>
        </section>
        <footer className="studie-abschluss"><div><strong>Quellcode & technische Details</strong><p>Der Originalcode wird in einem eigenen Repository schrittweise veröffentlicht. Diese zusätzliche Browser-Demo ist als Simulation gekennzeichnet.</p></div><GitHubVerweis projekt={projekt.id} repository={projekt.repository} /></footer>
        <p className="studie-herkunft">Kleines Lernprojekt mit KI-Unterstützung entwickelt und geprüft. Eigene synthetische Daten; keine Unternehmensdaten oder behauptete Berufserfahrung.</p>
      </div>
    </article>
  );
}
