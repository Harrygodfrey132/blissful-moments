import { useState } from "react";
import OTPInput from "react-otp-input";
import useVerifyEmail from "../hooks/useVerifyEmail";
import { signOut, useSession } from "next-auth/react";

const VerifyEmailForm = () => {
    const [code, setCode] = useState("");
    const { verifyEmail, isSubmitting } = useVerifyEmail();
    const { data: session } = useSession();

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

                  
                {/* Resend code  */}             
                <div className="text-center">
                    <a href="#" className="underline text-sm text-black">
                        Resend Code
                    </a>
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
