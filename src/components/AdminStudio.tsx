"use client";

import { useState } from "react";
import Image from "next/image";
import { site } from "@/data/site";
import type { Frame, HomepageMedia } from "@/lib/homepage";

const serviceNames = Object.fromEntries(site.services.items.map((item) => [item.id, item.title]));

type SaveResult = { ok: boolean; error?: string };

export function AdminStudio({ initial }: { initial: HomepageMedia }) {
  const copy = site.admin;
  const [media, setMedia] = useState(initial);
  const [notice, setNotice] = useState("");
  const [pending, setPending] = useState(false);

  const apply = async (response: Response): Promise<SaveResult> => {
    const body = (await response.json()) as { media?: HomepageMedia; error?: string };
    if (!response.ok || !body.media) {
      const error = body.error || copy.failed;
      setNotice(error);
      return { ok: false, error };
    }
    setMedia(body.media);
    setNotice(copy.saved);
    return { ok: true };
  };

  const upload = async (slot: string, alt: string, file: File | null, id?: string): Promise<SaveResult> => {
    if (alt.trim().length < 3) {
      setNotice(copy.altError);
      return { ok: false, error: copy.altError };
    }
    if (!file) {
      setNotice(copy.fileError);
      return { ok: false, error: copy.fileError };
    }
    setPending(true);
    setNotice("");
    try {
      const form = new FormData();
      form.set("slot", slot);
      form.set("alt", alt.trim());
      if (id) form.set("id", id);
      form.set("file", file);
      const response = await fetch("/api/admin/media", { method: "POST", body: form });
      return await apply(response);
    } catch {
      setNotice(copy.failed);
      return { ok: false, error: copy.failed };
    } finally {
      setPending(false);
    }
  };

  const patch = async (payload: Record<string, string>): Promise<SaveResult> => {
    setPending(true);
    setNotice("");
    try {
      const response = await fetch("/api/admin/media", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      return await apply(response);
    } catch {
      setNotice(copy.failed);
      return { ok: false, error: copy.failed };
    } finally {
      setPending(false);
    }
  };

  const uploadVideo = async (file: File | null): Promise<SaveResult> => {
    if (!file) {
      setNotice(copy.videoError);
      return { ok: false, error: copy.videoError };
    }
    setPending(true);
    setNotice("");
    try {
      const form = new FormData();
      form.set("slot", "showreel");
      form.set("file", file);
      const response = await fetch("/api/admin/media", { method: "POST", body: form });
      return await apply(response);
    } catch {
      setNotice(copy.failed);
      return { ok: false, error: copy.failed };
    } finally {
      setPending(false);
    }
  };

  const signOut = async () => {
    await fetch("/api/logout", { method: "POST" });
    window.location.assign("/");
  };

  return (
    <div className="mx-auto max-w-3xl px-5 py-28 sm:px-8">
      <div className="flex items-start justify-between gap-6">
        <div>
          <p className="eyebrow">{site.name}</p>
          <h1 className="mt-4 font-display text-5xl tracking-[-0.03em]">{copy.title}</h1>
          <p className="mt-4 max-w-xl leading-relaxed">{copy.intro}</p>
        </div>
        <button type="button" className="btn btn-secondary press shrink-0" onClick={signOut}>
          {copy.signOut}
        </button>
      </div>

      {notice ? (
        <p role="status" className="mt-8 border border-line px-4 py-3 text-sm text-brown">
          {notice}
        </p>
      ) : null}

      <section className="mt-14" aria-labelledby="admin-hero">
        <h2 id="admin-hero" className="font-display text-3xl">
          {copy.hero}
        </h2>
        <p className="mt-2 text-sm text-brown">{copy.heroNote}</p>
        <FrameForm
          frame={media.hero}
          pending={pending}
          onUpload={(alt, file) => upload("hero", alt, file)}
          onAlt={(alt) => patch({ action: "alt", section: "hero", alt })}
        />
      </section>

      <section className="mt-16" aria-labelledby="admin-showreel">
        <h2 id="admin-showreel" className="font-display text-3xl">
          {copy.showreel}
        </h2>
        <p className="mt-2 text-sm text-brown">{copy.showreelNote}</p>
        <ShowreelForm src={media.showreel.src} pending={pending} onUpload={uploadVideo} />
      </section>

      <section className="mt-16" aria-labelledby="admin-services">
        <h2 id="admin-services" className="font-display text-3xl">
          {copy.services}
        </h2>
        <p className="mt-2 text-sm text-brown">{copy.servicesNote}</p>
        <ul className="mt-6 space-y-10">
          {media.services.map((frame) => (
            <li key={frame.id}>
              <h3 className="font-display text-2xl">{serviceNames[frame.id] ?? frame.id}</h3>
              <FrameForm
                frame={frame}
                pending={pending}
                onUpload={(alt, file) => upload(frame.id, alt, file)}
                onAlt={(alt) => patch({ action: "alt", section: "service", id: frame.id, alt })}
              />
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-16" aria-labelledby="admin-work">
        <h2 id="admin-work" className="font-display text-3xl">
          {copy.work}
        </h2>
        <p className="mt-2 text-sm text-brown">{copy.workNote}</p>
        <ul className="mt-6 space-y-10">
          {media.work.map((frame, index) => (
            <li key={frame.id} className="border-t border-line pt-6">
              <FrameForm
                frame={frame}
                pending={pending}
                onUpload={(alt, file) => upload("work", alt, file, frame.id)}
                onAlt={(alt) => patch({ action: "alt", section: "work", id: frame.id, alt })}
              />
              <div className="mt-4 flex flex-wrap gap-3">
                <button type="button" className="btn btn-secondary press" disabled={pending || index === 0} onClick={() => patch({ action: "move", id: frame.id, direction: "up" })}>
                  {copy.moveUp}
                </button>
                <button
                  type="button"
                  className="btn btn-secondary press"
                  disabled={pending || index === media.work.length - 1}
                  onClick={() => patch({ action: "move", id: frame.id, direction: "down" })}
                >
                  {copy.moveDown}
                </button>
                <button type="button" className="btn btn-secondary press" disabled={pending} onClick={() => patch({ action: "remove", id: frame.id })}>
                  {copy.remove}
                </button>
              </div>
            </li>
          ))}
        </ul>
        <AddFrame pending={pending} onUpload={(alt, file) => upload("work", alt, file)} />
      </section>

      <section className="mt-16" aria-labelledby="admin-founder">
        <h2 id="admin-founder" className="font-display text-3xl">
          {copy.founder}
        </h2>
        <p className="mt-2 text-sm text-brown">{copy.founderNote}</p>
        <FrameForm
          frame={media.founder}
          pending={pending}
          onUpload={(alt, file) => upload("founder", alt, file)}
          onAlt={(alt) => patch({ action: "alt", section: "founder", alt })}
        />
      </section>
    </div>
  );
}

function FrameForm({
  frame,
  pending,
  onUpload,
  onAlt,
}: {
  frame: Frame;
  pending: boolean;
  onUpload: (alt: string, file: File | null) => Promise<SaveResult>;
  onAlt: (alt: string) => Promise<SaveResult>;
}) {
  const copy = site.admin;
  const [alt, setAlt] = useState(frame.alt);
  const [note, setNote] = useState("");
  const [failed, setFailed] = useState(false);

  return (
    <form
      className="mt-5 grid gap-4 sm:grid-cols-[7rem_1fr]"
      onSubmit={(event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const chosen = form.querySelector<HTMLInputElement>('input[type="file"]')?.files?.[0] ?? null;
        void (async () => {
          const result = chosen ? await onUpload(alt, chosen) : await onAlt(alt);
          setFailed(!result.ok);
          setNote(result.ok ? copy.saved : result.error || copy.failed);
          if (!result.ok) return;
          const input = form.querySelector<HTMLInputElement>('input[type="file"]');
          if (input) input.value = "";
        })();
      }}
    >
      <div className="relative h-28 w-full overflow-hidden bg-brown sm:w-28">
        <Image src={frame.src} alt="" fill sizes="112px" className="object-cover" />
      </div>
      <div>
        <label htmlFor={`${frame.id}-alt`} className="text-[0.72rem] font-medium uppercase tracking-[0.16em] text-gold-dark">
          {copy.altLabel}
        </label>
        <input
          id={`${frame.id}-alt`}
          value={alt}
          maxLength={180}
          className="mt-2 w-full border-b border-line bg-transparent py-2 text-ink outline-none"
          onChange={(event) => setAlt(event.target.value)}
        />
        <label htmlFor={`${frame.id}-file`} className="mt-4 block text-[0.72rem] font-medium uppercase tracking-[0.16em] text-gold-dark">
          {copy.fileLabel}
        </label>
        <input
          id={`${frame.id}-file`}
          type="file"
          accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp,.heic"
          className="mt-2 block w-full text-sm"
        />
        <button type="submit" className="btn btn-primary press mt-4" disabled={pending}>
          {pending ? copy.saving : copy.save}
        </button>
        {note ? (
          <p role="status" className={`mt-3 text-sm ${failed ? "text-brown" : "text-gold-dark"}`}>
            {note}
          </p>
        ) : null}
      </div>
    </form>
  );
}

function ShowreelForm({
  src,
  pending,
  onUpload,
}: {
  src: string;
  pending: boolean;
  onUpload: (file: File | null) => Promise<SaveResult>;
}) {
  const copy = site.admin;
  const [missing, setMissing] = useState(false);
  const [note, setNote] = useState("");
  const [failed, setFailed] = useState(false);

  return (
    <form
      className="mt-5 grid gap-4 sm:grid-cols-[11rem_1fr]"
      onSubmit={(event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const chosen = form.querySelector<HTMLInputElement>('input[type="file"]')?.files?.[0] ?? null;
        void (async () => {
          const result = await onUpload(chosen);
          setFailed(!result.ok);
          setNote(result.ok ? copy.saved : result.error || copy.failed);
          if (!result.ok) return;
          setMissing(false);
          const input = form.querySelector<HTMLInputElement>('input[type="file"]');
          if (input) input.value = "";
        })();
      }}
    >
      <div className="relative flex h-28 items-center justify-center overflow-hidden bg-brown text-center">
        {missing ? (
          <p className="px-3 font-display text-lg text-cream">{copy.showreel}</p>
        ) : (
          <video
            key={src}
            className="h-full w-full object-cover"
            src={src}
            muted
            playsInline
            preload="metadata"
            onError={() => setMissing(true)}
          />
        )}
      </div>
      <div>
        <label htmlFor="showreel-file" className="text-[0.72rem] font-medium uppercase tracking-[0.16em] text-gold-dark">
          {copy.videoLabel}
        </label>
        <input
          id="showreel-file"
          type="file"
          accept="video/mp4,.mp4"
          required
          className="mt-2 block w-full text-sm"
        />
        {missing ? <p className="mt-3 text-sm text-brown">{copy.showreelEmpty}</p> : null}
        <button type="submit" className="btn btn-primary press mt-4" disabled={pending}>
          {pending ? copy.saving : copy.save}
        </button>
        {note ? (
          <p role="status" className={`mt-3 text-sm ${failed ? "text-brown" : "text-gold-dark"}`}>
            {note}
          </p>
        ) : null}
      </div>
    </form>
  );
}

function AddFrame({ pending, onUpload }: { pending: boolean; onUpload: (alt: string, file: File | null) => Promise<SaveResult> }) {
  const copy = site.admin;
  const [alt, setAlt] = useState("");
  const [note, setNote] = useState("");
  const [failed, setFailed] = useState(false);

  return (
    <form
      className="mt-10 border-t border-line pt-6"
      onSubmit={(event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const chosen = form.querySelector<HTMLInputElement>('input[type="file"]')?.files?.[0] ?? null;
        void (async () => {
          const result = await onUpload(alt, chosen);
          setFailed(!result.ok);
          setNote(result.ok ? copy.saved : result.error || copy.failed);
          if (!result.ok) return;
          setAlt("");
          const input = form.querySelector<HTMLInputElement>('input[type="file"]');
          if (input) input.value = "";
        })();
      }}
    >
      <h3 className="font-display text-2xl">{copy.add}</h3>
      <label htmlFor="work-new-alt" className="mt-4 block text-[0.72rem] font-medium uppercase tracking-[0.16em] text-gold-dark">
        {copy.altLabel}
      </label>
      <input
        id="work-new-alt"
        value={alt}
        maxLength={180}
        className="mt-2 w-full border-b border-line bg-transparent py-2 text-ink outline-none"
        onChange={(event) => setAlt(event.target.value)}
      />
      <label htmlFor="work-new-file" className="mt-4 block text-[0.72rem] font-medium uppercase tracking-[0.16em] text-gold-dark">
        {copy.fileLabel}
      </label>
      <input
        id="work-new-file"
        type="file"
        accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp,.heic"
        required
        className="mt-2 block w-full text-sm"
      />
      <button type="submit" className="btn btn-primary press mt-4" disabled={pending}>
        {pending ? copy.saving : copy.add}
      </button>
      {note ? (
        <p role="status" className={`mt-3 text-sm ${failed ? "text-brown" : "text-gold-dark"}`}>
          {note}
        </p>
      ) : null}
    </form>
  );
}
