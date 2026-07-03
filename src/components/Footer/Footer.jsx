import Image from 'next/image';
import Link from 'next/link';
import { Globe, Link2, Share2, User, BookOpen, Sparkles, Heart, TrendingUp, Search, Grid3X3, Network, LayoutDashboard } from 'lucide-react';

const footerLinks = {
  'By Religion': [
    { label: 'Islamic Names', href: '/islamic/boy-names', desc: 'Arabic, Urdu & Quranic' },
    { label: 'Islamic Boy Names', href: '/islamic/boy-names', desc: 'Male Islamic names' },
    { label: 'Islamic Girl Names', href: '/islamic/girl-names', desc: 'Female Islamic names' },
    { label: 'Christian Names', href: '/christian/boy-names', desc: 'Biblical & saint names' },
    { label: 'Christian Boy Names', href: '/christian/boy-names', desc: 'Male Christian names' },
    { label: 'Christian Girl Names', href: '/christian/girl-names', desc: 'Female Christian names' },
    { label: 'Hindu Names', href: '/hindu/boy-names', desc: 'Sanskrit & Vedic names' },
    { label: 'Hindu Boy Names', href: '/hindu/boy-names', desc: 'Male Hindu names' },
    { label: 'Hindu Girl Names', href: '/hindu/girl-names', desc: 'Female Hindu names' },
    { label: 'Biblical Names', href: '/names/christian/categories/biblical/1', desc: 'Names from the Bible' },
    { label: 'Quranic Names', href: '/names/islamic/categories/quranic/1', desc: 'Names from the Quran' },
  ],
  'By Origin': [
    { label: 'Arabic Names', href: '/names/islamic/origin/arabic/1', desc: 'Arabic origin names' },
    { label: 'Hebrew Names', href: '/names/christian/origin/hebrew/1', desc: 'Hebrew origin names' },
    { label: 'Sanskrit Names', href: '/names/hindu/origin/sanskrit/1', desc: 'Sanskrit origin names' },
    { label: 'Persian Names', href: '/names/islamic/origin/persian/1', desc: 'Persian origin names' },
    { label: 'Turkish Names', href: '/names/islamic/origin/turkish/1', desc: 'Turkish origin names' },
    { label: 'Urdu Names', href: '/names/islamic/origin/urdu/1', desc: 'Urdu origin names' },
    { label: 'English Names', href: '/names/christian/origin/english/1', desc: 'English origin names' },
    { label: 'Greek Names', href: '/names/christian/origin/greek/1', desc: 'Greek origin names' },
    { label: 'Latin Names', href: '/names/christian/origin/latin/1', desc: 'Latin origin names' },
    { label: 'African Names', href: '/names/christian/origin/african/1', desc: 'African origin names' },
  ],
  'By Theme': [
    { label: 'Nature Names', href: '/names/islamic/categories/nature/1', desc: 'Nature-inspired names' },
    { label: 'Virtue Names', href: '/names-by-meaning', desc: 'Names meaning virtues' },
    { label: 'Royal Names', href: '/names/islamic/categories/royal/1', desc: 'Regal and royal names' },
    { label: 'Modern Names', href: '/names/islamic/categories/modern/1', desc: 'Contemporary names' },
    { label: 'Unique Names', href: '/unique-names', desc: 'Distinctive name ideas' },
    { label: 'Trending Names', href: '/trending-names', desc: 'Rising in popularity' },
    { label: 'Popular Names', href: '/popularity', desc: 'Most chosen names' },
    { label: 'Short Names', href: '/names/islamic/letter/a/1', desc: 'Short and sweet' },
    { label: 'Strong Names', href: '/names-by-meaning', desc: 'Names meaning strength' },
    { label: 'Beautiful Names', href: '/names-by-meaning', desc: 'Names meaning beauty' },
  ],
  'Resources': [
    { label: 'All Names', href: '/names', desc: 'Complete name directory' },
    { label: 'Name Search', href: '/search', desc: 'Search all names' },
    { label: 'Advanced Search', href: '/advanced-search', desc: 'Filter by meaning & origin' },
    { label: 'Name Meanings', href: '/name-meanings', desc: 'Meaning-led research' },
    { label: 'Names by Meaning', href: '/names-by-meaning', desc: 'Browse by meaning' },
    { label: 'Names by Origin', href: '/names-by-origin', desc: 'Browse by origin' },
    { label: 'Knowledge Graph', href: '/names-by-meaning', desc: 'Entity relationships' },
    { label: 'Blog', href: '/blog', desc: 'Expert naming guides' },
    { label: 'Naming Guide', href: '/guides/expert-naming-guide', desc: 'Decision framework' },
    { label: 'Popular by State', href: '/popular-by-state', desc: 'US state popularity' },
    { label: 'Saved Names', href: '/my-names', desc: 'Your shortlist' },
    { label: 'About', href: '/about', desc: 'Our mission' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Sitemap', href: '/sitemap.xml' },
  ],
};

const socialLinks = [
  { label: 'Twitter', href: 'https://twitter.com/NameVerseOfficial', icon: Share2 },
  { label: 'Facebook', href: 'https://www.facebook.com/', icon: Globe },
  { label: 'Instagram', href: 'https://www.instagram.com/', icon: Link2 },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/', icon: User }
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-slate-950 text-white">
                <Image src="/logo.png" alt="NameVerse logo" width={30} height={30} className="object-contain" />
              </div>
              <div>
                <div className="text-lg font-black tracking-tight text-slate-950">NameVerse</div>
                <div className="text-xs font-semibold text-slate-500">Meanings, origins & guides</div>
              </div>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-slate-600">
              NameVerse helps parents and researchers discover baby names with meanings, cultural origins, linguistic context and trusted naming guidance.
            </p>
            <div className="mt-6 flex gap-2">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a key={social.label} href={social.href} target="_blank" rel="noreferrer" className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700" aria-label={social.label}>
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="mb-4 text-sm font-black uppercase tracking-[0.16em] text-slate-950">{title}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm font-semibold text-slate-600 transition hover:text-blue-700">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-[2rem] border border-slate-200 bg-slate-50 p-5">
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <div className="text-sm font-bold text-slate-950">Verified name research</div>
              <p className="mt-1 text-xs leading-relaxed text-slate-600">Curated meanings, origins and cultural context for major naming traditions.</p>
            </div>
            <div>
              <div className="text-sm font-bold text-slate-950">Fast discovery</div>
              <p className="mt-1 text-xs leading-relaxed text-slate-600">Search, browse and compare names with clean, mobile-first navigation.</p>
            </div>
            <div>
              <div className="text-sm font-bold text-slate-950">Parent-first guidance</div>
              <p className="mt-1 text-xs leading-relaxed text-slate-600">Practical articles and tools designed for confident family decisions.</p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-slate-200 pt-6 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
          <p>© {currentYear} NameVerse. All rights reserved.</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/privacy" className="font-semibold hover:text-blue-700">Privacy</Link>
            <Link href="/terms" className="font-semibold hover:text-blue-700">Terms</Link>
            <a href="/sitemap.xml" className="font-semibold hover:text-blue-700">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
