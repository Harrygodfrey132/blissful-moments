import { format } from 'date-fns';
import Sidebar from '../components/Sidebar';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { API } from '../utils/api';
import { FaSpinner, FaEye } from 'react-icons/fa'; // Import spinner and eye icon
import { toast } from 'react-toastify'; // For toast notifications

// Define the type for ContributionRequest
interface ContributionRequest {
    id: string;
    name: string;
    full_name: string;
    email: string;
    created_at: string;
    status: number;
    description: string; // Assuming description exists for posted details
}

const ContributionRequestsPage = () => {
    const { data: session } = useSession();
    const [requests, setRequests] = useState<ContributionRequest[]>([]);
    const [loading, setLoading] = useState(false);
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [currentContribution, setCurrentContribution] = useState<ContributionRequest | null>(null);

    useEffect(() => {
        // Fetch orders data on page load
        const fetchContributionRequests = async () => {
            if (session?.user?.accessToken) {
                setLoading(true); // Start loading
                try {
                    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}${API.getContributionRequests}`, {
                        headers: {
                            Authorization: `Bearer ${session.user.accessToken}`,
                        },
                    });

                    // Assuming response contains contribution requests field
                    setRequests(response.data.data || []);
                } catch (error) {
                    console.error('Error fetching contribution requests:', error);
                } finally {
                    setLoading(false); // Stop loading
                }
            }
        };

        fetchContributionRequests();
    }, [session?.user?.accessToken]);

    // Function to format the date
    const formatDate = (dateString: string) => {
        if (!dateString) return '';
        return format(new Date(dateString), 'M/d/y h:mm:ss a'); // Format: m/d/y h:i:s AM/PM
    };

    // Handle Accept/Decline actions
    const handleAction = async (id: string, action: 'accept' | 'decline') => {
        if (!session?.user?.accessToken) return;

        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}${API.updateContributionRequestStatus}`,
                { id, action: action === 'accept' ? 1 : 2 },
                {
                    headers: {
                        Authorization: `Bearer ${session.user.accessToken}`,
                    },
                }
            );

            if (response.status === 200) {
                toast.success(`${action === 'accept' ? 'Accepted' : 'Declined'} successfully.`);
                // Reload the requests
                setRequests((prevRequests) =>
                    prevRequests.map((request) =>
                        request.id === id ? { ...request, status: action === 'accept' ? 1 : 2 } : request
                    )
                );
            }
        } catch (error) {
            console.error(`${action} request failed:`, error);
            toast.error('Error updating request status');
        }

    };

    const handleViewDetails = (contributionRequest: ContributionRequest) => {
        setCurrentContribution(contributionRequest);
        setIsPopoverOpen(true); // Open the popover
    };

    // Close the popover
    const closePopover = () => {
        setIsPopoverOpen(false);
        setCurrentContribution(null);
    };

    return (
        <div>
            <div className="md:flex gap-5 md:px-10 px-4 w-full mb-10 md:mt-32 mt-24">
                <Sidebar />
                <main className="flex-1">
                    <header className="mb-6 md:mt-0 mt-4">
                        <h1 className="text-xl font-bold text-gray-800">Contribution Requests</h1>
                    </header>
                    <div>
                        <section className="w-full">
                            <div className="px-4 sm:px-2 lg:px-2">
                                {/* Loader */}
                                {loading ? (
                                    <div className="flex justify-center items-center my-10">
                                        <FaSpinner className="animate-spin text-blue-600 text-4xl" />
                                    </div>
                                ) : (
                                    <div className="mt-5 flow-root">
                                        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-6">
                                                <div className="overflow-hidden shadow ring-1 ring-black/5 sm:rounded-lg">
                                                    <table className="min-w-full divide-y divide-gray-300">
                                                        <thead className="bg-gray-50">
                                                            <tr>
                                                                <th
                                                                    scope="col"
                                                                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900"
                                                                >
                                                                    S No
                                                                </th>
                                                                <th
                                                                    scope="col"
                                                                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                                                >
                                                                    Requester Name
                                                                </th>
                                                                <th
                                                                    scope="col"
                                                                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                                                >
                                                                    Requester Email
                                                                </th>
                                                                <th
                                                                    scope="col"
                                                                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                                                >
                                                                    Requested On
                                                                </th>
                                                                <th
                                                                    scope="col"
                                                                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                                                >
                                                                    Posted Details
                                                                </th>
                                                                <th
                                                                    scope="col"
                                                                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                                                >
                                                                    Status
                                                                </th>
                                                                <th
                                                                    scope="col"
                                                                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                                                >
                                                                    Action
                                                                </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody className="divide-y divide-gray-200 bg-white">
                                                            {requests.length === 0 ? (
                                                                <tr>
                                                                    <td colSpan={6} className="text-center py-4 text-sm text-gray-500">
                                                                        No requests found
                                                                    </td>
                                                                </tr>
                                                            ) : (
                                                                requests.map((contributionRequest, index) => (
                                                                    <tr key={contributionRequest.id}>
                                                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-4">
                                                                            {index + 1}
                                                                        </td>
                                                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                                            {contributionRequest.full_name}
                                                                        </td>
                                                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                                            {contributionRequest.email}
                                                                        </td>
                                                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                                            {formatDate(contributionRequest.created_at)}
                                                                        </td>
                                                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                                            <FaEye
                                                                                className="text-blue-500 cursor-pointer"
                                                                                onClick={() => handleViewDetails(contributionRequest)}
                                                                            />
                                                                        </td>
                                                                        <td className="whitespace-nowrap px-3 py-4 text-sm">
                                                                            <span
                                                                                className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${contributionRequest.status === 0
                                                                                    ? 'bg-yellow-100 text-yellow-800' // Pending (Yellow)
                                                                                    : contributionRequest.status === 1
                                                                                        ? 'bg-green-100 text-green-800' // Accepted (Green)
                                                                                        : 'bg-red-100 text-red-800' // Declined (Red)
                                                                                    }`}
                                                                            >
                                                                                {contributionRequest.status === 0
                                                                                    ? 'Pending'
                                                                                    : contributionRequest.status === 1
                                                                                        ? 'Accepted'
                                                                                        : 'Declined'}
                                                                            </span>
                                                                        </td>

                                                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                                            {contributionRequest.status === 0 && (
                                                                                <>
                                                                                    <button
                                                                                        onClick={() => handleAction(contributionRequest.id, 'accept')}
                                                                                        className="text-green-600 mr-3"
                                                                                    >
                                                                                        Accept
                                                                                    </button>
                                                                                    <button
                                                                                        onClick={() => handleAction(contributionRequest.id, 'decline')}
                                                                                        className="text-red-600"
                                                                                    >
                                                                                        Decline
                                                                                    </button>
                                                                                </>
                                                                            )}
                                                                        </td>
                                                                    </tr>
                                                                ))
                                                            )}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </section>
                    </div>
                </main>
            </div>

            {/* Popover Container */}
            {isPopoverOpen && currentContribution && (
                <div className="popover-container border border-gray-300 transition-all">
                    <div className="popover-arrow"></div>
                    <h2 className="border-b-2 font-playfair border-blue-light-900 font-medium mb-4 text-center text-lg">
                        Contribution Details
                    </h2>
                    <div className="mb-4">
                        <strong>Name:</strong> {currentContribution.name}
                    </div>
                    <div className="mb-4">
                        <strong>Description:</strong> {currentContribution.description}
                    </div>
                    <div className="flex justify-end">
                        <button onClick={closePopover} className="text-white bg-blue-500 px-4 py-2 rounded">
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ContributionRequestsPage;
