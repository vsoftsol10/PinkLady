import React from 'react'
import { Routes, Route } from "react-router-dom";
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import ContactForm from './pages/ContactForm';
import Home from './pages/Home';
const App = () => {
  return (
    <>
    <NavBar />
      <Routes>
        <Route path="/contact" element={<ContactForm />} />
        <Route path='/' element={<Home/>} />
      </Routes>
    <Footer />
    </>
  )
}

export default App