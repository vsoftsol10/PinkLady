import React, { useState, useEffect, useCallback } from 'react';
import image1 from "../../assets/HomeCarousel/001.png";
import image2 from "../../assets/HomeCarousel/002.png";
import image3 from "../../assets/HomeCarousel/003.png";

import image1Mobile from "../../assets/HomeCarousel/M001.png";
import image2Mobile from "../../assets/HomeCarousel/M002.png";
import image3Mobile from "../../assets/HomeCarousel/M003.png";

const HeroCarousel = () => {
  // Add all your images to this array with both desktop and mobile versions
  const images = [
    { 
      desktop: image1, 
      mobile: image1Mobile, 
      alt: "Carousel Image 1" 
    },
    { 
      desktop: image2, 
      mobile: image2Mobile, 
      alt: "Carousel Image 2" 
    },
    { 
      desktop: image3, 
      mobile: image3Mobile, 
      alt: "Carousel Image 3" 
    },
    
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const interval = 5000; // 5 seconds between slides

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  }, [images.length]);

  useEffect(() => {
    // Set up auto-advance timer
    const timer = setInterval(nextSlide, interval);
    
    // Clean up the timer
    return () => clearInterval(timer);
  }, [nextSlide, interval]);

  // Manual navigation functions
  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const previousSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  return (
    <div className="mb-4  sm:mb-6 md:mb-8 mt-22 md:mt-8 lg:mt-12 xl:mt-16 relative w-full">
      {/* Main carousel container */}
      <div className="relative overflow-hidden w-full h-[70vh] sm:h-[80vh] md:h-[400px] lg:h-[500px] xl:h-[600px] 2xl:h-[750px] md:rounded-xl lg:rounded-2xl">
        {/* Images */}
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute w-full h-full transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Desktop Image (md and up) */}
            <img
              src={image.desktop}
              alt={image.alt}
              className="hidden md:block w-full h-full object-cover object-center"
            />
            {/* Mobile Image (sm and down) - Full screen */}
            <img
              src={image.mobile}
              alt={image.alt}
              className="block md:hidden w-full h-full object-cover object-center"
            />
          </div>
        ))}

        {/* Navigation arrows */}
        <button 
          onClick={previousSlide}
          className="absolute left-2 sm:left-3 md:left-4 lg:left-6 top-1/2 transform -translate-y-1/2 bg-black/20 hover:bg-black/40 active:bg-black/60 text-white p-1.5 sm:p-2 md:p-2.5 lg:p-3 rounded-full transition-all duration-200 backdrop-blur-sm border border-white/10 hover:scale-110"
          aria-label="Previous slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
        <button 
          onClick={nextSlide}
          className="absolute right-2 sm:right-3 md:right-4 lg:right-6 top-1/2 transform -translate-y-1/2 bg-black/20 hover:bg-black/40 active:bg-black/60 text-white p-1.5 sm:p-2 md:p-2.5 lg:p-3 rounded-full transition-all duration-200 backdrop-blur-sm border border-white/10 hover:scale-110"
          aria-label="Next slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>

      {/* Dots indicator */}
      <div className="absolute bottom-2 sm:bottom-3 md:bottom-4 lg:bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-1.5 sm:space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-full transition-all duration-200 backdrop-blur-sm border border-white/20 hover:scale-125 ${
              currentIndex === index 
                ? 'bg-white shadow-lg' 
                : 'bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Optional: Loading placeholder for better UX */}
      <div className="absolute inset-0 bg-gray-200 animate-pulse md:rounded-xl lg:rounded-2xl -z-10" />
    </div>
  );
};

export default HeroCarousel;