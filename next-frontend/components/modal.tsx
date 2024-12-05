import React, { useState } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [selectedOption, setSelectedOption] = useState<string>("public"); // Default to "public"

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white px-8 py-8 rounded shadow w-[450px]">
        <div className="text-xl font-semibold text-slate-900 mb-7">Page configuration</div>
        {/* Radio Buttons */}
        <div className="mt-4 flex gap-4">
          <label className="flex  cursor-pointer">
            <input
              type="radio"
              name="option"
              value="public"
              checked={selectedOption === "public"}
              onChange={() => setSelectedOption("public")}
              className="hidden"
            />
            <span
              className={`w-5 h-5 border-2 rounded-full flex items-center justify-center transition-colors ${
                selectedOption === "public" ? "bg-blue-light-900 border-blue-light-900" : "bg-white border-gray-400"
              }`}
            >
              {selectedOption === "public" && (
                <span className="w-3 h-3 bg-white rounded-full"></span>
              )}
            </span>
            <span className="ml-2 text-sm font-medium">Public</span>
          </label>

          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="option"
              value="private"
              checked={selectedOption === "private"}
              onChange={() => setSelectedOption("private")}
              className="hidden"
            />
            <span
              className={`w-5 h-5 border-2 rounded-full flex items-center justify-center transition-colors ${
                selectedOption === "private" ? "bg-blue-light-900 border-blue-light-900" : "bg-white border-gray-400"
              }`}
            >
              {selectedOption === "private" && (
                <span className="w-3 h-3 bg-white rounded-full"></span>
              )}
            </span>
            <span className="ml-2 text-sm font-medium">Private</span>
          </label>
        </div>

        {/* Conditional Fields */}
        <div className="mt-6">
          {selectedOption === "public" && (
            <div>
              <label htmlFor="url" className="block text-sm font-medium text-gray-900">
                Set URL:
              </label>
              <input
                type="text"
                id="url"
                placeholder="Enter URL"
                className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              />
            </div>
          )}
          {selectedOption === "private" && (
            <div>
              <label htmlFor="url" className="block text-sm font-medium text-gray-900">
                Set URL:
              </label>
              <input
                type="text"
                id="url"
                placeholder="Enter URL"
                className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              />

              <label htmlFor="password" className="block text-sm font-medium text-gray-900 mt-4">
                Password:
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter Password"
                className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              />
            </div>
          )}
        </div>

        {/* Save Button */}
        <div className="text-end">
          <button
            onClick={onClose}
            className="mt-6 px-6 w-32 bg-blue-light-900 text-white py-2 rounded hover:bg-blue-light-900"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
