import { notFound } from 'next/navigation';
import { fetchNameDetail } from '@/lib/api/names';
import { generateNamePageMetadata, generateNamePageSchemas } from '@/lib/seo/name-page-seo';
import NameDetailClient from '@/components/names/NameDetailClient';
import Script from 'next/script';

// Use static generation with ISR for popular names
export const dynamic = 'force-static';
export const revalidate = 86400;
export const dynamicParams = true;

const VALID_RELIGIONS = ['islamic', 'christian', 'hindu'];

// Pre-generate static params for popular names at build time
export async function generateStaticParams() {
  const { getMockNamesForReligion } = await import('@/lib/api/names');

  const allParams = [];

  for (const religion of VALID_RELIGIONS) {
    // Get 10 most popular names per religion
    const popularNames = getMockNamesForReligion(religion, 1, 10);
    for (const name of popularNames) {
      if (name.slug) {
        allParams.push({
          religion,
          slug: name.slug,
        });
      }
    }
  }

  return allParams;
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const religion = normalizeReligion(resolvedParams?.religion);
  const slug = typeof resolvedParams?.slug === 'string' ? resolvedParams.slug : null;

  if (!religion || !slug) {
    return {
      title: 'Name Not Found | NameVerse',
      description: 'The requested baby name page could not be found on NameVerse.',
      keywords: ['NameVerse', 'baby names', 'name meaning site'],
    };
  }

  const nameData = await fetchNameDetail(religion, slug);
  if (!nameData) {
    return {
      title: 'Name Not Found | NameVerse',
      description: 'The requested baby name page could not be found on NameVerse.',
      keywords: ['NameVerse', 'name not found', 'baby name meanings'],
    };
  }

  return generateNamePageMetadata(nameData, religion, slug);
}

function normalizeReligion(religion) {
  if (!religion || typeof religion !== 'string') return null;
  const normalized = religion.toLowerCase();

  // Handle common variations
  if (normalized === 'islam' || normalized === 'muslim') return 'islamic';
  if (normalized === 'hinduism') return 'hindu';
  if (normalized === 'christianity') return 'christian';

  return VALID_RELIGIONS.includes(normalized) ? normalized : null;
}

export default async function NameDetailPage({ params }) {
  const resolvedParams = await params;
  const religion = normalizeReligion(resolvedParams?.religion);
  const slug = typeof resolvedParams?.slug === 'string' ? resolvedParams.slug : null;

  if (!religion || !slug) {
    return notFound();
  }

  const nameData = await fetchNameDetail(religion, slug);
  if (!nameData) {
    return notFound();
  }

  // Generate comprehensive structured data for SEO
  const schemas = generateNamePageSchemas(nameData, religion, slug);

  return (
    <>
      {/* Enhanced Structured Data for 2026 SEO */}
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": `What does the name ${nameData.name} mean?`,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": nameData.short_meaning || nameData.long_meaning || `${nameData.name} is a beautiful ${nameData.religion || 'cultural'} name with rich meaning and significance.`
                }
              },
              {
                "@type": "Question",
                "name": `What is the origin of the name ${nameData.name}?`,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": `The name ${nameData.name} ${nameData.origin ? `originates from ${Array.isArray(nameData.origin) ? nameData.origin.join(' and ') : nameData.origin}` : 'has ancient cultural roots'}. ${nameData.cultural_significance || 'It carries deep cultural and spiritual significance.'}`
                }
              },
              nameData.lucky_number && {
                "@type": "Question",
                "name": `What is the lucky number for ${nameData.name}?`,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": `The lucky number for ${nameData.name} is ${nameData.lucky_number}. In numerology, this number represents ${nameData.numerology_meaning || 'positive energy and good fortune'}.`
                }
              },
              nameData.pronunciation && {
                "@type": "Question",
                "name": `How do you pronounce ${nameData.name}?`,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": `The name ${nameData.name} is pronounced as "${nameData.pronunciation.english || nameData.pronunciation}". ${nameData.pronunciation.ipa ? `IPA: ${nameData.pronunciation.ipa}` : ''}`
                }
              },
              {
                "@type": "Question",
                "name": `Is ${nameData.name} a good name for a baby?`,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": `${nameData.name} is ${nameData.popularity_score > 7 ? 'a very popular and well-regarded' : 'a meaningful and beautiful'} name that carries ${nameData.spiritual_meaning ? 'deep spiritual significance' : 'cultural heritage and positive meaning'}. It's suitable for ${nameData.gender ? nameData.gender + 's' : 'children'} and has ${nameData.lucky_attributes ? 'auspicious numerological properties' : 'timeless appeal'}.`
                }
              }
            ].filter(Boolean)
          })
        }}
      />

      <Script
        id="article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": `${nameData.name} Name Meaning, Origin & Spiritual Significance`,
            "description": nameData.short_meaning || `Complete guide to the name ${nameData.name} including meaning, origin, numerology, and cultural significance.`,
            "image": `${process.env.NEXT_PUBLIC_SITE_URL}/api/og?name=${encodeURIComponent(nameData.name)}&religion=${religion}`,
            "datePublished": "2024-01-01",
            "dateModified": "2026-01-01",
            "author": {
              "@type": "Organization",
              "name": "NameVerse",
              "url": process.env.NEXT_PUBLIC_SITE_URL
            },
            "publisher": {
              "@type": "Organization",
              "name": "NameVerse",
              "logo": {
                "@type": "ImageObject",
                "url": `${process.env.NEXT_PUBLIC_SITE_URL}/logo.png`
              }
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `${process.env.NEXT_PUBLIC_SITE_URL}/names/${religion}/${slug}`
            },
            "articleSection": "Baby Names",
            "keywords": `${nameData.name}, ${nameData.name} meaning, ${religion} names, baby name meanings, name origin, numerology, spiritual names`
          })
        }}
      />

      {schemas.breadcrumb && (
        <Script
          id="breadcrumb-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.breadcrumb) }}
        />
      )}

      {schemas.howTo && (
        <Script
          id="howto-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.howTo) }}
        />
      )}

      <NameDetailClient data={nameData} initialLanguage="en" />
    </>
  );
}
