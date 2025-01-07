import React, { useState } from "react";
import { TiDelete } from "react-icons/ti";

// Define a type for the favourite items
type Favourite = {
  title: string;
  description: string;
};

const Favourites = () => {
  // State to toggle the Favourites feature
  const [isFavouritesEnabled, setIsFavouritesEnabled] = useState(true);

  // State to store the list of favourite items, with one default block
  const [favourites, setFavourites] = useState<Favourite[]>([
    { title: "Default Title", description: "Default Description" },
  ]);

  // Function to add a new favourite block
  const addFavouriteBlock = () => {
    setFavourites([...favourites, { title: "New Title", description: "New Description" }]);
  };

  // Function to handle content-editable input changes
  const handleContentChange = (index: number, field: keyof Favourite, value: string) => {
    const updatedFavourites = [...favourites];
    updatedFavourites[index][field] = value;
    setFavourites(updatedFavourites);
  };

  // Function to delete a favourite block
  const deleteFavouriteBlock = (index: number) => {
    const updatedFavourites = favourites.filter((_, i) => i !== index);
    setFavourites(updatedFavourites);
  };

  return (
    <div className="mb-24">
      {/* Toggle Favourites Switch */}
      <div className="md:flex gap-4 justify-between">
        <div className="flex md:order-2 order-1 justify-end mb-4">
          <div className="flex items-center md:gap-2 md:space-x-4 space-x-2">
            <div className="relative inline-block w-12 font-playfair align-middle select-none transition-all duration-200 ease-in">
              <input
                type="checkbox"
                id="toggle-favourites"
                checked={isFavouritesEnabled}
                onChange={() => setIsFavouritesEnabled(!isFavouritesEnabled)}
                className="toggle-checkbox absolute block md:w-8 w-6 md:h-8 h-6 rounded-full bg-gray-100 border-4 appearance-none cursor-pointer transition-all duration-200 ease-in-out"
              />
              <label
                htmlFor="toggle-favourites"
                className={`toggle-label block overflow-hidden md:h-8 h-6 md:!w-16 !w-12 rounded-full cursor-pointer transition-all duration-200 ease-in-out ${
                  isFavouritesEnabled ? "bg-blue-light-900" : "bg-gray-300"
                }`}
              ></label>
            </div>
            <span className="md:text-3xl text-xl font-playfair font-medium text-blue-light-900">
              Favourites
            </span>
          </div>
        </div>

        {/* Editable Header */}
        <h1 className="md:text-3xl md:order-1 order-2 text-2xl flex gap-4 font-playfair font-medium mb-6 mt-4">
          <span
            className={`border border-dashed w-full bg-[#f8f8f8] text-blue-light-900 p-3 border-gray-300 focus:outline-none focus:border-gray-500 ${
              isFavouritesEnabled ? "" : "text-gray-500 cursor-not-allowed"
            }`}
            contentEditable={isFavouritesEnabled}
            suppressContentEditableWarning
            aria-label="Favourites Title"
          >
            A place to remember John's favourite things
          </span>
        </h1>
      </div>

      {/* Favourite Blocks */}
      {isFavouritesEnabled && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {favourites.map((favourite, index) => (
            <div key={index} className="relative">
              <button
                className="absolute text-xl bottom-[-20px] font-playfair right-[-5px] text-red-600"
                onClick={() => deleteFavouriteBlock(index)}
                aria-label="Delete Favourite"
              >
                <TiDelete />
              </button>
              <h3
                contentEditable
                suppressContentEditableWarning
                className="text-blue-light-900 text-xl border-gray-300 bg-[#f8f8f8] font-400 border-dashed border p-3 mb-2 focus:outline-none focus:border-b focus:border-gray-400"
                onBlur={(e) => handleContentChange(index, "title", e.currentTarget.textContent || "")}
              >
                {favourite.title}
              </h3>
              <p
                contentEditable
                suppressContentEditableWarning
                className="text-blue-light-900 font-400 text-xl border-gray-300 bg-[#f8f8f8] focus:outline-none border-dashed border p-3 focus:border-b focus:border-gray-400"
                onBlur={(e) => handleContentChange(index, "description", e.currentTarget.textContent || "")}
              >
                {favourite.description}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Button to add new favourite block */}
      {isFavouritesEnabled && (
        <button onClick={addFavouriteBlock} className="add-button text-white px-6 py-2.5 font-playfair mt-10">
          Add Favourites
        </button>
      )}
    </div>
  );
};

export default Favourites;
