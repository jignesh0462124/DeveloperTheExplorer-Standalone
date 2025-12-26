import React, { useMemo } from "react";
import { Users, Lightbulb, Code, Calendar, MapPin, ChevronDown } from "lucide-react";
import { useReveal } from "../hooks/useReveal";
import heroVideo from "./video/DeveloperTheExplorer.mp4";

function Hero() {
  const { ref: heroRef, isRevealed } = useReveal({ threshold: 0.15 });

  // --- Animation Styles ---
  const baseFade = useMemo(
    () =>
      `transition-all duration-1000 ease-out ${
        isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`,
    [isRevealed]
  );

  const baseSlide = useMemo(
    () =>
      `transition-all duration-1000 ease-out ${
        isRevealed ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
      }`,
    [isRevealed]
  );

  return (
    <section
      ref={heroRef}
      // min-h-[100dvh] ensures it fits mobile screens perfectly ignoring the URL bar
      className="relative w-full min-h-[100dvh] flex items-center justify-center overflow-hidden bg-gray-900"
    >
      {/* --- BACKGROUND VIDEO LAYER --- */}
      {/* pointer-events-none ensures user scrolls/touches pass through to the page, not the video */}
      <div className="absolute inset-0 z-0 w-full h-full pointer-events-none">
        {/* Overlay gradient: Darker at bottom/sides for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-black/60 to-black/30 z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80 z-10" />
        
        <video
          src={heroVideo}
          poster="images/Hero.png"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-60"
        />
      </div>

      {/* --- CONTENT LAYER --- */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col justify-center h-full">
        <div className="max-w-4xl mx-auto lg:mx-0">
          
          {/* Top Tag - Glass Effect */}
          <div
            className={`inline-flex items-center px-3 py-1 sm:px-4 sm:py-1.5 rounded-full border border-blue-500/30 bg-blue-900/20 backdrop-blur-md mb-6 sm:mb-8 ${baseFade}`}
            style={{ transitionDelay: "100ms" }}
          >
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-blue-400 animate-pulse mr-2" />
            <span className="text-[10px] sm:text-xs md:text-sm font-semibold text-blue-300 tracking-wide uppercase">
              GDGOC GHRCE · Flagship Campaign
            </span>
          </div>

          {/* Main Title - Responsive Text Sizes */}
          <h1
            className={`text-4xl sm:text-6xl lg:text-8xl font-black text-white leading-[1.1] tracking-tight mb-6 ${baseFade}`}
            style={{ transitionDelay: "200ms" }}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              Developer The Explorer
            </span>
          </h1>

          {/* Description */}
          <p
            className={`text-base sm:text-xl text-gray-300 leading-relaxed max-w-lg sm:max-w-2xl mb-8 sm:mb-10 ${baseFade}`}
            style={{ transitionDelay: "300ms" }}
          >
            An immersive expedition where innovation meets the wild. Join the brightest minds to explore AI, Cloud, and Web technologies in an environment built for creators.
          </p>

          {/* Feature List */}
          <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 mb-8 sm:mb-10 max-w-xl lg:max-w-none">
            {[
              {
                icon: Lightbulb,
                text: "Inspiring talks by industry experts",
                delay: "400ms",
              },
              {
                icon: Code,
                text: "Hands-on jamming & prototyping",
                delay: "500ms",
              },
              {
                icon: Users,
                text: "Connect with mentors & peers",
                delay: "600ms",
              },
            ].map((item, i) => (
              <div
                key={i}
                className={`flex items-center space-x-3 sm:space-x-4 ${baseSlide}`}
                style={{ transitionDelay: item.delay }}
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-sm group hover:bg-blue-600/20 transition-colors duration-300 flex-shrink-0">
                  <item.icon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 group-hover:text-blue-300" />
                </div>
                <span className="text-sm sm:text-base font-medium text-gray-200">
                  {item.text}
                </span>
              </div>
            ))}
          </div>

          {/* Bottom Info Pills */}
          <div 
            className={`flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 pt-4 border-t border-white/10 ${baseFade}`}
            style={{ transitionDelay: "700ms" }}
          >
            <div className="flex items-center space-x-2 text-gray-400">
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
              <span className="text-xs sm:text-sm font-semibold text-white tracking-wide">
                Coming Soon
              </span>
            </div>
            
            {/* Divider visible only on larger screens */}
            <div className="hidden sm:block w-px h-6 bg-white/10" />
            
            <div className="flex items-center space-x-2 text-gray-400">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
              <span className="text-xs sm:text-sm font-semibold text-white tracking-wide">
                Location Revealed Soon
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Scroll Indicator - Hidden on short landscape screens to save space */}
      <div 
        className={`absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 text-white/50 animate-bounce ${baseFade} landscape:hidden lg:landscape:block`}
        style={{ transitionDelay: "1000ms" }}
      >
        <ChevronDown className="w-6 h-6 sm:w-8 sm:h-8" />
      </div>
    </section>
  );
}

export default Hero;