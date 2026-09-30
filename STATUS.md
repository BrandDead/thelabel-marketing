# theLABEL marketing status

_Current operating truth — 23 September 2026_

---

## Role in theLABEL

`thelabel-marketing` is the **public artist-acquisition site** for theLABEL. Its primary job is to give prospective artists a clear reason to join and send them to the authenticated dashboard at `https://app.thelabelai.com/login`. It is not a commerce backend, a game property, or the home for experimental product assets.

> **Current state:** The site remains a brochure and acquisition surface. The active brand-foundation work is draft pull request [#30](https://github.com/BrandDead/thelabel-marketing/pull/30); its disposition needs a focused review before any production merge.

## Current contract

| Area | Current truth |
| --- | --- |
| Primary conversion path | `START FOR FREE` / `GET STARTED FREE` to theLABEL dashboard login |
| Deployment | Vite static site on Vercel |
| Package manager | pnpm 10.4.1 with `pnpm-lock.yaml` |
| CI contract | Node 22, `pnpm install --frozen-lockfile`, lint, and build |
| Analytics | `VITE_GA_MEASUREMENT_ID` is optional and public at build time; confirm its Vercel configuration separately |
| Slide assets | Removed from the current marketing tree and ignored to prevent reintroduction |

## Immediate operating gates

1. **Review pull request #30:** Keep its scope limited to the artist-acquisition experience, accessibility, and conversion path. Merge only after the current main branch and required CI are reviewed together.
2. **Resolve issue #10:** Replace the obsolete beta checklist with the current acquisition release gate, or close it as superseded with a documented replacement.
3. **Keep one package manager:** Use pnpm and commit only `pnpm-lock.yaml`. Do not restore `package-lock.json` without an explicit package-manager decision.
4. **Keep brand boundaries explicit:** Slide is a separate 18+ game property. Public theLABEL marketing must not carry its weapons, drug, character, or sprite assets.

## Verification commands

```bash
pnpm install --frozen-lockfile
pnpm lint
pnpm build
```

These commands verify the static site. They do not prove analytics configuration, dashboard authentication, or conversion performance.

## Historical records

February continuity and final-summary documents describe an earlier site state. Treat them as historical notes; this file and the repository's current `main` branch describe the active operating position.
