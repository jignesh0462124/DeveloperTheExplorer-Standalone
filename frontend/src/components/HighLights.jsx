import React, { useMemo } from "react";
import { useReveal } from "../hooks/useReveal";

function HighLights() {
  const { ref: highlightsRef, isRevealed } = useReveal({ threshold: 0.2 });

  const fadeUp = useMemo(
    () =>
      `transition-all duration-700 ease-out ${
        isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`,
    [isRevealed]
  );

  return (
    <section
      id="highlights"
      ref={highlightsRef}
      className="w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-20 lg:ms-12"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* WHO ARE WE Section */}
        <div className="mb-20 text-center max-w-4xl mx-auto">
             <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 ${fadeUp}`}>
                The Minds Behind the Journey
             </h2>
             <p className={`text-lg sm:text-xl text-gray-600 leading-relaxed mb-6 ${fadeUp}`} style={{ transitionDelay: "100ms" }}>
                <span className="font-semibold text-blue-600">GDG on Campus (GDGoC) – GHRCE</span> is a student-led developer community that started as a small group of learners who believed technology should be explored, not memorized.
             </p>
             <p className={`text-lg sm:text-xl text-gray-600 leading-relaxed ${fadeUp}`} style={{ transitionDelay: "150ms" }}>
                Over time, this belief evolved into a vibrant space where workshops turn into late-night brainstorming sessions, ideas move beyond classrooms into real-world problem solving, and teammates grow into long-term collaborators who build, experiment, and learn together as a unified community.
             </p>

             <div className={`mt-10 rounded-3xl overflow-hidden shadow-2xl ${fadeUp}`} style={{ transitionDelay: "200ms" }}>
                <img 
                  src="images/team.jpg" 
                  alt="GDG Team" 
                  className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
                />
             </div>
        </div>


        {/* Heading for Journey */}
        <div className="text-center mb-10 sm:mb-14 lg:mb-16 border-t border-gray-200 pt-16">
          <h2
            className={`highlights-title text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 uppercase tracking-wide ${fadeUp}`}
          >
            Our Journey So Far
          </h2>
          <p
            className={`highlights-subtitle text-sm sm:text-base md:text-lg text-gray-600 ${fadeUp}`}
            style={{ transitionDelay: "120ms" }}
          >
            A Legacy of Impactful Tech Experiences
          </p>
        </div>

        {/* Past Tenure Events */}
        <div className="mb-12">
          <div
            className={`highlights-badge inline-block px-5 sm:px-6 py-2 bg-gray-200 rounded-full mb-6 sm:mb-8 ${fadeUp}`}
            style={{ transitionDelay: "160ms" }}
          >
            <span className="text-xs sm:text-sm font-medium text-gray-700">
              Past Initiatives
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 sm:gap-6 lg:gap-8">
            {[
              {
                tag: "Oct 21, 2023",
                color: "pink",
                title: "Figma Lifestyle",
                desc: [
                  "Central Nagpur’s biggest UI/UX exploration hosted on Oct 21st, 2023.",
                  "A vibrant celebration of design and digital artistry that created lasting connections for every participant."
                ],
              },
              {
                tag: "Apr 21, 2024",
                color: "orange",
                title: "Techotsav 2024",
                desc: [
                  "Central Nagpur's premier tech festival with 100+ participants.",
                  "Featured industry-led sessions on AI & Cybersecurity, diverse panels, and a dedicated Placement Training track."
                ],
              },
            ].map((event, index) => (
              <div
                key={index}
                className={`highlights-card rounded-2xl shadow-md sm:shadow-lg p-6 sm:p-7 lg:p-8 bg-white hover:shadow-xl transition-all duration-700 ease-out ${
                  isRevealed
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${200 + index * 120}ms` }}
              >
                <div className="flex items-center space-x-2 mb-3 sm:mb-4">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      event.color === "pink"
                        ? "bg-pink-500"
                        : "bg-orange-500"
                    }`}
                  />
                  <span className="text-[11px] sm:text-xs font-medium text-gray-600">
                    {event.tag}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
                  {event.title}
                </h3>
                <div className="text-xs sm:text-sm text-gray-600 space-y-1 leading-relaxed">
                  {event.desc.map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Current Events */}
        <div>
          <div
            className={`highlights-badge inline-block px-5 sm:px-6 py-2 bg-blue-600 rounded-full mb-6 sm:mb-8 mt-14 sm:mt-16 lg:mt-20 ${fadeUp}`}
            style={{ transitionDelay: "240ms" }}
          >
            <span className="text-xs sm:text-sm font-medium text-white">
              Current Tenure Highlights (2025)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
            {[
              {
                tag: "Sept 9, 2025",
                color: "green",
                title: "Crack SIH with GDGoC",
                desc: [
                  "Equipped 600+ students with strategies",
                  "to conquer Smart India Hackathon via",
                  "expert-led decoding sessions."
                ],
              },
              {
                tag: "Sept 20, 2025",
                color: "emerald",
                title: "SIH Internal Hackathon",
                desc: [
                  "Hosted teams to solve real-world problems",
                  "and shortlist top contenders for the",
                  "National Level competition."
                ],
              },
              {
                tag: "Sept 22-30, 2025",
                color: "blue",
                title: "9 Days of Coding",
                desc: [
                   "A coding marathon on HackerRank sharpening",
                   "DSA, logic, and analytical thinking with",
                   "daily challenges and leaderboards."
                ],
              },
              {
                 tag: "2025",
                 color: "violet",
                 title: "UXplore @ IIM Nagpur",
                 desc: [
                    "Delivered pro UI/UX sessions & AI/ML",
                    "workshops to 100+ students at InFED,",
                    "building practical industry skills."
                 ]
              },
              {
                 tag: "Dec 8-9, 2025",
                 color: "rose",
                 title: "SIH 2025 Grand Finale",
                 desc: [
                    "Exclusively hosted Nagpur's only SIH Grand",
                    "Finals, managing 140+ participants as the",
                    "technical backbone of the event."
                 ]
              }
            ].map((event, index) => (
              <div
                key={index}
                className={`highlights-card rounded-2xl shadow-md sm:shadow-lg p-6 sm:p-7 lg:p-8 bg-white hover:shadow-xl transition-all duration-700 ease-out ${
                  isRevealed
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${260 + index * 120}ms` }}
              >
                <div className="flex items-center space-x-2 mb-3 sm:mb-4">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      event.color === "green" ? "bg-green-500" :
                      event.color === "emerald" ? "bg-emerald-500" :
                      event.color === "blue" ? "bg-blue-500" :
                      event.color === "violet" ? "bg-violet-500" :
                      "bg-rose-500"
                    }`}
                  />
                  <span className="text-[11px] sm:text-xs font-medium text-gray-600">
                    {event.tag}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
                  {event.title}
                </h3>
                <div className="text-xs sm:text-sm text-gray-600 space-y-1 leading-relaxed">
                  {event.desc.map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default HighLights;
