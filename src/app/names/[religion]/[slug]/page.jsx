import { notFound } from 'next/navigation';
import { fetchNameDetail } from '@/lib/api/names';
import NameDetailClient from '@/components/names/NameDetailClient';

const VALID_RELIGIONS = ['islamic', 'christian', 'hindu'];

function normalizeReligion(religion) {
  if (!religion || typeof religion !== 'string') return null;
  const normalized = religion.toLowerCase();
  return VALID_RELIGIONS.includes(normalized) ? normalized : null;
}

export default async function NameDetailPage({ params }) {
  const religion = normalizeReligion(params?.religion);
  const slug = typeof params?.slug === 'string' ? params.slug : null;

  if (!religion || !slug) {
    return notFound();
  }

  const nameData = await fetchNameDetail(religion, slug);
  if (!nameData) {
    return notFound();
  }

  return <NameDetailClient data={nameData} initialLanguage="en" />;
}
