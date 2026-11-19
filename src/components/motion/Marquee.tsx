import { site } from "@/data/site";

function Row({ copy }: { copy: number }) {
  return (
    <p className="marquee-copy flex shrink-0 items-center" aria-hidden={copy === 1}>
      {site.marquee.items.map((item) => (
        <span key={`${copy}-${item}`} className="flex items-center">
          <span className="px-4 text-[0.72rem] font-medium uppercase tracking-[0.18em] text-brown sm:px-6">
            {item}
          </span>
          <span className="text-gold" aria-hidden="true">
            {site.marquee.separator}
          </span>
        </span>
      ))}
    </p>
  );
}

export function Marquee() {
  return (
    <div className="marquee max-w-full overflow-x-clip border-y border-gold/40 py-4" aria-hidden="true">
      <div className="marquee-track flex w-max">
        <Row copy={0} />
        <Row copy={1} />
      </div>
    </div>
  );
}
