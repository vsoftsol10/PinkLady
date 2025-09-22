import React from "react";
import { useNavigate } from "react-router-dom";

const Testimonials = () => {
    const navigate = useNavigate();
    const handleNavigation = (path) => {
        navigate(path);
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
        }, 100);
    };

  const cardsData = [
    {
      name: "Sarah Mitchell",
      role: "Working Mom",
      content: "Finally found napkins that are gentle on my sensitive skin and made with natural ingredients. My cramps are so much more manageable now!",
      avatar: "SM"
    },
    {
      name: "Priya Sharma", 
      role: "College Student",
      content: "These herbal napkins are a game-changer! No more irritation or discomfort. I feel fresh and confident all day long.",
      avatar: "PS"
    },
    {
      name: "Emma Rodriguez",
      role: "Fitness Instructor",
      content: "As someone who's always active, I need reliable protection. These napkins with herbal extracts keep me comfortable during my workouts.",
      avatar: "ER"
    },
    {
      name: "Lisa Thompson",
      role: "Healthcare Worker",
      content: "I love that these napkins are chemical-free and infused with natural herbs. Perfect for my 12-hour shifts at the hospital.",
      avatar: "LT"
    },
    {
      name: "Aisha Patel",
      role: "Yoga Teacher",
      content: "The natural lavender scent is so soothing! These herbal napkins align perfectly with my holistic lifestyle approach.",
      avatar: "AP"
    }
  ];

  const CreateCard = ({ card }) => (
    <div className="group relative bg-gradient-to-br from-slate-50 to-white border border-slate-200/60 rounded-2xl p-6 mx-3 shadow-sm hover:shadow-2xl hover:shadow-slate-900/10 transition-all duration-500 shrink-0 w-80 backdrop-blur-sm">
      {/* Gradient border effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 via-emerald-500/20 to-teal-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl"></div>
      
      {/* Content */}
      <div className="relative z-10">
        {/* Quote icon */}
        <div className="mb-4">
          <svg className="w-8 h-8 text-green-500/30 group-hover:text-green-500/60 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
          </svg>
        </div>

        {/* Review text */}
        <p className="text-slate-700 text-lg leading-relaxed mb-6 font-medium group-hover:text-slate-800 transition-colors duration-300">
          "{card.content}"
        </p>

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

  return (
    <>
      <style>{`
        @keyframes marqueeFlow {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
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
          animation: marqueeFlow 40s linear infinite;
        }
        
        .fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .marquee-container {
          mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 10%,
            black 90%,
            transparent 100%
          );
          -webkit-mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 10%,
            black 90%,
            transparent 100%
          );
        }
      `}</style>

      <div className="py-16 px-4 bg-gradient-to-br from-green-50/50 via-white to-emerald-50/30 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-72 h-72 bg-green-500 rounded-full mix-blend-multiply filter blur-xl"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl"></div>
          <div className="absolute -bottom-10 left-1/2 w-72 h-72 bg-teal-500 rounded-full mix-blend-multiply filter blur-xl"></div>
        </div>

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
        <div className="marquee-container relative">
          <div className="marquee-animation flex items-center min-w-[200%]">
            {[...cardsData, ...cardsData].map((card, index) => (
              <CreateCard key={index} card={card} />
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 fade-in-up relative z-10">
          <div className="inline-flex items-center gap-4 bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-full px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-300">
            <span className="text-slate-700 font-medium">Join thousands of satisfied women</span>
            <button className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-2 rounded-full font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl"
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