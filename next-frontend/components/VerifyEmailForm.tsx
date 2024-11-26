import { useState, useRef } from 'react';
import { API } from '../utils/api';

const VerifyEmailForm = () => {
    const [code, setCode] = useState(["", "", "", ""]); // Array to store the 4-digit code
    const inputsRef = useRef<HTMLInputElement[]>([]); // Refs for input elements

    const handleChange = (value: string, index: number) => {
        if (!/^\d*$/.test(value)) return; // Allow only numeric input

        const updatedCode = [...code];
        updatedCode[index] = value;
        setCode(updatedCode);

        // Move to the next input if value is entered
        if (value && index < inputsRef.current.length - 1) {
            inputsRef.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Backspace" && !code[index] && index > 0) {
            // Move to the previous input if backspace is pressed and input is empty
            inputsRef.current[index - 1]?.focus();
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Fetch the token from cookies
        const token = document.cookie
            .split("; ")
            .find((row) => row.startsWith("auth_token="))
            ?.split("=")[1];

        if (!token) {
            alert("Token not found!");
            return;
        }

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${API.VerifyEmail}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ code: code.join("") }),
            });

            const data = await response.json();

            if (response.ok) {
                alert("Verification successful!");
            } else {
                alert(data.message || "Verification failed!");
            }
        } catch (error) {
            console.error("Error during verification:", error);
        }
    };

    return (
        <div className="relative flex mt-20 flex-col justify-center overflow-hidden bg-gray-50 py-12">
            <div className="relative  px-6 pb-9 mx-auto w-full max-w-lg rounded-2xl">
                <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
                    <div className="flex flex-col items-center justify-center text-center space-y-2">
                        <div className="font-semibold text-2xl">
                            <p>Email Verification</p>
                        </div>
                        <div className="flex flex-row text-sm font-medium text-gray-400">
                            <p>We have sent a code to your email ba**@dipainhouse.com</p>
                        </div>
                    </div>

                    <div>
                        <form onSubmit={handleSubmit} method="post">
                            <div className="flex flex-col space-y-16">
                                <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                                    {code.map((value, index) => (
                                        <div className="w-16 h-16" key={index}>
                                            <input
                                                ref={(el) => (inputsRef.current[index] = el!)} // Store refs
                                                className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                                                type="text"
                                                maxLength={1}
                                                value={value}
                                                onChange={(e) => handleChange(e.target.value, index)}
                                                onKeyDown={(e) => handleKeyDown(e, index)}
                                            />
                                        </div>
                                    ))}
                                </div>

                                <div className="flex flex-col space-y-5">
                                    <div>
                                        <button
                                            type="submit"
                                            className="w-full text-white bg-blue-light-900  focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded text-sm px-5 py-2.5 text-center dark:focus:ring-primary-800"
                                        >
                                            Verify Account
                                        </button>
                                    </div>

                                    <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                                        <p>Didn't receive the code?</p>{" "}
                                        <a
                                            className="flex flex-row items-center text-blue-light-900"
                                            href="http://"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Resend
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VerifyEmailForm;
