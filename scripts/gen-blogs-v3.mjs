import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const blogPath = join(__dirname, '../public/data/blog-posts.json');
const sitemapPath = join(__dirname, '../public/blog_sitemap.xml');
const existing = JSON.parse(readFileSync(blogPath, 'utf8'));
const existingIds = existing.map(p => p.id);

const img = (id) => `https://images.unsplash.com/photo-${id}?w=1200&h=630&fit=crop&auto=format&q=80`;

function P(id, title, subtitle, excerpt, author, creds, date, cat, tags, featured, seoKw, metaDesc, imgId, intro, sections, faqs, relNames) {
  return { id, title: `NameVerse — ${title}`, subtitle, excerpt, author, authorCredentials: creds, publishDate: date, lastUpdated: "2026-04-01", readTime: "15 min read", category: cat, tags, featured, seoKeywords: seoKw, metaDescription: metaDesc, featuredImage: img(imgId), content: { introduction: intro, sections, faqs, relatedNames: relNames } };
}

const allNew = [
P("holy-quran-names-meanings","60+ Holy Quran Names with Deep Meanings for Boys and Girls 2026","Discover Beautiful Quranic Names with Spiritual Significance","Explore 60+ Quranic names for boys and girls with meanings directly from the Holy Quran.","Dr. Fatima Al-Zahra","PhD in Islamic Studies","2026-02-05","Islamic Names",["Quran Names","Islamic Names","Quranic Names"],false,"quran names, holy quran names, quranic names with meanings","Discover 60+ Quranic names with meanings from the Holy Quran.","1578662996442-48f60103fc96",
"The Holy Quran is the ultimate source of guidance for over 1.8 billion Muslims. Within its verses lie beautiful names carrying divine weight. Quranic names represent the highest aspirations of faith, embodying mercy, wisdom, strength, and devotion.",
[
{title:"Quranic Names for Boys",content:"Muhammad meaning the praised one is the worlds most popular name. Ibrahim father of nations represents unwavering faith. Yusuf God will add symbolizes patience and divine reward. Musa drawn from water honors the great prophet of Law. Harun mountain of strength represents leadership.",featuredNames:["Muhammad","Ibrahim","Yusuf","Musa","Ismail","Nuh","Dawud","Sulaiman","Harun","Isa"]},
{title:"Quranic Names for Girls",content:"Maryam the mother of Isa is arguably the most honored Quranic name. Fatima one who abstains represents purity. Aisha meaning living was the Prophets beloved wife. Khadija was the first believer and successful businesswoman.",featuredNames:["Maryam","Fatima","Aisha","Khadija","Zainab","Ruqayyah","Amina","Sarah","Hajar","Asiya"]},
{title:"Choosing a Quranic Name",content:"Research the verse where the name appears to understand its full significance. Consider pronunciation with your surname. Consulting scholars provides deeper insights into spiritual implications.",subsections:[{title:"Pronunciation Guide",content:"Listen to Quran reciters for proper Arabic pronunciation. Many online resources provide audio to help parents."}]}
],
[
{question:"What makes a name a Quranic name?",answer:"A Quranic name appears in the Holy Quran as a prophets name or descriptive term. These names carry spiritual weight and are considered blessed."},
{question:"Are Quranic names only for Muslim children?",answer:"While they hold special significance for Muslims, anyone can choose a Quranic name. Many have beautiful meanings transcending religious boundaries."},
{question:"What are the most popular Quranic names in 2026?",answer:"Muhammad, Fatima, Aisha, Maryam, Ibrahim, Yusuf, Khadija, and Musa top charts globally due to their profound meanings."},
{question:"How do I ensure correct pronunciation?",answer:"Listen to Quran reciters, use online audio resources, or ask an imam for guidance on Arabic pronunciation."}
],
["Muhammad","Ibrahim","Yusuf","Maryam","Fatima","Aisha","Khadija","Musa","Ismail","Amina","Zainab","Sarah"]
),

P("baby-name-shape-personality","The Hidden Power of Your Baby Name","How Names Shape Personality Development","Research shows names can influence personality, career choices, and perception. Learn the psychology behind naming.","Dr. Sarah Mitchell","PhD in Psychology, Name Researcher","2026-01-15","Name Meanings",["Name Psychology","Baby Names","Personality"],false,"baby name personality, name psychology, names shape personality","Research shows how names influence personality development and self-image."),"https://images.unsplash.com/photo-1518152006812-edab29b069ac?w=1200&h=630&fit=crop&auto=format&q=80",
"Research reveals that approximately 1 in 5 parents experience name regret. The name-letter effect, implicit egotism, and social perception all play roles. Understanding these forces helps parents make confident, lasting choices that serve their children from playground to boardroom.",
[
{title:"The Science of Name Psychology",content:"Jean Twenges research shows names influence self-perception and how others treat us. The name-letter effect means people gravitate toward things sharing their initials. A child named Adam may unconsciously favor 'A' things."},
{title:"Names and Career Paths",content:"Research in the Journal of Personality and Social Psychology found people named Dennis were disproportionately likely to become dentists. These patterns suggest names create subtle psychological nudges shaping identity."},
{title:"Choosing an Empowering Name",content:"Consider psychological impact alongside sound and meaning. Names easy to pronounce with positive associations benefit children socially. Featured names carry meanings of strength, wisdom, and grace.",featuredNames:["Abraham","Sarah","Muhammad","David","Rachel"]},
{title:"Building Confidence in Your Choice",content:"Apply the 10-year test: visualize the name on a diploma, business card, and social media. Test with your surname and consider potential nicknames.",subsections:[{title:"The Overnight Test",content:"Write your top 3 names on paper. After a week, the one that still feels natural is likely the right choice."}]}
],
[
{question:"Can a name really affect personality?",answer:"Research suggests names subtly influence self-image and others perceptions through psychological associations."},
{question:"What is the name-letter effect?",answer:"People unconsciously prefer things associated with their own name initials, documented by Jozef Nuttin in 1985."},
{question:"Should I choose a name based on psychology?",answer:"Its one factor alongside cultural significance and family traditions."},
{question:"Do unusual names cause problems?",answer:"Very unusual names may lead to constant corrections. The sweet spot is distinctive but accessible."},
{question:"How do names affect first impressions?",answer:"People form snap judgments based on names. Easy-to-pronounce names are rated more favorably."}
],
["Abraham","Sarah","Muhammad","David","Rachel","Hannah","Jacob","Anna","Joseph","Elizabeth"]
),

