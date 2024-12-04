import React, { useRef, useState } from "react";
import { RiDoubleQuotesL } from "react-icons/ri"
import { RiDoubleQuotesR } from "react-icons/ri";

export default function StyledTabs() {
    // switch button
    const [isEnabled, setIsEnabled] = useState(true);
    // Refs for tab content
    const tab1Ref = useRef<HTMLDivElement>(null);
    const tab2Ref = useRef<HTMLDivElement>(null);
    const tab3Ref = useRef<HTMLDivElement>(null);
    const tab4Ref = useRef<HTMLDivElement>(null);
    const tab5Ref = useRef<HTMLDivElement>(null);
    const tab6Ref = useRef<HTMLDivElement>(null);

    // State for active tab
    const [activeTab, setActiveTab] = useState<number>(1);

    const scrollToTab = (tabRef: React.RefObject<HTMLDivElement>, tabIndex: number) => {
        if (tabRef.current) {
            tabRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
            setActiveTab(tabIndex); // Update active tab
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col items-center mt-5 pt-10 border-t-4">
            {/* Tabs Navigation */}
            <div className="flex sticky top-0 z-10">
                {[
                    { label: "Personal Quote", ref: tab1Ref },
                    { label: "Gallery", ref: tab2Ref },
                    { label: "Obituary", ref: tab3Ref },
                    { label: "Timeline", ref: tab4Ref },
                    { label: "Favourites", ref: tab5Ref },
                    { label: "Contributions", ref: tab6Ref },
                ].map((tab, index) => (
                    <button
                        key={index}
                        className={`px-6 py-2 border text-lg font-medium transition-all ${activeTab === index + 1
                                ? "bg-blue-light-900 text-white"
                                : "bg-gray-100 border text-blue-light-900"
                            }`}
                        onClick={() => scrollToTab(tab.ref, index + 1)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="mt-6 w-full max-w-3xl space-y-12">
                <div ref={tab1Ref} className="p-6">
                    <div className="flex justify-end mb-4">
                        <div className="flex items-center space-x-4">

                            {/* Custom Slide Switch */}
                            <div className="relative inline-block w-14 align-middle select-none transition-all duration-200 ease-in">
                                <input
                                    type="checkbox"
                                    id="toggle-switch"
                                    checked={isEnabled}
                                    onChange={() => setIsEnabled(!isEnabled)}
                                    className="toggle-checkbox absolute block w-8 h-8 rounded-full bg-gray-100 border-4 appearance-none cursor-pointer transition-all duration-200 ease-in-out"
                                />
                                <label
                                    htmlFor="toggle-switch"
                                    className={`toggle-label block overflow-hidden h-8 bg-blue-light-900 rounded-full cursor-pointer transition-all duration-200 ease-in-out 
                ${isEnabled ? 'bg-gray-50' : 'bg-gray-300'}`}  // Background color changes based on state
                                ></label>
                            </div>
                            <span className="text-2xl text-blue-light-900">Intro</span>
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
                                onInput={(e) => console.log("First name:", e.currentTarget.textContent)}
                            >
                                The song is ended but the melody lingers on
                            </div>
                            <RiDoubleQuotesR className="text-blue-light-900 absolute top-2 right-1" />
                        </h2>
                        
                        <div className="flex justify-center mt-5">
                        <button className="text-base font-medium px-4 py-2 bg-[#F3EAEACC] text-blue-light-900 shadow-md rounded">Suggest Quote</button>
                        </div>
                        </div>
                    )}
                </div>

                <div ref={tab2Ref} className="p-6 bg-white rounded-lg shadow">
                    <h2 className="text-2xl font-bold mb-4">Gallery</h2>
                    <p className="text-gray-600">
                        This is the content displayed for the Gallery tab. Clicking on this tab will scroll here.
                    </p>
                </div>
                <div ref={tab3Ref} className="p-6 bg-white rounded-lg shadow">
                    <h2 className="text-2xl font-bold mb-4">Obituary</h2>
                    <p className="text-gray-600">
                        This is the content displayed for the Obituary tab. Clicking on this tab will scroll here.
                    </p>
                </div>
                <div ref={tab4Ref} className="p-6 bg-white rounded-lg shadow">
                    <h2 className="text-2xl font-bold mb-4">Timeline</h2>
                    <p className="text-gray-600">
                        This is the content displayed for the Timeline tab. Clicking on this tab will scroll here.
                    </p>
                </div>
                <div ref={tab5Ref} className="p-6 bg-white rounded-lg shadow">
                    <h2 className="text-2xl font-bold mb-4">Favourites</h2>
                    <p className="text-gray-600">
                        This is the content displayed for the Favourites tab. Clicking on this tab will scroll here.
                    </p>
                </div>
                <div ref={tab6Ref} className="p-6 bg-white rounded-lg shadow">
                    <h2 className="text-2xl font-bold mb-4">Contributions</h2>
                    <p className="text-gray-600">
                        This is the content displayed for the Contributions tab. Clicking on this tab will scroll here.
                    </p>
                </div>
            </div>
        </div>
    );
}
