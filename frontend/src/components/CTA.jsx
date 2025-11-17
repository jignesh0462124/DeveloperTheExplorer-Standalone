import React ,{useMemo}from 'react';
import { useReveal } from '../hooks/useReveal';

function CTA() {
  const { ref: ctaRef, isRevealed } = useReveal({ threshold: 0.2 });
  const fadeUp = useMemo(
    () =>
      `transition-all duration-700 ease-out ${
        isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`,
    [isRevealed]
  );

  return (
    <section ref={ctaRef} className="w-full relative py-20 px-4 sm:px-6 lg:px-20">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-0 w-full h-12 border-t-4 border-blue-500"></div>
        <div className="absolute top-32 left-0 w-full h-12 border-t-4 border-yellow-500"></div>
        <div className="absolute top-44 left-0 w-full h-12 border-t-4 border-green-500"></div>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className={`cta-title text-4xl lg:text-5xl font-bold text-gray-900 mb-6 ${fadeUp}`}>
          Ready to explore, build, and collaborate?
        </h2>
        <p className={`cta-desc text-xl text-gray-600 mb-10 ${fadeUp}`} style={{ transitionDelay: "120ms" }}>
          Join Developers: The Explorers and experience a tech campaign where curiosity meets execution
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className={`cta-button px-10 py-4 bg-blue-500 text-white text-lg font-medium rounded-full hover:bg-blue-600 shadow-lg hover:shadow-xl transition ${fadeUp}`} style={{ transitionDelay: "180ms" }}>
            Coming Soon
          </button>
          <a 
            href="https://chat.whatsapp.com/GD6YhOOBpFZFtZNW9dblhS?mode=wwt"
            className={`cta-button px-10 py-4 bg-white text-blue-500 text-lg font-medium rounded-full hover:bg-gray-50 shadow-lg hover:shadow-xl transition border-2 border-blue-500 ${fadeUp}`}
            style={{ transitionDelay: "220ms" }}
          >
            Connect with us on Whatsapp
          </a>
        </div>
      </div>
    </section>
  );
}


export default CTA;