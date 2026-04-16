/**
 * Alt Text Generation Helpers
 * SEO-optimized alt text for images
 */

/**
 * Generate SEO-optimized alt text for different image types
 * @param {string} type - Image type (name, article, category, logo, icon)
 * @param {Object} data - Data object with image context
 * @returns {string} SEO-optimized alt text
 */
export function generateAltText(type, data) {
  if (!data) return 'NameVerse image';

  const templates = {
    name: (d) => {
      const parts = [d.name];
      if (d.short_meaning) parts.push(d.short_meaning);
      if (d.religion) parts.push(`${d.religion} name`);
      if (d.gender) parts.push(`${d.gender} baby name`);
      if (d.origin) parts.push(`origin: ${d.origin}`);
      return parts.join(' - ');
    },

    article: (d) => {
      if (d.excerpt) return `${d.title} - ${d.excerpt.substring(0, 100)}`;
      if (d.subtitle) return `${d.title} - ${d.subtitle}`;
      return `${d.title} - NameVerse article about baby naming`;
    },

    category: (d) => {
      const count = d.count || d.totalNames || 'many';
      return `${d.name || d.category} baby names - Browse ${count}+ ${d.religion || ''} names with meanings and origins`;
    },

    logo: () => 'NameVerse logo - Discover meaningful baby names from Islamic, Christian, and Hindu traditions worldwide',

    icon: (d) => `${d.name || d.description} icon - ${d.meaning || 'NameVerse symbol'}`,

    hero: (d) => `Beautiful ${d.religion || 'baby'} names collection - ${d.description || 'Discover meaningful names with cultural significance'}`,

    avatar: (d) => `${d.name || 'User'} avatar - ${d.description || 'NameVerse community member'}`,

    cover: (d) => `${d.title || d.name} cover image - ${d.description || 'Featured content on NameVerse'}`,
  };

  const generator = templates[type];
  if (!generator) return data.name || data.title || 'NameVerse image';

  return generator(data);
}

/**
 * Generate alt text for name card images
 * @param {Object} name - Name data object
 * @returns {string} Alt text
 */
export function getNameImageAlt(name) {
  return generateAltText('name', name);
}

/**
 * Generate alt text for article cover images
 * @param {Object} article - Article data object
 * @returns {string} Alt text
 */
export function getArticleImageAlt(article) {
  return generateAltText('article', article);
}

/**
 * Generate alt text for category/collection images
 * @param {Object} category - Category data
 * @returns {string} Alt text
 */
export function getCategoryImageAlt(category) {
  return generateAltText('category', category);
}

/**
 * Validate alt text for quality (SEO best practices)
 * @param {string} altText - Alt text to validate
 * @returns {Object} Validation result
 */
export function validateAltText(altText) {
  if (!altText || altText.trim() === '') {
    return {
      valid: false,
      issues: ['Alt text is empty'],
      score: 0
    };
  }

  const issues = [];
  let score = 100;

  // Check length (optimal: 10-125 characters)
  if (altText.length < 10) {
    issues.push('Alt text is too short (min 10 characters recommended)');
    score -= 30;
  }
  if (altText.length > 125) {
    issues.push('Alt text is too long (max 125 characters recommended)');
    score -= 20;
  }

  // Check for keyword stuffing
  const words = altText.split(/\s+/);
  const uniqueWords = new Set(words.map(w => w.toLowerCase()));
  if (words.length - uniqueWords.size > 3) {
    issues.push('Possible keyword stuffing detected');
    score -= 40;
  }

  // Check for spam phrases
  const spamPhrases = ['image of', 'picture of', 'photo of', 'graphic of'];
  if (spamPhrases.some(phrase => altText.toLowerCase().includes(phrase))) {
    issues.push('Avoid phrases like "image of" - describe the content directly');
    score -= 15;
  }

  return {
    valid: score >= 60,
    issues: issues.length > 0 ? issues : ['Alt text looks good!'],
    score: Math.max(0, score)
  };
}

export default {
  generateAltText,
  getNameImageAlt,
  getArticleImageAlt,
  getCategoryImageAlt,
  validateAltText,
};
