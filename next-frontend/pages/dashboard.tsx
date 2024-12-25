// pages/dashboard.tsx
import Sidebar from '../components/Sidebar'
import { useEffect, useState } from 'react';
import { LinkIcon, ClipboardDocumentIcon } from '@heroicons/react/24/solid'; // Importing Heroicons
import { MdOutlineQrCodeScanner } from "react-icons/md";
import useAuthRedirect from '../hooks/useAuthRedirect';


const DashboardPage = () => {
  useAuthRedirect(true, true);
  const [publicUrl, setPublicUrl] = useState('');
  const [copied, setCopied] = useState(false); // Tracks whether the URL was copied
  const handleCopy = () => {
    navigator.clipboard.writeText(publicUrl); // Copying the URL to clipboard
    setCopied(true); // Set "copied" state to true
    setTimeout(() => setCopied(false), 3000); // Reset state after 3 seconds
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setPublicUrl(window.location.href); // Set the current page URL
    }
  }, [])

  return (
    <div>
      <nav className="flex mt-28 px-16 mb-5" aria-label="Breadcrumb">
        <ol role="list" className="flex items-center space-x-2">
          <li>
            <div>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <svg className="size-5 shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                  <path fillRule="evenodd" d="M9.293 2.293a1 1 0 0 1 1.414 0l7 7A1 1 0 0 1 17 11h-1v6a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6H3a1 1 0 0 1-.707-1.707l7-7Z" clipRule="evenodd" />
                </svg>
                <span className="sr-only">Home</span>
              </a>
            </div>
          </li>
          <li>
            <div className="flex items-center">
              <svg className="size-5 shrink-0 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                <path fillRule="evenodd" d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
              </svg>
              <a href="#" className="ml-2 text-sm font-medium text-gray-500 hover:text-gray-700">Projects</a>
            </div>
          </li>
          <li>
            <div className="flex items-center">
              <svg className="size-5 shrink-0 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                <path fillRule="evenodd" d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
              </svg>
              <a href="#" className="ml-2 text-sm font-medium text-gray-500 hover:text-gray-700" aria-current="page">Project Nero</a>
            </div>
          </li>
        </ol>
      </nav>


      <div className='md:flex gap-10 px-16 w-full  mb-10'>
        <Sidebar />
        <main className='w-full'>
          <div>
            <section className='bg-white p-5 w-full shadow rounded'>
              <h1 className="text-lg font-semibold text-blue-light-900 mb-5 border-b-2 border-blue-600 inline-block">
                Dashboard
              </h1>
              <div className='flex gap-5 justify-between'>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  {/* Link Icon */}
                  <div className="flex items-center gap-2">
                    <LinkIcon className="w-5 h-5 text-blue-600" aria-hidden="true" />
                    <span>Public URL:</span>
                    <a
                      href={publicUrl}
                      className="text-blue-600 underline hover:text-blue-800"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {publicUrl}
                    </a>
                  </div>

                  {/* Copy Button */}
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1 rounded bg-gray-100 px-2 py-1 text-sm font-medium text-gray-600 shadow hover:bg-gray-200 focus:ring-2 focus:ring-blue-500"
                  >
                    <ClipboardDocumentIcon className="w-4 h-4" aria-hidden="true" />
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <div>
                  <MdOutlineQrCodeScanner className='text-5xl' />
                  <a href='#' className='text-blue-600 underline hover:text-blue-80'>Download QR Code</a>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
