/**
 * TOPICAL AUTHORITY ARCHITECTURE — NameVerse
 * 
 * Complete semantic knowledge graph, topic clusters, entity relationships,
 * internal linking architecture, and content hub strategy.
 * 
 * Target: Topical Authority 100/100
 * 
 * This file serves as the single source of truth for:
 * - Topic clusters and their hierarchies
 * - Entity relationships and semantic connections
 * - Internal linking rules and patterns
 * - Content hub definitions
 * - Pillar page definitions
 * - Programmatic page generation rules
 * - Crawl strategy and navigation architecture
 */

// ============================================================
// 1. TOPIC CLUSTER ARCHITECTURE
// ============================================================
// Every page belongs to exactly one topic cluster.
// Clusters form a tree structure with parent-child relationships.

export const TOPIC_CLUSTERS = {
  // === ROOT CLUSTER ===
  'baby-names': {
    id: 'baby-names',
    title: 'Baby Names',
    description: 'Complete guide to baby names from every culture, religion, and tradition worldwide.',
    parent: null,
    level: 0,
    pillar: true,
    children: [
      'boy-names', 'girl-names', 'unisex-names',
      'names-by-religion', 'names-by-origin', 'names-by-language',
      'names-by-letter', 'names-by-meaning', 'names-by-theme',
      'names-by-popularity', 'names-by-culture', 'names-by-era',
    ],
    entities: ['Baby', 'Name', 'Parenting', 'Culture', 'Tradition'],
    url: '/',
  },

  // === GENDER CLUSTERS ===
  'boy-names': {
    id: 'boy-names',
    title: 'Boy Names',
    description: 'Strong, meaningful boy names from every culture and tradition.',
    parent: 'baby-names',
    level: 1,
    pillar: true,
    children: ['islamic-boy-names', 'christian-boy-names', 'hindu-boy-names', 'modern-boy-names', 'unique-boy-names', 'popular-boy-names'],
    entities: ['Male', 'Masculine', 'Boy', 'Son'],
    url: '/names?gender=boy',
  },
  'girl-names': {
    id: 'girl-names',
    title: 'Girl Names',
    description: 'Beautiful, elegant girl names from every culture and tradition.',
    parent: 'baby-names',
    level: 1,
    pillar: true,
    children: ['islamic-girl-names', 'christian-girl-names', 'hindu-girl-names', 'modern-girl-names', 'unique-girl-names', 'popular-girl-names'],
    entities: ['Female', 'Feminine', 'Girl', 'Daughter'],
    url: '/names?gender=girl',
  },
  'unisex-names': {
    id: 'unisex-names',
    title: 'Unisex Names',
    description: 'Gender-neutral baby names that work for any child.',
    parent: 'baby-names',
    level: 1,
    pillar: false,
    children: [],
    entities: ['Unisex', 'Gender-neutral', 'Androgynous'],
    url: '/names?gender=unisex',
  },

  // === RELIGION CLUSTERS ===
  'names-by-religion': {
    id: 'names-by-religion',
    title: 'Names by Religion',
    description: 'Baby names organized by religious tradition and faith.',
    parent: 'baby-names',
    level: 1,
    pillar: true,
    children: ['islamic-names', 'christian-names', 'hindu-names', 'biblical-names', 'quranic-names', 'jewish-names', 'buddhist-names', 'sikh-names'],
    entities: ['Religion', 'Faith', 'Spirituality', 'Tradition'],
    url: '/names/religion',
  },
  'islamic-names': {
    id: 'islamic-names',
    title: 'Islamic Names',
    description: 'Beautiful Islamic baby names with meanings from Arabic, Persian, and Urdu traditions.',
    parent: 'names-by-religion',
    level: 2,
    pillar: true,
    children: ['islamic-boy-names', 'islamic-girl-names', 'quranic-names', 'arabic-names', 'urdu-names', 'persian-names', 'prophet-names'],
    entities: ['Islam', 'Muslim', 'Quran', 'Arabic', 'Prophet Muhammad'],
    url: '/islamic/boy-names',
  },
  'christian-names': {
    id: 'christian-names',
    title: 'Christian Names',
    description: 'Meaningful Christian baby names from biblical and saint traditions.',
    parent: 'names-by-religion',
    level: 2,
    pillar: true,
    children: ['christian-boy-names', 'christian-girl-names', 'biblical-names', 'saint-names', 'apostle-names'],
    entities: ['Christianity', 'Bible', 'Jesus', 'Saint', 'Church'],
    url: '/christian/boy-names',
  },
  'hindu-names': {
    id: 'hindu-names',
    title: 'Hindu Names',
    description: 'Sacred Hindu baby names from Sanskrit, Vedic, and Indian traditions.',
    parent: 'names-by-religion',
    level: 2,
    pillar: true,
    children: ['hindu-boy-names', 'hindu-girl-names', 'sanskrit-names', 'vedic-names', 'devi-names', 'deva-names'],
    entities: ['Hinduism', 'Sanskrit', 'Veda', 'Deity', 'India'],
    url: '/hindu/boy-names',
  },
  'biblical-names': {
    id: 'biblical-names',
    title: 'Biblical Names',
    description: 'Names from the Bible with Hebrew, Greek, and Latin origins.',
    parent: 'names-by-religion',
    level: 2,
    pillar: true,
    children: ['old-testament-names', 'new-testament-names', 'hebrew-names', 'apostle-names', 'prophet-names-biblical'],
    entities: ['Bible', 'Hebrew', 'Old Testament', 'New Testament', 'Scripture'],
    url: '/names/religion/christian/1',
  },
  'quranic-names': {
    id: 'quranic-names',
    title: 'Quranic Names',
    description: 'Names mentioned in the Holy Quran with Arabic meanings and significance.',
    parent: 'names-by-religion',
    level: 2,
    pillar: true,
    children: ['quranic-boy-names', 'quranic-girl-names', 'prophet-names-quranic', 'sahabi-names'],
    entities: ['Quran', 'Arabic', 'Islam', 'Prophet', 'Revelation'],
    url: '/names/islamic/categories/quranic/1',
  },

  // === GENDER + RELIGION LEAF CLUSTERS ===
  'islamic-boy-names': {
    id: 'islamic-boy-names',
    title: 'Islamic Boy Names',
    description: 'Strong Islamic boy names with Arabic meanings and cultural significance.',
    parent: 'islamic-names',
    level: 3,
    pillar: true,
    children: ['arabic-boy-names', 'urdu-boy-names', 'persian-boy-names', 'quranic-boy-names', 'prophet-muhammad-names'],
    entities: ['Islam', 'Male', 'Arabic', 'Muslim', 'Boy'],
    url: '/islamic/boy-names',
  },
  'islamic-girl-names': {
    id: 'islamic-girl-names',
    title: 'Islamic Girl Names',
    description: 'Beautiful Islamic girl names with elegant meanings and cultural heritage.',
    parent: 'islamic-names',
    level: 3,
    pillar: true,
    children: ['arabic-girl-names', 'urdu-girl-names', 'persian-girl-names', 'quranic-girl-names'],
    entities: ['Islam', 'Female', 'Arabic', 'Muslim', 'Girl'],
    url: '/islamic/girl-names',
  },
  'christian-boy-names': {
    id: 'christian-boy-names',
    title: 'Christian Boy Names',
    description: 'Strong Christian boy names from biblical and saint traditions.',
    parent: 'christian-names',
    level: 3,
    pillar: true,
    children: ['biblical-boy-names', 'saint-names-boy', 'apostle-names'],
    entities: ['Christianity', 'Male', 'Bible', 'Jesus', 'Boy'],
    url: '/christian/boy-names',
  },
  'christian-girl-names': {
    id: 'christian-girl-names',
    title: 'Christian Girl Names',
    description: 'Beautiful Christian girl names with biblical and saintly meanings.',
    parent: 'christian-names',
    level: 3,
    pillar: true,
    children: ['biblical-girl-names', 'saint-names-girl', 'virtue-names'],
    entities: ['Christianity', 'Female', 'Bible', 'Saint', 'Girl'],
    url: '/christian/girl-names',
  },
  'hindu-boy-names': {
    id: 'hindu-boy-names',
    title: 'Hindu Boy Names',
    description: 'Sacred Hindu boy names from Sanskrit and Vedic traditions.',
    parent: 'hindu-names',
    level: 3,
    pillar: true,
    children: ['sanskrit-boy-names', 'vedic-boy-names', 'deva-names'],
    entities: ['Hinduism', 'Male', 'Sanskrit', 'Veda', 'Deity'],
    url: '/hindu/boy-names',
  },
  'hindu-girl-names': {
    id: 'hindu-girl-names',
    title: 'Hindu Girl Names',
    description: 'Beautiful Hindu girl names with Sanskrit meanings and divine associations.',
    parent: 'hindu-names',
    level: 3,
    pillar: true,
    children: ['sanskrit-girl-names', 'vedic-girl-names', 'devi-names'],
    entities: ['Hinduism', 'Female', 'Sanskrit', 'Veda', 'Goddess'],
    url: '/hindu/girl-names',
  },

  // === ORIGIN CLUSTERS ===
  'names-by-origin': {
    id: 'names-by-origin',
    title: 'Names by Origin',
    description: 'Baby names organized by their linguistic and geographic origins.',
    parent: 'baby-names',
    level: 1,
    pillar: true,
    children: ['arabic-names', 'hebrew-names', 'greek-names', 'latin-names', 'sanskrit-names', 'persian-names', 'turkish-names', 'urdu-names', 'english-names', 'african-names'],
    entities: ['Origin', 'Language', 'Culture', 'Geography', 'Etymology'],
    url: '/names-by-origin',
  },
  'arabic-names': {
    id: 'arabic-names',
    title: 'Arabic Names',
    description: 'Beautiful Arabic baby names with deep meanings from the Arab world.',
    parent: 'names-by-origin',
    level: 2,
    pillar: true,
    children: ['arabic-boy-names', 'arabic-girl-names', 'quranic-names'],
    entities: ['Arabic', 'Arab', 'Middle East', 'Quran', 'Semitic'],
    url: '/names/islamic/origin/arabic/1',
  },
  'hebrew-names': {
    id: 'hebrew-names',
    title: 'Hebrew Names',
    description: 'Ancient Hebrew baby names with biblical meanings and Jewish heritage.',
    parent: 'names-by-origin',
    level: 2,
    pillar: true,
    children: ['hebrew-boy-names', 'hebrew-girl-names', 'biblical-names'],
    entities: ['Hebrew', 'Jewish', 'Israel', 'Bible', 'Semitic'],
    url: '/names/christian/origin/hebrew/1',
  },
  'sanskrit-names': {
    id: 'sanskrit-names',
    title: 'Sanskrit Names',
    description: 'Ancient Sanskrit baby names from Vedic and Hindu traditions.',
    parent: 'names-by-origin',
    level: 2,
    pillar: true,
    children: ['sanskrit-boy-names', 'sanskrit-girl-names', 'vedic-names'],
    entities: ['Sanskrit', 'India', 'Veda', 'Hinduism', 'Indo-Aryan'],
    url: '/names/hindu/origin/sanskrit/1',
  },
  'persian-names': {
    id: 'persian-names',
    title: 'Persian Names',
    description: 'Elegant Persian baby names with poetic meanings from Iranian culture.',
    parent: 'names-by-origin',
    level: 2,
    pillar: true,
    children: ['persian-boy-names', 'persian-girl-names'],
    entities: ['Persian', 'Iran', 'Farsi', 'Poetry', 'Indo-Iranian'],
    url: '/names/islamic/origin/persian/1',
  },
  'turkish-names': {
    id: 'turkish-names',
    title: 'Turkish Names',
    description: 'Modern and traditional Turkish baby names with Turkic origins.',
    parent: 'names-by-origin',
    level: 2,
    pillar: true,
    children: ['turkish-boy-names', 'turkish-girl-names'],
    entities: ['Turkish', 'Turkey', 'Turkic', 'Ottoman', 'Anatolia'],
    url: '/names/islamic/origin/turkish/1',
  },
  'urdu-names': {
    id: 'urdu-names',
    title: 'Urdu Names',
    description: 'Beautiful Urdu baby names from South Asian Islamic tradition.',
    parent: 'names-by-origin',
    level: 2,
    pillar: true,
    children: ['urdu-boy-names', 'urdu-girl-names'],
    entities: ['Urdu', 'Pakistan', 'India', 'South Asia', 'Indo-Aryan'],
    url: '/names/islamic/origin/urdu/1',
  },
  'english-names': {
    id: 'english-names',
    title: 'English Names',
    description: 'Classic and modern English baby names with Anglo-Saxon origins.',
    parent: 'names-by-origin',
    level: 2,
    pillar: true,
    children: ['english-boy-names', 'english-girl-names', 'british-names', 'american-names'],
    entities: ['English', 'Britain', 'America', 'Anglo-Saxon', 'Germanic'],
    url: '/names/christian/origin/english/1',
  },
  'greek-names': {
    id: 'greek-names',
    title: 'Greek Names',
    description: 'Ancient and modern Greek baby names with Hellenic heritage.',
    parent: 'names-by-origin',
    level: 2,
    pillar: true,
    children: ['greek-boy-names', 'greek-girl-names', 'greek-mythology-names'],
    entities: ['Greek', 'Greece', 'Hellenic', 'Mythology', 'Indo-European'],
    url: '/names/christian/origin/greek/1',
  },
  'latin-names': {
    id: 'latin-names',
    title: 'Latin Names',
    description: 'Classical Latin baby names from Roman civilization.',
    parent: 'names-by-origin',
    level: 2,
    pillar: true,
    children: ['latin-boy-names', 'latin-girl-names', 'roman-names'],
    entities: ['Latin', 'Rome', 'Roman', 'Italic', 'Classical'],
    url: '/names/christian/origin/latin/1',
  },
  'african-names': {
    id: 'african-names',
    title: 'African Names',
    description: 'Diverse African baby names from across the continent\'s many cultures.',
    parent: 'names-by-origin',
    level: 2,
    pillar: true,
    children: ['west-african-names', 'east-african-names', 'north-african-names', 'south-african-names', 'swahili-names', 'yoruba-names', 'igbo-names'],
    entities: ['Africa', 'Swahili', 'Yoruba', 'Igbo', 'Zulu'],
    url: '/names/christian/origin/african/1',
  },

  // === THEME CLUSTERS ===
  'names-by-theme': {
    id: 'names-by-theme',
    title: 'Names by Theme',
    description: 'Baby names organized by themes, concepts, and inspirations.',
    parent: 'baby-names',
    level: 1,
    pillar: true,
    children: ['nature-names', 'flower-names', 'animal-names', 'virtue-names', 'royal-names', 'vintage-names', 'modern-names', 'unique-names', 'rare-names', 'short-names', 'long-names'],
    entities: ['Theme', 'Concept', 'Inspiration', 'Category'],
    url: '/names-by-meaning',
  },
  'nature-names': {
    id: 'nature-names',
    title: 'Nature Names',
    description: 'Baby names inspired by the natural world, elements, and landscapes.',
    parent: 'names-by-theme',
    level: 2,
    pillar: true,
    children: ['flower-names', 'animal-names', 'water-names', 'sky-names', 'earth-names', 'forest-names', 'ocean-names'],
    entities: ['Nature', 'Earth', 'Sky', 'Water', 'Forest', 'Ocean'],
    url: '/names/islamic/categories/nature/1',
  },
  'flower-names': {
    id: 'flower-names',
    title: 'Flower Names',
    description: 'Beautiful baby names inspired by flowers and botanical beauty.',
    parent: 'nature-names',
    level: 3,
    pillar: true,
    children: ['rose-names', 'lily-names', 'jasmine-names', 'lotus-names'],
    entities: ['Flower', 'Rose', 'Lily', 'Jasmine', 'Lotus', 'Botanical'],
    url: '/names/islamic/categories/nature/1',
  },
  'virtue-names': {
    id: 'virtue-names',
    title: 'Virtue Names',
    description: 'Baby names that represent positive qualities, values, and virtues.',
    parent: 'names-by-theme',
    level: 2,
    pillar: true,
    children: ['names-meaning-strength', 'names-meaning-love', 'names-meaning-peace', 'names-meaning-wisdom', 'names-meaning-beauty'],
    entities: ['Virtue', 'Strength', 'Love', 'Peace', 'Wisdom', 'Beauty'],
    url: '/names-by-meaning',
  },
  'royal-names': {
    id: 'royal-names',
    title: 'Royal Names',
    description: 'Regal baby names fit for royalty from monarchies worldwide.',
    parent: 'names-by-theme',
    level: 2,
    pillar: true,
    children: ['king-names', 'queen-names', 'prince-names', 'princess-names', 'emperor-names'],
    entities: ['Royal', 'King', 'Queen', 'Prince', 'Princess', 'Monarchy'],
    url: '/names/islamic/categories/royal/1',
  },
  'vintage-names': {
    id: 'vintage-names',
    title: 'Vintage Names',
    description: 'Classic vintage baby names making a comeback in modern times.',
    parent: 'names-by-theme',
    level: 2,
    pillar: true,
    children: ['old-fashioned-names', 'victorian-names', 'medieval-names', 'classic-names'],
    entities: ['Vintage', 'Classic', 'Old-fashioned', 'Retro', 'Heritage'],
    url: '/names/islamic/categories/traditional/1',
  },
  'modern-names': {
    id: 'modern-names',
    title: 'Modern Names',
    description: 'Contemporary and trendy baby names for today\'s parents.',
    parent: 'names-by-theme',
    level: 2,
    pillar: true,
    children: ['trending-names', 'unique-names', 'creative-names', 'new-age-names'],
    entities: ['Modern', 'Trendy', 'Contemporary', 'New', 'Creative'],
    url: '/names/islamic/categories/modern/1',
  },
  'unique-names': {
    id: 'unique-names',
    title: 'Unique Names',
    description: 'Rare and distinctive baby names that stand out from the crowd.',
    parent: 'names-by-theme',
    level: 2,
    pillar: true,
    children: ['rare-names', 'uncommon-names', 'distinctive-names', 'unusual-names'],
    entities: ['Unique', 'Rare', 'Distinctive', 'Uncommon', 'Special'],
    url: '/unique-names',
  },

  // === POPULARITY CLUSTERS ===
  'names-by-popularity': {
    id: 'names-by-popularity',
    title: 'Names by Popularity',
    description: 'Baby names ranked by popularity across countries and years.',
    parent: 'baby-names',
    level: 1,
    pillar: true,
    children: ['popular-names', 'trending-names', 'top-100-names', 'top-1000-names', 'popular-names-by-country', 'popular-names-by-year'],
    entities: ['Popularity', 'Trending', 'Top', 'Ranking', 'Statistics'],
    url: '/popularity',
  },
  'popular-names': {
    id: 'popular-names',
    title: 'Popular Names',
    description: 'The most popular baby names chosen by parents worldwide.',
    parent: 'names-by-popularity',
    level: 2,
    pillar: true,
    children: ['popular-boy-names', 'popular-girl-names', 'popular-names-usa', 'popular-names-uk', 'popular-names-pakistan', 'popular-names-india'],
    entities: ['Popular', 'Top', 'Favorite', 'Common', 'Widely-used'],
    url: '/popularity',
  },
  'trending-names': {
    id: 'trending-names',
    title: 'Trending Names',
    description: 'Baby names that are rising in popularity and becoming fashionable.',
    parent: 'names-by-popularity',
    level: 2,
    pillar: true,
    children: ['trending-boy-names', 'trending-girl-names', 'rising-names', 'new-trends'],
    entities: ['Trending', 'Rising', 'Fashionable', 'Popular', 'Viral'],
    url: '/trending-names',
  },

  // === LETTER CLUSTERS ===
  'names-by-letter': {
    id: 'names-by-letter',
    title: 'Names by Letter',
    description: 'Baby names organized alphabetically by first letter.',
    parent: 'baby-names',
    level: 1,
    pillar: true,
    children: [
      'names-starting-with-a', 'names-starting-with-b', 'names-starting-with-c',
      'names-starting-with-d', 'names-starting-with-e', 'names-starting-with-f',
      'names-starting-with-g', 'names-starting-with-h', 'names-starting-with-i',
      'names-starting-with-j', 'names-starting-with-k', 'names-starting-with-l',
      'names-starting-with-m', 'names-starting-with-n', 'names-starting-with-o',
      'names-starting-with-p', 'names-starting-with-q', 'names-starting-with-r',
      'names-starting-with-s', 'names-starting-with-t', 'names-starting-with-u',
      'names-starting-with-v', 'names-starting-with-w', 'names-starting-with-x',
      'names-starting-with-y', 'names-starting-with-z',
    ],
    entities: ['Alphabet', 'Letter', 'A-Z', 'Initial'],
    url: '/names-by-letter',
  },

  // === MEANING CLUSTERS ===
  'names-by-meaning': {
    id: 'names-by-meaning',
    title: 'Names by Meaning',
    description: 'Baby names organized by their meanings and semantic categories.',
    parent: 'baby-names',
    level: 1,
    pillar: true,
    children: [
      'names-meaning-strength', 'names-meaning-love', 'names-meaning-peace',
      'names-meaning-wisdom', 'names-meaning-beauty', 'names-meaning-grace',
      'names-meaning-gift', 'names-meaning-light', 'names-meaning-hope',
      'names-meaning-joy', 'names-meaning-faith', 'names-meaning-power',
      'names-meaning-king', 'names-meaning-queen', 'names-meaning-warrior',
      'names-meaning-protector', 'names-meaning-blessing', 'names-meaning-star',
      'names-meaning-moon', 'names-meaning-sun', 'names-meaning-river',
      'names-meaning-mountain', 'names-meaning-garden', 'names-meaning-heaven',
    ],
    entities: ['Meaning', 'Semantic', 'Definition', 'Concept'],
    url: '/names-by-meaning',
  },

  // === CULTURE CLUSTERS ===
  'names-by-culture': {
    id: 'names-by-culture',
    title: 'Names by Culture',
    description: 'Baby names organized by cultural traditions and heritage.',
    parent: 'baby-names',
    level: 1,
    pillar: true,
    children: [
      'american-names', 'british-names', 'french-names', 'spanish-names',
      'italian-names', 'german-names', 'russian-names', 'chinese-names',
      'japanese-names', 'korean-names', 'turkish-names', 'persian-names',
      'arabic-names', 'indian-names', 'pakistani-names', 'african-names',
    ],
    entities: ['Culture', 'Heritage', 'Tradition', 'Country', 'Ethnicity'],
    url: '/languages',
  },

  // === ERA CLUSTERS ===
  'names-by-era': {
    id: 'names-by-era',
    title: 'Names by Era',
    description: 'Baby names organized by historical periods and time periods.',
    parent: 'baby-names',
    level: 1,
    pillar: true,
    children: ['ancient-names', 'medieval-names', 'victorian-names', '1920s-names', '1950s-names', '1980s-names', '2000s-names', 'modern-names-era'],
    entities: ['Era', 'History', 'Period', 'Decade', 'Century'],
    url: '/names-by-meaning',
  },

  // === LANGUAGE CLUSTERS ===
  'names-by-language': {
    id: 'names-by-language',
    title: 'Names by Language',
    description: 'Baby names organized by language families and linguistic traditions.',
    parent: 'baby-names',
    level: 1,
    pillar: true,
    children: [
      'semitic-names', 'indo-european-names', 'dravidian-names',
      'turkic-names', 'afroasiatic-names', 'sinitic-names',
    ],
    entities: ['Language', 'Linguistics', 'Family', 'Dialect'],
    url: '/languages',
  },
};

