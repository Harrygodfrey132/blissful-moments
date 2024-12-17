import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function Sidebar() {
  const [openMenu, setOpenMenu] = useState<string>(""); // Track open dropdown
  const { data: session } = useSession();
  const router = useRouter(); // Access the current route

  const toggleMenu = (menu: string) => {
    setOpenMenu(openMenu === menu ? "" : menu);
  };

  const isActive = (path: string) => router.pathname === path;

  return (
    <div className="flex flex-col items-start">
      {/* Profile Section */}
      <div className="flex items-center md:w-[17rem] w-full mb-4 p-4 rounded bg-white shadow">
        <img
          src="img/profile-img.png"
          alt="Profile"
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="ml-4">
          <h3 className="text-lg font-semibold">{session?.user?.name}</h3>
          <p className="text-sm text-gray-500">{session?.user?.email}</p>
        </div>
      </div>

      {/* Sidebar Navigation */}
      <nav className="md:w-[17rem] w-full shadow bg-white text-gray-800 rounded px-6 py-6">
        <div className="flex flex-col space-y-4">
          {/* Dashboard */}
          <a
            href="/dashboard"
            className={`flex items-center px-4 py-3 text-sm hover:bg-gray-300 rounded-md transition ${
              isActive("/dashboard") ? "bg-gray-300 text-black" : "text-gray-800"
            }`}
          >
            <span className="material-icons-outlined">dashboard</span>
            <span className="ml-3">Dashboard</span>
          </a>

          {/* Orders */}
          <a
            href="/orders"
            className={`flex items-center px-4 py-3 text-sm hover:bg-gray-300 rounded-md transition ${
              isActive("/orders") ? "bg-gray-300 text-black" : "text-gray-800"
            }`}
          >
            <span className="material-icons-outlined">shopping_cart</span>
            <span className="ml-3">Orders</span>
          </a>

          {/* My Pages */}
          <a
            href="/my-page"
            className={`flex items-center px-4 py-3 hover:bg-gray-300 rounded-md transition ${
              isActive("/my-page") ? "bg-gray-300 text-black" : "text-gray-800"
            }`}
          >
            <span className="material-icons-outlined">pages</span>
            <span className="ml-3 text-sm">My Pages</span>
          </a>

          {/* User Access */}
          <div>
            <button
              onClick={() => toggleMenu("userAccess")}
              aria-expanded={openMenu === "userAccess"}
              className={`flex items-center justify-between px-4 py-3 w-full hover:bg-gray-300 rounded-md transition ${
                openMenu === "userAccess" ? "bg-gray-300 text-black" : "text-gray-800"
              }`}
            >
              <div className="flex items-center">
                <span className="material-icons-outlined">people</span>
                <span className="ml-3 text-sm">User Access</span>
              </div>
              <span className="material-icons-outlined">
                {openMenu === "userAccess" ? "expand_less" : "expand_more"}
              </span>
            </button>
            {openMenu === "userAccess" && (
              <div className="ml-8 mt-2 flex flex-col space-y-2">
                {["Admin", "Editor", "Viewer"].map((label, index) => (
                  <a
                    key={index}
                    href="#"
                    className="text-gray-600 hover:text-gray-400"
                  >
                    {label}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Payments */}
          <a
            href="/payments"
            className={`flex items-center px-4 py-3 hover:bg-gray-300 rounded-md transition ${
              isActive("/payments") ? "bg-gray-300 text-black" : "text-gray-800"
            }`}
          >
            <span className="material-icons-outlined">payment</span>
            <span className="ml-3 text-sm">Payments</span>
          </a>
        </div>
      </nav>
    </div>
  );
}
