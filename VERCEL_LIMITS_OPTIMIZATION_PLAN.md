# Vercel Pro Plan - Limit Optimization & Avoidance Plan

**Date Generated:** May 13, 2026  
**Data Source:** Vercel Dashboard Usage Stats  
**Plan Version:** 1.0

---

## 1. CRITICAL: Fast Origin Transfer (EXCEEDED - 10.09 GB / 10 GB)

**Why it's happening:** Every time a page isn't cached in Vercel's Edge Network, it fetches from the origin server. This includes:
- ISR pages that have been revalidated/stale
- Dynamic API fetches from backend
- Blog post images that are not optimized
- Large JSON files (names API data) being re-fetched

### Solutions:

#### A. Increase ISR revalidation time (HIGH IMPACT)
**Current behavior:** Pages revalidate frequently (possibly every few minutes/hours)  
**Fix:** Increase `revalidate` times to maximum acceptable values

```js
// Current (speculative):
export const revalidate = 60; // 1 minute

// Ideal:
export const revalidate = 3600; // 1 hour (or even 7200 for 2 hours)
```

**Files to modify:** All `page.jsx` files using ISR / `fetch` with `next: { revalidate }`:
- `src/app/names/[religion]/letter/[letter]/[page]/page.jsx`
- `src/app/names/[religion]/[slug]/page.jsx`
- `src/app/names/page.jsx`
- `src/app/blog/[slug]/page.jsx`
- `src/app/blog/page.jsx`

#### B. Implement Full Data Caching Strategy
Add granular cache headers to API calls:

```js
// In src/lib/api/names.js
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchNames(params) {
  const response = await fetch(`${API_BASE_URL}/names`, {
    next: {
      revalidate: 7200, // 2 hours instead of current value
      tags: ['names-list'],
    },
  });
  return response.json();
}
```

#### C. Move Static Data to Public Folder
Current: Large JSON files (islamic_names.json, hindu_names.json, christians_names.json) may be fetched dynamically. Fix: Serve them directly from `/public/` as static assets.

