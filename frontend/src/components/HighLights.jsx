import React, { useMemo, useState } from "react";
import { useReveal } from "../hooks/useReveal";
import { X, Linkedin, ArrowUpRight, Mic } from "lucide-react";

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
        "Central Nagpur's biggest UI/UX exploration hosted on Oct 21st, 2023.",
        "A vibrant celebration of design and digital artistry that created lasting connections for every participant."
      ],
      details: `In the heart of Central Nagpur, GDSC GHRCE organized Figma Lifestyle on October 21, 2023, a vibrant get together that became the biggest celebration of design and digital artistry. The event brought around 100+ participants together through live interactions, where attendees not only created moments but also built long lasting connections. It delivered unforgettable memories and celebrated creativity, making every participant's journey truly remarkable.`,
      gallery: ["images/figmalife.png","images/FL2.png"] // Placeholder, can be replaced with specific event photos
    },
    {
      tag: "Apr 21, 2024",
      color: "orange",
      title: "Techotsav 2024",
      desc: [
        "Central Nagpur's premier tech festival with 100+ participants.",
        "Featured industry led sessions on AI & Cybersecurity, diverse panels, and a dedicated Placement Training track."
      ],
      details: `Techotsav 2024, held on April 21, 2024, by GDSC at GHRCE, featured founders and co founders of prominent companies delivering thought provoking sessions on "The Role of Artificial Intelligence in Bridging the Industry Academic Gap," "Cybersecurity," and a panel discussion on "Generative AI in Industry and Academic Research." The event also included a Placement Training Session that equipped participants with essential tips, tools, and strategies to enhance their employability skills. Over 100+ participants actively engaged in the sessions, making the event a grand success.
`,
      gallery: ["images/tech.JPG","images/tech2.JPG"]
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
        "expert led decoding sessions."
      ],
      details: `In GHRCE's energetic hall on September 9, 2025, GDGoC GHRCE was officially launched, hosting "Crack SIH with GDGoC", an event that equipped 600+ students with battle tested strategies to conquer the Smart India Hackathon. Expert led sessions featured Aman Tiwari (Former GDSC Lead), Aman Khapre (SIH 2024 Grand Finalist & World Robotics Championship Winner), and Sailee Gathibandhe (Pixellkey Director). They decoded real world problem statements, solution pathways, and confidence building tactics, turning aspiring coders into SIH ready powerhouses.
`,
      gallery: ["images/crack3.svg","images/crack2.jpg"],
      speakers: [
        { name: "Aman Tiwari", linkedin: "https://www.linkedin.com/in/amantiwari2091/", image: "images/aman.jpg", designation: "Former GDSC Lead" },
        { name: "Aman Khapre", linkedin: "https://www.linkedin.com/in/aman-khapre-8b34a1256/", image: "images/khapre.jpeg", designation: "SIH Grand Finalist" },
        { name: "Sailee Gathibandhe", linkedin: "https://www.linkedin.com/in/sailee-gathibandhe-b5ab2519a/", image: "images/sah.svg", designation: "Director, PixellKey" }
      ]
    },
    {
      tag: "Sept 20, 2025",
      color: "emerald",
      title: "SIH Internal Hackathon",
      desc: [
        "Hosted teams to solve real world problems",
        "and shortlist top contenders for the",
        "National Level competition."
      ],
      details: `GDGoC GHRCE hosted the SIH Internal Hackathon 2025 on September 20, 2025, at G H  Raisoni College of Engineering, Nagpur, with 75+ teams comprising more than 450+ participants. The event fostered innovation, teamwork, and rapid prototyping, serving as a gateway to the Smart India Hackathon 2025 Grand Finals. Guided by the GDGoC technical team’s smooth digital operations, top teams were shortlisted to proudly represent GHRCE at the national level.`,
      gallery: ["images/internal.jpeg","images/internal2.jpeg"]
    },
    {
      tag: "Oct 17, 2025",
      color: "blue",
      title: "Ask Us Anything: Bridging the Gap",
      desc: [
        "A hybrid peer led workshop connecting students",
        "across diverse tech domains through open",
        "discussion, guidance, and real world insights."
      ],
      details: `GDGoC GHRCE hosted "Ask Us Anything: Bridging the Gap," a hybrid workshop on October 17, 2025, connecting students with peers across tech domains through open discussions and practical guidance. Speakers included Nandini Jaiswal (Cloud Computing), Sarvar Sheikh (Web Development), Eshank Ryshabh (AI/ML & Robotics), Aniket Tiwari (Cybersecurity), Sanika Wazarkar (UI/UX Design), Devanshu Sarode (Video Editing), and Kunal Nibrad (DSA). The session excelled in cross domain exposure, honest peer insights, hands on experience sharing, and building community collaboration, advancing GDGoC's goal of collective learning.`,
      gallery: ["images/ask.jpeg","images/ask2.svg"],
      speakers: [
        { name: "Nandini Jaiswal", linkedin: "https://www.linkedin.com/in/nandini-jaiswalll/", image: "images/nan.jpg", designation: "Orgniser GDGoC GHRCE" },
        { name: "Sarvar Sheikh", linkedin: "https://www.linkedin.com/in/sarvar-sheikh-565064289/", image: "images/sar.jpg", designation: "Web Development" },
        { name: "Eshank Ryshabh", linkedin: "https://www.linkedin.com/in/eshank-ryshabh-ba91382b3/", image: "images/esh.svg", designation: "AI/ML & Robotics" },
        { name: "Aniket Tiwari", linkedin: "https://www.linkedin.com/in/aniket-tiwari-102289300/", image: "images/aniket.png", designation: "Cybersecurity" },
        { name: "Sanika Wazarkar", linkedin: "https://www.linkedin.com/in/sanika-wazarkar-6a4448352/", image: "images/san.png", designation: "UI/UX Design" },
        { name: "Devanshu Sarode", linkedin: "https://in.linkedin.com/in/devanshu-sarode-073a5227b", image: "images/dev.svg", designation: "Video Editing" },
        { name: "Kunal Nibrad", linkedin: "https://www.linkedin.com/in/kunal-nibrad-734a09355/", image: "images/kun.jpeg", designation: "DSA" }
      ]
    },
    {
      tag: "Nov 22,2025",
      color: "violet",
      title: "UXplore @ InFED IIM Nagpur",
      desc: [
        "Delivered pro UI/UX sessions & AI/ML",
        "workshops to 100+ students at InFED,",
        "building practical industry skills."
      ],
      details: `UXplore 2025 brought together creativity, technology, and innovation under one dynamic roof at InFED, IIM Nagpur. The event featured a masterclass on UI/UX by Mr. Swapnil, Founder of Pixellkey and Mrs. Sailee Gathibandhe, Director at PixellKey, simplifying complex design concepts into human-centered learning. It was followed by an engaging AI/ML and Robotics workshop by Mr. Yogesh Mene, connecting futuristic ideas to real-world applications. With 100+ enthusiastic attendees, UXplore 2025 empowered participants with hands-on experience and inspired them to imagine, design, and build the technologies of tomorrow.`,
      gallery: ["images/Uxplore.jpeg","images/uxplore2.JPG"],
      speakers: [
        { name: "Swapnil Gathibandhe", linkedin: "https://www.linkedin.com/in/swapnil-gathibandhe-82aaa4121/", image: "images/swap.svg", designation: "Founder, PixellKey" },
        { name: "Sailee Gathibandhe", linkedin: "https://www.linkedin.com/in/sailee-gathibandhe-b5ab2519a/", image: "images/sah.svg", designation: "Director, PixellKey" },
        { name: "Yogesh Mene", linkedin: "https://www.linkedin.com/in/yogesh-mene-875a7423a/", image: "images/yog.png", designation: "AI/ML Expert" }
      ]
    },
    {
      tag: "Dec 8-9, 2025",
      color: "rose",
      title: "SIH 2025 Grand Finale",
      desc: [
        "Exclusively hosted Nagpur's only SIH Grand",
        "Finals, managing 120+ participants as the",
        "technical backbone of the event."
      ],
      details: `GDGoC GHRCE proudly served as part of the SIH 2025 Hosting Committee at G. H. Raisoni College of Engineering, Nagpur, on December 8-9, 2025. Managing 120+ participants, the team ensured Seamless technical coordination, logistics, and real-time support across every phase of the national level hackathon. GDGoC played a vital role in Cross - functional cooperation, decision making, and maintaining high scale operations — embodying teamwork, leadership, and innovation. The experience showcased GDGoC GHRCE’s commitment to empowering talent, enabling impactful solutions, and driving community led execution at scale.`,
      gallery: ["images/grand.jpeg","images/grand2.jpeg"]
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
                  <span className="font-semibold text-blue-600">GDGoC GHRCE</span> is a student-led developer community that started as a small group of learners who believed technology should be explored, not memorized.
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

                {/* Speakers Section */}
                {/* Speakers Section */}
                {selectedEvent.speakers && selectedEvent.speakers.length > 0 && (
                  <div className="mt-10 border-t border-gray-100 pt-8">
                    <h4 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                       <span className="bg-blue-100 text-blue-600 p-2 rounded-lg">
                          <Mic className="w-5 h-5" />
                       </span>
                       Connect with Our Speakers
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {selectedEvent.speakers.map((s, i) => (
                        <a 
                          key={i}
                          href={s.linkedin || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group relative flex flex-col items-center justify-center p-5 rounded-2xl border border-gray-200 hover:border-blue-500 hover:bg-blue-50/30 hover:shadow-lg transition-all duration-300 bg-gray-50/50"
                        >
                          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity text-blue-500">
                             <ArrowUpRight className="w-4 h-4" />
                          </div>

                          <div className="w-20 h-20 mb-3 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 overflow-hidden shadow-sm ring-4 ring-white">
                               {s.image ? (
                                   <img src={s.image} alt={s.name} className="w-full h-full object-cover" />
                               ) : (
                                   <span className="font-bold text-2xl">{s.name.charAt(0)}</span>
                               )}
                          </div>
                          
                          <div className="text-center">
                               <p className="font-bold text-gray-900 group-hover:text-blue-700 transition-colors text-sm sm:text-base leading-tight">
                                 {s.name}
                               </p>
                               {s.designation && (
                                 <p className="text-xs text-gray-500 font-medium mt-1">
                                    {s.designation}
                                 </p>
                               )}
                               <div className="mt-3 flex justify-center">
                                   <div className="bg-blue-100 p-1.5 rounded-full text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300">
                                      <Linkedin className="w-4 h-4" />
                                   </div>
                               </div>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
}

export default HighLights;
