import React, { useState, useEffect } from "react";
import GalleryModal from "./GalleryModal"; // Import the GalleryModal component
import { IoCloseCircle } from "react-icons/io5";

const Gallery: React.FC = () => {
  const [isGalleryEnabled, setGalleryIsEnabled] = useState(true);
  const [isModalOpen, setModalOpen] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);

  // Prevent body scrolling when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add("body-lock");
    } else {
      document.body.classList.remove("body-lock");
    }
    return () => {
      document.body.classList.remove("body-lock");
    };
  }, [isModalOpen]);

  return (
    <div className="p-6">
      <div className="flex justify-between">
        <h1 className="text-3xl flex gap-4 font-medium mb-6 mt-4">
          <span
            className={`border border-dashed text-blue-light-900 p-4 border-gray-300 focus:outline-none focus:border-gray-500 ${
              isGalleryEnabled ? "" : "text-gray-500 cursor-not-allowed"
            }`}
            contentEditable={isGalleryEnabled} // Disable contentEditable when gallery is disabled
            suppressContentEditableWarning
            aria-label="Gallery Name"
            onInput={(e) => console.log("Gallery name:", e.currentTarget.textContent)}
          >
            Gallery
          </span>
        </h1>

        {/* Toggle switch */}
        <div className="flex justify-end mb-4">
          <div className="flex items-center space-x-4">
            <div className="relative inline-block w-12 align-middle select-none transition-all duration-200 ease-in">
              <input
                type="checkbox"
                id="gallery-toggle"
                checked={isGalleryEnabled}
                onChange={() => setGalleryIsEnabled(!isGalleryEnabled)}
                className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-gray-100 border-4 appearance-none cursor-pointer transition-all duration-200 ease-in-out"
              />
              <label
                htmlFor="gallery-toggle"
                className={`toggle-label block overflow-hidden h-6 bg-blue-light-900 rounded-full cursor-pointer transition-all duration-200 ease-in-out ${
                  isGalleryEnabled ? "bg-blue-light-900" : "bg-gray-300"
                }`}
              />
            </div>
            <span className="text-xl font-semibold text-blue-light-900">Gallery</span>
          </div>
        </div>
      </div>

      {/* Gallery Content */}
      {isGalleryEnabled && (
        <>
          {/* Display uploaded images */}
          <div className="grid grid-cols-3 gap-4">
            {uploadedImages.map((file, index) => (
              <div key={index} className="relative">
                <img
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  className="w-full h-32 object-cover rounded shadow"
                />
                <button
                  onClick={() =>
                    setUploadedImages((prev) => prev.filter((_, i) => i !== index))
                  }
                  className="absolute text-red-500 top-1 right-1 text-2xl"
                >
                  <IoCloseCircle />
                </button>
              </div>
            ))}
          </div>

          {/* Add photo button */}
          <button
            onClick={() => setModalOpen(true)}
            className="px-4 py-2 bg-blue-light-900 mt-10 text-white rounded shadow"
          >
            Add photo
          </button>

          {/* Modal */}
          <GalleryModal
            isOpen={isModalOpen}
            onRequestClose={() => setModalOpen(false)}
            uploadedImages={uploadedImages}
            setUploadedImages={setUploadedImages}
          />
        </>
      )}
    </div>
  );
};

export default Gallery;
