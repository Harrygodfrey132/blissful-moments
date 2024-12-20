import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
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
    const { pageData } = usePageContext();

    // Refs for contentEditable elements
    const taglineRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (pageData?.obituaries) {
            setTagline(pageData?.obituaries?.tagline || "Enter a memorable tagline here.");
            setContent(pageData?.obituaries?.content || "Add a heartfelt message about your loved one.");
        }
    }, [pageData]);

    // Function to handle the API request
    const handleSave = async (field: string, value: string) => {
        try {
            const data = { [field]: value };

            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}${API.saveObituary}`,
                data,
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
    };

    // Handler for saving the editable fields
    const handleTaglineBlur = () => {
        if (taglineRef.current) {
            const value = taglineRef.current.textContent || "";
            setTagline(value);
            handleSave("tagline", value);
        }
    };

    const handleContentBlur = () => {
        if (contentRef.current) {
            const value = contentRef.current.textContent || "";
            setContent(value);
            handleSave("content", value);
        }
    };

    return (
        <div>
            <div className="flex gap-4 justify-between">
                <h1 className="text-3xl flex gap-4 font-playfair font-medium mb-6 mt-4">
                    <span
                        className={`border border-dashed bg-[#f8f8f8]  text-blue-light-900 p-3 border-gray-300 focus:outline-none focus:border-gray-500 ${isObituaryEnabled ? "" : "text-gray-500 cursor-not-allowed"}`}
                        contentEditable={isObituaryEnabled}
                        suppressContentEditableWarning
                        aria-label="Obituary Name"
                        ref={taglineRef}
                        onBlur={handleTaglineBlur}
                    >
                        {tagline}
                    </span>
                </h1>

                {/* Toggle Switch */}
                <div className="flex justify-end mb-4">
                    <div className="flex items-center gap-2 space-x-4">
                        <div className="relative inline-block w-12 font-playfair align-middle select-none transition-all duration-200 ease-in">
                            <input
                                type="checkbox"
                                id="toggle-obituary"
                                checked={isObituaryEnabled}
                                onChange={() => setIsObituaryEnabled(!isObituaryEnabled)}
                                className="toggle-checkbox absolute block w-8 h-8 rounded-full bg-gray-100 border-4 appearance-none cursor-pointer transition-all duration-200 ease-in-out"
                            />
                            <label
                                htmlFor="toggle-obituary"
                                className={`toggle-label block overflow-hidden h-8 !w-16 rounded-full cursor-pointer transition-all duration-200 ease-in-out ${isObituaryEnabled ? "bg-blue-light-900" : "bg-gray-300"}`}
                            >
                            </label>
                        </div>
                        <span className="text-3xl font-playfair font-medium text-blue-light-900">Obituary</span>
                    </div>
                </div>
            </div>

            {/* Content (Only visible when enabled) */}
            {isObituaryEnabled && (
                <>
                    {/* Editable Description */}

                    <textarea rows={10} className="text-gray-600 font-playfair text-lg w-full mb-4 border border-gray-300 border-dashed p-2 focus:outline-none focus:border-gray-500"> </textarea>
                    {/* <p
                        className="text-gray-600 mb-4 border border-gray-300 border-dashed p-2 focus:outline-none focus:border-gray-500"
                        contentEditable
                        suppressContentEditableWarning
                        ref={contentRef}
                        onBlur={handleContentBlur}
                    >
                        {content}
                    </p> */}
                </>
            )}
        </div>
    );
};

export default Obituary;
