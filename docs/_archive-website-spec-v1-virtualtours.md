# KilPen Photography — Website Specification

**Vertical:** Tech-enabled photography (360° virtual tours + drone aerial imagery)
**Parent:** KilPen Technical Services, LLC — Hawaii-based, veteran-founded, family-owned since 2016
**Document purpose:** Define scope, structure, features, and constraints to prepare for building the photography vertical's website.
**Status:** Draft v1 — *2026-06-25*
**Owner:** Christopher Furton

---

## 1. Overview & Goals

KilPen Tech is launching a second vertical: a **tech-enabled photography company** specializing in **360° photography / interactive virtual tours** and **drone (UAS) aerial photography & videography**. This document specifies the website that markets those services, showcases work, and converts visitors into booked clients.

The site is the primary sales and credibility asset for the vertical. It must do four jobs, in priority order:

1. **Show the work** — this is a visual business; immersive portfolio is the #1 conversion driver.
2. **Build trust** — credentials (FAA Part 107, insured), local roots, Aloha-driven service.
3. **Explain offerings** — clear service/industry pages with pricing signals.
4. **Capture leads** — frictionless quote request / booking.

### Success metrics
- Quote-request / contact conversion rate (target ≥ 4% of sessions).
- Engagement with interactive media (360 tour opens, reel plays).
- Local search visibility for target keywords (see §11).
- Page performance: LCP < 2.5s on the homepage despite media weight.

---

## 2. The Offering (services to represent on the site)

### A. 360° Photography & Virtual Tours
- **Real estate & rentals** — interactive walkthroughs for listings, vacation rentals (huge in Hawaii hospitality).
- **Google Street View** — publish tours to Google Maps / Business Profile (if pursuing Street View Trusted-style work).
- **Hospitality & venues** — hotels, resorts, event spaces, restaurants.
- **Commercial spaces & retail** — showrooms, offices, facilities.
- **Construction / facilities documentation** — time-sequenced 360 capture for progress records.
- **360 product / object photography** — spin-able product views (secondary).

### B. Drone Aerial Photography & Videography
- **Real estate & property** — aerial stills + cinematic flyovers.
- **Land / development** — site overviews, lot context, pre/post-construction.
- **Construction progress** — recurring aerial documentation.
- **Tourism / hospitality / marketing** — resorts, landscapes, brand films.
- **Events** — aerial coverage where airspace permits.
- **Inspections / mapping** *(optional, higher-skill)* — roof/solar inspection, orthomosaics, 2D/3D mapping.

> **Note:** Drone work in Hawaii has real airspace constraints (Honolulu Class B/C/D, military zones, restricted parks/beaches). The site should set expectations: "Service subject to airspace authorization." See §12.

---

## 3. Brand & Positioning

Inherit and extend the KilPen brand so the two verticals feel related but distinct.

| Element | Direction |
|---|---|
| **Palette** | Reuse KilPen system: flame red `#c0392b` accent, charcoal `#191919`, stone `#f8f7f5`. Consider a cooler secondary (sky/ocean blue) to signal "aerial/sky." |
| **Typography** | Match parent: **Sora** (display) + **Inter** (body). |
| **Voice** | Professional + Aloha. "Hawaii-based, serving the islands." Veteran-founded, detail-obsessed, tech-forward. |
| **Differentiator** | *Tech-enabled* — fast digital delivery, interactive embeds, online galleries, modern booking. The photographer who is also a technology company. |
| **Tagline (placeholder)** | e.g. "Hawaii from every angle." / "Aerial & immersive imagery, with Aloha." — **TBD** |

**Naming & domain — OPEN (see §14):** brand name for the vertical (e.g., "KilPen Aerial & 360", standalone name) and domain not yet decided. Spec uses **"KilPen Photography"** as placeholder.

---

## 4. Target Audiences & Buyer Journeys

| Audience | Primary need | Entry page | Conversion |
|---|---|---|---|
| Real estate agents / brokers | Fast aerial + 360 tours for listings | Real Estate service page | Quote request, recurring package |
| Vacation-rental owners / property mgrs | 360 tours + aerials for booking sites | Hospitality page | Quote / package |
| Hotels / resorts / venues | Marketing imagery, virtual tours | Hospitality / Commercial | Consultation |
| Construction / developers | Recurring progress documentation | Construction page | Retainer / project quote |
| Marketing agencies / brands | Cinematic aerial b-roll | Aerial Video page | Project quote |
| Local businesses | Google-mapped 360 tour | 360 / Street View page | Flat-rate booking |

Most buyers arrive via (a) Google local search, (b) referral, or (c) social (Instagram/aerial reels). The site must serve all three landing contexts.

---

## 5. Sitemap

