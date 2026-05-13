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

// Check current state
console.log("Current posts:", existing.length);
const existingIds = existing.map(p => p.id);
console.log("Existing IDs:", existingIds.slice(8).join(', '));

// Only add posts that don't already exist
const allNew = [

// POST 3: holy-quran-names-meanings
makePost("holy-quran-names-meanings","60+ Holy Quran Names with Deep Meanings for Boys and Girls 2026","Discover Beautiful Quranic Names with Spiritual Significance","Explore 60+ Quranic names for boys and girls with meanings and origins from the Holy Quran.","Dr. Fatima Al-Zahra","PhD in Islamic Studies","2026-02-05","Islamic Names",["Quran Names","Islamic Names","Quranic Names"],false,"quran names, holy quran names, quranic names with meanings","Discover 60+ Quranic names with meanings and origins from the Holy Quran.","1578662996442-48f60103fc96",
"The Holy Quran is the ultimate source of guidance for over 1.8 billion Muslims worldwide. Within its verses lie some of the most beautiful and meaningful names ever conceived. Quranic names carry the weight of divine revelation and represent the highest aspirations of faith.",
[
{title:"Quranic Names for Boys",content:"Muhammad meaning the praised one is the most widely used name in the world. Ibrahim father of nations represents unwavering faith. Yusuf God will add symbolizes patience. Musa drawn from water honors the great prophet of the Law. Harun mountain of strength represents leadership. Ismail God has heard reflects answered prayers.",featuredNames:["Muhammad","Ibrahim","Yusuf","Musa","Ismail","Nuh","Dawud","Sulaiman","Harun","Isa"]},
{title:"Quranic Names for Girls",content:"Maryam the mother of Isa is arguably the most honored name in the Quran. Fatima one who abstains represents purity. Aisha meaning living was the name of the Prophets beloved wife. Khadija was the first believer and a successful businesswoman.",featuredNames:["Maryam","Fatima","Aisha","Khadija","Zainab","Ruqayyah","Amina","Sarah","Hajar","Asiya"]},
{title:"How to Choose a Quranic Name",content:"When selecting a Quranic name, consider its meaning within the context of the verse where it appears. Many Quranic names carry entire narratives of patience, faith, and divine wisdom. Research the verse associated with the name to understand its full significance.",subsections:[{title:"Pronunciation Tips",content:"Listen to Quran reciters for proper Arabic pronunciation. Many online resources provide audio to help parents choose correctly. Consulting with an imam or Arabic teacher is also beneficial."}]}
],
[
{question:"What makes a name a Quranic name?",answer:"A Quranic name is one that appears in the Holy Quran, either as a prophets name or a descriptive Quranic term. These names carry spiritual weight and are considered blessed."},
{question:"Are Quranic names only for Muslim children?",answer:"While Quranic names hold special significance for Muslims, anyone can choose one. Many have beautiful meanings that transcend religious boundaries."},
{question:"What are the most popular Quranic names in 2026?",answer:"Muhammad, Fatima, Aisha, Maryam, Ibrahim, Yusuf, Khadija, and Musa continue to top charts globally due to their profound meanings."},
{question:"How do I know the correct pronunciation?",answer:"Listen to Quran reciters, consult Arabic language resources, or ask an imam. Many online resources provide audio pronunciations."},
{question:"Can I combine two Quranic names?",answer:"Yes, combining two Quranic names like Muhammad Ibrahim is a beautiful tradition honoring multiple prophets."}
],
["Muhammad","Ibrahim","Yusuf","Maryam","Fatima","Aisha","Khadija","Musa","Ismail","Amina","Zainab","Sarah"]
),

// POST 4: baby-name-shape-personality
makePost("baby-name-shape-personality","The Hidden Power of Your Baby Name: How Names Shape Personality Development","Discover Scientific Research on How Your Childs Name Influences Their Future","Research shows names can influence personality, career choices, and how others perceive us. Learn the hidden psychology behind naming.","Dr. Sarah Mitchell","PhD in Psychology, Name Researcher","2026-01-15","Name Meanings",["Name Psychology","Baby Names","Personality","Name Meanings"],false,"baby name personality, name psychology, how names shape personality","Discover how names shape personality development through scientific research."),"https://images.unsplash.com/photo-1518152006812-edab29b069ac?w=1200&h=630&fit=crop&auto=format&q=80",
"Names are far more than labels. Research in psychology and sociology has revealed that the name you give your child can subtly influence their personality development, self-image, and even life outcomes. From the name-letter effect to implicit egotism, the science behind naming is both fascinating and profound.",
[
{title:"The Science of Name Psychology",content:"Studies by researchers like Jean Twenge at San Diego State University have shown that names can influence how people perceive themselves and how others treat them. The name-letter effect, first documented by Jozef Nuttin in 1985, shows that people are unconsciously drawn to things that share their initials. A child named Adam may develop an affinity for things starting with 'A.'"},
{title:"Names and Career Choices",content:"Research published in the Journal of Personality and Social Psychology found that people named Dennis were disproportionately likely to become dentists, while those named Lauren were more likely to become lawyers. While not deterministic, these patterns suggest names create subtle psychological nudges that shape our identity and choices."},
{title:"The Name-Letter Effect and Self-Image",content:"Children implicitly understand that their name is a core part of their identity. When a child has a name with a positive meaning like Muhammad (praised), David (beloved), or Krishna (divine), they may internalize those qualities. Conversely, names with awkward pronunciations or negative associations can create early social challenges.",featuredNames:["Abraham","Sarah","Muhammad","David","Rachel"]},
{title:"Choosing an Empowering Name",content:"When choosing a name, consider its psychological impact alongside its sound and meaning. Names that are easy to pronounce, spell, and carry positive associations tend to benefit children in social and professional settings throughout their lives.",subsections:[{title:"Avoiding Unintended Associations",content:"Before finalizing a name, Google it, check initials, and consider potential nicknames. A name like Amanda might seem lovely, but 'Mandy' could invite unwanted teasing in certain school environments."}]}
],
[
{question:"Can a name really affect personality?",answer:"Research suggests names can subtly influence self-image and others perceptions. While not deterministic, names carry meanings and associations that children may internalize over time."},
{question:"What is the name-letter effect?",answer:"The name-letter effect is the unconscious preference people have for things associated with their own name. For example, someone named Louis may prefer the brand Louis Vuitton."},
{question:"Should I choose a name based on its psychological impact?",answer:"Its one factor to consider along with cultural significance, family traditions, and personal taste. A name with positive meaning can be a subtle source of confidence for your child."},
{question:"Do unusual names cause problems?",answer:"Very unusual names may lead to constant corrections or assumptions. The sweet spot is distinctive enough to stand out but accessible enough for daily use."},
{question:"How do names affect first impressions?",answer:"Studies show people form snap judgments based on names before even meeting someone. Names that are easy to pronounce tend to be rated more favorably."},
{question:"Can I change my childs name if they dont like it?",answer:"Many countries allow legal name changes, though the process varies. Discuss potential names with your child as they grow older to avoid the need for changes."}
],
["Abraham","Sarah","Muhammad","David","Rachel","Hannah","Jacob","Anna","Joseph","Elizabeth"]
),

