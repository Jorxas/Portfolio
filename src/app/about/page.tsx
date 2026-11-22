import type { Metadata } from "next";
import Link from "@/components/link";
import { ArrowUpRight } from "lucide-react";
import {
  education,
  languages,
  certifications,
  experience,
} from "@/data/portfolio-data";
import { Einblenden } from "@/components/bewegung";
import { assetPath } from "@/lib/asset-path";
export const metadata: Metadata = {
  title: "Über mich",
  description:
    "Jordan Freddy: Informatikstudent an der THM Gießen, Softwareentwicklung und Datenanalyse.",
};
const felder = [
  {
    titel: "Software & Systeme",
    text: "Weboberflächen, Schnittstellen und verteilte Anwendungen.",
    technik: "Java · TypeScript · Angular · SQL · MQTT",
    href: "/demos/quiz/",
    beleg: "Multiplayer-Quiz ausprobieren",
  },
  {
    titel: "Daten & KI",
    text: "Daten aufbereiten, Modelle auswerten und Ergebnisse erklären.",
    technik: "Python · PyTorch · Pandas · Power BI",
    href: "https://github.com/Jorxas/cnn-clothing-classification",
    beleg: "CNN-Projekt auf GitHub",
  },
  {
    titel: "Technische Abläufe",
    text: "Zustände, Automatisierung und räumliche Daten verständlich verbinden.",
    technik: "C++ · Node-RED · QGIS · Git",
    href: "https://github.com/Jorxas/wartungskarte-qgis",
    beleg: "Wartungskarte auf GitHub",
  },
];
export default function UeberMich() {
  return (
    <div className="seitenbreite">
      <Einblenden klasse="seiten-intro ueber-intro">
        <div>
          <p className="kleine-ueberschrift">ÜBER MICH / JORDAN FREDDY</p>
          <h1>
            Neugierig bleiben.
            <br />
            <span>Weiterdenken.</span>
          </h1>
          <p>
            Ich studiere Informatik an der Technischen Hochschule Mittelhessen
            in Gießen. Mich begeistert, wenn aus einer abstrakten Idee eine
            Anwendung wird, die sich erklären und ausprobieren lässt.
          </p>
        </div>
        <div className="profilzeichen klein">
          <span>JF.</span>
          <p>CODE. DATEN. NEUGIER.</p>
          <div>
            Informatik · THM Gießen
            <br />
            Bachelorstudium seit 2024
          </div>
        </div>
      </Einblenden>
      <section className="abschnitt">
        <div className="abschnittskopf">
          <div>
            <p className="kleine-ueberschrift">01 / SCHWERPUNKTE</p>
            <h2>
              Fähigkeiten zeigen sich
              <br />
              <span>am konkreten Projekt.</span>
            </h2>
          </div>
          <p>
            Die folgenden Technologien kommen in meinen Studien- und
            Lernprojekten vor. Die verlinkten Beispiele zeigen, wo ich sie
            eingesetzt habe.
          </p>
        </div>
        <div className="methodengitter kenntnisse">
          {felder.map((f) => (
            <Einblenden key={f.titel}>
              <h3>{f.titel}</h3>
              <p>{f.text}</p>
              <p className="technikzeile">{f.technik}</p>
              <a
                className="textlink"
                href={assetPath(f.href)}
                target="_blank"
                rel="noopener noreferrer"
              >
                {f.beleg}
                <ArrowUpRight size={16} />
              </a>
            </Einblenden>
          ))}
        </div>
      </section>
      <section className="abschnitt lebenslauf">
        <div>
          <p className="kleine-ueberschrift">02 / MEIN WEG</p>
          <h2>
            Studium &<br />
            <span>Erfahrung.</span>
          </h2>
          <p className="absatz-gross">
            Ich suche eine Werkstudentenstelle, in der ich technische Aufgaben
            im Team bearbeiten und mein Studium durch Praxis ergänzen kann.
          </p>
          <Link className="textlink" href="/contact/">
            Kontakt aufnehmen <ArrowUpRight size={17} />
          </Link>
        </div>
        <div>
          <h3 className="laufbahntitel">Studium</h3>
          {education.map((e) => (
            <div className="laufbahneintrag" key={e.organization}>
              <span>{e.period}</span>
              <h3>{e.title}</h3>
              <p>{e.organization}</p>
              {e.description && <p>{e.description}</p>}
            </div>
          ))}
          <h3 className="laufbahntitel">Berufliche Erfahrung</h3>
          {experience.slice(1).map((e) => (
            <div className="laufbahneintrag" key={e.title}>
              <span>{e.period}</span>
              <h3>{e.title}</h3>
              <p>{e.description}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="abschnitt weiterlernen">
        <div>
          <p className="kleine-ueberschrift">03 / WEITERLERNEN</p>
          <h2>Immer in Bewegung.</h2>
          <div className="zertifikate">
            {certifications.map((c) => (
              <a
                href={c.url}
                key={c.abbr}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>{c.abbr}</span>
                <div>
                  <strong>{c.title}</strong>
                  <p>
                    {c.provider} · {c.date.replace("Abgeschlossen: ", "")}
                  </p>
                </div>
                <ArrowUpRight size={18} />
              </a>
            ))}
          </div>
        </div>
        <div className="sprachen">
          <h3>Sprachen</h3>
          {languages.map((l) => (
            <div key={l.name}>
              <strong>{l.name}</strong>
              <span>
                {l.level}
                {l.name === "Deutsch" ? " · DSH 3" : ""}
              </span>
            </div>
          ))}
          <p>
            Abseits des Codes: Musik, Klavier, Sport und neue Geschichten in
            Filmen und Anime.
          </p>
        </div>
      </section>
    </div>
  );
}
