// components/Header.tsx
import Link from 'next/link';

const Header = () => {
  return (
    <header className="absolute w-full z-30 bg-white shadow">
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="shrink-0 mr-4">
            {/* <Link href="/" aria-label="Cruip">
              <img
                src="/images/logo.png"
                alt="Company Logo"
                className="w-12 h-12 block transition duration-150 ease-in-out"
              />
            </Link> */}
            <img className='w-16' src="/img/logo-black.png" alt="Logo" />

          </div>
          <nav className="hidden md:flex md:grow">
            <ul className="flex grow justify-start flex-wrap items-center">
              <li>
                <Link
                  href="/"
                  className="font-medium text-gray-700 hover:text-gray-500 px-3 lg:px-5 py-2 flex items-center transition duration-150 ease-in-out"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="font-medium text-gray-700 hover:text-gray-500 px-3 lg:px-5 py-2 flex items-center transition duration-150 ease-in-out"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="font-medium text-gray-700 hover:text-gray-500 px-3 lg:px-5 py-2 flex items-center transition duration-150 ease-in-out"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="font-medium text-gray-700 hover:text-gray-500 px-3 lg:px-5 py-2 flex items-center transition duration-150 ease-in-out"
                >
                  Blog
                </Link>
              </li>
            </ul>
            <ul className="flex grow justify-end flex-wrap items-center">
              <li>
                <button className="font-medium text-gray-700 hover:text-gray-500 px-3 lg:px-5 py-2 flex items-center transition duration-150 ease-in-out">
                  Sign in
                </button>
              </li>
              <li>
                <Link
                  href="/request-demo"
                  className="font-medium text-blue-600 px-3 lg:px-5 py-2 flex items-center transition duration-150 ease-in-out group"
                >
                  Request Demo
                  <span className="tracking-normal text-light-blue-900 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">
                    &rarr;
                  </span>
                </Link>
              </li>
            </ul>
          </nav>
          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              className="hamburger false"
              aria-controls="mobile-nav"
              aria-expanded="false"
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
      </div>
    </header>
  );
};

export default Header;
