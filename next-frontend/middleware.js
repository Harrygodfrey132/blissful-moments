import { NextResponse } from "next/server";

export function middleware(req) {
  const { pathname } = req.nextUrl;

  // Redirect unauthenticated users away from /account pages
  if (!req.cookies.authToken && pathname.startsWith("/account")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}
