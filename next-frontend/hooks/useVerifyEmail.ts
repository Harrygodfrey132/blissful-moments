import { useState } from "react";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify"; // Import React Toastify
import { useRouter } from "next/router";
import { useSession, getSession } from "next-auth/react";
import { API } from "../utils/api";
import { ROUTES } from "../utils/routes";
import "react-toastify/dist/ReactToastify.css"; // Import React Toastify's default styles

interface ErrorResponse {
  message: string;
}

const useVerifyEmail = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: session, update } = useSession();
  const router = useRouter();

  const verifyEmail = async (code: string) => {
    if (!session) {
      toast.error("Authentication failed. Please try again.");
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

        // Update the session state (ensure token reflects the new verification status)
        if (session?.user) {
          const updatedUser = { ...session.user, isVerified: true }; // Set the verification flag
          await update({ user: updatedUser }); // Update session client-side
        }

        // Reload the session to confirm the changes
        await getSession();

        router.push(ROUTES.Dashboard);
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
          axiosError.response?.data?.message || "Network error. Please try again."
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return { isSubmitting, verifyEmail };
};

export default useVerifyEmail;
