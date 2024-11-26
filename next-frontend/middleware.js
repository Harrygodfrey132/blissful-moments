import { NextResponse } from "next/server";

export function middleware(req) {
  const { pathname } = req.nextUrl;

  // Check if the user is authenticated by checking for the authToken
  const authToken = req.cookies.get("authToken");

  if (!authToken) {
    // Redirect unauthenticated users to the login page if they try to access account-related routes
    if (pathname.startsWith("/account") || pathname.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  } else {
    // Parse the authToken to get the user data
    const user = JSON.parse(authToken);
    const isValidated = user?.isValidated;

    // Redirect already validated users trying to access the login page
    if (pathname === "/login" && isValidated) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    // Redirect authenticated but unvalidated users to the verify-email page
    if (!isValidated && pathname.startsWith("/account")) {
      return NextResponse.redirect(new URL("/verify-email", req.url));
    }

    // Prevent access to verify-email page for already validated users
    if (isValidated && pathname === "/verify-email") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }

  // Continue processing the request if no redirection is needed
  return NextResponse.next();
}
