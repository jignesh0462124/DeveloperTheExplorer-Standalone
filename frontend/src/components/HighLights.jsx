import React,{useRef,useEffect} from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

function HighLights() {
  const highlightsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".highlights-title, .highlights-subtitle, .highlights-badge, .highlights-card", { opacity: 1 });
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: highlightsRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
        defaults: { ease: "power2.out", duration: 0.7 },
      });

      tl.from(".highlights-title", { opacity: 0, y: 40 })
        .from(".highlights-subtitle", { opacity: 0, y: 20 }, "-=0.4")
        .from(".highlights-badge", { opacity: 0, scale: 0.8, stagger: 0.3 }, "-=0.3")
        .from(".highlights-card", { opacity: 0, y: 60, stagger: 0.08 }, "-=0.3");
    }, highlightsRef);

    return () => ctx.revert();
  }, []);




    return ( 
         <section id="highlights" ref={highlightsRef} className="w-full lg:ms-12  py-20 px-4 sm:px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="highlights-title  text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Highlights from Our Journey
            </h2>
            <p className="highlights-subtitle  text-xl text-gray-600">
              A legacy of impactful tech events by GDGOC / GDSC GHRCE
            </p>
          </div>

          {/* Past Events */}
          <div className="mb-12">
            <div className="highlights-badge  inline-block px-6 py-2 bg-gray-200 rounded-full mb-8">
              <span className="text-sm font-medium text-gray-700">Past Tenure Events</span>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { tag: "Design", color: "blue", title: "Figma Lifestyle", desc: ["A creative event celebrating design", "thinking and community collaboration,", "bringing together designers to explore", "Figma's potential."] },
                { tag: "Tech Festival", color: "green", title: "Techotsav 2024", desc: ["A comprehensive tech festival featuring AI", "workshops, cybersecurity sessions, and", "job readiness programs for students."] },
                { tag: "AI Workshop", color: "red", title: "Build with AI", desc: ["Hands-on sessions exploring AI tools and", "frameworks, empowering students to build", "intelligent applications."] }
              ].map((event, index) => (
                <div key={index} className="highlights-card rounded-2xl shadow-lg p-8 hover:shadow-xl transition">
                  <div className="flex items-center space-x-2 mb-4">
                    <div className={`w-3 h-3 rounded-full ${
                      event.color === 'blue' ? 'bg-blue-500' :
                      event.color === 'green' ? 'bg-green-500' :
                      'bg-red-500'
                    }`} />
                    <span className="text-xs font-medium text-gray-600">{event.tag}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{event.title}</h3>
                  <div className="text-sm text-gray-600 space-y-1">
                    {event.desc.map((line, i) => <p key={i}>{line}</p>)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Current Events */}
          <div>
            <div className="highlights-badge mt-20  inline-block px-6 py-2 bg-blue-500 rounded-full mb-8">
              <span className="text-sm  font-medium text-white">Current Tenure Events</span>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { tag: "Hackathon Prep", color: "yellow", title: "Crack SIH with GDGoC", desc: ["Launch event and orientation for Smart", "India Hackathon, guiding students through", "the competition process."] },
                { tag: "Hackathon", color: "green", title: "SIH Internal Hackathon", desc: ["National-level preparation with real", "problem statements, fostering innovation", "and teamwork."] },
                { tag: "Coding Challenge", color: "blue", title: "9 Days of Coding", desc: ["An intensive HackerRank challenge series", "to sharpen problem-solving and coding", "skills."] }
              ].map((event, index) => (
                <div key={index} className="highlights-card rounded-2xl shadow-lg p-8 hover:shadow-xl transition">
                  <div className="flex items-center space-x-2 mb-4">
                    <div className={`w-3 h-3 rounded-full ${
                      event.color === 'blue' ? 'bg-blue-500' :
                      event.color === 'green' ? 'bg-green-500' :
                      'bg-yellow-500'
                    }`} />
                    <span className="text-xs font-medium text-gray-600">{event.tag}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{event.title}</h3>
                  <div className="text-sm text-gray-600 space-y-1">
                    {event.desc.map((line, i) => <p key={i}>{line}</p>)}
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
