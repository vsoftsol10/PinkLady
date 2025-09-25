import React, { useState } from 'react';

const AddressModal = ({ isOpen, onClose, onAddAddress }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
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
    // Validation
    if (!formData.fullName || !formData.phone || !formData.email || !formData.address || !formData.city || !formData.state || !formData.zipCode) {
      alert('Please fill in all required fields');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert('Please enter a valid email address');
      return;
    }
    
    // Phone validation (basic)
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (!phoneRegex.test(formData.phone.replace(/[\s\-\(\)]/g, ''))) {
      alert('Please enter a valid phone number');
      return;
    }
    
    const addressData = {
      fullName: formData.fullName,
      phone: formData.phone,
      email: formData.email,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      zipCode: formData.zipCode,
      addressType: formData.addressType,
      displayString: `${formData.fullName}, ${formData.address}, ${formData.city}, ${formData.state} - ${formData.zipCode}`
    };
    
    onAddAddress(addressData);
    onClose();
    
    // Reset form
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      addressType: 'Home'
    });
  };

  const handleClose = () => {
    onClose();
    // Reset form on close
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      addressType: 'Home'
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Modal Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Add New Address</h2>
            <button
              onClick={handleClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
          
          {/* Form Fields */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#F18372] focus:ring-1 focus:ring-[#F18372] transition-colors"
                placeholder="Enter your full name"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#F18372] focus:ring-1 focus:ring-[#F18372] transition-colors"
                placeholder="Enter phone number"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#F18372] focus:ring-1 focus:ring-[#F18372] transition-colors"
                placeholder="Enter your email address"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address <span className="text-red-500">*</span>
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                rows="3"
                className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#F18372] focus:ring-1 focus:ring-[#F18372] resize-none transition-colors"
                placeholder="House no, Building, Street, Area"
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#F18372] focus:ring-1 focus:ring-[#F18372] transition-colors"
                  placeholder="City"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  State <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#F18372] focus:ring-1 focus:ring-[#F18372] transition-colors"
                  placeholder="State"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ZIP Code <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#F18372] focus:ring-1 focus:ring-[#F18372] transition-colors"
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
                className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#F18372] focus:ring-1 focus:ring-[#F18372] transition-colors"
              >
                <option value="Home">🏠 Home</option>
                <option value="Work">🏢 Work</option>
                <option value="Other">📍 Other</option>
              </select>
            </div>
            
            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="flex-1 py-2 bg-[#F18372] text-white rounded hover:bg-[#ec543d] transition-colors font-medium"
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

export default AddressModal;