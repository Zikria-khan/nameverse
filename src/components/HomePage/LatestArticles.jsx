'use client';

import Link from 'next/link';
import { Clock, User, Calendar, BookOpen } from 'lucide-react';
import Image from 'next/image';

const LatestArticles = ({ articles }) => {
  // Category color mapping
  const categoryColors = {
    'Islamic Names': {
      gradient: 'from-emerald-500 to-teal-600',
      bg: 'bg-emerald-50',
      badge: 'bg-emerald-100 text-emerald-700',
      border: 'border-emerald-200',
      hover: 'hover:border-emerald-300'
    },
    'Christian Names': {
      gradient: 'from-blue-500 to-indigo-600',
      bg: 'bg-blue-50',
      badge: 'bg-blue-100 text-blue-700',
      border: 'border-blue-200',
      hover: 'hover:border-blue-300'
    },
    'Hindu Names': {
      gradient: 'from-orange-500 to-amber-600',
      bg: 'bg-orange-50',
      badge: 'bg-orange-100 text-orange-700',
      border: 'border-orange-200',
      hover: 'hover:border-orange-300'
    },
    'Trends': {
      gradient: 'from-purple-500 to-pink-600',
      bg: 'bg-purple-50',
      badge: 'bg-purple-100 text-purple-700',
      border: 'border-purple-200',
      hover: 'hover:border-purple-300'
    },
    'Tips & Advice': {
      gradient: 'from-pink-500 to-rose-600',
      bg: 'bg-pink-50',
      badge: 'bg-pink-100 text-pink-700',
      border: 'border-pink-200',
      hover: 'hover:border-pink-300'
    },
    'Unique Names': {
      gradient: 'from-cyan-500 to-blue-600',
      bg: 'bg-cyan-50',
      badge: 'bg-cyan-100 text-cyan-700',
      border: 'border-cyan-200',
      hover: 'hover:border-cyan-300'
    },
    'Nature Names': {
      gradient: 'from-green-500 to-emerald-600',
      bg: 'bg-green-50',
      badge: 'bg-green-100 text-green-700',
      border: 'border-green-200',
      hover: 'hover:border-green-300'
    },
    'Vintage Names': {
      gradient: 'from-amber-500 to-yellow-600',
      bg: 'bg-amber-50',
      badge: 'bg-amber-100 text-amber-700',
      border: 'border-amber-200',
      hover: 'hover:border-amber-300'
    },
    'Gender-Neutral Names': {
      gradient: 'from-indigo-500 to-purple-600',
      bg: 'bg-indigo-50',
      badge: 'bg-indigo-100 text-indigo-700',
      border: 'border-indigo-200',
      hover: 'hover:border-indigo-300'
    }
  };

  // Default colors if category not found
  const defaultColors = {
    gradient: 'from-gray-500 to-gray-600',
    bg: 'bg-gray-50',
    badge: 'bg-gray-100 text-gray-700',
    border: 'border-gray-200',
    hover: 'hover:border-gray-300'
  };

  const truncateExcerpt = (excerpt, maxLength = 120) => {
    if (!excerpt) return '';
    if (excerpt.length <= maxLength) return excerpt;
    return excerpt.substring(0, maxLength).trim() + '...';
  };

  // Generate structured data for articles
  const generateArticleStructuredData = (article, position) => {
    const colors = categoryColors[article.category] || defaultColors;
    const date = article.publishDate || article.lastUpdated || new Date().toISOString();
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://nameverse.vercel.app';
    
    return {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      'itemListElement': articles.map((article, index) => ({
        '@type': 'ListItem',
        'position': index + 1,
        'item': {
          '@type': 'Article',
          'headline': article.title,
          'description': article.excerpt,
          'author': {
            '@type': 'Person',
            'name': article.author,
            'credential': article.authorCredentials
          },
          'datePublished': article.publishDate || article.lastUpdated,
          'dateModified': article.lastUpdated,
          'image': article.featuredImage
            ? (article.featuredImage.startsWith('http') ? article.featuredImage : `${siteUrl}${article.featuredImage}`)
            : `${siteUrl}/api/og?title=${encodeURIComponent(article.title)}`,
          'url': `${siteUrl}/blog/${article.id}`,
          'publisher': {
            '@type': 'Organization',
            'name': 'NameVerse'
          },
          'about': article.category,
          'timeRequired': article.readTime,
          'wordCount': article.content?.introduction?.length || 0
        }
      }))
    };
  };

  if (!articles || articles.length === 0) {
    return null;
  }

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ 
          __html: JSON.stringify(generateArticleStructuredData(articles)) 
        }}
      />
      
      <section className="py-8 sm:py-10 md:py-12 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Section Header */}
          <div className="text-center mb-8 md:mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full mb-4 shadow-md">
              <BookOpen className="w-4 h-4 text-white" />
              <span className="text-sm font-semibold text-white">Expert Guidance</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Latest from <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">NameVerse Blog</span>
            </h2>
            <p className="text-base text-gray-600 max-w-3xl mx-auto">
              Expert guides, cultural insights, and naming advice from our team of scholars and nameologists. Discover the stories and traditions behind beautiful names.
            </p>
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mb-8">
            {articles.map((article) => {
              const colors = categoryColors[article.category] || defaultColors;
              const truncatedExcerpt = truncateExcerpt(article.excerpt, 120);
              const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://nameverse.vercel.app';
              const imageUrl = article.featuredImage
                ? (article.featuredImage.startsWith('http') ? article.featuredImage : `${siteUrl}${article.featuredImage}`)
                : `${siteUrl}/api/og?title=${encodeURIComponent(article.title)}`;
              
              return (
                <Link
                  key={article.id}
                  href={`/blog/${article.id}`}
                  className={`group block h-full transition-all duration-300 hover:-translate-y-1`}
                >
                  <article
                    className={`flex flex-col h-full bg-white rounded-xl border-2 ${colors.border} ${colors.hover} shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden`}
                  >
                    {/* Featured Image */}
                     <div className="relative h-48 overflow-hidden bg-gray-100">
                       <Image
                         src={imageUrl}
                         alt={article.title}
                         fill
                         className="object-cover transition-transform duration-300 group-hover:scale-105"
                         sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                       />
                       <div className="absolute top-3 left-3">
                        <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${colors.badge} shadow-sm`}>
                          {article.category}
                        </span>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-5 sm:p-6 flex flex-col flex-1">
                      {/* Article Title */}
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 leading-tight group-hover:text-blue-600 transition-colors line-clamp-2">
                        {article.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-sm text-gray-600 mb-4 flex-1 leading-relaxed line-clamp-3">
                        {truncatedExcerpt}
                      </p>

                      {/* Article Meta */}
                      <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs text-gray-500 mb-4 border-t border-gray-100 pt-3">
                        <div className="flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5" />
                          <span className="font-medium truncate max-w-[100px] sm:max-w-none">
                            {article.author}
                          </span>
                        </div>
                        {article.publishDate && (
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5" />
                            <time dateTime={article.publishDate}>
                              {new Date(article.publishDate).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                              })}
                            </time>
                          </div>
                        )}
                        <div className="flex items-center gap-1.5 ml-auto">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{article.readTime}</span>
                        </div>
                      </div>

                      <div className={`inline-flex items-center justify-center gap-2 w-full py-2.5 sm:py-3 bg-indigo-50 text-indigo-700 text-sm font-semibold rounded-lg group-hover:bg-indigo-100 transition-colors`}>
                        Read Article
                      </div>
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>

        </div>
      </section>
    </>
  );
};

export default LatestArticles;
