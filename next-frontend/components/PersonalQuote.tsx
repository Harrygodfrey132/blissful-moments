import React, { useEffect, useState, useRef } from "react";
import { RiDoubleQuotesL, RiDoubleQuotesR } from "react-icons/ri";
import axios from "axios";
import { toast } from "react-toastify";
import { API } from "../utils/api";
import { useSession } from "next-auth/react";
import { usePageContext } from "../context/PageContext";

const PersonalQuote: React.FC = () => {
  const [isEnabled, setIsEnabled] = useState<boolean>(true);
  const [quoteRequested, isQuoteRequested] = useState<boolean>(false);
  const [quote, setQuote] = useState<string>("Share Something special for loved one");
  const { pageData, setPageData } = usePageContext();
  const { data: session } = useSession();
  const token = session?.user?.accessToken;

  // Ref for the contentEditable div
  const quoteRef = useRef<HTMLDivElement>(null);

  // Fetch and set the quote when page data is updated
  useEffect(() => {
    if (pageData && pageData.personal_quote?.quote) {
      setQuote(pageData.personal_quote.quote);
      setIsEnabled(Boolean(pageData.personal_quote.status));
    }
  }, [pageData]);

  // API for generating a random quote
  const generateQuote = async () => {
    try {
      isQuoteRequested(true);
      const response = await axios.get('/api/quote');
      if (response.data && response.data.length > 0) {
        setQuote(response.data[0].q);
        saveQuote(response.data[0].q, isEnabled);
        isQuoteRequested(false);

      } else {
        toast.info("No quote found, please try again.");
      }
    } catch (error) {
      console.error('Error fetching quote:', error);
      toast.error("An error occurred while fetching the quote. Please try again.");
    }
  };

  // Function to save the quote to the backend
  const saveQuote = async (updatedQuote: string, isDisabled: boolean) => {
    if (!token) {
      toast.error("You must be logged in to save a quote.");
      return;
    }

    // Check if the quote is still the placeholder or empty
    if (updatedQuote === "Share your best quote here" || !updatedQuote.trim()) {
      toast.error("Please provide a valid quote before saving.");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}${API.saveQuote}`,
        { quote: updatedQuote, status: isDisabled },
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
    if (quoteRef.current) {
      const updatedQuote = quoteRef.current.textContent?.trim() || '';  // Get trimmed text
      setQuote(updatedQuote);
      saveQuote(updatedQuote, isEnabled);
    }
  };

  const handleStatus = (status: boolean) => {
    setIsEnabled(status);
    saveQuote(quote, status);
  }

  return (
    <div>
      {/* Toggle switch */}
      <div className="flex justify-end mb-4">
        <div className="flex items-center md:gap-2 md:space-x-4 space-x-2">
          <div className="relative inline-block w-12 align-middle select-none transition-all duration-200 ease-in">
            <input
              type="checkbox"
              id="toggle-switch"
              checked={isEnabled}
              onChange={() => handleStatus(!isEnabled)}
              className="toggle-checkbox absolute block md:w-8 w-6 md:h-8 h-6 rounded-full bg-gray-100 border-4 appearance-none cursor-pointer transition-all duration-200 ease-in-out"
            />
            <label
              htmlFor="toggle-switch"
              className={`toggle-label block overflow-hidden md:h-8 h-6 md:!w-16 !w-12 bg-blue-light-900 rounded-full cursor-pointer transition-all duration-200 ease-in-out ${isEnabled ? "bg-blue-light-900" : "bg-gray-300"}`}
            ></label>
          </div>
          <span className="md:text-3xl text-xl font-medium font-playfair text-blue-light-900">Intro</span>
        </div>
      </div>


      {/* Quote content */}
      {(isEnabled) && (
        <div>
          <h2 className="md:text-4xl text-2xl text-center font-medium font-playfair mb-4 relative">
            <RiDoubleQuotesL className="text-blue-light-900 absolute top-2 left-1" />
            <div
              className="border w-full border-dashed bg-[#f8f8f8] text-blue-900 px-6 py-5 border-gray-300 focus:outline-none focus:border-gray-500"
              contentEditable
              suppressContentEditableWarning
              aria-label="quote"
              ref={quoteRef}
              onBlur={handleBlur}
            >
              {quote}
            </div>
            <RiDoubleQuotesR className="text-blue-light-900 absolute top-2 right-1" />
          </h2>

          {/* Button to suggest quote */}
          <div className="w-full mb-4 m-auto text-center">
            <button onClick={generateQuote} className="md:text-2xl text-lg font-playfair border border-gray-300 font-medium px-4 py-2 bg-[#F3EAEACC] text-blue-light-900 shadow-md rounded-lg">
              {quoteRequested ? "Fetching Quote..." : "Suggest Quote"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonalQuote;
