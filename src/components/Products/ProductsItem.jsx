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
                    <div className="text-indigo-500">
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

const ProductsGrid = () => {
    const [alerts, setAlerts] = useState([]);

    const addAlert = (message, description, type) => {
        const newAlert = {
            id: Date.now() + Math.random(), // Unique ID
            message,
            description,
            type
        };

        setAlerts(prevAlerts => [...prevAlerts, newAlert]);

        // Auto-remove alert after 3 seconds
        setTimeout(() => {
            setAlerts(prevAlerts => prevAlerts.filter(alert => alert.id !== newAlert.id));
        }, 3000);
    };

    const removeAlert = (alertId) => {
        setAlerts(prevAlerts => prevAlerts.filter(alert => alert.id !== alertId));
    };

    const handleAddToCart = () => {
        addAlert(
            'Added to cart!', 
            'Item has been successfully added to your cart.',
            'success'
        );
    };

    const handleRemoveFromCart = () => {
        addAlert(
            'Removed from cart', 
            'Item has been successfully removed to your cart.',
            'remove'
        );
    };

    // Sample products data
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
        <div className="max-w-7xl mx-auto px-4 py-8 relative">
            {/* Toast Alerts Container */}
            <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 space-y-2">
                {alerts.map((alert, index) => (
                    <div 
                        key={alert.id}
                        className="animate-slide-down"
                        style={{
                            animationDelay: `${index * 100}ms`,
                            transform: `translateY(${index * 10}px)`
                        }}
                    >
                        <div className="bg-white inline-flex space-x-3 p-3 text-sm rounded border border-gray-200 shadow-lg">
                            {alert.type === 'success' ? (
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16.5 8.31V9a7.5 7.5 0 1 1-4.447-6.855M16.5 3 9 10.508l-2.25-2.25" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            ) : (
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6.75 6.75L11.25 11.25M11.25 6.75L6.75 11.25M16.5 9C16.5 13.1421 13.1421 16.5 9 16.5C4.85786 16.5 1.5 13.1421 1.5 9C1.5 4.85786 4.85786 1.5 9 1.5C13.1421 1.5 16.5 4.85786 16.5 9Z" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            )}
                            <div>
                                <p className="text-slate-700 font-medium">{alert.message}</p>
                                <p className="text-slate-500">{alert.description}</p>
                            </div>
                            <button 
                                type="button" 
                                aria-label="close" 
                                className="cursor-pointer mb-auto text-slate-400 hover:text-slate-600 active:scale-95 transition"
                                onClick={() => removeAlert(alert.id)}
                            >
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect y="12.532" width="17.498" height="2.1" rx="1.05" transform="rotate(-45.74 0 12.532)" fill="currentColor" fillOpacity=".7"/>
                                    <rect x="12.531" y="13.914" width="17.498" height="2.1" rx="1.05" transform="rotate(-135.74 12.531 13.914)" fill="currentColor" fillOpacity=".7"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            
            {/* Add CSS animation */}
            <style jsx>{`
                @keyframes slide-down {
                    from {
                        opacity: 0;
                        transform: translateY(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                .animate-slide-down {
                    animation: slide-down 0.3s ease-out forwards;
                }
            `}</style>
            
            {/* Responsive Grid Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                    <ProductItem 
                        key={product.id} 
                        product={product} 
                        onAddToCart={handleAddToCart}
                        onRemoveFromCart={handleRemoveFromCart}
                    />
                ))}
            </div>
        </div>
    );
}

export default ProductsGrid;