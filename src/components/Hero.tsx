import { site, waLink } from "@/data/site";
import { cn } from "@/lib/cn";
import { shell } from "@/lib/layout";
import { Magnetic } from "@/components/motion/Magnetic";
import { HeroMedia } from "@/components/motion/HeroMedia";

export function Hero({ poster, alt }: { poster: string; alt: string }) {
  return (
    <section className="relative overflow-hidden pb-10 pt-24 sm:pb-12 sm:pt-28 lg:pb-16" aria-labelledby="hero-title">
      <div className={cn(shell, "grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_26rem] lg:gap-16")}>
        <div className="@container order-2 lg:order-1">
          <p className="eyebrow max-w-[18rem] text-balance sm:max-w-none">{site.hero.eyebrow}</p>
          <h1
            id="hero-title"
            className="mt-5 font-display text-[clamp(1.75rem,9.2cqw,5.75rem)] font-medium leading-[0.92] tracking-[-0.035em] text-ink"
          >
            {site.hero.lines.map((line) => (
              <span
                key={line.text}
                className={cn("hero-line block", line.italic && "pb-[0.34em]")}
              >
                <span className={cn("hero-line-inner block", line.italic && "italic")}>
                  {line.text}
                </span>
              </span>
            ))}
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-ink sm:text-lg">{site.hero.sub}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Magnetic>
              <a href={site.hero.primaryHref} data-cursor="interactive" className="btn btn-primary press w-full sm:w-auto">
                {site.hero.primaryCta}
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="interactive"
                className="btn btn-secondary press w-full sm:w-auto"
                aria-label={`${site.hero.secondaryCta} (${site.ui.opensInNewTab})`}
              >
                {site.hero.secondaryCta}
              </a>
            </Magnetic>
          </div>
        </div>
        <div className="order-1 lg:order-2">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-sm lg:mx-0 lg:max-w-none">
            <HeroMedia poster={poster} alt={alt} />
          </div>
        </div>
      </div>
    </section>
  );
}
