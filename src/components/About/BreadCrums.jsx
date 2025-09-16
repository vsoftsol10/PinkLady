import React from 'react'
import homeIcon from "../../assets/icon/HomeIcon.png"

const BreadCrums = () => {
   return (
        <div className="flex flex-wrap justify-center items-center space-x-2 mt-8 mb-8 text-sm text-gray-500 font-medium">
            <a href="/" >
                <img src={homeIcon} alt="" className='w-10' />
            </a>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="m14.413 10.663-6.25 6.25a.939.939 0 1 1-1.328-1.328L12.42 10 6.836 4.413a.939.939 0 1 1 1.328-1.328l6.25 6.25a.94.94 0 0 1-.001 1.328" fill="#CBD5E1"/>
            </svg>
            <a href="/about" className='font-bold text-xl mt-1'>About Pink Lady</a>
            
        </div> 
    );
}

export default BreadCrums