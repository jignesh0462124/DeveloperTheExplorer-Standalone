import React from "react";
import { Link } from "react-router-dom";
import { Users, Calendar, MapPin, ChevronDown } from "lucide-react";
import { useReveal } from "../hooks/useReveal";
import heroVideo from "./video/DeveloperTheExplorer.mp4";
// OPTIONAL (highly recommended)
// import heroVideoMobile from "./video/DeveloperTheExplorer-mobile.mp4";

function Hero() {
  const { ref, isRevealed } = useReveal({ threshold: 0.1 });

  const animate = (isRevealed) =>
    `transition-all duration-1000 ease-out transform ${
      isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
    }`;

  return (
    <section
      ref={ref}
      className="relative w-full min-h-[100svh] overflow-hidden bg-black flex items-center"
    >
      {/* ================= VIDEO LAYER ================= */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80 z-10" />

        {/* DESKTOP VIDEO */}
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          src={heroVideo}
          className="
            absolute top-1/2 left-1/2
            w-auto min-w-[100vw] h-[160vh] sm:w-[120vw] sm:h-[120vh]
            -translate-x-1/2 -translate-y-1/2
            object-cover
          "
        />

        {/*
        ================= MOBILE VIDEO (OPTIONAL – BEST FIX) =================
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          src={heroVideoMobile}
          className="
            absolute top-1/2 left-1/2
            w-[120vw] h-[120vh]
            -translate-x-1/2 -translate-y-1/2
            object-cover
            md:hidden
          "
        />
        */}
      </div>

      {/* ================= CONTENT ================= */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 lg:px-16 pt-10 pb-32">
        <div className="max-w-4xl">
          <h1
            className={`text-4xl sm:text-6xl lg:text-[82px] font-extrabold leading-[1.1] tracking-tight text-white ${animate(
              isRevealed
            )}`}
            style={{ transitionDelay: "200ms" }}
          >
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">
              Developer-The-Explorer
            </span>
          </h1>

          <h2
            className={`mt-6 sm:mt-8 text-lg sm:text-2xl font-semibold text-blue-300 ${animate(
              isRevealed
            )}`}
            style={{ transitionDelay: "400ms" }}
          >
            Explore Beyond What You Already Know
          </h2>

          <p
            className={`mt-6 text-base sm:text-lg leading-relaxed text-gray-300 max-w-2xl ${animate(
              isRevealed
            )}`}
            style={{ transitionDelay: "600ms" }}
          >
            It began with a question-a spark of curiosity that pushed beyond classrooms
            and comfort zones. Join a journey where learning comes alive through dialogue,
            creativity, and the power to turn ideas into reality.
          </p>

          <div
            className={`mt-10 sm:mt-12 ${animate(isRevealed)}`}
            style={{ transitionDelay: "800ms" }}
          >
            <Link to="/login">
              <button className="px-10 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 hover:scale-105 active:scale-95 transition-all text-white font-bold shadow-2xl shadow-blue-600/40">
                Register Now
              </button>
            </Link>
          </div>

          <div
            className={`mt-12 pt-8 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 lg:flex gap-y-6 gap-x-10 ${animate(
              isRevealed
            )}`}
            style={{ transitionDelay: "1000ms" }}
          >
            <Meta icon={<Calendar />} label="Event Date" value="To be announced" />
            <Meta icon={<MapPin />} label="Location" value="Campsite near Nagpur, India​" />
            <Meta
              icon={<Users />}
              label="Organized By"
              value="Google Developer Group on Campus - GHRCE"
            />
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/40 animate-bounce hidden sm:block z-20">
        <ChevronDown size={32} />
      </div>
    </section>
  );
}

function Meta({ icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-5 h-5 text-blue-400 mt-1">{icon}</div>
      <div>
        <p className="text-xs uppercase tracking-wider text-gray-500 font-bold">
          {label}
        </p>
        <span className="text-gray-200 font-medium leading-tight block">
          {value}
        </span>
      </div>
    </div>
  );
}

export default Hero;
