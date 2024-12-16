import React, { useState, useEffect } from "react";
import axios from "axios";
import { API } from "../utils/api";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { ROUTES } from "../utils/routes";
import Link from "next/link";
import { usePageContext } from "../context/PageContext";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { BiLoaderAlt } from "react-icons/bi";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<number>(1); // Current step
  const [selectedOption, setSelectedOption] = useState<string>("public"); // Default to "public"
  const [pageName, setPageName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<any>({});
  const { data: session, status } = useSession();
  const [backendErrors, setBackendErrors] = useState<any>({});
  const { setPageId } = usePageContext();

  const handleNext = () => {
    const formErrors = validateForm();
    if (!formErrors.pageName) {
      setStep(2);
    } else {
      setErrors({ pageName: "Page name is required" });
    }
  };

  const handleBack = () => setStep(1);
  const token = session?.user?.accessToken;

  // Avoid rendering before the session is loaded or if token is absent
  useEffect(() => {
    if (status === "loading") return; // Prevent rendering while loading
    if (!token) {
      toast.error("Something went wrong. Unable to save settings");
      return;
    }
  }, [status, token]);

  // Reset fields when modal opens
  useEffect(() => {
    if (isOpen) {
      setPageName(""); // Reset page name and password when modal opens
      setPassword("");
      setErrors({});
      setBackendErrors({});
    }
  }, [isOpen]);

  // Frontend validation function
  const validateForm = () => {
    let validationErrors: any = {};
    // Validate page name
    if (!pageName) validationErrors.pageName = "Page name is required";

    // Validate password if private
    if (selectedOption === "private") {
      if (!password) validationErrors.password = "Password is required";
      else if (password.length < 8) validationErrors.password = "Password must be at least 8 characters";
    }

    // Return errors object
    return validationErrors;
  };

  const handleSave = async () => {
    // Clear previous errors
    setBackendErrors({});
    setErrors({});

    // Perform frontend validation
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setLoading(true);

    const data = {
      name: pageName,
      is_private: selectedOption === "private",
      password: selectedOption === "private" ? password : null,
      user_id: session?.user?.id
    };

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}${API.savePageSettings}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { id } = response.data.page;
      setPageId(id);
      toast.success(response.data.message);
      onClose();

    } catch (err: any) {
      if (err.response && err.response.data && err.response.data.errors) {
        setBackendErrors(err.response.data.errors);
      } else {
        toast.error("Error saving page settings:", err);
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;  // Return null if modal isn't open

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white px-12 py-10 rounded shadow w-1/2">
        {/* Step Progress Indicator */}
        <div className="relative mb-6 w-3/4 m-auto">
          {/* Progress Bar Background */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-300 rounded transform -translate-y-1/2"></div>
          {/* Progress Bar Fill */}
          <div
            className="absolute top-1/2 left-0 h-1 bg-blue-light-900 rounded transform -translate-y-1/2 transition-all duration-300"
            style={{ width: step === 1 ? "50%" : "100%" }}
          ></div>
          {/* Step Circles */}
          <div className="flex justify-between relative z-10">
            {/* Step 1 */}
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 mt-6 rounded-full flex items-center justify-center text-lg font-bold transition-all duration-300 ${step >= 1
                    ? "bg-blue-light-900 text-white border-2 border-blue-light-900 shadow-md"
                    : "bg-gray-200 text-gray-500 border-2 border-gray-300"
                  }`}
              >
                1
              </div>
              <span className="text-sm mt-2 font-medium text-gray-600">Step 1</span>
            </div>
            {/* Step 2 */}
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 mt-6 rounded-full flex items-center justify-center text-lg font-bold transition-all duration-300 ${step === 2
                    ? "bg-blue-light-900 text-white border-4 border-blue-light-900 shadow-md"
                    : "bg-gray-200 text-gray-500 border-4 border-gray-300"
                  }`}
              >
                2
              </div>
              <span className="text-sm mt-2 font-medium text-gray-600">Step 2</span>
            </div>
          </div>
        </div>

        {/* Step Content */}
        {step === 1 && (
          <div>
            <div className="flex gap-2 items-center mb-5 border-b pb-4">
              <IoIosCheckmarkCircle className="text-xl text-blue-light-900" />
              <div className="text-xl font-medium text-blue-light-900">Choose custom address</div>
            </div>
            <div className="mb-4 text-gray-800">You can also change this anytime later</div>

            <div>
              <div className="flex gap-2 mt-5 items-center">
                <div className="text-black text-2xl">{process.env.NEXT_PUBLIC_BASE_URL}/</div>

                <h1 className="md:text-xl text-xl  gap-4 font-medium">
                  <div
                    className="border border-dashed text-blue-900 p-2 border-gray-300 focus:outline-none focus:border-gray-500"
                    contentEditable
                    suppressContentEditableWarning
                    aria-label="your-address"
                    onInput={(e) => setPageName(e.currentTarget.textContent || "")} // Update pageName with the input
                  >
                    {pageName || "your-address"}
                  </div>

                </h1>
              </div>
              <div className="flex gap-1 text-sm items-center">
                <div className="animate-spin h-4 w-4">
                  <BiLoaderAlt className="text-green-400" />
                </div>
                Checking availability...
              </div>
              <div className="text-sm italic text-green-400 mt-4 flex gap-1">
                <IoIosCheckmarkCircle className="text-xl text-green-400" />
                Congrats - this domain is available!
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                disabled={!pageName.trim()}
                onClick={handleNext}
                className={`px-6 py-2 rounded font-semibold ${!pageName.trim()
                    ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                    : "bg-blue-light-900 text-white hover:bg-blue-light-900"
                  }`}
              >
                Next
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="w-3/4 m-auto">
            {/* Public/Private Option */}
            <div className="text-base mb-4 mt-4 font-semibold">Page configuration</div>
            <div className="mt-4 flex gap-4">
              {["public", "private"].map((option) => (
                <label key={option} className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="option"
                    value={option}
                    checked={selectedOption === option}
                    onChange={() => setSelectedOption(option)}
                    className="hidden"
                  />
                  <span
                    className={`w-5 h-5 border-2 rounded-full flex items-center justify-center transition-colors ${selectedOption === option
                      ? "bg-blue-light-900 border-blue-light-900"
                      : "bg-white border-gray-400"
                      }`}
                  >
                    {selectedOption === option && (
                      <span className="w-3 h-3 bg-white rounded-full"></span>
                    )}
                  </span>
                  <span className="ml-2 text-sm font-medium capitalize">{option}</span>
                </label>
              ))}
            </div>

            {/* Password Field (Private Option) */}
            {selectedOption === "private" && (
              <div className="mt-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                  Password:
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                />
                {errors.password && <div className="text-red-500 text-sm mt-2">{errors.password}</div>}
              </div>
            )}

            <div className="mt-12 flex justify-between">
              <button
                onClick={handleBack}
                className="px-4 py-2 bg-gray-300 rounded shadow hover:bg-gray-400"
              >
                Back
              </button>
              <button
                onClick={handleSave}
                disabled={selectedOption === "public" ? !pageName.trim() : !password.trim()}
                className={`px-6 w-32 bg-blue-light-900 text-white py-2 rounded  ${selectedOption === "private" && !password.trim() ? "cursor-not-allowed text-black bg-gray-300 text-gray-600" : ""}`}
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
