// lib/seo/name-page-seo-enhanced.jsx
import { getSiteUrl } from '@/lib/seo/site';
import { validateMetaDescription, generateNameMetaDescription } from '@/lib/seo/meta-helpers';
import { generateNameProductSchema, generateFAQSchema } from '@/lib/seo/structured-data';
import { generateNameFAQ } from '@/lib/seo/content-helpers';

const SITE_URL = getSiteUrl();

/**
 * Enhanced keyword generation with question-based, comparison, and ultra-long-tail clusters
 * Optimized for 2026 search intent and voice search
 */
export function generateNamePageKeywords(data) {
  const titleName = data.name;
  const religionTitle = data.religion.charAt(0).toUpperCase() + data.religion.slice(1);
  const gender = data.gender?.toLowerCase() || '';
  const origin = data.origin || '';

  // ========== CORE BRAND KEYWORDS (highest priority) ==========
  const coreKeywords = [
    titleName,
    `${titleName} name`,
    `${titleName} name meaning`,
    `${titleName} meaning`,
    `meaning of ${titleName}`,
    `${titleName} name meaning in English`,
  ];

  // ========== LANGUAGE-SPECIFIC QUERIES (high conversion intent) ==========
  const languageKeywords = [];
  if (data.in_urdu) languageKeywords.push(`${titleName} name meaning in Urdu`, `meaning of ${titleName} in Urdu`, `${data.in_urdu.name} meaning in Urdu`);
  if (data.in_arabic) languageKeywords.push(`${titleName} name meaning in Arabic`, `معنى اسم ${data.in_arabic.name}`, `${data.in_arabic.name} meaning in Arabic`);
  if (data.in_hindi) languageKeywords.push(`${titleName} name meaning in Hindi`, `${titleName} ka matlab`);
  if (data.in_pashto) languageKeywords.push(`${titleName} meaning in Pashto`);

  // ========== QUESTION-BASED QUERIES (voice search optimized) ==========
  const questionKeywords = [
    `what does ${titleName} mean`,
    `what is the meaning of ${titleName}`,
    `what does the name ${titleName} mean`,
    `what is ${titleName} name meaning`,
    `what does ${titleName} stand for`,
    `what is the meaning of the name ${titleName}`,
    `what does ${titleName} mean in ${religionTitle}`,
    `what is the lucky number of ${titleName}`,
    `what is the lucky stone of ${titleName}`,
    `what is the origin of ${titleName}`,
    `how to pronounce ${titleName}`,
    `is ${titleName} a good name`,
    `is ${titleName} a ${gender} name`,
    `is ${titleName} an ${origin} name`,
  ];

  // ========== COMPARISON QUERIES (capture indecision traffic) ==========
  const comparisonKeywords = [];
  if (data.similar_sounding_names?.length) {
    data.similar_sounding_names.slice(0, 2).forEach(similar => {
      comparisonKeywords.push(`${titleName} vs ${similar}`);
      comparisonKeywords.push(`${similar} vs ${titleName}`);
      comparisonKeywords.push(`${titleName} or ${similar} which is better`);
    });
  }

  // ========== RELIGIOUS + CULTURAL INTENT ==========
  const religiousKeywords = [
    `${religionTitle} names`,
    `${religionTitle} baby names`,
    `${religionTitle} ${gender} names`,
    `${religionTitle} names with meanings`,
    `beautiful ${religionTitle} names`,
    `unique ${religionTitle} names`,
    `traditional ${religionTitle} names`,
    `modern ${religionTitle} names`,
    gender ? `${religionTitle} ${gender} names with meanings` : '',
    data.lucky_number ? `${religionTitle} names with lucky number ${data.lucky_number}` : '',
  ].filter(Boolean);

  // ========== ORIGIN + LANGUAGE INTENT ==========
  const originKeywords = origin ? [
    `${origin} names`,
    `${origin} baby names`,
    `${origin} ${gender} names`,
    `${origin} names with meanings`,
    `popular ${origin} names`,
    `traditional ${origin} names`,
    `${titleName} ${origin} name meaning`,
    `${origin} name ${titleName}`,
  ] : [];

  // ========== NUMEROLOGY + LUCKY ATTRIBUTES INTENT ==========
  const numerologyKeywords = [];
  if (data.lucky_number) {
    numerologyKeywords.push(
      `names with lucky number ${data.lucky_number}`,
      `number ${data.lucky_number} names`,
      `${titleName} lucky number`,
      `${titleName} numerology`,
      `${titleName} numerology number ${data.life_path_number || ''}`,
      `lucky number ${data.lucky_number} baby names`,
      `${gender} names with lucky number ${data.lucky_number}`
    );
  }
  if (data.lucky_stone) {
    numerologyKeywords.push(
      `${data.lucky_stone} lucky stone names`,
      `names with lucky stone ${data.lucky_stone}`,
      `${titleName} lucky stone`
    );
  }
  if (data.lucky_day) {
    numerologyKeywords.push(`names for ${data.lucky_day} born`);
  }

  // ========== ULTRA LONG-TAIL QUERIES (low competition, high specificity) ==========
  const longTailKeywords = [
    `${titleName} name meaning and lucky number`,
    `${titleName} name meaning in ${religionTitle} with lucky color`,
    `best ${religionTitle} ${gender} names that mean ${data.short_meaning?.split(',')[0] || ''}`,
    `${titleName} name meaning personality and traits`,
    `baby ${gender} name ${titleName} meaning origin and numerology`,
    `${titleName} ${religionTitle} baby name meaning and pronunciation`,
    `${titleName} name spiritual meaning and significance`,
    `${titleName} name numerology and personality traits`,
    `is ${titleName} a common ${religionTitle} name`,
    `${titleName} name popularity in ${data.popularity_by_region?.[0]?.region || ''}`,
  ].filter(k => !k.includes('undefined'));

  // ========== LOCATION-SPECIFIC QUERIES ==========
  const locationKeywords = [];
  if (data.popularity_by_region?.length) {
    data.popularity_by_region.slice(0, 3).forEach(region => {
      locationKeywords.push(
        `${titleName} name popularity in ${region.region}`,
        `${region.region} ${religionTitle} baby names`,
        `popular ${gender} names in ${region.region}`,
        `${titleName} meaning in ${region.region}`
      );
    });
  }

  // ========== SIBLING & COMPANION NAME QUERIES ==========
  const siblingKeywords = [];
  if (gender === 'female') {
    siblingKeywords.push(`sister names for ${titleName}`, `names that go with ${titleName}`);
  } else if (gender === 'male') {
    siblingKeywords.push(`brother names for ${titleName}`, `names that go with ${titleName}`);
  }

  // ========== GENERAL BABY NAME DISCOVERY ==========
  const generalKeywords = [
    'baby name meanings',
    'baby names with meanings',
    'unique baby names',
    'beautiful baby names',
    'popular baby names',
    'trending baby names',
    'best baby names',
    'baby names and meanings',
    'name meanings and origins',
    'baby name finder',
  ];

  // Combine all clusters with priority order (most important first)
  const allKeywords = [
    ...new Set([
      ...coreKeywords,
      ...questionKeywords,
      ...languageKeywords,
      ...comparisonKeywords,
      ...religiousKeywords,
      ...originKeywords,
      ...numerologyKeywords,
      ...longTailKeywords,
      ...locationKeywords,
      ...siblingKeywords,
      ...generalKeywords,
    ]),
  ]
    .filter(Boolean)
    .filter(k => k.length > 2)
    .slice(0, 35); // Keep most valuable 35 keywords for meta tag

  return allKeywords.join(', ');
}

