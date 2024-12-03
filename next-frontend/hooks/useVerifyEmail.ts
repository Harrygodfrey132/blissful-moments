import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { useRouter } from "next/router";
import { useSession , getSession } from "next-auth/react";
import { API } from "../utils/api";
import { ROUTES } from "../utils/routes";

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
      router.push(ROUTES.Login); // Redirect to login if session is not found
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
        {
          code,
          email: session.user?.email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Verification successful!");
        console.log('API Response' , response.data.isVerified);

        const updatedUser = {
          ...session.user,
          isVerified: response.data.isVerified, // Use API value directly
        };

        console.log('Updated User' , updatedUser);
        
        await update({ user: updatedUser });
        const reloadResponse = await getSession();
        console.log("Reloaded session:", reloadResponse);

        // Now, redirect to the dashboard
        router.push(ROUTES.Dashboard);
      } else {
        toast.error(response.data.message || "Verification failed!");
      }
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;

      if (axiosError.response?.status === 401) {
        toast.error("Invalid OTP or unauthorized request.");
        router.push(ROUTES.Login); // Redirect to login if unauthorized
      } else {
        toast.error(
          axiosError.response?.data?.message ||
            "Network error. Please try again."
        );
      }

      console.error("Error during verification:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return { isSubmitting, verifyEmail };
};

export default useVerifyEmail;
