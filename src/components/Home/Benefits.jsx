import React from "react";
import HerbsImg from "../../assets/icon/Herbs.png";
import PcodImg from "../../assets/icon/PCOD.png";
import thyroid from "../../assets/icon/Thyroid.png";
import Leakage from "../../assets/icon/NoLeakage.png";
import kapok from "../../assets/icon/Kapok.png";
import peroid from "../../assets/icon/Peroid.png";
const Benefits = () => {
  // Mock image data - replace with your actual imports
  const benefits = [
    {
      icon: HerbsImg,
      title: "6+ Pure Herbal Ingredients",
      description:
        "Natural herbal blend for enhanced feminine wellness and care.",
      color: "from-green-400 to-green-600",
    },
    {
      icon: PcodImg,
      title: "Reducing PCOD",
      description: "Helps manage PCOD symptoms naturally and effectively.",
      color: "from-green-400 to-green-600",
    },
    {
      icon: thyroid,
      title: "Reducing Thyroid",
      description: "Natural support for thyroid health and hormonal balance.",
      color: "from-green-400 to-green-600",
    },
    {
      icon: Leakage,
      title: "No Leakage Issue",
      description:
        "Superior protection ensuring complete leak-proof experience.",
      color: "from-green-400 to-green-600",
    },
    {
      icon: kapok,
      title: "Fully Used Soft Kapok",
      description: "Ultra-soft natural kapok fiber for maximum comfort.",
      color: "from-green-400 to-green-600",
    },
    {
      icon: peroid,
      title: "Prevent Period Right Circulation",
      description: "Promotes healthy menstrual flow and proper circulation.",
      color: "from-green-400 to-green-600",
    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
        
        * {
          font-family: 'Poppins', sans-serif;
        }
        
        .benefit-card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .benefit-card:hover {
          transform: translateY(-8px);
        }
        
        .floating-animation {
          animation: float 6s ease-in-out infinite;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-10px) rotate(1deg); }
          50% { transform: translateY(-5px) rotate(-1deg); }
          75% { transform: translateY(-15px) rotate(1deg); }
        }
        
        .gradient-text {
          background: linear-gradient(135deg, #F18372, #93B45D);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>

      <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16">
            <div className="inline-block">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
                Benefits of Using <span className="text-[#93B45D]">Herbal</span>{" "}
                Napkin
              </h1>
              <div className="w-32 h-1.5 bg-gradient-to-r from-[#93B45D] to-[#F18372] mx-auto mb-6 rounded-full"></div>
            </div>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Experience the power of nature with our premium herbal napkins
              designed for your comfort and wellness
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="benefit-card group relative bg-[#0c6200] rounded-3xl p-8 shadow-lg hover:shadow-2xl border border-gray-100"
                style={{
                  animationDelay: `${index * 200}ms`,
                }}
              >
                {/* Background Gradient Overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${benefit.color} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-300`}
                ></div>

                {/* Icon */}
                <div className="relative mb-6  flex justify-center">
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${benefit.color} rounded-2xl flex items-center justify-center text-2xl text-white shadow-lg floating-animation`}
                  >
                    <img src={benefit.icon} alt={benefits.title} className="rounded-2xl" />
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center text-center">
                  <p className="text-xl font-bold text-[#F18372] mb-4 group-hover:text-[#F18372] transition-colors">
                    {benefit.title}
                  </p>
                  <p className="text-white leading-relaxed group-hover:text-[#ffddd8] transition-colors">
                    {benefit.description}
                  </p>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-br from-pink-200 to-green-200 rounded-full opacity-20"></div>
                <div className="absolute bottom-4 left-4 w-4 h-4 bg-gradient-to-br from-green-200 to-pink-200 rounded-full opacity-20"></div>
              </div>
            ))}
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 text-center">
            <div className="flex justify-center items-center space-x-8 text-slate-400">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">🌱</span>
                <span className="font-medium">100% Natural</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl">🔬</span>
                <span className="font-medium">Clinically Tested</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl">♻️</span>
                <span className="font-medium">Eco-Friendly</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Benefits;
