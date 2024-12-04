import { useState } from "react";
import OTPInput from "react-otp-input";
import useVerifyEmail from "../hooks/useVerifyEmail";
import { useSession } from "next-auth/react";

const VerifyEmailForm = () => {
    const [code, setCode] = useState("");
    const { verifyEmail, isSubmitting } = useVerifyEmail();
    const { data: session } = useSession();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await verifyEmail(code);
    };

    return (
        <div className="relative flex flex-col justify-center py-12">
            <div className="mx-auto w-full max-w-lg rounded-2xl px-6 pb-9">
                <div className="text-center space-y-4">
                    <h2 className="text-2xl font-semibold">Email Verification</h2>
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
            </div>
        </div>
    );
};

export default VerifyEmailForm;
