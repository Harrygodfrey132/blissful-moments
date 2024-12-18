import React, { useEffect, useState } from "react";
import { RiDoubleQuotesL, RiDoubleQuotesR } from "react-icons/ri";
import axios from "axios";
import { toast } from "react-toastify";
import { API } from "../utils/api";
import { useSession } from "next-auth/react";
import { usePageContext } from "../context/PageContext";

const PersonalQuote: React.FC = () => {
  const [isEnabled, setIsEnabled] = useState<boolean>(true);
  const [quote, setQuote] = useState<string>("");
  const { pageData, setPageData } = usePageContext();
  const { data: session } = useSession();
  const token = session?.user?.accessToken;

  useEffect(() => {
    if (pageData && pageData.personal_quote?.quote) {
      setQuote(pageData.personal_quote.quote);
    }
  }, [pageData]);

  // Function to save the quote to the backend
  const saveQuote = async () => {
    if (!token) {
      toast.error("You must be logged in to save a quote.");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}${API.saveQuote}`,
        { quote: quote },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setPageData(response.data.page_data);
      } else {
        toast.error("Failed to save the quote.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while saving the quote.");
    }
  };

  // Trigger save when focus is lost (onBlur)
  const handleBlur = () => {
    saveQuote();
  };

  return (
    <div>
      {/* Toggle switch */}
      <div className="flex justify-end mb-4">
        <div className="flex items-center space-x-4">
          <div className="relative inline-block w-12 align-middle select-none transition-all duration-200 ease-in">
            <input
              type="checkbox"
              id="toggle-switch"
              checked={isEnabled}
              onChange={() => setIsEnabled(!isEnabled)}
              className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-gray-100 border-4 appearance-none cursor-pointer transition-all duration-200 ease-in-out"
            />
            <label
              htmlFor="toggle-switch"
              className={`toggle-label block overflow-hidden h-6 bg-blue-light-900 rounded-full cursor-pointer transition-all duration-200 ease-in-out ${isEnabled ? "bg-blue-light-900" : "bg-gray-300"
                }`}
            ></label>
          </div>
          <span className="text-xl font-semibold text-blue-light-900">Intro</span>
        </div>
      </div>

      {/* Quote content */}
      {isEnabled && (
        <div>
          <h2 className="text-xl font-medium mb-4 relative">
            <RiDoubleQuotesL className="text-blue-light-900 absolute top-2 left-1" />
            <div
              className="border w-full border-dashed text-blue-900 px-6 py-5 border-gray-300 focus:outline-none focus:border-gray-500"
              contentEditable
              suppressContentEditableWarning
              aria-label="quote"
              onInput={(e) => setQuote(e.currentTarget.textContent || '')}
              onBlur={handleBlur}
            >
              {quote}
            </div>
            <RiDoubleQuotesR className="text-blue-light-900 absolute top-2 right-1" />
          </h2>

          <div className="flex justify-center mt-5">
            <button className="text-base font-medium px-4 py-2 bg-[#F3EAEACC] text-blue-light-900 shadow-md rounded">
              Suggest Quote
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonalQuote;
