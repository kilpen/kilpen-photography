# KilPen Photography — kilpen.photography

Static, tech-forward site for KilPen's photography vertical: the **360° photo booth**
(events across Hawaii). Hand-built (no framework), deployed to GitHub Pages.

> **2026-08:** scaled back from the original dual-service layout (360 + drone aerial)
> to a single-purpose 360° photo booth site. The gateway landing and `/drone/` page
> were retired; `/360/` and `/drone/` now redirect to the root.

## Structure

```
index.html               The 360° photo booth page (site root)
assets/css/booth.css     Page styling — brand tokens at top
assets/js/booth.js       Interactions (reveal-on-scroll, counters, nav) — zero dependencies
360/index.html           Redirect stub → /   (preserves previously shared links)
drone/index.html         Redirect stub → /   (drone vertical retired)
docs/website-spec.md     Full specification (local only, not deployed)
CNAME                    kilpen.photography
.github/workflows/       GitHub Pages deploy (push to main)
```

## Local preview

```
python3 -m http.server 8749
# open http://localhost:8749
```

## Notes

- Brand tokens (from kilpen.com): charcoal `#121212`, crimson `#a32424`, flame `#e25444`.
  Fonts: Sora + Inter + Space Mono (telemetry accents).
- Instagram: [@kilpen_photography](https://www.instagram.com/kilpen_photography/) — note
  the underscore in the handle.
- The quote form is not yet wired to an endpoint (`[CONFIG]` comment in `index.html`);
  reel tiles, stats and testimonials are placeholders marked `[CONFIRM]`.
- Text legibility never depends on animation state; reduced-motion is respected.
