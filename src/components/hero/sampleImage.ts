import { PHOTO, SUIT, TIMELINE } from './timeline';

export interface ImageRect {
  left: number;
  top: number;
  width: number;
  height: number;
  /** Screen pixels per image pixel. */
  scale: number;
}

export interface StageLayout {
  width: number;
  height: number;
  headTop: number;
  suit: ImageRect;
  photo: ImageRect;
}

/**
 * Places both images on the stage. The DOM images and the canvas both use this,
 * so spiders land exactly on the pixels they were sampled from. The figure is
 * centred, reaches the bottom edge, and is limited by height or width.
 */
export function computeLayout(width: number, height: number): StageLayout {
  const suitSpan = SUIT.height - SUIT.headTop;
  // 68% of the height keeps the head low enough to leave the headline readable.
  const scale = Math.min((height * 0.68) / suitSpan, (width * 0.96) / SUIT.figureWidth);
  const headTop = height - suitSpan * scale;

  const place = (image: typeof SUIT | typeof PHOTO, imageScale: number): ImageRect => ({
    left: width / 2 - image.centerX * imageScale,
    top: headTop - image.headTop * imageScale,
    width: image.width * imageScale,
    height: image.height * imageScale,
    scale: imageScale,
  });

  return {
    width,
    height,
    headTop,
    suit: place(SUIT, scale),
    photo: place(PHOTO, scale * PHOTO.scale),
  };
}

export function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error(`Could not load ${url}`));
    image.src = url;
  });
}

function seededRandom(seed: number) {
  let state = seed;
  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

interface Sample {
  x: number;
  y: number;
  color: [number, number, number];
}

/** Picks `count` opaque pixels spread evenly over the image, in random order. */
function sampleOpaque(
  image: HTMLImageElement,
  width: number,
  height: number,
  maxY: number,
  count: number,
  random: () => number,
) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext('2d', { willReadFrequently: true });
  if (!context) throw new Error('2D canvas is unavailable');
  context.drawImage(image, 0, 0, width, height);
  const rows = Math.min(height, maxY);
  const { data } = context.getImageData(0, 0, width, rows);

  const opaque: number[] = [];
  for (let i = 0; i < width * rows; i++) {
    if (data[i * 4 + 3] > 140) opaque.push(i);
  }
  if (opaque.length === 0) throw new Error('Image has no opaque pixels');

  const samples: Sample[] = [];
  for (let i = 0; i < count; i++) {
    const index = opaque[Math.floor(((i + random()) / count) * opaque.length)];
    samples.push({
      x: index % width,
      y: Math.floor(index / width),
      color: [data[index * 4] / 255, data[index * 4 + 1] / 255, data[index * 4 + 2] / 255],
    });
  }
  for (let i = samples.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [samples[i], samples[j]] = [samples[j], samples[i]];
  }
  return { samples, area: opaque.length };
}

/** Scroll progress at which a row of the photo forms, before the ragged edge. */
function revealAt(y: number) {
  const { first, last } = TIMELINE.assembly;
  const height = (PHOTO.visibleHeight - y) / (PHOTO.visibleHeight - PHOTO.headTop);
  return first + Math.min(Math.max(height, 0), 1) * (last - first);
}

/** Floats per spider: src 2, dst 2, src colour 3, dst colour 3, timing 4, seed 4, large 1. */
export const FLOATS_PER_SPIDER = 19;

export interface SwarmData {
  instances: Float32Array;
  count: number;
  /** Opaque suit pixels, used to size spiders so they cover the figure. */
  suitArea: number;
  /** The loaded photo, which the renderer reveals as spiders land. */
  photo: HTMLImageElement;
}

export async function buildSwarm(count: number, large: number): Promise<SwarmData> {
  const [suitImage, photoImage] = await Promise.all([loadImage(SUIT.url), loadImage(PHOTO.url)]);
  const random = seededRandom(1962);
  const total = count + large;
  const suit = sampleOpaque(suitImage, SUIT.width, SUIT.height, SUIT.height, total, random);
  const photo = sampleOpaque(photoImage, PHOTO.width, PHOTO.height, PHOTO.visibleHeight, total, random);

  const instances = new Float32Array(total * FLOATS_PER_SPIDER);
  const { breakStart, breakEnd } = TIMELINE;

  for (let i = 0; i < total; i++) {
    const from = suit.samples[i];
    const to = photo.samples[i];

    // Spiders leave in the same order the hole in the suit image spreads.
    const distance = Math.hypot(from.x - SUIT.chest[0], from.y - SUIT.chest[1]);
    const leave = breakStart + Math.min(distance / SUIT.breakRadius, 1) * (breakEnd - breakStart);
    // Each spider lands as the photo appears underneath it.
    const arriveEnd = revealAt(to.y);
    const arriveStart = arriveEnd - 0.07 - random() * 0.04;

    instances.set(
      [
        from.x, from.y,
        to.x, to.y,
        ...from.color,
        ...to.color,
        leave, arriveStart, arriveEnd, arriveEnd + 0.025,
        random(), random(), random(), random(),
        i >= count ? 1 : 0,
      ],
      i * FLOATS_PER_SPIDER,
    );
  }

  return { instances, count: total, suitArea: suit.area, photo: photoImage };
}
