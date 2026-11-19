"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { site, fill } from "@/data/site";
import { cn } from "@/lib/cn";
import { shell, sectionY } from "@/lib/layout";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { SectionRule } from "@/components/motion/SectionRule";
import { getLenis } from "@/components/motion/lenisStore";
import { Testimonials } from "@/components/Testimonials";

const Lightbox = dynamic(
  () => import("@/components/Lightbox").then((mod) => mod.Lightbox),
  { ssr: false },
);

type GalleryImage = { src: string; alt: string; width: number; height: number };

export function Work({ images }: { images: GalleryImage[] }) {
  const copy = site.work;
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);
  const close = useCallback(() => setActive(null), []);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    let revert: (() => void) | undefined;
    let cancelled = false;

    const setup = async () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce || cancelled) return;

      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      const touch = ScrollTrigger.isTouch === 1;
      if (touch) ScrollTrigger.normalizeScroll(true);

      const lenis = getLenis();
      const sync = () => ScrollTrigger.update();
      lenis?.on("scroll", sync);

      const ctx = gsap.context(() => {
        const distance = () => {
          const scroller = track.parentElement;
          if (!scroller) return 0;
          return Math.max(0, track.scrollWidth - scroller.clientWidth);
        };
        if (distance() < 24) return;
        gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            pinSpacing: true,
            scrub: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
      }, section);

      revert = () => {
        ctx.revert();
        lenis?.off("scroll", sync);
        if (touch) ScrollTrigger.normalizeScroll(false);
      };
    };

    const frame = requestAnimationFrame(() => {
      void setup();
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      revert?.();
    };
  }, []);

  return (
    <section id={copy.id} className={cn(sectionY, "max-w-full")} aria-labelledby="work-title">
      <div className={shell}>
        <SectionRule />
        <p className="eyebrow">
          {copy.index} — {copy.eyebrow}
        </p>
        <div className="mt-4 grid gap-8 lg:grid-cols-12">
          <h2 id="work-title" className="font-display text-[clamp(2.5rem,6vw,5rem)] font-medium leading-[0.95] tracking-[-0.03em] lg:col-span-5">
            {copy.title}
          </h2>
          <div className="lg:col-span-6 lg:col-start-7">
            <p className="text-base leading-relaxed text-ink">{copy.intro}</p>
            <p className="mt-8 text-[0.72rem] font-medium uppercase tracking-[0.16em] text-gold-dark">
              {copy.caseStudy.kicker}
            </p>
            <p className="mt-3 font-display text-4xl text-ink">{copy.caseStudy.title}</p>
            <p className="mt-2 text-sm text-brown">{copy.caseStudy.propertyType}</p>
            <div className="mt-8 space-y-6">
              <div>
                <h3 className="text-[0.72rem] font-medium uppercase tracking-[0.16em] text-brown">
                  {copy.caseStudy.briefLabel}
                </h3>
                <p className="mt-2 leading-relaxed">{copy.caseStudy.brief}</p>
              </div>
              <div>
                <h3 className="text-[0.72rem] font-medium uppercase tracking-[0.16em] text-brown">
                  {copy.caseStudy.approachLabel}
                </h3>
                <p className="mt-2 leading-relaxed">{copy.caseStudy.approach}</p>
              </div>
              <div>
                <h3 className="text-[0.72rem] font-medium uppercase tracking-[0.16em] text-brown">
                  {copy.caseStudy.deliveredLabel}
                </h3>
                <p className="mt-2 leading-relaxed">{copy.caseStudy.delivered}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {images.length > 0 ? (
        <div ref={sectionRef} className="gallery-stage relative mt-8 flex h-dvh flex-col sm:mt-10 lg:block lg:h-auto">
          <a href={copy.skipHref} className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-10 focus:bg-cream focus:px-3 focus:py-2">
            {copy.skipGallery}
          </a>
          <div className="gallery-frame min-h-0 flex-1 lg:flex lg:h-dvh lg:flex-none lg:items-center">
            <div className="gallery-scroller h-full min-h-56 w-full max-w-full overflow-x-hidden overflow-y-hidden lg:h-auto lg:min-h-0">
              <div ref={trackRef} className="flex h-full w-max items-stretch gap-4 px-5 sm:gap-5 lg:px-[7vw]">
                {images.map((image, index) => (
                  <button
                    key={image.src}
                    type="button"
                    data-cursor="view"
                    className="relative h-full min-h-56 w-[78vw] max-w-none shrink-0 snap-start overflow-hidden sm:w-[46vw] lg:h-[22rem] lg:min-h-0 lg:w-auto lg:max-w-[34rem] lg:[aspect-ratio:var(--frame)]"
                    style={{ ["--frame" as string]: `${image.width} / ${image.height}` }}
                    aria-label={fill(copy.lightbox.viewImage, { alt: image.alt })}
                    onClick={() => setActive(index)}
                  >
                    <ImageReveal className="relative h-full w-full">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="(min-width: 1024px) 42vw, 80vw"
                        className="object-cover"
                      />
                    </ImageReveal>
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div id="work-after" className={shell}>
            <Testimonials />
          </div>
        </div>
      ) : (
        <p className="mx-auto max-w-[88rem] px-5 text-brown sm:px-8 lg:px-12">{site.admin.emptyWork}</p>
      )}

      {active !== null ? (
        <Lightbox images={images} index={active} onClose={close} onIndex={setActive} />
      ) : null}
    </section>
  );
}
