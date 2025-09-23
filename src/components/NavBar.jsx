import React, { useState, useEffect, useRef } from 'react';
import { Search, ShoppingCart, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import MainLogo from '../assets/PinkLadyLogo.png';
import { useCart } from '../context/CartContext';
import './NavBar.css';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();
  const { itemCount } = useCart();
  const searchInputRef = useRef(null);
  const searchContainerRef = useRef(null);

  // Check if current route is inside admin panel
  const isAdminRoute = location.pathname.startsWith("/admin");

  // Mock product data - replace this with your actual product data source
  const mockProducts = [
    { id: 1, name: "Pink Lady Apple", category: "Fruits", price: 2.99 },
    { id: 2, name: "Red Rose Bouquet", category: "Flowers", price: 25.99 },
    { id: 3, name: "Pink Lipstick", category: "Cosmetics", price: 15.99 },
    { id: 4, name: "Lady's Handbag", category: "Accessories", price: 89.99 },
    { id: 5, name: "Pink Dress", category: "Clothing", price: 45.99 },
  ];

  // Handle search functionality
  const handleSearch = (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const filteredProducts = mockProducts.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filteredProducts);
      setIsSearching(false);
    }, 300);
  };

  // Handle search input change
  const handleSearchInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    handleSearch(query);
  };

  // Open search modal
  const openSearch = () => {
    setIsSearchOpen(true);
    setTimeout(() => {
      if (searchInputRef.current) {
        searchInputRef.current.focus();
      }
    }, 100);
  };

  // Close search modal
  const closeSearch = () => {
    setIsSearchOpen(false);
    setSearchQuery('');
    setSearchResults([]);
    setIsSearching(false);
  };

  // Handle search result click
  const handleResultClick = (product) => {
    // Navigate to product page or handle as needed
    navigate(`/products/${product.id}`);
    closeSearch();
  };

  // Handle search submit
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to search results page
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      closeSearch();
    }
  };

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

      {/* Search Modal */}
      {isSearchOpen && (
        <div className="search-modal-overlay">
          <div className="search-modal" ref={searchContainerRef}>
            <div className="search-modal-header">
              <form onSubmit={handleSearchSubmit} className="search-form">
                <Search className="w-5 h-5 text-gray-400" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                  placeholder="Search products..."
                  className="search-input"
                />
                <button
                  type="button"
                  onClick={closeSearch}
                  className="search-close-btn"
                >
                  <X className="w-5 h-5" />
                </button>
              </form>
            </div>
            
            <div className="search-results">
              {isSearching ? (
                <div className="search-loading">Searching...</div>
              ) : searchQuery.trim() && searchResults.length === 0 ? (
                <div className="no-results">
                  No products found for "{searchQuery}"
                </div>
              ) : searchResults.length > 0 ? (
                <div className="results-list">
                  {searchResults.map((product) => (
                    <div
                      key={product.id}
                      className="result-item"
                      onClick={() => handleResultClick(product)}
                    >
                      <div className="result-info">
                        <h4 className="result-name">{product.name}</h4>
                        <p className="result-category">{product.category}</p>
                      </div>
                      <div className="result-price">${product.price}</div>
                    </div>
                  ))}
                  {searchQuery.trim() && (
                    <div className="view-all-results">
                      <button
                        onClick={() => handleSearchSubmit({ preventDefault: () => {} })}
                        className="view-all-btn"
                      >
                        View all results for "{searchQuery}"
                      </button>
                    </div>
                  )}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}

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
              <button 
                onClick={openSearch}
                className="search-btn"
                aria-label="Open search"
              >
                <Search className="w-5 h-5" />
              </button>
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