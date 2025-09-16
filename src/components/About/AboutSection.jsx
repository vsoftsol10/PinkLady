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

        {/* Herbal Ingredients Section */}
        <div className="mb-12">
          <div className="text-center mb-12">
            <h4 className="text-3xl font-semibold text-gray-800 mb-4 font-serif">The Sacred Six Herbal Blend</h4>
            <p className="text-gray-600 max-w-2xl mx-auto">Every herb is chosen for its specific qualities, building an intense synergy of natural protection and healing.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "Thulasi Powder",
                description: "known for its natural healing and purifying properties.",
                color: "from-green-100 to-green-50"
              },
              {
                name: "Aloe Vera Powder", 
                description: "offering soothing, cooling, and herbal skin care benefits.",
                color: "from-emerald-100 to-emerald-50"
              },
              {
                name: "Vettiver Powder",
                description: "adding refreshing herbal fragrance and antibacterial protection.",
                color: "from-teal-100 to-teal-50"
              },
              {
                name: "Manjal (Turmeric) Powder",
                description: "a traditional herbal antiseptic for extra protection.",
                color: "from-yellow-100 to-yellow-50"
              },
              {
                name: "Neem Powder",
                description: "a powerful herbal antibacterial and antifungal agent.",
                color: "from-lime-100 to-lime-50"
              },
              {
                name: "Triphala Chooranam Powder",
                description: "a classic Ayurvedic herbal detoxifier that enhances overall hygiene.",
                color: "from-orange-100 to-orange-50"
              }
            ].map((herb, index) => (
              <div key={index} className={`bg-gradient-to-br ${herb.color} rounded-2xl p-6 border border-white/60 backdrop-blur-sm hover:scale-105 transition-all duration-300 group relative overflow-hidden`}>
                <div className="absolute top-0 right-0 w-20 h-20 bg-white/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#6b2f25] to-[#6b2f25]/70 rounded-full mb-4 flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <h5 className="text-lg font-semibold text-gray-800 mb-3 font-serif">{herb.name}</h5>
                  <p className="text-gray-600 text-sm leading-relaxed">{herb.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Closing Statement */}
        <div className="relative">
          <div className="bg-gradient-to-r from-[#fabdb4]/40 to-[#ffbdb3]/40 backdrop-blur-md rounded-3xl p-10 border-l-8 border-[#6b2f25] relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent"></div>
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-[#6b2f25]/10 to-transparent rounded-full blur-2xl"></div>
            <div className="relative z-10 text-center">
              <p className="text-gray-700 leading-relaxed text-xl font-serif italic max-w-4xl mx-auto">
                With these six mighty herbals blended, <span className="font-bold text-[#6b2f25]">Pink Lady Herbal Napkin</span> provides all-day comfort, natural defense, and a feeling of empowerment. Each napkin is intricately infused with this herbal blend, uniting purity, safety, and self-assurance in one.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutSection