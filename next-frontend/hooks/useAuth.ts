import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { API } from "../utils/api";

// Define the User interface
interface User {
  isVerified: boolean;
  // Add other properties for the User object as needed
}

// Define the hook's return type
interface UseAuthReturn {
  user: User | null;
  loading: boolean;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  fetchUser: () => void;
}

const useAuth = (): UseAuthReturn => {
  const [user, setUser] = useState<User | null>(null);  // Use User type or null
  const [loading, setLoading] = useState<boolean>(true);  // Loading state for API calls
  const router = useRouter();

  // Function to check session status and redirect if unauthenticated
  const checkSession = (): string | null => {
    const token = localStorage.getItem("token");  // Check if token exists
    if (!token) {
      router.push("/login");  // Redirect to login if no token found
    }
    return token;  // Return token (or null)
  };

  const fetchUser = async () => {
    setLoading(true);
    try {
      const token = checkSession();  // Check session on every fetch attempt
      if (!token) return;  // Exit if there's no valid token

      // Make API call to fetch user data if authenticated
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}${API.getUser}`, {
        headers: {
          Authorization: `Bearer ${token}`,  // Send token for authentication
        },
        withCredentials: true,  // Ensure credentials are sent with request
      });
      setUser(response.data);  // Set the user data in state
    } catch (error) {
      console.error("Failed to fetch user data", error);
      setUser(null);  // Set user to null in case of an error
    }
    setLoading(false);  // Set loading to false after the API call finishes
  };

  // Fetch user data on component mount
  useEffect(() => {
    fetchUser();
  }, []);  // Empty dependency array ensures this runs only once on mount

  return { user, loading, setUser, fetchUser };
};

export default useAuth;
