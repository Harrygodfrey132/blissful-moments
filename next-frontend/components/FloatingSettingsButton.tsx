import React, { useState } from "react";
import { IoIosSettings } from "react-icons/io";

const FloatingSettingsButton: React.FC = () => {
  const [isPopoverOpen, setPopoverOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Toggle popover visibility
  const togglePopover = () => setPopoverOpen((prev) => !prev);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setModalOpen(true);
    }
  };

  const handleFileUpload = async () => {
    if (selectedFile) {
      // Prepare the file for upload
      const formData = new FormData();
      formData.append('background_music', selectedFile);

      // Upload the file
      try {
        // Replace the API endpoint with your actual endpoint
        const response = await fetch('/api/uploadBackgroundMusic', {
          method: 'POST',
          body: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
            // Add authorization token if needed
          },
        });

        if (response.ok) {
          console.log('File uploaded successfully');
          // Handle success (e.g., update state or show a success message)
        } else {
          console.error('File upload failed');
          // Handle error (e.g., show an error message)
        }
      } catch (error) {
        console.error('An error occurred during file upload', error);
        // Handle exception
      } finally {
        setModalOpen(false);
        setSelectedFile(null);
      }
    }
  };

  return (
    <div>
    <div className="fixed top-2/3 left-4 transform -translate-y-1/2 z-50">
      {/* Button */}
      <button
        onClick={togglePopover}
        className="bg-gray-200 hover:bg-gray-300 font-playfair text-blue-light-900 font-medium group flex items-center gap-1 border border-gray-300 text-sm py-2 px-2 rounded shadow-sm transition-all duration-300 transform focus:outline-none"
      >
        <IoIosSettings className="text-lg group-hover:translate-x-0.5 text-xl transition-transform duration-300 ease-in" /> Page Settings
      </button>

      {/* Popover */}
      {isPopoverOpen && (
        <div className="absolute top-14 left-0 bg-gray-200 shadow-xl rounded w-48 p-2 transform transition-opacity duration-300 opacity-100">
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
                href="/other-settings"
                className="text-sm transition-all font-playfair font-medium duration-200"
              >
                Other Settings
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
          <h2 className="text-lg font-bold mb-4">Upload Background Music</h2>
          <input type="file" accept="audio/*" onChange={handleFileChange} />
          <div className="mt-4 flex justify-end gap-2">
            <button onClick={() => setModalOpen(false)} className="px-4 py-2 bg-gray-300 rounded shadow hover:bg-gray-400">Cancel</button>
            <button onClick={handleFileUpload} className="px-4 py-2 bg-blue-light-900 text-white rounded ">Upload</button>
          </div>
        </div>
      </div>
      
    )}
    </div>
  );
};

export default FloatingSettingsButton;
