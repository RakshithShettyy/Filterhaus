"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

type ImageRevealProps = {
  children: React.ReactNode;
  className?: string;
};

export function ImageReveal({ children, className }: ImageRevealProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -5% 0px" });

  if (reduce) {
    return <div className={cn("overflow-hidden", className)}>{children}</div>;
  }

  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      <motion.div
        className="motion-reveal relative h-full w-full"
        initial={false}
        animate={
          inView
            ? { clipPath: "inset(0 0 0% 0)", scale: 1 }
            : { clipPath: "inset(0 0 100% 0)", scale: 1.06 }
        }
        transition={{ duration: 1.05, ease: [0.77, 0, 0.18, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}
