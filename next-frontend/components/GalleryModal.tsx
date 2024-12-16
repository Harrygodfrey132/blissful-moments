import React from "react";
import Modal from "react-modal";
import { useDropzone } from "react-dropzone";

interface GalleryModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  uploadedImages: File[];
  setUploadedImages: React.Dispatch<React.SetStateAction<File[]>>;
}

const GalleryModal: React.FC<GalleryModalProps> = ({
  isOpen,
  onRequestClose,
  uploadedImages,
  setUploadedImages,
}) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles: File[]) => {
      setUploadedImages((prev) => [...prev, ...acceptedFiles]);
    },
  });

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="bg-white p-8 rounded shadow-lg w-3/6 max-w-5xl mx-auto mt-20"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
    >
      <h2 className="text-xl font-bold mb-4">Upload Images</h2>
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded p-6 text-center ${
          isDragActive ? "border-blue-500 bg-blue-100" : "border-gray-300 bg-gray-50"
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
        <div className="mt-4 grid grid-cols-4 gap-4 overflow-y-auto h-[200px]">
          {uploadedImages.map((file, index) => (
            <div key={index} className="relative">
              <img
                src={URL.createObjectURL(file)}
                alt={file.name}
                className="w-full h-32 object-cover rounded shadow"
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
          onClick={() => {
            console.log("Files to upload:", uploadedImages);
            onRequestClose();
          }}
          className="px-4 py-2 bg-blue-light-900 text-white rounded shadow"
        >
          Upload
        </button>
      </div>
    </Modal>
  );
};

export default GalleryModal;
