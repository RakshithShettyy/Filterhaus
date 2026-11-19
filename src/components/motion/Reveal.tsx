"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

type Tag = "div" | "li" | "article";

const motionTags = {
  div: motion.div,
  li: motion.li,
  article: motion.article,
} as const;

const plainTags = {
  div: "div",
  li: "li",
  article: "article",
} as const;

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: Tag;
};

export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
}: RevealProps) {
  const reduce = useReducedMotion();
  if (reduce) {
    const Tag = plainTags[as];
    return <Tag className={className}>{children}</Tag>;
  }

  const MotionTag = motionTags[as];
  return (
    <MotionTag
      className={cn("motion-reveal", className)}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </MotionTag>
  );
}
