"use client";

import { useEffect } from "react";
import Image from "next/image";
import { site } from "@/data/site";

export function IntroLoader() {
  useEffect(() => {
    const intro = document.getElementById("intro");
    if (!intro || !site.features.introLoader) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let seen = false;
    try {
      seen = sessionStorage.getItem(site.ui.introStorageKey) === "1";
    } catch {
      seen = false;
    }

    const finish = () => {
      try {
        sessionStorage.setItem(site.ui.introStorageKey, "1");
      } catch {
        /* storage can be blocked */
      }
      intro.setAttribute("hidden", "");
      document.getElementById("page")?.removeAttribute("inert");
      document.body.style.overflow = "";
    };

    if (window.location.pathname === "/login" || window.location.pathname.startsWith("/admin") || reduce || seen) {
      finish();
      return;
    }

    document.getElementById("page")?.setAttribute("inert", "");
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    intro.addEventListener("click", finish);
    const timeout = window.setTimeout(finish, 1800);

    return () => {
      intro.removeEventListener("click", finish);
      window.clearTimeout(timeout);
      document.body.style.overflow = previous;
    };
  }, []);

  if (!site.features.introLoader) return null;

  return (
    <div id="intro" className="intro" role="dialog" aria-modal="true" aria-label={site.ui.introLabel}>
      <div id="intro-curtain" className="intro-curtain" aria-hidden="true" />
      <div className="intro-mark" aria-hidden="true">
        <svg className="intro-ring" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="46" fill="none" stroke="#FBF5E6" strokeWidth="0.6" />
          <g fill="none" stroke="#B88A2E" strokeWidth="1.2">
            {Array.from({ length: 6 }, (_, index) => (
              <line
                key={index}
                x1="50"
                y1="16"
                x2="50"
                y2="36"
                transform={`rotate(${index * 60} 50 50)`}
              />
            ))}
            <circle cx="50" cy="50" r="15" />
          </g>
        </svg>
        <Image
          src={site.logo.src}
          alt=""
          width={site.logo.width}
          height={site.logo.height}
          className="relative h-24 w-24 object-contain"
        />
      </div>
      <button type="button" className="intro-skip text-link" data-skip-intro>
        {site.ui.skipIntro}
      </button>
    </div>
  );
}
