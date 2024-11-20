// utils/routes.ts

export const ROUTES = {
    HOME: "/",
    REGISTER: "/register",
    LOGIN: "/login",
    PROFILE: (id: string) => `/profile/${id}`,
    DASHBOARD: "/dashboard",
};
