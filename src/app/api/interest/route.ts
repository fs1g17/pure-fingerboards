import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/interest-admin";
import { getInterestCount, registerVisitor } from "@/lib/interest-store";

const VISITOR_COOKIE = "pf_visitor_id";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export async function GET() {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const count = await getInterestCount();
  return NextResponse.json({ count });
}

export async function POST() {
  const jar = await cookies();
  let visitorId = jar.get(VISITOR_COOKIE)?.value;

  if (!visitorId) {
    visitorId = crypto.randomUUID();
  }

  await registerVisitor(visitorId);
  const response = NextResponse.json({ ok: true });

  if (!jar.get(VISITOR_COOKIE)) {
    response.cookies.set(VISITOR_COOKIE, visitorId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: COOKIE_MAX_AGE,
      path: "/",
    });
  }

  return response;
}
