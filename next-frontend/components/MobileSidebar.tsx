import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

// Define the type for the props
interface MobileSidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export default function MobileSidebar({ sidebarOpen, setSidebarOpen }: MobileSidebarProps) {
  return (
    <Dialog open={sidebarOpen} onClose={() => setSidebarOpen(false)} className="relative z-50 lg:hidden">
      <DialogBackdrop className="fixed inset-0 bg-gray-900/80 transition-opacity" />
      <div className="fixed inset-0 flex">
        <DialogPanel className="relative w-64 max-w-xs bg-white p-6 transition-transform transform duration-300 ease-in-out">
          <button
            type="button"
            onClick={() => setSidebarOpen(false)} // Close sidebar on button click
            className="absolute top-0 left-0 m-4 p-2"
          >
            <span className="sr-only">Close sidebar</span>
            <XMarkIcon className="h-6 w-6 text-gray-800" />
          </button>

          {/* Sidebar content */}
          <div className="flex flex-col gap-y-5">
            <nav className="flex flex-1 flex-col">
              {/* Add your navigation links here */}
              <a href="#" className="text-gray-700 hover:bg-gray-50 px-4 py-2">Dashboard</a>
              <a href="#" className="text-gray-700 hover:bg-gray-50 px-4 py-2">Settings</a>
              <a href="#" className="text-gray-700 hover:bg-gray-50 px-4 py-2">Profile</a>
            </nav>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
