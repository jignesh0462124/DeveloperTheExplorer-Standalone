import React, { useMemo } from "react";
import { Brain, Code, HeartHandshake } from "lucide-react";
import { useReveal } from "../hooks/useReveal";

function Campaign() {
  const { ref: campaignRef, isRevealed } = useReveal({ threshold: 0.2 });
  const fadeUp = useMemo(
    () =>
      `transition-all duration-700 ease-out ${
        isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`,
    [isRevealed]
  );

  const modules = [
    {
      title: "Speaker Sessions",
      gradient: "from-blue-400 to-blue-600",
      desc: "Expert-led talks covering AI, cybersecurity, the industry-academia gap, and emerging technologies. Learn from professionals who are shaping the tech landscape.",
      icon: Brain,
    },
    {
      title: "Jamming & Hands-on Labs",
      gradient: "from-yellow-400 to-yellow-600",
      desc: "Live, guided building sessions and problem-solving workshops. Get your hands dirty with code, collaborate with peers, and bring ideas to life.",
      icon: Code,
    },
    {
      title: "Community & Networking",
      gradient: "from-green-400 to-green-600",
      desc: "Open interactions, mentorship opportunities, and peer-to-peer learning. Build meaningful connections that extend beyond the event.",
      icon: HeartHandshake,
    },
  ];

  return (
    <section id="campaign" ref={campaignRef} className="relative w-full  py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 max-w-4xl mx-auto">
             <h2 className={`campaign-title text-2xl sm:text-3xl lg:text-5xl font-bold text-gray-900 mb-6 ${fadeUp}`}>
              Unveiling Developer-The-Explorer
            </h2>
            <p className={`text-lg sm:text-xl text-gray-600 leading-relaxed mb-4 ${fadeUp}`} style={{ transitionDelay: "100ms" }}>
                This is not a conference. It's not a workshop either. It's an expedition - into the unknown corners of technology, collaboration, and creativity.
            </p>
            <p className={`text-lg sm:text-xl text-gray-600 leading-relaxed ${fadeUp}`} style={{ transitionDelay: "150ms" }}>
                Developer-The-Explorer was designed to break the pattern of passive learning. No stages that separate speakers from the audience. No monologues that end in slides. Here, knowledge flows in every direction — through hands-on sessions, spontaneous discussions, and shared experiments.
            </p>
        </div>

        <div className={`mb-20 flex justify-center max-w-4xl mx-auto ${fadeUp}`} style={{ transitionDelay: "180ms" }}>
            <img 
                src="images/group.png" 
                alt="Developer The Explorer Unveiling" 
                className="rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 w-full animate-gentle-bounce"
            />
        </div>

        <h3 className={`text-3xl lg:text-4xl font-bold text-gray-900 text-center mb-10 ${fadeUp}`} style={{ transitionDelay: "200ms" }}>
            Key Highlights
        </h3>

        <div className="grid md:grid-cols-2 gap-8">
            {[
                {
                    title: "Immersive Tech Sessions",
                    desc: "Build, break, and create through sessions that turn ideas into real projects using today's most powerful technologies.",
                    icon: Code,
                    gradient: "from-blue-400 to-blue-600"
                },
                {
                    title: "Expert Talks & Insights",
                    desc: "Hear directly from innovators and industry leaders redefining the tech landscape - real stories, real lessons, zero fluff.",
                    icon: Brain,
                     gradient: "from-purple-400 to-purple-600"
                },
                {
                    title: "Live Brainstorming & Building",
                    desc: "Think fast, build faster. Collaborate, prototype, and bring bold ideas to life in high-energy, maker-driven spaces.",
                    icon: Brain, // Or another icon like Lightbulb if imported
                    gradient: "from-yellow-400 to-yellow-600"
                },
                {
                    title: "Community & Connections",
                    desc: "Meet the minds shaping tomorrow. Learn, share, and grow with a vibrant community that believes in building together.",
                    icon: HeartHandshake,
                    gradient: "from-green-400 to-green-600"
                }
            ].map((module, index) => (
             <div
              key={index}
              className={`campaign-card rounded-3xl shadow-xl p-8 hover:shadow-2xl transition transform hover:-translate-y-1 ${fadeUp}`}
              style={{ transitionDelay: `${250 + index * 100}ms` }}
            >
              <div
                className={`w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br ${module.gradient} flex items-center justify-center`}
              >
                <module.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {module.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">{module.desc}</p>
            </div>
            ))}
        </div>
      </div>
    </section>
  );
}
export default Campaign;