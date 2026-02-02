
Goal
- Fix “Page won’t scroll” on Desktop Chrome/Edge (preview + published) without breaking the existing mobile viewport work.

What I found (most likely causes)
- There is an aggressive inline “critical CSS” rule in `index.html` that applies `transform: translateZ(0)` to every element (`*`). On desktop this can break/disable normal page scrolling and create massive compositing/stacking-context side effects.
- The app root wrapper (`src/components/ResponsiveWrapper.tsx`) applies `transform: translateZ(0)` at the top-level container as well.
- Root-level scroll behavior is also constrained by global overscroll settings (mostly intended for mobile), and the desktop wrapper does not explicitly declare a vertical overflow strategy.

Plan (implementation steps)
1) Make desktop scrolling explicit in the app wrapper (safe, targeted)
   - File: `src/components/ResponsiveWrapper.tsx`
   - Update `getPlatformStyles()` “Desktop optimizations” return object to explicitly allow vertical scrolling and avoid scroll trapping:
     - Add `overflowY: "auto"` (or `"visible"` depending on existing layout needs; start with `"auto"`).
     - Ensure we do not set any fixed `height` on desktop (keep `minHeight` only).
   - Remove or gate the wrapper-level `transform: "translateZ(0)"` so it only applies where needed:
     - Option A (preferred): remove `transform` from `baseStyles` entirely for desktop.
     - Option B: apply `transform` only on mobile/tablet and/or only on specific animated elements, not the whole site container.

2) Remove the global “transform on every element” rule (this is the biggest red flag)
   - File: `index.html` (inline `<style>` block)
   - Change:
     - Remove:
       - `* { transform: translateZ(0); }`
     - Replace with a safer, scoped optimization:
       - Only apply GPU hints to specific known animated elements (e.g., `.animate-*`, `.hero-gradient-bg::before`, etc.), or
       - Apply to mobile only using media queries like:
         - `@media (hover: none) and (pointer: coarse) { ... }`
   - Reason: global `transform` on all nodes commonly breaks scrolling/positioning on desktop and is not a recommended performance optimization anymore.

3) Adjust overscroll behavior so desktop uses default browser scrolling
   - Files: `index.html` (inline critical CSS) and `src/index.css`
   - Keep `overscroll-behavior: contain` for mobile if you want it, but avoid applying it universally to `html, body` for desktop.
   - Implement by scoping overscroll rules:
     - In `src/index.css`, add/adjust selectors so “contain” applies only when `.platform-mobile` / `.platform-tablet` is present.
     - Ensure `html, body` on desktop have normal scrolling (no restrictive overscroll settings).

4) Verify no CSS is forcing a non-scrollable root
   - File: `src/index.css`
   - Confirm `html`, `body`, and `#root` do not end up with `overflow: hidden` (directly or via class combinations).
   - If needed, add a defensive rule:
     - `html, body { overflow-y: auto; }`
     - Keep `overflow-x: hidden` if desired.

5) Validation checklist (quick)
   - Desktop (Chrome + Edge):
     - Mouse wheel scroll works on `/` from Hero down to Footer.
     - Trackpad scroll works.
     - Scrollbar appears when content exceeds viewport.
     - Clicking “View My Work” and nav anchors still scrolls to sections.
   - Mobile sanity check:
     - iOS Safari and Android Chrome still scroll.
     - No “rubber band” issues or keyboard layout regressions.

Files expected to change
- `src/components/ResponsiveWrapper.tsx`
- `index.html`
- `src/index.css` (small scoping/defensive overflow adjustments)

Why this should fix it
- Removing the global `* { transform: translateZ(0) }` eliminates a known class of “page won’t scroll” failures on desktop.
- Ensuring the top-level wrapper doesn’t create unintended stacking contexts and explicitly supports vertical overflow prevents scroll trapping regardless of browser quirks.
