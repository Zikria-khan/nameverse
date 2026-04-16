"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Calendar, Clock, ArrowRight, Bookmark, Share2 } from "lucide-react";

const bgGradients = [
  "from-emerald-500 to-teal-600",
  "from-orange-500 to-red-600",
  "from-blue-500 to-indigo-600",
  "from-indigo-600 to-purple-600",
  "from-violet-600 to-purple-600",
  "from-cyan-500 to-blue-600",
  "from-amber-500 to-orange-600",
  "from-rose-600 to-pink-600",
];

const getStableGradient = (index) => {
  return bgGradients[index % bgGradients.length];
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric',
    year: 'numeric' 
  });
};

// Article Card Component
const ArticleCard = ({ article, index }) => {
  const [imageError, setImageError] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleBookmark = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
  };

  const handleShare = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.excerpt || article.subtitle,
          url: `/blog/${article.slug}`,
        });
      } catch {
        console.log('Share cancelled');
      }
    }
  };

  return (
    <Link
      href={`/blog/${article.slug}`}
      className="group block bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-200"
    >
      <div className="relative h-48 overflow-hidden bg-gray-100">
        {article.cover_image_url && !imageError ? (
          <img
            src={article.cover_image_url}
            alt={article.title}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div className={`bg-gradient-to-br ${getStableGradient(index)} w-full h-full flex items-center justify-center`}>
            <span className="text-4xl font-black text-white drop-shadow-lg">NV</span>
          </div>
        )}

        {article.category && (
          <div className="absolute top-3 left-3">
            <span className="px-2.5 py-1 bg-white/95 backdrop-blur-sm rounded-lg text-xs font-bold text-gray-900">
              {article.category}
            </span>
          </div>
        )}

        <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={handleBookmark}
            className="p-1.5 bg-white/95 backdrop-blur-sm rounded-lg hover:bg-white transition-colors"
            aria-label="Bookmark"
          >
            <Bookmark 
              className={`w-4 h-4 ${isBookmarked ? 'fill-gray-900 text-gray-900' : 'text-gray-600'}`} 
            />
          </button>
          <button
            onClick={handleShare}
            className="p-1.5 bg-white/95 backdrop-blur-sm rounded-lg hover:bg-white transition-colors"
            aria-label="Share"
          >
            <Share2 className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        {article.read_time_minutes && (
          <div className="absolute bottom-3 right-3">
            <div className="flex items-center gap-1 px-2 py-1 bg-black/70 backdrop-blur-sm rounded-lg text-white text-xs font-semibold">
              <Clock className="w-3 h-3" />
              {article.read_time_minutes} min
            </div>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-base font-bold text-gray-900 mb-2 line-clamp-2 leading-tight group-hover:text-gray-700 transition-colors">
          {article.title}
        </h3>
        {(article.excerpt || article.subtitle) && (
          <p className="text-gray-600 text-sm leading-relaxed mb-3 line-clamp-2">
            {article.excerpt || article.subtitle}
          </p>
        )}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            {article.author ? (
              <div className="flex items-center gap-1.5">
                <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-xs font-bold text-gray-700">
                    {article.author.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="font-medium">{article.author}</span>
              </div>
            ) : article.created_at ? (
              <div className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {formatDate(article.created_at)}
              </div>
            ) : null}
          </div>
          <div className="flex items-center gap-1 text-gray-900 font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
            <span>Read</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </Link>
  );
};

// Empty State
const EmptyState = () => (
  <div className="col-span-full flex flex-col items-center justify-center py-16 px-4">
    <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center mb-4">
      <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
      </svg>
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-2">No Articles Found</h3>
    <p className="text-sm text-gray-600 text-center max-w-md">
      Check back later for new content.
    </p>
  </div>
);

// Skeleton
const SkeletonCard = () => (
  <div className="bg-white rounded-xl overflow-hidden border border-gray-200 animate-pulse">
    <div className="h-48 bg-gray-200" />
    <div className="p-4">
      <div className="h-5 bg-gray-200 rounded mb-2 w-3/4" />
      <div className="h-4 bg-gray-200 rounded mb-2" />
      <div className="h-4 bg-gray-200 rounded mb-3 w-5/6" />
      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gray-200 rounded-full" />
          <div className="h-3 bg-gray-200 rounded w-16" />
        </div>
        <div className="h-3 bg-gray-200 rounded w-12" />
      </div>
    </div>
  </div>
);

// Main Component
export default function ArticleGrid({ articles, isLoading = false }) {
  return (
    <div className="w-full">
      {/* Section Heading */}
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Featured Articles
      </h2>

      {isLoading ? (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : !articles?.length ? (
        <EmptyState />
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {articles.map((article, idx) => (
            <ArticleCard key={article.id || idx} article={article} index={idx} />
          ))}
        </div>
      )}

      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}