// ============================================================
// 2. ENTITY KNOWLEDGE GRAPH
// ============================================================
// Every name is connected to entities. Entities form a semantic graph.

export const ENTITY_TYPES = {
  RELIGION: 'religion',
  ORIGIN: 'origin',
  LANGUAGE: 'language',
  COUNTRY: 'country',
  THEME: 'theme',
  MEANING: 'meaning',
  LETTER: 'letter',
  GENDER: 'gender',
  CULTURE: 'culture',
  ERA: 'era',
  PROFESSION: 'profession',
  PERSONALITY: 'personality',
  NUMEROLOGY: 'numerology',
  ZODIAC: 'zodiac',
  PLANET: 'planet',
  ELEMENT: 'element',
  COLOR: 'color',
  STONE: 'stone',
  METAL: 'metal',
  DAY: 'day',
  BODY: 'body',
  NATURE: 'nature',
  FLOWER: 'flower',
  ANIMAL: 'animal',
  VIRTUE: 'virtue',
  ROYAL: 'royal',
  HISTORICAL: 'historical',
  MYTHOLOGICAL: 'mythological',
  BIBLICAL: 'biblical',
  QURANIC: 'quranic',
  VEDIC: 'vedic',
};

export const ENTITY_RELATIONSHIPS = {
  // === RELIGION ENTITIES ===
  'islam': {
    type: ENTITY_TYPES.RELIGION,
    label: 'Islam',
    description: 'Monotheistic Abrahamic religion based on the Quran',
    relatedEntities: ['quran', 'muhammad', 'arabic', 'mecca', 'medina', 'islamic-culture'],
    url: '/names/religion/islamic/1',
  },
  'christianity': {
    type: ENTITY_TYPES.RELIGION,
    label: 'Christianity',
    description: 'Monotheistic Abrahamic religion based on the Bible and teachings of Jesus',
    relatedEntities: ['bible', 'jesus', 'hebrew', 'greek', 'church'],
    url: '/names/religion/christian/1',
  },
  'hinduism': {
    type: ENTITY_TYPES.RELIGION,
    label: 'Hinduism',
    description: 'Ancient Indian religion based on the Vedas and diverse traditions',
    relatedEntities: ['veda', 'sanskrit', 'india', 'deity', 'goddess'],
    url: '/names/religion/hindu/1',
  },
  'judaism': {
    type: ENTITY_TYPES.RELIGION,
    label: 'Judaism',
    description: 'Monotheistic Abrahamic religion of the Jewish people',
    relatedEntities: ['torah', 'hebrew', 'israel', 'synagogue', 'rabbi'],
    url: '/names/religion/christian/1',
  },
  'buddhism': {
    type: ENTITY_TYPES.RELIGION,
    label: 'Buddhism',
    description: 'Dharmic religion based on the teachings of Buddha',
    relatedEntities: ['buddha', 'dharma', 'sanskrit', 'asia', 'meditation'],
    url: '/names/religion/hindu/1',
  },
  'sikhism': {
    type: ENTITY_TYPES.RELIGION,
    label: 'Sikhism',
    description: 'Monotheistic religion founded in Punjab, India',
    relatedEntities: ['guru', 'punjab', 'india', 'gurdwara', 'khalsa'],
    url: '/names/religion/hindu/1',
  },

  // === SACRED TEXTS ===
  'quran': {
    type: ENTITY_TYPES.QURANIC,
    label: 'Quran',
    description: 'The central religious text of Islam',
    relatedEntities: ['islam', 'arabic', 'muhammad', 'revelation', 'allah'],
    url: '/names/islamic/categories/quranic/1',
  },
  'bible': {
    type: ENTITY_TYPES.BIBLICAL,
    label: 'Bible',
    description: 'The sacred scripture of Christianity',
    relatedEntities: ['christianity', 'hebrew', 'greek', 'jesus', 'old-testament', 'new-testament'],
    url: '/names/christian/categories/biblical/1',
  },
  'veda': {
    type: ENTITY_TYPES.VEDIC,
    label: 'Vedas',
    description: 'Ancient sacred texts of Hinduism',
    relatedEntities: ['hinduism', 'sanskrit', 'india', 'rigveda', 'upanishad'],
    url: '/names/hindu/categories/vedic/1',
  },
  'torah': {
    type: ENTITY_TYPES.BIBLICAL,
    label: 'Torah',
    description: 'The central reference of Judaism',
    relatedEntities: ['judaism', 'hebrew', 'moses', 'israel', 'pentateuch'],
    url: '/names/christian/categories/biblical/1',
  },

  // === PROPHETS & FIGURES ===
  'muhammad': {
    type: ENTITY_TYPES.RELIGION,
    label: 'Prophet Muhammad ﷺ',
    description: 'The final prophet in Islam',
    relatedEntities: ['islam', 'quran', 'mecca', 'medina', 'arabic', 'sunnah'],
    url: '/names/islamic/muhammad',
  },
  'jesus': {
    type: ENTITY_TYPES.BIBLICAL,
    label: 'Jesus Christ',
    description: 'The central figure of Christianity',
    relatedEntities: ['christianity', 'bible', 'messiah', 'salvation', 'gospel'],
    url: '/names/christian/jesus',
  },
  'moses': {
    type: ENTITY_TYPES.BIBLICAL,
    label: 'Moses',
    description: 'Prophet who led the Israelites out of Egypt',
    relatedEntities: ['judaism', 'torah', 'israel', 'egypt', 'ten-commandments'],
    url: '/names/christian/moses',
  },
  'buddha': {
    type: ENTITY_TYPES.RELIGION,
    label: 'Buddha',
    description: 'The enlightened teacher who founded Buddhism',
    relatedEntities: ['buddhism', 'dharma', 'enlightenment', 'asia', 'meditation'],
    url: '/names/hindu/buddha',
  },

  // === LANGUAGES ===
  'arabic': {
    type: ENTITY_TYPES.LANGUAGE,
    label: 'Arabic',
    description: 'Semitic language of the Arab world and the Quran',
    relatedEntities: ['islam', 'quran', 'semitic', 'middle-east', 'arab'],
    url: '/names/islamic/origin/arabic/1',
  },
  'hebrew': {
    type: ENTITY_TYPES.LANGUAGE,
    label: 'Hebrew',
    description: 'Semitic language of the Jewish people and the Bible',
    relatedEntities: ['judaism', 'bible', 'israel', 'semitic', 'torah'],
    url: '/names/christian/origin/hebrew/1',
  },
  'sanskrit': {
    type: ENTITY_TYPES.LANGUAGE,
    label: 'Sanskrit',
    description: 'Ancient Indo-Aryan language of the Vedas and Hindu scriptures',
    relatedEntities: ['hinduism', 'veda', 'india', 'indo-aryan', 'devanagari'],
    url: '/names/hindu/origin/sanskrit/1',
  },
  'greek': {
    type: ENTITY_TYPES.LANGUAGE,
    label: 'Greek',
    description: 'Hellenic language of ancient Greece and the New Testament',
    relatedEntities: ['greece', 'hellenic', 'bible', 'mythology', 'indo-european'],
    url: '/names/christian/origin/greek/1',
  },
  'latin': {
    type: ENTITY_TYPES.LANGUAGE,
    label: 'Latin',
    description: 'Classical language of ancient Rome and the Roman Catholic Church',
    relatedEntities: ['rome', 'roman', 'italic', 'church', 'indo-european'],
    url: '/names/christian/origin/latin/1',
  },
  'persian': {
    type: ENTITY_TYPES.LANGUAGE,
    label: 'Persian',
    description: 'Iranian language of Persia with rich poetic tradition',
    relatedEntities: ['iran', 'persia', 'farsi', 'poetry', 'indo-iranian'],
    url: '/names/islamic/origin/persian/1',
  },
  'turkish': {
    type: ENTITY_TYPES.LANGUAGE,
    label: 'Turkish',
    description: 'Turkic language of Turkey with Ottoman heritage',
    relatedEntities: ['turkey', 'turkic', 'ottoman', 'anatolia', 'eurasian'],
    url: '/names/islamic/origin/turkish/1',
  },
  'urdu': {
    type: ENTITY_TYPES.LANGUAGE,
    label: 'Urdu',
    description: 'Indo-Aryan language of Pakistan and parts of India',
    relatedEntities: ['pakistan', 'india', 'indo-aryan', 'islam', 'south-asia'],
    url: '/names/islamic/origin/urdu/1',
  },
  'english': {
    type: ENTITY_TYPES.LANGUAGE,
    label: 'English',
    description: 'Germanic language originating in England, now global lingua franca',
    relatedEntities: ['britain', 'america', 'germanic', 'anglo-saxon', 'global'],
    url: '/names/christian/origin/english/1',
  },

  // === COUNTRIES ===
  'saudi-arabia': {
    type: ENTITY_TYPES.COUNTRY,
    label: 'Saudi Arabia',
    description: 'Middle Eastern country, birthplace of Islam',
    relatedEntities: ['arabic', 'islam', 'mecca', 'medina', 'middle-east'],
    url: '/names/islamic/origin/arabic/1',
  },
  'pakistan': {
    type: ENTITY_TYPES.COUNTRY,
    label: 'Pakistan',
    description: 'South Asian country with rich Islamic naming traditions',
    relatedEntities: ['urdu', 'islam', 'south-asia', 'punjab', 'sindh'],
    url: '/names/islamic/origin/urdu/1',
  },
  'india': {
    type: ENTITY_TYPES.COUNTRY,
    label: 'India',
    description: 'South Asian country with diverse Hindu, Muslim, and Sikh naming traditions',
    relatedEntities: ['hinduism', 'sanskrit', 'hindi', 'islam', 'sikhism'],
    url: '/names/hindu/origin/sanskrit/1',
  },
  'united-states': {
    type: ENTITY_TYPES.COUNTRY,
    label: 'United States',
    description: 'North American country with diverse multicultural naming traditions',
    relatedEntities: ['english', 'american', 'north-america', 'multicultural', 'global'],
    url: '/names/christian/origin/english/1',
  },
  'united-kingdom': {
    type: ENTITY_TYPES.COUNTRY,
    label: 'United Kingdom',
    description: 'European country with English, Scottish, Welsh, and Irish naming traditions',
    relatedEntities: ['english', 'british', 'europe', 'anglo-saxon', 'celtic'],
    url: '/names/christian/origin/english/1',
  },
  'turkey': {
    type: ENTITY_TYPES.COUNTRY,
    label: 'Turkey',
    description: 'Eurasian country bridging Europe and Asia with Turkic naming traditions',
    relatedEntities: ['turkish', 'turkic', 'ottoman', 'anatolia', 'eurasia'],
    url: '/names/islamic/origin/turkish/1',
  },
  'iran': {
    type: ENTITY_TYPES.COUNTRY,
    label: 'Iran',
    description: 'Middle Eastern country with Persian naming traditions',
    relatedEntities: ['persian', 'farsi', 'middle-east', 'persia', 'indo-iranian'],
    url: '/names/islamic/origin/persian/1',
  },
  'egypt': {
    type: ENTITY_TYPES.COUNTRY,
    label: 'Egypt',
    description: 'North African country with Arabic and ancient Egyptian naming traditions',
    relatedEntities: ['arabic', 'africa', 'middle-east', 'pharaoh', 'nile'],
    url: '/names/islamic/origin/arabic/1',
  },
  'bangladesh': {
    type: ENTITY_TYPES.COUNTRY,
    label: 'Bangladesh',
    description: 'South Asian country with Bengali Muslim naming traditions',
    relatedEntities: ['bengali', 'islam', 'south-asia', 'dhaka', 'indo-aryan'],
    url: '/names/islamic/origin/arabic/1',
  },
  'indonesia': {
    type: ENTITY_TYPES.COUNTRY,
    label: 'Indonesia',
    description: 'Southeast Asian country with the world\'s largest Muslim population',
    relatedEntities: ['malay', 'islam', 'southeast-asia', 'javanese', 'archipelago'],
    url: '/names/islamic/origin/arabic/1',
  },
  'nigeria': {
    type: ENTITY_TYPES.COUNTRY,
    label: 'Nigeria',
    description: 'West African country with diverse Yoruba, Igbo, and Hausa naming traditions',
    relatedEntities: ['africa', 'yoruba', 'igbo', 'hausa', 'west-africa'],
    url: '/names/christian/origin/african/1',
  },

  // === MEANING CONCEPTS ===
  'praiseworthy': {
    type: ENTITY_TYPES.MEANING,
    label: 'Praiseworthy',
    description: 'A quality worthy of praise and admiration',
    relatedEntities: ['virtue', 'strength', 'honor', 'glory', 'excellence'],
    url: '/names-by-meaning',
  },
  'strength': {
    type: ENTITY_TYPES.VIRTUE,
    label: 'Strength',
    description: 'The quality of being strong and powerful',
    relatedEntities: ['power', 'warrior', 'courage', 'bravery', 'might'],
    url: '/names-by-meaning',
  },
  'love': {
    type: ENTITY_TYPES.VIRTUE,
    label: 'Love',
    description: 'Deep affection and care for others',
    relatedEntities: ['affection', 'compassion', 'kindness', 'devotion', 'heart'],
    url: '/names-by-meaning',
  },
  'peace': {
    type: ENTITY_TYPES.VIRTUE,
    label: 'Peace',
    description: 'Freedom from conflict and tranquility',
    relatedEntities: ['calm', 'serenity', 'harmony', 'tranquility', 'rest'],
    url: '/names-by-meaning',
  },
  'wisdom': {
    type: ENTITY_TYPES.VIRTUE,
    label: 'Wisdom',
    description: 'The quality of having knowledge and good judgment',
    relatedEntities: ['knowledge', 'intelligence', 'insight', 'understanding', 'learning'],
    url: '/names-by-meaning',
  },
  'beauty': {
    type: ENTITY_TYPES.VIRTUE,
    label: 'Beauty',
    description: 'The quality of being aesthetically pleasing',
    relatedEntities: ['grace', 'elegance', 'charm', 'loveliness', 'splendor'],
    url: '/names-by-meaning',
  },
  'grace': {
    type: ENTITY_TYPES.VIRTUE,
    label: 'Grace',
    description: 'Elegance and divine favor',
    relatedEntities: ['beauty', 'elegance', 'favor', 'blessing', 'mercy'],
    url: '/names-by-meaning',
  },
  'light': {
    type: ENTITY_TYPES.MEANING,
    label: 'Light',
    description: 'Illumination and brightness',
    relatedEntities: ['sun', 'moon', 'star', 'radiance', 'shine'],
    url: '/names-by-meaning',
  },
  'gift': {
    type: ENTITY_TYPES.MEANING,
    label: 'Gift',
    description: 'Something given freely, a blessing',
    relatedEntities: ['blessing', 'present', 'offering', 'grace', 'favor'],
    url: '/names-by-meaning',
  },
  'hope': {
    type: ENTITY_TYPES.VIRTUE,
    label: 'Hope',
    description: 'Optimism and expectation for the future',
    relatedEntities: ['faith', 'trust', 'optimism', 'aspiration', 'dream'],
    url: '/names-by-meaning',
  },
  'faith': {
    type: ENTITY_TYPES.VIRTUE,
    label: 'Faith',
    description: 'Complete trust and confidence in something',
    relatedEntities: ['belief', 'trust', 'devotion', 'religion', 'conviction'],
    url: '/names-by-meaning',
  },
  'joy': {
    type: ENTITY_TYPES.VIRTUE,
    label: 'Joy',
    description: 'Feeling of great happiness and delight',
    relatedEntities: ['happiness', 'delight', 'gladness', 'cheer', 'bliss'],
    url: '/names-by-meaning',
  },
  'power': {
    type: ENTITY_TYPES.MEANING,
    label: 'Power',
    description: 'The ability to influence or control',
    relatedEntities: ['strength', 'authority', 'might', 'force', 'dominion'],
    url: '/names-by-meaning',
  },
  'king': {
    type: ENTITY_TYPES.ROYAL,
    label: 'King',
    description: 'A male monarch or ruler',
    relatedEntities: ['royal', 'queen', 'prince', 'ruler', 'monarch'],
    url: '/names-by-meaning',
  },
  'queen': {
    type: ENTITY_TYPES.ROYAL,
    label: 'Queen',
    description: 'A female monarch or ruler',
    relatedEntities: ['royal', 'king', 'princess', 'ruler', 'monarch'],
    url: '/names-by-meaning',
  },
  'warrior': {
    type: ENTITY_TYPES.PROFESSION,
    label: 'Warrior',
    description: 'A person skilled in combat or warfare',
    relatedEntities: ['strength', 'courage', 'battle', 'fighter', 'hero'],
    url: '/names-by-meaning',
  },
  'protector': {
    type: ENTITY_TYPES.PROFESSION,
    label: 'Protector',
    description: 'One who guards or defends others',
    relatedEntities: ['guardian', 'defender', 'shield', 'safety', 'strength'],
    url: '/names-by-meaning',
  },
  'blessing': {
    type: ENTITY_TYPES.MEANING,
    label: 'Blessing',
    description: 'A gift from the divine, something beneficial',
    relatedEntities: ['gift', 'grace', 'favor', 'mercy', 'divine'],
    url: '/names-by-meaning',
  },
  'star': {
    type: ENTITY_TYPES.NATURE,
    label: 'Star',
    description: 'A luminous celestial body',
    relatedEntities: ['sky', 'moon', 'sun', 'celestial', 'light'],
    url: '/names-by-meaning',
  },
  'moon': {
    type: ENTITY_TYPES.NATURE,
    label: 'Moon',
    description: 'Earth\'s natural satellite',
    relatedEntities: ['sky', 'star', 'night', 'celestial', 'lunar'],
    url: '/names-by-meaning',
  },
  'sun': {
    type: ENTITY_TYPES.NATURE,
    label: 'Sun',
    description: 'The star at the center of our solar system',
    relatedEntities: ['light', 'sky', 'star', 'solar', 'day'],
    url: '/names-by-meaning',
  },
  'river': {
    type: ENTITY_TYPES.NATURE,
    label: 'River',
    description: 'A natural flowing watercourse',
    relatedEntities: ['water', 'nature', 'stream', 'flow', 'ocean'],
    url: '/names-by-meaning',
  },
  'mountain': {
    type: ENTITY_TYPES.NATURE,
    label: 'Mountain',
    description: 'A large natural elevation of the earth\'s surface',
    relatedEntities: ['nature', 'earth', 'peak', 'summit', 'landscape'],
    url: '/names-by-meaning',
  },
  'garden': {
    type: ENTITY_TYPES.NATURE,
    label: 'Garden',
    description: 'A cultivated area for plants and flowers',
    relatedEntities: ['nature', 'flower', 'plant', 'paradise', 'beauty'],
    url: '/names-by-meaning',
  },
  'heaven': {
    type: ENTITY_TYPES.MEANING,
    label: 'Heaven',
    description: 'The divine realm or paradise',
    relatedEntities: ['divine', 'paradise', 'sky', 'angel', 'eternal'],
    url: '/names-by-meaning',
  },

  // === NATURE ELEMENTS ===
  'water': {
    type: ENTITY_TYPES.ELEMENT,
    label: 'Water',
    description: 'The essential liquid element of life',
    relatedEntities: ['river', 'ocean', 'sea', 'rain', 'life'],
    url: '/names-by-meaning',
  },
  'fire': {
    type: ENTITY_TYPES.ELEMENT,
    label: 'Fire',
    description: 'The element of heat and light',
    relatedEntities: ['light', 'energy', 'passion', 'warmth', 'sun'],
    url: '/names-by-meaning',
  },
  'earth': {
    type: ENTITY_TYPES.ELEMENT,
    label: 'Earth',
    description: 'The solid ground and natural world',
    relatedEntities: ['nature', 'mountain', 'garden', 'soil', 'world'],
    url: '/names-by-meaning',
  },
  'air': {
    type: ENTITY_TYPES.ELEMENT,
    label: 'Air',
    description: 'The invisible gaseous element',
    relatedEntities: ['sky', 'wind', 'breath', 'spirit', 'atmosphere'],
    url: '/names-by-meaning',
  },

  // === FLOWERS ===
  'rose': {
    type: ENTITY_TYPES.FLOWER,
    label: 'Rose',
    description: 'A beautiful fragrant flower symbolizing love',
    relatedEntities: ['flower', 'love', 'beauty', 'garden', 'fragrance'],
    url: '/names-by-meaning',
  },
  'lily': {
    type: ENTITY_TYPES.FLOWER,
    label: 'Lily',
    description: 'An elegant flower symbolizing purity',
    relatedEntities: ['flower', 'purity', 'beauty', 'garden', 'white'],
    url: '/names-by-meaning',
  },
  'jasmine': {
    type: ENTITY_TYPES.FLOWER,
    label: 'Jasmine',
    description: 'A fragrant flower popular in Asian cultures',
    relatedEntities: ['flower', 'fragrance', 'asia', 'beauty', 'garden'],
    url: '/names-by-meaning',
  },
  'lotus': {
    type: ENTITY_TYPES.FLOWER,
    label: 'Lotus',
    description: 'A sacred flower in Eastern religions symbolizing purity',
    relatedEntities: ['flower', 'hinduism', 'buddhism', 'purity', 'enlightenment'],
    url: '/names-by-meaning',
  },

  // === ANIMALS ===
  'lion': {
    type: ENTITY_TYPES.ANIMAL,
    label: 'Lion',
    description: 'The king of beasts, symbol of courage and strength',
    relatedEntities: ['strength', 'courage', 'king', 'animal', 'power'],
    url: '/names-by-meaning',
  },
  'eagle': {
    type: ENTITY_TYPES.ANIMAL,
    label: 'Eagle',
    description: 'A majestic bird of prey symbolizing freedom',
    relatedEntities: ['bird', 'freedom', 'sky', 'strength', 'vision'],
    url: '/names-by-meaning',
  },
  'dove': {
    type: ENTITY_TYPES.ANIMAL,
    label: 'Dove',
    description: 'A bird symbolizing peace and purity',
    relatedEntities: ['peace', 'bird', 'purity', 'love', 'gentle'],
    url: '/names-by-meaning',
  },
  'wolf': {
    type: ENTITY_TYPES.ANIMAL,
    label: 'Wolf',
    description: 'A wild canine symbolizing loyalty and strength',
    relatedEntities: ['strength', 'loyalty', 'animal', 'wild', 'pack'],
    url: '/names-by-meaning',
  },

  // === COLORS ===
  'red': {
    type: ENTITY_TYPES.COLOR,
    label: 'Red',
    description: 'The color of passion, energy, and love',
    relatedEntities: ['color', 'passion', 'energy', 'love', 'fire'],
    url: '/names-by-meaning',
  },
  'white': {
    type: ENTITY_TYPES.COLOR,
    label: 'White',
    description: 'The color of purity, peace, and innocence',
    relatedEntities: ['color', 'purity', 'peace', 'innocence', 'light'],
    url: '/names-by-meaning',
  },
  'gold': {
    type: ENTITY_TYPES.COLOR,
    label: 'Gold',
    description: 'The color of wealth, success, and prestige',
    relatedEntities: ['color', 'wealth', 'success', 'royal', 'precious'],
    url: '/names-by-meaning',
  },
  'green': {
    type: ENTITY_TYPES.COLOR,
    label: 'Green',
    description: 'The color of nature, growth, and harmony',
    relatedEntities: ['color', 'nature', 'growth', 'harmony', 'life'],
    url: '/names-by-meaning',
  },
  'blue': {
    type: ENTITY_TYPES.COLOR,
    label: 'Blue',
    description: 'The color of sky, ocean, and tranquility',
    relatedEntities: ['color', 'sky', 'ocean', 'tranquility', 'peace'],
    url: '/names-by-meaning',
  },

  // === CULTURAL CONCEPTS ===
  'islamic-culture': {
    type: ENTITY_TYPES.CULTURE,
    label: 'Islamic Culture',
    description: 'The cultural traditions of Muslim societies worldwide',
    relatedEntities: ['islam', 'arabic', 'quran', 'mosque', 'ramadan'],
    url: '/islamic/boy-names',
  },
  'christian-culture': {
    type: ENTITY_TYPES.CULTURE,
    label: 'Christian Culture',
    description: 'The cultural traditions of Christian societies worldwide',
    relatedEntities: ['christianity', 'bible', 'church', 'jesus', 'saint'],
    url: '/christian/boy-names',
  },
  'hindu-culture': {
    type: ENTITY_TYPES.CULTURE,
    label: 'Hindu Culture',
    description: 'The cultural traditions of Hindu societies',
    relatedEntities: ['hinduism', 'sanskrit', 'veda', 'temple', 'festival'],
    url: '/hindu/boy-names',
  },
  'american-culture': {
    type: ENTITY_TYPES.CULTURE,
    label: 'American Culture',
    description: 'The diverse cultural traditions of the United States',
    relatedEntities: ['united-states', 'english', 'multicultural', 'global', 'diverse'],
    url: '/names/christian/origin/english/1',
  },
  'british-culture': {
    type: ENTITY_TYPES.CULTURE,
    label: 'British Culture',
    description: 'The cultural traditions of the United Kingdom',
    relatedEntities: ['united-kingdom', 'english', 'royal', 'celtic', 'europe'],
    url: '/names/christian/origin/english/1',
  },
};

