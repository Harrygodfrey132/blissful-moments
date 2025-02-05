// utils/routes.ts

export const ROUTES = {
  Home: "/",
  Verify_Email: "/verify-email",
  Register: "/register",
  Login: "/login",
  PROFILE: (id: string) => `/profile/${id}`,
  Dashboard: "/dashboard",
  About_Us: "/about",
  Request_Demo: "/request-demo",
  Pricing: "/pricing",
  Blogs: "/blog",
  Profile: "/profile",
  Orders: "/orders",
  myPage: "/my-page",
  updatePassword: "/update-password",
  contributionRequests: "/contribution-requests",
  accessRequests: "/access-requests",
  submissionSuccessful: "/submission-successful",
  viewSubmittedData: "/memory/view",
  resetPassword: "/update-new-password",
  viewPasswordPageOTP: "/verify-password-otp",
  termsAndConditions: "/terms-and-conditions",
  checkout: "/checkout",
  NotFound:"/page-not-found"
};
