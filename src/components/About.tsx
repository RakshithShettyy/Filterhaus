import Image from "next/image";
import { site } from "@/data/site";
import { shell, sectionY } from "@/lib/layout";
import { Reveal } from "@/components/motion/Reveal";
import { SectionRule } from "@/components/motion/SectionRule";

export function About({ founder }: { founder: { src: string; alt: string } }) {
  const copy = site.about;
  return (
    <section id={copy.id} className={sectionY} aria-labelledby="about-title">
      <div className={shell}>
        <SectionRule />
        <p className="eyebrow">
          {copy.index} — {copy.eyebrow}
        </p>
        <div className="mt-4 grid items-start gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <h2 id="about-title" className="font-display text-[clamp(2.5rem,6vw,4.8rem)] font-medium leading-[0.95] tracking-[-0.03em]">
              {copy.title}
            </h2>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed">{copy.body}</p>
          </Reveal>
          <Reveal className="mx-auto w-full max-w-xs lg:col-span-4 lg:col-start-9 lg:mx-0" delay={0.08}>
            <article className="border border-line bg-logo/40 p-4 sm:p-5">
              <div className="relative aspect-[4/5] w-full">
                <Image
                  src={founder.src}
                  alt={founder.alt}
                  fill
                  sizes="(min-width: 1024px) 28vw, 100vw"
                  className="object-cover"
                />
              </div>
              <h3 className="mt-5 font-display text-3xl tracking-[-0.03em]">{copy.founder.name}</h3>
              <p className="mt-1 text-[0.72rem] font-medium uppercase tracking-[0.16em] text-gold-dark">
                {copy.founder.role}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-brown">{copy.founder.bio}</p>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