// ============================================================
// 3. INTERNAL LINKING ARCHITECTURE
// ============================================================
// Every page must link to parent, children, siblings, and related entities.

export const LINKING_RULES = {
  // Every name page must link to these
  namePage: {
    parentTopic: true,       // Link to religion hub
    childTopics: false,      // Names don't have children
    siblingTopics: true,     // Link to same-letter, same-origin, same-meaning names
    relatedEntities: true,   // Link to entity pages
    religionHub: true,       // Link to /names/religion/{religion}/1
    originHub: true,         // Link to /names/{religion}/origin/{origin}/1
    letterHub: true,         // Link to /names/{religion}/letter/{letter}/1
    genderHub: true,         // Link to /{religion}/boy-names or girl-names
    meaningHub: true,        // Link to /names-by-meaning
    popularityHub: true,     // Link to /popularity
    trendingHub: true,       // Link to /trending-names
    uniqueHub: true,         // Link to /unique-names
    searchHub: true,         // Link to /search
    blogHub: true,           // Link to /blog
    guidesHub: true,         // Link to /guides
    relatedNames: true,      // Link to similar names
    siblingNames: true,      // Link to sibling name suggestions
    middleNames: true,       // Link to middle name suggestions
    faqSection: true,        // FAQ section with internal links
    breadcrumbs: true,       // Breadcrumb navigation
    prevNext: true,          // Previous/next name navigation
  },

  // Every collection page must link to these
  collectionPage: {
    parentTopic: true,       // Link to parent hub
    childTopics: true,       // Link to sub-collections
    siblingTopics: true,     // Link to sibling collections
    relatedEntities: true,   // Link to entity pages
    pagination: true,        // Page 1, 2, 3...
    featuredNames: true,     // Link to top names in collection
    randomNames: true,       // Link to random names
    searchHub: true,         // Link to /search
    blogHub: true,           // Link to /blog
    breadcrumbs: true,       // Breadcrumb navigation
  },

  // Every hub/pillar page must link to these
  hubPage: {
    parentTopic: true,       // Link to parent hub
    childTopics: true,       // Link to all sub-hubs
    siblingTopics: true,     // Link to sibling hubs
    relatedEntities: true,   // Link to entity pages
    featuredContent: true,   // Link to best content
    popularContent: true,    // Link to popular content
    recentContent: true,     // Link to recent content
    allContent: true,        // Link to full collection
    searchHub: true,         // Link to /search
    blogHub: true,           // Link to /blog
    guidesHub: true,         // Link to /guides
    breadcrumbs: true,       // Breadcrumb navigation
    tableOfContents: true,   // TOC with internal links
    relatedHubs: true,       // Link to related hubs
  },
};

