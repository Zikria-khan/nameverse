/**
 * Single source of truth for public site URL (no trailing slash).
 */
export function getSiteUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL || "https://nameverse.com").replace(
    /\/$/,
    ""
  );
}

/** Absolute URL for meta / OG (path must start with / or be full URL). */
export function absoluteUrl(path) {
  if (!path) return getSiteUrl();
  if (/^https?:\/\//i.test(path)) return path;
  const base = getSiteUrl();
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}

export const DEFAULT_OG_PATH = "/logo.png";
