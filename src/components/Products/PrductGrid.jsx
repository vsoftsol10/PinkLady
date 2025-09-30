import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import shoppingCart from "../../assets/icon/CheckoutIcon.png"
import productImg from "../../assets/ProductImage.png"
import ProductItem from './ProductsItem';
import { useCart } from '../../context/CartContext';

const ProductsGrid = () => {
    const [alerts, setAlerts] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const navigate = useNavigate();
    
    const { addToCart, decrementFromCart, cartItems, itemCount } = useCart();

    const herbalIngredients = [
        {
            name: "Turmeric (Manjal)",
            benefits: "Helps prevent allergies, improves digestion, boosts immunity, and promotes healthy skin."
        },
        {
            name: "Neem Leaves (Veppa Elai)",
            benefits: "Purifies the blood, acts as a natural antibiotic, and helps regulate menstrual cycles."
        },
        {
            name: "Aloe Vera (Kattralai)",
            benefits: "Supports digestion and reduces body heat."
        },
        {
            name: "Vetiver",
            benefits: "Reduces stress, calms the mind, and provides a pleasant natural fragrance."
        },
        {
            name: "Tulsi (Holy Basil)",
            benefits: "Rich in vitamins and iron, enhances immunity, and is an excellent natural antiseptic."
        },
        {
            name: "Triphala Chooranam Powder",
            benefits: "Improves digestion, relieves constipation, detoxifies the body, and enhances overall health."
        }
    ];

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                setError(null);
                
                const productsRef = collection(db, 'products');
                const q = query(productsRef, orderBy('createdAt', 'desc'));
                
                const querySnapshot = await getDocs(q);
                const productsData = [];
                
                querySnapshot.forEach((doc) => {
                    productsData.push({
                        id: doc.id,
                        ...doc.data()
                    });
                });
                
                setProducts(productsData);
            } catch (err) {
                console.error('Error fetching products:', err);
                setError('Failed to load products. Please try again.');
                
                setProducts([
                    {
                        id: 1,
                        name: "Herbal Sanitary Napkin - XL",
                        category: "Herbal",
                        price: 200,
                        offerPrice: 179,
                        rating: 5,
                        size: "XL",
                        discount: "10%",
                        image: productImg,
                    },
                    {
                        id: 2,
                        name: "Herbal Sanitary Napkin - XXL",
                        category: "Herbal",
                        price: 210,
                        offerPrice: 189,
                        rating: 5,
                        size: "XXL",
                        discount: "10%",
                        image: productImg,
                    }
                ]);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        if (showModal) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [showModal]);

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
        decrementFromCart(productId);
        addAlert(
            'Removed from cart', 
            'Item has been successfully removed from your cart.',
            'remove'
        );
    };

    const handleNavigation = (path) => {
        navigate(path);
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

    const handleProductClick = (product) => {
        setSelectedProduct(product);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setTimeout(() => setSelectedProduct(null), 300);
    };

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-8 relative mb-20 sm:mb-8">
                <div className="flex justify-center items-center min-h-[400px]">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#93B45D]"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-8 relative mb-20 sm:mb-8">
                <div className="flex flex-col justify-center items-center min-h-[400px] text-center">
                    <div className="text-red-500 text-lg mb-4">⚠️ {error}</div>
                    <button 
                        onClick={() => window.location.reload()}
                        className="bg-[#93B45D] text-white px-6 py-2 rounded-lg hover:bg-[#7BA04A] transition-colors"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-8 relative mb-20 sm:mb-8">
            {/* Toast Alerts Container */}
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

                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                @keyframes slideUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .animate-fade-in {
                    animation: fadeIn 0.3s ease-out;
                }

                .animate-slide-up {
                    animation: slideUp 0.3s ease-out;
                }
            `}</style>
            
            {/* Herbal Ingredients Modal */}
            {showModal && (
                <div 
                    className="fixed inset-0 z-[9999] flex items-center justify-center p-4 animate-fade-in"
                    onClick={closeModal}
                >
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
                    
                    {/* Modal Content */}
                    <div 
                        className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden animate-slide-up"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="sticky top-0 bg-gradient-to-r from-[#93B45D] to-[#7BA04A] text-white p-4 sm:p-6 flex items-center justify-between">
                            <div>
                                <h2 className="text-xl sm:text-2xl font-bold">Natural Herbal Ingredients</h2>
                                <p className="text-sm sm:text-base text-white/90 mt-1">Six powerful herbs for your wellness</p>
                            </div>
                            <button
                                onClick={closeModal}
                                className="p-2 hover:bg-white/20 rounded-full transition-colors"
                                aria-label="Close modal"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>
                        </div>

                        {/* Product Info */}
                        {selectedProduct && (
                            <div className="p-4 sm:p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-b border-green-100">
                                <div className="flex items-center gap-4">
                                    <img 
                                        src={selectedProduct.image || selectedProduct.imageUrl || productImg} 
                                        alt={selectedProduct.name}
                                        className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg shadow-md"
                                    />
                                    <div>
                                        <h3 className="font-semibold text-lg sm:text-xl text-gray-800">{selectedProduct.name}</h3>
                                        <p className="text-sm sm:text-base text-gray-600">{selectedProduct.category}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Ingredients List */}
                        <div className="overflow-y-auto max-h-[calc(90vh-240px)] p-4 sm:p-6">
                            <div className="space-y-4">
                                {herbalIngredients.map((ingredient, index) => (
                                    <div 
                                        key={index}
                                        className="bg-white rounded-xl p-4 sm:p-5 border-l-4 border-[#93B45D] shadow-sm hover:shadow-md transition-shadow"
                                    >
                                        <div className="flex items-start gap-3">
                                            <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[#93B45D] to-[#7BA04A] rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base">
                                                {index + 1}
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-semibold text-base sm:text-lg text-gray-800 mb-2">
                                                    {ingredient.name}
                                                </h4>
                                                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                                                    {ingredient.benefits}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Footer Note */}
                            <div className="mt-6 p-4 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl border border-amber-200 mb-25">
                                <div className="flex items-start gap-3">
                                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                    </svg>
                                    <p className="text-xs sm:text-sm text-amber-800 ">
                                        <span className="font-semibold">Note:</span> All our products are made with 100% natural herbal ingredients, carefully selected for their traditional wellness benefits.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Close Button */}
                        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 sm:p-6">
                            <button
                                onClick={closeModal}
                                className="w-full bg-gradient-to-r from-[#93B45D] to-[#7BA04A] text-white py-3 rounded-xl font-semibold hover:from-[#7BA04A] hover:to-[#6A9040] transition-all shadow-lg hover:shadow-xl"
                            >
                                Got it!
                            </button>
                        </div>
                    </div>
                </div>
            )}
            
            {products.length === 0 ? (
                <div className="flex flex-col justify-center items-center min-h-[400px] text-center">
                    <div className="text-gray-500 text-lg mb-4">No products available</div>
                    <p className="text-gray-400">Products will appear here once they are added to the database.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                    {products.map((product) => (
                        <ProductItem 
                            key={product.id} 
                            product={{
                                ...product,
                                image: product.image || product.imageUrl || productImg
                            }} 
                            onAddToCart={() => handleAddToCart(product)}
                            onRemoveFromCart={() => handleRemoveFromCart(product.id)}
                            onImageClick={() => handleProductClick(product)}
                            cartQuantity={cartItems.find(item => item.id === product.id)?.quantity || 0}
                        />
                    ))}
                </div>
            )}

            {/* Checkout Button */}
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