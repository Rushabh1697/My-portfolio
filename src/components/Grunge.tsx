import React, { useEffect, useRef } from 'react';

const Grunge: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawGrunge();
    };

    const drawGrunge = () => {
      const w = canvas.width;
      const h = canvas.height;
      
      ctx.clearRect(0, 0, w, h);
      
      let seed = 12345;
      const random = () => {
        seed = (seed * 9301 + 49297) % 233280;
        return seed / 233280;
      };

      const specks = Math.floor((w * h) / 180);
      ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
      for (let i = 0; i < specks; i++) {
        ctx.fillRect(random() * w, random() * h, 1, 1);
      }

      const blotches = Math.floor((w * h) / 7000);
      for (let i = 0; i < blotches; i++) {
        const x = random() * w;
        const y = random() * h;
        const radius = random() * 15 + 5;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(15, 0, 0, ${random() * 0.15 + 0.05})`;
        ctx.fill();
      }

      const cracks = Math.floor(w / 45);
      ctx.strokeStyle = 'rgba(0,0,0,0.15)';
      ctx.lineWidth = 1;
      for (let i = 0; i < cracks; i++) {
        ctx.beginPath();
        let cx = random() * w;
        let cy = random() * h;
        ctx.moveTo(cx, cy);
        const steps = Math.floor(random() * 10) + 5;
        for (let j = 0; j < steps; j++) {
          cx += (random() - 0.5) * 50;
          cy += (random() - 0.5) * 50;
          ctx.lineTo(cx, cy);
        }
        ctx.stroke();
      }
    };

    window.addEventListener('resize', resize);
    resize();

    return () => window.removeEventListener('resize', resize);
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none mix-blend-multiply opacity-70 z-0"
      />
      <svg className="hidden">
        <filter id="noiseFilter">
          <feTurbulence 
            type="fractalNoise" 
            baseFrequency="0.75" 
            numOctaves="4" 
            stitchTiles="stitch" />
        </filter>
      </svg>
      <div 
        className="absolute inset-0 pointer-events-none mix-blend-multiply opacity-40 z-0" 
        style={{ filter: 'url(#noiseFilter)' }}
      ></div>
    </>
  );
};

export default Grunge;
