import React from 'react'
import Cart from "../../assets/icon/CartIcon.png"
const ProductItem = ({ product }) => {
    const [count, setCount] = React.useState(0);

    return (
        <div className="border border-gray-500/20 rounded-md px-4 py-3 bg-white min-w-56 w-full shadow-sm hover:shadow-md transition-shadow">
            <div className="group cursor-pointer flex items-center justify-center px-2 mb-3">
                <img 
                    className="group-hover:scale-105 transition max-w-26 md:max-w-36" 
                    src={product.image} 
                    alt={product.name} 
                />
            </div>
            <div className="text-gray-500/60 text-sm">
                <p className="mb-1">{product.category}</p>
                <p className="text-gray-700 font-medium text-lg truncate w-full mb-2">{product.name}</p>
                <div className="flex items-center gap-0.5 mb-3">
                    {Array(5).fill('').map((_, i) => (
                        product.rating > i ? (
                            <svg key={i} width="14" height="13" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.049.927c.3-.921 1.603-.921 1.902 0l1.294 3.983a1 1 0 0 0 .951.69h4.188c.969 0 1.371 1.24.588 1.81l-3.388 2.46a1 1 0 0 0-.364 1.118l1.295 3.983c.299.921-.756 1.688-1.54 1.118L9.589 13.63a1 1 0 0 0-1.176 0l-3.389 2.46c-.783.57-1.838-.197-1.539-1.118L4.78 10.99a1 1 0 0 0-.363-1.118L1.028 7.41c-.783-.57-.38-1.81.588-1.81h4.188a1 1 0 0 0 .95-.69z" fill="#615fff" />
                            </svg>
                        ) : (
                            <svg key={i} width="14" height="13" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.04894 0.927049C8.3483 0.00573802 9.6517 0.00574017 9.95106 0.927051L11.2451 4.90983C11.379 5.32185 11.763 5.60081 12.1962 5.60081H16.3839C17.3527 5.60081 17.7554 6.84043 16.9717 7.40983L13.5838 9.87132C13.2333 10.126 13.0866 10.5773 13.2205 10.9894L14.5146 14.9721C14.8139 15.8934 13.7595 16.6596 12.9757 16.0902L9.58778 13.6287C9.2373 13.374 8.7627 13.374 8.41221 13.6287L5.02426 16.0902C4.24054 16.6596 3.18607 15.8934 3.48542 14.9721L4.7795 10.9894C4.91338 10.5773 4.76672 10.126 4.41623 9.87132L1.02827 7.40983C0.244561 6.84043 0.647338 5.60081 1.61606 5.60081H5.8038C6.23703 5.60081 6.62099 5.32185 6.75486 4.90983L8.04894 0.927049Z" fill="#615fff" fill-opacity="0.35" />
                            </svg>
                        )
                    ))}
                    <p className="ml-1">({product.rating})</p>
                </div>
                <div className="flex items-end justify-between">
                    <p className="md:text-xl text-base font-medium text-[#37471e]">
                       ₹{product.offerPrice} <span className="text-gray-500/60 md:text-sm text-xs line-through">₹{product.price}</span>
                    </p>
                    <div className="text-indigo-500">
                        {count === 0 ? (
                            <button 
                                className="flex items-center justify-center gap-1 bg-gradient-to-r from-[#ffb3a7] to-[#F18372] md:w-[80px] w-[64px] h-[34px] rounded text-white font-medium hover:bg-[#93B45D] transition-colors" 
                                onClick={() => setCount(1)}
                            >
                                <img src={Cart} alt="cart-ion" className='w-6 text-white mr-1' />
                                Add
                            </button>
                        ) : (
                            <div className="flex items-center justify-center gap-2 md:w-20 w-16 h-[34px] bg-[#F18372]/50 rounded select-none">
                                <button 
                                    onClick={() => setCount((prev) => Math.max(prev - 1, 0))} 
                                    className="cursor-pointer text-amber-900  text-lg px-2 h-full hover:bg-[#F18372]/40 rounded-l transition-colors"
                                >
                                    -
                                </button>
                                <span className="w-5 text-center text-amber-900 font-medium">{count}</span>
                                <button 
                                    onClick={() => setCount((prev) => prev + 1)} 
                                    className="cursor-pointer  text-amber-900  text-lg px-2 h-full hover:bg-[#F18372]/40 rounded-r transition-colors"
                                >
                                    +
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

const ProductsGrid = () => {
    // Sample products data - you can replace this with your actual data
    const products = [
        {
            id: 1,
            name: "Casual Shoes",
            category: "Herbal",
            price: 100,
            offerPrice: 80,
            rating: 4,
            image: "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/card/productImageWithoutBg.png",
        },
        {
            id: 2,
            name: "Running Sneakers",
            category: "Herbal",
            price: 120,
            offerPrice: 95,
            rating: 5,
            image: "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/card/productImageWithoutBg.png",
        },
        {
            id: 3,
            name: "Basketball Shoes",
            category: "Herbal",
            price: 150,
            offerPrice: 120,
            rating: 4,
            image: "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/card/productImageWithoutBg.png",
        },
        {
            id: 4,
            name: "Tennis Shoes",
            category: "Herbal",
            price: 90,
            offerPrice: 70,
            rating: 3,
            image: "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/card/productImageWithoutBg.png",
        },
        {
            id: 5,
            name: "Hiking Boots",
            category: "Herbal",
            price: 180,
            offerPrice: 140,
            rating: 5,
            image: "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/card/productImageWithoutBg.png",
        },
        {
            id: 6,
            name: "Dress Shoes",
            category: "Herbal",
            price: 200,
            offerPrice: 160,
            rating: 4,
            image: "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/card/productImageWithoutBg.png",
        },
        {
            id: 7,
            name: "Canvas Sneakers",
            category: "Herbal",
            price: 60,
            offerPrice: 45,
            rating: 4,
            image: "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/card/productImageWithoutBg.png",
        },
        {
            id: 8,
            name: "Work Boots",
            category: "Herbal",
            price: 160,
            offerPrice: 130,
            rating: 5,
            image: "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/card/productImageWithoutBg.png",
        }
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">            
            {/* Responsive Grid Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                    <ProductItem key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}

export default ProductsGrid