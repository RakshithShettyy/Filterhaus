"use client";

import { useEffect, useState } from "react";
import { formatInr } from "@/lib/format";

type CountUpProps = {
  value: number;
  play: boolean;
  prefix: string;
  className?: string;
};

export function CountUp({ value, play, prefix, className }: CountUpProps) {
  const finalText = `${prefix} ${formatInr(value)}`;
  const [text, setText] = useState(play ? `${prefix} ${formatInr(0)}` : finalText);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!play || reduce) {
      setText(finalText);
      return;
    }

    let frame = 0;
    const start = performance.now();
    const duration = 900;

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setText(`${prefix} ${formatInr(Math.round(value * eased))}`);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [finalText, play, prefix, value]);

  return (
    <span className={`relative inline-block tabular-nums ${className ?? ""}`}>
      <span className="invisible" aria-hidden="true">
        {finalText}
      </span>
      <span className="absolute inset-0 text-left">{text}</span>
    </span>
  );
}
