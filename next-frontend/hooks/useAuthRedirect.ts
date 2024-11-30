import { useEffect } from "react";
import { useRouter } from "next/router";
import useAuth from "./useAuth"; // Assuming useAuth is a custom hook
import { ROUTES } from "../utils/routes";

// Define the User interface
interface User {
  isVerified: boolean;
}

const useAuthRedirect = (redirectIfLoggedOut = true, requireVerification = false) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user && redirectIfLoggedOut) {
        router.push(ROUTES.Login);
      } else if (user && !user.isVerified && requireVerification) {
        router.push(ROUTES.Verify_Email);
      }
    }
  }, [user, loading, router]);
};

export default useAuthRedirect;
