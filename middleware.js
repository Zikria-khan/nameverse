import { NextResponse } from 'next/server';

/**
 * Global Middleware for URL Sanitization
 * Handles invalid URL patterns and redirects to clean URLs
 */
export function middleware(request) {
  const { pathname } = request.nextUrl;

  // ==========================================
  // SANITIZE NAME SLUG URLS
  // ==========================================
  // Pattern: /names/{religion}/{slug}
  const nameSlugPattern = /^\/names\/([a-z]+)\/(.+)$/;
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
  // SANITIZE LETTER PAGE URLS
  // ==========================================
  // Pattern: /names/{religion}/letter/{letter}
  const letterPattern = /^\/names\/([a-z]+)\/letter\/(.+)$/;
  const letterMatch = pathname.match(letterPattern);

  if (letterMatch) {
    const [, religion, letter] = letterMatch;

    // Validate letter is a single alphabetic character
    if (!/^[a-zA-Z]$/.test(letter)) {
      // Invalid letter - let page handler return 404
      return NextResponse.next();
    }

    // Ensure letter is lowercase in URL
    const lowerLetter = letter.toLowerCase();
    if (letter !== lowerLetter) {
      const newUrl = new URL(request.url);
      newUrl.pathname = `/names/${religion}/letter/${lowerLetter}`;
      return NextResponse.redirect(newUrl, 301);
    }
  }

  // ==========================================
  // REMOVE TRAILING SLASHES (except root)
  // ==========================================
  if (pathname !== '/' && pathname.endsWith('/')) {
    const newUrl = new URL(request.url);
    newUrl.pathname = pathname.slice(0, -1);
    return NextResponse.redirect(newUrl, 301);
  }

  return NextResponse.next();
}

// ==========================================
// MIDDLEWARE CONFIGURATION
// ==========================================
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - sitemap files
     * - robots.txt
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.xml).*)',
  ],
};
