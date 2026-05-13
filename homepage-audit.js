const fs = require('fs');
const path = require('path');
const appDir = path.join(process.cwd(),'src','app');
function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let files = [];
  for (const ent of entries) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      files.push(...walk(full));
    } else {
      files.push(full);
    }
  }
  return files;
}
function countMatches(content, re) {
  const m = content.match(re);
  return m ? m.length : 0;
}
const homepageFile = path.join(appDir, 'page.js');
const homepageComp = fs.readFileSync(homepageFile, 'utf8');
const compDir = path.join(process.cwd(), 'src', 'components', 'HomePage');
const homeFiles = walk(compDir).filter(f => f.endsWith('.jsx') || f.endsWith('.js'));
const titleMatch = homepageComp.match(/default:\s*validateMetaTitle\("([^"]+)"\)/s);
const title = titleMatch ? titleMatch[1] : '';
const titleWords = title ? title.replace(/[\n\r]/g, ' ').split(/\s+/).filter(Boolean).length : 0;
let h1 = 0, h2 = 0, h3 = 0, wordCount = 0, totalLinks = 0;
const brokenLinks = [];
const hrefs = [];
function getValidRoutes() {
  const all = new Set();
  function addDir(dir, prefix) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const ent of entries) {
      if (ent.isDirectory()) {
        const rel = path.posix.join(prefix, ent.name);
        all.add('/' + rel.replace(/\\/g, '/'));
        addDir(path.join(dir, ent.name), rel);
      } else if (ent.name === 'page.js' || ent.name === 'page.jsx') {
        all.add('/' + prefix.replace(/\\/g, '/'));
      }
    }
  }
  addDir(appDir, '');
  return all;
}
const routeSet = getValidRoutes();
for (const file of [homepageFile, ...homeFiles]) {
  const content = fs.readFileSync(file, 'utf8');
  h1 += countMatches(content, /<h1\b/gi);
  h2 += countMatches(content, /<h2\b/gi);
  h3 += countMatches(content, /<h3\b/gi);
  const text = content.replace(/<[^>]+>/g, ' ');
  wordCount += text.split(/\s+/).filter(Boolean).length;
  const matches = [...content.matchAll(/(?:href\s*=\s*|Link href=)(?:"|')(\/[^"']+)(?:"|')/gi)];
  for (const m of matches) {
    hrefs.push(m[1]);
  }
}
const hrefSet = [...new Set(hrefs)];
for (const href of hrefSet) {
  totalLinks++;
  let normalized = href;
  if (normalized.startsWith('/')) {
    normalized = normalized.split(/[?#]/)[0];
    if (!routeSet.has(normalized)) {
      const segments = normalized.split('/').filter(Boolean);
      const candidates = Array.from(routeSet).filter(r => {
        const segs = r.split('/').filter(Boolean);
        if (segs.length !== segments.length) return false;
        return segs.every((seg, i) => seg.startsWith('[') || seg === segments[i]);
      });
      if (candidates.length === 0) {
        brokenLinks.push({ href, reason: 'no matching route' });
      }
    }
  }
}
const results = {
  title,
  titleWords,
  h1,
  h2,
  h3,
  wordCount,
  totalLinks,
  uniqueHrefs: hrefSet.length,
  brokenLinks,
  routeCount: routeSet.size,
  homeFilesCount: homeFiles.length,
};
fs.writeFileSync('homepage-audit.json', JSON.stringify(results, null, 2));
console.log('homepage-audit.json written');
