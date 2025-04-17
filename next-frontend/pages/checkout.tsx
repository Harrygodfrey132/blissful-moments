import Link from "next/link";
import { ROUTES } from "../utils/routes";
import { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import axios from "axios";
import { API } from "../utils/api";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { loadStripe } from "@stripe/stripe-js";
import Select from "react-select";
import countries from "world-countries";
import Image from "next/image";

interface BillingDetails {
  first_name: string;
  last_name: string;
  company: string;
  address: string;
  apartment: string;
  city: string;
  country: string;
  region: string;
  postal_code: string;
  phone: string;
}

const countryOptions = countries.map((country) => ({
  value: country.cca2, // Country code (e.g., US, CA)
  label: country.name.common, // Country name (e.g., United States, Canada)
}));

const CheckoutPage = () => {
  const router = useRouter();
  const { order_id } = router.query;
  const { data: session } = useSession();
  const [order, setOrder] = useState<{ id: string; plan_name: string, next_renewal_date: Date; amount: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fetchedOrderId, setFetchedOrderId] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});
  const [billingDetails, setBillingDetails] = useState<BillingDetails>({
    first_name: "",
    last_name: "",
    company: "",
    address: "",
    apartment: "",
    city: "",
    country: "",
    region: "",
    postal_code: "",
    phone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setBillingDetails({ ...billingDetails, [e.target.name]: e.target.value });

    // Clear validation error on change
    setValidationErrors((prevErrors) => ({ ...prevErrors, [e.target.name]: "" }));
  };

  const handleCountryChange = (selectedOption: any) => {
    setBillingDetails({ ...billingDetails, country: selectedOption.value });
    setValidationErrors((prevErrors) => ({ ...prevErrors, country: "" }));
  };


  useEffect(() => {
    const orderId = Array.isArray(order_id) ? order_id[0] : order_id;
    if (!session?.user?.accessToken || !orderId || fetchedOrderId === orderId) return;
    setIsProcessing(true);
    setFetchedOrderId(orderId);

    const fetchOrder = async () => {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}${API.getOrderDetails}`,
          { order_id: orderId },
          {
            headers: { Authorization: `Bearer ${session.user.accessToken}` },
          }
        );
        setOrder(response.data.order);
        setIsProcessing(false);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to fetch Order Details");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [order_id, session, fetchedOrderId]);

  // Validation Function
  const validateBillingDetails = () => {
    const errors: { [key: string]: string } = {};

    if (!billingDetails.first_name.trim()) errors.first_name = "First name is required.";
    if (!billingDetails.last_name.trim()) errors.last_name = "Last name is required.";
    if (!billingDetails.address.trim()) errors.address = "Address is required.";
    if (!billingDetails.city.trim()) errors.city = "City is required.";
    if (!billingDetails.country.trim()) errors.country = "Country is required.";
    if (!billingDetails.postal_code.trim()) errors.postal_code = "Postal code is required.";
    if (!billingDetails.phone.trim()) errors.phone = "Phone number is required.";

    // Basic postal code validation (alphanumeric)
    if (billingDetails.postal_code && !/^[a-zA-Z0-9 -]+$/.test(billingDetails.postal_code)) {
      errors.postal_code = "Invalid postal code format.";
    }

    // Basic phone number validation (digits & optional dashes)
    if (billingDetails.phone && !/^\+?[0-9 \-]+$/.test(billingDetails.phone)) {
      errors.phone = "Invalid phone number format.";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCheckout = async () => {

    if (!validateBillingDetails()) {
      return;
    }
    try {

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}${API.createCheckoutSession}`,
        {
          customer_id: session?.user?.id,
          order_id: order_id,
          billingDetails: billingDetails
        },
        {
          headers: { Authorization: `Bearer ${session?.user?.accessToken}` },
        }
      );

      const { sessionId, stripePublicKey } = response.data;

      const stripe = await loadStripe(
        stripePublicKey?.trim() || process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
      );

      if (!stripe) {
        console.error("Failed to initialize Stripe.");
        alert("There was an issue initializing Stripe. Please try again later.");
        return;
      }
      const { error } = await stripe.redirectToCheckout({ sessionId });

      if (error) {
        console.error("Stripe Checkout Error:", error.message);
        alert("There was an issue processing your payment. Please try again.");
      }
    } catch (error) {
      console.error("Checkout Error:", error);
      alert("There was an issue processing your payment. Please try again.");
    }
  };

  const getNextRenewalDate = () => {
    return order?.next_renewal_date
      ? new Date(order.next_renewal_date).toLocaleDateString()
      : "N/A";
  };
  const handleCancel = () => {
    setIsProcessing(true);
    router.push(ROUTES.myPage);
  };


  if (error) return <p>Error: {error}</p>;

  return (
    <div className="max-w-6xl mx-auto mt-28 mb-12">
      <button onClick={handleCancel} className="px-6 py-2 flex gap-1 items-center text-blue-600">
        <IoIosArrowBack /> Back
      </button>

      <h1 className="px-6 py-2 text-xl font-bold">Checkout</h1>

      <div className="bg-gray-50 p-6 rounded flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-2/3 bg-white p-6 rounded shadow">
          <section aria-labelledby="shipping-heading" className="mt-3">
            <div className="billing-info">
              <h2 className="text-lg font-semibold text-gray-900">Billing Information</h2>
              <div className="mt-4 grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-4">
                {Object.keys(billingDetails).map((field) =>
                  field === "country" ? (
                    <div key={field}>
                      <label className="block text-sm font-medium text-gray-700">Country</label>
                      <Select options={countryOptions} value={countryOptions.find((c) => c.value === billingDetails.country)} onChange={handleCountryChange} />
                      {validationErrors[field] && <p className="text-red-500 text-sm">{validationErrors[field]}</p>}
                    </div>
                  ) : (
                    <div key={field}>
                      <label className="block text-sm font-medium text-gray-700">{field.replace("_", " ").toUpperCase()}</label>
                      <input
                        name={field}
                        placeholder={`Enter ${field.replace(/_/g, " ")}`}
                        className="block w-full rounded-md px-3 py-2 text-base text-gray-900 outline outline-1 outline-gray-300 sm:text-sm"
                        type="text"
                        value={billingDetails[field as keyof BillingDetails]}
                        onChange={handleChange}
                      />
                      {validationErrors[field] && <p className="text-red-500 text-sm">{validationErrors[field]}</p>}
                    </div>
                  )
                )}
              </div>
            </div>
          </section>
        </div>

        <div className="w-full lg:w-2/4 bg-white shadow rounded h-fit p-6">
          <h3 className="text-lg font-bold mb-2">Order Summary</h3>
          <div className="mb-4 border-t border-gray-300 pt-4">
            <label className="border p-4 mb-4 flex justify-between items-center rounded-lg cursor-pointer border-blue-500">
              <input type="radio" name="plan" value="" className="hidden" />
              <img src="img/logo-black.png" alt="logo" className="w-12 h-12" />
              <div className="flex-1 ml-4">
                <p className="font-semibold">{order?.plan_name}</p>
                <div className="text-blue-600 font-medium">1 Month</div>
              </div>
              <p className="text-lg font-bold">£{order?.amount}</p>
            </label>
            <div className="text-gray-500 text-sm font-medium">Renews on {getNextRenewalDate()} at £1.99/month</div>
            <div className="flex justify-end py-4">
              {isProcessing && (
                <div className="flex items-center">
                  <span className="loader w-5 h-5 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></span>
                  <span className="ml-2 text-gray-500">Redirecting...</span>
                </div>
              )}
            </div>
            <p className="flex justify-between">
              <span className="font-semibold">Subtotal:</span>
              <span className="font-bold">£{order?.amount}</span>
            </p>
          </div>
          <button onClick={handleCheckout} className="block mt-8 bg-blue-500 text-white text-center py-2.5 rounded w-full transition">
            Complete Payment
          </button>

          <div className="mt-6 text-center text-sm text-gray-500">
            By proceeding, you agree to our
            <Link href={ROUTES.termsAndConditions} className="text-blue-500 hover:underline ml-1">
              Terms and Conditions
            </Link>
            .
          </div>
          <div className="font-semibold mt-6">Secure payment</div>
          <div className="flex gap-2 mt-4">
            {/* Visa */}
            <Image src={"/img/visa.png"} alt="Visa" width={50} height={50} />
            {/* MasterCard */}
            <Image src={"/img/mastercard.png"} alt="MasterCard" width={50} height={50} />
          </div>
        </div>
      </div>

      {loading && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
          <span className="loader w-20 h-20 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></span>
          <span className="ml-2 text-white font-semibold text-lg">Loading...</span>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
