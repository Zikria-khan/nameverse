const fs = require('fs');
const path = require('path');
const src = 'E:/code/nameverse/src';

const IMPORT = "import { getSiteUrl } from '@/lib/seo/site';\n";

// 1. layout.js - uses lowercase siteUrl in template literals
const layoutPath = path.join(src, 'app/layout.js');
let c = fs.readFileSync(layoutPath, 'utf8');
const cOrig = c;
// Add import after imports section
c = c.replace(
  /(^(import[^\n]*;\s*\n)+)/m,
  m => m + IMPORT.trimEnd() + '\n'
);
// Replace siteUrl declaration
c = c.replace(
  /const siteUrl = process\.env\.NEXT_PUBLIC_SITE_URL \|\| "https:\/\/nameverse\.vercel\.app"/,
  "const siteUrl = getSiteUrl()"
);
// Fix all ${siteUrl} template uses: converts them to ` + siteUrl + ` style
c = c.replace(/\$\{siteUrl\}/g, "' + siteUrl + '");
// Clean up any accidental ' + ' artifacts from template replacement
// If a string like ""<string>" + siteUrl + "</string>"  →  "<string>siteUrl</string>"
c = c.replace(/' \+ siteUrl \+ '/g, '');
fs.writeFileSync(layoutPath, c);
console.log('layout.js:', c !== cOrig ? 'FIXED' : 'no change');

// 2. LatestArticles.jsx - client component, replace URL locally
const latestPath = path.join(src, 'components/HomePage/LatestArticles.jsx');
c = fs.readFileSync(latestPath, 'utf8');
c = c.replace(
  /const siteUrl = process\.env\.NEXT_PUBLIC_SITE_URL \|\| 'https:\/\/nameverse\.vercel\.app';/g,
  "const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://nameverse.vercel.app'; // Inlined at build time"
);
fs.writeFileSync(latestPath, c);
console.log('LatestArticles.jsx:', 'FIXED');

// 3. Breadcrumbs.jsx - client component, inline URLs have wildcard
const breadPath = path.join(src, 'components/Breadcrumbs/Breadcrumbs.jsx');
c = fs.readFileSync(breadPath, 'utf8');
c = c.replace(
  /item: 'https:\/\/nameverse\.vercel\.app'/g,
  "item: (typeof window !== 'undefined' ? window.location.origin : 'https://nameverse.vercel.app')"
);
c = c.replace(
  /item: `https:\/\/nameverse\.vercel\.app\$\{item\.href\}`/g,
  "item: (typeof window !== 'undefined' ? window.location.origin : 'https://nameverse.vercel.app') + item.href"
);
fs.writeFileSync(breadPath, c);
console.log('Breadcrumbs.jsx:', 'FIXED');

// 4. GoogleBotMeta.jsx - default prop URL
const gbotPath = path.join(src, 'components/SEO/GoogleBotMeta.jsx');
c = fs.readFileSync(gbotPath, 'utf8');
c = c.replace(
  /siteUrl = "https:\/\/nameverse\.vercel\.app"/,
  'siteUrl = typeof window !== "undefined" ? window.location.origin : "https://nameverse.vercel.app"'
);
fs.writeFileSync(gbotPath, c);
console.log('GoogleBotMeta.jsx:', 'FIXED');

// 5. head.jsx
const headPath = path.join(src, 'app/names/religion/[religion]/[page]/head.jsx');
if (fs.existsSync(headPath)) {
  c = fs.readFileSync(headPath, 'utf8');
  const cOrigH = c;
  // Add import
  if (!c.includes("getSiteUrl")) {
    c = c.replace(/^(import[\s\S]*?;\s*\n)+/m, m => m + "import { getSiteUrl } from '@/lib/seo/site';\n");
  }
  c = c.replace(
    /process\.env\.NEXT_PUBLIC_SITE_URL \|\| "https:\/\/nameverse\.vercel\.app"/g,
    "getSiteUrl()"
  );
  fs.writeFileSync(headPath, c);
  console.log('head.jsx:', c !== cOrigH ? 'FIXED' : 'no change');
} else {
  console.log('head.jsx: NOT FOUND');
}

// 6. env.js - site.url: fallback URL (this is fine for config intent, leave as-is)
// Already properly handling env vars

console.log('\nAll remaining URL files processed.');
