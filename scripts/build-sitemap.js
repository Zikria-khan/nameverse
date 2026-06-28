import { writeSitemapFiles } from '../src/lib/seo/sitemap-data.mjs';

try {
  const result = await writeSitemapFiles();
  console.log(JSON.stringify(result, null, 2));
} catch (error) {
  console.error(error);
  process.exit(1);
}