/**
 * Generate enhanced metadata with 2026 best practices
 */
export function generateNamePageMetadata(data, religion, slug) {
  const titleName = data.name || slug.replace(/[-_]/g, ' ');
  const religionTitle = religion.charAt(0).toUpperCase() + religion.slice(1);
  const description = validateMetaDescription(generateNameMetaDescription(data));
  const keywords = generateNamePageKeywords(data);
  const pageUrl = `${SITE_URL}/names/${religion}/${slug}`;

  // Enhanced title with higher CTR patterns
  const titleVariations = [
    `${titleName} Name Meaning, Origin & Lucky Number | ${religionTitle}`,
    `${titleName}: Meaning, Numerology & Personality | ${religionTitle} Baby Names`,
    `${titleName} - ${religionTitle} Name Meaning (${data.gender || ''}) + Lucky Stone`,
  ];
  
  // Use the most clickable title pattern based on available data
  let title = titleVariations[0];
  if (data.lucky_number && data.emotional_traits?.length) {
    title = titleVariations[1];
  } else if (data.lucky_stone) {
    title = titleVariations[2];
  }

  const ogTitle = `${titleName} - ${religionTitle} Name Meaning, Origin & Lucky Number`;
  const twitterTitle = `${titleName} Name Meaning | ${religionTitle}`;

  // Enhanced OpenGraph with better social sharing appeal
  return {
    title,
    description,
    keywords,
    authors: [{ name: 'NameVerse' }],
    alternates: { canonical: pageUrl },
    openGraph: {
      title: ogTitle,
      description,
      type: 'article',
      url: pageUrl,
      siteName: 'NameVerse',
      images: [
        {
          url: `${SITE_URL}/api/og?name=${encodeURIComponent(titleName)}&meaning=${encodeURIComponent(data.short_meaning || '')}&religion=${religion}`,
          width: 1200,
          height: 630,
          alt: `${titleName} - ${religionTitle} baby name meaning and origin`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: twitterTitle,
      description,
      images: [`${SITE_URL}/api/og?name=${encodeURIComponent(titleName)}&religion=${religion}`],
    },
    robots: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
    // Additional 2026 metadata fields
    other: {
      'og:see_also': [
        `${SITE_URL}/names/${religion}`,
        data.similar_sounding_names?.[0] ? `${SITE_URL}/names/${religion}/${data.similar_sounding_names[0].toLowerCase()}` : '',
      ].filter(Boolean),
    },
  };
}

/**
 * Generate all schemas (unchanged from previous excellent version)
 */
export function generateNamePageSchemas(data, religion, slug) {
  const productSchema = generateNameProductSchema(data, religion, slug);
  const faqData = generateNameFAQ(data);
  const faqSchema = faqData ? generateFAQSchema(faqData) : null;

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: `${religion.charAt(0).toUpperCase() + religion.slice(1)} Names`, item: `${SITE_URL}/names/${religion}` },
      { '@type': 'ListItem', position: 3, name: data.name, item: `${SITE_URL}/names/${religion}/${slug}` },
    ],
  };

  const howToSchema = data.pronunciation ? {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `How to pronounce ${data.name}`,
    description: `Learn the correct pronunciation of the name ${data.name}`,
    step: [{ '@type': 'HowToStep', name: 'Pronunciation', text: data.pronunciation.english || data.pronunciation.ipa || data.name }],
  } : null;

  return { product: productSchema, faq: faqSchema, breadcrumb: breadcrumbSchema, howTo: howToSchema };
}