import React, { useState } from "react";
import { IoIosSettings } from "react-icons/io";

const FloatingSettingsButton: React.FC = () => {
  const [isPopoverOpen, setPopoverOpen] = useState(false);

  // Toggle popover visibility
  const togglePopover = () => setPopoverOpen((prev) => !prev);

  return (
    <div className="fixed top-2/3 left-4 transform -translate-y-1/2 z-50">
      {/* Button */}
      <button
        onClick={togglePopover}
        className="bg-gray-200 hover:bg-gray-300 text-blue-light-900 font-medium group flex items-center gap-1 border border-gray-300 text-sm py-2 px-2 rounded shadow-sm transition-all duration-300 transform focus:outline-none"
      >
        <IoIosSettings className="text-lg group-hover:translate-x-0.5 text-lg transition-transform duration-300 ease-in" /> Page Settings
      </button>

      {/* Popover */}
      {isPopoverOpen && (
        <div className="absolute top-14 left-0 bg-gray-200  shadow-xl rounded w-48 p-2 transform transition-opacity duration-300 opacity-100">
          {/* Arrow */}
          <div className="absolute -top-2 left-4 w-4 h-4 bg-gray-200  transform rotate-45"></div>
          <ul className="space-y-2 mt-2">
            <li className="hover:bg-white text-black py-1.5 px-2 hover:text-black rounded">
              <a
                href="/background-music"
                className="text-sm transition-all font-medium duration-200"
              >
                Background Music
              </a>
            </li>
            <li className="hover:bg-white text-black py-1.5 px-2 hover:text-black rounded">
              <a
                href="/other-settings"
                className="text-sm transition-all font-medium duration-200"
              >
                Other Settings
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default FloatingSettingsButton;
