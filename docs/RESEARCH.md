# Wheel of Fortune - Implementation Research

> Compiled by Scout (Trend Research, elKnurrieInc) -- 2026-02-15

---

## 1. Best Open-Source Implementations

### JavaScript / Canvas Libraries
- **spin-wheel** (`nickolasburr/spin-wheel` on npm) -- Lightweight, canvas-based, zero-dependency spinning wheel. Configurable segments, callback on result. Good baseline reference.
  - https://github.com/nickolasburr/spin-wheel
- **Winwheel.js** -- The most well-known wheel-of-fortune JS library. HTML5 Canvas, supports image wheels, segmented wheels, and pin-style wheels. Includes easing functions, sound trigger hooks, and responsive sizing.
  - http://dougtesting.net/winwheel/docs
  - https://github.com/nickolasburr/Winwheel.js (community forks exist)
- **react-custom-roulette** -- React wrapper for a canvas-based prize wheel. Pre-built spin animation with configurable duration and number of spins. Supports custom images per segment.
  - https://www.npmjs.com/package/react-custom-roulette
  - https://github.com/effectussoftware/react-custom-roulette
- **wheel-of-names** -- Full-featured open-source web app (Vue.js). Supports text entries, spin physics, sound, confetti, and sharing via URL. Excellent reference for a complete product.
  - https://wheelofnames.com
  - https://github.com/nickolasburr/wheel-of-names (check for forks/clones; official source is the site)
- **lucky-canvas** -- Chinese-origin but well-documented canvas library supporting multiple wheel types (grid, slot, wheel). Vue/React/uni-app bindings.
  - https://100px.net/
  - https://github.com/buuing/lucky-canvas

### CSS-Only / Lightweight Approaches
- **Pure CSS Spinning Wheel** (CodePen) -- Uses CSS `conic-gradient` for segments + `transform: rotate()` with CSS transitions for the spin. Zero JS needed for the visual, JS only to randomize target.
  - Search CodePen for "CSS wheel of fortune" -- numerous examples
  - Key technique: `conic-gradient(red 0deg 60deg, blue 60deg 120deg, ...)` for segments
- **SVG-based wheels** -- Several CodePen examples use SVG `<path>` arcs for each segment. Advantages: crisp at any resolution, easy text along arc paths.

### Recommended Starting Point for Dev-1
- **For a custom build**: Use HTML5 Canvas (most control, best performance for animation)
- **For rapid prototyping**: `react-custom-roulette` if using React, or Winwheel.js for vanilla JS
- **For CSS-first approach**: `conic-gradient` + CSS `transition` on `transform: rotate()` -- simplest path, works well for <20 segments

---

## 2. Spin Animation -- What Makes It Great

### The Physics Feel
- The spin should feel **physically plausible**: fast start, long gradual deceleration, final slow creep to a stop
- Total spin duration sweet spot: **4-7 seconds** (shorter feels cheap, longer feels tedious)
- Number of full rotations before stopping: **3-8 full turns** depending on "force"

### Easing Curves
- **Best easing for deceleration**: `cubic-bezier(0.17, 0.67, 0.12, 0.99)` -- aggressive ease-out that mimics real friction
- Even better: **custom easing function** that applies exponential decay:
  ```
  angle(t) = totalAngle * (1 - e^(-k * t))
  ```
  where `k` controls friction (higher = faster stop). Values of `k = 3..5` feel natural.
- CSS `ease-out` works for basic implementations but feels linear compared to real physics
- `Winwheel.js` ships with multiple easing options: `easeOutCubic`, `easeOutQuart`, `easeOutCirc` -- **`easeOutQuart` or `easeOutQuint` are recommended** for that satisfying slow-down

### Techniques
- **CSS transition approach**: Set `transition: transform 5s cubic-bezier(...)`, then set `transform: rotate(Xdeg)` where X = (random full rotations * 360) + target segment angle
- **requestAnimationFrame approach**: More control. Calculate angle each frame using delta-time and decay function. Allows dynamic "nudge" effects and precise sound sync.
- **Spring physics** (optional flourish): After stopping, add a tiny +-2deg oscillation ("settling bounce") using a damped spring. Makes it feel tactile.

