# Visual Architecture & Interaction Physics

## 1. Layer-by-Layer Implementation Map

| Z  | Layer | Purpose |
|----|---|---|
| 30 | Interaction Helper | Bottom-right hint; fades away after first interaction. |
| 25 | Spider-Sense HUD | Dynamic spotlight tracker, rings, target marker, identity badge. |
| 22 | Identity Reveal | `shaheer.png` masked by a radial gradient at the cursor. |
| 20 | Spider-Man Base | Foreground Spider-Man image with GSAP entrance animation. |
| 15 | SPIDERMAN Typography | Massive white title positioned behind the character. |
| 12 | Quote Block | Lower-left GREAT POWER/COMES FROM/GREAT/RESPONSIBILITY. |
| 10 | Ember Particles | 20 looping floating ember/ash particles. |
| 0  | Grunge Background | Gradient, hotspot, canvas splatter, SVG grit, vignettes. |

## 2. Cursor Reveal & Interaction Physics

### Pointer Events
- `onPointerMove` updates target X/Y relative to the hero container.
- `onPointerEnter` initializes the cursor position and activates the reveal.
- `onPointerLeave` sets the target reveal radius to 0.
- `onPointerDown` expands the reveal to 230px.
- `onPointerUp` returns the radius to 180px while hovering, otherwise 0.

### LERP Loop
```javascript
const lerp = (start, end, factor) => start + (end - start) * factor;

currentX = lerp(currentX, targetX, 0.18);
currentY = lerp(currentY, targetY, 0.18);
currentRadius = lerp(currentRadius, targetRadius, 0.14);
```

### Reveal Mask
```css
-webkit-mask-image: radial-gradient(
  circle ${revealRadius}px at ${mousePos.x}px ${mousePos.y}px,
  black 35%,
  rgba(0,0,0,0.85) 65%,
  transparent 100%
);
```

### Interaction Rules
| State | Target Radius |
|---|---|
| Pointer enters / moves | 180px |
| Click/tap | 230px |
| Pointer leaves | 0px |

*Performance target: use the continuous `requestAnimationFrame` loop to keep cursor movement smooth at 60/120fps, while avoiding unnecessary layout work. Must support full touch and drag compatibility.*
