/**
 * Create a production-safe slug for URLs
 * Only allows lowercase ASCII letters, numbers, and hyphens
 * Removes all Unicode characters, accents, and special symbols
 *
 * @param {string} input - The input string to convert to slug
 * @returns {string} - A safe slug containing only [a-z0-9-]
 */
export function createSafeSlug(input = "") {
  return input
    .toString()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9\s-]/g, "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export default createSafeSlug;