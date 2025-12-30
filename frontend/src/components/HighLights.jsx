import React, { useMemo, useState } from "react";
import { useReveal } from "../hooks/useReveal";
import { X } from "lucide-react";

function HighLights() {
  const { ref: highlightsRef, isRevealed } = useReveal({ threshold: 0.2 });
  const [selectedEvent, setSelectedEvent] = useState(null);

  const fadeUp = useMemo(
    () =>
      `transition-all duration-700 ease-out ${
        isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`,
    [isRevealed]
  );

  const pastEvents = [
    {
      tag: "Oct 21, 2023",
      color: "pink",
      title: "Figma Lifestyle",
      desc: [
        "Central Nagpur’s biggest UI/UX exploration hosted on Oct 21st, 2023.",
        "A vibrant celebration of design and digital artistry that created lasting connections for every participant."
      ],
      details: "Figma Lifestyle was more than just a workshop; it was a movement to bring design thinking to the forefront of development. With over 150 participants, we explored the depths of UI/UX, from wireframing to high-fidelity prototyping. The event featured live design battles, expert portfolio reviews, and hands-on sessions that transformed beginners into confident designers.",
      gallery: ["images/team.jpg"] // Placeholder, can be replaced with specific event photos
    },
    {
      tag: "Apr 21, 2024",
      color: "orange",
      title: "Techotsav 2024",
      desc: [
        "Central Nagpur's premier tech festival with 100+ participants.",
        "Featured industry-led sessions on AI & Cybersecurity, diverse panels, and a dedicated Placement Training track."
      ],
      details: "Techotsav 2024 brought together the brightest minds for a day of innovation. The event included three parallel tracks: a Hackathon, a Capture The Flag (CTF) cybersecurity challenge, and a specialized placement training bootcamp. Industry leaders from top firms conducted mock interviews and resume building sessions.",
      gallery: ["images/hero.png"]
    },
  ];

  const currentEvents = [
    {
      tag: "Sept 9, 2025",
      color: "green",
      title: "Crack SIH with GDGoC",
      desc: [
        "Equipped 600+ students with strategies",
        "to conquer Smart India Hackathon via",
        "expert-led decoding sessions."
      ],
      details: `In GHRCE's energetic hall on September 9, 2025, GDGoC GHRCE was officially launched, hosting "Crack SIH with GDGoC", an event that equipped 600+ students with battle-tested strategies to conquer the Smart India Hackathon. Expert-led sessions featured Aman Tiwari (Former GDSC Lead), Aman Khapre (SIH 2024 Grand Finalist & World Robotics Championship Winner), and Sailee Gathibandhe (Pixellkey Director). They decoded real-world problem statements, solution pathways, and confidence-building tactics, turning aspiring coders into SIH-ready powerhouses.
`,
      gallery: ["images/team.jpg"]
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
      details: "Continuing with creativity GDGoC - GHRCE proudly hosted SIH Internal Hackathon 2025 on 20th September 2025 at G H Raisoni College of Engineering, Nagpur. Teams shortlisted through this got an opportunity to move ahead and compete at the National Level, representing GHRCE. ",
      gallery: ["images/team.jpg","images/Hero.png"]
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
      details: "Consistenty is key. 9 Days of Coding was designed to build a daily coding habit. With problem difficulty ramping up each day, participants tackled everything from basic arrays to complex dynamic programming challenges. The leaderboard kept the competitive spirit alive!",
      gallery: ["images/team.jpg"]
    },
    {
      tag: "2025",
      color: "violet",
      title: "UXplore @ IIM Nagpur",
      desc: [
        "Delivered pro UI/UX sessions & AI/ML",
        "workshops to 100+ students at InFED,",
        "building practical industry skills."
      ],
      details: "Collaborating with IIM Nagpur's InFED was a highlight of the year. We brought technical expertise to management students, bridging the gap between business logic and product design. The sessions covered rapid prototyping and AI integration in business tools.",
      gallery: ["images/team.jpg"]
    },
    {
      tag: "Dec 8-9, 2025",
      color: "rose",
      title: "SIH 2025 Grand Finale",
      desc: [
        "Exclusively hosted Nagpur's only SIH Grand",
        "Finals, managing 140+ participants as the",
        "technical backbone of the event."
      ],
      details: "A milestone achievement for GDGoC GHRCE. Hosting the Grand Finale put us on the national map. We managed the entire technical infrastructure, logistics, and hospitality for teams from across India, ensuring a glitch-free 36-hour hackathon.",
      gallery: ["images/team.jpg"]
    }
  ];

  return (
    <>
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
              {pastEvents.map((event, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedEvent(event)}
                  className={`highlights-card cursor-pointer rounded-2xl shadow-md sm:shadow-lg p-6 sm:p-7 lg:p-8 bg-white hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all duration-300 ease-out ${
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
                  <div className="mt-4 text-blue-600 text-xs font-semibold uppercase tracking-wider">
                    View Recap →
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
              {currentEvents.map((event, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedEvent(event)}
                  className={`highlights-card cursor-pointer rounded-2xl shadow-md sm:shadow-lg p-6 sm:p-7 lg:p-8 bg-white hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all duration-300 ease-out ${
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
                   <div className="mt-4 text-blue-600 text-xs font-semibold uppercase tracking-wider">
                    View Recap →
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
            onClick={() => setSelectedEvent(null)}
          />
          
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col animate-modal-up">
            
            {/* Modal Header */}
            <div className="p-6 sm:p-8 border-b border-gray-100 flex justify-between items-start bg-gray-50/50">
              <div>
                <div className="flex items-center space-x-3 mb-2">
                   <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white ${
                      selectedEvent.color === "pink" ? "bg-pink-500" :
                      selectedEvent.color === "orange" ? "bg-orange-500" :
                      selectedEvent.color === "green" ? "bg-green-500" :
                      selectedEvent.color === "emerald" ? "bg-emerald-500" :
                      selectedEvent.color === "blue" ? "bg-blue-500" :
                      selectedEvent.color === "violet" ? "bg-violet-500" :
                      "bg-rose-500"
                   }`}>
                      {selectedEvent.tag}
                   </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  {selectedEvent.title}
                </h3>
              </div>
              <button 
                onClick={() => setSelectedEvent(null)}
                className="p-2 rounded-full hover:bg-gray-200 transition-colors"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="overflow-y-auto p-6 sm:p-8 space-y-8">
              {/* Photo Gallery - Horizontal Scroll */}
              {selectedEvent.gallery && selectedEvent.gallery.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {selectedEvent.gallery.map((img, idx) => (
                    <img 
                      key={idx} 
                      src={img} 
                      alt={`${selectedEvent.title} highlight ${idx+1}`} 
                      className="rounded-2xl w-full h-48 sm:h-64 object-cover shadow-sm hover:shadow-md transition-shadow"
                    />
                  ))}
                </div>
              )}

              {/* Detailed Text */}
              <div className="prose prose-blue max-w-none">
                <p className="text-lg text-gray-700 leading-relaxed font-medium">
                   {selectedEvent.details}
                </p>
                <div className="mt-6 p-6 bg-blue-50 rounded-2xl border border-blue-100">
                   <h4 className="font-bold text-blue-900 mb-2">Key Takeaways</h4>
                   <ul className="list-disc list-inside space-y-2 text-gray-700">
                      {selectedEvent.desc.map((line, i) => (
                        <li key={i}>{line}</li>
                      ))}
                   </ul>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
}

export default HighLights;
