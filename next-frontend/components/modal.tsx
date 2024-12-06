import axios from "axios";
import React, { useState, useEffect } from "react";
import { API } from "../utils/api";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { ROUTES } from "../utils/routes";
import Link from "next/link";
import { usePageContext } from "../context/PageContext";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [selectedOption, setSelectedOption] = useState<string>("public"); // Default to "public"
  const [pageName, setPageName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<any>({});
  const { data: session, status } = useSession();
  const [backendErrors, setBackendErrors] = useState<any>({});
  const { setPageId } = usePageContext();

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

  // Prevent rendering until session is loaded


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

    // If there are errors, prevent form submission
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
      <div className="bg-white px-8 py-8 rounded shadow w-[650px]">
        <div className="text-xl font-semibold text-slate-900 mb-7">Page configuration</div>

        {/* Radio Buttons */}
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

        {/* Common Fields */}
        <div className="mt-6">
          <div className="mt-4">
            <label htmlFor="url" className="block text-sm font-medium text-gray-900">
              Set Page Name:
            </label>
            <div className="flex items-center mt-2 bg-gray-50 border border-gray-300 rounded">
              {/* Prefix Text */}
              <span className="flex items-center px-3 py-2 text-gray-700 bg-gray-200 border-r border-gray-300 text-sm">
                {process.env.NEXT_PUBLIC_BASE_URL}
              </span>
              {/* Input Field */}
              <input
                type="text"
                id="url"
                placeholder="Enter Page Name"
                value={pageName}
                onChange={(e) => setPageName(e.target.value)}
                className="flex-1 bg-gray-50 text-gray-900 text-sm rounded-r focus:ring-primary-600 focus:border-primary-600 block p-2.5 border-0"
              />
            </div>
            {errors.pageName && <div className="text-red-500 text-sm mt-2">{errors.pageName}</div>}
            {backendErrors.name && <div className="text-red-500 text-sm mt-2">{backendErrors.name.join(", ")}</div>}
          </div>
          {/* Conditional Password Field */}
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
              {backendErrors.password && <div className="text-red-500 text-sm mt-2">{backendErrors.password.join(", ")}</div>}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="gap-4 flex items-center justify-end mt-6">
          <Link
            href={ROUTES.Dashboard}
            className="px-4 py-2 bg-gray-300 rounded shadow hover:bg-gray-400"
          >
            Cancel
          </Link>

          <button
            onClick={handleSave}
            className="px-6 w-32 bg-blue-light-900 text-white py-2 rounded hover:bg-blue-light-900"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
