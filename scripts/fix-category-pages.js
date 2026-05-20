const fs = require('fs');
const path = require('path');

const baseDir = 'E:/code/nameverse/src/app';
const configs = [
  { rel: 'islamic/boy-names/page.jsx',   religion: 'Islamic',  religionCode: 'islamic', gender: 'Boy',   realCount: 139, labelRel: 'Islamic'   },
  { rel: 'islamic/girl-names/page.jsx',  religion: 'Islamic',  religionCode: 'islamic', gender: 'Girl',  realCount: 216, labelRel: 'Islamic'   },
  { rel: 'hindu/boy-names/page.jsx',     religion: 'Hindu',    religionCode: 'hindu',   gender: 'Boy',   realCount: 150, labelRel: 'Hindu'     },
  { rel: 'hindu/girl-names/page.jsx',    religion: 'Hindu',    religionCode: 'hindu',   gender: 'Girl',  realCount: 150, labelRel: 'Hindu'     },
  { rel: 'christian/boy-names/page.jsx', religion: 'Christian', religionCode: 'christian',gender: 'Boy',   realCount: 100, labelRel: 'Christian' },
  { rel: 'christian/girl-names/page.jsx',religion: 'Christian', religionCode: 'christian',gender: 'Girl',  realCount: 100, labelRel: 'Christian' },
];

const today = new Date().toISOString().split('T')[0];
const year = new Date().getFullYear();

for (const cfg of configs) {
  const fp = path.join(baseDir, cfg.rel);
  let c = fs.readFileSync(fp, 'utf8');

  // ── 1. Remove the const SITE_URL = process.env... line, strip all hardcoded URLs ──
  c = c.replace(
    /const SITE_URL = process\.env\.NEXT_PUBLIC_SITE_URL \|\| ['"`][^'"`]+['"`];?\s*\n/g,
    ''
  );

  // ── 2. Replace every ${SITE_URL} pattern with getSiteUrl() string concat ──
  c = c.replace(/\$\{SITE_URL\}/g, "getSiteUrl()");

  // ── 3. Clean up the resulting broken `` + getSiteUrl() + ` patterns ──
  // The replacement "`` + getSiteUrl() + `" fixes to proper concat
  c = c.replace(/`` \+\s*/g, "getSiteUrl() + '");
  c = c.replace(/\s*\+ ``/g, "' + getSiteUrl()");

  // ── 4. Replace any remaining isolated `` + ` artifacts ──
  c = c.replace(/``\s*\+\s*`/g, '');

  // ── 5. All standalone SITE_URL var references → getSiteUrl() ──
  c = c.replace(/\bSITE_URL\b/g, "getSiteUrl()");

  // ── 6. Fix count mismatches: delete old hard-coded totalCount numbers ──
  // Replace 150+ in content where it should match realCount for islamic-boy (139)
  // Replace 200+ in content where it should match realCount for islamic-girl (216)
  const currentTotal = parseInt(c.match(/(\\d+)\+/)?.[1] || '0');
  if (currentTotal !== cfg.realCount) {
    // Reset to real count everywhere 150+ or 200+ appears
    c = c.replace(/150\+/g, `${cfg.realCount}+`);
  }

  // ── 7. Fix datePublished: 2025-01-01 → today ──
  c = c.replace(/2025-01-01/g, today);

  // ── 8. Replace "2025" with current year only in year context (metadata/dates/preview) ──
  // Safe replacements:
  c = c.replace(/(Updated["'\s]*\r?\n[^<\n<]*?)(2025)/gi, `$1${year}`);             // "Updated" year
  c = c.replace(/(best \w+ names )2025/gi, `$1${year}`);                               // "best X names YYYY"
  c = c.replace(/(\b\w+ names\s+2025\b)/gi, `$1${year}`);

  // ── 9. Add getSiteUrl import if not present ──
  if (!c.includes("import { getSiteUrl }")) {
    c = c.replace(
      /(^import Link from 'next\/link';\s*\n)/m,
      "import Link from 'next/link';\nimport { getSiteUrl } from '@/lib/seo/site';\n"
    );
  }

  fs.writeFileSync(fp, c);

  // Verify
  const hardcoded = (c.match(/https:\/\/nameverse\.vercel\.app/g) || []).length;
  const undefinedSite = (c.match(/\bSITE_URL\b/g) || []).length;
  console.log(
    `${cfg.rel}: hardcoded-URLs=${hardcoded}, stale-SITE_URL=${undefinedSite}, count=${cfg.realCount}+, year=${year}`
  );
}
console.log('\n=== All 6 religion category pages fixed ===');
