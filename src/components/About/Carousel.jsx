import React from 'react'
import CarouselImg from "../../assets/About/AboutCarousel.png"
import CarouselMobileImg from "../../assets/About/MobileCarousel.png"

const Carousel = () => {
  return (
    <div className='mb-8 '>
      {/* Desktop Image - Hidden on mobile */}
      <img 
        src={CarouselImg} 
        alt="About Carousel" 
        className="hidden md:block w-full h-auto"
      />
      
      {/* Mobile Image - Hidden on desktop */}
      <img 
        src={CarouselMobileImg} 
        alt="About Carousel Mobile" 
        className="block md:hidden w-full h-auto"
      />
    </div>
  )
}

export default Carousel;