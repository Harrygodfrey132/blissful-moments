import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { API } from "../utils/api";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Function to check session status and redirect if unauthenticated
  const checkSession = () => {
    const token = localStorage.getItem("token"); // Or check the cookie/session storage
    if (!token) {
      router.push("/login");
    }
    return token;
  };

  const fetchUser = async () => {
    setLoading(true);
    try {
      const token = checkSession(); // Check if session exists, if not, redirect to login
      if (!token) return; // If there's no token, avoid making the API call

      // Proceed with the API request if the user is authenticated
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}${API.getUser}`, { withCredentials: true });
      setUser(response.data);
    } catch (error) {
      setUser(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return { user, loading, setUser, fetchUser };
};

export default useAuth;
