import React from 'react'
import HomeAbout from '../components/Home/HomeAbout'
import HomeProducts from '../components/Home/HomeProducts';
import WhyPinkLady from '../components/Home/WhyPinkLady';
import Unique from '../components/Home/Unique';
import Benefits from '../components/Home/Benefits';
import HomeContact from '../components/Home/HomeContact';
import Testimonials from '../components/Home/Testimonials';
import StepByStep from '../components/Home/StepByStep';


const Home = () => {
  return (
<div className=" mt-[50px] md:mt-[200px]">
      <HomeAbout/>
      <HomeProducts/>
      <WhyPinkLady/>
      <Benefits/>
      <StepByStep/>
      <Unique/>
      <Testimonials/>
      <HomeContact/>
    </div>
  );
}

export default Home;