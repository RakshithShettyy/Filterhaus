import { site } from "@/data/site";

export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: site.name,
    description: site.seo.description,
    url: site.url,
    image: `${site.url}${site.logo.src}`,
    telephone: site.contact.phoneTel,
    email: site.contact.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.jsonLd.addressLocality,
      addressRegion: site.jsonLd.addressRegion,
      addressCountry: site.jsonLd.addressCountry,
    },
    areaServed: [...site.contact.serviceAreas],
    sameAs: [site.contact.instagram],
    openingHoursSpecification: site.jsonLd.openingHours.map((row) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [...row.days],
      opens: row.opens,
      closes: row.closes,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
