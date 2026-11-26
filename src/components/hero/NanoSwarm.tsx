import React, { useEffect, useRef } from 'react';
import type { MotionValue } from 'framer-motion';
import { buildSwarm } from './sampleImage';
import type { StageLayout } from './sampleImage';
import { createSwarmRenderer } from './swarmRenderer';
import type { SwarmRenderer } from './swarmRenderer';
import { PHONE_BREAKPOINT, SWARM, TIMELINE } from './timeline';

interface NanoSwarmProps {
  progress: MotionValue<number>;
  layout: StageLayout;
  /** Called when the swarm cannot be drawn, so the hero can crossfade instead. */
  onUnavailable: () => void;
}

const NanoSwarm: React.FC<NanoSwarmProps> = ({ progress, layout, onUnavailable }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const layoutRef = useRef(layout);
  const onUnavailableRef = useRef(onUnavailable);

  useEffect(() => {
    layoutRef.current = layout;
    onUnavailableRef.current = onUnavailable;
  }, [layout, onUnavailable]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const settings = window.innerWidth < PHONE_BREAKPOINT ? SWARM.phone : SWARM.desktop;
    const pointer = { x: 0, y: 0, strength: 0 };
    const target = { x: 0, y: 0, strength: 0 };
    let renderer: SwarmRenderer | null = null;
    let frame = 0;
    let visible = true;
    let blank = true;
    let cancelled = false;

    const loop = (now: number) => {
      pointer.x += (target.x - pointer.x) * 0.18;
      pointer.y += (target.y - pointer.y) * 0.18;
      pointer.strength += (target.strength - pointer.strength) * 0.14;

      const value = progress.get();
      // Outside this range the plain images cover everything. It runs slightly past
      // the handover so there is never a frame without the photo.
      const active = value > TIMELINE.breakStart - 0.01 && value < TIMELINE.solid + 0.01;
      if (renderer && active) {
        renderer.render(
          { progress: value, time: now / 1000, layout: layoutRef.current, pointer },
          Math.min(window.devicePixelRatio || 1, settings.maxPixelRatio),
        );
        blank = false;
      } else if (renderer && !blank) {
        renderer.clear();
        blank = true;
      }
      frame = visible ? requestAnimationFrame(loop) : 0;
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !frame) frame = requestAnimationFrame(loop);
    });
    observer.observe(canvas);

    const follow = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      target.x = event.clientX - rect.left;
      target.y = event.clientY - rect.top;
      if (target.strength === 0) {
        pointer.x = target.x;
        pointer.y = target.y;
      }
      target.strength = 1;
    };
    const release = (event: PointerEvent) => {
      if (event.type !== 'pointerup' || event.pointerType === 'touch') target.strength = 0;
    };
    const leave = () => {
      target.strength = 0;
    };
    window.addEventListener('pointermove', follow, { passive: true });
    window.addEventListener('pointerdown', follow, { passive: true });
    window.addEventListener('pointerup', release);
    window.addEventListener('pointercancel', release);
    document.documentElement.addEventListener('pointerleave', leave);

    const fail = (error: unknown) => {
      console.warn('Nanobot swarm unavailable:', error);
      onUnavailableRef.current();
    };
    const contextLost = () => {
      renderer = null;
      fail('WebGL context lost');
    };
    canvas.addEventListener('webglcontextlost', contextLost);

    buildSwarm(settings.count, settings.large)
      .then((swarm) => {
        if (cancelled) return;
        renderer = createSwarmRenderer(canvas, swarm);
        if (!renderer) fail('WebGL2 is not supported');
      })
      .catch((error) => {
        if (!cancelled) fail(error);
      });

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('pointermove', follow);
      window.removeEventListener('pointerdown', follow);
      window.removeEventListener('pointerup', release);
      window.removeEventListener('pointercancel', release);
      document.documentElement.removeEventListener('pointerleave', leave);
      canvas.removeEventListener('webglcontextlost', contextLost);
      renderer?.dispose();
    };
  }, [progress]);

  return <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 w-full h-full pointer-events-none" />;
};

export default NanoSwarm;
