import React from "react";
import organicProducts from "../../assets/icon/organicProducts.png";
import comfortProducts from "../../assets/icon/comfortProducts.png";
import ProductsIcon from "../../assets/icon/ProductsIcon.png"
const Unique = () => {
  return (
    <div className="bg-white py-16 px-4 relative overflow-hidden mb-8">
      <div className="max-w-7xl mx-auto relative">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Left Section - Curved Coral Shape */}
          <div className="lg:w-2/5 relative z-10 flex justify-center items-center">
            <div
              className="w-full h-40 lg:h-48 rounded-full flex justify-center items-center px-6"
              style={{
                maxWidth: "450px",
                background: "linear-gradient(135deg, #FF7A7A 0%, #FF9F7A 100%)",
              }}
            >
              <p className="text-white text-3xl lg:text-4xl font-bold font-sans leading-tight text-center">
                What Makes
                <br />
                Us Unique
              </p>
            </div>
          </div>

          {/* Right Section - Features Grid */}
          <div className="lg:w-3/5 lg:pl-12 mt-8 lg:mt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {/* Feature 1 - Organic Products */}
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-white rounded-full flex items-center justify-center shadow-md">
                  {/* Growth/Plant Icon */}
                  <img src={organicProducts} alt="Organic Products" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Organic Products
                </h3>
                <p className="text-gray-600 text-sm">100% natural product</p>
              </div>

              {/* Feature 2 - Comfort Products */}
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-white rounded-full flex items-center justify-center shadow-md">
                  {/* Heart with Care Icon */}
                  <img src={comfortProducts} alt="ComfortProducts" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Comfort Products
                </h3>
                <p className="text-gray-600 text-sm">100% natural product</p>
              </div>

              {/* Feature 3 - Organic Products */}
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-white rounded-full flex items-center justify-center shadow-md">
                  {/* Person/Community Icon */}
                  <img src={ProductsIcon} alt="Products Icon" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Organic Products
                </h3>
                <p className="text-gray-600 text-sm">100% natural product</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Unique;
