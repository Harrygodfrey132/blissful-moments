import { useState } from "react";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { API } from "../utils/api";
import { ROUTES } from "../utils/routes";

// Define the expected structure of the error response
interface ErrorResponse {
  message: string;
}

const useVerifyEmail = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: session, update } = useSession();
  const router = useRouter();

  const verifyEmail = async (code: string) => {
    const token = session?.user?.accessToken;

    if (!token) {
      toast.error("Authentication failed. Please try again.");
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
        {
          code,
          email: session?.user?.email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Verification successful!");
        // Update session with isVerified = true after successful verification
        await update({
          user: {
            ...session.user,
            isVerified: true,
          },
        });
        router.push(ROUTES.Dashboard);
      } else {
        toast.error(response.data.message || "Verification failed!");
      }
    } catch (error) {
      // Cast the error to AxiosError to access response and data safely
      const axiosError = error as AxiosError<ErrorResponse>; // Type cast here

      toast.error(
        axiosError.response?.data?.message || "Network error. Please try again."
      );
      console.error("Error during verification:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return { isSubmitting, verifyEmail };
};

export default useVerifyEmail;
