"use client";

import { useEffect, useId, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { fill, site } from "@/data/site";
import { startScroll, stopScroll } from "@/components/motion/SmoothScroll";

type LightboxProps = {
  images: { src: string; alt: string }[];
  index: number;
  onClose: () => void;
  onIndex: (index: number) => void;
};

const focusable =
  'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

export function Lightbox({ images, index, onClose, onIndex }: LightboxProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const indexRef = useRef(index);
  indexRef.current = index;
  const titleId = useId();
  const image = images[index];
  const count = fill(site.work.lightbox.count, {
    current: String(index + 1),
    total: String(images.length),
  });

  useEffect(() => {
    const dialog = dialogRef.current;
    const previous = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    stopScroll();
    closeRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      const current = indexRef.current;
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        onIndex((current + 1) % images.length);
        return;
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        onIndex((current - 1 + images.length) % images.length);
        return;
      }
      if (event.key !== "Tab" || !dialog) return;
      const items = [...dialog.querySelectorAll<HTMLElement>(focusable)];
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      startScroll();
      previous?.focus();
    };
  }, [images.length, onClose, onIndex]);

  if (!image) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/92 p-4 text-cream sm:p-8"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative flex h-[min(100%,52rem)] w-full max-w-6xl flex-col"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4">
          <h2 id={titleId} className="font-display text-2xl sm:text-3xl">
            {site.work.caseStudy.title}
          </h2>
          <button
            ref={closeRef}
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center"
            aria-label={site.ui.close}
            onClick={onClose}
          >
            <X aria-hidden="true" />
          </button>
        </div>
        <div className="relative mt-4 min-h-0 flex-1">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="100vw"
            className="object-contain"
          />
        </div>
        <div className="mt-4 flex items-center justify-between gap-4">
          <p className="text-sm" aria-live="polite">
            {count}
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center border border-cream/40"
              aria-label={site.work.lightbox.previous}
              onClick={() => onIndex((index - 1 + images.length) % images.length)}
            >
              <ChevronLeft aria-hidden="true" />
            </button>
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center border border-cream/40"
              aria-label={site.work.lightbox.next}
              onClick={() => onIndex((index + 1) % images.length)}
            >
              <ChevronRight aria-hidden="true" />
            </button>
          </div>
        </div>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-cream/85">{image.alt}</p>
      </div>
    </div>
  );
}
