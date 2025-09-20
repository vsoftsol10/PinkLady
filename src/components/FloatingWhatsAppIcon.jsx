import React from 'react';

const FloatingWhatsAppIcon = () => {
  const openWhatsApp = () => {
    // Replace with your WhatsApp number (include country code without + sign)
    const phoneNumber = "9940032147"; // Example: "919876543210" for India
    const message = "Hello! I'm interested in your services."; // Default message
    
    // WhatsApp web URL format
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank');
  };

  return (
    <button
      className="
        fixed bottom-6 left-6 z-50
        w-14 h-14 
        bg-green-500 hover:bg-green-600 
        text-white 
        rounded-full 
        shadow-lg hover:shadow-xl
        transition-all duration-300 ease-in-out
        flex items-center justify-center
        focus:outline-none focus:ring-4 focus:ring-green-300
        group
        opacity-100 translate-y-0 scale-100
      "
      onClick={openWhatsApp}
      aria-label="Chat on WhatsApp"
      title="Chat on WhatsApp"
    >
      {/* WhatsApp Icon */}
      <svg
        className="w-7 h-7 group-hover:scale-110 transition-transform duration-200"
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.516"/>
      </svg>

      {/* Pulse animation ring */}
      <div className="absolute inset-0 rounded-full bg-green-400  opacity-0"></div>
    </button>
  );
};

export default FloatingWhatsAppIcon;