import React from 'react'
import BreadCrumsProduct from '../components/Products/BreadCrumsProduct'
import ProductsItem from '../components/Products/ProductsItem'
import ProductsGrid from '../components/Products/Prductgrid'
import BottomPoster from '../components/Products/BottomPoster'

const Products = () => {
  return (
    <div>
      <BreadCrumsProduct/>
        <h1 className='text-5xl text-center mt-8 mb-2'>Our Products</h1>
        <div className='w-24 h-1 bg-gradient-to-r from-[#93B45D] to-[#F18372] mx-auto mb-8 rounded-full '></div>
        <div className=' justify-center max-w-7xl mx-auto mt-8 mb-16'>
          <ProductsGrid/>
        </div>
                  <BottomPoster/>

    </div>
  )
}

export default Products