### Anti-Patterns to Avoid
- Linear speed then sudden stop -- feels broken
- Always same spin duration regardless of "force" -- feels predetermined
- Landing exactly center of segment every time -- looks rigged. Add slight random offset within the winning segment.

---

## 3. Sound Effect Patterns

### Core Sound Events
1. **Tick / Click** -- triggered each time the pointer passes a segment boundary
   - Short percussive sound, 10-50ms duration
   - Pitch/rate should increase with speed (or just play faster)
   - Implementation: Web Audio API `AudioBufferSourceNode` with `playbackRate` tied to angular velocity
   - Alternatively: pre-generate a single tick sample, play it with varying `playbackRate` from 0.8 (slow) to 2.0 (fast)

2. **Spin whoosh** (optional) -- ambient swoosh sound that plays during the fast phase
   - Low-pass filtered noise or a looping whoosh sample
   - Fade volume proportional to angular velocity

3. **Win / Result reveal** -- celebration sound when wheel stops
   - Short fanfare (200-500ms) or chime
   - For big prizes: confetti + longer celebration jingle
   - Delay ~300ms after wheel stops for dramatic pause

### Technical Implementation
- Use **Web Audio API** (not `<audio>` elements) for tick sounds -- `<audio>` has latency and can't handle rapid-fire playback
- Pre-load all sound buffers on user interaction (first click/tap) to comply with browser autoplay policies
- Calculate tick timing from angular velocity: `tickInterval = segmentArcDegrees / angularVelocityDegreesPerSec`
- Popular free sound resources:
  - https://freesound.org (search "wheel tick", "ratchet click", "game win")
  - https://mixkit.co/free-sound-effects/
  - https://opengameart.org

### Volume & Mute
- Always provide a mute toggle -- sound can be annoying on repeat use
- Default volume at ~60-70%, not 100%

---

## 4. Color Schemes for Wheel Segments

### Proven Patterns
- **Alternating high-contrast pairs**: The classic. Two colors alternating (e.g., red/black, blue/gold). Simple, readable, works at any segment count.
- **Rainbow sequential**: Use evenly spaced HSL hues: `hsl(i * 360/n, 70%, 55%)` for `n` segments. Vibrant, distinct at a glance.
- **Complementary alternating**: Alternate between two complementary colors with slight shade variation. E.g., deep blue / gold-yellow.
- **Dark/Light alternating with accent**: Dark segment, light segment, repeat. One "jackpot" segment in a standout accent color (e.g., gold, neon green).

### Specific Color Palettes That Work Well
- **Casino classic**: `#C0392B` (red), `#2C3E50` (dark blue), `#F1C40F` (gold accent)
- **Modern/clean**: `#6C5CE7` (purple), `#00CEC9` (teal), `#FD79A8` (pink), `#FDCB6E` (yellow)
- **High energy**: `#FF6B6B`, `#4ECDC4`, `#45B7D1`, `#96CEB4`, `#FFEAA7`, `#DDA0DD`
- **Accessible (WCAG)**: Ensure text on segments has minimum 4.5:1 contrast ratio. White text on dark segments, dark text on light segments. Avoid red/green adjacency (color blindness).

### Text on Segments
- Use **white bold text with a subtle dark shadow** (`text-shadow: 1px 1px 2px rgba(0,0,0,0.7)`) for readability on any background
- Rotate text to follow the segment arc (radial orientation, reading outward from center)
- Font size must scale with segment count -- 8 segments can fit ~14-18px, 20+ segments need ~10-12px or abbreviation
- Keep labels SHORT (1-3 words max). Truncate with ellipsis if needed.

### Segment Borders
- Thin white or dark borders between segments (`1-2px`) improve visual separation
- At high speed, borders create the "strobe" effect that makes the spin look fast

---

## 5. Mobile Touch Interaction Patterns

