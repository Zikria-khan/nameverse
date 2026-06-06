/**
 * SITEMAP BUILDER — Multi-file Sitemap Index System
 *
 * Generates:
 *   sitemap.xml            — Sitemap index (references all sub-sitemaps)
 *   sitemap-pages.xml      — Static pages, categories, letters, origins, blog, guides
 *   sitemap-islamic-names-1.xml ... sitemap-islamic-names-N.xml — Islamic names (max 2500 per file)
 *   sitemap-christian-names-1.xml ... sitemap-christian-names-N.xml — Christian names (max 2500 per file)
 *   sitemap-hindu-names-1.xml ... sitemap-hindu-names-N.xml — Hindu names (max 2500 per file)
 *
 * Each sub-sitemap is under 2,500 URLs to stay safe for large datasets.
 * All URLs validated: ASCII-only, lowercase, no IPA/Unicode/encoded chars.
 */

const fs = require('fs');
const path = require('path');

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://nameverse.vercel.app';
const PUBLIC_DIR = path.join(process.cwd(), 'public');
const DATA_DIR = path.join(PUBLIC_DIR, 'data');
const OUTPUT_DIR = PUBLIC_DIR;

// ── LIMITS ──
const MAX_URLS_PER_FILE = 2500;

// ── VALIDATION CONSTANTS ──
const VALID_RELIGIONS = ['islamic', 'christian', 'hindu'];
const VALID_SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const INVALID_CHARS = /[^\x00-\x7F]/;
const TODAY = new Date().toISOString().split('T')[0];

// ── SLUG VALIDATION ──
function isValidSlug(slug) {
  if (!slug || typeof slug !== 'string') return false;
  const cleaned = slug.toLowerCase().trim();
  if (cleaned.length < 2 || cleaned.length > 50) return false;
  if (INVALID_CHARS.test(cleaned)) return false;
  if (!VALID_SLUG.test(cleaned)) return false;
  return true;
}

function createSafeSlug(name) {
  if (!name || typeof name !== 'string') return null;
  let slug = name
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
  return isValidSlug(slug) ? slug : null;
}

// ── DATA LOADING ──
function loadNamesFromFile(filePath) {
  const names = [];
  try {
    if (!fs.existsSync(filePath)) return names;
    const raw = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(raw);
    if (!Array.isArray(data)) return names;
    for (const entry of data) {
      const nameStr = typeof entry === 'string' ? entry : entry.name || entry.Name || '';
      const slug = createSafeSlug(nameStr);
      if (slug) names.push(slug);
    }
  } catch (e) {
    console.warn(`Warning: ${filePath}: ${e.message}`);
  }
  return names;
}

// ── XML HELPERS ──
function urlToXml(loc, lastmod, changefreq, priority) {
  return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod || TODAY}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
}

function writeSitemap(filename, urls) {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  for (const u of urls) {
    xml += urlToXml(u.loc, u.lastmod, u.changefreq, u.priority) + '\n';
  }
  xml += '</urlset>';
  const filePath = path.join(OUTPUT_DIR, filename);
  fs.writeFileSync(filePath, xml, 'utf8');
  console.log(`  ✅ ${filename}: ${urls.length} URLs (${(Buffer.byteLength(xml) / 1024).toFixed(0)} KB)`);
  return urls.length;
}

function validateUrls(urls) {
  let bad = 0;
  for (const u of urls) {
    const urlPath = u.loc.replace(SITE_URL, '');
    if (INVALID_CHARS.test(urlPath)) { console.error(`  ❌ Non-ASCII: ${u.loc}`); bad++; }
    if (/%[0-9A-Fa-f]{2}/.test(urlPath)) { console.error(`  ❌ Encoded: ${u.loc}`); bad++; }
    if (u.loc !== u.loc.toLowerCase()) { console.error(`  ❌ Uppercase: ${u.loc}`); bad++; }
  }
  return bad;
}

