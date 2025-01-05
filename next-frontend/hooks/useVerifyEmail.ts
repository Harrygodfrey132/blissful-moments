import { useState } from "react";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify"; // Import React Toastify
import { useRouter } from "next/router";
import { useSession, getSession, signIn } from "next-auth/react";
import { API } from "../utils/api";
import { ROUTES } from "../utils/routes";
import "react-toastify/dist/ReactToastify.css"; // Import React Toastify's default styles
import { useIsVerified } from "../context/IsUserVerifiedContext";

interface ErrorResponse {
  message: string;
}

const useVerifyEmail = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: session, update } = useSession();
  const router = useRouter();
  const { setIsVerified } = useIsVerified();
  const verifyEmail = async (code: string) => {
    if (!session) {
      toast.error("Authentication failed. Please try again.");
      setIsVerified(false);
      router.push(ROUTES.Login);
      return;
    }

    const token = session.user?.accessToken;

    if (!token) {
      toast.error("Authentication failed. Please try again.");
      router.push(ROUTES.Login);
      return;
    }

    if (code.length !== 4) {
      toast.error("Please enter a valid 4-digit code.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}${API.VerifyEmail}`,
        { code, email: session.user?.email },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        toast.success("Verification successful!");

        // Get the user data from localStorage
        const storedUserData = localStorage.getItem("userData");
        // Check if storedUserData is null before parsing it
        if (storedUserData) {
          // Parse the stored user data
          const { email, password } = JSON.parse(storedUserData);

          try {
            // Attempt to log the user in with the credentials
            const loginResult = await signIn("credentials", {
              redirect: false,
              email: email,
              password: password,
            });

            if (!loginResult || loginResult.error) {
              throw new Error(loginResult?.error || "Login failed");
            }

            // Reload the session to confirm the changes
            await getSession();
            setIsVerified(true);
            router.push(ROUTES.Dashboard);
          } catch (error: any) {
            if (error instanceof Error) {
              toast.error(error.message || "Login failed");
            } else {
              toast.error("An unknown error occurred during login.");
            }
          }
        } else {
          // Handle the case where no user data is found in localStorage
          toast.error("User data not found in localStorage.");
        }
      } else {
        toast.error(response.data.message || "Verification failed!");
      }
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;

      if (axiosError.response?.status === 401) {
        toast.error("Invalid OTP or unauthorized request.");
        router.push(ROUTES.Login);
      } else {
        toast.error(
          axiosError.response?.data?.message ||
            "Network error. Please try again."
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return { isSubmitting, verifyEmail };
};

export default useVerifyEmail;
