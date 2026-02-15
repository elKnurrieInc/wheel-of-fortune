# Wheel of Fortune v2 — Design Spec

## Overview
A premium, visually impressive Wheel of Fortune game with rich colors, smooth animations, and celebration effects.

## Color Palette

### Primary Colors
- **Background Dark:** `#0a0a1a` (deep navy)
- **Background Gradient:** `#0a0a1a` → `#1a1a3a` → `#0f0f2a`
- **Accent Gold:** `#ffd700`
- **Accent Red:** `#ff4757`
- **Accent Teal:** `#2ed573`

### Wheel Segment Colors (8 segments, alternating)
1. `#ff4757` (coral red)
2. `#ffa502` (orange)
3. `#2ed573` (green)
4. `#1e90ff` (blue)
5. `#ff4757` (coral red)
6. `#ffa502` (orange)
7. `#2ed573` (green)
8. `#1e90ff` (blue)

### Text & UI
- **Primary Text:** `#ffffff`
- **Secondary Text:** `#b8b8d1`
- **Button Gradient:** `#ffd700` → `#ffaa00`
- **Button Shadow:** `rgba(255, 215, 0, 0.4)`

## Layout

### Wheel
- **Size:** 500px desktop, 320px mobile
- **Border:** 8px solid `#ffd700` (gold)
- **Outer Glow:** `0 0 40px rgba(255, 215, 0, 0.3)`
- **Segments:** 8 equal segments with prize text
- **Center:** 80px diameter button with 3D effect

### Pointer
- **Position:** Top center
- **Shape:** Triangle pointing down
- **Color:** `#ffd700` (gold)
- **Shadow:** `0 4px 12px rgba(0, 0, 0, 0.5)`

### Background
- **Type:** Animated gradient with subtle particles
- **Overlay:** Subtle noise texture at 3% opacity

## Typography
- **Font Family:** "Outfit" (Google Fonts)
- **Title:** 48px, 800 weight, gradient text
- **Prize Text:** 14px, 600 weight, white with shadow
- **Button:** 18px, 800 weight, uppercase

## Animations

### Spin
- **Duration:** 5 seconds
- **Easing:** `cubic-bezier(0.17, 0.67, 0.12, 0.99)` (realistic deceleration)
- **Sound:** Tick sound every ~100ms during spin

### Win Celebration
- **Confetti:** canvas-confetti library
- **Colors:** Match segment colors
- **Duration:** 3 seconds
- **Sound:** Victory chime (optional)

### Hover Effects
- **Button:** Scale 1.05, increased glow
- **Wheel:** Subtle shadow pulse

## Responsive Breakpoints
- **Desktop:** > 768px — 500px wheel
- **Mobile:** ≤ 768px — 320px wheel, adjusted text

## Technical
- **Stack:** Plain HTML/CSS/JS (fastest)
- **Confetti:** canvas-confetti npm package
- **Font:** Google Fonts (Outfit)

## Acceptance Criteria
1. Wheel displays 8 colorful segments
2. Click/tap spins with realistic deceleration
3. Prize determined by pointer position at stop
4. Win triggers confetti celebration
5. Responsive on mobile (320px) to desktop (1920px)
6. Smooth 60fps animations
7. Premium, non-flat appearance
