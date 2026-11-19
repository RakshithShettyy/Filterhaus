import Link from "next/link";
import { site } from "@/data/site";

export default function NotFound() {
  return (
    <main id="main" className="mx-auto flex min-h-[70svh] max-w-3xl flex-col justify-center px-5 py-32">
      <p className="eyebrow">{site.name}</p>
      <h1 className="mt-4 font-display text-5xl tracking-[-0.03em] text-ink">{site.notFound.title}</h1>
      <p className="mt-4 text-lg">{site.notFound.body}</p>
      <Link href="/" className="btn btn-primary press mt-8 w-fit">
        {site.notFound.cta}
      </Link>
    </main>
  );
}
