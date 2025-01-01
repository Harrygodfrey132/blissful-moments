import React from "react";


import { FaCheckCircle } from "react-icons/fa";

const BookingSuccess = ({ orderId, amount, dateTime }) => {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-100 via-white to-blue-100">
        <div className="bg-white p-8 rounded-lg shadow-xl text-center max-w-md w-full transform transition duration-500 hover:scale-105">
          <div className="flex justify-center mb-4">
            <FaCheckCircle className="text-blue-500 text-6xl animate-bounce" />
          </div>
          <h1 className="text-3xl font-bold text-blue-600 mb-4">Booking Successful!</h1>
          <p className="text-gray-600 mb-6">Thank you for your booking. Here are your details:</p>
  
          <div className="mb-6 text-left">
            <div className="flex justify-between mb-2 text-gray-800">
              <strong>Order ID:</strong>
              <span>{orderId}</span>
            </div>
            <div className="flex justify-between mb-2 text-gray-800">
              <strong>Amount:</strong>
              <span>₹{amount}</span>
            </div>
            <div className="flex justify-between mb-2 text-gray-800">
              <strong>Date & Time:</strong>
              <span>{dateTime}</span>
            </div>
          </div>
  
          <button 
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200 shadow-md"
            onClick={() => window.location.href = "/"}
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  };

export default BookingSuccess;


// Static property to hide Header and Footer
BookingSuccess.noLayout = true;



