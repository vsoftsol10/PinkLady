import React from 'react';
import Contact from "../../assets/ContactUs.png"

const HomeContact = () => {
  const handleContactClick = () => {

  };

  return (
    <div className="w-full  py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text Content */}
          <div className="space-y-6">
            <div>
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 leading-tight">
                Get In <span className="text-[#F18372] font-poppins">Touch</span>
              </h2>
            </div>
            
            <div className="space-y-4">
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                <span className="font-semibold text-gray-900">Feel Free</span> to ask any questions and queries
              </p>
              <p className="text-lg md:text-xl text-gray-700">
                with us !
              </p>
            </div>
          </div>

          {/* Right Side - Clickable Image */}
          <div className="relative">
            <div 
              className="flex justify-center r cursor-pointer transition-transform duration-300 hover:scale-105"
              onClick={handleContactClick}
            >
              {/* Replace the src with your image path */}
              <img
                src={Contact} // Replace with your image path
                alt="Contact us - Click to get in touch"
                className="w-90 h-auto rounded-2xl  shadow-2xl object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeContact;