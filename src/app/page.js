import HomePageClient from "../components/HomePage/Homepage";

// ✅ Read domain from .env
const DOMAIN = process.env.NEXT_PUBLIC_SITE_URL || "https://nameverse.vercel.app";

// World-class SEO metadata with comprehensive keyword targeting
export const metadata = {
  title: "60,000+ Baby Names with Meanings | NameVerse",
  description:
    "Find 60,000+ baby names with meanings in English, Urdu, Arabic & Hindi. Explore Islamic, Hindu & Christian names with origins and pronunciation guides.",
  keywords: [
    "baby names with meanings",
    "baby boy names 2026",
    "baby girl names 2026",
    "Islamic baby names",
    "Muslim names with meanings",
    "Hindu baby names",
    "Sanskrit names for boys",
    "Christian baby names",
    "Biblical names with meanings",
    "baby name meanings in Urdu",
    "Arabic baby names",
    "popular baby names 2026",
    "unique baby names",
    "modern baby names",
    "baby name generator"
  ].join(', '),
  openGraph: {
    title: "60,000+ Baby Names with Meanings | NameVerse",
    description:
      "Find your baby's perfect name from verified Islamic, Hindu & Christian names with complete meanings, cultural origins, and pronunciation guides.",
    url: DOMAIN + "/",
    type: "website",
    siteName: "NameVerse",
    images: [{ url: DOMAIN + "/logo.png", width: 1200, height: 630, alt: "NameVerse - Baby Names & Meanings" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "60,000+ Baby Names with Meanings | NameVerse",
    description:
      "Discover your baby's perfect name from verified Islamic, Hindu & Christian traditions with complete meanings and cultural significance.",
    images: [DOMAIN + "/logo.png"],
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
