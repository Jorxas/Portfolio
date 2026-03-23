"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function SectionHeading({ title, subtitle, className = "" }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className={`text-center mb-14 ${className}`}
    >
      <h2 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-poppins)] mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-muted-foreground max-w-xl mx-auto text-base leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
