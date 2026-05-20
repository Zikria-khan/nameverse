const fs = require('fs');
const sitemap = fs.readFileSync('E:/code/nameverse/src/app/sitemap.ts', 'utf8');

// Check actual variable names present
const allVars = ['BLOG_DATA', 'ISL_NAMES', 'HIND_NAMES', 'CHR_NAMES', 'ISL_BOY', 'ISL_GIRL', 'HIND_BOY', 'HIND_GIRL', 'CHR_BOY', 'CHR_GIRL'];
const found = allVars.filter(v => sitemap.includes(v));

console.log('Data sources found:', found.length + '/10');
found.forEach(v => console.log('  ✓', v));

const missing = allVars.filter(v => !sitemap.includes(v));
console.log('Missing:', missing.length ? missing : 'NONE');

console.log('\nISR revalidate:', Math.round(+sitemap.match(/export const revalidate\s*=\s*(\d+)/)[1] / 86400), 'days');
console.log('buildEntries():', sitemap.includes('function buildEntries()'));
console.log('generateSitemaps():', sitemap.includes('export async function generateSitemaps()'));
console.log('export default:', sitemap.includes('export default function sitemap()'));
console.log('getSiteUrl() calls:', (sitemap.match(/getSiteUrl\(\)/g) || []).length);

console.log('\n--- Entry types generated ---');
console.log('  Root pages:', sitemap.includes("entry(getSiteUrl() + p, today, 0.9"));
console.log('  Religion list:', sitemap.includes("/names/religion/${r}/1"));
console.log('  Blog posts:', sitemap.includes("/blog/${post.id}"));
console.log('  Name detail:', sitemap.includes("/names/islamic/${slugify(name)}"));
console.log('  Letter pages:', sitemap.includes("/letter/${letter}/${p}"));
console.log('  Boy/girl pages:', sitemap.includes("/boy-names"));
