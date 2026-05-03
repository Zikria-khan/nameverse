import Link from 'next/link';
import { notFound } from 'next/navigation';
import { validateMetaTitle, validateMetaDescription } from '@/lib/seo/meta-helpers';
import { BookOpen, Heart, Clock, ArrowLeft, Share2, Calendar, User, Tag, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import blogPostsData from '../../../../public/data/blog-posts.json';
import Image from 'next/image';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://nameverse.vercel.app';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = blogPostsData.find(p => p.id === slug);
  
  if (!post) {
    return { title: 'Post Not Found | NameVerse' };
  }

  return {
    title: validateMetaTitle(`${post.title} | NameVerse`),
    description: validateMetaDescription(post.excerpt),
    keywords: post.seoKeywords || post.tags.join(', '),
    alternates: {
      canonical: `${SITE_URL}/blog/${post.id}`,
      languages: { en: `${SITE_URL}/blog/${post.id}`, 'x-default': `${SITE_URL}/blog/${post.id}` }
    },
    openGraph: {
      title: validateMetaTitle(post.title),
      description: validateMetaDescription(post.excerpt),
      type: 'article',
      url: `${SITE_URL}/blog/${post.id}`,
      publishedTime: post.publishDate,
      modifiedTime: post.lastUpdated,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      title: validateMetaTitle(post.title),
      description: validateMetaDescription(post.excerpt),
    },
    robots: { index: true, follow: true },
  };
}

export async function generateStaticParams() {
  return blogPostsData.map((post) => ({
    slug: post.id,
  }));
}

