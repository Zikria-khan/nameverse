import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 border-t mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: Logo + About */}
          <div>
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 relative">
                <Image
                  src="/logo.png"
                  alt="NameVerse logo - Islamic, Christian, and Hindu baby names with meanings and cultural origins"
                  fill
                  className="object-cover rounded-full"
                />
              </div>
              <span className="text-xl font-bold text-indigo-700">NameVerse</span>
            </Link>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              Discover meaningful baby names across cultures, religions, and languages.
              Explore 60,000+ Islamic, Christian, and Hindu names with deep meanings, origins, and cultural significance.
            </p>
            <Link
              href="/names"
              className="inline-block text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              Browse All Names →
            </Link>
          </div>

          {/* Column 2: Names by Religion */}
          <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-3">Names by Religion</h3>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li><Link href="/names" className="hover:text-indigo-700">👉 All Baby Names</Link></li>
              <li><Link href="/islamic/boy-names" className="hover:text-indigo-700">🕌 Islamic Boy Names</Link></li>
              <li><Link href="/islamic/girl-names" className="hover:text-indigo-700">🕌 Islamic Girl Names</Link></li>
              <li><Link href="/christian/boy-names" className="hover:text-indigo-700">✝️ Christian Boy Names</Link></li>
              <li><Link href="/christian/girl-names" className="hover:text-indigo-700">✝️ Christian Girl Names</Link></li>
              <li><Link href="/hindu/boy-names" className="hover:text-indigo-700">🔱 Hindu Boy Names</Link></li>
              <li><Link href="/hindu/girl-names" className="hover:text-indigo-700">🔱 Hindu Girl Names</Link></li>
              <li><Link href="/names/religion/islamic/1" className="hover:text-indigo-700">All Islamic Names A–Z</Link></li>
              <li><Link href="/names/religion/christian/1" className="hover:text-indigo-700">All Christian Names A–Z</Link></li>
              <li><Link href="/names/religion/hindu/1" className="hover:text-indigo-700">All Hindu Names A–Z</Link></li>
              <li><Link href="/names/islamic/origin/arabic/1" className="hover:text-indigo-700">Names by Origin</Link></li>
            </ul>
          </div>

          {/* Column 3: Explore & Tools */}
          <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-3">Explore Names</h3>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li><Link href="/trending-names" className="hover:text-indigo-700">📈 Trending Names 2026</Link></li>
              <li><Link href="/unique-names" className="hover:text-indigo-700">✨ Unique Names</Link></li>
              <li><Link href="/popularity" className="hover:text-indigo-700">⭐ Popular Names</Link></li>
              <li><Link href="/name-meanings" className="hover:text-indigo-700">📖 Name Meanings</Link></li>
              <li><Link href="/names-by-meaning" className="hover:text-indigo-700">🔍 Browse by Meaning</Link></li>
              <li><Link href="/languages" className="hover:text-indigo-700">🌍 Names by Language</Link></li>
              <li><Link href="/names/islamic/letter/A" className="hover:text-indigo-700">🔤 Names by Letter A–Z</Link></li>
              <li><Link href="/advanced-search" className="hover:text-indigo-700">🔎 Advanced Search</Link></li>
              <li><Link href="/search" className="hover:text-indigo-700">🔎 Search Names</Link></li>
            </ul>
          </div>

          {/* Column 4: Resources & Info */}
          <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-3">Resources</h3>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li><Link href="/blog" className="hover:text-indigo-700">📝 Blog & Articles</Link></li>
              <li><Link href="/guides/expert-naming-guide" className="hover:text-indigo-700">📚 Expert Naming Guide</Link></li>
              <li><Link href="/my-names" className="hover:text-indigo-700">💾 Saved Names</Link></li>
            </ul>

            <h3 className="text-sm font-semibold text-gray-800 mb-3 mt-6">Info</h3>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li><Link href="/about" className="hover:text-indigo-700">ℹ️ About Us</Link></li>
              <li><Link href="/privacy" className="hover:text-indigo-700">🔒 Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-indigo-700">📄 Terms of Service</Link></li>
              <li><Link href="/sitemap.xml" className="hover:text-indigo-700">🗺️ Sitemap</Link></li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <div className="flex flex-wrap items-center gap-4">
            <p>© {currentYear} NameVerse. All rights reserved.</p>
            <Link href="/privacy" className="hover:text-indigo-700">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-indigo-700">Terms of Service</Link>
            <Link href="/sitemap.xml" className="hover:text-indigo-700">Sitemap</Link>
          </div>
          {/* Social links - Only show if you have actual social media accounts
          <div className="flex space-x-4">
            <Link href="https://facebook.com/nameverse" aria-label="Facebook" className="hover:text-indigo-700" target="_blank" rel="noopener">
              <Facebook size={18} />
            </Link>
            <Link href="https://twitter.com/nameverse" aria-label="Twitter" className="hover:text-indigo-700" target="_blank" rel="noopener">
              <Twitter size={18} />
            </Link>
            <Link href="https://instagram.com/nameverse" aria-label="Instagram" className="hover:text-indigo-700" target="_blank" rel="noopener">
              <Instagram size={18} />
            </Link>
          </div>
          */}
        </div>
      </div>
    </footer>
  );
}
