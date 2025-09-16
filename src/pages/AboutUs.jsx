import React from 'react'
import BreadCrums from '../components/About/BreadCrums'
import Carousel from '../components/About/carousel'
import AboutSection from '../components/About/AboutSection'
import Founder from '../components/About/Founder'
import Paapatchi from '../components/About/Paapatchi'

const AboutUs = () => {
  return ( 
    <div>
        <BreadCrums/>
        <Carousel/>
        <AboutSection/>
        <Founder/>
        <Paapatchi/>
    </div>
  )
}

export default AboutUs