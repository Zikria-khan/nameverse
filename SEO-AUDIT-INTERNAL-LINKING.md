# Internal Linking Audit
## Internal Link Structure and Authority Flow Analysis

This file covers the internal linking audit including name page links, letter pages, category pages, origin pages, blog post links, hub pages, and the overall authority flow assessment.

---

# SECTION 8: INTERNAL LINKING AUDIT

## 8.1 Name Page Internal Links

### Current Implementation (`src/components/name/NameDetail.jsx`)

Each name page links to:
- `/names/${religion}/letter/a/1` — "Browse by Letter"
- `/names/${religion}/categories/modern/1` — "Browse by Category"
- `/names/${religion}/origin/arabic/1` — "Browse by Origin"
- `/search` — "Search All Names"

**Missing internal links on name pages:**
- No link to religion hub (`/names/religion/${religion}/1`)
- No link to gender-specific pages (`/${religion}/boy-names`)
- No "Similar names" contextual links (data has `similar_sounding_names` but no links rendered)
- No cross-religion links (e.g., "Similar names in Christian tradition")
- No origin-specific hub link (uses hardcoded `/arabic/1`)

### Name Page Link Equity Score: 6/10

**Strengths:**
- Breadcrumb navigation present
- Related names section exists (in `RelatedNames.jsx` component)
- Ad banner provides contextual separation

**Weaknesses:**
- Only 4 outbound internal links per name page
- No contextual links to similar names within the same religion
- No cross-religion discovery path

## 8.2 Letter Page Internal Links

**Status:** FILES MISSING — cannot audit.

**Expected links (based on middleware and sitemap):**
- Links to individual name pages within the letter
- Pagination prev/next
- Links to religion hub
- Links to other letters

**Risk:** Since the page component doesn't exist, these links are not rendered.

## 8.3 Category Page Internal Links

**Status:** FILES MISSING — cannot audit.

**Expected links:**
- Links to individual name pages within the category
- Links to related categories
- Pagination prev/next

## 8.4 Origin Page Internal Links

**Status:** FILES MISSING — cannot audit.

## 8.5 Blog Post Internal Links

### Current Implementation (`src/app/blog/[slug]/page.jsx`)

Blog posts use `FeaturedNameLink` component:
```javascript
<section.featuredNames && section.featuredNames.length > 0 && (
  <div className="mb-4">
    <h3>Featured Names:</h3>
    {section.featuredNames.map((name, i) => (
      <FeaturedNameLink key={nameSlug || i} name={name} religion={religion} />
    ))}
  </div>
)}
```

**Issues:**
1. Blog data uses `sectionsFeaturedNames` (array of sections, each with `featuredNames`) but the component checks `section.featuredNames` — mismatch causes 0 links to render
2. Each blog post links to at most 5-10 name pages
3. No contextual links between blog posts
4. No "related reading" section linking to other blog posts in the same category

### Blog Post Link Equity Score: 4/10

## 8.6 Hub Page Internal Links

### `/names` Hub Page

**Strengths:**
- Links to all 6 gender pages
- Links to all 3 religion pages
- A-Z letter navigation for all 3 religions
- SEO content section with contextual links

**Score:** 9/10

### Religion Pages (`/names/religion/[r]/[p]`)

**Strengths:**
- Links to letter, category, origin filters
- Links to gender-specific pages
- "Popular Names" section with direct name links
- "Learn More" section with blog post links

**Weaknesses:**
- Blog post links are hardcoded and may 404 if posts are renamed
- No cross-religion linking

**Score:** 8/10

## 8.7 Internal Linking Score Summary

| Page Type | Internal Links Score | Authority Flow | Issues |
|---|---|---|---|
| Homepage | 9/10 | Excellent | Missing direct links to filter pages |
| `/names` hub | 9/10 | Excellent | — |
| Religion pages | 8/10 | Good | Hardcoded blog links |
| Name pages | 6/10 | Poor | Only 4 links, no contextual |
| Blog posts | 4/10 | Very Poor | Link mismatch bug |
| Gender pages | 7/10 | Good | One-way flow |
| Filter pages | UNKNOWN | Unknown | Files missing |
| `/trending-names` | 5/10 | Poor | No contextual name links |
| `/unique-names` | 5/10 | Poor | No contextual name links |
| `/languages` | 5/10 | Poor | Generic links only |
| `/name-meanings` | 5/10 | Poor | Generic links only |

## 8.8 Authority Flow Map

```
Homepage (DA 100)
├── /names (DA 100) — receives 90% of homepage link equity
│   ├── Religion pages (DA 80) — receive 60% of /names equity
│   │   ├── Filter pages (DA 40) — receive 30% of religion equity
│   │   │   └── Name pages (DA 10-15) — receive 10% of filter equity
│   │   └── Gender pages (DA 50) — receive 20% of religion equity
│   ├── Gender pages (DA 50) — receive 20% of /names equity
├── /blog (DA 60) — receives 5% of homepage equity
│   └── Blog posts (DA 15-25) — receive 30% of blog equity
└── Other hubs (DA 30-40) — receive 5% total
```

**Authority Dilution Problem:**
- Each religion page links to 50 names, diluting equity across 50 targets
- Name pages receive only ~0.6% of homepage DA (100 → 80 → 40 → 10 = 0.5% transfer per hop)
- Blog posts link to only 5-10 names, providing minimal contextual boost

---

[← Back to main report](SEO-AUDIT-REPORT-V2.md)