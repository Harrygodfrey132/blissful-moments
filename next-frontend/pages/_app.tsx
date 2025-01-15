import '../styles/globals.css';
import Layout from '../components/Layout';
import type { AppProps } from 'next/app';
import { SessionProvider, signOut } from 'next-auth/react';
import { useEffect } from 'react';
import 'aos/dist/aos.css'; // Import AOS CSS
import Aos from 'aos'; // Import AOS library
import { toast, ToastContainer } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import Toast styles
import { IsVerifiedProvider } from '../context/IsUserVerifiedContext';
import { PageProvider } from '../context/PageContext';
import { UserProvider } from '../context/UserContext';
import { AuthProvider } from '../context/AuthProvider';
import useInactivityLogout from '../hooks/useInactivityLogout';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps & { Component: { noLayout?: boolean } }) {
  // Use inactivity hook for session timeout (2 hours)
  const isSessionExpired = useInactivityLogout(2 * 60 * 60 * 1000);

  // Initialize AOS animations
  useEffect(() => {
    Aos.init({
      duration: 1200,
      once: true,
    });
  }, []);

  // Handle tab/browser close to clear session
  useEffect(() => {
    const handleBeforeUnload = () => {
      sessionStorage.setItem('isTabClosing', 'true'); // Track that the tab is closing
    };

    const handleUnload = () => {
      if (sessionStorage.getItem('isTabClosing') === 'true') {
        signOut(); // Call signOut when the tab is closed
      }
    };

    // Add event listeners for beforeunload and unload
    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('unload', handleUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('unload', handleUnload);
    };
  }, []);

  // Notify user if session is expired
  useEffect(() => {
    if (isSessionExpired) {
      toast.error('Session expired! Please log in again.');
    }
  }, [isSessionExpired]);

  return (
    <>
      {isSessionExpired && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 text-center rounded shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Session Expired</h2>
            <p className="text-gray-600 mb-6">Please log in again to continue.</p>
            <button
              onClick={() => signOut()}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Login Again
            </button>
          </div>
        </div>
      )}

      <UserProvider>
        <SessionProvider session={session}>
          <AuthProvider>
            <PageProvider>
              <IsVerifiedProvider>
                <ToastContainer />
                {/* Render without Layout if `noLayout` is set */}
                {Component.noLayout ? (
                  <Component {...pageProps} />
                ) : (
                  <Layout>
                    <Component {...pageProps} />
                  </Layout>
                )}
              </IsVerifiedProvider>
            </PageProvider>
          </AuthProvider>
        </SessionProvider>
      </UserProvider>
    </>
  );
}

export default MyApp;
