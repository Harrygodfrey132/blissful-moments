import { useState } from "react";
import { useForm } from "react-hook-form";
// import { sendResetPasswordEmail } from "../utils/auth";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { API } from "../utils/api";
import { toast } from "react-toastify";
import { ROUTES } from "../utils/routes";

interface ForgotPasswordFormInputs {
  email: string;
}

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [serverMessage, setServerMessage] = useState<string>("");
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormInputs>();

  const handleForgotPassword = async (data: ForgotPasswordFormInputs) => {
    setLoading(true);
    setServerMessage("");

    try {
      await sendResetPasswordOTP(data.email);
      setServerMessage("A password reset link has been sent to your email.");
    } catch (error: any) {
      setServerMessage(error.message || "Failed to send reset link. Please try again.");
    }

    setLoading(false);
  };

  const sendResetPasswordOTP = async (email: string): Promise<void> => {
    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}${API.sendForgotPasswordOTP}`;
      const response = await axios.post(url, { email });
      if (response.status === 200) {
        toast.success("OTP sent successfully");
        router.push(`${ROUTES.viewPasswordPageOTP}?token=${encodeURIComponent(response.data.email)}`);
      } else {
        throw new Error("Failed to send OTP. Please try again.");
      }
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "An error occurred while sending OTP.");
    }
  };

  return (
    <>
      <div className="relative flex items-center justify-center md:min-h-screen bg-gray-900 bg-opacity-50">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center filter "
        >
          <Image
            src="https://images.unsplash.com/photo-1614239374931-ed5165a07231?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Flying doves"
            fill
            style={{ objectFit: 'cover' }}
            quality={100}
          />
        </div>

        {/* Form Container */}
        <div className="relative bg-white mt-40 mb-20 mx-4  bg-opacity-90 p-8 rounded-lg shadow-lg w-full max-w-md z-10">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-2 text-center">
            Forgot your password?
          </h2>
          <p className="text-sm text-gray-600 text-center mb-6">
            Enter your email address and we'll send you an OTP to reset your password.
          </p>

          {serverMessage && (
            <p className="text-red-500 text-sm text-center mb-4">{serverMessage}</p>
          )}

          <form onSubmit={handleSubmit(handleForgotPassword)} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  type="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Enter your email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                      message: "Invalid email address",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded bg-blue-light-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-900"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Reset OTP"}
              </button>
            </div>
          </form>

          <p className="text-sm text-center mt-5">
            Remember your password?{" "}
            <Link href="/login" className="font-medium hover:underline text-blue-light-900">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
