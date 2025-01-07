// StyledTabs.tsx
import React, { useRef, useState } from "react";
import TabNavigation from "../components/TabNavigation";
import PersonalQuote from "../components/PersonalQuote";
import Gallery from "../components/Gallery";
import Obituary from "../components/obituary";
import Timeline from "../components/Timeline";
import SocialMedia from "../components/SocialMedia"; 
import Favourites from "../components/favourites"; 
import Contributions from "../components/contributions"; 

export default function StyledTabs() {
  const tab1Ref = useRef<HTMLDivElement>(null);
  const tab2Ref = useRef<HTMLDivElement>(null);
  const tab3Ref = useRef<HTMLDivElement>(null);
  const tab4Ref = useRef<HTMLDivElement>(null);
  const tab5Ref = useRef<HTMLDivElement>(null);
  const tab6Ref = useRef<HTMLDivElement>(null);
  const tab7Ref = useRef<HTMLDivElement>(null);

  const [activeTab, setActiveTab] = useState<number>(0);

  const tabs = [
    { label: "Personal Quote", ref: tab1Ref },
    { label: "Gallery", ref: tab2Ref },
    { label: "Obituary", ref: tab3Ref },
    { label: "Timeline", ref: tab4Ref },
    { label: "Social Media", ref: tab5Ref },
    { label: "Favourites", ref: tab6Ref },
    { label: "Contributions", ref: tab7Ref },
  ];

  return (
    <div className=" min-h-screen flex flex-col items-center mt-5 pt-10 border-t-4">
      {/* Tab Navigation */}
      <TabNavigation tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Tab Content */}
      <div className="mt-6 p-4 md:p-0 w-full max-w-4xl space-y-12">
        {/* Personal Quote */}
        <div ref={tab1Ref}>
          <PersonalQuote />
        </div>

        {/* Gallery */}
        <div ref={tab2Ref}>
          <Gallery />
        </div>

        {/* Obituary */}
        <div ref={tab3Ref}>
          <Obituary />
        </div>

        {/* Timeline */}
        <div ref={tab4Ref}>
          <Timeline />
        </div>

        {/* Social Media */}
        <div ref={tab5Ref}>
          <SocialMedia />
        </div>

          {/* Favourites */}
          <div ref={tab6Ref}>
          <Favourites />
        </div>

         {/* Contribution */}
         <div ref={tab6Ref}>
          <Contributions />
        </div>

        {/* Other Tabs */}
        {/* {[tab6Ref].map((ref, index) => (
          <div key={index} ref={ref} className="p-6 bg-white rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">{tabs[index + 5].label}</h2>
            <p className="text-gray-600">
              This is the content displayed for the {tabs[index + 5].label} tab. Clicking on this tab will scroll here.
            </p>
          </div>
        ))} */}
      </div>
    </div>
  );
}
