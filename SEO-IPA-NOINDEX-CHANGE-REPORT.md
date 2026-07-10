# SEO Change Report — IPA/Arabic URL Crawl Defense

**Date:** 2026-07-10
**Repo:** nameverse (Next.js 16 App Router, `src/app/`)
**Scope:** Address the GSC audit's IPA/Arabic-character broken-URL class (Problem 2 from the master SEO brief).

---

## Important: Prompt path mismatch

The master SEO prompt was written against a **generic** Next.js template whose assumed paths
(`app/layout.js`, `app/names/[religion]/[name]/page.js`, top-level `next.config.js`, etc.) do
**not exist** in this repo. This codebase uses `src/app/`, `.mjs` config, and `.jsx` page files,
and it **already implements** most of the prompt's fixes. Blindly following the template would have
created duplicate/conflicting files and broken the build. Each of the 7 problems was verified
against the real code first.

## Status of the 7 claimed problems in this repo

| # | Claimed problem | Actual status |
|---|---|---|
| 1 | Site name shows "Vercel" | **Already fixed** — `src/app/layout.js` exports full `metadata` (`siteName: "NameVerse"`, `og:site_name`, `application-name`), plus WebSite JSON-LD. `public/manifest.json` already says `NameVerse`. |
| 2 | IPA/Arabic rendered as `<a href>` → 404s | Root cause **already fixed** — pronunciation/IPA/Arabic render as plain `<p>`/`<span>` (`src/components/name/Meaning.jsx`, `NameDetailClient.jsx`). Zero `<a href>`/`<Link href>` wrappers found. Only the defensive noindex header was missing → added. |
| 3 | 14,838 canonical conflicts | **Already fixed** — name page renders canonical + `generateMetadata`; letter pages have canonical + prev/next. |
| 4 | 24,799 name 404s | **Already handled** — `src/app/not-found.jsx` exists; related/similar/variation links pre-validated against backend (`[slug]/page.jsx`). |
| 5 | Broken title fallbacks | **Already handled** — `generateMetadata` returns descriptive titles and `noindex` on missing/failed data; not blank. |
| 6 | No structured data | **Already fixed** — name page emits WebPage/Article/DefinedTerm/FAQ/Breadcrumb JSON-LD. |
| 7 | No sitemap/robots.txt | **Already present** — `src/app/sitemap.xml/route.js` and `src/app/robots.txt/route.js` exist. Special-char Disallow lines were missing → added. |

## Files changed

- `next.config.mjs` — added `X-Robots-Tag: noindex` header for IPA/Arabic/Urdu path URLs.
- `src/app/robots.txt/route.js` — added `Disallow` rules for percent-encoded special-char paths (authoritative robots source).
- `public/robots.txt` — mirrored the same `Disallow` rules as a backup.

## What was added

### `next.config.mjs` (inside `headers()`)
```js
// DEFENSE: IPA (e.g. ˈroʊ.i, ʃaːhroːx) and Arabic/Urdu text are rendered as
// plain <span> content, never as links. But if a crawler ever reaches a URL
// whose path begins with IPA or Arabic/Urdu characters (the 190+ broken-404
// class from the GSC audit), noindex it so it never competes with real pages.
{
  source:
    '/:path([ˈˌæɑɒɔəɛɜɪɨɵʊʌʒθðʃŋɹɾ\\u0600-\\u06FF\\u0750-\\u077F].*)',
  headers: [{ key: 'X-Robots-Tag', value: 'noindex' }],
}
```

### `src/app/robots.txt/route.js`
```
# Block special-character paths (IPA, Arabic, Urdu) so crawlers never index
# the broken-404 class generated when phonetic/AR text is mistaken for a URL.
Disallow: /*%E1%BD%
Disallow: /*%CA%
Disallow: /*%C9%
Disallow: /*%D9%
Disallow: /*%DA%
Disallow: /*%E2%80%8C*
```

### `public/robots.txt`
Same six `Disallow` lines mirrored after the existing query-spam rules.

## Why
- `next.config.mjs`: the missing `X-Robots-Tag: noindex` for IPA/Arabic/Urdu-character URLs stops
  Google indexing that 404 class (residual of Problem 2). Regex verified to match `ˈroʊ.i` and
  `مُسْتَسِيْم` while NOT matching `/names/islamic/aybah`.
- `src/app/robots.txt/route.js`: the file Vercel actually serves; `Disallow` keeps crawlers from
  requesting special-char paths.
- `public/robots.txt`: kept consistent as a fallback if the route is ever removed.

## REVISION — changes reverted (2026-07-10)

After review against `middleware.js`, **all three changes above were reverted**. They were
redundant at best and an anti-pattern at worst:

- `next.config.mjs` header was **dead code**: `middleware.js` matcher
  (`/((?!_next/static|_next/image|favicon.ico).*)`) intercepts every request before it reaches
  Next's route/header pipeline, and `middleware.js:178-200` already returns a hard `410 Gone` with
  `X-Robots-Tag: noindex` for any non-ASCII/IPA/percent-encoded path. Responses returned directly by
  middleware never continue to page rendering, so the config `headers()` block never fires.
- `robots.txt` `Disallow` additions were an **anti-pattern**: the 190+ IPA/Arabic URLs are already
  indexed. Blocking them in robots.txt stops Googlebot from re-fetching them to see the 410, risking
  a "Indexed, though blocked by robots.txt" state that lingers instead of self-cleaning.

`git diff --stat` after revert: 3 files changed, 27 deletions, 0 insertions (exactly the lines
added earlier).

## Why nothing needs changing

The special-character 404 class is already handled correctly at the edge:

- `middleware.js:178-188` — non-ASCII chars → `410` + `X-Robots-Tag: noindex`.
- `middleware.js:190-200` — percent-encoded sequences → `410` + `X-Robots-Tag: noindex`.
- All other `410` paths in middleware already carry `X-Robots-Tag: noindex`.

Google will drop the stale entries on its own once it recrawls and receives the 410 — which already
happens, unaided. No code change is required for this sub-problem.

## The actual driver of low CTR / positions

Per the GSC export cross-check, the real issue is **competitive position, not technical SEO**:
ranking ~7–11 against entrenched, higher-authority incumbents (UrduPoint, Hamariweb, Behind the
Name, MuslimBabyNames.net) for identical query intent, on a young domain. The lever that moves the
needle is content depth/uniqueness per page and backlinks/domain authority — not metadata tweaks.

## Net result of this task
- No production files were left modified.
- `node --check next.config.mjs` → OK; `node --check src/app/robots.txt/route.js` → OK.
- Repo is back to its prior, correct state; special-character URLs continue to return `410` +
  `noindex` via middleware.
