'use client';

import Link from 'next/link';
import Logo from './logo';
import MobileMenu from './mobile-menu';
import { useAuth0, Auth0Provider } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';

export default function WrappedHeader() {
  const [origin, setOrigin] = useState('');

  useEffect(() => {
    // Set origin only when the component is mounted on the client-side
    setOrigin(window.location.origin);
  }, []);

  if (!origin) {
    // Render nothing or a loader while waiting for the client-side origin
    return null;
  }

  return (
    <Auth0Provider
      domain="dev-r8gtvgbqsg0w1vy5.us.auth0.com"
      clientId="P3vjSE6kBlRF0diX1VSocxI9scRbfRU8"
      authorizationParams={{
        redirect_uri: origin,
      }}
    >
      <Header />
    </Auth0Provider>
  );
}

function Header() {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

  return (
    <header className="absolute w-full z-30">
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Site branding */}
          <div className="shrink-0 mr-4">
            <Logo />
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex md:grow">
            <ul className="flex grow justify-start flex-wrap items-center">
              <li>
                <Link
                  href="/"
                  className="font-medium text-gray-200 hover:text-blue-600 px-3 lg:px-5 py-2 flex items-center transition duration-150 ease-in-out"
                  >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="font-medium text-gray-200 hover:text-blue-600 px-3 lg:px-5 py-2 flex items-center transition duration-150 ease-in-out"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="font-medium text-gray-200 hover:text-blue-600 px-3 lg:px-5 py-2 flex items-center transition duration-150 ease-in-out"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="font-medium text-gray-200 hover:text-blue-600 px-3 lg:px-5 py-2 flex items-center transition duration-150 ease-in-out"
                >
                  Blog
                </Link>
              </li>
              {isAuthenticated && (
                <li>
                  <Link
                    href="/Portal"
                    className="font-medium text-gray-200 hover:text-blue-600 px-3 lg:px-5 py-2 flex items-center transition duration-150 ease-in-out"
                  >
                    Portal
                  </Link>
                </li>
              )}
            </ul>

            {/* Authentication links */}
            <ul className="flex grow justify-end flex-wrap items-center">
              {isAuthenticated ? (
                <li>
                  <button
                    onClick={() =>
                      logout({
                        logoutParams: {
                          returnTo: window.location.origin,
                        },
                      })
                    }
                    className="font-medium text-slate-800 hover:text-blue-600 px-3 lg:px-5 py-2 flex items-center transition duration-150 ease-in-out"
                  >
                    Logout
                  </button>
                </li>
              ) : (
                <li>
                  <button
                    onClick={() => loginWithRedirect()}
                    className="font-medium text-gray-200 hover:text-blue-600 px-3 lg:px-5 py-2 flex items-center transition duration-150 ease-in-out"
                  >
                    Sign in
                  </button>
                </li>
              )}
              <li>
                <Link
                  href="/request-demo"
                  className="font-medium text-blue-600 px-3 lg:px-5 py-2 flex items-center transition duration-150 ease-in-out group"
                >
                  Request Demo{' '}
                  <span className="tracking-normal text-blue-600 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">
                    -&gt;
                  </span>
                </Link>
              </li>
            </ul>
          </nav>

          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
