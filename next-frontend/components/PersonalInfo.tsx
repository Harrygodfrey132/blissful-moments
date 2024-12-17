import { useState, ChangeEvent, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { API } from "../utils/api";
import { useSession } from "next-auth/react";
import { usePageContext } from "../context/PageContext";

interface DateState {
  day: string;
  month: string;
  year: string;
}

export default function PersonalInfo() {
  const { pageData, setPageData } = usePageContext();
  const { data: session } = useSession();
  console.log(pageData);

  const [firstName, setFirstName] = useState<string>("");
  const [middleName, setMiddleName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [location, setLocation] = useState<string>("");

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

  // Debounce timer states
  const [dobTimer, setDobTimer] = useState<NodeJS.Timeout | null>(null);
  const [deathTimer, setDeathTimer] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (pageData) {
      setFirstName(pageData.first_name || "");
      setMiddleName(pageData.middle_name || "");
      setLastName(pageData.last_name || "");
      setLocation(pageData.address || "");

      // Ensure date_of_birth and death_date are correctly formatted and handled
      if (pageData.date_of_birth) {
        const [year, month, day] = pageData.date_of_birth.split("-");
        if (year && month && day) {
          setDateOfBirth({ day, month: months[parseInt(month, 10) - 1], year });
        } else {
          toast.error("Invalid date_of_birth format", pageData.date_of_birth);
        }
      }

      if (pageData.death_date) {
        const [year, month, day] = pageData.death_date.split("-");
        if (year && month && day) {
          setDeathDate({ day, month: months[parseInt(month, 10) - 1], year });
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

  const handleInputChange = (
    setter: React.Dispatch<React.SetStateAction<string>>,
    value: string
  ) => {
    setter(value);
  };

  const handleBlur = async (field: string, value: string) => {
    try {
      const response = await axios.post(
        `${API_URL}${API.savePersonalDetails}`,
        { [field]: value },
        {
          headers: {
            "Content-Type": "application/json",
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
    if (type === "dob") {
      setDateOfBirth((prev) => ({ ...prev, [field]: value }));
      if (dobTimer) clearTimeout(dobTimer); // Clear existing debounce timer
      const timer = setTimeout(() => {
        if (isCompleteDate(dateOfBirth)) {
          const formattedDate = getFormattedDate(dateOfBirth);
          handleBlur("date_of_birth", formattedDate);
        }
      }, 1000); // Debounce delay
      setDobTimer(timer);
    } else {
      setDeathDate((prev) => ({ ...prev, [field]: value }));
      if (deathTimer) clearTimeout(deathTimer); // Clear existing debounce timer
      const timer = setTimeout(() => {
        if (isCompleteDate(deathDate)) {
          const formattedDate = getFormattedDate(deathDate);
          handleBlur("death_date", formattedDate);
        }
      }, 1000); // Debounce delay
      setDeathTimer(timer);
    }
  };

  const isCompleteDate = (date: DateState): boolean => {
    return date.day !== "Day" && date.month !== "Month" && date.year !== "Year";
  };

  if (!token) {
    toast.error("User is not authenticated.");
    return <div>Loading...</div>;
  }
  return (
    <section className="md:flex gap-12 md:px-12">
      {/* Profile Image Section */}
      <div className="mt-[-80px]">
        <div className="relative shadow p-2">
          <img
            src="img/profile-img.png"
            alt="Profile"
            className="w-60 h-60 m-auto object-cover shadow"
          />
          <label className="absolute border border-black bottom-4 text-sm md:right-4 right-20 bg-white py-2 pr-8 px-4 cursor-pointer">
            Change Image
            <span className="material-icons-outlined absolute ml-1">photo_camera</span>
            <input type="file" className="hidden" />
          </label>
        </div>
      </div>

      {/* Editable Content Section */}
      <div>
        <div className="space-y-4 p-4">
          {/* Editable Name */}
          <h1 className="md:text-4xl text-2xl flex gap-4 font-medium mb-6 mt-4">
            <span
              className="border border-dashed text-blue-900 p-4 border-gray-300 focus:outline-none focus:border-gray-500"
              contentEditable
              suppressContentEditableWarning
              aria-label="First Name"
              onBlur={(e) => handleBlur("firstName", e.currentTarget.textContent || "")}
              onInput={(e) => handleInputChange(setFirstName, e.currentTarget.textContent || "")}
            >
              {firstName}
            </span>
            <span
              className="border border-dashed text-blue-900 p-4 border-gray-300 focus:outline-none focus:border-gray-500"
              contentEditable
              suppressContentEditableWarning
              aria-label="Middle Name"
              onBlur={(e) => handleBlur("middleName", e.currentTarget.textContent || "")}
              onInput={(e) => handleInputChange(setMiddleName, e.currentTarget.textContent || "")}
            >{middleName}</span>
            <span
              className="border border-dashed text-blue-900 p-4 border-gray-300 focus:outline-none focus:border-gray-500"
              contentEditable
              suppressContentEditableWarning
              aria-label="Last Name"
              onBlur={(e) => handleBlur("lastName", e.currentTarget.textContent || "")}
              onInput={(e) => handleInputChange(setLastName, e.currentTarget.textContent || "")}
            >
              {lastName}
            </span>
          </h1>

          <div className="md:flex justify-between items-center gap-5">
            {/* Editable Date Fields for Date of Birth */}
            <div className="md:flex items-center gap-4">
              <div className="flex items-center space-x-4">
                <select
                  className="p-2 w-24 border-2 h-12  border-gray-300 text-blue-900 font-medium"
                  value={dateOfBirth.day}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) => handleDateChange("dob", "day", e.target.value)}
                >
                  <option>Day</option>
                  {days.map((day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </select>
                <select
                  className="p-2 w-24 border-2 h-12  border-gray-300 text-blue-900 font-medium"
                  value={dateOfBirth.month}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) => handleDateChange("dob", "month", e.target.value)}
                >
                  <option>Month</option>
                  {months.map((month, index) => (
                    <option key={index} value={month}>
                      {month}
                    </option>
                  ))}
                </select>
                <select
                  className="p-2 border-2 h-12  border-gray-300 text-blue-900 font-medium w-[100px]"
                  value={dateOfBirth.year}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) => handleDateChange("dob", "year", e.target.value)}
                >
                  <option>Year</option>
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <svg className="w-6 h-6 text-blue-900" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M438.6 150.6c12.5-12.5 12.5-32.8 0-45.3l-96-96c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.7 96 32 96C14.3 96 0 110.3 0 128s14.3 32 32 32l306.7 0-41.4 41.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l96-96zm-333.3 352c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 416 416 416c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0 41.4-41.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-96 96c-12.5 12.5-12.5 32.8 0 45.3l96 96z"></path></svg>
            </div>
            {/* Editable Date Fields for Death Date */}
            <div className="flex items-center gap-4">
              <div className="flex items-center space-x-4">
                <select
                  className="p-2 w-24 border-2 h-12  border-gray-300 text-blue-900 font-medium"
                  value={deathDate.day}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) => handleDateChange("death", "day", e.target.value)}
                >
                  <option>Day</option>
                  {days.map((day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </select>
                <select
                  className="p-2 w-24 border-2 h-12  border-gray-300 text-blue-900 font-medium"
                  value={deathDate.month}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) => handleDateChange("death", "month", e.target.value)}
                >
                  <option>Month</option>
                  {months.map((month, index) => (
                    <option key={index} value={month}>
                      {month}
                    </option>
                  ))}
                </select>
                <select
                  className="p-2 h-12  border-2 border-gray-300 text-blue-900 font-medium w-[100px]"
                  value={deathDate.year}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) => handleDateChange("death", "year", e.target.value)}
                >
                  <option>Year</option>
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
            <span className="material-icons-outlined absolute left-4 text-blue-900">
              location_on
            </span>
            <input
              className="border-2 p-3 border-gray-300 text-blue-900 pl-12 w-full md:min-w-[690px] focus:outline-none focus:border-blue-600 focus:text-blue-600"
              value={location}
              onChange={(e) => handleInputChange(setLocation, e.target.value)}
              onBlur={(e) => handleBlur("location", e.target.value)}
              aria-label="Location"
            />
          </div>

        </div>
      </div>
    </section>
  );
}