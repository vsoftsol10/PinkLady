import React from 'react'
import { Routes, Route } from "react-router-dom";
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import ContactForm from './pages/ContactForm';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
const App = () => {
  return (
    <>
    <NavBar />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path="/contact" element={<ContactForm />} />
        <Route path="/about" element={<AboutUs/>} />  
      </Routes>
    <Footer />
    </>
  )
}

export default App