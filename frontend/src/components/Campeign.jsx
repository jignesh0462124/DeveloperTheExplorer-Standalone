import React from "react";
import {
  Rocket,
  Laptop,
  Users,
  Brain,
  Code,
  HeartHandshake,
} from "lucide-react"; // choose icons that match your theme

function Campeign() {
  // Define modules with unique icons
  const modules = [
    {
      title: "Speaker Sessions",
      gradient: "from-blue-400 to-blue-600",
      desc: "Expert-led talks covering AI, cybersecurity, the industry-academia gap, and emerging technologies. Learn from professionals who are shaping the tech landscape.",
      icon: Brain, // 🧠 AI/knowledge vibe
    },
    {
      title: "Jamming & Hands-on Labs",
      gradient: "from-yellow-400 to-yellow-600",
      desc: "Live, guided building sessions and problem-solving workshops. Get your hands dirty with code, collaborate with peers, and bring ideas to life.",
      icon: Code, // 💻 coding vibe
    },
    {
      title: "Community & Networking",
      gradient: "from-green-400 to-green-600",
      desc: "Open interactions, mentorship opportunities, and peer-to-peer learning. Build meaningful connections that extend beyond the event.",
      icon: HeartHandshake, // ❤️ collaboration vibe
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-20 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 text-center mb-16">
          Campaign Modules
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {modules.map((module, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transition transform hover:-translate-y-1"
            >
              {/* Icon Container */}
              <div
                className={`w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br ${module.gradient} flex items-center justify-center`}
              >
                <module.icon className="w-8 h-8 text-white" />
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {module.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed">{module.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Campeign;
