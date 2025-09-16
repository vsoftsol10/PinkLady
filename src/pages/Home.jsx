import React from 'react'
import HomeAbout from '../components/Home/HomeAbout'
import HomeProducts from '../components/Home/HomeProducts';
import WhyPinkLady from '../components/Home/WhyPinkLady';
import Unique from '../components/Home/Unique';
import Benefits from '../components/Home/Benefits';
import HomeContact from '../components/Home/HomeContact';


const Home = () => {
  return (
    <div className=' max-w-7xl mx-auto'>
      <HomeAbout/>
      <HomeProducts/>
      <WhyPinkLady/>
      <Benefits/>
      <Unique/>
      <HomeContact/>
    </div>
  );
}

export default Home;