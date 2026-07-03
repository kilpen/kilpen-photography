# KilPen Photography — kilpen.photography

Static, tech-forward site for KilPen's photography vertical: **360° photo booth** (event)
and **drone aerial** photography. Hand-built (no framework), deployed to GitHub Pages.

## Status

- ✅ **Gateway landing page** (`index.html`) — the split "choose your service" experience
  with a live Canvas motion engine (orbit reticle for 360, flight-path + perspective grid
  + HUD telemetry for drone), hover-expand, magnetic CTAs, mobile stacking, and a
  `prefers-reduced-motion` static fallback. **Prototype complete.**
- 🚧 `/360/` and `/drone/` — placeholder stubs; full pages to be built per the spec.

## Structure

```
index.html              Gateway landing (centerpiece)
assets/css/gateway.css   Gateway styling — brand tokens at top
assets/js/gateway.js     Canvas motion engine + interactions (zero dependencies)
360/index.html           360° photo booth (stub → build per spec §5)
drone/index.html         Drone aerial (stub → build per spec §6)
docs/website-spec.md     Full specification (v2)
CNAME                    kilpen.photography
.github/workflows/       GitHub Pages deploy (push to main)
```

## Local preview

```
python3 -m http.server 8749
# open http://localhost:8749
```

Brand tokens (from kilpen.com): charcoal `#121212`, crimson `#a32424`, flame `#e25444`,
drone-side sky-cyan `#38bdf8`. Fonts: Sora + Inter + Space Mono (telemetry).

## Design notes

- The motion engine is one hand-written Canvas 2D loop with two scene configs. It pauses
  when the tab is hidden, scales particle counts to screen size/DPR, and renders a single
  static frame under reduced-motion.
- Text legibility never depends on animation state (entrance animates transform only).
- No third-party JS/CDN for motion — GSAP is an option later but not required.
