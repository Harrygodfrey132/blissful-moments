import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { ROUTES } from "../utils/routes";

export default function Sidebar() {
  const [openMenu, setOpenMenu] = useState<string>("");
  const { data: session } = useSession();
  const router = useRouter();

  const [loading, setLoading] = useState(false);  // Track loading state

  // Detect route change events
  useEffect(() => {
    // Start the spinner when route change starts
    const handleRouteChangeStart = () => setLoading(true);

    // Stop the spinner when route change completes
    const handleRouteChangeComplete = () => setLoading(false);

    // Add event listeners
    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);

    // Clean up event listeners
    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
    };
  }, [router]);

  const isActive = (path: string) => router.pathname === path;

  return (
    <aside className="bg-white rounded w-full md:w-[17rem] md:h-screen h-full shadow-sm flex flex-col justify-between">
      {/* Show loading spinner when loading state is true */}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="spinner"></div> {/* Replace with your spinner component */}
        </div>
      )}

      {/* Top Section */}
      <div className="flex-1">
        <div className="p-4 flex items-center bg-white rounded-lg shadow-sm">
          <Image
            src={session?.user?.userDetails?.profile_picture || "/img/dummy.png"}
            alt="Profile"
            width={50}
            height={50}
            className="rounded-full w-10 h-10 border-2 border-blue-500 object-cover"
          />
          <div className="ml-4">
            <h3 className="text-lg font-semibold text-gray-800">{session?.user?.name}</h3>
            <p className="text-sm text-gray-500">{session?.user?.email}</p>
            <Link href="/profile">
              <div className="text-blue-light-900 font-medium text-sm underline">Manage Profile</div>
            </Link>
          </div>
          
        </div>

        <nav className="mt-6">
          <ul className="space-y-2 px-4">
            <li>
              <Link
                href={ROUTES.Dashboard}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded transition ${isActive("/dashboard") ? "bg-blue-100 text-blue-600" : "text-gray-700 hover:bg-gray-100"
                  }`}
              >
                <span className="material-icons-outlined">dashboard</span>
                <span className="ml-3">Dashboard</span>
              </Link>
            </li>

            <li>
              <Link
                href={ROUTES.Orders}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded transition ${isActive("/orders") ? "bg-blue-100 text-blue-600" : "text-gray-700 hover:bg-gray-100"
                  }`}
              >
                <span className="material-icons-outlined">shopping_cart</span>
                <span className="ml-3">Orders</span>
              </Link>
            </li>

            <li>
              <Link
                href={ROUTES.myPage}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded transition ${isActive("/my-page") ? "bg-blue-100 text-blue-600" : "text-gray-700 hover:bg-gray-100"
                  }`}
              >
                <span className="material-icons-outlined">pages</span>
                <span className="ml-3">My Page</span>
              </Link>
            </li>

            <li>
              <Link
                href={ROUTES.updatePassword}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded transition ${isActive("/update-password") ? "bg-blue-100 text-blue-600" : "text-gray-700 hover:bg-gray-100"
                  }`}
              >
                <span className="material-icons-outlined">password</span>
                <span className="ml-3">Change Password</span>
              </Link>
            </li>

            <li>
              <Link
                href={ROUTES.contributionRequests}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded transition ${isActive("/contribution-requests") ? "bg-blue-100 text-blue-600" : "text-gray-700 hover:bg-gray-100"
                  }`}
              >
                <span className="material-icons-outlined">bolt</span>
                <span className="ml-3">Contribution Requests</span>
              </Link>
            </li>
            <li>
              <Link
                href={ROUTES.galleryRequests}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded transition ${isActive("/gallery-requests") ? "bg-blue-100 text-blue-600" : "text-gray-700 hover:bg-gray-100"
                  }`}
              >
                <span className="material-icons-outlined">image</span>
                <span className="ml-3">Gallery Requests</span>
              </Link>
            </li>
          </ul>
        </nav>
          {/* Bottom Section (Logout Link) */}
        <div className="p-6 bg-white border-t mt-2">
          <button
            onClick={() => signOut()}
            className="flex items-center w-full px-4 py-1 text-sm font-medium text-red-600 rounded hover:bg-red-50 transition"
          >
            <span className="material-icons-outlined">logout</span>
            <span className="ml-3">Logout</span>
          </button>
        </div>
      </div>

    
    </aside>
  );
}
