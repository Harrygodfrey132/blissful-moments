// utils/routes.ts

export const ROUTES = {
    HOME: "/",
    REGISTER: "/register",
    VERIFY_EMAIL: "/verify-email",
    LOGIN: "/login",
    PROFILE: (id: string) => `/profile/${id}`,
    DASHBOARD: "/dashboard",
};
