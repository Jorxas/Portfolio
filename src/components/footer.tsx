import Link from "./link";
import {
  ArrowUpRight,
  Code2 as Github,
  Network as Linkedin,
} from "lucide-react";
import { personalInfo } from "@/data/portfolio-data";
export function Footer() {
  return (
    <footer className="seitenfuss">
      <div className="seitenbreite">
        <div className="fuss-oben">
          <div>
            <p className="kleine-ueberschrift">DER NÄCHSTE SCHRITT</p>
            <h2>
              Gute Ideen brauchen
              <br />
              ein gutes Gespräch<span>.</span>
            </h2>
          </div>
          <Link className="knopf knopf-weiss" href="/contact/">
            Schreiben wir uns <ArrowUpRight size={19} />
          </Link>
        </div>
        <div className="fuss-unten">
          <span>© {new Date().getFullYear()} Jordan Freddy · Gießen</span>
          <div>
            <Link href="/about/">Über mich</Link>
            <Link href="/projects/">Projekte</Link>
            <a
              href={personalInfo.social.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <Github size={19} />
            </a>
            <a
              href={personalInfo.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <Linkedin size={19} />
            </a>
          </div>
          <span>Mit Neugier entwickelt.</span>
        </div>
      </div>
    </footer>
  );
}
