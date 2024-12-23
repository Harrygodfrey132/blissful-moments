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
  const [folders, setFolders] = useState<Folder[]>([]); // Initialize folders state
  const token = session?.user?.accessToken;

  // Initialize folders from pageData when the component mounts or pageData changes
  useEffect(() => {
    if (pageData?.gallery?.folders) {
      setFolders(pageData.gallery.folders);
    }
  }, [pageData]);

  // Function to add a new folder
  const addFolder = async () => {
    const newFolder: Folder = { id: Date.now(), name: "New Folder" };
    setFolders((prevFolders) => [...prevFolders, newFolder]);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}${API.createFolder}`,
        {
          name: newFolder.name,
          gallery_id: pageData.gallery?.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setPageData(response.data.page_data);
        toast.success("Folder created successfully");
      } else {
        toast.error("Unable to create folder");
      }
    } catch (error: any) {
      toast.error("Something went wrong: " + (error.response?.data?.message || error.message));
    }
  };

  // Function to delete a folder
  const deleteFolder = async (id: number) => {
    setFolders((prevFolders) => prevFolders.filter((folder) => folder.id !== id));

    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}${API.deleteFolder}/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setPageData(response.data.page_data);
        toast.success("Folder deleted successfully");
      } else {
        toast.error("Unable to delete folder");
      }
    } catch (error: any) {
      toast.error("Something went wrong: " + (error.response?.data?.message || error.message));
    }
  };

  // Function to update folder name
  const updateFolderName = async (id: number, newName: string) => {
    setFolders((prevFolders) =>
      prevFolders.map((folder) =>
        folder.id === id ? { ...folder, name: newName } : folder
      )
    );

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}${API.createFolder}`,
        {
          name: newName,
          gallery_id: pageData.gallery?.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setPageData(response.data.page_data);
        toast.success("Folder name updated successfully");
      } else {
        toast.error("Unable to update folder name");
      }
    } catch (error: any) {
      toast.error("Something went wrong: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="font-playfair mb-5">
      {/* List of Folders */}
      <div className="flex flex-wrap items-center gap-4">
        {folders.map((folder) => (
          <div
            key={folder.id}
            className="flex items-center justify-between border shadow p-1.5 bg-[#F8F8F8] rounded"
          >
            {/* Editable Folder Name */}
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

            {/* Delete Icon */}
            <button
              onClick={() => deleteFolder(folder.id)}
              className="text-base ml-1"
            >
              <AiTwotoneDelete />
            </button>
          </div>
        ))}

        {/* Add Folder Button */}
        <button
          onClick={addFolder}
          className="px-4 py-2 bg-blue-light-900 h-[40px] text-white font-medium rounded shadow flex justify-center items-center"
        >
          Create a Folder
        </button>
      </div>
    </div>
  );
};

export default FolderManager;
