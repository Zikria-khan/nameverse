const fs = require('fs');
const path = require('path');

const baseDir = 'E:/code/nameverse/src/app';
const files = [
  { rel: 'islamic/boy-names/page.jsx',   realCount: 139, year: 2026, placeholderCountPrefix: '150+' },
  { rel: 'islamic/girl-names/page.jsx',  realCount: 216, year: 2026, placeholderCountPrefix: '200+' },
  { rel: 'hindu/boy-names/page.jsx',     realCount: 150, year: 2026, placeholderCountPrefix: '150+' },
  { rel: 'hindu/girl-names/page.jsx',    realCount: 150, year: 2026, placeholderCountPrefix: '150+' },
  { rel: 'christian/boy-names/page.jsx', realCount: 100, year: 2026, placeholderCountPrefix: '' },
  { rel: 'christian/girl-names/page.jsx',realCount: 100, year: 2026, placeholderCountPrefix: '' },
];

const today = new Date().toISOString().split('T')[0];

for (const cfg of files) {
  const fp = path.join(baseDir, cfg.rel);
  let c = fs.readFileSync(fp, 'utf8');

  // 1. Remove broken `` + getSiteUrl() + ` patterns
  // They appear brokenly as: `` + getSiteUrl() + ` or ` + '' + `getSiteUrl() +` patterns
  // The canonical broken form is: getSiteUrl() + 'getSiteUrl() + `path`'
  // Let's approach systematically:

  // First: replace double getSiteUrl() that look like: getSiteUrl() + 'getSiteUrl() + `
  c = c.replace(/getSiteUrl\(\) \+ 'getSiteUrl\(\) \+ `([^`]+)`/g, "getSiteUrl() + '/$1'");

  // Second: catch any remaining: `getSiteUrl() + ` path`s that look like: getSiteUrl() + `path`
  // Replace: getSiteUrl() + `path` → getSiteUrl() + '/path'
  // (these appear when the original was: `getSiteUrl() + `xx`` — malformed template literal)
  c = c.replace(/getSiteUrl\(\) \+ `([^`]+)`/g, "getSiteUrl() + '/$1'");

  // Third: clean up any leftover: `` + getSiteUrl() + `
  // Pattern: empty-backtick  + getSiteUrl() + backtick-path
  c = c.replace(/`` \+ getSiteUrl\(\) \+ `([^`]+)`/g, "getSiteUrl() + '/$1'");

  // Fourth: replace bare ` + `` (empty template literal + concat)
  c = c.replace(/\+ ``/g, '+');

  // Fifth: replace any `` left from start-of-line empty template
  c = c.replace(/^``\s*/gm, '');

  // 2. Fix name counts: 150+ → realCount+; note: some pages might still show different counts
  if (cfg.realCount === 139) {
    c = c.replace(/150\+/g, '139+');
  } else if (cfg.realCount === 216) {
    c = c.replace(/200\+/g, '216+');
  } else {
    c = c.replace(/150\+/g, `${cfg.realCount}+`);
  }

  // 3. Fix hardcoded 2025-01-01 dates → today
  c = c.replace(/2025-01-01/g, today);

  // 4. Fix year in year-context keywords: best X names 2025 → best X names 2026
  c = c.replace(/(best \w+ names )2025/gi, '$1' + cfg.year);

  fs.writeFileSync(fp, c);

  // Quick sanity check
  const stillBad1 = (c.match(/nameverse\.vercel\.app/g) || []).length;
  const stillBad2 = (c.match(/getSiteUrl\(\) \+ 'getSiteUrl\(\) \+ `/g) || []).length;
  const stillBad3 = (c.match(/`` \+/g) || []).length;
  console.log(`${cfg.rel}: badURLs=${stillBad1}, doubled-getsite=${stillBad2}, empty-backtick=${stillBad3}, count=${cfg.realCount}+`);
}
console.log('\nDone');
