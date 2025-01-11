// utils/routes.ts

export const ROUTES = {
  Home: "/",
  Register: "/register",
  Verify_Email: "/verify-email",
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
  updatePassword:"/update-password",
  contributionRequests:"/contribution-requests"
};
