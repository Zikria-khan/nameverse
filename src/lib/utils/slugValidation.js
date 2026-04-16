/**
 * Slug Validation Utility
 * Handles validation and sanitization of URL slugs for name pages
 */

/**
 * Sanitizes a slug by removing invalid characters
 * @param {string} slug - The slug to sanitize
 * @returns {string} - The sanitized slug
 */
export function sanitizeSlug(slug) {
  if (!slug || typeof slug !== 'string') {
    return '';
  }

  return slug
    .trim()
    .replace(/^[-_]+/, '')  // Remove leading hyphens/underscores
    .replace(/[-_]+$/, '')  // Remove trailing hyphens/underscores
    .toLowerCase();
}

/**
 * Validates a slug format
 * @param {string} slug - The slug to validate
 * @returns {boolean} - True if valid, false otherwise
 */
export function isValidSlug(slug) {
  if (!slug || typeof slug !== 'string') {
    return false;
  }

  // Must contain only lowercase letters, numbers, single hyphens, single underscores
  if (!/^[a-z0-9-_]+$/.test(slug)) {
    return false;
  }

  // Cannot have multiple consecutive hyphens or underscores
  if (/[-_]{2,}/.test(slug)) {
    return false;
  }

  // Cannot start or end with hyphen or underscore
  if (/^[-_]|[-_]$/.test(slug)) {
    return false;
  }

  return true;
}

/**
 * Validates and sanitizes a slug
 * Returns the sanitized slug if valid, or null if invalid
 * @param {string} slug - The slug to process
 * @returns {string|null} - Sanitized slug or null
 */
export function validateAndSanitizeSlug(slug) {
  const sanitized = sanitizeSlug(slug);

  if (!sanitized || sanitized.length === 0) {
    return null;
  }

  if (!isValidSlug(sanitized)) {
    return null;
  }

  return sanitized;
}

/**
 * Check if slug is a single letter (for letter pages)
 * @param {string} slug - The slug to check
 * @returns {boolean} - True if single letter
 */
export function isSingleLetter(slug) {
  return slug && slug.length === 1 && /^[a-zA-Z]$/.test(slug);
}
