"use client";

import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { motion } from "framer-motion";
import type { Project } from "@/data/portfolio-data";
import { assetPath } from "@/lib/asset-path";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group"
    >
      <div className="h-full rounded-2xl border border-border bg-card overflow-hidden card-hover">
        <div
          className={`relative h-48 overflow-hidden ${
            project.imageObjectFit === "contain" ? "bg-white" : ""
          }`}
        >
          <Image
            src={assetPath(project.image)}
            alt={project.title}
            fill
            className={`transition-transform duration-500 group-hover:scale-105 ${
              project.imageObjectFit === "contain"
                ? "object-contain object-center p-3"
                : "object-cover"
            }`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        <div className="p-5 flex flex-col flex-1">
          <h3 className="text-lg font-semibold mb-2 font-[family-name:var(--font-poppins)]">
            {project.title}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.techStack.map((tech) => (
              <span key={tech} className="tech-badge">
                {tech}
              </span>
            ))}
          </div>

          <div className="flex gap-2 mt-auto">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium bg-accent text-white hover:bg-accent/80 transition-colors"
              >
                <ExternalLink size={14} />
                Live
              </a>
            )}
            {project.codeUrl !== "#" && (
              <a
                href={project.codeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium border border-border text-muted-foreground hover:text-foreground hover:border-accent/30 transition-colors"
              >
                <GithubIcon size={14} />
                Code
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
