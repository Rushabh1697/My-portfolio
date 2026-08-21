import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const Particles: React.FC = () => {
  const particles = useMemo(() => {
    return Array.from({ length: 20 }).map((_, i) => {
      const size = Math.random() * 3 + 2; // 2px to 5px
      const left = Math.random() * 100;
      const duration = Math.random() * 4 + 4; // 4s to 8s
      const delay = Math.random() * 5;
      return { id: i, size, left, duration, delay };
    });
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
      {particles.map(p => (
        <motion.div
          key={p.id}
          className="absolute bottom-[-20px] rounded-full bg-orange-400"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.left}%`,
            boxShadow: '0 0 10px 2px rgba(249, 115, 22, 0.8)',
          }}
          initial={{ y: 0, opacity: 0, scale: 0.5, x: 0 }}
          animate={{
            y: [-20, -120 - Math.random() * 100],
            opacity: [0, 0.8, 0],
            scale: [0.5, 1.5, 0.5],
            x: [0, Math.random() * 40 - 20, Math.random() * 40 - 20]
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

export default Particles;
