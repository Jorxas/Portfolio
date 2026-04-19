"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowDown, ArrowRight, ExternalLink } from "lucide-react";
import { personalInfo, projects, skills } from "@/data/portfolio-data";
import { SectionHeading } from "@/components/section-heading";
import { ProjectCard } from "@/components/project-card";

const featuredProjects = projects.slice(0, 3);

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-background relative flex items-center justify-center min-h-screen overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(99,102,241,0.08)_0%,_transparent_65%)]" />

        {/* Floating orbs */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-accent/5 blur-3xl animate-float" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-purple-500/5 blur-3xl animate-float" style={{ animationDelay: "3s" }} />

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-accent text-sm font-medium tracking-widest uppercase mb-6">
              Willkommen
            </p>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold font-[family-name:var(--font-poppins)] leading-tight mb-6">
              {personalInfo.name.split(" ").slice(0, 2).join(" ")}{" "}
              <span className="gradient-text">
                {personalInfo.name.split(" ").slice(2).join(" ")}
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              {personalInfo.title} – {personalInfo.location}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-accent text-white font-semibold hover:bg-accent/80 transition-all shadow-lg shadow-accent/25"
              >
                Projekte ansehen
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl border border-border text-foreground font-semibold hover:bg-white/5 transition-all"
              >
                Kontakt aufnehmen
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="mt-16"
          >
            <button
              onClick={() =>
                document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
              }
              className="p-3 rounded-full border border-border text-muted-foreground hover:text-accent hover:border-accent/30 transition-colors animate-bounce"
              aria-label="Nach unten scrollen"
            >
              <ArrowDown size={20} />
            </button>
          </motion.div>
        </div>
      </section>

      {/* About preview */}
      <section id="about" className="py-24 bg-muted/30">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-poppins)] mb-6">
                Über mich
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Informatikstudent (THM Gießen) mit Schwerpunkt Softwareentwicklung.
                Interesse an praktischer Umsetzung von IT-Lösungen und Arbeit in dynamischen Teams.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Aktuell vertiefe ich mich in TypeScript, Next.js, Python und die Integration
                von KI-Technologien in Web-Anwendungen.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-accent hover:underline font-medium"
              >
                Mehr über mich
                <ArrowRight size={16} />
              </Link>
            </motion.div>

            {/* Skills preview */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4"
            >
              {skills.slice(0, 5).map((skill, i) => (
                <div key={skill.name}>
                  <div className="flex justify-between mb-1.5">
                    <span className="text-sm font-medium">{skill.name}</span>
                    <span className="text-xs text-muted-foreground">{skill.percentage}%</span>
                  </div>
                  <div className="skill-bar-bg">
                    <motion.div
                      className="skill-bar-fill"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.percentage}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: 0.3 + i * 0.1 }}
                    />
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured projects */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Ausgewählte Projekte"
            subtitle="Eine Auswahl aktueller Arbeiten und Studienprojekte aus der Softwareentwicklung."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center mt-12"
          >
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border text-muted-foreground hover:text-foreground hover:border-accent/30 font-medium transition-colors"
            >
              Alle Projekte ansehen
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-muted/40">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-poppins)] mb-4">
              Lass uns zusammenarbeiten
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Du planst ein Projekt? Ich unterstütze gern bei Konzeption und Umsetzung.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-accent text-white font-semibold hover:bg-accent/80 transition-all shadow-lg shadow-accent/25"
            >
              Kontakt aufnehmen
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
