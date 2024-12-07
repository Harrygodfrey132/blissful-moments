import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signIn, signOut, useSession } from 'next-auth/react';
import { ROUTES } from '../utils/routes';

const Header = () => {
  const { data: session } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const router = useRouter();
  const profileMenuRef = useRef<HTMLLIElement>(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsProfileMenuOpen(false); // Ensure profile menu is closed when opening mobile menu
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
    setIsMobileMenuOpen(false); // Ensure mobile menu is closed when opening profile menu
  };

  const isActive = (path: string) => {
    return router.pathname === path ? 'text-blue-600' : 'text-gray-700';
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
      setIsProfileMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="absolute w-full py-1 z-30 bg-white shadow">
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="shrink-0 mr-4">
            <img className="w-16" src="/img/logo-black.png" alt="Logo" />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:grow">
            <ul className="flex grow justify-start flex-wrap items-center">
              <li>
                <Link
                  href={ROUTES.Home}
                  className={`font-semibold hover:text-blue-600 px-3 lg:px-5 py-2 flex items-center transition duration-150 ease-in-out ${isActive(
                    '/'
                  )}`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href={ROUTES.Pricing}
                  className={`font-semibold hover:text-blue-600 px-3 lg:px-5 py-2 flex items-center transition duration-150 ease-in-out ${isActive(
                    '/pricing'
                  )}`}
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href={ROUTES.About_Us}
                  className={`font-semibold hover:text-blue-600 px-3 lg:px-5 py-2 flex items-center transition duration-150 ease-in-out ${isActive(
                    '/about'
                  )}`}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href={ROUTES.Blogs}
                  className={`font-semibold hover:text-blue-600 px-3 lg:px-5 py-2 flex items-center transition duration-150 ease-in-out ${isActive(
                    '/blog'
                  )}`}
                >
                  Blog
                </Link>
              </li>
            </ul>
            <ul className="flex grow justify-end flex-wrap items-center">
             
              {!session ? (
                <>
                <li>
                  <Link
                    href={ROUTES.Login}
                    className="font-semibold text-gray-700 hover:text-blue-600 px-3 lg:px-5 py-2 flex items-center transition duration-150 ease-in-out"
                  >
                    Sign in
                  </Link>
                </li>
                 <li>
                 <Link
                   href={ROUTES.Register}
                   className="font-semibold text-gray-700 hover:text-blue-600 px-3 lg:px-5 py-2 flex items-center transition duration-150 ease-in-out"
                 >
                   Sign Up
                 </Link>
               </li>
               </>
              ) : (
                <li className="relative ml-4" ref={profileMenuRef}>
                  <button
                    onClick={toggleProfileMenu}
                    className="flex items-center text-gray-700 hover:text-blue-600 transition duration-150 ease-in-out"
                  >
                    <img
                      className="w-8 h-8 rounded-full"
                      src={'/img/profile-img.png'}
                      alt={session.user?.name || 'User'}
                    />
                    <span className="ml-2 font-semibold hidden lg:block">
                      {session.user?.name || 'Profile'}
                    </span>
                  </button>
                  {isProfileMenuOpen && (
                    <ul className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg">
                      <li>
                        <Link
                          href={ROUTES.Dashboard}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Profile
                        </Link>
                      </li>
                      <li>
                        <button
                          onClick={() => signOut({ callbackUrl: ROUTES.Home })}
                          className="block px-4 py-2 text-sm text-start text-gray-700 hover:bg-gray-100 w-full"
                        >
                          Sign out
                        </button>
                      </li>
                    </ul>
                  )}
                </li>
              )}
               <li className='ml-5'>
                <Link
                  href={ROUTES.Request_Demo}
                  className="font-semibold text-white bg-blue-600 hover:bg-blue-700 py-2 px-4 flex items-center group"
                >
                  Request Demo
                  <span className="tracking-normal text-light-blue-900 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">
                    &rarr;
                  </span>
                </Link>
              </li>
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              className="hamburger"
              aria-controls="mobile-nav"
              aria-expanded={isMobileMenuOpen ? 'true' : 'false'}
              onClick={toggleMobileMenu}
            >
              <span className="sr-only">Menu</span>
              <svg
                className="w-6 h-6 fill-current text-gray-200"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect y="4" width="24" height="2"></rect>
                <rect y="11" width="24" height="2"></rect>
                <rect y="18" width="24" height="2"></rect>
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          id="mobile-nav"
          className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'} bg-white w-full p-5`}
        >
          <ul className="flex flex-col space-y-4">
            <li>
              <Link
                href={ROUTES.Home}
                className={`font-semibold py-2 transition duration-150 ease-in-out ${isActive(
                  '/'
                )}`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href={ROUTES.Request_Demo}
                className="font-semibold text-white bg-blue-600 hover:bg-blue-700 py-2 flex items-center"
              >
                Request Demo
              </Link>
            </li>
            {!session ? (
              <li>
                <Link
                  href={ROUTES.Login}
                  className="font-semibold text-gray-700 hover:text-gray-500 py-2"
                >
                  Sign in
                </Link>
              </li>
            ) : (
              <>
                <li>
                  <Link
                    href={ROUTES.Dashboard}
                    className="font-semibold text-gray-700 hover:text-blue-600 py-2"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => signOut({ callbackUrl: ROUTES.Home })}
                    className="font-semibold text-gray-700 hover:text-red-600 py-2"
                  >
                    Sign out
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
