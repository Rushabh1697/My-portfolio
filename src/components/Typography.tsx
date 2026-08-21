import React from 'react';
import { motion } from 'framer-motion';

export const Title: React.FC = () => {
  return (
    <div className="absolute inset-0 flex justify-center pointer-events-none z-[15]" style={{ top: 'clamp(60px, 15vh, 195px)' }}>
      <h1 
        className="font-title text-white m-0 text-center uppercase"
        style={{
          fontSize: 'clamp(60px, 18vw, 268px)',
          lineHeight: 0.86,
          letterSpacing: '-0.032em',
          transform: 'scale(1.07, 0.91)',
          textShadow: '0 6px 20px rgba(0,0,0,0.35)'
        }}
      >
        Spiderman
      </h1>
    </div>
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
        GREAT POWER<br />
        COMES FROM<br />
        GREAT<br />
        RESPONSIBILITY
      </motion.p>
    </div>
  );
};
