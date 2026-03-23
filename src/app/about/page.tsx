"use client";

import { motion } from "framer-motion";
import {
  Gamepad2, Film, Music, Dumbbell, Piano, Code,
  ExternalLink, Award,
} from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { SkillBar } from "@/components/skill-bar";
import {
  personalInfo, skills, skillCategories,
  hobbies, certifications, languages,
  experience, education, furtherTraining,
} from "@/data/portfolio-data";

const iconMap: Record<string, React.ReactNode> = {
  Gamepad2: <Gamepad2 size={22} />,
  Film: <Film size={22} />,
  Music: <Music size={22} />,
  Dumbbell: <Dumbbell size={22} />,
  Piano: <Piano size={22} />,
  Code: <Code size={22} />,
};

const card = "rounded-2xl border border-border bg-card p-6 card-hover";

export default function AboutPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <SectionHeading title="Über mich" />

        {/* Bio */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto mb-20"
        >
          <h2 className="text-2xl font-semibold font-[family-name:var(--font-poppins)] mb-2">
            {personalInfo.name}
          </h2>
          <p className="text-accent font-medium mb-6">{personalInfo.subtitle}</p>

          <div className="space-y-4 text-muted-foreground leading-relaxed">
            {personalInfo.bio.map((paragraph, i) => (
              <p key={i} dangerouslySetInnerHTML={{ __html: paragraph }} />
            ))}
          </div>

          {/* Further training */}
          <div className="mt-8 p-4 rounded-xl bg-accent/5 border border-accent/10">
            <p className="text-sm font-medium text-accent mb-2">Aktuelle Weiterbildung</p>
            <div className="flex flex-wrap gap-2">
              {furtherTraining.map((t) => (
                <span key={t} className="tech-badge">{t}</span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Skills */}
        <SectionHeading title="Fähigkeiten" subtitle="Mein technischer Stack im Überblick." />

        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* Skill bars */}
          <div>
            {skills.map((skill, i) => (
              <SkillBar key={skill.name} skill={skill} index={i} />
            ))}
          </div>

          {/* Skill categories */}
          <div className="space-y-6">
            {skillCategories.map((cat, i) => (
              <motion.div
                key={cat.category}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className={card}
              >
                <h4 className="font-semibold mb-3 text-sm uppercase tracking-wide text-accent">
                  {cat.category}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {cat.items.map((item) => (
                    <span key={item} className="tech-badge">{item}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Hobbies */}
        <SectionHeading title="Hobbies & Interessen" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-20">
          {hobbies.map((hobby, i) => (
            <motion.div
              key={hobby.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className={card}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                  {iconMap[hobby.icon]}
                </div>
                <div>
                  <h4 className="font-semibold text-sm">{hobby.title}</h4>
                  <p className="text-xs text-muted-foreground">{hobby.subtitle}</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{hobby.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Certifications */}
        <SectionHeading title="Zertifizierungen" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-20">
          {certifications.map((cert, i) => (
            <motion.a
              key={cert.title}
              href={cert.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className={`${card} group cursor-pointer`}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center text-accent font-bold text-xs">
                  {cert.abbr}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-sm truncate group-hover:text-accent transition-colors">
                    {cert.title}
                  </h4>
                  <p className="text-xs text-muted-foreground">{cert.provider}</p>
                </div>
                <ExternalLink size={14} className="text-muted-foreground shrink-0 group-hover:text-accent transition-colors" />
              </div>
              <p className="text-xs text-muted-foreground mb-1">{cert.date}</p>
              <p className="text-sm text-muted-foreground">{cert.description}</p>
            </motion.a>
          ))}
        </div>

        {/* Languages */}
        <SectionHeading title="Sprachkenntnisse" />
        <div className="grid sm:grid-cols-3 gap-5 mb-20">
          {languages.map((lang, i) => (
            <motion.div
              key={lang.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className={card}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{lang.flag}</span>
                <div>
                  <h4 className="font-semibold text-sm">{lang.name}</h4>
                  <p className="text-xs text-muted-foreground">{lang.level}</p>
                </div>
              </div>
              <div className="flex gap-1.5 mb-3">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <div key={idx} className={`dot ${idx < lang.dots ? "filled" : ""}`} />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">{lang.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Experience & Education */}
        <SectionHeading title="Erfahrung & Ausbildung" />
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Experience */}
          <div>
            <h3 className="text-xl font-semibold font-[family-name:var(--font-poppins)] mb-6">
              Berufserfahrung
            </h3>
            <div className="space-y-0 relative before:absolute before:left-[7px] before:top-2 before:bottom-2 before:w-0.5 before:bg-accent/30">
              {experience.map((item, i) => (
                <motion.div
                  key={item.title + item.period}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="pl-8 pb-8 relative"
                >
                  <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full bg-accent border-2 border-background" />
                  <h4 className="font-semibold text-sm mb-1">{item.title}</h4>
                  <p className="text-xs text-accent mb-2">{item.period}</p>
                  {item.description && (
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <h3 className="text-xl font-semibold font-[family-name:var(--font-poppins)] mb-6">
              Bildung
            </h3>
            <div className="space-y-0 relative before:absolute before:left-[7px] before:top-2 before:bottom-2 before:w-0.5 before:bg-accent/30">
              {education.map((item, i) => (
                <motion.div
                  key={item.title + item.period}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="pl-8 pb-8 relative"
                >
                  <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full bg-accent border-2 border-background" />
                  <h4 className="font-semibold text-sm mb-1">{item.title}</h4>
                  {item.organization && (
                    <p className="text-xs text-accent mb-1">{item.organization}</p>
                  )}
                  <p className="text-xs text-muted-foreground mb-2">{item.period}</p>
                  {item.description && (
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
