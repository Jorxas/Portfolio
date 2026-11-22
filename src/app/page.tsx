import Link from "@/components/link";
import {
  ArrowDown,
  ArrowUpRight,
  Braces,
  Database,
  Workflow,
} from "lucide-react";
import { projects } from "@/data/portfolio-data";
import { ProjectCard } from "@/components/project-card";
import { Einblenden } from "@/components/bewegung";
const auswahl = [
  "hermes",
  "thot",
  "horror-studio-3d",
  "pps",
  "stellensuche-jobpilot",
  "quizgame",
].map((id) => projects.find((p) => p.id === id)!);
export default function Startseite() {
  return (
    <>
      <section className="startheld seitenbreite">
        <Einblenden klasse="held-text">
          <p className="kleine-ueberschrift">
            <span className="verfuegbar-punkt" /> JORDAN FREDDY /
            INFORMATIKSTUDENT
          </p>
          <h1>
            Software
            <br />
            entwickeln.
            <br />
            <span>Daten verstehen.</span>
          </h1>
          <p className="held-einleitung">
            Ich verbinde Code, Daten und die Frage dahinter. Informatikstudent
            an der THM in Gießen – auf der Suche nach einer Werkstudentenstelle
            in der IT.
          </p>
          <div className="held-aktionen">
            <Link href="/projects/" className="knopf knopf-blau">
              Projekte entdecken <ArrowUpRight size={19} />
            </Link>
            <Link href="/about/" className="textlink">
              Über mich <ArrowUpRight size={17} />
            </Link>
          </div>
          <div className="held-fuss">
            <span>Software Engineering · Datenanalyse</span>
            <a href="#arbeiten" aria-label="Zu den ausgewählten Arbeiten">
              <ArrowDown size={18} />
            </a>
          </div>
        </Einblenden>
      </section>
      <div className="fokusleiste">
        <div className="seitenbreite">
          <span>PROJEKTBEREICHE</span>
          <p>
            Software & Systeme <b>✳</b> Daten & KI <b>✳</b> Automatisierung &
            GIS
          </p>
        </div>
      </div>
      <section id="arbeiten" className="abschnitt seitenbreite">
        <Einblenden klasse="abschnittskopf">
          <div>
            <p className="kleine-ueberschrift">01 / AUSGEWÄHLTE ARBEITEN</p>
            <h2>
              Projekte aus
              <br />
              <span>Studium und Eigeninitiative.</span>
            </h2>
          </div>
          <p>
            Eine Auswahl meiner Arbeiten. Wo eine Demo existiert, öffnet sie
            sich direkt in einem neuen Tab; sonst führt die Karte zum
            Quellcode.
          </p>
        </Einblenden>
        <div className="projektgitter">
          {auswahl.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>
        <div className="abschnittsabschluss">
          <p>
            Mehr technische Tiefe? Weitere Arbeiten sind nach Themen filterbar.
          </p>
          <Link className="textlink" href="/projects/">
            Zur Projektübersicht <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>
      <section className="arbeitsweise">
        <div className="seitenbreite abschnitt">
          <Einblenden klasse="abschnittskopf">
            <div>
              <p className="kleine-ueberschrift">02 / MEIN ANSATZ</p>
              <h2>
                Verstehen. Bauen.
                <br />
                <span>Nachvollziehbar machen.</span>
              </h2>
            </div>
            <p>
              Mich interessiert, wie aus einzelnen Komponenten eine
              verständliche Lösung wird. Diese drei Perspektiven begleiten meine
              Lernprojekte.
            </p>
          </Einblenden>
          <div className="methodengitter">
            {[
              {
                icon: Braces,
                titel: "Software mit Struktur",
                text: "Oberflächen, APIs und Datenmodelle zusammendenken. Kleine Funktionen, klare Zuständigkeiten und nachvollziehbarer Code.",
              },
              {
                icon: Database,
                titel: "Daten mit Kontext",
                text: "Datenqualität prüfen, Ergebnisse auswerten und zeigen, was eine Kennzahl aussagt – und was sie offenlässt.",
              },
              {
                icon: Workflow,
                titel: "Abläufe sichtbar machen",
                text: "Zustände, Schnittstellen und Fehlerfälle nachvollziehbar darstellen.",
              },
            ].map((m, i) => (
              <Einblenden key={m.titel} verzug={i * 0.08}>
                <span className="methodennummer">0{i + 1}</span>
                <m.icon size={27} strokeWidth={1.5} />
                <h3>{m.titel}</h3>
                <p>{m.text}</p>
              </Einblenden>
            ))}
          </div>
        </div>
      </section>
      <section className="profilvorschau seitenbreite abschnitt">
        <Einblenden klasse="profilzeichen">
          <span>JF.</span>
          <p>NEUGIER ALS ANTRIEB.</p>
          <div>
            Gießen, Deutschland
            <br />
            THM · B.Sc. Informatik, laufend
          </div>
        </Einblenden>
        <Einblenden>
          <p className="kleine-ueberschrift">03 / DER MENSCH HINTER DEM CODE</p>
          <h2>
            Ich lerne am besten,
            <br />
            <span>wenn ich etwas baue.</span>
          </h2>
          <p className="absatz-gross">
            Im Studium beschäftige ich mich mit Softwareentwicklung, Datenbanken
            und verteilten Systemen. In Projekten bringe ich diese Themen
            zusammen – vom Multiplayer-Quiz bis zur Auswertung eines neuronalen
            Netzes.
          </p>
          <Link className="textlink" href="/about/">
            Mehr über meinen Weg <ArrowUpRight size={18} />
          </Link>
        </Einblenden>
      </section>
    </>
  );
}
