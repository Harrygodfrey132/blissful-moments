// components/SocialMedia.tsx
import React, { useState } from "react";

const SocialMedia: React.FC = () => {
  const [isSocialMediaEnabled, setIsSocialMediaEnabled] = useState(true);

  return (
    <div>
      <div className="flex justify-end mb-4">
        {/* Toggle Switch */}
        <div className="flex items-center gap-2 space-x-4">
          <div className="relative inline-block w-12 align-middle select-none transition-all duration-200 ease-in">
            <input
              type="checkbox"
              id="social-media-toggle"
              checked={isSocialMediaEnabled}
              onChange={() => setIsSocialMediaEnabled(!isSocialMediaEnabled)}
              className="toggle-checkbox absolute block w-8 h-8 rounded-full bg-gray-100 border-4 appearance-none cursor-pointer transition-all duration-200 ease-in-out"
            />
            <label
              htmlFor="social-media-toggle"
              className={`toggle-label block overflow-hidden h-8 !w-16 bg-blue-light-900 rounded-full cursor-pointer transition-all duration-200 ease-in-out ${isSocialMediaEnabled ? "bg-blue-light-900" : "bg-gray-300"
                }`}
            />
          </div>
          <span className="text-3xl font-playfair font-medium text-blue-light-900">Social Media Link</span>
        </div>
      </div>

      {/* Social Media Links */}
      {isSocialMediaEnabled && (
        <h1 className="text-2xl flex gap-4 font-medium mb-6 mt-8">
          <span
            className={`border border-dashed bg-[#f8f8f8] font-playfair  w-full text-blue-light-900 p-3 border-gray-300 focus:outline-none focus:border-gray-500 ${isSocialMediaEnabled ? "" : "text-gray-500 cursor-not-allowed"
              }`}
            contentEditable={isSocialMediaEnabled} // Disable contentEditable when timeline is disabled
            suppressContentEditableWarning
            aria-label="Gallery Name"
            onInput={(e) =>
              console.log("Gallery name:", e.currentTarget.textContent)
            }
          >
            This page is a forever tribute to . Please spread the page so others can contribute and reminise
          </span>
        </h1>
      )}

      <button

        className="px-4 py-2 bg-blue-light-900 text-white rounded shadow"
      >
        Copy link
      </button>

    </div>
  );
};

export default SocialMedia;
