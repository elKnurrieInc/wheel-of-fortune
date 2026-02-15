# Wheel of Fortune — Visual Design Specification

**Author:** Pixel, UX Designer @ elKnurrieInc
**Date:** 2026-02-15
**Version:** 1.0
**For:** Dev-1 (Implementation)

---

## 1. Color Palette

### Segment Colors (10 segments, alternating for contrast)

| Segment | Name             | Hex       | Notes                          |
|---------|------------------|-----------|--------------------------------|
| 1       | Ruby Red         | `#E63946` | Warm, high-energy              |
| 2       | Sunflower Gold   | `#F4A236` | Warm contrast to red           |
| 3       | Ocean Teal       | `#2EC4B6` | Cool break                     |
| 4       | Electric Violet  | `#7B2FBE` | Rich, premium feel             |
| 5       | Hot Pink         | `#E84393` | Playful pop                    |
| 6       | Emerald Green    | `#00B894` | Fresh, lucky feel              |
| 7       | Coral Orange     | `#FF6B6B` | Warm, distinct from Ruby Red   |
| 8       | Royal Blue       | `#3867D6` | Cool, trustworthy              |
| 9       | Amber Yellow     | `#FDCB6E` | Light warm tone                |
| 10      | Deep Magenta     | `#A55EEA` | Regal, pairs with violet       |

### UI Colors

| Role                  | Hex       | Usage                                        |
|-----------------------|-----------|----------------------------------------------|
| Background Dark       | `#0B0E17` | Page background (gradient start)             |
| Background Mid        | `#1A1E2E` | Page background (gradient end)               |
| Surface               | `#232840` | Cards, panels, modals                        |
| Surface Raised        | `#2D3250` | Elevated cards, hover states                 |
| Text Primary          | `#FFFFFF` | Headings, segment labels                     |
| Text Secondary        | `#A0A4B8` | Body text, descriptions                      |
| Text Muted            | `#6B7084` | Captions, disabled states                    |
| Accent Primary        | `#F4A236` | CTA buttons, highlights, spin button glow    |
| Accent Secondary      | `#2EC4B6` | Links, secondary actions, result highlights  |
| Success               | `#00B894` | Win state, confetti accent                   |
| Border Subtle         | `#2A2F45` | Dividers, card borders                       |
| Wheel Border          | `#F4A236` | Outer ring of the wheel                      |
| Center Button BG      | `#E63946` | Spin button resting state                    |
| Center Button Pressed | `#C62B38` | Spin button active/pressed state             |

---

## 2. Wheel Layout

### Wheel Dimensions

```
Mobile (< 768px):
  wheel diameter: min(calc(100vw - 48px), 400px)
  minimum: 300px
  padding around wheel: 24px each side

Tablet (768px - 1279px):
  wheel diameter: 420px

Desktop (>= 1280px):
  wheel diameter: 500px
```

### Wheel Structure

```
Outer ring:    8px solid #F4A236
               border-radius: 50%
               box-shadow: 0 0 30px rgba(244, 162, 54, 0.3),
                           inset 0 0 20px rgba(0, 0, 0, 0.4)

Tick marks:    24 small ticks around the outer edge
               width: 2px, height: 10px
               color: #FFFFFF at 40% opacity

Inner circle:  2px solid rgba(255, 255, 255, 0.1) at 90% of wheel radius
```

### 10 Segments

Each segment spans **36 degrees** (360 / 10).

| #  | Label              | Color     |
|----|--------------------|-----------|
| 1  | Grand Prize        | `#E63946` |
| 2  | $500               | `#F4A236` |
| 3  | Mystery Box        | `#2EC4B6` |
| 4  | Bonus Spin         | `#7B2FBE` |
| 5  | Free Pizza         | `#E84393` |
| 6  | $1,000             | `#00B894` |
| 7  | Try Again          | `#FF6B6B` |
| 8  | $250               | `#3867D6` |
| 9  | Jackpot            | `#FDCB6E` |
| 10 | Double Down        | `#A55EEA` |

Segment labels include emoji prefixes for visual flair. Full display strings:

