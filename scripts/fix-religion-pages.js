const fs = require('fs');
const path = require('path');

const baseDir = 'E:/code/nameverse/src/app';
const files = [
  { rel: 'islamic/boy-names/page.jsx',   realCount: 139, labelBoy: 'Islamic Boy',   labelGirl: 'Islamic Girl',   religionCode: 'islamic', badgeCount: 139,  year: 2026 },
  { rel: 'islamic/girl-names/page.jsx',  realCount: 216, labelBoy: 'Islamic Boy',   labelGirl: 'Islamic Girl',   religionCode: 'islamic', badgeCount: 216,  year: 2026 },
  { rel: 'hindu/boy-names/page.jsx',     realCount: 150, labelBoy: 'Hindu Boy',     labelGirl: 'Hindu Girl',     religionCode: 'hindu',   badgeCount: 150,  year: 2026 },
  { rel: 'hindu/girl-names/page.jsx',    realCount: 150, labelBoy: 'Hindu Boy',     labelGirl: 'Hindu Girl',     religionCode: 'hindu',   badgeCount: 150,  year: 2026 },
  { rel: 'christian/boy-names/page.jsx', realCount: 100, labelBoy: 'Christian Boy', labelGirl: 'Christian Girl', religionCode: 'christian', badgeCount: 100, year: 2026 },
  { rel: 'christian/girl-names/page.jsx',realCount: 100, labelBoy: 'Christian Boy', labelGirl: 'Christian Girl', religionCode: 'christian', badgeCount: 100, year: 2026 },
];

const today = new Date().toISOString().split('T')[0];

for (const f of files) {
  const fp = path.join(baseDir, f.rel);
  let content = fs.readFileSync(fp, 'utf8');

  // 1️⃣ Replace hardcoded SITE_URL constant with getSiteUrl() call
  // Remove:   const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://nameverse.vercel.app';
  // Add:      (keep the { getSiteUrl } import we already added)
  content = content.replace(
    /^const SITE_URL = process\.env\.NEXT_PUBLIC_SITE_URL \|\| '.+';\s*\n?/gm,
    ''
  );
  // Replace all ${SITE_URL} template references with function calls
  content = content.replace(/\$\{SITE_URL\}/g, '` + getSiteUrl() + `');

  // 2️⃣ Fix name counts in title/description
  // Only replace if the current count doesn't match the real data count
  const currentCount = content.match(/title:.*?(\d+)\+.*?Names/);
  if (!currentCount || parseInt(currentCount[1]) !== f.realCount) {
    // Replace all 150+, 200+ style counts with real count for this page
    content = content.replace(/150\+/g, `${f.realCount}+`);
    content = content.replace(/200\+/g, `${f.realCount}+`);
  }

  // 3️⃣ Fix hardcoded 2025-01-01 dates in FAQ schema
  content = content.replace(/2025-01-01/g, today);
  content = content.replace(/"2025"/g, `"${f.year}"`);

  // 4️⃣ Update year 2025 → 2026 in keywords and descriptions
  content = content.replace(/"best.*?2025"/gi, '"best 2026"');
  content = content.replace(/(best \w+ names )2025/gi, `$1${f.year}`);

  // 5️⃣ Write back
  fs.writeFileSync(fp, content);

  // 6️⃣ Verify src/app SITE_URL hardcoded URLs are gone for this file
  const remaining = content.match(/https:\/\/nameverse\.vercel\.app/g);
  if (remaining && remaining.length > 0) {
    console.log(`⚠️  ${f.rel}: still has ${remaining.length} hardcoded URLs!`);
  } else {
    console.log(`✅ ${f.rel}: cleaned (${f.realCount}+ names, year=${f.year})`);
  }
}
console.log('\nDone!');
