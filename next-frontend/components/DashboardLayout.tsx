'use client'

import { useState } from 'react';
import Sidebar from './Sidebar';  // Import Sidebar
import TopNav from './TopNav';    // Import TopNav

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-full">
      {/* Pass sidebarOpen to Sidebar to control visibility */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      
      {/* Main content */}
      <div className="flex-1 flex flex-col lg:pl-52">
        {/* Pass setSidebarOpen to TopNav to trigger opening/closing the sidebar */}
        <TopNav setSidebarOpen={setSidebarOpen} />

        <main className="py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
