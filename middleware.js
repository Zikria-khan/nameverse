import { NextResponse } from 'next/server';

/**
 * Global Middleware for URL Sanitization
 * Handles invalid URL patterns and redirects to clean URLs
 */
export function middleware(request) {
  const { pathname } = request.nextUrl;

  // ==========================================
  // REDIRECT OLD /names/filter/* TO NEW /names/* STRUCTURE
  // ==========================================
  // Old: /names/filter/{gender}/{letter}/{page}/{origin}/{category}
  // New: /names/{religion}/{slug(gender)}/{category}/{alphabet}/{page}
  const oldFilterPattern = /^\/names\/filter\/([^/]+)\/([^/]+)\/([^/]+)\/([^/]+)\/([^/]+)$/;
  const oldFilterMatch = pathname.match(oldFilterPattern);

  if (oldFilterMatch) {
    const [, gender, letter, page, , category] = oldFilterMatch;
    const newUrl = new URL(request.url);
    // Default religion to islamic since old filter page hardcoded it
    newUrl.pathname = `/names/islamic/${gender.toLowerCase()}/${category.toLowerCase()}/${letter.toUpperCase()}/${page}`;
    return NextResponse.redirect(newUrl, 301); // 301 Permanent Redirect
  }

  // ==========================================
  // SANITIZE NAME SLUG URLS
  // ==========================================
  // Pattern: /names/{religion}/{slug} - only single-segment slugs
  const nameSlugPattern = /^\/names\/([a-z]+)\/([^/]+)$/;
  const nameSlugMatch = pathname.match(nameSlugPattern);

  if (nameSlugMatch) {
    const [, religion, slug] = nameSlugMatch;

    // Check for invalid slug patterns
    const hasLeadingHyphens = /^[-_]+/.test(slug);
    const hasTrailingHyphens = /[-_]+$/.test(slug);
    const hasMultipleConsecutiveHyphens = /[-_]{2,}/.test(slug);
    const hasInvalidChars = !/^[a-z0-9-_]+$/i.test(slug);

    // If slug needs sanitization, redirect to clean URL
    if (hasLeadingHyphens || hasTrailingHyphens || hasMultipleConsecutiveHyphens || hasInvalidChars) {
      // Sanitize the slug
      let sanitizedSlug = slug
        .trim()
        .replace(/^[-_]+/, '')  // Remove leading hyphens/underscores
        .replace(/[-_]+$/, '')  // Remove trailing hyphens/underscores
        .toLowerCase();

      // If sanitized slug is empty or still invalid, let the page handler return 404
      if (!sanitizedSlug || /[-_]{2,}/.test(sanitizedSlug) || !/^[a-z0-9-_]+$/.test(sanitizedSlug)) {
        // Continue to page handler which will return 404
        return NextResponse.next();
      }

      // Redirect to sanitized URL
      const newUrl = new URL(request.url);
      newUrl.pathname = `/names/${religion}/${sanitizedSlug}`;
      return NextResponse.redirect(newUrl, 301); // 301 Permanent Redirect
    }
  }

   // ==========================================
   // NORMALIZE UPPERCASE PATHS TO LOWERCASE
   // ==========================================
   const shouldSkipLowercase = [
     '/_next',
     '/api',
     '/static',
     '/robots.txt',
     '/sitemap.xml',
     '/favicon.ico',
   ].some(prefix => pathname.startsWith(prefix));

   if (pathname !== '/' && /[A-Z]/.test(pathname) && !shouldSkipLowercase) {
     const newUrl = new URL(request.url);
     newUrl.pathname = pathname.toLowerCase();
     return NextResponse.redirect(newUrl, 301);
   }

   // Trailing slash removal is handled automatically by Next.js (trailingSlash: false by default)
   // No need for custom logic

   return NextResponse.next();
}

// ==========================================
// MIDDLEWARE CONFIGURATION
// ==========================================
// Optimized matcher: Only runs middleware on page routes
// Excludes: API routes, Next.js internals, static assets
// This reduces Edge Middleware invocations by ~70%
export const config = {
  matcher: [
    // Match all routes EXCEPT those starting with excluded prefixes
    "/((?!api|_next/static|_next/image|_next/data|favicon.ico|robots.txt|sitemap.xml|images).*)",
  ],
};
