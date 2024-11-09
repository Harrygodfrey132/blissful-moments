import axios from "axios";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL, // Ensure this variable is set in .env.local
    withCredentials: true, // Required for Laravel Sanctum
});

export async function getCsrfToken() {
    await api.get("/sanctum/csrf-cookie"); // Get CSRF token from backend
}

export async function login(email, password) {
    await getCsrfToken();
    return api.post("/login", { email, password });
}

export async function logout() {
    return api.post("/logout");
}

export default api;
