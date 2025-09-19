import React from 'react'

const AboutSection = () => {
  return (
    <div className="bg-white-50 py-20 px-8 mb-8 relative overflow-hidden">
      {/* Enhanced background pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gray-100 via-transparent to-gray-100 opacity-5"></div>
        <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-[#fabdb4]/10 to-[#ffbdb3]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-gradient-to-tr from-gray-200/20 to-gray-300/20 rounded-full blur-2xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section with Centered Title */}
        <div className="text-center mb-16">
          <div className="inline-block relative">
            <div className="flex items-center justify-center gap-8 mb-6">
              <div className="w-24 h-px bg-gradient-to-r from-transparent to-gray-400"></div>
              <h3 className="text-3xl md:text-4xl text-gray-700 font-light tracking-widest uppercase">
                About
              </h3>
              <div className="w-24 h-px bg-gradient-to-l from-transparent to-gray-400"></div>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-[#6b2f25] via-gray-800 to-[#6b2f25] bg-clip-text text-transparent mb-4 tracking-tight">
              Pink Lady
            </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-[#fabdb4] to-[#ffbdb3] mx-auto rounded-full"></div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* Introduction Card */}
          <div className="lg:col-span-2">
            <div className="bg-white/60 backdrop-blur-md rounded-3xl p-8 shadow-lg border border-white/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#fabdb4]/20 to-transparent rounded-full blur-xl"></div>
              <div className="relative z-10">
                <h4 className="text-2xl font-semibold text-gray-800 mb-6 font-serif">Herbal Comfort & Protection</h4>
                <p className="text-gray-600 leading-relaxed text-lg font-serif">
                  Pink Lady Herbal Napkin, also known as <span className="font-semibold text-[#6b2f25]">Paapatchi Herbal Napkin</span>, is a specifically formulated herbal sanitary napkin designed to bring women herbal comfort, herbal protection, and herbal freshness. Each napkin is infused with a special six-herbal blend at the center to provide natural care and wellness.
                </p>
              </div>
            </div>
          </div>

          {/* Side Feature */}
          <div className="flex flex-col justify-center">
            <div className="bg-gradient-to-br from-[#fabdb4]/30 to-[#ffbdb3]/30 backdrop-blur-sm rounded-2xl p-6 border border-[#fabdb4]/50">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-[#bd5947] to-[#6b2f25]/80 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white font-bold text-2xl font-serif">6</span>
                </div>
                <h5 className="text-lg font-semibold text-gray-800 mb-2">Powerful Herbs</h5>
                <p className="text-gray-600 text-sm">Carefully selected natural ingredients for your wellness</p>
              </div>
            </div>
          </div>
        </div>

        {/* Our Story Section */}
        <div className="mb-16">
          <div className="bg-white/70 backdrop-blur-md rounded-3xl p-10 shadow-xl border border-white/60 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-48 h-48 bg-gradient-to-br from-[#fabdb4]/20 to-transparent rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-[#6b2f25]/10 to-transparent rounded-full blur-xl"></div>
            <div className="relative z-10">
              <div className="text-center mb-8">
                <h4 className="text-3xl font-bold text-[#6b2f25] mb-4 font-serif">Our Story</h4>
                <div className="w-24 h-1 bg-gradient-to-r from-[#fabdb4] to-[#ffbdb3] mx-auto rounded-full"></div>
              </div>
              <p className="text-gray-700 leading-relaxed text-lg font-serif mb-8">
                Pink Lady Herbal Napkins was born out of a personal journey. In 2013, our founder struggled with PCOS and thyroid-related issues that disrupted her health. Guided by her grandmother's traditional healing wisdom, she discovered the power of natural herbs like turmeric and neem, blended with soft cotton. This remedy worked wonders and inspired her to create safe, herbal-based sanitary napkins. What began as a personal solution soon became a mission to help other women facing similar struggles.
              </p>
            </div>
          </div>
        </div>

        {/* Our Purpose Section */}
        <div className="mb-16">
          <div className="bg-gradient-to-r from-[#fabdb4]/30 to-[#ffbdb3]/30 backdrop-blur-sm rounded-3xl p-10 border border-[#fabdb4]/50 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent"></div>
            <div className="relative z-10">
              <div className="text-center mb-8">
                <h4 className="text-3xl font-bold text-[#6b2f25] mb-4 font-serif">Our Purpose</h4>
                <div className="w-24 h-1 bg-gradient-to-r from-[#6b2f25] to-[#6b2f25]/70 mx-auto rounded-full"></div>
              </div>
              <p className="text-gray-700 leading-relaxed text-lg font-serif mb-6">
                We believe quality menstrual care should not be a luxury. Many women face the double challenge of health issues and high medical costs. That's why Pink Lady is built as a <span className="font-bold text-[#6b2f25]">service-driven initiative</span>, not a profit-hungry brand. Each napkin is made fresh, <b>plastic-free, ISO-certified, and crafted from edible-grade herbs and pure cotton</b>.
              </p>
            </div>
          </div>
        </div>

        {/* Our Promise Section */}
        <div className="mb-16">
          <div className="bg-white/80 backdrop-blur-md rounded-3xl p-10 shadow-lg border border-white/70 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#fabdb4]/30 to-transparent rounded-full blur-xl"></div>
            <div className="relative z-10">
              <div className="text-center mb-8">
                <h4 className="text-3xl font-bold text-[#6b2f25] mb-4 font-serif">Our Promise</h4>
                <div className="w-24 h-1 bg-gradient-to-r from-[#fabdb4] to-[#ffbdb3] mx-auto rounded-full"></div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  "100% herbal and plastic-free",
                  "Freshly made, hygienic, and safe", 
                  "Affordable and accessible for every woman",
                  "Backed by traditional wisdom and modern testing"
                ].map((promise, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 bg-gradient-to-r from-[#fabdb4]/20 to-[#ffbdb3]/20 rounded-xl border border-[#fabdb4]/30">
                    <div className="w-3 h-3 bg-gradient-to-r from-[#6b2f25] to-[#bd5947] rounded-full flex-shrink-0"></div>
                    <p className="text-gray-700 font-serif text-lg">{promise}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Herbal Ingredients Section */}
        
        
        {/* Closing Statement */}
        <div className="relative">
          <div className="bg-gradient-to-r from-[#6b2f25]/90 to-[#bd5947]/90 backdrop-blur-md rounded-3xl p-10 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-white/10 to-transparent rounded-full blur-2xl"></div>
            <div className="relative z-10 text-center">
              <p className="leading-relaxed text-xl font-serif italic max-w-4xl mx-auto mb-6">
                Today, Pink Lady Herbal Napkins are trusted by students, professionals, and women from all walks of life. <br /> <span className='text-xl text-amber-100'>Our goal is simple: to provide safe, sustainable, and affordable menstrual care while honoring our roots in traditional healing.</span> 
              </p>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutSection