import { useEffect } from "react";
import { useRouter } from "next/router";
import useAuth from "./useAuth";
import { ROUTES } from "../utils/routes";

// Define the User interface
interface User {
  isVerified: boolean;
}

const useAuthRedirect = (redirectIfLoggedOut = true, requireVerification = false) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return; // Prevent redirecting while loading

    // If the user is not logged in and we need to redirect, do so
    if (!user && redirectIfLoggedOut) {
      router.push(ROUTES.Login);
      return;
    }

    // If the user is not verified and we require verification, do so
    if (user && !user.isVerified && requireVerification) {
      router.push(ROUTES.Verify_Email);
    }
  }, [user, loading, router, redirectIfLoggedOut, requireVerification]); // Add dependencies for accurate effect triggers
};

export default useAuthRedirect;
