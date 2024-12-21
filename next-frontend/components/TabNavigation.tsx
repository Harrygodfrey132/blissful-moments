import React from "react";

interface Tab {
  label: string;
  ref: React.RefObject<HTMLDivElement>;
}

interface TabNavigationProps {
  tabs: Tab[];
  activeTab: number;
  setActiveTab: (tabIndex: number) => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ tabs, activeTab, setActiveTab }) => {
  const scrollToTab = (tabRef: React.RefObject<HTMLDivElement>, tabIndex: number) => {
    if (tabRef.current) {
      tabRef.current.scrollIntoView({
        behavior: "smooth",
        inline: "center",  // This will ensure the tab is always centered
        block: "nearest", // Prevent unnecessary scrolling vertically
      });
      setActiveTab(tabIndex); // Update active tab
    }
  };

  return (
    <div className="tabs-wrapper md:justify-center sticky top-0  md:px-0  z-10 bg-gray-50 sticky">
      {tabs.map((tab, index) => (
        <button
          key={index}
          className={`tab-button px-6 py-2 border md:w-auto md:text-2xl text-xl font-playfair font-medium transition-all ${activeTab === index ? "bg-blue-light-900 text-white" : "bg-[#F5F5F5] text-blue-light-900"}`}
          onClick={() => scrollToTab(tab.ref, index)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default TabNavigation;
