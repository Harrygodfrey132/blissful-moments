import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useSession } from "next-auth/react"; // Import the useSession hook
import { API } from "../utils/api";
import { toast } from "sonner";

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
  const [isRequesting, setIsRequesting] = useState<boolean>(false); // New state to track API requests
  const router = useRouter();
  const { data: session, status } = useSession(); // Access the session

  const fetchUser = async () => {
    if (isRequesting) return; // Prevent multiple requests if one is already in progress

    setIsRequesting(true); // Set requesting flag to true
    setLoading(true);

    try {
      // Ensure the session is loaded and contains the token
      if (status === "loading") return; // Wait for session to load
      if (!session || !session.user || !session.user.accessToken) {
        router.push("/login");
        return;
      }

      const token = session.user.accessToken; // Retrieve the token from the session

      // Make the API call to fetch the user data
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
      setIsRequesting(false); // Reset the flag when the request is complete
    }
  };

  useEffect(() => {
    if (status !== "loading" && session) {
      fetchUser();
    }
  }, [session, status]); // Re-fetch when session changes

  useEffect(() => {
  }, [user]);

  return { user, loading, setUser, fetchUser };
};

export default useAuth;
