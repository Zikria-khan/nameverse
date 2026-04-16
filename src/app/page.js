import HomePageClient from "../components/HomePage/Homepage";

// ✅ Read domain from .env
const DOMAIN = process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.com";

// World-class SEO metadata with comprehensive keyword targeting
export const metadata = {
  title: "60,000+ Baby Names with Meanings | Islamic, Hindu, Christian Names 2025 | NameVerse",
  description:
    "Find 60,000+ baby names with meanings in English, Urdu, Arabic & Hindi. Explore Islamic, Hindu & Christian names with origins and pronunciation guides.",
  keywords: [
    // Primary high-volume keywords
    "baby names with meanings",
    "baby boy names",
    "baby girl names",
    "baby name meanings",
    "unique baby names",
    "baby names 2025",

    // Islamic names - Core keywords
    "Islamic baby names",
    "Islamic names",
    "muslim baby names",
    "muslim islamic baby names",
    "islamic names for boys",
    "islamic names for girls",
    "baby boy islamic names",
    "islamic names wiki",
    "islamic names of allah",

    // Question-based Islamic keywords
    "what are some muslim names",
    "what do muslim names mean",
    "how do muslim names work",

    // Language-specific Islamic keywords
    "meaning of islamic names urdu",
    "islamic names urdu pakistan",
    "urdu islamic names for girls",
    "arabic names with urdu meanings",
    "male islamic names",
    "islamic tamil names",

    // Religious tradition keywords
    "Muslim baby names from Quran",
    "Quranic baby names",
    "Quranic names for boys",
    "Quranic names for girls",
    "Hindu baby names",
    "Christian baby names",
    "Hindu baby names from Vedas",
    "Sanskrit baby names",
    "Biblical baby names",
    "Biblical names for boys",
    "Biblical names for girls",

    // Language-specific keywords
    "baby names in Urdu",
    "baby names in Arabic",
    "baby names in Hindi",
    "baby name meanings in Urdu",
    "Arabic baby names with pronunciation",
    "Islamic names in Arabic",

    // Long-tail question keywords
    "what does my baby name mean",
    "how to choose baby name",
    "best baby names 2025",
    "popular baby names",
    "trending baby names 2025",

    // Gender-specific keywords
    "baby boy names starting with A",
    "baby girl names with beautiful meanings",
    "Islamic boy names",
    "Islamic girl names",
    "Hindu boy names",
    "Hindu girl names",
    "Christian boy names",
    "Christian girl names",

    // Attribute-based keywords
    "modern Islamic baby names",
    "traditional Hindu baby names",
    "rare Christian baby names",
    "unique Muslim baby names",
    "powerful baby names",
    "spiritual baby names",
    "meaningful baby names",
    "lucky baby names",

    // Origin and cultural keywords
    "baby names by religion",
    "baby names by origin",
    "cultural baby names",
    "Arabic names with meanings",
    "Sanskrit names with meanings",
    "names from different cultures",

    // Feature-specific keywords
    "baby names with pronunciation",
    "baby names with numerology",
    "verified baby names",
    "authentic baby names",
    "baby names A to Z",
    "alphabetical baby names"
  ].join(', '),
  openGraph: {
    title: "60,000+ Baby Names with Meanings | Islamic, Hindu & Christian",
    description:
      "Find your baby's perfect name from verified Islamic, Hindu & Christian names with complete meanings, cultural origins, and pronunciation guides.",
    url: DOMAIN + "/",
    type: "website",
    siteName: "NameVerse",
    images: [{ url: DOMAIN + "/og-image.jpg", width: 1200, height: 630, alt: "NameVerse - Baby Names with Meanings from Islamic, Hindu & Christian Traditions" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "60,000+ Baby Names with Meanings | NameVerse",
    description:
      "Discover your baby's perfect name from verified Islamic, Hindu & Christian traditions with complete meanings and cultural significance.",
    images: [DOMAIN + "/og-image.jpg"],
  },
  alternates: {
    canonical: DOMAIN + "/",
    languages: {
      "x-default": DOMAIN + "/",
      en: DOMAIN + "/",
    },
  },
  robots: { index: true, follow: true },
  authors: [{ name: "Zakriya Khan", url: DOMAIN + "/" }],
};

// ✅ Enhanced SEO Metadata (already defined above, just adding to existing)
// Metadata is already defined above, this section adds enhancements

// ✅ Next.js 14+ themeColor export
export function generateThemeColor() {
  return "#0f766e";
}

// ✅ Next.js 14+ viewport export
export function generateViewport() {
  return {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  };
}

export default function Page() {
  return <HomePageClient />;
}
