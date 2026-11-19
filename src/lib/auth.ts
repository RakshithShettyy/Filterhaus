import { createHmac, timingSafeEqual } from "crypto";

export const sessionCookie = "fh_admin";

function studioPassword() {
  return process.env.ADMIN_PASSWORD ?? "";
}

export function passwordsMatch(input: string, expected: string) {
  const left = Buffer.from(input);
  const right = Buffer.from(expected);
  if (left.length !== right.length) {
    timingSafeEqual(right, right);
    return false;
  }
  return timingSafeEqual(left, right);
}

export function signSession() {
  const secret = studioPassword();
  const expires = Date.now() + 14 * 24 * 60 * 60 * 1000;
  const body = `v1.${expires}`;
  const signature = createHmac("sha256", secret).update(body).digest("base64url");
  return `${body}.${signature}`;
}

export function sessionIsValid(token: string | undefined) {
  const secret = studioPassword();
  if (!secret || !token) return false;
  const parts = token.split(".");
  if (parts.length !== 3) return false;
  const body = `${parts[0]}.${parts[1]}`;
  const expected = createHmac("sha256", secret).update(body).digest("base64url");
  const left = Buffer.from(parts[2]);
  const right = Buffer.from(expected);
  if (left.length !== right.length || !timingSafeEqual(left, right)) return false;
  const expires = Number(parts[1]);
  return Number.isFinite(expires) && expires > Date.now();
}

export function passwordIsConfigured() {
  return studioPassword().length > 0;
}
