import React, { useRef, useState } from "react";
import TabNavigation from "./TabNavigation";
import { AiOutlineCaretLeft } from "react-icons/ai";

export default function StyledTabs() {
  const tab1Ref = useRef<HTMLDivElement>(null);
  const tab2Ref = useRef<HTMLDivElement>(null);
  const tab3Ref = useRef<HTMLDivElement>(null);
  const tab4Ref = useRef<HTMLDivElement>(null);
  const tab5Ref = useRef<HTMLDivElement>(null);
  const tab6Ref = useRef<HTMLDivElement>(null);
  const tab7Ref = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<number>(0);
  const [isPersonalQuoteVisible] = useState(true);
  const [isObituaryVisible] = useState(true);
  const [isFavouritesVisible] = useState(true);
  const [isGalleryVisible] = useState(true);
  const [isTimelineVisible] = useState(true);
  const [isSocialMediaVisible] = useState(true);
  const tabs = [
    { label: "Personal Quote", ref: tab1Ref },
    { label: "Gallery", ref: tab2Ref },
    { label: "Obituary", ref: tab3Ref },
    { label: "Timeline", ref: tab4Ref },
    { label: "Contributions", ref: tab5Ref },
    { label: "Favourites", ref: tab6Ref },
    { label: "Social Media", ref: tab7Ref },
  ];
  return (
    <div className=" min-h-screen flex flex-col items-center mt-5 pt-10 border-t-4">
      {/* Tab Navigation */}
      <TabNavigation
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      {/* Tab Content */}
      <div className="md:mt-6 mt-0 p-4 md:p-0 w-full max-w-4xl md:space-y-12 sapce-y-6">
        {/* Personal Quote */}
        {isPersonalQuoteVisible && (
          <div ref={tab1Ref}>
            <div className="w-full px-4 md:py-6 py-0">
              <div className="flex items-center justify-between relative">
                {/* Left Icon */}
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  stroke-width="0"
                  viewBox="0 0 24 24"
                  className="text-blue-light-900"
                  height="1.5em"
                  width="30px"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M4.58341 17.3211C3.55316 16.2274 3 15 3 13.0103C3 9.51086 5.45651 6.37366 9.03059 4.82318L9.92328 6.20079C6.58804 8.00539 5.93618 10.346 5.67564 11.822C6.21263 11.5443 6.91558 11.4466 7.60471 11.5105C9.40908 11.6778 10.8312 13.159 10.8312 15C10.8312 16.933 9.26416 18.5 7.33116 18.5C6.2581 18.5 5.23196 18.0095 4.58341 17.3211ZM14.5834 17.3211C13.5532 16.2274 13 15 13 13.0103C13 9.51086 15.4565 6.37366 19.0306 4.82318L19.9233 6.20079C16.588 8.00539 15.9362 10.346 15.6756 11.822C16.2126 11.5443 16.9156 11.4466 17.6047 11.5105C19.4091 11.6778 20.8312 13.159 20.8312 15C20.8312 16.933 19.2642 18.5 17.3312 18.5C16.2581 18.5 15.232 18.0095 14.5834 17.3211Z"></path>
                </svg>
                {/* Content */}
                <div className="text-center text-blue-900 px-6 py-5 md:text-2xl text-xl font-playfair font-medium">
                  The song is ended but the melody lingers on
                </div>
                {/* Right Icon */}
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 24 24"
                  className="text-blue-light-900"
                  height="1.5em"
                  width="30px"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M19.4167 6.67891C20.4469 7.77257 21.0001 9 21.0001 10.9897C21.0001 14.4891 18.5436 17.6263 14.9695 19.1768L14.0768 17.7992C17.4121 15.9946 18.0639 13.6539 18.3245 12.178C17.7875 12.4557 17.0845 12.5533 16.3954 12.4895C14.591 12.3222 13.1689 10.8409 13.1689 9C13.1689 7.067 14.7359 5.5 16.6689 5.5C17.742 5.5 18.7681 5.99045 19.4167 6.67891ZM9.41669 6.67891C10.4469 7.77257 11.0001 9 11.0001 10.9897C11.0001 14.4891 8.54359 17.6263 4.96951 19.1768L4.07682 17.7992C7.41206 15.9946 8.06392 13.6539 8.32447 12.178C7.78747 12.4557 7.08452 12.5533 6.39539 12.4895C4.59102 12.3222 3.16895 10.8409 3.16895 9C3.16895 7.067 4.73595 5.5 6.66895 5.5C7.742 5.5 8.76814 5.99045 9.41669 6.67891Z"></path>
                </svg>
              </div>
            </div>
          </div>
        )}
        {/* Gallery */}
        {isGalleryVisible && (
          <div ref={tab2Ref}>
            <div className="flex justify-between mt-6 md:mt-0">
              <div className="text-blue-light-900 font-playfair md:text-2xl text-xl border-b-4 border-blue-light-800 font-400 inline-block">
                Gallery
              </div>
              <div className="text-blue-light-900 text-lg font-normal font-playfair">
                Share the page?
                <button className="md:text-lg ml-3 text-lg font-playfair border border-gray-300 font-medium px-4 py-1.5 bg-[#F3EAEACC] text-blue-light-900 rounded-lg">
                  Copy link
                </button>
              </div>
            </div>
            <div className="font-playfair text-xl font-medium mt-5">Family</div>
            <div className="grid md:grid-cols-3 grid-cols-2 gap-5 mt-6 relative">
              <img src="img/features-home-3-03.jpg"></img>
              <img src="img/features-home-3-03.jpg"></img>
              <img src="img/features-home-3-03.jpg"></img>
            </div>
            <div className="font-playfair text-xl mt-5 font-medium">
              Friends
            </div>
            <div className="grid md:grid-cols-3 grid-cols-2 gap-5 mt-6 relative">
              <img src="img/features-home-3-03.jpg"></img>
              <img src="img/features-home-3-03.jpg"></img>
              <img src="img/features-home-3-03.jpg"></img>
              <img src="img/features-home-3-03.jpg"></img>
              <img src="img/features-home-3-03.jpg"></img>
              <img src="img/features-home-3-03.jpg"></img>
            </div>
            <div className="font-playfair text-xl mt-5 font-medium">Love</div>
            <div className="grid md:grid-cols-3 grid-cols-2 gap-5 mt-6 relative">
              <img src="img/features-home-3-03.jpg"></img>
              <img src="img/features-home-3-03.jpg"></img>
              <img src="img/features-home-3-03.jpg"></img>
              <img src="img/features-home-3-03.jpg"></img>
              <img src="img/features-home-3-03.jpg"></img>
              <img src="img/features-home-3-03.jpg"></img>
            </div>
            <div className="text-blue-light-900 font-playfair text-lg mt-5">
              Show more...
            </div>
          </div>
        )}
        {/* Obituary */}
        {isObituaryVisible && (
          <div ref={tab3Ref}>
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              {/* Obituary + Dove Icon (Mobile First) */}
              <div className="flex items-center gap-2 w-full justify-end md:w-auto md:order-1">
                <div className="text-blue-light-900 font-playfair md:text-xl text-lg border-b-4 border-blue-light-800 font-400">
                  Obituary
                </div>
                <img src="img/dove.svg" alt="Dove" />
              </div>
              {/* Main Heading */}
              <div className="text-blue-light-900 font-playfair md:text-2xl text-xl font-400 md:mt-0 md:text-left">
                A special memory for a special person
              </div>
            </div>
            <div className="bg-white border-2 border-dashed text-blue-light-900 md:text-xl text-lg md:p-12 p-6 mt-5 md:mt-10">
              <p className="text-center mb-2 font-playfair">
                Patrick Doyle, aged 72, passed away peacefully on September 25,
                2024, in Dublin, Ireland. A devoted husband, father, and
                grandfather, Patrick is survived by his wife Maureen, children
                Fiona, Brendan, and Kevin, and five grandchildren.
              </p>
              <p className="text-center mb-2 font-playfair">
                A dedicated civil engineer for over 40 years, Patrick was
                passionate about his work and made significant contributions to
                many community projects. Outside of his profession, he enjoyed
                hiking, fishing, and traditional Irish music.
              </p>
              <p className="text-center mb-2 font-playfair">
                A Funeral Mass will be held at St. Patrick's Cathedral on
                October 1, 2024, at 11:00 AM, followed by burial at Glasnevin
                Cemetery. In lieu of flowers, donations can be made to the Irish
                Cancer Society.
              </p>
              <p className="text-center mb-2 font-playfair">
                Patrick will be deeply missed by all who knew and loved him. May
                he rest in peace.
              </p>
            </div>
          </div>
        )}
        {/* Timeline */}
        {isTimelineVisible && (
          <div ref={tab4Ref}>
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div className="flex items-center gap-2 mt-5 md:mt-0  w-full justify-end md:w-auto md:order-1">
                <div className="text-blue-light-900 font-playfair md:text-xl text-lg border-b-4 border-blue-light-800 font-400">
                  Timeline
                </div>
                <img src="img/dove.svg" alt="Dove" />
              </div>
              <div className="text-blue-light-900 font-playfair md:text-2xl text-xl font-400 md:mt-0  md:text-left">
                A place to remember Patrick’s milestones
              </div>
            </div>
            <div className="timeline-event font-playfair flex gap-4 relative mt-4">
              <div className="timeline-date flex flex-col gap-1 items-start space-y-1">
                <div className="text-blue-light-900 font-medium md:text-xl text-base">
                  21st Birthday
                </div>
                <div>
                  <div className="p-2 text-center w-16 bg-[#F0F0F0] md:text-lg text-base h-10 text-blue-light-900 rounded-lg font-medium">
                    1
                  </div>
                </div>
                <div>
                  <div className="p-2 w-28 md:text-lg text-base rounded-lg text-center bg-[#F0F0F0] h-10 text-blue-light-900 font-medium">
                    September
                  </div>
                </div>
                <div>
                  <div className="p-2 w-16 bg-[#F0F0F0] md:text-lg text-base text-center h-10 border-gray-300 text-blue-light-900 rounded-lg font-medium">
                    2025
                  </div>
                </div>
              </div>
              <div>
                <div className="border-4 relative bg-white rounded text-blue-light-900 font-medium text-base md:text-xl border-gray-200 w-full p-4">
                  <AiOutlineCaretLeft className="text-gray-200 text-2xl left-[-36px] top-0 h-12 w-12 absolute" />
                  <p>
                    It was a great day. His Dad and I suprised him with a huge
                    party at the local community centre, Patrick was so
                    embarrassed but loved being with his best mate, Phil Smith.
                  </p>
                </div>
                <div className="text-blue-light-900 font-medium md:text-lg text-base flex items-center mt-2 md:mt-4 gap-2">
                  <span className="material-icons-outlined text-blue-light-900">
                    location_on
                  </span>
                  Baldock Community Centre
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Contribution */}
        <div ref={tab5Ref}>Contribution</div>
        {/* Favourites */}
        {isFavouritesVisible && (
          <div ref={tab6Ref}>
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div className="flex items-center gap-2 w-full justify-end md:w-auto md:order-1">
                <div className="text-blue-light-900 font-playfair md:text-xl text-lg border-b-4 border-blue-light-800 font-400">
                  Favourites
                </div>
                <img src="img/dove.svg" alt="Dove" />
              </div>
              <div className="text-blue-light-900 font-playfair md:text-2xl text-xl font-400 md:mt-0  md:text-left">
                A place to remember Patrick’s favourite things
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              <div className="relative">
                <h3 className="text-blue-light-900 font-playfair md:text-lg text-base border-gray-300 bg-[#f8f8f8] font-400  border p-3 mb-2 ">
                  What was Patrick’s favourite song?
                </h3>
                <p className="text-blue-light-900 font-400 font-playfair md:text-lg text-base border-gray-300 bg-[#f8f8f8] border p-3">
                  Patrick was a true Beatles fan, filling our weekends with his
                  heartfelt renditions of Hey Jude.His voice brought warmth and
                  joy, leaving us with memories of his infectious spirit and
                  love for music
                </p>
              </div>
              <div className="relative">
                <h3 className="text-blue-light-900 font-playfair md:text-lg text-base border-gray-300 bg-[#f8f8f8] font-400 border-dashed border p-3 mb-2">
                  Default Title
                </h3>
                <p className="text-blue-light-900 font-400 font-playfair md:text-lg text-base border-gray-300 bg-[#f8f8f8] border p-3">
                  Default Description
                </p>
              </div>
              <div className="relative">
                <h3 className="text-blue-light-900 font-playfair md:text-lg text-base border-gray-300 bg-[#f8f8f8] font-400 border-dashed border p-3 mb-2 ">
                  Default Title
                </h3>
                <p className="text-blue-light-900 font-400 font-playfair md:text-lg text-base border-gray-300 bg-[#f8f8f8] border p-3">
                  Default Description
                </p>
              </div>
            </div>
          </div>
        )}
        {/* Social Media */}
        {isSocialMediaVisible && (
          <div ref={tab7Ref}>
            <div className="text-blue-light-900 font-playfair md:text-2xl text-xl mt-5 md:mt-0 border-b-4 border-blue-light-800 font-400 inline-block">
              Social Media link
            </div>
            <h1 className="md:text-xl relative text-xl flex gap-4 font-medium mb-6 mt-6">
              <span className="border bg-[#f8f8f8] font-playfair w-full md:text-xl text-base text-blue-light-900 p-4 border-gray-300 ">
                This page is a forever tribute to . Please spread the page so
                others can contribute and reminise and reminise and reminiseand
                reminise
              </span>
              <img
                className="absolute right-0 bottom-0 w-[50px]"
                src="img/dove.svg"
              ></img>
            </h1>
            <button className="px-4 py-2.5 add-button text-white font-playfair mb-32">
              Copy Link
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
