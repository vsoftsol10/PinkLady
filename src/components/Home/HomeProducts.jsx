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
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
            
                .font-poppins {
                    font-family: 'Poppins', sans-serif;
                }
            `}</style>
            
            <div className="py-12 px-4">
                <h2 className="text-4xl font-medium text-slate-800 text-center mb-2 font-poppins">Herbal Products</h2>
                <p className="text-slate-600 mb-12 font-poppins text-center">India's One and Only Customizable <b>HERBAL</b> Napkin.</p>
                
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-12'>
                    {products.map((product) => (
                        <div key={product.id} className="group w-full h-80 [perspective:1000px] cursor-pointer">
                            <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                                {/* Front Side - Product Image */}
                                <div className="absolute w-full h-full [backface-visibility:hidden] flex flex-col items-center justify-center rounded-xl bg-[#93B45D] border border-green-200 shadow-lg p-6">
                                    <div className="text-6xl mb-4"><img src={product.image} alt="" /></div>
                                    <p className="text-lg font-semibold text-green-800 text-center font-serif">{product.name}</p>
                                    <div className="mt-4 px-3 py-1 bg-green-200 rounded-full">
                                        <span className="text-green-800 text-sm font-medium">{product.price}</span>
                                    </div>
                                </div>
                
                                {/* Back Side - Product Details */}
                                <div className="absolute w-full h-full [backface-visibility:hidden] flex flex-col justify-between rounded-xl bg-[#F18372] text-white [transform:rotateY(180deg)] shadow-lg p-6">
                                    <div>
                                        <p className="text-xl font-semibold mb-3 font-poppins">{product.name}</p>
                                        <p className="text-green-100 mb-4 text-sm font-poppins leading-relaxed">{product.description}</p>
                                        <ul className="space-y-1 mb-4">
                                            {product.features.map((feature, index) => (
                                                <li key={index} className="text-green-100 text-sm flex items-center">
                                                    <span className="w-1.5 h-1.5 bg-green-300 rounded-full mr-2"></span>
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="text-2xl font-bold text-center">{product.price}</div>
                                        <button className="w-full bg-gradient-to-r from-[#93B45D] to-[#93B45D] px-4 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors duration-200 shadow-md font-poppins">
                                            Buy Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex justify-center">
                    <button className=" text-white px-8 py-3 rounded-full font-medium transition-all duration-200 shadow-lg hover:shadow-xl font-poppins">
                        Check Our Products
                    </button>
                </div>
            </div>
        </>
    );
}

export default HomeProducts