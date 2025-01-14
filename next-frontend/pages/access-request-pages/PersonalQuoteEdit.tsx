import React, { useState, useRef } from "react";
import { RiDoubleQuotesL, RiDoubleQuotesR } from "react-icons/ri";
import axios from "axios";
import { toast } from "react-toastify";
import Image from "next/image";

// Define prop type for setting the quote
interface PersonalQuoteEditProps {
  setQuote: (quote: string) => void;
}

const PersonalQuoteEdit: React.FC<PersonalQuoteEditProps> = ({ setQuote }) => {
  const [isEnabled, setIsEnabled] = useState<boolean>(true);
  const [quoteRequested, setQuoteRequested] = useState<boolean>(false);
  const [quote, setQuoteState] = useState<string>("Share Something special for loved one");

  // Ref for the contentEditable div
  const quoteRef = useRef<HTMLDivElement>(null);

  // API for generating a random quote
  const generateQuote = async () => {
    try {
      setQuoteRequested(true);
      const response = await axios.get("/api/quote");
      if (response.data && response.data.length > 0) {
        const generatedQuote = response.data[0].q;
        setQuoteState(generatedQuote);
        saveQuote(generatedQuote, isEnabled);
        setQuote(generatedQuote);  // Pass the generated quote to parent component
        setQuoteRequested(false);
      } else {
        toast.info("No quote found, please try again.");
        setQuoteRequested(false);
      }
    } catch (error) {
      console.error("Error fetching quote:", error);
      toast.error("An error occurred while fetching the quote. Please try again.");
      setQuoteRequested(false);
    }
  };

  // Function to save the quote to the backend
  const saveQuote = async (updatedQuote: string, isDisabled: boolean) => {
    // Check if the quote is still the placeholder or empty
    if (updatedQuote === "Share your best quote here" || !updatedQuote.trim()) {
      toast.error("Please provide a valid quote before saving.");
      return;
    }

    // After saving, pass it to the parent component
    setQuote(updatedQuote);
  };

  // Trigger save when focus is lost (onBlur)
  const handleBlur = () => {
    if (quoteRef.current) {
      const updatedQuote = quoteRef.current.textContent?.trim() || ""; // Get trimmed text
      setQuoteState(updatedQuote);
      saveQuote(updatedQuote, isEnabled);
    }
  };


  return (
    <div>
      {/* Toggle switch */}
      <div className="flex justify-end mb-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div className="flex items-center gap-2 w-full justify-end md:w-auto md:order-1">
            <div className="text-blue-light-900 font-playfair md:text-xl text-lg border-b-4 border-blue-light-800 font-400">
              Personal Quote
            </div>
            <Image src="/img/dove.svg" alt="Dove" width={50} height={50} />
          </div>
        </div>
      </div>

      {/* Quote content */}
      {isEnabled && (
        <div>
          <h2 className="md:text-2xl text-xl text-center font-medium font-playfair mb-4 relative">
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
            <button
              onClick={generateQuote}
              className="md:text-xl text-lg font-playfair border border-gray-300 font-medium px-4 py-2 bg-[#F3EAEACC] text-blue-light-900 suggest-btn rounded-lg"
            >
              {quoteRequested ? "Fetching Quote..." : "Suggest Quote"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonalQuoteEdit;
