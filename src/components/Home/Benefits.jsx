import React from 'react'
import HealthIcon from "../../assets/icon/Healthicon.png"
import ComfortIcon from "../../assets/icon/ComfortIcon.png"
import EcoFriendly from "../../assets/icon/Eco-Friendly.png"
import Benefit from "../../assets/Benefits.png"

const Benefits = () => {
return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
        
        * {
          font-family: 'Poppins', sans-serif;
        }
      `}</style>
      
      {/* Full-page center container with responsive padding */}
      <div className="flex items-center justify-center min-h-screen bg-white px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-7xl">
          <div className="text-center mt-8">
            <p className="text-2xl sm:text-3xl lg:text-4xl text-[#F18372] font-bold mb-4 px-2">
              Benefits of Using <span className="text-2xl sm:text-3xl lg:text-4xl text-[#93B45D]">Herbal</span> Napkin
            </p>
            <div className="w-16 sm:w-20 lg:w-24 h-1 bg-gradient-to-r from-[#F18372] to-[#F18372] mx-auto mb-6 rounded-full"></div>
          </div>
          
          <div className="flex flex-col lg:flex-row items-center justify-center gap-6 sm:gap-8 lg:gap-10">
            <img
              className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
              src={Benefit}
              alt="Benefits"
            />

            <div className="space-y-6 sm:space-y-8 lg:space-y-10 px-4 md:px-0 w-full lg:w-auto">
              {/* Health Benefits */}
              <div className="flex items-center justify-start gap-4 sm:gap-6 max-w-md mx-auto lg:mx-0">
                <div className="p-3 sm:p-4 aspect-square bg-violet-100 rounded-full flex-shrink-0">
                  <div className="w-8 h-8 sm:w-10 sm:h-9 ">
                                        <img src={HealthIcon} alt="EcoFriendly" />

                  </div>
                </div>
                <div className="space-y-2 flex-1">
                  <h3 className="text-lg sm:text-xl font-semibold text-slate-700">Health Benefits</h3>
                  <p className="text-sm sm:text-base text-slate-600">Prevents rashes, infections & maintains natural pH balance.</p>
                </div>
              </div>
              
              {/* Comfort Benefits */}
              <div className="flex items-center justify-start gap-4 sm:gap-6 max-w-md mx-auto lg:mx-0">
                <div className="p-3 sm:p-4 lg:p-5 aspect-square bg-green-100 rounded-full flex-shrink-0">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 ">
                                        <img src={ComfortIcon} alt="EcoFriendly" />

                  </div>
                </div>
                <div className="space-y-2 flex-1">
                  <h3 className="text-lg sm:text-xl font-semibold text-slate-700">Comfort Benefits</h3>
                  <p className="text-sm sm:text-base text-slate-600">Soft, breathable, and soothing for all-day freshness.</p>
                </div>
              </div>
              
              {/* Eco-Friendly Choice */}
              <div className="flex items-center justify-start gap-4 sm:gap-6 max-w-md mx-auto lg:mx-0">
                <div className="p-3 sm:p-4 lg:p-5 aspect-square bg-orange-100 rounded-full flex-shrink-0">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 ">
                    <img src={EcoFriendly} alt="EcoFriendly" />
                  </div>
                </div>
                <div className="space-y-2 flex-1">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-700">Eco-Friendly Choice</h3>
                  <p className="text-sm sm:text-base text-slate-600">Biodegradable, sustainable, and safe for the planet.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Benefits
