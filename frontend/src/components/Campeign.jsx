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
        <h2 className={`campaign-title text-4xl lg:text-5xl font-bold text-gray-900 text-center mb-16 ${fadeUp}`}>
          Campaign Modules
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {modules.map((module, index) => (
            <div
              key={index}
              className={`campaign-card rounded-3xl shadow-xl p-8 hover:shadow-2xl transition transform hover:-translate-y-1 ${fadeUp}`}
              style={{ transitionDelay: `${160 + index * 140}ms` }}
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