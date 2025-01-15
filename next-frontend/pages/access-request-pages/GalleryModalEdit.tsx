import React, { useState } from "react";
import ModalEdit from "./ModalEdit";
import { useDropzone } from "react-dropzone";

interface GalleryModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  uploadedImages: File[];
  setUploadedImages: React.Dispatch<React.SetStateAction<File[]>>;
  blobUrls: { [key: string]: string };
}

const GalleryModalEdit: React.FC<GalleryModalProps> = ({
  isOpen,
  onRequestClose,
  uploadedImages,
  setUploadedImages,
  blobUrls,
}) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles: File[]) => {
      setUploadedImages((prev) => [...prev, ...acceptedFiles]);
    },
  });

  return (
    <ModalEdit isOpen={isOpen} onClose={onRequestClose}>
      <h2 className="text-xl font-bold mb-4">Upload Images</h2>
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded p-6 text-center ${
          isDragActive ? "border-blue-500 bg-blue-100" : "border-gray-300 bg-gray-50"
        }`}
      >
        <input {...getInputProps()} />
        {isDragActive ? <p>Drop the files here...</p> : <p>Drag & drop files here, or click to select files</p>}
      </div>

      {uploadedImages?.length > 0 && (
        <div className="mt-4 grid grid-cols-4 gap-4 overflow-y-auto md:h-[200px]">
          {uploadedImages.map((file, index) => (
            <div key={index} className="relative">
              <img
                src={blobUrls[`uploaded-${index}`]}
                alt={file.name}
                className="w-full md:h-32 h-16 object-cover rounded shadow"
              />
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 flex justify-end space-x-4">
        <button onClick={onRequestClose} className="px-4 py-2 bg-gray-300 rounded shadow hover:bg-gray-400">
          Cancel
        </button>
      </div>
    </ModalEdit>
  );
};

export default GalleryModalEdit;
