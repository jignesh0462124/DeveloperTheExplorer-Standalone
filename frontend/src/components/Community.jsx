import React, { useEffect, useRef } from "react";
import { MapPin, Target, Calendar, ImageOff } from "lucide-react";
import { AnimatedBackground } from "./AnimatedBackground";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";


function Community() {
  const communityRef = useRef(null);

  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: communityRef.current,
          start: "top 80%",
          end: "bottom 60%",
          toggleActions: "play none none reverse",
        },
        defaults: { ease: "power2.out", duration: 0.7 },
      });
      
      tl.from(".community-title", { opacity: 0, y: 40 })
        .from(".community-text", { opacity: 0, y: 20, stagger: 0.15 }, "-=0.4")
        .from(".community-badge", { opacity: 0, scale: 0.8, stagger: 0.1 }, "-=0.3")
        .from(".community-img", { opacity: 0, x: 60, scale: 0.95, duration: 0.8 }, "-=0.4");
    }, communityRef);
    
    return () => ctx.revert();
}, []);

      

return (
    <section
      ref={communityRef}
      id="community"
      className="relative  pb-20 px-4  "
    >

      <div className=" max-w-7xl mx-auto">
        <h2 className="text-4xl  lg:text-5xl text-center font-bold text-gray-900 mb-8 community-title">
              Who We Are
            </h2>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Section */}
          
          <div className="space-y-6 ms-4 ">
            

            <div className="space-y-4 text-gray-600 leading-relaxed mb-8">
              <p className="community-text">
                GDGOC GHRCE is a vibrant student developer community that bridges the gap between
                theory and practice. We empower aspiring technologists through workshops,
                hackathons, speaker sessions, and real-world projects.
              </p>
              <p className="community-text">
                Our mission is to create an inclusive learning environment where students can
                explore cutting-edge technologies, collaborate with peers, and build solutions that
                matter. From AI to Cloud, Web to Mobile, we cover the full spectrum of modern
                development.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 pt-4">
              <span className="px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-medium community-badge">
                Learn
              </span>
              <span className="px-4 py-2 bg-green-100 text-green-600 rounded-full text-sm font-medium community-badge">
                Build
              </span>
              <span className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium community-badge">
                Grow
              </span>
            </div>
          </div>

          {/* Image Section */}
          <div className="mx-auto w-100 lg:w-120 lg:h-100 bg-white rounded-3xl shadow-xl community-img">
            <img
              src="images/Community.png"
              alt="Community"
              className="ms-10 lg:ms-8 lg:ms-0 h-80  lg:h-100  rounded-4xl "
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Community;

