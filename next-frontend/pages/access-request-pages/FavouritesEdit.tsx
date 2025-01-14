// FavouritesEdit.tsx
import Image from "next/image";
import React, { useState } from "react";
import { AiTwotoneDelete } from "react-icons/ai";
import { FavouriteEvent } from "../../utils/types";


interface FavouritesEditProps {
  initialFavourites: FavouriteEvent[];
  initialTagline: string;
  setFavouritesData: React.Dispatch<React.SetStateAction<{
    favourites: FavouriteEvent[];
    tagline: string;
  }>>;
}

const FavouritesEdit: React.FC<FavouritesEditProps> = ({
  initialFavourites,
  initialTagline,
  setFavouritesData,
}) => {
  const defaultTagline = "A place to remember favourite things";
  const [tagline, setTagline] = useState<string>(initialTagline || defaultTagline);
  const [favourites, setFavourites] = useState<FavouriteEvent[]>(initialFavourites || []);

  const addFavouriteBlock = () => {
    const newEvent: FavouriteEvent = {
      id: favourites.length + 1,
      title: "New Title",
      description: "New Description",
    };
    const updatedFavourites = [...favourites, newEvent];
    setFavourites(updatedFavourites);
    setFavouritesData({ favourites: updatedFavourites, tagline });
  };

  const handleContentChange = (index: number, field: keyof FavouriteEvent, value: string) => {
    const updatedFavourites = [...favourites];
    updatedFavourites[index] = { ...updatedFavourites[index], [field]: value };
    setFavourites(updatedFavourites);
    setFavouritesData({ favourites: updatedFavourites, tagline });
  };

  const deleteFavouriteBlock = (index: number) => {
    const updatedFavourites = favourites.filter((_, i) => i !== index);
    setFavourites(updatedFavourites);
    setFavouritesData({ favourites: updatedFavourites, tagline });
  };

  const handleTaglineBlur = (e: React.FocusEvent<HTMLSpanElement>) => {
    const newTagline = e.currentTarget.textContent || "";
    setTagline(newTagline);
    setFavouritesData({ favourites, tagline: newTagline });
  };

  return (
    <div className="mb-24">
      <div className="md:flex gap-4 justify-between">
        <div className="flex md:order-2 order-1 justify-end mb-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            {/* Obituary + Dove Icon (Mobile First) */}
            <div className="flex items-center gap-2 w-full justify-end md:w-auto md:order-1">
              <div className="text-blue-light-900 font-playfair md:text-xl text-lg border-b-4 border-blue-light-800 font-400">
                Favourites
              </div>
              <Image src="/img/dove.svg" alt="Dove" width={50} height={50} />
            </div>
          </div>
        </div>

        <h1 className="md:text-xl md:order-1 order-2 text-xl flex gap-4 font-playfair font-medium mb-6 mt-4">
          <span
            className="border border-dashed w-full bg-[#f8f8f8] text-blue-light-900 p-3 border-gray-300 focus:outline-none focus:border-gray-500"
            aria-label="Favourites Title"
          >
            {tagline}
          </span>
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {favourites.map((favourite, index) => (
          <div key={index} className="relative">
            <button
              className="absolute text-xl bottom-[-20px] right-[-5px]"
              onClick={() => deleteFavouriteBlock(index)}
              aria-label="Delete Favourite"
            >
              <AiTwotoneDelete />
            </button>
            <h3
              contentEditable
              suppressContentEditableWarning
              className="text-blue-light-900 font-playfair text-lg border-gray-300 bg-[#f8f8f8] border-dashed border p-3 mb-2 focus:outline-none focus:border-b focus:border-gray-400"
              onBlur={(e) => handleContentChange(index, "title", e.currentTarget.textContent || "")}
            >
              {favourite.title}
            </h3>
            <p
              contentEditable
              suppressContentEditableWarning
              className="text-blue-light-900 font-playfair text-lg border-gray-300 bg-[#f8f8f8] border-dashed border p-3 focus:outline-none focus:border-b focus:border-gray-400"
              onBlur={(e) => handleContentChange(index, "description", e.currentTarget.textContent || "")}
            >
              {favourite.description}
            </p>
          </div>
        ))}
      </div>

      <button onClick={addFavouriteBlock} className="add-button text-white px-6 py-2.5 font-playfair mt-10">
        Add Favourites
      </button>
    </div>
  );
};

export default FavouritesEdit;
