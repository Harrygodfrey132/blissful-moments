import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useSession } from "next-auth/react";
import { API } from "../utils/api";
import { toast } from "react-toastify";

interface User {
  isVerified: boolean;
  id: string;
}

interface UseAuthReturn {
  user: User | null;
  loading: boolean;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  fetchUser: () => void;
}

const useAuth = (): UseAuthReturn => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isRequesting, setIsRequesting] = useState<boolean>(false); // Track API requests
  const router = useRouter();
  const { data: session, status } = useSession(); // Access session state

  const fetchUser = async () => {
    if (isRequesting || !session) return; // Prevent multiple requests if one is in progress and session exists

    setIsRequesting(true);
    setLoading(true);

    try {
      // Ensure session is fully loaded
      if (status === "loading") return;

      // Check if session contains valid user data
      if (!session?.user || !session.user.accessToken) {
        router.push("/login");
        return;
      }

      const token = session.user.accessToken;

      // Fetch user data from API
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}${API.getUser}`,
        { email: session.user.email },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      setUser(response.data);
    } catch (error) {
      setUser(null);
      toast.error("Failed to fetch user data");
    } finally {
      setLoading(false);
      setIsRequesting(false);
    }
  };

  // Fetch user data only if it's not already loaded and session is available
  useEffect(() => {
    if (status === "loading") return; // Wait for session to load

    // Proceed if authenticated and user data is not already available
    if (status === "authenticated" && !user) {
      fetchUser();
    }
  }, [session, status, user]); // Re-fetch user data if session changes and user data is not already loaded

  // Reset user data when the session is not available or session is expired
  useEffect(() => {
    if (status === "unauthenticated" || !session) {
      setUser(null); // Clear user data on session logout or unauthenticated state
    }
  }, [session, status]);

  return { user, loading, setUser, fetchUser };
};

export default useAuth;
