import { NextResponse } from 'next/server';
import { getSiteUrl } from '@/lib/seo/site';

export const dynamic = 'force-static';

const robots = `User-agent: *
Allow: /
Disallow: /api/
Disallow: /api/og/
Disallow: /_next/static/webpack/
Disallow: /_next/static/chunks/
Allow: /_next/data/
Disallow: /performance
Disallow: /install
Disallow: /*?utm_
Disallow: /*?ref=
Disallow: /*?source=

Sitemap: ${getSiteUrl()}/sitemap.xml
`;

export function GET() {
  return new NextResponse(robots, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
