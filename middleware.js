import { NextResponse } from 'next/server';

/**
 * SEO FIREWALL MIDDLEWARE — Vercel Edge
 * 
 * BLOCKS:
 * - Phonetic/IPA character URLs (ˈ ɑː ɪ ɔː ɛ ə ʃ ʒ ʤ ʧ ɹ ɾ ɣ ʔ θ ð ŋ ɲ ɳ ɽ ʈ ɖ ɭ)
 * - Non-ASCII Unicode characters in paths
 * - Invalid slug patterns
 * - Random broken URLs
 * 
 * ALLOWS:
 * - Valid ASCII-only paths with proper route structure
 * - Only known valid route prefixes
 * 
 * Returns 410 Gone for invalid URLs — NEVER redirects to homepage.
 * 410 Gone tells Google "this URL is permanently gone, stop crawling it"
 * which is better than 404 for crawl budget cleanup.
 */

// IPA/phonetic Unicode characters that should never appear in valid URLs
const PHONETIC_UNICODE_RANGES = /[\u0250-\u02AF\u02B0-\u02FF\u0300-\u036F\u1D00-\u1DBF\u1DC0-\u1DFF\u2070-\u209F\u2100-\u214F\u0250-\u02AF\u02C8\u02CC\u02D0\u02D1\u02E0-\u02FF\u0300-\u036F\u203E]/;

// Specific problematic characters from Google Search Console reports
const INVALID_CHARS = /[ˈɑːɪɔːɛəʃʒʤʧɹɾɣʔθðŋɲɳɽʈɖɭ˞ˌ̩̍ḁᵊ̧̣̩̪̹̟̠̤̥̩̪̹̟̠̤̥̩̪̆̈̃]/;

// Invalid patterns: IPA-like strings with slashes or non-ASCII
const IPA_PATTERN = /\/(?:[ˈˌ]?[a-zæøåçðɛəɪɔœʊʌʉɐɑɒɜɝɞɤɨɯɵɶɻɽʃʄʈʉʊʋʌʍʎʏʒʔθðŋɲɳɽʠʡʢ]+)+/;

// Valid route prefixes
const VALID_PREFIXES = [
  '/names',
  '/blog',
  '/guides',
  '/search',
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
  '/feed.xml',
  '/sitemap.xml',
  '/robots.txt',
  '/manifest.json',
  '/ads.txt',
  '/logo.png',
  '/apple-icon',
  '/icon',
  '/opengraph-image',
  '/api',
  '/_next',
  '/islamic',
  '/christian',
  '/hindu',
];

