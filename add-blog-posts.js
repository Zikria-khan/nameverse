const fs = require('fs');
const path = require('path');

const JSON_FILE = 'E:/code/nameverse/public/data/blog-posts.json';
const SITEMAP_FILE = 'E:/code/nameverse/public/blog_sitemap.xml';

const URL_REGEX = /^[a-z0-9-]+$/;

function createSafeSlug(input = "") {
  return String(input || '')
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9\s-]/g, "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function validateSlug(slug, context) {
  if (!slug) throw new Error('Empty slug in ' + context);
  if (!URL_REGEX.test(slug)) throw new Error('Invalid slug in ' + context + ': "' + slug + '" does not match ^[a-z0-9-]+$');
  return slug;
}

const topics = [
  { slug: 'why-islamic-names-popular-2026', title: 'Why Islamic Names Are So Popular in 2026', category: 'Islamic Names', tags: ['Islamic Names', 'Baby Names', '2026 Trends', 'Muslim Names'], featured: true, author: 'Dr. Fatima Al-Zahra', authorCreds: 'PhD in Islamic Studies, Certified Nameologist', seoKeywords: 'islamic names popular 2026, muslim baby names, quranic names trend', metaDesc: 'Discover why Islamic names are dominating 2026 baby naming trends. Explore spiritual significance, cultural pride, and timeless meanings.' },
  { slug: 'holy-quran-names', title: 'Holy Quran Names: Divine Choices for Your Child', category: 'Islamic Names', tags: ['Quranic Names', 'Islamic Names', 'Arabic Names', 'Spiritual'], featured: true, author: 'Sheikh Abdullah Al-Rashid', authorCreds: 'Islamic Scholar, Qari of Quran', seoKeywords: 'quran names, holy quran baby names, allah names baby', metaDesc: 'Beautiful names directly from the Holy Quran. Discover divine names with profound spiritual meanings for your baby.' },
  { slug: 'hindu-nature-element-names', title: 'Hindu Names Inspired by Nature & Elements', category: 'Hindu Names', tags: ['Hindu Names', 'Nature Names', 'Vedic', 'Elements'], featured: true, author: 'Pandit Rajesh Sharma', authorCreds: 'Vedic Scholar, Naming Ceremony Priest', seoKeywords: 'hindu nature names, element names hindu, vedic nature inspired', metaDesc: 'Stunning Hindu names drawn from nature—rivers, mountains, sky, earth, and elements. Connect your child to the natural world.' },
  { slug: 'baby-name-shape-personality', title: 'Can Your Baby\'s Name Shape Their Personality?', category: 'Psychology', tags: ['Name Psychology', 'Personality', 'Baby Names', 'Science'], featured: false, author: 'Dr. Emma Thompson', authorCreds: ' PhD Psychologist, Name Researcher', seoKeywords: 'name personality effect, baby name psychology, name meaning personality', metaDesc: 'Science reveals how names influence personality, behavior, and life outcomes. Surprising research on naming psychology.' },
  { slug: 'reasons-biblical-names-2026', title: '7 Reasons Biblical Names Are Trending in 2026', category: 'Christian Names', tags: ['Biblical Names', 'Christian', '2026 Trends', 'Scripture'], featured: true, author: 'Rev. Michael Carter', authorCreds: 'Theologian, Biblical Studies Professor', seoKeywords: 'biblical names 2026, christian baby trends, scripture names', metaDesc: 'Biblical names are making a major comeback. Discover 7 reasons these timeless names are topping 2026 charts.' },
  { slug: 'islamic-names-light-hope', title: 'Islamic Names Meaning Light & Hope for Your Baby', category: 'Islamic Names', tags: ['Islamic Names', 'Light Names', 'Hope', 'Arabic'], featured: false, author: 'Amina Hassan', authorCreds: 'Islamic Name Expert, Mother of Three', seoKeywords: 'islamic names light, muslim names hope, noor names', metaDesc: ' radiant Islamic names meaning light, hope, and guidance—perfect for illuminating your child\'s future.' },
  { slug: 'psychology-baby-name-regret', title: 'The Psychology of Baby Name Regret: What Studies Show', category: 'Psychology', tags: ['Name Regret', 'Psychology', 'Parenting', 'Research'], featured: false, author: 'Dr. Sarah Chen', authorCreds: 'Developmental Psychologist, Harvard', seoKeywords: 'baby name regret, name psychology, naming regret study', metaDesc: 'Research reveals why parents regret names and how to avoid common pitfalls. Insights from psychological studies.' },
  { slug: 'christian-warrior-names', title: 'Christian Warrior Names: Strong Biblical Hero Names', category: 'Christian Names', tags: ['Christian', 'Warrior Names', 'Biblical Heroes', 'Strong'], featured: false, author: 'Pastor James Williams', authorCreds: 'Military Chaplain, Biblical Scholar', seoKeywords: 'christian warrior names, biblical hero names, strong christian names', metaDesc: 'Powerful Christian names of biblical warriors, heroes, and champions—perfect for raising strong, faithful children.' },
  { slug: 'hindu-moon-stars', title: 'Hindu Names Based on Moon & Stars (Chandra & Nakshatra)', category: 'Hindu Names', tags: ['Hindu Names', 'Moon Names', 'Astrology', 'Nakshatra'], featured: false, author: 'Astrologer Vidya Mehta', authorCreds: 'Jyotish Expert, Vedic Astrologer', seoKeywords: 'hindu moon names, nakshatra names, chandra inspired', metaDesc: 'Luminous Hindu names derived from the moon (Chandra), stars (Nakshatras), and celestial bodies—beautiful cosmic choices.' },
  { slug: 'islamic-prophetic-comeback', title: 'Islamic Prophetic Names: The 2026 Comeback Trend', category: 'Islamic Names', tags: ['Prophet Names', 'Islamic', 'Trending 2026', 'Quran'], featured: true, author: 'Dr. Fatima Al-Zahra', authorCreds: 'PhD Islamic Studies, Nameologist', seoKeywords: 'prophet names islamic, prophetic names 2026, quranic prophets', metaDesc: 'Prophetic names like Muhammad, Musa, Isa are surging in 2026. Discover the meaningful comeback of these timeless Islamic names.' },
  { slug: 'honor-cultural-heritage', title: 'Honoring Cultural Heritage Through Baby Names', category: 'Culture', tags: ['Heritage', 'Cultural Names', 'Tradition', 'Identity'], featured: true, author: 'Dr. Amara Okafor', authorCreds: 'Cultural Anthropologist, Name Historian', seoKeywords: 'cultural heritage names, traditional baby names, honoring roots', metaDesc: 'How to honor your cultural heritage through meaningful baby names. Tips for preserving identity across generations.' },
  { slug: 'mispronounced-names-2026', title: 'The Most Mispronounced Baby Names of 2026', category: 'Guide', tags: ['Pronunciation', 'Baby Names', '2026', 'Tips'], featured: false, author: 'Linguist David Kim', authorCreds: 'Phonetics Expert, Language Professor', seoKeywords: 'mispronounced baby names 2026, name pronunciation guide', metaDesc: 'Avoid embarrassment! The most commonly mispronounced baby names in 2026 and how to say them correctly.' },
  { slug: 'sanskrit-names-revival', title: 'The Sanskrit Names Revival: 2026\'s Ancient Trend', category: 'Hindu Names', tags: ['Sanskrit', 'Hindu Names', 'Ancient', 'Revival'], featured: true, author: 'Pandit Rajesh Sharma', authorCreds: 'Vedic Scholar, Sanskrit Expert', seoKeywords: 'sanskrit baby names, ancient indian names, vedic revival', metaDesc: 'Sanskrit names are booming in 2026. Explore this ancient language\'s beautiful, meaningful names making a major comeback.' },
  { slug: 'secret-name-grows-child', title: 'The Secret Name That Helps Your Child Grow', category: 'Parenting', tags: ['Parenting', 'Child Development', 'Name Influence'], featured: false, author: 'Dr. Emma Thompson', authorCreds: 'Child Psychologist, Development Expert', seoKeywords: 'name helps child grow, naming influence development', metaDesc: 'Research suggests certain name qualities support child development. Learn what makes a name beneficial for growth.' },
  { slug: 'islamic-girl-names-2026', title: 'Top 50 Islamic Girl Names for 2026', category: 'Islamic Names', tags: ['Islamic Girl Names', 'Muslim Girls', '2026', 'Arabic'], featured: true, author: 'Amina Hassan', authorCreds: 'Islamic Name Expert, Mother of Three', seoKeywords: 'islamic girl names 2026, muslim girl names, arabic girl names', metaDesc: 'The most beautiful and meaningful Islamic girl names for 2026. Discover timeless classics and modern rising stars.' },
  { slug: 'christian-saint-names', title: 'Christian Saint Names: Holy Names for Your Child', category: 'Christian Names', tags: ['Saint Names', 'Christian', 'Catholic', 'Orthodox'], featured: false, author: 'Rev. Michael Carter', authorCreds: 'Theologian, Church Historian', seoKeywords: 'christian saint names, catholic saint names, holy names', metaDesc: 'Inspiring Christian saint names with powerful stories of faith. Perfect for raising children with strong spiritual foundations.' },
  { slug: 'baby-numerology-2026', title: 'Baby Name Numerology 2026: Find Your Perfect Match', category: 'Numerology', tags: ['Numerology', 'Baby Names', '2026', 'Numbers'], featured: false, author: 'Master Numerologist Ravi', authorCreds: 'Certified Numerologist, 20 Years Experience', seoKeywords: 'baby name numerology 2026, name number calculation', metaDesc: 'Use numerology to find the perfect baby name for 2026. Calculate destiny numbers, life paths, and name vibrations.' },
  { slug: 'winter-baby-names', title: 'Enchanting Winter Baby Names for Cold-Weather Babies', category: 'Seasonal', tags: ['Winter Names', 'Seasonal', 'Cold Weather', 'Christmas'], featured: false, author: 'Emily Winters', authorCreds: 'Birth Planner, Seasonal Naming Specialist', seoKeywords: 'winter baby names, cold weather names, december january names', metaDesc: ' magical winter baby names inspired by snow, frost, ice, and the cozy season. Perfect for December, January, February babies.' },
  { slug: 'arabic-powerful-meanings', title: 'Arabic Names with Powerful Meanings for 2026', category: 'Islamic Names', tags: ['Arabic Names', 'Powerful Meanings', 'Islamic', 'Strong'], featured: false, author: 'Layla Al-Mansour', authorCreds: 'Arabic Linguist, Name Researcher', seoKeywords: 'arabic names strong meanings, powerful muslim names', metaDesc: 'Strong Arabic baby names with powerful, meaningful definitions. Discover names that convey strength, courage, and virtue.' },
  { slug: 'indian-hindu-meanings', title: 'Indian Hindu Baby Names: Traditional Meanings Explained', category: 'Hindu Names', tags: ['Hindu Names', 'Indian Names', 'Traditional', 'Meanings'], featured: false, author: 'Pandit Rajesh Sharma', authorCreds: 'Vedic Scholar, Naming Priest', seoKeywords: 'indian hindu baby names, traditional indian names meanings', metaDesc: 'Traditional Indian Hindu baby names with deep cultural significance and beautiful meanings explained comprehensively.' },
  { slug: 'celebrity-inspired-names', title: 'Celebrity-Inspired Baby Names Taking Over 2026', category: 'Trends', tags: ['Celebrity Names', 'Trending 2026', 'Famous', 'Pop Culture'], featured: false, author: 'Entertainment Editor Zoe Park', authorCreds: 'Celebrity Culture Journalist, 10 Years', seoKeywords: 'celebrity baby names 2026, famous names trending', metaDesc: 'Baby names inspired by A-list celebrities, royal families, and Hollywood stars dominating 2026 naming charts.' },
  { slug: 'names-meaning-strong', title: 'Baby Names Meaning Strong & Powerful for Your Child', category: 'Meanings', tags: ['Strong Names', 'Powerful', 'Courage', 'Resilience'], featured: false, author: 'Dr. James Miller', authorCreds: 'Onomastics Researcher, Name Meaning Expert', seoKeywords: 'baby names meaning strong, powerful names', metaDesc: 'Strong, powerful baby names that will inspire confidence and resilience in your child. Meaningful choices for raising strong kids.' },
  { slug: 'islamic-boy-names-guide', title: 'Ultimate Guide to Islamic Boy Names in 2026', category: 'Islamic Names', tags: ['Islamic Boy Names', 'Muslim Boys', 'Quranic', '2026'], featured: true, author: 'Dr. Fatima Al-Zahra', authorCreds: 'PhD Islamic Studies, Certified Nameologist', seoKeywords: 'islamic boy names 2026, muslim boy names, quranic boy names', metaDesc: 'Complete guide to Islamic boy names with meanings, origins, and pronunciation tips. Find the perfect name for your baby boy.' },
  { slug: 'sibling-name-harmony', title: 'Sibling Name Harmony: How to Choose Matching Names', category: 'Parenting', tags: ['Sibling Names', 'Harmony', 'Family Naming', 'Tips'], featured: false, author: 'Parenting Expert Lisa Chen', authorCreds: 'Family Coach, Sibling Dynamics Specialist', seoKeywords: 'sibling names harmony, matching sibling names', metaDesc: 'Expert guide to choosing sibling names that complement each other and create family harmony. Practical tips and strategies.' },
  { slug: 'unisex-cross-cultural', title: 'Unisex Cross-Cultural Names for Modern Families', category: 'Unisex', tags: ['Unisex Names', 'Cross-Cultural', 'Modern', 'Global'], featured: true, author: 'Dr. Amara Okafor', authorCreds: 'Cultural Anthropologist, Naming Researcher', seoKeywords: 'unisex cross cultural names, global unisex names', metaDesc: 'Beautiful unisex names that work across cultures and languages. Perfect for multicultural families seeking inclusive choices.' },
  { slug: 'names-meaning-flower', title: 'Baby Names Meaning Flower: Blooming Beauties', category: 'Nature', tags: ['Flower Names', 'Nature', 'Botanical', 'Floral'], featured: false, author: 'Botanist-turned-Writer Rose Green', authorCreds: 'Botany Expert, Nature Writer', seoKeywords: 'baby names meaning flower, floral names', metaDesc: 'Gorgeous baby names that mean flower, blossom, or floral beauty. Nature-inspired names for your little blossom.' },
  { slug: 'bible-names-trending-2026', title: 'Bible Names Trending in 2026: Modern Revival', category: 'Christian Names', tags: ['Biblical Names', 'Christian', '2026 Trends', 'Modern'], featured: true, author: 'Rev. Michael Carter', authorCreds: 'Theologian, Biblical Studies Professor', seoKeywords: 'biblical names trending 2026, modern christian names', metaDesc: 'Classic Bible names are back with modern flair. Discover which scriptural names are hot in 2026 and why they\'re returning.' },
  { slug: 'lucky-colors-names', title: 'Lucky Colors & Names: Aligning Fortune in 2026', category: 'Superstition', tags: ['Lucky Names', 'Colors', 'Fortune', 'Culture'], featured: false, author: 'Feng Shui Master Wei Lin', authorCreds: 'Traditional Chinese Astrology Expert', seoKeywords: 'lucky color names, fortune baby names 2026', metaDesc: 'How to choose baby names aligned with lucky colors and fortune for 2026. Cultural traditions from around the world.' },
  { slug: 'powerful-hindu-names', title: 'Powerful Hindu Names for Strong Children', category: 'Hindu Names', tags: ['Hindu Names', 'Powerful', 'Strong', 'Deities'], featured: true, author: 'Pandit Rajesh Sharma', authorCreds: 'Vedic Scholar, Temple Priest', seoKeywords: 'powerful hindu names, strong hindu baby names', metaDesc: 'Mighty Hindu names associated with gods, goddesses, and divine strength. Perfect for raising confident, spiritually-grounded children.' },
  { slug: 'islamic-names-usa-uk', title: 'Islamic Names Popular in USA & UK: 2026 Guide', category: 'Islamic Names', tags: ['Islamic Names', 'USA', 'UK', 'Western'], featured: false, author: 'Dr. Nadia Siddiqui', authorCreds: 'Sociologist, Muslim Diaspora Researcher', seoKeywords: 'islamic names USA UK, muslim baby names west', metaDesc: 'Most popular Islamic names in America and Britain for 2026. How Muslim families balance tradition with Western integration.' },
  { slug: 'parenting-naming-mistakes', title: 'Top 10 Parenting Naming Mistakes to Avoid in 2026', category: 'Parenting', tags: ['Parenting Mistakes', 'Naming Tips', 'Avoid', 'Advice'], featured: false, author: 'Parenting Expert Lisa Chen', authorCreds: 'Family Coach, Parenting Author', seoKeywords: 'baby naming mistakes, parenting naming errors', metaDesc: 'Avoid these top 10 baby naming mistakes parents make in 2026. Practical advice for choosing the perfect name.' },
  { slug: 'ancient-mesopotamian-names', title: 'Ancient Mesopotamian Names: Lost Civilization\'s Legacy', category: 'History', tags: ['Mesopotamian', 'Ancient Names', 'History', 'Sumerian'], featured: false, author: 'Archaeologist Dr. Henry Wells', authorCreds: 'Mesopotamian History Expert, Author', seoKeywords: 'mesopotamian names, sumerian baby names, ancient babylonian', metaDesc: 'Rare ancient Mesopotamian baby names from Sumerian, Babylonian, and Assyrian civilizations. Unique historical choices.' },
  { slug: 'names-meaning-love-peace', title: 'Baby Names Meaning Love & Peace for 2026', category: 'Meanings', tags: ['Love Names', 'Peace Names', 'Harmony', 'Virtue'], featured: false, author: 'Dr. Emma Thompson', authorCreds: 'Positive Psychology Researcher', seoKeywords: 'names meaning love peace, harmony names', metaDesc: 'Beautiful baby names meaning love, peace, harmony, and compassion. Gentle names for raising kind children.' },
  { slug: 'rising-names-2026', title: 'Rising Baby Names Set to Explode in 2026', category: 'Trends', tags: ['Rising Names', 'Trending 2026', 'Upcoming', 'Predictions'], featured: false, author: 'Name Data Analyst Jake Roberts', authorCreds: 'Baby Name Trends Forecaster, Statistician', seoKeywords: 'rising baby names 2026, upcoming name trends', metaDesc: 'The fastest-rising baby names set to dominate 2026. Get ahead of the curve with these trending choices before they go viral.' },
  { slug: 'christian-girl-names-bible', title: 'Christian Girl Names from the Bible: Beautiful Choices', category: 'Christian Names', tags: ['Christian Girl Names', 'Biblical', 'Scripture', 'Mary'], featured: false, author: 'Rev. Sarah Johnson', authorCreds: 'Female Clergy, Biblical Scholar', seoKeywords: 'christian girl names bible, biblical girl names', metaDesc: 'Beautiful Christian girl names from the Bible—Mary, Ruth, Esther, and more. Spiritual, timeless choices for your daughter.' },
  { slug: 'vishnu-lakshmi-ganesha', title: 'Vishnu, Lakshmi & Ganesha Names: Divine Hindu Choices', category: 'Hindu Names', tags: ['Hindu Deities', 'Vishnu', 'Lakshmi', 'Ganesha', 'Gods'], featured: false, author: 'Pandit Rajesh Sharma', authorCreds: 'Vedic Scholar, Temple Priest 20 Years', seoKeywords: 'vishnu names, lakshmi names, ganesha names', metaDesc: 'Holy Hindu names of gods and goddesses—Vishnu, Lakshmi, Ganesha, Shiva, Durga. Divine spiritual names for your child.' },
  { slug: 'unique-rare-names-2026', title: 'Unique & Rare Baby Names for 2026: Stand Out', category: 'Unique', tags: ['Unique Names', 'Rare', 'Uncommon', 'Distinctive'], featured: false, author: 'Name Curator Zoe Park', authorCreds: 'Rare Name Researcher, Baby Name Blogger', seoKeywords: 'unique rare baby names 2026, uncommon names', metaDesc: 'Discover truly unique and rare baby names that will make your child stand out. Curated list of distinctive, uncommon choices.' },
  { slug: 'trends-predictions-2026-2030', title: 'Baby Name Trends & Predictions 2026–2030', category: 'Trends', tags: ['Trends 2026-2030', 'Predictions', 'Future', 'Forecast'], featured: true, author: 'Name Data Analyst Jake Roberts', authorCreds: 'Baby Name Trends Forecaster, Statistician', seoKeywords: 'baby name trends 2026-2030, future predictions', metaDesc: 'Expert predictions for baby name trends from 2026 to 2030. See what names will rise, fall, and dominate the next decade.' }
];

