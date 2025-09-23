import React from "react";
import Supiror from "../../assets/superiorcomfort.png";
import Leak from "../../assets/Leakage-proof.png";
import Breathable from "../../assets/Breathable-Design.png";
import Afford from "../../assets/Affordable.png";
import { useNavigate } from "react-router-dom";

const WhyPinkLady = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);

    // Delay the scroll slightly so it happens after navigation/render
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 100);
  };

  const features = [
    {
      backgroundImage: Supiror,
      title: "Superior Comfort",
      description: "Ultra-soft materials that don't irritate",
    },
    {
      backgroundImage: Leak,
      title: "Leak-Proof Protection",
      description: "Advanced absorption technology",
    },
    {
      backgroundImage: Breathable,
      title: "Breathable Design",
      description: "Fresh airflow prevents discomfort",
    },
    {
      backgroundImage: Afford,
      title: "Affordable Quality",
      description: "Premium quality at accessible prices",
    },
  ];

  return (
    <section className="py-16 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 ">
            Why{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F18372] to-[#F18372]">
              Pink Lady
            </span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#93B45D] to-[#F18372] mx-auto mb-6 rounded-full"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We believe comfort, hygiene, and confidence should never be
            compromised. Our napkins offer the perfect blend of protection,
            softness, and care for your daily confidence.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group rounded-xl shadow-md  hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden min-h-[200px] border border-gray-100"
              style={{
                backgroundImage: `url(${feature.backgroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* Content */}
              <div className="relative z-10 p-6 h-full flex flex-col justify-end">
                {/* Semi-transparent background for overlay */}
                <div className="absolute inset-0 bg-amber-50/60 rounded-xl"></div>

                {/* Text content */}
                <div className="relative flex-1 flex flex-col justify-end">
                  <p className="text-lg font-serif font-extrabold mb-2 text-green-900 drop-shadow-md">
                    {feature.title}
                  </p>
                  <p className="text-[#63241a] text-md font-sans leading-relaxed drop-shadow-md">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="bg-[#0c6200] rounded-2xl p-8 text-center text-white shadow-lg">
          <p className="text-3xl font-bold mb-3 text-white font-serif">
            More Than Just Protection
          </p>
          <p className="text-orange-100 mb-6 max-w-2xl mx-auto">
            Pink Lady Herbal Napkins deliver natural confidence, gentle comfort,
            and herbal care for every woman, every day.
          </p>
          <button
            className="px-6 py-3 bg-[#F18372] text-white font-semibold cursor-pointer rounded-full hover:bg-[#ee5e48] transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            onClick={(e) => {
              e.preventDefault(); // prevent full page reload
              handleNavigation("/products");
            }}
          >
            Shop Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default WhyPinkLady;
