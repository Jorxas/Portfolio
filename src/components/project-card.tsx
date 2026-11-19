/* eslint-disable @next/next/no-img-element -- Statischer Export mit lokal gespeicherten Projektgrafiken. */
import Link from "./link";
import { ArrowUpRight, Code2, Play } from "lucide-react";
import type { Project } from "@/data/portfolio-data";
import { assetPath } from "@/lib/asset-path";
import { Einblenden } from "./bewegung";
export function ProjectCard({
  project,
  index = 0,
}: {
  project: Project;
  index?: number;
}) {
  return (
    <Einblenden klasse="projektkarte-rahmen" verzug={(index % 3) * 0.06}>
      <article className="projektkarte">
        <Link
          className={`projektbild ${project.imageObjectFit === "contain" ? "bild-einpassen" : ""}`}
          href={project.demoUrl || project.codeUrl}
          aria-label={`${project.title} erkunden`}
        >
          <img
            src={assetPath(project.image)}
            alt={`Einblick in ${project.title}`}
            loading="lazy"
          />
          <span className="bildpfeil">
            <ArrowUpRight size={22} />
          </span>
        </Link>
        <div className="projektkarten-inhalt">
          <p className="projektbereich">{project.domain || project.category}</p>
          <h3>
            <Link href={project.demoUrl || project.codeUrl}>
              {project.title}
            </Link>
          </h3>
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
            <a
              href={project.codeUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Code: ${project.title}`}
            >
              <Code2 size={16} /> Code <ArrowUpRight size={14} />
            </a>
            {project.demoUrl && (
              <Link
                href={project.demoUrl}
                aria-label={`Demo: ${project.title}`}
              >
                <Play size={14} /> Demo <ArrowUpRight size={14} />
              </Link>
            )}
          </div>
        </div>
      </article>
    </Einblenden>
  );
}
