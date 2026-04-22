import { readFile } from 'fs/promises';
import { join } from 'path';

const SITEMAP_FILE = join(process.cwd(), 'public', 'sitemap.xml');

const defaultHeaders = {
  'Content-Type': 'application/xml',
  'Cache-Control': 'public, max-age=0, s-maxage=600, must-revalidate',
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
