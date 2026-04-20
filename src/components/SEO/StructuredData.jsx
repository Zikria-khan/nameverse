/**
 * StructuredData Component
 * Generates JSON-LD structured data for SEO purposes
 */

export default function StructuredData({ 
  organization = false, 
  website = false, 
  breadcrumbs = [], 
  collectionPage = null 
}) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nameverse.vercel.app";
  
  // Organization Schema with detailed logo for Google Search
  const organizationSchema = organization ? {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "NameVerse",
    "url": siteUrl,
    "logo": {
      "@type": "ImageObject",
      "url": `${siteUrl}/logo.png`,
      "width": 192,
      "height": 192,
      "caption": "NameVerse - Baby Names & Meanings"
    },
    "image": {
      "@type": "ImageObject",
      "url": `${siteUrl}/logo.png`,
      "width": 192,
      "height": 192
    },
    "sameAs": [
      // Add social media URLs here if needed
    ],
    "description": "NameVerse - Discover 60,000+ baby names with meanings from Islamic, Hindu, and Christian traditions."
  } : null;

  // Website Schema
  const websiteSchema = website ? {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "NameVerse",
    "url": siteUrl,
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${siteUrl}/search?query={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  } : null;

  // Breadcrumb Schema
  const breadcrumbSchema = breadcrumbs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": crumb.url
    }))
  } : null;

  // Collection Page Schema
  const collectionPageSchema = collectionPage ? {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": collectionPage.name,
    "description": collectionPage.description,
    "url": collectionPage.url,
    "isPartOf": {
      "@type": "WebSite",
      "name": "NameVerse",
      "url": siteUrl
    },
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": (collectionPage.items || []).slice(0, 20).map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.title || item.name,
        "url": `${siteUrl}/${item.slug ? `blog/${item.slug}` : `names/${item._id}`}`
      }))
    }
  } : null;

  // Filter out null schemas
  const schemas = [organizationSchema, websiteSchema, breadcrumbSchema, collectionPageSchema].filter(Boolean);

  if (schemas.length === 0) {
    return null;
  }

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}