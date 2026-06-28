import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE,
  ADMIN_COOKIE_MAX_AGE,
  getAdminSessionToken,
  isValidAdminKey,
} from "@/lib/interest-admin";

export async function POST(request: Request) {
  const body = (await request.json()) as { key?: string };
  const key = body.key?.trim();

  if (!key || !isValidAdminKey(key)) {
    return NextResponse.json({ error: "Invalid key" }, { status: 401 });
  }

  const sessionToken = getAdminSessionToken();
  if (!sessionToken) {
    return NextResponse.json({ error: "Admin key not configured" }, { status: 500 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE, sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: ADMIN_COOKIE_MAX_AGE,
    path: "/",
  });

  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0,
    path: "/",
  });
  return response;
}
