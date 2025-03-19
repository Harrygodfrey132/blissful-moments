import { useSession } from "next-auth/react";
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { toast } from "react-toastify";
import { API } from "../utils/api";

const ContributionView = ({ contributionData, userId }) => {
  const [isContributionsEnabled, setIsContributionsEnabled] = useState(true);
  const [contributions, setContributions] = useState([]);
  const [formInputs, setFormInputs] = useState({ name: "", message: "" });
  const [additionalFormInputs, setAdditionalFormInputs] = useState({
    fullName: "",
    email: "",
  });
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSecondFormOpen, setIsSecondFormOpen] = useState(false);
  const [tagline, setTagline] = useState(contributionData?.tagline);
  const [selectedImage, setSelectedImage] = useState(null);
  const popoverRef = useRef(null);

  useEffect(() => {
    if (Array.isArray(contributionData)) {
      setContributions(
        contributionData?.contribution_data.map((data) => ({
          name: data.name,
          message: data.description,
          image: data.image,
        }))
      );
    } else {
      setContributions(
        contributionData?.contribution_data.map((data) => ({
          name: data.name,
          message: data.description,
          image: data.image,
        }))
      );
    }
  }, [contributionData]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setIsFormOpen(false);
        setIsSecondFormOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const sendApiRequest = async (endpoint, payload, isMultipart = false) => {
    try {
      const headers = isMultipart
        ? { "Content-Type": "multipart/form-data" }
        : { "Content-Type": "application/json" };

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`,
        payload,
        { headers }
      );

      if (response.status === 200) {
        toast.success("Contribution request submitted successfully.");
        return response.data;
      } else {
        throw new Error(response.statusText);
      }
    } catch (error) {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.message || error.message
        : "Something went wrong!";
      toast.error(message);
      throw error;
    }
  };

  const handleInputChange = (e, setState) => {
    const { name, value } = e.target;

    setState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const maxSizeMB = 5;
    const file = e.target.files[0]; // Get the first file

    if (file) {
      if (file.size > maxSizeMB * 1024 * 1024) {
        toast.warning(`File exceeds ${maxSizeMB}MB and was not added.`);
      } else {
        setSelectedImage(file);
      }
    }

    // Clear the input field to allow re-uploading the same image
    e.target.value = "";
  };

  const handleFirstFormSubmit = () => {
    if (formInputs.name && formInputs.message) {
      setIsFormOpen(false);
      setTimeout(() => {
        setIsSecondFormOpen(true);
      }, 10);
    } else {
      toast.warning("Please fill out both the name and message fields.");
    }
  };

  const handleFinalSubmit = async () => {
    if (additionalFormInputs.fullName && additionalFormInputs.email) {
      try {
        const formData = new FormData();
        formData.append("name", formInputs.name);
        formData.append("description", formInputs.message);
        formData.append("fullName", additionalFormInputs.fullName);
        formData.append("email", additionalFormInputs.email);
        formData.append("contribution_id", contributionData.id);
        formData.append("user_id", userId);

        // Append the single selected image
        if (selectedImage) {
          formData.append("image", selectedImage);
        }

        // Send API request with FormData
        await sendApiRequest(
          `${API.storeUserContributionData}`,
          formData,
          true
        );

        // Reset form after successful submission
        setContributions((prev) => [...prev, formInputs]);
        setFormInputs({ name: "", message: "" });
        setAdditionalFormInputs({ fullName: "", email: "" });
        setSelectedImage(null); // Clear the selected image
        setIsSecondFormOpen(false);
      } catch (error) {
        toast.error("Failed to submit contribution.");
      }
    } else {
      toast.warning("Please provide your full name and email.");
    }
  };

  return (
    <div className="mb-20 mt-20 vu-contribution">
      <div className="flex items-center justify-between">
        <div className="text-blue-light-900 font-playfair md:text-4xl text-3xl border-b-4 border-blue-light-800 font-400 inline-block">
          Contributions
        </div>
        {isContributionsEnabled && (
          <div className="relative" ref={popoverRef}>
            <button
              onClick={() => setIsFormOpen(true)}
              className="text-white add-button px-6 py-2.5 font-playfair"
            >
              Add Contribution
            </button>

            {isFormOpen && (
              <div className="popover-container popover-contribution border border-gray-300 transition-all">
                <div className="popover-arrow"></div>
                <h2 className="border-b-2 font-playfair border-blue-light-900 font-medium mb-4 text-center text-lg">
                  Create a Contribution
                </h2>
                <input
                  type="text"
                  name="name"
                  placeholder="Insert Name or Connection"
                  value={formInputs.name}
                  onChange={(e) => handleInputChange(e, setFormInputs)}
                  className="w-full mb-4 p-2 text-base font-playfair border-dashed border-gray-300 placeholder:text-blue-light-900"
                />
                <textarea
                  name="message"
                  placeholder="Write your message"
                  value={formInputs.message}
                  onChange={(e) => handleInputChange(e, setFormInputs)}
                  className="w-full mb-4 p-2 text-base resize-none font-playfair border-dashed border-gray-300 placeholder:text-blue-light-900"
                  rows={6}
                />

                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  className="w-full mb-4 p-2 text-base resize-none font-playfair border-dashed border-gray-300 placeholder:text-blue-light-900"
                  onChange={handleImageUpload}
                />
                <p className="text-sm text-gray-500 mb-2">Max up to 5MB.</p>

                <button
                  type="button"
                  onClick={handleFirstFormSubmit}
                  className="text-white add-button px-4 py-2.5"
                >
                  Next
                </button>
              </div>
            )}

            {isSecondFormOpen && (
              <div className="popover-container border border-gray-300 transition-all">
                <div className="popover-arrow"></div>
                <h2 className="border-b-2 font-playfair border-blue-light-900 font-medium mb-4 text-center text-lg">
                  Provide Your Details
                </h2>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={additionalFormInputs.fullName}
                  onChange={(e) =>
                    handleInputChange(e, setAdditionalFormInputs)
                  }
                  className="w-full mb-4 p-2 text-base font-playfair border-dashed border-gray-300 placeholder:text-blue-light-900"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={additionalFormInputs.email}
                  onChange={(e) =>
                    handleInputChange(e, setAdditionalFormInputs)
                  }
                  className="w-full mb-4 p-2 text-base font-playfair border-dashed border-gray-300 placeholder:text-blue-light-900"
                />
                <button
                  onClick={handleFinalSubmit}
                  className="text-white add-button px-4 py-2.5"
                >
                  Submit
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <h1 className="md:text-3xl relative text-3xl font-playfair font-medium mb-6 mt-6">
        <div className="border bg-[#f8f8f8] font-playfair w-full text-left text-blue-light-900 p-4 border-gray-300 ">
          {tagline}
        </div>
        <Image
          className="absolute right-0 bottom-0 w-[50px]"
          src="/img/dove.svg"
          alt="Dove"
          width={50}
          height={50}
        />
      </h1>

      {isContributionsEnabled && contributions.length > 0 && (
        <div className="columns-2 md:columns-4 gap-4 mt-10">
          {contributions.map((contribution, index) => (
            <div
              key={index}
              className="relative mb-4 break-inside-avoid text-lg text-left p-2 border h-auto border-gray-300 bg-[#f8f8f8] shadow-md"
            >
              {/* Show Image if Available */}
              {contribution.image && (
                <Image
                  src={contribution.image}
                  alt="Contribution Image"
                  width={300}
                  height={200}
                  className="w-full h-auto rounded-t-lg"
                  unoptimized
                />
              )}
              <p className="border-dashed border-gray-300 bg-[#f8f8f8] font-playfair text-blue-light-900 p-3">
                {contribution.message}
                <div className="text-blue-light-900 font-medium py-3">
                  {"- " + contribution.name}
                </div>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContributionView;
