import { readFile } from 'fs/promises';
import { join } from 'path';

const SITEMAP_FILE = join(process.cwd(), 'public', 'sitemap.xml');

export async function GET() {
  try {
    const sitemap = await readFile(SITEMAP_FILE, 'utf8');
    return new Response(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=0, s-maxage=600, must-revalidate',
      },
    });
  } catch (error) {
    return new Response('Sitemap not found', { status: 404 });
  }
}