// ══════════════════════════════════════════
// 1. PAGES SITEMAP (static + categories + letters + origins + blog + guides)
// ══════════════════════════════════════════
function buildPagesSitemap() {
  console.log('\n📄 Building sitemap-pages.xml...');
  const urls = [];
  const seen = new Set();
  let skipped = 0;

  function add(loc, changefreq, priority) {
    if (seen.has(loc)) { skipped++; return; }
    seen.add(loc);
    urls.push({ loc, lastmod: TODAY, changefreq, priority });
  }

  // Static pages
  const staticPages = [
    { path: '', priority: '0.9', freq: 'weekly' },
    { path: '/names', priority: '0.9', freq: 'weekly' },
    { path: '/search', priority: '0.9', freq: 'weekly' },
    { path: '/blog', priority: '0.9', freq: 'weekly' },
    { path: '/name-meanings', priority: '0.8', freq: 'weekly' },
    { path: '/unique-names', priority: '0.8', freq: 'weekly' },
    { path: '/trending-names', priority: '0.8', freq: 'weekly' },
    { path: '/popularity', priority: '0.8', freq: 'weekly' },
    { path: '/names-by-meaning', priority: '0.8', freq: 'weekly' },
    { path: '/languages', priority: '0.8', freq: 'weekly' },
    { path: '/terms', priority: '0.5', freq: 'monthly' },
    { path: '/about', priority: '0.5', freq: 'monthly' },
    { path: '/privacy', priority: '0.5', freq: 'monthly' },
    { path: '/advanced-search', priority: '0.7', freq: 'monthly' },
    { path: '/my-names', priority: '0.5', freq: 'monthly' },
    { path: '/popular-by-state', priority: '0.6', freq: 'monthly' },
    { path: '/viral-names', priority: '0.6', freq: 'monthly' },
    { path: '/guides/expert-naming-guide', priority: '0.7', freq: 'monthly' },
    { path: '/names/religion/islamic/1', priority: '0.8', freq: 'weekly' },
    { path: '/names/religion/christian/1', priority: '0.8', freq: 'weekly' },
    { path: '/names/religion/hindu/1', priority: '0.8', freq: 'weekly' },
    { path: '/islamic/boy-names', priority: '0.8', freq: 'weekly' },
    { path: '/islamic/girl-names', priority: '0.8', freq: 'weekly' },
    { path: '/christian/boy-names', priority: '0.8', freq: 'weekly' },
    { path: '/christian/girl-names', priority: '0.8', freq: 'weekly' },
    { path: '/hindu/boy-names', priority: '0.8', freq: 'weekly' },
    { path: '/hindu/girl-names', priority: '0.8', freq: 'weekly' },
  ];
  for (const p of staticPages) add(`${SITE_URL}${p.path}`, p.freq, p.priority);

  // Letter pages (a-z × 3 religions)
  for (const r of VALID_RELIGIONS) {
    for (let i = 0; i < 26; i++) {
      add(`${SITE_URL}/names/${r}/letter/${String.fromCharCode(97 + i)}/1`, 'monthly', '0.4');
    }
  }

  // Category pages
  const categories = ['modern', 'traditional', 'nature', 'religious', 'classical', 'unique'];
  for (const r of VALID_RELIGIONS) {
    for (const c of categories) {
      add(`${SITE_URL}/names/${r}/categories/${c}/1`, 'weekly', '0.7');
    }
  }

  // Origin pages (from structured data files)
  const originsByReligion = {};
  const structuredFiles = [
    { file: 'islamic-boy-names.json', r: 'islamic' },
    { file: 'islamic-girl-names.json', r: 'islamic' },
    { file: 'christian-boy-names.json', r: 'christian' },
    { file: 'christian-girl-names.json', r: 'christian' },
    { file: 'hindu-boy-names.json', r: 'hindu' },
    { file: 'hindu-girl-names.json', r: 'hindu' },
  ];
  for (const { file, r } of structuredFiles) {
    try {
      const fp = path.join(DATA_DIR, file);
      if (!fs.existsSync(fp)) continue;
      const data = JSON.parse(fs.readFileSync(fp, 'utf8'));
      if (!Array.isArray(data)) continue;
      if (!originsByReligion[r]) originsByReligion[r] = new Set();
      for (const entry of data) {
        const origin = entry.origin || entry.Origin || '';
        if (origin && typeof origin === 'string') {
          const slug = createSafeSlug(origin);
          if (slug && slug.length >= 2) originsByReligion[r].add(slug);
        }
      }
    } catch (e) { /* ignore */ }
  }
  for (const r of VALID_RELIGIONS) {
    for (const o of (originsByReligion[r] || new Set())) {
      add(`${SITE_URL}/names/${r}/origin/${o}/1`, 'monthly', '0.6');
    }
  }

  // Blog posts
  try {
    const bp = path.join(DATA_DIR, 'blog-posts.json');
    if (fs.existsSync(bp)) {
      const posts = JSON.parse(fs.readFileSync(bp, 'utf8'));
      if (Array.isArray(posts)) {
        for (const post of posts) {
          if (post.id && isValidSlug(post.id)) {
            add(`${SITE_URL}/blog/${post.id}`, 'monthly', '0.7');
          }
        }
      }
    }
  } catch (e) { /* ignore */ }

  // Guide pages
  const guideSlugs = ['expert-naming-guide'];
  try {
    const gd = path.join(process.cwd(), 'src', 'app', 'guides');
    if (fs.existsSync(gd)) {
      for (const e of fs.readdirSync(gd, { withFileTypes: true })) {
        if (e.isDirectory() && e.name !== '[slug]' && !guideSlugs.includes(e.name) && isValidSlug(e.name)) {
          guideSlugs.push(e.name);
        }
      }
    }
  } catch (e) { /* ignore */ }
  for (const s of guideSlugs) add(`${SITE_URL}/guides/${s}`, 'monthly', '0.6');

  const bad = validateUrls(urls);
  const count = writeSitemap('sitemap-pages.xml', urls);
  console.log(`  Duplicates skipped: ${skipped}, Invalid: ${bad}`);
  return count;
}

