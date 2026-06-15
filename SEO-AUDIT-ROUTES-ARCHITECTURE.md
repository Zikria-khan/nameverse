# Routes & Architecture Audit
## Complete Route Inventory and Site Architecture Analysis

This file contains the complete route inventory including all dynamic and static routes with their SEO status, plus the site architecture analysis including URL hierarchy, content silos, authority flow, crawl depth, and duplicate content clusters.

---

# SECTION 2: COMPLETE ROUTE INVENTORY

## Dynamic Routes (Next.js App Router)

| URL Pattern | Route File | Type | Pre-rendered | SSR Fallback | Indexed? | Canonical? | Sitemap? | Internal Links | SEO Value | Priority |
|---|---|---|---|---|---|---|---|---|---|---|
| `/` | `src/app/page.js` | Static | Yes (ISR 30d) | No | Yes | Self | Yes (pages.xml) | High | 10/10 | 1.0 |
| `/names` | `src/app/names/page.js` + `layout.jsx` | Static | Yes (ISR 30d) | No | Yes | Self | Yes (pages.xml) | High | 10/10 | 0.9 |
| `/names/religion/[religion]/[page]` | `src/app/names/religion/[religion]/[page]/page.jsx` | Dynamic | First 5 pages | Yes (ISR 60d) | Yes | Self | Only page 1 | High | 9/10 | 0.8 |
| `/names/[religion]/[slug]` | `src/app/names/[religion]/[slug]/page.jsx` | Dynamic | 84 total | Yes (ISR 30d) | Yes | Self | Segmented XMLs | High | 10/10 | 0.9 |
| `/names/[religion]/letter/[letter]/[page]` | **MISSING FILE** | Dynamic | None | SSR | Yes | Self | Only page 1 (pages.xml) | Medium | 8/10 | 0.6 |
| `/names/[religion]/origin/[origin]/[page]` | **MISSING FILE** | Dynamic | None | SSR | Yes | Self | Only page 1 (pages.xml) | Medium | 7/10 | 0.6 |
| `/names/[religion]/categories/[category]/[page]` | **MISSING FILE** | Dynamic | None | SSR | Yes | Self | Only page 1 (pages.xml) | Medium | 7/10 | 0.6 |
| `/blog` | `src/app/blog/page.js` | Static | Yes (ISR 90d) | No | Yes | Self | Yes (pages.xml) + broken blog.xml ref | High | 8/10 | 0.8 |
| `/blog/[slug]` | `src/app/blog/[slug]/page.jsx` | Static | All posts | No | Yes | Self | Stale URLs | Medium | 7/10 | 0.7 |
| `/guides/[slug]` | `src/app/guides/[slug]/page.jsx` | Static | All guides | No | Yes | Self | Only expert-naming-guide | Medium | 7/10 | 0.7 |
| `/guides/expert-naming-guide` | `src/app/guides/expert-naming-guide/page.jsx` | Static | Yes | No | Yes | Self | Yes (pages.xml) | Medium | 7/10 | 0.7 |
| `/search` | `src/app/search/page.jsx` | Static | Yes (ISR 30d) | No | Yes | Self | Yes (pages.xml) | Low | 5/10 | 0.5 |
| `/search/[term]` | `src/app/search/[term]/page.jsx` | Dynamic | None | SSR | Conditional | Self | No | Low | 3/10 | 0.3 |
| `/trending-names` | `src/app/trending-names/page.jsx` | Static | Yes (ISR 30d) | No | Yes | Self | No | Medium | 7/10 | 0.7 |
| `/unique-names` | `src/app/unique-names/page.jsx` | Static | Yes (ISR 30d) | No | Yes | Self | No | Medium | 7/10 | 0.7 |
| `/name-meanings` | `src/app/name-meanings/page.jsx` | Static | Yes (ISR 30d) | No | Yes | Self | Yes (pages.xml) | Medium | 7/10 | 0.7 |
| `/names-by-meaning` | `src/app/names-by-meaning/page.jsx` | Static | Yes (ISR 30d) | No | Yes | Self | Yes (pages.xml) | Low | 5/10 | 0.5 |
| `/languages` | `src/app/languages/page.jsx` | Static | Yes (ISR 30d) | No | Yes | Self | Yes (pages.xml) | Medium | 6/10 | 0.6 |
| `/popularity` | `src/app/popularity/page.jsx` | Static | Yes (ISR 30d) | No | Yes | Self | Yes (pages.xml) | Medium | 6/10 | 0.6 |
| `/advanced-search` | `src/app/advanced-search/page.jsx` | Static | Yes (ISR 30d) | No | Yes | Self | Yes (pages.xml) | Low | 4/10 | 0.4 |
| `/my-names` | `src/app/my-names/page.jsx` | Static | Yes (ISR 30d) | No | Yes | Self | Yes (pages.xml) | Low | 3/10 | 0.3 |
| `/about` | `src/app/about/page.jsx` | Static | Yes (ISR 30d) | No | Yes | Self | Yes (pages.xml) | Medium | 6/10 | 0.5 |
| `/privacy` | `src/app/privacy/page.jsx` | Static | Yes | No | Yes | Self | Yes (pages.xml) | None | 2/10 | 0.2 |
| `/terms` | `src/app/terms/page.jsx` | Static | Yes | No | Yes | Self | Yes (pages.xml) | None | 2/10 | 0.2 |
| `/popular-by-state` | `src/app/popular-by-state/page.jsx` | Redirect | — | 301→/names | No | N/A | **YES (ERROR)** | None | 0/10 | 0.0 |
| `/viral-names` | `src/app/viral-names/page.jsx` | Redirect | — | 301→/trending-names | No | N/A | **YES (ERROR)** | None | 0/10 | 0.0 |
| `/islamic/boy-names` | `src/app/islamic/boy-names/page.jsx` | Static | Yes | No | Yes | Self | Yes (pages.xml) | Medium | 7/10 | 0.7 |
| `/islamic/girl-names` | `src/app/islamic/girl-names/page.jsx` | Static | Yes | No | Yes | Self | Yes (pages.xml) | Medium | 7/10 | 0.7 |
| `/christian/boy-names` | `src/app/christian/boy-names/page.jsx` | Static | Yes | No | Yes | Self | Yes (pages.xml) | Medium | 7/10 | 0.7 |
| `/christian/girl-names` | `src/app/christian/girl-names/page.jsx` | Static | Yes | No | Yes | Self | Yes (pages.xml) | Medium | 7/10 | 0.7 |
| `/hindu/boy-names` | `src/app/hindu/boy-names/page.jsx` | Static | Yes | No | Yes | Self | Yes (pages.xml) | Medium | 7/10 | 0.7 |
| `/hindu/girl-names` | `src/app/hindu/girl-names/page.jsx` | Static | Yes | No | Yes | Self | Yes (pages.xml) | Medium | 7/10 | 0.7 |

