import React from "react";
import { Link } from "react-router-dom";
import {
  Users,
  Calendar,
  MapPin,
  ChevronDown,
} from "lucide-react";
import { useReveal } from "../hooks/useReveal";
import heroVideo from "./video/DeveloperTheExplorer.mp4";

function Hero() {
  const { ref, isRevealed } = useReveal({ threshold: 0.1 });

  // Refined animation logic
  const animate = (isRevealed) =>
    `transition-all duration-1000 ease-out transform ${
      isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
    }`;

  return (
    <section
      ref={ref}
      className="relative min-h-[100dvh] w-full bg-black overflow-hidden flex flex-col justify-center"
    >
      {/* ================= VIDEO BACKGROUND ================= */}
      <div className="absolute inset-0 z-0">
        {/* Multi-layer overlay for better text readability on mobile */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80 z-10" />
        
        <video
          src={heroVideo}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover object-center scale-105" // slight scale prevents white edges during load
        />
      </div>

      {/* ================= CONTENT CONTAINER ================= */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 lg:px-16 pt-20 pb-12">
        <div className="max-w-4xl">
          
          {/* Title - Adjusted sizes for Mobile (text-4xl) to Desktop (text-82px) */}
          <h1
            className={`text-4xl sm:text-6xl lg:text-[82px] font-extrabold leading-[1.1] tracking-tight text-white ${animate(isRevealed)}`}
            style={{ transitionDelay: "200ms" }}
          >
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent inline-block">
              Developer-The-Explorer
            </span>
          </h1>

          {/* Subtitle - Increased margin for mobile spacing */}
          <h2
            className={`mt-6 sm:mt-8 text-lg sm:text-2xl font-semibold text-blue-300 ${animate(isRevealed)}`}
            style={{ transitionDelay: "400ms" }}
          >
            Explore Beyond What You Already Know
          </h2>

          {/* Story - Constrained width for better readability */}
          <p
            className={`mt-6 text-base sm:text-lg leading-relaxed text-gray-300 max-w-2xl ${animate(isRevealed)}`}
            style={{ transitionDelay: "600ms" }}
          >
            It began with a question—a spark of curiosity that pushed beyond classrooms and comfort zones. 
            Join a journey where learning comes alive through dialogue, creativity, and the power to turn ideas into reality.
          </p>

          {/* CTA - Full width button on small mobile, auto width on tablets+ */}
          <div
            className={`mt-10 sm:mt-12 ${animate(isRevealed)}`}
            style={{ transitionDelay: "800ms" }}
          >
            <Link to="/login" className="inline-block w-full sm:w-auto">
              <button className="w-full sm:w-auto px-10 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 hover:scale-105 active:scale-95 transition-all text-white font-bold shadow-2xl shadow-blue-600/40">
                Register Now
              </button>
            </Link>
          </div>

          {/* Meta Information - Stacked on mobile, row on desktop */}
          <div
            className={`mt-12 pt-8 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-row gap-y-6 gap-x-10 ${animate(isRevealed)}`}
            style={{ transitionDelay: "1000ms" }}
          >
            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-blue-400 shrink-0 mt-1" />
              <div>
                <p className="text-xs uppercase tracking-wider text-gray-500 font-bold">Event Date</p>
                <span className="text-gray-200 font-medium">To be announced</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-blue-400 shrink-0 mt-1" />
              <div>
                <p className="text-xs uppercase tracking-wider text-gray-500 font-bold">Location</p>
                <span className="text-gray-200 font-medium">Forest campsite, Nagpur</span>
              </div>
            </div>
            
            <div className="flex items-start gap-3 lg:max-w-xs">
              <Users className="w-5 h-5 text-blue-400 shrink-0 mt-1" />
              <div>
                <p className="text-xs uppercase tracking-wider text-gray-500 font-bold">Organized By</p>
                <span className="text-gray-200 font-medium leading-tight block">
                  GDGoC – G H Raisoni College of Engineering
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator - Hidden on very small screens to save space */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/40 animate-bounce hidden sm:block">
        <ChevronDown size={32} />
      </div>
    </section>
  );
}

export default Hero;