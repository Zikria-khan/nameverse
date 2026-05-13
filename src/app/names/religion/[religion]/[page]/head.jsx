import React from 'react';
import { generateCanonicalUrl } from '@/lib/seo/meta-helpers';

export default function Head({ params }) {
  const religion = params?.religion || 'islamic';
  const page = parseInt(params?.page || '1', 10) || 1;
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://nameverse.vercel.app';

  // Canonical: prefer base collection URL for page 1
  const canonicalPath = page === 1 ? `/names/religion/${religion}` : `/names/religion/${religion}/${page}`;
  const canonical = generateCanonicalUrl(canonicalPath, base);

  const prevHref = page > 1 ? generateCanonicalUrl(`/names/religion/${religion}/${page - 1}`, base) : null;
  const nextHref = generateCanonicalUrl(`/names/religion/${religion}/${page + 1}`, base);

  const ogImage = `${base}/api/og?section=${encodeURIComponent(religion)}&page=${page}`;

  return (
    <>
      <link rel="canonical" href={canonical} />
      {prevHref && <link rel="prev" href={prevHref} />}
      <link rel="next" href={nextHref} />

      <meta name="robots" content="index, follow" />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="NameVerse" />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={ogImage} />
    </>
  );
}
