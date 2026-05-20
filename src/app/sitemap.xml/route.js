import { readFile } from 'fs/promises';
import { join } from 'path';

const SITEMAP_FILE = join(process.cwd(), 'public', 'sitemap.xml');

// ISR: 24 h — the sitemap doesn't change hourly and no-store on every request
// was burning CPU by hitting Vercel's Lambda layer for every bots crawl.
export const revalidate = 86400;

const defaultHeaders = {
  'Content-Type': 'application/xml',
  'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
};

export async function GET() {
  try {
    const sitemap = await readFile(SITEMAP_FILE, 'utf8');
    return new Response(sitemap, {
      headers: defaultHeaders,
    });
  } catch (error) {
    return new Response('Sitemap not found', { status: 404 });
  }
}

export async function HEAD() {
  try {
    await readFile(SITEMAP_FILE, 'utf8');
    return new Response(null, {
      headers: defaultHeaders,
    });
  } catch (error) {
    return new Response(null, { status: 404 });
  }
}
