import { useState } from "react";
import { useForm } from "react-hook-form";
// import { sendResetPasswordEmail } from "../utils/auth";
import { useRouter } from "next/router";
import Link from "next/link";

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

    // try {
    //   await sendResetPasswordEmail(data.email);
    //   setServerMessage("A password reset link has been sent to your email.");
    // } catch (error: any) {
    //   setServerMessage(error.message || "Failed to send reset link. Please try again.");
    // }

    setLoading(false);
  };

  return (
    <>
     <div className="relative flex items-center justify-center md:min-h-screen bg-gray-900 bg-opacity-50">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-sm"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80')",
        }}
      ></div>

      {/* Form Container */}
      <div className="relative bg-white mt-40 mb-20 mx-4  bg-opacity-90 p-8 rounded-lg shadow-lg w-full max-w-md z-10">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-2 text-center">
          Forgot your password?
        </h2>
        <p className="text-sm text-gray-600 text-center mb-6">
          Enter your email address and we'll send you a link to reset your password.
        </p>

        {serverMessage && (
          <p className="text-blue-500 text-sm text-center mb-4">{serverMessage}</p>
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
              {loading ? "Sending..." : "Send Reset Link"}
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
