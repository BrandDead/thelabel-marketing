# thelabel-marketing Status

> **Last Updated**: 2026-02-17 (JSON-LD Pricing Fix + GA Config)

---

## Role in Ecosystem

This repository contains the **public-facing marketing website**. It serves as the main landing page for theLABEL, driving user acquisition and providing information about the platform. It is a separate entity from the `tl-dash1` application itself.

---

## Current State

- **SEO & Conversion**: Complete. Structured data (JSON-LD), testimonials, FAQs, trust badges, and contact form are all live.
- **JSON-LD Pricing**: Fixed. All 5 subscription tiers now match the actual prices in `plans.js` (PR #23).
- **Google Analytics**: Configured via `VITE_GA_MEASUREMENT_ID` environment variable, injected at build time through Vite's `html` plugin (PR #23).
- **Sitemap**: Updated with current dates and all pages.
- **CTA Wiring**: Pricing buttons use `onSignupClick` which opens the signup modal or redirects to the dashboard.
- **Branch Health**: Clean. All stale/merged branches have been removed.
- **Dependencies**: Build requires `npm install --force`; resolve conflicts post-MVP.

---

## Recently Merged PRs

| PR | Title | Date |
|----|-------|------|
| #23 | JSON-LD pricing fix + GA env config + sitemap update | 2026-02-17 |
| #21 | SEO overhaul, testimonials, FAQs, trust badges | 2026-02-09 |

---

## What Remains

| Item | Priority | Notes |
|------|----------|-------|
| Set `VITE_GA_MEASUREMENT_ID` in Vercel | High | GA tracking is ready but needs the real measurement ID |
| Dependency audit | Low | Build requires `npm install --force`; resolve conflicts post-MVP |
| A/B testing | Post-MVP | Test headlines and CTAs for conversion optimization |

---

## How to Run Locally

```bash
git clone https://github.com/BrandDead/thelabel-marketing.git && cd thelabel-marketing
npm install --force
cp .env.example .env          # Fill in real values
npm run dev                   # Runs on http://localhost:5173
```

## How to Deploy

Merging to `main` triggers auto-deploy via Vercel. Set `VITE_GA_MEASUREMENT_ID` in the Vercel environment variables for Google Analytics tracking.
