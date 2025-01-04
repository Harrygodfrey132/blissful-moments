import Sidebar from '../components/Sidebar';
import { useEffect, useState } from 'react';
import { ClipboardDocumentIcon } from '@heroicons/react/24/solid';
import { MdOutlineQrCodeScanner } from 'react-icons/md';
import useAuthRedirect from '../hooks/useAuthRedirect';

const DashboardPage = () => {
  useAuthRedirect(true, true);
  const [publicUrl, setPublicUrl] = useState('');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(publicUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setPublicUrl(window.location.href);
    }
  }, []);

  return (
    <div className="md:flex gap-5 md:px-10 px-4 w-full mb-10 md:mt-32 mt-24">
      <div className="md:flex gap-5 w-full">
        <Sidebar />
        <main className="flex-1">
          <header className="mb-6 md:mt-0 mt-4">
            <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Subscription Plan */}
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">Subscription Plan</h2>
              <p className="text-sm text-gray-500 mt-1">Yearly</p>
              <div className="mt-4 flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-green-500 rounded-full"></span>
                <p className="text-green-600 font-medium">Active</p>
              </div>
              <p className="text-yellow-500 mt-2 text-sm">Expires on 5th Feb 2025</p>
            </div>

            {/* Public URL */}
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">Public URL</h2>
              <div className="mt-4 flex items-center gap-4">
                <a
                  href={publicUrl}
                  className="text-blue-600 underline hover:text-blue-800 break-all"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {publicUrl}
                </a>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-200 transition"
                >
                  <ClipboardDocumentIcon className="w-5 h-5" aria-hidden="true" />
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>

            {/* QR Code */}
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-200 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">QR Code</h2>
                <p className="text-sm text-gray-500 mt-1">Scan to access your page</p>
              </div>
              <div className="text-blue-600 text-center">
                <MdOutlineQrCodeScanner className="text-7xl mx-auto" />
                <a href="#" className="text-sm underline hover:text-blue-800 mt-2 block">
                  Download QR Code
                </a>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