const islamicMale = ['Muhammad', 'Ali', 'Omar', 'Yusuf', 'Ibrahim', 'Adam', 'Musa', 'Hassan', 'Hussein', 'Zain', 'Rayan', 'Khalid', 'Tariq', 'Hamza', 'Bilal', 'Saad', 'Faris', 'Zayd', 'Malik', 'Abdullah'];
const islamicFemale = ['Aisha', 'Fatima', 'Maryam', 'Khadija', 'Zainab', 'Hafsa', 'Safiya', 'Nour', 'Layla', 'Yasmin', 'Amira', 'Salma', 'Inaya', 'Zara', 'Mariam', 'Hana', 'Ayat', 'Jannah', 'Sara'];
const christianMale = ['Abraham', 'David', 'Jacob', 'Joseph', 'Samuel', 'Daniel', 'Nathan', 'Ethan', 'Noah', 'Isaiah', 'Jeremiah', 'Elijah', 'Micah', 'Caleb', 'Joshua', 'Matthew', 'Luke', 'Mark', 'John', 'Peter'];
const christianFemale = ['Sarah', 'Ruth', 'Esther', 'Rebecca', 'Rachel', 'Miriam', 'Hannah', 'Abigail', 'Elizabeth', 'Mary', 'Martha', 'Phoebe', 'Priscilla', 'Dorcas', ' Lydia', 'Tabitha', 'Eve', 'Anna', 'Naomi', 'Joanna'];
const hinduMale = ['Krishna', 'Rama', 'Shiva', 'Vishnu', 'Brahma', 'Ganesha', 'Murugan', 'Kartikeya', 'Indra', 'Agni', 'Varuna', 'Surya', 'Chandra', 'Arjun', 'Bhima', 'Nakul', 'Sahadev', 'Yudhishthira', 'Lakshman', 'Balaram'];
const hinduFemale = ['Radha', 'Lakshmi', 'Sita', 'Parvati', 'Durga', 'Kali', 'Saraswati', 'Ganga', 'Yamuna', 'Revati', 'Arundhati', 'Shakti', 'Meera', 'Tulsidas', 'Anasuya', 'Savitri', 'Gauri', 'Kamala', 'Padma', 'Usha'];

