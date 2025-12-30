import React, { useMemo } from "react";
import {
  Users,
  Lightbulb,
  Code,
  Calendar,
  MapPin,
  ChevronDown,
} from "lucide-react";
import { useReveal } from "../hooks/useReveal";
import heroVideo from "./video/DeveloperTheExplorer.mp4";

function Hero() {
  const { ref, isRevealed } = useReveal({ threshold: 0.2 });

  const animate = (delay = "0ms") =>
    `transition-all duration-1000 ease-out ${
      isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
    }`;

  return (
    <section
      ref={ref}
      className="relative min-h-screen w-full bg-black overflow-hidden"
    >
      {/* ================= VIDEO ================= */}
      <div className="absolute inset-0 z-0">
        {/* Single strong overlay (IMPORTANT FIX) */}
        <div className="absolute inset-0 bg-black/65 z-10" />

        <video
          src={heroVideo}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="w-full h-full object-cover"
        />
      </div>

      {/* ================= CONTENT ================= */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-16 min-h-screen flex items-center">
        <div className="max-w-3xl">

          {/* Tag */}
          <div
            className={`inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur ${animate()}`}
            style={{ transitionDelay: "100ms" }}
          >
            <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
            <span className="text-xs tracking-widest font-semibold text-blue-300 uppercase">
              GDGOC GHRCE · Flagship Event
            </span>
          </div>

          {/* Title */}
          <h1
            className={`mt-8 text-5xl sm:text-6xl lg:text-[82px] font-extrabold leading-tight tracking-tight text-white ${animate()}`}
            style={{ transitionDelay: "200ms" }}
          >
            <span className="bg-gradient-to-br from-blue-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">
              Developer-The-Explorer
            </span>
          </h1>

          {/* Subtitle */}
          <h2
            className={`mt-4 text-xl sm:text-2xl font-semibold text-blue-300 ${animate()}`}
            style={{ transitionDelay: "300ms" }}
          >
            Explore Beyond What You Already Know
          </h2>

          {/* Story */}
          <p
            className={`mt-6 text-lg leading-relaxed text-gray-300 ${animate()}`}
            style={{ transitionDelay: "400ms" }}
          >
            It began with a question — a spark of curiosity that pushed beyond
            classrooms, code, and comfort zones. What started as wonder became a
            journey where learning comes alive through dialogue, creativity, and
            the courage to turn ideas into reality.
          </p>

          {/* Features */}
          <div className="mt-10 space-y-4">
            {[
              { icon: Lightbulb, text: "Industry-led inspiring sessions" },
              { icon: Code, text: "Hands-on exploration & prototyping" },
              { icon: Users, text: "Mentorship, collaboration & networking" },
            ].map((item, i) => (
              <div
                key={i}
                className={`flex items-center gap-4 ${animate()}`}
                style={{ transitionDelay: `${500 + i * 100}ms` }}
              >
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-400/20 flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-blue-400" />
                </div>
                <span className="text-gray-200 font-medium">
                  {item.text}
                </span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div
            className={`mt-12 flex items-center gap-6 ${animate()}`}
            style={{ transitionDelay: "800ms" }}
          >
            <button className="px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 transition text-white font-bold shadow-xl shadow-blue-600/30">
              Register Now
            </button>
            <span className="text-sm text-gray-400">
              Limited seats · Early access
            </span>
          </div>

          {/* Meta */}
          <div
            className={`mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row gap-6 ${animate()}`}
            style={{ transitionDelay: "900ms" }}
          >
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-blue-400" />
              <span className="text-gray-200 font-semibold">
                Dates: To be announced
              </span>
            </div>

            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-blue-400" />
              <span className="text-gray-200 font-semibold">
                Forest campsite near Nagpur, India
              </span>
            </div>
          </div>

          <p className="mt-4 text-sm text-gray-400">
            Organized by GDG on Campus (GDGoC) – G H Raisoni College of Engineering, Nagpur
          </p>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 animate-bounce">
        <ChevronDown size={28} />
      </div>
    </section>
  );
}

export default Hero;
