import React, { useState } from 'react';
import { Search, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import MainLogo from '../assets/PinkLadyLogo.png';
import './NavBar.css';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

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
          <a href="/" className="logo">
            <img src={MainLogo} alt='Pink Lady Logo' />
          </a>

          {/* Desktop Navigation */}
          <ul className="nav-menu">
            <li><Link to="/" className="nav-link">Home</Link></li>
            <li><Link to="/about" className="nav-link">About</Link></li>
            <li><Link to="/products" className="nav-link">Products</Link></li>
            <li><Link to="/blog" className="nav-link">Blog</Link></li>
            <li><Link to="/contact" className="nav-link">Contact</Link></li>
          </ul>

          {/* Desktop Icons */}
          <div className="nav-icons">
            <Search className="w-5 h-5" />
            <div className="cart-container">
              <ShoppingCart className="w-5 h-5" />
            </div>
          </div>

          {/* Mobile Cart Icon (shows before hamburger on mobile) */}
          <div className="mobile-cart-icon">
            <ShoppingCart className="w-5 h-5" />
          </div>

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

            {/* Mobile Search */}
            <div className="mobile-search">
              <input type="text" placeholder="Search products..." />
              <Search className="w-4 h-4 text-gray-500" />
            </div>

            {/* Mobile Navigation */}
            <a href="#" className="mobile-nav-link" onClick={() => setIsOpen(false)}>Home</a>
            <a href="#" className="mobile-nav-link" onClick={() => setIsOpen(false)}>About</a>
            <a href="#" className="mobile-nav-link" onClick={() => setIsOpen(false)}>Products</a>
            <a href="#" className="mobile-nav-link" onClick={() => setIsOpen(false)}>Blog</a>
            <a href="#" className="mobile-nav-link" onClick={() => setIsOpen(false)}>Contact</a>

            {/* Mobile Actions */}
            <div className="mobile-actions">
              <div className="cart-container">
                <ShoppingCart className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;