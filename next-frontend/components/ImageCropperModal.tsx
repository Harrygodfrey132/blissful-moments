import { useState, useEffect, ChangeEvent } from "react";
import Cropper from "react-easy-crop";
import { toast } from "react-toastify";
import { getCroppedImg } from "../utils/cropImage";
import { useSession } from "next-auth/react";

interface ImageCropperModalProps {
  onSave: (file: File) => void;
}

function ImageCropperModal({ onSave }: ImageCropperModalProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const { data: session } = useSession();
  const token = session?.user?.accessToken;

  // Allowed file formats
  const allowedFormats = ["image/jpeg", "image/jpg", "image/png"];

  // Handle file selection and open modal with validation
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      // Validate file size
      const maxSize = 4 * 1024 * 1024; // 2MB
      if (file.size > maxSize) {
        toast.error("File size should not exceed 2MB.");
        return;
      }

      // Validate file type
      if (!allowedFormats.includes(file.type)) {
        toast.error("Invalid file format. Please upload a JPG or PNG image.");
        return;
      }

      // If validations pass, read the file and open modal
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
      setIsModalOpen(true); // Open modal after file selection
    }
  };

  // Handle save action after cropping
  const handleSave = async () => {
    if (image && croppedAreaPixels) {
      try {
        // Get the cropped image as a Blob
        const croppedImageBlob = await getCroppedImg(image, croppedAreaPixels);
  
        // Convert Blob to File
        const file = new File([croppedImageBlob], "profile_picture.jpg", { type: "image/jpeg" });
  
        // Send the cropped image as a File to the parent component via onSave
        onSave(file);  // Pass the whole file object, not just the name
  
        // Optionally close the modal
        setIsModalOpen(false);
      } catch (error) {
        toast.error("Error processing the image.");
      }
    } else {
      toast.error("Please crop an image before saving.");
    }
  };

  const handleClose = () => {
    setImage(null);
    setIsModalOpen(false); // Close modal without saving
  };

  return (
    <div>
      <button type="button"
        className="absolute border font-playfair border-black bottom-4 text-sm md:right-4 right-4 bg-white py-2 pr-8 px-4 cursor-pointer"
        onClick={() => document.getElementById("fileInput")?.click()}
      >
        Change Picture
        <span className="material-icons-outlined absolute ml-1">photo_camera</span>
      </button>
      <input
        type="file"
        id="fileInput"
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-4 rounded w-11/12 max-w-2xl relative">
            <h2 className="text-lg font-bold mb-4">Adjust Your Picture</h2>
            <div className="relative w-full h-64 bg-gray-200">
              {image && (
                <Cropper
                  image={image}
                  crop={crop}
                  zoom={zoom}
                  aspect={1}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={(croppedArea, croppedAreaPixels) =>
                    setCroppedAreaPixels(croppedAreaPixels)
                  }
                />
              )}
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-300 rounded shadow hover:bg-gray-400"
                onClick={handleClose}
              >
                Cancel
              </button>
              <button type="button"
                className="px-4 py-2 bg-blue-light-900 text-white rounded"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ImageCropperModal;