P("reasons-biblical-names-2026","5 Powerful Reasons Why Parents Choose Biblical Names in 2026","Timeless Faith Meets Modern Style as Biblical Names Surge","Discover why David, Sarah, Abraham, Esther, and John are dominating baby name charts in 2026.","Pastor Michael Thompson","Master of Divinity, Biblical Scholar","2026-01-18","Christian Names",["Biblical Names","Christian Names","Baby Names 2026"],true,"biblical names trending, christian baby names 2026, reasons to choose biblical names","Five powerful reasons biblical names are surging in popularity among modern parents.","1544197150-b99a580bb7a8",
"Biblical names are experiencing a massive 2026 revival. From Old Testament patriarchs to New Testament disciples, these names carry thousands of years of meaning. Here are five powerful reasons driving this trend—timeless strength, celebrity influence, cultural heritage, cross-cultural appeal, and spiritual connection.",
[
{title:"1. Timeless Strength and Meaning",content:"Biblical names carry millennia of meaning. Sarah means princess, David means beloved, Abraham means father of many. These are not just sounds but stories of courage, faith, and resilience parents want to pass on.",featuredNames:["Abraham","Sarah","David","Rachel","Rebecca"]},
{title:"2. Celebrity and Pop Culture Influence",content:"When celebrities choose biblical names, the effect is dramatic. The name Ruth surged after a popular TV series, while Esther gained traction through social media. Hollywood actors and athletes increasingly choose biblical names.",featuredNames:["Esther","Ruth","Elizabeth","Job","Adam"],subsections:[{title:"Social Media Amplification",content:"Platforms like Instagram and TikTok accelerate biblical name trends. An influencer sharing a babys name can reach millions within hours."}]},
{title:"3. Cultural Heritage and Identity",content:"For many families, biblical names honor religious and cultural heritage. Whether Jewish, Christian, or appreciative of Bible narrative, these names create tangible connection to ancient traditions.",featuredNames:["Elijah","Hannah","Samuel","Mary","John"]},
{title:"4. Cross-Cultural and Global Appeal",content:"Biblical names work across cultures and languages. David, Mary, Joseph, and Sarah are recognized and pronounced similarly worldwide, making them ideal for multicultural families.",featuredNames:["Daniel","Matthew","Thomas","James","Peter"]}
],
[
{question:"Are biblical names only for religious families?",answer:"Not at all! Many secular families choose biblical names for their beautiful sounds and rich history. David, Sarah, and Rachel have universal appeal."},
{question:"What are the top biblical names for 2026?",answer:"For boys: Noah, Liam, James, Benjamin, Abraham. For girls: Sophia, Olivia, Hannah, Sarah, Elizabeth consistently rank highest globally."},
{question:"Can I combine a biblical name with a modern one?",answer:"Absolutely! Pairing biblical with modern creates unique combinations like David James or Sarah Grace."},
{question:"Do biblical names work in professional settings?",answer:"Yes! Names like Elizabeth, Thomas, and James command respect in professional environments while carrying spiritual heritage."}
],
["Abraham","David","Sarah","Rebecca","Rachel","Naomi","Esther","Ruth","Elizabeth","John","Matthew","Hannah","Anna","Peter","Paul"]
),

