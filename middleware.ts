import { NextRequest, NextResponse } from "next/server";
import { verifySessionToken, SESSION_COOKIE } from "./lib/session";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname === "/backstage/login") return NextResponse.next();

  const token = req.cookies.get(SESSION_COOKIE)?.value;
  if (token && (await verifySessionToken(token))) {
    return NextResponse.next();
  }
  const login = req.nextUrl.clone();
  login.pathname = "/backstage/login";
  return NextResponse.redirect(login);
}

export const config = {
  matcher: ["/backstage/:path*"],
};
