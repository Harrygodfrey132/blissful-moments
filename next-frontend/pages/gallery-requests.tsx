import { format } from "date-fns";
import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { API } from "../utils/api";
import { FaSpinner, FaEye, FaWpforms } from "react-icons/fa";
import { toast } from "react-toastify";
import Link from "next/link";

interface GalleryRequest {
  id: string;
  name: string;
  email: string;
  folder: string;
  images: string;
  created_at: string;
  status: number;
  sections: string;
  access_token: string;
}

const GalleryRequestPage = () => {
  const { data: session } = useSession();
  const [requests, setRequests] = useState<GalleryRequest[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentGalleryRequest, setCurrentGalleryRequest] =
    useState<GalleryRequest | null>(null);

  useEffect(() => {
    const fetchGalleryRequests = async () => {
      if (session?.user?.accessToken) {
        setLoading(true);
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}${API.getGalleryRequests}`,
            {
              headers: {
                Authorization: `Bearer ${session.user.accessToken}`,
              },
            }
          );
          setRequests(response.data.data || []);
        } catch (error) {
          toast.error("Error fetching access requests");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchGalleryRequests();
  }, [session?.user?.accessToken]);

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    return format(new Date(dateString), "M/d/y h:mm:ss a");
  };

  const handleAction = async (id: string, action: "accept" | "decline") => {
    if (!session?.user?.accessToken) return;

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}${API.updateGalleryRequestStatus}`,
        { id, status: action === "accept" ? 1 : 2 },
        {
          headers: {
            Authorization: `Bearer ${session.user.accessToken}`,
          },
        }
      );

      if (response.data.error) {
        toast.error(response.data.error);
      } else {
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

  const handleViewDetails = (GalleryRequest: GalleryRequest) => {
    setCurrentGalleryRequest(GalleryRequest);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentGalleryRequest(null);
  };

  return (
    <div>
      <div className="flex px-4 flex-col md:flex-row mb-10 md:mt-32 mt-24">
        <Sidebar />
        <main className="flex-1 md:px-6 overflow-x-auto">
          <header className="mb-6 md:mt-0 mt-5">
            <h1 className="text-xl font-bold text-gray-800">
              Gallery Contribution Requests
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
                                requests.map((GalleryRequest, index) => (
                                  <tr key={GalleryRequest.id}>
                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-4">
                                      {index + 1}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                      {GalleryRequest.name}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                      {GalleryRequest.email}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                      {formatDate(GalleryRequest.created_at)}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                                      <span
                                        className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${(() => {
                                          switch (GalleryRequest.status) {
                                            case 0:
                                              return "bg-yellow-100 text-yellow-800"; // Pending
                                            case 1:
                                              return "bg-green-100 text-green-800"; // Accepted
                                            case 2:
                                              return "bg-red-100 text-red-800"; // Declined
                                            case 3:
                                              return "bg-blue-100 text-blue-800"; // Submitted Changes
                                            case 4:
                                              return "bg-purple-100 text-purple-800"; // Changes Updated
                                            case 5:
                                              return "bg-gray-100 text-gray-800"; // Changes Declined
                                            default:
                                              return "bg-gray-100 text-gray-800"; // Fallback for unknown status
                                          }
                                        })()}`}
                                      >
                                        {(() => {
                                          switch (GalleryRequest.status) {
                                            case 0:
                                              return "Pending";
                                            case 1:
                                              return "Accepted";
                                            case 2:
                                              return "Declined";
                                            case 3:
                                              return "Submitted Changes";
                                            case 4:
                                              return "Changes Updated";
                                            case 5:
                                              return "Changes Declined";
                                            default:
                                              return "Unknown Status";
                                          }
                                        })()}
                                      </span>
                                    </td>

                                    <td className="flex items-center gap-2 whitespace-nowrap px-3 py-4 text-base text-gray-500">
                                      <span className="border inline-block px-4 py-1.5 rounded">
                                        <FaEye
                                          className="text-blue-500 cursor-pointer"
                                          onClick={() =>
                                            handleViewDetails(GalleryRequest)
                                          }
                                        />
                                      </span>
                                      {GalleryRequest.status === 0 && (
                                        <>
                                          <button
                                            onClick={() =>
                                              handleAction(
                                                GalleryRequest.id,
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
                                                GalleryRequest.id,
                                                "decline"
                                              )
                                            }
                                            className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20"
                                          >
                                            Decline
                                          </button>
                                        </>
                                      )}
                                      {GalleryRequest.status === 3 && (
                                        <>
                                          <Link
                                            href={`/memory/view?data=${GalleryRequest.access_token}`}
                                          >
                                            <FaWpforms className="text-gray-900 cursor-pointer" />
                                          </Link>
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

      {isModalOpen && currentGalleryRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded shadow-xl p-6 max-w-2xl w-full">
            <h2 className="text-xl font-semibold mb-5 border-b pb-3">
              Access Section Details
            </h2>

            <div className="flex flex-col md:flex-row gap-6">
              <div className="space-y-4 w-full md:w-1/2">
                <p className="text-gray-700">
                  <strong className="text-gray-900">Name:</strong>{" "}
                  {currentGalleryRequest.name}
                </p>
                <p className="text-gray-700">
                  <strong className="text-gray-900">Email:</strong>{" "}
                  {currentGalleryRequest.email}
                </p>
                <p className="text-gray-700">
                  <strong className="text-gray-900">Folder:</strong>{" "}
                  {currentGalleryRequest.folder}
                </p>
              </div>

              <div className="w-full md:w-1/2 space-y-2">
                <p className="text-gray-900 font-medium mb-2">
                  Images to be uploaded:
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {JSON.parse(currentGalleryRequest.images || "[]").map(
                    (imageUrl: string, index: number) => (
                      <img
                        key={index}
                        src={imageUrl}
                        alt={`Uploaded Image ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg border border-gray-300 shadow-sm"
                      />
                    )
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6 text-right border-t pt-4">
              <button
                onClick={closeModal}
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-5 py-2 rounded-lg transition"
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

export default GalleryRequestPage;
