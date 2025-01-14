import React, { useState, useEffect, useRef } from "react";
import GalleryModalEdit from "./GalleryModalEdit";
import { IoCloseCircle, IoEllipsisVertical } from "react-icons/io5";

import { AiFillDelete } from "react-icons/ai";
import Image from "next/image";
import FolderManagerEdit from "./FolderManagerEdit";

interface Folder {
  id: number;
  name: string;
}

interface AllImage {
  id: string | number;
  src: string;
  name: string;
  isUploaded: boolean;
  folder_id?: number | null;
}

const GalleryEdit: React.FC<{ setGalleryData: (data: any) => void }> = ({ setGalleryData }) => {
  const [isGalleryEnabled, setGalleryIsEnabled] = useState(true);
  const [isModalOpen, setModalOpen] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [galleryName, setGalleryName] = useState<string>("Gallery");
  const galleryTaglineRef = useRef<HTMLDivElement>(null);
  const [popoverImageIndex, setPopoverImageIndex] = useState<number | null>(null);
  const [assignFolderPopoverIndex, setAssignFolderPopoverIndex] = useState<number | null>(null);
  const popoverRef = useRef<HTMLDivElement | null>(null);
  const [blobUrls, setBlobUrls] = useState<Record<string, string>>({});

  useEffect(() => {
    const urls = uploadedImages.reduce((acc, file, index) => {
      const id = `uploaded-${index}`;
      acc[id] = URL.createObjectURL(file);
      return acc;
    }, {} as Record<string, string>);

    setBlobUrls(urls);

    return () => {
      Object.values(urls).forEach((url) => URL.revokeObjectURL(url));
    };
  }, [uploadedImages]);

  const allImages: AllImage[] = uploadedImages.map((file, index) => ({
    id: `uploaded-${index}`,
    src: blobUrls[`uploaded-${index}`],
    name: file.name,
    isUploaded: true,
  }));

  const deleteImage = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index));
    setPopoverImageIndex(null);
  };


  return (
    <div className="font-playfair">
      <div className="flex justify-end">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          {/* Obituary + Dove Icon (Mobile First) */}
          <div className="flex items-center gap-2 w-full justify-end md:w-auto md:order-1">
            <div className="text-blue-light-900 font-playfair md:text-xl text-lg border-b-4 border-blue-light-800 font-400">
              Gallery
            </div>
            <Image src="/img/dove.svg" alt="Dove" width={50} height={50} />
          </div>
        </div>
      </div>

      {isGalleryEnabled && (
        <>
          <FolderManagerEdit />
          <div className="grid md:grid-cols-3 grid-cols-2 gap-5 mt-6 relative">
            {allImages.map((image, index) => (
              <div key={image.id} className="relative group">
                <Image src={image.src} alt={image.name} className="w-full md:h-72 h-32 object-cover rounded shadow" />
                <button
                  className="absolute top-2 right-2 text-2xl text-gray-500"
                  onClick={() => setPopoverImageIndex(popoverImageIndex === index ? null : index)}
                >
                  <IoEllipsisVertical />
                </button>
                {popoverImageIndex === index && (
                  <div className="absolute top-12 right-2 bg-white shadow-lg rounded p-2 z-10">
                    <button
                      onClick={() => deleteImage(index)}
                      className="flex items-center px-2 py-1 hover:bg-gray-100 w-full"
                    >
                      <AiFillDelete className="text-gray-400 cursor-pointer" />
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          <button onClick={() => setModalOpen(true)} className="mt-10 text-white px-4 py-2.5 bg-blue-light-900">
            Add a photo
          </button>

          <GalleryModalEdit
            isOpen={isModalOpen}
            onRequestClose={() => setModalOpen(false)}
            uploadedImages={uploadedImages}
            setUploadedImages={setUploadedImages}
            blobUrls={blobUrls}
          />
        </>
      )}
    </div>
  );
};

export default GalleryEdit;
