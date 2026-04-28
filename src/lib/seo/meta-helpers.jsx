/**
 * Meta description validation and generation utilities
 */

/**
 * Validate meta title length (up to 60 characters)
 * @param {string} title - Meta title to validate
 * @returns {string} Validated title
 */
export function validateMetaTitle(title) {
  if (!title) return 'NameVerse — Baby Names & Meanings';

  const cleaned = title.trim();
  if (cleaned.length <= 60) return cleaned;

  const truncated = cleaned.substring(0, 57);
  const lastSpace = truncated.lastIndexOf(' ');
  return lastSpace > 0 ? `${truncated.substring(0, lastSpace)}...` : `${truncated}...`;
}

/**
 * Validate meta description length (160-300 characters)
 * @param {string} description - Meta description to validate
 * @returns {string} Validated meta description
 */
export function validateMetaDescription(description) {
  if (!description) return 'Find unique baby names with meanings, origins, and numerology at NameVerse - Your trusted source for meaningful names.';

  // Trim whitespace
  description = description.trim();

  // Ensure length is between 160-300 characters
  if (description.length < 160) {
    // If too short, append additional content
    const suffix = ' Discover beautiful names with meanings, origins, lucky numbers, and personality traits for your baby.';
    description = (description + suffix).slice(0, 300);
  } else if (description.length > 300) {
    // If too long, truncate to 300 characters
    description = description.slice(0, 300);
  }

  return description;
}

/**
 * Generate canonical URL ensuring no trailing slashes
 * @param {string} path - The page path
 * @param {string} baseUrl - Base URL (default: from env)
 * @returns {string} Canonical URL
 */
export function generateCanonicalUrl(path, baseUrl = process.env.NEXT_PUBLIC_SITE_URL) {
  const cleanPath = path.replace(/\/+$|^\s+|\s+$/g, '');
  const cleanBase = baseUrl?.replace(/\/+$|^\s+|\s+$/g, '') || 'https://nameverse.vercel.app';
  return `${cleanBase}${cleanPath}`;
}

/**
 * Generate meta description for name pages
 * @param {object} data - Name data object
 * @returns {string} Generated meta description
 */
export function generateNameMetaDescription(data) {
  const name = data.name || 'this name';
  const religion = data.religion || 'various religions';
  const gender = data.gender || 'baby';
  const meaning = data.short_meaning || 'beautiful meaning';
  const origin = data.origin || 'various origins';
  const luckyNumber = data.lucky_number || 'lucky number';

  return `${name} is a ${gender} name of ${origin} origin with ${meaning}. Perfect for ${religion} families. Learn about its lucky number ${luckyNumber}, personality traits, and cultural significance.`;
}