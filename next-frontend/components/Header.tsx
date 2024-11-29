import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Function to check if the link is active
  const isActive = (path: string) => {
    return router.pathname === path ? 'text-blue-600' : 'text-gray-700';
  };

  return (
    <header className="absolute w-full py-1 z-30 bg-white shadow">
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="shrink-0 mr-4">
            <img className="w-16" src="/img/logo-black.png" alt="Logo" />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:grow">
            <ul className="flex grow justify-start flex-wrap items-center">
              <li>
                <Link
                  href="/"
                  className={`font-medium hover:text-blue-600 px-3 lg:px-5 py-2 flex items-center transition duration-150 ease-in-out ${isActive('/')}`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className={`font-medium hover:text-blue-600 px-3 lg:px-5 py-2 flex items-center transition duration-150 ease-in-out ${isActive('/pricing')}`}
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className={`font-medium hover:text-blue-600 px-3 lg:px-5 py-2 flex items-center transition duration-150 ease-in-out ${isActive('/about')}`}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className={`font-medium hover:text-blue-600 px-3 lg:px-5 py-2 flex items-center transition duration-150 ease-in-out ${isActive('/blog')}`}
                >
                  Blog
                </Link>
              </li>
            </ul>
            <ul className="flex grow justify-end flex-wrap items-center">
              <li>
                <button className="font-medium text-gray-700 hover:text-blue-600 px-3 lg:px-5 py-2 flex items-center transition duration-150 ease-in-out">
                  Sign in
                </button>
              </li>
              <li>
                <Link
                  href="/request-demo"
                  className="font-medium text-white bg-blue-600 hover:bg-blue-700 py-2 px-4 flex items-center group"
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
                href="/"
                className={`font-medium py-2 transition duration-150 ease-in-out ${isActive('/')}`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/pricing"
                className={`font-medium py-2 transition duration-150 ease-in-out ${isActive('/pricing')}`}
              >
                Pricing
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className={`font-medium py-2 transition duration-150 ease-in-out ${isActive('/about')}`}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/blog"
                className={`font-medium py-2 transition duration-150 ease-in-out ${isActive('/blog')}`}
              >
                Blog
              </Link>
            </li>
            <li>
              <button className="font-medium text-gray-700 hover:text-gray-500 py-2">
                Sign in
              </button>
            </li>
            <li>
              <Link
                href="/request-demo"
                className="font-medium text-white bg-blue-600 hover:bg-blue-700 py-2 flex items-center group"
              >
                Request Demo
                <span className="tracking-normal text-light-blue-900 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">
                  &rarr;
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
