import axios from "axios";
import React, { useEffect, useState } from "react";
import { API } from "../utils/api";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { usePageContext } from "../context/PageContext";
import Cropper from "react-easy-crop";

export default function TopBanner() {
  const [isBannerEnabled, setIsBannerEnabled] = useState<boolean>(true);
  const [backgroundImage, setBackgroundImage] = useState<string>('img/top-bg.jpg');
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const { setPageData, pageData } = usePageContext();
  const { data: session } = useSession();
  const token = session?.user?.accessToken;

  const [isCropperOpen, setIsCropperOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    if (pageData?.background_image) {
      setBackgroundImage(pageData.background_image);
    }
  }, [pageData]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setIsCropperOpen(true);
    }
  };

  const handleImageCrop = async () => {
    if (selectedImage) {
      const formData = new FormData();
      formData.append('background_image', selectedImage);

      setIsUploading(true);
      setUploadError(null);

      try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}${API.uploadBackgroundImage}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.success) {
          setPageData(response.data.page_data);
          setBackgroundImage(response.data.backgroundImageUrl);
          toast.success("Image uploaded successfully!");
        } else {
          setUploadError(response.data.message || "Failed to upload the image. Please try again.");
        }
      } catch (error) {
        toast.error("An error occurred while uploading the image.");
      } finally {
        setIsUploading(false);
        setIsCropperOpen(false);
      }
    }
  };

  return (
    <div>
      <header
        className="relative h-64 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute top-5 md:top-auto md:bottom-4 right-4">
          <label className="bg-white px-4 py-2 border font-playfair text-sm border-black pr-8 shadow cursor-pointer relative" htmlFor="change-background-image">
            Change Image
            <span className="material-icons-outlined absolute ml-1">photo_camera</span>
            <input type="file"
              id="change-background-image"
              className="hidden"
              onChange={handleImageChange}
              disabled={isUploading} />
          </label>
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

      {isCropperOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-4 rounded w-11/12 max-w-4xl relative">
            <h2 className="text-lg font-bold mb-4">Adjust Your Picture</h2>
            <div className="relative w-full h-64 bg-gray-200">
              {selectedImage && (
                <Cropper
                  image={URL.createObjectURL(selectedImage)}
                  crop={crop}
                  zoom={zoom}
                  aspect={16 / 9} // Aspect ratio for cropping
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                />
              )}
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button onClick={() => setIsCropperOpen(false)} className="px-4 py-2 bg-gray-300 rounded shadow hover:bg-gray-400">Cancel</button>
              <button onClick={handleImageCrop} className="px-4 py-2 bg-blue-light-900 text-white rounded">Crop</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
