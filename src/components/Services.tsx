import Image from "next/image";
import { site } from "@/data/site";
import { shell, sectionY } from "@/lib/layout";
import { SectionRule } from "@/components/motion/SectionRule";

export function Services({ photos }: { photos: { id: string; src: string; alt: string }[] }) {
  const copy = site.services;

  return (
    <section id={copy.id} className={sectionY} aria-labelledby="services-title">
      <div className={shell}>
        <SectionRule />
        <p className="eyebrow">
          {copy.index} — {copy.eyebrow}
        </p>
        <div className="mt-4 lg:w-7/12">
          <h2
            id="services-title"
            className="font-display text-[clamp(2.5rem,6vw,4.8rem)] font-medium leading-[0.95] tracking-[-0.03em] text-ink"
          >
            {copy.title}
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-ink">{copy.intro}</p>
        </div>

        <ul className="mt-8 grid gap-5 lg:grid-cols-3">
          {copy.items.map((item) => {
            const photo = photos.find((frame) => frame.id === item.id) ?? { src: item.image, alt: item.imageAlt };
            return (
              <li key={item.id} className="flex h-full flex-col border border-line bg-logo/50">
                <div className="relative aspect-[4/3] w-full">
                  <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 1024px) 28vw, 100vw" className="object-cover" />
                </div>
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="flex min-w-0 items-center gap-3 font-display text-[clamp(1.8rem,3vw,2.4rem)] font-medium leading-none tracking-[-0.03em] text-ink">
                      <span className="shrink-0 text-gold">{item.index}</span>
                      <span>{item.title}</span>
                    </h3>
                    {"badge" in item && item.badge ? (
                      <span className="shrink-0 border border-gold px-2 py-1 text-[0.62rem] font-medium uppercase tracking-[0.16em] text-gold-dark">
                        {item.badge}
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-4 text-base leading-relaxed text-ink">{item.sentence}</p>
                </div>
              </li>
            );
          })}
        </ul>

        <ol className="mt-8 grid gap-5 border-t border-line pt-6 sm:grid-cols-2 lg:grid-cols-4">
          {copy.pipeline.map((step, index) => (
            <li key={step.step}>
              <p className="text-[0.68rem] font-medium uppercase tracking-[0.16em] text-gold-dark">0{index + 1}</p>
              <p className="mt-2 font-display text-2xl text-ink">{step.step}</p>
              <p className="mt-1 text-sm leading-relaxed text-brown">{step.note}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
