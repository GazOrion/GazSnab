import { cookies } from "next/headers";
import { createHmac, timingSafeEqual } from "crypto";

const COOKIE_NAME = "gazsnab_admin";

function secret() {
  return process.env.AUTH_SECRET || "gazsnab-dev-secret";
}

function signature(value: string) {
  return createHmac("sha256", secret()).update(value).digest("hex");
}

export function createAdminToken() {
  const payload = `admin:${Date.now()}`;
  return `${payload}.${signature(payload)}`;
}

export function isValidAdminToken(token?: string) {
  if (!token || !token.includes(".")) return false;
  const [payload, sig] = token.split(".");
  const expected = signature(payload);
  const left = Buffer.from(sig);
  const right = Buffer.from(expected);
  return left.length === right.length && timingSafeEqual(left, right);
}

export async function getAdminSession() {
  const token = (await cookies()).get(COOKIE_NAME)?.value;
  return isValidAdminToken(token);
}

export async function setAdminSession() {
  (await cookies()).set(COOKIE_NAME, createAdminToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8
  });
}

export async function clearAdminSession() {
  (await cookies()).delete(COOKIE_NAME);
}
