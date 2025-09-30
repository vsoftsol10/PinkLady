import React, { useState, useEffect, useRef } from 'react';
import { Search, ShoppingCart, X } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import MainLogo from '../assets/PinkLadyLogo.png';
import PaapatchiLogo from '../assets/PapaatchiLogo.png'; // ADD THIS LINE - Adjust path as needed
import { useCart } from '../context/CartContext';
import './NavBar.css';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();
  const { itemCount } = useCart();
  const searchContainerRef = useRef(null);

  // ✅ Smooth navigation function
  const handleNavigation = (path) => {
    navigate(path);
    setIsOpen(false); // close mobile menu if open
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const isAdminRoute = location.pathname.startsWith("/admin");


  // Mock product data - replace this with your actual product data source
  const mockProducts = [
    { id: 1, name: "Pink Lady Apple", category: "Fruits", price: 2.99 },
    { id: 2, name: "Red Rose Bouquet", category: "Flowers", price: 25.99 },
    { id: 3, name: "Pink Lipstick", category: "Cosmetics", price: 15.99 },
    { id: 4, name: "Lady's Handbag", category: "Accessories", price: 89.99 },
    { id: 5, name: "Pink Dress", category: "Clothing", price: 45.99 },
  ];
// Handle navbar scroll shrink effect
useEffect(() => {
  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    setIsScrolled(scrollPosition > 100); // Adjust threshold as needed
  };

  window.addEventListener('scroll', handleScroll);
  
  // Check initial scroll position
  handleScroll();

  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
}, []);
  
 

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        closeSearch();
      }
    };

    if (isSearchOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isSearchOpen]);

  // Handle escape key to close search
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isSearchOpen) {
        closeSearch();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isSearchOpen]);

  return (
    <>
      {/* Mobile Overlay */}
      <div
        className={`mobile-overlay ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(false)}
      />

      

      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="navbar-container">
          {/* Left Logo - Pink Lady */}
          <button onClick={() => handleNavigation("/")} className="logo logo-left">
            <img src={MainLogo} alt="Pink Lady Logo" />
          </button>

          {/* Desktop Navigation */}
          <ul className="nav-menu">
            {isAdminRoute ? (
              <>
                <li className='flex gap-4'>
                  <button onClick={() => handleNavigation("/admin")} className="nav-link" >
                    Admin
                  </button>
                  <button onClick={() => handleNavigation("/admin/orders")} className="nav-link">
                    Order Management
                  </button>
                </li>
              </>
            ) : (
              <>
                <li><button onClick={() => handleNavigation("/")} className="nav-link">Home</button></li>
                <li><button onClick={() => handleNavigation("/about")} className="nav-link">About</button></li>
                <li><button onClick={() => handleNavigation("/products")} className="nav-link">Products</button></li>
                <li><button onClick={() => handleNavigation("/contact")} className="nav-link">Contact</button></li>
              </>
            )}
          </ul>

          {/* Right side container with icons and logo */}
          <div className="navbar-right">
            {/* Desktop Icons (hide in admin if not needed) */}
            {!isAdminRoute && (
              <div className="nav-icons">
                
                <div className="cart-container relative" onClick={() => { navigate("/checkout") }}>
                  <ShoppingCart className="w-5 h-5" />
                  {itemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center min-w-[20px] font-semibold">
                      {itemCount > 99 ? '99+' : itemCount}
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Right Logo - Paapatchi Enterprises */}
            <div className="logo logo-right">
              <img src={PaapatchiLogo} alt="Paapatchi Enterprises Logo" />
            </div>

            {/* Mobile Cart Icon (hide in admin) */}
            {!isAdminRoute && (
              <div className="mobile-cart-icon relative" onClick={() => { navigate("/checkout") }}>
                <ShoppingCart className="w-5 h-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center min-w-[20px] font-semibold">
                    {itemCount > 99 ? '99+' : itemCount}
                  </span>
                )}
              </div>
            )}

            {/* Hamburger Menu */}
            <button
              className={`hamburger ${isOpen ? 'active' : ''}`}
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
          <div className="mobile-menu-content">
            {!isAdminRoute && (
              <div className="mobile-search">
                <button 
                  onClick={() => {
                    setIsOpen(false);
                    openSearch();
                  }}
                  className="mobile-search-btn"
                >
                  <Search className="w-4 h-4 text-gray-500" />
                  <span>Search products...</span>
                </button>
              </div>
            )}

            {/* Mobile Navigation */}
            {isAdminRoute ? (
              <>
                <button onClick={() => handleNavigation("/admin/products")} className="mobile-nav-link">
                  Products
                </button>
                <button onClick={() => handleNavigation("/admin/orders")} className="mobile-nav-link">
                  Order Management
                </button>
              </>
            ) : (
              <>
                <button onClick={() => handleNavigation("/")} className="mobile-nav-link">Home</button>
                <button onClick={() => handleNavigation("/about")} className="mobile-nav-link">About</button>
                <button onClick={() => handleNavigation("/products")} className="mobile-nav-link">Products</button>
                <button onClick={() => handleNavigation("/contact")} className="mobile-nav-link">Contact</button>
              </>
            )}
            {/* Mobile Actions (hide in admin) */}
            {!isAdminRoute && (
              <div className="mobile-actions">
                <div className="cart-container relative" onClick={() => { navigate("/checkout"); setIsOpen(false); }}>
                  <ShoppingCart className="w-6 h-6" />
                  {itemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center min-w-[20px] font-semibold">
                      {itemCount > 99 ? '99+' : itemCount}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;