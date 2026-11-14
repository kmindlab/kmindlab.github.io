# KMindLab website

Bilingual product studio website for **AskThem** and **tabGroup (Smart Tab Manager)**.

```bash
node --version # >=22
npm run build
npm run check
```

Production: https://www.kmindlab.com/ — deployed only from `main`.

See [REDESIGN.md](REDESIGN.md) for architecture, SEO/GEO, release validation, and known product version differences.

- `scripts/build.mjs` — static site generator, data, locales, structured metadata, sitemap.
- `src/site.css` — mobile-first visual design system.
- `scripts/check.mjs` — HTML/SEO smoke tests.
- `dist/` — generated site; not committed.

Legacy Jekyll version remains available through Git history.

### Preview screenshots and browser QA

The PR GitHub Actions run installs Playwright for CI only, checks responsive layouts and navigation in Chromium, and uploads desktop/mobile screenshots as the `kmindlab-visual-review-*` artifact. This does not deploy the PR to the public website.
