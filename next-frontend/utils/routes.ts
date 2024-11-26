// utils/routes.ts

export const ROUTES = {
    Home: "/",
    Register: "/register",
    Verify_Email: "/verify-email",
    Login: "/login",
    PROFILE: (id: string) => `/profile/${id}`,
    Dashboard: "/dashboard",
};
