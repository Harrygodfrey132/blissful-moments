import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { ROUTES } from "../utils/routes";

export default function Sidebar() {
  const [openMenu, setOpenMenu] = useState<string>("");
  const { data: session } = useSession();
  const router = useRouter();

  const isActive = (path: string) => router.pathname === path;

  return (
    <aside className="bg-white w-full md:w-[17rem] md:min-h-screen shadow-md flex flex-col justify-between">
      {/* Top Section */}
      <div className="flex-1">
        <div className="p-4 flex items-center bg-white rounded-lg shadow-sm">
          <Image
            src={session?.user?.userDetails?.profile_picture || "/img/dummy.png"}
            alt="Profile"
            width={50}
            height={50}
            className="rounded-full border-2 border-blue-500 object-cover"
          />
          <div className="ml-4">
            <h3 className="text-lg font-semibold text-gray-800">{session?.user?.name}</h3>
            <p className="text-sm text-gray-500">{session?.user?.email}</p>
          </div>
        </div>

        <nav className="mt-6">
          <ul className="space-y-2 px-2">
            <li>
              <Link
                href={ROUTES.Dashboard}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition ${
                  isActive("/dashboard") ? "bg-blue-100 text-blue-600" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <span className="material-icons-outlined">dashboard</span>
                <span className="ml-3">Dashboard</span>
              </Link>
            </li>

            <li>
              <Link
                href={ROUTES.Orders}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition ${
                  isActive("/orders") ? "bg-blue-100 text-blue-600" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <span className="material-icons-outlined">shopping_cart</span>
                <span className="ml-3">Orders</span>
              </Link>
            </li>

            <li>
              <Link
                href={ROUTES.myPage}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition ${
                  isActive("/my-page") ? "bg-blue-100 text-blue-600" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <span className="material-icons-outlined">pages</span>
                <span className="ml-3">My Page</span>
              </Link>
            </li>

            <li>
              <Link
                href={ROUTES.updatePassword}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition ${
                  isActive("/update-password") ? "bg-blue-100 text-blue-600" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <span className="material-icons-outlined">password</span>
                <span className="ml-3">Change Password</span>
              </Link>
            </li>

            <li>
              <Link
                href={ROUTES.contributionRequests}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition ${
                  isActive("/contribution-requests") ? "bg-blue-100 text-blue-600" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <span className="material-icons-outlined">bolt</span>
                <span className="ml-3">Contribution Requests</span>
              </Link>
            </li>
            <li>
              <Link
                href={ROUTES.accessRequests}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition ${
                  isActive("/access-requests") ? "bg-blue-100 text-blue-600" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <span className="material-icons-outlined">key</span>
                <span className="ml-3">Access Requests</span>
              </Link>
            </li>
          </ul>
        </nav>
          {/* Bottom Section (Logout Link) */}
        <div className="p-6 bg-white border-t shadow-sm mt-2">
          <button
            onClick={() => signOut()}
            className="flex items-center w-full px-4 py-1 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 transition"
          >
            <span className="material-icons-outlined">logout</span>
            <span className="ml-3">Logout</span>
          </button>
        </div>
      </div>

    
    </aside>
  );
}
