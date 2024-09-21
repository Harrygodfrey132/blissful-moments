'use client'

import { useState, useRef, useEffect } from 'react'
import { Transition } from '@headlessui/react'
import Link from 'next/link'
import { useAuth0 } from '@auth0/auth0-react'

export default function MobileMenu() {
  const [mobileNavOpen, setMobileNavOpen] = useState<boolean>(false)

  const trigger = useRef<HTMLButtonElement>(null)
  const mobileNav = useRef<HTMLDivElement>(null)

  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

  // close the mobile menu on click outside
  useEffect(() => {
    const clickHandler = ({ target }: { target: EventTarget | null }): void => {
      if (!mobileNav.current || !trigger.current) return;
      if (!mobileNavOpen || mobileNav.current.contains(target as Node) || trigger.current.contains(target as Node)) return;
      setMobileNavOpen(false)
    };
    document.addEventListener('click', clickHandler)
    return () => document.removeEventListener('click', clickHandler)
  })

  // close the mobile menu if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: { keyCode: number }): void => {
      if (!mobileNavOpen || keyCode !== 27) return;
      setMobileNavOpen(false)
    };
    document.addEventListener('keydown', keyHandler)
    return () => document.removeEventListener('keydown', keyHandler)
  })

  return (
    <div className="flex md:hidden">
      {/* Hamburger button */}
      <button
        ref={trigger}
        className={`hamburger ${mobileNavOpen && 'active'}`}
        aria-controls="mobile-nav"
        aria-expanded={mobileNavOpen}
        onClick={() => setMobileNavOpen(!mobileNavOpen)}
      >
        <span className="sr-only">Menu</span>
        <svg className="w-6 h-6 fill-current text-slate-900 dark:text-slate-100" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <rect y="4" width="24" height="2" />
          <rect y="11" width="24" height="2" />
          <rect y="18" width="24" height="2" />
        </svg>
      </button>

      {/*Mobile navigation */}
      <div
        ref={mobileNav}
      >
        <Transition
          show={mobileNavOpen}
          as="nav"
          id="mobile-nav"
          className="absolute top-full h-screen pb-16 z-20 left-0 w-full overflow-scroll bg-white"
          enter="transition ease-out duration-200 transform"
          enterFrom="opacity-0 -translate-y-2"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-out duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <ul className="px-5 py-2">
            <li>
              <Link href="/pricing" className="flex font-medium text-slate-800 hover:text-blue-600 py-2" onClick={() => setMobileNavOpen(false)}>Pricing</Link>
            </li>
            <li>
              <Link href="/about" className="flex font-medium text-slate-800 hover:text-blue-600 py-2" onClick={() => setMobileNavOpen(false)}>About</Link>
            </li>
            <li>
              <Link href="/blog" className="flex font-medium text-slate-800 hover:text-blue-600 py-2" onClick={() => setMobileNavOpen(false)}>Blog</Link>
            </li>
            {isAuthenticated ? (
              <>
                <li>
                  <Link href="/Portal" className="flex font-medium text-slate-800 hover:text-blue-600 py-2" onClick={() => setMobileNavOpen(false)}>Portal</Link>
                </li>
                <li>
                  <button
                    onClick={() => {
                      logout({ logoutParams: { returnTo: window.location.origin } });
                      setMobileNavOpen(false);
                    }}
                    className="flex font-medium text-slate-800 hover:text-blue-600 py-2"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li>
                <button
                  onClick={() => {
                    loginWithRedirect();
                    setMobileNavOpen(false);
                  }}
                  className="flex font-medium text-slate-800 hover:text-blue-600 py-2"
                >
                  Sign in
                </button>
              </li>
            )}
            <li>
              <Link href="/request-demo" className="flex font-medium text-blue-600 py-2 group" onClick={() => setMobileNavOpen(false)}>
                Request Demo <span className="tracking-normal text-blue-600 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">-&gt;</span>
              </Link>
            </li>
          </ul>
        </Transition>
      </div>
    </div>
  )
}
