"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/data/site";
import { cn } from "@/lib/cn";
import { shell } from "@/lib/layout";
import { SectionRule } from "@/components/motion/SectionRule";

export function Showreel({ src }: { src: string }) {
  const copy = site.showreel;
  const videoRef = useRef<HTMLVideoElement>(null);
  const [available, setAvailable] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    let cancelled = false;
    void fetch(src, { method: "HEAD" })
      .then((response) => {
        if (!cancelled && response.ok) setAvailable(true);
      })
      .catch(() => {
        /* the frame stays until a reel file is added */
      });
    return () => {
      cancelled = true;
    };
  }, [src]);

  const toggle = () => {
    const node = videoRef.current;
    if (!node) return;
    if (node.paused) {
      void node.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
      return;
    }
    node.pause();
    setPlaying(false);
  };

  return (
    <section
      id={copy.id}
      className="pt-8 pb-12 sm:pt-10 sm:pb-14 lg:flex lg:h-[calc(100dvh-var(--nav-offset))] lg:flex-col lg:overflow-hidden lg:py-8"
      aria-labelledby="showreel-title"
    >
      <div className={cn(shell, "lg:flex lg:min-h-0 lg:flex-1 lg:flex-col")}>
        <div className="shrink-0">
          <SectionRule />
          <p className="eyebrow">{copy.eyebrow}</p>
          <div className="mt-4 grid items-end gap-4 lg:grid-cols-12 lg:gap-8">
            <h2
              id="showreel-title"
              className="font-display text-[clamp(2.5rem,6vw,4.8rem)] font-medium leading-[0.95] tracking-[-0.03em] text-ink lg:col-span-7"
            >
              {copy.title}
            </h2>
            <p className="max-w-md text-base leading-relaxed text-ink lg:col-span-5 lg:pb-1">
              {copy.body}
            </p>
          </div>
        </div>

        <div className="relative mt-8 aspect-video w-full lg:aspect-auto lg:min-h-0 lg:flex-1">
          <div className="absolute inset-0 overflow-hidden bg-brown">
            {available ? (
              <video
                key={src}
                ref={videoRef}
                className="h-full w-full object-contain"
                playsInline
                preload="metadata"
                onPause={() => setPlaying(false)}
                onPlay={() => setPlaying(true)}
              >
                <source src={src} type="video/mp4" />
              </video>
            ) : (
              <div className="flex h-full items-center justify-center px-6 text-center">
                <p className="font-display text-3xl text-cream sm:text-4xl">{copy.eyebrow}</p>
              </div>
            )}
            <span className="pointer-events-none absolute inset-3 border border-gold/80 sm:inset-4" aria-hidden="true" />
            {available ? (
              <button
                type="button"
                onClick={toggle}
                className="btn btn-light press absolute bottom-6 left-6 sm:bottom-8 sm:left-8"
              >
                {playing ? copy.pause : copy.play}
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
