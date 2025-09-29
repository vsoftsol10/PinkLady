import React from 'react';
import Ordernow from "../assets/OrderNow.png"

const FloatingIcons = () => {
  const openWhatsApp = () => {
    // Replace with your WhatsApp number (include country code without + sign)
    const phoneNumber = "9080895118"; // Example: "919876543210" for India
    const message = "Hello! I'm interested in your services."; // Default message
    
    // WhatsApp web URL format
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank');
  };

  const navigateToProducts = () => {
    // Replace '/products' with your actual products page route
    window.location.href = '/products';
    // Or if using React Router: navigate('/products');
  };

  const openInstagram = () => {
    // Replace with your Instagram username
    const instagramUsername = "your_instagram_username";
    const instagramUrl = `https://www.instagram.com/paapatchi_enterprises/?igsh=MWc4eTJ6dHkwejZreQ%3D%3D#`;
    window.open(instagramUrl, '_blank');
  };

  return (
    <div className="fixed bottom-4 left-4 md:bottom-6 md:left-6 z-50 flex flex-col gap-2 md:gap-3">
      {/* Order Now Icon */}
      <button
        className="
          w-14 h-14 md:w-16 md:h-16
          bg-none
          rounded-full 
          shadow-lg hover:shadow-xl
          transition-all duration-300 ease-in-out
          flex items-center justify-center
          focus:outline-none focus:ring-2 md:focus:ring-4 focus:ring-orange-300
          group
          opacity-100 translate-y-0 scale-100
          relative
          overflow-hidden
        "
        onClick={navigateToProducts}
        aria-label="Order Now"
        title="Order Now - View Products"
      >
        <img src={Ordernow} alt="Order Now" className="w-full h-full object-contain" />
        
        {/* Pulse animation ring */}
        <div className="absolute inset-0 rounded-full bg-orange-400 opacity-0"></div>
        
        {/* "ORDER NOW" text that appears on hover - hidden on mobile */}
        <div className="hidden md:block absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          ORDER NOW
        </div>
      </button>

      {/* WhatsApp Icon */}
      <button
        className="
          w-12 h-12 md:w-14 md:h-14
          bg-green-500 hover:bg-green-600 
          text-white 
          rounded-full 
          shadow-lg hover:shadow-xl
          transition-all duration-300 ease-in-out
          flex items-center justify-center
          focus:outline-none focus:ring-2 md:focus:ring-4 focus:ring-green-300
          group
          opacity-100 translate-y-0 scale-100
        "
        onClick={openWhatsApp}
        aria-label="Chat on WhatsApp"
        title="Chat on WhatsApp"
      >
        <svg
          className="w-7 h-7 md:w-8 md:h-8 group-hover:scale-110 transition-transform duration-200"
          viewBox="0 0 24 24"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.516"/>
        </svg>
        
        {/* Pulse animation ring */}
        <div className="absolute inset-0 rounded-full bg-green-400 opacity-0"></div>
      </button>

      {/* Instagram Icon */}
      <button
        className="
          w-12 h-12 md:w-14 md:h-14
          bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 hover:from-purple-600 hover:via-pink-600 hover:to-orange-500
          text-white 
          rounded-full 
          shadow-lg hover:shadow-xl
          transition-all duration-300 ease-in-out
          flex items-center justify-center
          focus:outline-none focus:ring-2 md:focus:ring-4 focus:ring-pink-300
          group
          opacity-100 translate-y-0 scale-100
        "
        onClick={openInstagram}
        aria-label="Follow on Instagram"
        title="Follow on Instagram"
      >
        <svg
          className="w-7 h-7 md:w-8 md:h-8 group-hover:scale-110 transition-transform duration-200"
          viewBox="0 0 24 24"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
        
        {/* Pulse animation ring */}
        <div className="absolute inset-0 rounded-full bg-pink-400 opacity-0"></div>
      </button>
    </div>
  );
};

export default FloatingIcons;