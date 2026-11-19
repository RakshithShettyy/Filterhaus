"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { site, waLink } from "@/data/site";
import { shell, sectionY } from "@/lib/layout";
import { cn } from "@/lib/cn";
import { CountUp } from "@/components/motion/CountUp";
import { Magnetic } from "@/components/motion/Magnetic";
import { SectionRule } from "@/components/motion/SectionRule";

export function Packages() {
  const copy = site.packages;
  const [active, setActive] = useState<string>(copy.tabs[0].id);
  const seen = useRef(new Set<string>());
  const play = !seen.current.has(active);
  const tab = copy.tabs.find((item) => item.id === active) ?? copy.tabs[0];

  useEffect(() => {
    seen.current.add(active);
  }, [active]);

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const tabs = copy.tabs;
    const index = tabs.findIndex((item) => item.id === active);
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
    else if (event.key === "ArrowLeft") next = (index - 1 + tabs.length) % tabs.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = tabs.length - 1;
    else return;
    event.preventDefault();
    const id = tabs[next].id;
    setActive(id);
    document.getElementById(`tab-${id}`)?.focus();
  };

  return (
    <section id={copy.id} className={sectionY} aria-labelledby="packages-title">
      <div className={shell}>
        <SectionRule />
        <p className="eyebrow">
          {copy.index} — {copy.eyebrow}
        </p>
        <div className="mt-4 lg:w-7/12">
          <h2 id="packages-title" className="font-display text-[clamp(2.5rem,6vw,5rem)] font-medium leading-[0.95] tracking-[-0.03em]">
            {copy.title}
          </h2>
          <p className="mt-6 max-w-md leading-relaxed">{copy.intro}</p>
        </div>

        <div
          role="tablist"
          aria-label={copy.tabsLabel}
          className="mt-8 flex max-w-full gap-6 overflow-x-auto overscroll-x-contain border-b border-line"
          onKeyDown={onKeyDown}
        >
          {copy.tabs.map((item) => {
            const selected = item.id === active;
            return (
              <button
                key={item.id}
                id={`tab-${item.id}`}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls={`panel-${item.id}`}
                tabIndex={selected ? 0 : -1}
                className={cn(
                  "relative min-h-11 shrink-0 px-1 pb-3 text-[0.78rem] font-medium uppercase tracking-[0.16em]",
                  selected ? "text-brown" : "text-brown/80",
                )}
                onClick={() => setActive(item.id)}
              >
                {item.label}
                {selected ? (
                  <motion.span
                    layoutId="package-tab"
                    className="absolute inset-x-0 bottom-0 h-px bg-gold"
                  />
                ) : null}
              </button>
            );
          })}
        </div>

        <div
          role="tabpanel"
          id={`panel-${tab.id}`}
          aria-labelledby={`tab-${tab.id}`}
          tabIndex={0}
          className="mt-8 outline-none"
        >
          <ul className="grid gap-5 lg:grid-cols-3">
            {tab.items.map((item) => (
              <li key={item.id}>
                <article
                  className={cn(
                    "flex h-full flex-col border p-7 sm:p-8",
                    "featured" in item && item.featured ? "border-gold bg-[#f3ead4]" : "border-line bg-logo/40",
                  )}
                  onMouseMove={(event) => {
                    if (!window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)").matches) return;
                    const card = event.currentTarget;
                    const bounds = card.getBoundingClientRect();
                    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
                    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
                    card.style.transform = `perspective(900px) rotateX(${(-y * 3).toFixed(2)}deg) rotateY(${(x * 3).toFixed(2)}deg) translateY(-4px)`;
                  }}
                  onMouseLeave={(event) => {
                    event.currentTarget.style.transform = "";
                  }}
                >
                  <h3 className="font-display text-3xl tracking-[-0.03em]">{item.name}</h3>
                  {site.showPrices ? (
                    <p className="mt-5 font-display text-[1.7rem] text-brown">
                      <CountUp value={item.price} play={play} prefix={copy.pricePrefix} />
                    </p>
                  ) : null}
                  <ul className="mt-6 space-y-2 text-sm leading-relaxed text-ink">
                    {item.scope.map((point) => (
                      <li key={point} className="flex gap-3">
                        <span className="mt-[0.55rem] h-px w-4 shrink-0 bg-gold" aria-hidden="true" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                  <Magnetic className="mt-auto pt-8">
                    <a
                      href={waLink(`${copy.enquirePrefix} ${item.name}`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor="interactive"
                      className="text-link text-[0.72rem] font-medium uppercase tracking-[0.16em] text-brown"
                    >
                      {copy.enquire}
                    </a>
                  </Magnetic>
                </article>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-10 max-w-2xl text-base leading-relaxed text-ink">
          {site.showPrices ? copy.brandFilm.priced : copy.brandFilm.hidden}
        </p>
        {site.showPrices ? (
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-brown">{copy.footnote}</p>
        ) : null}
      </div>
    </section>
  );
}
