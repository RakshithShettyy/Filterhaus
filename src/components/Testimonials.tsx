import { site } from "@/data/site";

export function Testimonials() {
  if (!site.features.showTestimonials || site.testimonials.length === 0) return null;

  return (
    <div className="mt-16 border-t border-line pt-10">
      <ul className="grid gap-8 lg:grid-cols-3">
        {site.testimonials.map((item) => (
          <li key={item.name}>
            <blockquote>
              <p className="font-display text-2xl leading-snug text-ink">{item.quote}</p>
              <footer className="mt-4 text-sm text-brown">
                {item.name}
                <span className="block">{item.role}</span>
              </footer>
            </blockquote>
          </li>
        ))}
      </ul>
    </div>
  );
}
