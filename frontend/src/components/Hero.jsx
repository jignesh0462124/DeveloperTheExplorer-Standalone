import React, { useEffect, useRef } from "react";
import { Users, Lightbulb, Code, Calendar, MapPin } from "lucide-react";
import gsap from "gsap";

function Hero() {
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power2.out", duration: 0.6 },
      });

      tl.from(".hero-tag", { opacity: 0, y: -20 })
        .from(".hero-title", { opacity: 0, y: 30 }, "-=0.3")
        .from(".hero-desc", { opacity: 0, y: 25 }, "-=0.4")
        .from(".hero-feature", { opacity: 0, x: -25, stagger: 0.15 }, "-=0.3")
        .from(".hero-info", { opacity: 0, y: 20, stagger: 0.1 }, "-=0.2")
        .from(".hero-img", { opacity: 0, x: 40, scale: 0.95, duration: 0.7 }, "-=0.5");
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
  ref={heroRef}
  className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-20 overflow-hidden"
>

      <div className="max-w-7xl mx-auto">
        <div className="ms-4 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-block px-4 py-2 bg-white rounded-full shadow-sm hero-tag">
              <span className="text-s font-medium text-blue-500">
                Flagship Tech Campaign · GDGOC GHRCE
              </span>
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight hero-title lg:mb-8 lg:mt-8">
              Developers: <span className="text-blue-600">The</span> Explorers
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed hero-desc lg:mb-8">
              An immersive experience where students, developers, and innovators explore AI, Cloud, Web, and Mobile through inspiring talks, hands-on jamming sessions, and meaningful networking.
            </p>

            <div className="space-y-4 pt-4 lg:mb-8">
              {[
                { icon: Lightbulb, text: "Inspiring talks by industry experts" },
                { icon: Code, text: "Hands-on jamming & project-building sessions" },
                { icon: Users, text: "Networking with mentors, peers, and community leaders" },
              ].map((item, i) => (
                <div key={i} className="flex items-start space-x-3 hero-feature">
                  <div className="w-7 h-7 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <item.icon className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-gray-700">{item.text}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 pt-4">
              <div className="px-4 py-2.5 bg-white rounded-lg shadow-sm flex items-center space-x-2 hero-info">
                <Calendar className="w-4 h-4 text-blue-500" />
                <span className="text-sm text-gray-700">Coming Soon</span>
              </div>
              <div className="px-4 py-2.5 bg-white rounded-lg shadow-sm flex items-center space-x-2 hero-info">
                <MapPin className="w-4 h-4 text-red-500" />
                <span className="text-sm text-gray-700">Coming Soon</span>
              </div>
              <div className="px-5 py-2.5 bg-yellow-400 rounded-lg font-semibold text-sm text-gray-900 hero-info">
                150+ Participants
              </div>
            </div>
          </div>

          <div>
            <img
              src="images/Hero.png"
              alt="Hero"
              className="hero-img md:ms-48 lg:ms-10 h-80 lg:h-150 md:h-[30rem] will-change-transform"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
