const fs = require('fs');
const path = require('path');

const baseDir = 'E:/code/nameverse/src/app';
const files = [
  { rel: 'islamic/boy-names/page.jsx',   realCount: 139, year: 2026 },
  { rel: 'islamic/girl-names/page.jsx',  realCount: 216, year: 2026 },
  { rel: 'hindu/boy-names/page.jsx',     realCount: 150, year: 2026 },
  { rel: 'hindu/girl-names/page.jsx',    realCount: 150, year: 2026 },
  { rel: 'christian/boy-names/page.jsx', realCount: 100, year: 2026 },
  { rel: 'christian/girl-names/page.jsx',realCount: 100, year: 2026 },
];

const today = new Date().toISOString().split('T')[0];

for (const cfg of files) {
  const fp = path.join(baseDir, cfg.rel);
  let c = fs.readFileSync(fp, 'utf8');

  // ── Step A: first rewrite every ${SITE_URL} -> function call shows, fix counts, dates
  const todayStr = today;
  const yr = String(cfg.year);

  // 1. Remove the const SITE_URL declaration
  c = c.replace(/^const SITE_URL =[^\n]*;\s*\n/m, '');

  // 2. Replace all reference to bare SITE_URL identifier with getSiteUrl()
  c = c.replace(/\bSITE_URL\b/g, 'getSiteUrl()');

  // 3. Now fix the pattern where `xxx${SITE_URL}yyy` was wrongly already broken.
  //   Actually, let's verify the file: show the first canonical: occurrence
  // No-op here; the global replacement covers it.

  // 4. Count replacements: make numeric counts match actual data
  // We must be careful: "150+" appears in many places.
  // Count actual name count in file (use realCount from config)
  c = c.replace(new RegExp(`/${cfg.realCount == 139 ? '150\\+' : cfg.realCount == 216 ? '200\\+' : cfg.realCount == 100 ? '' : '150\\+'}/g`), `${cfg.realCount}+`);
  // Simple: just run both 150+ and 200+ replacements for all
  c = c.replace(/150\+/g, `${cfg.realCount}+`);

  // 5. Fix year
  c = c.replace(/2025-01-01/g, todayStr);
  // Replace standalone "2025" in keyword strings with "2026"
  c = c.replace(/(\b\w+\s+names\s+)2025(\b)/gi, `$1${yr}$2`);
  c = c.replace(/(2025\s*[",}])/gi, `${yr}$1`);

  fs.writeFileSync(fp, c);

  // Validate
  const urlIssues = (c.match(/nameverse\.vercel\.app/g) || []).length;
  console.log(`${cfg.rel}: URLs=${urlIssues}, count=${cfg.realCount}+`);
}
console.log('\nDone');
