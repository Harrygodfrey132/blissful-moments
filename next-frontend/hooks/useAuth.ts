import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useSession } from "next-auth/react";
import { API } from "../utils/api";
import { toast } from "react-toastify";
import { useUserContext } from "../context/UserContext";

interface User {
  id: string;
  email: string;
  isVerified: boolean;
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
  const router = useRouter();
  const { data: session, status } = useSession();
  const { setUserData } = useUserContext();
  const isRequestingRef = useRef<boolean>(false); // Track ongoing requests

  const fetchUser = async () => {
    if (isRequestingRef.current || !session || status !== "authenticated")
      return;

    isRequestingRef.current = true;
    setLoading(true);

    try {
      const token = session.user?.accessToken;
      if (!token) {
        router.push("/login");
        return;
      }

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
      console.error("Failed to fetch user data:", error);
      setUser(null);
      toast.error("Failed to fetch user data");
    } finally {
      setLoading(false);
      isRequestingRef.current = false;
    }
  };

  useEffect(() => {
    if (status === "authenticated" && !user && !isRequestingRef.current) {
      fetchUser(); // Only fetch if authenticated and user is not set yet
    }
  }, [status, session]);

  useEffect(() => {
    if (status === "unauthenticated") {
      setUser(null); // Clear user data when unauthenticated
    }
  }, [status]);

  return { user, loading, setUser, fetchUser };
};

export default useAuth;
