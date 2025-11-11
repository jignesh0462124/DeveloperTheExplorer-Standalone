import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

export const AnimatedBackground = ({ variant = 'particles' }) => {
  const containerRef = useRef(null);
  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {

      if (variant === 'particles') {
        gsap.to('.particle', {
          y: 'random(-50, 50)',
          x: 'random(-50, 50)',
          scale: 'random(0.8, 1.3)',
          duration: 'random(4, 8)',
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          stagger: { each: 0.2, from: 'random' },
        });

        gsap.to('.connection-line', {
          opacity: 'random(0.1, 0.4)',
          duration: 'random(2, 4)',
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          stagger: 0.3,
        });
      } else if (variant === 'morphing') {
        gsap.to('.morph-blob', {
          x: 'random(-150, 150)',
          y: 'random(-150, 150)',
          scale: 'random(0.7, 1.4)',
          rotation: 'random(-45, 45)',
          duration: 'random(10, 15)',
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          stagger: { each: 2, from: 'random' },
        });
      }
       else if (variant === 'geometric') {
        // Geometric shapes animation
        gsap.to('.geo-shape', {
          rotation: 360,
          duration: 'random(15, 25)',
          ease: 'none',
          repeat: -1,
          stagger: 0.5
        });

        gsap.to('.geo-shape', {
          y: 'random(-40, 40)',
          x: 'random(-40, 40)',
          scale: 'random(0.85, 1.15)',
          duration: 'random(5, 8)',
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          stagger: 0.3
        });
      } else if (variant === 'waves') {
        // Wave animation
        gsap.to('.wave-layer', {
          x: '-50%',
          duration: 'random(20, 30)',
          ease: 'none',
          repeat: -1,
          stagger: 1
        });

        gsap.to('.wave-layer', {
          opacity: 'random(0.3, 0.6)',
          duration: 'random(3, 5)',
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          stagger: 0.5
        });
      } else if (variant === 'stars') {
        // Starfield effect
        gsap.to('.star', {
          scale: 'random(0.5, 1.5)',
          opacity: 'random(0.3, 1)',
          duration: 'random(1, 3)',
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          stagger: {
            each: 0.1,
            from: 'random'
          }
        });
      } else if (variant === 'tech-grid') {
        // Tech grid animation
        gsap.to('.grid-dot', {
          scale: 'random(0.8, 1.5)',
          opacity: 'random(0.2, 0.8)',
          duration: 'random(2, 4)',
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          stagger: {
            each: 0.05,
            from: 'random'
          }
        });

        gsap.to('.grid-line', {
          opacity: 'random(0.1, 0.5)',
          duration: 'random(3, 6)',
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          stagger: 0.2
        });
      } else if (variant === 'floating-orbs') {
        // Floating orbs with parallax
        gsap.utils.toArray('.orb-layer-1').forEach(orb => {
          gsap.to(orb, {
            y: 'random(-100, 100)',
            x: 'random(-80, 80)',
            scale: 'random(0.8, 1.3)',
            rotation: 'random(-180, 180)',
            duration: 'random(8, 12)',
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true
          });
        });

        gsap.utils.toArray('.orb-layer-2').forEach(orb => {
          gsap.to(orb, {
            y: 'random(-60, 60)',
            x: 'random(-50, 50)',
            scale: 'random(0.9, 1.2)',
            duration: 'random(10, 15)',
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true
          });
        });

        gsap.utils.toArray('.glow-pulse').forEach(glow => {
          gsap.to(glow, {
            opacity: 'random(0.3, 0.8)',
            scale: 'random(1, 1.4)',
            duration: 'random(3, 5)',
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true
          });
        });
      } else if (variant === 'ink-drops') {
        // Ink drop effect
        gsap.utils.toArray('.ink-drop').forEach((drop, i) => {
          gsap.to(drop, {
            scale: 'random(1.5, 3)',
            opacity: 0,
            duration: 'random(6, 10)',
            ease: 'power2.out',
            repeat: -1,
            repeatDelay: 'random(2, 4)',
            delay: i * 0.8
          });
        });
      } else if (variant === 'aurora') {
        // Aurora borealis effect
        gsap.utils.toArray('.aurora-layer').forEach(layer => {
          gsap.to(layer, {
            x: 'random(-200, 200)',
            scaleX: 'random(1.1, 1.5)',
            scaleY: 'random(0.8, 1.2)',
            opacity: 'random(0.3, 0.7)',
            duration: 'random(15, 25)',
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true
          });
        });
      } else if (variant === 'paper-planes') {
        // Paper planes flying
        gsap.utils.toArray('.paper-plane').forEach(plane => {
          const tl = gsap.timeline({ repeat: -1 });
          tl.to(plane, {
            x: '120vw',
            y: 'random(-50, 50)',
            rotation: 'random(-15, 15)',
            duration: 'random(12, 20)',
            ease: 'none'
          }).set(plane, {
            x: '-10vw',
            y: 'random(10, 90)' + '%'
          });
        });
      } else if (variant === 'constellation') {
        // Constellation lines
        gsap.to('.constellation-star', {
          scale: 'random(0.6, 1.4)',
          opacity: 'random(0.4, 1)',
          duration: 'random(2, 4)',
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          stagger: 0.1
        });

        gsap.to('.constellation-line', {
          opacity: 'random(0.1, 0.5)',
          strokeDashoffset: 'random(0, 100)',
          duration: 'random(4, 8)',
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true
        });
      }

  }, [variant]);

  const renderParticles = () => (
    <>
      {/* Particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={`particle-${i}`}
          className="particle absolute w-3 h-3 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 opacity-60"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}
      
      {/* Connection Lines */}
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={`line-${i}`}
          className="connection-line absolute h-px bg-gradient-to-r from-blue-300 to-transparent opacity-20"
          style={{
            left: `${Math.random() * 80}%`,
            top: `${Math.random() * 100}%`,
            width: `${100 + Math.random() * 200}px`,
            transform: `rotate(${Math.random() * 360}deg)`,
          }}
        />
      ))}
    </>
  );

  const renderMorphing = () => (
  <>
    {/* Top left - Forest green */}
    <div className="morph-blob fixed -top-32 -left-32 w-[400px] h-[400px] bg-gradient-to-br from-emerald-300 via-green-300 to-teal-300 rounded-full opacity-30 blur-3xl" />
    
    {/* Top center - Light green */}
    <div className="morph-blob fixed top-20 left-1/4 w-[300px] h-[300px] bg-gradient-to-br from-lime-200 via-green-200 to-emerald-200 rounded-full opacity-25 blur-2xl" />
    
    {/* Top right - Mint green */}
    <div className="morph-blob fixed -top-24 -right-24 w-[350px] h-[350px] bg-gradient-to-br from-teal-300 via-cyan-300 to-green-300 rounded-full opacity-35 blur-3xl" />
    
    {/* Middle left - Deep green */}
    <div className="morph-blob fixed top-1/3 -left-20 w-[280px] h-[280px] bg-gradient-to-br from-green-400 via-emerald-400 to-teal-400 rounded-full opacity-30 blur-2xl" />
    
    {/* Center - Soft green (subtle) */}
    <div className="morph-blob fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] bg-gradient-to-br from-green-200 via-lime-200 to-yellow-200 rounded-full opacity-20 blur-3xl" />
    
    {/* Middle right - Sea green */}
    <div className="morph-blob fixed top-1/2 -right-32 w-[380px] h-[380px] bg-gradient-to-br from-cyan-300 via-teal-300 to-green-300 rounded-full opacity-30 blur-3xl" />
    
    {/* Bottom left - Sage green */}
    <div className="morph-blob fixed -bottom-28 left-1/4 w-[320px] h-[320px] bg-gradient-to-br from-green-300 via-lime-300 to-yellow-300 rounded-full opacity-35 blur-3xl" />
    
    {/* Bottom center - Moss green */}
    <div className="morph-blob fixed -bottom-20 left-1/2 w-[300px] h-[300px] bg-gradient-to-br from-emerald-300 via-green-400 to-lime-400 rounded-full opacity-25 blur-2xl" />
    
    {/* Bottom right - Jade green */}
    <div className="morph-blob fixed -bottom-32 -right-28 w-[360px] h-[360px] bg-gradient-to-br from-teal-400 via-emerald-400 to-green-400 rounded-full opacity-30 blur-3xl" />
    
    {/* Additional accent - Spring green (small) */}
    <div className="morph-blob fixed top-2/3 left-1/3 w-[200px] h-[200px] bg-gradient-to-br from-lime-300 via-green-300 to-emerald-300 rounded-full opacity-20 blur-2xl" />
    
    {/* Additional accent - Mint (small) */}
    <div className="morph-blob fixed top-1/4 right-1/3 w-[220px] h-[220px] bg-gradient-to-br from-green-200 via-teal-200 to-cyan-200 rounded-full opacity-25 blur-2xl" />
  </>
);

  const renderGeometric = () => (
    <>
      {/* Geometric Shapes */}
      {/* === Floating geometric shapes === */}
<div className="absolute inset-0 overflow-visible pointer-events-none">
  <div className="geo-shape absolute top-20 left-10 w-32 h-32 border-4 border-blue-200 opacity-45"
       style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }} />
  <div className="geo-shape absolute top-40 right-20 w-40 h-40 border-4 border-green-200 rounded-full opacity-30" />
  <div className="geo-shape absolute bottom-32 left-1/4 w-36 h-36 border-4 border-yellow-200 opacity-45"
       style={{ clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)' }} />
  <div className="geo-shape absolute bottom-20 right-1/3 w-28 h-28 border-4 border-red-200 opacity-30 rounded-lg" />
  <div className="geo-shape absolute top-1/2 left-1/3 w-24 h-24 border-4 border-purple-200 rounded-lg opacity-50" />
  <div className="geo-shape absolute top-1/3 right-1/4 w-44 h-44 border-4 border-pink-200 opacity-35"
       style={{ clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)' }} />

  {/* NEW extra shapes for depth */}
  <div className="geo-shape absolute top-10 right-1/2 w-20 h-20 border-4 border-cyan-200 rounded-full opacity-25" />
  <div className="geo-shape absolute bottom-10 left-10 w-24 h-24 border-4 border-indigo-200 opacity-20"
       style={{ clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)' }} />
  <div className="geo-shape absolute bottom-1/4 right-10 w-32 h-32 border-4 border-emerald-200 rounded-xl opacity-40" />
  <div className="geo-shape absolute top-1/4 left-1/2 w-36 h-36 border-4 border-rose-200 opacity-30"
       style={{ clipPath: 'polygon(25% 0%, 75% 0%, 100% 25%, 100% 75%, 75% 100%, 25% 100%, 0% 75%, 0% 25%)' }} />
</div>

    </>
  );

  const renderWaves = () => (
    <>
      {/* Wave Layers */}
      <div className="wave-layer absolute bottom-0 left-0 w-[200%] h-40 opacity-40">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full">
          <path d="M0,50 C150,80 350,0 600,50 C850,100 1050,30 1200,50 L1200,120 L0,120 Z" fill="url(#wave1)" />
          <defs>
            <linearGradient id="wave1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#A78BFA" stopOpacity="0.5" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="wave-layer absolute bottom-0 left-0 w-[200%] h-40 opacity-30">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full">
          <path d="M0,70 C200,30 400,90 600,60 C800,30 1000,80 1200,60 L1200,120 L0,120 Z" fill="url(#wave2)" />
          <defs>
            <linearGradient id="wave2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#34D399" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.4" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="wave-layer absolute bottom-0 left-0 w-[200%] h-40 opacity-25">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full">
          <path d="M0,40 C300,70 500,20 700,50 C900,80 1100,30 1200,50 L1200,120 L0,120 Z" fill="url(#wave3)" />
          <defs>
            <linearGradient id="wave3" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FBBF24" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#F472B6" stopOpacity="0.3" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </>
  );

  const renderStars = () => (
    <>
      {/* Stars */}
      {Array.from({ length: 50 }).map((_, i) => (
        <div
          key={`star-${i}`}
          className="star absolute w-1 h-1 rounded-full bg-white"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            boxShadow: '0 0 3px rgba(255,255,255,0.8)',
          }}
        />
      ))}
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={`star-large-${i}`}
          className="star absolute w-2 h-2 rounded-full bg-blue-200"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            boxShadow: '0 0 6px rgba(96,165,250,0.6)',
          }}
        />
      ))}
    </>
  );

  const renderTechGrid = () => (
    <>
      {/* Grid Dots */}
      {Array.from({ length: 15 }).map((_, i) =>
        Array.from({ length: 10 }).map((_, j) => (
          <div
            key={`dot-${i}-${j}`}
            className="grid-dot absolute w-1 h-1 rounded-full bg-blue-400"
            style={{
              left: `${(i / 14) * 100}%`,
              top: `${(j / 9) * 100}%`,
            }}
          />
        ))
      )}
      
      {/* Grid Lines Horizontal */}
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={`h-line-${i}`}
          className="grid-line absolute w-full h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent opacity-20"
          style={{
            top: `${(i / 9) * 100}%`,
          }}
        />
      ))}
      
      {/* Grid Lines Vertical */}
      {Array.from({ length: 15 }).map((_, i) => (
        <div
          key={`v-line-${i}`}
          className="grid-line absolute w-px h-full bg-gradient-to-b from-transparent via-blue-200 to-transparent opacity-20"
          style={{
            left: `${(i / 14) * 100}%`,
          }}
        />
      ))}
    </>
  );

  const renderFloatingOrbs = () => (
    <>
      {/* Layer 1 - Large orbs */}
      {[
        { color: 'from-blue-400/40 to-cyan-300/30', size: 'w-96 h-96', pos: 'top-10 left-10' },
        { color: 'from-purple-400/40 to-pink-300/30', size: 'w-80 h-80', pos: 'top-1/4 right-20' },
        { color: 'from-emerald-400/40 to-teal-300/30', size: 'w-72 h-72', pos: 'bottom-20 left-1/4' },
        { color: 'from-orange-400/40 to-yellow-300/30', size: 'w-64 h-64', pos: 'bottom-1/3 right-1/4' }
      ].map((orb, i) => (
        <div
          key={`orb-1-${i}`}
          className={`orb-layer-1 absolute ${orb.size} ${orb.pos} rounded-full bg-gradient-to-br ${orb.color} blur-3xl`}
        />
      ))}

      {/* Layer 2 - Medium orbs */}
      {[
        { color: 'from-rose-300/30 to-red-200/20', size: 'w-48 h-48', pos: 'top-40 right-1/3' },
        { color: 'from-indigo-300/30 to-blue-200/20', size: 'w-56 h-56', pos: 'top-1/2 left-20' },
        { color: 'from-lime-300/30 to-green-200/20', size: 'w-40 h-40', pos: 'bottom-40 right-10' }
      ].map((orb, i) => (
        <div
          key={`orb-2-${i}`}
          className={`orb-layer-2 absolute ${orb.size} ${orb.pos} rounded-full bg-gradient-to-br ${orb.color} blur-2xl`}
        />
      ))}

      {/* Glow pulses */}
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={`glow-${i}`}
          className="glow-pulse absolute w-32 h-32 rounded-full bg-white/10 blur-xl"
          style={{
            left: `${Math.random() * 80 + 10}%`,
            top: `${Math.random() * 80 + 10}%`,
          }}
        />
      ))}
    </>
  );

  const renderInkDrops = () => (
    <>
      {[
        { color: 'from-blue-400/50 via-cyan-300/30 to-transparent', pos: 'top-20 left-1/4' },
        { color: 'from-purple-400/50 via-pink-300/30 to-transparent', pos: 'top-1/3 right-1/4' },
        { color: 'from-emerald-400/50 via-teal-300/30 to-transparent', pos: 'bottom-1/4 left-1/3' },
        { color: 'from-orange-400/50 via-yellow-300/30 to-transparent', pos: 'bottom-20 right-1/3' },
        { color: 'from-rose-400/50 via-red-300/30 to-transparent', pos: 'top-1/2 left-10' }
      ].map((drop, i) => (
        <div
          key={`ink-${i}`}
          className={`ink-drop absolute w-48 h-48 ${drop.pos} rounded-full bg-gradient-radial ${drop.color} blur-2xl`}
        />
      ))}
    </>
  );

  const renderAurora = () => (
    <>
      <div className="aurora-layer absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-blue-300/30 via-purple-300/20 to-transparent blur-3xl transform -skew-y-6" />
      <div className="aurora-layer absolute top-20 left-0 w-full h-96 bg-gradient-to-b from-emerald-300/25 via-cyan-300/15 to-transparent blur-3xl transform skew-y-3" />
      <div className="aurora-layer absolute top-40 left-0 w-full h-96 bg-gradient-to-b from-pink-300/20 via-rose-300/10 to-transparent blur-3xl transform -skew-y-2" />
      <div className="aurora-layer absolute bottom-0 left-0 w-full h-96 bg-gradient-to-t from-violet-300/25 via-indigo-300/15 to-transparent blur-3xl transform skew-y-6" />
    </>
  );

  const renderPaperPlanes = () => {
  const colors = [
    ['#60A5FA', '#A78BFA'], // blue to purple
    ['#A78BFA', '#F472B6'], // purple to pink
    ['#34D399', '#60A5FA'], // green to blue
    ['#FBBF24', '#F87171'], // yellow to red
    ['#F472B6', '#A78BFA'], // pink to purple
    ['#10B981', '#34D399'], // emerald to green
    ['#8B5CF6', '#EC4899'], // violet to pink
    ['#F59E0B', '#EF4444'], // amber to red
    ['#06B6D4', '#3B82F6'], // cyan to blue
    ['#14B8A6', '#10B981'], // teal to emerald
    ['#6366F1', '#8B5CF6'], // indigo to violet
    ['#F97316', '#FB923C'], // orange shades
  ];

  return (
    <>
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={`plane-${i}`}
          className="paper-plane absolute"
          style={{
            left: '-10vw',
            top: `${Math.random() * 80 + 10}%`,
            animationDelay: `${i * 0.8}s`,
          }}
        >
          <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
            <path
              d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"
              fill={`url(#plane-gradient-${i})`}
              opacity="0.6"
            />
            <defs>
              <linearGradient id={`plane-gradient-${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={colors[i][0]} />
                <stop offset="100%" stopColor={colors[i][1]} />
              </linearGradient>
            </defs>
          </svg>
        </div>
      ))}
    </>
  );
};

  const renderConstellation = () => {
    const stars = [
      { x: 20, y: 20 }, { x: 35, y: 15 }, { x: 50, y: 25 }, { x: 65, y: 18 }, { x: 80, y: 22 },
      { x: 15, y: 40 }, { x: 40, y: 45 }, { x: 60, y: 42 }, { x: 85, y: 48 },
      { x: 25, y: 65 }, { x: 45, y: 70 }, { x: 70, y: 68 }, { x: 90, y: 72 },
      { x: 18, y: 85 }, { x: 38, y: 88 }, { x: 62, y: 90 }
    ];

    const connections = [
      [0, 1], [1, 2], [2, 3], [3, 4],
      [5, 6], [6, 7], [7, 8],
      [9, 10], [10, 11], [11, 12],
      [0, 5], [2, 6], [3, 7], [6, 10], [7, 11]
    ];

    return (
      <>
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {connections.map(([start, end], i) => (
            <line
              key={`line-${i}`}
              className="constellation-line"
              x1={`${stars[start].x}%`}
              y1={`${stars[start].y}%`}
              x2={`${stars[end].x}%`}
              y2={`${stars[end].y}%`}
              stroke="url(#constellation-gradient)"
              strokeWidth="1"
              strokeDasharray="5,5"
              opacity="0.3"
            />
          ))}
          <defs>
            <linearGradient id="constellation-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#60A5FA" />
              <stop offset="100%" stopColor="#A78BFA" />
            </linearGradient>
          </defs>
        </svg>
        {stars.map((star, i) => (
          <div
            key={`star-${i}`}
            className="constellation-star absolute w-3 h-3 rounded-full bg-gradient-to-br from-blue-400 to-purple-400"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              boxShadow: '0 0 10px rgba(96, 165, 250, 0.6)'
            }}
          />
        ))}
      </>
    );
  };

  return (
    /*  <--  FIXED POSITIONING  -->  */
    <div
      ref={containerRef}
      className="fixed inset-0 overflow-visible pointer-events-none -z-10"
    >
      {variant === 'particles' && renderParticles()}
      {variant === 'morphing' && renderMorphing()}
      {variant === 'geometric' && renderGeometric()}
      {variant === 'waves' && renderWaves()}
      {variant === 'stars' && renderStars()}
      {variant === 'tech-grid' && renderTechGrid()}
      {variant === 'floating-orbs' && renderFloatingOrbs()}
      {variant === 'ink-drops' && renderInkDrops()}
      {variant === 'aurora' && renderAurora()}
      {variant === 'paper-planes' && renderPaperPlanes()}
      {variant === 'constellation' && renderConstellation()}
    </div>
  );
};