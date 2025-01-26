import { useState, useEffect } from "react";
import OTPInput from "react-otp-input"; // You may already have this component or implement your own
import { useRouter } from "next/router";
import axios from "axios";
import Image from "next/image";
import { ROUTES } from "../utils/routes";
import { toast } from "react-toastify";
import Link from "next/link";
import { API } from "../utils/api";

const VerifyPasswordPage = () => {
    const [loading, setLoading] = useState(true);
    const [code, setCode] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();
    const { token } = router.query;

    useEffect(() => {
        if (!token) {
            toast.error("You are not authorised to access this page");
            router.push(`${ROUTES.Home}`);
        } else {
            setLoading(false);
        }
    }, [token]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!code || code.length !== 4) {
            setError("Please enter a valid 4-digit OTP.");
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}${API.validateForgotPasswordOTP}`, { code: code, token: token });
            if (response.status == 200) {
                router.push(`${ROUTES.resetPassword}?token=${encodeURIComponent(response.data.token)}`);
            }
        } catch (err) {
            setIsSubmitting(false);
            toast.error("OTP verification failed. Please try again.");
        }
    };

    return (
        <div className="relative flex items-center justify-center min-h-screen bg-gray-900 bg-opacity-50">
            {/* Background Image */}
            <div className="absolute inset-0 bg-cover bg-center filter blur-sm">
                <Image
                    src="https://images.unsplash.com/photo-1614239374931-ed5165a07231?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Flying doves"
                    fill
                    style={{ objectFit: 'cover' }}
                    quality={100}
                />
            </div>

            {/* Main Card */}
            <div className="relative w-full max-w-md bg-white mx-4 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 z-10">
                <div className="p-8">
                    <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">Verify Your OTP</h1>
                    <p className="text-sm text-gray-600 text-center mb-3">
                        Please check your email and enter OTP below to verify your account.
                    </p>
                    <div className="relative flex flex-col justify-center py-6">
                        <div className="mx-auto w-full max-w-lg rounded-2xl px-6 pb-9">
                            <div className="text-center space-y-4">
                                <p className="text-sm text-gray-500 m">
                                    We have sent a code to your email
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6 mb-6 mt-4">
                                <div className="flex justify-center">
                                    <OTPInput
                                        value={code}
                                        onChange={setCode}
                                        numInputs={4}
                                        skipDefaultStyles={true}
                                        renderInput={(props) => (
                                            <input
                                                {...props}
                                                type="text"
                                                inputMode="numeric"
                                                pattern="[0-9]*"
                                                maxLength={1}
                                                className="w-12 h-12 text-center border border-gray-300 rounded text-lg focus:ring-blue-500"
                                            />
                                        )}
                                        containerStyle="flex space-x-2"
                                    />
                                </div>
                                {error && <p className="mt-4 text-sm text-red-500">{error}</p>}
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`w-full py-2 text-white bg-blue-500 rounded ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                                >
                                    {isSubmitting ? "Verifying..." : "Verify Account"}
                                </button>
                            </form>
                            <div className="text-center text-blue-500">
                                <Link href={ROUTES.Login}>
                                    Login
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Loader Overlay */}
            {loading && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-opacity-75"></div>
                </div>
            )}
        </div>
    );
};

export default VerifyPasswordPage;

VerifyPasswordPage.noLayout = true;