## Route Statistics

| Metric | Count |
|---|---|
| **Total defined routes** | 32 |
| **Total crawlable pages (estimated)** | 50,000+ |
| **Total pre-rendered pages at build** | ~150 (84 names + hub pages) |
| **Total SSR-on-demand pages** | ~44,000+ names + filters |
| **Total indexable pages** | ~48,000+ (excluding redirects, noindex pages) |
| **Total canonical pages** | ~48,000+ |
| **Total paginated pages (estimated)** | 5,000+ (religion pages × ~100 pages each) |
| **Total filter pages (letter/origin/category)** | ~15,000+ |
| **Search term pages (potentially indexable)** | Unlimited / high risk |
| **Sitemap-covered pages** | ~200 (only page 1 of each filter + static hubs) |
| **Orphaned sitemap URLs** | 8+ (stale blogs, redirect-only routes) |

## Critical Sitemap Gap Analysis

The sitemap architecture covers **< 0.5%** of the site's actual indexable pages. The segmented name sitemaps contain name pages but:
- Only page 1 of letter/origin/category filters is included
- No religion pagination pages beyond page 1 are included
- No dynamic name pages beyond the pre-built segmented files
- Blog sitemap reference is broken

---

# SECTION 3: SITE ARCHITECTURE ANALYSIS

## URL Hierarchy

```
Homepage (/) — DA Flow Origin
├── /names — Primary Hub (DA 100)
│   ├── /names/religion/islamic/[1-N] — Religion Hub (DA 80)
│   │   ├── /names/islamic/letter/[A-Z]/[1-N] — Filter Hub (DA 40)
│   │   │   └── /names/islamic/letter/a/1 — Name links (DA 20)
│   │   │       └── /names/islamic/[slug] — Name Detail (DA 10-15)
│   │   ├── /names/islamic/origin/[origin]/[1-N] — Filter Hub (DA 40)
│   │   ├── /names/islamic/categories/[category]/[1-N] — Filter Hub (DA 40)
│   │   └── /names/islamic/[slug] — Name Detail (DA 10-15)
│   ├── /names/religion/christian/[1-N] — Same structure
│   ├── /names/religion/hindu/[1-N] — Same structure
│   ├── /islamic/boy-names — Gender Hub (DA 50)
│   ├── /islamic/girl-names — Gender Hub (DA 50)
│   ├── /christian/boy-names — Gender Hub (DA 50)
│   ├── /christian/girl-names — Gender Hub (DA 50)
│   ├── /hindu/boy-names — Gender Hub (DA 50)
│   └── /hindu/girl-names — Gender Hub (DA 50)
├── /blog — Content Hub (DA 60)
│   ├── /blog/[slug] — Blog Post (DA 15-25)
│   └── /guides/[slug] — Guide Page (DA 15-25)
├── /search — Search Tool (DA 30)
│   └── /search/[term] — Search Results (DA 5-10, thin)
├── /trending-names — Trend Hub (DA 40)
├── /unique-names — Unique Names Hub (DA 40)
├── /name-meanings — Meaning Hub (DA 40)
├── /names-by-meaning — Flat page (DA 20)
├── /languages — Language Hub (DA 30)
├── /popularity — Popularity Hub (DA 30)
├── /advanced-search — Tool (DA 10)
├── /my-names — Personal Tool (DA 5)
├── /about — Authority Page (DA 30)
├── /privacy — Legal (DA 5)
└── /terms — Legal (DA 5)
```

