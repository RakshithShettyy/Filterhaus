"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { site, waLink } from "@/data/site";
import { cn } from "@/lib/cn";
import { Magnetic } from "@/components/motion/Magnetic";
import { scrollToId, startScroll, stopScroll } from "@/components/motion/SmoothScroll";

const focusable =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

export function Nav() {
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState("");
  const menuButton = useRef<HTMLButtonElement>(null);
  const drawer = useRef<HTMLDivElement>(null);
  const titleId = useId();

  useEffect(() => {
    let last = window.scrollY;
    let solidNow = false;
    let hiddenNow = false;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const onScroll = () => {
      const y = window.scrollY;
      const nextSolid = y > 12;
      if (open) {
        if (hiddenNow) {
          hiddenNow = false;
          setHidden(false);
        }
      }
      const nextHidden = !reduce && !open && y > last && y > 96;
      if (nextSolid !== solidNow) {
        solidNow = nextSolid;
        setSolid(nextSolid);
      }
      if (y < last || y < 24) {
        if (hiddenNow) {
          hiddenNow = false;
          setHidden(false);
        }
      } else if (nextHidden !== hiddenNow) {
        hiddenNow = nextHidden;
        setHidden(nextHidden);
      }
      last = y;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  useEffect(() => {
    const ids = site.nav.links.map((link) => link.href.slice(1));
    const nodes = ids
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => Boolean(node));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setCurrent(visible.target.id);
      },
      { rootMargin: "-35% 0px -50% 0px", threshold: [0.15, 0.4] },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const panel = drawer.current;
    const previous = document.activeElement as HTMLElement | null;
    stopScroll();
    const first = panel?.querySelector<HTMLElement>("button, a");
    first?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }
      if (event.key !== "Tab" || !panel) return;
      const items = [...panel.querySelectorAll<HTMLElement>(focusable)].filter(
        (item) => !item.hasAttribute("disabled"),
      );
      if (!items.length) return;
      const firstItem = items[0];
      const lastItem = items[items.length - 1];
      if (event.shiftKey && document.activeElement === firstItem) {
        event.preventDefault();
        lastItem.focus();
      } else if (!event.shiftKey && document.activeElement === lastItem) {
        event.preventDefault();
        firstItem.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      startScroll();
      previous?.focus();
    };
  }, [open]);

  const onNavigate = (href: string) => {
    setOpen(false);
    startScroll();
    scrollToId(href);
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-transform duration-500",
        hidden ? "-translate-y-full" : "translate-y-0",
      )}
    >
      <div
        className={cn(
          "border-b transition-colors duration-300",
          solid ? "border-line bg-cream/88 backdrop-blur-md" : "border-transparent bg-transparent",
        )}
      >
        <div className="mx-auto flex h-16 max-w-[88rem] items-center justify-between gap-4 px-5 sm:h-20 sm:px-8 lg:px-12">
          <a href="#main" className="shrink-0" data-cursor="interactive" aria-label={site.name}>
            <Image
              src={site.logo.src}
              alt={site.logo.alt}
              width={site.logo.width}
              height={site.logo.height}
              priority
              className="h-14 w-14 sm:h-16 sm:w-16"
            />
          </a>

          <nav className="hidden items-center gap-7 lg:flex" aria-label={site.ui.menuLabel}>
            {site.nav.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                data-cursor="interactive"
                aria-current={current === link.href.slice(1) ? "true" : undefined}
                className="text-link text-[0.72rem] font-medium uppercase tracking-[0.16em] text-brown"
                onClick={(event) => {
                  event.preventDefault();
                  onNavigate(link.href);
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden lg:inline-flex">
              <Magnetic>
                <a
                  href={waLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="interactive"
                  className="btn btn-primary press"
                  aria-label={`${site.nav.cta} (${site.ui.opensInNewTab})`}
                >
                  {site.nav.cta}
                </a>
              </Magnetic>
            </div>
            <button
              ref={menuButton}
              type="button"
              className="press inline-flex h-11 w-11 items-center justify-center text-brown lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((value) => !value)}
            >
              <Menu aria-hidden="true" />
              <span className="sr-only">{site.ui.menu}</span>
            </button>
          </div>
        </div>
      </div>

      {open
        ? createPortal(
            <div className="fixed inset-0 z-50 lg:hidden" role="presentation">
          <div className="absolute inset-0 bg-ink/40" onClick={() => setOpen(false)} />
          <div
            ref={drawer}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="absolute inset-y-0 right-0 flex w-[min(100%,22rem)] flex-col bg-cream px-6 py-6 shadow-xl"
          >
            <div className="flex items-center justify-between">
              <p id={titleId} className="font-display text-2xl text-ink">
                {site.name}
              </p>
              <button
                type="button"
                className="inline-flex h-11 w-11 items-center justify-center"
                aria-label={site.ui.close}
                onClick={() => setOpen(false)}
              >
                <X aria-hidden="true" />
              </button>
            </div>
            <nav className="mt-10 flex flex-col" aria-label={site.ui.menuLabel}>
              {site.nav.links.map((link, index) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="drawer-link border-b border-line py-4 font-display text-4xl text-ink"
                  style={{ animationDelay: `${index * 70}ms` }}
                  onClick={(event) => {
                    event.preventDefault();
                    onNavigate(link.href);
                  }}
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary press mt-8"
              onClick={() => setOpen(false)}
            >
              {site.nav.cta}
            </a>
          </div>
        </div>,
            document.body,
          )
        : null}
    </header>
  );
}
