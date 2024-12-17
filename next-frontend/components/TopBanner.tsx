import axios from "axios";
import React, { useEffect, useState } from "react";
import { API } from "../utils/api";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { usePageContext } from "../context/PageContext";

export default function TopBanner() {
  const [isBannerEnabled, setIsBannerEnabled] = useState<boolean>(true)
  const [backgroundImage, setBackgroundImage] = useState<string>('img/top-bg.jpg');
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const { setPageId , setPageData , pageData } = usePageContext();

  const { data: session } = useSession();
  const token = session?.user?.accessToken;

  useEffect(() => {
    if (pageData?.background_image) {
      setBackgroundImage(pageData.background_image);
    }
  }, [pageData]);

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('background_image', file);

      setIsUploading(true);
      setUploadError(null);

      try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}${API.uploadBackgroundImage}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`
          },
        });

        if (response.data.success) {
          setPageData(response.data.page_data);
          setBackgroundImage(response.data.backgroundImageUrl);
        } else {
          setUploadError("Failed to upload the image. Please try again.");
          toast.error("Failed to upload the image. Please try again.");
        }
      } catch (error) {
        toast.error("An error occurred while uploading the image.");
      } finally {
        setIsUploading(false);
      }
    }
  };

  return (
    <header
      className="relative h-64 bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute top-5 md:top-auto md:bottom-4 right-4">
        <label className="bg-white px-4 py-2 border text-sm border-black pr-8 shadow cursor-pointer relative">
          Change Image
          <span className="material-icons-outlined absolute ml-1">photo_camera</span>
          <input type="file"
            className="hidden"
            onChange={handleImageChange}
            disabled={isUploading} />
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
              onChange={() => setIsBannerEnabled(!isBannerEnabled)}
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
      {/* Error Message */}
      {uploadError && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-red-500">
          {uploadError}
        </div>
      )}
      {/* Uploading Indicator */}
      {isUploading && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-blue-500">
          Uploading...
        </div>
      )}
    </header>
  );
}