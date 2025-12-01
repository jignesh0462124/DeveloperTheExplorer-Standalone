import React, { useMemo } from "react";
import { Users, Lightbulb, Code, Calendar, MapPin } from "lucide-react";
import { useReveal } from "../hooks/useReveal";
import heroVideo from "./video/DeveloperTheExplorer.mp4";

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
        isRevealed
          ? "opacity-100 translate-x-0 scale-100"
          : "opacity-0 translate-x-8 scale-[0.97]"
      }`,
    [isRevealed]
  );

  return (
    <section
      ref={heroRef}
      className="relative pt-20 pb-16 sm:pt-24 sm:pb-20 lg:pt-10 lg:pb-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left content */}
          <div className="space-y-6 text-center lg:text-left">
            {/* Tag */}
            <div
              className={`inline-block px-4 py-2 rounded-full shadow-sm hero-tag ${baseFade}`}
            >
              <span className="text-xs sm:text-sm font-medium text-blue-500">
                Flagship Tech Campaign · GDGOC GHRCE
              </span>
            </div>

            {/* Title */}
            <h1
              className={`text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-900 leading-tight hero-title lg:mb-4 lg:mt-6 ${baseFade}`}
              style={{ transitionDelay: "120ms" }}
            >
              Developers: <span className="text-blue-600">The</span> Explorers
            </h1>

            {/* Description */}
            <p
              className={`text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed hero-desc lg:mb-6 ${baseFade}`}
              style={{ transitionDelay: "200ms" }}
            >
              An immersive experience where students, developers, and innovators
              explore AI, Cloud, Web, and Mobile through inspiring talks,
              hands-on jamming sessions, and meaningful networking.
            </p>

            {/* Feature bullets */}
            <div className="space-y-4 pt-2 lg:pt-4 lg:mb-6">
              {[
                {
                  icon: Lightbulb,
                  text: "Inspiring talks by industry experts",
                },
                {
                  icon: Code,
                  text: "Hands-on jamming & project-building sessions",
                },
                {
                  icon: Users,
                  text: "Networking with mentors, peers, and community leaders",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`flex items-start space-x-3 hero-feature ${baseSlide} ${
                    // center icon + text on mobile, left on large screens
                    "justify-center lg:justify-start"
                  }`}
                  style={{ transitionDelay: `${260 + i * 120}ms` }}
                >
                  <div className="w-7 h-7 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <item.icon className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-sm sm:text-base text-gray-700 max-w-xs lg:max-w-none">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Info pills */}
            <div className="flex flex-wrap gap-3 mt-4 pt-2 lg:pt-4 lg:pb-10 justify-center lg:justify-start">
              <div className="px-4 py-2.5 bg-white rounded-lg shadow-sm flex items-center space-x-2 hero-info">
                <Calendar className="w-4 h-4" />
                <span className="text-xs sm:text-sm text-gray-700">
                  Coming Soon
                </span>
              </div>
              <div className="px-4 py-2.5 bg-white rounded-lg shadow-sm flex items-center space-x-2 hero-info">
                <MapPin className="w-4 h-4" />
                <span className="text-xs sm:text-sm text-gray-700">
                  Coming Soon
                </span>
              </div>
            </div>
          </div>

          {/* Right side: video as 16:9 wallpaper-style card */}
          <div className="w-full">
            <div
              className={`hero-img relative ${imageSlide}`}
              style={{ transitionDelay: "320ms" }}
            >
              {/* 16:9 responsive container */}
              <div
                className="
                  relative
                  w-full
                  max-w-xl
                  mx-auto
                  lg:max-w-none
                  lg:w-[32rem]
                  rounded-2xl
                  overflow-hidden
                  shadow-xl
                  "
                // 16:9 ratio => 9 / 16 * 100 = 56.25%
                style={{ paddingTop: "56.25%" }}
              >
                <video
                  src={heroVideo}
                  poster="images/Hero.png"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover will-change-transform"
                />
                {/* Optional overlay if you add text over video later */}
                {/* <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-blue-500/20 pointer-events-none" /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