```
/
├── Home
├── Services
│   ├── 360° Virtual Tours
│   ├── Drone Aerial Photography
│   └── Drone Aerial Video / Cinematography
├── Industries (audience landing pages)
│   ├── Real Estate
│   ├── Hospitality & Vacation Rentals
│   ├── Construction & Development
│   └── Commercial / Brands
├── Portfolio / Gallery
│   ├── Aerial
│   ├── 360 Tours (interactive)
│   └── Video reel
├── Pricing / Packages   (or "Request a Quote" if pricing stays custom)
├── About            (credentials, Part 107, insurance, the KilPen story)
├── Booking / Contact / Request a Quote
└── Legal: Privacy, Terms, Licensing & Usage Rights
```

Footer: service area (islands covered), Part 107 + insured badges, contact, social, link back to kilpen.com (parent).

---

## 6. Page-by-Page Content Requirements

### Home
- Hero: full-bleed aerial video loop OR standout 360 embed + headline + primary CTA ("Request a quote").
- Services snapshot (3 cards: 360 Tours / Aerial Photo / Aerial Video).
- Featured portfolio strip (interactive 360 + best aerials).
- Trust strip: *FAA Part 107 Certified · Fully Insured · Hawaii-based · Veteran-founded*.
- Industries quick-links.
- Social proof (testimonials / client logos) — *pending content*.
- Closing CTA band.

### Service pages (×3)
Each: what it is, deliverables, formats/specs (resolution, file types, turnaround), example work, "good for" industries, FAQ, CTA. Make turnaround/delivery explicit — it's the "tech-enabled" selling point.

### Industry pages (×4)
Audience-specific framing, relevant portfolio, package suggestion, testimonial, CTA. These are the SEO/conversion workhorses.

### Portfolio
- Filterable by type (Aerial / 360 / Video) and industry.
- **Interactive 360 tours embedded and openable inline.**
- Aerial gallery with lightbox; video reel (hosted, not autoplay-heavy).
- Each piece: location, service type, optional client.

### Pricing / Packages
- **Decision needed:** publish package tiers vs. "request custom quote." Recommendation: show **starting-at** prices + packages for standard real-estate/360 jobs (reduces tire-kicker inquiries), custom quote for commercial. (See §14.)

