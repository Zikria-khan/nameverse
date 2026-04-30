import { notFound } from 'next/navigation';
import { fetchNameDetail } from '@/lib/api/names';
import { generateNamePageMetadata } from '@/lib/seo/name-page-seo';
import NameDetailClient from '@/components/names/NameDetailClient';

// Use dynamic rendering to avoid generating many static pages at build time
export const dynamic = 'force-dynamic';

const VALID_RELIGIONS = ['islamic', 'christian', 'hindu'];

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

  return <NameDetailClient data={nameData} initialLanguage="en" />;
}
