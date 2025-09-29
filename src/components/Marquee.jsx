import React from "react";
import './marquee.css';

const Marquee = ({ speed = 30, hide = false }) => {
  const items = [
    "🌿 100% Herbal Sanitary Napkin",
    "💧 Leakage Proof & Comfortable",
    "🌿 Breathable Design for Freshness",
    "♻️ Affordable & Eco-Friendly",
  ];

  if (hide) return null; // Don't render if hide is true

  return (
    <div className="marquee-container">
      <div 
        className="marquee-content"
        style={{ animationDuration: `${speed}s` }}
      >
        {items.map((item, index) => (
          <span key={index} className="marquee-item">{item}</span>
        ))}
        {items.map((item, index) => (
          <span key={`repeat-${index}`} className="marquee-item">{item}</span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;