'use client'

import { useState } from 'react';
import { BellIcon, MagnifyingGlassIcon, ChevronDownIcon, Bars3Icon } from '@heroicons/react/24/outline';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { ROUTES } from '../utils/routes';
import { API } from '../utils/api';
import { toast } from 'sonner';

interface TopNavProps {
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>; // Type for setSidebarOpen
}

export default function TopNav({ setSidebarOpen }: TopNavProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();

  const handleDropdownClick = () => {
    setDropdownOpen(!dropdownOpen); // Toggle the dropdown
  };

  const handleDropdownItemClick = () => {
    setDropdownOpen(false); // Close the dropdown when an item is clicked
    if (setSidebarOpen) {
      setSidebarOpen(false); // Close the mobile sidebar if it's open
    }
  };

  const handleLogout = async () => {
    const { data: session } = useSession();  // Get the session data from the hook

    try {
      // Check if session and accessToken are available
      const accessToken = session?.user?.accessToken;

      if (accessToken) {
        await signOut({ redirect: false }); // Sign out using next-auth
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}${API.Logout}`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          credentials: 'include',
        });
        router.push(ROUTES.Login); // Redirect to login page
      } else {
        toast.error('Access token is missing!');
      }
    } catch (error) {
      toast.error('Something went wrong!');
    }
  };

  return (
    <div className="flex h-16 items-center justify-between md:justify-end shadow-sm border-gray-200 bg-white px-6">
      {/* Mobile sidebar button */}
      <button
        type="button"
        onClick={() => setSidebarOpen(true)}
        className="text-gray-700 lg:hidden"
      >
        <span className="sr-only">Open sidebar</span>
        <Bars3Icon className="h-6 w-6" />
      </button>

      {/* Right side buttons and profile dropdown */}
      <div className="flex items-center gap-x-6">
        <button type="button" className="text-gray-400 hover:text-gray-500">
          <BellIcon className="h-6 w-6" />
        </button>

        <div className="relative">
          <button
            className="flex items-center p-1.5"
            onClick={handleDropdownClick} // Toggle the dropdown menu
          >
            <img
              alt="Profile"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              className="h-8 w-8 rounded-full"
            />
            <span className="ml-2 text-sm font-semibold text-gray-900">Tom Cook</span>
            <ChevronDownIcon className="ml-2 h-5 w-5 text-gray-400" />
          </button>

          {/* Dropdown menu */}
          {dropdownOpen && (
            <div className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5">
              <a
                href="#"
                className="block px-3 py-1 text-sm text-gray-900 hover:bg-gray-50"
                onClick={handleDropdownItemClick} // Close dropdown and sidebar
              >
                Your profile
              </a>
              <a
                href="#"
                className="block px-3 py-1 text-sm text-gray-900 hover:bg-gray-50"
                onClick={handleLogout} // Close dropdown and sidebar
              >
                Sign out
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
