# Visual Architecture & Interaction

## 1. The opening

The hero is a tall section (`380vh`) with a full-screen stage that stays pinned while the visitor scrolls. Scroll progress (0 to 1), smoothed by a spring, drives everything, so scrolling back reverses the sequence.

| Progress | What happens |
|---|---|
| 0.00-0.12 | The suit stands intact under `SPIDERMAN` |
| 0.12-0.33 | A hole spreads from the chest as spider nanobots leave |
| 0.33-0.55 | The swarm orbits; the pointer scatters it; the headline flips to `RUSHABH` |
| 0.55-0.86 | Spiders land from the bottom up, and the photo forms under them behind a glowing edge |
| 0.84-1.00 | The finished photo and the name card |

## 2. Layers

| Z | Layer |
|---|---|
| 40 | Skip to work link |
| 35 | Name card |
| 30 | Quote and scroll hint |
| 20 | Suit image, finished photo, swarm canvas |
| 15 | Headline |
| 10 | Ember particles |
| 0-1 | Gradient, grunge canvas, vignettes |

## 3. Code

| File | Role |
|---|---|
| `src/components/Hero.tsx` | Pinned stage, scroll progress, suit image, fallbacks |
| `src/components/hero/timeline.ts` | Image anchors, pacing, spider counts |
| `src/components/hero/sampleImage.ts` | Image placement and pixel sampling |
| `src/components/hero/swarmRenderer.ts` | WebGL2 shaders for the spiders and the forming photo |
| `src/components/hero/NanoSwarm.tsx` | Canvas, render loop, pointer tracking |
| `src/components/hero/AssembledPhoto.tsx` | The finished photo |

## 4. Fallbacks

- **Reduced motion:** one still screen with the photo and name.
- **No WebGL2, lost context, or sampling failure:** the suit crossfades into the photo on scroll.
- The render loop stops while the hero is off screen.

## 5. Sections below the opening

| Section | File | Notes |
|---|---|---|
| Navigation | `Nav.tsx` | Appears after the opening; compact menu on phones |
| Skills | `Skills.tsx` | Cards dock from alternate sides |
| Journey | `Experience.tsx` | Line on the left on phones, centred with alternating entries on wider screens |
| Selected Work | `Projects.tsx` | Cards rendered from `src/content/projects.ts`, in order |
| Contact | `About.tsx` | Email and resume actions, then profile links |

**Touch screens:** `hover:` styles also apply while an element is pressed, and to elements marked `data-glow` while they cross the middle of the screen (`src/hooks/useTouchGlow.ts` and the `hover` variant in `src/index.css`).

**Resume:** `ResumeView.tsx` renders `src/content/resume.ts` as a single A4 sheet, the same on screen and in print. `Skills.tsx` reads its cards from the same file; the Journey entries in `Experience.tsx` are separate and need the same facts. Edit the content there and check Print / PDF afterwards.

To add a project, add an entry to `src/content/projects.ts` and, if it is deployed, a 960x600 screenshot in `public/projects/`.

## 6. Changing a photo

1. Put a transparent cutout in `public/hero/`.
2. In `timeline.ts`, update the size, `headTop`, `centerX` and `scale` so heads and arms line up.
3. For the photo, set `visibleHeight` to the lowest row that appears on screen.
