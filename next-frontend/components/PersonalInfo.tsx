import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { format, parse, isValid } from "date-fns";
import { useSession } from "next-auth/react";
import { usePageContext } from "../context/PageContext";
import ImageCropperModal from "../components/ImageCropperModal";
import { API } from "../utils/api";

interface DateState {
  day: string;
  month: string;
  year: string;
}

export default function PersonalInfo() {
  const { pageData, setPageData } = usePageContext();
  const { data: session } = useSession();

  const token = session?.user?.accessToken;
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

  const [fields, setFields] = useState({
    firstName: "First Name",
    middleName: "",
    lastName: "Last Name",
    location: "Location",
  });

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

  const inputRefs = {
    firstName: useRef<HTMLDivElement>(null),
    middleName: useRef<HTMLDivElement>(null),
    lastName: useRef<HTMLDivElement>(null),
    location: useRef<HTMLDivElement>(null),
  };

  const years = Array.from({ length: 125 }, (_, index) => new Date().getFullYear() - index);
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

  const parseAndFormatDate = (dateString: string): DateState | null => {
    const parsedDate = parse(dateString, "yyyy-MM-dd", new Date());
    if (!isValid(parsedDate)) {
      toast.error(`Invalid date format: ${dateString}`);
      return null;
    }
    return {
      day: format(parsedDate, "dd"),
      month: format(parsedDate, "MMMM"),
      year: format(parsedDate, "yyyy"),
    };
  };

  const handleDateChange = (
    type: "dob" | "death",
    field: keyof DateState,
    value: string
  ) => {
    const setDateState = type === "dob" ? setDateOfBirth : setDeathDate;
    setDateState((prev) => ({ ...prev, [field]: value }));
  };

  const handleBlur = async (field: string, value: string | File) => {
    try {
      const formData = new FormData();

      // Add the field value (for regular text fields)
      if (value instanceof File) {
        formData.append(field, value);
      } else {
        formData.append(field, value);
      }

      const response = await axios.post(`${API_URL}${API.savePersonalDetails}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200 && response.data?.page_data) {
        setPageData(response.data.page_data);
      } else {
        toast.error("Failed to update data.");
      }
    } catch (error) {
      toast.error(`Error updating ${field}`);
    }
  };

  const handleContentEditableChange = (
    ref: React.RefObject<HTMLDivElement>,
    field: string,
    value: string
  ) => {
    setFields((prev) => ({ ...prev, [field]: value }));

    if (ref.current && document.getSelection()) {
      const selection = window.getSelection();
      const range = selection?.getRangeAt(0);
      const cursorPos = range?.startOffset || 0;

      setTimeout(() => {
        if (ref.current?.firstChild) {
          const cursorRange = document.createRange();
          cursorRange.setStart(ref.current.firstChild, cursorPos);
          selection?.removeAllRanges();
          selection?.addRange(cursorRange);
        }
      }, 0);
    }
  };

  useEffect(() => {
    if (pageData) {
      setFields({
        firstName: pageData.first_name || "First Name",
        middleName: pageData.middle_name || "",
        lastName: pageData.last_name || "Last Name",
        location: pageData.address || "Location",
      });

      if (pageData.date_of_birth) {
        const formattedDob = parseAndFormatDate(pageData.date_of_birth);
        if (formattedDob) setDateOfBirth(formattedDob);
      }

      if (pageData.death_date) {
        const formattedDeathDate = parseAndFormatDate(pageData.death_date);
        if (formattedDeathDate) setDeathDate(formattedDeathDate);
      }
    }
  }, [pageData]);

  return (
    <section className="flex flex-col md:flex-row px-4 md:px-12 personal-info">
      <div className="mt-[-50px] mx-auto md:mx-0 profile-thumb">
        <div className="relative bg-[#EAEAEA] p-2 w-[352px]">
          <img
            src={pageData?.profile_picture || "/img/dummy.png"}
            alt="Profile"
            className="w-full h-auto object-cover"
          />
          <ImageCropperModal
            onSave={(file) => handleBlur("profile_picture", file)}
          />
        </div>
      </div>

      <div className="flex-1">
        <div className="space-y-4 md:p-4 p-0">
          <h1 className="text-3xl md:text-5xl font-playfair flex flex-wrap gap-4 font-medium mb-6 mt-4">
            {["firstName", "middleName", "lastName"].map((field) => (
              <div
                key={field}
                ref={inputRefs[field as keyof typeof inputRefs]}
                className="border border-dashed bg-[#f8f8f8] text-blue-light-900 p-4 border-gray-300 focus:outline-none focus:border-gray-500"
                contentEditable
                suppressContentEditableWarning
                onInput={(e) =>
                  handleContentEditableChange(
                    inputRefs[field as keyof typeof inputRefs],
                    field,
                    e.currentTarget.textContent || ""
                  )
                }
                onBlur={(e) =>
                  handleBlur(field, e.currentTarget.textContent || "")
                }
              >
                {fields[field as keyof typeof fields]}
              </div>
            ))}
          </h1>

          <div className="flex flex-wrap gap-4 items-center">
            {["dob"].map((type) => (
              <div key={type} className="flex gap-2">
                {["day", "month", "year"].map((field) => (
                  <select
                    key={field}
                    className={`p-2 border-2 bg-[#f8f8f8] text-xl h-12 border-gray-300 text-blue-light-900 font-medium ${field === "month" ? "w-30" : "w-24"
                      }`}
                    value={type === "dob" ? dateOfBirth[field as keyof DateState] : deathDate[field as keyof DateState]}
                    onChange={(e) =>
                      handleDateChange(
                        type as "dob" | "death",
                        field as keyof DateState,
                        e.target.value
                      )
                    }
                  >
                    <option value="">
                      {field.charAt(0).toUpperCase() + field.slice(1)}
                    </option>
                    {(field === "day"
                      ? days
                      : field === "month"
                        ? months
                        : years
                    ).map((option, idx) => (
                      <option key={idx} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ))}
              </div>
            ))}

            {/* Divider Icon */}
            <div className="flex items-center">
              <svg
                className="w-6 h-6 text-blue-light-900 mx-4"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path d="M438.6 150.6c12.5-12.5 12.5-32.8 0-45.3l-96-96c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.7 96 32 96C14.3 96 0 110.3 0 128s14.3 32 32 32l306.7 0-41.4 41.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l96-96zm-333.3 352c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 416 416 416c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0 41.4-41.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-96 96c-12.5 12.5-12.5 32.8 0 45.3l96 96z"></path>
              </svg>
            </div>

            {["death"].map((type) => (
              <div key={type} className="flex gap-2">
                {["day", "month", "year"].map((field) => (
                  <select
                    key={field}
                    className={`p-2 border-2 bg-[#f8f8f8] text-xl h-12 border-gray-300 text-blue-light-900 font-medium ${field === "month" ? "w-30" : "w-24"
                    }`}
                    value={type === "dob" ? dateOfBirth[field as keyof DateState] : deathDate[field as keyof DateState]}
                    onChange={(e) =>
                      handleDateChange(
                        type as "dob" | "death",
                        field as keyof DateState,
                        e.target.value
                      )
                    }
                  >
                    <option value="">
                      {field.charAt(0).toUpperCase() + field.slice(1)}
                    </option>
                    {(field === "day"
                      ? days
                      : field === "month"
                        ? months
                        : years
                    ).map((option, idx) => (
                      <option key={idx} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ))}
              </div>
            ))}
          </div>


          <div className="flex items-center relative">
            <span className="material-icons-outlined absolute left-4 text-blue-light-900">
              location_on
            </span>
            <div
              ref={inputRefs.location}
              className="border-2 p-3 text-xl md:w-[87%] w-full border-gray-300 bg-[#f8f8f8] text-blue-light-900 pl-12 focus:outline-none focus:border-blue-600 focus:text-blue-600"
              contentEditable
              suppressContentEditableWarning
              onInput={(e) =>
                handleContentEditableChange(
                  inputRefs.location,
                  "location",
                  e.currentTarget.textContent || ""
                )
              }
              onBlur={(e) =>
                handleBlur("location", e.currentTarget.textContent || "")
              }
            >
              {fields.location}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
