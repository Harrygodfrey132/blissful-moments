import { useEffect, useState } from "react";
import OTPInput from "react-otp-input";
import useVerifyEmail from "../hooks/useVerifyEmail";
import { signOut, useSession } from "next-auth/react";
import axios from "axios";
import { API } from "../utils/api";
import { toast } from "react-toastify";

const VerifyEmailForm = () => {
    const [code, setCode] = useState("");
    const { verifyEmail, isSubmitting } = useVerifyEmail();
    const { data: session } = useSession();

    // Resend Code Logic
    const [resendAttempts, setResendAttempts] = useState(0);
    const [timer, setTimer] = useState(120); // 2 minutes countdown
    const [canResend, setCanResend] = useState(false);

    useEffect(() => {
        let countdown: NodeJS.Timeout;
        if (timer > 0) {
            countdown = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        } else {
            setCanResend(resendAttempts < 3); // Enable resend button if attempts are less than 3
        }

        return () => clearInterval(countdown);
    }, [timer]);

    // Function to format time as MM:SS
    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return minutes > 0 ? `${minutes}:${seconds.toString().padStart(2, "0")}` : `${seconds}s`;
    };

    const handleResendCode = async () => {
        if (resendAttempts >= 3) {
            toast.error("You have reached the maximum number of resend attempts.");
            return;
        }

        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}${API.resendCode}`,
                { email: session?.user?.email },
                { headers: { Authorization: `Bearer ${session?.user?.accessToken}` } }
            );

            if (response.status === 200) {
                toast.success("Verification code resent successfully.");
                setResendAttempts((prev) => prev + 1);
                setTimer(120); // Reset timer for 2 minutes
                setCanResend(false); // Disable the button again
            }
        } catch (error: any) {
            if (error.response) {
                toast.error(error.response.data.message || "Failed to resend code.");
            } else {
                toast.error("An error occurred. Please try again.");
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await verifyEmail(code);
    };

    return (
        <div className="relative flex flex-col justify-center py-6">
            <div className="mx-auto w-full max-w-lg rounded-2xl px-6 pb-9">
                <div className="text-center space-y-4">
                    <p className="text-sm text-gray-500 m">
                        We have sent a code to your email{" "}
                        <strong>
                            {session?.user?.email?.replace(/(.{2}).*(@.*)/, "$1**$2")}
                        </strong>
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
                                    style={{}}
                                    className="w-12 h-12 text-center border border-gray-300 rounded text-lg focus:ring-blue-500"
                                />
                            )}
                            containerStyle="flex space-x-2"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full py-2 text-white bg-blue-500 rounded ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                    >
                        {isSubmitting ? "Verifying..." : "Verify Account"}
                    </button>
                </form>

                {/* Resend Code Section */}
                <div className="text-center mt-4">
                    <button
                        onClick={handleResendCode}
                        disabled={!canResend}
                        className={`text-sm text-black 
        ${!canResend ? "opacity-50 cursor-not-allowed" : ""}
        disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                        {resendAttempts < 3 ? (
                            canResend ? (
                                "Resend Code"
                            ) : (
                                <>
                                    Resend in <span className="font-bold text-red-500">[{formatTime(timer)}]</span>
                                </>
                            )
                        ) : (
                            "Max Resend Attempts Reached"
                        )}
                    </button>

                </div>

                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-500">
                        Want to <span
                            onClick={() => signOut({ callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL}` })}
                            className="text-blue-500 cursor-pointer hover:underline hover:font-semibold"
                        >
                            logout
                        </span>
                        ?
                    </p>
                </div>

            </div>
        </div>
    );
};

export default VerifyEmailForm;
