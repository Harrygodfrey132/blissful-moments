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

  // Handle redirections for unverified users
  // if (!isVerified) {
  //   if (pathname.startsWith("/dashboard") || pathname.startsWith("/account")) {
  //     return redirectTo("/verify-email"); // Redirect unverified users to verify-email
  //   }
  //   return NextResponse.next(); // Allow access to public pages
  // }

  // Prevent verified users from accessing verify-email
  if (pathname === "/verify-email" && isVerified) {
    return redirectTo("/dashboard");
  }

  return NextResponse.next(); // Continue processing the request for valid cases
}
