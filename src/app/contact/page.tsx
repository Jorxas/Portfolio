"use client";
import { useState } from "react";
import {
  ArrowUpRight,
  Check,
  Copy,
  Code2 as Github,
  Network as Linkedin,
  Mail,
  MapPin,
} from "lucide-react";
import { personalInfo } from "@/data/portfolio-data";
import { Einblenden } from "@/components/bewegung";
export default function Kontakt() {
  const [kopiert, setzen] = useState(false),
    [fehler, setzenFehler] = useState(false);
  async function kopieren() {
    try {
      await navigator.clipboard.writeText(personalInfo.email);
      setzen(true);
      setzenFehler(false);
    } catch {
      setzenFehler(true);
    }
  }
  return (
    <div className="seitenbreite kontaktseite">
      <Einblenden klasse="seiten-intro">
        <p className="kleine-ueberschrift">KONTAKT / LASSEN SIE UNS SPRECHEN</p>
        <h1>
          Ein Projekt beginnt
          <br />
          <span>mit einem Hallo.</span>
        </h1>
        <p>
          Sie suchen Unterstützung in der Softwareentwicklung oder Datenanalyse?
          Ich freue mich über eine Nachricht und die Möglichkeit, mein Wissen
          als Werkstudent einzubringen.
        </p>
      </Einblenden>
      <Einblenden klasse="kontaktflaeche">
        <div>
          <Mail size={29} strokeWidth={1.5} />
          <p className="kleine-ueberschrift">DIREKT PER E-MAIL</p>
          <a className="kontaktmail" href={`mailto:${personalInfo.email}`}>
            {personalInfo.email}
            <ArrowUpRight size={24} />
          </a>
          <div className="held-aktionen">
            <a
              className="knopf knopf-blau"
              href={`mailto:${personalInfo.email}?subject=Kontakt%20%C3%BCber%20das%20Portfolio`}
            >
              Nachricht schreiben
              <ArrowUpRight size={17} />
            </a>
            <button className="textlink" onClick={kopieren}>
              {kopiert ? <Check size={17} /> : <Copy size={17} />}{" "}
              {kopiert ? "E-Mail kopiert" : "E-Mail kopieren"}
            </button>
          </div>
          <p className="kopierstatus" aria-live="polite">
            {fehler
              ? "Bitte markieren und kopieren Sie die E-Mail-Adresse oben."
              : kopiert
                ? "Die Adresse liegt in Ihrer Zwischenablage."
                : "Der Link öffnet Ihr E-Mail-Programm."}
          </p>
        </div>
        <aside>
          <div>
            <MapPin size={20} />
            <p>
              <strong>Gießen, Hessen</strong>
              <span>Informatikstudent an der THM</span>
            </p>
          </div>
          <a
            href={personalInfo.social.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github size={21} />
            <span>Code auf GitHub</span>
            <ArrowUpRight size={17} />
          </a>
          <a
            href={personalInfo.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin size={21} />
            <span>Vernetzen auf LinkedIn</span>
            <ArrowUpRight size={17} />
          </a>
          <a href={`tel:${personalInfo.phone.replace(/ /g, "")}`}>
            <span>Telefon</span>
            <span>{personalInfo.phone}</span>
            <ArrowUpRight size={17} />
          </a>
        </aside>
      </Einblenden>
      <p className="kontakthinweis">
        Bitte nennen Sie die Aufgabe, den Standort und den möglichen Einstieg.
        So kann ich gezielt auf Ihre Nachricht eingehen.
      </p>
    </div>
  );
}