// ============================================================
// 4. CONTENT HUB DEFINITIONS
// ============================================================

export const CONTENT_HUBS = {
  'islamic-names-hub': {
    id: 'islamic-names-hub',
    title: 'Islamic Names Hub',
    description: 'Complete resource for Islamic baby names with meanings, origins, and cultural significance.',
    type: 'religion',
    pillar: 'islamic-names',
    sections: [
      { type: 'overview', title: 'About Islamic Names' },
      { type: 'popular', title: 'Popular Islamic Names' },
      { type: 'by-gender', title: 'Islamic Names by Gender' },
      { type: 'by-origin', title: 'Islamic Names by Origin' },
      { type: 'by-letter', title: 'Islamic Names by Letter' },
      { type: 'by-meaning', title: 'Islamic Names by Meaning' },
      { type: 'quranic', title: 'Quranic Names' },
      { type: 'prophet', title: 'Names of the Prophet ﷺ' },
      { type: 'guides', title: 'Islamic Naming Guides' },
      { type: 'faq', title: 'Islamic Names FAQ' },
    ],
    internalLinks: [
      'christian-names-hub', 'hindu-names-hub',
      'arabic-names-hub', 'urdu-names-hub', 'persian-names-hub',
      'meaning-hub', 'origin-hub', 'pronunciation-hub',
    ],
  },
  'christian-names-hub': {
    id: 'christian-names-hub',
    title: 'Christian Names Hub',
    description: 'Complete resource for Christian baby names with biblical meanings and saint connections.',
    type: 'religion',
    pillar: 'christian-names',
    sections: [
      { type: 'overview', title: 'About Christian Names' },
      { type: 'popular', title: 'Popular Christian Names' },
      { type: 'by-gender', title: 'Christian Names by Gender' },
      { type: 'by-origin', title: 'Christian Names by Origin' },
      { type: 'by-letter', title: 'Christian Names by Letter' },
      { type: 'biblical', title: 'Biblical Names' },
      { type: 'saint', title: 'Saint Names' },
      { type: 'guides', title: 'Christian Naming Guides' },
      { type: 'faq', title: 'Christian Names FAQ' },
    ],
    internalLinks: [
      'islamic-names-hub', 'hindu-names-hub',
      'hebrew-names-hub', 'greek-names-hub', 'latin-names-hub',
      'meaning-hub', 'origin-hub', 'pronunciation-hub',
    ],
  },
  'hindu-names-hub': {
    id: 'hindu-names-hub',
    title: 'Hindu Names Hub',
    description: 'Complete resource for Hindu baby names with Sanskrit meanings and Vedic significance.',
    type: 'religion',
    pillar: 'hindu-names',
    sections: [
      { type: 'overview', title: 'About Hindu Names' },
      { type: 'popular', title: 'Popular Hindu Names' },
      { type: 'by-gender', title: 'Hindu Names by Gender' },
      { type: 'by-origin', title: 'Hindu Names by Origin' },
      { type: 'by-letter', title: 'Hindu Names by Letter' },
      { type: 'vedic', title: 'Vedic Names' },
      { type: 'deity', title: 'Names of Deities' },
      { type: 'guides', title: 'Hindu Naming Guides' },
      { type: 'faq', title: 'Hindu Names FAQ' },
    ],
    internalLinks: [
      'islamic-names-hub', 'christian-names-hub',
      'sanskrit-names-hub', 'indian-names-hub',
      'meaning-hub', 'origin-hub', 'pronunciation-hub',
    ],
  },
  'meaning-hub': {
    id: 'meaning-hub',
    title: 'Name Meanings Hub',
    description: 'Explore baby names by their meanings, from strength and love to wisdom and beauty.',
    type: 'meaning',
    pillar: 'names-by-meaning',
    sections: [
      { type: 'overview', title: 'About Name Meanings' },
      { type: 'by-category', title: 'Meanings by Category' },
      { type: 'popular', title: 'Most Popular Meanings' },
      { type: 'virtue', title: 'Virtue Names' },
      { type: 'nature', title: 'Nature Names' },
      { type: 'spiritual', title: 'Spiritual Names' },
      { type: 'faq', title: 'Name Meanings FAQ' },
    ],
    internalLinks: [
      'islamic-names-hub', 'christian-names-hub', 'hindu-names-hub',
      'origin-hub', 'pronunciation-hub', 'popularity-hub',
    ],
  },
  'origin-hub': {
    id: 'origin-hub',
    title: 'Name Origins Hub',
    description: 'Discover baby names by their linguistic and geographic origins.',
    type: 'origin',
    pillar: 'names-by-origin',
    sections: [
      { type: 'overview', title: 'About Name Origins' },
      { type: 'by-language', title: 'Origins by Language' },
      { type: 'by-region', title: 'Origins by Region' },
      { type: 'popular', title: 'Most Popular Origins' },
      { type: 'etymology', title: 'Etymology Guides' },
      { type: 'faq', title: 'Name Origins FAQ' },
    ],
    internalLinks: [
      'islamic-names-hub', 'christian-names-hub', 'hindu-names-hub',
      'meaning-hub', 'pronunciation-hub', 'popularity-hub',
    ],
  },
  'pronunciation-hub': {
    id: 'pronunciation-hub',
    title: 'Name Pronunciation Hub',
    description: 'Learn how to pronounce baby names correctly in multiple languages.',
    type: 'pronunciation',
    pillar: 'baby-names',
    sections: [
      { type: 'overview', title: 'About Name Pronunciation' },
      { type: 'by-language', title: 'Pronunciation by Language' },
      { type: 'by-origin', title: 'Pronunciation by Origin' },
      { type: 'ipa', title: 'IPA Pronunciation Guides' },
      { type: 'audio', title: 'Audio Pronunciations' },
      { type: 'faq', title: 'Pronunciation FAQ' },
    ],
    internalLinks: [
      'islamic-names-hub', 'christian-names-hub', 'hindu-names-hub',
      'meaning-hub', 'origin-hub', 'popularity-hub',
    ],
  },
  'popularity-hub': {
    id: 'popularity-hub',
    title: 'Name Popularity Hub',
    description: 'Track baby name popularity trends across countries and years.',
    type: 'popularity',
    pillar: 'names-by-popularity',
    sections: [
      { type: 'overview', title: 'About Name Popularity' },
      { type: 'by-country', title: 'Popularity by Country' },
      { type: 'by-year', title: 'Popularity by Year' },
      { type: 'trending', title: 'Trending Names' },
      { type: 'top-100', title: 'Top 100 Names' },
      { type: 'faq', title: 'Name Popularity FAQ' },
    ],
    internalLinks: [
      'islamic-names-hub', 'christian-names-hub', 'hindu-names-hub',
      'meaning-hub', 'origin-hub', 'pronunciation-hub',
    ],
  },
  'nickname-hub': {
    id: 'nickname-hub',
    title: 'Nickname Hub',
    description: 'Find the perfect nickname for any baby name.',
    type: 'nickname',
    pillar: 'baby-names',
    sections: [
      { type: 'overview', title: 'About Nicknames' },
      { type: 'by-name', title: 'Nicknames by Name' },
      { type: 'by-category', title: 'Nicknames by Category' },
      { type: 'popular', title: 'Popular Nicknames' },
      { type: 'faq', title: 'Nickname FAQ' },
    ],
    internalLinks: [
      'islamic-names-hub', 'christian-names-hub', 'hindu-names-hub',
      'meaning-hub', 'origin-hub',
    ],
  },
  'middle-name-hub': {
    id: 'middle-name-hub',
    title: 'Middle Name Hub',
    description: 'Find the perfect middle name to complement any first name.',
    type: 'middle-name',
    pillar: 'baby-names',
    sections: [
      { type: 'overview', title: 'About Middle Names' },
      { type: 'by-first-name', title: 'Middle Names by First Name' },
      { type: 'by-origin', title: 'Middle Names by Origin' },
      { type: 'popular', title: 'Popular Middle Names' },
      { type: 'faq', title: 'Middle Name FAQ' },
    ],
    internalLinks: [
      'islamic-names-hub', 'christian-names-hub', 'hindu-names-hub',
      'meaning-hub', 'origin-hub',
    ],
  },
  'sibling-name-hub': {
    id: 'sibling-name-hub',
    title: 'Sibling Name Hub',
    description: 'Find names that go well together for siblings.',
    type: 'sibling-name',
    pillar: 'baby-names',
    sections: [
      { type: 'overview', title: 'About Sibling Names' },
      { type: 'by-name', title: 'Sibling Names by Name' },
      { type: 'by-theme', title: 'Sibling Names by Theme' },
      { type: 'popular', title: 'Popular Sibling Sets' },
      { type: 'faq', title: 'Sibling Name FAQ' },
    ],
    internalLinks: [
      'islamic-names-hub', 'christian-names-hub', 'hindu-names-hub',
      'meaning-hub', 'origin-hub',
    ],
  },
  'name-comparison-hub': {
    id: 'name-comparison-hub',
    title: 'Name Comparison Hub',
    description: 'Compare baby names side by side to make the best choice.',
    type: 'comparison',
    pillar: 'baby-names',
    sections: [
      { type: 'overview', title: 'About Name Comparisons' },
      { type: 'popular', title: 'Popular Comparisons' },
      { type: 'by-category', title: 'Comparisons by Category' },
      { type: 'faq', title: 'Name Comparison FAQ' },
    ],
    internalLinks: [
      'islamic-names-hub', 'christian-names-hub', 'hindu-names-hub',
      'meaning-hub', 'origin-hub', 'popularity-hub',
    ],
  },
};

