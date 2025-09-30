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
import OrderManagement from './pages/Admin/OrderManagement';
import Marquee from './components/Marquee';
import PrivacyPolicy from './pages/PrivacyPolicy';
import ReturnAndRefund from './pages/ReturnAndRefund';
import TermsAndConditions from './pages/TermsAndConditions';

const AppContent = () => {
  const location = useLocation();
  const isAdminPage = location.pathname.includes('/adminlogin');
  
  // Define routes where navbar and footer should be hidden
  const hideNavFooterRoutes = ['/adminlogin'];
  
  // Check if current route should hide navbar and footer
  const shouldHideNavFooter = hideNavFooterRoutes.includes(location.pathname);

  return (
    <>
         <Marquee hide={isAdminPage} />

      {/* Conditionally render NavBar */}
      {!shouldHideNavFooter && <NavBar />}
      {!shouldHideNavFooter && <FloationWhatsappIcon/>}
      <UpArrow/>

      <Routes>
        {/* User routes */}
        <Route path='/' element={<Home />} />
        <Route path="/contact" element={<ContactForm />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path='/products' element={<Products />} />
        <Route path='/checkout' element={<CheckOutPage />} />
        <Route path='/privacy' element={<PrivacyPolicy/>} />
        <Route path='/refund-policy' element={<ReturnAndRefund/>} />
        <Route path='/terms' element={<TermsAndConditions/>} />
        
        {/* Admin routes */}
        <Route path='/adminlogin' element={<AdminLogin />} />
        <Route path='/admin/orders' element={<OrderManagement />} />
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