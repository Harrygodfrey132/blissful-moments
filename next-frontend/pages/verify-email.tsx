import { useState, useEffect } from "react";
import VerifyEmailForm from "../components/VerifyEmailForm";
import useAuthRedirect from "../hooks/useAuthRedirect";
import { getSession } from "next-auth/react";

const VerifyEmailPage = () => {
  const [loading, setLoading] = useState(true); // Loader state for session check
  useAuthRedirect(true); // Keep your redirection logic as it is

  // Session check
  useEffect(() => {
    const checkSession = async () => {
      const session = await getSession();
      if (session) {
        setLoading(false); // Hide loader once session is checked
      }
    };
    checkSession();
  }, []); // Empty dependency array to run only once when the component mounts

  return (
    <div className="flex bg-white min-h-full flex-1">
      {/* Main content */}
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="mt-10">
            <VerifyEmailForm />
          </div>
        </div>
      </div>
      
      {/* Background image */}
      <div className="relative hidden w-0 flex-1 lg:block">
        <img
          alt=""
          src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
          className="absolute inset-0 size-full object-cover"
        />
      </div>

      {/* Loader Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
          <div className="spinner-border animate-spin border-t-4 border-blue-500 rounded-full w-16 h-16"></div>
        </div>
      )}
    </div>
  );
};

export default VerifyEmailPage;