// FAQ Schema Component
function FAQSchema({ faqs }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Featured Name Link Component
function FeaturedNameLink({ name, religion = 'islamic' }) {
  // Handle both string names and object names with a 'name' property
  const displayName = typeof name === 'string' ? name : name.name;
  // Generate a slug from the name for URL
  const nameSlug = displayName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  
  return (
    <Link
      href={`/names/${religion}/${nameSlug}`}
      className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-medium hover:bg-blue-100 transition-colors border border-blue-200"
    >
      {displayName}
      <ExternalLink className="w-3 h-3" />
    </Link>
  );
}

// Helper function to get religion from category
function getReligionFromCategory(category) {
  const categoryLower = category.toLowerCase();
  if (categoryLower.includes('islamic') || categoryLower.includes('muslim')) return 'islamic';
  if (categoryLower.includes('christian') || categoryLower.includes('biblical')) return 'christian';
  if (categoryLower.includes('hindu') || categoryLower.includes('vedic') || categoryLower.includes('sanskrit')) return 'hindu';
  return 'islamic'; // default
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = blogPostsData.find(p => p.id === slug);

  if (!post) {
    notFound();
  }

  const religion = getReligionFromCategory(post.category);

  const relatedPosts = blogPostsData
    .filter(p => p.category === post.category && p.id !== post.id)
    .slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.excerpt,
    "author": {
      "@type": "Person",
      "name": post.author,
      "jobTitle": post.authorCredentials
    },
    "publisher": {
      "@type": "Organization",
      "name": "NameVerse",
      "url": SITE_URL,
      "logo": {
        "@type": "ImageObject",
        "url": `${SITE_URL}/logo.png`,
        "width": 192,
        "height": 192
      }
    },
    "datePublished": post.publishDate,
    "dateModified": post.lastUpdated,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${post.id}`
    },
    "keywords": post.seoKeywords || post.tags.join(', '),
    "articleSection": post.category
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {post.content.faqs && post.content.faqs.length > 0 && (
        <FAQSchema faqs={post.content.faqs} />
      )}
      
      <main className="min-h-screen bg-white">
        {/* Header */}
        <section className="py-8 px-4 border-b border-gray-200">
          <div className="max-w-4xl mx-auto">
            <Link 
              href="/blog"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
            
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded text-sm font-medium">
                {post.category}
              </span>
              {post.featured && (
                <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded text-sm font-medium">
                  Featured
                </span>
              )}
            </div>
            
            {post.subtitle && (
              <p className="text-lg text-blue-600 font-medium mb-2">
                {post.subtitle}
              </p>
            )}
            
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              {post.title}
            </h1>
            
            <p className="text-lg text-gray-600 mb-6">
              {post.excerpt}
            </p>

            {/* Featured Image */}
            {post.featuredImage && (
              <div className="relative w-full h-64 md:h-96 mb-8 rounded-xl overflow-hidden bg-gray-100">
                <Image
                  src={post.featuredImage.startsWith('http') ? post.featuredImage : `${SITE_URL}${post.featuredImage}`}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            )}
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{post.author}</span>
                {post.authorCredentials && (
                  <span className="text-gray-400">— {post.authorCredentials}</span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{new Date(post.publishDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <article className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            {/* Author Box */}
            <div className="flex items-center gap-4 mb-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="font-semibold text-gray-900">{post.author}</div>
                <div className="text-sm text-gray-500">{post.authorCredentials}</div>
              </div>
            </div>

            {/* Introduction */}
            <div className="prose max-w-none mb-8">
              <p className="text-gray-700 leading-relaxed text-lg">
                {post.content.introduction}
              </p>
            </div>

            {/* Sections */}
            {post.content.sections && post.content.sections.map((section, index) => (
              <section key={index} className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {section.title}
                </h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {section.content}
                </p>
                
                {/* Featured Names - Internal Linking */}
                {section.featuredNames && section.featuredNames.length > 0 && (
                  <div className="mb-4">
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">
                      Featured Names:
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {section.featuredNames.map((name, i) => (
                        <FeaturedNameLink key={i} name={name} religion={religion} />
                      ))}
                    </div>
                  </div>
                )}

                {/* Subsections */}
                {section.subsections && section.subsections.map((subsection, subIndex) => (
                  <div key={subIndex} className="ml-4 pl-4 border-l-2 border-blue-200 mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {subsection.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {subsection.content}
                    </p>
                  </div>
                ))}
              </section>
            ))}

            {/* FAQs Section */}
            {post.content.faqs && post.content.faqs.length > 0 && (
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  {post.content.faqs.map((faq, index) => (
                    <details 
                      key={index} 
                      className="group bg-gray-50 rounded-lg border border-gray-200 overflow-hidden"
                    >
                      <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-100 transition-colors">
                        <h3 className="font-semibold text-gray-900 pr-4">
                          {faq.question}
                        </h3>
                        <ChevronDown className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform flex-shrink-0" />
                      </summary>
                      <div className="px-4 pb-4">
                        <p className="text-gray-600 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </details>
                  ))}
                </div>
              </section>
            )}

            {/* Related Names Section */}
            {post.content.relatedNames && post.content.relatedNames.length > 0 && (
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Explore Related Names
                </h2>
                <p className="text-gray-600 mb-4">
                  Click on any name below to explore its meaning and origin:
                </p>
                <div className="flex flex-wrap gap-2">
                  {post.content.relatedNames.map((name, i) => (
                    <FeaturedNameLink key={i} name={name} religion={religion} />
                  ))}
                </div>
              </section>
            )}

            {/* Tags */}
            <div className="mt-10 pt-6 border-t border-gray-200">
              <div className="flex items-center gap-2 mb-3">
                <Tag className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Tags:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, i) => (
                  <span key={i} className="bg-gray-100 text-gray-700 px-3 py-1 rounded text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Share */}
            <div className="flex items-center gap-4 mt-6 pt-6 border-t border-gray-200">
              <span className="text-sm font-medium text-gray-700">Share:</span>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`${SITE_URL}/blog/${post.id}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                title="Share on Twitter"
              >
                <Share2 className="w-4 h-4" />
              </a>
            </div>
          </div>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="py-12 px-4 bg-gray-50">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Link 
                    key={relatedPost.id}
                    href={`/blog/${relatedPost.id}`}
                    className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow"
                  >
                    <span className="text-xs text-blue-600 font-medium">
                      {relatedPost.category}
                    </span>
                    <h3 className="font-semibold text-gray-900 mt-2 mb-2 line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {relatedPost.excerpt}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="py-12 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Find the Perfect Name?
            </h2>
            <p className="text-gray-600 mb-6">
              Explore our database of 60,000+ baby names with meanings, origins, and numerology.
            </p>
            <Link
              href="/names/religion/islamic/1"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Heart className="w-5 h-5" />
              Browse All Names
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}