const categoriesMap = {
  'islamic': 'Islamic Names',
  'christian': 'Christian Names',
  'hindu': 'Hindu Names',
  'psychology': 'Psychology',
  'parenting': 'Parenting',
  'trends': 'Trends',
  'numerology': 'Numerology',
  'seasonal': 'Seasonal',
  'culture': 'Culture',
  'guide': 'Guide',
  'unique': 'Unique',
  'nature': 'Nature',
  'history': 'History',
  'meanings': 'Meanings',
  'unisex': 'Unisex',
  'superstition': 'Superstition'
};

const authors = [
  { name: 'Dr. Fatima Al-Zahra', creds: 'PhD in Islamic Studies, Certified Nameologist' },
  { name: 'Sheikh Abdullah Al-Rashid', creds: 'Islamic Scholar, Qari of Quran' },
  { name: 'Pandit Rajesh Sharma', creds: 'Vedic Scholar, Naming Ceremony Priest' },
  { name: 'Dr. Emma Thompson', creds: 'Child Psychologist, Development Expert' },
  { name: 'Rev. Michael Carter', creds: 'Theologian, Biblical Studies Professor' },
  { name: 'Amina Hassan', creds: 'Islamic Name Expert, Mother of Three' },
  { name: 'Dr. Sarah Chen', creds: 'Developmental Psychologist, Harvard' },
  { name: 'Pastor James Williams', creds: 'Military Chaplain, Biblical Scholar' },
  { name: 'Astrologer Vidya Mehta', creds: 'Jyotish Expert, Vedic Astrologer' },
  { name: 'Dr. Amara Okafor', creds: 'Cultural Anthropologist, Name Historian' },
  { name: 'Linguist David Kim', creds: 'Phonetics Expert, Language Professor' },
  { name: 'Rev. Sarah Johnson', creds: 'Female Clergy, Biblical Scholar' },
  { name: 'Master Numerologist Ravi', creds: 'Certified Numerologist, 20 Years Experience' },
  { name: 'Emily Winters', creds: 'Birth Planner, Seasonal Naming Specialist' },
  { name: 'Layla Al-Mansour', creds: 'Arabic Linguist, Name Researcher' },
  { name: 'Entertainment Editor Zoe Park', creds: 'Celebrity Culture Journalist, 10 Years' },
  { name: 'Dr. James Miller', creds: 'Onomastics Researcher, Name Meaning Expert' },
  { name: 'Parenting Expert Lisa Chen', creds: 'Family Coach, Sibling Dynamics Specialist' },
  { name: 'Archaeologist Dr. Henry Wells', creds: 'Mesopotamian History Expert, Author' },
  { name: 'Feng Shui Master Wei Lin', creds: 'Traditional Chinese Astrology Expert' },
  { name: 'Dr. Nadia Siddiqui', creds: 'Sociologist, Muslim Diaspora Researcher' },
  { name: 'Botanist-turned-Writer Rose Green', authorCreds: 'Botany Expert, Nature Writer' },
  { name: 'Name Curator Zoe Park', creds: 'Rare Name Researcher, Baby Name Blogger' },
  { name: 'Name Data Analyst Jake Roberts', creds: 'Baby Name Trends Forecaster, Statistician' }
];

