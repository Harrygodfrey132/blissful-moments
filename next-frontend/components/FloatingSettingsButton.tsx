import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { IoIosSettings } from "react-icons/io";
import { API } from "../utils/api";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { AxiosError } from 'axios';
import { usePageContext } from "../context/PageContext";
import Modal from "../components/modal";

const FloatingSettingsButton: React.FC = () => {
  const [isPopoverOpen, setPopoverOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isConfigModalOpen, setConfigModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const popoverRef = useRef<HTMLDivElement | null>(null); // Reference for popover container
  const buttonRef = useRef<HTMLButtonElement | null>(null); // Reference for settings button
  const { data: session } = useSession();
  const token = session?.user?.accessToken;
  const { pageData, setPageData } = usePageContext();

  // Toggle popover visibility
  const togglePopover = () => setPopoverOpen((prev) => !prev);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setModalOpen(true);
    }
  };

  const openModal = (modalType: "config" | "register") => {
    if (modalType === "config") setConfigModalOpen(true);
  };

  const closeModal = (modalType: "config" | "register") => {
    if (modalType === "config") setConfigModalOpen(false);
  };

  const handleFileUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('background_music', selectedFile);

      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}${API.uploadBackgroundMusic}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          toast.success('File uploaded successfully');
          setPageData(response.data.page_data);
        } else {
          toast.error('File upload failed');
        }
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          const errorMessages = error.response?.data?.errors?.background_music || [];

          if (errorMessages.length > 0) {
            toast.error(`Validation Errors: ${errorMessages.join(', ')}`);
          } else {
            toast.error('An unknown error occurred during file upload.');
          }
        } else {
          console.error('An unexpected error occurred during file upload', error);
        }
      } finally {
        setModalOpen(false);
        setSelectedFile(null);
      }
    }
  };

  const handleDelete = async () => {
    const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}${API.deleteBackgroundMusic}`, {
      headers: {
        Authorization: `Bearer ${session?.user?.accessToken}`
      }
    })

    if (response.status === 200) {
      setPageData({
        ...pageData,
        background_music: null,
      });
      setModalOpen(false);
    }
  };

  // Close the popover if clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current && !popoverRef.current.contains(event.target as Node) &&
        buttonRef.current && !buttonRef.current.contains(event.target as Node)
      ) {
        setPopoverOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Audio playing logic (if background music is available)
  const audioSrc = pageData?.background_music || '';
  const isMusicAvailable = audioSrc !== '';

  return (
    <div>
      <div className="fixed top-2/3 left-4 transform -translate-y-1/2 z-50">
        {/* Button */}
        <button
          ref={buttonRef} // Reference for settings button
          onClick={togglePopover}
          className="bg-gray-200 hover:bg-gray-300 font-playfair text-blue-light-900 font-medium group flex items-center gap-1 border border-gray-300 text-sm py-2 px-2 rounded shadow-sm transition-all duration-300 transform focus:outline-none"
        >
          <IoIosSettings className="text-lg group-hover:translate-x-0.5 transition-transform duration-300 ease-in" /> Page Settings
        </button>

        {/* Popover */}
        {isPopoverOpen && (
          <div
            ref={popoverRef} // Reference for popover container
            className="absolute top-14 left-0 bg-gray-200 shadow-xl rounded w-48 p-2 transform transition-opacity duration-300 opacity-100"
          >
            {/* Arrow */}
            <div className="absolute -top-2 left-4 w-4 h-4 bg-gray-200 transform rotate-45"></div>
            <ul className="space-y-2 mt-2">
              <li className="hover:bg-white text-black py-1.5 px-2 hover:text-black rounded">
                <button
                  onClick={() => setModalOpen(true)}
                  className="text-sm transition-all font-playfair font-medium duration-200"
                >
                  Background Music
                </button>
              </li>
              <li className="hover:bg-white text-black py-1.5 px-2 hover:text-black rounded">
                <a
                  href="#"
                  className="text-sm transition-all font-playfair font-medium duration-200"
                  onClick={(e) => {
                    e.preventDefault(); // Prevent the default link behavior
                    openModal("config"); // Open the config modal
                  }}
                >
                  Page Configuration
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Modal for File Upload */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-4 rounded-lg w-11/12 max-w-lg relative transform transition-all duration-300">
            <h2 className="text-lg font-bold mb-4">Background Music</h2>

            {/* Display the file name if background music is added */}
            {pageData?.background_music ? (
              <div className="flex items-center gap-2 mb-4">
                <span className="text-gray-700">{pageData.background_music}</span>
                <button
                  onClick={handleDelete}
                  className="text-red-600 hover:text-red-700"
                  aria-label="Delete"
                >
                  <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path></svg>
                </button>
              </div>
            ) : (
              <p className="text-gray-500">No background music uploaded.</p>
            )}

            <input type="file" accept="audio/*" onChange={handleFileChange} className="mt-4" />

            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded shadow hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleFileUpload}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                {pageData?.background_music ? 'Update' : 'Upload'}
              </button>
            </div>
          </div>
        </div>

      )}

      {/* Play the background music if available */}
      {isMusicAvailable && (
        <audio className="hidden" controls autoPlay loop>
          <source src={audioSrc} type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>
      )}

      {/* Configuration Modal */}
      <Modal isOpen={isConfigModalOpen} onClose={() => closeModal("config")} />
    </div>
  );
};

export default FloatingSettingsButton;
