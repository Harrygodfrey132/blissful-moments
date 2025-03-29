import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { usePageContext } from "../context/PageContext";
import ImageCropperModal from "../components/ImageCropperModal";
import { API } from "../utils/api";
import { GoDotFill } from "react-icons/go";

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
    const parsedDate = new Date(dateString); // ✅ Works in all versions
    if (isNaN(parsedDate.getTime())) {
      toast.error(`Invalid date format: ${dateString}`);
      return null;
    }
    return {
      day: parsedDate.getDate().toString(),
      month: parsedDate.toLocaleString("en-US", { month: "long" }),
      year: parsedDate.getFullYear().toString(),
    };
  };

  const handleDateChange = (
    type: "dob" | "death",
    field: keyof DateState,
    value: string
  ) => {
    const setDateState = type === "dob" ? setDateOfBirth : setDeathDate;
    const dateState = type === "dob" ? dateOfBirth : deathDate;

    const updatedDate = { ...dateState, [field]: value };
    setDateState(updatedDate);

    // Validation checks
    const validateDates = () => {
      // Ensure all fields are selected for both dates
      if (
        dateOfBirth.day !== "Day" &&
        dateOfBirth.month !== "Month" &&
        dateOfBirth.year !== "Year" &&
        updatedDate.day !== "Day" &&
        updatedDate.month !== "Month" &&
        updatedDate.year !== "Year"
      ) {
        const dobDate = new Date(
          parseInt(dateOfBirth.year),
          months.indexOf(dateOfBirth.month),
          parseInt(dateOfBirth.day)
        );
        const deathDate = new Date(
          parseInt(updatedDate.year),
          months.indexOf(updatedDate.month),
          parseInt(updatedDate.day)
        );

        const currentDate = new Date();

        // Validation 1: Date of birth and death date can't be the same
        if (dobDate.getTime() === deathDate.getTime()) {
          toast.error("Date of birth and death date cannot be the same.");
          return false;
        }

        // Validation 2: Death date cannot be earlier than the date of birth
        if (deathDate < dobDate) {
          toast.error("Date of death cannot be earlier than the date of birth.");
          return false;
        }

        // Validation 3: Death date cannot be in the future
        if (deathDate > currentDate) {
          toast.error("Date of death cannot be in the future.");
          return false;
        }
      }

      return true;
    };

    if (
      updatedDate.day !== "Day" &&
      updatedDate.month !== "Month" &&
      updatedDate.year !== "Year"
    ) {
      const zeroPaddedDay = String(updatedDate.day).padStart(2, "0");
      const zeroPaddedMonth = String(months.indexOf(updatedDate.month) + 1).padStart(2, "0");
      const formattedDate = `${updatedDate.year}-${zeroPaddedMonth}-${zeroPaddedDay}`;

      if (validateDates()) {
        handleBlur(type === "dob" ? "date_of_birth" : "death_date", formattedDate);
      }
    }
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

      // Include date of birth and death date in form data if they have been updated
      if (
        dateOfBirth.day !== "Day" &&
        dateOfBirth.month !== "Month" &&
        dateOfBirth.year !== "Year"
      ) {
        formData.append(
          "date_of_birth",
          `${dateOfBirth.year}-${months.indexOf(dateOfBirth.month) + 1}-${dateOfBirth.day}`
        );
      }

      if (
        deathDate.day !== "Day" &&
        deathDate.month !== "Month" &&
        deathDate.year !== "Year"
      ) {
        formData.append(
          "death_date",
          `${deathDate.year}-${months.indexOf(deathDate.month) + 1}-${deathDate.day}`
        );
      }

      const response = await axios.post(`${API_URL}${API.savePersonalDetails}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200 && response.data?.page_data) {
        setPageData(response.data.page_data);
        toast.success("Data updated successfully.");
      } else {
        toast.error("Failed to update data.");
      }
    } catch (error: any) {
      // Handle validation errors from the server
      if (error.response && error.response.status === 422) {
        const validationErrors = error.response.data.errors;
        if (validationErrors) {
          Object.keys(validationErrors).forEach((key) => {
            toast.error(`${key}: ${validationErrors[key].join(", ")}`);
          });
        } else {
          toast.error(error.response.data.message || "Validation error occurred.");
        }
      } else if (error.response) {
        // Other errors from the server
        toast.error(error.response.data.message || "Failed to update data.");
      } else {
        // Network or unknown errors
        toast.error("An unexpected error occurred.");
      }
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

      // Delay the cursor positioning to ensure it happens after the DOM update
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
    <section className="flex flex-col md:flex-row px-4 container mx-auto px-4 !max-w-6xl personal-info">
      <div className="mt-[-50px] mx-auto md:mx-0 profile-thumb">
        <div className="relative bg-[#EAEAEA] p-2 w-[330px] h-[300px]">
          <img
            src={pageData?.profile_picture || "/img/dummy.png"}
            alt="Profile"
            className="w-full h-[285px] object-cover"
          />
          <ImageCropperModal
            onSave={(file) => handleBlur("profile_picture", file)}
          />
        </div>
      </div>

      <div className="flex-1">
        <div className="space-y-4 md:pt-4 md:pb-4 md:pr-0 md:pl-4 p-0">
          <h1 className="text-3xl md:text-5xl font-playfair justify-center md:justify-start flex flex-wrap gap-4 font-medium mb-6 md:mt-0 mt-10">
            {["firstName", "middleName", "lastName"].map((field) => (
              <div
                key={field}
                ref={inputRefs[field as keyof typeof inputRefs]}
                className="border md:pt-10 pt-6 border-dashed bg-[#f8f8f8] text-blue-light-900 px-4 pb-3 border-gray-300 focus:outline-none focus:border-gray-500"
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

          <div className="flex flex-wrap gap-4 font-playfair justify-center md:justify-start items-center">
            {["dob"].map((type) => (
              <div key={type} className="flex gap-2">
                {["day", "month", "year"].map((field) => (
                  <select
                    key={field}
                    className={`p-2 border-1 bg-[#f8f8f8] text-lg h-12 border-gray-300 text-blue-light-900 font-normal ${field === "month" ? "w-[132px]" : "select-width"
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
              <GoDotFill className="text-blue-light-900" />
            </div>

            {["death"].map((type) => (
              <div key={type} className="flex gap-2">
                {["day", "month", "year"].map((field) => (
                  <select
                    key={field}
                    className={`p-2 border-1 bg-[#f8f8f8] text-lg h-12 border-gray-300 text-blue-light-900 font-normal ${field === "month" ? "w-[132px]" : "select-width"
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

          <div className="flex items-center relative font-playfair">
            <span className="material-icons-outlined absolute left-4 text-blue-light-900">
              location_on
            </span>
            <div className="w-full">
              <input
                type="text"
                className="border-1 p-2 text-lg w-full border-gray-200 !bg-[#f8f8f8] text-blue-light-900 pl-12 focus:outline-none focus:border-blue-600 focus:text-blue-600"
                value={fields.location}
                onChange={(e) => handleContentEditableChange(inputRefs.location, "location", e.target.value)}
                onBlur={(e) => handleBlur("location", e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
