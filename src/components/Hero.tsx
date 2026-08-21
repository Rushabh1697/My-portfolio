import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import HUD from './HUD';
import { Title, Quote } from './Typography';
import Particles from './Particles';
import Grunge from './Grunge';
import { AnimatePresence, motion } from 'framer-motion';

const Hero: React.FC = () => {
  const spidermanRef = useRef<HTMLImageElement>(null);
  const identityRef = useRef<HTMLImageElement>(null);
  
  const [hudActive, setHudActive] = useState(false);
  const [interacted, setInteracted] = useState(false);
  
  const physics = useRef({
    currentX: typeof window !== 'undefined' ? window.innerWidth / 2 : 0,
    currentY: typeof window !== 'undefined' ? window.innerHeight / 2 : 0,
    targetX: typeof window !== 'undefined' ? window.innerWidth / 2 : 0,
    targetY: typeof window !== 'undefined' ? window.innerHeight / 2 : 0,
    currentRadius: 0,
    targetRadius: 0,
  });

  const requestRef = useRef<number>(0);

  useEffect(() => {
    // On mobile, auto-activate HUD and hide instructions
    if (window.innerWidth < 768) {
      setHudActive(true);
      setInteracted(true);
    }
  }, []);

  useEffect(() => {
    if (spidermanRef.current && identityRef.current) {
      gsap.fromTo(
        [spidermanRef.current, identityRef.current],
        { opacity: 0, y: '100vh' },
        { opacity: 1, y: '0vh', duration: 1.6, delay: 0.15, ease: 'power3.out' }
      );
    }

    const loop = () => {
      const p = physics.current;
      
      // Auto-float on mobile
      if (window.innerWidth < 768) {
        const time = Date.now() * 0.001;
        const heroEl = document.getElementById('hero-section');
        const height = heroEl ? heroEl.clientHeight : window.innerHeight;
        const width = heroEl ? heroEl.clientWidth : window.innerWidth;
        
        p.targetX = width / 2 + Math.sin(time) * 40;
        p.targetY = height * 0.7 + Math.cos(time * 0.8) * 30;
        p.targetRadius = 120 + Math.sin(time * 1.5) * 15;
      }

      p.currentX += (p.targetX - p.currentX) * 0.18;
      p.currentY += (p.targetY - p.currentY) * 0.18;
      p.currentRadius += (p.targetRadius - p.currentRadius) * 0.14;

      document.documentElement.style.setProperty('--mask-image', `radial-gradient(circle ${p.currentRadius}px at ${p.currentX}px ${p.currentY}px, black 35%, rgba(0,0,0,0.85) 65%, transparent 100%)`);
      document.documentElement.style.setProperty('--reverse-mask-image', `radial-gradient(circle ${p.currentRadius}px at ${p.currentX}px ${p.currentY}px, transparent 35%, rgba(0,0,0,0.15) 65%, black 100%)`);
      
      const hudEl = document.getElementById('hud-container');
      if (hudEl) {
        hudEl.style.transform = `translate(${p.currentX}px, ${p.currentY}px)`;
      }

      requestRef.current = requestAnimationFrame(loop);
    };
    
    requestRef.current = requestAnimationFrame(loop);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  const handlePointerMove = (e: React.PointerEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    physics.current.targetX = e.clientX - rect.left;
    physics.current.targetY = e.clientY - rect.top;
  };

  const handlePointerEnter = (e: React.PointerEvent) => {
    setHudActive(true);
    setInteracted(true);
    physics.current.targetRadius = 180;
    
    // Smooth transition from current to target
    const rect = e.currentTarget.getBoundingClientRect();
    physics.current.targetX = e.clientX - rect.left;
    physics.current.targetY = e.clientY - rect.top;
  };

  const handlePointerLeave = () => {
    setHudActive(false);
    physics.current.targetRadius = 0;
  };

  const handlePointerDown = () => {
    physics.current.targetRadius = 230;
  };

  const handlePointerUp = () => {
    if (hudActive) {
      physics.current.targetRadius = 180;
    }
  };

  return (
    <div id="hero-section" className="relative w-full h-screen overflow-hidden bg-spider-gradient flex items-center justify-center select-none">
      
      <Grunge />
      
      <div className="absolute inset-0 bg-scarlet-hotspot pointer-events-none z-[1]" />
      <div className="absolute inset-0 bg-top-vignette pointer-events-none z-[1]" />
      <div className="absolute inset-0 bg-bottom-vignette pointer-events-none z-[1]" />

      <Particles />
      <Title />
      <Quote />

      <div 
        className="absolute inset-0 z-[20] touch-pan-y cursor-crosshair flex items-end justify-center"
        onPointerMove={handlePointerMove}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
      >
        {/* Identity Reveal Layer (Behind Spiderman) */}
        <div className="absolute inset-0 z-[18] pointer-events-none reveal-mask flex justify-center items-end">
           <img 
            ref={identityRef}
            src="/shaheer.png" 
            alt="Identity Reveal" 
            className="h-[92vh] w-full object-cover md:object-contain object-bottom pointer-events-none"
          />
        </div>

        {/* Base Spiderman Image (On top, with reverse mask) */}
        <div className="absolute inset-0 z-[20] pointer-events-none reverse-mask flex justify-center items-end">
          <img 
            ref={spidermanRef}
            src="/spiderman.png" 
            alt="Spider-Man" 
            className="h-[92vh] w-full object-cover md:object-contain object-bottom pointer-events-none"
          />
        </div>
      </div>

      <div id="hud-container" className={`absolute top-0 left-0 pointer-events-none z-[25] transition-opacity duration-300 ${hudActive ? 'opacity-100' : 'opacity-0'}`}>
        <HUD /> 
      </div>

      <AnimatePresence>
        {!interacted && (
          <motion.div 
            className="absolute bottom-8 right-8 z-[30] bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 text-xs font-hud tracking-widest uppercase text-white/80 pointer-events-none"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            Move cursor over Spider-Man to reveal
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Hero;
