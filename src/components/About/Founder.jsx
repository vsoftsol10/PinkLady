import React from 'react'
import FounderImage from "../../assets/About/Founder.png"
const Founder = () => {
  return (
    <div className="w-full  py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Side - Text Content */}
              <div className="block ">                <div 
                  className="flex justify-center r cursor-pointer transition-transform duration-300 hover:scale-105"
                >
                  {/* Replace the src with your image path */}
                  <img
                    src={FounderImage} // Replace with your image path
                    alt="Contact us - Click to get in touch"
                    className="w-90 h-auto rounded-2xl   object-cover"
                  />
                 
                </div>
                 <h2 className='text-4xl text-center mt-4 shadow-xl'>Mrs. Valli</h2>
              </div>
    
              {/* Right Side - Clickable Image */}
              
              <div className="space-y-6">
                {/* <div>
                  
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 leading-tight">
                    Get In <span className="text-[#F18372] font-poppins">Touch</span>
                  </h2>
                </div> */}
                
                <div className="space-y-4">
                  <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-serif">
                    <span className="font-semibold text-gray-900 font-serif">Woman Entrepreneurs</span>  are leaders who break barriers, drive innovation, and inspire with resilience and vision. Despite challenges like limited resources and social constraints, they continue to create businesses that empower communities, promote diversity, and contribute to economic growth. Their journeys highlight adaptability, determination, and leadership with empathy, making them powerful role models for future generations.
                  </p>
                 
                </div>
              </div>
            </div>
          </div>
        </div>
  )
}

export default Founder