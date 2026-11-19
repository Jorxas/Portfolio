"use client";
import { motion, MotionConfig, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
export function Bewegungsrahmen({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
export function Einblenden({
  children,
  klasse = "",
  verzug = 0,
}: {
  children: ReactNode;
  klasse?: string;
  verzug?: number;
}) {
  const reduziert = useReducedMotion();
  return (
    <motion.div
      className={klasse}
      initial={reduziert ? false : { y: 18 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, margin: "-25px" }}
      transition={{ duration: 0.55, delay: verzug }}
    >
      {children}
    </motion.div>
  );
}
