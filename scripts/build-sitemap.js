const fs = require('fs');
const path = require('path');

// ─── Build-step: generate sitemap.xml into public/ ───────────────────────────
// Run with:  node scripts/build-sitemap.js
//
// This runs at build time and writes a complete sitemap.xml directly to
// public/sitemap.xml, so Next.js serves it as a plain static file.
// Zero ISR, zero runtime re-computation, zero edge read-CPU for /sitemap.xml.
// ─────────────────────────────────────────────────────────────────────────────

const SITE = (process.env.NEXT_PUBLIC_SITE_URL || 'https://nameverse.vercel.app').replace(/\/+$/, '');
const TODAY = new Date().toISOString().split('T')[0];

const DATA = path.join(process.cwd(), 'public');
const BLOG  = JSON.parse(fs.readFileSync(path.join(DATA, 'data', 'blog-posts.json'),  'utf8'));
const ISL   = JSON.parse(fs.readFileSync(path.join(DATA,       'islamic_names.json'), 'utf8'));
const HIND  = JSON.parse(fs.readFileSync(path.join(DATA,       'hindu_names.json'),    'utf8'));
const CHR   = JSON.parse(fs.readFileSync(path.join(DATA,       'christians_names.json'),'utf8'));
const IBoy  = JSON.parse(fs.readFileSync(path.join(DATA, 'data', 'islamic-boy-names.json'),  'utf8'));
const IGirl = JSON.parse(fs.readFileSync(path.join(DATA, 'data', 'islamic-girl-names.json'), 'utf8'));
const HBoy  = JSON.parse(fs.readFileSync(path.join(DATA, 'data', 'hindu-boy-names.json'),   'utf8'));
const HGirl = JSON.parse(fs.readFileSync(path.join(DATA, 'data', 'hindu-girl-names.json'),  'utf8'));
const CBoy  = JSON.parse(fs.readFileSync(path.join(DATA, 'data', 'christian-boy-names.json'),'utf8'));
const CGirl = JSON.parse(fs.readFileSync(path.join(DATA, 'data', 'christian-girl-names.json'),'utf8'));

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const NPP = 50; // names per page

function slug(name) {
  return String(name || '')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9\s-]/g, '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}
function escXml(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
function e(loc, lastmod, pri='0.7', cf='weekly') {
  return `  <url>\n    <loc>${escXml(loc)}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${cf}</changefreq>\n    <priority>${pri}</priority>\n  </url>`;
}

const urls = [];

// 1. Root / static pages
const roots = ['/','/names','/search','/blog','/name-meanings','/unique-names','/trending-names','/popularity','/names-by-meaning','/languages','/terms','/about'];
roots.forEach(p => urls.push(e(SITE + p, TODAY, '0.9', 'weekly')));

// 2. Religion list pages
['islamic','christian','hindu'].forEach(r => urls.push(e(SITE + `/names/religion/${r}/1`, TODAY, '0.8', 'weekly')));

// 3. Blog posts
BLOG.forEach(post => {
  const lm = (post.publishDate || '').split('T')[0] || TODAY;
  urls.push(e(SITE + `/blog/${post.id}`, lm, '0.8', 'weekly'));
});

// 4. Name detail pages (flat string arrays)
ISL.forEach(n  => urls.push(e(SITE + `/names/islamic/${slug(n)}`,  TODAY, '0.6', 'yearly')));
HIND.forEach(n => urls.push(e(SITE + `/names/hindu/${slug(n)}`,    TODAY, '0.6', 'yearly')));
CHR.forEach(n  => urls.push(e(SITE + `/names/christian/${slug(n)}`,TODAY, '0.6', 'yearly')));

// 5. Letter pages
const lookups = { islamic_boy:IBoy, islamic_girl:IGirl, hindu_boy:HBoy, hindu_girl:HGirl, christian_boy:CBoy, christian_girl:CGirl };
const religions = ['islamic','christian','hindu'];
const genders  = ['boy','girl'];
for (const rel of religions) {
  for (const gen of genders) {
    const dataLen = (lookups[`${rel}_${gen}`] || []).length;
    const totalPages = Math.ceil(dataLen / NPP);
    for (const letter of ALPHABET) {
      for (let page = 1; page <= totalPages; page++) {
        const prio = page === 1 ? '0.7' : '0.3';
        urls.push(e(SITE + `/names/${rel}/${gen}/letter/${letter}/${page}`, TODAY, prio, 'weekly'));
      }
    }
  }
}

// 6. Boy/girl category pages
[['islamic',IBoy,IGirl],['christian',CBoy,CGirl],['hindu',HBoy,HGirl]].forEach(([rel,boy,girl]) => {
  urls.push(e(SITE + `/names/${rel}/boy-names`,  TODAY, '0.8','weekly'));
  urls.push(e(SITE + `/names/${rel}/girl-names`, TODAY, '0.8','weekly'));
});

// 7. Build XML file
const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...urls,
  '</urlset>',
  ''
].join('\n');

const outPath = path.join(process.cwd(), 'public', 'sitemap.xml');
fs.writeFileSync(outPath, xml, 'utf8');
console.log('Written', urls.length, 'URL entries to', outPath);
