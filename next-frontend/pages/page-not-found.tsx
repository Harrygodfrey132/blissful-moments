import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";

const PageNotFound = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-100 via-white to-blue-100">
      <div className="bg-white p-8 rounded-lg shadow-xl text-center max-w-md w-full transform transition duration-500 hover:scale-105">
        <div className="flex justify-center mb-4">
          <FaExclamationTriangle className="text-blue-500 text-6xl animate-pulse" />
        </div>
        <h1 className="text-3xl font-bold text-blue-600 mb-4">404 - Page Not Found</h1>
        <p className="text-gray-600 mb-6">
          Oops! The page you are looking for does not exist or has been moved.
        </p>
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

export default PageNotFound;

// Static property to hide Header and Footer
PageNotFound.noLayout = true;
