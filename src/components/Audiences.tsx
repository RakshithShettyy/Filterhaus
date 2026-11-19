import { site } from "@/data/site";
import { shell, sectionY } from "@/lib/layout";
import { Reveal } from "@/components/motion/Reveal";
import { SectionRule } from "@/components/motion/SectionRule";

export function Audiences() {
  const copy = site.audiences;
  return (
    <section id={copy.id} className={sectionY} aria-labelledby="audiences-title">
      <div className={shell}>
        <SectionRule />
        <Reveal>
          <p className="eyebrow">{copy.index} — {copy.eyebrow}</p>
          <h2 id="audiences-title" className="mt-4 font-display text-[clamp(2.5rem,6vw,5rem)] font-medium leading-[0.95] tracking-[-0.03em] text-ink">
            {copy.title}
          </h2>
        </Reveal>
        <ul className="mt-8 grid gap-4 lg:grid-cols-3">
          {copy.items.map((item, index) => (
            <Reveal as="li" key={item.id} delay={index * 0.08} className="h-full">
              <article data-cursor="interactive" className="flex h-full flex-col border border-line bg-logo/50 p-6 sm:p-7">
                <p className="font-display text-3xl text-gold">{item.index}</p>
                <h3 className="mt-4 font-display text-4xl font-medium tracking-[-0.03em] text-ink">
                  {item.title}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-ink">{item.body}</p>
                <p className="mt-8 border-t border-gold/60 pt-5 text-sm leading-relaxed text-brown">
                  {item.gets}
                </p>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