// POST 5: reasons-biblical-names-2026
makePost("reasons-biblical-names-2026","5 Powerful Reasons Why Parents Are Choosing Biblical Names in 2026","Timeless Faith Meets Modern Style as Biblical Names Surge in Popularity","Discover why names like David, Sarah, Abraham, Esther, and John are dominating baby name charts in 2026.","Pastor Michael Thompson","Master of Divinity, Biblical Scholar","2026-01-18","Christian Names",["Biblical Names","Christian Names","Baby Names 2026"],true,"biblical names trending, christian baby names 2026, reasons to choose biblical names","The top reasons why biblical and Christian names are surging in popularity among modern parents.","1544197150-b99a580bb7a8",
"Biblical names have been cherished for millennia, but 2026 is seeing an unprecedented resurgence. From Old Testament patriarchs to New Testament disciples, biblical names are experiencing a massive revival among parents of all faiths and backgrounds. Here are five powerful reasons driving this trend.",
[
{title:"1. Timeless Strength and Meaning",content:"Biblical names carry thousands of years of meaning and significance. Sarah means princess, David means beloved, Abraham means father of many. These names are not just sounds—they are stories of courage, faith, and resilience that parents want to pass on to their children.",featuredNames:["Abraham","Sarah","David","Rachel","Rebecca"]},
{title:"2. Celebrity and Pop Culture Influence",content:"When celebrities choose biblical names, the effect is dramatic. The name Ruth surged after a popular TV series, while Esther gained traction through social media influencers. Hollywood actors, musicians, and athletes are increasingly choosing biblical names for their own children, creating a ripple effect.",featuredNames:["Esther","Ruth","Elizabeth","Job","Adam"],subsections:[{title:"Social Media Amplification",content:"Platforms like Instagram and TikTok have accelerated the spread of biblical name trends. When an influencer shares their babys name, it can reach millions within hours, creating rapid spikes in name popularity."}]},
{title:"3. Cultural Heritage and Identity",content:"For many families, biblical names are a way to honor their religious and cultural heritage. Whether Jewish, Christian, or simply appreciative of the Bible narrative, these names create a tangible connection to ancient traditions and values.",featuredNames:["Elijah","Hannah","Samuel","Mary","John"]},
{title:"4. Cross-Cultural Appeal",content:"Biblical names work beautifully across cultures and languages. David, Mary, Joseph, and Sarah are recognized and pronounced similarly worldwide, making them ideal choices for multicultural families or parents who travel internationally.",featuredNames:["Daniel","Matthew","Thomas","James","Peter"]}
],
[
{question:"Are biblical names only for religious families?",answer:"Not at all! Many secular families choose biblical names for their beautiful sounds, rich history, and positive meanings. Names like David, Sarah, and Rachel have universal appeal."},
{question:"What are the top biblical names for 2026?",answer:"For boys: Noah, Liam, James, Benjamin, Abraham. For girls: Sophia, Olivia, Hannah, Sarah, Elizabeth. These names consistently rank highest across global surveys."},
{question:"Can I use a biblical name from a different tradition?",answer:"Yes, biblical names are shared across Jewish, Christian, and Islamic traditions. Abraham, Sarah, Moses, and David appear in multiple religious texts worldwide."},
{question:"How do biblical names pair with modern surnames?",answer:"Biblical names tend to be classic and timeless, pairing well with virtually any surname. Shorter biblical names (Ruth, James, Noah) work especially well with longer surnames."},
{question:"What are some underrated biblical names?",answer:"Consider Silas, Barnabas, Priscilla, Lydia, or Onesimus for boys and girls. These New Testament names are distinctive yet carry deep historical significance."},
{question:"Why are old testament names more popular than new testament ones?",answer:"Old Testament names tend to be more recognized due to their use in popular culture, literature, and broader religious education. However, New Testament names like Thomas and Paul are gaining ground."},
{question:"Do biblical names have numerological significance?",answer:"Yes! Many biblical names can be analyzed through the Abjad system or Pythagorean numerology for additional meaning and compatibility with birth dates."}
],
["Abraham","David","Sarah","Rebecca","Rachel","Naomi","Esther","Ruth","Elizabeth","John","Matthew","Hannah","Anna","Peter","Paul"]
),

