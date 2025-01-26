import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { ROUTES } from '../utils/routes';
import { API } from '../utils/api';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

const UpdateNewPasswordPage = () => {
    const router = useRouter();
    const { token } = router.query;

    const [formData, setFormData] = useState({
        newPassword: '',
        confirmPassword: '',
    });

    const [errors, setErrors] = useState({
        newPassword: '',
        confirmPassword: '',
        apiError: '',
    });

    useEffect(() => {
        const validateToken = async () => {
            if (!token) return;

            try {
                const response = await axios.post(
                    `${process.env.NEXT_PUBLIC_API_URL}${API.validatePasswordResetToken}`,
                    { token }
                );

                if (response?.status === 200) {
                    toast.success("Token validated successfully!");
                } else {
                    toast.error("Invalid or expired token. Please try again.");
                    router.push(ROUTES.Home);
                }
            } catch (error) {
                console.error("Error validating token:", error);
                toast.error("An error occurred while validating the token.");
                router.push(ROUTES.Home);
            }
        };

        validateToken();
    }, [token, router]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
        setErrors((prevErrors) => ({ ...prevErrors, [name]: '', apiError: '' }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { newPassword, confirmPassword } = formData;

        if (!token) {
            toast.error("Invalid or missing token. Please try again.");
            return;
        }

        setErrors({ newPassword: '', confirmPassword: '', apiError: '' });

        let hasError = false;
        const newErrors = { newPassword: '', confirmPassword: '', apiError: '' };

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

        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}${API.updateNewPassword}`,
                {
                    token, // Ensure token is sent explicitly
                    password: newPassword,
                    password_confirmation: confirmPassword, // Send confirmation for Laravel validation
                }
            );

            if (response.status === 200) {
                setFormData({ newPassword: '', confirmPassword: '' });
                toast.success(response.data.message || 'Password updated successfully!');
                router.push(ROUTES.Login);
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
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <main className="w-full max-w-lg p-8 bg-white shadow-xl rounded-lg">
                <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">Update Your Password</h1>
                <section className="space-y-6">
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            {/* New Password */}
                            <div>
                                <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">
                                    New Password
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="new-password"
                                        name="newPassword"
                                        type="password"
                                        value={formData.newPassword}
                                        onChange={handleChange}
                                        className="block w-full rounded-lg bg-gray-100 px-4 py-2 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    {errors.newPassword && (
                                        <p className="mt-1 text-sm text-red-500">{errors.newPassword}</p>
                                    )}
                                </div>
                            </div>

                            {/* Confirm New Password */}
                            <div>
                                <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                                    Confirm New Password
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="confirm-password"
                                        name="confirmPassword"
                                        type="password"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        className="block w-full rounded-lg bg-gray-100 px-4 py-2 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    {errors.confirmPassword && (
                                        <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Error Message */}
                        {errors.apiError && <p className="mt-4 text-sm text-red-500">{errors.apiError}</p>}

                        {/* Buttons */}
                        <div className="mt-6 flex justify-between items-center">
                            <Link href={ROUTES.Home} className="text-sm font-medium text-blue-600 hover:underline">
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                className="inline-flex justify-center rounded-lg bg-blue-600 py-2 px-6 text-sm font-medium text-white shadow-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                Update Password
                            </button>
                        </div>
                    </form>
                </section>
            </main>
        </div>
    );
};

export default UpdateNewPasswordPage;
