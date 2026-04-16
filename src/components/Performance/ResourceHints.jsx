/**
 * Resource Hints Component
 * Add preconnect, dns-prefetch, and prefetch hints for better performance
 */

import { env } from '@/config/env';

export default function ResourceHints() {
  const apiBaseUrl = env.api.baseUrl;
  // Removed Supabase references as they're no longer used

  // Extract domains for preconnect - handle invalid URLs gracefully
  let apiDomain = null;
  
  try {
    if (apiBaseUrl && apiBaseUrl.startsWith('http')) {
      apiDomain = new URL(apiBaseUrl).origin;
    }
  } catch (e) {
    // Invalid URL, skip
  }
  
  // Removed Supabase domain extraction as it's no longer used

  return (
    <>
      {/* DNS Prefetch for external domains */}
      {apiDomain && (
        <link rel="dns-prefetch" href={apiDomain} />
      )}
      {/* Removed Supabase DNS prefetch */}

      {/* Preconnect to critical domains */}
      {apiDomain && (
        <link rel="preconnect" href={apiDomain} crossOrigin="anonymous" />
      )}
      {/* Removed Supabase preconnect */}

      {/* Preconnect to Google Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

      {/* Prefetch critical routes */}
      <link rel="prefetch" href="/names" as="document" />
      <link rel="prefetch" href="/blog" as="document" />
    </>
  );
}