import React, { useState } from "react";
import testimonialbg from "../../assets/Testimonial.png"
import { useNavigate } from "react-router-dom";

const Testimonials = () => {
  const navigate =useNavigate();
    const handleNavigation = (path) => {
        navigate('/products');
        console.log('Navigate to:', path);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

  const cardsData = [
    {
      name: "Sutha",
      content: "Good morning Madam, Very thankful for giving such a super herbal napkin It makes me a regular period and has a perfect original herbal  .The main thing is my PCDO is now normal. No Leakage Issue and complete cotton product ",
      avatar: "S"
    },
    {
      name: "Meena", 
      content: "Thanks for the best product 👍👍👍 what u suggest and given a product that's help my irregular periods issue. Thanks akka",
      avatar: "M"
    },
    {
      name: "Jothi Lakshmi",
      content: "Pad  very nice, Very comfortable, Thank you very much sis",
      avatar: "JL"
    },
    {
      name: "Kanishka",
      content: "Sis napkin very nice and comfortable no leakage thank u so much ",
      avatar: "K"
    },
    {
      name: "Divya",
      content: "thanks to give me the wonderfull product sis. this napkin feel soo comfortable and freshness,no irritation i feel blessed to have it , i m sure to recommended this pad to my frds and family ",
      avatar: "D"
    },
    {
      name: "Aishu",
      content: "Pad comfortable ah Nala  eruku use pana, Use panum pothu Nala cool la feel aaguthu, Irritation eila Nala eruku, Apservasion yepputi irrukku, Aah one day fulla tharalama use panala",
      avatar: "A"
    },
    {
      name: "Mrs Gomati",
      content: "Hi Valli,These sanitary pads are comfortable, soft, and absorb really well. They fit securely, prevent leaks, and keep me feeling fresh and confident. A very reliable product. These herbal sanitary pads are an excellent choice for anyone looking for comfort and natural care. They are soft, breathable, and provide strong absorption while being gentle on the skin. I appreciate that they are eco-friendly and free from harmful chemicals, which makes them safe and reliable for everyday use. They keep me feeling fresh, comfortable, and confident throughout the day.💐💐💐",
      avatar: "G"
    }
  ];

  const CreateCard = ({ card, index }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    
    // Check if text exceeds approximately 6 lines (roughly 120-150 characters depending on content)
    const shouldTruncate = card.content.length > 120;
    const displayText = card.content;

    return (
      <div className="group relative rounded-2xl p-6 mx-3 shadow-lg hover:shadow-2xl transition-all duration-500 shrink-0 w-56 sm:w-60 md:w-72 lg:w-80 bg-white/90 backdrop-blur-md border border-white/50">
        {/* Glossy effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-transparent rounded-2xl pointer-events-none"></div>
        
        {/* Gradient border effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl"></div>
        
        {/* Content */}
        <div className="relative z-10">
          {/* Quote icon */}
          <div className="mb-4">
            <svg className="w-8 h-8 text-green-500/30 group-hover:text-green-500/60 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
            </svg>
          </div>

          {/* Review text */}
          <div className="mb-6">
            <p 
              className={`text-slate-800 text-lg leading-relaxed font-medium group-hover:text-slate-900 transition-colors duration-300 ${
                shouldTruncate && !isExpanded 
                  ? 'line-clamp-6 overflow-hidden' 
                  : ''
              }`}
              style={{
                display: shouldTruncate && !isExpanded ? '-webkit-box' : 'block',
                WebkitLineClamp: shouldTruncate && !isExpanded ? 2 : 'unset',
                WebkitBoxOrient: 'vertical',
                textShadow: '0 1px 2px rgba(255, 255, 255, 0.8)'
              }}
            >
              "{displayText}"
            </p>
            
            {shouldTruncate && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="mt-2 text-green-600 hover:text-green-700 font-semibold text-sm transition-colors duration-200 hover:underline focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded"
              >
                {isExpanded ? 'Read less' : 'Read more'}
              </button>
            )}
          </div>

          {/* Author info */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg group-hover:shadow-xl transition-shadow duration-300">
              {card.avatar}
            </div>
            <div>
              <div className="font-semibold text-slate-900 text-base">{card.name}</div>
              <div className="text-slate-500 text-sm font-medium">{card.role}</div>
            </div>
          </div>

          {/* Star rating */}
          <div className="flex gap-1 mt-4 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Create seamless loop - duplicate only once for smooth transition
  const testimonialLoop = [...cardsData, ...cardsData];

  return (
    <>
      <style>{`
        @keyframes marqueeFlow {
  0% { 
    transform: translateX(0%); 
  }
  100% { 
    transform: translateX(-100%); 
  }
}

        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .marquee-animation {
          animation: marqueeFlow 35s linear infinite;
        }
        
        .fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .marquee-container {
          mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 5%,
            black 95%,
            transparent 100%
          );
          -webkit-mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 5%,
            black 95%,
            transparent 100%
          );
        }

        .line-clamp-6 {
          display: -webkit-box;
          -webkit-line-clamp: 6;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Pause animation on hover */
        .marquee-container:hover .marquee-animation {
          animation-play-state: paused;
        }

        /* Mobile optimizations - adjust speed for different screen sizes */
       @media (max-width: 768px) {
  .marquee-animation {
    animation: marqueeFlow 50s linear infinite; /* slower on tablet */
  }
}

@media (max-width: 480px) {
 @keyframes marqueeFlow {
  0% { 
    transform: translateX(0%); 
  }
  100% { 
    transform: translateX(-400%); 
  }
}
  .marquee-animation {
    animation: marqueeFlow 30s linear infinite; /* even slower on mobile */
  }
}

      `}</style>

      <div className="py-16 px-4 relative overflow-hidden">
        {/* Background image with glossy overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: {testimonialbg},
          }}
        />
        
        {/* Glossy overlay for better text visibility */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-green-50/90 to-emerald-50/95 backdrop-blur-sm" />
        
        {/* Glass effect layer */}
        <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px]" 
             style={{
               boxShadow: 'inset 0 0 100px rgba(255, 255, 255, 0.3)'
             }} 
        />

        {/* Header */}
        <div className="text-center mb-16 fade-in-up relative z-10">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            Natural & Trusted
          </div>
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-green-800 via-emerald-700 to-green-800 bg-clip-text text-transparent mb-6">
            Real Women, Real Stories
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Discover how our herbal napkins with natural ingredients are transforming women's comfort and confidence every month.
          </p>
        </div>

        {/* Testimonials marquee */}
        <div className="marquee-container relative py-8">
          <div className="marquee-animation flex items-center">
            {testimonialLoop.map((card, index) => (
              <CreateCard key={index} card={card} index={index} />
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 fade-in-up relative z-10">
          <div className="inline-flex items-center gap-4 bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-full px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-300">
            <span className="text-slate-700 font-medium">Join thousands of satisfied women</span>
            <button 
              className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-2 rounded-full font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
              onClick={(e) => {
                e.preventDefault();
                handleNavigation("/products");
              }}
            >
              Try Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Testimonials;