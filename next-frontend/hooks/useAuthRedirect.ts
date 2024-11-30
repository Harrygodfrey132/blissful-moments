import { useEffect } from "react";
import { useRouter } from "next/router";
import useAuth from "./useAuth";
import { ROUTES } from "../utils/routes";

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
