"use client";
import Link from "./link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { motion, useScroll } from "framer-motion";
const links = [
  { href: "/", text: "Start" },
  { href: "/projects/", text: "Projekte" },
  { href: "/about/", text: "Über mich" },
];
export function Navbar() {
  const pfad = usePathname();
  const [offen, setzen] = useState(false);
  const { scrollYProgress } = useScroll();
  useEffect(() => {
    const ende = (e: KeyboardEvent) => {
      if (e.key === "Escape") setzen(false);
    };
    window.addEventListener("keydown", ende);
    return () => window.removeEventListener("keydown", ende);
  }, []);
  const aktiv = (href: string) =>
    href === "/" ? pfad === "/" : pfad.startsWith(href.slice(0, -1));
  return (
    <>
      <a className="sprunglink" href="#hauptinhalt">
        Zum Inhalt springen
      </a>
      <header className="seitenkopf">
        <nav className="hauptnavigation" aria-label="Hauptnavigation">
          <Link
            className="wortmarke"
            href="/"
            onClick={() => setzen(false)}
            aria-label="Jordan Freddy – Start"
          >
            <span className="markenpunkt">
              JF<span>.</span>
            </span>
            <span className="markenname">
              Jordan Freddy<small>Software & Daten</small>
            </span>
          </Link>
          <div className="desktoplinks">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                aria-current={aktiv(l.href) ? "page" : undefined}
              >
                {l.text}
              </Link>
            ))}
          </div>
          <Link className="kontaktknopf" href="/contact/">
            Kontakt <ArrowUpRight size={16} />
          </Link>
          <button
            className="menueknopf"
            onClick={() => setzen(!offen)}
            aria-expanded={offen}
            aria-controls="mobile-navigation"
            aria-label={offen ? "Menü schließen" : "Menü öffnen"}
          >
            {offen ? <X /> : <Menu />}
          </button>
          {offen && (
            <div id="mobile-navigation" className="mobiles-menue">
              {[...links, { href: "/contact/", text: "Kontakt" }].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setzen(false)}
                  aria-current={aktiv(l.href) ? "page" : undefined}
                >
                  {l.text}
                  <ArrowUpRight size={18} />
                </Link>
              ))}
            </div>
          )}
        </nav>
      </header>
      <motion.div
        className="lesefortschritt"
        style={{ scaleX: scrollYProgress }}
      />
    </>
  );
}
