import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

export const AnimatedBackground = ({ variant = 'geometric' }) => {
  const containerRef = useRef(null);
  
  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const shapes = gsap.utils.toArray('.geo-shape');
      if (!shapes.length) {
        return;
      }

      gsap.set(shapes, {
        x: 0,
        y: 0,
        rotation: 0,
        scale: 1,
        opacity: 0,
        force3D: true,
        willChange: 'transform, opacity'
      });

      const initTimeline = gsap.timeline({
        onComplete: () => startAnimations(shapes)
      });

      initTimeline.to(shapes, {
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out',
        stagger: 0.05
      });
    }, containerRef);

    function startAnimations(shapes) {
      shapes.forEach((shape, index) => {
        const rotationSpeed = gsap.utils.random(15, 30);
        const rotationDirection = gsap.utils.random([1, -1]);

        gsap.to(shape, {
          rotation: 360 * rotationDirection,
          duration: rotationSpeed,
          ease: 'none',
          repeat: -1,
          force3D: true
        });

        gsap.to(shape, {
          x: `+=${gsap.utils.random(-80, 80)}`,
          y: `+=${gsap.utils.random(-80, 80)}`,
          duration: gsap.utils.random(6, 10),
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          repeatDelay: 0,
          delay: gsap.utils.random(0, 2),
          force3D: true
        });

        gsap.to(shape, {
          scale: gsap.utils.random(0.9, 1.1),
          duration: gsap.utils.random(3, 5),
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          repeatDelay: 0,
          delay: gsap.utils.random(0, 1),
          force3D: true
        });

        if (index % 3 === 0) {
          gsap.to(shape, {
            rotationY: 360,
            duration: gsap.utils.random(12, 18),
            ease: 'none',
            repeat: -1,
            force3D: true
          });
        }

        if (index % 4 === 0) {
          gsap.to(shape, {
            rotation: `+=${gsap.utils.random(180, 360)}`,
            duration: gsap.utils.random(2, 4),
            ease: 'power2.inOut',
            repeat: -1,
            repeatDelay: gsap.utils.random(3, 6),
            force3D: true
          });
        }
      });
    }

    return () => {
      ctx.revert();
    };
  }, []);

  const renderGeometric = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Top area shapes */}
      <div className="geo-shape absolute top-12 left-16 w-32 h-32 border-4 border-blue-200"
           style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }} />
      <div className="geo-shape absolute top-8 left-[35%] w-28 h-28 border-4 border-cyan-200 rounded-full hidden md:block" />
      <div className="geo-shape absolute top-16 left-[55%] w-26 h-26 border-4 border-violet-200 hidden lg:block"
           style={{ clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' }} />
      <div className="geo-shape absolute top-24 right-32 w-40 h-40 border-4 border-green-200 rounded-full" />
      <div className="geo-shape absolute top-10 right-[15%] w-34 h-34 border-4 border-lime-200 rounded-2xl hidden md:block" />

      {/* Middle area shapes */}
      <div className="geo-shape absolute top-[40%] left-8 w-36 h-36 border-4 border-amber-200"
           style={{ clipPath: 'polygon(25% 0%, 75% 0%, 100% 25%, 100% 75%, 75% 100%, 25% 100%, 0% 75%, 0% 25%)' }} />
      <div className="geo-shape absolute top-[45%] left-[30%] w-24 h-24 border-4 border-purple-200 rounded-lg hidden lg:block" />
      <div className="geo-shape absolute top-[38%] left-[52%] w-30 h-30 border-4 border-teal-200 rounded-full hidden md:block" />
      <div className="geo-shape absolute top-[42%] right-[22%] w-44 h-44 border-4 border-pink-200 hidden lg:block"
           style={{ clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)' }} />
      <div className="geo-shape absolute top-[48%] right-12 w-34 h-34 border-4 border-sky-200 rounded-full" />

      {/* Bottom area shapes */}
      <div className="geo-shape absolute bottom-28 left-[18%] w-36 h-36 border-4 border-yellow-200"
           style={{ clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)' }} />
      <div className="geo-shape absolute bottom-32 left-[45%] w-25 h-25 border-4 border-fuchsia-200 hidden md:block"
           style={{ clipPath: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)' }} />
      <div className="geo-shape absolute bottom-24 left-[62%] w-22 h-22 border-4 border-indigo-200 hidden lg:block"
           style={{ clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)' }} />
      <div className="geo-shape absolute bottom-20 right-[28%] w-28 h-28 border-4 border-red-200 rounded-lg hidden md:block" />
      <div className="geo-shape absolute bottom-16 right-[12%] w-32 h-32 border-4 border-emerald-200 rounded-xl" />
      <div className="geo-shape absolute bottom-12 right-8 w-38 h-38 border-4 border-orange-200 hidden lg:block"
           style={{ clipPath: 'polygon(50% 0%, 90% 20%, 100% 60%, 75% 100%, 25% 100%, 0% 60%, 10% 20%)' }} />
    </div>
  );

  return (
    <div ref={containerRef} className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
      {renderGeometric()}
    </div>
  );
};