# KilPen Photography — Website Specification (v2)

**Domain:** https://kilpen.photography
**Vertical:** Tech-enabled photography — **360° photo booth** (event capture) + **drone aerial** photography & videography
**Parent:** KilPen Technical Services, LLC — Hawaii-based, veteran-founded, family-owned since 2016
**Hosting:** Static site on **GitHub Pages** (custom domain via CNAME)
**Status:** Spec v2 — *2026-07-02* — supersedes v1 (archived: `_archive-website-spec-v1-virtualtours.md`)
**Owner:** Christopher Furton

---

## 0. What changed from v1 (read this first)

The v1 draft framed "360°" as **real-estate virtual tours** (Matterport-style walkthroughs). This spec corrects course to the actual product: a **360° photo booth** — the event-based, motorized spin-arm booth that captures slow-motion 360° video "reels" guests share on social media (weddings, parties, corporate activations, nightclubs). That is a different business (events/entertainment, not real estate) with different buyers, content, and conversion patterns.

Also newly **decided** since v1 (previously open questions):

| v1 open question | Now decided |
|---|---|
| Brand & domain | **kilpen.photography** (standalone photography domain, sub-brand of KilPen) |
| Tech stack / hosting | **Hand-built static site on GitHub Pages** (see §11) |
| Services at launch | **Two:** 360° photo booth + drone aerial |
| Site concept | **Gateway landing page** → two paths (360 booth / drone), with an interactive motion graphic |

Real-estate 360 virtual tours are **not** dropped forever — they can return later as a drone-side or separate offering. Out of scope for this build.

---

## 1. Goals & success metrics

The site is the primary sales and credibility asset for the vertical. In priority order it must:

1. **Feel unmistakably high-tech** — the design itself is the proof that this is a *technology-advanced* photography company. Motion, dark cinematic UI, and HUD/instrument styling do this work.
2. **Route cleanly to the right path** — a visitor instantly understands there are two services and self-selects (360 booth vs. drone).
3. **Show the work** — immersive reels (360) and stunning aerials (drone) are the #1 conversion drivers.
4. **Capture the lead** — frictionless, date-aware quote requests on both paths.

### Success metrics
- Quote/contact conversion ≥ 4% of sessions.
- Gateway → path click-through (are people choosing a lane?).
- Media engagement (reel plays, portfolio hover-plays).
- Performance: **LCP < 2.5s** on every page despite heavy motion/media (motion must never be the LCP element — see §9/§13).

---

## 2. Brand system

Inherit the KilPen master brand and push it into a **darker, high-tech, instrument-panel** register. Exact tokens pulled from the live kilpen.com codebase (`assets/css/main.css`):

### Core palette (inherited — do not alter)
```
--char-950: #121212;   /* primary dark canvas            */
--char-900: #1b1b1b;
--char-800: #262626;
--red-600:  #a32424;   /* PRIMARY brand accent (crimson) */
--red-700:  #841c1c;   /* hover                          */
--red-100:  #f7e6e4;
--flame-500:#e25444;   /* bright accent / glow           */
--flame-600:#c0392b;
--stone-50: #f8f7f5;   /* light surfaces / near-white text */
--stone-100:#f0eeea;
--ink-900:  #191919;
--hero-grad: linear-gradient(155deg,#0e0e0e 0%,#211416 55%,#4d1717 100%);
--font-display: "Sora";   /* headings, HUD labels */
--font-body:    "Inter";  /* body */
```

### Extension for the photography vertical
This site runs **dark-first** (charcoal canvas), inverting the mostly-light parent. To give each path a distinct identity while staying on-brand, add **one cool secondary accent** reserved for the **drone/aerial** side (sky/telemetry cyan), keeping crimson as the master accent everywhere and the dominant color of the **360** side:

```
--sky-400: #38bdf8;    /* drone-side accent: HUD lines, telemetry, altitude readouts */
--cyan-300:#67e8f9;    /* drone glow highlight */
--glow-red: 0 0 24px rgba(226,84,68,.55);   /* 360 neon glow */
--glow-sky: 0 0 24px rgba(56,189,248,.45);  /* drone HUD glow */
```

**Rule of thumb:** crimson = the brand and the 360 booth's neon/nightlife energy; cyan = the drone's cool, precise, "flight-instrument" energy. Never let cyan out-weigh crimson globally — it's a sectional accent, not a co-primary.

**Typography:** Sora for display + all HUD/telemetry micro-labels (uppercase, wide tracking reads as "instrument"); Inter for body. Add a **monospace** (e.g. `"Space Mono"` / `ui-monospace`) *only* for numeric telemetry readouts (coordinates, altitude, timecodes) — reinforces the tech feel.

**Voice:** professional + Aloha, tech-forward. "Hawaii from every angle." Veteran-founded, detail-obsessed. On the 360 side the tone can loosen (fun, hype, social); on the drone side it goes spare and cinematic (few words, big imagery).

**Contrast/accessibility note:** crimson `#a32424` on charcoal is too low-contrast for body text — use it for accents, borders, glows, and large display type only; keep readable text near-white (`--stone-50`).

---

## 3. Information architecture / sitemap

```
kilpen.photography/
├── /                      ← GATEWAY landing (two paths + motion graphic)   ★ centerpiece
│
├── /360/                  ← 360° Photo Booth home
│   ├── what-is-360        (can be a section on /360 or its own page)
│   ├── /360/reels-tips    (guest guide: how to shoot great reels)  ← SEO + hype
│   └── /360/book          (date-aware quote form)  [or a section on /360]
│
├── /drone/                ← Drone Aerial home (conceptual, cinematic)
│   ├── /drone/work        (portfolio / reels, vertical-segmented)
│   └── /drone/inquire     (quote form)  [or a section on /drone]
│
├── /about                 (KilPen story, credentials, Part 107, insured, gear)
├── /contact               (unified fallback contact — both services)
└── /legal/                (privacy, terms, licensing & usage, drone/airspace notice)
```

