import Link from 'next/link';
import { BookOpen, Heart, Clock, ArrowRight, Calendar, Award, TrendingUp, User } from 'lucide-react';
import blogPostsData from '../../../public/data/blog-posts.json';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://nameverse.vercel.app';

export const metadata = {
  title: 'Baby Names Blog & Expert Guides | Naming Tips, Trends & Advice | NameVerse',
  description: 'Expert guides and articles on choosing the perfect baby name. Learn about Islamic, Christian, and Hindu naming traditions, trends for 2026, and tips from naming experts.',
  keywords: 'baby names blog, naming guides, baby name trends 2026, Islamic naming guide, Christian naming guide, Hindu naming guide, how to choose baby name, baby naming tips',
  alternates: {
    canonical: `${SITE_URL}/blog`,
  },
  robots: { index: true, follow: true },
};

export default function BlogPage() {
  const featuredPosts = blogPostsData.filter(p => p.featured);
  const recentPosts = blogPostsData.filter(p => !p.featured);

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section - Clean & Professional */}
      <section className="py-16 px-4 bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto">
          <nav className="mb-6 text-sm text-gray-500">
            <Link href="/" className="hover:text-gray-700">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium">Blog</span>
          </nav>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Baby Names Blog & Expert Guides
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl">
            Expert advice, naming traditions, cultural insights, and the latest trends 
            to help you choose the perfect name for your baby.
          </p>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Featured Guides</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredPosts.map((post) => (
              <article 
                key={post.id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-200 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-blue-100 text-blue-700 px-2.5 py-1 rounded text-xs font-medium">
                      {post.category}
                    </span>
                    <span className="bg-amber-100 text-amber-700 px-2.5 py-1 rounded text-xs font-medium">
                      Featured
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <span>{post.author}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>
                  
                  <Link 
                    href={`/blog/${post.id}`}
                    className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium text-sm"
                  >
                    Read article
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Browse Names Section */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Browse Names by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link 
              href="/islamic/boy-names"
              className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Islamic Boy Names</h3>
              <p className="text-sm text-gray-500">150+ names</p>
            </Link>
            <Link 
              href="/islamic/girl-names"
              className="p-4 border border-gray-200 rounded-lg hover:border-pink-300 hover:bg-pink-50 transition-colors"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Islamic Girl Names</h3>
              <p className="text-sm text-gray-500">200+ names</p>
            </Link>
            <Link 
              href="/christian/boy-names"
              className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Christian Boy Names</h3>
              <p className="text-sm text-gray-500">100+ names</p>
            </Link>
            <Link 
              href="/christian/girl-names"
              className="p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Christian Girl Names</h3>
              <p className="text-sm text-gray-500">100+ names</p>
            </Link>
          </div>
        </div>
      </section>

      {/* More Articles */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">More Articles</h2>
          
          <div className="space-y-4">
            {recentPosts.map((post) => (
              <article 
                key={post.id}
                className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex-1">
                    <span className="bg-gray-100 text-gray-700 px-2.5 py-1 rounded text-xs font-medium">
                      {post.category}
                    </span>
                    <h3 className="text-lg font-bold text-gray-900 mt-2 mb-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>By {post.author}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </span>
                    </div>
                  </div>
                  <Link 
                    href={`/blog/${post.id}`}
                    className="flex-shrink-0 px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    Read more
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Find the Perfect Name?
          </h2>
          <p className="text-gray-600 mb-8">
            Explore our database of 60,000+ baby names with detailed meanings and origins.
          </p>
          <Link 
            href="/names"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Heart className="w-5 h-5" />
            Browse All Names
          </Link>
        </div>
      </section>
    </main>
  );
}