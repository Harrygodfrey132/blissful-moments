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
import Image from "next/image";

interface Image {
  image_path: string;
}

interface Folder {
  id: number;
  name: string;
}

interface GalleryImage {
  id: number;
  gallery_id: number;
  folder_id: number | null;
  image_path: string;
  caption: string | null;
}

const Gallery: React.FC = () => {
  const [isGalleryEnabled, setGalleryIsEnabled] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [galleryName, setCurrentGalleryName] = useState<string>("Gallery");
  const { setPageData, pageData } = usePageContext();
  const { data: session } = useSession();
  const token = session?.user?.accessToken;
  const galleryTaglineRef = useRef<HTMLDivElement>(null);
  const [popoverImageIndex, setPopoverImageIndex] = useState<number | null>(null);
  const [assignFolderPopoverIndex, setAssignFolderPopoverIndex] = useState<number | null>(null);
  const popoverRef = useRef<HTMLDivElement | null>(null);
  const [blobUrls, setBlobUrls] = useState<Record<string, string>>({});
  const [showLocalImages, setShowLocalImages] = useState(true);

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

  useEffect(() => {
    if (pageData?.gallery?.status !== undefined) {
      setGalleryIsEnabled(!!pageData.gallery.status);

    }
  }, [pageData]);


  useEffect(() => {
    // Generate blob URLs for uploaded images
    const urls = uploadedImages.reduce((acc, file, index) => {
      const id = `uploaded-${index}`;
      acc[id] = URL.createObjectURL(file);
      return acc;
    }, {} as Record<string, string>);

    setBlobUrls(urls);

    // Cleanup blob URLs on unmount
    return () => {
      Object.values(urls).forEach((url) => URL.revokeObjectURL(url));
    };
  }, [uploadedImages]);

  const deleteImage = async (index: number, isUploaded: boolean, imageId?: number) => {
    if (isUploaded) {
      setUploadedImages((prev) => prev.filter((_, i) => i !== index));
      toast.success("Image deleted successfully!");
    } else if (imageId) {
      try {
        const response = await axios.delete(
          `${process.env.NEXT_PUBLIC_API_URL}${API.deleteImage}`,
          {
            data: { image_id: imageId },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          // Update page data to reflect the change
          setPageData(response.data.page_data);
          toast.success("Image deleted successfully!");
        } else {
          throw new Error("Failed to delete image");
        }
      } catch (error) {
        console.error("Error deleting image:", error);
        toast.error("An error occurred while deleting the image.");
      }
    }

    setPopoverImageIndex(null);
  };

  const handleFolderAssignment = async (folderId: number, imageId: number, isChecked: boolean) => {
    try {
      const apiUrl = isChecked
        ? `${process.env.NEXT_PUBLIC_API_URL}/images/${imageId}/assign-folder`
        : `${process.env.NEXT_PUBLIC_API_URL}/images/${imageId}/unassign-folder`;

      const response = await axios.patch(
        apiUrl,
        isChecked ? { folder_id: folderId } : null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        const action = isChecked ? "assigned" : "unassigned";
        toast.success(`Folder ${action} successfully.`);
        setPageData(response.data.page_data); // Update page data with the latest state
      } else {
        throw new Error("Failed to update folder assignment.");
      }
    } catch (error) {
      console.error("Error updating folder assignment:", error);
      toast.error("An error occurred while updating the folder assignment.");
    }
  };

  const saveGalleryName = async (galleryTagline: string) => {
    setCurrentGalleryName(galleryTagline);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}${API.updateGalleryName}`,
        { gallery_name: galleryTagline },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Gallery name saved successfully!");
        setPageData(response.data?.page_data);
      } else {
        throw new Error("Failed to save gallery name.");
      }
    } catch (error) {
      console.error("Error saving gallery name:", error);
      toast.error("An error occurred while saving the gallery name.");
    }
  };

  const allImages = showLocalImages
    ? uploadedImages.map((file, index) => ({
      id: `uploaded-${index}`,
      src: blobUrls[`uploaded-${index}`],
      name: file.name,
      isUploaded: true,
    }))
    : (pageData?.gallery?.images || []).map((image: GalleryImage) => ({
      id: image.id,
      src: image.image_path,
      name: `Image ${image.id}`,
      isUploaded: false,
    }));

  useEffect(() => {
    // Switch to server images on page refresh
    if (pageData?.gallery?.images?.length > 0) {
      setShowLocalImages(false);
    }
  }, [pageData]);


  const handleStatus = async (status: boolean) => {
    setGalleryIsEnabled(status);
    const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}${API.updateGalleryStatus}`,
      {
        gallery_id: pageData?.gallery.id,
        status: status,

      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    if (response.status === 200) {
      console.log("Response Data", response.data.page_data);

      setPageData(response.data.page_data);

    } else {
      toast.error('Something went wrong');
      setGalleryIsEnabled(!status);
    }
  }
  return (
    <div className="font-playfair">
      <div className="flex justify-between">
        <h1 className="text-2xl flex gap-4 font-medium mb-6 mt-4">
          <span
            className={`border border-dashed text-blue-light-900 p-2 border-gray-300 focus:outline-none focus:border-gray-500 ${isGalleryEnabled ? "" : "text-gray-500 cursor-not-allowed"
              }`}
            contentEditable={isGalleryEnabled}
            suppressContentEditableWarning
            aria-label="Gallery Name"
            onBlur={() => saveGalleryName(galleryTaglineRef.current?.textContent || "Gallery")}
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
                onChange={() => handleStatus(!isGalleryEnabled)}
                className="toggle-checkbox absolute block md:w-8 w-6 md:h-8 h-6 rounded-full bg-gray-100 border-4 appearance-none cursor-pointer transition-all duration-200 ease-in-out"
              />
              <label
                htmlFor="gallery-toggle"
                className={`toggle-label block overflow-hidden md:h-8 h-6 md:!w-16 !w-12 bg-blue-light-900 rounded-full cursor-pointer transition-all duration-200 ease-in-out ${isGalleryEnabled ? "bg-blue-light-900" : "bg-gray-300"
                  }`}
              />
            </div>
            <span className="md:text-3xl text-xl font-medium font-playfair text-blue-light-900">Gallery</span>
          </div>
        </div>
      </div>


      {isGalleryEnabled && (

        <>
          <FolderManager />
          <div className="grid md:grid-cols-3 grid-cols-2 gap-5 mt-6 relative">
            {allImages.map((image, index) => (
              <div key={image.id} className="relative group">
                <Image
                  src={image.src}
                  alt={image.name}
                  width={500}
                  height={500}
                  className="w-full md:h-72 h-32 object-cover rounded shadow"
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
                      onClick={() => deleteImage(index, image.isUploaded, image.id)}
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
                    </button>
                  </div>
                )}

                {assignFolderPopoverIndex === index && (
                  <div
                    ref={popoverRef}
                    className="absolute top-12 right-2 bg-white shadow-lg rounded p-3 z-20"
                  >
                    <div className="text-sm mb-1">Choose folder(s)</div>
                    <ul>
                      {pageData.gallery?.folders?.map((folder: Folder, folderIndex: number) => {
                        const isAssigned = image.folder_id === folder.id;
                        return (
                          <li key={folderIndex} className="flex items-center mb-2">
                            <input
                              type="checkbox"
                              className="mr-2"
                              checked={isAssigned}
                              onChange={(e) => handleFolderAssignment(folder.id, image.id, e.target.checked)}
                            />
                            <label className="text-sm">{folder.name}</label>
                          </li>
                        );
                      })}
                    </ul>
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
            blobUrls={blobUrls}
          />
        </>
      )}
    </div>
  );
};

export default Gallery;
