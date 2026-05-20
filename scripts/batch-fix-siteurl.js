const fs = require('fs');
const path = require('path');

const src = 'E:/code/nameverse/src';
const fixed = [];

// Collect all .js/.jsx files in src/ (skip .d.ts)
const files = [];
function walk(dir) {
  try {
    for (const f of fs.readdirSync(dir)) {
      const fp = path.join(dir, f);
      if (fs.statSync(fp).isDirectory() && f !== 'node_modules' && f !== '.next') walk(fp);
      else if ((f.endsWith('.js') || f.endsWith('.jsx')) && !f.endsWith('.d.ts')) files.push(fp);
    }
  } catch (e) { /* skip */ }
}
walk(src);

const IMPORT = "import { getSiteUrl } from '@/lib/seo/site';\n";

for (const fp of files) {
  let c = fs.readFileSync(fp, 'utf8');
  const orig = c;

  // If file still has the const SITE_URL declaration, remove it
  if (/const SITE_URL\s*=\s*process\.env\./.test(c)) {
    c = c.replace(/^const SITE_URL\s*=\s*process\.env\.[^\n]*;\s*\n?/m, '');
  }
  // If file still has bare SITE_URL refs, replace them
  if (/\bSITE_URL\b/.test(c)) {
    c = c.replace(/\bSITE_URL\b/g, 'getSiteUrl()');
  }
  // If file now uses getSiteUrl() but lacks the import, add it
  if (c.includes('getSiteUrl()') && !c.includes('getSiteUrl')) {
    const rel = fp.replace(src + '/', '');
    // Find the last import statement and add after it
    const importMatch = c.match(/^(import\s+'[^']+';?\s*\n?)+/m);
    if (importMatch) {
      const lastImportIdx = importMatch.index + importMatch[0].length;
      c = c.slice(0, lastImportIdx) + IMPORT + c.slice(lastImportIdx);
    } else {
      c = IMPORT + c;
    }
  }

  if (c !== orig) {
    fs.writeFileSync(fp, c);
    fixed.push(fp.replace(src + '/', ''));
  }
}

console.log('Fixed', fixed.length, 'files:');
fixed.forEach(f => console.log('  •', f));
