import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { ROUTES } from "./utils/routes"; // Import your routes object

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  // Get the session token from cookies
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const redirectTo = (path) => NextResponse.redirect(new URL(path, req.url));

  // If no token exists, handle unauthenticated access
  if (!token) {
    // Restrict access to these pages for unauthenticated users
    if (
      pathname.startsWith(ROUTES.Dashboard) ||
      pathname.startsWith(ROUTES.myPage) ||
      pathname.startsWith(ROUTES.Orders) ||
      pathname.startsWith(ROUTES.updatePassword) ||
      pathname.startsWith(ROUTES.contributionRequests) ||
      pathname.startsWith(ROUTES.accessRequests) ||
      pathname.startsWith(ROUTES.viewSubmittedData) ||
      pathname.startsWith(ROUTES.Verify_Email) ||
      pathname.startsWith(ROUTES.checkout)
    ) {
      return redirectTo(ROUTES.Login); // Redirect unauthenticated users to the login page
    }
    return NextResponse.next(); // Allow access to other public pages
  }

  // Token is present, check its validity
  const currentTime = Math.floor(Date.now() / 1000); // Current timestamp in seconds
  if (token.exp && currentTime > token.exp) {
    return redirectTo(ROUTES.Login); // Token expired, redirect to login
  }

  // Token is valid, extract user state
  const isVerified = token?.isVerified;

  // If user is not verified
  if (!isVerified) {
    // Restrict access to verified user-only pages
    if (
      pathname.startsWith(ROUTES.Dashboard) ||
      pathname.startsWith(ROUTES.myPage) ||
      pathname.startsWith(ROUTES.Orders) ||
      pathname.startsWith(ROUTES.updatePassword) ||
      pathname.startsWith(ROUTES.contributionRequests) ||
      pathname.startsWith(ROUTES.accessRequests) ||
      pathname.startsWith(ROUTES.viewSubmittedData) ||
      pathname.startsWith(ROUTES.checkout)
    ) {
      return redirectTo(ROUTES.Verify_Email);
    }
    return NextResponse.next();
  }

  // If user is verified, prevent them from accessing verify-email page
  if (pathname === ROUTES.Verify_Email) {
    return redirectTo(ROUTES.Dashboard); // Redirect verified users to the dashboard
  }

  // If user is already logged in, prevent access to login page
  if (pathname === ROUTES.Login) {
    return redirectTo(ROUTES.Dashboard);
  }

  // Ensure that users can only access the verify password page after sending OTP
  if (pathname === ROUTES.viewPasswordPageOTP) {
    const emailToken = searchParams.get("token");
    if (!emailToken) {
      return redirectTo(ROUTES.Login);
    }
  }

  return NextResponse.next();
}
