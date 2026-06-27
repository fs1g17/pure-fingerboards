import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getInterestCount, registerVisitor } from "@/lib/interest-store";

const VISITOR_COOKIE = "pf_visitor_id";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export async function GET() {
  const count = await getInterestCount();
  return NextResponse.json({ count });
}

export async function POST() {
  const jar = await cookies();
  let visitorId = jar.get(VISITOR_COOKIE)?.value;

  if (!visitorId) {
    visitorId = crypto.randomUUID();
  }

  const { count, isNew } = await registerVisitor(visitorId);
  const response = NextResponse.json({ count, isNew });

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
