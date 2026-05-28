# Site Optimization & Bug Fixes - Change Log

**Date:** 2026-05-28  
**Purpose:** Reduce ISR writes, fix slug validation issues, add CI validation

---

## 1. Slug Validation Fixes

### Issue
Duplicate function definitions in `createSafeSlug.js` and unsafe slug patterns (`.name.toLowerCase()`) were causing potential URL issues.

### Changes

#### `src/lib/utils/createSafeSlug.js`
- **Removed** duplicate function definition (lines were duplicated)
- Kept single clean export with proper JSDoc

#### `build-blogs.js`
- **Added** `createSafeSlug()` and `validateSlug()` functions with URL regex `^[a-z0-9-]+$`
- **Modified** `generateSitemap()` to:
  - Validate each slug before generating XML
  - Detect and throw error on duplicate slugs
- **Modified** post generation to validate and sanitize IDs using `createSafeSlug()`

#### `add-blog-posts.js`
- **Added** `createSafeSlug()` and `validateSlug()` functions
- **Modified** `generateBlogPost()` to sanitize and validate slugs
- **Modified** `generateSitemapEntries()` to validate slugs and detect duplicates

---

## 2. Frontend URL Safety Fixes

### `src/app/names-by-meaning/page.jsx`
- **Added** import: `import { createSafeSlug } from '@/lib/utils/createSafeSlug'`
- **Changed** `href={`/names/${name.religion}/${name.name.toLowerCase()}`}` to use `createSafeSlug(name.name)`

### `src/app/name-meanings/page.jsx`
- **Added** import: `import { createSafeSlug } from '@/lib/utils/createSafeSlug'`
- **Changed** `href={`/names/${name.religion}/${name.name.toLowerCase()}`}` to use `createSafeSlug(name.name)`

### `src/app/search/GlobalSearchClient.jsx`
- **Added** import: `import { createSafeSlug } from '@/lib/utils/createSafeSlug'`
- **Changed** `href={`/names/${religion}/${name.slug}`}` to use `createSafeSlug(name.name)`

### `src/app/names/religion/[religion]/[page]/page.jsx`
- **Changed** popular names section to use `createSafeSlug()` instead of `.name.toLowerCase()`
- All 3 religion blocks (islamic, hindu, christian) now generate safe slugs for anchor links

---

## 3. ISR Cache Optimization

Reduced ISR revalidation times to minimize Vercel usage (writes, CPU, transfer):

| File | Old Value | New Value | Reduction |
|------|-----------|-----------|-----------|
| `src/app/page.js` | 7 days (604800s) | 30 days (2592000s) | 4.3x fewer homepage revalidations |
| `src/app/sitemap.xml/route.js` | 24 hours (86400s) | 60 days (5184000s) | 59x fewer sitemap Regenerations |
| `src/app/blog/[slug]/page.jsx` | 7 days (604800s) | 90 days (7776000s) | 13x fewer blog post revalidations |
| `src/app/blog/page.jsx` | 7 days (604800s) | 90 days (7776000s) | 13x fewer blog index revalidations |
| `src/app/names/[religion]/[slug]/page.jsx` | 30 days (2592000s) | 90 days (7776000s) | 3x fewer name detail pages |
| `src/app/names/religion/[religion]/[page]/page.jsx` | 7 days (604800s) | 60 days (5184000s) | 8.6x fewer religion list pages |
| `src/app/names/[religion]/categories/[category]/[page]/page.jsx` | 7 days (604800s) | 60 days (5184000s) | 8.6x fewer category pages |
| `src/app/names/[religion]/origin/[origin]/[page]/page.jsx` | 7 days (604800s) | 60 days (5184000s) | 8.6x fewer origin pages |
| `src/app/names/[religion]/letter/[letter]/[page]/page.jsx` | 7 days (604800s) | 60 days (5184000s) | 8.6x fewer letter pages |

---

## 4. CI Validation

### `scripts/ci-validate-slugs.js` (New)
- Validates blog post slugs match `^[a-z0-9-]+$`
- Validates sitemap URLs contain safe slugs
- Warns about unsafe patterns (`.name.toLowerCase()` without createSafeSlug)
- Exits with error on invalid slugs

### `.github/workflows/validate-slugs.yml` (New)
```yaml
name: Validate Slugs and URLs
on:
  push:
    branches: [main, master]
    paths: ['public/data/blog-posts.json', '**/*.{js,jsx,ts,tsx,mjs}']
  pull_request:
    branches: [main, master]
    paths: ['public/data/blog-posts.json', '**/*.{js,jsx,ts,tsx,mjs}']
```
- Runs on push/PR for relevant files
- Uses `node scripts/ci-validate-slugs.js`

### `package.json`
- **Added** script: `"ci:validate-slugs": "node scripts/ci-validate-slugs.js"`

---

## 5. Validation Results

After changes, both validation scripts pass with no errors:
```
🔍 Validating sitemap URLs and slugs...
✅ All slugs and sitemap URLs are valid!

🔍 CI: Validating all slugs and URLs...
✅ All slugs and URLs are valid!
```

---

## Impact on Vercel Usage

| Metric | Expected Change |
|--------|---------------|
| ISR Writes | **Reduced by ~50-80%** (longer cache times) |
| Fast Origin Transfer | Reduced (fewer ISR page regenerations) |
| Edge Request CPU | Reduced (static pages cached longer) |
| Fluid Active CPU | Reduced (less frequent processing) |

---

## Files Modified Summary

| File | Type | Changes |
|------|------|---------|
| `src/lib/utils/createSafeSlug.js` | Bug Fix | Removed duplicate code |
| `build-blogs.js` | Enhancement | Added slug validation |
| `add-blog-posts.js` | Enhancement | Added slug validation |
| `src/app/names-by-meaning/page.jsx` | Bug Fix | Safe slug usage |
| `src/app/name-meanings/page.jsx` | Bug Fix | Safe slug usage |
| `src/app/search/GlobalSearchClient.jsx` | Bug Fix | Safe slug usage |
| `src/app/names/religion/[religion]/[page]/page.jsx` | Bug Fix | Safe slug usage |
| `src/app/page.js` | Optimization | Extended ISR to 30 days |
| `src/app/sitemap.xml/route.js` | Optimization | Extended ISR to 60 days |
| `src/app/blog/[slug]/page.jsx` | Optimization | Extended ISR to 90 days |
| `src/app/blog/page.jsx` | Optimization | Extended ISR to 90 days |
| `src/app/names/[religion]/[slug]/page.jsx` | Optimization | Extended ISR to 90 days |
| `src/app/names/religion/[religion]/[page]/page.jsx` | Optimization | Extended ISR to 60 days |
| `src/app/names/[religion]/categories/[category]/[page]/page.jsx` | Optimization | Extended ISR to 60 days |
| `src/app/names/[religion]/origin/[origin]/[page]/page.jsx` | Optimization | Extended ISR to 60 days |
| `src/app/names/[religion]/letter/[letter]/[page]/page.jsx` | Optimization | Extended ISR to 60 days |
| `scripts/ci-validate-slugs.js` | New | CI validation script |
| `.github/workflows/validate-slugs.yml` | New | GitHub Actions workflow |