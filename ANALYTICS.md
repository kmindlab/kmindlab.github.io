# KMindLab website analytics

## Provider and installation

- Provider: **Cloudflare Web Analytics**, using the site's existing Cloudflare account and existing Web Analytics site (created 2026-10-07).
- Live hostname: `www.kmindlab.com` (GitHub Pages, DNS-only CNAME to `kmindlab.github.io`).
- Cloudflare's auto-install **does not work on a DNS-only hostname**. The build now embeds the existing site's public beacon token once in each generated content page and in `404.html`.
- Immediate legacy redirects intentionally do not load the beacon; this avoids redundant page views.
- The public site token is not an API credential. **Never commit Cloudflare API access tokens** to this repository.
- Bilingual privacy notices are maintained in `scripts/build.mjs`, where the page copy is generated.

## Dashboard and authorized API access

- Dashboard: [Cloudflare Web Analytics](https://dash.cloudflare.com/?to=/:account/web-analytics) → select `kmindlab.com`.
- The connected Cloudflare account can read this site's Web Analytics configuration and can query the `/graphql` Analytics API. The following account-scoped dataset/query shape was validated on 2026-11-14.
- Analytics can be queried in ChatGPT through the authorized Cloudflare connection, without storing an API token in GitHub.

Example query — replace placeholders with the authorized account ID, existing site tag, and an appropriate UTC range:

```graphql
query SiteTraffic(
  $accountTag: string!
  $siteTag: string!
  $start: Time!
  $end: Time!
) {
  viewer {
    accounts(filter: { accountTag: $accountTag }) {
      rumPageloadEventsAdaptiveGroups(
        limit: 100
        filter: {
          datetime_geq: $start
          datetime_lt: $end
          siteTag: $siteTag
        }
        orderBy: [count_DESC]
      ) {
        count
        sum {
          visits
        }
        dimensions {
          date
        }
      }
    }
  }
}
```

Additional dimensions, filters, and retention limits depend on the current GraphQL schema and Cloudflare plan; validate them rather than assuming a field is available. Cloudflare Web Analytics is designed for *site visits and pageviews*, not a complete attribution or product-install conversion funnel. It does not currently provide built-in custom events or UTM query-string tracking. For SEO search queries/impressions, use Google Search Console separately.

## Verification after merging

1. Let the `main` branch GitHub Pages deployment finish.
2. Open `https://www.kmindlab.com/` and a Chinese or product page. Confirm a single `beacon.min.js` script and its network beacon request are present. Note that content blockers may suppress beacon requests.
3. Visit a few pages in a clean browser session, then open Cloudflare Web Analytics. Collection can take several minutes to appear. A one-off visit is not guaranteed to be reflected immediately.
4. Query the same GraphQL dataset for a post-deployment UTC time window. Confirm values are not conflated with Cloudflare edge request analytics; Web Analytics data is collected from browser-side beacons.
5. Run `npm run build && npm run check`; the smoke check verifies beacon uniqueness across generated pages.

### Proxy/duplication caution

The current Cloudflare site has **automatic injection enabled** in its account configuration, but it is inactive for this DNS-only hostname. If `www.kmindlab.com` is later switched to Cloudflare's **orange-cloud proxy**, revisit the Web Analytics auto-install settings. Do not serve both the manually embedded and automatically injected beacons on the same page. This change deliberately does **not** alter DNS, Cloudflare proxy settings, other subdomains, or the existing Web Analytics site.

## Practical analysis requests

- Compare daily visits and pageviews for the last 7 or 30 days.
- Identify the most-viewed pages and whether AskThem or tabGroup attracts more interest.
- Compare traffic sources, countries, and page performance if the GraphQL schema makes the relevant dimensions available.
- For conversion analysis, combine these data with Chrome Web Store statistics and/or other explicitly configured measurement sources; do not equate product-page views with extension installations.