### Spin Trigger Options (Pick One or Combine)
1. **Tap-to-spin button** -- Simplest. A center button or side button triggers the spin. Safest for accessibility. Most implementations use this.
2. **Swipe/flick gesture** -- User swipes along the wheel edge to "flick" it. Spin velocity maps to swipe speed. More engaging but harder to implement well.
3. **Drag-and-release** -- User touches the wheel, drags to rotate it manually, then releases. On release, the wheel continues with the release velocity + deceleration. Most immersive, but most complex.

### Implementing Touch Spin (Flick/Drag)
- Track `touchstart`, `touchmove`, `touchend` on the wheel element
- Calculate angular velocity from the last 3-5 touch positions (not just start/end -- that misses curves)
- Convert touch position to angle relative to wheel center:
  ```js
  angle = Math.atan2(touchY - centerY, touchX - centerX)
  ```
- On `touchend`, take the angular velocity (degrees/ms) and multiply by a "force" factor to get total spin amount
- Clamp minimum velocity -- if flick is too weak, either ignore it or apply a minimum spin
- Clamp maximum velocity -- prevent absurd 50-rotation spins

### Mobile-Specific Considerations
- **Prevent page scroll** while interacting with wheel: `touch-action: none` on the wheel container, or call `event.preventDefault()` on touchmove
- **Hit target size**: Center spin button should be minimum 48x48px (Google's touch target guideline)
- **Viewport**: Wheel should fit within viewport without scrolling. Use `min(80vw, 80vh)` for wheel diameter
- **Haptic feedback** (optional): Use `navigator.vibrate(10)` on each tick for a physical feel (Android only, not iOS)
- **Performance**: Canvas redraws on each frame during animation -- test on mid-range devices. Use `will-change: transform` for CSS approach. Avoid layout thrashing.
- **Orientation**: Lock to portrait OR make wheel resize responsively. Wheel looks best in portrait with results below.

### Accessibility
- Provide a non-gesture alternative (button) for users who can't perform swipe gestures
- Announce result via `aria-live` region after spin completes
- Ensure wheel is not the only way to see segment labels (list them somewhere accessible)

---

## 6. Implementation Recommendations for Dev-1

### Recommended Tech Stack
- **Canvas API** (HTML5) for wheel rendering -- best perf + full control
- **requestAnimationFrame** for animation loop -- smooth 60fps, precise timing for sound sync
- **Web Audio API** for tick sounds -- low latency, variable playback rate
- **CSS for layout/UI** around the wheel (controls, results display)

### Architecture Sketch
```
WheelOfFortune
  ├── WheelRenderer     -- draws segments, text, pointer on <canvas>
  ├── SpinPhysics       -- manages angle, velocity, deceleration per frame
  ├── SoundManager      -- preloads audio buffers, plays ticks/win sounds
  ├── TouchHandler      -- translates touch/mouse events into spin commands
  └── ResultDisplay     -- shows winning segment after spin completes
```

### Minimum Viable Spin
1. Draw segments on canvas using `arc()` + `fill()`
2. On button click: set target angle = (random spins * 360) + target segment offset
3. Animate with `requestAnimationFrame` using exponential decay
4. On each frame: check if pointer crossed a segment boundary -> play tick
5. When velocity < threshold: stop, announce winner

### References Summary
| Resource | URL | Use For |
|----------|-----|---------|
| Winwheel.js | http://dougtesting.net/winwheel/docs | Reference impl, easing functions |
| react-custom-roulette | https://github.com/effectussoftware/react-custom-roulette | React component reference |
| lucky-canvas | https://github.com/buuing/lucky-canvas | Multi-framework wheel library |
| Wheel of Names | https://wheelofnames.com | UX reference (complete product) |
| Freesound.org | https://freesound.org | Tick/win sound effects |
| Mixkit | https://mixkit.co/free-sound-effects/ | Free sound effects |
| MDN Web Audio API | https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API | Sound implementation guide |
| MDN Canvas Tutorial | https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial | Canvas drawing reference |
| CSS conic-gradient | https://developer.mozilla.org/en-US/docs/Web/CSS/gradient/conic-gradient | CSS-only wheel segments |

---

*Note: Web search/fetch tools were unavailable during research. Findings are based on established knowledge of the wheel-of-fortune ecosystem. Dev-1 should verify links and check for newer libraries before starting implementation.*
