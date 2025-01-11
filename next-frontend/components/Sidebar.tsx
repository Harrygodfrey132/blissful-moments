import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { ROUTES } from "../utils/routes";

export default function Sidebar() {
  const [openMenu, setOpenMenu] = useState<string>("");
  const { data: session } = useSession();
  const router = useRouter();

  const toggleMenu = (menu: string) => {
    setOpenMenu(openMenu === menu ? "" : menu);
  };

  const isActive = (path: string) => router.pathname === path;

  return (
    <div className="flex flex-col items-start bg-gray-50 md:min-h-screen">
      {/* Profile Section */}
      <div className="flex items-center md:w-[17rem] w-full mb-6 p-4 rounded-lg bg-white shadow hover:shadow-lg transition">
        <Image
          src={session?.user?.userDetails?.profile_picture || "/img/dummy.png"}
          alt="Profile"
          width={300}
          height={300}
          className="w-12 h-12 rounded-full object-cover border-2 border-blue-500"
        />
        <div className="ml-4">
          <h3 className="text-lg font-semibold text-gray-800">{session?.user?.name}</h3>
          <p className="text-sm text-gray-500">{session?.user?.email}</p>
        </div>
      </div>

      {/* Sidebar Navigation */}
      <nav className="md:w-[17rem] w-full bg-white shadow rounded-lg p-6">
        <div className="flex flex-col space-y-4">
          {/* Dashboard */}
          <Link
            href={ROUTES.Dashboard}
            className={`flex items-center px-4 py-3 font-semibold text-sm rounded-lg transition ${isActive("/dashboard") ? "bg-blue-100 text-blue-600" : "text-gray-700 hover:bg-gray-100"
              }`}
          >
            <span className="material-icons-outlined">dashboard</span>
            <span className="ml-3">Dashboard</span>
          </Link>

          {/* Orders */}
          <Link
            href={ROUTES.Orders}
            className={`flex items-center px-4 py-3 font-semibold text-sm rounded-lg transition ${isActive("/orders") ? "bg-blue-100 text-blue-600" : "text-gray-700 hover:bg-gray-100"
              }`}
          >
            <span className="material-icons-outlined">shopping_cart</span>
            <span className="ml-3">Orders</span>
          </Link>

          {/* My Pages */}
          <Link
            href={ROUTES.myPage}
            className={`flex items-center px-4 py-3 font-semibold text-sm rounded-lg transition ${isActive("/my-page") ? "bg-blue-100 text-blue-600" : "text-gray-700 hover:bg-gray-100"
              }`}
          >
            <span className="material-icons-outlined">pages</span>
            <span className="ml-3">My Page</span>
          </Link>

          {/* Payments */}
          <Link
            href={ROUTES.updatePassword}
            className={`flex items-center px-4 py-3 font-semibold text-sm rounded-lg transition ${isActive("/update-password") ? "bg-blue-100 text-blue-600" : "text-gray-700 hover:bg-gray-100"
              }`}
          >
            <span className="material-icons-outlined">password</span>
            <span className="ml-3">Change Password</span>
          </Link>
          {/* Contribution Requests */}
          <Link
            href={ROUTES.contributionRequests}
            className={`flex items-center px-4 py-3 font-semibold text-sm rounded-lg transition ${isActive("/contribution-requests") ? "bg-blue-100 text-blue-600" : "text-gray-700 hover:bg-gray-100"
              }`}
          >
            <span className="material-icons-outlined">bolt</span>
            <span className="ml-3">Contribution Requests</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