**Navigation model:** the gateway (`/`) is deliberately chrome-light — no full nav, just the two paths + logo. Once inside a path, a persistent top nav appears scoped to that path, plus a small **"⇄ switch service"** control back to the gateway (so a visitor who picked wrong isn't trapped). Footer is shared across all inner pages: KilPen Photography brand, Part 107 + Insured badges, service area (islands), social, and a link back to **kilpen.com** (parent).

**Page-count reality:** this is a small site (1 gateway + 2 shallow service trees + about/contact/legal). That directly informs the tech recommendation in §11 (hand-build it; no CMS needed).

---

## 4. ★ The Gateway landing page (`/`) — the centerpiece

This is where "tech-advanced company" is won or lost. When a visitor lands on `kilpen.photography`, they see a **full-viewport, dark, split experience**: two paths, live motion, instrument styling.

### 4.1 Layout
- **Desktop:** 50/50 vertical split on charcoal. Left = **360° PHOTO BOOTH**, right = **DRONE AERIAL**. A glowing crimson **center seam** (thin animated scanline) unifies the two as one system.
- **Hover-expand:** hovering a half eases it to ~**68/32**, brightens its motion layer, and dims/desaturates the other (`filter: brightness()/saturate()` + `transform: scale()` — animate transform/opacity only). One-shot transition, not per-frame.
- **Each half contains:** a themed motion background (see 4.2), a Sora headline, a one-line descriptor, small HUD micro-labels, and a **magnetic CTA button** ("Enter →"). **The entire half is a clickable `<a>`** so touch and no-JS users can still choose.
- **Mobile / touch:** no hover. The split becomes **two stacked full-width panels** (~50svh each), each a tappable link with a lighter/static motion layer and a visible CTA. This is a first-class designed state, not an afterthought.

### 4.2 The interactive motion graphic (the "wow")
**Recommended approach — one hand-written Canvas 2D particle engine, two theme configs** (small, no heavy dependency, and the metaphor maps perfectly onto the two services):

- **360 side — orbit field:** particles **orbit a central reticle**, trailing slightly, like a booth arm sweeping around a subject. Crimson/flame palette with neon glow. A rotating reticle/ring sits at the center (echoes the spinning camera).
- **Drone side — flight field:** particles **drift along flight-path + topographic contour lines**; a "drone" dot traces a self-drawing path (`stroke-dashoffset` line-draw) across a faint **perspective grid** that scrolls toward the viewer (flying-over-terrain feel). Sky-cyan palette.
- **Shared HUD overlay (both sides):** faint SVG/CSS grid, corner brackets (`⌐ ¬`), a rotating reticle, and **live-looking telemetry readouts** in mono type (coordinates, "ALT 400 FT", "REC ●", timecode). This single move does most of the "advanced instrument" read for very little weight.
- **Center seam:** animated crimson scanline sweep + a few particles crossing between panels.

**Interactions layered on top (GSAP — now 100% free incl. all plugins as of 2025):**
- **Magnetic CTA buttons** — button follows a fraction of the cursor offset, springs back on leave (signature premium micro-interaction).
- **SplitText headline reveal** on load (characters/words stagger in).
- Optional **cursor-reactive parallax** — the active half's grid/particles shift subtly toward the cursor; the 360 reticle tracks the cursor.

**Simpler fallback (if time/perf/budget is tight):** replace Canvas with **CSS + animated SVG only** — a rotating conic-gradient reticle ring (360) and a self-drawing `stroke-dashoffset` flight path over a CSS-perspective grid (drone), plus a CSS scanline and glows. Hover-expand via a flex/width transition + class toggle, no JS animation lib. Visually 80% of the effect at a fraction of the effort.

### 4.3 Accessibility & performance (gateway)
- **`prefers-reduced-motion`:** Canvas/SVG-JS animations do **not** auto-respect the media query — check `matchMedia('(prefers-reduced-motion: reduce)')` in JS and render a **single static frame** (still gradient + HUD styling intact). Gate all CSS motion behind `@media (prefers-reduced-motion: no-preference)`. Listen for changes.
- **LCP:** the headline/CTA text must be the LCP element and paint immediately — **never** block it behind canvas init or video. Lazy-init the motion after first paint (`requestIdleCallback`/after `load`).
- **Pause when hidden/offscreen:** single `requestAnimationFrame` loop; pause on `visibilitychange` and when the canvas is offscreen (IntersectionObserver). Scale particle count to `devicePixelRatio`/screen size; cap or disable on low-power mobile.
- **Progressive enhancement:** the static split (two `<a>` panels + HUD CSS) must render and be fully usable with JS disabled. Motion is a layer on top.
- **Keyboard:** both paths are focusable links with visible focus states; center content reachable by Tab.

> **Design references gathered:** Codrops *Fullscreen Hover Loop* & *Split Layout*, Codrops/GSAP *Magnetic Buttons*, the marisabrantley `split-landing-page` reference impl, and Awwwards split-screen collections. (Full URL list retained in project notes.)

---

## 5. 360° Photo Booth path (`/360`)

Buyers here are booking an **event** (wedding, party, corporate activation, nightclub, mitzvah). Research across 12 vendor sites shows a near-universal content skeleton — we adopt it and beat the field on the weak spots (real reel embeds, transparent info, a concrete response promise, a genuinely tech-forward look).

### 5.1 `/360` page sections (in order)
1. **Hero** — autoplay muted **vertical (9:16) reel loop** behind a short punchy line + primary CTA **"Check My Date"** (date-availability framing converts better than generic "Contact"). Dark, neon-glow, nightlife energy.
2. **What is a 360° photo booth?** *(required by client; near-mandatory on every strong page)* — lead with the mechanic in plain language: *"Guests step onto a platform while a camera on a rotating arm spins around them, capturing cinematic slow-motion video from every angle."* Immediately contrast with a traditional booth (*"not stills — share-ready video"*), and use the dominant hook: *"every clip looks like a scene from a music video."* Resolve the "why call it a photo booth if it's video?" confusion explicitly.
3. **Why a 360 booth / four selling points** — *Interactive* (guests move, don't just pose), *Shareable* (built for Reels/TikTok), *Cinematic quality* (crisp slow-mo, pro capture), *Customizable* (branded overlays, theme match). Add spec reassurance for the technical buyer: 15–30s clips, HD/DSLR capture, 60–240fps slow motion, "on your phone in seconds."
4. **How it works** — numbered 3–5 steps: *step on → arm spins → slow-mo captured → branded/edited → shared instantly (QR/text/email).*
5. **What's included** — core package inclusions (attendant(s), props, custom overlay, instant sharing, online gallery, setup/teardown).
6. **Event types** — weddings, corporate/brand activations, parties, mitzvahs, nightclubs/venues — short blurb each (SEO + persona self-selection). Include a distinct **corporate/brand-activation** track that frames the booth as a **marketing tool**: branded overlays, UGC generation, "every guest becomes a brand ambassador," optional lead/data capture — this commands higher pricing.
7. **Reels gallery / "Booths in action"** *(required: Instagram embeds)* — see §5.2.
8. **Tips for great reels** — link/section to `/360/reels-tips` (§5.3). Doubles as SEO and pre-sells the experience.
9. **Add-ons** — the upsell menu (§5.4).
10. **Pricing signal** — recommend publishing **"starting at"** + 2 tiers (standard/premium) and stating **space requirement (min ~12×12 ft)** and **"no hidden fees"** upfront; most competitors hide pricing behind a form, so transparency is a differentiator and pre-qualifies leads. (Final call = open decision, §16.)
11. **Social proof** — reviews (Google/The Knot), event count, recognizable client/venue name-drops in gallery captions.
12. **FAQ** — cost, space needed, power requirements, delivery time, sharing, indoor/outdoor, travel/islands.
13. **Booking CTA block** — repeated "Check My Date" + the form (§8).

### 5.2 Instagram / reel embeds (client-required)
- Primary: **embedded Instagram feed** of real reels (freshness = social proof) **plus** a **vertical 9:16 reel grid** (3-across desktop, swipe on mobile).
- Host heavier sample reels on **Vimeo** (clean, no recommendations) with click-to-play; the hero uses a short autoplay muted loop.
- **Opportunity flagged by research:** almost no competitor does a live TikTok/Instagram grid well, and many show *photos of the booth* instead of *actual reels* — leading with real vertical reels is an easy way to look more premium than the field.
- Implementation note: Instagram's official embed adds third-party JS; use a **facade / lazy-load** (load on scroll or click) to protect LCP. A curated, self-hosted reel grid is the performance-safe baseline; treat the live IG feed as enhancement.

### 5.3 `/360/reels-tips` — "How to get amazing 360 reels" (compiled, ready to write)
Publish this as real on-page content (SEO + hype). Compiled from the research:
- **Movement is rule #1:** slow, intentional motion beats frantic dancing — a hair flip, slow spin, or smooth gesture reads beautifully in slow-mo; hold eye contact as the arm approaches; time moves to the countdown.
- **Solo poses:** hair flip, over-the-shoulder look, spin-and-point, jacket toss, blown kiss caught mid-air, hand-on-hip model stance, dramatic kneel with upward gaze.
- **Couples:** dip-and-sway, forehead touch, lift-and-laugh, slow arm-in-arm spin.
- **Groups (fits ~1–3, up to ~5 on overhead-arm rigs):** synchronized jump (count it — mid-air looks incredible slowed down), cheers/toast clink, back-to-back cool, a dance-move chain as the camera passes.
- **Props & effects:** confetti/party poppers, sparklers, money gun, bubble guns, fog/haze, LED accessories, signs, hats, branded props — grab them *before* stepping on.
- **Outfits:** show the OOTD; themed costumes inspire bigger performances.
- **Music:** pick tracks with a strong beat drop / recognizable intro, lean on trending audio, sync the spin to the drop, match mood to event.
- **Lighting:** even LED light, tested before the event, booth placed near the action (dance floor/bar) — never a dark corner.
- **Sharing:** post immediately via QR/text; add the event hashtag (`#360booth` + a custom event tag) to centralize and boost reach.

### 5.4 Add-on / upsell menu (compiled)
Custom branded video overlay (logo/hashtag/colors, intro-outro) · custom backdrop / 360 enclosure · branded platform / floor vinyl · branded sharing kiosk · LED lighting package (color sequences; premium adds laser + fog) · live-action props (confetti/money gun/bubbles/sparklers) · GIF/boomerang/reverse & speed-ramp modes · green screen · **live video screen to the room** (spectacle driver — pulls a crowd) · instant print station · custom music/track sync · rush same-day gallery · additional hours · **data-capture / social-analytics** (email/phone at share step — the key corporate upsell) · VIP setup / extra attendants.
*Pricing anchors observed: base ~$900–1,400 (3 hrs), premium ~$1,500–1,700, +~$300/hr, add-ons ~$150–350. For reference only — KilPen sets its own.*

---

## 6. Drone Aerial path (`/drone`) — conceptual & cinematic

Per the brief this page is **"very conceptual with stunning aerial images."** It should feel like a film studio's site fused with a flight instrument. Fewer words, bigger imagery, a scroll-driven descent.

### 6.1 Aesthetic direction
- **Dark canvas + a single cool accent (sky-cyan).** Full-bleed **Hawaii aerial video hero** (Nā Pali coast, volcanic terrain, reef gradients) with a dark gradient scrim so type stays legible — the landscape *is* the differentiator; the first frame should be unmistakably Hawaii.
- **One scroll-stopping shot, not a slideshow.** Autoplay-muted-loop hero with a **poster** that also serves as the reduced-motion/slow-connection fallback.
- **Scroll-driven, long-form narrative** (a cinematic vertical descent) rather than boxed sections — multi-speed parallax for depth, footage continuing across section boundaries, oversized minimal typography over full-bleed imagery.
- **HUD/telemetry motif** carried from the gateway — altitude readouts, coordinates, flight-path lines, a subtle grid — this is the cleanest way to fuse "stunning aerial" with "high-tech" *without* a wall of credentials.
- Signature conceptual effect to consider: **text masked by video** (aerial footage visible only through the headline letterforms).

### 6.2 Sections
1. **Cinematic hero** — full-bleed reel + one-line positioning (e.g., "Hawaii, from above.").
2. **Services grid** (vertical-segmented so buyers self-select): Real Estate & Architectural · Tourism/Hospitality & Resort · Construction & Progress · Film/TV & Commercial · Events · **FPV "one-take"** · *(optional/Phase 2)* Inspection / Mapping / Thermal.
3. **Portfolio / reel** (§6.3).
4. **Process** — a short numbered infographic (inquiry → permits/planning → shoot → edit → deliver). Reassures and signals competence.
5. **Fleet / capability spec sheet** — drone/sensor specs (e.g., up to 6K, FPV, thermal/mapping if offered). Doubles as "advanced technology" proof and SEO. *(Populate with real gear — §16.)*
6. **Credentials / compliance** (§6.4).
7. **FAQ** — pricing model, licensing, coverage area/islands, turnaround, weather/airspace caveats.
8. **Inquiry CTA** — quote form (§8) with a **response-time promise** ("quote within 24 hrs" — a recurring conversion lever on top aerial sites).

### 6.3 Portfolio presentation
- **Poster-grid of named projects**, uniform tiles, **hover-to-play muted video** previews (the premium interaction), categorized by vertical.
- Full-width video blocks for hero pieces; an **FPV one-take reel** gets its own showcase (the unbroken shot is the flex).
- Tech-forward adds: **before/after slider** (raw vs. graded, or ground vs. aerial) and an **interactive island map** pinning shoot locations (local flex + engagement).
- Keep deep case studies on `/drone/work`; the main `/drone` page stays almost wordless and visual.

### 6.4 Credentials without killing the vibe
- **FAA Part 107** stated as a compact **badge / single quiet line**, not a paragraph.
- **Insurance as a bold number** ("$__M insured") — reads as confidence, not legalese.
- **Waiver/capability badges** (night ops, ops-over-people) double as tech-credibility.
- **Hawaii-specific:** note **state park / DLNR permitting** competence and island airspace knowledge (the local equivalent of the mainland union/permit callouts).
- Placement: a slim strip near the hero (one credential line) + a fuller compliance block lower down + `/legal` for detail.

---

## 7. Shared pages & components

- **About** — the KilPen story + why a photography vertical; pilot credentials (Part 107 cert #), insurance, equipment (drone model(s), 360 rig), service area, Aloha/values. Ties both paths to the trusted parent brand.
- **Contact** — unified fallback form serving both services (service-type selector routes it).
- **Legal** — Privacy Policy, Terms, **Licensing & Usage Rights** (what clients get: license vs. ownership), and a **drone/airspace notice** ("service subject to airspace authorization & weather"). Booth side: note **model-release/photography consent** at events and where captured media may be used.
- **Global footer** — brand, Part 107 + Insured badges, islands served, social links, link back to kilpen.com.
- **Persistent in-path nav** + a **"⇄ switch service"** control back to the gateway.

---

## 8. Forms, lead capture & integrations

Static site → forms need a serverless handler (no backend). Options, cheapest-first:

| Need | Recommendation | Notes |
|---|---|---|
| Form handling | **Formspree** or a **Cloudflare Worker** endpoint (or Google Apps Script, as used on other KilPen sites) | POST → email + optional webhook to CRM. Add honeypot + (optional) hCaptcha for spam. |
| Lead routing | Route to KilPen **Zammad** helpdesk and/or a shared inbox (`photo@`/`aerial@` alias on existing Google Workspace) | Reuse existing stack. |
| Scheduling | Cal.com / Calendly | **Phase 2** — deposit-to-hold-date for the booth especially. |
| Payments / deposits | **Stripe** (parent already runs `pay.kilpen.com`) | **Phase 2** — booth deposits, drone project deposits. |
| Analytics | Plausible (privacy-friendly) or GA4 | Track path clicks + form conversions. |

**360 quote form fields:** name, email, phone, **event date**, venue/location, **event type** (dropdown), guest count, message. CTA: **"Check My Date."** Promise a concrete reply time.
**Drone inquiry form fields:** name, email, phone, project type (dropdown), location/island, date window, budget range (optional), details, optional link/upload. Promise "quote within 24 hrs."

---

## 9. Motion & interaction system (technical)

**Stack:** vanilla **Canvas 2D** for the two motion fields (one engine, two configs) + **GSAP** (free as of 2025, all plugins) for magnetic buttons, hover choreography, SplitText, and any scroll reveals. **Skip three.js** unless real 3D becomes a hard requirement (≈150KB+, LCP risk). **Skip video-as-primary-hero** on the gateway (weight); video is fine as the *360/drone* page heroes with posters.

**Reusable effects across the site:** hover-to-play muted video (drone portfolio), scroll-triggered reveals (IntersectionObserver — no lib needed for simple ones), magnetic CTAs, HUD overlays (grid, corner brackets, telemetry mono readouts), scanline sweeps, glows.

**Golden rules:** animate only `transform`/`opacity` in hot loops; one rAF loop; pause offscreen/hidden; device-scale particle counts; every animation has a `prefers-reduced-motion` static fallback; motion is never the LCP element and inits after first paint.

---

## 10. Media & imagery strategy — including AI (Gemini) usage

Heavy media over island-distance networks; treat performance as a feature.
- **Images:** responsive `webp`/`avif`, multiple sizes/`srcset`, lazy-load below the fold, `fetchpriority=high` only on the hero poster. **Strip EXIF GPS** on publish (privacy).
- **Video:** short muted loops for heroes with **poster** frames (poster = LCP element + reduced-motion fallback); host portfolio/reels on **Vimeo/Mux** (adaptive bitrate) and lazy-load/facade the player; prefer real `<video>` over GIFs.
- **CDN:** GitHub Pages CDN is fine to start; front media with **Cloudflare** if weight demands it.
- **Masters:** keep source media in Drive/object storage; publish derivatives only.

### AI image generation (Gemini) — use with a hard integrity boundary
Gemini image generation is available and useful here — **but a photography company's portfolio must be real work.** Split usage cleanly:
- ✅ **OK to generate:** abstract/atmospheric **background textures**, HUD/graphic elements, the gateway's motion-field art direction, **concept mockups & prototype placeholders** during design, and hero *ambiance* where clearly non-portfolio.
- 🚫 **Never present AI images as portfolio / sample work / "our reels" / "our aerials."** That would misrepresent capability and is a credibility (and potentially legal) risk for a services business.
- ⚠️ **Before launch:** every portfolio slot must be filled with **genuine KilPen 360 reels and drone footage.** If that media isn't ready, the site launches with a smaller *real* portfolio (or a tasteful "new work coming" state) — not padded with generative fills. (Portfolio readiness is an open item — §16.)

---

## 11. Technology stack & hosting

**Recommendation: hand-built static site** (semantic HTML + CSS + vanilla JS + Canvas + GSAP), deployed to **GitHub Pages** via Actions, custom domain `kilpen.photography` via `CNAME`.

**Why hand-built rather than Hugo (the parent's stack):**
- The site is **small** (a gateway + two shallow trees + about/contact/legal) — templating overhead buys little.
- The value is in **bespoke motion/interaction**, where full control of the markup/canvas/JS matters more than a content pipeline.
- It matches the approach just used successfully for the East Ridge site (static single-pager on GitHub Pages) — proven, fast, cheap, secure.
- No Node/CMS to maintain.

**Alternative (if content reuse/consistency with kilpen.com is prioritized):** a light **Hugo** setup reusing the parent's brand tokens and CI. Viable, but only worth it if you expect many content pages (blog/location SEO) soon. Recommendation: **hand-build now, revisit Hugo only if a content layer grows.**

**Repo & deploy:** new GitHub repo (e.g. `kilpen-photography`), Pages via Actions (static upload workflow, same pattern as East Ridge), `CNAME` = `kilpen.photography`, DNS at registrar → GitHub Pages. Direct pushes to `main` on KilPen repos are gated — use a branch + PR; Christopher merges.

---

## 12. SEO & local search

- **Keywords:** "360 photo booth Hawaii/Oahu," "360 video booth rental Honolulu," "[island] wedding 360 booth," "Hawaii drone photography," "Oahu aerial videography," "[island] real estate drone photos."
- One content-rich, indexable page per **service × intent** where it makes sense; the `/360/reels-tips` guide is a strong SEO asset.
- **Google Business Profile(s)** for the vertical — reviews drive both event and photography bookings.
- Schema.org: `LocalBusiness`/`ProfessionalService`, `Service`, `VideoObject`, `ImageObject`, `FAQPage`.
- Mobile-first, fast, accessible (alt text on all portfolio media — SEO + a11y). Strong Open Graph/Twitter cards with signature imagery for social sharing.

---

## 13. Performance budget (non-negotiables)

- **LCP < 2.5s** every page. LCP element = a static poster/headline, **never** canvas or a video stream.
- Gateway motion inits **after first paint**; pauses offscreen/hidden; particle count device-scaled.
- Third-party embeds (Instagram, Vimeo) are **facade/lazy-loaded**, never in the critical path.
- Hero video: `autoplay muted loop playsinline`, `preload="none"/metadata`, poster set; mobile/data-saver falls back to poster.
- Inline critical CSS; defer JS; `webp`/`avif` + `srcset` throughout.

---

## 14. Legal, compliance & safety

- **FAA Part 107** displayed; commercial jobs in controlled airspace (Honolulu Class B/C/D, military zones) need LAANC authorization — copy states "subject to airspace authorization & weather."
- **Insurance** (liability + drone hull) displayed as a confidence signal.
- **Hawaii state/county rules** — drone restrictions in/over many state parks, beaches, near wildlife; note site-specific permitting (DLNR).
- **Privacy** — strip GPS EXIF on published files; publish a privacy/usage note; obtain releases where needed.
- **360 booth events** — photography/model-consent signage at the booth; clarity on where guest media may be used (esp. corporate data-capture add-on — disclose capture/use).
- **Licensing & Usage Rights** — define client license vs. ownership per the parent agreement style.
- Standard **Privacy Policy, Terms, cookie/analytics notice.**

---

## 15. Build phases / roadmap

**Phase 1 — Launch (marketing site):**
Gateway landing (Canvas motion + HUD, mobile stacked, reduced-motion fallback) · `/360` (all §5.1 sections, real reel grid + IG embed, `/reels-tips`, quote form) · `/drone` (cinematic hero, services, portfolio, credentials, inquiry form) · About · Contact · Legal. Static + GitHub Pages. Trust badges. Analytics + SEO foundation. **Real portfolio media in place.**

**Phase 2 — Tech-enabled layer:**
Online scheduling + Stripe deposits (booth deposit-to-hold), client gallery/delivery, live Instagram/TikTok feed, drone `/work` deep case studies + interactive island map, before/after sliders, GBP review integration, blog/location SEO pages.

**Phase 3 — Differentiators (optional):**
FPV one-take signature pieces, mapping/orthomosaic/thermal deliverables, recurring construction-doc offerings, automated delivery workflows (tie into KilPen's n8n automation), corporate data-capture/analytics productization for the booth.

---

## 16. Open decisions (need Christopher's input before/at build)

1. **Pricing display** — publish "starting at" + tiers for the 360 booth (recommended; transparency converts), or quote-only? Same question for drone (usually quote-only there).
2. **360 booth reality check** — do we **own/operate the booth** now, or is this being launched ahead of equipment? Affects go-live and what's photographable.
3. **Portfolio media readiness** — are there real 360 reels + drone shots ready to feature? If not, plan a capture shoot before launch (no AI-filled portfolio — see §10).
4. **Service area** — which islands at launch (Oahu only? all? travel fees)?
5. **Drone service scope** — include mapping/inspection/thermal at launch or Phase 3?
6. **Instagram handle(s)** — one shared account or separate 360 / drone handles? (Drives the embed.)
7. **Insurance figure** — the actual coverage number to display, and Part 107 cert # to cite.
8. **Booth specifics** — rig type (arm length, overhead vs. standing), max guests, space/power needs, delivery turnaround — to populate "how it works," FAQ, and pricing.
9. **Gateway motion fidelity** — go with the **Canvas engine** (recommended, richer) or the **CSS/SVG fallback** (lighter/faster to ship)?

---

*Next step once §16 is directionally resolved: scaffold the `kilpen-photography` repo — gateway + page stubs matching this spec — and prototype the gateway motion first (it's the highest-risk, highest-value piece), then build out `/360` and `/drone`.*
