import React, { useState } from "react";
import Master from "../../assets/GrandFather.png";
import Founder from "./Founder";
const AboutSection = () => {
  const [currentChapter, setCurrentChapter] = useState(0);

  const storyChapters = [
    {
      title: "Chapter 1: The Struggle",
      year: "2013",
      content:
        "It was 2013 when everything seemed to fall apart. Our founder found herself battling PCOD and thyroid issues that turned her monthly cycles into a nightmare. The pain was unbearable, the discomfort constant, and the solutions available felt inadequate and expensive.",
      image: "🌧️",
      color: "from-[#93b45d] to-[#93b45d]",
    },
    {
      title: "Chapter 2: Grandmother's Wisdom",
      year: "The Discovery",
      content:
        "In her darkest moments, she remembered her grandmother's gentle hands and ancient wisdom. 'Beta,' her grandmother would say, 'nature has given us everything we need.' Turmeric for healing, neem for protection, soft cotton for comfort - these weren't just ingredients, they were remedies passed down through generations.",
      image: "👵🏽",
      color: "from-[#F18372] to-[#f18372]",
    },
    {
      title: "Chapter 3: The Miracle",
      year: "Hope Returns",
      content:
        "What happened next felt like magic. The herbal blend worked wonders where modern solutions had failed. The pain subsided, the discomfort faded, and for the first time in years, she felt like herself again. But this wasn't just personal relief - it was a revelation.",
      image: "✨",
      color: "from-[#ff66c4] to-[#ffd1ff]",
    },
    {
      title: "Chapter 4: The Mission",
      year: "2014 & Beyond",
      content:
        "She realized she wasn't alone in her struggle. Countless women faced the same challenges - high costs, harmful chemicals, and solutions that didn't truly solve anything. What began as a personal remedy became a mission: to create something pure, affordable, and rooted in the wisdom of generations.",
      image: "🌸",
      color: "from-[#F18372] to-[#93b45d]",
    },
  ];
  return (
    <div className="py-10 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-4 sm:left-10 w-48 h-48 sm:w-72 sm:h-72 bg-gradient-to-br from-pink-200/20 to-amber-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-10 right-4 sm:right-10 w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-tl from-rose-200/20 to-orange-200/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Story Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-block relative">
            <h3 className="text-xl sm:text-2xl md:text-3xl text-amber-700 font-light tracking-wider uppercase mb-4">
              The Story Behind
            </h3>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold bg-clip-text text-transparent mb-6 tracking-tight">
              Pink Lady
            </h1>
            <p className="text-base sm:text-lg text-gray-600 italic max-w-2xl mx-auto px-4">
              A generational legacy from grandfather's healing wisdom to modern
              wellness
            </p>
            <div className="w-24 sm:w-32 h-1 mx-auto mt-6 rounded-full bg-gradient-to-r from-pink-500 via-rose-400 to-amber-400"></div>
          </div>
        </div>
          

        {/* Interactive Story Timeline */}
        <div className="mb-12 sm:mb-16">
          <div className="flex justify-center mb-6 sm:mb-8">
            <div className="flex space-x-2 bg-white/50 backdrop-blur-sm rounded-full p-2">
              {storyChapters.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentChapter(index)}
                  className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-all duration-300 ${
                    currentChapter === index
                      ? "bg-gradient-to-r from-[#93b45d] to-[#0c6200] scale-125"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>
          </div>
          {/* Story Content */}
          <div className="relative h-80 sm:h-96 overflow-hidden rounded-2xl sm:rounded-3xl">
            {storyChapters.map((chapter, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-700 ${
                  currentChapter === index
                    ? "opacity-100 transform translate-x-0"
                    : "opacity-0 transform translate-x-full"
                }`}
              >
                <div
                  className={`bg-gradient-to-br ${chapter.color} rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 h-full flex items-center relative overflow-hidden`}
                >
                  <div className="absolute top-4 right-4 sm:top-6 sm:right-6 text-4xl sm:text-5xl md:text-6xl opacity-20">
                    {chapter.image}
                  </div>
                  <div className="text-white max-w-4xl pr-8 sm:pr-0">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-4 sm:mb-6">
                      <span className="bg-white/20 backdrop-blur-sm px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold w-fit">
                        {chapter.year}
                      </span>
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold font-serif">
                        {chapter.title}
                      </h3>
                    </div>
                    <p className="text-base sm:text-lg md:text-xl leading-relaxed font-serif text-white/95">
                      {chapter.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Navigation */}
          <div className="flex justify-between items-center mt-6 sm:mt-8 px-2">
            <button
              onClick={() => setCurrentChapter(Math.max(0, currentChapter - 1))}
              disabled={currentChapter === 0}
              className="flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-2 sm:py-3 bg-white/70 backdrop-blur-sm rounded-full text-gray-700 font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/90 transition-all text-sm sm:text-base"
            >
              ← <span className="hidden sm:inline">Previous</span>
            </button>
            <span className="text-gray-600 font-semibold text-sm sm:text-base">
              {currentChapter + 1} of {storyChapters.length}
            </span>
            <button
              onClick={() =>
                setCurrentChapter(
                  Math.min(storyChapters.length - 1, currentChapter + 1)
                )
              }
              disabled={currentChapter === storyChapters.length - 1}
              className="flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-2 sm:py-3 bg-white/70 backdrop-blur-sm rounded-full text-gray-700 font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/90 transition-all text-sm sm:text-base"
            >
              <span className="hidden sm:inline">Next</span> →
            </button>
          </div>
        </div>

        {/* Grandfather's Portrait Section */}
        <div className="mb-12 sm:mb-16">
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl sm:rounded-3xl p-6 sm:p-10 shadow-xl border border-amber-200/50 relative overflow-hidden">
            {/* Subtle background overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-100/20 to-orange-100/20"></div>

            <div className="relative z-10 text-center">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-amber-900 mb-6 sm:mb-10 font-serif">
                The Healer Behind the Heritage
              </h3>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                {/* Text Section */}
                <div className="order-2 lg:order-1 space-y-6">
                  <div className="bg-white/80  backdrop-blur-md rounded-xl sm:rounded-2xl w-full p-6 shadow-lg hover:shadow-xl transition-shadow">
                    <h4 className="text-xl font-semibold text-amber-800 mb-3">
                      The Traditional Healer
                    </h4>
                    <p className="text-base text-gray-700 leading-relaxed font-serif">
                      Our founder’s grandfather was a respected healer in his
                      village, deeply rooted in traditional medicine. He crafted
                      special herbal pads using silk cotton and medicinal herbs
                      like turmeric and neem to help women overcome menstrual
                      health challenges. His remedies, drawn from ancient
                      wisdom, offered safe and natural solutions long before
                      modern alternatives existed.
                    </p>
                  </div>
                  <div className="bg-white/80  backdrop-blur-md rounded-xl sm:rounded-2xl w-full p-6 shadow-lg hover:shadow-xl transition-shadow">
                    <h4 className="text-xl font-semibold text-amber-800 mb-3">
                      The Family Legacy
                    </h4>
                    <p className="text-base text-gray-700 leading-relaxed font-serif">
                      What began as his compassionate healing practice became a
                      family treasure. His knowledge was not confined to
                      texts—it was lived, tested, and trusted by generations.
                      Every formula he created carried a legacy of care,
                      reverence, and dedication to women’s well-being, inspiring
                      the foundation of Papachi Enterprises.
                    </p>
                  </div>
                </div>
                {/* Image Section */}
                <div className="order-1 lg:order-2 flex justify-center">
                  <div className="bg-gradient-to-br from-amber-200 to-orange-200 w-72 sm:w-80 rounded-2xl sm:rounded-3xl p-6 shadow-2xl relative">
                    <div className="flex justify-center h-100">
                      <img
                        src={Master}
                        alt="The Master Healer"
                        className="w-65 h-full object-cover rounded-xl shadow-md"
                      />
                    </div>
                    <div className="mt-4 text-center">
                      <h4 className="text-lg sm:text-xl font-bold text-amber-900 font-serif">
                        The Master Healer
                      </h4>
                      <p className="text-sm sm:text-base text-amber-700 font-serif italic">
                        Founder of the Six-Herbal Formula
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* What Pink Lady Is Today */}
        <div className="mb-12 sm:mb-16">
          <div className="bg-white/80 backdrop-blur-md rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl border border-white/60 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-100/30 to-amber-100/30"></div>
            <div className="relative z-10 text-center">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 sm:mb-8 font-serif">
                What Pink Lady Is Today
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-center">
                <div className="space-y-4 sm:space-y-6">
                  <div className="bg-gradient-to-r from-rose-100 to-pink-100 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-left">
                    <h4 className="text-lg sm:text-xl font-semibold text-rose-800 mb-2 sm:mb-3">
                      The Product
                    </h4>
                    <p className="text-sm sm:text-base text-gray-700 font-serif">
                      Pink Lady (also known as{" "}
                      <span className="font-bold text-rose-700">
                        Paapatchi Herbal Napkin
                      </span>
                      ) is more than just a sanitary napkin - it's a wellness
                      experience infused with a special
                      <span className="font-bold text-rose-700">
                        {" "}
                        six-herbal blend
                      </span>{" "}
                      for natural comfort and protection.
                    </p>
                  </div>
                  <div className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-left">
                    <h4 className="text-lg sm:text-xl font-semibold text-amber-800 mb-2 sm:mb-3">
                      The Philosophy
                    </h4>
                    <p className="text-sm sm:text-base text-gray-700 font-serif">
                      We believe quality menstrual care shouldn't be a luxury.
                      That's why Pink Lady is built as a
                      <span className="font-bold text-amber-700">
                        {" "}
                        service-driven initiative
                      </span>
                      , not a profit-hungry brand.
                    </p>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-[#F18372] to-[#eb9f93] rounded-xl sm:rounded-2xl p-6 sm:p-8 text-white">
                  <div className="text-center mb-4 sm:mb-6">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 rounded-full mx-auto mb-3 sm:mb-4 flex items-center justify-center">
                      <span className="text-2xl sm:text-3xl font-serif font-bold">
                        6
                      </span>
                    </div>
                    <h4 className="text-xl sm:text-2xl font-semibold mb-1 sm:mb-2">
                      Powerful Herbs
                    </h4>
                    <p className="text-sm sm:text-base text-white/90">
                      Carefully selected natural ingredients
                    </p>
                  </div>
                  <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-white rounded-full flex-shrink-0"></div>
                      <span>100% plastic-free & ISO certified</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-white rounded-full flex-shrink-0"></div>
                      <span>Made with edible-grade herbs</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-white rounded-full flex-shrink-0"></div>
                      <span>Pure cotton comfort</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Our Promise - Storytelling Style */}
        <div className="mb-12 sm:mb-16">
          <div className=" rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 sm:w-40 sm:h-40 bg-gradient-to-tl from-green-500/50 to-transparent rounded-full blur-2xl"></div>
            <div className="relative z-10 text-center">
              <h3 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 font-serif">
                Our Promise to Every Woman
              </h3>
              <p className="text-base sm:text-lg md:text-xl leading-relaxed font-serif italic max-w-4xl mx-auto mb-6 sm:mb-8 text-gray-800 px-2 sm:px-0">
                "Today, Pink Lady Herbal Napkins are trusted by students,
                professionals, and women from all walks of life. Our goal
                remains simple: to provide safe, sustainable, and affordable
                menstrual care while honoring our roots in traditional healing."
              </p>
              <div className="inline-block bg-[#93b45d] rounded-full px-6 sm:px-8 py-2 sm:py-3">
                <span className="text-base sm:text-lg font-semibold">
                  From our heart to your health
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AboutSection;
