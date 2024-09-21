'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useAuth0, Auth0Provider } from '@auth0/auth0-react';
import WrappedHeader from 'components/ui/header';
import Footer from 'components/ui/footer';

const PortalContent = () => {
  const { isAuthenticated, loginWithRedirect, user, isLoading } = useAuth0();
  const pathname = usePathname();
  const [hasCheckedAuth, setHasCheckedAuth] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated && !hasCheckedAuth) {
        loginWithRedirect({
          appState: { returnTo: pathname },
        });
      } else {
        setHasCheckedAuth(true);
      }
    }
  }, [isAuthenticated, loginWithRedirect, pathname, isLoading, hasCheckedAuth]);

  if (isLoading || !hasCheckedAuth) {
    return (
      <div className="flex flex-col min-h-screen justify-center items-center bg-gray-100">
        <p>Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col min-h-screen">
        <WrappedHeader />
        <main className="flex-grow flex flex-col items-center justify-center bg-gray-100">
          <h1 className="text-3xl font-bold">Please login to access the portal.</h1>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <main className="flex-grow">
        <div className="max-w-4xl mx-auto py-12 px-6" style={{ paddingTop: '20px', marginTop: '10px' }}>
          <div className="bg-white shadow-lg rounded-lg p-8">
            <h1 className="text-5xl font-playfair-display text-slate-800 mb-8 text-center">
              Welcome to your Portal
            </h1>
            <h2 className="text-2xl text-teal-600 mb-6">
              Hi, 
            </h2>

            <div className="text-lg text-gray-700 mb-8">
              <p>Your profile details:</p>
              <ul className="list-disc pl-5 mt-3">
                <li>Email: {user?.email}</li>
              </ul>
            </div>

            <div className="flex justify-center">
              <button className="bg-teal-500 text-white px-6 py-3 rounded-full hover:bg-teal-600 transition-all duration-300 shadow-md">
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const Portal = () => {
  const [redirectUri, setRedirectUri] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setRedirectUri(window.location.origin);
    }
  }, []);

  if (!redirectUri) {
    return null; // Don't render until redirectUri is set
  }

  return (
    <Auth0Provider
      domain="dev-r8gtvgbqsg0w1vy5.us.auth0.com"
      clientId="P3vjSE6kBlRF0diX1VSocxI9scRbfRU8"
      authorizationParams={{
        redirect_uri: redirectUri,
      }}
    >
      <PortalContent />
    </Auth0Provider>
  );
};

export default Portal;
