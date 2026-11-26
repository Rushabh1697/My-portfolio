import React from 'react';
import { motion, useTransform } from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import type { ImageRect } from './sampleImage';
import { PHOTO, TIMELINE } from './timeline';

interface AssembledPhotoProps {
  progress: MotionValue<number>;
  rect: ImageRect;
  /**
   * 'swarm': appears once the spiders have built it on the canvas.
   * 'fade': crossfades in when the swarm is unavailable.
   */
  mode: 'swarm' | 'fade';
}

/** The plain, full-resolution photo. */
const AssembledPhoto: React.FC<AssembledPhotoProps> = ({ progress, rect, mode }) => {
  const opacity = useTransform(progress, (value) => {
    if (mode === 'swarm') return value >= TIMELINE.solid ? 1 : 0;
    return Math.min(Math.max((value - 0.5) / 0.2, 0), 1);
  });

  return (
    <motion.img
      src={PHOTO.url}
      alt="Rushabh Makwana"
      className="absolute max-w-none pointer-events-none"
      style={{ left: rect.left, top: rect.top, width: rect.width, height: rect.height, opacity }}
      draggable={false}
    />
  );
};

export default AssembledPhoto;
