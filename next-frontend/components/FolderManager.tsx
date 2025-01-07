import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiTwotoneDelete } from "react-icons/ai";
import { API } from "../utils/api";
import { useSession } from "next-auth/react";
import { usePageContext } from "../context/PageContext";
import { toast } from "react-toastify";

interface Folder {
  id: number;
  name: string;
}

const FolderManager: React.FC = () => {
  const { data: session } = useSession();
  const { pageData, setPageData } = usePageContext();
  const [folders, setFolders] = useState<Folder[]>([]); // Local folder state
  const token = session?.user?.accessToken;

  // Initialize folders from pageData
  useEffect(() => {
    if (pageData?.gallery?.folders) {
      setFolders(pageData.gallery.folders);
    }
  }, [pageData]);

  // API call utility with token handling
  const axiosConfig = {
    headers: { Authorization: `Bearer ${token}` },
  };

  // Function to add a new folder
  const addFolder = async () => {
    if (!pageData?.gallery?.id) {
      toast.error("Something went wrong. Cannot create folder.");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}${API.createFolder}`,
        { name: "New Folder", gallery_id: pageData.gallery.id },
        axiosConfig
      );

      if (response.status === 200) {
        setPageData(response.data.page_data); // Update global state
        toast.success("Folder created successfully");
      } else {
        toast.error("Failed to create folder.");
      }
    } catch (error: any) {
      toast.error(`Error: ${error.response?.data?.message || error.message}`);
    }
  };

  // Function to delete a folder
  const deleteFolder = async (id: number) => {
    try {
      // Call the API to delete the folder
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}${API.deleteFolder}/${id}`,
        axiosConfig
      );

      if (response.status === 200) {
        // Update the global state with the response
        setPageData(response.data.page_data);
        setFolders(response.data.page_data.gallery?.folders || []); // Sync local state
        toast.success("Folder deleted successfully");
      } else {
        throw new Error("Failed to delete folder.");
      }
    } catch (error: any) {
      // Show error if the API call fails
      toast.error(`Error: ${error.response?.data?.message || error.message}`);
    }
  };

  // Function to update folder name
  const updateFolderName = async (id: number, newName: string) => {
    const originalFolders = [...folders]; // Backup current state

    setFolders((prevFolders) =>
      prevFolders.map((folder) =>
        folder.id === id ? { ...folder, name: newName } : folder
      )
    ); // Optimistic update

    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}${API.renameFolder}/${id}`,
        { name: newName, gallery_id: pageData.gallery?.id },
        axiosConfig
      );

      if (response.status === 200) {
        setPageData(response.data.page_data); // Update global state
        toast.success("Folder name updated successfully");
      } else {
        throw new Error("Failed to update folder name.");
      }
    } catch (error: any) {
      setFolders(originalFolders); // Rollback on error
      toast.error(`Error: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className="font-playfair mb-5">
      <div className="flex flex-wrap items-center gap-4">
        {folders.map((folder) => (
          <div
            key={folder.id}
            className="flex items-center justify-between border shadow p-1.5 bg-[#F8F8F8] rounded"
          >
            <span
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) =>
                updateFolderName(folder.id, e.currentTarget.textContent || "New Folder")
              }
              className="flex-1 outline-none p-0.5 text-sm border-dashed border border-gray-300 focus:border-gray-500"
            >
              {folder.name}
            </span>
            <button
              onClick={() => deleteFolder(folder.id)}
              className="text-base ml-1"
            >
              <AiTwotoneDelete />
            </button>
          </div>
        ))}
        <button
          onClick={addFolder}
          className="px-4 py-2.5 add-button text-white font-playfair flex justify-center items-center"
        >
          Create a Folder
        </button>
      </div>
    </div>
  );
};

export default FolderManager;
