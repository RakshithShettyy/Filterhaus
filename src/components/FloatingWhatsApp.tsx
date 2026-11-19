"use client";

import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { site, waLink } from "@/data/site";

export function FloatingWhatsApp() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const contact = document.getElementById(site.contactForm.id);
    if (!contact) return;
    const observer = new IntersectionObserver(
      ([entry]) => setHidden(entry?.isIntersecting ?? false),
      { threshold: 0.2 },
    );
    observer.observe(contact);
    return () => observer.disconnect();
  }, []);

  return (
    <a
      href={waLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${site.nav.cta} (${site.ui.opensInNewTab})`}
      className={`btn btn-primary press fixed bottom-4 right-4 z-40 h-14 w-14 rounded-full p-0 md:hidden ${hidden ? "pointer-events-none opacity-0" : "opacity-100"}`}
    >
      <MessageCircle aria-hidden="true" />
    </a>
  );
}
