import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import { Title, Quote, RoleCard } from './Typography';
import Particles from './Particles';
import Grunge from './Grunge';
import NanoSwarm from './hero/NanoSwarm';
import AssembledPhoto from './hero/AssembledPhoto';
import { computeLayout } from './hero/sampleImage';
import type { ImageRect, StageLayout } from './hero/sampleImage';
import { PHONE_BREAKPOINT, PHOTO, SUIT, TIMELINE } from './hero/timeline';

const STAGE_CLASS = 'w-full overflow-hidden bg-spider-gradient select-none';

/** Tracks the stage size and where both hero images sit on it. */
function useStageLayout() {
  const stageRef = useRef<HTMLDivElement>(null);
  const [layout, setLayout] = useState<StageLayout | null>(null);

  useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const measure = () => setLayout(computeLayout(stage.clientWidth, stage.clientHeight));
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  return { stageRef, layout };
}

const Backdrop: React.FC = () => (
  <>
    <Grunge />
    <div className="absolute inset-0 bg-scarlet-hotspot pointer-events-none z-[1]" />
    <div className="absolute inset-0 bg-top-vignette pointer-events-none z-[1]" />
    <div className="absolute inset-0 bg-bottom-vignette pointer-events-none z-[1]" />
  </>
);

interface SuitImageProps {
  progress: MotionValue<number>;
  rect: ImageRect;
  mode: 'swarm' | 'fade';
}

/** The intact suit. In swarm mode a hole spreads from the chest as spiders leave. */
const SuitImage: React.FC<SuitImageProps> = ({ progress, rect, mode }) => {
  const entranceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = entranceRef.current;
    if (!element) return;
    const tween = gsap.fromTo(
      element,
      { opacity: 0, y: '100vh' },
      { opacity: 1, y: '0vh', duration: 1.6, delay: 0.15, ease: 'power3.out' },
    );
    return () => {
      tween.kill();
    };
  }, []);

  const { breakStart, breakEnd } = TIMELINE;

  const mask = useTransform(progress, (value) => {
    if (mode !== 'swarm' || value <= breakStart) return 'none';
    const radius = ((value - breakStart) / (breakEnd - breakStart)) * SUIT.breakRadius * rect.scale;
    const x = SUIT.chest[0] * rect.scale;
    const y = SUIT.chest[1] * rect.scale;
    return `radial-gradient(circle at ${x}px ${y}px, transparent ${radius}px, black ${radius + 24}px)`;
  });
  const opacity = useTransform(progress, (value) => {
    if (mode === 'swarm') return value < breakEnd ? 1 : 0;
    return 1 - Math.min(Math.max((value - 0.3) / 0.2, 0), 1);
  });

  return (
    <div ref={entranceRef} className="absolute inset-0 pointer-events-none opacity-0">
      <motion.img
        src={SUIT.url}
        alt="Spider-Man"
        className="absolute max-w-none"
        style={{
          left: rect.left,
          top: rect.top,
          width: rect.width,
          height: rect.height,
          opacity,
          maskImage: mask,
          WebkitMaskImage: mask,
        }}
        draggable={false}
      />
    </div>
  );
};

/** The scroll-driven sequence: suit, nanobot swarm, then spiders building the photo. */
const AnimatedHero: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { stageRef, layout } = useStageLayout();
  const [mode, setMode] = useState<'swarm' | 'fade'>('swarm');

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.0002 });

  const isPhone = layout !== null && layout.width < PHONE_BREAKPOINT;
  const hintOpacity = useTransform(progress, [0.01, 0.05], [1, 0]);
  // On phones the quote makes room for the name card.
  const quoteOpacity = useTransform(progress, (value) => {
    if (!isPhone) return 1;
    return 1 - Math.min(Math.max((value - 0.78) / 0.05, 0), 1);
  });

  const fallBack = useCallback(() => setMode('fade'), []);

  return (
    <div ref={sectionRef} id="hero-section" className="relative w-full h-[380vh]">
      <div ref={stageRef} className={`sticky top-0 h-dvh ${STAGE_CLASS}`}>
        <Backdrop />
        <Particles />
        {layout && (
          <>
            <Title progress={progress} headTop={layout.headTop} stageHeight={layout.height} />

            <div className="absolute inset-0 z-[20] pointer-events-none">
              <SuitImage progress={progress} rect={layout.suit} mode={mode} />
              <AssembledPhoto
                progress={progress}
                rect={layout.photo}
                mode={mode}
              />
              {mode === 'swarm' && (
                <NanoSwarm progress={progress} layout={layout} onUnavailable={fallBack} />
              )}
            </div>

            <RoleCard progress={progress} />
          </>
        )}

        <motion.div className="absolute inset-0 z-[30] pointer-events-none" style={{ opacity: quoteOpacity }}>
          <Quote />
        </motion.div>

        <a
          href="#work"
          className="absolute top-4 right-4 md:top-6 md:right-8 z-[40] bg-black/30 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 text-xs font-hud tracking-widest uppercase text-white/80 hover:text-white hover:border-white/50 transition-colors"
        >
          Skip to work ↓
        </a>

        <motion.div
          className="absolute bottom-8 right-4 md:right-8 z-[30] bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 text-xs font-hud tracking-widest uppercase text-white/80 pointer-events-none"
          style={{ opacity: hintOpacity }}
        >
          Scroll to suit up ↓
        </motion.div>
      </div>
    </div>
  );
};

/** For visitors who ask for less motion: one still screen, no scroll sequence. */
const StaticHero: React.FC = () => {
  const { stageRef, layout } = useStageLayout();

  return (
    <div ref={stageRef} id="hero-section" className={`relative h-screen ${STAGE_CLASS}`}>
      <Backdrop />
      {layout && (
        <>
          <Title headTop={layout.headTop} stageHeight={layout.height} />
          <img
            src={PHOTO.url}
            alt="Rushabh Makwana"
            className="absolute z-[20] max-w-none pointer-events-none"
            style={{
              left: layout.photo.left,
              top: layout.photo.top,
              width: layout.photo.width,
              height: layout.photo.height,
            }}
          />
          <RoleCard />
          {layout.width >= PHONE_BREAKPOINT && <Quote />}
        </>
      )}
    </div>
  );
};

const Hero: React.FC = () => {
  const reducedMotion = useReducedMotion();
  return reducedMotion ? <StaticHero /> : <AnimatedHero />;
};

export default Hero;
