/**
 * Single source of truth for public site URL (no trailing slash).
 */

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://nameverse.vercel.app").replace(
  /\/$/,
  ""
);

export function getSiteUrl() {
  return SITE_URL;
}

/** Absolute URL for meta / OG (path must start with / or be full URL). */
export function absoluteUrl(path) {
  if (!path) return SITE_URL;
  if (/^https?:\/\//i.test(path)) return path;
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${p}`;
}

export const DEFAULT_OG_PATH = "/logo.png";
