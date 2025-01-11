import React from "react";
import TabComponentView from "./TabComponentView";
import { GoDotFill } from "react-icons/go";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = {
    weekday: "short",
    day: "2-digit",
    month: "long",
    year: "numeric",
  };

  // Use the 'en-US' locale and format the date
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);

  // The result from Intl.DateTimeFormat will give us a formatted string like: "Mon, 07 January 2025"
  const [weekday, day, month, year] = formattedDate.split(" ");

  return { weekday, day, month, year };
};

const MyPageView = ({ pageData }) => {
  const birthDate = pageData.date_of_birth
    ? formatDate(pageData.date_of_birth)
    : { weekday: "N/A", day: "N/A", month: "N/A", year: "N/A" };
  const deathDate = pageData.death_date
    ? formatDate(pageData.death_date)
    : { weekday: "N/A", day: "N/A", month: "N/A", year: "N/A" };
  return (
    <div>
      {/* Top Banner */}
      <header
        className="relative h-64 bg-cover bg-center"
        style={{
          backgroundImage: pageData.background_image
            ? `url(${pageData.background_image})`
            : "url('/img/top-bg.jpg')",
        }}
      ></header>

      {/* Personal Info */}
      <section className="flex flex-col md:flex-row px-4 md:px-20 personal-info">
        <div className="mt-[-50px] mx-auto md:mx-0 profile-thumb">
          <div className="relative bg-[#EAEAEA] p-2 w-[330px] h-[300px]">
            <img
              src={pageData.profile_picture || "/img/dummy.png"}
              alt="Profile"
              className="w-full h-[285px] object-cover"
            />
          </div>
        </div>
        <div className="flex-1">
          <div className="space-y-4 md:p-4 p-0">
            <h1 className="text-xl md:text-3xl font-playfair justify-center md:justify-start flex flex-wrap gap-2 font-medium mb-4 md:mt-0 mt-5">
              <div className="border bg-[#f8f8f8] text-blue-light-900 p-4 border-gray-300">
                {pageData.first_name}
              </div>
              <div className="border bg-[#f8f8f8] text-blue-light-900 p-4 border-gray-300">
                {pageData.middle_name}
              </div>
              <div className="border bg-[#f8f8f8] text-blue-light-900 p-4 border-gray-300">
                {pageData.last_name}
              </div>
            </h1>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start items-center">
              {/* Date of Birth */}
              <div className="flex gap-2">
                <div className="p-2 border bg-[#f8f8f8] text-center md:text-left font-playfair !leading-8 text-lg h-12 border-gray-300 text-blue-light-900 font-medium w-20">
                  {birthDate.month}
                </div>
                <div className="p-2 border bg-[#f8f8f8] text-center md:text-left font-playfair !leading-8 text-lg h-12 border-gray-300 text-blue-light-900 font-medium w-[121px]">
                  {birthDate.day}
                </div>
                <div className="p-2 border bg-[#f8f8f8] text-center md:text-left font-playfair !leading-8 text-lg h-12 border-gray-300 text-blue-light-900 font-medium w-20">
                  {birthDate.year}
                </div>
              </div>

              <div className="flex items-center">
                <GoDotFill className="text-blue-light-900" />
              </div>

              {/* Death Date */}
              <div className="flex gap-2">
                <div className="p-2 border bg-[#f8f8f8] text-center md:text-left font-playfair !leading-8 text-lg h-12 border-gray-300 text-blue-light-900 font-medium w-20">
                  {deathDate.month}
                </div>
                <div className="p-2 border bg-[#f8f8f8] text-center md:text-left font-playfair !leading-8 text-lg h-12 border-gray-300 text-blue-light-900 font-medium w-[121px]">
                  {deathDate.day}
                </div>
                <div className="p-2 border bg-[#f8f8f8] text-center md:text-left font-playfair !leading-8 text-lg h-12 border-gray-300 text-blue-light-900 font-medium w-20">
                  {deathDate.year}
                </div>
              </div>
            </div>
            <div className="flex items-center relative">
              <span className="material-icons-outlined absolute left-4 text-blue-light-900">
                location_on
              </span>
              <div className="border p-2.5 text-lg md:w-[77.5%] w-full border-gray-300 bg-[#f8f8f8] text-blue-light-900 pl-12">
                {pageData.address}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tab Component */}
      <TabComponentView pageData={pageData} />
    </div>
  );
};

export default MyPageView;
