/**
 * SITEMAP BUILDER — Slug Validation & Clean URL Generation
 * 
 * Only includes:
 * - Known static pages
 * - Valid existing name slugs from database files
 * - Properly formatted, verified URLs
 * 
 * Excludes:
 * - Phonetic/IPA slugs
 * - Non-ASCII characters
 * - Non-existent pages
 * - Invalid slug patterns
 */

const fs = require('fs');
const path = require('path');

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://nameverse.vercel.app';
const OUTPUT_FILE = path.join(process.cwd(), 'public', 'sitemap.xml');
const DATA_DIR = path.join(process.cwd(), 'public', 'data');

// Valid slug pattern — only lowercase alphanumeric + hyphens
const VALID_SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

// Invalid characters — block any slug containing these
const INVALID_CHARS = /[ˈɑːɪɔːɛəʃʒʤʧɹɾɣʔθðŋɲɳɽʈɖɭ˞ˌ̩̍ḁᵊ̧̣̩̪̹̟̠̤̥̆̈̃]/;

function isValidSlug(slug) {
  if (!slug || typeof slug !== 'string') return false;
  const cleaned = slug.toLowerCase().trim();
  if (cleaned.length < 2 || cleaned.length > 50) return false;
  if (!VALID_SLUG.test(cleaned)) return false;
  if (INVALID_CHARS.test(cleaned)) return false;
  // Check for non-ASCII characters
  for (let i = 0; i < cleaned.length; i++) {
    if (cleaned.charCodeAt(i) > 127) return false;
  }
  return true;
}

function createSafeSlug(name) {
  if (!name || typeof name !== 'string') return null;
  let slug = name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
  return isValidSlug(slug) ? slug : null;
}

function loadNamesFromFile(filePath, religion) {
  const names = [];
  try {
    if (!fs.existsSync(filePath)) return names;
    const raw = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(raw);
    if (!Array.isArray(data)) return names;

    for (const entry of data) {
      const nameStr = typeof entry === 'string' ? entry : entry.name || entry.Name || '';
      const slug = createSafeSlug(nameStr);
      if (slug) {
        names.push({ name: slug, religion, displayName: nameStr });
      }
    }
  } catch (e) {
    console.warn(`Warning: Could not process ${filePath}: ${e.message}`);
  }
  return names;
}

