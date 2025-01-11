import { useState, useEffect } from "react";
import VerifyEmailForm from "../components/VerifyEmailForm";
import { useAuthContext } from "../context/AuthProvider";

const VerifyEmailPage = () => {
  const [loading, setLoading] = useState(true);
  const { user, loading: userLoading } = useAuthContext();

  useEffect(() => {
    if (!userLoading) {
      setLoading(false); // Hide loader once session is checked
    }
  }, [user, userLoading]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300">
      {/* Main Card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg transform transition-all duration-300 hover:scale-105">
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
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-opacity-75"></div>
        </div>
      )}
    </div>
  );
};

export default VerifyEmailPage;
VerifyEmailPage.noLayout = true;
