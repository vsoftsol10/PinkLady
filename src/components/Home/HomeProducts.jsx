import React from 'react'
import image from "../../assets/napkin.png"

const HomeProducts = () => {
   const products = [
       {
           id: 1,
           name: "Herbal Day Napkin",
           image: image,
           description: "Natural comfort for daily use with organic herbs",
           price: "₹299",
           features: ["100% Organic", "Rash-free", "Super Absorbent"]
       },
       {
           id: 2,
           name: "Herbal Night Napkin", 
           image: image,
           description: "Extra protection for overnight comfort",
           price: "₹349",
           features: ["Extended Length", "Anti-bacterial", "Odor Control"]
       },
       {
           id: 3,
           name: "Herbal Panty Liner",
           image: image,
           description: "Light protection with herbal freshness",
           price: "₹199",
           features: ["Ultra-thin", "Breathable", "Natural Herbs"]
       },
       {
           id: 4,
           name: "Herbal Heavy Flow",
           image: image,
           description: "Maximum protection with herbal care",
           price: "₹399",
           features: ["Heavy Duty", "Leak-proof", "Herbal Comfort"]
       }
   ];

   return (
        <>
            <div className=" max-w-7xl mx-auto py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
                {/* Header Section - Responsive Typography */}
                <div className="text-center  mb-8 sm:mb-12">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-slate-800 mb-2 font-poppins px-2">
                        Herbal Products
                    </h2>
                    <p className="text-sm sm:text-base text-slate-600 font-poppins px-4 max-w-2xl mx-auto">
                        India's One and Only Customizable <b>HERBAL</b> Napkin.
                    </p>
                </div>
                
                {/* Products Grid - Fully Responsive */}
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-7xl mx-auto mb-8 sm:mb-12'>
                    {products.map((product) => (
                        <div key={product.id} className="group w-full h-72 sm:h-80 [perspective:1000px] cursor-pointer">
                            <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                                {/* Front Side - Product Image */}
                                <div className="absolute w-full h-full [backface-visibility:hidden] flex flex-col items-center justify-center rounded-xl bg-[#93B45D] border border-green-200 shadow-lg p-4 sm:p-6">
                                    <div className="text-4xl sm:text-5xl lg:text-6xl mb-3 sm:mb-4">
                                        <img src={product.image} alt={product.name} className="w-24 h-24 sm:w-26 sm:h-26 lg:w-50 lg:h-50 object-contain" />
                                    </div>
                                    <p className="text-base sm:text-lg font-semibold text-green-800 text-center font-serif px-2 leading-tight">
                                        {product.name}
                                    </p>
                                    <div className="mt-3 sm:mt-4 px-3 py-1 bg-green-200 rounded-full">
                                        <span className="text-green-800 text-sm font-medium">{product.price}</span>
                                    </div>
                                </div>
                
                                {/* Back Side - Product Details */}
                                <div className="absolute w-full h-full [backface-visibility:hidden] flex flex-col justify-between rounded-xl bg-[#F18372] text-white [transform:rotateY(180deg)] shadow-lg p-4 sm:p-6">
                                    <div className="flex-1">
                                        <p className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 font-poppins leading-tight">
                                            {product.name}
                                        </p>
                                        <p className="text-green-100 mb-3 sm:mb-4 text-xs sm:text-sm font-poppins leading-relaxed">
                                            {product.description}
                                        </p>
                                        <ul className="space-y-1 mb-3 sm:mb-4">
                                            {product.features.map((feature, index) => (
                                                <li key={index} className="text-green-100 text-xs sm:text-sm flex items-center">
                                                    <span className="w-1.5 h-1.5 bg-green-300 rounded-full mr-2 flex-shrink-0"></span>
                                                    <span className="leading-tight">{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="space-y-2 sm:space-y-3">
                                        <div className="text-xl sm:text-2xl font-bold text-center">{product.price}</div>
                                        <button className="w-full bg-gradient-to-r from-[#93B45D] to-[#93B45D] px-3 sm:px-4 py-2 sm:py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors duration-200 shadow-md font-poppins text-sm sm:text-base">
                                            Buy Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA Button - Responsive */}
                <div className="flex justify-center px-4">
                    <button className="bg-[#F18372] hover:bg-[#e67362] text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-medium transition-all duration-200 shadow-lg hover:shadow-xl font-poppins text-sm sm:text-base w-full sm:w-auto max-w-xs">
                        Check Our Products
                    </button>
                </div>
            </div>
        </>
    );
}

export default HomeProducts