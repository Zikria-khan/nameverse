import HomePageClient from "../components/HomePage/Homepage";
import { validateMetaTitle, validateMetaDescription } from '@/lib/seo/meta-helpers';
import fs from 'fs';
import path from 'path';
import HeroSection from '@/components/HomePage/HeroSection';
import ContentSection from '@/components/HomePage/ContentSection';
import AuthorityStats from '@/components/HomePage/AuthorityStats';
import SearchTools from '@/components/HomePage/SearchTools';
import ReligiousNamesSection from '@/components/HomePage/ReligiousNamesSection';
import dynamic from 'next/dynamic';
import { getSiteUrl } from '@/lib/seo/site';

// ISR with 30-day cache for the homepage — reduce writes
export const revalidate = 2592000; // 30 days

// ✅ Read domain from .env
const DOMAIN = process.env.NEXT_PUBLIC_SITE_URL || getSiteUrl();

// Read blog posts data server-side
const blogPostsPath = path.join(process.cwd(), 'public', 'data', 'blog-posts.json');
let latestArticles = [];
try {
  const fileContents = fs.readFileSync(blogPostsPath, 'utf8');
  const allPosts = JSON.parse(fileContents);
  // Sort by publishDate descending and take top 6 for homepage
  const sortedPosts = allPosts
    .filter(post => post.publishDate)
    .sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));
  latestArticles = sortedPosts.slice(0, 3);
} catch (error) {
}

const publishedDate = new Date().toISOString().split('T')[0];

const homepageStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${DOMAIN}/#website`,
      "url": DOMAIN,
      "name": "NameVerse — 65,000+ Baby Names with Meanings 2026",
      "description": "Discover 65,000+ verified Islamic Quranic, Christian Biblical & Hindu Sanskrit baby names A–Z with authentic meanings, origins, lucky numbers, and 2026 trending data. Fast search by religion, gender, letter & meaning.",
      "inLanguage": "en-US",
      "publisher": {
        "@id": `${DOMAIN}/#organization`
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": `${DOMAIN}/search?q={search_term_string}`
        },
        "query-input": "required name=search_term_string"
      },
      "about": {
        "@type": "Thing",
        "name": "Baby Names by Religion"
      }
    },
    {
      "@type": "Organization",
      "@id": `${DOMAIN}/#organization`,
      "name": "NameVerse",
      "url": DOMAIN,
      "logo": {
        "@type": "ImageObject",
        "url": `${DOMAIN}/logo.png`,
        "width": 512,
        "height": 512,
        "caption": "NameVerse — 65,000+ Baby Names with Meanings 2026"
      },
      "description": "NameVerse is the leading baby names platform with 65,000+ verified Islamic, Christian & Hindu baby names with authentic meanings, origins, and 2026 trending data.",
      "foundingDate": "2025",
      "founders": [{ "@type": "Person", "name": "Zakriya Khan" }]
    },
    {
      "@type": "FAQPage",
      "@id": `${DOMAIN}/#faq`,
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is NameVerse and how does it help find baby names?",
          "answerCount": 1,
          "datePublished": publishedDate,
          "upvoteCount": 0,
          "author": { "@type": "Organization", "name": "NameVerse" },
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "NameVerse is the world's most comprehensive baby name platform with 65,000+ verified names from Islamic, Christian, and Hindu traditions. You can search by religion, gender, starting letter, origin, and meaning to find the perfect name with authentic meanings and 2026 trending data.",
            "datePublished": publishedDate,
            "upvoteCount": 0,
            "author": { "@type": "Organization", "name": "NameVerse" }
          }
        },
        {
          "@type": "Question",
          "name": "What are the best baby names in 2026?",
          "answerCount": 1,
          "datePublished": publishedDate,
          "upvoteCount": 0,
          "author": { "@type": "Organization", "name": "NameVerse" },
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Top trending baby names in 2026 include Muhammad, Rayan, Ayan, and Zayn (Islamic), Liam, Noah, Elijah, and Ezra (Christian), and Vihaan, Arjun, Ananya, and Diya (Hindu). NameVerse tracks real-time popularity across all traditions.",
            "datePublished": publishedDate,
            "upvoteCount": 0,
            "author": { "@type": "Organization", "name": "NameVerse" }
          }
        },
        {
          "@type": "Question",
          "name": "Are NameVerse name meanings verified and accurate?",
          "answerCount": 1,
          "datePublished": publishedDate,
          "upvoteCount": 0,
          "author": { "@type": "Organization", "name": "NameVerse" },
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, NameVerse verifies Islamic names against Quranic text and classical Arabic dictionaries, Christian names against Biblical concordances, and Hindu names against Sanskrit etymological references with a 98% verification accuracy rate.",
            "datePublished": publishedDate,
            "upvoteCount": 0,
            "author": { "@type": "Organization", "name": "NameVerse" }
          }
        },
        {
          "@type": "Question",
          "name": "How do I search baby names by religion on NameVerse?",
          "answerCount": 1,
          "datePublished": publishedDate,
          "upvoteCount": 0,
          "author": { "@type": "Organization", "name": "NameVerse" },
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "You can browse 18,000+ Islamic Quranic names, 11,000+ Christian Biblical names, and 15,000+ Hindu Sanskrit names A–Z. Each section allows filtering by boy/girl, starting letter, origin, and meaning with lucky numbers and trending data.",
            "datePublished": publishedDate,
            "upvoteCount": 0,
            "author": { "@type": "Organization", "name": "NameVerse" }
          }
        }
      ]
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${DOMAIN}/#breadcrumb`,
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": DOMAIN },
        { "@type": "ListItem", "position": 2, "name": "Baby Names", "item": `${DOMAIN}/names` },
        { "@type": "ListItem", "position": 3, "name": "Islamic Names", "item": `${DOMAIN}/names/religion/islamic/1` },
        { "@type": "ListItem", "position": 4, "name": "Christian Names", "item": `${DOMAIN}/names/religion/christian/1` },
        { "@type": "ListItem", "position": 5, "name": "Hindu Names", "item": `${DOMAIN}/names/religion/hindu/1` }
      ]
    }
  ]
};

export default async function HomePage() {
  return <HomePageClient />;
}