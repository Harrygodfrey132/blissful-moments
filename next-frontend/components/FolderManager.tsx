import React, { useState } from "react";
import { AiTwotoneDelete } from "react-icons/ai";

interface Folder {
  id: number;
  name: string;
}

const FolderManager: React.FC = () => {
  const [folders, setFolders] = useState<Folder[]>([]); // State to store folders

  // Function to add a new folder
  const addFolder = () => {
    const newFolder: Folder = {
      id: Date.now(), // Use timestamp as a unique ID
      name: "New Folder", // Default name for new folder
    };

    setFolders((prevFolders) => [...prevFolders, newFolder]);
  };

  // Function to delete a folder
  const deleteFolder = (id: number) => {
    setFolders((prevFolders) => prevFolders.filter((folder) => folder.id !== id));
  };

  // Function to update folder name
  const updateFolderName = (id: number, newName: string) => {
    setFolders((prevFolders) =>
      prevFolders.map((folder) =>
        folder.id === id ? { ...folder, name: newName } : folder
      )
    );
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
