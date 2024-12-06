import React, { useState } from "react";
import { AiFillDelete } from "react-icons/ai";

export default function Timeline() {
    const [isTimelineEnabled, setIsTimelineEnabled] = useState(true);
    // Initialize with one event by default
    const [timelineEvents, setTimelineEvents] = useState<any[]>([
        {
            day: "1",
            month: "1",
            year: "2024",
            title: "Default Event",
            description: "Default event description",
            location: "Default event location",
        },
    ]);

    // Function to handle adding a new timeline event
    const addTimelineEvent = () => {
        const newEvent = {
            day: "1",
            month: "1",
            year: "2024",
            title: "New Event",
            description: "Event description",
            location: "Event location",
        };
        setTimelineEvents((prevEvents) => [...prevEvents, newEvent]);
    };

    // Function to handle input changes (editable content)
    const handleInputChange = (index: number, field: string, value: string) => {
        const updatedEvents = [...timelineEvents];
        updatedEvents[index] = { ...updatedEvents[index], [field]: value };
        setTimelineEvents(updatedEvents);
    };

    // Function to delete an event
    const deleteEvent = (index: number) => {
        const updatedEvents = timelineEvents.filter((_, i) => i !== index);
        setTimelineEvents(updatedEvents);
    };

    return (
        <div>
            <div className="flex gap-5 justify-between">
                <h1 className="text-2xl flex gap-4 font-medium mb-6 mt-4">
                    <span
                        className={`border border-dashed text-blue-light-900 p-3 border-gray-300 focus:outline-none focus:border-gray-500 ${isTimelineEnabled ? "" : "text-gray-500 cursor-not-allowed"
                            }`}
                        contentEditable={isTimelineEnabled}
                        suppressContentEditableWarning
                        aria-label="Gallery Name"
                        onInput={(e) =>
                            console.log("Gallery name:", e.currentTarget.textContent)
                        }
                    >
                        A special memory for a special person
                    </span>
                </h1>

                {/* Toggle Switch */}
                <div className="flex justify-end mb-4">
                    <div className="flex items-center space-x-4">
                        <div className="relative inline-block w-12 align-middle select-none transition-all duration-200 ease-in">
                            <input
                                type="checkbox"
                                id="toggle-timeline"
                                checked={isTimelineEnabled}
                                onChange={() => setIsTimelineEnabled(!isTimelineEnabled)}
                                className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-gray-100 border-4 appearance-none cursor-pointer transition-all duration-200 ease-in-out"
                            />
                            <label
                                htmlFor="toggle-timeline"
                                className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer transition-all duration-200 ease-in-out ${isTimelineEnabled ? "bg-blue-light-900" : "bg-gray-300"
                                    }`}
                            ></label>
                        </div>
                        <span className="text-xl font-semibold text-blue-light-900">
                            Timeline
                        </span>
                    </div>
                </div>
            </div>

            {/* Editable Content */}
            {isTimelineEnabled && (
                <div>
                  

                    {/* Render Timeline Events */}
                    {timelineEvents.map((event, index) => (
                        <div key={index} className="timeline-event flex gap-4 relative mt-4">
                            <div
                                className="absolute shadow p-1 bg-white rounded right-2 top-2"
                                onClick={() => deleteEvent(index)}
                            >
                                <AiFillDelete className="text-gray-400 cursor-pointer" />
                            </div>

                            {/* Date Section */}
                            <div className="timeline-date gap-2 items-center space-y-2">
                                <div>
                                <select
                                    className="p-2 w-16 border-2 h-10 bg-gray-50 border-gray-300 text-blue-900 font-medium"
                                    value={event.day}
                                    onChange={(e) =>
                                        handleInputChange(index, "day", e.target.value)
                                    }
                                >
                                    {Array.from({ length: 31 }, (_, i) => (
                                        <option key={i + 1} value={i + 1}>
                                            {i + 1}
                                        </option>
                                    ))}
                                </select>
                                </div>

                                <select
                                    className="p-2 w-28 border-2 h-10 bg-gray-50 border-gray-300 text-blue-900 font-medium"
                                    value={event.month}
                                    onChange={(e) =>
                                        handleInputChange(index, "month", e.target.value)
                                    }
                                >
                                    <option value="1">January</option>
                                    <option value="2">February</option>
                                    <option value="3">March</option>
                                    <option value="4">April</option>
                                    <option value="5">May</option>
                                    <option value="6">June</option>
                                    <option value="7">July</option>
                                    <option value="8">August</option>
                                    <option value="9">September</option>
                                    <option value="10">October</option>
                                    <option value="11">November</option>
                                    <option value="12">December</option>
                                </select>

                                <select
                                    className="p-2 w-24 border-2 h-10 bg-gray-50 border-gray-300 text-blue-900 font-medium"
                                    value={event.year}
                                    onChange={(e) =>
                                        handleInputChange(index, "year", e.target.value)
                                    }
                                >
                                    <option value="">Year</option>
                                    {Array.from({ length: 100 }, (_, i) => (
                                        <option key={i} value={2024 - i}>
                                            {2024 - i}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Timeline Content Section */}
                            <div className="border border-dashed border-gray-300 w-full p-2">
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
                      <button
                        onClick={addTimelineEvent}
                        className="px-4 py-2 bg-blue-light-900 mt-10 text-white rounded shadow"
                    >
                        Add a Timeline
                    </button>
                </div>
            )}
        </div>
    );
}
