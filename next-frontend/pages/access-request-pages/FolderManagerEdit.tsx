import React, { useState, useEffect } from "react";
import { AiTwotoneDelete } from "react-icons/ai";
import { toast } from "react-toastify";

interface Folder {
  id: number;
  name: string;
}

const FolderManagerEdit: React.FC = () => {
  const [folders, setFolders] = useState<Folder[]>([]);

  // Initialize folders (optional - can be removed if no default state is needed)
  useEffect(() => {
    // Example: Load initial folders from local storage or predefined data
    const initialFolders = JSON.parse(localStorage.getItem("folders") || "[]");
    setFolders(initialFolders);
  }, []);

  // Save folders to local storage whenever they are updated
  useEffect(() => {
    localStorage.setItem("folders", JSON.stringify(folders));
  }, [folders]);

  // Function to add a new folder
  const addFolder = () => {
    const newFolder: Folder = {
      id: Date.now(), // Unique ID using the current timestamp
      name: "New Folder",
    };
    setFolders((prev) => [...prev, newFolder]);
  };

  // Function to delete a folder
  const deleteFolder = (id: number) => {
    setFolders((prev) => prev.filter((folder) => folder.id !== id));
  };

  // Function to update folder name
  const updateFolderName = (id: number, newName: string) => {
    if (!newName.trim()) {
      toast.error("Folder name cannot be empty");
      return;
    }

    setFolders((prev) =>
      prev.map((folder) =>
        folder.id === id ? { ...folder, name: newName } : folder
      )
    );
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

export default FolderManagerEdit;
