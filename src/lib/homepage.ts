import { mkdir, readFile, unlink, writeFile } from "fs/promises";
import path from "path";
import { site } from "@/data/site";

export type Frame = {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type ShowreelMedia = {
  src: string;
};

export type HomepageMedia = {
  hero: Frame;
  services: Frame[];
  work: Frame[];
  founder: Frame;
  showreel: ShowreelMedia;
};

const filePath = path.join(process.cwd(), "content", "homepage.json");
const uploadDir = path.join(process.cwd(), "public", "uploads");

export function seedHomepage(): HomepageMedia {
  return {
    hero: {
      id: "hero",
      src: site.hero.poster,
      alt: site.hero.mediaAlt,
      width: site.hero.mediaWidth,
      height: site.hero.mediaHeight,
    },
    services: site.services.items.map((item) => ({
      id: item.id,
      src: item.image,
      alt: item.imageAlt,
      width: item.width,
      height: item.height,
    })),
    work: site.work.images.map((image, index) => ({
      id: `work-${index + 1}`,
      src: image.src,
      alt: image.alt,
      width: image.width,
      height: image.height,
    })),
    founder: {
      id: "founder",
      src: site.about.founder.image,
      alt: site.about.founder.imageAlt,
      width: site.about.founder.width,
      height: site.about.founder.height,
    },
    showreel: {
      src: site.showreel.video,
    },
  };
}

export async function readHomepage(): Promise<HomepageMedia> {
  try {
    const parsed = JSON.parse(await readFile(filePath, "utf8")) as HomepageMedia;
    if (!parsed.hero?.src || !Array.isArray(parsed.services) || !Array.isArray(parsed.work) || !parsed.founder?.src) {
      return seedHomepage();
    }
    const seed = seedHomepage();
    return {
      ...parsed,
      showreel: parsed.showreel?.src ? parsed.showreel : seed.showreel,
    };
  } catch {
    return seedHomepage();
  }
}

export async function writeHomepage(media: HomepageMedia) {
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, `${JSON.stringify(media, null, 2)}\n`);
}

export async function saveUpload(name: string, bytes: Buffer) {
  await mkdir(uploadDir, { recursive: true });
  await writeFile(path.join(uploadDir, name), bytes);
  return `/uploads/${name}`;
}

export async function removeUpload(src: string) {
  if (!src.startsWith("/uploads/")) return;
  const name = path.basename(src);
  if (!name || name !== src.slice("/uploads/".length)) return;
  await unlink(path.join(uploadDir, name)).catch(() => undefined);
}
