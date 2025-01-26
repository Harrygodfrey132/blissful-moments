import React, { useEffect, useState } from "react";
import { TiDelete } from "react-icons/ti";
import axios from "axios";
import { API } from "../utils/api";
import { useSession } from "next-auth/react";
import { usePageContext } from "../context/PageContext";
import { toast } from "react-toastify";
import { AiTwotoneDelete } from "react-icons/ai";

type FavouriteEvent = {
  id?: number; // Optional to handle new events without an ID
  favourite_id?: number; // Optional to handle new events without an ID
  title: string;
  description: string;
};

const Favourites = () => {
  const defaultTagline = "A place to remember John's favourite things";
  const defaultFavourites: FavouriteEvent[] = [
    { title: "Default Title", description: "Default Description" },
  ];

  const { data: session } = useSession();
  const { pageData, setPageData } = usePageContext();

  const [isFavouritesEnabled, setIsFavouritesEnabled] = useState<boolean>(pageData?.favourites?.status == 1);
  const [tagline, setTagline] = useState<string>(
    pageData?.favourites?.tagline || defaultTagline
  );
  const [favourites, setFavourites] = useState<FavouriteEvent[]>(
    pageData?.favourites?.favourite_events || defaultFavourites
  );

  // Update state when pageData changes
  useEffect(() => {
    if (pageData?.favourites) {
      setTagline(pageData.favourites.tagline || defaultTagline);
      setIsFavouritesEnabled(pageData.favourites.status === 1);
      setFavourites(pageData.favourites.favourite_events || defaultFavourites);
    }
  }, [pageData]);

  const addFavouriteBlock = () => {
    const newEvent: FavouriteEvent = {
      id: favourites.length + 1,
      favourite_id: pageData?.favourites.id,
      title: "New Title",
      description: "New Description",
    };

    setFavourites([...favourites, newEvent]);
  };

  const handleContentChange = (index: number, field: keyof FavouriteEvent, value: string) => {
    const updatedFavourites: FavouriteEvent[] = [...favourites]; // Spread ensures the correct type
    updatedFavourites[index] = {
      ...updatedFavourites[index],
      [field]: value, // Dynamically update the field
    };
    setFavourites(updatedFavourites);

    // Send updated favourites to the backend
    updateFavouriteEvents(updatedFavourites);
  };


  const deleteFavouriteBlock = async (index: number) => {
    const favouriteToDelete = favourites[index];
    const updatedFavourites = favourites.filter((_, i) => i !== index);
    setFavourites(updatedFavourites);

    try {
      // Send delete request to the backend
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}${API.deleteFavouriteEvent}/${favouriteToDelete.id}`,
        {
          headers: {
            Authorization: `Bearer ${session?.user?.accessToken}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Favourite deleted successfully");
        setPageData(response.data.page_data);
      } else {
        toast.error("Unable to delete favourite");
        setFavourites([...favourites]);
      }
    } catch (error) {
      console.error("Error deleting favourite:", error);
      toast.error("Error deleting favourite");

      // Revert state if an error occurs
      setFavourites([...favourites]);
    }
  };


  const updateTaglineAndStatus = async (newTagline: string, status: boolean) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}${API.updateFavouriteTagline}`,
        {
          tagline: newTagline,
          status: status,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user?.accessToken}`,
          },
        }
      );

      if (response.status === 200) {
        setPageData(response.data.page_data);
      } else {
        toast.error("Unable to save data", response.data.message);
      }
    } catch (error) {
      console.error("Error updating tagline and status:", error);
    }
  };

  const updateFavouriteEvents = async (updatedFavourites: FavouriteEvent[]) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}${API.updateFavouriteEvents}`,
        {
          favourite_events: updatedFavourites,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user?.accessToken}`,
          },
        }
      );

      if (response.status === 200) {
        setPageData(response.data.page_data);
      } else {
        toast.error("Unable to save data");
      }
    } catch (error) {
      console.error("Error updating favourite events:", error);
      toast.error("Error saving favourites");
    }
  };

  const handleTaglineBlur = (e: React.FocusEvent<HTMLSpanElement>) => {
    const newTagline = e.currentTarget.textContent || "";
    setTagline(newTagline);
    updateTaglineAndStatus(newTagline, isFavouritesEnabled);
  };

  const handleToggleChange = () => {
    const newStatus = !isFavouritesEnabled;
    setIsFavouritesEnabled(newStatus);
    updateTaglineAndStatus(tagline, newStatus);
  };

  return (
    <div className="mb-24">
      <div className="md:flex gap-4 justify-between">
        <div className="flex md:order-2 order-1 justify-end mb-4">
          <div className="flex items-center md:gap-8 gap-3">
            <div className="relative inline-block w-12 font-playfair align-middle select-none transition-all duration-200 ease-in">
              <input
                type="checkbox"
                id="toggle-favourites"
                checked={isFavouritesEnabled}
                onChange={handleToggleChange}
                className="toggle-checkbox absolute block md:w-8 md:h-8 h-6 w-6 rounded-full bg-gray-100 border-4 appearance-none cursor-pointer transition-all duration-200 ease-in-out"
              />
              <label
                htmlFor="toggle-favourites"
                className={`toggle-label block overflow-hidden  md:h-8 h-6 md:!w-14 !w-12 rounded-full cursor-pointer transition-all duration-200 ease-in-out ${isFavouritesEnabled ? "bg-blue-light-900" : "bg-gray-300"}`}
              ></label>
            </div>
            <span className="md:text-3xl text-xl font-playfair font-medium text-blue-light-900">
              Favourites
            </span>
          </div>
        </div>

        <h1 className="md:text-4xl md:order-1 order-2 text-3xl flex gap-4 font-playfair font-medium mb-6 mt-4">
          <span
            className={`border border-dashed w-full bg-[#f8f8f8] text-blue-light-900 p-4 border-gray-300 focus:outline-none focus:border-gray-500 ${isFavouritesEnabled ? "" : "text-gray-500 cursor-not-allowed"}`}
            contentEditable={isFavouritesEnabled}
            suppressContentEditableWarning
            aria-label="Favourites Title"
            onBlur={handleTaglineBlur}
          >
            {tagline}
          </span>
        </h1>
      </div>

      {isFavouritesEnabled && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {favourites.map((favourite, index) => (
            <div key={index} className="relative">
              <button
                className="absolute text-xl bottom-[-20px] font-playfair right-[-5px]"
                onClick={() => deleteFavouriteBlock(index)}
                aria-label="Delete Favourite"
              >
                 <AiTwotoneDelete />
              </button>
              <h3
                contentEditable
                suppressContentEditableWarning
                className="text-blue-light-900 font-playfair text-xl border-gray-300 bg-[#f8f8f8] font-400 border-dashed border p-3 mb-2 focus:outline-none focus:border-b focus:border-gray-400"
                onBlur={(e) => handleContentChange(index, "title", e.currentTarget.textContent || "")}
              >
                {favourite.title}
              </h3>
              <p
                contentEditable
                suppressContentEditableWarning
                className="text-blue-light-900 font-400 font-playfair text-xl border-gray-300 bg-[#f8f8f8] focus:outline-none border-dashed border p-3 focus:border-b focus:border-gray-400"
                onBlur={(e) => handleContentChange(index, "description", e.currentTarget.textContent || "")}
              >
                {favourite.description}
              </p>
            </div>
          ))}
        </div>
      )}

      {isFavouritesEnabled && (
        <button onClick={addFavouriteBlock} className="add-button text-white px-6 py-2.5 font-playfair mt-10">
          Add Favourites
        </button>
      )}
    </div>
  );
};

export default Favourites;
