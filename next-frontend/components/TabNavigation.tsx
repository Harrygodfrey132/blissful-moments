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
      tabRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveTab(tabIndex); // Update active tab
    }
  };

  return (
    <div className="flex sticky top-0 z-10 bg-gray-50">
      {tabs.map((tab, index) => (
        <button
          key={index}
          className={`px-6 py-2 border text-lg font-medium transition-all ${
            activeTab === index + 1 ? "bg-blue-light-900 text-white" : "bg-gray-100 text-blue-light-900"
          }`}
          onClick={() => scrollToTab(tab.ref, index + 1)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default TabNavigation;
