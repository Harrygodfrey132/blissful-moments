import { useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { loadStripe } from "@stripe/stripe-js";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import Link from "next/link";
import { ROUTES } from "../utils/routes";

const RegisterPageModal = ({ isOpen, onClose }) => {
  const { data: session } = useSession();
  const token = session?.user?.accessToken;
  const router = useRouter();

  const handleCheckout = async () => {
    try {
      // Send a request to your Laravel backend to create a checkout session
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/create-checkout-session`,
        {
          customer_id: session?.user?.id,
          plan_type: 12,
          plan_name: "Individual",
          plan_amount: 50000,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { sessionId } = response.data;

      // Redirect to Stripe Checkout page
      const stripe = await loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
      );
      const { error } = await stripe.redirectToCheckout({ sessionId });

      if (error) {
        console.error("Error redirecting to Checkout:", error.message);
        alert("There was an issue processing your payment. Please try again.");
      }
    } catch (error) {
      console.error("Error initiating checkout:", error);
      alert("There was an issue processing your payment. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white md:w-1/3 w-full mx-4 p-8 rounded-lg shadow-xl relative">
        {/* Close button */}
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 focus:outline-none"
          onClick={onClose}
        >
          <FaTimesCircle size={20} />
        </button>

        {/* Header section */}
        <div className="text-center">
          <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-800">
            Confirm Your Registration
          </h2>
        </div>

        {/* Plan and amount section */}
        <div className="bg-gray-100 p-4 rounded-lg mt-6 text-gray-800">
          <div className="flex justify-between mb-3">
            <span className="font-medium">Current Plan:</span>
            <span className="text-green-700 font-bold">Yearly</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Payment Amount:</span>
            <span className="text-blue-600 font-bold">$50</span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex justify-center mt-8 gap-4">
          <button
            type="button"
            className="px-6 py-2 bg-gray-200 text-gray-700 font-medium rounded-lg shadow-md hover:bg-gray-300 transition"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition"
            onClick={handleCheckout}
          >
            Proceed to Payment
          </button>
        </div>

        {/* Footer section */}
        <div className="mt-6 text-center text-sm text-gray-500">
          By proceeding, you agree to our
          <Link href={ROUTES.termsAndConditions} className="text-blue-500 hover:underline ml-1">
            Terms and Conditions
          </Link>
          .
        </div>
      </div>
    </div>
  );
};

export default RegisterPageModal;
