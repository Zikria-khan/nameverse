/**
 * SEO Meta Helpers
 * Utilities for optimizing meta tags and descriptions
 */

/**
 * Validate and truncate meta description to optimal length
 * Google displays 150-160 characters in search results
 * @param {string} description - The meta description
 * @param {number} maxLength - Maximum length (default: 160)
 * @returns {string} Validated description
 */
export function validateMetaDescription(description, maxLength = 160) {
  if (!description) return '';

  // Remove extra whitespace
  const cleaned = description.trim().replace(/\s+/g, ' ');

  if (cleaned.length <= maxLength) {
    return cleaned;
  }

  // Truncate at word boundary
  const truncated = cleaned.substring(0, maxLength - 3);
  const lastSpace = truncated.lastIndexOf(' ');

  return lastSpace > 0
    ? truncated.substring(0, lastSpace) + '...'
    : truncated + '...';
}

/**
 * Validate and truncate meta title to optimal length
 * Google displays ~60 characters in search results
 * @param {string} title - The page title
 * @param {number} maxLength - Maximum length (default: 60)
 * @returns {string} Validated title
 */
export function validateMetaTitle(title, maxLength = 60) {
  if (!title) return '';

  const cleaned = title.trim();

  if (cleaned.length <= maxLength) {
    return cleaned;
  }

  // Truncate at word boundary
  const truncated = cleaned.substring(0, maxLength - 3);
  const lastSpace = truncated.lastIndexOf(' ');

  return lastSpace > 0
    ? truncated.substring(0, lastSpace) + '...'
    : truncated + '...';
}

/**
 * Generate SEO-optimized keywords from data
 * @param {Object} data - Data object (name, article, etc.)
 * @returns {string} Comma-separated keywords
 */
export function generateKeywords(data) {
  const keywords = new Set();

  if (data.name) keywords.add(data.name);
  if (data.title) keywords.add(data.title);
  if (data.religion) keywords.add(`${data.religion} names`);
  if (data.origin) keywords.add(`${data.origin} origin`);
  if (data.gender) keywords.add(`${data.gender} names`);
  if (data.category) keywords.add(data.category);
  if (data.tags) data.tags.forEach(tag => keywords.add(tag));

  // Add generic keywords
  keywords.add('baby names');
  keywords.add('name meanings');
  keywords.add('name origins');

  return Array.from(keywords).join(', ');
}

/**
 * Generate canonical URL ensuring no trailing slashes
 * @param {string} path - The page path
 * @param {string} baseUrl - Base URL (default: from env)
 * @returns {string} Canonical URL
 */
export function generateCanonicalUrl(path, baseUrl = process.env.NEXT_PUBLIC_SITE_URL) {
  const cleanPath = path.replace(/\/+$/, ''); // Remove trailing slashes
  const cleanBase = baseUrl?.replace(/\/+$/, '') || 'https://nameverse.vercel.app';

  return `${cleanBase}${cleanPath}`;
}

/**
 * Enhanced meta description for name pages with SEO keywords
 * @param {Object} name - Name data
 * @returns {string} Optimized description
 */
export function generateNameMetaDescription(name) {
  const parts = [];

  // Start with the name and meaning
  parts.push(`${name.name} (${name.origin || 'Cultural'} origin) - ${name.religion} ${name.gender || ''} name meaning '${name.short_meaning || name.meaning}'.`);

  // Add numerology if available
  if (name.lucky_number) {
    parts.push(`Numerology: ${name.lucky_number}.`);
  }

  // Add lucky stone if available
  if (name.lucky_stone) {
    parts.push(`Lucky stone: ${name.lucky_stone}.`);
  }

  // Add call-to-action
  parts.push('Complete name analysis with cultural significance.');

  const description = parts.join(' ');
  return validateMetaDescription(description);
}

/**
 * Enhanced meta description for article pages
 * @param {Object} article - Article data
 * @returns {string} Optimized description
 */
export function generateArticleMetaDescription(article) {
  if (article.excerpt) {
    return validateMetaDescription(article.excerpt);
  }

  if (article.subtitle) {
    const desc = `${article.subtitle}. ${article.category ? `Expert insights on ${article.category}.` : ''}`;
    return validateMetaDescription(desc);
  }

  return validateMetaDescription(`Discover ${article.title}. Expert baby naming insights and cultural traditions.`);
}

/**
 * Generate structured FAQ content for SEO
 * @param {Object} data - Data with FAQ questions
 * @returns {Array} FAQ structured data
 */
export function generateFAQStructure(data) {
  const faqs = [];

  if (data.name) {
    faqs.push({
      question: `What does ${data.name} mean?`,
      answer: data.long_meaning || data.short_meaning || `${data.name} is a meaningful name with deep cultural significance.`
    });

    if (data.origin) {
      faqs.push({
        question: `What is the origin of ${data.name}?`,
        answer: `${data.name} originates from ${data.origin} and is primarily used in ${data.religion} communities.`
      });
    }

    if (data.pronunciation) {
      faqs.push({
        question: `How do you pronounce ${data.name}?`,
        answer: `${data.name} is pronounced as ${data.pronunciation.english || data.name}.`
      });
    }
  }

  return faqs;
}

export default {
  validateMetaDescription,
  validateMetaTitle,
  generateKeywords,
  generateCanonicalUrl,
  generateNameMetaDescription,
  generateArticleMetaDescription,
  generateFAQStructure,
};
