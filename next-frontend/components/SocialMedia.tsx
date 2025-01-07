import React, { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../utils/api";
import { usePageContext } from "../context/PageContext";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

const SocialMedia: React.FC = () => {
  const { pageData, setPageData } = usePageContext();
  const { data: session } = useSession();
  const token = session?.user?.accessToken;

  const [isSocialMediaEnabled, setIsSocialMediaEnabled] = useState(
    pageData?.social_media_data?.status == 1
  );
  const [content, setContent] = useState(
    pageData?.social_media_data?.content ||
    "This page is a forever tribute to . Please spread the page so others can contribute and reminisce"
  );

  useEffect(() => {
    if (pageData?.social_media_data) {
      setIsSocialMediaEnabled(pageData.social_media_data.status == 1);
      setContent(pageData.social_media_data.content);
    }
  }, [pageData]);

  const handleToggleChange = async () => {
    const newStatus = isSocialMediaEnabled ? 0 : 1;
    setIsSocialMediaEnabled(newStatus === 1);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}${API.saveSocialMediaData}`,
        {
          status: newStatus,
          content, // Use the current state value
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setPageData(response.data.page_data);
        toast.success("Social media status updated!");
      }
    } catch (error) {
      toast.error("Failed to update status.");
    }
  };

  const handleContentBlur = async (event: React.FocusEvent<HTMLSpanElement>) => {
    const updatedContent = event.target.textContent || ""; // Get the latest content from the element
    setContent(updatedContent); // Update state

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}${API.saveSocialMediaData}`,
        {
          status: isSocialMediaEnabled ? 1 : 0,
          content: updatedContent, // Send updated content
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setPageData(response.data.page_data);
        toast.success("Content saved!");
      }
    } catch (error) {
      toast.error("Failed to save content.");
    }
  };

  const handleCopyLink = async () => {
    if (!pageData?.slug) {
      toast.error("Page slug not found!");
      return;
    }

    try {
      // Use a fallback for browsers that don't support Clipboard API
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(pageData.slug);
      } else {
        // Fallback for older browsers
        const textArea = document.createElement("textarea");
        textArea.value = pageData.slug;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }

      toast.success("Page link copied!");
    } catch (error) {
      console.error("Failed to copy link:", error); // Log error details
      toast.error("Failed to copy link.");
    }
  };



  return (
    <div>
      <div className="flex justify-end mb-4">
        <div className="flex items-center md:gap-2 md:space-x-4 space-x-2">
          <div className="relative inline-block w-12 align-middle select-none transition-all duration-200 ease-in">
            <input
              type="checkbox"
              id="social-media-toggle"
              checked={isSocialMediaEnabled}
              onChange={handleToggleChange}
              className="toggle-checkbox absolute block md:w-8 w-6 md:h-8 h-6 rounded-full bg-gray-100 border-4 appearance-none cursor-pointer transition-all duration-200 ease-in-out"
            />
            <label
              htmlFor="social-media-toggle"
              className={`toggle-label block overflow-hidden md:h-8 h-6 md:!w-16 !w-12 bg-blue-light-900 rounded-full cursor-pointer transition-all duration-200 ease-in-out ${isSocialMediaEnabled ? "bg-blue-light-900" : "bg-gray-300"
                }`}
            />
          </div>
          <span className="md:text-3xl text-xl font-playfair font-medium text-blue-light-900">
            Social Media Link
          </span>
        </div>
      </div>

      {isSocialMediaEnabled && (
        <h1 className="md:text-2xl text-xl flex gap-4 font-medium mb-6 mt-8">
          <span
            className={`border border-dashed bg-[#f8f8f8] font-playfair w-full text-blue-light-900 p-3 border-gray-300 focus:outline-none focus:border-gray-500 ${isSocialMediaEnabled ? "" : "text-gray-500 cursor-not-allowed"
              }`}
            contentEditable={isSocialMediaEnabled}
            suppressContentEditableWarning
            aria-label="Editable Content"
            onBlur={handleContentBlur} // Update on blur
          >
            {content}
          </span>
        </h1>
      )}

      <button
        onClick={handleCopyLink}
        className="px-4 py-2.5 add-button text-white font-playfair mb-32"
      >
        Copy Link
      </button>
    </div>
  );
};

export default SocialMedia;
