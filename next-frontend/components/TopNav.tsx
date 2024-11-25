'use client'

import { useState } from 'react';
import { BellIcon, MagnifyingGlassIcon, ChevronDownIcon, Bars3Icon } from '@heroicons/react/24/outline';

export default function TopNav({ setSidebarOpen }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleDropdownClick = () => {
    setDropdownOpen(!dropdownOpen); // Toggle the dropdown
  };

  const handleDropdownItemClick = () => {
    setDropdownOpen(false); // Close the dropdown when an item is clicked
    if (setSidebarOpen) {
      setSidebarOpen(false); // Close the mobile sidebar if it's open
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

      {/* Search bar */}
      {/* <div className="relative flex-1">
        <input
          type="search"
          placeholder="Search..."
          className="block w-full border-0 py-2 pl-8 pr-0 text-gray-900 placeholder-gray-400  sm:text-sm"
        />
        <MagnifyingGlassIcon className="absolute inset-y-0 left-0 h-full w-5 text-gray-400" />
      </div> */}

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
                onClick={handleDropdownItemClick} // Close dropdown and sidebar
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
