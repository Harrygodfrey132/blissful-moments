import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { ROUTES } from "../utils/routes";

const useAuthRedirect = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      if (router.pathname === ROUTES.Login && session?.user?.isValidated) {
        router.push(ROUTES.Dashboard); // Redirect to dashboard if logged in and validated
      } else if (
        router.pathname === ROUTES.Verify_Email &&
        session?.user?.isValidated
      ) {
        router.push(ROUTES.Dashboard); // Prevent validated users from accessing verify-email
      } else if (
        router.pathname !== ROUTES.Verify_Email &&
        !session?.user?.isValidated
      ) {
        router.push(ROUTES.Verify_Email); // Redirect unvalidated users to verify-email
      }
    } else if (status === "unauthenticated") {
      if (router.pathname !== ROUTES.Login) {
        router.push(ROUTES.Login); // Redirect unauthenticated users to login
      }
    }
  }, [session, status, router]);
};

export default useAuthRedirect;