const unsplashImages = {
  islamic: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=1200&h=630&fit=crop&auto=format&q=80',
  christian: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=630&fit=crop&auto=format&q=80',
  hindu: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?w=1200&h=630&fit=crop&auto=format&q=80',
  generic: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=1200&h=630&fit=crop&auto=format&q=80',
  psychology: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=1200&h=630&fit=crop&auto=format&q=80',
  numerology: 'https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?w=1200&h=630&fit=crop&auto=format&q=80',
  nature: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&h=630&fit=crop&auto=format&q=80',
  trends: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=630&fit=crop&auto=format&q=80',
  seasonal: 'https://images.unsplash.com/photo-1518895496757-32b11564e7f1?w=1200&h=630&fit=crop&auto=format&q=80',
  culture: 'https://images.unsplash.com/photo-1528164344705-47542687000d?w=1200&h=630&fit=crop&auto=format&q=80'
};

function getCategoryFromSlug(slug) {
  if (slug.includes('islamic')) return 'Islamic Names';
  if (slug.includes('christian') || slug.includes('bible') || slug.includes('biblical') || slug.includes('saint')) return 'Christian Names';
  if (slug.includes('hindu') || slug.includes('sanskrit') || slug.includes('vedic') || slug.includes('mesopotamian')) return 'Hindu Names';
  if (slug.includes('numerology')) return 'Numerology';
  if (slug.includes('psychology') || slug.includes('personality') || slug.includes('regret') || slug.includes('mistakes')) return 'Psychology';
  if (slug.includes('trend') || slug.includes('predict') || slug.includes('rising')) return 'Trends';
  if (slug.includes('seasonal') || slug.includes('winter')) return 'Seasonal';
  if (slug.includes('culture') || slug.includes('heritage') || slug.includes('cultural')) return 'Culture';
  if (slug.includes('nature') || slug.includes('flower') || slug.includes('element')) return 'Nature';
  if (slug.includes('history') || slug.includes('ancient')) return 'History';
  if (slug.includes('unisex') || slug.includes('cross-cultural')) return 'Unisex';
  if (slug.includes('unique') || slug.includes('rare')) return 'Unique';
  if (slug.includes('lucky') || slug.includes('fortune')) return 'Superstition';
  if (slug.includes('meaning') || slug.includes('strong') || slug.includes('love') || slug.includes('peace')) return 'Meanings';
  if (slug.includes('sibling') || slug.includes('parenting')) return 'Parenting';
  return 'Baby Names';
}

