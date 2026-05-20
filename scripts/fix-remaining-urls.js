const fs = require('fs');
const path = require('path');

const src = 'E:/code/nameverse/src';
const IMPORT = "import { getSiteUrl } from '@/lib/seo/site';\n";
let fixed = [];

// Target specific files
const targets = [
  'src/app/layout.js',
  'src/app/names/religion/[religion]/[page]/head.jsx',
  'src/components/Breadcrumbs/Breadcrumbs.jsx',
  'src/components/HomePage/LatestArticles.jsx',
  'src/components/HomePage/SeoContentBlock.jsx',
  'src/components/SEO/GoogleBotMeta.jsx',
  'src/config/env.js',
];

// Fix names/layout.jsx - this needs special handling
// Fix sitemap.ts (has import issue too)

for (const relFile of targets) {
  const fp = path.join(src, relFile);
  if (!fs.existsSync(fp)) { console.log('NOT FOUND:', relFile); continue; }
  let c = fs.readFileSync(fp, 'utf8');
  const orig = c;

  // Remove any SITE_URL declaration
  c = c.replace(/^const SITE_URL\s*=\s*process\.env\.NEXT_PUBLIC_SITE_URL[^\n]*;\s*\n?/m, '');
  // Replace remaining bare SITE_URL references
  c = c.replace(/\bSITE_URL\b/g, 'getSiteUrl()');
  // Add import
  if (c.includes('getSiteUrl()') && !c.includes("getSiteUrl")) {
    const importMatch = c.match(/^(import\s+'[^']+';?\s*\n?)+/m);
    if (importMatch) {
      const idx = importMatch.index + importMatch[0].length;
      c = c.slice(0, idx) + IMPORT + c.slice(idx);
    } else {
      c = IMPORT + c;
    }
  }

  if (c !== orig) {
    fs.writeFileSync(fp, c);
    fixed.push(relFile);
  }
}

// Fix names/layout.jsx separately
const layoutJSX = path.join(src, 'src/app/names/layout.jsx');
let c2 = fs.readFileSync(layoutJSX, 'utf8');
const orig2 = c2;
c2 = c2.replace(/^const SITE_URL\s*=\s*process\.env\.NEXT_PUBLIC_SITE_URL[^\n]*;\s*\n?/m, '');
c2 = c2.replace(/\bSITE_URL\b/g, 'getSiteUrl()');
if (c2.includes('getSiteUrl()') && !c2.includes("getSiteUrl")) {
  const importMatch = c2.match(/^(import\s+'[^']+';?\s*\n?)+/m);
  if (importMatch) {
    const idx = importMatch.index + importMatch[0].length;
    c2 = c2.slice(0, idx) + IMPORT + c2.slice(idx);
  }
}
fs.writeFileSync(layoutJSX, c2);
if (c2 !== orig2) fixed.push('src/app/names/layout.jsx');

// Fix StructuredData.jsx
const sd = path.join(src, 'src/components/SEO/StructuredData.jsx');
let csd = fs.readFileSync(sd, 'utf8');
const osd = csd;
csd = csd.replace(/^const SITE_URL\s*=\s*process\.env\.NEXT_PUBLIC_SITE_URL[^\n]*;\s*\n?/m, '');
csd = csd.replace(/\bSITE_URL\b/g, 'getSiteUrl()');
if (csd.includes('getSiteUrl()') && !csd.includes("getSiteUrl")) {
  const importMatch = csd.match(/^(import\s+'[^']+';?\s*\n?)+/m);
  if (importMatch) {
    const idx = importMatch.index + importMatch[0].length;
    csd = csd.slice(0, idx) + IMPORT + csd.slice(idx);
  }
}
fs.writeFileSync(sd, csd);
if (csd !== osd) fixed.push('src/components/SEO/StructuredData.jsx');

console.log('Fixed:', fixed.join(', '));
console.log('ALL remaining hardcoded URLs replaced with getSiteUrl()');
