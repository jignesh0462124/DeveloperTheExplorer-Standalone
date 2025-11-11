import React ,{useRef,useEffect}from 'react';
import { Menu, X, MapPin, Target, Calendar, Rocket, Heart, ChevronDown } from 'lucide-react';
import { AnimatedBackground } from './AnimatedBackground';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

function CTA() {
  const ctaRef = useRef(null);
  gsap.registerPlugin(ScrollTrigger);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".cta-title, .cta-desc, .cta-button", { opacity: 1 });
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ctaRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
        defaults: { ease: "power2.out", duration: 0.7 },
      });

      tl.from(".cta-title", { opacity: 0, y: 40 })
        .from(".cta-desc", { opacity: 0, y: 20 }, "-=0.4")
        .from(".cta-button", { opacity: 0, y: 20, stagger: 0.15 }, "-=0.3");
    }, ctaRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ctaRef} className="w-full relative py-20 px-4 sm:px-6 lg:px-20">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-0 w-full h-12 border-t-4 border-blue-500"></div>
        <div className="absolute top-32 left-0 w-full h-12 border-t-4 border-yellow-500"></div>
        <div className="absolute top-44 left-0 w-full h-12 border-t-4 border-green-500"></div>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="cta-title text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
          Ready to explore, build, and collaborate?
        </h2>
        <p className="cta-desc text-xl text-gray-600 mb-10">
          Join Developers: The Explorers and experience a tech campaign where curiosity meets execution
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="cta-button px-10 py-4 bg-blue-500 text-white text-lg font-medium rounded-full hover:bg-blue-600 shadow-lg hover:shadow-xl transition">
            Coming Soon
          </button>
          <a 
            href="https://chat.whatsapp.com/GD6YhOOBpFZFtZNW9dblhS?mode=wwt"
            className="cta-button px-10 py-4 bg-white text-blue-500 text-lg font-medium rounded-full hover:bg-gray-50 shadow-lg hover:shadow-xl transition border-2 border-blue-500"
          >
            Connect with us on Whatsapp
          </a>
        </div>
      </div>
    </section>
  );
}


export default CTA;