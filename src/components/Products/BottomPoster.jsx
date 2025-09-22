import React from 'react'
import ProductPoster from "../../assets/ProductPoster.png"
import MobilePoster from "../../assets/ProductMobilePoster.png"
const BottomPoster = () => {
  return (
     <div className='mb-8'>
       {/* Desktop Image - Hidden on mobile */}
       <img 
         src={ProductPoster} 
         alt="About Carousel" 
         className="hidden md:block w-full h-auto"
       />
       
       {/* Mobile Image - Hidden on desktop */}
       <img 
         src={MobilePoster} 
         alt="About Carousel Mobile" 
         className="block md:hidden w-full h-auto"
       />
     </div>
   )
}

export default BottomPoster