/**
 * NAME PAGE SEO TITLE GENERATOR (UPGRADED)
 * Optimized for Google indexing stability + reduced template footprint
 */

const RELIGION_LABELS = {
  islamic: {
    display: 'Islamic',
    genderLabels: { male: 'masculine', female: 'feminine', other: 'personal' },
  },
  christian: {
    display: 'Christian',
    genderLabels: { male: 'masculine', female: 'feminine', other: 'personal' },
  },
  hindu: {
    display: 'Hindu',
    genderLabels: { male: 'masculine', female: 'feminine', other: 'personal' },
  },
};

const CHAR_LIMIT = 60;

function truncateToChars(text, limit = CHAR_LIMIT) {
  if (!text) return '';
  if (text.length <= limit) return text;

  const cut = text.substring(0, limit - 3);
  const lastSpace = cut.lastIndexOf(' ');
  return lastSpace > 10 ? `${cut.substring(0, lastSpace)}...` : `${cut}...`;
}

/**
 * Stable hash for consistent but non-repetitive variant selection
 */
function getStableVariantIndex(key, count) {
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash = (hash * 31 + key.charCodeAt(i)) >>> 0;
  }
  return hash % count;
}

/**
 * Meaning cleaner (less predictable patterns)
 */
function extractCoreMeaning(meaning) {
  if (!meaning) return '';
  const cleaned = meaning.trim();

  const parts = cleaned
    .split(/[,·|\n.]/)
    .map(p => p.trim())
    .filter(Boolean);

  return (parts[0] || '')
    .split(/\s+/)
    .slice(0, 5)
    .join(' ');
}

/**
 * TITLE BUILDER
 */
function buildTitle(name, modifier, meaning) {
  const parts = [name, modifier];

  if (meaning) parts.push(`Meaning: ${meaning}`);

  return truncateToChars(parts.join(' — '), CHAR_LIMIT);
}

/**
 * ===========================
 * TITLE GENERATION
 * ===========================
 */
export function generateCTRTitle(data, religion) {
  const name = data.name || '';
  const meaning = extractCoreMeaning(data.short_meaning || data.meaning || '');

  const templates = {
    islamic: [
      'Name Meaning',
      'Arabic Origin',
      'Quranic Name',
    ],
    christian: [
      'Biblical Name Meaning',
      'Hebrew Origin',
      'Christian Name',
    ],
    hindu: [
      'Sanskrit Name Meaning',
      'Vedic Origin',
      'Hindu Name',
    ],
  };

  const list = templates[religion] || templates.islamic;

  const key = `${name}-${religion}`;
  const index = getStableVariantIndex(key, list.length);

  const title = buildTitle(name, list[index], meaning);

  return title || `${name} Name Meaning | NameVerse`;
}

/**
 * ===========================
 * DESCRIPTION GENERATION
 * ===========================
 */
export function generateCTRDescription(data, religion) {
  const name = data.name || '';
  const meaning = extractCoreMeaning(data.short_meaning || data.meaning || '');
  const origin = data.origin || '';
  const gender = data.gender || 'personal';
  const religionDisplay = RELIGION_LABELS[religion]?.display || 'Islamic';

  const variants = [
    `${name} is a ${gender} name from ${religionDisplay} tradition meaning "${meaning}".`,

    `The name ${name} comes from ${origin || religionDisplay} background and means "${meaning}".`,

    `${name} has roots in ${religionDisplay} culture and is associated with "${meaning}".`,

    `In ${religionDisplay} naming tradition, ${name} means "${meaning}" and is widely used across cultures.`,
  ];

  const index = getStableVariantIndex(name + religion, variants.length);

  let desc = variants[index];

  if (desc.length > 160) desc = desc.slice(0, 157) + '...';

  if (desc.length < 140) {
    desc += ' Explore detailed meaning, origin and cultural history on NameVerse.';
    desc = desc.slice(0, 160);
  }

  return desc;
}

/**
 * ===========================
 * KEYWORDS GENERATION
 * ===========================
 */
export function generateKeywords(data, religion) {
  const name = data.name || '';
  const origin = data.origin || '';
  const gender = (data.gender || '').toLowerCase();

  const base = [
    `${name} meaning`,
    `${name} origin`,
    `${name} name significance`,
    `${name} history`,
  ];

  const religious = {
    islamic: [`${name} Islamic meaning`, `${name} Arabic origin`],
    christian: [`${name} Biblical meaning`, `${name} Hebrew origin`],
    hindu: [`${name} Sanskrit meaning`, `${name} Vedic origin`],
  };

  const genderKw =
    gender === 'male'
      ? [`${name} masculine name`]
      : gender === 'female'
      ? [`${name} feminine name`]
      : [];

  const originKw = origin ? [`${name} ${origin} origin`] : [];

  const all = [
    ...base,
    ...(religious[religion] || religious.islamic),
    ...genderKw,
    ...originKw,
  ];

  return all.slice(0, 8).join(', ');
}