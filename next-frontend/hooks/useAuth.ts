import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useSession } from "next-auth/react";
import { API } from "../utils/api";
import { toast } from "react-toastify";
import { useUserContext } from "../context/UserContext";

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
  const { setUserData } = useUserContext();
  const fetchUser = async () => {
    if (isRequesting || !session || status !== "authenticated") return; // Ensure no concurrent requests and session is authenticated

    setIsRequesting(true);
    setLoading(true);

    try {
      const token = session.user?.accessToken;

      // Ensure token exists before proceeding
      if (!token) {
        router.push("/login");
        return;
      }

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
      setUserData(response.data.user);
    } catch (error) {
      setUser(null);
      toast.error("Failed to fetch user data");
    } finally {
      setLoading(false);
      setIsRequesting(false);
    }
  };

  useEffect(() => {
    // Wait for the session status to resolve
    if (status === "authenticated" && !user) {
      fetchUser();
    }
  }, [session, status, user]);

  useEffect(() => {
    // Clear user state when the session is unauthenticated
    if (status === "unauthenticated") {
      setUser(null);
    }
  }, [status]);

  return { user, loading, setUser, fetchUser };
};

export default useAuth;
