import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { API } from "../utils/api";

const GalleryImageUploadView = ({ pageData }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSecondFormOpen, setIsSecondFormOpen] = useState(false);

  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState("");
  const [newFolder, setNewFolder] = useState("");

  const [additionalFormInputs, setAdditionalFormInputs] = useState({
    fullName: "",
    email: "",
  });

  const fileInputRef = useRef(null);

  // ** Step 1 popover ref **
  const firstFormRef = useRef(null);

  // ** Step 2 popover ref **
  const secondFormRef = useRef(null);

  // Only attach outside-click listener when either popover is open
  useEffect(() => {
    // If both forms are closed, no need to attach the listener
    if (!isFormOpen && !isSecondFormOpen) return;

    function handleClickOutside(event) {
      // If Step 1 popover is open and the click is outside => close it
      if (
        isFormOpen &&
        firstFormRef.current &&
        !firstFormRef.current.contains(event.target)
      ) {
        setIsFormOpen(false);
      }

      // If Step 2 popover is open and the click is outside => close it
      if (
        isSecondFormOpen &&
        secondFormRef.current &&
        !secondFormRef.current.contains(event.target)
      ) {
        setIsSecondFormOpen(false);
      }
    }

    // Use "click" to avoid scroll issues
    document.addEventListener("click", handleClickOutside);

    // Cleanup
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isFormOpen, isSecondFormOpen]);

  // Allowed file types
  const allowedExtensions = ["jpg", "jpeg", "png", "webp", "heic"];

  // Toggle the first form popover
  const toggleFirstForm = (e) => {
    // Stop the button click from being considered outside
    e.stopPropagation();

    // Close second form if open
    if (isSecondFormOpen) {
      setIsSecondFormOpen(false);
    }

    // Toggle the first form
    setIsFormOpen((prev) => !prev);
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const maxFiles = 10;
    const maxSizeMB = 5;
    const files = Array.from(e.target.files);

    if (files.length > maxFiles) {
      toast.warning(`You can upload up to ${maxFiles} images only.`);
      return;
    }

    const validFiles = files.filter((file) => {
      const fileExtension = file.name.split(".").pop().toLowerCase();
      const isValidExtension = allowedExtensions.includes(fileExtension);
      const isValidSize = file.size <= maxSizeMB * 1024 * 1024;

      if (!isValidExtension) {
        toast.warning(`${file.name} is not a supported image format.`);
      }
      if (!isValidSize) {
        toast.warning(`${file.name} exceeds ${maxSizeMB}MB and was not added.`);
      }

      return isValidExtension && isValidSize;
    });

    setSelectedImages(validFiles);
  };

  // Handle text input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdditionalFormInputs((prev) => ({ ...prev, [name]: value }));
  };

  // Submit first form
  const handleFirstFormSubmit = () => {
    if (selectedImages.length === 0) {
      toast.warning("Please select at least one image to upload.");
      return;
    }

    if (!selectedFolder && !newFolder.trim()) {
      toast.warning("Please select a folder or create a new one.");
      return;
    }

    // Close first form
    setIsFormOpen(false);

    // Slight delay, then open second form
    setTimeout(() => {
      setIsSecondFormOpen(true);
    }, 50);
  };

  // Helper to send requests
  const sendApiRequest = async (endpoint, payload, isMultipart = false) => {
    try {
      const headers = isMultipart
        ? { "Content-Type": "multipart/form-data" }
        : { "Content-Type": "application/json" };

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`,
        payload,
        { headers }
      );

      if (response.status === 200) {
        toast.success("Images uploaded successfully.");
        return response.data;
      } else {
        throw new Error(response.statusText);
      }
    } catch (error) {
      toast.error("Something went wrong!");
      throw error;
    }
  };

  // Final submit (second form)
  const handleFinalSubmit = async () => {
    if (!additionalFormInputs.fullName || !additionalFormInputs.email) {
      toast.warning("Please provide your full name and email.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("fullName", additionalFormInputs.fullName);
      formData.append("email", additionalFormInputs.email);
      formData.append("folder", newFolder || selectedFolder);
      formData.append("page_id", pageData.id);
      formData.append("user_id", pageData.user_id);

      selectedImages.forEach((file, index) => {
        formData.append(`images[${index}]`, file);
      });

      await sendApiRequest(`${API.sendImageUploadRequest}`, formData, true);

      // Reset state
      setAdditionalFormInputs({ fullName: "", email: "" });
      setSelectedImages([]);
      setSelectedFolder("");
      setNewFolder("");
      setIsSecondFormOpen(false);
    } catch {
      toast.error("Upload failed.");
    }
  };

  return (
    <div className="relative">
      {/* Button that toggles Step 1 form */}
      <button
        onClick={toggleFirstForm}
        className="text-white add-button px-6 py-2.5 font-playfair"
      >
        Add Images
      </button>

      {/* Step 1: Image Upload & Folder Selection */}
      {isFormOpen && (
        <div
          ref={firstFormRef}
          // Stop clicks inside from closing popover
          onClick={(e) => e.stopPropagation()}
          className="popover-container addimage-memory popover-contribution border border-gray-300 transition-all"
        >
          <div className="popover-arrow arrow-memory"></div>
          <h2 className="border-b-2 font-playfair border-blue-light-900 font-medium mb-4 text-center text-lg">
            Upload Your Memories
          </h2>

          {/* File Input */}
          <input
            type="file"
            accept="image/*"
            multiple
            ref={fileInputRef}
            onChange={handleImageUpload}
            className="w-full mb-4 p-2 text-base resize-none font-playfair border-dashed border-gray-300 placeholder:text-blue-light-900"
          />
          <p className="text-sm text-gray-500 mb-2">
            Max up to 10 images, each 5MB max.
          </p>

          {/* Folder Selection */}
          <div className="mb-4">
            <select
              name="folder"
              value={selectedFolder}
              onChange={(e) => setSelectedFolder(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">Select Folder</option>
              {pageData.gallery?.folders.map((folder) => (
                <option key={folder.id} value={folder.id}>
                  {folder.name}
                </option>
              ))}
            </select>
          </div>

          {/* Create New Folder Option */}
          <input
            type="text"
            name="newFolder"
            placeholder="Or create a new folder"
            value={newFolder}
            onChange={(e) => setNewFolder(e.target.value)}
            className="w-full mb-4 p-2 border border-gray-300 rounded"
          />

          {/* Proceed to User Details */}
          <button
            type="button"
            onClick={handleFirstFormSubmit}
            className="text-white add-button px-4 py-2.5"
          >
            Next
          </button>
        </div>
      )}

      {/* Step 2: User Details Form */}
      {isSecondFormOpen && (
        <div
          ref={secondFormRef}
          // Stop clicks inside from closing popover
          onClick={(e) => e.stopPropagation()}
          className="popover-container border border-gray-300 transition-all"
        >
          <div className="popover-arrow"></div>
          <h2 className="border-b-2 font-playfair border-blue-light-900 font-medium mb-4 text-center text-lg">
            Provide Your Details
          </h2>

          {/* Full Name */}
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={additionalFormInputs.fullName}
            onChange={handleInputChange}
            className="w-full mb-4 p-2 border border-gray-300 rounded"
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={additionalFormInputs.email}
            onChange={handleInputChange}
            className="w-full mb-4 p-2 border border-gray-300 rounded"
          />

          {/* Final Submit */}
          <button
            onClick={handleFinalSubmit}
            className="text-white add-button px-4 py-2.5"
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default GalleryImageUploadView;