P("islamic-names-light-hope","50+ Beautiful Islamic Names That Mean Light, Hope and Blessings","Illuminate Your Childs Life with Names of Light and Divine Blessings","Discover 50+ stunning Islamic names carrying meanings of light (noor), hope (amal), and divine blessings.","Dr. Fatima Al-Zahra","PhD in Islamic Studies","2026-01-20","Islamic Names",["Islamic Names","Meaningful Names","Light Names"],false,"islamic names meaning light, names meaning hope, islamic names blessings","Discover beautiful Islamic names meaning light, hope, and blessings.","1544568100-847a948585b9",
"Light, hope, and blessings are central themes in Islamic spirituality. The Quran is described as 'a light upon light.' Choosing a name reflecting these themes is a beautiful prayer for your childs future.",
[
{title:"Names Meaning Light (Noor)",content:"Noor is one of the most popular Islamic names meaning light. Variations include Munira, Nura, and Siraj. For boys, Nurullah means light of Allah, and Anwar means radiant.",featuredNames:["Noor","Munira","Nura","Siraj","Nurullah","Anwar","Zia","Diyaa"]},
{title:"Names Meaning Hope (Amani)",content:"Hope is a powerful Islamic concept. Amani means wishes, Amal means hope, and Raja means hope in Arabic. These names carry optimism and faith.",featuredNames:["Amani","Aamal","Raja","Amal","Nadeen","Midraj","Tama"]},
{title:"Names Meaning Blessings",content:"Barakah is central to Islamic life. Names like Mubarak (blessed), Barkat (blessing), and Afiyah (well-being) reflect divine favor.",featuredNames:["Barakah","Mubarak","Barkat","Afia","Tayyib","Hasanah","Bushra","Fadilah"]}
],
[
{question:"Why do light-themed Islamic names hold significance?",answer:"Light symbolizes divine guidance in Islam. The Qurans Light Verse (24:35) is among its most celebrated. Choosing a name meaning light is a prayer for divine guidance."},
{question:"Can boys have light-themed names?",answer:"Absolutely! Anwar, Nurullah, Zia, and Siraj are all masculine light-related names popular across the Muslim world."},
{question:"What does Barakah mean?",answer:"Barakah means blessing and abundance. A child named Barakah or Mubarak is seen as a vessel of divine grace."},
{question:"Are hope-themed Islamic names popular?",answer:"Yes, names like Amani, Amal, and Raja are widely used and reflect the Islamic emphasis on optimism and trust in Gods plan."},
{question:"Do these names work in Western countries?",answer:"Many of these names like Noor, Amal, and Baraka are gaining popularity in Western countries due to their beautiful simplicity."}
],
["Noor","Amani","Aamal","Barakah","Mubarak","Anwar","Zia","Afia","Hasanah","Bushra","Amina","Farah","Siraj"]
),

