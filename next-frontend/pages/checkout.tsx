import { useState } from 'react';

const CheckoutPage = () => {
  const [selectedPlan, setSelectedPlan] = useState('basic');

  const plans = [
    {
      id: 'basic',
      name: 'Basic Plan',
      price: '$10/month',
      features: ['Feature 1', 'Feature 2'],
    },
    {
      id: 'standard',
      name: 'Standard Plan',
      price: '$20/month',
      features: ['Feature 1', 'Feature 2', 'Feature 3'],
    },
    {
      id: 'premium',
      name: 'Premium Plan',
      price: '$30/month',
      features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4'],
    },
  ];

  const orderSummary = {
    subtotal: 30.0,
    tax: 3.0,
    total: 33.0,
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-10">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 px-4">
        {/* Left: Plan Information */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Choose Your Plan</h2>
          <div className="flex space-x-4">
            {plans.map((plan) => (
              <label
                key={plan.id}
                className={`flex flex-col items-center border rounded-xl p-6 cursor-pointer shadow-md w-full
                  ${selectedPlan === plan.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'}
                `}
              >
                <input
                  type="radio"
                  name="plan"
                  value={plan.id}
                  className="hidden"
                  checked={selectedPlan === plan.id}
                  onChange={() => setSelectedPlan(plan.id)}
                />
                <h3 className="text-lg font-medium text-gray-700 mb-2">{plan.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{plan.price}</p>
                <ul className="text-sm text-gray-500 space-y-1">
                  {plan.features.map((feature, index) => (
                    <li key={index}>• {feature}</li>
                  ))}
                </ul>
              </label>
            ))}
          </div>
        </div>

        {/* Right: Order Summary */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Order Summary</h2>
          <div className="space-y-4">
            <div className="flex justify-between text-gray-700">
              <span>Subtotal</span>
              <span>${orderSummary.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Tax</span>
              <span>${orderSummary.tax.toFixed(2)}</span>
            </div>
            <hr className="border-t border-gray-200" />
            <div className="flex justify-between text-gray-800 font-semibold text-lg">
              <span>Total</span>
              <span>${orderSummary.total.toFixed(2)}</span>
            </div>
          </div>
          <button
            className="w-full mt-6 bg-blue-600 text-white font-medium py-3 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Complete Purchase
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