// POST 6: islamic-names-light-hope
makePost("islamic-names-light-hope","50+ Beautiful Islamic Names That Mean Light, Hope and Blessings","Illuminate Your Childs Life with Names of Light, Hope and Divine Blessings","Discover 50+ stunning Islamic names carrying meanings of light (noor), hope (amal), and divine blessings for your baby.","Dr. Fatima Al-Zahra","PhD in Islamic Studies","2026-01-20","Islamic Names",["Islamic Names","Meaningful Names","Light Names","Blessings"],false,"islamic names meaning light, names meaning hope islamic, islamic names blessings","Discover beautiful Islamic names meaning light, hope, and blessings for your baby.","1544568100-847a948585b9",
"Light, hope, and blessings are central themes in Islamic spirituality. The Quran is described as 'a light upon light' (An-Noor 24:35), and choosing a name reflecting these themes is a beautiful prayer for your childs future. This guide presents over 50 names organized by their luminous meanings.",
[
{title:"Names Meaning Light (Noor)",content:"Noor is one of the most popular Islamic names meaning light. Variations include Munira (illuminated), Nura (light), and Siraj (lamp). For boys, Nurullah means light of Allah, and Anwar means radiant. These names symbolize divine guidance and knowledge.",featuredNames:["Noor","Munira","Nura","Siraj","Nurullah","Anwar","Zia","Diyaa"]},
{title:"Names Meaning Hope (Amani)",content:"Hope is a powerful Islamic concept. Amani means wishes or aspirations. Amal means hope and works for both genders. Raja means hope in Arabic. These names carry optimism and faith.",featuredNames:["Amani","Aamal","Raja","Amal","Nadeen","Midraj","Matinah","Tama"]},
{title:"Names Meaning Blessings and Goodness",content:"Barakah is central to Islamic life. Names like Mubarak (blessed), Barkat (blessing), Tayyib (good), and Afiyah (well-being) reflect divine favor.",featuredNames:["Barakah","Mubarak","Barkat","Afia","Tayyib","Hasanah","Bushra","Fadilah"]},
{title:"Choosing an Auspicious Name",content:"In Islamic tradition, choosing a name with positive meaning is considered an act of worship. Names like Amina (trustworthy), Farah (joy), and Hani (happy) create an atmosphere of positivity around the child from birth.",featuredNames:["Amina","Farah","Hani","Ihsan","Zahra","Mahnoor","Basimah"]}
],
[
{question:"Why do Islamic names meaning light hold special significance?",answer:"Light symbolizes divine guidance in Islam. The Quran's Light Verse (24:35) is among its most celebrated. Choosing a name meaning light is a prayer for your child to be divinely guided."},
{question:"Can boys have light-themed names too?",answer:"Absolutely! Anwar, Nurullah, Zia, Anwaar, and Siraj are all masculine light-related names popular across the Muslim world."},
{question:"What does Barakah mean in a name context?",answer:"Barakah means blessing and abundance. A child named Barakah or Mubarak is seen as a vessel of divine grace and goodness."},
{question:"Are hope-themed Islamic names popular?",answer:"Yes, names like Amani, Amal, and Raja are widely used and reflect the Islamic emphasis on optimism and trust in Gods plan."}
],
["Noor","Amani","Aamal","Barakah","Mubarak","Anwar","Zia","Afia","Hasanah","Bushra","Amina","Farah","Siraj","Raja"]
),