### About
- KilPen story + photography vertical origin; pilot credentials (Part 107 cert #), insurance, equipment (drone models, 360 rig), service area, Aloha/values.

### Booking / Quote
- Short form: name, contact, service type, property/location, date window, details, file/link upload optional.
- Integrate scheduling + payment where possible (§9). Spam protection.

---

## 7. Key Features & Functionality

| Feature | Priority | Notes |
|---|---|---|
| Immersive hero (aerial video / 360) | **MVP** | Performance-managed (poster + lazy load). |
| Interactive 360 tour embeds | **MVP** | Hosting/viewer decision in §8. |
| Filterable portfolio + lightbox | **MVP** | Core conversion surface. |
| Quote-request form | **MVP** | Routed to email + CRM/helpdesk. |
| Trust badges (Part 107, insured) | **MVP** | Credibility. |
| Video reel hosting | **MVP** | Vimeo/YouTube/self-hosted (§8). |
| Online scheduling | Phase 2 | Calendly/Cal.com or native. |
| Online payment / deposits | Phase 2 | Stripe (parent already uses pay.kilpen.com). |
| Client gallery delivery / downloads | Phase 2 | Pixieset/CloudSpot or custom portal — ties to "tech-enabled." |
| Blog / location guides | Phase 2 | SEO for "aerial photography \[place\]". |
| Instagram feed embed | Phase 2 | Social proof. |

---

## 8. Media & Asset Strategy

This is the make-or-break technical area — the site is heavy media over island-distance networks.

- **Images:** serve responsive `webp`/`avif`, multiple sizes, lazy-load below the fold, eager + `fetchpriority=high` only on hero. Strip EXIF GPS on publish (privacy).
- **Aerial video:** host on **Vimeo** (clean, no recommendations, good embeds) or YouTube (SEO/reach); use poster frames; avoid autoplay with sound. Self-host only short looping hero clips (muted, compressed).
- **360 tours / virtual tours — pick a path:**
  - **Matterport / Kuula / Momento360 / Google Street View** embed (fastest, hosted, subscription) — *recommended for MVP.*
  - **Self-hosted Pannellum / Marzipano** (open-source, no fees, more build effort) — fits the "we're a tech company" angle; viable Phase 2.
- **CDN:** front all media with a CDN (Cloudflare — parent already uses CF Access elsewhere).
- **Storage/source-of-truth:** keep masters in Drive/object storage; publish derivatives only.

---

## 9. Integrations

| Need | Candidate | Note |
|---|---|---|
| Payments / deposits | **Stripe** | Parent already runs `pay.kilpen.com`. |
| Scheduling | Cal.com / Calendly | Phase 2. |
| CRM / lead intake | Route to KilPen **Zammad** helpdesk or a light CRM | Reuse existing stack. |
| Email | Google Workspace (existing) | `help@` or new `photo@`/`aerial@` alias. |
| Client gallery | Pixieset / CloudSpot / custom | Delivery + proofing + paid downloads. |
| Analytics | Privacy-friendly (Plausible) or GA4 | Track conversions. |

---

## 10. Technology Stack (recommendation)

**Recommended: Hugo static site + Cloudflare**, consistent with the parent kilpen.com (Hugo on GitHub Pages/Actions). Rationale: team already knows it, fast, cheap, secure, great for image pipelines via Hugo image processing.

- **Framework:** Hugo (matches parent; reuse brand tokens, layouts, CI).
- **Hosting/deploy:** GitHub Actions → Pages or Cloudflare Pages (CF Pages gives better media/CDN + previews).
- **Forms:** static-site form handler (Cloudflare, Formspree, or a small Worker) → email + CRM.
- **360/video:** embedded third-party (MVP) → optional self-hosted viewer (Phase 2).

**Alternative if heavy dynamic features (native galleries, client logins, booking) are wanted up front:** a CMS/app framework (Next.js/Astro + headless CMS). Heavier to run; only if Hugo's static model becomes limiting. **Recommendation: start Hugo, revisit only if Phase 2 client-portal needs outgrow it.**

---

## 11. SEO & Local Search

- **Local intent keywords:** "Hawaii drone photography," "Oahu aerial real estate photos," "360 virtual tour Honolulu," "\[island\] vacation rental virtual tour," etc.
- One indexable, content-rich page per **service × island/region** where it makes sense.
- **Google Business Profile** for the vertical (reviews drive local photography sales).
- Schema.org: `LocalBusiness` / `ProfessionalService`, `Service`, `ImageObject`, `VideoObject`.
- Fast, mobile-first, accessible (alt text on portfolio — also good for SEO).
- Open Graph/Twitter cards with strong imagery for social sharing.

---

## 12. Legal, Compliance & Safety

- **FAA Part 107** — display certification; many commercial jobs require authorization (LAANC) for controlled airspace around Honolulu and elsewhere. Site copy should state work is "subject to airspace authorization & weather."
- **Insurance** — display liability (and drone hull) coverage; reassures commercial clients.
- **State/county rules** — Hawaii restricts drone use in/over many state parks, beaches, and near wildlife; note site-specific permitting where relevant.
- **Privacy** — overflight/360 capture of people & property; publish a privacy/usage note; obtain releases where needed; **strip GPS EXIF** from published files.
- **Licensing & usage rights** — define what clients get (license vs. ownership), per the parent agreement style. Dedicated "Licensing & Usage" page.
- **Standard:** Privacy Policy, Terms of Service, cookie/analytics notice.

---

## 13. Build Phases

**Phase 1 — MVP marketing site (launch):**
Home, 3 service pages, 2–4 industry pages, portfolio (with embedded 360 + reel), About, Quote form, legal pages. Hugo + Cloudflare. Trust badges. Basic analytics + SEO foundation.

**Phase 2 — Tech-enabled layer:**
Online scheduling, Stripe deposits, client gallery/delivery portal, blog/location SEO pages, optional self-hosted 360 viewer, social embeds, GBP review integration.

**Phase 3 — Differentiators (optional):**
Mapping/orthomosaic deliverables, recurring construction-doc dashboards, automated delivery workflows (tie into KilPen n8n automation expertise).

---

## 14. Open Questions / Decisions Needed

1. **Brand & domain** — name for the vertical (sub-brand of KilPen vs. standalone)? Domain (e.g., `aerial.kilpen.com`, `photo.kilpen.com`, or a new domain)?
2. **Pricing display** — publish starting-at/package pricing or "request a quote" only?
3. **360 hosting** — third-party (Matterport/Kuula) vs. self-hosted (Pannellum/Marzipano) for launch?
4. **Service area** — which islands at launch (Oahu only? all islands? travel fees)?
5. **Street View Trusted** — pursuing Google-published tours as an offering?
6. **Scope of services** — include higher-skill mapping/inspection at launch, or Phase 3?
7. **Existing assets** — do we have portfolio media + testimonials ready, or is a capture/shoot needed before launch?
8. **Equipment list** — drone model(s) and 360 rig to cite for credibility?

---

*Next step: resolve §14 items (esp. brand/domain, pricing model, 360 hosting), then I can scaffold the Hugo site structure and page stubs to match this spec.*