function getImageForCategory(category, slug) {
  const slugLower = slug.toLowerCase();
  if (slugLower.includes('islamic')) return unsplashImages.islamic;
  if (slugLower.includes('christian') || slugLower.includes('bible') || slugLower.includes('biblical')) return unsplashImages.christian;
  if (slugLower.includes('hindu') || slugLower.includes('sanskrit') || slugLower.includes('vedic')) return unsplashImages.hindu;
  if (slugLower.includes('psychology') || slugLower.includes('personality')) return unsplashImages.psychology;
  if (slugLower.includes('numerology')) return unsplashImages.numerology;
  if (slugLower.includes('nature') || slugLower.includes('flower') || slugLower.includes('element')) return unsplashImages.nature;
  if (slugLower.includes('trend') || slugLower.includes('predict') || slugLower.includes('rising')) return unsplashImages.trends;
  if (slugLower.includes('seasonal') || slugLower.includes('winter')) return unsplashImages.seasonal;
  if (slugLower.includes('culture') || slugLower.includes('heritage')) return unsplashImages.culture;
  return unsplashImages.generic;
}

function getFeaturedNames(slug) {
  if (slug.includes('islamic') || slug.includes('quran')) {
    return { boyNames: islamicMale.slice(0, 5), girlNames: islamicFemale.slice(0, 5) };
  }
  if (slug.includes('christian') || slug.includes('bible') || slug.includes('biblical')) {
    return { boyNames: christianMale.slice(0, 5), girlNames: christianFemale.slice(0, 5) };
  }
  if (slug.includes('hindu') || slug.includes('sanskrit') || slug.includes('vedic')) {
    return { boyNames: hinduMale.slice(0, 5), girlNames: hinduFemale.slice(0, 5) };
  }
  return { boyNames: islamicMale.slice(0, 3).concat(christianMale.slice(0, 2)), girlNames: islamicFemale.slice(0, 3).concat(christianFemale.slice(0, 2)) };
}

