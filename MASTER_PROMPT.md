# Master Build Prompt

*Copy this prompt into an AI coding assistant or use it as the implementation brief:*

You are an expert Frontend Creative Technologist. Create a complete, production-ready interactive Spider-Man Hero Section web application built with React, Vite, TypeScript, Tailwind CSS, GSAP, and Framer Motion (motion/react).

The website must have a dark comic-book distressed blood-red grunge aesthetic, massive SPIDERMAN typography, floating ember particles, a GSAP entrance animation, and a dynamic cursor spotlight reveal where moving the pointer over Spider-Man unmasks the secret hero identity image. Add an animated Spider-Sense HUD reticle with a luminous red ring, rotating golden dashed ring, cyber target marker, and identity badge.

DESIGN:
Background gradient:
linear-gradient(180deg, #100101 0%, #700606 18%, #bc1313 45%, #d42222 62%, #780707 85%, #050000 100%)
Add a centered scarlet radial glow and subtle top, bottom, and perimeter vignettes.
Add procedural canvas grunge with dense specks, ink blotches, and distressed cracks.
Add SVG fractalNoise grit with opacity around 0.4 and mix-blend-multiply.

TYPOGRAPHY:
Title: SPIDERMAN
- Font stack: Impact, Anton, League Gothic, sans-serif
- Size: clamp(88px, 20.8vw, 268px)
- Line-height: 0.86
- Letter-spacing: -0.032em
- Transform: scale(1.07, 0.91)
- Position: top clamp(100px, 26vh, 195px)
- Color: #ffffff
- Drop shadow: 0 6px 20px rgba(0,0,0,0.35)

QUOTE:
GREAT POWER
COMES FROM
GREAT
RESPONSIBILITY
Use Bebas Neue or Roboto Condensed, weight 700, size clamp(26px, 5.83vh, 42px), line-height 1.05, lower-left positioning, and scaleX(1.18).

ASSETS:
/public/spiderman.png: transparent Spider-Man cutout.
/public/shaheer.png or /public/person.png: upright transparent identity cutout.
Keep the identity layer upright with transform: none, height: 92vh, object-fit: contain, object-position: bottom center.

LAYERS:
z-30 interaction helper
z-25 Spider-Sense HUD
z-22 identity reveal
z-20 Spider-Man foreground
z-15 SPIDERMAN typography
z-12 quote
z-10 ember particles
z-0 background

SPIDER-MAN ENTRANCE:
Use GSAP:
from { opacity: 0, y: '100vh' }
to { opacity: 1, y: '0vh', duration: 1.6, delay: 0.15, ease: 'power3.out' }

CURSOR PHYSICS:
Use requestAnimationFrame with:
currentX = currentX + (targetX - currentX) * 0.18
currentY = currentY + (targetY - currentY) * 0.18
currentRadius = currentRadius + (targetRadius - currentRadius) * 0.14
Pointer enter/move -> 180px radius.
Pointer down/tap -> 230px radius.
Pointer leave -> 0px.
Support mouse, touch, and drag.

MASK:
Apply a radial CSS mask to the identity image:
radial-gradient(circle ${revealRadius}px at ${mousePos.x}px ${mousePos.y}px, black 35%, rgba(0,0,0,0.85) 65%, transparent 100%)

HUD:
Luminous red energy ring with red glow.
Golden dashed outer ring rotating 360 degrees in 12 seconds.
Cyber target center with a small pulsing red core.
Glassmorphic badge reading: IDENTITY REVEALED // SHAHEER
HUD follows the LERP-smoothed cursor position.

PARTICLES:
Render 20 ember particles with small sizes, warm glowing colors, randomized positions, upward motion, horizontal sway, opacity fade, scale pulse, staggered loop durations.

INTERACTION HINT:
Show a bottom-right pill:
MOVE CURSOR OVER SPIDER-MAN TO REVEAL
Use AnimatePresence and fade it away after first interaction.

TECHNICAL REQUIREMENTS:
- React 18+ Vite / TypeScript
- Tailwind CSS
- motion/react or framer-motion
- GSAP
- requestAnimationFrame LERP
- HTML5 canvas for deterministic grunge
- SVG turbulence filter
Keep the experience responsive and visually faithful to the supplied reference image.
Verify smooth cursor tracking and touch/drag behavior.
Keep the identity reveal upright and naturally centered over Spider-Man.
Use the supplied reference image as the visual direction and the supplied Github repository as the project source-code reference.
