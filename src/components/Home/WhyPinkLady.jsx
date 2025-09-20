import React from 'react';
import { useNavigate } from 'react-router-dom';

const WhyPinkLady = () => {
  const navigate=useNavigate();

  const handleNavigation = (path) => {
    navigate(path);

    // Delay the scroll slightly so it happens after navigation/render
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 100);
  };
  const features = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      title: "Superior Comfort",
      description: "Ultra-soft materials that don't irritate"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: "Leak-Proof Protection",
      description: "Advanced absorption technology"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM7 3H5a2 2 0 00-2 2v12a4 4 0 004 4h2M9 3h6a2 2 0 012 2v12a4 4 0 01-4 4H9" />
        </svg>
      ),
      title: "Breathable Design",
      description: "Fresh airflow prevents discomfort"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
        </svg>
      ),
      title: "Affordable Quality",
      description: "Premium quality at accessible prices"
    }
  ];

  return (
    <section className="py-16 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 ">
            Why <span className="text-transparent bg-clip-text bg-[#F18372]">Pink Lady</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#93B45D] to-[#F18372] mx-auto mb-6 rounded-full"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We believe comfort, hygiene, and confidence should never be compromised. Our napkins offer 
            the perfect blend of protection, softness, and care for your daily confidence.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
            >
              <div className="flex items-center justify-center w-12 h-12 bg-[#F18372] rounded-lg text-white mb-4 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="bg-[#93B45D]  rounded-2xl p-8 text-center text-white shadow-lg">
          <p className="text-3xl font-bold mb-3 text-white font-serif">
            More Than Just Protection
          </p>
          <p className="text-orange-100 mb-6 max-w-2xl mx-auto">
            Pink Lady Herbal Napkins deliver natural confidence, gentle comfort, and herbal care for every woman, every day.
          </p>
          <button className="px-6 py-3 bg-[#F18372] text-white font-semibold cursor-pointer rounded-full hover:bg-[#ee5e48] transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
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