# theLABEL Brand Foundation

## Purpose

This document records the visual contract used by the marketing site. It is deliberately small: the dashboard, marketing site, and storefront should share an identity without forcing a promotional surface to behave like a dense artist workspace or a commerce checkout.

## Approved assets in this repository

| Asset | Role | Use |
|---|---|---|
| `src/assets/thelabel-wordmark-red.webp` | Primary dark-surface wordmark | Navigation, footer, and other identity contexts on dark product surfaces. |
| `src/assets/pasted_file_8nQJT8_theLABEL-stronglogo.png` | Campaign art | Decorative visual storytelling only. It must not be used as the accessible corporate logo. |
| `src/assets/pasted_file_8PrF8J_theLABEL_logo.png` | Legacy dark/light candidate | Retained for comparison only; do not use on the current dark marketing shell. |

The source artwork for the red wordmark is the existing dashboard wordmark. The original source file carries a misleading `.png` extension despite being WebP content; this repository uses the correctly named `.webp` copy.

## Color roles

`src/styles/brand.css` is the source of truth for the marketing token layer.

| Role | Token | Value | Intended use |
|---|---|---:|---|
| Canvas | `--color-canvas` | `#0A1F1F` | Main dark product field. |
| Surface | `--color-surface` | `#0D2626` | Panels and low-emphasis containers. |
| Raised surface | `--color-surface-raised` | `#112D2D` | Overlay and elevated-state surfaces. |
| Primary action | `--color-action-primary` | `#C8102E` | White-text primary buttons. |
| Accent | `--color-accent` | `#FF1744` | Energy, selected states, and decoration—not routine white-text button backgrounds. |
| Information and focus | `--color-focus` | `#29C5F6` | Keyboard focus, informational emphasis, and non-destructive data cues. |
| Campaign spark | `--tl-orange-500` | `#FF5000` | Marketing-only expressive moments. |

Components use semantic roles rather than new raw color values. The primary action shade is intentionally darker than bright crimson so normal white action text remains accessible.

## Motion contract

`src/styles/motion.css` establishes shared timing tokens and system-level reduced-motion behavior. `useReducedMotion` gates GSAP motion in the hero and footer. Under `prefers-reduced-motion: reduce`, all content renders in its final readable state and anchor navigation uses native non-smooth scrolling.

Use motion to explain interactions, not as persistent decoration. Animate only opacity and transforms for routine interface movement. Do not add looping blur, filter, or shadow animation to common interface chrome.

## Review checklist

Before extending this system, verify that identity uses the real wordmark; normal text retains at least 4.5:1 contrast against its actual background; every interactive item exposes a visible focus state; touch controls are at least 44 CSS pixels when icon-only; and reduced-motion mode leaves all content visible and understandable.
