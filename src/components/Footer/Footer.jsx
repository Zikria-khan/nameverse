import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 border-t mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo + Description */}
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
            <p className="text-gray-600 text-sm leading-relaxed">
              Discover meaningful baby names across cultures, religions, and languages.
              Explore 60,000+ Islamic, Christian, and Hindu names with deep meanings, origins, and cultural significance.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-3">Quick Links</h3>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li><Link href="/islamic/boy-names" className="hover:text-indigo-700">Islamic Boy Names</Link></li>
              <li><Link href="/islamic/girl-names" className="hover:text-indigo-700">Islamic Girl Names</Link></li>
              <li><Link href="/christian/boy-names" className="hover:text-indigo-700">Christian Boy Names</Link></li>
              <li><Link href="/christian/girl-names" className="hover:text-indigo-700">Christian Girl Names</Link></li>
              <li><Link href="/hindu/boy-names" className="hover:text-indigo-700">Hindu Boy Names</Link></li>
              <li><Link href="/hindu/girl-names" className="hover:text-indigo-700">Hindu Girl Names</Link></li>
            </ul>
          </div>

           {/* Categories */}
           <div>
             <h3 className="text-sm font-semibold text-gray-800 mb-3">Browse by Religion</h3>
             <ul className="space-y-2 text-gray-600 text-sm">
                <li><Link href="/names/religion/islamic/1" className="hover:text-indigo-700">Islamic Names</Link></li>
                <li><Link href="/names/religion/christian/1" className="hover:text-indigo-700">Christian Names</Link></li>
                <li><Link href="/names/religion/hindu/1" className="hover:text-indigo-700">Hindu Names</Link></li>
                <li><Link href="/names/islamic/origin/arabic/1" className="hover:text-indigo-700">Arabic Origin Names</Link></li>
                <li><Link href="/names/hindu/letter/A/1" className="hover:text-indigo-700">Names by Letter</Link></li>
                <li><Link href="/names/christian/categories/traditional/1" className="hover:text-indigo-700">Traditional Christian Names</Link></li>
             </ul>
           </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-3">Stay Inspired</h3>
            <form className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Your email address"
                className="px-3 py-2 rounded-md border border-gray-300 text-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
              <button
                type="submit"
                className="bg-indigo-600 text-white text-sm py-2 rounded-md hover:bg-indigo-700"
              >
                Subscribe
              </button>
            </form>
            <p className="text-xs text-gray-500 mt-2">
              No spam. Only soulful names.
            </p>
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