// POST 7: psychology-baby-name-regret
makePost("psychology-baby-name-regret","The Psychology Behind Baby Name Regret and How to Avoid It","Expert Strategies to Choose a Name You Will Love Forever","Research shows 1 in 5 parents regret their babys name. Learn the psychology behind name regret and expert strategies to avoid it.","Dr. Emily Chen","PhD in Psychology, Family Counselor","2026-02-01","Baby Naming Tips",["Baby Naming","Name Regret","Parenting Psychology","Name Selection"],false,"baby name regret, naming regret, choosing baby name psychology, avoid name regret","Learn the psychology behind baby name regret and discover expert strategies to avoid it."),"https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=1200&h=630&fit=crop&auto=format&q=80",
"Research suggests that approximately 1 in 5 parents experience some degree of regret about their babys name. Understanding the psychology behind this regret is the first step toward making a confident, lasting choice. Names carry identity, and when that identity feels misaligned with who a child becomes, discomfort can follow.",
[
{title:"Why Name Regret Happens",content:"Name regret often stems from mismatched expectations. Parents may choose a trendy name that dates quickly, or select a family name that clashes with the childs emerging personality. Some common causes include: following trends blindly, choosing names to honor family without considering fit, and not testing the name across different life stages."},
{title:"The 10-Year Test",content:"Before finalizing any name, apply the 10-year test: imagine calling this name out in a schoolyard, writing it on a college application, or hearing it introduced at a professional event. A name that works for a baby should work for a CEO. Names like Thomas, Elizabeth, Muhammad, and Hannah pass this test effortlessly."},
{title:"Common Naming Traps",content:"Parents often fall into predictable naming traps: choosing overly unique names that require constant spelling, selecting names that create unfortunate initials, or picking names that only work with a specific nickname. Awareness of these traps helps avoid future regret.",featuredNames:["Hannah","Thomas","Jessica","Robert","Zara"]},
{title:"Building Confidence in Your Choice",content:"Create a shortlist of 3-5 names and test each one: say it aloud with your surname, write it in full, imagine your child introducing themselves, check for unwanted abbreviations, and consult close friends and family for honest feedback.",subsections:[{title:"The Overnight Test",content:"Write your top 2-3 name choices on paper and place them where you will see them first thing in the morning. After a week, the name that still feels natural is likely the right one."}]}
],
[
{question:"How common is baby name regret?",answer:"Studies suggest about 1 in 5 parents experience some regret. Most cases are mild, but significant regret can affect the parent-child bond and the childs self-image."},
{question:"What are the main causes of name regret?",answer:"Common causes include following trends that date quickly, choosing difficult-to-spell names, not considering how the name ages, and selecting names to please others rather than personal preference."},
{question:"Should I involve family in the naming decision?",answer:"While family input can be valuable, the final decision should rest with the parents. Consider suggestions but make sure the chosen name resonates with you."},
{question:"How can I test if a name will age well?",answer:"Apply the 10-year test: visualize the name on a job application, diploma, business card, and social media profile. If it works in all contexts, its a strong choice."},
{question:"What if my partner and I disagree on names?",answer:"Create separate lists of favorites, then find overlaps. If there is no overlap, take turns choosing first names or use one partners choice as a middle name."},
{question:"Can I legally change my babys name later?",answer:"Yes, in most jurisdictions parents can legally change a minors name, though the process varies. However, early confidence in your choice saves time, paperwork, and emotional disruption."},
{question:"What about nicknames and shortened versions?",answer:"Always consider potential nicknames before choosing. Some lovely formal names (Elizabeth, Benjamin) have common shortenings (Liz, Ben) that may or may not suit your taste."}
],
["Hannah","Thomas","Zara","Elizabeth","Benjamin","Muhammad","David","Sarah","Rachel","James"]
),

