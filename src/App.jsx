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
import AdminDashBoard from './pages/Admin/AdminDashBoard';
import { CartProvider } from './context/CartContext'; // Import CartProvider
import UpArrow from './components/UpArrow';
import FloationWhatsappIcon from './components/FloatingWhatsAppIcon';

const AppContent = () => {
  const location = useLocation();
  
  // Define routes where navbar and footer should be hidden
  const hideNavFooterRoutes = ['/adminlogin'];
  
  // Check if current route should hide navbar and footer
  const shouldHideNavFooter = hideNavFooterRoutes.includes(location.pathname);

  return (
    <>
      {/* Conditionally render NavBar */}
      {!shouldHideNavFooter && <NavBar />}
      <UpArrow/>
      <FloationWhatsappIcon/>
      <Routes>
        {/* User routes */}
        <Route path='/' element={<Home />} />
        <Route path="/contact" element={<ContactForm />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path='/products' element={<Products />} />
        <Route path='/checkout' element={<CheckOutPage />} />
        
        {/* Admin routes */}
        <Route path='/adminlogin' element={<AdminLogin />} />
        <Route path='/admin' element={<AdminDashBoard/>} />
      </Routes>
      
      {/* Conditionally render Footer */}
      {!shouldHideNavFooter && <Footer />}
    </>
  )
}

const App = () => {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  )
}

export default App;