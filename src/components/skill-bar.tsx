"use client";

import { motion } from "framer-motion";
import type { Skill } from "@/data/portfolio-data";

interface SkillBarProps {
  skill: Skill;
  index: number;
}

export function SkillBar({ skill, index }: SkillBarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      className="mb-4"
    >
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm font-medium">{skill.name}</span>
        <span className="text-xs text-muted-foreground">{skill.percentage}%</span>
      </div>
      <div className="skill-bar-bg">
        <motion.div
          className="skill-bar-fill"
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.percentage}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.2 + index * 0.07, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  );
}
