import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import image from "../../assets/popup.jpeg"

export default function WelcomePopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show popup after a short delay when component mounts
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const closePopup = () => {
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center w-full h-full bg-black bg-opacity-50 p-4">
      <div className="relative  rounded-lg shadow-2xl max-w-md w-full p-6 animate-[scale-in_0.3s_ease-out]">
        {/* Close Button */}
        <button
          onClick={closePopup}
          className="relative bottom-1 left-100 text-red-400 hover:text-red-600 transition-colors"
          aria-label="Close popup"
        >
          <X size={24} />
        </button>

        {/* Popup Content */}
        <div className="text-center">
          {/* Image */}
          <div className="mb-4">
            <img 
              src={image} 
              alt="Welcome"
              className="w-full h-full object-cover rounded-lg mb-4"
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scale-in {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}