// ============================================================
// 5. PROGRAMMATIC PAGE GENERATION RULES
// ============================================================

export const PROGRAMMATIC_PAGES = {
  // US States - 50 pages
  usStates: {
    type: 'location',
    template: 'state',
    entities: ['united-states', 'american-culture'],
    pages: [
      'alabama', 'alaska', 'arizona', 'arkansas', 'california',
      'colorado', 'connecticut', 'delaware', 'florida', 'georgia',
      'hawaii', 'idaho', 'illinois', 'indiana', 'iowa',
      'kansas', 'kentucky', 'louisiana', 'maine', 'maryland',
      'massachusetts', 'michigan', 'minnesota', 'mississippi', 'missouri',
      'montana', 'nebraska', 'nevada', 'new-hampshire', 'new-jersey',
      'new-mexico', 'new-york', 'north-carolina', 'north-dakota', 'ohio',
      'oklahoma', 'oregon', 'pennsylvania', 'rhode-island', 'south-carolina',
      'south-dakota', 'tennessee', 'texas', 'utah', 'vermont',
      'virginia', 'washington', 'west-virginia', 'wisconsin', 'wyoming',
    ],
  },

  // Countries - major countries
  countries: {
    type: 'location',
    template: 'country',
    entities: ['country', 'culture'],
    pages: [
      'united-states', 'united-kingdom', 'canada', 'australia', 'new-zealand',
      'pakistan', 'india', 'bangladesh', 'sri-lanka', 'nepal',
      'saudi-arabia', 'uae', 'qatar', 'oman', 'kuwait',
      'turkey', 'iran', 'iraq', 'syria', 'jordan',
      'egypt', 'morocco', 'algeria', 'tunisia', 'libya',
      'nigeria', 'ghana', 'kenya', 'south-africa', 'ethiopia',
      'france', 'germany', 'italy', 'spain', 'portugal',
      'netherlands', 'sweden', 'norway', 'denmark', 'finland',
      'russia', 'china', 'japan', 'south-korea', 'indonesia',
      'malaysia', 'singapore', 'philippines', 'thailand', 'vietnam',
    ],
  },

  // Languages
  languages: {
    type: 'language',
    template: 'language',
    entities: ['language', 'linguistics'],
    pages: [
      'arabic', 'hebrew', 'sanskrit', 'greek', 'latin',
      'persian', 'turkish', 'urdu', 'hindi', 'bengali',
      'english', 'french', 'spanish', 'german', 'italian',
      'russian', 'chinese', 'japanese', 'korean', 'tamil',
      'telugu', 'marathi', 'gujarati', 'punjabi', 'pashto',
      'swahili', 'yoruba', 'igbo', 'hausa', 'amharic',
    ],
  },

  // Religions
  religions: {
    type: 'religion',
    template: 'religion',
    entities: ['religion', 'faith', 'spirituality'],
    pages: [
      'islamic', 'christian', 'hindu', 'jewish', 'buddhist',
      'sikh', 'jain', 'bahai', 'zoroastrian', 'indigenous',
    ],
  },

  // Letters A-Z
  letters: {
    type: 'letter',
    template: 'letter',
    entities: ['alphabet', 'letter'],
    pages: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
  },

  // Themes
  themes: {
    type: 'theme',
    template: 'theme',
    entities: ['theme', 'concept', 'inspiration'],
    pages: [
      'nature', 'flower', 'animal', 'virtue', 'royal',
      'vintage', 'modern', 'unique', 'rare', 'short',
      'long', 'classical', 'traditional', 'religious', 'spiritual',
      'strong', 'beautiful', 'peaceful', 'wise', 'brave',
      'creative', 'artistic', 'musical', 'literary', 'mythological',
    ],
  },

  // Meanings
  meanings: {
    type: 'meaning',
    template: 'meaning',
    entities: ['meaning', 'semantic', 'concept'],
    pages: [
      'strength', 'love', 'peace', 'wisdom', 'beauty',
      'grace', 'gift', 'light', 'hope', 'faith',
      'joy', 'power', 'king', 'queen', 'warrior',
      'protector', 'blessing', 'star', 'moon', 'sun',
      'river', 'mountain', 'garden', 'heaven', 'angel',
      'crown', 'victory', 'courage', 'honor', 'glory',
    ],
  },

  // Popularity years
  years: {
    type: 'popularity',
    template: 'year',
    entities: ['popularity', 'trending', 'statistics'],
    pages: Array.from({ length: 26 }, (_, i) => String(2000 + i)), // 2000-2025
  },

  // Genders
  genders: {
    type: 'gender',
    template: 'gender',
    entities: ['gender', 'male', 'female'],
    pages: ['boy', 'girl', 'unisex'],
  },

  // Cultures
  cultures: {
    type: 'culture',
    template: 'culture',
    entities: ['culture', 'heritage', 'tradition'],
    pages: [
      'american', 'british', 'french', 'spanish', 'italian',
      'german', 'russian', 'chinese', 'japanese', 'korean',
      'turkish', 'persian', 'arab', 'indian', 'pakistani',
      'bengali', 'african', 'latin-american', 'caribbean', 'pacific-islander',
    ],
  },
};