P("psychology-baby-name-regret","The Psychology Behind Baby Name Regret and How to Avoid It","Expert Strategies to Choose a Name You Will Never Regret","Research shows 1 in 5 parents regret their babys name. Learn expert strategies to avoid naming regret.","Dr. Emily Chen","PhD in Psychology, Family Counselor","2026-02-01","Baby Naming Tips",["Baby Naming","Name Regret","Parenting Psychology"],false,"baby name regret, naming regret, avoid baby name regret, baby name psychology","Learn the psychology behind baby name regret and expert strategies to avoid it."),"https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=1200&h=630&fit=crop&auto=format&q=80",
"Research suggests 1 in 5 parents experience some degree of name regret. Understanding the psychology behind this regret is the first step toward making a confident, lasting choice. Names carry identity, and when that identity feels misaligned, discomfort can follow.",
[
{title:"Why Name Regret Happens",content:"Name regret often stems from mismatched expectations. Parents may choose trendy names that date quickly, or select family names that clash with the childs emerging personality. Common causes include following trends blindly and not testing names across life stages."},
{title:"The 10-Year Test",content:"Before finalizing any name, imagine calling it in a schoolyard, writing it on a college application, or hearing it at a professional event. Names like Thomas, Elizabeth, Muhammad, and Hannah pass this test effortlessly because they work across all life stages."},
{title:"Common Naming Traps",content:"Parents often fall into predictable traps: choosing overly unique names requiring constant spelling, creating unfortunate initials, or picking names that only work with specific nicknames. Awareness helps avoid future regret.",featuredNames:["Hannah","Thomas","Zara","Elizabeth","Benjamin"]},
{title:"Building Confidence in Your Choice",content:"Create a shortlist of 3-5 names and test each: say it aloud with your surname, write it in full, imagine your child introducing themselves, and check for unwanted nicknames.",subsections:[{title:"The Overnight Test",content:"Write your top 3 names on paper. Place them where you will see them first thing in the morning. After a week, the name that still feels natural is likely right."}]}
],
[
{question:"How common is baby name regret?",answer:"About 1 in 5 parents experience some regret. Most cases are mild, but significant regret can affect the parent-child bond."},
{question:"What causes name regret?",answer:"Common causes include following trends that date quickly, choosing difficult-to-spell names, not considering how names age, and selecting to please others."},
{question:"How can I test if a name will age well?",answer:"Apply the 10-year test: visualize the name on a job application, diploma, and social media profile. If it works in all contexts, its a strong choice."},
{question:"What if my partner and I disagree on names?",answer:"Create separate lists, then find overlaps. If no overlap exists, take turns choosing first names or use one choice as a middle name."},
{question:"Can I legally change my babys name?",answer:"Yes, in most jurisdictions parents can legally change a minors name, though the process varies by location."},
{question:"What about nicknames?",answer:"Always consider potential nicknames. Some formal names like Elizabeth and Benjamin have common shortenings that may not suit your taste."}
],
["Hannah","Thomas","Zara","Elizabeth","Benjamin","Muhammad","David","Sarah","Rachel","James"]
),

P("christian-warrior-names","30+ Christian Names with Warrior Meanings","Strong Biblical Names for Boys and Girls","Discover 30+ powerful Christian names meaning warrior, protector, and strong from the Bible.","Pastor Michael Thompson","Biblical Scholar, Theologian","2026-02-05","Christian Names",["Christian Names","Warrior Names","Biblical Names"],false,"christian warrior names, strong biblical names, names meaning warrior protector","Discover powerful Christian names with warrior meanings from the Old and New Testaments.","1520637836862-4d197d17c15a",
"Throughout biblical history, warriors and defenders of faith carried names with powerful meanings. From Old Testament giant-slayers to New Testament spiritual warriors, these names carry strength, courage, and conviction.",
[
{title:"Old Testament Warrior Names",content:"David means beloved and was Israels greatest warrior-king who defeated Goliath. Gideon means hewer and led 300 men to victory. Samson meant sun child with supernatural strength. Joshua means God is salvation and led Israel into the Promised Land.",featuredNames:["David","Gideon","Samson","Joshua","Boaz","Jehoshaphat","Abner","Hezekiah","Jabez","Nehemiah"]},
{title:"New Testament Strong Names",content:"Peter means rock and was the cornerstone of the early church. Paul means small but mighty. Stephen means crown and was the first martyr. Andrew means manly and brave.",featuredNames:["Peter","Paul","Andrew","Stephen","James","Thomas","Matthew","Mark","Luke","Barnabas"]},
{title:"Names Meaning Protector",content:"Names meaning protector work for both genders. Alexander means defender of people. Valerie means strength. Gabriel means God is my strength. Michael means who is like God.",featuredNames:["Alexander","Valerie","Gabriel","Michael","Raphael","Diana","Clara","Grace","Faith","Matilda"]}
],
[
{question:"What biblical names mean warrior?",answer:"David (beloved warrior-king), Gideon (hewer), Joshua (God is salvation), Samson (sun child with supernatural strength), and Boaz (strength)."},
{question:"Are warrior names only for boys?",answer:"Not at all! Valerie means strength, Matilda means mighty in battle, and Deborah was a biblical judge and warrior leader."},
{question:"Which warrior names are trending?",answer:"David, Joshua, Gideon, and Peter trend for boys. For girls, Valerie, Andrea, and Grace are rising."},
{question:"Can I combine warrior and gentle names?",answer:"Yes! Pairing creates contrast. David James, Grace Matilda, or Peter Andrew balance strength with gentleness."},
{question:"Do warrior names work professionally?",answer:"Yes! Alexander, Michael, and Elizabeth command respect in professional environments."}
],
["David","Gideon","Samson","Joshua","Peter","Paul","Andrew","Stephen","James","Thomas","Boaz","Nehemiah","Matilda"]
),

