import { NextResponse } from 'next/server';

/**
 * SEO FIREWALL MIDDLEWARE — Vercel Edge
 *
 * This is the FIRST line of defense for URL quality.
 *
 * Responsibilities:
 * 1. Reject malformed URLs (IPA, Unicode, encoded chars) → 410 Gone
 * 2. Redirect non-canonical religion URLs → 301 to canonical
 * 3. Validate route patterns against whitelist → 410 for invalid
 * 4. Strip trailing slashes → 301 redirect
 * 5. Normalize double slashes → 301 redirect
 * 6. Allow system routes (API, assets) → pass through
 * 7. Allow valid application routes → pass through
 *
 * Page-level validation (dataset checks) happens in individual route handlers.
 */

const VALID_RELIGIONS = ['islamic', 'christian', 'hindu'];

// Valid static routes (must match app/ directory exactly)
const VALID_STATIC_ROUTES = new Set([
  '/',
  '/names',
  '/search',
  '/blog',
  '/about',
  '/privacy',
  '/terms',
  '/languages',
  '/popularity',
  '/name-meanings',
  '/names-by-meaning',
  '/unique-names',
  '/trending-names',
  '/advanced-search',
  '/my-names',
  '/popular-by-state',
  '/viral-names',
  '/guides/expert-naming-guide',
]);

// Valid gender listing pages
const VALID_GENDER_PAGES = new Set([
  '/islamic/boy-names',
  '/islamic/girl-names',
  '/christian/boy-names',
  '/christian/girl-names',
  '/hindu/boy-names',
  '/hindu/girl-names',
]);

/**
 * Normalize religion name to canonical form
 */
function normalizeReligion(religion) {
  if (!religion) return null;
  const r = religion.toLowerCase().trim();
  if (r === 'islam' || r === 'muslim') return 'islamic';
  if (r === 'hinduism') return 'hindu';
  if (r === 'christianity') return 'christian';
  return VALID_RELIGIONS.includes(r) ? r : null;
}

/**
 * Validate a slug pattern: lowercase alphanumeric + hyphens only
 */
function isValidSlug(slug) {
  if (!slug || typeof slug !== 'string') return false;
  const trimmed = slug.trim();
  if (trimmed.length < 1 || trimmed.length > 100) return false;
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(trimmed);
}

/**
 * Validate page number
 */
function isValidPage(page) {
  if (!page) return false;
  const num = parseInt(page, 10);
  return !isNaN(num) && num >= 1 && num <= 1000;
}

/**
 * Validate single letter
 */
function isValidLetter(letter) {
  return /^[a-zA-Z]$/.test(letter);
}

/**
 * Check if path is a system/static route that should pass through
 */
