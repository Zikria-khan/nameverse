import { NextResponse } from 'next/server';
import { writeSitemapFiles } from '@/lib/seo/sitemap-data.mjs';
import fs from 'node:fs';
import path from 'node:path';

export const dynamic = 'force-static';
export const revalidate = 86400;

export async function GET() {
  const manifestFile = path.join(process.cwd(), 'public', 'seo-sitemap-manifest.json');
  if (!fs.existsSync(manifestFile)) await writeSitemapFiles();
  const xml = fs.readFileSync(path.join(process.cwd(), 'public', 'sitemap.xml'), 'utf8');
  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  });
}
