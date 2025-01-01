import React from "react";
import { FaTimesCircle } from "react-icons/fa";

const PaymentFailed = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-red-100 via-white to-red-100">
      <div className="bg-white p-8 rounded-lg shadow-xl text-center max-w-md w-full transform transition duration-500 hover:scale-105 animate-shake">
        <div className="flex justify-center mb-4">
          <FaTimesCircle className="text-red-500 text-6xl animate-pulse" />
        </div>
        <h1 className="text-3xl font-bold text-red-600 mb-4">Payment Failed</h1>
        <p className="text-gray-600 mb-6">
          Unfortunately, your payment could not be processed. Please try again.
        </p>
        <button 
          className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-200 shadow-md"
          onClick={() => window.location.href = "/payment"}
        >
          Retry Payment
        </button>
        <button 
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200 shadow-md ml-4"
          onClick={() => window.location.href = "/"}
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default PaymentFailed;

// Static property to hide Header and Footer
PaymentFailed.noLayout = true;
