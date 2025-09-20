import React, { useState, useEffect } from 'react';
import './UpArrow.css';  // Import the CSS file

const UpArrow = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Function to handle scroll
    const handleScroll = () => {
      // Different ways to detect scroll position for maximum compatibility
      const scrollY = window.scrollY || window.pageYOffset;
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      
      // Use whichever value is available
      const currentScroll = scrollY || scrollTop;
      
      // console.log("Current scroll position:", currentScroll);
      
      // Show button when page is scrolled down 100px
      setIsVisible(currentScroll > 100);
    };
    
    // Add event listener for both window and document
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('scroll', handleScroll, { passive: true });
    
    // Check immediately on component mount
    handleScroll();
    
    // Set up a periodic check as a fallback
    const intervalCheck = setInterval(handleScroll, 1000);
    
    // Clean up
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('scroll', handleScroll);
      clearInterval(intervalCheck);
    };
  }, []);
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    // Also try these alternatives if the above doesn't work
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };
  
  return (
    <button
      className={`scroll-to-top-button ${isVisible ? 'visible' : ''}`}
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 19V6M5 13l7-7 7 7" />
      </svg>
    </button>
  );
};

export default UpArrow;