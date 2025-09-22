import React from 'react'
import HomeAbout from '../components/Home/HomeAbout'
import HomeProducts from '../components/Home/HomeProducts';
import WhyPinkLady from '../components/Home/WhyPinkLady';
import Unique from '../components/Home/Unique';
import Benefits from '../components/Home/Benefits';
import HomeContact from '../components/Home/HomeContact';
import Testimonials from '../components/Home/Testimonials';


const Home = () => {
  return (
    <div className=' max-w-7xl mx-auto'>
      <HomeAbout/>
      <HomeProducts/>
      <WhyPinkLady/>
      <Benefits/>
      <Unique/>
      <Testimonials/>
      <HomeContact/>
    </div>
  );
}

export default Home;