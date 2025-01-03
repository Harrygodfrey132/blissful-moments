import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FaCheckCircle } from "react-icons/fa";
import { useSession } from "next-auth/react";
import axios from "axios";
import { API } from "../utils/api";
import Link from "next/link";
import { ROUTES } from "../utils/routes";

const BookingSuccess = () => {
  const router = useRouter();
  const { session_id } = router.query; // Retrieve session_id from query
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  const token = session?.user?.accessToken;

  useEffect(() => {
    const fetchUserData = async () => {
      if (token) {
        try {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}${API.getUser}`,
            { email: session?.user?.email },
            {
              headers: { Authorization: `Bearer ${token}` },
              withCredentials: true,
            }
          );

          if (response.status === 200) {
            const orderData = response.data.user.order_details;

            // Sort the order_details array by created_at in descending order
            const latestOrder = orderData.sort(
              (a, b) => new Date(b.created_at) - new Date(a.created_at)
            )[0];

            setOrderDetails(latestOrder);
            setLoading(false);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, [token]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-100 via-white to-blue-100">
        <p className="text-gray-700 text-xl">Loading...</p>
      </div>
    );
  }

  if (!orderDetails) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-100 via-white to-blue-100">
        <p className="text-red-600 text-xl">
          Unable to retrieve booking details. Please try again.
        </p>
      </div>
    );
  }

  // Format amount to dollars (assuming amount is in cents)
  const formattedAmount = (orderDetails.amount / 100).toFixed(2);

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-green-100 via-white to-green-100">
      <div className="bg-white p-8 rounded-lg shadow-xl text-center max-w-md w-full transform transition duration-500 hover:scale-105">
        <div className="flex justify-center mb-4">
          <FaCheckCircle className="text-green-500 text-6xl animate-bounce" />
        </div>
        <h1 className="text-3xl font-bold text-green-600 mb-4">
          Payment Successful!
        </h1>
        <p className="text-gray-600 mb-6">
          Thank you for your booking. Here are your details:
        </p>

        <div className="mb-6 text-left">
          <div className="flex justify-between mb-2 text-gray-800">
            <strong>Order ID:</strong>
            <span className="font-semibold">{orderDetails.order_id}</span>
          </div>
          <div className="flex justify-between mb-2 text-gray-800">
            <strong>Amount:</strong>
            <span className="font-semibold">${formattedAmount}</span>
          </div>
          <div className="flex justify-between mb-2 text-gray-800">
            <strong>Date & Time:</strong>
            <span className="font-semibold">{new Date(orderDetails.created_at).toLocaleString()}</span>
          </div>
        </div>

        <Link
          href={ROUTES.Dashboard}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200 shadow-md"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
};

// Static property to hide Header and Footer
BookingSuccess.noLayout = true;

export default BookingSuccess;
