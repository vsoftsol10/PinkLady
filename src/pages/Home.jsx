import React from 'react'
import HomeAbout from '../components/Home/HomeAbout'
import HomeProducts from '../components/Home/HomeProducts';
import WhyPinkLady from '../components/Home/WhyPinkLady';
import Unique from '../components/Home/Unique';
import Benefits from '../components/Home/Benefits';


const Home = () => {
  return (
    <div>
      <HomeAbout/>
      <HomeProducts/>
      <WhyPinkLady/>
      <Benefits/>
      <Unique/>
    </div>
  );
}

export default Home;