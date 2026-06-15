# Schema Audit
## Structured Data Implementation and Recommendations

This file contains the schema audit including current schema types, implementation quality, duplicate @id problems, missing schema types, and recommendations for improvement.

---

# SECTION 12: SCHEMA AUDIT

## 12.1 Current Schema Implementation

### Name Pages

**Schema types rendered:**
- `Dataset` — ✓ Primary entity
- `ScholarlyArticle` — ✓ Secondary entity
- `FAQPage` — ✓ Dynamic FAQ (7 questions)
- `BreadcrumbList` — ✓ Navigation

**Schema quality:**
- `Dataset` schema is innovative but may not be recognized by Google's rich result processors
- `ScholarlyArticle` requires `author` Person entity — currently uses Organization
- `FAQPage` schema is well-formed and eligible for rich snippets
- `BreadcrumbList` is correct

### Blog Posts

**Schema types rendered:**
- `BlogPosting` — ✓ Primary entity
- `BreadcrumbList` — ✓ Navigation
- `FAQPage` — ✓ (when post.content.faqs exists)

**Issues:**
- `BlogPosting` uses `author` as `Person` with `name` and `jobTitle` ✓
- Missing: `publisher` logo dimensions (width/height)
- Missing: `articleSection` consistency
- Breadcrumb schema is inline in page component, not reusable

### Hub Pages

**Schema types rendered:**
- `/names` (layout): `CollectionPage` + `BreadcrumbList` + `WebSite` + `Organization`
- `/blog`: `CollectionPage` + `BreadcrumbList` + `WebSite` + `Organization` + `FAQPage` (via StructuredData component)
- `/about`: `Person` + `BreadcrumbList` (via StructuredData component)

**Issues:**
- `WebSite` and `Organization` schema duplicated across multiple pages
- No `WebSite` schema on name detail pages
- Missing `SearchAction` on hub pages (only on homepage)

### Homepage

**Schema types rendered:**
- `WebSite` (in `@graph`)
- `Organization` (in `@graph`)
- `FAQPage` (in `@graph`)
- `BreadcrumbList` (in `@graph`)

**Quality:** Excellent — uses `@graph` to avoid duplicate `@id` issues

## 12.2 Schema Issues

### Duplicate @id Problem

**Current duplicates across pages:**
```json
// In src/app/names/layout.jsx
{ "@type": "Organization", "@id": "https://nameverse.vercel.app/#organization" }

// In src/app/page.js
{ "@type": "Organization", "@id": "https://nameverse.vercel.app/#organization" }

// In src/components/SEO/StructuredData.jsx
{ "@type": "Organization", "@id": "https://nameverse.vercel.app/#organization" }
```

**Impact:** Google's knowledge graph may merge these as separate entities or discard duplicates, reducing the site's entity authority.

**Fix:** Render `WebSite` + `Organization` + `BreadcrumbList` only in root `layout.js`, then reference via `@id` on other pages.

### Missing Schema Types

| Page Type | Missing Schema | Opportunity |
|---|---|---|
| Name pages | `Person` (for the name's cultural identity) | Low |
| Name pages | `Review` (user ratings) | High |
| Blog posts | `Article` (more specific than BlogPosting) | Low |
| Hub pages | `ItemList` (for name listings) | Medium |
| `/search` | `WebSite` with `SearchAction` | ✓ Already present |
| `/trending-names` | `ItemList` | Medium |
| `/popularity` | `Dataset` (for ranking data) | Medium |

## 12.3 Schema Recommendations

1. **Consolidate WebSite + Organization schema** to root layout only
2. **Add `Review` schema** to name pages when user ratings are implemented
3. **Add `AudioObject` schema** when pronunciation audio files are added
4. **Add `VideoObject` schema** for any name-related video content
5. **Implement `Course` schema** for guide pages (educational content)
6. **Add `Book` schema** for any downloadable name guides

---

[← Back to main report](SEO-AUDIT-REPORT-V2.md)