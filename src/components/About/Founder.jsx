import React from "react";
import FounderImage from "../../assets/About/Founder.jpeg";
const Founder = () => {
  return (
    <div className="w-full py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto mt-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ">
          {/* Left Side - Text Content */}
          <div className="block ">
            <div className="flex justify-center r cursor-pointer transition-transform duration-300 hover:scale-105">
              {/* Replace the src with your image path */}
              <img
                src={FounderImage} // Replace with your image path
                alt="Contact us - Click to get in touch"
                className="w-90 h-auto rounded-2xl   object-cover"
              />
            </div>
            <div className="text-center mt-4 shadow-xl ">
              <h2 className="text-4xl ">Mrs. Valli</h2>
              <p className="text-2xl font-serif font-bold  ">Founder</p>
            </div>
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
                <span className="font-semibold text-gray-900 font-serif">
                  Mrs. Valli
                </span>
                , Founder of <b>PinkLady </b>, hails from a family with a strong
                traditional medical background. Inspired by her grandmother
                ("Aachi"), a renowned traditional healer, she discovered the
                power of natural remedies during her own struggle with menstrual
                health issues. Guided by her grandmother’s wisdom and using
                medicinal herbs like turmeric and neem with natural cotton, she
                regained her health and found new purpose. This personal journey
                motivated her to establish PinkLady, with a mission to provide
                women safe, eco-friendly, and herbal-based solutions. With
                resilience and vision, she now leads the brand, blending
                ancestral knowledge with modern innovation to empower women’s
                wellness.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Founder;