// ============================================================
// 6. CRAWL STRATEGY
// ============================================================

export const CRAWL_STRATEGY = {
  // Priority levels for crawl budget optimization
  priorityLevels: {
    critical: 1.0,   // Homepage, major hubs
    high: 0.9,       // Religion hubs, gender pages
    medium: 0.8,     // Name pages, origin pages, letter pages
    low: 0.6,        // Paginated pages (page 2+)
    minimal: 0.3,    // Thin or low-value pages
  },

  // Crawl frequency recommendations
  crawlFrequency: {
    homepage: 'hourly',
    hubPages: 'daily',
    namePages: 'weekly',
    collectionPages: 'weekly',
    blogPosts: 'weekly',
    paginatedPages: 'monthly',
    staticPages: 'monthly',
  },

  // Sitemap organization
  sitemapGroups: [
    { name: 'pages', priority: 1.0, changefreq: 'weekly' },
    { name: 'gender', priority: 0.9, changefreq: 'weekly' },
    { name: 'religion', priority: 0.9, changefreq: 'weekly' },
    { name: 'names', priority: 0.8, changefreq: 'weekly' },
    { name: 'blog', priority: 0.8, changefreq: 'weekly' },
    { name: 'origin', priority: 0.7, changefreq: 'weekly' },
    { name: 'letter', priority: 0.7, changefreq: 'weekly' },
    { name: 'category', priority: 0.7, changefreq: 'weekly' },
    { name: 'popularity', priority: 0.7, changefreq: 'weekly' },
    { name: 'meaning', priority: 0.7, changefreq: 'weekly' },
    { name: 'story', priority: 0.6, changefreq: 'monthly' },
  ],

  // Pages that should be noindex
  noindexPatterns: [
    '/search/',
    '/my-names/',
    '/api/',
    '?page=',
    '?sort=',
    '?filter=',
  ],
};