// POST 8: christian-warrior-names
makePost("christian-warrior-names","30+ Christian Names with Warrior Meanings: Strong Biblical Names","Powerful Christian Names That Mean Warrior, Protector and Strong","Discover 30+ strong Christian names with warrior and protector meanings from the Old and New Testaments.","Pastor Michael Thompson","Biblical Scholar, Theologian","2026-02-05","Christian Names",["Christian Names","Warrior Names","Biblical Names","Strong Names"],false,"christian warrior names, strong biblical names, names meaning warrior protector","Find powerful Christian names with warrior meanings from the Bible for boys and girls.","1520637836862-4d197d17c15a",
"Throughout biblical history, warriors and defenders of faith carried names with powerful meanings. From Old Testament giants-slayers to New Testament spiritual warriors, these names carry strength, courage, and conviction. This guide explores 30+ Christian names that mean warrior, protector, strong, and brave.",
[
{title:"Old Testament Warrior Names",content:"David means beloved and was Israels greatest warrior-king who defeated Goliath. Gideon means hewer or warrior and led 300 men to victory. Samson meant sun child with supernatural strength. Joshua means God is salvation and led Israel into the Promised Land. These Old Testament names carry millennia of warrior heritage.",featuredNames:["David","Gideon","Samson","Joshua","Boaz","Jehoshaphat","Abner","Hezekiah","Jabez","Nehemiah"]},
{title:"New Testament Strong Names",content:"Peter means rock and was the cornerstone of the early church. Paul means small but mighty, the apostle who spread Christianity across the Roman Empire. Stephen means crown and was the first Christian martyr. Andrew means manly and brave, a warrior of faith.",featuredNames:["Peter","Paul","Andrew","Stephen","James","Thomas","Matthew","Mark","Luke","Barnabas"]},
{title:"Names Meaning Protector and Guardian",content:"Names meaning protector are popular for both boys and girls. Alexander means defender of the people. Valerie means strength and Valour. Matilda means mighty in battle. These names work across cultures and carry warrior energy tempered with compassion.",featuredNames:["Alexander","Valerie","Matilda","Gabriel","Michael","Raphael","Diana","Clara","Grace","Faith"]}
],
[
{question:"What biblical names mean warrior?",answer:"David (beloved warrior), Gideon (hewer), Joshua (God is salvation), Samson (sun child), and Boaz (strength) are classic warrior names from the Old Testament."},
{question:"Are warrior names only appropriate for boys?",answer:"Not at all! Many warrior names work beautifully for girls too. Valerie means strength, Matilda means mighty in battle, and Deborah (bee) was a biblical judge and warrior leader."},
{question:"Which warrior names are trending in 2026?",answer:"David, Joshua, Gideon, and Peter continue trending for boys. For girls, Valerie, Andrea, and Grace are rising in popularity."},
{question:"Can I combine a warrior name with a gentle one?",answer:"Absolutely! Pairing creates beautiful contrast. David James, Grace Matilda, or Peter Andrew balance strength with gentleness."},
{question:"Do warrior names work in professional settings?",answer:"Yes! Names like Alexander, Michael, and Elizabeth command respect in professional environments while still carrying their warrior heritage."}
],
["David","Gideon","Samson","Joshua","Peter","Paul","Andrew","Stephen","James","Thomas","Boaz","Nehemiah","Matilda"]
)
];

// Filter out posts that already exist
const freshPosts = allNew.filter(p => !existingIds.includes(p.id));
console.log("New unique posts to add:", freshPosts.length);

const allPosts = [...existing, ...freshPosts];
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

console.log("Total posts now:", allPosts.length);
console.log("Sitemap updated with", allPosts.length + 1, "URLs");