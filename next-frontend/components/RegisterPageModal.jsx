import { useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { loadStripe } from "@stripe/stripe-js";

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
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-1/2 p-6 rounded shadow-lg">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Register Your Page
        </h2>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={handleCheckout} // Trigger Stripe Checkout on button click
          >
            Pay $5
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPageModal;
