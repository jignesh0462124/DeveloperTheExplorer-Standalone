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
        {/* Heading */}
        <div className="text-center mb-10 sm:mb-14 lg:mb-16">
          <h2
            className={`highlights-title text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 ${fadeUp}`}
          >
            Highlights from Our Journey
          </h2>
          <p
            className={`highlights-subtitle text-sm sm:text-base md:text-lg text-gray-600 ${fadeUp}`}
            style={{ transitionDelay: "120ms" }}
          >
            A legacy of impactful tech events by GDGOC / GDSC GHRCE
          </p>
        </div>

        {/* Past Events */}
        <div className="mb-12">
          <div
            className={`highlights-badge inline-block px-5 sm:px-6 py-2 bg-gray-200 rounded-full mb-6 sm:mb-8 ${fadeUp}`}
            style={{ transitionDelay: "160ms" }}
          >
            <span className="text-xs sm:text-sm font-medium text-gray-700">
              Past Tenure Events
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
            {[
              {
                tag: "Design",
                color: "blue",
                title: "Figma Lifestyle",
                desc: [
                  "A creative event celebrating design thinking and",
                  "community collaboration, bringing together designers",
                  "to explore Figma's potential.",
                ],
              },
              {
                tag: "Tech Festival",
                color: "green",
                title: "Techotsav 2024",
                desc: [
                  "A comprehensive tech festival featuring AI workshops,",
                  "cybersecurity sessions, and job readiness programs",
                  "for students.",
                ],
              },
              {
                tag: "AI Workshop",
                color: "red",
                title: "Build with AI",
                desc: [
                  "Hands-on sessions exploring AI tools and frameworks,",
                  "empowering students to build intelligent",
                  "applications.",
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
                      event.color === "blue"
                        ? "bg-blue-500"
                        : event.color === "green"
                        ? "bg-green-500"
                        : "bg-red-500"
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
            className={`highlights-badge inline-block px-5 sm:px-6 py-2 bg-blue-500 rounded-full mb-6 sm:mb-8 mt-14 sm:mt-16 lg:mt-20 ${fadeUp}`}
            style={{ transitionDelay: "240ms" }}
          >
            <span className="text-xs sm:text-sm font-medium text-white">
              Current Tenure Events
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
            {[
              {
                tag: "Hackathon Prep",
                color: "yellow",
                title: "Crack SIH with GDGoC",
                desc: [
                  "Launch event and orientation for Smart India Hackathon,",
                  "guiding students through the competition",
                  "process.",
                ],
              },
              {
                tag: "Hackathon",
                color: "green",
                title: "SIH Internal Hackathon",
                desc: [
                  "National-level preparation with real problem",
                  "statements, fostering innovation and",
                  "teamwork.",
                ],
              },
              {
                tag: "Coding Challenge",
                color: "blue",
                title: "9 Days of Coding",
                desc: [
                  "An intensive HackerRank challenge series to",
                  "sharpen problem-solving and coding",
                  "skills.",
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
                style={{ transitionDelay: `${260 + index * 120}ms` }}
              >
                <div className="flex items-center space-x-2 mb-3 sm:mb-4">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      event.color === "blue"
                        ? "bg-blue-500"
                        : event.color === "green"
                        ? "bg-green-500"
                        : "bg-yellow-500"
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
