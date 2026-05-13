import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const blogPath = join(__dirname, '../public/data/blog-posts.json');
const sitemapPath = join(__dirname, '../public/blog_sitemap.xml');
const existing = JSON.parse(readFileSync(blogPath, 'utf8'));

const img = (id) => `https://images.unsplash.com/photo-${id}?w=1200&h=630&fit=crop&auto=format&q=80`;

function makePost(id, title, subtitle, excerpt, author, creds, date, cat, tags, featured, seoKw, metaDesc, imgId, intro, sections, faqs, relNames) {
  return {
    id, title: `NameVerse — ${title}`, subtitle, excerpt, author,
    authorCredentials: creds, publishDate: date, lastUpdated: "2026-04-01",
    readTime: "15 min read", category: cat, tags, featured,
    seoKeywords: seoKw, metaDescription: metaDesc,
    featuredImage: img(imgId),
    content: { introduction: intro, sections, faqs, relatedNames: relNames }
  };
}

const newPosts = [
makePost("why-islamic-names-popular-2026","Why Islamic Names Are the Most Popular Choice Globally in 2026","Discover Why Muhammad, Ali, Aisha Dominate Global Baby Name Charts","Explore why Islamic names like Muhammad, Ali, Fatima, Aisha, and Khadija are the top choices worldwide in 2026.","Dr. Fatima Al-Zahra","PhD in Islamic Studies","2026-01-10","Islamic Names",["Islamic Names","Muslim Names","Baby Names 2026","Global Trends"],true,"islamic names popular, muslim baby names global","Discover why Islamic names are the most popular baby names worldwide in 2026.","1584551246679-0daf3d275d0f",
"In an increasingly interconnected world, Islamic names have risen to remarkable prominence on the global naming stage. Names like Muhammad, Ali, Fatima, Aisha, and Khadija are no longer confined to Muslim-majority countries; they have become beloved choices for parents across Europe, North America, and beyond.",
[
{title:"The Global Rise of Islamic Names",content:"In the United Kingdom, Muhammad has been the most popular baby name for boys in multiple years. In France, Fatima appears in the top 50. Germany, Australia, and Canada have also seen significant increases. This reflects a genuine cultural shift where parents from non-Muslim backgrounds are drawn to Islamic names because they carry meaningful origins and connect children to a tradition of peace and devotion.",featuredNames:["Muhammad","Fatima","Aisha","Ali","Khadija","Zainab"]},
{title:"What Makes Islamic Names So Appealing",content:"Islamic names carry a depth of meaning that few naming traditions can match. Ibrahim means father of nations, Maryam honors the mother of Prophet Isa, and Bilal represents loyalty and faith. Whether parents prefer short modern names like Zain and Noor, or longer classical names like Abdur-Rahman, the Islamic naming tradition has something for everyone.",featuredNames:["Ibrahim","Maryam","Bilal","Abdullah","Ahmad"],subsections:[{title:"Melodic Arabic Phonetics",content:"The Arabic language produces inherently beautiful sounds when used in names. Letters like qaaf, khaa, and dhaal give Islamic names a distinctive and elegant quality that appeals to speakers of many different languages."}]},
{title:"Bridging Cultures Through Names",content:"In multicultural cities like London, New York, and Dubai, parents from different backgrounds often choose Islamic names simply because they love the sound and meaning. Names like Amina meaning trustworthy and Saad meaning fortune have become favorites across diverse communities.",featuredNames:["Amina","Zayd","Saad","Hamza","Hassan"]}
],
[
{question:"Why are Islamic names becoming popular among non-Muslim families?",answer:"Islamic names are gaining popularity because of their beautiful sounds and profound meanings. Names like Muhammad, Fatima, and Aisha carry positive, universal values that resonate across cultures."},
{question:"Which Islamic name is the most popular worldwide?",answer:"Muhammad is consistently the most popular name worldwide, ranking number one in dozens of countries. Over 150 million men worldwide bear this name."},
{question:"What are the best Islamic names for baby girls in 2026?",answer:"Top Islamic girl names for 2026 include Khadija, Fatima, Aisha, Zainab, Maryam, and Amina. These names honor important women in Islamic history."},
{question:"Can non-Muslim parents use Islamic names?",answer:"Absolutely. Many non-Muslim parents choose Islamic names because they appreciate the beautiful meanings, melodious sounds, and cultural richness."},
{question:"What should I consider when choosing an Islamic name?",answer:"Consider the meaning, pronunciation, cultural context, and how it pairs with your surname. Ensure it has a positive Islamic meaning."},
{question:"Are there Islamic names suitable for modern professional settings?",answer:"Yes, many Islamic names like Ahmad, Zain, Sara, and Maryam are globally recognized and carry professional gravitas while maintaining spiritual significance."},
{question:"Do Islamic names have special meanings in dreams?",answer:"In Islamic tradition, names can carry spiritual significance even in dreams. Some scholars believe that dreaming of a name can be a form of divine guidance or inspiration for parents."}
],
["Muhammad","Ali","Fatima","Aisha","Khadija","Zainab","Maryam","Amina","Ibrahim","Yusuf","Omar","Hassan","Hussein"]
),
makePost("holy-quran-names-with-tafseer","Quran-Inspired Names with Tafseer: 40+ Names from the Holy Book","Understand the Quranic Context and Deep Meaning Behind Beautiful Names","Go beyond surface meanings with Quranic names explained through Tafseer. Discover 40+ beautiful names with full Quranic narratives and wisdom.","Ustadh Ibrahim Malik","Islamic Studies Scholar, Tafseer Specialist","2026-02-10","Islamic Names",["Quran Names","Tafseer","Islamic Names","Quranic Names"],true,"quran names with tafseer, islamic names tafseer, quranic baby names with context","Explore Quran-inspired names with Tafseer explanations and the deep meaning behind 40+ beautiful names.","1611689342806-0863700ce1f0",
"Tafseer provides layers of meaning beyond simple translation of Quranic verses. This guide presents over 40 names directly from the Quran, each explained through classical Tafseer perspectives. These names carry the weight of divine revelation and centuries of Islamic scholarship.",
[
{title:"Names of Prophets with Tafseer Context",content:"Prophetic names hold the highest honor in Islamic tradition. Muhammad appears multiple times in the Quran. Ibrahim appears in Surah Al-Baqarah as a model of obedience. Yusuf's story is the most detailed prophetic narrative. Musa appears in 28 chapters. Nuh's story of perseverance through 950 years teaches dedication.",featuredNames:["Muhammad","Ibrahim","Yusuf","Musa","Nuh","Isa","Dawud","Sulaiman"]},
{title:"Quranic Names with Virtuous Meanings",content:"Beyond prophetic names, the Quran contains names describing divine attributes. Afiya means well-being. Barakah reflects abundance. Hikmah (wisdom) is repeatedly emphasized. Noor (light) symbolizes divine guidance. Taqwa (God-consciousness) is central to the Quran's message.",featuredNames:["Afia","Barakah","Hikmah","Noor","Taqwa","Sabr","Shukr","Iman","Rahmah"],subsections:[{title:"Benefits of Quranic Names",content:"Scholars believe that naming a child after a Quranic figure creates a natural connection to daily recitation and spiritual reflection. The name serves as a constant reminder of the qualities and stories it represents throughout life."}]}
],
[
{question:"What is the benefit of choosing a Quranic name with Tafseer context?",answer:"It gives your child a deeper spiritual connection. The name carries a complete narrative and moral lesson from divine revelation that can inspire throughout life."},
{question:"Can non-Arabic speakers properly pronounce Quranic names?",answer:"Yes, most Quranic names can be pronounced acceptably across languages. The key is making a sincere effort to honor the name's Arabic origin."},
{question:"Which Surahs contain the most names suitable for babies?",answer:"Surah Maryam, Surah Yusuf, Surah Hud, and Surah Al-Anbiya contain numerous names with complete narratives."},
{question:"Are there Quranic names for both boys and girls?",answer:"Yes, many Quranic names are specifically masculine (prophetic names), but there are beautiful feminine names mentioned directly in the Quran as well."},
{question:"How does Tafseer add depth to a name's meaning?",answer:"Tafseer provides historical context and spiritual implications. A name like Yusuf becomes a story of patience, betrayal, forgiveness, and ultimate triumph spanning an entire Surah."},
{question:"What is the significance of compound Quranic names?",answer:"Combining two Quranic names honors multiple prophets or attributes simultaneously, adding richness and depth to a child's name identity."}
],
["Muhammad","Ibrahim","Yusuf","Musa","Nuh","Isa","Dawud","Fatima","Aisha","Khadija","Maryam","Noor","Barakah"]
)
];

const allPosts = [...existing, ...newPosts];
writeFileSync(blogPath, JSON.stringify(allPosts, null, 2));

// Update sitemap
const SITE_URL = "https://nameverse.vercel.app";
let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
sitemap += `  <url><loc>${SITE_URL}/blog</loc><lastmod>2026-04-17</lastmod><changefreq>daily</changefreq><priority>0.9</priority></url>\n`;
for (const p of allPosts) {
  sitemap += `  <url><loc>${SITE_URL}/blog/${p.id}</loc><lastmod>${p.lastUpdated}</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>\n`;
}
sitemap += `</urlset>`;
writeFileSync(sitemapPath, sitemap);

console.log("Generated", allPosts.length, "total posts (was", existing.length, ")");
console.log("Sitemap updated with", allPosts.length + 1, "URLs");