import type { Metadata } from "next";
import { cookies } from "next/headers";
import { connection } from "next/server";
import { redirect } from "next/navigation";
import { AdminStudio } from "@/components/AdminStudio";
import { sessionCookie, sessionIsValid } from "@/lib/auth";
import { readHomepage } from "@/lib/homepage";

export const metadata: Metadata = {
  title: "Photos",
  robots: { index: false, follow: false },
};

export const instant = false;

export default async function AdminPage() {
  await connection();
  const jar = await cookies();
  if (!sessionIsValid(jar.get(sessionCookie)?.value)) redirect("/login");
  const media = await readHomepage();
  return (
    <main id="main">
      <AdminStudio initial={media} />
    </main>
  );
}
