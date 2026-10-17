# theLABEL marketing status

_Current operating truth — 16 October 2026_

---

## Role in theLABEL

`thelabel-marketing` is the **public artist-acquisition site** for theLABEL. Its job is to explain the product and send artists to the live apps:

| Surface | Production URL |
| --- | --- |
| Marketing | `https://thelabelai.com` |
| Artist dashboard | `https://app.thelabelai.com/login` |
| Artist stores | `https://store.thelabelai.com` |

It is not a commerce backend, a game property, or the home for experimental product assets.

## Current contract

| Area | Current truth |
| --- | --- |
| Primary conversion path | `GET STARTED FREE` / `START FOR FREE` → `https://app.thelabelai.com/login` |
| Storefront path | Header/footer **Stores** → `https://store.thelabelai.com` |
| Auth shortcuts | `/login`, `/signup`, `/register` redirect to the dashboard login; `/dashboard` redirects to the dashboard; `/store` and `/stores` redirect to the storefront |
| Deployment | Vite static site on Vercel |
| Package manager | pnpm 10.4.1 with `pnpm-lock.yaml` only |
| CI contract | Node 22, `pnpm install --frozen-lockfile`, lint, and build |
| Analytics | `VITE_GA_MEASUREMENT_ID` is optional. The placeholder Meta Pixel was removed until a real pixel ID is provided |
| Slide assets | Removed from the marketing tree and ignored |

## Launch notes

- Draft PR #30 (`feat/brand-foundation-motion`) is a private-beta visual rewrite. It was not merged for launch; reopen it after rebase if the owner wants that identity system.
- The live storefront title is “Artist Storefronts”; merch checkout is not yet selling. Marketing links to the real store URL and does not invent catalog items.
- Unused `Discover.jsx` mock stores stay off the homepage on purpose.

## Verification commands

```bash
pnpm install --frozen-lockfile
pnpm lint
pnpm build
```

These commands verify the static site. They do not prove analytics configuration, dashboard authentication, store catalog health, or conversion performance.