// ══════════════════════════════════════════
// 2. NAME SITEMAPS — SPLIT INTO CHUNKS OF 2500
// ══════════════════════════════════════════
function buildNameSitemapSplit(religion, label, dataFiles) {
  console.log(`\n📛 Building sitemap-${label}-names-*.xml (split at ${MAX_URLS_PER_FILE})...`);
  const allUrls = [];
  const seen = new Set();
  let totalNames = 0;

  for (const { file, dir } of dataFiles) {
    const fp = path.join(dir, file);
    const names = loadNamesFromFile(fp);
    totalNames += names.length;
    for (const slug of names) {
      const loc = `${SITE_URL}/names/${religion}/${slug}`;
      if (seen.has(loc)) continue;
      seen.add(loc);
      allUrls.push({ loc, lastmod: TODAY, changefreq: 'yearly', priority: '0.6' });
    }
  }

  const bad = validateUrls(allUrls);
  console.log(`  Raw names: ${totalNames}, Unique URLs: ${allUrls.length}, Invalid: ${bad}`);

  // Split into chunks of MAX_URLS_PER_FILE
  const chunks = [];
  for (let i = 0; i < allUrls.length; i += MAX_URLS_PER_FILE) {
    chunks.push(allUrls.slice(i, i + MAX_URLS_PER_FILE));
  }

  const writtenFiles = [];
  for (let i = 0; i < chunks.length; i++) {
    const part = i + 1;
    // Single chunk: no part number. Multiple chunks: add -1, -2, etc.
    const filename = chunks.length === 1
      ? `sitemap-${label}-names.xml`
      : `sitemap-${label}-names-${part}.xml`;
    const count = writeSitemap(filename, chunks[i]);
    writtenFiles.push({ file: filename, count });
  }

  return writtenFiles;
}

// ══════════════════════════════════════════
// 3. SITEMAP INDEX
// ══════════════════════════════════════════
function buildSitemapIndex(subSitemaps) {
  console.log('\n📋 Building sitemap.xml (index)...');
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  for (const s of subSitemaps) {
    xml += `  <sitemap>\n    <loc>${SITE_URL}/${s.file}</loc>\n    <lastmod>${TODAY}</lastmod>\n  </sitemap>\n`;
  }
  xml += '</sitemapindex>';
  const filePath = path.join(OUTPUT_DIR, 'sitemap.xml');
  fs.writeFileSync(filePath, xml, 'utf8');
  console.log(`  ✅ sitemap.xml: ${subSitemaps.length} sub-sitemaps`);
}

// ══════════════════════════════════════════
// MAIN BUILD
// ══════════════════════════════════════════
function build() {
  console.log('🔨 Building multi-file sitemap system (max 2,500 URLs per file)...\n');
  const subSitemaps = [];

  // 1. Pages sitemap
  const pageCount = buildPagesSitemap();
  subSitemaps.push({ file: 'sitemap-pages.xml', count: pageCount });

  // 2. Islamic names (split into 2500-chunk files)
  const islamicFiles = buildNameSitemapSplit('islamic', 'islamic', [
    { file: 'islamic-boy-names.json', dir: DATA_DIR },
    { file: 'islamic-girl-names.json', dir: DATA_DIR },
    { file: 'islamic_names.json', dir: PUBLIC_DIR },
  ]);
  subSitemaps.push(...islamicFiles);

  // 3. Christian names (split into 2500-chunk files)
  const christianFiles = buildNameSitemapSplit('christian', 'christian', [
    { file: 'christian-boy-names.json', dir: DATA_DIR },
    { file: 'christian-girl-names.json', dir: DATA_DIR },
    { file: 'christians_names.json', dir: PUBLIC_DIR },
  ]);
  subSitemaps.push(...christianFiles);

  // 4. Hindu names (split into 2500-chunk files)
  const hinduFiles = buildNameSitemapSplit('hindu', 'hindu', [
    { file: 'hindu-boy-names.json', dir: DATA_DIR },
    { file: 'hindu-girl-names.json', dir: DATA_DIR },
    { file: 'hindu_names.json', dir: PUBLIC_DIR },
  ]);
  subSitemaps.push(...hinduFiles);

  // 5. Sitemap index
  buildSitemapIndex(subSitemaps);

  // Summary
  const totalUrls = subSitemaps.reduce((sum, s) => sum + s.count, 0);
  console.log('\n═══════════════════════════════════════');
  console.log('📊 SITEMAP SYSTEM SUMMARY');
  console.log('═══════════════════════════════════════');
  for (const s of subSitemaps) {
    console.log(`  ${s.file}: ${s.count} URLs`);
  }
  console.log(`  ─────────────────────────`);
  console.log(`  Total indexable URLs: ${totalUrls}`);
  console.log(`  Max per sitemap file: ${MAX_URLS_PER_FILE}`);
  console.log('═══════════════════════════════════════');
  console.log('✅ All sitemaps built and validated.\n');
}

try {
  build();
} catch (err) {
  console.error('❌ Sitemap build failed:', err);
  process.exit(1);
}