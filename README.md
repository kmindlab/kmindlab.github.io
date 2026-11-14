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
