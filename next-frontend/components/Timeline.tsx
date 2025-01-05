import React, { useState, useEffect, useRef } from "react";
import { AiFillDelete } from "react-icons/ai";
import { useSession } from "next-auth/react";
import { usePageContext } from "../context/PageContext";
import axios from "axios";
import { API } from "../utils/api";
import { toast } from "react-toastify";

type TimelineEvent = {
  id: number;
  event_date: string;
  day: string;
  month: string;
  year: string;
  title: string;
  description: string;
  location: string;
};

type PageData = {
  tagline: string;
  timeline: {
    tagline: string;
    events: TimelineEvent[];
  };
  created_at: string;
  updated_at: string;
};

export default function Timeline() {
  const [isTimelineEnabled, setIsTimelineEnabled] = useState(true);
  const [tagline, setTagline] = useState<string>("");
  const [timelineEvents, setTimelineEvents] = useState<TimelineEvent[]>([]);
  const editableRef = useRef<HTMLSpanElement>(null);

  const { data: session } = useSession();
  const token = session?.user?.accessToken;
  const { pageData, setPageData } = usePageContext();

  const defaultTagline = "Your Timeline Goes Here";
  const defaultEvents: TimelineEvent[] = [
    {
      id: 0,
      event_date: "2015-09-06", // Default date for demonstration
      day: "6",
      month: "9",
      year: "2015",
      title: "Sample Event",
      description: "This is a sample event description.",
      location: "Sample Location",
    },
  ];

  useEffect(() => {
    if (pageData?.timeline) {
      setTagline(pageData?.timeline.tagline || defaultTagline);
      setTimelineEvents(pageData?.timeline.events || defaultEvents);
    } else {
      setTagline(defaultTagline);
      setTimelineEvents(defaultEvents);
    }
  }, [pageData]);

  // Function to extract day, month, and year from event_date
  const getDateParts = (event_date: string) => {
    const date = new Date(event_date);
    return {
      day: date.getDate().toString(),
      month: (date.getMonth() + 1).toString(),
      year: date.getFullYear().toString(),
    };
  };

  const updatePageData = (updatedData: any) => {
    setPageData(updatedData);
  };

  const handleEventChange = (index: number, field: keyof TimelineEvent, value: string) => {
    const updatedEvents = [...timelineEvents];
    updatedEvents[index] = { ...updatedEvents[index], [field]: value };
    setTimelineEvents(updatedEvents);
  };

  const addTimelineEvent = () => {
    const newEvent: TimelineEvent = {
      id: 0,
      event_date: "2024-01-01", // Default date for new event
      day: "1",
      month: "1",
      year: "2024",
      title: "New Event",
      description: "Event description",
      location: "Event location",
    };
    setTimelineEvents((prevEvents) => [...prevEvents, newEvent]);
  };

  const deleteEvent = async (index: number) => {
    const eventToDelete = timelineEvents[index];
    const data = { event_id: eventToDelete.id };
    const updatedEvents = timelineEvents.filter((_, i) => i !== index);

    try {
      if (!eventToDelete.id) {
        setTimelineEvents(updatedEvents);
        return;
      }
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}${API.deleteTimelineEvent}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          data,
        }
      );

      if (response.status === 200) {
        toast.success("Timeline Event Deleted Successfully");
        setTimelineEvents(updatedEvents);
        if (pageData?.timeline?.events) {
          const updatedPageData = {
            ...pageData,
            timeline: {
              ...pageData.timeline,
              events: pageData.timeline.events.filter(
                (event: TimelineEvent) => event.id !== eventToDelete.id
              ),
            },
          };
          updatePageData(updatedPageData);
        }
      } else {
        toast.error("Failed to delete event");
      }
    } catch (error) {
      toast.error("An error occurred while deleting the event.");
    }
  };

  const saveData = async (data: PageData | { tagline: string }) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}${API.saveTimeline}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Timeline Data Saved Successfully");
        setPageData(response.data.page_data);
      } else {
        toast.error("Error saving data");
      }
    } catch (error) {
      toast.error("Error saving data");
    }
  };

  const handleTaglineBlur = () => {
    saveData({ tagline });
  };

  const saveTimeline = () => {
    const payload: PageData = {
      tagline,
      timeline: {
        tagline,
        events: timelineEvents.map((event) => ({
          ...event,
          day: event.day || "1",
          month: event.month || "1",
          year: event.year || "2024",
          title: event.title || "Untitled Event",
          description: event.description || "No description",
          location: event.location || "Unknown location",
        })),
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    saveData(payload);
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 126 }, (_, i) => currentYear - i);

    return (
        <div>
            <div className="md:flex gap-5 justify-between">
                {/* Toggle Switch */}
                <div className="flex md:order-2 order-1 justify-end mb-4">
                    <div className="flex items-center md:gap-2 md:space-x-4 space-x-2">
                        <div className="relative inline-block w-12 align-middle select-none transition-all duration-200 ease-in">
                            <input
                                type="checkbox"
                                id="toggle-timeline"
                                checked={isTimelineEnabled}
                                onChange={() => setIsTimelineEnabled(!isTimelineEnabled)}
                                className="toggle-checkbox absolute block md:w-8 w-6 md:h-8 h-6 rounded-full bg-gray-100 border-4 appearance-none cursor-pointer transition-all duration-200 ease-in-out"
                            />
                            <label
                                htmlFor="toggle-timeline"
                                className={`toggle-label block overflow-hidden md:h-8 h-6 md:!w-16 !w-12 rounded-full cursor-pointer transition-all duration-200 ease-in-out ${isTimelineEnabled ? "bg-blue-light-900" : "bg-gray-300"
                                    }`}
                            ></label>
                        </div>
                        <span className="md:text-3xl text-xl font-playfair font-medium text-blue-light-900">Timeline</span>
                    </div>
                </div>

                {/* Heading */}
                <div>
                    <h1 className="md:text-3xl md:order-1 order-2 text-2xl flex gap-4 font-medium mb-6 mt-4">
                        <span
                            ref={editableRef}
                            className={`border border-dashed font-playfair bg-[#f8f8f8] text-blue-light-900 p-3 border-gray-300 focus:outline-none focus:border-gray-500 ${isTimelineEnabled ? "" : "text-gray-500 cursor-not-allowed"
                                }`}
                            contentEditable={isTimelineEnabled}
                            suppressContentEditableWarning
                            aria-label="Tagline"
                            onInput={(e) => setTagline(e.currentTarget.textContent || "")}
                            onBlur={handleTaglineBlur}
                        >
                            {tagline}
                        </span>
                    </h1>
                </div>
            </div>

            {isTimelineEnabled && (
                <div>
                    {/* Render Timeline Events */}
                    {timelineEvents?.map((event, index) => {
                        const { day, month, year } = getDateParts(event.event_date); // Extract day, month, year

                        return (
                            <div key={index} className="timeline-event font-playfair flex gap-4 relative mt-4">
                                <div
                                    className="absolute shadow p-1 bg-white rounded right-2 top-2"
                                    onClick={() => deleteEvent(index)}
                                >
                                    <AiFillDelete className="text-gray-400 cursor-pointer" />
                                </div>

                                <div className="timeline-date flex flex-col gap-2 items-start space-y-2">
                                    {/* Day Selector */}
                                    <div>
                                        <select
                                            className="p-2 w-16 border-2 bg-[#f8f8f8] h-10 border-gray-300 text-blue-900 font-medium"
                                            value={day}
                                            onChange={(e) => handleEventChange(index, "day", e.target.value)}
                                        >
                                            {Array.from({ length: 31 }, (_, i) => (
                                                <option key={i + 1} value={i + 1}>
                                                    {i + 1}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Month Selector */}
                                    <div>
                                        <select
                                            className="p-2 w-28 border-2 bg-[#f8f8f8] h-10 border-gray-300 text-blue-900 font-medium"
                                            value={month}
                                            onChange={(e) => handleEventChange(index, "month", e.target.value)}
                                        >
                                            {[
                                                "January", "February", "March", "April", "May", "June", "July",
                                                "August", "September", "October", "November", "December",
                                            ].map((monthName, idx) => (
                                                <option key={idx} value={idx + 1}>
                                                    {monthName}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Year Selector */}
                                    <div>
                                        <select
                                            className="p-2 w-24 bg-[#f8f8f8] border-2 h-10 border-gray-300 text-blue-900 font-medium"
                                            value={year}
                                            onChange={(e) => handleEventChange(index, "year", e.target.value)}
                                        >
                                            {years.map((yearOption) => (
                                                <option key={yearOption} value={yearOption}>
                                                    {yearOption}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {/* Event Description and Location */}
                                <div className="border border-dashed bg-[#f8f8f8]  !border-gray-300 w-full p-2">
                                    <h1 className="text-sm flex gap-4 font-medium mb-2">
                                        <input
                                            type="text"
                                            className="border w-1/2 !bg-[#f8f8f8] border-dashed text-blue-900 p-1 !border-gray-300 focus:outline-none !focus:border-gray-500"
                                            value={event.title}
                                            onChange={(e) =>
                                                handleEventChange(index, "title", e.target.value || "")
                                            }
                                            aria-label="Title"
                                            placeholder="Enter Title"
                                        />
                                    </h1>

                                    <h1 className="text-sm flex gap-4 font-medium mb-2">
                                        <textarea
                                            className="border border-dashed w-1/2 bg-[#f8f8f8] text-blue-900 p-1 border-gray-300 focus:outline-none focus:border-gray-500"
                                            value={event.description}
                                            onChange={(e) =>
                                                handleEventChange(index, "description", e.target.value || "")
                                            }
                                            aria-label="Description"
                                            placeholder="Enter Description"
                                        />
                                    </h1>

                                    <h1 className="text-sm flex gap-4 font-medium">
                                        <input
                                            type="text"
                                            className="border w-1/2 !bg-[#f8f8f8] border-dashed text-blue-900 p-1 !border-gray-300 focus:outline-none focus:border-gray-500"
                                            value={event.location}
                                            onChange={(e) =>
                                                handleEventChange(index, "location", e.target.value || "")
                                            }
                                            aria-label="Timeline Location"
                                            placeholder="Enter Location"
                                        />
                                    </h1>

                                </div>
                            </div>
                        );
                    })}


                    {/* Buttons for Adding Event and Saving Timeline */}
                    <div className="flex items-center gap-3 font-playfair align-middle mt-4">
                        <button
                            onClick={addTimelineEvent}
                            className="px-4 py-2 bg-blue-light-900 text-white rounded shadow"
                        >
                            Add a Timeline
                        </button>

                        <button
                            onClick={saveTimeline}
                            className="px-4 py-2 bg-blue-light-900 text-white rounded shadow"
                        >
                            Save Timeline
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
