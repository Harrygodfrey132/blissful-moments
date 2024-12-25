import { useEffect } from "react";
import { useRouter } from "next/router";
import useAuth from "./useAuth";
import { ROUTES } from "../utils/routes";

const useAuthRedirect = (
  redirectIfLoggedOut = true,
  requireVerification = false
) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Don't do anything if session is loading
    if (loading) return;
    console.log(user);
    
    // Prevent unnecessary redirects or re-fetching if already verified
    if (user?.isVerified) {
      // If the user is verified and trying to access /verify-email, redirect to dashboard
      if (router.pathname === ROUTES.Verify_Email) {
        router.push(ROUTES.Dashboard); // Redirect to dashboard or another page for verified users
      }
      return;
    }

    // If user is not verified, redirect to email verification page
    if (user && !user.isVerified && requireVerification) {
      router.push(ROUTES.Verify_Email);
    }

    // If user is logged out, redirect to login page
    if (!user && redirectIfLoggedOut) {
      router.push(ROUTES.Login);
    }
  }, [user, loading, router, redirectIfLoggedOut, requireVerification]);
};

export default useAuthRedirect;
