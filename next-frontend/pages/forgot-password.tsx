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
      <div className="flex bg-white min-h-full flex-1">
        <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div className="md:mt-24 mt-10">
              <h2 className="md:mt-8 mt-4 text-2xl font-bold tracking-tight text-gray-900">
                Forgot your password?
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Enter your email address and we'll send you a link to reset your password.
              </p>
            </div>

            <div className="mt-10">
              {serverMessage && <p className="text-blue-500 text-sm">{serverMessage}</p>}
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
                      {...register("email", { required: "Email is required", pattern: { value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/, message: "Invalid email address" } })}
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
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

              <p className="text-sm text-center mt-5 mb-10 text-gray-600">
                Remember your password? {" "}
                <Link href="/login" className="font-medium hover:underline text-blue-light-900">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
        <div className="relative hidden w-0 flex-1 lg:block">
        <img
            alt=""
            src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
