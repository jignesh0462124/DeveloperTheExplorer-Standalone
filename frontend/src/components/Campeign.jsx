
import React, { useEffect, useRef, useState } from "react";
import {
  Rocket,
  Laptop,
  Users,
  Brain,
  Code,
  HeartHandshake,
  Menu,
  X,
  MapPin,
  Target,
  Calendar,
  Lightbulb,
  Heart,
  ChevronDown,
} from "lucide-react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
function Campaign() {
  const campaignRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial state to visible first
      gsap.set(".campaign-title, .campaign-card", { opacity: 1 });
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: campaignRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
        defaults: { ease: "power2.out", duration: 0.7 },
      });

      tl.from(".campaign-title", { opacity: 0, y: 40 })
        .from(".campaign-card", { 
          opacity: 0, 
          y: 80, 
          scale: 0.9,
          stagger: 0.2 
        }, "-=0.3");
    }, campaignRef);

    return () => ctx.revert();
  }, []);

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
    <section ref={campaignRef} className="relative w-full py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="campaign-title text-4xl lg:text-5xl font-bold text-gray-900 text-center mb-16">
          Campaign Modules
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {modules.map((module, index) => (
            <div
              key={index}
              className="campaign-card  rounded-3xl shadow-xl p-8 hover:shadow-2xl transition transform hover:-translate-y-1"
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