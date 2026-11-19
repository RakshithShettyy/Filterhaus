"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { site, mailLink, telLink } from "@/data/site";
import { shell } from "@/lib/layout";

export function Copyright({ template }: { template: string }) {
  const [year, setYear] = useState("2026");

  useEffect(() => {
    setYear(String(new Date().getFullYear()));
  }, []);

  return <p className="text-sm text-brown">{template.replace("{year}", year)}</p>;
}

export function Footer() {
  return (
    <footer className="border-t border-line bg-cream">
      <div className={`${shell} py-8 sm:py-10`}>
        <div className="grid items-center gap-6 lg:grid-cols-[minmax(16rem,22rem)_1fr_auto] lg:gap-10">
          <div className="flex items-center gap-4">
            <Image
              src={site.logo.src}
              alt={site.logo.alt}
              width={site.logo.width}
              height={site.logo.height}
              className="h-12 w-12 shrink-0"
            />
            <p className="font-display text-xl leading-tight text-ink">{site.tagline}</p>
          </div>

          <nav className="flex flex-wrap items-center gap-x-5 gap-y-2 lg:justify-center" aria-label={site.ui.menuLabel}>
            {site.nav.links.map((link) => (
              <a key={link.href} href={link.href} className="text-link text-sm text-brown" data-cursor="interactive">
                {link.label}
              </a>
            ))}
          </nav>

          <Copyright template={site.footer.copyright} />
        </div>

        <div className="mt-6 flex flex-col gap-2 border-t border-line pt-5 text-sm text-brown sm:flex-row sm:items-center sm:justify-between">
          <p>{site.contact.location}</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <a className="text-link" href={telLink()} data-cursor="interactive">
              {site.contact.phoneDisplay}
            </a>
            <a className="text-link" href={mailLink()} data-cursor="interactive">
              {site.contact.email}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
