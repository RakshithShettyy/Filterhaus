import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { passwordIsConfigured, passwordsMatch, sessionCookie, signSession } from "@/lib/auth";
import { site } from "@/data/site";

export async function POST(request: Request) {
  let password = "";
  try {
    const body = (await request.json()) as { password?: unknown };
    password = typeof body.password === "string" ? body.password : "";
  } catch {
    password = "";
  }

  const expected = process.env.ADMIN_PASSWORD ?? "";
  if (!passwordIsConfigured() || !passwordsMatch(password, expected)) {
    return NextResponse.json({ ok: false, error: site.admin.badPassword }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(sessionCookie, signSession(), {
    httpOnly: true,
    sameSite: "lax",
    secure: new URL(request.url).protocol === "https:",
    path: "/",
    maxAge: 60 * 60 * 24 * 14,
  });
  return response;
}

export async function GET() {
  const jar = await cookies();
  return NextResponse.json({ ok: Boolean(jar.get(sessionCookie)?.value) });
}
