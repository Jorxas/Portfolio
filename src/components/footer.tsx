import Link from "next/link";
import { GithubIcon, LinkedinIcon, InstagramIcon } from "@/components/icons";
import { personalInfo } from "@/data/portfolio-data";

const navLinks = [
  { href: "/", label: "Startseite" },
  { href: "/about", label: "Über mich" },
  { href: "/projects", label: "Projekte" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Kontakt" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-8">
          <div>
            <h3 className="text-lg font-bold font-[family-name:var(--font-poppins)] mb-2">
              <span className="gradient-text">Portfolio</span>
            </h3>
            <p className="text-muted-foreground text-sm max-w-xs">
              Projekte, Arbeiten und Ideen – klar gestaltet und sauber umgesetzt.
            </p>
          </div>

          <div className="flex gap-3">
            <a
              href={personalInfo.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-lg bg-white/5 border border-border flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent/30 transition-colors"
              aria-label="LinkedIn"
            >
              <LinkedinIcon size={18} />
            </a>
            <a
              href={personalInfo.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-lg bg-white/5 border border-border flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent/30 transition-colors"
              aria-label="GitHub"
            >
              <GithubIcon size={18} />
            </a>
            <a
              href={personalInfo.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-lg bg-white/5 border border-border flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent/30 transition-colors"
              aria-label="Instagram"
            >
              <InstagramIcon size={18} />
            </a>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 border-t border-border">
          <p className="text-muted-foreground text-xs">
            &copy; {new Date().getFullYear()} Jordan Freddy. Alle Rechte vorbehalten.
          </p>
          <div className="flex gap-6">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-muted-foreground text-xs hover:text-foreground transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
