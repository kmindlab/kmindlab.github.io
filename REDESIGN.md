# KMindLab — product studio website

New bilingual, static product website for AskThem and tabGroup. Canonical production domain: **https://www.kmindlab.com/**.

## Technology

Dependency-free **Node.js 22 static site generator** with semantic HTML and modern CSS. No Jekyll, Ruby, runtime framework, analytics SDK, external font dependency, or browser-side content rendering. Site output is in `dist/` and deployed to GitHub Pages via Actions. Original Jekyll files remain in the repository for reference but are not part of the deployed site.

```bash
npm run build
npm run check
npx serve dist # optional local server
```

## Content and maintenance

- `scripts/build.mjs`: product data, locale dictionaries, page templates, metadata, JSON-LD, sitemap and redirects.
- `src/site.css`: responsive design system, product illustrations and components.
- `src/site.js`: optional progressive enhancement only.
- `scripts/check.mjs`: basic output/SEO regression checks.
- Product sources reviewed: private repositories `kmindlab/askthem` and `kmindlab/SmartTabManager`. Public HTML does not disclose private code.

To add a product: add an entry in `P` in `scripts/build.mjs`, providing both English and Chinese copy and FAQ. The generator automatically creates product landing pages, homepage cards, reciprocal hreflang URLs, structured data and sitemap entries. The generator also includes the new product in the XML sitemap automatically. Do not claim capabilities not supported by the released extension.

## SEO and GEO design

- Single canonical host `www.kmindlab.com`, CNAME persisted in generated output.
- Server-rendered HTML: one H1, useful descriptions, FAQ, crawlable links, meaningful headings.
- English site at `/`, Chinese at `/zh/` with two-way hreflang and x-default.
- SoftwareApplication/BreadcrumbList structured data per product; Organization/WebSite brand entities.
- Robots and XML sitemap; `llms.txt` as **optional navigation**, not an indexing guarantee.
- Preserved legacy `/products/smart-tab-manager/` URLs via client/meta redirect to `/products/tabgroup/` (GitHub Pages cannot issue an actual 301 without CDN/edge configuration).
- Product limitations documented accurately: AskThem depends on individual AI websites, and tabGroup is rule-based; no fabricated ratings, subscriber counts or AI classification claims.
- Lightweight CSS concept drawings; **augment with additional real, permission-checked product screenshots** prior to final launch if available.

### Pre-launch checklist

1. Review bilingual product copy and exact app store titles/URLs. Verify the Chrome Web Store listings are publicly accessible.
2. Check `askthem.kmindlab.com` content for duplication; keep it as the detailed official product site and differentiate KMindLab as a concise discovery hub.
3. Review the extension-specific privacy policy and support links; the site's website privacy notice only covers this marketing site.
4. Generate a 1200×630 PNG social card; `assets/og.svg` is a provisional social preview (not every platform supports SVG).
5. Validate indexing, structured data and Core Web Vitals on the deployed website; submit sitemap to Google Search Console and Bing Webmaster Tools. Watch organic clicks and Bing AI citations instead of expecting guaranteed AI placement.
6. Test layouts across actual mobile browsers and confirm domain/DNS GitHub Pages settings before merging.

## Production deployment

GitHub Actions deploys **main only**. Pull requests run the generator and output checks, upload the generated `dist/` as a review artifact, and do not modify production.

## Deployment / version verification (2026-11-14)

- Public Chrome Web Store lists AskThem v1.1.4; supplied true Studio screenshots are from unpublished/development source v1.7.9 and explicitly labeled as such.
- Smart Tab Manager current store lists v1.2.3. No hardcoded version appears in its landing page.
- The `askthem.kmindlab.com` address is not configured in Cloudflare DNS; the new brand site does **not** link to an unverified domain.
- DNS: `www.kmindlab.com` resolves via CNAME to `kmindlab.github.io`. Naked `kmindlab.com` has no website A/AAAA record. Verify and configure apex DNS on release authorization without touching MX/TXT email records.

## Social previews

A 1200×630 branded JPEG card is checked into `assets/og-brand.jpg` and referenced in Open Graph/Twitter metadata. This avoids the compatibility limitations of SVG-only social previews.

## Visual refresh (2026-11-14)

Homepage and both product heroes use a cohesive soft-blue/lavender design system, light gradients, stacked browser windows, branded product icons and harmonized cards. Product graphics use real AskThem screenshot and a CSS-rendered tab-group browser display based on the supplied tab management reference. The page no longer displays 'concept illustration' or 'product mockup' labels. The contact address throughout the site is contact@kmindlab.com. The old green-based palette has been replaced.

## Brand identity: owner-selected logo

On 2026-11-14, the owner selected the original four softly rotated tiles (charcoal, purple, mint, charcoal) and lowercase `kmindlab.` wordmark. The shared `logo()` component in `scripts/build.mjs` now uses that mark on the site header and footer; `assets/logo.svg` is the matching favicon/structured-data icon, and `assets/brand-wordmark.svg` is an exportable vector wordmark. Avoid replacing it with the blue gradient M-wave variant unless explicitly requested.
