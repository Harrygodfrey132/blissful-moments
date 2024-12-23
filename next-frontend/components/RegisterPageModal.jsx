import React, { useEffect, useState } from "react";
import { useStripe, useElements, PaymentElement, Elements } from "@stripe/react-stripe-js";
import axios from "axios";
import { API } from "../utils/api";
import { usePageContext } from "../context/PageContext";
import { useSession } from "next-auth/react";

const RegisterPageModal = ({ isOpen, onClose }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState(null);
  const { pageData, setPageData } = usePageContext();
  const { data: session } = useSession();
  const token = session?.user?.accessToken;

  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        // API call to create a payment intent
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}${API.createPaymentIntent}`,
          { amount: 5000 }, // amount in cents ($50.00)
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const { clientSecret } = response.data;
        setClientSecret(clientSecret);
      } catch (error) {
        console.error("Error creating payment intent:", error);
        alert("There was an issue processing your payment. Please try again.");
      }
    };

    if (stripe && elements) {
      fetchClientSecret();
    }
  }, [stripe, elements, token]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements || !clientSecret) {
      console.error("Stripe has not loaded yet.");
      return;
    }

    try {
      // Confirm the card payment with Stripe
      const response = await stripe.confirmPayment({
        clientSecret, // The client secret from your backend
        elements, // The elements object containing the Stripe Elements instances
        confirmParams: {
          return_url: `${window.location.origin}/success`, // URL to return to after payment confirmation
        },
      });

      if (isPaymentError(response)) {
        // Handle error response
        console.error(response.error?.message);
        alert("Payment failed: " + (response.error?.message ?? "Unknown error"));
      } else if (response.paymentIntent?.status === "succeeded") {
        // Handle successful payment
        alert("Payment successful!");
      }
    } catch (error) {
      console.error("Error confirming payment:", error);
      alert("There was an issue processing your payment. Please try again.");
    }
  };

  // Check if the response contains an error
  const isPaymentError = (response) => {
    return 'error' in response;
  };

  if (!isOpen || !clientSecret) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-1/2 p-6 rounded shadow-lg">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Register Your Page</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            {/* Payment Element with accordion layout and radio buttons */}
            <Elements stripe={stripe} options={{ clientSecret }}>
              <PaymentElement
                id="payment-element"
                options={{
                  layout: {
                    type: "accordion", // Accordion layout
                    defaultCollapsed: false,
                    radios: true, // Enable radio buttons
                    spacedAccordionItems: false,
                  },
                }}
              />
            </Elements>
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Pay $50
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPageModal;
