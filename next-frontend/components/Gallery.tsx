import React, { useState, useEffect, useRef } from "react";
import GalleryModal from "./GalleryModal";
import { IoCloseCircle, IoEllipsisVertical } from "react-icons/io5";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import axios from "axios";
import { API } from "../utils/api";
import { usePageContext } from "../context/PageContext";
import FolderManager from "../components/FolderManager";
import { AiFillDelete } from "react-icons/ai";

interface Image {
  image_path: string;
}

interface Folder {
  id: number;
  name: string;
}

const Gallery: React.FC = () => {
  const [isGalleryEnabled, setGalleryIsEnabled] = useState(true);
  const [isModalOpen, setModalOpen] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [galleryName, setCurrentGalleryName] = useState<string>("Gallery");
  const [galleryId, setCurrentGalleryId] = useState<number | null>(null);
  const [folders, setFolders] = useState<Folder[]>([]);
  const { setPageData, pageData } = usePageContext();
  const { data: session } = useSession();
  const token = session?.user?.accessToken;
  const galleryTaglineRef = useRef<HTMLDivElement>(null);
  const [popoverImageIndex, setPopoverImageIndex] = useState<number | null>(null);
  const [assignFolderPopoverIndex, setAssignFolderPopoverIndex] = useState<number | null>(null);
  const popoverRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/folders`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFolders(response.data.folders || []);
      } catch (error) {
        console.error("Error fetching folders:", error);
        setFolders([]);
      }
    };
    fetchFolders();
  }, [token]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        assignFolderPopoverIndex !== null
      ) {
        setAssignFolderPopoverIndex(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [assignFolderPopoverIndex]);

  const deleteImage = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index));
    setPopoverImageIndex(null);
    toast.success("Image deleted successfully!");
  };

  const handleFolderAssignment = (folderId: number) => {
    toast.success(`Assigned to folder ID: ${folderId}`);
    setAssignFolderPopoverIndex(null);
  };

  return (
    <div className="font-playfair">
      <div className="flex justify-between">
        <h1 className="text-2xl flex gap-4 font-medium mb-6 mt-4">
          <span
            className={`border border-dashed text-blue-light-900 p-2 border-gray-300 focus:outline-none focus:border-gray-500 ${
              isGalleryEnabled ? "" : "text-gray-500 cursor-not-allowed"
            }`}
            contentEditable={isGalleryEnabled}
            suppressContentEditableWarning
            aria-label="Gallery Name"
            onBlur={() => setCurrentGalleryName(galleryTaglineRef.current?.textContent || "Gallery")}
            ref={galleryTaglineRef}
          >
            {galleryName}
          </span>
        </h1>

        {/* Toggle switch */}
        <div className="flex justify-end mb-4">
          <div className="flex items-center md:gap-2 md:space-x-4 space-x-2">
            <div className="relative inline-block w-12 align-middle select-none transition-all duration-200 ease-in">
              <input
                type="checkbox"
                id="gallery-toggle"
                checked={isGalleryEnabled}
                onChange={() => setGalleryIsEnabled(!isGalleryEnabled)}
                className="toggle-checkbox absolute block md:w-8 w-6 md:h-8 h-6 rounded-full bg-gray-100 border-4 appearance-none cursor-pointer transition-all duration-200 ease-in-out"
              />
              <label
                htmlFor="gallery-toggle"
                className={`toggle-label block overflow-hidden md:h-8 h-6 md:!w-16 !w-12 bg-blue-light-900 rounded-full cursor-pointer transition-all duration-200 ease-in-out ${
                  isGalleryEnabled ? "bg-blue-light-900" : "bg-gray-300"
                }`}
              />
            </div>
            <span className="md:text-3xl text-xl font-medium font-playfair text-blue-light-900">Gallery</span>
          </div>
        </div>
      </div>
      <FolderManager />

      {isGalleryEnabled && (
        <>
          <div className="grid grid-cols-3 gap-5 mt-6 relative">
            {uploadedImages.map((file, index) => (
              <div key={index} className="relative group">
                <img
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  className="w-full h-72 object-cover rounded shadow"
                />
                <button
                  className="absolute bg-white rounded top-2 p-1 right-2 text-2xl text-gray-500 hover:text-gray-700 focus:outline-none"
                  onClick={() => setPopoverImageIndex(popoverImageIndex === index ? null : index)}
                >
                  <IoEllipsisVertical />
                </button>

                {popoverImageIndex === index && (
                  <div className="absolute top-12 flex right-2 bg-white shadow-lg rounded p-2 z-10">
                    <button
                      onClick={() => deleteImage(index)}
                      className="flex items-center px-2 py-1 hover:bg-gray-100 w-full"
                    >
                      <AiFillDelete className="text-gray-400 cursor-pointer" />
                   
                    </button>
                    <button
                      onClick={() => {
                        setPopoverImageIndex(null);
                        setAssignFolderPopoverIndex(
                          assignFolderPopoverIndex === index ? null : index
                        );
                      }}
                      className="flex items-center px-2 py-1 hover:bg-gray-100 w-full"
                    >
                      <span className="mr-2">📂</span>
                      {/* <span className="text-sm">Assign Folder</span> */}
                    </button>
                  </div>
                )}

                {assignFolderPopoverIndex === index && (
                  <div
                    ref={popoverRef}
                    className="absolute top-12 right-2 bg-white shadow-lg rounded p-3 z-20 "
                  >
                    <div className="text-sm mb-1">Choose folder(s)</div>
                    <ul>
                      <li className="flex items-center mb-2">
                        <input type="checkbox" className="mr-2" />
                        <label className="text-sm">test1</label>
                      </li>
                    </ul>

                    {/* <ul>
                      {folders.map((folder) => (
                        <li key={folder.id} className="flex items-center mb-2">
                          <input
                            type="checkbox"
                            id={`folder-${folder.id}`}
                            className="mr-2"
                            onChange={() => handleFolderAssignment(folder.id)}
                          />
                          <label htmlFor={`folder-${folder.id}`} className="text-sm">
                            {folder.name}
                          </label>
                        </li>
                      ))}
                    </ul> */}
                  </div>
                )}
              </div>
            ))}
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className="px-4 py-2 bg-blue-light-900 mt-10 text-lg text-white rounded shadow"
          >
            Add a photo
          </button>

          <GalleryModal
            isOpen={isModalOpen}
            onRequestClose={() => setModalOpen(false)}
            uploadedImages={uploadedImages}
            setUploadedImages={setUploadedImages}
          />
        </>
      )}
    </div>
  );
};

export default Gallery;
