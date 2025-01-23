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
    <div className="relative flex items-center justify-center min-h-screen bg-gray-900 bg-opacity-50">
    {/* Background Image */}
    <div
      className="absolute inset-0 bg-cover bg-center filter blur-sm"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80')",
      }}
    ></div>

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
      <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-opacity-75"></div>
      </div>
    )}

   
  </div>
  );
};

export default VerifyEmailPage;
VerifyEmailPage.noLayout = true;
