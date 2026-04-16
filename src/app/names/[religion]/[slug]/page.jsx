// app/names/[religion]/[slug]/page.jsx
import NameDetailClientV2 from './NameDetailpage';
import { generateNamePageMetadata, generateNamePageSchemas } from '@/lib/seo/name-page-seo';
import { fetchNameDetail, fetchNamesByLetter } from '@/lib/api/names';
import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';
import { validateAndSanitizeSlug, isSingleLetter } from '@/lib/utils/slugValidation';

const NamesDatabaseClient = dynamic(() => import('../letter/[letter]/NameClientComponent'), { ssr: true });

export const revalidate = 86400;  // revalidates once per day

export const dynamicParams = true;

export async function generateMetadata({ params }) {
  const { religion, slug } = await params;
  // ... (letter page logic unchanged) ...

  const nameData = await fetchNameDetail(religion, validateAndSanitizeSlug(slug));
  if (!nameData) return { title: 'Not Found' };

  return generateNamePageMetadata(nameData, religion, validateAndSanitizeSlug(slug));
}

export default async function NameSlugPage({ params }) {
  const { religion, slug } = await params;
  // ... (letter page logic unchanged) ...

  const data = await fetchNameDetail(religion, validateAndSanitizeSlug(slug));
  if (!data) return notFound();

  const schemas = generateNamePageSchemas(data, religion, validateAndSanitizeSlug(slug));

  return (
    <>
      {/* Structured Data */}
      {schemas.product && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.product) }} />}
      {schemas.faq && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.faq) }} />}
      {schemas.breadcrumb && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.breadcrumb) }} />}
      {schemas.howTo && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.howTo) }} />}

      <NameDetailClientV2 data={data} initialLanguage="english" />
    </>
  );
}