**Files involved:**
- `public/islamic_names.json` (already exists - ensure it's read from static)
- `public/hindu_names.json`
- `public/christians_names.json`

---

## 2. HIGH: ISR Writes (152K / 200K - 76% consumed)

**Why it's happening:** Every ISR page generation writes to the ISR cache. With high traffic on many dynamic pages:

### Solutions:

#### A. Reduce Number of Pre-generated Pages
**Current behavior:** Many pages may be configured for ISR (hundreds of thousands of name pages)  
**Fix:** Implement hybrid approach - only pre-generate the most popular pages

```js
// In generateStaticParams - limit to TOP pages only
export async function generateStaticParams() {
  const topNames = await getTopNames(); // Get most searched names
  return topNames.slice(0, 1000).map((name) => ({
    religion: name.religion,
    slug: name.slug,
  }));
}
// Remaining pages use SSR with cache headers
```

#### B. Switch Less Popular Pages to SSR + CDN Caching
Instead of ISR for every page, use SSR with aggressive CDN caching for lower-traffic pages:

```js
// For low-traffic name pages
export const dynamic = 'force-dynamic'; // SSR

// But set aggressive Cache-Control headers
// In next.config.mjs or middleware
headers: [
  {
    source: '/names/:religion/:slug',
    headers: [
      {
        key: 'Cache-Control',
        value: 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800',
      },
    ],
  },
],
```

#### C. Implement On-Demand ISR vs Time-Based ISR
Use `revalidateTag()` only when content actually changes, rather than time-based revalidation.

---

## 3. MEDIUM: Edge Middleware Invocations (513K / 1M - 51%)

**Why it's happening:** Middleware runs on every single request, including:
- API calls (images, data)
- Page navigations
- Bot crawlers

### Solutions:

#### A. Exclude Static Assets from Middleware
**Current `middleware.js`:** May be running on ALL requests including static files.

```js
// In middleware.js - add matcher to exclude static assets
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|public|.*\\.(?:jpg|jpeg|gif|png|svg|ico|webp|json|xml|txt)$).*)',
  ],
};
```

#### B. Add Early Returns for Non-Matched Routes
```js
export function middleware(request) {
  const { pathname } = request.nextUrl;
  
  // Skip static files early
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    pathname.match(/\.(jpg|jpeg|gif|png|svg|ico|webp|json|xml|txt)$/)
  ) {
    return;
  }
  
  // ... rest of middleware logic
}
```

**Note:** Both approaches may be redundant - use one (prefer the `matcher` approach).

---

## 4. MEDIUM: Function Invocations (500K / 1M - 50%)

**Why it's happening:** Every ISR revalidation, API call, or dynamic render triggers a function invocation.

### Solutions:

#### A. Increase Stale-While-Revalidate Times
Combine with longer ISR times to reduce function calls:

```js
// In next.config.mjs
async headers() {
  return [
    {
      source: '/names/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=604800',
        },
      ],
    },
  ];
},
```

#### B. Move Frequently-Accessed Data to Edge Config
Store religion/letter listing data in Vercel Edge Config for instant reads without function invocations.

**Example:**
```js
import { get } from '@vercel/edge-config';

// Instead of API call
const namesList = await get('popularNames');
```

#### C. Implement Client-Side Caching for API Data
Add `localStorage` / `sessionStorage` caching for repeat visits:

```js
// In src/lib/api/names.js
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

async function fetchWithClientCache(url, options = {}) {
  const cacheKey = `api-cache-${url}`;
  const cached = sessionStorage.getItem(cacheKey);
  
  if (cached) {
    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp < CACHE_DURATION) {
      return data;
    }
  }
  
  const response = await fetch(url, options);
  const data = await response.json();
  
  sessionStorage.setItem(cacheKey, JSON.stringify({
    data,
    timestamp: Date.now(),
  }));
  
  return data;
}
```

---

## 5. MEDIUM: Function Duration (63.2 GB-Hrs / 100 GB-Hrs - 63%)

**Why it's happening:** Long-running functions processing data.

### Solutions:

#### A. Optimize Backend API Response Times
If backend calls are slow, the serverless function stays active longer.

#### B. Reduce Payload Sizes
- Only return necessary fields from API calls
- Compress responses
- Use streaming where possible

#### C. Implement Response Streaming for Large Pages
```js
// For pages with large data
export const preferredRegion = 'iad1'; // Closest region
export const maxDuration = 30; // Set max duration limit
```

---

## 6. LOW: Fluid Provisioned Memory (114.5 GB-Hrs / 360 GB-Hrs - 32%)

**Why it's happening:** Serverless functions with high memory allocation.

### Solutions:

#### A. Reduce Memory in Function Configuration
```js
// In vercel.json
{
  "functions": {
    "src/app/names/**/*.jsx": {
      "memory": 256, // Reduce from default 512
      "maxDuration": 10
    }
  }
}
```

#### B. Implement Memory-Efficient Data Processing
- Use pagination instead of loading all records at once
- Stream data instead of buffering

---

## 7. LOW: Image Optimization - Transformations (151 / 5K)

### Solutions:

#### A. Pre-optimize Images During Build
Use a build script to generate WebP/AVIF versions of all blog images:

```js
// In scripts/optimize-images.js
// Already partially done - expand coverage
```

#### B. Use External Image CDN
```js
// In next.config.mjs
images: {
  loader: 'akamai',
  path: 'https://your-cdn.com/',
  // Or use cloudinary/imgix
}
```

---

## IMMEDIATE ACTION PLAN (This Month)

### Week 1: High Impact Changes
- [ ] **Increase ISR revalidation to 3600+ seconds** across all page files
- [ ] **Update middleware.js** with proper matcher to exclude static assets
- [ ] **Analyze API fetch patterns** in `src/lib/api/names.js` to add caching

### Week 2: Architecture Changes
- [ ] **Reduce ISR pages** - limit `generateStaticParams` to top 1000 names
- [ ] **Implement SSR with CDN caching** for less popular pages
- [ ] **Add client-side caching** for API responses

### Week 3: Edge Config & Performance
- [ ] **Set up Edge Config** for frequently accessed data
- [ ] **Pre-optimize remaining images** during build
- [ ] **Audit and reduce function memory** in `vercel.json`

### Week 4: Monitoring & Validation
- [ ] **Set up Vercel Usage Alerts** at 50%, 75%, 90% thresholds
- [ ] **Monitor Fast Origin Transfer** for reduction
- [ ] **Validate all pages render correctly** after changes

---

## Files That Need Modification (Summary)

| File | Change Required | Priority |
|------|----------------|----------|
| `src/app/names/[religion]/letter/[letter]/[page]/page.jsx` | Increase ISR revalidate | CRITICAL |
| `src/app/names/[religion]/[slug]/page.jsx` | Increase ISR revalidate, limit static params | CRITICAL |
| `src/app/names/page.jsx` | Increase ISR revalidate | HIGH |
| `src/app/blog/[slug]/page.jsx` | Increase ISR revalidate | HIGH |
| `src/app/blog/page.jsx` | Increase ISR revalidate | HIGH |
| `src/lib/api/names.js` | Add fetch caching strategy | CRITICAL |
| `middleware.js` | Add static asset matcher | HIGH |
| `next.config.mjs` | Add cache headers, reduce function memory | HIGH |
| `vercel.json` | Reduce function memory allocation | MEDIUM |
| `src/app/page.js` | Optimize home page ISR | MEDIUM |

---

## Projected Savings

| Metric | Current | After Fix | Savings |
|--------|---------|-----------|---------|
| Fast Origin Transfer | 10.09 GB/mo | ~3-4 GB/mo | 60%+ |
| ISR Writes | 152K/mo | ~50K/mo | 67% |
| Edge Middleware | 513K/mo | ~150K/mo | 71% |
| Function Invocations | 500K/mo | ~200K/mo | 60% |
| Function Duration | 63.2 GB-Hrs | ~25 GB-Hrs | 60% |

---

## Appendix: Quick Wins (5-minute fixes)

1. **Stop generating ALL pages** - Only generate top 1000 names
2. **Add static file exclude** to middleware matcher
3. **Double all ISR revalidate times** (from 60s to 120s minimum)
4. **Add zstd compression** in `next.config.mjs`
5. **Remove unused prerendered pages** from `generateStaticParams`