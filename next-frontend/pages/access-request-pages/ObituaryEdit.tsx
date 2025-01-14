import React, { useState, useRef, useCallback } from "react";
import { toast } from "react-toastify";
import Image from "next/image";
import axios from "axios";

interface ObituaryEditProps {
  setObituary: React.Dispatch<React.SetStateAction<string>>; // Accept setObituary as a prop
}

const ObituaryEdit: React.FC<ObituaryEditProps> = ({ setObituary }) => {
  const [isObituaryEnabled, setIsObituaryEnabled] = useState(true);
  const [tagline, setTagline] = useState<string>("Enter a memorable tagline here.");
  const [content, setContent] = useState<string>("Add a heartfelt message about your loved one.");
  const taglineRef = useRef<HTMLDivElement>(null);

  // Handle tagline blur (when focus is lost)
  const handleTaglineBlur = () => {
    const value = taglineRef.current?.textContent || "";
    setTagline(value);
    setObituary(value); // Pass updated tagline to parent
  };

  // Handle content blur (when focus is lost)
  const handleContentBlur = () => {
    setObituary(content);
  };

  // Handle content change (for textarea)
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  return (
    <div>
      <div className="md:flex gap-4 justify-between">
        <div className="flex md:order-2 order-1 justify-end mb-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            {/* Obituary + Dove Icon (Mobile First) */}
            <div className="flex items-center gap-2 w-full justify-end md:w-auto md:order-1">
              <div className="text-blue-light-900 font-playfair md:text-xl text-lg border-b-4 border-blue-light-800 font-400">
                Obituary
              </div>
              <Image src="/img/dove.svg" alt="Dove" width={50} height={50} />
            </div>
          </div>
        </div>

        {/* Tagline Input - Editable */}
        <h1 className="md:text-xl md:order-1 order-2 text-xl flex gap-4 font-playfair font-medium mb-6 mt-4">
          <span
            className={`border border-dashed w-full bg-[#f8f8f8] text-blue-light-900 p-3 border-gray-300 focus:outline-none focus:border-gray-500 ${isObituaryEnabled ? "" : "text-gray-500 cursor-not-allowed"
              }`}
            aria-label="Obituary Name"
          >
            {tagline}
          </span>
        </h1>
      </div>

      {/* Content Textarea */}
      {isObituaryEnabled && (
        <textarea
          rows={5}
          className="text-gray-600 font-playfair text-lg w-full mb-4 border border-gray-300 border-dashed p-2 focus:outline-none focus:border-gray-500"
          value={content}
          onChange={handleContentChange}
          onBlur={handleContentBlur}
        />
      )}
    </div>
  );
};

export default ObituaryEdit;
