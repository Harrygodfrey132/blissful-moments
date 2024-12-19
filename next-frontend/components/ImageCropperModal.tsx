import { useState, useEffect, useRef, ChangeEvent } from "react";
import Cropper from "react-easy-crop";
import { toast } from "react-toastify";

// ImageCropperModal Component
function ImageCropperModal({ onSave }: { onSave: (file: File) => void }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
      setIsModalOpen(true);
    }
  };

  const handleSave = () => {
    // Logic to crop image
    if (image && croppedAreaPixels) {
      // Convert cropped image to a file (implement this if necessary)
      toast.success("Cropped image saved!");
      setIsModalOpen(false);
    }
  };

  const handleClose = () => {
    setImage(null);
    setIsModalOpen(false);
  };

  return (
    <div>
      <button
        className="absolute border font-playfair border-black bottom-4 text-sm md:right-4 right-20 bg-white py-2 pr-8 px-4 cursor-pointer"
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
              <button
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