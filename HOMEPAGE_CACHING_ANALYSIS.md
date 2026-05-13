# Homepage Caching Analysis

**File:** `src/app/page.js`  
**Date:** May 13, 2026

---

## Current Caching Behavior

| Setting | Current Value | Default Behavior |
|---------|--------------|------------------|
| `revalidate` | **Not set** | Static (build-time only) |
| `dynamic` | **Not set** | `'auto'` — static by default |
| `fetch cache` | **Not used** | No data fetching from API |
| Data source | `fs.readFileSync` at **build time** | Build-only |

## Verdict: Your homepage is FULLY STATIC ✅

This means:
- ✅ **Served from Vercel Edge CDN** — never hits the origin server after deploy
- ✅ **Zero Fast Origin Transfer cost** per visit
- ✅ **Zero Function Invocations** per visit
- ✅ **Zero ISR Writes** per visit
- 🟡 **Only passes through middleware** (check if middleware.js processes it)
- ⚠️ **Blog articles are stale** until next deploy

## Impact on Vercel Limits

| Metric | Homepage Contribution | Status |
|--------|----------------------|--------|
| Fast Origin Transfer | **0 GB** | ✅ Not a factor |
| ISR Writes | **0** | ✅ Not a factor |
| Edge Middleware | Only if `matcher` includes `/` | 🟡 Check middleware.js |
| Function Invocations | **0** | ✅ Not a factor |
| Function Duration | **0 GB-Hrs** | ✅ Not a factor |

## Is There a Problem?

**Only one potential issue:** If you update blog posts frequently (daily), the homepage still shows old articles until you:
1. Manually trigger a rebuild via Vercel Deploy Hook
2. Add ISR with `export const revalidate = 86400` (once per day)
3. Use `revalidatePath('/')` via an API route when blog posts update

## Recommendation

### Option A: Keep Static (if blog updates are rare)
No changes needed. Rebuild manually when blog posts change.

### Option B: Add Daily ISR (if blog updates daily)
```js
// Add this to src/app/page.js
export const revalidate = 86400; // Revalidate once per day
```

### Option C: On-Demand Revalidation (if blog updates are frequent)
Create an API webhook that triggers `revalidatePath('/')` when blog posts change.

---

## Summary

**Your homepage is already optimally cached.** The real limit issues are coming from:
1. **Name detail pages** (`/names/[religion]/[slug]`) — ISR writes + origin fetches
2. **Name listing pages** (`/names/[religion]/letter/[letter]/[page]`) — ISR writes  
3. **Middleware** running on every request including static assets