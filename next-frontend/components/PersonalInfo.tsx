import { useState, useEffect, useRef, ChangeEvent } from "react";
import Cropper from "react-easy-crop";
import axios from "axios";
import { toast } from "react-toastify";
import { API } from "../utils/api";
import { useSession } from "next-auth/react";
import { usePageContext } from "../context/PageContext";
import { format, parse, isValid } from "date-fns";
import ImageCropperModal from "../components/ImageCropperModal";

interface DateState {
  day: string;
  month: string;
  year: string;
}




export default function PersonalInfo() {
  const { pageData, setPageData } = usePageContext();
  const { data: session } = useSession();

  const [firstName, setFirstName] = useState<string>("First Name");
  const [middleName, setMiddleName] = useState<string>("Smith");
  const [lastName, setLastName] = useState<string>("Last Name");
  const [location, setLocation] = useState<string>("New York, USA");

  const token = session?.user?.accessToken;
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

  const [dateOfBirth, setDateOfBirth] = useState<DateState>({
    day: "Day",
    month: "Month",
    year: "Year",
  });

  const [deathDate, setDeathDate] = useState<DateState>({
    day: "Day",
    month: "Month",
    year: "Year",
  });

  const dobRef = useRef<HTMLDivElement | null>(null);
  const middleNameRef = useRef<HTMLDivElement | null>(null);
  const lastNameRef = useRef<HTMLDivElement | null>(null);
  const locationRef = useRef<HTMLDivElement | null>(null);

  const [dobTimer, setDobTimer] = useState<NodeJS.Timeout | null>(null);
  const [deathTimer, setDeathTimer] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (pageData) {
      setFirstName(pageData.first_name || "First Name");
      setMiddleName(pageData.middle_name || "Smith");
      setLastName(pageData.last_name || "Last Name");
      setLocation(pageData.address || "New York, USA");

      if (pageData.date_of_birth) {
        const parsedDate = parse(pageData.date_of_birth, "yyyy-MM-dd", new Date());
        if (isValid(parsedDate)) {
          setDateOfBirth({
            day: format(parsedDate, "dd"),
            month: format(parsedDate, "MMMM"),
            year: format(parsedDate, "yyyy"),
          });
        } else {
          toast.error("Invalid date_of_birth format", pageData.date_of_birth);
        }
      }

      if (pageData.death_date) {
        const parsedDate = parse(pageData.death_date, "yyyy-MM-dd", new Date());
        if (isValid(parsedDate)) {
          setDeathDate({
            day: format(parsedDate, "dd"),
            month: format(parsedDate, "MMMM"),
            year: format(parsedDate, "yyyy"),
          });
        } else {
          toast.error("Invalid death_date format", pageData.death_date);
        }
      }
    }
  }, [pageData]);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 80 }, (_, index) => currentYear - index);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const days = Array.from({ length: 31 }, (_, index) => (index + 1).toString());

  const getFormattedDate = (date: DateState) => {
    const { day, month, year } = date;
    const monthIndex = months.indexOf(month) + 1;
    return `${year}-${monthIndex.toString().padStart(2, "0")}-${day.padStart(
      2,
      "0"
    )}`;
  };

  const handleBlur = async (field: string, value: string | File) => {
    try {
      const formData = new FormData();

      if (field === "profile_picture" && value instanceof File) {
        formData.append("profile_picture", value);
      } else {
        formData.append(field, value as string);
      }

      // Send the request
      const response = await axios.post(
        `${API_URL}${API.savePersonalDetails}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200 && response.data?.page_data) {
        setPageData(response.data.page_data);
      } else {
        toast.error(`Failed to update data. Invalid response.`);
      }
    } catch (error) {
      toast.error(`Error updating ${field}`);
    }
  };


  const handleDateChange = (
    type: "dob" | "death",
    field: "day" | "month" | "year",
    value: string
  ) => {
    // Update state immediately
    if (type === "dob") {
      setDateOfBirth((prev) => {
        const newDate = { ...prev, [field]: value };

        // Clear the previous timer and set a new one
        if (dobTimer) clearTimeout(dobTimer);

        const timer = setTimeout(() => {
          // Check if the date is complete and then format it
          if (isCompleteDate(newDate)) {
            const formattedDate = getFormattedDate(newDate);
            handleBlur("date_of_birth", formattedDate); // Send formatted date
          }
        }, 1000);

        setDobTimer(timer); // Store the new timer
        return newDate; // Update the state with the new date
      });
    } else {
      setDeathDate((prev) => {
        const newDate = { ...prev, [field]: value };

        // Clear the previous timer and set a new one
        if (deathTimer) clearTimeout(deathTimer);

        const timer = setTimeout(() => {
          // Check if the date is complete and then format it
          if (isCompleteDate(newDate)) {
            const formattedDate = getFormattedDate(newDate);
            handleBlur("death_date", formattedDate); // Send formatted date
          }
        }, 1000);

        setDeathTimer(timer);
        return newDate;
      });
    }
  };

  const isCompleteDate = (date: DateState): boolean => {
    return date.day !== "Day" && date.month !== "Month" && date.year !== "Year";
  };


  const handleContentEditableChange = (
    ref: React.RefObject<HTMLDivElement>,
    setter: React.Dispatch<React.SetStateAction<string>>,
    value: string
  ) => {
    setter(value);
    if (ref.current) {
      const selection = window.getSelection();
      if (selection && ref.current.firstChild) {
        const range = selection.getRangeAt(0);
        const cursorPos = range.startOffset;

        setTimeout(() => {
          if (ref.current) {
            const el = ref.current;
            const cursorRange = document.createRange();

            // Only apply cursor position if the first child exists
            if (el.firstChild) {
              cursorRange.setStart(el.firstChild, cursorPos); // Reapply cursor position
              selection.removeAllRanges();
              selection.addRange(cursorRange);
            }
          }
        }, 0);
      }
    }
  };

  if (!token) {
    toast.error("User is not authenticated.");
    return <div>Loading...</div>;
  }

  return (
    <section className="flex flex-col md:flex-row  px-4 md:px-12">
      <div className="mt-[-50px] mx-auto md:mx-0">
        <div className="relative bg-[#EAEAEA] p-2 w-[352px]">
          <img
            src={pageData?.profile_picture || "/img/profile-img.png"}
            alt="Profile"
            className="w-full h-auto object-cover"
          />
          <ImageCropperModal
            onSave={(file) => handleBlur("profile_picture", file.name)}
          />
        </div>
      </div>
      <div className="flex-1">
        <div className="space-y-4 p-4">
          <h1 className="text-3xl md:text-5xl  font-playfair flex flex-wrap gap-4 font-medium mb-6 mt-4">
            <div
              ref={dobRef}
              className="border border-dashed text-blue-light-900 p-4 border-gray-300 focus:outline-none focus:border-gray-500"
              contentEditable
              suppressContentEditableWarning
              onInput={(e) =>
                handleContentEditableChange(dobRef, setFirstName, e.currentTarget.textContent || "")
              }
              onBlur={(e) => handleBlur("firstName", e.currentTarget.textContent || "")}
            >
              {firstName}
            </div>
            <div
              ref={middleNameRef}
              className="border border-dashed text-blue-light-900 p-4 border-gray-300 focus:outline-none focus:border-gray-500"
              contentEditable
              suppressContentEditableWarning
              onInput={(e) =>
                handleContentEditableChange(middleNameRef, setMiddleName, e.currentTarget.textContent || "")
              }
              onBlur={(e) => handleBlur("middleName", e.currentTarget.textContent || "")}
            >
              {middleName}
            </div>
            <div
              ref={lastNameRef}
              className="border border-dashed text-blue-light-900 p-4 border-gray-300 focus:outline-none focus:border-gray-500"
              contentEditable
              suppressContentEditableWarning
              onInput={(e) =>
                handleContentEditableChange(lastNameRef, setLastName, e.currentTarget.textContent || "")
              }
              onBlur={(e) => handleBlur("lastName", e.currentTarget.textContent || "")}
            >
              {lastName}
            </div>
          </h1>
          <div className="flex flex-wrap  items-center  font-playfair gap-5">
            {/* Editable Date Fields for Date of Birth */}
            <div className="flex flex-wrap gap-4  font-playfair">

              <select
                className="p-2 w-24 border-2 h-12 text-xl border-gray-300 text-blue-light-900 font-medium"
                value={dateOfBirth.day}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => handleDateChange("dob", "day", e.target.value)}
              >
                <option value="">Day</option>
                {days.map((day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </select>
              <select
                className="p-2 md:w-36 w-32 border-2 text-xl h-12 border-gray-300 text-blue-light-900 font-medium"
                value={dateOfBirth.month}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => handleDateChange("dob", "month", e.target.value)}
              >
                <option value="">Month</option>
                {months.map((month, index) => (
                  <option key={index} value={month}>
                    {month}
                  </option>
                ))}
              </select>
              <select
                className="p-2 h-12 border-2 text-xl border-gray-300 text-blue-light-900 font-medium w-[100px]"
                value={dateOfBirth.year}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => handleDateChange("dob", "year", e.target.value)}
              >
                <option value="">Year</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>


            {/* Divider Icon */}
            <div>
              <svg
                className="w-6 h-6 text-blue-light-900"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path d="M438.6 150.6c12.5-12.5 12.5-32.8 0-45.3l-96-96c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.7 96 32 96C14.3 96 0 110.3 0 128s14.3 32 32 32l306.7 0-41.4 41.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l96-96zm-333.3 352c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 416 416 416c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0 41.4-41.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-96 96c-12.5 12.5-12.5 32.8 0 45.3l96 96z"></path>
              </svg>
            </div>

            {/* Editable Date Fields for Death Date */}
            <div className="flex items-center gap-4">
              <div className="flex items-center space-x-4">
                <select
                  className="p-2 w-24 border-2 text-xl h-12 border-gray-300 text-blue-light-900 font-medium"
                  value={deathDate.day}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) => handleDateChange("death", "day", e.target.value)}
                >
                  <option value="">Day</option>
                  {days.map((day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </select>
                <select
                  className="p-2 md:w-36 w-32 border-2 text-xl h-12 border-gray-300 text-blue-light-900 font-medium"
                  value={deathDate.month}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) => handleDateChange("death", "month", e.target.value)}
                >
                  <option value="">Month</option>
                  {months.map((month, index) => (
                    <option key={index} value={month}>
                      {month}
                    </option>
                  ))}
                </select>
                <select
                  className="p-2 h-12 border-2 text-xl border-gray-300 text-blue-light-900 font-medium w-[100px]"
                  value={deathDate.year}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) => handleDateChange("death", "year", e.target.value)}
                >
                  <option value="">Year</option>
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Editable Location */}
          <div className="flex items-center relative">
            <span className="material-icons-outlined absolute left-4 text-blue-light-900">
              location_on
            </span>
            <div
              ref={locationRef}
              className="border-2 p-3 text-xl border-gray-300 text-blue-light-900 pl-12 w-[93%]  focus:outline-none focus:border-blue-600 focus:text-blue-600"
              contentEditable
              suppressContentEditableWarning
              aria-label="Location"
              onBlur={(e) => handleBlur("location", e.currentTarget.textContent || "")}
              onInput={(e) => handleContentEditableChange(locationRef, setLocation, e.currentTarget.textContent || "")}
            >
              {location}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
