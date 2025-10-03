import React, { useState, useEffect } from 'react'
import image from "../../assets/napkin.png"
import image1 from "../../assets/napkin.png"
import { useNavigate } from 'react-router-dom';
import { db } from "../../firebase/firebaseConfig";
import { collection, getDocs } from 'firebase/firestore';

const HomeProducts = () => {
    const navigate = useNavigate();
    const [flippedCards, setFlippedCards] = useState({});
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Static back side content that won't change
    const staticBackContent = {
        1: {
            image: image,
            description: "Extra Large comfort with herbal protection for heavy flow days",
            features: ["100% Organic", "Extra Large Size", "Super Absorbent", "Herbal Comfort"]
        },
        2: {
            image: image1,
            description: "Extra Extra Large protection with maximum coverage and herbal care",
            features: ["Maximum Coverage", "Ultra Absorbent", "Anti-bacterial", "Premium Herbal Formula"]
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const productsCollection = collection(db, 'products');
            const productsSnapshot = await getDocs(productsCollection);
            const productsList = productsSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setProducts(productsList);
        } catch (error) {
            console.error("Error fetching products:", error);
            // Fallback to default products if Firebase fails
            setProducts([
                {
                    id: 1,
                    name: "Herbal Napkin XL - (280mm)",
                    price: "200",
                    offerPrice: "179",
                    size: "280mm",
                    pieces: "10"
                },
                {
                    id: 2,
                    name: "Herbal Napkin XXL - (320mm)",
                    price: "210",
                    offerPrice: "189",
                    size: "320mm",
                    pieces: "10"
                }
            ]);
        } finally {
            setLoading(false);
        }
    };

    const handleNavigation = (path) => {
        navigate(path);
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
        }, 100);
    };

    const handleCardClick = (productId) => {
        setFlippedCards(prev => ({
            ...prev,
            [productId]: !prev[productId]
        }));
    };

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto py-12 px-4 flex justify-center items-center min-h-[400px]">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
                    <p className="text-slate-600">Loading products...</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="max-w-7xl mx-auto py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="text-center mb-8 sm:mb-12">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-slate-800 mb-2 font-poppins px-2">
                        Herbal Products
                    </h2>
                    <p
                        className="text-sm sm:text-2xl text-slate-600 font-extrabold px-4"
                        style={{ fontFamily: '"Playfair Display", serif' }}
                    >
                        India's One and Only Customizable <b>HERBAL</b> Napkin.
                    </p>
                </div>
                
                {/* Products Grid - Centered for 2 items */}
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto mb-8 sm:mb-12 justify-center'>
                    {products.map((product) => {
                        const backContent = staticBackContent[product.id] || staticBackContent[1];
                        
                        // Calculate offer details inside the map where product is available
                        const price = Number(product.price);
                        const offerPrice = Number(product.offerPrice);
                        const hasOffer = !isNaN(offerPrice) && 
                                         !isNaN(price) && 
                                         offerPrice > 0 &&
                                         offerPrice < price;
                        const discountPercentage = hasOffer ? Math.round(((price - offerPrice) / price) * 100) : 0;
                        
                        return (
                            <div 
                                key={product.id} 
                                className="group w-full h-80 sm:h-96 [perspective:1000px] cursor-pointer touch-manipulation mx-auto max-w-sm"
                                onClick={() => handleCardClick(product.id)}
                                onTouchStart={() => {}}
                            >
                                <div className={`relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] ${
                                    flippedCards[product.id] ? '[transform:rotateY(180deg)]' : ''
                                } group-hover:[transform:rotateY(180deg)] group-active:[transform:rotateY(180deg)]`}>
                                    
                                    {/* Front Side - Product Image */}
                                    <div className="absolute w-full h-full [backface-visibility:hidden] flex flex-col items-center justify-center rounded-xl bg-[#0c6200] border border-green-200 shadow-lg p-4 sm:p-6">
                                        {/* Discount Badge */}
                                        {hasOffer && (
                                            <div className="absolute top-2 right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg">
                                                {product.offerPercentage || discountPercentage}% OFF
                                            </div>
                                        )}
                                        
                                        <div className="text-4xl sm:text-5xl lg:text-6xl mb-3 sm:mb-4">
                                            <img 
                                                src={backContent.image} 
                                                alt={product.name} 
                                                className="w-28 h-28 sm:w-32 sm:h-32 lg:w-50 lg:h-43 object-contain select-none" 
                                            />
                                        </div>
                                        <p className="text-base sm:text-lg font-semibold text-white text-center font-serif px-2 leading-tight">
                                            {product.name}
                                        </p>
                                        <p className='text-base sm:text-sm text-gray-300 text-center font-serif px-2 leading-tight'> 
                                            {product.size} | {product.pieces} pieces
                                        </p>
                                        
                                        {/* Price Display with Discount */}
                                        <div className="mt-3 sm:mt-4 text-center">
                                            <div className="flex items-center justify-center gap-2">
                                                {hasOffer && (
                                                    <span className="text-white text-sm line-through opacity-70">
                                                        ₹{price}
                                                    </span>
                                                )}
                                                <div className="px-3 py-1 bg-green-200 rounded-full">
                                                    <span className="text-green-800 text-lg font-bold">
                                                        ₹{hasOffer ? offerPrice : price}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        {/* Mobile flip indicator */}
                                        <div className="mt-3 sm:hidden text-white text-xs opacity-100">
                                            Tap to see details
                                        </div>
                                    </div>
                    
                                    {/* Back Side - Product Details (Static Content) */}
                                    <div className="absolute w-full h-full [backface-visibility:hidden] flex flex-col justify-between rounded-xl bg-[#F18372] text-white [transform:rotateY(180deg)] shadow-lg p-4 sm:p-6">
                                        <div className="flex-1">
                                            <p className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 font-poppins leading-tight">
                                                {product.name}
                                            </p>
                                            <p className="text-green-100 mb-3 sm:mb-4 text-xs sm:text-sm font-poppins leading-relaxed">
                                                {backContent.description}
                                            </p>
                                            <ul className="space-y-1 mb-3 sm:mb-4">
                                                {backContent.features.map((feature, index) => (
                                                    <li key={index} className="text-green-100 text-xs sm:text-sm flex items-center">
                                                        <span className="w-1.5 h-1.5 bg-green-300 rounded-full mr-2 flex-shrink-0"></span>
                                                        <span className="leading-tight">{feature}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="space-y-2 sm:space-y-3">
                                            <div className="text-center">
                                                <div className="flex items-center justify-center gap-2 mb-1">
                                                    {hasOffer && (
                                                        <span className="text-green-200 text-sm line-through">
                                                            ₹{price}
                                                        </span>
                                                    )}
                                                    <span className="text-xl sm:text-2xl font-bold">
                                                        ₹{hasOffer ? offerPrice : price}
                                                    </span>
                                                </div>
                                                {hasOffer && (
                                                    <div className="text-green-200 text-xs">
                                                        {discountPercentage}% OFF
                                                    </div>
                                                )}
                                            </div>
                                            <button 
                                                className="w-full cursor-pointer bg-[#0c6200] px-3 sm:px-4 py-2 sm:py-3 rounded-lg font-semibold hover:bg-green-500 transition-colors duration-200 shadow-md font-poppins text-sm sm:text-base active:scale-95"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    e.preventDefault();
                                                    handleNavigation("/products");
                                                }}
                                                onTouchStart={(e) => e.stopPropagation()}
                                            >
                                                Buy Now
                                            </button>
                                            {/* Mobile back indicator */}
                                            <div className="sm:hidden text-green-200 text-xs text-center opacity-70">
                                                Tap card to flip back
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* CTA Button */}
                <div className="flex justify-center px-4">
                    <button 
                        className="bg-[#F18372] cursor-pointer hover:bg-[#e67362] active:bg-[#d85a49] text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-medium transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95 font-poppins text-sm sm:text-base w-full sm:w-auto max-w-xs"
                        onClick={(e) => {
                            e.preventDefault();
                            handleNavigation("/products");
                        }}
                    >
                        Check Our Products
                    </button>
                </div>
            </div>
        </>
    );
}

export default HomeProducts