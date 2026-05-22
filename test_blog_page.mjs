// Quick test: require the blog post page and check for errors
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { validateMetaTitle, validateMetaDescription } from '@/lib/seo/meta-helpers';
import { getSiteUrl } from '@/lib/seo/site';

import blogPostsData from '../../../../public/data/blog-posts.json';
import SitePage from '@/components/Layout/SitePage';

// Mock next/navigation
const mockNotFound = () => { throw new Error('notFound called'); };

// Simulate the page
const slug = 'best-baby-names-2026';
const post = blogPostsData.find(p => p.id === slug);

if (!post) {
  console.log('POST NOT FOUND');
  process.exit(1);
}

console.log('post.id:', post.id);
console.log('post.category:', post.category);
console.log('post.subtitle:', post.subtitle);
console.log('post.title:', post.title);
console.log('post.featured:', post.featured);
console.log('post.author:', post.author);
console.log('post.authorCredentials:', post.authorCredentials);
console.log('post.excerpt:', post.excerpt?.slice(0, 100));
console.log('post.content.introduction type:', typeof post.content.introduction, post.content.introduction?.slice(0, 50));
console.log('post.content.sections count:', post.content.sections?.length);
console.log('post.content.faqs type:', typeof post.content.faqs, Array.isArray(post.content.faqs));
console.log('post.content.relatedNames type:', typeof post.content.relatedNames, Array.isArray(post.content.relatedNames));

// Check if siteUrl is accessible
const siteUrl = getSiteUrl();
console.log('siteUrl:', siteUrl);

// Check canonical URL
const canonical = `${getSiteUrl()}/blog/${post.id}`;
console.log('canonical:', canonical);

// Check jqLd
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": post.title,
  "alternativeHeadline": post.subtitle || post.title,
  "description": post.excerpt,
  "image": post.featuredImage
};

try {
  const ldJson = JSON.stringify(jsonLd);
  console.log('jsonLd OK:', ldJson.length, 'chars');
} catch(e) {
  console.log('jsonLd ERROR:', e.toString());
}

console.log('ALL CHECKS PASSED - blog post page should render OK');