async function buildSitemap() {
  console.log('🔨 Building validated sitemap...');
  const urls = [];

  // Static pages (high priority)
  const staticPages = [
    { path: '', priority: '0.9', changefreq: 'weekly', date: new Date().toISOString().split('T')[0] },
    { path: '/names', priority: '0.9', changefreq: 'weekly', date: new Date().toISOString().split('T')[0] },
    { path: '/search', priority: '0.9', changefreq: 'weekly', date: new Date().toISOString().split('T')[0] },
    { path: '/blog', priority: '0.9', changefreq: 'weekly', date: new Date().toISOString().split('T')[0] },
    { path: '/name-meanings', priority: '0.8', changefreq: 'weekly', date: new Date().toISOString().split('T')[0] },
    { path: '/unique-names', priority: '0.8', changefreq: 'weekly', date: new Date().toISOString().split('T')[0] },
    { path: '/trending-names', priority: '0.8', changefreq: 'weekly', date: new Date().toISOString().split('T')[0] },
    { path: '/popularity', priority: '0.8', changefreq: 'weekly', date: new Date().toISOString().split('T')[0] },
    { path: '/names-by-meaning', priority: '0.8', changefreq: 'weekly', date: new Date().toISOString().split('T')[0] },
    { path: '/languages', priority: '0.8', changefreq: 'weekly', date: new Date().toISOString().split('T')[0] },
    { path: '/terms', priority: '0.5', changefreq: 'monthly', date: new Date().toISOString().split('T')[0] },
    { path: '/about', priority: '0.5', changefreq: 'monthly', date: new Date().toISOString().split('T')[0] },
    { path: '/privacy', priority: '0.5', changefreq: 'monthly', date: new Date().toISOString().split('T')[0] },
    { path: '/advanced-search', priority: '0.7', changefreq: 'monthly', date: new Date().toISOString().split('T')[0] },
    { path: '/guides/expert-naming-guide', priority: '0.7', changefreq: 'monthly', date: new Date().toISOString().split('T')[0] },
    { path: '/names/religion/islamic/1', priority: '0.8', changefreq: 'weekly', date: new Date().toISOString().split('T')[0] },
    { path: '/names/religion/christian/1', priority: '0.8', changefreq: 'weekly', date: new Date().toISOString().split('T')[0] },
    { path: '/names/religion/hindu/1', priority: '0.8', changefreq: 'weekly', date: new Date().toISOString().split('T')[0] },
    { path: '/islamic/boy-names', priority: '0.8', changefreq: 'weekly', date: new Date().toISOString().split('T')[0] },
    { path: '/islamic/girl-names', priority: '0.8', changefreq: 'weekly', date: new Date().toISOString().split('T')[0] },
    { path: '/christian/boy-names', priority: '0.8', changefreq: 'weekly', date: new Date().toISOString().split('T')[0] },
    { path: '/christian/girl-names', priority: '0.8', changefreq: 'weekly', date: new Date().toISOString().split('T')[0] },
    { path: '/hindu/boy-names', priority: '0.8', changefreq: 'weekly', date: new Date().toISOString().split('T')[0] },
    { path: '/hindu/girl-names', priority: '0.8', changefreq: 'weekly', date: new Date().toISOString().split('T')[0] },
  ];

  for (const page of staticPages) {
    urls.push({
      loc: `${SITE_URL}${page.path}`,
      lastmod: page.date,
      changefreq: page.changefreq,
      priority: page.priority,
    });
  }

  // Load name data files and generate name URLs
  const nameFiles = [
    { file: 'islamic-boy-names.json', religion: 'islamic' },
    { file: 'islamic-girl-names.json', religion: 'islamic' },
    { file: 'islamic_names.json', religion: 'islamic' },
    { file: 'christian-boy-names.json', religion: 'christian' },
    { file: 'christian-girl-names.json', religion: 'christian' },
    { file: 'christians_names.json', religion: 'christian' },
    { file: 'hindu-boy-names.json', religion: 'hindu' },
    { file: 'hindu-girl-names.json', religion: 'hindu' },
    { file: 'hindu_names.json', religion: 'hindu' },
  ];

  const seenSlugs = new Set();
  let totalValidNames = 0;
  let totalSkipped = 0;

  for (const { file, religion } of nameFiles) {
    const filePath = path.join(DATA_DIR, file);
    const names = loadNamesFromFile(filePath, religion);
    
    for (const entry of names) {
      const key = `${entry.religion}/${entry.name}`;
      if (!seenSlugs.has(key)) {
        seenSlugs.add(key);
        urls.push({
          loc: `${SITE_URL}/names/${entry.religion}/${entry.name}`,
          lastmod: new Date().toISOString().split('T')[0],
          changefreq: 'yearly',
          priority: '0.6',
        });
        totalValidNames++;
      } else {
        totalSkipped++;
      }
    }
  }

  // Add letter pages (A-Z for each religion)
  const religions = ['islamic', 'christian', 'hindu'];
  for (const religion of religions) {
    for (let i = 0; i < 26; i++) {
      const letter = String.fromCharCode(65 + i);
      urls.push({
        loc: `${SITE_URL}/names/${religion}/letter/${letter}/1`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'monthly',
        priority: '0.4',
      });
    }
  }

  // Generate XML
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  for (const url of urls) {
    xml += '  <url>\n';
    xml += `    <loc>${url.loc}</loc>\n`;
    xml += `    <lastmod>${url.lastmod}</lastmod>\n`;
    xml += `    <changefreq>${url.changefreq}</changefreq>\n`;
    xml += `    <priority>${url.priority}</priority>\n`;
    xml += '  </url>\n';
  }

  xml += '</urlset>';

  // Write output
  fs.writeFileSync(OUTPUT_FILE, xml, 'utf8');
  
  console.log(`✅ Sitemap written to ${OUTPUT_FILE}`);
  console.log(`📊 Static pages: ${staticPages.length}`);
  console.log(`📊 Valid name URLs: ${totalValidNames}`);
  console.log(`📊 Skipped (duplicates): ${totalSkipped}`);
  console.log(`📊 Letter pages: ${26 * 3}`);
  console.log(`📊 Total URLs: ${urls.length}`);
  console.log(`📦 File size: ${(Buffer.byteLength(xml) / 1024).toFixed(1)} KB`);
}

buildSitemap().catch(err => {
  console.error('❌ Sitemap build failed:', err);
  process.exit(1);
});