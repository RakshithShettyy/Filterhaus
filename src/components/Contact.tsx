"use client";

import { useEffect, useRef, useState } from "react";
import { Calendar, Mail, MapPin, Phone } from "lucide-react";
import { mailLink, site, telLink, waLink } from "@/data/site";
import { cn } from "@/lib/cn";
import { shell, sectionY } from "@/lib/layout";
import { Magnetic } from "@/components/motion/Magnetic";

type Values = {
  name: string;
  business: string;
  niche: string;
  nicheOther: string;
  need: string;
  date: string;
  budget: string;
};

type Errors = Partial<Record<keyof Values, string>>;

const empty: Values = {
  name: "",
  business: "",
  niche: "",
  nicheOther: "",
  need: "",
  date: "",
  budget: "",
};

function readableDate(iso: string) {
  const [year, month, day] = iso.split("-");
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const name = months[Number(month) - 1];
  if (!name || !day || !year) return iso;
  return `${name} ${day}, ${year}`;
}

export function Contact() {
  const copy = site.contactForm;
  const [values, setValues] = useState<Values>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [href, setHref] = useState("");

  const set = (key: keyof Values) => (value: string) => {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => {
      if (!(key in current)) return current;
      const next = { ...current };
      delete next[key];
      return next;
    });
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const next: Errors = {};
    if (values.name.trim().length < 2) next.name = copy.fields.name.error;
    if (values.business.trim().length < 2) next.business = copy.fields.business.error;
    if (!values.niche) next.niche = copy.fields.niche.error;
    if (values.niche === "other" && values.nicheOther.trim().length < 2) {
      next.nicheOther = copy.fields.nicheOther.error;
    }
    if (values.need.trim().length < 10) next.need = copy.fields.need.error;
    if (values.date && Number.isNaN(Date.parse(values.date))) next.date = copy.fields.date.error;
    setErrors(next);
    const first = Object.keys(next)[0] as keyof Values | undefined;
    if (first) {
      document.getElementById(`contact-${first}`)?.focus();
      return;
    }

    const niche =
      values.niche === "other"
        ? values.nicheOther.trim()
        : (copy.niches.find((item) => item.value === values.niche)?.label ?? values.niche);
    const budget = copy.budgets.find((item) => item.value === values.budget)?.label;
    const lines = [
      `${copy.fields.name.label}: ${values.name.trim()}`,
      `${copy.fields.business.label}: ${values.business.trim()}`,
      `${copy.fields.niche.label}: ${niche}`,
      `${copy.fields.need.label}: ${values.need.trim()}`,
    ];
    if (values.date) lines.push(`${copy.fields.date.label}: ${readableDate(values.date)}`);
    if (site.showPrices && budget) lines.push(`${copy.fields.budget.label}: ${budget}`);

    const url = waLink(lines.join("\n"));
    setHref(url);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const emailBody = [
    `${copy.fields.name.label}: ${values.name.trim()}`,
    `${copy.fields.business.label}: ${values.business.trim()}`,
    `${copy.fields.need.label}: ${values.need.trim()}`,
  ].join("\n");

  return (
    <section id={copy.id} className={cn(sectionY, "surface-brown bg-brown text-cream")} aria-labelledby="contact-title">
      <div className={cn(shell, "grid gap-10 lg:grid-cols-12")}>
        <div className="lg:col-span-5">
          <p className="eyebrow">
            {copy.index} — {copy.eyebrow}
          </p>
          <h2 id="contact-title" className="mt-4 font-display text-[clamp(2.6rem,6vw,4.8rem)] font-medium leading-[0.95] tracking-[-0.03em]">
            {copy.title}
          </h2>
          <p className="mt-6 max-w-md leading-relaxed text-cream">{copy.intro}</p>
          <ul className="mt-10 space-y-4 text-sm">
            <li>
              <a className="inline-flex items-center gap-3" href={telLink()} data-cursor="interactive">
                <Phone aria-hidden="true" className="shrink-0" size={16} />
                <span className="text-link">{site.contact.phoneDisplay}</span>
              </a>
            </li>
            <li>
              <a
                className="inline-flex items-center gap-3"
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="interactive"
                aria-label={`${site.nav.cta}, ${site.contact.phoneDisplay} (${site.ui.opensInNewTab})`}
              >
                <svg aria-hidden="true" className="shrink-0" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.09-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
                </svg>
                <span className="text-link">{site.contact.phoneDisplay}</span>
              </a>
            </li>
            <li>
              <a className="inline-flex items-center gap-3" href={mailLink()} data-cursor="interactive">
                <Mail aria-hidden="true" className="shrink-0" size={16} />
                <span className="text-link">{site.contact.email}</span>
              </a>
            </li>
            <li>
              <a
                className="inline-flex items-center gap-3"
                href={site.contact.instagram}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="interactive"
                aria-label={`${site.contact.instagramLabel} (${site.ui.opensInNewTab})`}
              >
                <svg
                  aria-hidden="true"
                  className="shrink-0"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
                <span className="text-link">{site.contact.instagramLabel}</span>
              </a>
            </li>
            <li className="inline-flex items-center gap-3">
              <MapPin aria-hidden="true" className="shrink-0" size={16} />
              {site.contact.location}
            </li>
          </ul>
          <p className="mt-8 text-[0.72rem] font-medium uppercase tracking-[0.16em] text-gold">
            {site.contact.hoursLabel}
          </p>
          <dl className="mt-3 space-y-1 text-sm">
            {site.contact.hours.map((row) => (
              <div key={row.days} className="flex justify-between gap-6 border-b border-cream/15 py-2">
                <dt>{row.days}</dt>
                <dd className="text-right">{row.time}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-sm text-cream/80">{site.contact.travelNote}</p>
          <p className="mt-2 text-sm text-cream/80">{site.contact.serviceAreas.join(", ")}</p>
        </div>

        <form className="lg:col-span-6 lg:col-start-7" noValidate onSubmit={onSubmit}>
          <style>{".date-field{position:relative}.date-field::-webkit-calendar-picker-indicator{opacity:0;pointer-events:none}"}</style>
          {Object.keys(errors).length > 0 ? (
            <p role="alert" className="mb-6 text-sm text-[#f6e3c0]">
              {copy.errorSummary}
            </p>
          ) : null}
          <div className="grid gap-7">
            <TextField id="contact-name" label={copy.fields.name.label} value={values.name} error={errors.name} autoComplete="name" maxLength={80} onChange={set("name")} />
            <TextField id="contact-business" label={copy.fields.business.label} value={values.business} error={errors.business} autoComplete="organization" maxLength={80} onChange={set("business")} />
            <SelectField
              id="contact-niche"
              label={copy.fields.niche.label}
              value={values.niche}
              error={errors.niche}
              placeholder={copy.nichePlaceholder}
              options={copy.niches}
              onChange={(value) => {
                set("niche")(value);
                setErrors((current) => {
                  if (!current.nicheOther) return current;
                  const next = { ...current };
                  delete next.nicheOther;
                  return next;
                });
              }}
            />
            {values.niche === "other" ? (
              <TextField
                id="contact-nicheOther"
                label={copy.fields.nicheOther.label}
                value={values.nicheOther}
                error={errors.nicheOther}
                maxLength={80}
                autoFocus
                onChange={set("nicheOther")}
              />
            ) : null}
            <TextField id="contact-need" label={copy.fields.need.label} value={values.need} error={errors.need} maxLength={600} multiline onChange={set("need")} />
            <TextField id="contact-date" label={copy.fields.date.label} value={values.date} error={errors.date} type="date" onChange={set("date")} />
            {site.showPrices ? (
              <SelectField id="contact-budget" label={copy.fields.budget.label} value={values.budget} error={errors.budget} placeholder={copy.budgetPlaceholder} options={copy.budgets} onChange={set("budget")} />
            ) : null}
          </div>
          <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <Magnetic>
              <button type="submit" className="btn btn-light press" data-cursor="interactive">
                {copy.submit}
              </button>
            </Magnetic>
            <a className="text-link text-sm" href={mailLink(emailBody)} data-cursor="interactive">
              {copy.emailInstead}
            </a>
          </div>
          {href ? (
            <p className="mt-5 text-sm" role="status">
              {copy.opening}{" "}
              <a className="text-link" href={href} target="_blank" rel="noopener noreferrer">
                {copy.fallback}
              </a>
            </p>
          ) : (
            <p className="mt-5 text-sm text-cream/75">{copy.requiredNote}</p>
          )}
        </form>
      </div>
    </section>
  );
}

function TextField({
  id,
  label,
  value,
  error,
  onChange,
  type = "text",
  multiline = false,
  autoComplete,
  maxLength,
  autoFocus = false,
}: {
  id: string;
  label: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
  type?: string;
  multiline?: boolean;
  autoComplete?: string;
  maxLength?: number;
  autoFocus?: boolean;
}) {
  const [focus, setFocus] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const floated = focus || value.length > 0 || type === "date";

  useEffect(() => {
    const input = inputRef.current;
    if (!input || type !== "date") return;
    const openCalendar = () => {
      if (typeof input.showPicker !== "function") return;
      try {
        input.showPicker();
      } catch {
        // The calendar is already open.
      }
    };
    input.addEventListener("click", openCalendar);
    return () => input.removeEventListener("click", openCalendar);
  }, [type]);
  const className =
    "w-full border-b border-cream/35 bg-transparent pb-3 pt-6 text-cream outline-none placeholder:text-transparent";
  const describedBy = error ? `${id}-error` : undefined;

  return (
    <div>
      <div className="relative">
        {multiline ? (
          <textarea
            id={id}
            value={value}
            rows={4}
            maxLength={maxLength}
            placeholder=" "
            aria-invalid={error ? true : undefined}
            aria-describedby={describedBy}
            className={className}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            onChange={(event) => onChange(event.target.value)}
          />
        ) : (
          <input
            ref={inputRef}
            id={id}
            type={type}
            value={value}
            maxLength={maxLength}
            autoComplete={autoComplete}
            autoFocus={autoFocus}
            placeholder=" "
            aria-invalid={error ? true : undefined}
            aria-describedby={describedBy}
            className={cn(className, type === "date" && "date-field [color-scheme:dark]")}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            onChange={(event) => onChange(event.target.value)}
          />
        )}
        <label
          htmlFor={id}
          className={cn(
            "pointer-events-none absolute left-0 origin-left text-sm text-cream/75 transition-transform duration-200",
            floated ? "top-0 scale-[0.82]" : "top-6",
          )}
        >
          {label}
        </label>
        {type === "date" ? (
          <Calendar aria-hidden="true" className="pointer-events-none absolute bottom-3 right-0 size-4 text-cream" strokeWidth={1.75} />
        ) : null}
        <span
          aria-hidden="true"
          className={cn(
            "mt-px block h-px origin-left bg-gold transition-transform duration-300",
            focus ? "scale-x-100" : "scale-x-0",
          )}
        />
      </div>
      {error ? (
        <p id={`${id}-error`} className="mt-2 text-sm text-[#f6e3c0]">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function SelectField({
  id,
  label,
  value,
  error,
  placeholder,
  options,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  error?: string;
  placeholder: string;
  options: readonly { value: string; label: string }[];
  onChange: (value: string) => void;
}) {
  const [focus, setFocus] = useState(false);
  return (
    <div>
      <label htmlFor={id} className="block origin-left text-[0.82rem] text-cream/80">
        {label}
      </label>
      <select
        id={id}
        value={value}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className="field-select mt-2 w-full border-b border-cream/35 bg-transparent pb-3 text-cream outline-none"
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        onChange={(event) => onChange(event.target.value)}
      >
        <option value="" disabled hidden>
          {placeholder}
        </option>
        <option value="" disabled className="field-select-label">
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <span
        aria-hidden="true"
        className={cn("block h-px origin-left bg-gold transition-transform duration-300", focus ? "scale-x-100" : "scale-x-0")}
      />
      {error ? (
        <p id={`${id}-error`} className="mt-2 text-sm text-[#f6e3c0]">
          {error}
        </p>
      ) : null}
    </div>
  );
}
