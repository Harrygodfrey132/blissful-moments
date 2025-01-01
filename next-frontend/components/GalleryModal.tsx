import React from "react";
import Modal from "react-modal";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { usePageContext } from "../context/PageContext";
import { API } from "../utils/api";

interface GalleryModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  uploadedImages: File[];
  setUploadedImages: React.Dispatch<React.SetStateAction<File[]>>;
  blobUrls: Record<string, string>;
}

const GalleryModal: React.FC<GalleryModalProps> = ({
  isOpen,
  onRequestClose,
  uploadedImages,
  setUploadedImages,
  blobUrls
}) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles: File[]) => {
      setUploadedImages((prev) => [...prev, ...acceptedFiles]);
    },
  });

  const { data: session } = useSession();
  const { pageData, setPageData } = usePageContext();
  const galleryId = pageData?.gallery?.id || '';
  const uploadImages = async () => {
    const formData = new FormData();
    uploadedImages.forEach((file) => formData.append('images[]', file));

    // Add gallery and folder info if available
    formData.append('gallery_id', String(galleryId));

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}${API.uploadGalleryImages}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${session?.user?.accessToken}`,
        },
      });

      if (response.status === 200) {
        toast.success('Images uploaded successfully!');
        setPageData(response.data.page_data);
        onRequestClose();
      }
    } catch (error) {
      console.error("Error uploading images:", error);
      toast.error('An error occurred while uploading images.');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      ariaHideApp={false}
      onRequestClose={onRequestClose}
      className="bg-white p-8 rounded shadow-lg md:w-3/6 max-w-5xl mx-auto"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-50 m-4 flex items-center justify-center"
    >
      <h2 className="text-xl font-bold mb-4">Upload Images</h2>
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded p-6 text-center ${isDragActive ? "border-blue-500 bg-blue-100" : "border-gray-300 bg-gray-50"
          }`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here...</p>
        ) : (
          <p>Drag & drop files here, or click to select files</p>
        )}
      </div>

      {/* Uploaded Images Preview */}
      {uploadedImages.length > 0 && (
        <div className="mt-4 grid grid-cols-4 gap-4 overflow-y-auto md:h-[200px]">
          {uploadedImages.map((file, index) => (
            <div key={index} className="relative">
              <img
                src={blobUrls[`uploaded-${index}`]} // Use memoized blob URL
                alt={file.name}
                className="w-full md:h-32 h-16 object-cover rounded shadow"
              />
            </div>
          ))}
        </div>
      )}


      <div className="mt-6 flex justify-end space-x-4">
        <button
          onClick={onRequestClose}
          className="px-4 py-2 bg-gray-300 rounded shadow hover:bg-gray-400"
        >
          Cancel
        </button>
        <button
          onClick={uploadImages}
          className="px-4 py-2 bg-blue-light-900 text-white rounded shadow"
        >
          Add Photos
        </button>
      </div>
    </Modal>
  );
};

export default GalleryModal;