## Content Silos

```
SILO 1: ISLAMIC NAMES
├── Hub: /names/religion/islamic/1
├── Gender: /islamic/boy-names, /islamic/girl-names
├── Letter: /names/islamic/letter/[A-Z]/[1-N] (78 pages)
├── Origin: /names/islamic/origin/[origin]/[1-N] (~20 pages)
├── Category: /names/islamic/categories/[type]/[1-N] (6 pages)
└── Name Pages: /names/islamic/[slug] (~18,000+)

SILO 2: CHRISTIAN NAMES
├── Hub: /names/religion/christian/1
├── Gender: /christian/boy-names, /christian/girl-names
├── Letter: /names/christian/letter/[A-Z]/[1-N] (78 pages)
├── Origin: /names/christian/origin/[origin]/[1-N] (~20 pages)
├── Category: /names/christian/categories/[type]/[1-N] (6 pages)
└── Name Pages: /names/christian/[slug] (~11,000+)

SILO 3: HINDU NAMES
├── Hub: /names/religion/hindu/1
├── Gender: /hindu/boy-names, /hindu/girl-names
├── Letter: /names/hindu/letter/[A-Z]/[1-N] (78 pages)
├── Origin: /names/hindu/origin/[origin]/[1-N] (~20 pages)
├── Category: /names/hindu/categories/[type]/[1-N] (6 pages)
└── Name Pages: /names/hindu/[slug] (~15,000+)

SUPPORTING SILOS:
├── BLOG SILO: /blog/[slug], /guides/[slug]
├── TOOL SILO: /search, /advanced-search, /my-names
├── TREND SILO: /trending-names, /popularity, /unique-names
└── REFERENCE SILO: /languages, /name-meanings, /names-by-meaning
```

## Authority Flow Assessment

**Current Flow Problems:**

1. **Name pages receive minimal inbound authority** — Each of the ~44,000 name pages gets only 50 names per listing page, with thin contextual linking. Authority from religion hubs (DA 80) is diluted across 100+ pagination pages before reaching individual names.

2. **Filter pages are orphaned from sitemap** — Letter, origin, and category pages beyond page 1 are not in any sitemap, forcing crawlers to discover them only through pagination links on listing pages.

3. **Blog posts under-link to name pages** — Blog posts reference names via `FeaturedNameLink` components but only link to 5-10 names per post. With 20+ blog posts, this creates at most 200 name page links — less than 1% of the database.

4. **No cross-silo linking** — Islamic name pages do not link to Christian or Hindu equivalents. A user researching "Amina" (Islamic) has no clear path to similar names in Christian or Hindu traditions.

5. **Gender hub pages are dead ends** — `/islamic/boy-names` links to `/names/religion/islamic/1` but does not link back to letter/origin/category filters, creating a one-way flow.

## Crawl Depth Analysis

| Page Type | Click Depth from Home | Max Crawl Depth | Assessment |
|---|---|---|---|
| Homepage | 0 | — | Optimal |
| `/names` | 1 | — | Optimal |
| `/names/religion/[religion]/1` | 2 | — | Optimal |
| `/names/[religion]/letter/[a]/1` | 3 | — | Acceptable |
| `/names/[religion]/[slug]` | 3-4 | — | Acceptable |
| `/blog/[slug]` | 2 | — | Optimal |
| `/search/[term]` | 2 | — | Acceptable but thin |
| `/guides/[slug]` | 2 | — | Optimal |
| `/names/[religion]/letter/[z]/50` | 4 | — | Deep but paginated |

## Orphan Pages

| Page | Orphan Reason | Impact |
|---|---|---|
| `/viral-names` | Redirects to `/trending-names` but still in sitemap | Low (301 present) |
| `/popular-by-state` | Redirects to `/names` but still in sitemap | Low (301 present) |
| `/my-names` | Personal tool with no inbound links from content pages | Medium |
| `/advanced-search` | Tool page with minimal content and no inbound links | Medium |
| Blog posts with low featured name count | 15+ blog posts link to fewer than 5 name pages each | High |

## Duplicate Content Clusters

1. **Blog post slugs vs guide slugs** — `/blog/[slug]` and `/guides/[slug]` draw from the same `blog-posts.json` data source. Posts with matching IDs create duplicate content across two URL patterns.

2. **Gender pages vs religion pages** — `/islamic/boy-names` and `/names/religion/islamic/1` both serve Islamic boy names with overlapping content. No canonical relationship established.

3. **Search term pages vs main search** — `/search/[term]` pages and `/search` may show similar content for generic terms.

---

[← Back to main report](SEO-AUDIT-REPORT-V2.md)