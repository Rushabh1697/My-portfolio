# Design Tokens & Visual Specifications

## 1. Background Gradients
**Primary:**
`linear-gradient(180deg, #100101 0%, #700606 18%, #bc1313 45%, #d42222 62%, #780707 85%, #050000 100%)`

**Scarlet Hotspot:**
`radial-gradient(ellipse 80% 55% at 50% 64%, rgba(240, 45, 45, 0.45) 0%, rgba(190, 18, 18, 0.3) 40%, rgba(80, 5, 5, 0.25) 75%, rgba(10, 0, 0, 0.20) 100%)`

## 2. Interactive Glow & Vignettes
**Mouse Glow:**
`radial-gradient(circle 420px at ${x}px ${y}px, rgba(255, 75, 75, 0.20) 0%, rgba(210, 20, 20, 0.08) 45%, transparent 75%)`

**Top Vignette:**
`linear-gradient(to bottom, rgba(0,0,0,0.20) 0%, rgba(0,0,0,0.12) 40%, transparent 100%)`

**Bottom Vignette:**
`linear-gradient(to top, rgba(0,0,0,0.20) 0%, rgba(0,0,0,0.12) 40%, transparent 100%)`

## 3. HUD Tokens
- **Primary ring:** `rgba(239, 68, 68, 0.7)`; glow `0 0 25px 4px rgba(239, 68, 68, 0.6)`
- **Golden outer ring:** `rgba(251, 191, 36, 0.4)`, dashed, 12s rotation
- **Core dot:** `#ff2020` with `0 0 8px #ff2020`
- **HUD badge:** `rgba(69, 10, 10, 0.8)`, border `rgba(239, 68, 68, 0.6)`

## 4. Typography
**Title Specification:**
- **Text:** "SPIDERMAN"
- **Font stack:** Impact, Anton, League Gothic, sans-serif
- **Size:** `clamp(88px, 20.8vw, 268px)`
- **Line height:** `0.86`; letter spacing: `-0.032em`
- **Transform:** `scale(1.07, 0.91)`
- **Placement:** top: `clamp(100px, 26vh, 195px)`
- **Color:** pure white with drop-shadow `0 6px 20px rgba(0,0,0,0.35)`

**Quote Specification:**
- **Lines:** GREAT POWER / COMES FROM / GREAT / RESPONSIBILITY
- **Font:** Bebas Neue or Roboto Condensed; weight 700
- **Size:** `clamp(26px, 5.83vh, 42px)`; line height `1.05`
- **Position:** lower-left; left `clamp(24px, 4.5vw, 58px)`, bottom `clamp(28px, 6vh, 56px)`
- **Width:** `clamp(220px, 23.5vw, 290px)`; `scaleX(1.18)`

## 5. Particles & Grunge Engine
### Floating Ember System
- 20 animated particles.
- Random sizes between 2px and 5px.
- Warm glowing colors with ember-like box shadows.
- Vertical movement up to -120px, horizontal sway up to ±20px, fading opacity, and pulsing scale.
- Loop durations are staggered between roughly 4s and 8s.

### Procedural Grunge
- **Dense specks:** ~ (width x height) / 180 particles.
- **Large organic ink blotches:** ~ (width x height) / 7000 clusters.
- **Distressed cracks:** ~ width / 45 strokes.
- **SVG turbulence:** Uses fractalNoise with baseFrequency 0.75 and 4 octaves.
- **Canvas texture:** Uses a deterministic pseudo-random generator so the texture remains stable between renders.
