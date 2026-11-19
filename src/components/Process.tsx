"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/data/site";
import { cn } from "@/lib/cn";
import { shell, sectionY } from "@/lib/layout";
import { SectionRule } from "@/components/motion/SectionRule";

export function Process() {
  const copy = site.process;
  const listRef = useRef<HTMLOListElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<string>(copy.steps[0].id);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const list = listRef.current;
    const bar = barRef.current;
    if (!list || !bar) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      bar.style.transform = "scaleY(1)";
      setReady(true);
      return;
    }

    const steps = [...list.querySelectorAll<HTMLElement>("[data-step]")];
    const onScroll = () => {
      const bounds = list.getBoundingClientRect();
      const total = Math.max(bounds.height - window.innerHeight * 0.35, 1);
      const passed = Math.min(Math.max(-bounds.top + window.innerHeight * 0.35, 0), total);
      bar.style.transform = `scaleY(${passed / total})`;
      const marker = window.innerHeight * 0.42;
      let current = steps[0]?.dataset.step ?? copy.steps[0].id;
      for (const step of steps) {
        if (step.getBoundingClientRect().top < marker) current = step.dataset.step ?? current;
      }
      setActive((previous) => (previous === current ? previous : current));
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [copy.steps]);

  return (
    <section id={copy.id} className={sectionY} aria-labelledby="process-title">
      <div className={cn(shell, "grid gap-8 lg:grid-cols-12")}>
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <SectionRule />
            <p className="eyebrow">
              {copy.index} — {copy.eyebrow}
            </p>
            <h2 id="process-title" className="mt-4 font-display text-[clamp(2.5rem,6vw,4.6rem)] font-medium leading-[0.95] tracking-[-0.03em]">
              {copy.title}
            </h2>
            <p className="mt-5 max-w-sm leading-relaxed">{copy.intro}</p>
          </div>
        </div>
        <div className="relative lg:col-span-7 lg:col-start-6">
          <div className="absolute bottom-2 left-0 top-2 w-px bg-line" aria-hidden="true">
            <div ref={barRef} className="h-full w-px origin-top bg-gold" style={{ transform: "scaleY(0)" }} />
          </div>
          <ol ref={listRef} className="space-y-14 pl-8 sm:space-y-16">
            {copy.steps.map((step, index) => {
              const on = ready || active === step.id;
              return (
                <li
                  key={step.id}
                  data-step={step.id}
                  className={cn("transition-opacity duration-300", on ? "opacity-100" : "opacity-40")}
                >
                  <p className="text-[0.68rem] font-medium uppercase tracking-[0.16em] text-gold-dark">
                    0{index + 1}
                  </p>
                  <h3 className="mt-2 font-display text-3xl tracking-[-0.03em] sm:text-4xl">{step.title}</h3>
                  <p className="mt-3 max-w-md leading-relaxed">{step.body}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
