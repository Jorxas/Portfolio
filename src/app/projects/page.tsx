"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { ProjectCard } from "@/components/project-card";
import { projects } from "@/data/portfolio-data";

const categories = ["Alle", "Web App", "Website", "Data Science"];

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("Alle");
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = projects.filter((p) => {
    const matchCategory = activeCategory === "Alle" || p.category === activeCategory;
    const q = searchTerm.toLowerCase();
    const matchSearch =
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.techStack.some((t) => t.toLowerCase().includes(q));
    return matchCategory && matchSearch;
  });

  return (
    <div className="pt-24 pb-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Meine Projekte"
          subtitle="Studien- und Praxisprojekte in der Softwareentwicklung."
        />

        {/* Filters */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-10">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeCategory === cat
                    ? "bg-accent text-white"
                    : "bg-white/5 border border-border text-muted-foreground hover:text-foreground hover:border-accent/30"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Projekte suchen..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent/50 transition-colors"
            />
          </div>
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h3 className="text-xl font-semibold mb-3">Keine Projekte gefunden</h3>
            <p className="text-muted-foreground mb-6">
              Suchkriterien anpassen oder alle Projekte anzeigen.
            </p>
            <button
              onClick={() => {
                setActiveCategory("Alle");
                setSearchTerm("");
              }}
              className="px-6 py-2.5 rounded-lg bg-accent text-white font-medium hover:bg-accent/80 transition-colors"
            >
              Alle Projekte anzeigen
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
