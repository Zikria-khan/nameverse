const fs = require('fs');
const path = require('path');

const baseDir = 'E:/code/nameverse/src/app';
const files = [
  { rel: 'islamic/boy-names/page.jsx' },
  { rel: 'islamic/girl-names/page.jsx' },
  { rel: 'hindu/boy-names/page.jsx' },
  { rel: 'hindu/girl-names/page.jsx' },
  { rel: 'christian/boy-names/page.jsx' },
  { rel: 'christian/girl-names/page.jsx' },
];

for (const f of files) {
  const fp = path.join(baseDir, f.rel);
  let c = fs.readFileSync(fp, 'utf8');

  // Fix the double-slash URLs: getSiteUrl() + '//path' → getSiteUrl() + '/path'
  // The broken pattern has TWO leading slashes in the string concat
  c = c.replace(/getSiteUrl\(\) \+ '\/\/([^']+)'/g, "getSiteUrl() + '/$1'");

  // Fix any remaining path with a leading / being the SITE_URL replacement artifact
  // Pattern: getSiteUrl() + 'path_without_slash' → getSiteUrl() + '/path_without_slash'
  // This handles cases where the original path had no leading slash after the URL
  c = c.replace(/getSiteUrl\(\) \+ '(?!\/)([^']+)'/g, "getSiteUrl() + '/$1'");

  fs.writeFileSync(fp, c);

  // Verify
  const bad1 = (c.match(/nameverse\.vercel\.app/g) || []).length;
  const bad2 = (c.match(/\/\//g) || []).length;
  console.log(`${f.rel}: bad hardcoded-urls=${bad1}, double-slashes=${bad2}`);
}
console.log('\nDone fixing double-slashes');
