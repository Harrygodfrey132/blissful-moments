import axios from "axios";
import React, { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { API } from "../utils/api";
import { useSession } from "next-auth/react";
import { usePageContext } from "../context/PageContext";

type TimelineEvent = {
    day: string;
    month: string;
    year: string;
    title: string;
    description: string;
    location: string;
};

type PageData = {
    tagline: string;
    events: TimelineEvent[];
};

export default function Timeline() {
    const [isTimelineEnabled, setIsTimelineEnabled] = useState(true);
    const [tagline, setTagline] = useState("A special memory for a special person");
    const [timelineEvents, setTimelineEvents] = useState<TimelineEvent[]>([
        {
            day: "1",
            month: "1",
            year: "2024",
            title: "Default Event",
            description: "Default event description",
            location: "Default event location",
        },
    ]);
    const { data: session } = useSession();
    const token = session?.user?.accessToken;

    // Add a new timeline event
    const addTimelineEvent = () => {
        const newEvent: TimelineEvent = {
            day: "1",
            month: "1",
            year: "2024",
            title: "New Event",
            description: "Event description",
            location: "Event location",
        };
        setTimelineEvents((prevEvents) => [...prevEvents, newEvent]);
    };

    // Handle input change for any field in the timeline event
    const handleInputChange = (index: number, field: keyof TimelineEvent, value: string) => {
        const updatedEvents = [...timelineEvents];
        updatedEvents[index] = { ...updatedEvents[index], [field]: value };
        setTimelineEvents(updatedEvents);
    };

    // Delete a timeline event
    const deleteEvent = (index: number) => {
        const updatedEvents = timelineEvents.filter((_, i) => i !== index);
        setTimelineEvents(updatedEvents);
    };

    // Save data (tagline or full timeline)
    const saveData = async (data: PageData | { tagline: string }) => {
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}${API.saveTimeline}`,
                data,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 200) {
                console.log(`${data.hasOwnProperty("tagline") ? "Tagline" : "Timeline"} saved successfully`);
            } else {
                console.error("Error saving data:", response.statusText);
            }
        } catch (error) {
            console.error("Error saving data:", error);
        }
    };

    // Save tagline onBlur (when the user leaves the input)
    const handleTaglineBlur = () => {
        saveData({ tagline });
    };

    // Save the entire timeline (tagline + all events)
    const saveTimeline = () => {
        const payload: PageData = {
            tagline,
            events: timelineEvents,
        };
        saveData(payload);
    };

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
          className={`toggle-label block overflow-hidden md:h-8 h-6 md:!w-16 !w-12 rounded-full cursor-pointer transition-all duration-200 ease-in-out ${
            isTimelineEnabled ? "bg-blue-light-900" : "bg-gray-300"
          }`}
        ></label>
      </div>
      <span className="md:text-3xl text-xl font-playfair font-medium text-blue-light-900">Timeline</span>
    </div>
  </div>

  {/* Heading */}
  <h1 className="md:text-3xl md:order-1 order-2 text-2xl flex gap-4 font-medium mb-6 mt-4">
    <span
      className={`border border-dashed font-playfair bg-[#f8f8f8] text-blue-light-900 p-3 border-gray-300 focus:outline-none focus:border-gray-500 ${
        isTimelineEnabled ? "" : "text-gray-500 cursor-not-allowed"
      }`}
      contentEditable={isTimelineEnabled}
      suppressContentEditableWarning
      aria-label="Tagline"
      onInput={(e) => setTagline(e.currentTarget.textContent || "")}
      onBlur={handleTaglineBlur} // Save tagline on blur
    >
      {tagline}
    </span>
  </h1>
</div>


            {isTimelineEnabled && (
                <div>
                    {/* Render Timeline Events */}
                    {timelineEvents.map((event, index) => (
                        <div key={index} className="timeline-event font-playfair flex gap-4 relative mt-4">
                            <div
                                className="absolute shadow p-1 bg-white rounded right-2 top-2"
                                onClick={() => deleteEvent(index)}
                            >
                                <AiFillDelete className="text-gray-400 cursor-pointer" />
                            </div>
                            <div className="timeline-date flex flex-col gap-2 items-start space-y-2">
                                {/* Date Selectors */}
                                <div>
                                    <select
                                        className="p-2 w-16 border-2 bg-[#f8f8f8]  h-10 border-gray-300 text-blue-900 font-medium"
                                        value={event.day}
                                        onChange={(e) => handleInputChange(index, "day", e.target.value)}
                                    >
                                        {Array.from({ length: 31 }, (_, i) => (
                                            <option key={i + 1} value={i + 1}>
                                                {i + 1}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <select
                                        className="p-2 w-28 border-2 bg-[#f8f8f8]  h-10 border-gray-300 text-blue-900 font-medium"
                                        value={event.month}
                                        onChange={(e) => handleInputChange(index, "month", e.target.value)}
                                    >
                                        {[
                                            "January", "February", "March", "April", "May", "June", "July",
                                            "August", "September", "October", "November", "December",
                                        ].map((month, idx) => (
                                            <option key={idx} value={idx + 1}>
                                                {month}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <select
                                        className="p-2 w-24 bg-[#f8f8f8]  border-2 h-10 border-gray-300 text-blue-900 font-medium"
                                        value={event.year}
                                        onChange={(e) => handleInputChange(index, "year", e.target.value)}
                                    >
                                        {Array.from({ length: 100 }, (_, i) => (
                                            <option key={i} value={2024 - i}>
                                                {2024 - i}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Event Description and Location */}
                            <div className="border border-dashed bg-[#f8f8f8]  border-gray-300 w-full p-2">
                                <h1 className="text-sm flex gap-4 font-medium mb-2">
                                    <span
                                        className="border border-dashed text-blue-900 p-1 border-gray-300 focus:outline-none focus:border-gray-500"
                                        contentEditable
                                        suppressContentEditableWarning
                                        aria-label="Title"
                                        onInput={(e) =>
                                            handleInputChange(index, "title", e.currentTarget.textContent || "")
                                        }
                                    >
                                        {event.title}
                                    </span>
                                </h1>
                                <h1 className="text-sm flex gap-4 font-medium mb-2">
                                    <span
                                        className="border border-dashed text-blue-900 p-1 border-gray-300 focus:outline-none focus:border-gray-500"
                                        contentEditable
                                        suppressContentEditableWarning
                                        aria-label="Description"
                                        onInput={(e) =>
                                            handleInputChange(index, "description", e.currentTarget.textContent || "")
                                        }
                                    >
                                        {event.description}
                                    </span>
                                </h1>
                                <h1 className="text-sm flex gap-4 font-medium">
                                    <span
                                        className="border border-dashed text-blue-900 p-1 border-gray-300 focus:outline-none focus:border-gray-500"
                                        contentEditable
                                        suppressContentEditableWarning
                                        aria-label="Timeline Location"
                                        onInput={(e) =>
                                            handleInputChange(index, "location", e.currentTarget.textContent || "")
                                        }
                                    >
                                        {event.location}
                                    </span>
                                </h1>
                            </div>
                        </div>
                    ))}

                    {/* Buttons for Adding Event and Saving Timeline */}
                    <div className="flex items-center gap-3 font-playfair align-middle mt-4">
                        <button
                            onClick={addTimelineEvent} // Add a new event
                            className="px-4 py-2 bg-blue-light-900 text-white rounded shadow"
                        >
                            Add a Timeline
                        </button>

                        {/* Save Timeline Button (Only One Save Timeline Button Here) */}
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
