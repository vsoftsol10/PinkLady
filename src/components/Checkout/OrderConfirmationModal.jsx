import React from 'react';

const OrderConfirmationModal = ({ isOpen, onClose, orderDetails, onContinueShopping }) => {
  // Comprehensive debugging
  React.useEffect(() => {
    console.log('=== MODAL PROPS DEBUG ===');
    console.log('isOpen:', isOpen, typeof isOpen);
    console.log('orderDetails:', orderDetails);
    console.log('onClose:', typeof onClose);
    console.log('onContinueShopping:', typeof onContinueShopping);
    console.log('========================');
  }, [isOpen, orderDetails, onClose, onContinueShopping]);

  // Force render if we have any truthy isOpen value
  if (!isOpen) {
    console.log('Modal not rendering - isOpen is:', isOpen);
    return null;
  }

  if (!orderDetails) {
    console.log('Modal not rendering - no orderDetails');
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-lg">
          <p>Loading order details...</p>
        </div>
      </div>
    );
  }

  console.log('✅ MODAL IS RENDERING!');

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center" style={{ zIndex: 9999 }}>
      <div className="bg-white rounded-lg shadow-2xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="relative p-6 text-center bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-lg">
          {/* Close Button */}
          <button
            onClick={() => {
              console.log('Close button clicked');
              if (onClose) onClose();
            }}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Success Icon */}
          <div className="mb-4">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

          {/* Success Message */}
          <h2 className="text-2xl font-bold text-gray-800 mb-2">YAY! Order Confirmed</h2>
          <p className="text-gray-600">Thank you for your purchase!</p>
        </div>

        {/* Order Details */}
        <div className="p-6 space-y-4">
          {/* Order Number */}
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500 uppercase tracking-wide">Order Number</p>
            <p className="text-lg font-semibold text-gray-800">{orderDetails.orderNumber}</p>
          </div>

          {/* Customer Details */}
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-800 border-b pb-2">Order Details</h3>
            
            {/* Email */}
            <div className="flex justify-between items-start">
              <span className="text-sm text-gray-500 font-medium">Email:</span>
              <span className="text-sm text-gray-800 text-right flex-1 ml-4">{orderDetails.customerEmail}</span>
            </div>

            {/* Delivery Address */}
            <div className="flex justify-between items-start">
              <span className="text-sm text-gray-500 font-medium">Delivery To:</span>
              <span className="text-sm text-gray-800 text-right flex-1 ml-4">{orderDetails.deliveryAddress}</span>
            </div>

            {/* Payment Method */}
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500 font-medium">Payment:</span>
              <span className="text-sm text-gray-800">{orderDetails.paymentMethod}</span>
            </div>

            {/* Items Count */}
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500 font-medium">Items:</span>
              <span className="text-sm text-gray-800">{orderDetails.itemCount} item{orderDetails.itemCount !== 1 ? 's' : ''}</span>
            </div>

            {/* Total Amount */}
            <div className="flex justify-between items-center pt-2 border-t">
              <span className="text-base font-semibold text-gray-800">Total Amount:</span>
              <span className="text-lg font-bold text-green-600">₹{orderDetails.total}</span>
            </div>
          </div>

          {/* Email Status */}
          <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
            <div className="flex items-center gap-2">
              {orderDetails.emailSent ? (
                <>
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-blue-800">Order confirmation sent to your email</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <span className="text-sm text-amber-800">Email notification pending</span>
                </>
              )}
            </div>
          </div>

          {/* Expected Delivery */}
          <div className="p-3 rounded-lg bg-green-50 border border-green-200">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              <span className="text-sm text-green-800">Expected delivery: 3-5 business days</span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t bg-gray-50 rounded-b-lg">
          <button
            onClick={() => {
              console.log('Continue Shopping clicked');
              if (onContinueShopping) onContinueShopping();
            }}
            className="w-full bg-[#F18372] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#ec543d] transition-colors duration-200"
          >
            Continue Shopping
          </button>
          
          <p className="text-xs text-gray-500 text-center mt-3">
            Track your order status in your email or contact support for any queries.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationModal;