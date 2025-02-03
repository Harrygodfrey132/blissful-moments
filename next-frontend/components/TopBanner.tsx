import axios from "axios";
import React, { useEffect, useState } from "react";
import { API } from "../utils/api";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { usePageContext } from "../context/PageContext";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "../utils/cropImage";

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
  const [cropperImage, setCropperImage] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState<CroppedAreaPixels | null>(null);
  
  // Add a loading state to avoid flickering
  const [loadingBackgroundImage, setLoadingBackgroundImage] = useState(true);

  interface CroppedAreaPixels {
    x: number;
    y: number;
    width: number;
    height: number;
  }

  useEffect(() => {
    if (pageData?.background_image) {
      setBackgroundImage(pageData.background_image);
    }
  }, [pageData]);

  useEffect(() => {
    if (selectedImage) {
      const blobUrl = URL.createObjectURL(selectedImage);
      setCropperImage(blobUrl);

      return () => URL.revokeObjectURL(blobUrl);
    }
  }, [selectedImage]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!['image/jpeg', 'image/png'].includes(file.type)) {
        toast.error('Please select a valid image file (JPEG or PNG).');
        return;
      }
      setSelectedImage(file);
      setIsCropperOpen(true);
    }
  };

  const onCropComplete = (croppedAreaPercentage: any, croppedAreaPixels: CroppedAreaPixels) => {
    setCroppedArea(croppedAreaPixels);
  };

  const handleImageCrop = async () => {
    if (selectedImage && croppedArea && cropperImage) {
      try {
        setZoom(1);
        const croppedImage = await getCroppedImg(cropperImage, croppedArea , zoom);
        const formData = new FormData();
        formData.append("background_image", croppedImage);

        setIsUploading(true);
        setUploadError(null);

        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}${API.uploadBackgroundImage}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          setPageData(response.data.page_data);
          setBackgroundImage(response.data.backgroundImageUrl);
          toast.success("Image uploaded successfully!");
        } else {
          // Handle general backend failure
          setUploadError(response.data.message || "Failed to upload the image. Please try again.");
          toast.error(response.data.message || "Failed to upload the image. Please try again.");
        }
      } catch (error: any) {
        if (error.response && error.response.status === 422) {
          // Handle Laravel validation errors
          const validationErrors = error.response.data.errors; // Assuming errors are in { field: [messages] } format
          if (validationErrors) {
            Object.keys(validationErrors).forEach((field) => {
              toast.error(`${field}: ${validationErrors[field].join(", ")}`);
            });
          } else {
            toast.error(error.response.data.message || "Validation error occurred.");
          }
        } else if (error.response) {
          // Handle other server-side errors
          toast.error(error.response.data.message || "An error occurred on the server.");
        } else {
          // Handle unexpected errors (e.g., network issues)
          toast.error("An unexpected error occurred. Please try again.");
        }
      } finally {
        setIsUploading(false);
        setIsCropperOpen(false);
      }
  }
};

// Set loading state to false once the background image has been set
useEffect(() => {
  if (pageData?.background_image) {
    setLoadingBackgroundImage(false);
  }
}, [pageData?.background_image]);

return (
  <div>
    <header
      className="relative h-80 bg-cover bg-center"
      style={{
        backgroundImage: loadingBackgroundImage ? 'url(img/top-bg.jpg)' : `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="absolute top-5 md:top-auto md:bottom-4 right-4">
        <label className="bg-white px-4 py-2 border font-playfair text-sm border-black pr-8 shadow cursor-pointer relative" htmlFor="change-background-image">
          Change Image
          <span className="material-icons-outlined absolute ml-1">photo_camera</span>
          <input type="file"
            id="change-background-image"
            className="hidden"
            onChange={handleImageChange}
            disabled={isUploading}
            accept="image/*" />
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
            {cropperImage && (
              <Cropper
                image={cropperImage}
                crop={crop}
                zoom={zoom}
                aspect={16 / 9}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            )}
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <button onClick={() => setIsCropperOpen(false)} className="px-4 py-2 bg-gray-300 rounded shadow hover:bg-gray-400">Cancel</button>
            <button onClick={handleImageCrop} className="px-4 py-2 bg-blue-light-900 text-white rounded" disabled={isUploading}>
              {isUploading ? "Uploading..." : "Crop"}
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
);
}
