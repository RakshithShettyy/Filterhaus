"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

export function SectionRule({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  if (reduce) {
    return (
      <div
        aria-hidden="true"
        className={cn("mb-8 h-px w-full bg-gold", className)}
      />
    );
  }

  return (
    <motion.div
      aria-hidden="true"
      className={cn("rule-draw mb-8 h-px w-full origin-left bg-gold", className)}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
    />
  );
}
