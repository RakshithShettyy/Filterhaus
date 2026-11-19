"use client";

import { useEffect, useRef } from "react";
import { site } from "@/data/site";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!site.features.customCursor) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cursor = cursorRef.current;
    if (!fine || reduce || !cursor) return;

    const root = document.documentElement;
    root.classList.add("has-cursor");

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let cx = x;
    let cy = y;
    let mode = "";
    let hidden = true;
    let frame = 0;

    const paint = () => {
      cx += (x - cx) * 0.22;
      cy += (y - cy) * 0.22;
      cursor.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      cursor.dataset.mode = mode;
      cursor.dataset.hidden = hidden ? "true" : "false";
      cursor.dataset.active = hidden ? "false" : "true";
      frame = requestAnimationFrame(paint);
    };

    const move = (event: PointerEvent) => {
      x = event.clientX;
      y = event.clientY;
      hidden = false;
    };
    const over = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      if (target.closest("input, textarea, select, option")) {
        hidden = true;
        mode = "";
        return;
      }
      hidden = false;
      const zone = target.closest("[data-cursor]");
      mode = zone?.getAttribute("data-cursor") ?? "";
    };
    const leave = () => {
      hidden = true;
    };

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerover", over);
    document.addEventListener("pointerleave", leave);
    frame = requestAnimationFrame(paint);

    return () => {
      root.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", over);
      document.removeEventListener("pointerleave", leave);
      cancelAnimationFrame(frame);
    };
  }, []);

  if (!site.features.customCursor) return null;

  return (
    <div ref={cursorRef} className="cursor" aria-hidden="true" data-hidden="true">
      <span className="cursor-dot" />
      <span className="cursor-label">{site.ui.cursorView}</span>
    </div>
  );
}
