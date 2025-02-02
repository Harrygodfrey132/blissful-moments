import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { API } from "../utils/api";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { usePageContext } from "../context/PageContext";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { BiLoaderAlt } from "react-icons/bi";
import { useDebounce } from "use-debounce"; // Use use-debounce hook
import { AiFillEye, AiFillEyeInvisible, AiOutlineClose } from "react-icons/ai"; // Import eye icons
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<number>(1);
  const [selectedOption, setSelectedOption] = useState<string>("public");
  const [pageName, setPageName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<any>({});
  const [backendErrors, setBackendErrors] = useState<any>({});
  const [isDomainAvailable, setDomainAvailable] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState<boolean>(false);
  const [hasChecked, setHasChecked] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const { data: session, status } = useSession();
  const { pageData, setPageId, setPageData } = usePageContext();
  const token = session?.user?.accessToken;

  useEffect(() => {
    if (status === "loading") return;
    if (!token) {
      toast.error("Unable to save settings");
      return;
    }
  }, [status, token]);

  useEffect(() => {
    if (isOpen) {
      resetForm();
      if (pageData?.name) {
        setPageName(pageData.name);
      }
    }
  }, [isOpen, pageData]);

  const resetForm = () => {
    setPageName("");
    setPassword("");
    setErrors({});
    setBackendErrors({});
    setIsChecking(false);
    setHasChecked(false);
  };

  const validateForm = () => {
    let validationErrors: any = {};
    if (!pageName) validationErrors.pageName = "Page name is required";

    if (selectedOption === "private") {
      if (!password) validationErrors.password = "Password is required";
      else if (password.length < 8)
        validationErrors.password = "Password must be at least 8 characters";
      else if (!/[A-Z]/.test(password))
        validationErrors.password = "Password must contain at least one uppercase letter";
      else if (!/[0-9]/.test(password))
        validationErrors.password = "Password must contain at least one number";
      else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password))
        validationErrors.password = "Password must contain at least one special character";
    }

    return validationErrors;
  };

  const handleNext = () => {
    const formErrors = validateForm();
    if (!formErrors.pageName) setStep(2);
    else setErrors({ pageName: "Page name is required" });
  };

  const handleBack = () => setStep(1);
  // Debounced version of checkDomainAvailability
  const [debouncedPageName] = useDebounce(pageName, 500); // 500ms debounce

  const checkDomainAvailability = useCallback(async () => {
    if (!debouncedPageName) return;
    setIsChecking(true);
    setHasChecked(true);

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}${API.checkDomainAvailability}?domain=${debouncedPageName}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      setIsChecking(false);
      setDomainAvailable(response.data.isAvailable);
    } catch (error) {
      toast.error("Error checking domain availability");
      setIsChecking(false);
      setDomainAvailable(false);
    }
  }, [debouncedPageName, token]);

  const handlePageNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPageName(e.target.value);
  };

  const handleBlur = () => {
    if (pageName) {
      checkDomainAvailability();
    }
  };

  const handlePasswordVisibilityToggle = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (debouncedPageName) {
      checkDomainAvailability();
    }
  }, [debouncedPageName, checkDomainAvailability]);

  const handleSave = async () => {
    setErrors({}); // Reset errors before validation
    setBackendErrors({});

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors); // Update errors state
      return;
    }

    setLoading(true);
    const data = {
      name: pageName,
      is_private: selectedOption === "private",
      password: selectedOption === "private" ? password : null,
      user_id: session?.user?.id,
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
      setPageId(response.data.page.id);
      setPageData(response.data.page_data);
      toast.success(response.data.message);
      onClose();
    } catch (err: any) {
      if (err.response?.data?.errors) {
        setBackendErrors(err.response.data.errors);
      } else {
        toast.error("Error saving page settings");
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white md:px-12 px-6 py-10 rounded shadow w-full m-4 md:w-1/2">
        {/* Step Progress Indicator */}
        <div className="relative mb-6 w-3/4 m-auto">
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-300 rounded transform -translate-y-1/2"></div>
          <div
            className="absolute top-1/2 left-0 h-1 bg-blue-light-900 rounded transform -translate-y-1/2 transition-all duration-300"
            style={{ width: step === 1 ? "50%" : "100%" }}
          ></div>
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

        {/* Step 1 Content */}
        {step === 1 && (
          <div>
            <div className="flex gap-2 items-center mb-5 border-b pb-4">
              <IoIosCheckmarkCircle className="text-xl text-blue-light-900" />
              <div className="text-xl font-medium text-blue-light-900">Choose custom address</div>
            </div>
            <div className="mb-4 text-gray-800">You can change this anytime later</div>

            <div className="gap-2 mt-5 items-center">
              <div className="text-black text-2xl">{process.env.NEXT_PUBLIC_BASE_URL}/memory/</div>
              <h1 className="md:text-xl mt-4  text-xl gap-4 font-medium">
                <input
                  className="border w-full border-dashed text-blue-900 p-2 border-gray-300 focus:outline-none focus:border-gray-500"
                  type="text"
                  value={pageName}
                  onChange={handlePageNameChange}
                  placeholder="your-address"
                  aria-label="your-address"
                  onBlur={handleBlur}
                />
              </h1>
            </div>

            {isChecking && (
              <div className="flex gap-1 text-sm items-center">
                <BiLoaderAlt className="text-green-400 animate-spin h-4 w-4" />
                Checking availability...
              </div>
            )}

            {hasChecked && !isChecking && (
              <div className={`text-sm italic mt-4 flex gap-1 ${isDomainAvailable ? "text-green-400" : "text-red-400"}`}>
                <IoIosCheckmarkCircle className={`text-xl ${isDomainAvailable ? "text-green-400" : "text-red-400"}`} />
                {isDomainAvailable ? "Congrats - this domain is available!" : "Sorry - this domain is not available!"}
              </div>
            )}

            <div className="flex justify-end mt-6 gap-4">
              {pageData && (
                <button className="bg-gray-200 px-6 py-2 rounded font-semibold "
                  onClick={onClose}
                >
                  Close
                </button>
              )}
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

        {/* Step 2 Content */}
        {step === 2 && (
          <div className="w-3/4 m-auto">
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
                    {selectedOption === option && <IoIosCheckmarkCircle className="text-white" />}
                  </span>
                  <span className="ml-3">{option === "public" ? "Public" : "Private"}</span>
                </label>
              ))}
            </div>

            {selectedOption === "private" && (
              <div>
                <div className="mt-4 relative">
                  <input
                    type={showPassword ? "text" : "password"} // Change input type based on showPassword state
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border p-2 mt-2 rounded"
                  />
                  <button
                    type="button"
                    onClick={handlePasswordVisibilityToggle} // Toggle password visibility
                    className="absolute right-3 top-4 text-gray-500"
                  >
                    {showPassword ? (
                      <AiFillEyeInvisible className="w-6 h-6" />
                    ) : (
                      <AiFillEye className="w-6 h-6" />
                    )}
                  </button>
                </div>
                {errors.password && <div className="text-sm text-red-600">{errors.password}</div>}
              </div>
            )}

            <div className="flex justify-end mt-6">
              <button onClick={handleBack} className="px-6 py-2 text-white bg-gray-500 hover:bg-gray-600 rounded">Back</button>
              <button
                disabled={loading}
                onClick={handleSave}
                className={`ml-4 px-6 py-2 rounded font-semibold ${loading ? "bg-gray-300 text-gray-600 cursor-not-allowed" : "bg-blue-light-900 text-white hover:bg-blue-light-900"}`}
              >
                {loading ? <BiLoaderAlt className="animate-spin h-6 w-6" /> : "Save"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
