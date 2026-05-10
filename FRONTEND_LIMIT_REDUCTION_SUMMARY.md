# Frontend Optimization Summary

## What changed

1. `middleware.js`
   - Restricted the global middleware matcher to specific site routes:
     - `/names`
     - `/names/:path*`
     - `/search/:path*`
     - `/blog/:path*`
     - `/guides/:path*`
   - This prevents middleware from running on every request and reduces unnecessary edge execution.

2. `next.config.mjs`
   - Updated `/_next/data/:path*` caching headers from `must-revalidate` to:
     - `public, max-age=0, s-maxage=86400, stale-while-revalidate=86400`
   - This allows CDN caching for page data, reducing repeated origin requests and edge data fetches.

3. `src/app/search/[term]/page.jsx`
   - Removed server-side search data fetching.
   - Search page now renders client-side only and performs search requests in the browser.
   - This shifts search request work off the server/edge and reduces server-side function invocations.

4. `src/app/search/[term]/ClientComponent.jsx`
   - Added browser-side fetch to `NEXT_PUBLIC_API_BASE` for search results.
   - Search results are loaded in the browser rather than during server rendering.

5. `src/lib/api/names.js`
   - Changed `fetchNamesWithAdvancedFilters()` to use mock data by default unless `NEXT_PUBLIC_USE_MOCK_NAMES=false`.
   - This avoids backend/API calls for filtered name listing pages during development or without explicit backend usage.

6. `src/app/names/[religion]/categories/[category]/[page]/page.jsx`
   - Removed backend `fetchFilters()` call.
   - Uses static category list instead of fetching filters on every request.

7. `src/app/names/[religion]/origin/[origin]/[page]/page.jsx`
   - Removed backend `fetchFilters()` call.
   - Uses static origin list instead of fetching filters on every request.

8. Revalidation updates
   - Increased ISR revalidate interval for several listing pages from 7 days to 30 days.
   - This lowers ISR reads/writes and reduces on-demand regeneration frequency.

## Expected limit usage impact

### Most likely reductions

- `Edge Middleware Invocations`
  - Should decrease significantly because middleware now runs only on core pages instead of all requests.

- `Edge Request CPU Duration`
  - Should drop due to fewer middleware and server-side page render operations.

- `Function Invocations`
  - Should decrease because search page and some listing logic no longer require server-side rendering or backend fetches.

- `Fast Origin Transfer`
  - Should reduce because `/_next/data` is now cacheable by CDN for 24 hours.

- `ISR Reads` / `ISR Writes`
  - Should improve because revalidation is less aggressive and fewer pages are regenerated frequently.

### Moderate impact

- `Fast Data Transfer`
  - May improve as repeated server-side fetches and extra data payloads are reduced.

- `Edge Requests`
  - Should decrease somewhat due to lower middleware and server-side page load activity.

### Still unchanged by this update

- `Build Minutes` / `Build CPU Minutes`
  - Not affected by runtime/frontend request optimization.

- `Blob`, `Queue`, `Cron Job`, `Web Analytics`, `Monitoring`, and `Image Optimization` usage
  - Not directly changed by these edits.

## Notes

- Exact savings depend on traffic patterns and whether users are hitting the optimized routes.
- The largest gains come from moving search result work to the client and reducing global middleware coverage.
- If you want further reduction, the next step is to convert more dynamic routes to fully static pages and avoid backend/API proxy usage where possible.
