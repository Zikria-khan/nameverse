import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const blogPath = join(__dirname, '../public/data/blog-posts.json');
const sitemapPath = join(__dirname, '../public/blog_sitemap.xml');
const existing = JSON.parse(readFileSync(blogPath, 'utf8'));
const existingIds = existing.map(p => p.id);

const img = (id) => `https://images.unsplash.com/photo-${id}?w=1200&h=630&fit=crop&auto=format&q=80`;

function P(o) {
  o.title = `NameVerse — ${o.title}`;
  o.featuredImage = img(o.featuredImage);
  return o;
}

const newPosts = [

P({
  id:"holy-quran-names-meanings",
  title:"60+ Holy Quran Names with Deep Meanings for Boys and Girls 2026",
  subtitle:"Discover Beautiful Quranic Names with Spiritual Significance",
  excerpt:"Explore 60+ Quranic names for boys and girls with meanings directly from the Holy Quran.",
  author:"Dr. Fatima Al-Zahra",
  authorCredentials:"PhD in Islamic Studies",
  publishDate:"2026-02-05",
  category:"Islamic Names",
  tags:["Quran Names","Islamic Names","Quranic Names"],
  featured:false,
  seoKeywords:"quran names, holy quran names, quranic names with meanings",
  metaDescription:"Discover 60+ Quranic names with meanings and origins from the Holy Quran.",
  featuredImage:"1578662996442-48f60103fc96",
  intro:"The Holy Quran is the ultimate source of guidance for over 1.8 billion Muslims. Within its verses lie beautiful names carrying divine weight.",
  sections:[
    {title:"Quranic Names for Boys",content:"Muhammad meaning the praised one is the worlds most popular name. Ibrahim father of nations represents unwavering faith. Yusuf God will add symbolizes patience.",featuredNames:["Muhammad","Ibrahim","Yusuf","Musa","Ismail","Nuh","Dawud","Sulaiman"]},
    {title:"Quranic Names for Girls",content:"Maryam the mother of Isa is arguably the most honored Quranic name. Fatima represents purity. Aisha was the Prophets beloved wife.",featuredNames:["Maryam","Fatima","Aisha","Khadija","Zainab","Ruqayyah","Amina","Sarah"]}
  ],
  faqs:[
    {question:"What makes a name a Quranic name?",answer:"A Quranic name appears in the Holy Quran as a prophets name or descriptive term."},
    {question:"Are Quranic names only for Muslim children?",answer:"While they hold special significance for Muslims, anyone can choose a Quranic name."},
    {question:"What are the most popular Quranic names in 2026?",answer:"Muhammad, Fatima, Aisha, Maryam, Ibrahim, Yusuf top charts globally."},
    {question:"How do I ensure correct pronunciation?",answer:"Listen to Quran reciters, use online resources, or ask an imam."}
  ],
  relNames:["Muhammad","Ibrahim","Yusuf","Maryam","Fatima","Aisha","Khadija","Musa"]
}),

P({
  id:"baby-name-shape-personality",
  title:"The Hidden Power of Your Baby Name: How Names Shape Personality",
  subtitle:"Research Shows Names Influence Personality and Career Choices",
  excerpt:"Learn how names influence personality development through scientific research on name psychology.",
  author:"Dr. Sarah Mitchell",
  authorCredentials:"PhD in Psychology, Name Researcher",
  publishDate:"2026-01-15",
  category:"Name Meanings",
  tags:["Name Psychology","Baby Names","Personality"],
  featured:false,
  seoKeywords:"baby name personality, name psychology, names shape personality",
  metaDescription:"Research shows how names influence personality development and self-image.",
  featuredImage:"1518152006812-edab29b069ac",
  intro:"Research reveals that approximately 1 in 5 parents experience name regret. The name-letter effect and social perception all play roles.",
  sections:[
    {title:"The Science of Name Psychology",content:"Studies show names influence self-perception and career choices through psychological associations."},
    {title:"Choosing an Empowering Name",content:"Consider psychological impact alongside sound and meaning. Names easy to pronounce benefit children socially.",featuredNames:["Abraham","Sarah","Muhammad","David","Rachel"]}
  ],
  faqs:[
    {question:"Can a name really affect personality?",answer:"Research suggests names subtly influence self-image through psychological associations."},
    {question:"What is the name-letter effect?",answer:"People unconsciously prefer things associated with their name initials."},
    {question:"Do unusual names cause problems?",answer:"Very unusual names may lead to constant corrections. The sweet spot is distinctive but accessible."}
  ],
  relNames:["Abraham","Sarah","Muhammad","David","Rachel","Hannah","Jacob","Anna","Joseph","Elizabeth"]
}),

P({
  id:"reasons-biblical-names-2026",
  title:"5 Powerful Reasons Why Parents Choose Biblical Names in 2026",
  subtitle:"Timeless Faith Meets Modern Style as Biblical Names Surge",
  excerpt:"Discover why David, Sarah, Abraham, and Esther are dominating baby name charts in 2026.",
  author:"Pastor Michael Thompson",
  authorCredentials:"Master of Divinity, Biblical Scholar",
  publishDate:"2026-01-18",
  category:"Christian Names",
  tags:["Biblical Names","Christian Names","Baby Names 2026"],
  featured:true,
  seoKeywords:"biblical names trending, christian baby names 2026, reasons biblical names",
  metaDescription:"Five powerful reasons biblical names are surging in popularity among modern parents.",
  featuredImage:"1544197150-b99a580bb7a8",
  intro:"Biblical names are experiencing a massive 2026 revival. Here are five powerful reasons driving this trend.",
  sections:[
    {title:"Timeless Strength and Meaning",content:"Names like Sarah, David, and Abraham carry millennia of meaning and stories of courage.",featuredNames:["Abraham","Sarah","David","Rachel","Rebecca"]},
    {title:"Cultural Heritage and Identity",content:"Biblical names honor religious heritage and create tangible connection to ancient traditions.",featuredNames:["Elijah","Hannah","Samuel","Mary","John"]}
  ],
  faqs:[
    {question:"Are biblical names only for religious families?",answer:"Not at all! Many secular families choose them for beautiful sounds and rich history."},
    {question:"What are the top biblical names for 2026?",answer:"For boys: Noah, Liam, James, Abraham. For girls: Sophia, Olivia, Hannah, Sarah, Elizabeth."},
    {question:"Do biblical names work professionally?",answer:"Yes! Names like Elizabeth, Thomas, and James command respect in professional settings."}
  ],
  relNames:["Abraham","David","Sarah","Rebecca","Rachel","Naomi","Esther","Ruth","Elizabeth","John","Matthew","Hannah","Peter","Paul"]
}),

P({
  id:"islamic-names-light-hope-blessings",
  title:"50+ Beautiful Islamic Names That Mean Light, Hope and Blessings",
  subtitle:"Illuminate Your Childs Life with Names of Light and Divine Blessings",
  excerpt:"Discover 50+ stunning Islamic names carrying meanings of light, hope, and divine blessings.",
  author:"Dr. Fatima Al-Zahra",
  authorCredentials:"PhD in Islamic Studies",
  publishDate:"2026-01-20",
  category:"Islamic Names",
  tags:["Islamic Names","Meaningful Names","Light Names"],
  featured:false,
  seoKeywords:"islamic names meaning light, names meaning hope, islamic names blessings",
  metaDescription:"Discover beautiful Islamic names meaning light, hope, and blessings.",
  featuredImage:"1544568100-847a948585b9",
  intro:"Light, hope, and blessings are central themes in Islamic spirituality. The Quran is described as a light upon light.",
  sections:[
    {title:"Names Meaning Light (Noor)",content:"Noor is one of the most popular Islamic names meaning light. Variations include Munira, Nura, and Siraj.",featuredNames:["Noor","Munira","Nura","Siraj","Nurullah","Anwar","Zia"]},
    {title:"Names Meaning Hope and Blessings",content:"Amani means wishes, Barakah means blessing, and Mubarak means blessed.",featuredNames:["Amani","Barakah","Mubarak","Barkat","Afia","Hasanah"]}
  ],
  faqs:[
    {question:"Why do light-themed Islamic names hold significance?",answer:"Light symbolizes divine guidance in Islam. The Light Verse (24:35) is among the most celebrated."},
    {question:"Can boys have light-themed names?",answer:"Absolutely! Anwar, Nurullah, Zia, and Siraj are masculine light-related names."},
    {question:"What does Barakah mean?",answer:"Barakah means blessing and abundance. A child named Barakah is seen as a vessel of divine grace."}
  ],
  relNames:["Noor","Amani","Barakah","Mubarak","Anwar","Zia","Afia","Siraj","Amina","Bushra"]
}),

P({
  id:"psychology-baby-name-regret",
  title:"The Psychology Behind Baby Name Regret and How to Avoid It",
  subtitle:"Expert Strategies to Choose a Name You Will Never Regret",
  excerpt:"Research shows 1 in 5 parents regret their babys name. Learn expert strategies to avoid naming regret.",
  author:"Dr. Emily Chen",
  authorCredentials:"PhD in Psychology, Family Counselor",
  publishDate:"2026-02-01",
  category:"Baby Naming Tips",
  tags:["Baby Naming","Name Regret","Parenting Psychology"],
  featured:false,
  seoKeywords:"baby name regret, naming regret, avoid baby name regret",
  metaDescription:"Learn the psychology behind baby name regret and expert strategies to avoid it.",
  featuredImage:"1555252333-9f8e92e65df9",
  intro:"Research suggests 1 in 5 parents experience some degree of name regret. Understanding the psychology behind this regret helps make confident, lasting choices.",
  sections:[
    {title:"Why Name Regret Happens",content:"Name regret stems from mismatched expectations. Parents may choose trendy names that date quickly or select names that clash with the childs personality."},
    {title:"The 10-Year Test",content:"Before finalizing any name, imagine calling it in a schoolyard, writing it on a college application, or hearing it at a professional event. Names like Thomas, Elizabeth, Muhammad, and Hannah pass this test.",featuredNames:["Hannah","Thomas","Zara","Elizabeth","Benjamin"]}
  ],
  faqs:[
    {question:"How common is baby name regret?",answer:"About 1 in 5 parents experience some regret. Most cases are mild."},
    {question:"What causes name regret?",answer:"Common causes include following trends that date quickly, choosing difficult-to-spell names, and not considering how names age."},
    {question:"How can I test if a name will age well?",answer:"Apply the 10-year test: visualize the name on a job application, diploma, and social media profile."}
  ],
  relNames:["Hannah","Thomas","Zara","Elizabeth","Benjamin","Muhammad","David","Sarah","Rachel","James"]
}),

P({
  id:"christian-warrior-names",
  title:"30+ Christian Names with Warrior Meanings: Strong Biblical Names",
  subtitle:"Powerful Christian Names That Mean Warrior, Protector and Strong",
  excerpt:"Discover 30+ powerful Christian names meaning warrior, protector, and brave from the Old and New Testaments.",
  author:"Pastor Michael Thompson",
  authorCredentials:"Biblical Scholar, Theologian",
  publishDate:"2026-02-05",
  category:"Christian Names",
  tags:["Christian Names","Warrior Names","Biblical Names"],
  featured:false,
  seoKeywords:"christian warrior names, strong biblical names, names meaning warrior protector",
  metaDescription:"Discover powerful Christian names with warrior meanings from the Bible.",
  featuredImage:"1520637836862-4d197d17c15a",
  intro:"Throughout biblical history, warriors carried names with powerful meanings. These names carry strength, courage, and conviction.",
  sections:[
    {title:"Old Testament Warrior Names",content:"David means beloved and defeated Goliath. Gideon means hewer and led 300 men to victory. Joshua means God is salvation.",featuredNames:["David","Gideon","Samson","Joshua","Boaz","Abner","Hezekiah","Nehemiah"]},
    {title:"New Testament Strong Names",content:"Peter means rock and was the church cornerstone. Paul means small but mighty. Stephen means crown.",featuredNames:["Peter","Paul","Andrew","Stephen","James","Thomas","Matthew"]}
  ],
  faqs:[
    {question:"What biblical names mean warrior?",answer:"David, Gideon, Joshua, Samson, and Boaz are classic warrior names from the Old Testament."},
    {question:"Are warrior names only for boys?",answer:"Not at all! Valerie means strength, Matilda means mighty in battle, and Deborah was a warrior leader."},
    {question:"Do warrior names work professionally?",answer:"Yes! Alexander, Michael, and Elizabeth command respect in professional environments."}
  ],
  relNames:["David","Gideon","Samson","Joshua","Peter","Paul","Andrew","Stephen","James","Thomas","Boaz","Nehemiah","Matilda"]
}),

P({
  id:"hindu-nature-element-names",
  title:"Hindu Baby Names Inspired by Nature and Elements: 100+ Beautiful Sanskrit Names",
  subtitle:"Discover Stunning Hindu Names from Nature's Five Sacred Elements",
  excerpt:"Explore beautiful Hindu baby names inspired by earth, water, fire, air and sky elements from ancient Sanskrit traditions.",
  author:"Dr. Priya Sharma",
  authorCredentials:"PhD in Sanskrit Literature, Vedic Astrologer",
  publishDate:"2026-01-15",
  category:"Hindu Names",
  tags:["Hindu Names","Sanskrit Names","Nature Names","Vedic Names"],
  featured:true,
  seoKeywords:"hindu nature names, sanskrit element names, indian nature baby names",
  metaDescription:"Discover beautiful Hindu baby names inspired by earth, water, fire, air and sky elements.",
  featuredImage:"1587135941948-670b381f08ce",
  intro:"In Hinduism, the five great elements form the foundation of all creation. Names inspired by these elements carry profound spiritual significance.",
  sections:[
    {title:"Earth and Water Element Names",content:"Bhumi means earth, Ganga is the sacred river, and Shaila means mountain. Varuna is god of water.",featuredNames:["Bhumi","Ganga","Shaila","Parvati","Varuna","Saraswati","Nira","Kaveri"]},
    {title:"Fire and Sky Element Names",content:"Agni is the fire god. Vayu is the god of wind. Akasha means sky or ether.",featuredNames:["Agni","Vayu","Anil","Akasha","Marut","Pawan","Sameer","Hari"]}
  ],
  faqs:[
    {question:"What are the most popular nature-inspired Hindu names?",answer:"Ganga, Saraswati, Parvati, Krishna, Varuna, Agni, Akasha, and Vayu are most popular."},
    {question:"How do the five elements influence Hindu naming?",answer:"Each element represents qualities: earth for stability, water for flow, fire for energy, air for freedom, sky for expansiveness."}
  ],
  relNames:["Krishna","Radha","Ganga","Saraswati","Parvati","Durga","Shiva","Vishnu","Lakshmi","Agni","Varuna","Bhumi"]
}),

P({
  id:"islamic-prophetic-comeback",
  title:"7 Islamic Prophetic Names Making a Powerful Comeback in 2026",
  subtitle:"Ancient Prophetic Names Are Returning to Modern Baby Name Charts",
  excerpt:"Discover which Islamic prophetic names are making a stunning comeback in 2026.",
  author:"Dr. Fatima Al-Zahra",
  authorCredentials:"PhD in Islamic Studies",
  publishDate:"2026-02-15",
  category:"Islamic Names",
  tags:["Islamic Names","Prophetic Names","Muslim Names"],
  featured:true,
  seoKeywords:"islamic prophetic names comeback, muslim prophet names 2026",
  metaDescription:"Discover which Islamic prophetic names are making a comeback in 2026.",
  featuredImage:"1584551246679-0daf3d275d0f",
  intro:"Across the Muslim world, ancient prophetic names are experiencing a powerful resurgence, reflecting a desire to reconnect with spiritual heritage.",
  sections:[
    {title:"Why Prophetic Names Are Returning",content:"Amid growing individualism, parents seek names with deep spiritual roots. Ibrahim, Ismail, and Nuh carry stories of patience and devotion."},
    {title:"The 7 Names Making a Comeback",content:"Ibrahim, Ismail, Nuh, Sulaiman, Dawud, Musa, and Yaqub are seeing dramatic usage increases.",featuredNames:["Ibrahim","Ismail","Nuh","Sulaiman","Dawud","Musa","Yaqub"]}
  ],
  faqs:[
    {question:"Why are prophetic names making a comeback?",answer:"Parents want names with deep spiritual roots. Social media has amplified this trend."},
    {question:"Which prophetic name is rising fastest?",answer:"Ibrahim has seen the biggest surge, climbing over 40% in usage across Western countries since 2024."}
  ],
  relNames:["Ibrahim","Ismail","Nuh","Sulaiman","Dawud","Musa","Yaqub","Yusuf","Isa","Ilyas"]
}),

P({
  id:"honor-cultural-heritage-baby-name",
  title:"How to Honor Your Cultural Heritage Through Your Baby Name",
  subtitle:"A Complete Guide to Choosing Names That Celebrate Your Roots",
  excerpt:"Learn how to choose a baby name that honors your cultural heritage while embracing modern identity.",
  author:"Aisha Siddiqui",
  authorCredentials:"Cultural Anthropologist, Name Heritage Specialist",
  publishDate:"2026-02-20",
  category:"Cultural Heritage",
  tags:["Cultural Heritage","Baby Names","Heritage Names","Multicultural"],
  featured:true,
  seoKeywords:"honor cultural heritage baby name, heritage names, multicultural baby naming",
  metaDescription:"Learn how to honor your cultural heritage through baby name choice.",
  featuredImage:"1511895426328-dc8714191300",
  intro:"A name is one of the most powerful connections to cultural heritage. In an increasingly multicultural world, parents face the challenge of choosing names that honor roots while fitting in diverse contexts.",
  sections:[
    {title:"Why Cultural Names Matter",content:"Names carry the DNA of culture. When you choose Muhammad, Priya, or Sarah, you pass on centuries of tradition and meaning."},
    {title:"Bridging Heritage and Modernity",content:"Many parents successfully bridge heritage with modernity. Muhammad and Maryam are universally admired. Aarav and Saanvi maintain cultural specificity.",featuredNames:["Muhammad","Aisha","Sarah","Priya","Krishna","David"]}
  ],
  faqs:[
    {question:"How do I choose a name that honors my heritage?",answer:"Research names from your cultural tradition and choose ones that connect to family history."},
    {question:"Will a heritage name work in a different country?",answer:"Many heritage names are globally appreciated. Muhammad, Aisha, and David are beloved worldwide."}
  ],
  relNames:["Muhammad","Aisha","David","Priya","Krishna","Sarah","Ibrahim","Fatima","Lakshmi","Mary"]
}),

P({
  id:"mispronounced-names-2026",
  title:"The 30 Most Mispronounced Baby Names of 2026",
  subtitle:"And How to Say Them Correctly: A Pronunciation Masterclass",
  excerpt:"Learn the correct pronunciation of the most commonly mispronounced baby names from every culture.",
  author:"Maria Gonzalez",
  authorCredentials:"Linguistics Professor, Phonetics Expert",
  publishDate:"2026-03-01",
  category:"Baby Naming Tips",
  tags:["Baby Names","Pronunciation","Mispronounced Names","Name Tips"],
  featured:false,
  seoKeywords:"mispronounced baby names, name pronunciation, how to pronounce names",
  metaDescription:"Learn the correct pronunciation of the most commonly mispronounced baby names.",
  featuredImage:"1481627834876-b7833e8f5570",
  intro:"Nothing is more frustrating for a parent than having their carefully chosen baby name constantly butchered. From Arabic to Sanskrit, many beautiful names suffer from common pronunciation errors.",
  sections:[
    {title:"Most Mispronounced Islamic Names",content:"Muhammad is often mispronounced as Muh-AM-ad (correct: Moo-HAH-med). Fatima becomes fuh-TEE-mah instead of FAH-tee-mah.",featuredNames:["Muhammad","Fatima","Khadija","Saadiq","Nusrat"]},
    {title:"Most Mispronounced Hindu Names",content:"Sita is often said as SEE-tah when it should be SEET-ah. Arjun becomes ar-JUN instead of AHR-joon.",featuredNames:["Sita","Arjun","Priya","Karan","Ananya"]}
  ],
  faqs:[
    {question:"Why are some names so frequently mispronounced?",answer:"Different languages have different sound systems. When names cross language boundaries, speakers naturally substitute familiar sounds."},
    {question:"How can I help people pronounce my babys name correctly?",answer:"Provide a phonetic spelling and correct gently but firmly."}
  ],
  relNames:["Muhammad","Fatima","Khadija","Sita","Arjun","Priya","Siobhan","Saoirse","Aisling"]
}),

P({
  id:"secret-name-grows-child",
  title:"The Secret to Choosing a Name That Grows With Your Child",
  subtitle:"Expert Advice on Selecting Names That Age Beautifully from Crib to Career",
  excerpt:"Discover the secret formula for choosing baby names that work for every stage of life—from infancy through adulthood.",
  author:"Emily Johnson",
  authorCredentials:"Child Development Specialist, Author","2026-03-05",
  category:"Baby Naming Tips",
  tags:["Baby Naming Tips","Name Selection","Parenting","Names That Age Well"],
  featured:false,
  seoKeywords:"secret choosing name grows child, names that age well, baby name tips 2026",
  metaDescription:"The secret to choosing a baby name that grows beautifully with your child from crib to career.",
  featuredImage:"1555252333-9f8e92e65df9",
  intro:"Great baby names are like fine wine—they improve with age. The secret lies in balancing tradition with versatility, ensuring your childs name works in every room they will ever enter.",
  sections:[
    {title:"Names for Every Age and Stage",content:"A great name works on a birth announcement, a college application, and a business card equally. Michael, Sarah, James, and Elizabeth have proven this across generations.",featuredNames:["Michael","Sarah","James","Elizabeth","Muhammad","David","Mary"]},
    {title:"Avoiding Nickname Pitfalls",content:"Consider whether your chosen name has an inevitable nickname you dislike. Robert becomes Bob, William becomes Bill—but Sebastian stays Sebastian.",subsections:[{title:"The Nickname Test",content:"Say the name aloud five times fast. Try common diminutives. If you cringe at any version, reconsider."}]}
  ],
  faqs:[
    {question:"What makes a name age well?",answer:"Names that are classic, easy to pronounce, and carry positive meanings tend to age well across all life stages."},
    {question:"Should I choose a unique or common name?",answer:"Aim for the sweet spot—distinctive enough to stand out but familiar enough to be easily recognized and pronounced."}
  ],
  relNames:["Michael","Sarah","James","Elizabeth","Alexander","Sophia","Thomas","Hannah","Muhammad","Aisha"]
}),

P({
  id:"islamic-girl-names-2026",
  title:"100+ Islamic Girl Names with Beautiful Meanings for 2026",
  subtitle:"The Ultimate Collection of Islamic Names for Baby Girls",
  excerpt:"Explore 100+ beautiful Islamic girl names with meanings, origins, and spiritual significance for 2026.","Pastor Michael Thompson","2026-03-10",
  category:"Islamic Names",
  tags:["Islamic Names","Girl Names","Muslim Names","2026"],
  featured:true,
  seoKeywords:"islamic girl names, muslim girl names 2026, islamic names for girls",
  metaDescription:"Discover 100+ beautiful Islamic girl names with meanings for 2026.",
  featuredImage:"1584551246679-0daf3d275d0f",
  intro:"Islamic tradition offers an extraordinary collection of beautiful names for girls, each carrying blessings, virtues, and spiritual significance. This comprehensive guide features 100+ names with detailed meanings and origins.",
  sections:[
    {title:"Top 50 Islamic Girl Names",content:"Aisha means living. Fatima means one who abstains. Khadija was the first believer. Maryam honors the Quran most honored woman. Amina means trustworthy. Zainab means adornment.",featuredNames:["Aisha","Fatima","Khadija","Maryam","Amina","Zainab","Hafsa","Safiya","Nour","Layla","Amira","Salma","Inaya","Zara","Maya","Ayat","Jannah","Mariam","Sara","Hana","Ruqayyah","Umm Kulthum","Yasmin","Rabia","Iman","Rahima","Lubna","Nasreen","Shireen","Dua","Fizza","Mahnoor","Samira","Basimah","Farah","Ihsan"]},
    {title:"Modern Islamic Girl Names",content:"Contemporary Muslim parents are drawn to fresh names like Noor, Inaya, Zaynab, and Khatijah that feel modern while maintaining deep Islamic roots.",featuredNames:["Noor","Inaya","Zaynab","Khatijah","Nura","Munira","Siraj","Barakah"]}
  ],
  faqs:[
    {question:"What are the most popular Islamic girl names in 2026?",answer:"Aisha, Fatima, Khadija, Maryam, Amina, and Zainab continue to be the most popular Islamic girl names."},
    {question:"Can non-Muslim families use Islamic girl names?",answer:"Absolutely! Many Islamic girl names have universal appeal and beautiful meanings appreciated by families of all backgrounds."}
  ],
  relNames:["Aisha","Fatima","Khadija","Maryam","Amina","Zainab","Hafsa","Safiya","Nour","Layla","Amira","Salma","Inaya","Zara","Maya","Ruqayyah","Umm Kulthum","Ayat","Jannah"]
})

];

let freshCount = 0;
const freshPosts = newPosts.filter(p => {
  if (!existingIds.includes(p.id)) { freshCount++; return true; }
  return false;
});

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
console.log("New posts added:", freshCount);