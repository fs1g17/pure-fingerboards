import { createHash } from "node:crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "pf_interest_admin";
export const ADMIN_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

export function getAdminKey(): string | undefined {
  const hex = process.env.INTEREST_ADMIN_KEY_HEX?.trim();
  if (hex) {
    return Buffer.from(hex, "hex").toString("utf8");
  }

  return process.env.INTEREST_ADMIN_KEY?.trim();
}

export function getAdminSessionToken(): string | undefined {
  const secret = getAdminKey();
  if (!secret) return undefined;
  return createHash("sha256").update(secret).digest("hex");
}

export function isValidAdminKey(key: string): boolean {
  const secret = getAdminKey();
  if (!secret) return false;
  return key === secret;
}

export async function isAdminRequest(): Promise<boolean> {
  const token = getAdminSessionToken();
  if (!token) return false;

  const jar = await cookies();
  return jar.get(ADMIN_COOKIE)?.value === token;
}
