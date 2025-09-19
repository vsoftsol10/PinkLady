// Footer.jsx
import React from "react";
import MainLogo from "../assets/PinkLadyLogo.png";
import logo from "../assets/PapaatchiLogo.png";
import "./Footer.css";

const Footer = () => {
  const linkSections = [
    {
      title: "Quick Links",
      links: ["Home", "About", "Products", "Contact"],
      urls: ["/", "/about", "/products", "/contact"], // lowercase urls
    },
    {
      title: "Our Policies",
      links: [
        "Terms of Service",
        "Return & Refund Policy",
        "Payment Methods",
        "Track your Order",
      ],
      urls: [
        "/terms",
        "/refund-policy",
        "/payment-methods",
        "/track-order",
      ],
    },
    {
      title: "Follow Us",
      links: ["Instagram", "Facebook"],
      urls: [
        "https://www.instagram.com/paapatchi_enterprises/?igsh=MWc4eTJ6dHkwejZreQ%3D%3D#",
        "https://facebook.com/yourpage",
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
          </div>

          {/* Links Sections */}
          <div className="footer-links-wrapper">
            {linkSections.map((section, index) => (
              <div key={index} className="footer-section">
                <h2 className="footer-title">{section.title}</h2>
                <ul className="footer-list">
                  {section.links.map((link, i) => (
                    <li key={i} className="footer-link-item">
                      <a
                        href={section.urls ? section.urls[i] : "#"}
                        className="footer-link"
                        target={section.title === "Follow Us" ? "_blank" : "_self"}
                        rel="noopener noreferrer"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Paapatchi Brand Section */}
          <div className="footer-partner">
            <img
              src={logo}
              alt="Paapatchi Logo"
              className="footer-partner-logo"
            />
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
