import { format } from "date-fns";
import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { API } from "../utils/api";
import { FaSpinner, FaEye } from "react-icons/fa";
import { toast } from "react-toastify";
import Image from "next/image";

interface ContributionRequest {
  id: string;
  name: string;
  full_name: string;
  email: string;
  created_at: string;
  status: number;
  description: string;
  image: string;
}

const ContributionRequestsPage = () => {
  const { data: session } = useSession();
  const [requests, setRequests] = useState<ContributionRequest[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentContribution, setCurrentContribution] =
    useState<ContributionRequest | null>(null);

  useEffect(() => {
    const fetchContributionRequests = async () => {
      if (session?.user?.accessToken) {
        setLoading(true);
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}${API.getContributionRequests}`,
            {
              headers: {
                Authorization: `Bearer ${session.user.accessToken}`,
              },
            }
          );
          setRequests(response.data.data || []);
        } catch (error) {
          console.error("Error fetching contribution requests:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchContributionRequests();
  }, [session?.user?.accessToken]);

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    return format(new Date(dateString), "M/d/y h:mm:ss a");
  };

  const handleAction = async (id: string, action: "accept" | "decline") => {
    if (!session?.user?.accessToken) return;

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}${API.updateContributionRequestStatus}`,
        { id, action: action === "accept" ? 1 : 2 },
        {
          headers: {
            Authorization: `Bearer ${session.user.accessToken}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success(
          `${action === "accept" ? "Accepted" : "Declined"} successfully.`
        );
        setRequests((prevRequests) =>
          prevRequests.map((request) =>
            request.id === id
              ? { ...request, status: action === "accept" ? 1 : 2 }
              : request
          )
        );
      }
    } catch (error) {
      console.error(`${action} request failed:`, error);
      toast.error("Error updating request status");
    }
  };

  const handleViewDetails = (contributionRequest: ContributionRequest) => {
    setCurrentContribution(contributionRequest);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentContribution(null);
  };

  return (
    <div>
      <div className="flex px-4 flex-col md:flex-row mb-10 md:mt-32 mt-24">
        <Sidebar />
        <main className="flex-1 md:px-6 overflow-x-auto">
          <header className="mb-6 md:mt-0 mt-5">
            <h1 className="text-xl font-bold text-gray-800">
              Contribution Requests
            </h1>
          </header>
          <div>
            <section className="w-full">
              <div className="px-4 sm:px-2 lg:px-2">
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
                                <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">
                                  S No
                                </th>
                                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                  Requester Name
                                </th>
                                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                  Requester Email
                                </th>
                                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                  Requested On
                                </th>
                                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                  Posted Details
                                </th>
                                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                  Status
                                </th>
                                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                  Action
                                </th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                              {requests.length === 0 ? (
                                <tr>
                                  <td
                                    colSpan={6}
                                    className="text-center py-4 text-sm text-gray-500"
                                  >
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
                                      {formatDate(
                                        contributionRequest.created_at
                                      )}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                      <FaEye
                                        className="text-blue-500 cursor-pointer"
                                        onClick={() =>
                                          handleViewDetails(contributionRequest)
                                        }
                                      />
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                                      <span
                                        className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${
                                          contributionRequest.status === 0
                                            ? "bg-yellow-100 text-yellow-800"
                                            : contributionRequest.status === 1
                                            ? "bg-green-100 text-green-800"
                                            : "bg-red-100 text-red-800"
                                        }`}
                                      >
                                        {contributionRequest.status === 0
                                          ? "Pending"
                                          : contributionRequest.status === 1
                                          ? "Accepted"
                                          : "Declined"}
                                      </span>
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                      {contributionRequest.status === 0 && (
                                        <>
                                          <button
                                            onClick={() =>
                                              handleAction(
                                                contributionRequest.id,
                                                "accept"
                                              )
                                            }
                                            className="inline-flex items-center rounded-md mr-2 bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20"
                                          >
                                            Accept
                                          </button>

                                          <button
                                            onClick={() =>
                                              handleAction(
                                                contributionRequest.id,
                                                "decline"
                                              )
                                            }
                                            className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20"
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

      {isModalOpen && currentContribution && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full">
            <h2 className="text-lg font-semibold mb-4">Contribution Details</h2>
            <p>
              <strong>Name:</strong> {currentContribution.name}
            </p>
            <p>
              <strong>Description:</strong> {currentContribution.description}
            </p>
            {currentContribution.image && (
              <Image
                src={currentContribution.image}
                alt="Contribution Image"
                width={300}
                height={200}
                className="rounded-lg shadow-md"
              />
            )}
            <div className="mt-4 text-right">
              <button
                onClick={closeModal}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContributionRequestsPage;
