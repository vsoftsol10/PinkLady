import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import  image from "../../assets/popup.jpeg"
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
    <div className="fixed inset-0 z-[9999] flex items-center justify-center w-full h-full  bg-opacity-50 p-4 sm:p-6 ">
      <div className="relative  rounded-lg shadow-2xl w-full  max-w-[95vw] sm:max-w-md md:max-w-lg p-4 sm:p-6 animate-[scale-in_0.3s_ease-out]">
        {/* Close Button */}
        <button
          onClick={closePopup}
          className="absolute -top-2 -right-2 sm:top-0 sm:right-0  rounded-full p-1 shadow-lg text-red-400 hover:text-red-600 transition-colors z-10"
          aria-label="Close popup"
        >
          <X size={20} className="sm:w-6 sm:h-6" />
        </button>

        {/* Popup Content */}
        <div className="text-center">
          {/* Image */}
          <div className="w-full">
            <img 
              src={image}
              alt="Welcome"
              className="w-full h-auto object-cover rounded-lg"
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