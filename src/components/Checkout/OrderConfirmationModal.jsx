import React from 'react';
import { useNavigate } from 'react-router-dom';

const OrderConfirmationModal = ({ 
  isOpen, 
  onClose, 
  orderDetails 
}) => {
  const navigate = useNavigate();

  // Add debugging
  console.log("=== MODAL RENDER DEBUG ===");
  console.log("isOpen:", isOpen);
  console.log("orderDetails:", orderDetails);
  console.log("Should render:", isOpen && orderDetails);
  console.log("========================");

  if (!isOpen || !orderDetails) {
    console.log("Modal not rendering - isOpen:", isOpen, "orderDetails:", !!orderDetails);
    return null;
  }

  const handleContinueShopping = () => {
    onClose();
    navigate('/products');
  };

  const handleViewOrders = () => {
    onClose();
    navigate('/orders');
  };

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center"
      style={{ zIndex: 9999 }}
    >
      {/* Backdrop with higher z-index */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        style={{ zIndex: 9999 }}
        onClick={onClose}
      />
      
      {/* Modal with even higher z-index */}
      <div 
        className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 transform transition-all"
        style={{ zIndex: 10000 }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M18 6L6 18M6 6l12 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Content */}
        <div className="p-8 text-center">
          {/* Success Icon */}
          <div className="mx-auto mb-6 w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <path
                d="M33.3333 20C33.3333 27.3638 27.3638 33.3333 20 33.3333C12.6362 33.3333 6.66666 27.3638 6.66666 20C6.66666 12.6362 12.6362 6.66666 20 6.66666C27.3638 6.66666 33.3333 12.6362 33.3333 20Z"
                fill="#22C55E"
              />
              <path
                d="M16.6667 20L18.3333 21.6667L23.3333 16.6667"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Order Placed Successfully!
          </h2>
          
          <p className="text-gray-600 mb-8">
            Thank you for your order. We'll process it shortly and send you updates.
          </p>

          {/* Order Details */}
          <div className="bg-gray-50 rounded-xl p-6 mb-8 text-left">
            <div className="space-y-3">
              <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                <span className="font-semibold text-gray-900">Order Number:</span>
                <span className="font-mono text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  {orderDetails.orderNumber}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Items:</span>
                <span className="font-medium text-gray-900">{orderDetails.itemCount}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Total Amount:</span>
                <span className="font-semibold text-lg text-green-600">₹{orderDetails.total}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Payment Method:</span>
                <span className="font-medium text-gray-900">{orderDetails.paymentMethod}</span>
              </div>
              
              <div className="pt-3 border-t border-gray-200">
                <span className="text-gray-600 text-sm">Delivery Address:</span>
                <p className="text-gray-900 text-sm mt-1 leading-relaxed">
                  {orderDetails.deliveryAddress}
                </p>
              </div>
            </div>
          </div>

          {/* Email Status */}
          <div className={`flex items-center justify-center gap-2 mb-8 p-3 rounded-lg ${
            orderDetails.emailSent 
              ? 'bg-green-50 text-green-700' 
              : 'bg-yellow-50 text-yellow-700'
          }`}>
            {orderDetails.emailSent ? (
              <>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M13.3333 8C13.3333 10.9455 10.9455 13.3333 8 13.3333C5.05448 13.3333 2.66666 10.9455 2.66666 8C2.66666 5.05448 5.05448 2.66666 8 2.66666C10.9455 2.66666 13.3333 5.05448 13.3333 8Z"
                    fill="currentColor"
                  />
                  <path
                    d="M6.66666 8L7.33333 8.66667L9.33333 6.66667"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-sm font-medium">Order confirmation sent to your email</span>
              </>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M8 1.33334C4.31811 1.33334 1.33333 4.31812 1.33333 8.00001C1.33333 11.6819 4.31811 14.6667 8 14.6667C11.6819 14.6667 14.6667 11.6819 14.6667 8.00001C14.6667 4.31812 11.6819 1.33334 8 1.33334Z"
                    fill="currentColor"
                  />
                  <path
                    d="M8 5.33334V8.00001M8 10.6667H8.00667"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-sm font-medium">Email confirmation pending</span>
              </>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleViewOrders}
              className="flex-1 bg-[#F18372] text-white py-3 px-6 rounded-lg hover:bg-[#ec543d] transition-colors font-medium"
            >
              View Orders
            </button>
            <button
              onClick={handleContinueShopping}
              className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              Continue Shopping
            </button>
          </div>

          {/* Additional Info */}
          <p className="text-xs text-gray-500 mt-6 leading-relaxed">
            You can track your order status in the "My Orders" section. 
            We'll notify you once your order is confirmed and shipped.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationModal;