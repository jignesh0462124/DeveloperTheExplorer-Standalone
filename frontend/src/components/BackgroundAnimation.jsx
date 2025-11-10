// components/BackgroundAnimation.jsx
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const BackgroundAnimation = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Make blobs float & pulse slowly
      gsap.to(".blob", {
        xPercent: "random(-10, 10)",
        yPercent: "random(-10, 10)",
        scale: "random(0.9, 1.2)",
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 1.5,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none -z-10"
    >
      {/* Blobs behind hero */}
      <div className="blob absolute top-[-10%] left-[5%] w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-60"></div>
      <div className="blob absolute top-[40%] left-[50%] w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-60"></div>
      <div className="blob absolute bottom-[-10%] right-[5%] w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-60"></div>
    </div>
  );
};

export default BackgroundAnimation;
