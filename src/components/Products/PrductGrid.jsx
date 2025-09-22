import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import shoppingCart from "../../assets/icon/CheckoutIcon.png"
import productImg from "../../assets/ProductImage.png"
import ProductItem from './ProductsItem';
import { useCart } from '../../context/CartContext';

const ProductsGrid = () => {
    const [alerts, setAlerts] = useState([]);
    const navigate = useNavigate();
    const { addToCart, cartItems, itemCount } = useCart();

    const addAlert = (message, description, type) => {
        const newAlert = {
            id: Date.now() + Math.random(),
            message,
            description,
            type
        };

        setAlerts(prevAlerts => [...prevAlerts, newAlert]);

        setTimeout(() => {
            setAlerts(prevAlerts => prevAlerts.filter(alert => alert.id !== newAlert.id));
        }, 3000);
    };

    const removeAlert = (alertId) => {
        setAlerts(prevAlerts => prevAlerts.filter(alert => alert.id !== alertId));
    };

    const handleAddToCart = (product) => {
        addToCart(product);
        addAlert(
            'Added to cart!', 
            'Item has been successfully added to your cart.',
            'success'
        );
    };

    const handleRemoveFromCart = (productId) => {
        
        addAlert(
            'Removed from cart', 
            'Item has been successfully removed from your cart.',
            'remove'
        );
    };

    const handleNavigation = (path) => {
        navigate(path);
        // Delay the scroll slightly so it happens after navigation/render
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
        }, 100);
    };

    const handleCheckoutClick = () => {
        if (itemCount === 0) {
            addAlert(
                'Cart is empty!',
                'Please add some items to your cart before checkout.',
                'remove'
            );
        } else {
            addAlert(
                'Checkout initiated!',
                `Proceeding to checkout with ${itemCount} item${itemCount > 1 ? 's' : ''}`,
                'success'
            );
            handleNavigation("/checkout");
        }
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
            image: productImg,
        },
        {
            id: 2,
            name: "Running Sneakers",
            category: "Herbal",
            price: 120,
            offerPrice: 95,
            rating: 5,
            image: productImg,
        },
        {
            id: 3,
            name: "Basketball Shoes",
            category: "Herbal",
            price: 150,
            offerPrice: 120,
            rating: 4,
            image: productImg,
        },
        {
            id: 4,
            name: "Tennis Shoes",
            category: "Herbal",
            price: 90,
            offerPrice: 70,
            rating: 3,
            image: productImg,
        },
    ];

    return (
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-8 relative mb-20 sm:mb-8">
            {/* Toast Alerts Container - Mobile Responsive */}
            <div className="fixed top-4 sm:top-20 left-1/2 transform -translate-x-1/2 z-50 space-y-2 w-full max-w-sm px-4 sm:px-0 sm:max-w-none sm:w-auto">
                {alerts.map((alert, index) => (
                    <div 
                        key={alert.id}
                        className="animate-slide-down"
                        style={{
                            animationDelay: `${index * 100}ms`,
                            transform: `translateY(${index * 10}px)`
                        }}
                    >
                        <div className="bg-white inline-flex space-x-2 sm:space-x-3 p-2 sm:p-3 text-xs sm:text-sm rounded border border-gray-200 shadow-lg w-full sm:w-auto">
                            {alert.type === 'success' ? (
                                <svg width="16" height="16" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="sm:w-[18px] sm:h-[18px] flex-shrink-0 mt-0.5 sm:mt-0">
                                    <path d="M16.5 8.31V9a7.5 7.5 0 1 1-4.447-6.855M16.5 3 9 10.508l-2.25-2.25" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            ) : (
                                <svg width="16" height="16" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="sm:w-[18px] sm:h-[18px] flex-shrink-0 mt-0.5 sm:mt-0">
                                    <path d="M6.75 6.75L11.25 11.25M11.25 6.75L6.75 11.25M16.5 9C16.5 13.1421 13.1421 16.5 9 16.5C4.85786 16.5 1.5 13.1421 1.5 9C1.5 4.85786 4.85786 1.5 9 1.5C13.1421 1.5 16.5 4.85786 16.5 9Z" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            )}
                            <div className="flex-1 min-w-0">
                                <p className="text-slate-700 font-medium truncate sm:whitespace-normal">{alert.message}</p>
                                <p className="text-slate-500 text-xs sm:text-sm truncate sm:whitespace-normal">{alert.description}</p>
                            </div>
                            <button 
                                type="button" 
                                aria-label="close" 
                                className="cursor-pointer flex-shrink-0 text-slate-400 hover:text-slate-600 active:scale-95 transition p-1"
                                onClick={() => removeAlert(alert.id)}
                            >
                                <svg width="12" height="12" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="sm:w-[14px] sm:h-[14px]">
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
            
            {/* Responsive Grid Layout - Enhanced Mobile Grid */}
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                {products.map((product) => (
                    <ProductItem 
                        key={product.id} 
                        product={product} 
                        onAddToCart={() => handleAddToCart(product)}
                        onRemoveFromCart={() => handleRemoveFromCart(product.id)}
                        cartQuantity={cartItems.find(item => item.id === product.id)?.quantity || 0}
                    />
                ))}
            </div>

            {/* Mobile Responsive Checkout Button */}
            <div className="fixed bottom-4 sm:bottom-6 right-3 sm:right-6 z-50">
                <button 
                    className={`${
                        itemCount > 0
                            ? 'bg-gradient-to-r from-[#93B45D] to-[#7BA04A] hover:from-[#7BA04A] hover:to-[#6A9040]'
                            : 'bg-gradient-to-r from-[#F18372] to-[#F18372] hover:from-[#f05c46] hover:to-[#F18372]'
                    } text-white px-3 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 sm:gap-3 group text-sm sm:text-base`}
                    onClick={handleCheckoutClick}
                >
                    <div className="flex items-center gap-1 sm:gap-2">
                        <img src={shoppingCart} alt="Checkout-Icon" className='w-4 sm:w-5 mb-0.5 sm:mb-1' />
                        <span className="font-medium hidden xs:inline">Checkout</span>
                        <span className="font-medium xs:hidden">Cart</span>
                    </div>
                    <div className="bg-white/20 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-bold min-w-[20px] sm:min-w-[24px] text-center">
                        {itemCount}
                    </div>
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 transform group-hover:translate-x-1 transition-transform hidden xs:block" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
        </div>
    );
}

export default ProductsGrid;