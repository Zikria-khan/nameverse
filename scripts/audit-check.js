const fs = require('fs');
const p = (fp) => { try { return fs.readFileSync(fp, 'utf8'); } catch (e) { return 'NOT FOUND'; } };

console.log('=== ISR REVALIDATE VALUES ===');
const isrFiles = [
  'E:/code/nameverse/src/app/page.js',
  'E:/code/nameverse/src/app/blog/page.jsx',
  'E:/code/nameverse/src/app/blog/[slug]/page.jsx',
  'E:/code/nameverse/src/app/names/[religion]/letter/[letter]/[page]/page.jsx',
  'E:/code/nameverse/src/app/names/religion/[religion]/[page]/page.jsx',
  'E:/code/nameverse/src/app/names/[religion]/origin/[origin]/[page]/page.jsx',
  'E:/code/nameverse/src/app/names/[religion]/categories/[category]/[page]/page.jsx',
];
isrFiles.forEach(f => {
  const c = p(f);
  const reval = c.match(/export const revalidate\s*=\s*(\d+)/);
  const days = reval ? Math.round(parseInt(reval[1]) / 86400) : 'NOT FOUND';
  console.log('  ', f.replace('E:/code/nameverse/src/app/', ''), ':', days, 'day(s)');
});

console.log('\n=== DYNAMIC SITEMAP ===');
const sc = p('E:/code/nameverse/src/app/sitemap.ts');
const m = sc.match(/export const revalidate\s*=\s*(\d+)/);
console.log('  revalidate:', m ? m[1] + ' = ' + Math.round(parseInt(m[1]) / 86400) + ' days' : 'MISSING');
console.log('  buildEntries:', sc.includes('function buildEntries') ? 'YES' : 'NO');
console.log('  generateSitemaps:', sc.includes('generateSitemaps') ? 'YES' : 'NO');
console.log('  export default sitemap:', sc.includes('export default function sitemap') ? 'YES' : 'NO');
const dSrc = ['blogPosts','islNames','hinduNames','christianNames','ISL_BOY','ISL_GIRL','HIND_BOY','HIND_GIRL','CHR_BOY','CHR_GIRL'];
const dFound = dSrc.filter(k => sc.includes(k));
console.log('  data sources:', dFound.length + '/10 found [' + dFound.join(', ') + ']');

console.log('\n=== FAQAccordion.jsx ===');
const fc = p('E:/code/nameverse/src/components/names/FAQAccordion.jsx');
console.log('  has "use client":', fc.includes("use client") ? 'YES' : 'NO');
console.log('  has <details>:', fc.includes('<details') ? 'YES' : 'NO');
console.log('  has useState:', fc.includes('useState') ? 'YES' : 'NO');

console.log('\n=== NAMES/PAGE.JSX (category) ===');
const np = p('E:/code/nameverse/src/app/names/page.jsx');
console.log('  has "use client":', np.includes("use client") ? 'YES' : 'NO');
console.log('  uses getSiteUrl():', np.includes('getSiteUrl') ? 'YES' : 'NO');

console.log('\n=== HARDCODED URLs IN SOURCE (lib/seo/site.js excluded) ===');
const srcDir = 'E:/code/nameverse/src';
let total = 0;
function walk2(dir) {
  try {
    for (const f of fs.readdirSync(dir)) {
      const fp = dir + '/' + f;
      if (fs.statSync(fp).isDirectory() && f !== 'node_modules') walk2(fp);
      else if ((f.endsWith('.jsx') || f.endsWith('.js')) && !f.endsWith('.d.ts') && !fp.includes('/site.js')) {
        const content = fs.readFileSync(fp, 'utf8');
        const ml = content.match(/https:\/\/nameverse\.vercel\.app/g);
        if (ml) { console.log('  ', fp.replace(srcDir + '/', ''), '(' + ml.length + 'x)'); total += ml.length; }
      }
    }
  } catch (e) {}
}
walk2(srcDir);
console.log('  Total non-legitimate hardcoded URL occurrences:', total);
console.log('  (src/lib/seo/site.js excluded -- legitimate default)');
