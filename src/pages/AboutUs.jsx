import React from 'react'
import BreadCrums from '../components/About/BreadCrums'
import Carousel from '../components/About/carousel'
import AboutSection from '../components/About/AboutSection'
import Founder from '../components/About/Founder'
import Paapatchi from '../components/About/Paapatchi'
import Quote from '../components/About/Quote'

const AboutUs = () => {
  return ( 
    <div>
        <BreadCrums/>
        <Carousel/>
        <AboutSection/>
        <Founder/>
        <Paapatchi/>
        <Quote/>
    </div>
  )
}

export default AboutUs