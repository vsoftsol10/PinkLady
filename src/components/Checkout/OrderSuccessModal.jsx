import React from 'react';

const OrderSuccessModal = ({ isOpen, onClose, orderNumber, total, email }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-8 relative animate-fadeIn">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 rounded-full p-3">
            <svg
              className="w-16 h-16 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        {/* Success Message */}
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
          Order Placed Successfully!
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Thank you for your purchase. Your order has been confirmed.
        </p>

        {/* Order Details */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-medium">Order Number:</span>
            <span className="text-gray-800 font-semibold">{orderNumber}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-medium">Total Amount:</span>
            <span className="text-green-600 font-bold text-lg">₹{total}</span>
          </div>
          <div className="pt-3 border-t border-gray-200">
            <p className="text-sm text-gray-600 text-center">
              A confirmation email will be sent to
            </p>
            <p className="text-sm font-medium text-gray-800 text-center mt-1">
              {email}
            </p>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={onClose}
          className="w-full bg-[#F18372] text-white py-3 rounded-lg font-medium hover:bg-[#ec543d] transition"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default OrderSuccessModal;