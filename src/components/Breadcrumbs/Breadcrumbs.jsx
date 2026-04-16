'use client';

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

/**
 * Breadcrumbs Component - SEO Optimized
 * Implements structured navigation with schema.org markup
 * @param {Array} items - Breadcrumb items [{label, href}]
 * @param {string} className - Additional CSS classes
 */
export default function Breadcrumbs({ items = [], className = '' }) {
  if (!items || items.length === 0) return null;

  // Generate JSON-LD schema for breadcrumbs
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://nameverse.vercel.app'
      },
      ...items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 2,
        name: item.label,
        ...(item.href && { item: `https://nameverse.vercel.app${item.href}` })
      }))
    ]
  };

  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Visual Breadcrumbs */}
      <nav
        className={`flex items-center gap-2 text-sm mb-6 ${className}`}
        aria-label="Breadcrumb"
      >
        <Link
          href="/"
          className="text-gray-600 hover:text-indigo-600 flex items-center gap-1 transition-colors"
          aria-label="Go to homepage"
        >
          <Home size={16} aria-hidden="true" />
          <span>Home</span>
        </Link>

        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <ChevronRight size={16} className="text-gray-400" aria-hidden="true" />
            {index === items.length - 1 ? (
              <span className="font-semibold text-gray-900" aria-current="page">
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href}
                className="text-gray-600 hover:text-indigo-600 transition-colors"
              >
                {item.label}
              </Link>
            )}
          </div>
        ))}
      </nav>
    </>
  );
}

/**
 * Generate breadcrumb items for name pages
 * @param {Object} name - Name data
 * @param {string} religion - Religion param
 * @param {string} slug - Name slug
 * @returns {Array} Breadcrumb items
 */
export function generateNameBreadcrumbs(name, religion, slug) {
  const items = [
    { label: 'Names', href: '/names' },
    { label: religion.charAt(0).toUpperCase() + religion.slice(1), href: `/names/${religion}` }
  ];

  // Add letter navigation if available
  if (name.name && name.name[0]) {
    const firstLetter = name.name[0].toUpperCase();
    items.push({
      label: `Letter ${firstLetter}`,
      href: `/names/${religion}/letter/${firstLetter.toLowerCase()}`
    });
  }

  // Add current name (no href for current page)
  items.push({ label: name.name, href: null });

  return items;
}

/**
 * Generate breadcrumb items for article pages
 * @param {Object} article - Article data
 * @returns {Array} Breadcrumb items
 */
export function generateArticleBreadcrumbs(article) {
  const items = [
    { label: 'Blog', href: '/blog' }
  ];

  // Add category if available
  if (article.category) {
    items.push({
      label: article.category,
      href: `/blog?category=${encodeURIComponent(article.category)}`
    });
  }

  // Add current article (no href)
  items.push({ label: article.title, href: null });

  return items;
}

/**
 * Generate breadcrumb items for search pages
 * @param {string} searchTerm - Search query
 * @returns {Array} Breadcrumb items
 */
export function generateSearchBreadcrumbs(searchTerm) {
  return [
    { label: 'Search', href: '/search' },
    { label: searchTerm, href: null }
  ];
}

export {
  generateNameBreadcrumbs,
  generateArticleBreadcrumbs,
  generateSearchBreadcrumbs,
};
