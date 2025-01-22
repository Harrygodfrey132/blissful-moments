import axios from "axios";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { API } from "../utils/api";
import { useSession } from "next-auth/react";
import { usePageContext } from "../context/PageContext";
import { toast } from "react-toastify";

const Obituary = () => {
  const [isObituaryEnabled, setIsObituaryEnabled] = useState(true);
  const [tagline, setTagline] = useState<string>("Enter a memorable tagline here.");
  const [content, setContent] = useState<string>("Add a heartfelt message about your loved one.");
  const { data: session } = useSession();
  const token = session?.user?.accessToken;
  const { pageData, setPageData } = usePageContext();
  const taglineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (pageData?.obituaries) {
      setTagline(pageData.obituaries?.tagline || "Enter a memorable tagline here.");
      setContent(pageData.obituaries?.content || "Add a heartfelt message about your loved one.");
      setIsObituaryEnabled(!!pageData.obituaries?.status);
    }
  }, [pageData]);

  const handleSave = useCallback(async (field: string, value: string) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}${API.saveObituary}`,
        { [field]: value },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status !== 200) {
        toast.error(`Error saving ${field}`);
      }
    } catch (error) {
      toast.error("Error sending request");
    }
  }, [token]);

  const handleTaglineBlur = () => {
    const value = taglineRef.current?.textContent || "";
    setTagline(value);
    handleSave("tagline", value);
  };

  const handleContentBlur = () => {
    handleSave("content", content);
  };

  const handleStatus = useCallback(async (status: boolean) => {
    setIsObituaryEnabled(status);
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}${API.updateObituaryStatus}`,
        {
          obituary_id: pageData?.obituaries?.id,
          status: status,
        },
        {
          headers: {
            Authorization: `Bearer ${session?.user?.accessToken}`,
          },
        }
      );
      if (response.status === 200) {
        setPageData(response.data.page_data);
      }
    } catch (error) {
      toast.error("Error updating obituary status");
    }
  }, [pageData, session?.user?.accessToken, setPageData]);

  return (
    <div>
      <div className="md:flex gap-4 justify-between">
        <div className="flex md:order-2 order-1 justify-end mb-4">
          <div className="flex items-center md:gap-8 gap-3">
            <div className="relative inline-block w-12 font-playfair align-middle select-none transition-all duration-200 ease-in">
              <input
                type="checkbox"
                id="toggle-obituary"
                checked={isObituaryEnabled}
                onChange={() => handleStatus(!isObituaryEnabled)}
                className="toggle-checkbox absolute block  md:w-8 md:h-8 w-6 h-6 rounded-full bg-gray-100 border-4 appearance-none cursor-pointer transition-all duration-200 ease-in-out"
              />
              <label
                htmlFor="toggle-obituary"
                className={`toggle-label block overflow-hidden md:h-8 h-6 md:!w-14 !w-12 rounded-full cursor-pointer transition-all duration-200 ease-in-out ${isObituaryEnabled ? "bg-blue-light-900" : "bg-gray-300"
                  }`}
              ></label>
            </div>
            <span className="md:text-3xl text-xl font-playfair font-medium text-blue-light-900">
              Obituary
            </span>
          </div>
        </div>

        <h1 className="md:text-4xl md:order-1 order-2 text-3xl flex gap-4 font-playfair font-medium mb-6 mt-4">
          <span
            className={`border border-dashed w-full bg-[#f8f8f8] text-blue-light-900 p-4 border-gray-300 focus:outline-none focus:border-gray-500 ${isObituaryEnabled ? "" : "text-gray-500 cursor-not-allowed"
              }`}
            contentEditable={isObituaryEnabled}
            suppressContentEditableWarning
            aria-label="Obituary Name"
            ref={taglineRef}
            onBlur={handleTaglineBlur}
          >
            {tagline}
          </span> 
        </h1>
      </div>

      {isObituaryEnabled && (
        <textarea
          rows={5}
          className="text-blue-light-900 font-playfair text-xl w-full mb-4 border border-gray-300 border-dashed p-2 focus:outline-none focus:border-gray-500"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onBlur={handleContentBlur}
        />
      )}
    </div>
  );
};

export default Obituary;
