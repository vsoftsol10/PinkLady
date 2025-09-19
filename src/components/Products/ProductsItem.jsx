import React from 'react';
import { useState } from 'react';

const ProductItem = ({ product, onAddToCart, onRemoveFromCart }) => {
    const [count, setCount] = useState(0);

    const handleAddClick = () => {
        setCount(1);
        onAddToCart();
    };

    const handleIncrement = () => {
        setCount((prev) => prev + 1);
        onAddToCart();
    };

    const handleDecrement = () => {
        const newCount = Math.max(count - 1, 0);
        setCount(newCount);
        onRemoveFromCart(); // Always show alert when decrementing
    };

    return (
        <div className="border border-gray-500/20 rounded-md px-4 py-3 bg-white min-w-56 w-full shadow-sm hover:shadow-md transition-shadow">
            <div className="group cursor-pointer flex items-center justify-center px-2 mb-3">
                <img 
                    className="group-hover:scale-105 transition max-w-full md:max-w-full" 
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
                                <path d="M8.049.927c.3-.921 1.603-.921 1.902 0l1.294 3.983a1 1 0 0 0 .951.69h4.188c.969 0 1.371 1.24.588 1.81l-3.388 2.46a1 1 0 0 0-.364 1.118l1.295 3.983c.299.921-.756 1.688-1.54 1.118L9.589 13.63a1 1 0 0 0-1.176 0l-3.389 2.46c-.783.57-1.838-.197-1.539-1.118L4.78 10.99a1 1 0 0 0-.363-1.118L1.028 7.41c-.783-.57-.38-1.81.588-1.81h4.188a1 1 0 0 0 .95-.69z" fill="#93B45D" />
                            </svg>
                        ) : (
                            <svg key={i} width="14" height="13" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.04894 0.927049C8.3483 0.00573802 9.6517 0.00574017 9.95106 0.927051L11.2451 4.90983C11.379 5.32185 11.763 5.60081 12.1962 5.60081H16.3839C17.3527 5.60081 17.7554 6.84043 16.9717 7.40983L13.5838 9.87132C13.2333 10.126 13.0866 10.5773 13.2205 10.9894L14.5146 14.9721C14.8139 15.8934 13.7595 16.6596 12.9757 16.0902L9.58778 13.6287C9.2373 13.374 8.7627 13.374 8.41221 13.6287L5.02426 16.0902C4.24054 16.6596 3.18607 15.8934 3.48542 14.9721L4.7795 10.9894C4.91338 10.5773 4.76672 10.126 4.41623 9.87132L1.02827 7.40983C0.244561 6.84043 0.647338 5.60081 1.61606 5.60081H5.8038C6.23703 5.60081 6.62099 5.32185 6.75486 4.90983L8.04894 0.927049Z" fill="#93B45D" fillOpacity="0.35" />
                            </svg>
                        )
                    ))}
                    <p className="ml-1">({product.rating})</p>
                </div>
                <div className="flex items-end justify-between">
                    <p className="md:text-xl text-base font-medium text-[#37471e]">
                       ₹{product.offerPrice} <span className="text-gray-500/60 md:text-sm text-xs line-through">₹{product.price}</span>
                    </p>
                    <div>
                        {count === 0 ? (
                            <button 
                                className="flex items-center justify-center gap-1 bg-gradient-to-r from-[#ffb3a7] to-[#F18372] md:w-[80px] w-[64px] h-[34px] rounded text-white font-medium hover:bg-[#93B45D] transition-colors" 
                                onClick={handleAddClick}
                            >
                                <svg className="w-4 h-4 text-white mr-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zM8 6V5a2 2 0 114 0v1H8zm2 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                                </svg>
                                Add
                            </button>
                        ) : (
                            <div className="flex items-center justify-center gap-2 md:w-20 w-16 h-[34px] bg-[#F18372]/50 rounded select-none">
                                <button 
                                    onClick={handleDecrement}
                                    className="cursor-pointer text-amber-900 text-lg px-2 h-full hover:bg-[#F18372]/40 rounded-l transition-colors"
                                >
                                    -
                                </button>
                                <span className="w-5 text-center text-amber-900 font-medium">{count}</span>
                                <button 
                                    onClick={handleIncrement}
                                    className="cursor-pointer text-amber-900 text-lg px-2 h-full hover:bg-[#F18372]/40 rounded-r transition-colors"
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

export default ProductItem;