import React, { useState } from "react";

export default function TopBanner() {
  const [isBannerEnabled, setIsBannerEnabled] = useState(true)
  return (
    <header
      className="relative h-64 bg-cover bg-center"
      style={{ backgroundImage: `url('img/top-bg.jpg')` }}
    >
      <div className="absolute bottom-4 right-4">
        <label className="bg-white px-4 py-2 border text-sm border-black pr-8 shadow cursor-pointer relative">
          Change Image
          <span className="material-icons-outlined absolute ml-1">photo_camera</span>
          <input type="file" className="hidden" />
        </label>
      </div>
      {/* Toggle Switch */}
      <div className="flex justify-end absolute p-1 left-2 rounded mb-4 mt-6">
        <div className="flex items-center space-x-2">
          <div className="relative inline-block w-12 align-middle select-none transition-all duration-200 ease-in">
            <input
              type="checkbox"
              id="toggle-switch-feature"
              checked={isBannerEnabled}
              onChange={() => setIsBannerEnabled(!isBannerEnabled)} // Corrected here
              className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-gray-100 border-4 appearance-none cursor-pointer transition-all duration-200 ease-in-out"
            />
            <label
              htmlFor="toggle-switch-feature"
              className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer transition-all duration-200 ease-in-out 
        ${isBannerEnabled ? 'bg-blue-light-900' : 'bg-gray-100'}`}
            ></label>
          </div>
          <span className="text-lg font-semibold text-blue-light-900">Edit</span>
        </div>
      </div>
    </header>
  );
}