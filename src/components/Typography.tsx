import React from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import { TIMELINE } from './hero/timeline';

const NAME = 'Rushabh Makwana';
// Matches the role in src/content/resume.ts.
const ROLE = 'Web Developer · Founder, PIXEL Forge';

interface TitleProps {
  /** Scroll progress. Without it the title shows the name and stays still. */
  progress?: MotionValue<number>;
  headTop: number;
  stageHeight: number;
}

export const Title: React.FC<TitleProps> = ({ progress, headTop, stageHeight }) => {
  const finished = useMotionValue(1);
  const value = progress ?? finished;
  const [out, swap, settled] = TIMELINE.titleFlip;

  const suitRotate = useTransform(value, [out, swap], [0, 90]);
  const suitOpacity = useTransform(value, (v) => (v < swap ? 1 : 0));
  const nameRotate = useTransform(value, [swap, settled], [-90, 0]);
  const nameOpacity = useTransform(value, (v) => (v < swap ? 0 : 1));

  // Sit high on wide screens, and drop close to the head on tall narrow ones.
  const lineHeight = `clamp(60px, 18vw, 268px) * 0.86`;
  const top = `max(${Math.round(stageHeight * 0.1)}px,calc(${Math.round(headTop)}px - ${lineHeight} * 0.75))`;

  return (
    <div className="absolute inset-x-0 flex justify-center pointer-events-none z-[15]" style={{ top }}>
      <h1
        aria-label={NAME}
        className="font-title text-white m-0 text-center uppercase grid"
        style={{
          fontSize: 'clamp(60px, 18vw, 268px)',
          lineHeight: 0.86,
          letterSpacing: '-0.032em',
          transform: 'scale(1.07, 0.91)',
          textShadow: '0 6px 20px rgba(0,0,0,0.35)',
          perspective: 900,
        }}
      >
        <motion.span
          aria-hidden="true"
          className="[grid-area:1/1]"
          style={{ rotateX: suitRotate, opacity: suitOpacity }}
        >
          Spiderman
        </motion.span>
        <motion.span
          aria-hidden="true"
          className="[grid-area:1/1]"
          style={{ rotateX: nameRotate, opacity: nameOpacity }}
        >
          Rushabh
        </motion.span>
      </h1>
    </div>
  );
};

export const RoleCard: React.FC<{ progress?: MotionValue<number> }> = ({ progress }) => {
  const finished = useMotionValue(1);
  const value = progress ?? finished;
  const [start, end] = TIMELINE.role;
  const opacity = useTransform(value, [start, end], [0, 1]);
  const y = useTransform(value, [start, end], [30, 0]);

  return (
    <motion.div
      className="absolute z-[35] pointer-events-none inset-x-4 bottom-6 md:inset-x-auto md:right-12 md:bottom-12 bg-black/55 backdrop-blur-md border-l-4 border-red-600 px-5 py-3 text-center md:text-left"
      style={{ opacity, y }}
    >
      <p className="font-title uppercase tracking-wide text-2xl md:text-3xl text-white m-0">{NAME}</p>
      <p className="font-hud uppercase tracking-widest text-[11px] md:text-xs text-white/80 m-0 mt-1">{ROLE}</p>
    </motion.div>
  );
};

export const Quote: React.FC = () => {
  return (
    <div
      className="absolute z-[30] pointer-events-none"
      style={{
        left: 'clamp(16px, 4.5vw, 58px)',
        bottom: 'clamp(16px, 6vh, 56px)',
        width: 'clamp(180px, 23.5vw, 290px)',
        transform: 'scaleX(1.18)',
        transformOrigin: 'left bottom'
      }}
    >
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
        className="font-quote font-bold text-white uppercase m-0"
        style={{
          fontSize: 'clamp(20px, 4.5vw, 42px)',
          lineHeight: 1.05
        }}
      >
        WITH GREAT POWER<br />
        COMES<br />
        GREAT<br />
        RESPONSIBILITY
      </motion.p>
    </div>
  );
};
