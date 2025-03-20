import React, { useRef, useState } from "react";
import TabNavigation from "./TabNavigation";
import { AiOutlineCaretLeft } from "react-icons/ai";
import Image from "next/image";
import { format } from "date-fns";
import { toast } from "react-toastify";
import ContributionView from "./ContributionView";
import GalleryImageUploadView from "./GalleryImageUploadView";

export default function StyledTabs({ pageData }) {
  const [isPageLinkCopied, setIsPageLinkCopied] = useState(false);
  const formateData = (eventDate) => {
    const formattedDate = new Date(eventDate);
    const day = format(formattedDate, "d"); // Day of the month
    const month = format(formattedDate, "MMMM"); // Month (1-12)
    const year = format(formattedDate, "yyyy"); // Year (yyyy)
    return { day, month, year };
  };

  const tab1Ref = useRef(null);
  const tab2Ref = useRef(null);
  const tab3Ref = useRef(null);
  const tab4Ref = useRef(null);
  const tab5Ref = useRef(null);
  const tab6Ref = useRef(null);
  const tab7Ref = useRef(null);
  const [activeTab, setActiveTab] = useState(0);
  const [isPersonalQuoteVisible] = useState(
    pageData.personal_quote?.status == 1
  );
  const [isObituaryVisible] = useState(pageData.obituaries?.status == 1);
  const [isFavouritesVisible] = useState(pageData.favourites?.status == 1);
  const [isGalleryVisible] = useState(pageData.gallery?.status == 1);
  const [isTimelineVisible] = useState(pageData.timeline?.status == 1);
  const [isContributionVisible] = useState(pageData.contributions?.status == 1);
  const [isSocialMediaVisible] = useState(
    pageData.social_media_data?.status == 1
  );

  const tabs = [
    { label: "Personal Quote", ref: tab1Ref, visible: isPersonalQuoteVisible },
    { label: "Gallery", ref: tab2Ref, visible: isGalleryVisible },
    { label: "Obituary", ref: tab3Ref, visible: isObituaryVisible },
    { label: "Timeline", ref: tab4Ref, visible: isTimelineVisible },
    { label: "Contributions", ref: tab5Ref, visible: isContributionVisible },
    { label: "Favourites", ref: tab6Ref, visible: isFavouritesVisible },
    { label: "Social Media", ref: tab7Ref, visible: isSocialMediaVisible },
  ];

  const visibleTabs = tabs.filter((tab) => tab.visible);

  const handleCopyLink = async () => {
    if (!pageData?.slug) {
      toast.error("Page slug not found!");
      return;
    }

    try {
      // Use a fallback for browsers that don't support Clipboard API
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(
          `${process.env.NEXT_PUBLIC_BASE_URL}/memory/${pageData.slug}`
        );
      } else {
        // Fallback for older browsers
        const textArea = document.createElement("textarea");
        textArea.value = `${process.env.NEXT_PUBLIC_BASE_URL}/memory/${pageData.slug}`;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
      setIsPageLinkCopied(true);
      setTimeout(() => {
        setIsPageLinkCopied(false);
      }, 2000);
    } catch (error) {
      toast.error("Failed to copy link.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center mt-5 md:pt-10 pt-5 border-t-4">
      {/* Tab Navigation */}
      <TabNavigation
        tabs={visibleTabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      {/* Tab Content */}
      <div className="md:text-4xl text-3xl mx-auto  p-4 space-y-12 w-full max-w-6xl text-center font-medium font-playfair mb-5 relative">
        {/* Personal Quote */}
        {isPersonalQuoteVisible && (
          <div ref={tab1Ref}>
            <div className="mx-auto !max-w-4xl px-4 md:py-6 py-0">
              <div className="flex items-center justify-between relative">
                {/* Left Icon */}
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 24 24"
                  className="text-blue-light-900 absolute top-2 left-1"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M4.58341 17.3211C3.55316 16.2274 3 15 3 13.0103C3 9.51086 5.45651 6.37366 9.03059 4.82318L9.92328 6.20079C6.58804 8.00539 5.93618 10.346 5.67564 11.822C6.21263 11.5443 6.91558 11.4466 7.60471 11.5105C9.40908 11.6778 10.8312 13.159 10.8312 15C10.8312 16.933 9.26416 18.5 7.33116 18.5C6.2581 18.5 5.23196 18.0095 4.58341 17.3211ZM14.5834 17.3211C13.5532 16.2274 13 15 13 13.0103C13 9.51086 15.4565 6.37366 19.0306 4.82318L19.9233 6.20079C16.588 8.00539 15.9362 10.346 15.6756 11.822C16.2126 11.5443 16.9156 11.4466 17.6047 11.5105C19.4091 11.6778 20.8312 13.159 20.8312 15C20.8312 16.933 19.2642 18.5 17.3312 18.5C16.2581 18.5 15.232 18.0095 14.5834 17.3211Z"></path>
                </svg>
                {/* Content */}
                <div className="text-center m-1 text-blue-900 px-6 py-5 md:text-4xl text-3xl  font-playfair font-medium">
                  {pageData.personal_quote?.quote}
                </div>
                {/* Right Icon */}
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 24 24"
                  className="text-blue-light-900 absolute top-2 right-1"
                  height="1em"
                  width="1em"
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
            {/* Gallery Header */}
            <div className="flex justify-between mt-6 md:mt-0">
              <div className="text-blue-light-900 font-playfair md:text-4xl text-3xl  border-b-4 border-blue-light-800 font-400 inline-block">
                {pageData.gallery?.gallery_name}
              </div>
              <div className="flex gap-3 items-center">
                <GalleryImageUploadView pageData={pageData}/>
                <div className="text-blue-light-900 text-lg font-normal font-playfair">
                  Share the page?
                  <button
                    onClick={handleCopyLink}
                    className={`md:text-lg ml-3 text-lg font-playfair border border-gray-300 font-medium px-4 py-1.5 rounded-lg ${
                      isPageLinkCopied
                        ? "bg-blue-light-900 text-white"
                        : "bg-[#F3EAEACC] text-blue-light-900"
                    }`}
                  >
                    {isPageLinkCopied ? "Copied!" : "Copy Link"}
                  </button>
                </div>
              </div>
            </div>

            {/* Gallery Content */}
            {(() => {
              const { folders, images } = pageData.gallery;
              const [visibleFolders, setVisibleFolders] = React.useState(3); // Initial visible folder count
              const [showMore, setShowMore] = React.useState(false);

              // Group images by folder
              const groupedImages = folders
                .map((folder) => ({
                  folderName: folder.name,
                  folderId: folder.id,
                  images: images.filter((img) => img.folder_id === folder.id),
                }))
                .filter((group) => group.images.length > 0); // Exclude empty folders

              // Add uncategorized images
              const uncategorizedImages = images.filter(
                (img) => !img.folder_id
              );
              if (uncategorizedImages.length > 0) {
                groupedImages.push({
                  folderName: null,
                  folderId: null,
                  images: uncategorizedImages,
                });
              }

              // Control visible folders
              const displayedFolders = showMore
                ? groupedImages
                : groupedImages.slice(0, visibleFolders);

              return (
                <>
                  {displayedFolders.map((group, index) => (
                    <div key={index} className="mt-6">
                      {group.folderName && (
                        <div className="font-playfair text-xl font-medium text-left">
                          {group.folderName}
                        </div>
                      )}
                      <div className="grid md:grid-cols-3 grid-cols-2 gap-5 mt-4 relative">
                        {group.images.map((img) => (
                          <img
                            key={img.id}
                            src={img.image_path}
                            alt={img.caption || "Gallery Image"}
                            className="rounded-md shadow-md"
                          />
                        ))}
                      </div>
                    </div>
                  ))}

                  {/* Show More Button */}
                  {groupedImages.length > visibleFolders && (
                    <div
                      className="text-blue-light-900 font-playfair text-lg mt-5 cursor-pointer"
                      onClick={() => setShowMore(!showMore)}
                    >
                      {showMore ? "Show Less..." : "Show More..."}
                    </div>
                  )}
                </>
              );
            })()}
          </div>
        )}

        {/* Obituary */}
        {isObituaryVisible && (
          <div ref={tab3Ref}>
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              {/* Obituary + Dove Icon (Mobile First) */}
              <div className="flex items-center gap-2 w-full justify-end md:w-auto md:order-1">
                <div className="text-blue-light-900 font-playfair md:text-3xl text-xl border-b-4 border-blue-light-800 font-400">
                  Obituary
                </div>
                <Image src="/img/dove.svg" alt="Dove" width={50} height={50} />
              </div>
              {/* Main Heading */}
              <div className="text-blue-light-900 font-playfair md:text-4xl text-3xl font-400 md:mt-0 text-left">
                {pageData.obituaries?.tagline}
              </div>
            </div>
            <div className="bg-white border-2 border-dashed text-left text-blue-light-900 md:text-xl text-xl  md:p-6 p-6 mt-5 md:mt-10">
              <p className=" mb-2 font-playfair">
                {pageData.obituaries?.content}
              </p>
            </div>
          </div>
        )}
        {/* Timeline */}
        {isTimelineVisible && (
          <div ref={tab4Ref}>
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div className="flex items-center gap-2 mt-5 md:mt-0  w-full justify-end md:w-auto md:order-1">
                <div className="text-blue-light-900 font-playfair md:text-3xl text-xl border-b-4 border-blue-light-800 font-400">
                  {pageData.timeline?.tagline}
                </div>
                <Image src="/img/dove.svg" alt="Dove" width={50} height={50} />
              </div>
              <div className="text-blue-light-900 font-playfair md:text-4xl text-3xl font-400 md:mt-0 text-left">
                A place to remember {pageData.first_name}'s milestones
              </div>
            </div>
            <div className="timeline">
              {pageData?.timeline?.events?.map((event, index) => {
                // Format the event date
                const { day, month, year } = formateData(event?.event_date);

                return (
                  <div
                    key={index}
                    className="timeline-event font-playfair flex gap-4 relative mt-4"
                  >
                    <div className="timeline-date flex flex-col md:w-2/12 w-4/12 gap-1 items-start space-y-1">
                      <div className="text-blue-light-900 font-medium md:text-xl text-base">
                        {event?.title}
                      </div>
                      <div>
                        <div className="p-2 text-center w-16 bg-[#F0F0F0] text-lg h-10 text-blue-light-900 rounded-lg font-medium">
                          {day}
                        </div>
                      </div>
                      <div>
                        <div className="p-2 w-24 text-lg rounded-lg text-center bg-[#F0F0F0] h-10 text-blue-light-900 font-medium">
                          {month}
                        </div>
                      </div>
                      <div>
                        <div className="p-2 w-16 bg-[#F0F0F0] text-lg  text-center h-10 border-gray-300 text-blue-light-900 rounded-lg font-medium">
                          {year}
                        </div>
                      </div>
                    </div>
                    <div className="md:w-10/12 w-8/12">
                      <div className="border-4 relative bg-[#fafafa] text-left rounded text-blue-light-900 font-medium text-base md:text-xl border-gray-200 w-full p-4">
                        <AiOutlineCaretLeft className="text-gray-200 text-2xl left-[-36px] top-0 h-12 w-12 absolute" />
                        <p>{event?.description}</p>
                      </div>
                      <div className="text-blue-light-900 font-medium md:text-lg text-base flex items-center mt-2 md:mt-4 gap-2">
                        <span className="material-icons-outlined text-blue-light-900">
                          location_on
                        </span>
                        {event?.location}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        {/* Contribution */}
        {isContributionVisible && (
          <div ref={tab5Ref}>
            <ContributionView
              contributionData={pageData?.contributions}
              userId={pageData?.user_id}
            />
          </div>
        )}
        {/* Favourites */}
        {isFavouritesVisible && (
          <div ref={tab6Ref}>
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div className="flex items-center gap-2 w-full justify-end md:w-auto md:order-1">
                <div className="text-blue-light-900 font-playfair md:text-3xl text-xl border-b-4 border-blue-light-800 font-400">
                  Favourites
                </div>
                <Image src="/img/dove.svg" alt="Dove" width={50} height={50} />
              </div>
              <div className="text-blue-light-900 font-playfair md:text-4xl text-3xl font-400 md:mt-0  text-left">
                {pageData.favourites?.tagline}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {pageData.favourites?.favourite_events?.map((event, index) => {
                return (
                  <div key={index} className="relative">
                    <h3 className="text-blue-light-900 font-playfair text-xl text-left border-gray-300 bg-[#f8f8f8] font-400  border p-3 mb-2 ">
                      {event.title}
                    </h3>
                    <p className="text-blue-light-900 font-400 font-playfair text-xl text-left border-gray-300 bg-[#f8f8f8] border p-3">
                      {event.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        {/* Social Media */}
        {isSocialMediaVisible && (
          <div className="text-left" ref={tab7Ref}>
            <div className="text-blue-light-900 md:w-[224px] w-[245px] font-playfair text-left md:text-3xl text-3xl mt-5 md:mt-0 border-b-4 border-blue-light-800 font-400 ">
              Social Media link
            </div>
            <h1 className="md:text-3xl relative text-xl flex gap-4 font-medium mb-6 mt-6">
              <span className="border bg-[#f8f8f8] font-playfair text-left w-full md:text-3xl text-xl text-blue-light-900 p-4 border-gray-300 ">
                {pageData.social_media_data?.content}
              </span>
              <Image
                className="absolute right-0 bottom-0 w-[50px]"
                src="/img/dove.svg"
                alt="Dove"
                width={50}
                height={50}
              />
            </h1>
            <button
              onClick={handleCopyLink}
              className={`px-4 py-2.5 text-white text-2xl text-left font-playfair mb-10
              ${
                isPageLinkCopied ? "bg-blue-light-900" : "add-button"
              } rounded-lg`}
            >
              {isPageLinkCopied ? "Copied!" : "Copy Link"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
