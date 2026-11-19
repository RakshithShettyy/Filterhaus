"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

type MagneticProps = {
  children: React.ReactNode;
  className?: string;
};

export function Magnetic({ children, className }: MagneticProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    const move = (event: PointerEvent) => {
      const bounds = el.getBoundingClientRect();
      const x = (event.clientX - (bounds.left + bounds.width / 2)) * 0.18;
      const y = (event.clientY - (bounds.top + bounds.height / 2)) * 0.22;
      el.dataset.x = x.toFixed(2);
      el.dataset.y = y.toFixed(2);
      const scale = el.dataset.pressed === "true" ? 0.98 : 1;
      el.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) scale(${scale})`;
    };
    const down = () => {
      el.dataset.pressed = "true";
      const x = el.dataset.x ?? "0";
      const y = el.dataset.y ?? "0";
      el.style.transform = `translate3d(${x}px, ${y}px, 0) scale(0.98)`;
    };
    const reset = () => {
      el.dataset.pressed = "false";
      el.dataset.x = "0";
      el.dataset.y = "0";
      el.style.transform = "translate3d(0, 0, 0)";
    };

    el.addEventListener("pointermove", move);
    el.addEventListener("pointerdown", down);
    el.addEventListener("pointerleave", reset);
    el.addEventListener("pointerup", reset);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerdown", down);
      el.removeEventListener("pointerleave", reset);
      el.removeEventListener("pointerup", reset);
    };
  }, []);

  return (
    <span ref={ref} className={cn("inline-flex", className)}>
      {children}
    </span>
  );
}
