/* eslint-disable @next/next/no-img-element -- Statischer Export mit lokal gespeicherten Projektgrafiken. */
import type { ReactNode } from "react";
import { ArrowUpRight, Code2, Play } from "lucide-react";
import type { Project } from "@/data/portfolio-data";
import { assetPath } from "@/lib/asset-path";
import { Einblenden } from "./bewegung";

/** Externe Ziele und die statischen Demos unter public/ öffnen als normale Links in einem neuen Tab. */
function NeuerTab({
  href,
  children,
  ...rest
}: { href: string; children: ReactNode } & Omit<
  React.ComponentProps<"a">,
  "href" | "target" | "rel"
>) {
  return (
    <a href={assetPath(href)} target="_blank" rel="noopener noreferrer" {...rest}>
      {children}
    </a>
  );
}

export function ProjectCard({
  project,
  index = 0,
}: {
  project: Project;
  index?: number;
}) {
  const bereich = project.domain || project.category;
  // Bild und Titel führen zur Demo, sonst zum Code; bei privatem Quellcode ohne Demo gibt es kein Ziel.
  const ziel = project.demoUrl ?? (project.quellcodeHinweis ? null : project.codeUrl);
  const bildklasse = `projektbild ${project.image ? (project.imageObjectFit === "contain" ? "bild-einpassen" : "") : "ohne-bild"}`;
  const bild = project.image ? (
    <img
      src={assetPath(project.image)}
      alt={`Ansicht von ${project.title}`}
      loading="lazy"
    />
  ) : (
    <span className="bildband">{project.category}</span>
  );
  return (
    <Einblenden klasse="projektkarte-rahmen" verzug={(index % 3) * 0.06}>
      <article className="projektkarte">
        {ziel ? (
          <NeuerTab
            className={bildklasse}
            href={ziel}
            aria-label={`${project.demoUrl ? "Demo" : "Code"}: ${project.title} (neuer Tab)`}
          >
            {bild}
            <span className="bildpfeil">
              <ArrowUpRight size={22} />
            </span>
          </NeuerTab>
        ) : (
          <div className={bildklasse}>{bild}</div>
        )}
        <div className="projektkarten-inhalt">
          <p className="projektbereich">{bereich}</p>
          <h3>{ziel ? <NeuerTab href={ziel}>{project.title}</NeuerTab> : project.title}</h3>
          <p className="projektbeschreibung">{project.description}</p>
          <div className="projekttechniken">
            {project.techStack.slice(0, 4).map((t) => (
              <span key={t}>{t}</span>
            ))}
            {project.techStack.length > 4 && (
              <span>+{project.techStack.length - 4}</span>
            )}
          </div>
          <div className="projektlinks">
            {project.quellcodeHinweis ? (
              <span className="quellcode-hinweis">
                <Code2 size={16} /> {project.quellcodeHinweis}
              </span>
            ) : (
              <NeuerTab href={project.codeUrl} aria-label={`Code: ${project.title}`}>
                <Code2 size={16} /> Code <ArrowUpRight size={14} />
              </NeuerTab>
            )}
            {project.demoUrl && (
              <NeuerTab href={project.demoUrl} aria-label={`Demo: ${project.title}`}>
                <Play size={14} /> Demo <ArrowUpRight size={14} />
              </NeuerTab>
            )}
          </div>
        </div>
      </article>
    </Einblenden>
  );
}
