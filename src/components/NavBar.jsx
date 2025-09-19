import React, { useState } from 'react';
import { Search, ShoppingCart } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import MainLogo from '../assets/PinkLadyLogo.png';
import { useCart } from '../context/CartContext';
import './NavBar.css';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { itemCount } = useCart();

  // Check if current route is inside admin panel
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {/* Mobile Overlay */}
      <div
        className={`mobile-overlay ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(false)}
      />

      <nav className="navbar">
        <div className="navbar-container">
          {/* Logo */}
          <Link to="/" className="logo">
            <img src={MainLogo} alt="Pink Lady Logo" />
          </Link>

          {/* Desktop Navigation */}
          <ul className="nav-menu">
            {isAdminRoute ? (
              <>
                <li><Link to="/admin/products" className="nav-link">Products</Link></li>
                <li><Link to="/admin/orders" className="nav-link">Order Management</Link></li>
              </>
            ) : (
              <>
                <li><Link to="/" className="nav-link">Home</Link></li>
                <li><Link to="/about" className="nav-link">About</Link></li>
                <li><Link to="/products" className="nav-link">Products</Link></li>
                <li><Link to="/contact" className="nav-link">Contact</Link></li>
              </>
            )}
          </ul>

          {/* Desktop Icons (hide in admin if not needed) */}
          {!isAdminRoute && (
            <div className="nav-icons">
              <Search className="w-5 h-5" />
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

        {/* Mobile Menu */}
        <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
          <div className="mobile-menu-content">

            {/* Mobile Search (hide in admin) */}
            {!isAdminRoute && (
              <div className="mobile-search">
                <input type="text" placeholder="Search products..." />
                <Search className="w-4 h-4 text-gray-500" />
              </div>
            )}

            {/* Mobile Navigation */}
            {isAdminRoute ? (
              <>
                <Link to="/admin/products" className="mobile-nav-link" onClick={() => setIsOpen(false)}>Products</Link>
                <Link to="/admin/orders" className="mobile-nav-link" onClick={() => setIsOpen(false)}>Order Management</Link>
              </>
            ) : (
              <>
                <Link to="/" className="mobile-nav-link" onClick={() => setIsOpen(false)}>Home</Link>
                <Link to="/about" className="mobile-nav-link" onClick={() => setIsOpen(false)}>About</Link>
                <Link to="/products" className="mobile-nav-link" onClick={() => setIsOpen(false)}>Products</Link>
                <Link to="/contact" className="mobile-nav-link" onClick={() => setIsOpen(false)}>Contact</Link>
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