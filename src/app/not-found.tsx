import Link from "@/components/link";
import { ArrowUpRight } from "lucide-react";
export default function NichtGefunden() {
  return (
    <section className="seitenbreite abschnitt seiten-intro">
      <p className="kleine-ueberschrift">404 / SEITE NICHT GEFUNDEN</p>
      <h1>
        Hier fehlt eine
        <br />
        <span>Verbindung.</span>
      </h1>
      <p>
        Diese Seite gibt es nicht oder sie wurde verschoben. Die
        Projektübersicht ist ein guter Ausgangspunkt.
      </p>
      <div className="held-aktionen">
        <Link href="/projects/" className="knopf knopf-blau">
          Projekte entdecken <ArrowUpRight size={18} />
        </Link>
        <Link href="/" className="textlink">
          Zur Startseite
        </Link>
      </div>
    </section>
  );
}
