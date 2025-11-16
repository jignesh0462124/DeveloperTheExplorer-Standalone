import React,{useRef,useEffect} from "react";
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
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";



function Whatis() {
  const whatisRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".whatis-title, .whatis-content, .whatis-highlight, .whatis-flow-title, .whatis-step", { opacity: 1 });
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: whatisRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
        defaults: { ease: "power2.out", duration: 0.7 },
      });

      tl.from(".whatis-title", { opacity: 0, y: 40 })
        .from(".whatis-content", { opacity: 0, y: 30, stagger: 0.15 }, "-=0.3")
        .from(".whatis-highlight", { opacity: 0, x: -20, stagger: 0.1 }, "-=0.3")
        .from(".whatis-flow-title", { opacity: 0, y: 30 }, "-=0.2")
        .from(".whatis-step", { opacity: 0, y: 40, scale: 0.9, stagger: 0.15 }, "-=0.3");
    }, whatisRef);

    return () => ctx.revert();
  }, []);

  const steps = [
    { title: "Step 1: Inspire", desc: "Speaker sessions with industry experts", color: "blue", icon: Lightbulb },
    { title: "Step 2: Jam", desc: "Hands-on codelabs and workshops", color: "yellow", icon: Code },
    { title: "Step 3: Build", desc: "Projects & problem-solving", color: "green", icon: Rocket },
    { title: "Step 4: Connect", desc: "Networking & mentorship", color: "red", icon: Users },
  ];

  return (
    <section id="about" ref={whatisRef} className="w-full  relative w-full pb-20 px-4 z-10">
      <div className="max-w-7xl mx-auto">
        <h2 className="whatis-title text-4xl lg:text-5xl text-center font-bold text-gray-900 mb-16">
          What is Developers: The Explorers?
        </h2>

        <div className="bg-whit/20 w-full  rounded-3xl p-8 lg:p-12 mb-12 shadow-lg">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Column */}
            <div className="space-y-6">
              <h3 className="whatis-content text-2xl font-semibold text-gray-900">
                A Dynamic Tech Campaign
              </h3>
              <p className="whatis-content text-gray-600 leading-relaxed">
                Developers: The Explorers is an innovative tech campaign celebrating exploration, learning, and collaboration across AI, Cloud, Web, and Mobile technologies. It's where curiosity meets execution, and ideas transform into reality.
              </p>
              <p className="whatis-content text-gray-600 leading-relaxed">
                This flagship event brings together passionate developers, innovators, and tech enthusiasts for an immersive experience of knowledge sharing, hands-on building, and community networking.
              </p>
            </div>
          
            {/* Right Column - Key Highlights */}
            <div className=" rounded-2xl p-8">
              <h4 className="whatis-content text-xl font-semibold text-gray-900 mb-6">
                Key Highlights
              </h4>
              <div className="space-y-4">
                {[
                  "Immersive tech sessions & jamming",
                  "Inspiring talks by developers & innovators",
                  "Real-time brainstorming and building",
                  "Community networking & fun activities"
                ].map((item, index) => (
                  <div key={index} className="whatis-highlight flex items-start space-x-3">
                    <div className="w-5 h-5 rounded bg-green-500 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-700">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/10 rounded-3xl shadow-xl p-8 lg:p-12">
          <h3 className="whatis-flow-title text-2xl font-semibold text-gray-900 text-center mb-12">
            Campaign Flow
          </h3>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <div key={index} className="whatis-step text-center">
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
