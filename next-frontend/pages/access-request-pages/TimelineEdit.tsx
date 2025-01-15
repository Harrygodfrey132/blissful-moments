import Image from 'next/image';
import React, { useState, useRef } from 'react';
import { AiFillDelete } from 'react-icons/ai';

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

export default function TimelineEdit({ setTimeline }: { setTimeline: (timeline: TimelineEvent[]) => void }) {
  const [isTimelineEnabled, setIsTimelineEnabled] = useState(true);
  const [tagline, setTagline] = useState<string>('Your Timeline Goes Here');
  const [timelineEvents, setTimelineEvents] = useState<TimelineEvent[]>([]);
  const editableRef = useRef<HTMLSpanElement>(null);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 126 }, (_, i) => currentYear - i);

  const isStringField = (field: keyof TimelineEvent): field is 'day' | 'month' | 'year' | 'title' | 'description' | 'location' => {
    return ['day', 'month', 'year', 'title', 'description', 'location'].includes(field);
  };

  const handleEventChange = (index: number, field: keyof TimelineEvent, value: string) => {
    const updatedEvents = [...timelineEvents];
    const updatedEvent = { ...updatedEvents[index] };

    if (isStringField(field)) {
      updatedEvent[field] = value;

      if (['day', 'month', 'year'].includes(field)) {
        updatedEvent.event_date = `${updatedEvent.year}-${String(updatedEvent.month).padStart(2, '0')}-${String(updatedEvent.day).padStart(2, '0')}`;
      }
    }

    updatedEvents[index] = updatedEvent;
    setTimelineEvents(updatedEvents);
    setTimeline(updatedEvents); // Update parent state
  };

  const addTimelineEvent = () => {
    const newEvent: TimelineEvent = {
      id: Date.now(),
      event_date: '2024-01-01',
      day: '1',
      month: '1',
      year: '2024',
      title: 'New Event',
      description: 'Event description',
      location: 'Event location',
    };
    const updatedEvents = [...timelineEvents, newEvent];
    setTimelineEvents(updatedEvents);
    setTimeline(updatedEvents); // Update parent state
  };

  const deleteEvent = (index: number) => {
    const updatedEvents = timelineEvents.filter((_, i) => i !== index);
    setTimelineEvents(updatedEvents);
    setTimeline(updatedEvents); // Update parent state
  };

  const handleTaglineBlur = () => {
    setTimeline(timelineEvents); // Ensure parent is updated with the current timeline state
  };


  return (
    <div>
      <div className="md:flex gap-5 justify-between">
        <div className="flex md:order-2 order-1 justify-end mb-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            {/* Obituary + Dove Icon (Mobile First) */}
            <div className="flex items-center gap-2 w-full justify-end md:w-auto md:order-1">
              <div className="text-blue-light-900 font-playfair md:text-xl text-lg border-b-4 border-blue-light-800 font-400">
                Timeline
              </div>
              <Image src="/img/dove.svg" alt="Dove" width={50} height={50} />
            </div>
          </div>
        </div>

        <div>
          <h1 className="md:text-xl md:order-1 order-2 text-xl flex gap-4 font-medium mb-6 mt-4">
            <span
              className={`border border-dashed font-playfair bg-[#f8f8f8] text-blue-light-900 p-3 border-gray-300 focus:outline-none focus:border-gray-500 ${isTimelineEnabled ? '' : 'text-gray-500 cursor-not-allowed'
                }`}
              aria-label="Tagline"
            >
              {tagline}
            </span>
          </h1>
        </div>
      </div>

      {isTimelineEnabled && (
        <div>
          {timelineEvents.map((event, index) => (
            <div key={index} className="timeline-event font-playfair flex gap-4 relative mt-4">
              <div
                className="absolute shadow p-1 bg-white rounded right-2 top-2"
                onClick={() => deleteEvent(index)}
              >
                <AiFillDelete className="text-gray-400 cursor-pointer" />
              </div>

              <div className="timeline-date flex flex-col gap-2 items-start space-y-2">
                <select
                  className="p-2 w-16 border-2 bg-[#f8f8f8] h-10 border-gray-300 text-blue-900 font-medium"
                  value={event.day}
                  onChange={(e) => handleEventChange(index, 'day', e.target.value)}
                >
                  {Array.from({ length: 31 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>

                <select
                  className="p-2 w-28 border-2 bg-[#f8f8f8] h-10 border-gray-300 text-blue-900 font-medium"
                  value={event.month}
                  onChange={(e) => handleEventChange(index, 'month', e.target.value)}
                >
                  {[
                    'January',
                    'February',
                    'March',
                    'April',
                    'May',
                    'June',
                    'July',
                    'August',
                    'September',
                    'October',
                    'November',
                    'December',
                  ].map((monthName, idx) => (
                    <option key={idx} value={idx + 1}>
                      {monthName}
                    </option>
                  ))}
                </select>

                <select
                  className="p-2 w-24 bg-[#f8f8f8] border-2 h-10 border-gray-300 text-blue-900 font-medium"
                  value={event.year}
                  onChange={(e) => handleEventChange(index, 'year', e.target.value)}
                >
                  {years.map((yearOption) => (
                    <option key={yearOption} value={yearOption}>
                      {yearOption}
                    </option>
                  ))}
                </select>
              </div>

              <div className="border flex flex-col border-dashed bg-[#f8f8f8] !border-gray-300 w-full p-2">
                <input
                  type="text"
                  className="border w-1/2 !bg-[#f8f8f8] border-dashed text-blue-900 p-1 !border-gray-300 focus:outline-none !focus:border-gray-500 mb-2"
                  value={event.title}
                  onChange={(e) => handleEventChange(index, 'title', e.target.value)}
                  placeholder="Enter Title"
                />

                <textarea
                  className="border border-dashed w-1/2 bg-[#f8f8f8] text-blue-900 p-1 border-gray-300 focus:outline-none focus:border-gray-500 mb-2"
                  value={event.description}
                  onChange={(e) => handleEventChange(index, 'description', e.target.value)}
                  placeholder="Enter Description"
                />

                <input
                  type="text"
                  className="border w-1/2 !bg-[#f8f8f8] border-dashed text-blue-900 p-1 !border-gray-300 focus:outline-none !focus:border-gray-500 mb-2"
                  value={event.location}
                  onChange={(e) => handleEventChange(index, 'location', e.target.value)}
                  placeholder="Enter Location"
                />
              </div>
            </div>
          ))}

          <div className="flex items-center gap-3 font-playfair align-middle mt-4">
            <button onClick={addTimelineEvent} className="px-4 py-2.5 font-playfair add-button text-white">
              Add a Timeline
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
