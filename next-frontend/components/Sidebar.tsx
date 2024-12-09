import { useState } from "react";
import { useSession } from "next-auth/react";

export default function Sidebar() {
  const [openMenu, setOpenMenu] = useState<string>(""); // Track open dropdown
  const [activeItem, setActiveItem] = useState<string>(""); // Track active item
  const { data: session } = useSession();
  const toggleMenu = (menu: string) => {
    setOpenMenu(openMenu === menu ? "" : menu);
  };

  const setActive = (item: string) => {
    setActiveItem(item);
  };

  return (
    <div className="flex flex-col items-start">
      {/* Profile Section */}
      <div className="flex items-center md:w-[15rem] w-full mb-4 p-4 rounded bg-white shadow">
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
      <nav className="md:w-[15rem] w-full shadow bg-white text-gray-800 rounded px-6 py-6">
        <div className="flex flex-col space-y-4">
          {/* Dashboard */}
          <a
            href="/dashboard"
            onClick={() => setActive("dashboard")}
            className={`flex items-center px-4 py-3 hover:bg-gray-300 rounded-md transition ${activeItem === "dashboard" ? "bg-gray-300 text-black" : "text-gray-800"
              }`}
          >
            <span className="material-icons-outlined">dashboard</span>
            <span className="ml-3">Dashboard</span>
          </a>

          {/* Orders */}
          <div>
            <button
              onClick={() => toggleMenu("orders")}
              aria-expanded={openMenu === "orders"}
              className={`flex items-center justify-between px-4 py-3 w-full hover:bg-gray-300 rounded-md transition ${activeItem === "orders" ? "bg-gray-300 text-black" : "text-gray-800"
                }`}
            >
              <div className="flex items-center">
                <span className="material-icons-outlined">shopping_cart</span>
                <span className="ml-3">Orders</span>
              </div>
              <span className="material-icons-outlined">
                {openMenu === "orders" ? "expand_less" : "expand_more"}
              </span>
            </button>
            {openMenu === "orders" && (
              <div className="ml-8 mt-2 flex flex-col space-y-2">
                {["New Orders", "Processed Orders", "Completed Orders"].map((label, index) => {
                  const id = label.toLowerCase().replace(" ", "");
                  return (
                    <a
                      key={index}
                      href="#"
                      onClick={() => setActive(id)}
                      className={`text-gray-600 hover:text-gray-400 ${activeItem === id ? "text-blue-500" : ""
                        }`}
                    >
                      {label}
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          {/* My Pages */}
          <a
            href="/my-page"
            onClick={() => setActive("myPages")}
            className={`flex items-center px-4 py-3 hover:bg-gray-300 rounded-md transition ${activeItem === "myPages" ? "bg-gray-300 text-black" : "text-gray-800"
              }`}
          >
            <span className="material-icons-outlined">pages</span>
            <span className="ml-3">My Pages</span>
          </a>

          {/* User Access */}
          <div>
            <button
              onClick={() => toggleMenu("userAccess")}
              aria-expanded={openMenu === "userAccess"}
              className={`flex items-center justify-between px-4 py-3 w-full hover:bg-gray-300 rounded-md transition ${activeItem === "userAccess" ? "bg-gray-300 text-black" : "text-gray-800"
                }`}
            >
              <div className="flex items-center">
                <span className="material-icons-outlined">people</span>
                <span className="ml-3">User Access</span>
              </div>
              <span className="material-icons-outlined">
                {openMenu === "userAccess" ? "expand_less" : "expand_more"}
              </span>
            </button>
            {openMenu === "userAccess" && (
              <div className="ml-8 mt-2 flex flex-col space-y-2">
                {["Admin", "Editor", "Viewer"].map((label, index) => {
                  const id = label.toLowerCase();
                  return (
                    <a
                      key={index}
                      href="#"
                      onClick={() => setActive(id)}
                      className={`text-gray-600 hover:text-gray-400 ${activeItem === id ? "text-blue-500" : ""
                        }`}
                    >
                      {label}
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          {/* Payments */}
          <a
            href="#"
            onClick={() => setActive("payments")}
            className={`flex items-center px-4 py-3 hover:bg-gray-300 rounded-md transition ${activeItem === "payments" ? "bg-gray-300 text-black" : "text-gray-800"
              }`}
          >
            <span className="material-icons-outlined">payment</span>
            <span className="ml-3">Payments</span>
          </a>
        </div>
      </nav>
    </div>
  );
}
