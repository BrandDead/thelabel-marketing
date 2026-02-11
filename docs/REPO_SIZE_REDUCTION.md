# Repo Size Reduction

**Date**: 2026-02-11
**Branch**: `cleanup/mvp-hardening-pass-1`
**Repository**: `BrandDead/thelabel-marketing`

## Problem

The `node_modules/` directory (37,825 files) was committed to git and tracked in the repository. This caused:

- Massive repository size (hundreds of MB)
- Extremely slow clone times
- Merge conflicts on every dependency update
- Unnecessary storage costs on GitHub

## Fix

1. Ran `git rm -r --cached node_modules` to remove tracking without deleting files on disk.
2. Verified `.gitignore` already contains `node_modules/` (it did).
3. Ran `npm install --legacy-peer-deps` to restore a clean `node_modules/` from `package.json`.
4. Verified `vite build` succeeds (1645 modules transformed, built in 2.67s).

## Impact

- **37,825 files** removed from git tracking
- Repository clone size will be dramatically reduced on the next clone
- Future `npm install` / `pnpm install` will handle dependencies as intended

## Note on Git History

The `node_modules/` files still exist in git history. To fully reduce the repository size, a `git filter-branch` or BFG Repo-Cleaner pass would be needed. This is recommended post-MVP but was intentionally not done in this pass to avoid disrupting any active work.

## Verification

- **Build**: EXIT 0 (`vite build` — 1645 modules, 2.67s)
- **`.gitignore`**: Confirmed `node_modules/` is listed
- **`git status`**: Shows 37,825 deletions (from tracking only)
