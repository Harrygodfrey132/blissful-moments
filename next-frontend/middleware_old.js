import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  // Get the session token from cookies
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const redirectTo = (path) => NextResponse.redirect(new URL(path, req.url));

  // If no token exists, handle unauthenticated access
  if (!token) {
    if (pathname.startsWith("/account") || pathname.startsWith("/dashboard")) {
      return redirectTo("/login"); // Redirect unauthenticated users
    }
    return NextResponse.next(); // Allow access to other public pages
  }

  // Token is present, check its validity
  const currentTime = Math.floor(Date.now() / 1000); // Current timestamp in seconds
  if (token.exp && currentTime > token.exp) {
    return redirectTo("/login"); // Token expired, redirect to login
  }

  // Token is valid, extract user state
  const isVerified = token?.isVerified;

  // Redirect authenticated users based on the path and validation status
  if (pathname === "/login" && isVerified) {
    return redirectTo("/dashboard"); // Prevent logged-in users from accessing login
  }

  if (!isVerified && pathname.startsWith("/account")) {
    return redirectTo("/verify-email"); // Redirect unverified users
  }

  if (isVerified && pathname === "/verify-email") {
    return redirectTo("/dashboard"); // Prevent verified users from accessing verify-email
  }

  return NextResponse.next(); // Continue processing the request for valid cases
}
