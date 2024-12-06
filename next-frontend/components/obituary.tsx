import React, { useState } from "react";

const Obituary = () => {
    const [isObituaryEnabled, setIsObituaryEnabled] = useState(true);

    return (
        <div>
            <div className="flex gap-4 justify-between">
                <h1 className="text-2xl flex gap-4 font-medium mb-6 mt-4">
                    <span
                        className={`border border-dashed text-blue-light-900 p-3 border-gray-300 focus:outline-none focus:border-gray-500 ${isObituaryEnabled ? "" : "text-gray-500 cursor-not-allowed"
                            }`}
                        contentEditable={isObituaryEnabled} // Disable contentEditable when obituary is disabled
                        suppressContentEditableWarning
                        aria-label="Gallery Name"
                        onInput={(e) => console.log("Gallery name:", e.currentTarget.textContent)}
                    >
                        A special memory for a special person
                    </span>
                </h1>
                {/* Toggle Switch */}
                <div className="flex justify-end mb-4">
                    <div className="flex items-center space-x-4">
                        <div className="relative inline-block w-12 align-middle select-none transition-all duration-200 ease-in">
                            <input
                                type="checkbox"
                                id="toggle-obituary"
                                checked={isObituaryEnabled}
                                onChange={() => setIsObituaryEnabled(!isObituaryEnabled)}
                                className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-gray-100 border-4 appearance-none cursor-pointer transition-all duration-200 ease-in-out"
                            />
                            <label
                                htmlFor="toggle-obituary"
                                className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer transition-all duration-200 ease-in-out 
                ${isObituaryEnabled ? "bg-blue-light-900" : "bg-gray-300"}`}
                            ></label>
                        </div>
                        <span className="text-xl font-semibold text-blue-light-900">Obituary</span>
                    </div>
                </div>
            </div>

            {/* Content (Only visible when enabled) */}
            {isObituaryEnabled && (
                <>

                    {/* Editable Description */}
                    <p
                        className="text-gray-600 mb-4 border border-gray-300 border-dashed p-2 focus:outline-none focus:border-gray-500"
                        contentEditable
                        suppressContentEditableWarning
                        onInput={(e) => (e.currentTarget.textContent || "")}
                    >
                        "Remembering the life and legacy of our loved one. Share heartfelt memories, stories, and moments to celebrate their journey."
                    </p>
                </>
            )}
        </div>
    );
};

export default Obituary;
