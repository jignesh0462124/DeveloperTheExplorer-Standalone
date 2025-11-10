import React from "react";
import {
  Menu,
  X,
  MapPin,
  Target,
  Calendar,
  Lightbulb,
  Code,
  Users,
  Rocket,
  Heart,
  ChevronDown,
} from "lucide-react";




function Whatis() {

    const steps = [
    {
      title: "Step 1: Inspire",
      desc: "Speaker sessions with industry experts",
      color: "blue",
      icon: Lightbulb, // 💡 Inspire
    },
    {
      title: "Step 2: Jam",
      desc: "Hands-on codelabs and workshops",
      color: "yellow",
      icon: Code, // 👨‍💻 Code
    },
    {
      title: "Step 3: Build",
      desc: "Projects & problem-solving",
      color: "green",
      icon: Rocket, // 🚀 Build
    },
    {
      title: "Step 4: Connect",
      desc: "Networking & mentorship",
      color: "red",
      icon: Users, // 🤝 Connect
    },
  ];


  return (
    <section className="py-20 px-4 sm:px-6 lg:px-20 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 text-center mb-16">
          What is Developers: The Explorers?
        </h2>

        <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-12 mb-12">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Column */}
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-gray-900">
                A Dynamic Tech Campaign
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Developers: The Explorers is an innovative tech campaign
                celebrating exploration, learning, and collaboration across AI,
                Cloud, Web, and Mobile technologies. It's where curiosity meets
                execution, and ideas transform into reality.
              </p>
              <p className="text-gray-600 leading-relaxed">
                This flagship event brings together passionate developers,
                innovators, and tech enthusiasts for an immersive experience of
                knowledge sharing, hands-on building, and community networking.
              </p>
            </div>

            {/* Right Column - Key Highlights */}
            <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl p-8">
              <h4 className="text-xl font-semibold text-gray-900 mb-6">
                Key Highlights
              </h4>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 rounded bg-green-500 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700">
                    Immersive tech sessions & jamming
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 rounded bg-green-500 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700">
                    Inspiring talks by developers & innovators
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 rounded bg-green-500 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700">
                    Real-time brainstorming and building
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 rounded bg-green-500 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700">
                    Community networking & fun activities
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-12">
          <h3 className="text-2xl font-semibold text-gray-900 text-center mb-12">
            Campaign Flow
          </h3>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                {/* Icon box */}
                <div
                  className={`w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${
                    step.color === "blue"
                      ? "from-blue-400 to-blue-600"
                      : step.color === "yellow"
                      ? "from-yellow-400 to-yellow-600"
                      : step.color === "green"
                      ? "from-green-400 to-green-600"
                      : "from-red-400 to-red-600"
                  } flex items-center justify-center`}
                >
                  <step.icon className="w-10 h-10 text-white" />
                </div>

                {/* Separator line */}
                <div
                  className={`w-16 h-1 mx-auto mb-3 ${
                    step.color === "blue"
                      ? "bg-blue-500"
                      : step.color === "yellow"
                      ? "bg-yellow-500"
                      : step.color === "green"
                      ? "bg-green-500"
                      : "bg-red-500"
                  }`}
                />

                {/* Text content */}
                <h4 className="font-semibold text-gray-900 mb-2">
                  {step.title}
                </h4>
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
