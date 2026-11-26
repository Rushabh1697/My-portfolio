// Everything that depends on the two hero images or on the pacing of the
// sequence lives here. Retune this file after swapping a photo.

export type Point = readonly [number, number];

/** Spider-Man cutout. Coordinates are in the image's own pixels. */
export const SUIT = {
  url: '/hero/spidey.png',
  width: 500,
  height: 500,
  headTop: 27,
  centerX: 250,
  /** Width of the figure itself, ignoring transparent margins. */
  figureWidth: 340,
  /** Where the breakup starts (the chest emblem). */
  chest: [257, 320] as Point,
  /** Distance from the chest to the farthest part of the figure. */
  breakRadius: 300,
};

/** Photo cutout. */
export const PHOTO = {
  url: '/hero/me.png',
  width: 1086,
  height: 1448,
  headTop: 7,
  centerX: 530,
  /** Photo pixel size relative to a suit pixel, so shoulders and arms line up. */
  scale: 0.53,
  /** Rows below this are off screen. The photo forms from here up to the head. */
  visibleHeight: 920,
};

/** All values are scroll progress through the hero, from 0 to 1. */
export const TIMELINE = {
  breakStart: 0.12,
  breakEnd: 0.33,
  titleFlip: [0.44, 0.5, 0.56] as const,
  /** Spiders build the photo from the bottom row up to the top of the head. */
  assembly: {
    first: 0.6,
    last: 0.83,
    /** How ragged the forming edge is, in progress units. */
    jitter: 0.05,
  },
  /** The plain photo takes over from the canvas. */
  solid: 0.875,
  role: [0.84, 0.89] as const,
};

export const PHONE_BREAKPOINT = 768;

export const SWARM = {
  desktop: { count: 8000, large: 36, maxPixelRatio: 2 },
  phone: { count: 2500, large: 18, maxPixelRatio: 1.5 },
};
