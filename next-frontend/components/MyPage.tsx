import React, { useState } from "react";
import TabComponent from "../components/TabComponent";
import TopBanner from "../components/TopBanner";
import PersonalInfo from "../components/PersonalInfo";
export default function MyPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <TopBanner />
      <PersonalInfo />
      <TabComponent />
    </div>
  );
}
