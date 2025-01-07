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
      const offset = 80;
      const elementPosition = tabRef.current.getBoundingClientRect().top + window.scrollY;
      const finalPosition = elementPosition - offset;

      window.scrollTo({
        top: finalPosition,
        behavior: "smooth",
      });

      setActiveTab(tabIndex);
    }
  };

  return (
    <div className="tabs-wrapper md:justify-center sticky top-0 md:px-0 z-10 bg-gray-50">
      {tabs.map((tab, index) => (
        <button
          key={index}
          className={`tab-button px-6 py-2.5 border md:w-auto md:text-2xl text-xl font-playfair font-medium transition-all 
            ${activeTab === index ? "bg-blue-light text-white" : "bg-[#F5F5F5] text-blue-light-900"}
            ${index === 0 ? "rounded-l" : ""}
            ${index === tabs.length - 1 ? "rounded-r" : ""}`}
          onClick={() => scrollToTab(tab.ref, index)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default TabNavigation;
