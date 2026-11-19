"use client";

import { useEffect, useState } from "react";
import { MotionConfig } from "framer-motion";
import "lenis/dist/lenis.css";
import { site } from "@/data/site";
import { getLenis, setLenis } from "@/components/motion/lenisStore";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reduce = usePrefersReducedMotion();

  useEffect(() => {
    if (!site.features.smoothScroll || reduce) return;
    const small = window.matchMedia("(max-width: 1023px), (pointer: coarse)");
    if (small.matches) return;

    let cancelled = false;
    let destroy: (() => void) | undefined;

    void (async () => {
      const { default: Lenis } = await import("lenis");
      if (cancelled) return;
      const lenis = new Lenis({
        autoRaf: true,
        lerp: 0.085,
        smoothWheel: true,
        syncTouch: false,
        wheelMultiplier: 0.9,
        allowNestedScroll: true,
        stopInertiaOnNavigate: true,
        anchors: { offset: 0 },
      });
      setLenis(lenis);
      destroy = () => {
        lenis.destroy();
        setLenis(null);
      };
    })();

    return () => {
      cancelled = true;
      destroy?.();
      setLenis(null);
    };
  }, [reduce]);

  return (
    <MotionConfig reducedMotion={reduce ? "always" : "user"}>{children}</MotionConfig>
  );
}

function usePrefersReducedMotion() {
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduce(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return reduce;
}

export function scrollToId(hash: string) {
  const id = hash.replace(/^#/, "");
  const target = document.getElementById(id);
  if (!target) return;
  const lenis = getLenis();
  if (lenis) {
    lenis.scrollTo(target, { offset: 0 });
    return;
  }
  target.scrollIntoView();
}

export function stopScroll() {
  getLenis()?.stop();
}

export function startScroll() {
  getLenis()?.start();
}
