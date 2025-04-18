import { useSession } from "next-auth/react";
import React, { useState, useRef, useEffect } from "react";
import { TiDelete } from "react-icons/ti";
import { usePageContext } from "../context/PageContext";
import { API } from "../utils/api";
import axios from "axios";
import { toast } from "react-toastify";
import Image from "next/image";

// Define a type for contributions
type Contribution = {
  name: string;
  message: string;
  image: string;
};

const Contributions = () => {
  const { data: session } = useSession();
  const token = session?.user?.accessToken;
  const { pageData, setPageData } = usePageContext();

  // State to toggle the Contributions feature
  const [isContributionsEnabled, setIsContributionsEnabled] = useState(true);

  // State to store the list of contributions
  const [contributions, setContributions] = useState<Contribution[]>([]);

  // State to toggle the popover form
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  // State to hold form inputs
  const [formInputs, setFormInputs] = useState<Contribution>({
    name: "",
    message: "",
    image: "",
  });

  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const [tagline, setTagline] = useState(
    "This is a place to celebrate the life of {First Name} and their impact on all of us. Please post respectfully."
  );

  // Popover reference to handle outside clicks
  const popoverRef = useRef<HTMLDivElement>(null);

  // Close popover when clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        setIsPopoverOpen(false);
      }
    };

    // Listen for click events on the document
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (pageData?.contributions) {
      const { status, tagline, contributions } = pageData.contributions;
      setIsContributionsEnabled(status === 1);
      setTagline(
        tagline ||
          "This is a place to celebrate the life of and their impact on all of us. Please post respectfully."
      );
      setContributions(contributions || []);
    }

    if (pageData?.contributions?.contribution_data) {
      const initialContributions = pageData.contributions.contribution_data.map(
        (data: any) => ({
          name: data.name,
          message: data.description,
          image: data.image
        })
      );
      setContributions(initialContributions);
    }
  }, [pageData]);

  // Handle API requests
  const sendApiRequest = async (endpoint: string, payload: object) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Check for response status
      if (response.status !== 200) {
        toast.error(`Error: ${response.statusText}`);
      } else {
        setPageData(response.data.page_data);
      }
    } catch (error: unknown) {
      let errorMessage = "API request failed";

      if (axios.isAxiosError(error) && error.response) {
        // Extract error message from Axios response
        errorMessage =
          error.response.data?.message ||
          error.response.statusText ||
          errorMessage;
      } else if (error instanceof Error) {
        // Handle other types of errors
        errorMessage = error.message;
      }

      // Pass the error message to toast
      toast.error(errorMessage);
    }
  };

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle image selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]); // ✅ Store selected file
    }
  };

  // Function to add a contribution
  const addContribution = async () => {
    if (!formInputs.name || !formInputs.message) {
      toast.warning("Please fill out both the name and message fields.");
      return;
    }

    const formData = new FormData();
    formData.append("name", formInputs.name);
    formData.append("description", formInputs.message);
    formData.append("contribution_id", pageData?.contributions?.id || "");

    // Append image if selected
    if (selectedImage) {
      formData.append("image", selectedImage);
    }

    // Optimistic UI Update (show contribution immediately)
    setContributions((prev) => [
      ...prev,
      {
        name: formInputs.name,
        message: formInputs.message,
        image: selectedImage ? URL.createObjectURL(selectedImage) : "",
      },
    ]);

    // Clear form inputs and close popover
    setFormInputs({ name: "", message: "", image: "" });
    setSelectedImage(null);
    setIsPopoverOpen(false);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}${API.storeContributionData}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Contribution added successfully!");
        setPageData(response.data.page_data);
      } else {
        throw new Error("Failed to add contribution to the server");
      }
    } catch (error) {
      console.error("Error saving contribution:", error);

      // Revert optimistic UI update if API call fails
      setContributions((prev) => prev.slice(0, -1));
      toast.error(
        "An error occurred while adding the contribution. Please try again."
      );
    }
  };

  // Function to delete a contribution
  const deleteContribution = async (index: number) => {
    const contributionId = pageData.contributions.contribution_data[index]?.id;
    try {
      // Send DELETE request to API
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}${API.deleteContribution}/${contributionId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // If the request is successful, remove the contribution from the local state
      if (response.status === 200) {
        setContributions((prev) => prev.filter((_, i) => i !== index));
      } else {
        toast.error(`Failed to delete contribution: ${response.statusText}`);
      }
    } catch (error) {
      toast.error("Failed to delete the contribution.");
    }
  };

  // Function to handle changes in the contribution (editable fields)
  const handleContributionChange = async (
    index: number,
    field: keyof Contribution,
    value: string
  ) => {
    const updatedContributions = [...contributions];
    updatedContributions[index][field] = value;
    setContributions(updatedContributions);
    // API call to update contribution on the backend
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}${API.updateContributionData}`, {
        id: pageData.contributions.contribution_data[index]?.id,
        [field]: value,
      }, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    
      if (response.data.success) {
        toast.success("Contribution updated successfully!");
      } else {
        toast.error(response.data.message || "Failed to update contribution.");
        console.warn("Backend error:", response.data.error);
      }
    } catch (error) {
      console.error("Error updating contribution:", error);
      toast.error("Something went wrong. Please try again.");
    }
    
  };

  const handleBlur = (e: React.FocusEvent<HTMLSpanElement>) => {
    const newTagline = e.currentTarget.textContent || tagline;
    setTagline(newTagline);
    sendApiRequest(API.updateContributionTagline, {
      tagline: newTagline,
      status: isContributionsEnabled,
    });
  };

  const toggleContributions = () => {
    const newStatus = !isContributionsEnabled;
    setIsContributionsEnabled(newStatus);
    sendApiRequest(API.updateContributionTagline, {
      tagline,
      status: newStatus,
    });
  };

  return (
    <div className="mb-20 mt-20">
      {/* Toggle Contributions Switch */}
      <div className="md:flex gap-5 justify-end items-center">
        {/* Button to open the popover form */}
        {isContributionsEnabled && (
          <div className="relative" ref={popoverRef}>
            <button
              onClick={() => setIsPopoverOpen(!isPopoverOpen)}
              className="text-white add-button px-6 py-2.5 font-playfair"
            >
              Add Contribution
            </button>

            {/* Inline popover form with arrow */}
            {isPopoverOpen && (
              <div className="popover-container border border-gray-300 transition-all">
                <div className="popover-arrow"></div>
                <h2 className="border-b-2 font-playfair border-blue-light-900 font-medium mb-4 text-center text-blue-light-900 text-lg font-400">
                  Create a Contribution
                </h2>
                <input
                  type="text"
                  name="name"
                  placeholder="Insert Name or Connection"
                  value={formInputs.name}
                  onChange={handleInputChange}
                  className="w-full mb-4 p-2 text-base font-playfair border-dashed border-gray-300 focus:border-gray-400 focus:ring-0 placeholder:text-blue-light-900 focus:outline-none text-blue-light-900 !bg-[#fafafa]"
                />

                <textarea
                  name="message"
                  placeholder="Please post font-playfair your personalized message"
                  value={formInputs.message}
                  onChange={handleInputChange}
                  className=" w-full mb-4 p-2 text-base resize-none font-playfair border-dashed border-gray-300 placeholder:text-blue-light-900 focus:border-gray-400 focus:ring-0 focus:outline-none text-blue-light-900 !bg-[#fafafa]"
                  rows={6}
                />

                <input
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className=" w-full mb-4 p-2 text-base resize-none font-playfair border-dashed border-gray-300 placeholder:text-blue-light-900 focus:border-gray-400 focus:ring-0 focus:outline-none text-blue-light-900 !bg-[#fafafa]"
                />
                <div className="flex items-center justify-between">
                  <button
                    onClick={addContribution}
                    className="text-white add-button px-4 py-2.5"
                  >
                    Add Contribution
                  </button>
                  <Image src="/img/dove.svg" alt="Dove" width={50} height={50} />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Toggle Switch for Enabling Contributions */}
        <div className="flex md:order-2 order-1 justify-end">
          <div className="flex items-center md:gap-8 gap-3">
            <div className="relative inline-block w-12 font-playfair align-middle select-none transition-all duration-200 ease-in">
              <input
                type="checkbox"
                id="toggle-contributions"
                checked={isContributionsEnabled}
                onChange={toggleContributions}
                className="toggle-checkbox absolute block md:w-8 md:h-8 h-6 w-6 rounded-full bg-gray-100 border-4 appearance-none cursor-pointer transition-all duration-200 ease-in-out"
              />
              <label
                htmlFor="toggle-contributions"
                className={`block overflow-hidden md:h-8 h-6 md:!w-14 !w-12 rounded-full cursor-pointer transition-all duration-200 ease-in-out ${
                  isContributionsEnabled ? "bg-blue-light-900" : "bg-gray-300"
                }`}
              ></label>
            </div>
            <span className="md:text-3xl text-xl font-playfair font-medium text-blue-light-900">
              Contributions
            </span>
          </div>
        </div>
      </div>

      {/* Editable Header */}
      <h1 className="md:text-3xl md:order-1 order-2 text-3xl flex gap-4 font-playfair font-medium mb-6 mt-6">
        <span
          className={`border relative border-dashed w-full bg-[#f8f8f8] text-blue-light-900 p-4 border-gray-300 focus:outline-none focus:border-gray-500 ${
            isContributionsEnabled ? "" : "text-gray-500 cursor-not-allowed"
          }`}
          contentEditable={isContributionsEnabled}
          suppressContentEditableWarning
          aria-label="Contributions Title"
          onBlur={handleBlur}
        >
          {tagline}
        </span>
      </h1>

      {/* Display Contributions */}
      {isContributionsEnabled && contributions.length > 0 && (
        <div className="columns-2 md:columns-4 gap-4 mt-10">
          {contributions.map((contribution, index) => (
            <div
              key={index}
              className="relative mb-4 break-inside-avoid p-4 border h-auto border-gray-300 max-w-full bg-[#f8f8f8] shadow-md"
            >
              <button
                onClick={() => deleteContribution(index)}
                className="absolute top-2 right-2 text-red-600"
                aria-label="Delete Contribution"
              >
                <TiDelete />
              </button>

              {/* Editable Contribution Block */}
              <div className="flex flex-col space-y-4">
                {contribution.image && (
                  <Image
                  src={contribution.image}
                  height={300}
                  width={300}
                  alt="Contribution Image" />
                )}
                <p
                  className="border border-dashed w-full text-lg bg-[#f8f8f8] font-playfair text-blue-light-900 p-3 border-gray-300 focus:outline-none focus:border-gray-500"
                  contentEditable={isContributionsEnabled}
                  suppressContentEditableWarning
                  onBlur={(e) =>
                    handleContributionChange(
                      index,
                      "message",
                      e.currentTarget.textContent || ""
                    )
                  }
                  role="textbox"
                  aria-label="Edit Contribution Message"
                >
                  {contribution.message}
                </p>

                <h3
                  className="border border-dashed text-lg w-full bg-[#f8f8f8] font-semibold font-playfair text-blue-light-900 p-3 border-gray-300 focus:outline-none focus:border-gray-500"
                  contentEditable={isContributionsEnabled}
                  suppressContentEditableWarning
                  onBlur={(e) =>
                    handleContributionChange(
                      index,
                      "name",
                      e.currentTarget.textContent || ""
                    )
                  }
                  role="textbox"
                  aria-label="Edit Contributor's Name"
                >
                  {contribution.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Contributions;
