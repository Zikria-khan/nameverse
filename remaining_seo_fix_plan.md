# Remaining SEO Fix Plan

This document explains how to fix the remaining issues reported in `issues_overview_report.csv` and what to do next.

## 1. Audit and prioritize remaining issues

### High priority
- `Response Codes: Internal Server Error (5xx)`
- `Response Codes: Internal Client Error (4xx)`
- `Hreflang: Inconsistent Language & Region Return Links`
- `Canonicals: Canonicalised`

### Medium/low priority
- `Page Titles: Over 60 Characters` / `Page Titles: Over 561 Pixels`
- `Page Titles: Duplicate`
- `Meta Description: Over 155 Characters` / `Meta Description: Over 985 Pixels`
- `Meta Description: Duplicate`
- `URL: Uppercase` / `URL: Contains Space`
- `H1: Duplicate`
- `H2: Non-Sequential` / `H2: Multiple` / `H2: Duplicate`
- `Links: Non-Descriptive Anchor Text In Internal Outlinks`
- `Content: Readability Difficult` / `Content: Readability Very Difficult`
- `Content: Low Content Pages`
- `Images: Missing Size Attributes`
- `Hreflang: Missing X-Default`

## 2. What to fix in code

### 2.1 Fix metadata issues
- Search your project for metadata generation functions, especially in:
  - `src/app/layout.js`
  - `src/app/page.js`
  - `src/app/blog/[slug]/page.jsx`
  - `src/lib/seo/name-page-seo.jsx`
  - any `generateMetadata` or `metadata` export
- Make sure each page has a unique, concise title under ~60 characters and a unique description under ~155 characters.
- Avoid duplicate titles and duplicate descriptions across similar pages.
- If a title or description is generated dynamically from content, add validation or truncation logic.

### 2.2 Fix hreflang and canonical tags
- Ensure every page with alternate language versions uses matching `hreflang` values on both the page and its alternate return links.
- Add a `x-default` alternate entry on language switch pages or international homepages.
- Ensure canonical tags point to the correct preferred URL, not a different page unless intentionally canonicalizing duplicates.
- Remove internal links to non-canonical versions wherever possible.

### 2.3 Fix URL hygiene
- Keep site URLs lowercase and replace spaces with hyphens.
- If you do rename URLs, add 301 redirects from old URLs to preserve traffic and avoid 404 errors.
- Remove unnecessary query parameters from key indexable pages.

### 2.4 Fix headings and page structure
- Give each page a unique `<h1>`.
- Keep heading structure sequential: `<h1>` then `<h2>`, then `<h3>`, etc.
- Use multiple `<h2>` elements only when they are part of a logical structure, not duplicates across identical pages.

### 2.5 Fix anchor text and content quality
- Replace generic links like "click here" or "learn more" with descriptive text such as "view baby name meanings".
- Add more useful body copy to pages with low content counts.
- Rewrite hard-to-read content with shorter sentences and simpler vocabulary.

### 2.6 Fix images and page performance
- Add explicit `width` and `height` attributes to all HTML image elements and `next/image` components when possible.
- This helps reduce CLS and improve page stability.

### 2.7 Verify security headers
- Confirm the `Content-Security-Policy` and `Referrer-Policy` headers are returned by your deployed site on every page.
- Your code already added these in `next.config.mjs`; validate them with a browser devtools network panel or a site scanner.

## 3. How to validate after each change
- Re-run the SEO crawler or use a similar audit tool after each main fix group.
- Validate page titles, meta descriptions, hreflang, canonical tags, and response codes.
- Use browser checks for 404/500 pages and confirm redirects.

## 4. Recommended next steps
1. Fix all 5xx and 4xx errors first. These are the most important because they break access to pages.
2. Fix hreflang/canonical issues next to preserve international indexing and avoid duplicate content.
3. Then fix title/description length and duplicate metadata.
4. Clean up heading structure, anchor text, content readability, and low-content pages.
5. Finally, fix URL casing/spaces and verify image dimensions.

## 5. If you want me to implement it
- I can update your project to fix one category at a time.
- For example, I can start by making all page titles and meta descriptions consistent and unique.
- Or I can audit your `src/app` and `src/lib/seo` metadata code and apply the required fixes directly.

## 6. Suggested file to keep track
- `remaining_seo_fix_plan.md` (this file)
- `final.md` (summary of completed fixes)

> Use this plan as a checklist. The next code task is to audit metadata generation, then fix identified pages and re-run the SEO report.