function generateSection(sectionIndex, slug, title, contentIntro, names) {
  const namesList = names || (slug.includes('islamic') ? islamicMale.slice(0, 10).concat(islamicFemale.slice(0, 10)) : slug.includes('christian') ? christianMale.slice(0, 10).concat(christianFemale.slice(0, 10)) : hinduMale.slice(0, 10).concat(hinduFemale.slice(0, 10)));
  return {
    title,
    content: `${contentIntro} Here are some notable examples to consider: ${namesList.slice(0, 5).join(', ')}. These names carry deep significance and can greatly influence your child\'s identity. When selecting from these options, consider how they pair with your family surname and what values you hope to instill. Remember, a name is a lifelong gift—choose one that resonates with your hopes and dreams for your child.`,
    featuredNames: namesList.slice(0, 10)
  };
}

function generateFAQs(slug, category) {
  const baseFAQs = [
    { question: 'What should I consider when choosing a baby name?', answer: 'Consider meaning, pronunciation, family traditions, cultural significance, how it pairs with your surname, potential nicknames, and how it will age as your child grows.' },
    { question: 'How do I ensure the name has a good meaning?', answer: 'Research thoroughly across multiple sources. Check etymology, cultural context, and any negative associations. Consult elders or experts in relevant traditions for verification.' },
    { question: 'Are popular names always the best choice?', answer: 'Popularity doesn\'t guarantee suitability. Consider whether you want a timeless classic, a trending name, or something unique that helps your child stand out positively.' },
    { question: 'Should I honor family traditions with the name?', answer: 'Family names honor lineage and maintain connections. Many cultures value this deeply. Consider using a family name as a first or middle name to balance tradition with modern choice.' },
    { question: 'What naming mistakes should I avoid?', answer: 'Avoid overly trendy names that may date quickly, names that are difficult to spell or pronounce, initials that form awkward acronyms, and names with unintended negative meanings.' },
    { question: 'When should I finalize the baby name?', answer: 'Take your time. Many parents wait until after birth to see the baby. Others decide earlier. Trust your instincts—you\'ll know the right name when you find it.' }
  ];
  return baseFAQs;
}