function isSystemRoute(pathname) {
  return (
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/api/') ||
    pathname === '/feed.xml' ||
    pathname === '/sitemap.xml' ||
    pathname === '/manifest.json' ||
    pathname === '/ads.txt' ||
    pathname === '/robots.txt' ||
    pathname.startsWith('/dstar') ||
    /\.(png|jpg|jpeg|gif|svg|ico|webp|css|js|json|xml|txt|woff|woff2|ttf|eot)$/i.test(pathname)
  );
}

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const path = pathname.toLowerCase();

  // ── SYSTEM ROUTES: Pass through immediately ──
  if (isSystemRoute(path)) {
    return NextResponse.next();
  }

  // ── CASE NORMALIZATION: Redirect uppercase URLs to lowercase ──
  // This ensures crawlers always get 200 for valid lowercase URLs
  if (pathname !== path) {
    // Preserve query string when redirecting
    const search = request.nextUrl.search || '';
    return NextResponse.redirect(new URL(path + search, request.url), 301);
  }

  // ── TRAILING SLASH: Redirect to non-slash version ──
  if (path.length > 1 && path.endsWith('/')) {
    const clean = path.slice(0, -1);
    return NextResponse.redirect(new URL(clean, request.url), 301);
  }

  // ── DOUBLE SLASHES: Normalize ──
  if (path.includes('//') && path !== '/') {
    const normalized = path.replace(/\/+/g, '/');
    return NextResponse.redirect(new URL(normalized, request.url), 301);
  }

  // ── NON-ASCII / IPA / ENCODED CHARACTERS: 410 Gone ──
  // This catches ALL IPA characters (ˈ ɑː ɪ ɔː ɛ ə ʃ ʒ etc.)
  // and any percent-encoded sequences (%XX)
  if (/[^\x00-\x7F]/.test(path)) {
    return new NextResponse('Gone — This URL contains invalid characters and has been permanently removed.', {
      status: 410,
      headers: {
        'Content-Type': 'text/plain',
        'X-Robots-Tag': 'noindex',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  }

  // ── PERCENT-ENCODED SEQUENCES: 410 Gone ──
  // Catches URLs like /%CB%88d%CA%92u%CB%90k%C9%99r/
  if (/%[0-9A-Fa-f]{2}/.test(path)) {
    return new NextResponse('Gone — This URL contains encoded invalid characters and has been permanently removed.', {
      status: 410,
      headers: {
        'Content-Type': 'text/plain',
        'X-Robots-Tag': 'noindex',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  }

  // ── RELIGION NORMALIZATION REDIRECTS ──
  // /names/islam/... → /names/islamic/...
  // /names/muslim/... → /names/islamic/...
  // /names/christianity/... → /names/christian/...
  // /names/hinduism/... → /names/hindu/...
  const islamMatch = path.match(/^\/names\/(islam|muslim)(\/.+)$/);
  if (islamMatch) {
    return NextResponse.redirect(
      new URL(`/names/islamic${islamMatch[2]}`, request.url),
      301
    );
  }
  const christianMatch = path.match(/^\/names\/christianity(\/.+)$/);
  if (christianMatch) {
    return NextResponse.redirect(
      new URL(`/names/christian${christianMatch[1]}`, request.url),
      301
    );
  }
  const hinduMatch = path.match(/^\/names\/hinduism(\/.+)$/);
  if (hinduMatch) {
    return NextResponse.redirect(
      new URL(`/names/hindu${hinduMatch[1]}`, request.url),
      301
    );
  }

  // ── STATIC ROUTES: Allow ──
  if (VALID_STATIC_ROUTES.has(path)) {
    return NextResponse.next();
  }

  // ── GENDER PAGES: Allow ──
  if (VALID_GENDER_PAGES.has(path)) {
    return NextResponse.next();
  }

  // ── DYNAMIC ROUTE VALIDATION ──
  const segments = path.split('/').filter(Boolean);

  // /names/[religion]/[slug]
  if (segments[0] === 'names' && segments.length === 3) {
    const religion = normalizeReligion(segments[1]);
    if (!religion) {
      return new NextResponse('Gone — Invalid religion.', {
        status: 410,
        headers: { 'X-Robots-Tag': 'noindex', 'Cache-Control': 'public, max-age=31536000, immutable' },
      });
    }
    if (!isValidSlug(segments[2])) {
      return new NextResponse('Gone — Invalid URL slug.', {
        status: 410,
        headers: { 'X-Robots-Tag': 'noindex', 'Cache-Control': 'public, max-age=31536000, immutable' },
      });
    }
    return NextResponse.next();
  }

  // /names/[religion]/letter/[letter]/[page]
  if (segments[0] === 'names' && segments[2] === 'letter' && segments.length === 5) {
    const religion = normalizeReligion(segments[1]);
    if (!religion || !isValidLetter(segments[3]) || !isValidPage(segments[4])) {
      return new NextResponse('Gone — Invalid URL.', {
        status: 410,
        headers: { 'X-Robots-Tag': 'noindex', 'Cache-Control': 'public, max-age=31536000, immutable' },
      });
    }
    return NextResponse.next();
  }

  // /names/[religion]/origin/[origin]/[page]
  if (segments[0] === 'names' && segments[2] === 'origin' && segments.length === 5) {
    const religion = normalizeReligion(segments[1]);
    if (!religion || !isValidSlug(segments[3]) || !isValidPage(segments[4])) {
      return new NextResponse('Gone — Invalid URL.', {
        status: 410,
        headers: { 'X-Robots-Tag': 'noindex', 'Cache-Control': 'public, max-age=31536000, immutable' },
      });
    }
    return NextResponse.next();
  }

  // /names/[religion]/categories/[category]/[page]
  if (segments[0] === 'names' && segments[2] === 'categories' && segments.length === 5) {
    const religion = normalizeReligion(segments[1]);
    if (!religion || !isValidSlug(segments[3]) || !isValidPage(segments[4])) {
      return new NextResponse('Gone — Invalid URL.', {
        status: 410,
        headers: { 'X-Robots-Tag': 'noindex', 'Cache-Control': 'public, max-age=31536000, immutable' },
      });
    }
    return NextResponse.next();
  }

  // /names/religion/[religion]/[page]
  if (segments[0] === 'names' && segments[1] === 'religion' && segments.length === 4) {
    const religion = normalizeReligion(segments[2]);
    if (!religion || !isValidPage(segments[3])) {
      return new NextResponse('Gone — Invalid URL.', {
        status: 410,
        headers: { 'X-Robots-Tag': 'noindex', 'Cache-Control': 'public, max-age=31536000, immutable' },
      });
    }
    return NextResponse.next();
  }

  // /blog/[slug]
  if (segments[0] === 'blog' && segments.length === 2) {
    if (!isValidSlug(segments[1])) {
      return new NextResponse('Gone — Invalid blog slug.', {
        status: 410,
        headers: { 'X-Robots-Tag': 'noindex', 'Cache-Control': 'public, max-age=31536000, immutable' },
      });
    }
    return NextResponse.next();
  }

  // /search/[term] — allow ASCII search terms
  if (segments[0] === 'search' && segments.length === 2) {
    const term = segments[1];
    if (!term || term.length > 200 || /[^\x20-\x7E]/.test(term)) {
      return new NextResponse('Gone — Invalid search term.', {
        status: 410,
        headers: { 'X-Robots-Tag': 'noindex', 'Cache-Control': 'public, max-age=31536000, immutable' },
      });
    }
    return NextResponse.next();
  }

  // /guides/[slug]
  if (segments[0] === 'guides' && segments.length === 2) {
    if (!isValidSlug(segments[1])) {
      return new NextResponse('Gone — Invalid guide slug.', {
        status: 410,
        headers: { 'X-Robots-Tag': 'noindex', 'Cache-Control': 'public, max-age=31536000, immutable' },
      });
    }
    return NextResponse.next();
  }

  // ── UNKNOWN ROUTE: Let Next.js handle (will show not-found page) ──
  return NextResponse.next();
}

export const config = {
  matcher: '/((?!_next/static|_next/image|favicon.ico).*)',
};