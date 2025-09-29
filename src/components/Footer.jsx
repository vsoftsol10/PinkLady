// Footer.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import MainLogo from "../assets/PinkLadyLogo.png";
import logo from "../assets/PapaatchiLogo.png";
import certificationIcon from "../assets/ISO.png"; 
import certificationIcon1 from "../assets/IAF.png"; 
import certificationIcon2 from "../assets/MSME.png"; 
import certificationIcon3 from "../assets/EGAC.png"; 
import certificationIcon4 from "../assets/TATSC.png"; 

import "./Footer.css";

const Footer = () => {
  const navigate = useNavigate();

  // Custom navigation with smooth scroll
  const handleNavigation = (path) => {
    navigate(path);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);
  };

  const linkSections = [
    {
      title: "Quick Links",
      links: ["Home", "About", "Products", "Contact"],
      urls: ["/", "/about", "/products", "/contact"],
    },
    {
      title: "Our Policies",
      links: [
        "Privacy Policy",
        "Return & Refund Policy",
        "Terms and Conditions",
      ],
      urls: [
        "/privacy",
        "/refund-policy",
        "/terms",
      ],
    },
    {
      title: "Follow Us",
      links: ["Instagram", "Facebook"],
      urls: [
        "https://www.instagram.com/paapatchi_enterprises/?igsh=MWc4eTJ6dHkwejZreQ%3D%3D#",
        "https://facebook.com/",
      ],
    },
  ];

  return (
    <footer className="footer">
      {/* Main Footer Content */}
      <div className="footer-container">
        <div className="footer-content">
          {/* Brand Section */}
          <div className="footer-brand">
            <img src={MainLogo} alt="Pink Lady Logo" className="footer-logo" />
            <p className="footer-description">
              Pink Lady – Your trusted brand for premium sanitary napkins.
              Comfort, care, and confidence in every product.
            </p>
            <div className="footer-certification">
  <div className="footer-certification-icons">
    <img 
      src={certificationIcon} 
      alt="ISO Certification" 
      className="footer-certification-icon" 
    />
    <img 
      src={certificationIcon1} 
      alt="IAF Certification" 
      className="footer-certification-icon" 
    />
    <img 
      src={certificationIcon2} 
      alt="MSME Certification" 
      className="footer-certification-icon" 
    />
    <img 
      src={certificationIcon3} 
      alt="EGAC Certification" 
      className="footer-certification-icon" 
    />
  </div>
  <div className="footer-certification-icons">
    <img 
      src={certificationIcon4} 
      alt="ISO Certification" 
      className="footer-certification-icon" 
    />
    <p className="text-5 font-serif ">TITSC-SANITARY NAPKIN  LAB TESTED PRODUCT</p>
    
  </div>
</div>
          </div>

          {/* Links Sections */}
          <div className="footer-links-wrapper">
            {linkSections.map((section, index) => (
              <div key={index} className="footer-section">
                <h2 className="footer-title">{section.title}</h2>
                <ul className="footer-list">
                  {section.links.map((link, i) => (
                    <li key={i} className="footer-link-item">
                      {section.title === "Follow Us" ? (
                        <a
                          href={section.urls[i]}
                          className="footer-link"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {link}
                        </a>
                      ) : (
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            handleNavigation(section.urls[i]);
                          }}
                          className="footer-link"
                        >
                          {link}
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Paapatchi Brand Section */}
          <div className="footer-partner">
            <img src={logo} alt="Paapatchi Logo" className="footer-partner-logo" />
            <p className="footer-partner-text">
              <strong>Paapatchi Enterprises Proudly Presenting Pink Lady</strong>
            </p>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="footer-divider"></div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="footer-bottom-container">
          © {new Date().getFullYear()} Pink Lady | Powered by Paapatchi Enterprises. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
