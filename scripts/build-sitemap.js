import fs from "fs";
import axios from "axios";
import path from "path";

// ========================
// CONFIG
// ========================
const SITE_URL = "https://nameverse.vercel.app";
const API_BASE = "https://namverse-api.vercel.app/api/names";

const RELIGIONS = ["islamic", "hindu", "christian"];
const LIMIT = 100;                // API fetch limit
const URLS_PER_SITEMAP = 1000;    // Max URLs per sitemap file
const PUBLIC_DIR = "public";
const PROGRESS_FILE = path.join(PUBLIC_DIR, "sitemap-progress.json");

// Ensure /public exists
if (!fs.existsSync(PUBLIC_DIR)) fs.mkdirSync(PUBLIC_DIR);

// ========================
// PROGRESS FUNCTIONS
// ========================
function loadProgress() {
  if (!fs.existsSync(PROGRESS_FILE)) {
    return { lastReligionIndex: 0, lastPage: 1, sitemapIndex: 1 };
  }
  return JSON.parse(fs.readFileSync(PROGRESS_FILE, "utf8"));
}

function saveProgress(p) {
  fs.writeFileSync(PROGRESS_FILE, JSON.stringify(p, null, 2));
}

// ========================
// SITEMAP WRITER
// ========================
function writeSitemap(index, urls) {
  const filePath = path.join(PUBLIC_DIR, `sitemap-${index}.xml`);
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `<url>
  <loc>${url}</loc>
  <changefreq>weekly</changefreq>
  <priority>0.8</priority>
</url>`
  )
  .join("\n")}
</urlset>`;

  fs.writeFileSync(filePath, xml);
  console.log(`✅ Created sitemap-${index}.xml (${urls.length} URLs)`);
}

// ========================
// SITEMAP INDEX GENERATOR
// ========================
function writeSitemapIndex(totalSitemaps) {
  const indexFile = path.join(PUBLIC_DIR, "sitemap-index.xml");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${Array.from({ length: totalSitemaps })
  .map(
    (_, i) => `<sitemap>
  <loc>${SITE_URL}/sitemap-${i + 1}.xml</loc>
</sitemap>`
  )
  .join("\n")}
</sitemapindex>`;

  fs.writeFileSync(indexFile, xml);
  console.log(`📌 Generated sitemap-index.xml referencing ${totalSitemaps} sitemaps.`);
}

// ========================
// MAIN SCRIPT
// ========================
async function generate() {
  let progress = loadProgress();
  let sitemapUrls = [];

  console.log("🚀 Starting Sitemap Generation...\n");

  for (let r = progress.lastReligionIndex; r < RELIGIONS.length; r++) {
    const religion = RELIGIONS[r];
    let page = progress.lastPage;

    console.log(`\n🔍 Processing religion: ${religion}, starting at page ${page}`);

    while (true) {
      const apiUrl = `${API_BASE}?religion=${religion}&page=${page}&limit=${LIMIT}`;
      console.log(`Fetching → ${apiUrl}`);

      try {
        const res = await axios.get(apiUrl);
        const data = res.data?.data;

        if (!data || !data.names || data.names.length === 0) {
          console.log(`No more names for ${religion}`);
          break;
        }

        // Add URLs
        data.names.forEach((n) => {
          sitemapUrls.push(`${SITE_URL}/names/${religion}/${n.slug}`);
        });

        // If max URLs reached → write sitemap file
        if (sitemapUrls.length >= URLS_PER_SITEMAP) {
          writeSitemap(progress.sitemapIndex, sitemapUrls);
          sitemapUrls = [];
          progress.sitemapIndex++;
          saveProgress({ ...progress, lastReligionIndex: r, lastPage: page + 1 });
        }

        if (!data.pagination?.hasNextPage) break;

        page++;
        progress.lastPage = page;
        saveProgress(progress);
      } catch (err) {
        console.error(`❌ Error fetching page ${page} of ${religion}:`, err.message);
        console.log("⏳ Retrying in 5 seconds...");
        await new Promise((res) => setTimeout(res, 5000));
      }
    }

    // Move to next religion
    progress.lastPage = 1;
    progress.lastReligionIndex = r + 1;
    saveProgress(progress);
  }

  // Write remaining URLs
  if (sitemapUrls.length > 0) {
    writeSitemap(progress.sitemapIndex, sitemapUrls);
    progress.sitemapIndex++;
  }

  saveProgress(progress);

  // Generate sitemap index
  writeSitemapIndex(progress.sitemapIndex - 1);

  console.log("\n🎉 All sitemaps generated successfully!");
}

// Run
generate().catch((err) => console.error(err));
