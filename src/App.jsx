import React from 'react'
import { Routes, Route, useLocation } from "react-router-dom";
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import ContactForm from './pages/ContactForm';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Products from './pages/Products';
import CheckOutPage from './pages/CheckOutPage';
import AdminLogin from './pages/Admin/AdminLogin';

const App = () => {
  const location = useLocation();

  // Routes where NavBar and Footer should be hidden
  const hideLayoutRoutes = ['/adminlogin'];

  const shouldHideLayout = hideLayoutRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideLayout && <NavBar />}

      <Routes>
        {/* User routes */}
        <Route path='/' element={<Home />} />
        <Route path="/contact" element={<ContactForm />} />
        <Route path="/about" element={<AboutUs />} />  
        <Route path='/products' element={<Products />} />
        <Route path='/checkout' element={<CheckOutPage />} />

        {/* Admin routes */}
        <Route path='/adminlogin' element={<AdminLogin />} />
      </Routes>

      {!shouldHideLayout && <Footer />}
    </>
  )
}

export default App;
