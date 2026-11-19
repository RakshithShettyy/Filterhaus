import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { sessionCookie, sessionIsValid } from "@/lib/auth";
import { readHomepage, removeUpload, saveUpload, writeHomepage, type Frame, type HomepageMedia } from "@/lib/homepage";
import { readImageSize } from "@/lib/imageSize";
import { site } from "@/data/site";

const slots = new Set(["hero", "founder", "photography", "reels", "films", "work"]);
const maxBytes = 30 * 1024 * 1024;
const videoMaxBytes = 80 * 1024 * 1024;

function fileKind(file: File) {
  const name = file.name.toLowerCase();
  const type = file.type.toLowerCase();
  if (type === "image/png" || name.endsWith(".png")) return "png";
  if (type === "image/webp" || name.endsWith(".webp")) return "webp";
  if (
    type === "image/jpeg" ||
    type === "image/jpg" ||
    type === "image/pjpeg" ||
    name.endsWith(".jpg") ||
    name.endsWith(".jpeg")
  ) {
    return "jpg";
  }
  if (type === "image/heic" || type === "image/heif" || name.endsWith(".heic") || name.endsWith(".heif")) {
    return "heic";
  }
  return null;
}

function videoKind(file: File) {
  const name = file.name.toLowerCase();
  const type = file.type.toLowerCase();
  if (type === "video/mp4" || name.endsWith(".mp4")) return "mp4";
  return null;
}

async function allowed() {
  const jar = await cookies();
  return sessionIsValid(jar.get(sessionCookie)?.value);
}

function cleanAlt(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim().slice(0, 180) : "";
}

export async function POST(request: Request) {
  if (!(await allowed())) {
    return NextResponse.json({ ok: false, error: site.admin.badPassword }, { status: 401 });
  }

  const form = await request.formData();
  const slot = String(form.get("slot") ?? "");
  const alt = cleanAlt(form.get("alt"));
  const id = String(form.get("id") ?? "");
  const file = form.get("file");

  if (slot === "showreel") {
    if (!(file instanceof File)) {
      return NextResponse.json({ ok: false, error: site.admin.videoError }, { status: 400 });
    }
    return saveShowreel(file);
  }

  if (!slots.has(slot) || alt.length < 3) {
    return NextResponse.json({ ok: false, error: site.admin.altError }, { status: 400 });
  }
  if (!(file instanceof File)) {
    return NextResponse.json({ ok: false, error: site.admin.fileError }, { status: 400 });
  }
  const extension = fileKind(file);
  if (extension === "heic") {
    return NextResponse.json({ ok: false, error: site.admin.heicError }, { status: 400 });
  }
  if (!extension || file.size < 1 || file.size > maxBytes) {
    return NextResponse.json({ ok: false, error: site.admin.fileError }, { status: 400 });
  }

  const bytes = Buffer.from(await file.arrayBuffer());
  const measured = readImageSize(bytes);
  const size = measured && measured.width > 0 && measured.height > 0 ? measured : { width: 1600, height: 2000 };

  const extensionName = extension;
  const src = await saveUpload(`${slot}-${Date.now()}.${extensionName}`, bytes);
  const media = await readHomepage();
  const frame: Frame = { id: id || slot, src, alt, width: size.width, height: size.height };

  let previous = "";
  if (slot === "hero") {
    previous = media.hero.src;
    media.hero = { ...frame, id: "hero" };
  } else if (slot === "founder") {
    previous = media.founder.src;
    media.founder = { ...frame, id: "founder" };
  } else if (slot === "work") {
    const index = media.work.findIndex((item) => item.id === id);
    if (index >= 0) {
      previous = media.work[index].src;
      media.work[index] = { ...frame, id: media.work[index].id };
    } else {
      media.work.push({ ...frame, id: `work-${Date.now()}` });
    }
  } else {
    const index = media.services.findIndex((item) => item.id === slot);
    if (index < 0) {
      return NextResponse.json({ ok: false, error: site.admin.failed }, { status: 400 });
    }
    previous = media.services[index].src;
    media.services[index] = { ...frame, id: slot };
  }

  await writeHomepage(media);
  if (previous && previous !== src) await removeUpload(previous);
  return NextResponse.json({ ok: true, media });
}

export async function PATCH(request: Request) {
  if (!(await allowed())) {
    return NextResponse.json({ ok: false, error: site.admin.badPassword }, { status: 401 });
  }

  const body = (await request.json()) as {
    action?: string;
    section?: string;
    id?: string;
    alt?: string;
    direction?: string;
  };
  const media = await readHomepage();

  if (body.action === "alt") {
    const alt = typeof body.alt === "string" ? body.alt.trim().slice(0, 180) : "";
    if (alt.length < 3) {
      return NextResponse.json({ ok: false, error: site.admin.altError }, { status: 400 });
    }
    const frame = findFrame(media, body.section, body.id);
    if (!frame) return NextResponse.json({ ok: false, error: site.admin.failed }, { status: 400 });
    frame.alt = alt;
  } else if (body.action === "remove" && body.id) {
    const index = media.work.findIndex((item) => item.id === body.id);
    if (index < 0) return NextResponse.json({ ok: false, error: site.admin.failed }, { status: 400 });
    const [removed] = media.work.splice(index, 1);
    await removeUpload(removed.src);
  } else if (body.action === "move" && body.id) {
    const index = media.work.findIndex((item) => item.id === body.id);
    const next = body.direction === "up" ? index - 1 : index + 1;
    if (index < 0 || next < 0 || next >= media.work.length) {
      return NextResponse.json({ ok: true, media });
    }
    const [item] = media.work.splice(index, 1);
    media.work.splice(next, 0, item);
  } else {
    return NextResponse.json({ ok: false, error: site.admin.failed }, { status: 400 });
  }

  await writeHomepage(media);
  return NextResponse.json({ ok: true, media });
}

async function saveShowreel(file: File) {
  if (!videoKind(file) || file.size < 1 || file.size > videoMaxBytes) {
    return NextResponse.json({ ok: false, error: site.admin.videoError }, { status: 400 });
  }

  const bytes = Buffer.from(await file.arrayBuffer());
  const src = await saveUpload(`showreel-${Date.now()}.mp4`, bytes);
  const media = await readHomepage();
  const previous = media.showreel.src;
  media.showreel = { src };
  await writeHomepage(media);
  if (previous && previous !== src) await removeUpload(previous);
  return NextResponse.json({ ok: true, media });
}

function findFrame(media: HomepageMedia, section: string | undefined, id: string | undefined) {
  if (section === "hero") return media.hero;
  if (section === "founder") return media.founder;
  if (section === "service") return media.services.find((item) => item.id === id);
  if (section === "work") return media.work.find((item) => item.id === id);
  return undefined;
}
