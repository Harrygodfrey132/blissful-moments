import { useState, useEffect, useRef, ChangeEvent } from "react";
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
  const [middleName, setMiddleName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("Last Name");
  const [location, setLocation] = useState<string>("Location");

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

  // Extracted common logic into reusable function for clarity
  const handleDateChange = (
    type: "dob" | "death",
    field: "day" | "month" | "year",
    value: string
  ) => {
    const isDob = type === "dob";
    const dateState = isDob ? dateOfBirth : deathDate;
    const setDateState = isDob ? setDateOfBirth : setDeathDate;

    const newDate = { ...dateState, [field]: value };

    const timer = setTimeout(() => {
      if (isCompleteDate(newDate)) {
        const formattedDate = getFormattedDate(newDate);
        handleBlur(isDob ? "date_of_birth" : "death_date", formattedDate);
      }
    }, 1000);

    isDob ? setDobTimer(timer) : setDeathTimer(timer);
    setDateState(newDate);
  };

  const isCompleteDate = (date: DateState): boolean => {
    return date.day !== "Day" && date.month !== "Month" && date.year !== "Year";
  };

  const getFormattedDate = (date: DateState) => {
    const { day, month, year } = date;
    const monthIndex = months.indexOf(month) + 1;
    return `${year}-${monthIndex.toString().padStart(2, "0")}-${day.padStart(
      2,
      "0"
    )}`;
  };

  // Handle Blur Event
  const handleBlur = async (field: string, value: string | File) => {
    try {
      const formData = new FormData();
      formData.append(field, value as string);

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

  // Handle contentEditable change
  const handleContentEditableChange = (
    ref: React.RefObject<HTMLDivElement>,
    setter: React.Dispatch<React.SetStateAction<string>>,
    value: string
  ) => {
    setter(value);

    if (ref.current) {
      const selection = window.getSelection();
      const cursorPos = selection?.getRangeAt(0)?.startOffset || 0;

      // Preserve cursor position
      setTimeout(() => {
        if (ref.current && ref.current.firstChild) {
          const el = ref.current;
          const cursorRange = document.createRange();
          const firstChild = el.firstChild;

          // Ensure that firstChild is a Node before using it
          if (firstChild instanceof Node) {
            cursorRange.setStart(firstChild, cursorPos);
            selection?.removeAllRanges();
            selection?.addRange(cursorRange);
          }
        }
      }, 0);

    }
  };

  useEffect(() => {
    if (pageData) {
      setFirstName(pageData.first_name || "");
      setMiddleName(pageData.middle_name || "");
      setLastName(pageData.last_name || "Last Name");
      setLocation(pageData.address || "");

      if (pageData.date_of_birth) {
        const parsedDate = parse(
          pageData.date_of_birth,
          "yyyy-MM-dd",
          new Date()
        );
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

  return (
    <section className="flex flex-col md:flex-row  px-4 md:px-12 personal-info">
      <div className="mt-[-50px] mx-auto md:mx-0 profile-thumb">
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

      {/* Editable Form Fields */}
      <div className="flex-1">
        <div className="space-y-4 md:p-4 p-0">
          <h1 className="text-3xl md:text-5xl  font-playfair flex flex-wrap gap-4 font-medium mb-6 mt-4">
            <div
              ref={dobRef}
              className="border border-dashed bg-[#f8f8f8] text-blue-light-900 p-4 border-gray-300 focus:outline-none focus:border-gray-500"
              contentEditable
              suppressContentEditableWarning
              onInput={(e) =>
                handleContentEditableChange(
                  dobRef,
                  setFirstName,
                  e.currentTarget.textContent || ""
                )
              }
              onBlur={(e) =>
                handleBlur("firstName", e.currentTarget.textContent || "")
              }
            >
              {firstName}
            </div>
            <div
              ref={middleNameRef}
              className="border border-dashed bg-[#f8f8f8] text-blue-light-900 p-4 border-gray-300 focus:outline-none focus:border-gray-500"
              contentEditable
              suppressContentEditableWarning
              onInput={(e) =>
                handleContentEditableChange(
                  middleNameRef,
                  setMiddleName,
                  e.currentTarget.textContent || ""
                )
              }
              onBlur={(e) =>
                handleBlur("middleName", e.currentTarget.textContent || "")
              }
            >
              {middleName}
            </div>
            <div
              ref={lastNameRef}
              className="border border-dashed bg-[#f8f8f8] text-blue-light-900 p-4 border-gray-300 focus:outline-none focus:border-gray-500"
              contentEditable
              suppressContentEditableWarning
              onInput={(e) =>
                handleContentEditableChange(
                  lastNameRef,
                  setLastName,
                  e.currentTarget.textContent || ""
                )
              }
              onBlur={(e) =>
                handleBlur("lastName", e.currentTarget.textContent || "")
              }
            >
              {lastName}
            </div>
          </h1>
          <div className="flex flex-wrap  items-center  font-playfair gap-2">
            {/* Editable Date Fields for Date of Birth */}
            <div className="flex flex-wrap gap-2 font-playfair">

              {/* Date of Birth and Death Date Selectors */}
              <div className="flex flex-wrap items-center gap-5">
                {/* Editable Date Fields for Date of Birth */}
                <div className="flex flex-wrap gap-4 font-playfair">
                  <select
                    className="p-2 border-2 w-24 bg-[#f8f8f8] h-12 text-xl border-gray-300 text-blue-light-900 font-medium"
                    value={dateOfBirth.day}
                    onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                      handleDateChange("dob", "day", e.target.value)
                    }
                  >
                    <option value="Day">Day</option>
                    {days.map((day) => (
                      <option key={day} value={day}>
                        {day}
                      </option>
                    ))}
                  </select>
                  <select
                    className="p-2 w-36 bg-[#f8f8f8] border-2 text-xl h-12 border-gray-300 text-blue-light-900 font-medium"
                    value={dateOfBirth.month}
                    onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                      handleDateChange("dob", "month", e.target.value)
                    }
                  >
                    <option value="Month">Month</option>
                    {months.map((month, index) => (
                      <option key={index} value={month}>
                        {month}
                      </option>
                    ))}
                  </select>
                  <select
                    className="p-2 w-24 h-12 border-2 bg-[#f8f8f8] text-xl border-gray-300 text-blue-light-900 font-medium w-[100px]"
                    value={dateOfBirth.year}
                    onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                      handleDateChange("dob", "year", e.target.value)
                    }
                  >
                    <option value="Year">Year</option>
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

                <div className="flex gap-2 items-center">
                  <select
                    className="p-2 w-24 border-2 bg-[#f8f8f8] text-xl h-12 border-gray-300 text-blue-light-900 font-medium"
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
                    className="p-2 w-36 border-2 bg-[#f8f8f8] text-xl h-12 border-gray-300 text-blue-light-900 font-medium"
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
                    className="p-2 w-24 h-12 border-2 bg-[#f8f8f8] text-xl border-gray-300 text-blue-light-900 font-medium w-[100px]"
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
              {/* Editable Location */}
              <div className="flex items-center relative">
                <span className="material-icons-outlined absolute left-4 text-blue-light-900">
                  location_on
                </span>
                <div
                  ref={locationRef}
                  className="border-2 p-3 text-xl md:w-[87%] w-full border-gray-300 bg-[#f8f8f8] text-blue-light-900 pl-12   focus:outline-none focus:border-blue-600 focus:text-blue-600"
                  contentEditable
                  suppressContentEditableWarning
                  aria-label="Location"
                  onBlur={(e) =>
                    handleBlur("location", e.currentTarget.textContent || "")
                  }
                  onInput={(e) =>
                    handleContentEditableChange(
                      locationRef,
                      setLocation,
                      e.currentTarget.textContent || ""
                    )
                  }
                >
                  {location}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