P("hindu-moon-stars","Hindu Names Connected to Moon and Stars: 40+ Celestial Sanskrit Names","Celestial Hindu Names That Shine Like the Moon and Stars","Discover 40+ beautiful Hindu names inspired by the moon, stars, and celestial bodies from ancient Sanskrit tradition.","Dr. Priya Sharma","PhD in Sanskrit Literature","2026-02-10","Hindu Names",["Hindu Names","Sanskrit Names","Celestial Names"],false,"hindu moon star names, sanskrit celestial names, indian cosmic baby names","Discover celestial Hindu names connected to the moon, stars, and cosmic bodies."),"https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=1200&h=630&fit=crop&auto=format&q=80",
"In Hindu tradition, the moon (Chandra), stars (Tara), and celestial bodies hold divine significance. Many deities are associated with cosmic elements, and naming a child after these celestial forces is believed to bestow cosmic blessings and spiritual illumination.",
[
{title:"Names Meaning Moon",content:"Chandra is the Sanskrit word for moon and is a powerful Hindu name. Chandni means moonlight. Indu is another poetic name for the moon. Som means the moon in Vedic texts. These names evoke the moons gentle, luminous beauty.",featuredNames:["Chandra","Chandni","Indu","Som","Chandana","Soma","Hemang","Chandrakala"]},
{title:"Names Meaning Star",content:"Tara means star in Sanskrit and is associated with the goddess Tara. Nakshatra means constellation. Dhruva is the Pole Star, symbolizing steadfastness. Mrigasira is the Sanskrit name for the star Aldebaran.",featuredNames:["Tara","Nakshatra","Dhruva","Mrigasira","Rohini","Revati","Ashwini","Ardra"]},
{title:"Names from Hindu Celestial Beings",content:"Celestial beings in Hindu mythology inspire many names. Urvashi is the celestial nymph. Menaka is another heavenly apsara. Surya is the sun god. Savitri is the sun goddess. Agni is the fire god.",featuredNames:["Urvashi","Menaka","Surya","Savitri","Agni","Vayu","Varun","Yama"]},
{title:"Lunar Calendar and Naming",content:"In Hindu tradition, the lunar calendar (Panchang) plays a significant role in naming. Babies born on specific lunar days may be named after that days ruling deity or nakshatra. Consulting a pandit for auspicious timing is common practice.",subsections:[{title:"Nakshatra-Based Names",content:"Each of the 27 nakshatras has a ruling deity and specific qualities. Names are often chosen to align with the childs birth nakshatra for maximum auspiciousness."}]}
],
[
{question:"What are popular moon-themed Hindu names?",answer:"Chandra, Chandni, Indu, and Som are the most popular moon-related Hindu names."},
{question:"What Hindu names mean star?",answer:"Tara, Nakshatra, Dhruva, Rohini, and Revati all mean star or are connected to stars."},
{question:"Are celestial Hindu names suitable for non-Hindu families?",answer:"Absolutely. Sanskrit names have universal appeal and beautiful sounds appreciated across cultures."},
{question:"What is the significance of nakshatra in naming?",answer:"Nakshatras are lunar mansions in Vedic astrology. Babies are often named according to their birth nakshatra for auspiciousness."},
{question:"Can these names be used for both boys and girls?",answer:"Many celestial names like Tara, Chandra, and Revati work beautifully for both genders, while some like Surya are more masculine."}
],
["Chandra","Chandni","Tara","Nakshatra","Dhruva","Urvashi","Surya","Savitri","Rohini","Revati","Som","Indu"]
)
];

let fresh = allNew.filter(p => !existingIds.includes(p.id));
console.log("New unique posts to add:", fresh.length);
const allPosts = [...existing, ...fresh];
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
console.log("New posts added:", fresh.length);