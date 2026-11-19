import type { Metadata } from "next";
import { cookies } from "next/headers";
import { connection } from "next/server";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/LoginForm";
import { sessionCookie, sessionIsValid } from "@/lib/auth";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Studio desk",
  robots: { index: false, follow: false },
};

export const instant = false;

export default async function LoginPage() {
  await connection();
  const jar = await cookies();
  if (sessionIsValid(jar.get(sessionCookie)?.value)) redirect("/admin");

  return (
    <main id="main" className="mx-auto max-w-3xl px-5 py-32 sm:px-8">
      <p className="eyebrow">{site.name}</p>
      <h1 className="mt-4 font-display text-5xl tracking-[-0.03em]">{site.admin.loginTitle}</h1>
      <p className="mt-4 max-w-md leading-relaxed">{site.admin.loginBody}</p>
      <LoginForm />
      <a href="/" className="text-link mt-10 inline-block text-sm text-brown">
        {site.admin.backHome}
      </a>
    </main>
  );
}
