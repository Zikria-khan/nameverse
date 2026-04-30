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
  // New: /names/{religion}/{gender}/{category}/{alphabet}/{page}
  const oldFilterPattern = /^\/names\/filter\/([^/]+)\/([^/]+)\/([^/]+)\/([^/]+)\/([^/]+)$/;
  const oldFilterMatch = pathname.match(oldFilterPattern);

  if (oldFilterMatch) {
    const [, gender, letter, page, , category] = oldFilterMatch;

    const newUrl = new URL(request.url);

    // Default religion to islamic since old filter page used that
    newUrl.pathname = `/names/islamic/${gender.toLowerCase()}/${category.toLowerCase()}/${letter.toUpperCase()}/${page}`;

    return NextResponse.redirect(newUrl, 301);
  }

  // ==========================================
  // SANITIZE NAME SLUG URLS
  // ==========================================
  // Pattern: /names/{religion}/{slug}
  const nameSlugPattern = /^\/names\/([a-z]+)\/([^/]+)$/;
  const nameSlugMatch = pathname.match(nameSlugPattern);

  if (nameSlugMatch) {
    const [, religion, slug] = nameSlugMatch;

    const hasLeadingHyphens = /^[-_]+/.test(slug);
    const hasTrailingHyphens = /[-_]+$/.test(slug);
    const hasMultipleHyphens = /[-_]{2,}/.test(slug);
    const hasInvalidChars = !/^[a-z0-9-_]+$/i.test(slug);

    if (
      hasLeadingHyphens ||
      hasTrailingHyphens ||
      hasMultipleHyphens ||
      hasInvalidChars
    ) {
      let sanitizedSlug = slug
        .trim()
        .replace(/^[-_]+/, '')
        .replace(/[-_]+$/, '')
        .toLowerCase();

      // If still invalid → let page return 404
      if (
        !sanitizedSlug ||
        /[-_]{2,}/.test(sanitizedSlug) ||
        !/^[a-z0-9-_]+$/.test(sanitizedSlug)
      ) {
        return NextResponse.next();
      }

      const newUrl = new URL(request.url);
      newUrl.pathname = `/names/${religion}/${sanitizedSlug}`;

      return NextResponse.redirect(newUrl, 301);
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

  return NextResponse.next();
}

// ==========================================
// MIDDLEWARE CONFIGURATION
// ==========================================
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|_next/data|favicon.ico|robots.txt|sitemap.xml|images).*)",
  ],
};