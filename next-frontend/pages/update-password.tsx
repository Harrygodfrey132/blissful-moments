import Sidebar from '../components/Sidebar';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { ROUTES } from '../utils/routes';
import { API } from '../utils/api';

const UpdatePasswordPage = () => {
  const { data: session } = useSession();
  const token = session?.user?.accessToken;

  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    apiError: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '', apiError: '' })); // Clear field-specific and API errors
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { currentPassword, newPassword, confirmPassword } = formData;

    // Reset errors
    setErrors({ currentPassword: '', newPassword: '', confirmPassword: '', apiError: '' });

    // Client-side validation
    let hasError = false;
    const newErrors = { currentPassword: '', newPassword: '', confirmPassword: '', apiError: '' };

    if (!currentPassword) {
      newErrors.currentPassword = 'Current password is required.';
      hasError = true;
    }
    if (!newPassword) {
      newErrors.newPassword = 'New password is required.';
      hasError = true;
    } else if (newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters long.';
      hasError = true;
    }
    if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = 'New password and confirm password do not match.';
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    // API request
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}${API.updatePassword}`,
        {
          current_password: currentPassword,
          new_password: newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
        alert(response.data.message || 'Password updated successfully!'); // Optional success feedback
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          apiError: error.response?.data.message || 'Error updating password.',
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          apiError: 'An unexpected error occurred. Please try again.',
        }));
      }
    }
  };

  return (
    <div>
      <div className="flex px-4 flex-col md:flex-row mb-10 md:mt-32 mt-24">
        <Sidebar />
        <main className="flex-1 px-6 overflow-x-auto">
          <div>
            <h1 className="font-semibold md:text-xl text-lg mb-5 md:mb-0">Update Password</h1>
            <section className="bg-white p-12 w-full max-w-lg shadow rounded mt-5">
              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  <div>
                    <label htmlFor="current-password" className="block text-sm font-medium text-gray-900">
                      Current Password
                    </label>
                    <div className="mt-2">
                      <input
                        id="current-password"
                        name="currentPassword"
                        type="password"
                        value={formData.currentPassword}
                        onChange={handleChange}
                        className="block w-full rounded bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                      />
                      {errors.currentPassword && (
                        <p className="mt-1 text-sm text-red-600">{errors.currentPassword}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="new-password" className="block text-sm font-medium text-gray-900">
                      New Password
                    </label>
                    <div className="mt-2">
                      <input
                        id="new-password"
                        name="newPassword"
                        type="password"
                        value={formData.newPassword}
                        onChange={handleChange}
                        className="block w-full rounded bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                      />
                      {errors.newPassword && (
                        <p className="mt-1 text-sm text-red-600">{errors.newPassword}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-900">
                      Confirm New Password
                    </label>
                    <div className="mt-2">
                      <input
                        id="confirm-password"
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="block w-full rounded bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                      />
                      {errors.confirmPassword && (
                        <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                      )}
                    </div>
                  </div>
                </div>

                {errors.apiError && <p className="mt-4 text-sm text-red-600">{errors.apiError}</p>}

                <div className="mt-6 flex justify-between items-center">
                  <Link
                    href={ROUTES.Dashboard}
                    className="text-sm font-medium text-gray-500 hover:underline"
                  >
                    Cancel
                  </Link>
                  <button
                    type="submit"
                    className="inline-flex justify-center rounded-md bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Update Password
                  </button>
                </div>
              </form>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UpdatePasswordPage;
