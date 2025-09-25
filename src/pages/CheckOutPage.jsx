import React from 'react'
import Checkout from '../components/Checkout/Checkout';

const CheckOutPage = () => {
  return (
    <div className='max-w-7xl mx-auto mt-[100px] md:mt-[150px]'>
        <h1 className='text-4xl text-center mt-8 mb-2'>Cart</h1> 
        <div className="w-8 h-1 bg-gradient-to-r from-[#93B45D] to-[#F18372] mx-auto mb-6 rounded-full"></div>
        <Checkout/>
    </div>
  )
}

export default CheckOutPage;