import React, { useMemo } from "react";
import { Users, Lightbulb, Code, Calendar, MapPin } from "lucide-react";
import { useReveal } from "../hooks/useReveal";

function Hero() {
  const { ref: heroRef, isRevealed } = useReveal({ threshold: 0.15 });
  const baseFade = useMemo(
    () =>
      `transition-all duration-700 ease-out ${
        isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`,
    [isRevealed]
  );
  const baseSlide = useMemo(
    () =>
      `transition-all duration-700 ease-out ${
        isRevealed ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"
      }`,
    [isRevealed]
  );
  const imageSlide = useMemo(
    () =>
      `transition-all duration-700 ease-out ${
        isRevealed ? "opacity-100 translate-x-0 scale-100" : "opacity-0 translate-x-8 scale-[0.97]"
      }`,
    [isRevealed]
  );

  return (
    <section
      ref={heroRef}
      className="relative pt-35 lg:pt-10 pb-30  lg:mt-30   "
    >
      {/* AnimatedBackground is now in LandingPage.jsx — removed from here */}
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="ms-4 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div
              className={`inline-block px-4 py-2 rounded-full shadow-sm hero-tag ${baseFade}`}
            >
              <span className="text-sm font-medium text-blue-500">
                Flagship Tech Campaign · GDGOC GHRCE
              </span>
            </div>

            <h1
              className={`text-5xl lg:text-6xl font-bold text-gray-900 leading-tight hero-title lg:mb-8 lg:mt-12 ${baseFade}`}
              style={{ transitionDelay: "120ms" }}
            >
              Developers: <span className="text-blue-600">The</span> Explorers
            </h1>

            <p
              className={`text-xl text-gray-600 leading-relaxed hero-desc lg:mb-8 ${baseFade}`}
              style={{ transitionDelay: "200ms" }}
            >
              An immersive experience where students, developers, and innovators explore AI, Cloud, Web, and Mobile through inspiring talks, hands-on jamming sessions, and meaningful networking.
            </p>

            <div className="space-yoggia-4 pt-4 lg:mb-8">
              {[
                { icon: Lightbulb, text: "Inspiring talks by industry experts" },
                { icon: Code, text: "Hands-on jamming & project-building sessions" },
                { icon: Users, text: "Networking with mentors, peers, and community leaders" },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`flex items-start space-x-3 hero-feature ${baseSlide}`}
                  style={{ transitionDelay: `${260 + i * 120}ms` }}
                >
                  <div className="w-7 h-7 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <item.icon className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-gray-700">{item.text}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 mt-4 pt-4 lg:pb-20 ">
              <div className="px-4 py-2.5 bg-white rounded-lg shadow-sm flex items-center space-x-2 hero-info">
                <Calendar className="w-4 h-4" />
                <span className="text-sm text-gray-700">Coming Soon</span>
              </div>
              <div className="px-4 py-2.5 bg-white rounded-lg shadow-sm flex items-center space-x-2 hero-info">
                <MapPin className="w-4 h-4" />
                <span className="text-sm text-gray-700">Coming Soon</span>
              </div>
              {/* <div className="px-5 py-2.5 bg-yellow-400 rounded-lg font-semibold text-sm text-gray-900 hero-info">
              </div> */}
            </div>
          </div>

          <div>
            <div className={`hero-img relative ${imageSlide}`} style={{ transitionDelay: "320ms" }}>
          
              <img
                src="images/Hero.png"
                alt="Hero"
                className="relative md:ms-48 lg:ms-10 lg:h-120 w-130 lg:h-120 md:h-[30rem] rounded-2xl object-cover will-change-transform"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
