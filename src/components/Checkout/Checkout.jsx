import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CartImage from "../../assets/Cart.png"
import { useCart } from "../../context/CartContext";

// Address Modal Component (keeping the same)
const AddressModal = ({ isOpen, onClose, onAddAddress }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    addressType: 'Home'
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    if (!formData.fullName || !formData.phone || !formData.address || !formData.city || !formData.state || !formData.zipCode) {
      alert('Please fill in all required fields');
      return;
    }
    
    const addressString = `${formData.fullName}, ${formData.address}, ${formData.city}, ${formData.state} - ${formData.zipCode}`;
    onAddAddress(addressString);
    onClose();
    
    setFormData({
      fullName: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      addressType: 'Home'
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Add New Address</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#F18372]"
                placeholder="Enter your full name"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#F18372]"
                placeholder="Enter phone number"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                rows="3"
                className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#F18372] resize-none"
                placeholder="House no, Building, Street, Area"
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#F18372]"
                  placeholder="City"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">State *</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#F18372]"
                  placeholder="State"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code *</label>
              <input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#F18372]"
                placeholder="ZIP Code"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address Type</label>
              <select
                name="addressType"
                value={formData.addressType}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#F18372]"
              >
                <option value="Home">Home</option>
                <option value="Work">Work</option>
                <option value="Other">Other</option>
              </select>
            </div>
            
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="flex-1 py-2 bg-[#F18372] text-white rounded hover:bg-[#ec543d] transition"
              >
                Add Address
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Checkout = () => {
  const [showAddress, setShowAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [savedAddresses, setSavedAddresses] = useState([
    "New York, USA",
    "Los Angeles, USA"
  ]);
  
  const navigate = useNavigate();
  
  // Use cart context instead of location state
  const { cartItems, updateQuantity, removeFromCart, subtotal, tax, total, itemCount, clearCart } = useCart();

  // Handle adding new address
  const handleAddAddress = (newAddress) => {
    setSavedAddresses([...savedAddresses, newAddress]);
    setSelectedAddress(newAddress);
  };

  // Place Order handler
  const handlePlaceOrder = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty. Please add some items before placing an order.");
      navigate("/products");
      return;
    }
    
    if (!selectedAddress) {
      alert("Please select or add an address before placing the order.");
      return;
    }
    
    alert(
      `Order placed successfully!\n\nTotal: ₹${total}\nPayment Method: ${paymentMethod}\nAddress: ${selectedAddress}\nItems: ${cartItems.length}`
    );
    
    // Clear cart after successful order
    clearCart();
    navigate("/products");
  };

  // Show empty cart message when no products
  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 max-w-6xl w-full px-6 mx-auto min-h-[500px]">
        <div className="text-center">
          <div className="mb-6 flex justify-center">
            <img src={CartImage} alt="Empty Cart" />
          </div>
          
          <h1 className="text-3xl font-medium mb-4 text-gray-800">Your Cart is Empty</h1>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">
            Looks like you haven't added any items to your cart yet. Start shopping to fill it up!
          </p>
          
          <button
            onClick={() => navigate("/products")}
            className="bg-[#F18372] text-white px-8 py-3 rounded-lg hover:bg-[#ec543d] transition font-medium"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col md:flex-row py-16 max-w-6xl w-full px-6 mx-auto">
        {/* Cart Section */}
        <div className="flex-1 max-w-4xl">
          <h1 className="text-3xl font-medium mb-6">
            Shopping Cart <span className="text-lg text-[#93B45D]">{itemCount} Items</span>
          </h1>

          {/* Headers */}
          <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-medium pb-3">
            <p className="text-left">Product Details</p>
            <p className="text-center">Subtotal</p>
            <p className="text-center">Action</p>
          </div>

          {/* Products */}
          {cartItems.map((product) => (
            <div key={product.id} className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 items-center text-sm md:text-base font-medium pt-3 border-b border-gray-200 pb-3">
              <div className="flex items-center md:gap-6 gap-3">
                <div className="cursor-pointer w-24 h-24 flex items-center justify-center border border-gray-300 rounded overflow-hidden">
                  <img className="max-w-full h-full object-cover" src={product.image} alt={product.name} />
                </div>
                <div>
                  <p className="font-semibold text-gray-800 mb-1">{product.name}</p>
                  <p className="text-sm text-gray-500 mb-1">Category: {product.category}</p>
                  <div className="font-normal text-gray-500/70">
                    <p>Size: <span>{product.size || "N/A"}</span></p>
                    <div className="flex items-center">
                      <p>Qty:</p>
                      <select
                        value={product.quantity}
                        onChange={(e) => updateQuantity(product.id, parseInt(e.target.value))}
                        className="outline-none ml-1 border border-gray-300 rounded px-1"
                      >
                        {Array(10).fill("").map((_, index) => (
                          <option key={index} value={index + 1}>{index + 1}</option>
                        ))}
                      </select>
                    </div>
                    <p className="text-xs text-gray-400">₹{product.offerPrice} each</p>
                  </div>
                </div>
              </div>
              <p className="text-center font-semibold text-gray-800">₹{product.offerPrice * product.quantity}</p>
              <button className="cursor-pointer mx-auto" onClick={() => removeFromCart(product.id)}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="m12.5 7.5-5 5m0-5 5 5m5.833-2.5a8.333 8.333 0 1 1-16.667 0 8.333 8.333 0 0 1 16.667 0"
                    stroke="#FF532E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          ))}

          <button className="group cursor-pointer flex items-center mt-8 gap-2 text-[#F18372] font-medium"
              onClick={() => navigate("/products")}
          >
            <svg width="15" height="11" viewBox="0 0 15 11" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.09 5.5H1M6.143 10 1 5.5 6.143 1"
                stroke="#F18372" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Continue Shopping
          </button>
        </div>

        {/* Order Summary */}
        <div className="max-w-[360px] w-full bg-gray-100/40 p-5 max-md:mt-16 border border-gray-300/70">
          <h2 className="text-xl md:text-xl font-medium">Order Summary</h2>
          <hr className="border-gray-300 my-5" />

          <div className="mb-6">
            {/* Address */}
            <p className="text-sm font-medium uppercase">Delivery Address</p>
            <div className="relative flex justify-between items-start mt-2">
              <p className="text-gray-500">{selectedAddress || "No address found"}</p>
              <button
                onClick={() => setShowAddress(!showAddress)}
                className="text-[#F18372] hover:underline cursor-pointer"
              >
                Change
              </button>
              {showAddress && (
                <div className="absolute top-12 py-1 bg-white border border-gray-300 text-sm w-full z-10 shadow-lg">
                  {savedAddresses.map((address, index) => (
                    <p key={index} 
                       onClick={() => { setSelectedAddress(address); setShowAddress(false); }}
                       className="text-gray-500 p-2 hover:bg-gray-100 cursor-pointer">
                      {address}
                    </p>
                  ))}
                  <p onClick={() => { setIsAddressModalOpen(true); setShowAddress(false); }}
                     className="text-[#F18372] text-center cursor-pointer p-2 hover:bg-indigo-500/10 border-t">
                    + Add New Address
                  </p>
                </div>
              )}
            </div>

            {/* Payment */}
            <p className="text-sm font-medium uppercase mt-6">Payment Method</p>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full border border-gray-300 bg-white px-3 py-2 mt-2 outline-none"
            >
              <option value="COD">Cash On Delivery</option>
              <option value="Online">Online Payment</option>
              <option value="Card">Credit/Debit Card</option>
            </select>
          </div>

          <hr className="border-gray-300" />

          {/* Price Calculation */}
          <div className="text-gray-500 mt-4 space-y-2">
            <p className="flex justify-between">
              <span>Price ({itemCount} items)</span>
              <span>₹{subtotal}</span>
            </p>
            <p className="flex justify-between">
              <span>Shipping Fee</span>
              <span className="text-green-600">Free</span>
            </p>
            <p className="flex justify-between">
              <span>Tax (2%)</span><span>₹{tax}</span>
            </p>
            <hr className="border-gray-300 my-2" />
            <p className="flex justify-between text-lg font-medium text-gray-800">
              <span>Total Amount:</span><span>₹{total}</span>
            </p>
          </div>

          {/* Place Order */}
          <button
            onClick={handlePlaceOrder}
            className="w-full py-3 mt-6 cursor-pointer bg-[#F18372] text-white font-medium hover:bg-[#ec543d] transition rounded"
          >
            Place Order
          </button>
        </div>
      </div>

      {/* Address Modal */}
      <AddressModal 
        isOpen={isAddressModalOpen}
        onClose={() => setIsAddressModalOpen(false)}
        onAddAddress={handleAddAddress}
      />
    </>
  );
};

export default Checkout;