// Valid slug pattern: lowercase alphanumeric + hyphens only
const VALID_SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const path = pathname.toLowerCase();

  // STEP 1: Allow known static files and API routes immediately
  if (
    path === '/' ||
    path === '' ||
    path.startsWith('/_next/') ||
    path.startsWith('/api/') ||
    path.startsWith('/feed.xml') ||
    path.startsWith('/sitemap.xml') ||
    path.startsWith('/robots.txt') ||
    path.startsWith('/manifest.json') ||
    path.startsWith('/ads.txt') ||
    path.match(/\.(png|jpg|jpeg|gif|svg|ico|webp|css|js|json|xml|txt)$/)
  ) {
    return NextResponse.next();
  }

  // STEP 2: BLOCK phonetic/IPA characters
  if (PHONETIC_UNICODE_RANGES.test(path) || INVALID_CHARS.test(path) || IPA_PATTERN.test(path)) {
    return new NextResponse(
      JSON.stringify({ error: 'Gone', message: 'This URL is no longer available.' }),
      {
        status: 410,
        headers: {
          'Content-Type': 'application/json',
          'X-Robots-Tag': 'noindex, nofollow',
          'Cache-Control': 'public, max-age=31536000, immutable',
        },
      }
    );
  }

  // STEP 3: BLOCK URLs with non-ASCII characters
  for (let i = 0; i < path.length; i++) {
    if (path.charCodeAt(i) > 127 && path[i] !== '/') {
      return new NextResponse(
        JSON.stringify({ error: 'Gone', message: 'This URL is no longer available.' }),
        {
          status: 410,
          headers: {
            'Content-Type': 'application/json',
            'X-Robots-Tag': 'noindex, nofollow',
            'Cache-Control': 'public, max-age=31536000, immutable',
          },
        }
      );
    }
  }

  // STEP 4: Allow only valid route prefixes
  const hasValidPrefix = VALID_PREFIXES.some(prefix => 
    path === prefix || path.startsWith(prefix + '/')
  );

  if (!hasValidPrefix) {
    // Check for /names/[religion]/[slug] pattern specifically
    const namesMatch = path.match(/^\/names\/([a-z]+)\/([a-z0-9-]+)$/);
    if (namesMatch) {
      const religion = namesMatch[1];
      const slug = namesMatch[2];
      // Allow only valid religions and valid slugs
      if (['islamic', 'christian', 'hindu'].includes(religion) && VALID_SLUG.test(slug)) {
        return NextResponse.next();
      }
    }

    // Check for /names/religion/[religion]/[page]
    const religionPageMatch = path.match(/^\/names\/religion\/([a-z]+)\/(\d+)$/);
    if (religionPageMatch) {
      const religion = religionPageMatch[1];
      if (['islamic', 'christian', 'hindu'].includes(religion)) {
        return NextResponse.next();
      }
    }

    // Check for /names/[religion]/letter/[letter]/[page]
    const letterPath = path.match(/^\/names\/([a-z]+)\/letter\/([a-z])\/(\d+)$/);
    if (letterPath) {
      const religion = letterPath[1];
      const letter = letterPath[2];
      if (['islamic', 'christian', 'hindu'].includes(religion) && /^[a-z]$/.test(letter)) {
        return NextResponse.next();
      }
    }

    // Check for /names/[religion]/origin/[origin]/[page]
    const originPath = path.match(/^\/names\/([a-z]+)\/origin\/([a-z]+)\/(\d+)$/);
    if (originPath) {
      const religion = originPath[1];
      if (['islamic', 'christian', 'hindu'].includes(religion)) {
        return NextResponse.next();
      }
    }

    // Check for /names/[religion]/categories/[category]/[page]
    const categoryPath = path.match(/^\/names\/([a-z]+)\/categories\/([a-z]+)\/(\d+)$/);
    if (categoryPath) {
      const religion = categoryPath[1];
      if (['islamic', 'christian', 'hindu'].includes(religion)) {
        return NextResponse.next();
      }
    }

    // Check for blog/[slug]
    const blogPostMatch = path.match(/^\/blog\/([a-z0-9-]+)$/);
    if (blogPostMatch && VALID_SLUG.test(blogPostMatch[1])) {
      return NextResponse.next();
    }

    // Block everything else with 410
    return new NextResponse(
      JSON.stringify({ error: 'Gone', message: 'This URL is no longer available.' }),
      {
        status: 410,
        headers: {
          'Content-Type': 'application/json',
          'X-Robots-Tag': 'noindex, nofollow',
          'Cache-Control': 'public, max-age=31536000, immutable',
        },
      }
    );
  }

  // STEP 5: For /names/[religion]/[slug] paths, validate the slug
  const nameSlugMatch = path.match(/^\/names\/([a-z]+)\/([a-z0-9-]+)/);
  if (nameSlugMatch) {
    const slug = nameSlugMatch[2];
    // Block slugs that look like phonetic/IPA strings
    if (slug.length < 2 || slug.length > 50 || !VALID_SLUG.test(slug)) {
      return new NextResponse(
        JSON.stringify({ error: 'Gone', message: 'This URL is no longer available.' }),
        {
          status: 410,
          headers: {
            'Content-Type': 'application/json',
            'X-Robots-Tag': 'noindex, nofollow',
            'Cache-Control': 'public, max-age=31536000, immutable',
          },
        }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all paths except static assets
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};