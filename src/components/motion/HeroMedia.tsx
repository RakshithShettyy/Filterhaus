"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { site } from "@/data/site";

export function HeroMedia({ poster, alt }: { poster: string; alt: string }) {
  const [video, setVideo] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const connection = (
      navigator as Navigator & {
        connection?: { saveData?: boolean; effectiveType?: string };
      }
    ).connection;
    const slow =
      connection?.saveData ||
      connection?.effectiveType === "slow-2g" ||
      connection?.effectiveType === "2g";
    if (reduce || slow || poster.startsWith("/uploads/")) return;

    let cancelled = false;
    void fetch(site.hero.video, { method: "HEAD" }).then((response) => {
      if (!cancelled && response.ok) setVideo(true);
    }).catch(() => {
      /* poster remains */
    });
    return () => {
      cancelled = true;
    };
  }, [poster]);

  return (
    <div className="absolute inset-0 overflow-hidden bg-logo">
      <div className="absolute inset-0">
        <Image
          src={poster}
          alt={alt}
          fill
          priority
          sizes="(min-width: 1024px) 30rem, 80vw"
          className="object-contain"
        />
        {video ? (
          <video
            className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`}
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            poster={poster}
            aria-hidden="true"
            onCanPlay={() => setReady(true)}
          >
            <source src={site.hero.video} type="video/mp4" />
          </video>
        ) : null}
      </div>
      <span className="pointer-events-none absolute inset-3 border border-gold/80" aria-hidden="true" />
    </div>
  );
}
