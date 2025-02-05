import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { ROUTES } from "./utils/routes";

export async function middleware(req) {
  const { pathname, searchParams } = req.nextUrl;
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const redirectTo = (path) => NextResponse.redirect(new URL(path, req.url));

  if (!token) {
    // Restrict unauthenticated users from protected pages
    if (
      [
        ROUTES.Dashboard,
        ROUTES.myPage,
        ROUTES.Orders,
        ROUTES.updatePassword,
        ROUTES.contributionRequests,
        ROUTES.accessRequests,
        ROUTES.viewSubmittedData,
        ROUTES.Verify_Email,
        ROUTES.checkout,
      ].some((route) => pathname.startsWith(route))
    ) {
      return redirectTo(ROUTES.Login);
    }

    return NextResponse.next();
  }

  // Check if token is expired
  const currentTime = Math.floor(Date.now() / 1000);
  if (token.exp && currentTime > token.exp) {
    return redirectTo(ROUTES.Login);
  }

  const { isVerified, isSuspended } = token;

  // Restrict suspended users to only Dashboard, Checkout, and Profile
  if (isSuspended) {
    if (
      ![ROUTES.Dashboard, ROUTES.checkout, ROUTES.myPage].includes(pathname)
    ) {
      return redirectTo(ROUTES.Dashboard);
    }
  }

  if (!isVerified && pathname !== ROUTES.Verify_Email) {
    return redirectTo(ROUTES.Verify_Email);
  }

  // Prevent verified users from accessing verify-email page
  if (pathname === ROUTES.Verify_Email) {
    return redirectTo(ROUTES.Dashboard);
  }

  // Prevent logged-in users from accessing login page
  if (pathname === ROUTES.Login) {
    return redirectTo(ROUTES.Dashboard);
  }

  // Ensure users can access verify-password page only with a token
  if (pathname === ROUTES.viewPasswordPageOTP) {
    const emailToken = searchParams.get("token");
    if (!emailToken) {
      return redirectTo(ROUTES.Login);
    }
  }

  // Handle 404 and 500 errors with custom error pages
  if (pathname.startsWith("/404")) {
    return redirectTo(ROUTES.NotFound);
  }
  if (pathname.startsWith("/500")) {
    return redirectTo(ROUTES.ServerError);
  }

  return NextResponse.next();
}
