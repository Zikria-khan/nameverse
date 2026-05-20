const fs = require('fs');
const path = require('path');
const src = 'E:/code/nameverse/src';

const IMPORT = "import { getSiteUrl } from '@/lib/seo/site';\n";
let fixed = [];

// All files that need fixing (from scan)
const fixableFiles = [
  'app/names/layout.jsx',
  'app/names/religion/[religion]/[page]/head.jsx',
  'components/Breadcrumbs/Breadcrumbs.jsx',
  'components/HomePage/SeoContentBlock.jsx',
  'components/SEO/GoogleBotMeta.jsx',
  'components/SEO/StructuredData.jsx',
  'config/env.js',
];

for (const relFile of fixableFiles) {
  const fp = path.join(src, relFile);
  if (!fs.existsSync(fp)) { console.log('NOT FOUND:', relFile); continue; }
  let c = fs.readFileSync(fp, 'utf8');
  const orig = c;

  if (!/https:\/\/nameverse\.vercel\.app/.test(c)) {
    console.log('OK (no hardcoded):', relFile);
    continue;
  }

  // Strategy A: if file has const SITE_URL = ... declaration, replace it
  if (/const SITE_URL\b/.test(c)) {
    c = c.replace(
      // Match on this line (handles \r\n endings)
      /^const SITE_URL\s*=\s*[^\r\n]*;[^\r\n]*/m,
      ''
    );
    // Replace all standalone SITE_URL references
    c = c.replace(/\bSITE_URL\b/g, 'getSiteUrl()');
    // Add import if getSiteUrl() is now referenced
    if (c.includes('getSiteUrl()') && !c.includes('import { getSiteUrl }')) {
      const importIdx = c.search(/^(import\s+['"][^'"]+['"];\s*)/m);
      if (importIdx !== -1) {
        const after = c.indexOf('\n', importIdx) + 1;
        c = c.slice(0, after) + IMPORT + c.slice(after);
      } else {
        c = IMPORT + c;
      }
    }
  }
  // Strategy B: if file has process.env check, handle more carefully
  else if (/process\.env\.NEXT_PUBLIC_SITE_URL/.test(c)) {
    // Add getSiteUrl import, replace the env check with getSiteUrl call
    const importIdx = c.search(/^(import[^\n]*;\s*\n)+/m);
    if (!c.includes('getSiteUrl')) {
      const importMatch = c.match(/^(import\s+['"][^'"]+['"];?\s*\n?)+/m);
      if (importMatch) {
        const after = importMatch.index + importMatch[0].length;
        c = c.slice(0, after) + IMPORT + c.slice(after);
      }
    }

    // Replace `process.env.NEXT_PUBLIC_SITE_URL || 'https://nameverse.vercel.app'` with getSiteUrl()
    c = c.replace(
      /process\.env\.NEXT_PUBLIC_SITE_URL\s*\|\|\s*['"`]https:\/\/nameverse\.vercel\.app['"`]/g,
      "getSiteUrl()"
    );
    // Replace just `process.env.NEXT_PUBLIC_SITE_URL` (when it's the sole value)
    c = c.replace(/process\.env\.NEXT_PUBLIC_SITE_URL/g, 'getSiteUrl()');

    // Now fix all getSiteUrl() references to ensure they work properly
    // (function returns SITE_URL, so getSiteUrl() is the call)
  } else {
    // Strategy C: bare hardcoded URL as default prop value or inline
    c = c.replace(
      /['"`]https:\/\/nameverse\.vercel\.app['"`]/g,
      "'https://nameverse.vercel.app'"
    );
  }

  fs.writeFileSync(fp, c);
  const remaining = (c.match(/https:\/\/nameverse\.vercel\.app/g) || []).length;
  fixed.push({ file: relFile, remaining });
  console.log(relFile, ':', remaining > 0 ? '⚠️ STILL ' + remaining + ' remaining' : '✅ fixed');
}

console.log('\nDone! Fixed', fixed.length, 'files.');
fixed.forEach(f => console.log(' ', f.file, f.remaining > 0 ? '⚠️ ' + f.remaining + ' remaining' : '✅'));