// ============================================================
// 7. NAVIGATION ARCHITECTURE
// ============================================================

export const NAVIGATION = {
  // Main navigation
  main: [
    { label: 'Home', href: '/', icon: 'Home' },
    { label: 'Islamic Names', href: '/islamic/boy-names', children: [
      { label: 'Boy Names', href: '/islamic/boy-names' },
      { label: 'Girl Names', href: '/islamic/girl-names' },
      { label: 'Quranic Names', href: '/names/islamic/categories/quranic/1' },
      { label: 'Arabic Names', href: '/names/islamic/origin/arabic/1' },
      { label: 'Urdu Names', href: '/names/islamic/origin/urdu/1' },
      { label: 'Persian Names', href: '/names/islamic/origin/persian/1' },
    ]},
    { label: 'Christian Names', href: '/christian/boy-names', children: [
      { label: 'Boy Names', href: '/christian/boy-names' },
      { label: 'Girl Names', href: '/christian/girl-names' },
      { label: 'Biblical Names', href: '/names/christian/categories/biblical/1' },
      { label: 'Hebrew Names', href: '/names/christian/origin/hebrew/1' },
      { label: 'Greek Names', href: '/names/christian/origin/greek/1' },
      { label: 'Latin Names', href: '/names/christian/origin/latin/1' },
    ]},
    { label: 'Hindu Names', href: '/hindu/boy-names', children: [
      { label: 'Boy Names', href: '/hindu/boy-names' },
      { label: 'Girl Names', href: '/hindu/girl-names' },
      { label: 'Sanskrit Names', href: '/names/hindu/origin/sanskrit/1' },
      { label: 'Vedic Names', href: '/names/hindu/categories/vedic/1' },
    ]},
    { label: 'By Meaning', href: '/names-by-meaning' },
    { label: 'By Origin', href: '/names-by-origin' },
    { label: 'Popularity', href: '/popularity' },
    { label: 'Trending', href: '/trending-names' },
    { label: 'Unique', href: '/unique-names' },
    { label: 'Blog', href: '/blog' },
    { label: 'Guides', href: '/guides/expert-naming-guide' },
  ],

  // Footer navigation
  footer: {
    columns: [
      {
        title: 'By Religion',
        links: [
          { label: 'Islamic Names', href: '/islamic/boy-names' },
          { label: 'Christian Names', href: '/christian/boy-names' },
          { label: 'Hindu Names', href: '/hindu/boy-names' },
          { label: 'Biblical Names', href: '/names/christian/categories/biblical/1' },
          { label: 'Quranic Names', href: '/names/islamic/categories/quranic/1' },
        ],
      },
      {
        title: 'By Origin',
        links: [
          { label: 'Arabic Names', href: '/names/islamic/origin/arabic/1' },
          { label: 'Hebrew Names', href: '/names/christian/origin/hebrew/1' },
          { label: 'Sanskrit Names', href: '/names/hindu/origin/sanskrit/1' },
          { label: 'Persian Names', href: '/names/islamic/origin/persian/1' },
          { label: 'Turkish Names', href: '/names/islamic/origin/turkish/1' },
          { label: 'Urdu Names', href: '/names/islamic/origin/urdu/1' },
          { label: 'English Names', href: '/names/christian/origin/english/1' },
          { label: 'Greek Names', href: '/names/christian/origin/greek/1' },
        ],
      },
      {
        title: 'By Theme',
        links: [
          { label: 'Nature Names', href: '/names/islamic/categories/nature/1' },
          { label: 'Virtue Names', href: '/names-by-meaning' },
          { label: 'Royal Names', href: '/names/islamic/categories/royal/1' },
          { label: 'Modern Names', href: '/names/islamic/categories/modern/1' },
          { label: 'Unique Names', href: '/unique-names' },
          { label: 'Trending Names', href: '/trending-names' },
          { label: 'Popular Names', href: '/popularity' },
        ],
      },
      {
        title: 'Resources',
        links: [
          { label: 'Name Meanings', href: '/name-meanings' },
          { label: 'Pronunciation Guide', href: '/names-by-meaning' },
          { label: 'Naming Guide', href: '/guides/expert-naming-guide' },
          { label: 'Blog', href: '/blog' },
          { label: 'Advanced Search', href: '/advanced-search' },
          { label: 'About Us', href: '/about' },
          { label: 'Privacy Policy', href: '/privacy' },
          { label: 'Terms of Service', href: '/terms' },
        ],
      },
    ],
  },

  // Breadcrumb templates
  breadcrumbs: {
    home: { label: 'Home', href: '/' },
    names: { label: 'Names', href: '/names' },
    'names-by-meaning': { label: 'Names by Meaning', href: '/names-by-meaning' },
    'names-by-origin': { label: 'Names by Origin', href: '/names-by-origin' },
    popularity: { label: 'Popularity', href: '/popularity' },
    'trending-names': { label: 'Trending Names', href: '/trending-names' },
    'unique-names': { label: 'Unique Names', href: '/unique-names' },
    blog: { label: 'Blog', href: '/blog' },
    guides: { label: 'Guides', href: '/guides/expert-naming-guide' },
    search: { label: 'Search', href: '/search' },
    'advanced-search': { label: 'Advanced Search', href: '/advanced-search' },
    about: { label: 'About', href: '/about' },
    privacy: { label: 'Privacy', href: '/privacy' },
    terms: { label: 'Terms', href: '/terms' },
  },
};

