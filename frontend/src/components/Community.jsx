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
      className="relative  pb-20 px-4 md:mt-16 "
    >

      <div className=" max-w-7xl mx-auto">
          <h2
          className={`text-4xl mb-16  lg:text-5xl text-center font-bold text-gray-900 mb-8 community-title ${fadeUp}`}
        >
              Whom it's for
            </h2>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Section */}
          
          <div className="space-y-6 ms-4 ">
            
            <ul className="space-y-4 text-gray-700 leading-relaxed mb-6 list-disc pl-5 marker:text-blue-500">
              <li className={`community-text ${fadeUp}`} style={{ transitionDelay: "80ms" }}>
                <span className="font-semibold text-gray-900">Professionals and developers</span> ready to turn ideas into real-world innovation.
              </li>
              <li className={`community-text ${fadeUp}`} style={{ transitionDelay: "120ms" }}>
                <span className="font-semibold text-gray-900">Students and beginners</span> eager to explore tech beyond books and tutorials.
              </li>
              <li className={`community-text ${fadeUp}`} style={{ transitionDelay: "160ms" }}>
                <span className="font-semibold text-gray-900">Creators and thinkers</span> merging design, code, and imagination to build something new.
              </li>
              <li className={`community-text ${fadeUp}`} style={{ transitionDelay: "200ms" }}>
                <span className="font-semibold text-gray-900">Curious minds</span> driven by ambition, collaboration, and the courage to explore.
              </li>
            </ul>

            <div className={`mt-6 p-6 bg-blue-50 border-l-4 border-blue-500 rounded-r-xl ${fadeUp}`} style={{ transitionDelay: "240ms" }}>
               <p className="text-xl font-medium text-blue-900 italic">
                 "No barriers. No titles. No experience required - just the spark to create and the will to begin."
               </p>
            </div>

            <div className="flex flex-wrap gap-3 pt-4">
              <span className={`px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-medium community-badge ${fadeUp}`} style={{ transitionDelay: "280ms" }}>
                Passion
              </span>
              <span className={`px-4 py-2 bg-green-100 text-green-600 rounded-full text-sm font-medium community-badge ${fadeUp}`} style={{ transitionDelay: "320ms" }}>
                Innovation
              </span>
              <span className={`px-4 py-2 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium community-badge ${fadeUp}`} style={{ transitionDelay: "360ms" }}>
                Courage
              </span>
            </div>
          </div>

          {/* Image Section */}
          <div
            className={`mx-auto w-80 lg:w-120 lg:h-100 bg-white rounded-3xl shadow-xl community-img ${fadeRight}`}
            style={{ transitionDelay: "200ms" }}
          >
            <img
              src="images/Community.png"
              alt="Community"
              className="md:ms-2 lg:ms-8 lg:ms-0 h-80   lg:h-100  rounded-4xl "
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Community;

