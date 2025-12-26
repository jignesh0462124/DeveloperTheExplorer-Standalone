import React,{useMemo} from "react";
import {
  Lightbulb,
  Code,
  Users,
  Rocket,
} from "lucide-react";
import { useReveal } from "../hooks/useReveal";

function Whatis() {
  const { ref: whatisRef, isRevealed } = useReveal({ threshold: 0.2 });
  const fadeUp = useMemo(
    () =>
      `transition-all duration-700 ease-out ${
        isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`,
    [isRevealed]
  );
  const fadeIn = (delay = 0) => ({
    transitionDelay: `${delay}ms`,
  });

  const steps = [
    { title: "Step 1: Inspire", desc: "Speaker sessions with industry experts", color: "blue", icon: Lightbulb },
    { title: "Step 2: Jam", desc: "Hands-on codelabs and workshops", color: "yellow", icon: Code },
    { title: "Step 3: Build", desc: "Projects & problem-solving", color: "green", icon: Rocket },
    { title: "Step 4: Connect", desc: "Networking & mentorship", color: "red", icon: Users },
  ];

  return (
    <section id="about" ref={whatisRef} className="w-full  relative w-full pb-20 px-4 z-10">
      <div className="max-w-7xl mx-auto">
        <h2 className={`whatis-title text-4xl lg:text-5xl text-center font-bold text-gray-900 mb-16 ${fadeUp}`}>
          What is Developer The Explorer?
        </h2>

        <div className="bg-whit/20 w-full  rounded-3xl p-8 lg:p-12 mb-12 shadow-lg">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Column */}
            <div className="space-y-6">
              <h3 className={`whatis-content text-2xl font-semibold text-gray-900 ${fadeUp}`}>
                A Dynamic Tech Campaign
              </h3>
              <p className={`whatis-content text-gray-600 leading-relaxed ${fadeUp}`} style={fadeIn(80)}>
                Developer The Explorer is an innovative tech campaign celebrating exploration, learning, and collaboration across AI, Cloud, Web, and Mobile technologies. It's where curiosity meets execution, and ideas transform into reality.
              </p>
              <p className={`whatis-content text-gray-600 leading-relaxed ${fadeUp}`} style={fadeIn(140)}>
                This flagship event brings together passionate developers, innovators, and tech enthusiasts for an immersive experience of knowledge sharing, hands-on building, and community networking.
              </p>
            </div>
          
            {/* Right Column - Key Highlights */}
            <div className=" rounded-2xl p-8">
              <h4 className={`whatis-content text-xl font-semibold text-gray-900 mb-6 ${fadeUp}`}>
                Key Highlights
              </h4>
              <div className="space-y-4">
                {[
                  "Immersive tech sessions & jamming",
                  "Inspiring talks by developers & innovators",
                  "Real-time brainstorming and building",
                  "Community networking & fun activities"
                ].map((item, index) => (
                  <div
                    key={index}
                    className={`whatis-highlight flex items-start space-x-3 ${fadeUp}`}
                    style={fadeIn(180 + index * 80)}
                  >
                    <div className="w-5 h-5 rounded bg-green-500 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-700">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/10 rounded-3xl shadow-xl p-8 lg:p-12">
          <h3 className={`whatis-flow-title text-2xl font-semibold text-gray-900 text-center mb-12 ${fadeUp}`}>
            Campaign Flow
          </h3>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`whatis-step text-center transition-all duration-700 ease-out ${
                  isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={fadeIn(220 + index * 120)}
              >
                <div
                  className={`w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${
                    step.color === "blue" ? "from-blue-400 to-blue-600" :
                    step.color === "yellow" ? "from-yellow-400 to-yellow-600" :
                    step.color === "green" ? "from-green-400 to-green-600" :
                    "from-red-400 to-red-600"
                  } flex items-center justify-center`}
                >
                  <step.icon className="w-10 h-10 text-white" />
                </div>

                <div
                  className={`w-16 h-1 mx-auto mb-3 ${
                    step.color === "blue" ? "bg-blue-500" :
                    step.color === "yellow" ? "bg-yellow-500" :
                    step.color === "green" ? "bg-green-500" :
                    "bg-red-500"
                  }`}
                />

                <h4 className="font-semibold text-gray-900 mb-2">{step.title}</h4>
                <p className="text-sm text-gray-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Whatis;