function generateBlogPost(topic, index) {
  const rawId = topic.slug;
  const id = createSafeSlug(rawId);
  validateSlug(id, 'add-blog-posts.js topic[' + index + '].slug');
  const title = `NameVerse — ${topic.title}`;
  const excerpt = generateExcerpt(topic);
  const publishDate = new Date(2025, 0, 15 + index).toISOString().split('T')[0];
  const lastUpdated = new Date(2026, 3, 1 + Math.floor(index / 5)).toISOString().split('T')[0];
  const readTime = calculateReadTime(topic);
  const featuredImage = getImageForCategory(topic.category, topic.slug);
  const { boyNames, girlNames } = getFeaturedNames(topic.slug);
  
  const content = {
    introduction: generateIntroduction(topic),
    sections: [
      generateSection(1, topic.slug, `Understanding ${topic.title.split(':')[0] || topic.title}`, `This section explores the deep significance and background of ${topic.slug.replace(/-/g, ' ')}.`. slice(0, 150), boyNames),
      generateSection(2, topic.slug, `Top Examples & Options`, `We\'ve curated the best examples from various traditions to help you make an informed choice.`.slice(0, 120), girlNames),
      generateSection(3, topic.slug, `Practical Considerations`, `Beyond beauty and meaning, practical factors matter. Pronunciation, spelling, and cultural acceptance all play vital roles in your final decision.`.slice(0, 140), null)
    ],
    faqs: generateFAQs(topic.slug, topic.category),
    relatedNames: [...boyNames.slice(0, 3), ...girlNames.slice(0, 3)]
  };
  
  return {
    id,
    title,
    subtitle: topic.title,
    excerpt,
    author: topic.author,
    authorCredentials: topic.authorCreds,
    publishDate,
    lastUpdated,
    readTime,
    category: getCategoryFromSlug(topic.slug),
    tags: topic.tags,
    featured: topic.featured,
    seoKeywords: topic.seoKeywords,
    metaDescription: topic.metaDesc,
    featuredImage,
    content
  };
}