```
"🎉 Grand Prize"
"💰 $500"
"🎁 Mystery Box"
"⭐ Bonus Spin"
"🍕 Free Pizza"
"💵 $1,000"
"🔄 Try Again"
"💎 $250"
"🏆 Jackpot"
"✨ Double Down"
```

### Center Button

```css
.spin-button {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 35%, #FF5E6A, #E63946 50%, #C62B38);
  border: 4px solid #FFFFFF;
  box-shadow:
    0 4px 15px rgba(230, 57, 70, 0.5),
    0 6px 0 #A01D28,              /* 3D depth base */
    inset 0 -2px 4px rgba(0, 0, 0, 0.3),
    inset 0 2px 4px rgba(255, 255, 255, 0.2);
  color: #FFFFFF;
  font-family: 'Inter', 'Segoe UI', sans-serif;
  font-size: 18px;
  font-weight: 800;
  letter-spacing: 2px;
  text-transform: uppercase;
  cursor: pointer;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: transform 0.1s ease, box-shadow 0.1s ease;
  z-index: 10;
}

.spin-button:hover {
  box-shadow:
    0 4px 20px rgba(230, 57, 70, 0.7),
    0 6px 0 #A01D28,
    inset 0 -2px 4px rgba(0, 0, 0, 0.3),
    inset 0 2px 4px rgba(255, 255, 255, 0.2);
}

.spin-button:active,
.spin-button.pressed {
  transform: translate(-50%, -50%) scale(0.92) translateY(3px);
  box-shadow:
    0 2px 8px rgba(230, 57, 70, 0.4),
    0 2px 0 #A01D28,              /* reduced depth on press */
    inset 0 2px 6px rgba(0, 0, 0, 0.4);
  transition: transform 0.08s ease-in, box-shadow 0.08s ease-in;
}

.spin-button.spring-back {
  transform: translate(-50%, -50%) scale(1.04);
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

Desktop button size: `80px x 80px`
Mobile button size: `64px x 64px`

### Pointer / Arrow

Position: top-center, pointing downward into the wheel.

```css
.wheel-pointer {
  position: absolute;
  top: -14px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 18px solid transparent;
  border-right: 18px solid transparent;
  border-top: 30px solid #F4A236;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.4));
  z-index: 20;
}

/* Inner highlight for 3D effect */
.wheel-pointer::after {
  content: '';
  position: absolute;
  top: -28px;
  left: -10px;
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 20px solid #FDCB6E;
  opacity: 0.5;
}
```

---

## 3. Typography

### Font Stack

```css
:root {
  --font-display: 'Fredoka One', 'Baloo 2', cursive;
  --font-body: 'Inter', 'Segoe UI', -apple-system, sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', monospace;
}
```

**Required Google Fonts import:**
```
Fredoka One (400)
Inter (400, 600, 700, 800)
```

### Title

```css
.game-title {
  font-family: var(--font-display);
  font-size: 48px;               /* desktop */
  font-weight: 400;              /* Fredoka One only has 400 */
  color: #FFFFFF;
  text-align: center;
  text-shadow:
    0 2px 4px rgba(0, 0, 0, 0.5),
    0 0 40px rgba(244, 162, 54, 0.3);
  letter-spacing: 1px;
  margin-bottom: 32px;
}

/* Tablet */
@media (max-width: 1279px) {
  .game-title { font-size: 40px; }
}

/* Mobile */
@media (max-width: 767px) {
  .game-title { font-size: 28px; margin-bottom: 20px; }
}
```

### Segment Text

```css
.segment-text {
  font-family: var(--font-body);
  font-size: 14px;               /* desktop, scale down for mobile */
  font-weight: 700;
  fill: #FFFFFF;                  /* SVG text fill */
  color: #FFFFFF;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.6);
  /* For SVG: use filter instead of text-shadow */
  /* filter: drop-shadow(0 1px 3px rgba(0, 0, 0, 0.6)); */
  text-anchor: middle;
  dominant-baseline: middle;
  pointer-events: none;
}
```

**Rotation:** Each label is rotated to align along the bisecting angle of its segment. For segment `i` (0-indexed):

```
rotation = (i * 36) + 18 degrees   /* 36° per segment, +18° to center */
text positioned at ~65% of radius from center
```

### Result Text

```css
.result-text {
  font-family: var(--font-display);
  font-size: 36px;
  color: #F4A236;
  text-align: center;
  text-shadow: 0 0 20px rgba(244, 162, 54, 0.5);
  opacity: 0;
  transform: scale(0.5) translateY(20px);
}