// ============================================================
// 8. USER JOURNEY PATHS
// ============================================================

export const USER_JOURNEYS = {
  // Discovery → Research → Compare → Decide → Share → Explore
  'discovery-to-decision': {
    name: 'Discovery to Decision',
    stages: [
      { stage: 'discovery', pages: ['/', '/trending-names', '/popularity', '/unique-names'], next: 'research' },
      { stage: 'research', pages: ['/names-by-meaning', '/names-by-origin', '/names/religion/{religion}/1'], next: 'compare' },
      { stage: 'compare', pages: ['/names/{religion}/{slug}', '/name-comparison'], next: 'decision' },
      { stage: 'decision', pages: ['/names/{religion}/{slug}', '/guides/expert-naming-guide'], next: 'share' },
      { stage: 'share', pages: ['/names/{religion}/{slug}'], next: 'explore' },
      { stage: 'explore', pages: ['/names/{religion}/letter/{letter}/1', '/names/{religion}/origin/{origin}/1', '/blog'], next: null },
    ],
  },

  'religion-exploration': {
    name: 'Religion-Based Exploration',
    stages: [
      { stage: 'choose-religion', pages: ['/names/religion'], next: 'browse-gender' },
      { stage: 'browse-gender', pages: ['/{religion}/boy-names', '/{religion}/girl-names'], next: 'browse-collections' },
      { stage: 'browse-collections', pages: ['/names/{religion}/letter/{letter}/1', '/names/{religion}/origin/{origin}/1'], next: 'view-name' },
      { stage: 'view-name', pages: ['/names/{religion}/{slug}'], next: 'explore-related' },
      { stage: 'explore-related', pages: ['/names/{religion}/categories/{category}/1', '/blog'], next: null },
    ],
  },

  'meaning-exploration': {
    name: 'Meaning-Based Exploration',
    stages: [
      { stage: 'browse-meanings', pages: ['/names-by-meaning'], next: 'filter-meaning' },
      { stage: 'filter-meaning', pages: ['/names-by-meaning'], next: 'view-names' },
      { stage: 'view-names', pages: ['/names/{religion}/{slug}'], next: 'compare' },
      { stage: 'compare', pages: ['/names/{religion}/{slug}'], next: 'explore-more' },
      { stage: 'explore-more', pages: ['/names/{religion}/origin/{origin}/1', '/names/{religion}/letter/{letter}/1'], next: null },
    ],
  },
};

// ============================================================
// 9. CONTENT GAP ANALYSIS
// ============================================================

export function analyzeContentGaps(existingPages, existingNames) {
  const gaps = {
    missingHubs: [],
    missingPillars: [],
    missingClusters: [],
    missingProgrammaticPages: [],
    missingEntities: [],
    recommendations: [],
  };

  // Check for missing hub pages
  const existingPaths = new Set(existingPages.map(p => p.path || p));
  
  Object.values(CONTENT_HUBS).forEach(hub => {
    if (!existingPaths.has(hub.pillar === 'baby-names' ? '/' : `/${hub.pillar}`)) {
      gaps.missingHubs.push(hub.id);
    }
  });

  // Check for missing programmatic pages
  Object.entries(PROGRAMMATIC_PAGES).forEach(([type, config]) => {
    config.pages.forEach(page => {
      const expectedPath = `/${type}/${page}`;
      if (!existingPaths.has(expectedPath)) {
        gaps.missingProgrammaticPages.push(expectedPath);
      }
    });
  });

  // Check for missing entity pages
  Object.entries(ENTITY_RELATIONSHIPS).forEach(([id, entity]) => {
    if (entity.url && !existingPaths.has(entity.url)) {
      gaps.missingEntities.push({ id, url: entity.url });
    }
  });

  // Generate recommendations
  if (gaps.missingHubs.length > 0) {
    gaps.recommendations.push(`Create ${gaps.missingHubs.length} missing content hubs: ${gaps.missingHubs.join(', ')}`);
  }
  if (gaps.missingProgrammaticPages.length > 0) {
    gaps.recommendations.push(`Generate ${gaps.missingProgrammaticPages.length} missing programmatic pages`);
  }
  if (gaps.missingEntities.length > 0) {
    gaps.recommendations.push(`Create ${gaps.missingEntities.length} missing entity pages`);
  }

  return gaps;
}

// ============================================================
// 10. TOPICAL AUTHORITY SCORE CALCULATOR
// ============================================================

export function calculateTopicalAuthorityScore(metrics) {
  const weights = {
    topicClusterCoverage: 0.20,
    entityRelationshipDensity: 0.15,
    internalLinkCompleteness: 0.15,
    contentHubCompleteness: 0.15,
    searchIntentCoverage: 0.10,
    pillarPageQuality: 0.10,
    programmaticPageCoverage: 0.05,
    semanticRelevance: 0.05,
    contentDepth: 0.05,
  };

  let score = 0;
  const breakdown = {};

  Object.entries(weights).forEach(([metric, weight]) => {
    const value = metrics[metric] || 0;
    const contribution = value * weight;
    score += contribution;
    breakdown[metric] = {
      value,
      weight,
      contribution,
      maxContribution: weight * 100,
    };
  });

  return {
    score: Math.round(score),
    breakdown,
    status: score >= 90 ? 'EXCELLENT' : score >= 80 ? 'GOOD' : score >= 70 ? 'FAIR' : 'NEEDS_IMPROVEMENT',
    remaining: Math.max(0, 100 - Math.round(score)),
  };
}

// ============================================================
// 11. EXPORT ALL
// ============================================================

const TopicalAuthorityArchitecture = {
  TOPIC_CLUSTERS,
  ENTITY_TYPES,
  ENTITY_RELATIONSHIPS,
  LINKING_RULES,
  CONTENT_HUBS,
  PROGRAMMATIC_PAGES,
  CRAWL_STRATEGY,
  NAVIGATION,
  USER_JOURNEYS,
  analyzeContentGaps,
  calculateTopicalAuthorityScore,
};

export default TopicalAuthorityArchitecture;