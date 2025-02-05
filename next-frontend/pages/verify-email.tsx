import { useState, useEffect } from "react";
import VerifyEmailForm from "../components/VerifyEmailForm";
import { useAuthContext } from "../context/AuthProvider";
import Image from "next/image";
import useVerifyEmail from "../hooks/useVerifyEmail";

const VerifyEmailPage = () => {
  const [loading, setLoading] = useState(true);
  const { user, loading: userLoading } = useAuthContext();
  const { isSubmitting } = useVerifyEmail();

  useEffect(() => {
    if (!userLoading && !isSubmitting) {
      setLoading(false);
    }
  }, [userLoading, isSubmitting]);

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-900 bg-opacity-50">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-sm"
      >
        <Image
          src="https://images.unsplash.com/photo-1614239374931-ed5165a07231?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Flying doves"
          fill
          style={{ objectFit: 'cover' }}
          quality={100}
        />
      </div>

      {/* Main Card */}
      <div className="relative w-full max-w-md bg-white mx-4 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 z-10">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
            Verify Your Email
          </h1>
          <p className="text-sm text-gray-600 text-center mb-3">
            Please check your email and follow the instructions to verify your account.
          </p>
          <VerifyEmailForm />
        </div>
      </div>

      {/* Loader Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-[100]">
          <span className="w-20 h-20 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></span>
          <span className="ml-2 text-white font-semibold text-lg">Loading...</span>
        </div>
      )}


    </div>
  );
};

export default VerifyEmailPage;
VerifyEmailPage.noLayout = true;