function generateExcerpt(topic) {
  const baseExcerpts = {
    'islamic': `Explore meaningful Islamic baby names with spiritual significance for 2026. Discover Quranic names, their meanings, and cultural heritage.`,
    'christian': `Timeless Christian and Biblical baby names with deep scriptural meaning. Find inspiration from saints, prophets, and scripture for 2026.`,
    'hindu': `Beautiful Hindu names from Vedic traditions, Sanskrit origins, and divine mythology. Explore meaningful choices for your baby.`,
    'psychology': `Research-backed insights into how names influence personality, behavior, and life outcomes. Make an informed choice for your child.`,
    'parenting': `Practical advice and strategies for parents navigating the naming journey. Avoid common mistakes and find the perfect name.`,
    'trends': `Latest baby name trends and predictions for 2026. Stay ahead with rising names and discover what\'s hot this year.`
  };
  const key = Object.keys(baseExcerpts).find(k => topic.slug.includes(k)) || 'islamic';
  return baseExcerpts[key];
}

function generateIntroduction(topic) {
  return `Choosing the perfect name for your child is one of the most meaningful decisions you'll make as a parent. ${getIntroParagraph(topic)} This comprehensive guide explores the origins, meanings, cultural significance, and modern applications of these special names. We'll cover everything from historical context to practical tips for selecting, pronouncing, and integrating your chosen name into family life. Whether you seek tradition, modernity, or a blend of both, this resource will help you find a name that carries beauty, meaning, and positive energy for your child's lifetime.`;
}

function getIntroParagraph(topic) {
  if (topic.slug.includes('islamic')) return 'Islamic names carry profound spiritual weight, connecting your child to centuries of Muslim heritage and divine blessings from the Quran.';
  if (topic.slug.includes('christian')) return 'Christian names from the Bible and saint traditions offer timeless virtues and stories of faith that can inspire your child throughout life.';
  if (topic.slug.includes('hindu')) return 'Hindu names derive power from ancient Sanskrit, Vedic traditions, and connection to divine deities and cosmic principles.';
  if (topic.slug.includes('psychology')) return 'The psychology of naming reveals fascinating insights into how names shape identity, opportunities, and even behavior over a lifetime.';
  if (topic.slug.includes('trend')) return 'Baby naming trends shift yearly, reflecting cultural changes, celebrity influence, and evolving parental values across societies.';
  return 'Names are the first gift you give your child—a lifelong identifier that shapes identity, carries meaning, and connects to heritage.';
}

function calculateReadTime(topic) {
  const base = topic.featured ? 12 : 8;
  const variance = Math.floor(Math.random() * 4) - 2;
  return `${base + variance} min read`;
}

function slugToURLSlug(slug) {
  return slug;
}

function generateSitemapEntries(posts) {
  const seenSlugs = new Set();
  let xml = '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  posts.forEach(post => {
    const safeSlug = createSafeSlug(post.id);
    validateSlug(safeSlug, 'sitemap blog slug');
    if (seenSlugs.has(safeSlug)) {
      throw new Error('Duplicate blog slug in sitemap: ' + safeSlug);
    }
    seenSlugs.add(safeSlug);
    xml += `  <url>
    <loc>https://nameverse.com/blog/${safeSlug}</loc>
    <lastmod>${post.lastUpdated}</lastmod>
    <changefreq>monthly</changefreq>
  </url>
`;
  });
  xml += '</urlset>';
  return xml;
}

function main() {
  try {
    const raw = fs.readFileSync(JSON_FILE, 'utf8');
    const posts = JSON.parse(raw);
    
    let newPosts = [];
    topics.forEach((topic, idx) => {
      const post = generateBlogPost(topic, idx);
      newPosts.push(post);
    });
    
    const updatedPosts = posts.concat(newPosts);
    fs.writeFileSync(JSON_FILE, JSON.stringify(updatedPosts, null, 2), 'utf8');
    console.log(`Added ${newPosts.length} blog posts to ${JSON_FILE}`);
    
    const sitemap = generateSitemapEntries(updatedPosts);
    fs.writeFileSync(SITEMAP_FILE, sitemap, 'utf8');
    console.log(`Updated sitemap at ${SITEMAP_FILE}`);
    
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
}

main();
