import Link from "next/link";
import { ROUTES } from "../utils/routes";

const SubmissionSuccessful = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg text-center">
                <svg
                    className="mx-auto h-16 w-16 text-green-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2l4-4m6 2a9 9 0 11-18 0a9 9 0 0118 0z"
                    />
                </svg>
                <h1 className="text-2xl font-bold text-gray-800 mt-4">
                    Submission Successful!
                </h1>
                <p className="text-gray-600 mt-2">
                    Your request has been submitted successfully and is now under review by the admin.
                </p>
                <p className="text-gray-600 mt-2">
                    You will be notified via email once a decision has been made.
                </p>
                <div className="mt-4">
                    <Link href={ROUTES.Home}
                        className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
                    >
                        Return to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SubmissionSuccessful;
