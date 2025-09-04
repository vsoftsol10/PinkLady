// Footer.jsx
import React from "react";
import MainLogo from "../assets/PinkLadyLogo.png";
import "./Footer.css";

const Footer = () => {
  const linkSections = [
    {
      title: "Quick Links",
      links: ["Home", "About", "Products", "Blog", "Contact"],
    },
    {
      title: "Our Policies",
      links: [
        "Terms of Service",
        "Return & Refund Policy",
        "Payment Methods",
        "Track your Order",
      ],
    },
    {
      title: "Follow Us",
      links: ["Instagram", "Facebook"]
    },
  ];

  return (
    <footer className="footer">
      {/* Top Section */}
      <div className="footer-container">
        {/* Mobile Layout */}
        <div className="footer-mobile">
          {/* Logo + Description - Mobile */}
          <div className="footer-mobile-header">
            <img src={MainLogo} alt="Pink Lady Logo" className="footer-logo-mobile" />
            <p className="footer-description-mobile">
              Pink Lady – Your trusted brand for premium sanitary napkins.
              Comfort, care, and confidence in every product.
            </p>
          </div>

          {/* Links - Mobile (Stacked) */}
          <div className="footer-mobile-links">
            {linkSections.map((section, index) => (
              <div key={index} className="footer-section-mobile">
                <h2 className="footer-title-mobile">{section.title}</h2>
                <ul className="footer-list-mobile">
                  {section.links.map((link, i) => (
                    <li key={i} className="footer-link-item">
                      {link}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop/Tablet Layout */}
        <div className="footer-desktop">
          {/* Logo + Description - Desktop */}
          <div className="footer-brand">
            <img src={MainLogo} alt="Pink Lady Logo" className="footer-logo-desktop" />
            <p className="footer-description-desktop">
              Pink Lady – Your trusted brand for premium sanitary napkins.
              Comfort, care, and confidence in every product.
            </p>
          </div>

          {/* Links - Desktop */}
          <div className="footer-links-container">
            {linkSections.map((section, index) => (
              <div key={index} className="footer-section-desktop">
                <h2 className="footer-title-desktop">{section.title}</h2>
                <ul className="footer-list-desktop">
                  {section.links.map((link, i) => (
                    <li key={i} className="footer-link-item">
                      {link}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="footer-divider-container">
        <div className="footer-divider"></div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        © {new Date().getFullYear()} Pink Lady | Powered by Paapatchi Enterprises. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;