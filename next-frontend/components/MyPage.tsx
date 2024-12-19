import React from "react";
import TabComponent from "../components/TabComponent";
import TopBanner from "../components/TopBanner";
import PersonalInfo from "../components/PersonalInfo";
import FloatingSettingsButton from "../components/FloatingSettingsButton";

export default function MyPage() {
  return (
    <div className="bg-[#fafafa] min-h-screen relative">
      {/* Top Banner */}
      <TopBanner />
      
      {/* Personal Info */}
      <PersonalInfo />
      
      {/* Tab Component */}
      <TabComponent />

      {/* Floating Settings Button */}
      <FloatingSettingsButton />
    </div>
  );
}
