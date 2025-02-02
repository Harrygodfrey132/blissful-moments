import Sidebar from '../components/Sidebar';
import { useEffect, useState } from 'react';
import { ClipboardDocumentIcon } from '@heroicons/react/24/solid';
import { MdOutlineQrCodeScanner } from 'react-icons/md';
import useAuthRedirect from '../hooks/useAuthRedirect';
import { signOut, useSession } from 'next-auth/react';
import axios from 'axios';
import { API } from '../utils/api';
import { usePageContext } from '../context/PageContext';
import Link from 'next/link';
import { ROUTES } from '../utils/routes';
import { format } from 'date-fns';

const DashboardPage = () => {
  useAuthRedirect(true, true);
  const IN_ACTIVE = 0;
  const ACTIVE = 1;
  const EXPIRING_SOON = 2;
  const EXPIRED = 3;

  const { data: session } = useSession();
  const { pageData, setPageData } = usePageContext();
  const token = session?.user?.accessToken;
  const [publicUrl, setPublicUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [isAccountSuspended, setIsAccountSuspended] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState(IN_ACTIVE);
  const [formattedDate, setFormattedDate] = useState('');

  useEffect(() => {
    // Fetch user data on page load
    const fetchUserData = async () => {
      if (session?.user?.accessToken) {
        try {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}${API.getUser}`,
            { email: session.user.email },
            {
              headers: { Authorization: `Bearer ${token}` },
              withCredentials: true,
            }
          );
          const pageDetails = response?.data?.user?.page;
          setPublicUrl(`${process.env.NEXT_PUBLIC_BASE_URL}/memory/${pageDetails?.slug}`);
          setPageData(pageDetails || []);
          if (pageDetails?.is_suspended == 1) {
            setIsAccountSuspended(true);
          }
          if (pageDetails?.next_renewal_date) {
            const formatted = format(new Date(pageDetails?.next_renewal_date), 'MMMM dd, yyyy');
            setFormattedDate(formatted);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }

        setSubscriptionStatus(session?.user?.isSuspended);
      }
    };

    fetchUserData();
  }, [session?.user?.accessToken]);

  useEffect(() => {
    if (session?.user?.isSuspended === 1) {
      // Active subscription
      setSubscriptionStatus(ACTIVE);
    } else if (session?.user?.isSuspended === 2) {
      // Expiring soon
      setSubscriptionStatus(EXPIRING_SOON);
    } else if (session?.user?.isSuspended === 3) {
      // Expired
      setSubscriptionStatus(EXPIRED);
    } else {
      // Inactive subscription
      setSubscriptionStatus(IN_ACTIVE);
    }
  }, [session?.user?.isSuspended]);

  const handleCopy = async () => {
    if (typeof window === 'undefined' || !publicUrl) {
      console.warn('Copy failed: publicUrl or window is not available');
      return;
    }

    try {
      if (navigator.clipboard?.writeText) {
        // Use Clipboard API if supported
        await navigator.clipboard.writeText(publicUrl);
      } else {
        // Fallback for unsupported browsers
        const textarea = document.createElement('textarea');
        textarea.value = publicUrl;
        textarea.style.position = 'absolute';
        textarea.style.opacity = '0'; // Hide the element
        textarea.style.left = '-9999px'; // Position off-screen
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }

      // Update the copied state and reset after 3 seconds
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (error) {
      console.error('Copy failed:', error);
    }
  };

  const handleRenewPlan = () => {
    // Redirect to renewal page (you can update the link to the correct route)
    // window.location.href = ROUTES.renewPlan;
  };

  return (
    <div className="flex px-4 flex-col md:flex-row mb-10 md:mt-32 mt-24">
      <Sidebar />
      <main className="flex-1 px-6 overflow-x-auto">
        <header className="mb-6 md:mt-0 mt-4">
          <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>
        </header>

        {pageData && pageData?.is_registered == true ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {/* Subscription Plan */}
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl shadow-lg transition-transform hover:scale-105 border border-blue-200">
              <h2 className="text-xl font-bold text-gray-800 mb-2">Subscription Plan</h2>
              <p className="text-sm text-gray-600">Yearly</p>

              {/* Check subscription status */}
              <div className="mt-4 flex items-center gap-2">
                {subscriptionStatus === ACTIVE && (
                  <>
                    <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                    <p className="text-green-700 font-medium">Active</p>
                  </>
                )}
                {subscriptionStatus === EXPIRING_SOON && (
                  <>
                    <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                    <p className="text-yellow-700 font-medium">Expiring Soon</p>
                  </>
                )}
                {subscriptionStatus === EXPIRED && (
                  <>
                    <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                    <p className="text-red-700 font-medium">Expired</p>
                  </>
                )}
                {subscriptionStatus === IN_ACTIVE && (
                  <>
                    <span className="w-3 h-3 bg-gray-500 rounded-full"></span>
                    <p className="text-gray-700 font-medium">Inactive</p>
                  </>
                )}
              </div>
              <p className="text-yellow-600 mt-2 text-sm font-semibold">
                Expires on <span className="underline">{formattedDate}</span>
              </p>
            </div>

            {/* Public URL */}
            <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-6 rounded-xl shadow-lg transition-transform hover:scale-105 border border-purple-200">
              <h2 className="text-xl font-bold text-gray-800 mb-2">Public URL</h2>
              <div className="mt-4 flex items-center gap-4">
                <a
                  href={publicUrl}
                  className="text-blue-700 underline hover:text-blue-900 break-all text-sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {publicUrl}
                </a>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-2 bg-purple-200 px-4 py-2 rounded-lg text-sm font-medium text-purple-700 hover:bg-purple-300 transition"
                >
                  <ClipboardDocumentIcon className="w-5 h-5" aria-hidden="true" />
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>

            {/* QR Code */}
            <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-xl shadow-lg transition-transform hover:scale-105 border border-green-200 flex flex-col items-center">
              <h2 className="text-xl font-bold text-gray-800 mb-2">QR Code</h2>
              <p className="text-sm text-gray-600">Scan to access your page</p>
              <MdOutlineQrCodeScanner className="text-7xl text-green-600 mt-4" />
              <a
                href={pageData?.qr_code}
                target="blank"
                download={"qr-code"}
                className="text-sm text-blue-700 underline hover:text-blue-900 mt-4"
              >
                Download QR Code
              </a>
            </div>
          </div>

        ) : (
          <div className="text-center mt-10 bg-gradient-to-r from-blue-100 to-purple-100 p-8 rounded-lg shadow-lg">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-4">
              Welcome to <span className="text-blue-600">Blissful Moments</span>
            </h1>
            <p className="text-gray-700 text-lg">
              A sanctuary where cherished memories are beautifully celebrated, lovingly shared, and preserved forever.
            </p>
            <p className="text-gray-500 text-sm mt-4 italic">
              "Every memory has a story; let yours inspire and be remembered."
            </p>
            <div className="mt-6">
              <Link href={ROUTES.myPage} className="px-6 py-3 bg-blue-light-900 text-white text-sm font-medium rounded-lg shadow-md hover:bg-blue-700 transition">
                Create Your Memory Journey
              </Link>
            </div>
          </div>
        )}
      </main>

      {/* Modal for Account Suspension */}
      {isAccountSuspended && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded shadow-xl max-w-sm mx-4">
            <h2 className="text-2xl text-center font-bold text-gray-800 mb-4">Account Suspended</h2>
            <p className="text-gray-800 mb-6 text-center">Your account has been suspended. Please renew your plan or log out to resolve the issue.</p>
            <div className=" justify-around">
              <button
                onClick={handleRenewPlan}
                className="px-6 py-2 bg-blue-light-900 w-full text-white font-medium rounded transition"
              >
                Renew Plan
              </button>
              </div>
              <div className='text-center'>
              <button
                onClick={() => signOut({ callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL}` })}
                className="px-6 py-2 text-sm font-medium text-blue-900 underline font-medium  transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
