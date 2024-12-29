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
    if (loading) return;
    if (user?.isVerified) {
      if (router.pathname === ROUTES.Verify_Email) {
        router.push(ROUTES.Dashboard);
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
