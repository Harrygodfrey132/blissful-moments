import { useState } from "react";
import { useForm } from "react-hook-form";
import { getSession, signIn } from "next-auth/react";
import { ROUTES } from "../utils/routes";
import Link from "next/link";
import { validateLogin } from "../utils/validation";
import { useRouter } from "next/router";
import { useIsVerified } from "../context/IsUserVerifiedContext";
import Image from "next/image";

interface LoginFormInputs {
  email: string;
  password: string;
}

const Login = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false); // Loader state
  const { setIsVerified } = useIsVerified();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();
  const [serverError, setServerError] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false); // Track password visibility

  const handleLogin = async (data: LoginFormInputs) => {
    setServerError("");
    setLoading(true); // Start loader

    const res = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    setLoading(false); // Stop loader

    if (!res || !res.ok) {
      setServerError(res?.error || "Failed to sign in. Please try again.");
    } else {
      const session = await getSession();

      if (session?.user?.isVerified) {
        setIsVerified(true);
        router.push(`${ROUTES.Dashboard}`);
      } else {
        setIsVerified(false);
        router.push(`${ROUTES.Verify_Email}`);
      }
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
            // src="/img/white-dove-flying.jpeg"
            src="https://images.unsplash.com/photo-1614239374931-ed5165a07231?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Flying doves"
            fill
            style={{ objectFit: 'cover' }}
            quality={100}
          />
        </div>

        {/* Form Container */}
        <div className="relative bg-white mt-40 mb-20 mx-4 bg-opacity-90 p-8 rounded-lg shadow-lg w-full max-w-md z-10">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-6 text-center">
            Sign in to your account
          </h2>
          <p className="text-center text-gray-600 mb-6">Welcome back! Please enter your details to sign in.</p>

          {serverError && <p className="text-red-500 text-sm text-center">{serverError}</p>}

          <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
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
                  {...register("email", validateLogin.email)}
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                Password
              </label>
              <div className="mt-2 relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Enter your password"
                  {...register("password", validateLogin.password)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-2 text-sm text-gray-600"
                >
                  <span className="material-icons-outlined">
                    {showPassword ? "visibility_off" : "visibility"}
                  </span>
                </button>
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password.message}</p>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="size-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
                <label htmlFor="remember-me" className="ml-3 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="forgot-password"
                  className="font-semibold text-blue-light-900 hover:text-blue-light-900"
                >
                  Forgot password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded bg-blue-light-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-900"
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </div>
          </form>

          <p className="text-sm text-center mt-5 mb-10 text-gray-600">
            Don't have an account?{" "}
            <Link href={ROUTES.Register} className="font-medium hover:underline text-blue-light-900">
              Sign up
            </Link>
          </p>
        </div>
      </div>


      {/* Loader Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
          <div className="loader"></div>
        </div>
      )}
    </>
  );
};

export default Login;
