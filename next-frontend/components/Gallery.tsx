import React, { useState, useEffect, useRef } from "react";
import GalleryModal from "./GalleryModal";
import { IoCloseCircle } from "react-icons/io5";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import axios from "axios";
import { API } from "../utils/api";
import { usePageContext } from "../context/PageContext";

interface Image {
  image_path: string;
}

const Gallery: React.FC = () => {
  const [isGalleryEnabled, setGalleryIsEnabled] = useState(true);
  const [isModalOpen, setModalOpen] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [galleryName, setCurrentGalleryName] = useState<string>("");
  const [galleryId, setCurrentGalleryId] = useState<number | null>(null);
  const { setPageData, pageData } = usePageContext();
  const { data: session } = useSession();
  const token = session?.user?.accessToken;
  const galleryTaglineRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (pageData?.galleries?.length > 0) {
      setCurrentGalleryName(pageData.galleries[0].gallery_name || "Gallery");
      setCurrentGalleryId(pageData.galleries[0].id);
    }
  }, [pageData]);

  const saveGalleryName = async () => {
    if (!galleryName.trim()) {
      toast.error("Gallery name cannot be empty.");
      return;
    }

    try {
      if (!token) {
        toast.error("You must be logged in to update the gallery.");
        return;
      }

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}${API.updateGalleryName}`,
        { gallery_name: galleryName },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setPageData(response.data.page_data);
        return response.data;
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error updating gallery name:", error);
      toast.error("There was an error updating the gallery name.");
    }
  }
  // Function to handle gallery name update
  const handleGalleryNameBlur = () => {
    if (galleryTaglineRef.current) {
      setCurrentGalleryName(galleryTaglineRef.current.textContent || "Gallery");
      saveGalleryName();
    }
  };


  // Function to handle image upload
  const handleImageChange = async () => {
    if (!uploadedImages.length) {
      toast.error("Please select images to upload.");
      return;
    }

    if (!galleryId) {
      toast.error("Gallery ID is missing. Please select a gallery.");
      return;
    }

    try {
      if (!token) {
        toast.error("You must be logged in to upload images.");
        return;
      }

      const formData = new FormData();
      uploadedImages.forEach((file) => formData.append("images[]", file));
      formData.append("gallery_id", String(galleryId));

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}${API.uploadGalleryImages}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        toast.success("Images uploaded successfully!");
        setUploadedImages([]);
        setPageData(response.data.page_data);
      } else {
        toast.error(response.data.message || "Failed to upload images.");
      }
    } catch (error: any) {
      if (error.response && error.response.data) {
        const { errors, message } = error.response.data;
        toast.error(message || "There was an error uploading the images.");

        // Optionally display field-specific errors
        if (errors) {
          Object.entries(errors).forEach(([field, messages]) => {
            (messages as string[]).forEach((errorMsg) =>
              toast.error(`${field}: ${errorMsg}`)
            );
          });
        }
      } else {
        console.error("Error uploading images:", error);
        toast.error("There was an error uploading the images.");
      }
    }
  };


  return (
    <div className="font-playfair">
      <div className="flex justify-between">
        <h1 className="text-2xl flex gap-4 font-medium mb-6 mt-4">
          <span
            className={`border border-dashed text-blue-light-900 p-2 border-gray-300 focus:outline-none focus:border-gray-500 ${isGalleryEnabled ? "" : "text-gray-500 cursor-not-allowed"
              }`}
            contentEditable={isGalleryEnabled}
            suppressContentEditableWarning
            aria-label="Gallery Name"
            onBlur={handleGalleryNameBlur}
            ref={galleryTaglineRef}
          >
            {galleryName}
          </span>
        </h1>

        {/* Toggle switch */}
        <div className="flex justify-end mb-4">
          <div className="flex items-center gap-2 space-x-4">
            <div className="relative inline-block w-12 align-middle select-none transition-all duration-200 ease-in">
              <input
                type="checkbox"
                id="gallery-toggle"
                checked={isGalleryEnabled}
                onChange={() => setGalleryIsEnabled(!isGalleryEnabled)}
                className="toggle-checkbox absolute block w-8 h-8 rounded-full bg-gray-100 border-4 appearance-none cursor-pointer transition-all duration-200 ease-in-out"
              />
              <label
                htmlFor="gallery-toggle"
                className={`toggle-label block overflow-hidden h-8 !w-16 bg-blue-light-900 rounded-full cursor-pointer transition-all duration-200 ease-in-out ${isGalleryEnabled ? "bg-blue-light-900" : "bg-gray-300"
                  }`}
              />
            </div>
            <span className="text-3xl font-medium font-playfair text-blue-light-900">Gallery</span>
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

          {/* Display uploaded images */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            {pageData?.galleries?.[0]?.images?.map((image: Image, index: number) => (
              <div key={index} className="relative">
                <img
                  src={`${process.env.NEXT_PUBLIC_API_URL}/${image.image_path}`}
                  alt={`Image ${index + 1}`}
                  className="w-full h-32 object-cover rounded shadow"
                />
              </div>
            ))}
          </div>

          {/* Add photo button */}
          <button
            onClick={() => setModalOpen(true)}
            className="px-4 py-2 bg-blue-light-900 mt-10 text-lg text-white rounded shadow"
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

          {/* Submit Button */}
          <div className="flex justify-center mt-5">
            <button
              onClick={handleImageChange}
              className="text-base font-medium px-4 py-2 bg-blue-light-900 text-white rounded shadow"
            >
              Upload Images
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Gallery;
