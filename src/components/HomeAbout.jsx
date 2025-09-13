import React from "react";
const HomeAbout = () => {
  return (
    <div className="bg-white-50 py-16 px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left side - Title */}
          <div className="text-center md:text-left">
            <h2 className="text-6xl md:text-7xl font-bold text-gray-800 mb-4">
              About
            </h2>
            <h3 className="text-5xl md:text-6xl text-gray-700 ">Pink Lady</h3>
          </div>

          {/* Right side - Content */}
          <div className="space-y-6">
            <p className="text-gray-600 leading-relaxed text-lg">
              Pink Lady is more than just a product - it's a promise of comfort.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
              euismod, nulla a tempus facilisis, justo erat semper augue, et
              luctus orci mauris vel lacus.
            </p>

            <button className="bg-pink-400 text-white px-8 py-3 rounded-full font-medium transition-colors duration-200 shadow-lg hover:shadow-xl">
              Know More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomeAbout;
