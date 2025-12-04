import React from "react";
import { useReveal } from "../hooks/useReveal";

function Community() {
  const { ref: communityRef, isRevealed } = useReveal({ threshold: 0.2 });
  const fadeUp = `transition-all duration-700 ease-out ${
    isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
  }`;
  const fadeRight = `transition-all duration-700 ease-out ${
    isRevealed ? "opacity-100 translate-x-0" : "opacity-0 translate-x-6"
  }`;

  return (
    <section
      ref={communityRef}
      id="community"
      className="relative  pb-20 px-4  "
    >

      <div className=" max-w-7xl mx-auto">
        <h2
          className={`text-4xl  lg:text-5xl text-center font-bold text-gray-900 mb-8 community-title ${fadeUp}`}
        >
              Who We Are
            </h2>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Section */}
          
          <div className="space-y-6 ms-4 ">
            

            <div className="space-y-4 text-gray-600 leading-relaxed mb-8">
              <p className={`community-text ${fadeUp}`} style={{ transitionDelay: "80ms" }}>
                GDGOC GHRCE is a vibrant student developer community that bridges the gap between
                theory and practice. We empower aspiring technologists through workshops,
                hackathons, speaker sessions, and real-world projects.
              </p>
              <p className={`community-text ${fadeUp}`} style={{ transitionDelay: "160ms" }}>
                Our mission is to create an inclusive learning environment where students can
                explore cutting-edge technologies, collaborate with peers, and build solutions that
                matter. From AI to Cloud, Web to Mobile, we cover the full spectrum of modern
                development.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 pt-4">
              <span className={`px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-medium community-badge ${fadeUp}`} style={{ transitionDelay: "200ms" }}>
                Learn
              </span>
              <span className={`px-4 py-2 bg-green-100 text-green-600 rounded-full text-sm font-medium community-badge ${fadeUp}`} style={{ transitionDelay: "240ms" }}>
                Build
              </span>
              <span className={`px-4 py-2 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium community-badge ${fadeUp}`} style={{ transitionDelay: "280ms" }}>
                Grow
              </span>
            </div>
          </div>

          {/* Image Section */}
          <div
            className={`mx-auto w-90 lg:w-120 lg:h-100 bg-white rounded-3xl shadow-xl community-img ${fadeRight}`}
            style={{ transitionDelay: "200ms" }}
          >
            <img
              src="images/Community.png"
              alt="Community"
              className="ms-6 lg:ms-8 lg:ms-0 h-80  lg:h-100  rounded-4xl "
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Community;