.result-text.reveal {
  animation: resultReveal 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

@keyframes resultReveal {
  0% {
    opacity: 0;
    transform: scale(0.5) translateY(20px);
  }
  60% {
    opacity: 1;
    transform: scale(1.1) translateY(-4px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}
```

Mobile result text size: `24px`

---

## 4. Animations

### Spin Animation

The wheel spins via CSS `transform: rotate()` applied dynamically with JavaScript calculating the target angle.

```css
.wheel.spinning {
  transition: transform 5s cubic-bezier(0.17, 0.67, 0.12, 0.99);
}
```

**Easing curve breakdown:**

| Property    | Value  | Purpose                                     |
|-------------|--------|---------------------------------------------|
| x1          | 0.17   | Fast initial acceleration                   |
| y1          | 0.67   | Strong momentum buildup                     |
| x2          | 0.12   | Very early deceleration start               |
| y2          | 0.99   | Near-complete stop (realistic friction)      |

**Full easing:** `cubic-bezier(0.17, 0.67, 0.12, 0.99)`

**Duration:** `5s` (within the 4-6s range; feels natural)

**Rotation:** Always spin a minimum of `5 * 360 = 1800` degrees plus the target segment angle. This ensures several full rotations before landing.

```javascript
// Pseudocode for spin target
const extraRotations = 5 * 360;  // 5 full spins minimum
const segmentAngle = targetSegmentIndex * 36;
const offset = Math.random() * 30 + 3; // land somewhere within the segment (3-33 deg)
const totalRotation = extraRotations + (360 - segmentAngle) + offset;
// Apply: wheel.style.transform = `rotate(${totalRotation}deg)`;
```

### Tick Sound Simulation (optional CSS approach)

A subtle bounce can be added near the end of the spin to simulate the flapper hitting pegs:

```css
@keyframes wheelTickBounce {
  0%, 100% { transform: rotate(var(--final-angle)); }
  25%      { transform: rotate(calc(var(--final-angle) + 1.5deg)); }
  50%      { transform: rotate(calc(var(--final-angle) - 1deg)); }
  75%      { transform: rotate(calc(var(--final-angle) + 0.5deg)); }
}

.wheel.settling {
  animation: wheelTickBounce 0.4s ease-out;
}
```

### Winning Segment Glow / Pulse

Triggered after the wheel stops. The winning segment gets a pulsing highlight.

```css
@keyframes winGlow {
  0%, 100% {
    filter: brightness(1) drop-shadow(0 0 0px transparent);
  }
  50% {
    filter: brightness(1.3) drop-shadow(0 0 20px rgba(244, 162, 54, 0.8));
  }
}

.segment.winner {
  animation: winGlow 1s ease-in-out 3;  /* pulse 3 times */
}
```

Alternatively, overlay a highlight on the winning segment:

```css
.segment-highlight {
  fill: rgba(255, 255, 255, 0.25);
  opacity: 0;
}

.segment-highlight.active {
  animation: segmentPulse 0.8s ease-in-out 3;
}

@keyframes segmentPulse {
  0%, 100% { opacity: 0; }
  50%      { opacity: 1; }
}
```

### Confetti on Win

Use a lightweight confetti library (e.g., `canvas-confetti`) or a custom CSS implementation.

**Confetti specs:**

```
Particle count:    80-120
Colors:            ['#E63946', '#F4A236', '#2EC4B6', '#7B2FBE', '#FDCB6E', '#FFFFFF']
Spread:            70 degrees
Origin:            { x: 0.5, y: 0.4 }  (center of wheel area)
Particle shapes:   mix of squares and circles
Duration:          2.5 seconds
Gravity:           1.2
Drift:             slight random (-0.5 to 0.5)
```

**canvas-confetti call (if using the library):**

```javascript
confetti({
  particleCount: 100,
  spread: 70,
  origin: { x: 0.5, y: 0.4 },
  colors: ['#E63946', '#F4A236', '#2EC4B6', '#7B2FBE', '#FDCB6E', '#FFFFFF'],
  gravity: 1.2,
  scalar: 1.1,
  drift: 0,
  ticks: 150
});
```

Trigger confetti **0.3s after** the wheel stops (let the glow start first).

### Center Button Press & Spring Back

```css
/* Press down */
.spin-button:active {
  transform: translate(-50%, -50%) scale(0.92) translateY(3px);
  transition: transform 0.08s ease-in, box-shadow 0.08s ease-in;
}

/* Spring back after release */
.spin-button {
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1),
              box-shadow 0.2s ease-out;
}
```

**Spring-back easing:** `cubic-bezier(0.34, 1.56, 0.64, 1)`
- Overshoots slightly past `scale(1)` to ~`scale(1.04)` then settles.
- Duration: `0.4s`

---

## 5. Responsive Breakpoints

### Mobile — 375px (up to 767px)

```css
@media (max-width: 767px) {
  .game-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 16px 24px;
    gap: 24px;
  }

  .wheel-wrapper {
    width: min(calc(100vw - 48px), 400px);
    min-width: 300px;
    aspect-ratio: 1 / 1;
  }

  .result-panel {
    width: 100%;
    text-align: center;
    padding: 20px 16px;
    background: #232840;
    border-radius: 16px;
  }

  .game-title {
    font-size: 28px;
  }

  .spin-button {
    width: 64px;
    height: 64px;
    font-size: 14px;
  }

  .segment-text {
    font-size: 11px;
  }

  .decorative-elements {
    display: none;  /* hide extra decorations on mobile */
  }
}
```

### Tablet — 768px (768px to 1279px)

```css
@media (min-width: 768px) and (max-width: 1279px) {
  .game-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 32px;
    gap: 40px;
    max-width: 900px;
    margin: 0 auto;
  }

  .wheel-wrapper {
    width: 420px;
    flex-shrink: 0;
  }

  .result-panel {
    flex: 1;
    max-width: 340px;
    padding: 32px 24px;
    background: #232840;
    border-radius: 20px;
    border: 1px solid #2A2F45;
  }

  .game-title {
    font-size: 40px;
  }

  .spin-button {
    width: 74px;
    height: 74px;
    font-size: 16px;
  }

  .segment-text {
    font-size: 13px;
  }
}
```

### Desktop — 1280px+

```css
@media (min-width: 1280px) {
  .game-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 48px;
    gap: 60px;
    max-width: 1200px;
    margin: 0 auto;
  }

  .wheel-wrapper {
    width: 500px;
    flex-shrink: 0;
  }

  .result-panel {
    flex: 1;
    max-width: 400px;
    padding: 40px 32px;
    background: #232840;
    border-radius: 24px;
    border: 1px solid #2A2F45;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  }

  .game-title {
    font-size: 48px;
  }

  .spin-button {
    width: 80px;
    height: 80px;
    font-size: 18px;
  }

  .segment-text {
    font-size: 14px;
  }

  .decorative-elements {
    display: block;  /* show decorative stars/sparkles */
  }
}
```

---

## 6. Background

### Dark Gradient

```css
body {
  background: linear-gradient(170deg, #0B0E17 0%, #1A1E2E 50%, #12152B 100%);
  min-height: 100vh;
  overflow-x: hidden;
  position: relative;
}
```

### Particle / Star Effect

Render a subtle star field using CSS pseudo-elements or a lightweight canvas. Two layers for depth (parallax feel).

**CSS approach (no JS required):**

```css
body::before,
body::after {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
}

/* Layer 1: Small, dim stars */
body::before {
  background-image:
    radial-gradient(1px 1px at 10% 20%, rgba(255, 255, 255, 0.4), transparent),
    radial-gradient(1px 1px at 25% 60%, rgba(255, 255, 255, 0.3), transparent),
    radial-gradient(1px 1px at 40% 15%, rgba(255, 255, 255, 0.5), transparent),
    radial-gradient(1px 1px at 55% 80%, rgba(255, 255, 255, 0.3), transparent),
    radial-gradient(1px 1px at 70% 35%, rgba(255, 255, 255, 0.4), transparent),
    radial-gradient(1px 1px at 85% 70%, rgba(255, 255, 255, 0.3), transparent),
    radial-gradient(1px 1px at 15% 90%, rgba(255, 255, 255, 0.5), transparent),
    radial-gradient(1px 1px at 60% 45%, rgba(255, 255, 255, 0.35), transparent),
    radial-gradient(1px 1px at 90% 10%, rgba(255, 255, 255, 0.4), transparent),
    radial-gradient(1px 1px at 35% 75%, rgba(255, 255, 255, 0.3), transparent);
  animation: starDrift 60s linear infinite;
}

/* Layer 2: Larger, brighter accent stars */
body::after {
  background-image:
    radial-gradient(2px 2px at 20% 30%, rgba(244, 162, 54, 0.5), transparent),
    radial-gradient(2px 2px at 50% 70%, rgba(46, 196, 182, 0.4), transparent),
    radial-gradient(2px 2px at 80% 20%, rgba(253, 203, 110, 0.5), transparent),
    radial-gradient(2px 2px at 35% 55%, rgba(255, 255, 255, 0.6), transparent),
    radial-gradient(2px 2px at 65% 85%, rgba(165, 94, 234, 0.4), transparent);
  animation: starDrift 90s linear infinite reverse;
}

@keyframes starDrift {
  0%   { transform: translateY(0); }
  100% { transform: translateY(-30px); }
}
```

**Twinkling effect for accent stars:**

```css
@keyframes twinkle {
  0%, 100% { opacity: 0.3; }
  50%      { opacity: 1; }
}

/* Apply to individual star elements if using DOM-based stars */
.star {
  animation: twinkle 3s ease-in-out infinite;
}
.star:nth-child(odd)  { animation-delay: 0s; animation-duration: 2.5s; }
.star:nth-child(even) { animation-delay: 1.2s; animation-duration: 3.5s; }
```

---

## 7. Component Hierarchy & Spacing

```
body
  .game-page
    .stars-layer              (fixed, z-index: 0)
    .game-title               (z-index: 1)
    .game-container           (z-index: 1)
      .wheel-section
        .wheel-wrapper        (position: relative)
          .wheel-pointer
          .wheel              (SVG or canvas)
            .segment * 10
            .segment-text * 10
          .spin-button
      .result-panel
        .result-label         ("You won!")
        .result-text          (prize name, animated)
        .spin-history         (optional: last 5 results)
    .decorative-elements      (desktop only, z-index: 0)
```

### Spacing Tokens

```css
:root {
  --space-xs:   4px;
  --space-sm:   8px;
  --space-md:   16px;
  --space-lg:   24px;
  --space-xl:   32px;
  --space-2xl:  48px;
  --space-3xl:  64px;

  --radius-sm:  8px;
  --radius-md:  16px;
  --radius-lg:  24px;
  --radius-full: 9999px;
}
```

---

## 8. Interaction States Summary

| Element       | Default                   | Hover                          | Active / Pressed              | Disabled                    |
|---------------|---------------------------|--------------------------------|-------------------------------|-----------------------------|
| Spin Button   | Red gradient, 3D shadow   | Brighter glow shadow           | Scale 0.92, reduced shadow    | Opacity 0.5, cursor default |
| Wheel         | Static at last angle      | n/a                            | Spinning (transition)         | n/a                         |
| Pointer       | Static, gold triangle     | n/a                            | n/a                           | n/a                         |
| Result Panel  | Hidden or previous result | n/a                            | Animated reveal               | n/a                         |
| Segments      | Normal color              | n/a                            | n/a                           | Winner: glow pulse          |

---

## 9. Asset Checklist for Dev-1

- [ ] Google Fonts loaded: `Fredoka One`, `Inter`
- [ ] SVG wheel with 10 segments (or canvas-based rendering)
- [ ] CSS custom properties set from this spec
- [ ] `canvas-confetti` library (or equivalent) for win celebration
- [ ] Pointer SVG or CSS triangle
- [ ] Spin logic: random target segment, rotation calculation, easing
- [ ] Responsive layout tested at 375px, 768px, 1280px
- [ ] Star/particle background (CSS or lightweight canvas)
- [ ] Button press/spring-back transition
- [ ] Result reveal animation
- [ ] Winning segment glow (3 pulses)

---

*End of spec. All values are implementation-ready. No guessing required.*
