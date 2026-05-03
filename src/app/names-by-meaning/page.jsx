import Link from 'next/link';
import { Suspense } from 'react';
import { Heart, Shield, Brain, Leaf, Sparkles, Star, Moon, ChevronRight } from 'lucide-react';
import { validateMetaTitle, validateMetaDescription } from '@/lib/seo/meta-helpers';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://nameverse.vercel.app';

export const metadata = {
  title: validateMetaTitle('Baby Names by Meaning — Find Names by Virtue | NameVerse'),
  description: validateMetaDescription(
    'Search baby names by meaning and virtue: love, strength, wisdom, peace, and more. Find the perfect meaningful name that reflects your values across 60,000+ verified names.'
  ),
  keywords: [
    'names that mean love',
    'names meaning strength',
    'names meaning peace',
    'names meaning wisdom',
    'virtue baby names',
    'meaningful baby names',
    'baby names by virtue',
    'names with meaning'
  ].join(', '),
  openGraph: {
    title: validateMetaTitle('Baby Names by Meaning — Find Names by Virtue | NameVerse'),
    description: validateMetaDescription(
      'Discover baby names organized by meaning and virtue. Find names that mean love, strength, wisdom, peace, and other positive attributes from Islamic, Hindu, and Christian traditions.'
    ),
    url: `${SITE_URL}/names-by-meaning`,
    type: 'website',
    siteName: 'NameVerse',
    images: [
      {
        url: `${SITE_URL}/og-names-by-meaning.png`,
        width: 1200,
        height: 630,
        alt: 'Baby Names by Meaning - NameVerse'
      }
    ]
  },
  alternates: {
    canonical: `${SITE_URL}/names-by-meaning`,
    languages: { en: `${SITE_URL}/names-by-meaning`, 'x-default': `${SITE_URL}/names-by-meaning` }
  },
  robots: { index: true, follow: true }
};

const meaningCategories = [
  {
    title: 'Names That Mean Love',
    description: 'Names signifying affection, care, and deep emotional connection—perfect for a child who will be cherished.',
    icon: Heart,
    color: 'pink',
    examples: [
      { name: 'Amina', meaning: 'Trustworthy, faithful', origin: 'Arabic', religion: 'islamic' },
      { name: 'Priya', meaning: 'Beloved, loved one', origin: 'Sanskrit', religion: 'hindu' },
      { name: 'Agape', meaning: 'Highest form of love', origin: 'Greek', religion: 'christian' },
      { name: 'Mila', meaning: 'Gracious, dear', origin: 'Slavic', religion: 'christian' }
    ],
    searchTerm: 'love'
  },
  {
    title: 'Names That Mean Strength',
    description: 'Powerful names representing courage, resilience, and inner fortitude for a strong life journey.',
    icon: Shield,
    color: 'indigo',
    examples: [
      { name: 'Omar', meaning: 'Long-lived, prosperous', origin: 'Arabic', religion: 'islamic' },
      { name: 'Veer', meaning: 'Brave, hero', origin: 'Sanskrit', religion: 'hindu' },
      { name: 'Gabriel', meaning: 'God is my strength', origin: 'Hebrew', religion: 'christian' },
      { name: 'Valor', meaning: 'Courage, bravery', origin: 'Latin', culture: 'western' }
    ],
    searchTerm: 'strength'
  },
  {
    title: 'Names That Mean Wisdom',
    description: 'Intelligent names representing knowledge, insight, and the pursuit of truth and understanding.',
    icon: Brain,
    color: 'purple',
    examples: [
      { name: 'Hikmah', meaning: 'Wisdom, knowledge', origin: 'Arabic', religion: 'islamic' },
      { name: 'Vidya', meaning: 'Knowledge, wisdom', origin: 'Sanskrit', religion: 'hindu' },
      { name: 'Solomon', meaning: 'Peaceful, wise', origin: 'Hebrew', religion: 'christian' },
      { name: 'Sophia', meaning: 'Wisdom', origin: 'Greek', religion: 'christian' }
    ],
    searchTerm: 'wisdom'
  },
  {
    title: 'Names That Mean Peace',
    description: 'Serene names symbolizing harmony, tranquility, and the absence of conflict for a calm spirit.',
    icon: Leaf,
    color: 'green',
    examples: [
      { name: 'Salaam', meaning: 'Peace, safety', origin: 'Arabic', religion: 'islamic' },
      { name: 'Shanti', meaning: 'Peace, tranquility', origin: 'Sanskrit', religion: 'hindu' },
      { name: 'Solomon', meaning: 'Peaceful', origin: 'Hebrew', religion: 'christian' },
      { name: 'Frederick', meaning: 'Peaceful ruler', origin: 'German', culture: 'western' }
    ],
    searchTerm: 'peace'
  }
];

const additionalVirtues = [
  {
    title: 'Names That Mean Light',
    description: 'Illuminating names representing hope, guidance, and brightness in the world.',
    icon: Sparkles,
    color: 'amber',
    names: ['Lucas', 'Luna', 'Diya', 'Nura', 'Aurora']
  },
  {
    title: 'Names That Mean Joy',
    description: 'Happy names that bring smiles and represent happiness and celebration of life.',
    icon: Star,
    color: 'yellow',
    names: ['Felix', 'Joy', 'Asher', 'Alina', 'Rafael']
  },
  {
    title: 'Names That Mean Hope',
    description: 'Optimistic names symbolizing faith in the future and positive expectations.',
    icon: Moon,
    color: 'blue',
    names: ['Amal', 'Esperanza', 'Ashia', 'Zita', 'Nadia']
  }
];

export default async function NamesByMeaningPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <main className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50/30">
        {/* Hero Section */}
        <section className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.03] pointer-events-none"></div>
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-12 sm:mb-16">
              <div className="inline-flex items-center justify-center gap-3 mb-6">
                <div className="bg-gradient-to-br from-rose-500 to-pink-600 p-4 rounded-2xl shadow-xl shadow-rose-500/20">
                  <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </div>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Baby Names by Meaning — Find Names by Virtue
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Search baby names by meaning and virtue: love, strength, wisdom, peace, and more. Find the perfect 
                meaningful name that reflects your values across 60,000+ verified names from diverse cultures and traditions.
              </p>
            </div>
          </div>
        </section>

        {/* Main Meaning Categories */}
        <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-white/50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-12 text-center">
              Discover Names by Virtue
            </h2>
            <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
              {meaningCategories.map((category, index) => {
                const Icon = category.icon;
                return (
                  <div key={index} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <div className={`bg-gradient-to-r from-${category.color}-500 to-${category.color}-600 p-6 text-white`}>
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                          <Icon className="w-7 h-7 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold">{category.title}</h3>
                          <p className="text-sm opacity-90">{category.description}</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="grid sm:grid-cols-2 gap-4 mb-6">
                        {category.examples.map((name, idx) => (
                          <Link
                            key={idx}
                            href={`/names/${name.religion}/${name.name.toLowerCase()}`}
                            className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group"
                          >
                            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-rose-600 transition-colors" />
                            </div>
                            <div className="min-w-0">
                              <p className="font-semibold text-gray-900 group-hover:text-rose-600 transition-colors">
                                {name.name}
                              </p>
                              <p className="text-sm text-gray-600">{name.meaning}</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                      <Link
                        href={`/search?q=${category.searchTerm}`}
                        className="inline-flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-700"
                      >
                        Find more names meaning {category.searchTerm}
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Additional Virtues */}
        <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-rose-50 to-pink-50/30">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-12 text-center">
              More Virtues & Meanings
            </h2>
            <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
              {additionalVirtues.map((virtue, index) => {
                const Icon = virtue.icon;
                return (
                  <div key={index} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-12 h-12 bg-${virtue.color}-100 rounded-xl flex items-center justify-center`}>
                        <Icon className={`w-6 h-6 text-${virtue.color}-600`} />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900">{virtue.title}</h3>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">{virtue.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {virtue.names.map((name, idx) => (
                        <span key={idx} className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                          {name}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* How to Choose by Meaning */}
        <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-12 text-center">
              How to Choose a Name by Meaning
            </h2>
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50/30 rounded-2xl shadow-lg border border-gray-100 p-8">
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-indigo-600">1</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Reflect on Your Values</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Consider what qualities you hope your child will embody throughout their life.
                    Names representing love, strength, wisdom, or courage can serve as daily inspiration 
                    and remind your child of the values you hold dear.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-violet-600">2</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Consider Family Heritage</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Choose meanings that honor your cultural background or explore new traditions that 
                    resonate with your family story. A name's meaning can connect your child to their 
                    roots while celebrating the diversity of human experience.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-purple-600">3</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Balance Meaning & Sound</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Ensure the name flows well with your surname and has nickname potential you like. 
                    A beautiful meaning is important, but the name must also work practically in daily life—
                    consider pronunciation, spelling, and how it will sound in professional settings.
                  </p>
                </div>
              </div>
            </div>

            {/* Additional Meaning Categories */}
            <div className="mt-12">
              <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
                More Meanings to Explore
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50/30 rounded-2xl p-6 border border-green-100">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                    <Leaf className="w-6 h-6 text-green-600" />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-3">Names That Mean Nature</h4>
                  <p className="text-gray-600 text-sm mb-4">
                    Earth, forest, ocean, and sky names for children connected to the natural world
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Earth</span>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Forest</span>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Brook</span>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Sky</span>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-indigo-50/30 rounded-2xl p-6 border border-blue-100">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                    <Sparkles className="w-6 h-6 text-blue-600" />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-3">Names That Mean Light</h4>
                  <p className="text-gray-600 text-sm mb-4">
                    Illuminating names for children who will bring brightness to the world
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Lucas</span>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Luna</span>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Aurora</span>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Nuria</span>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-rose-50 to-pink-50/30 rounded-2xl p-6 border border-rose-100">
                  <div className="w-12 h-12 bg-rose-100 rounded-xl flex items-center justify-center mb-4">
                    <Heart className="w-6 h-6 text-rose-600" />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-3">Names That Mean Joy</h4>
                  <p className="text-gray-600 text-sm mb-4">
                    Happy names that celebrate life and spread happiness wherever they go
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-rose-100 text-rose-700 px-2 py-1 rounded">Felix</span>
                    <span className="text-xs bg-rose-100 text-rose-700 px-2 py-1 rounded">Joy</span>
                    <span className="text-xs bg-rose-100 text-rose-700 px-2 py-1 rounded">Allegra</span>
                    <span className="text-xs bg-rose-100 text-rose-700 px-2 py-1 rounded">Beatrice</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section with Schema */}
        <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-rose-50 to-pink-50/30">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-12 text-center">
              Names by Meaning FAQ
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  Do names really influence personality?
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  While there's no scientific proof that names determine personality, studies suggest 
                  names can influence first impressions and self-perception. A meaningful name can 
                  serve as inspiration and identity throughout life.
                </p>
              </div>
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  Which virtue is most important to consider?
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  The most important virtue depends on your family values. Many parents prioritize 
                  love, wisdom, or strength, but any positive meaning can provide inspiration. 
                  Choose what resonates most with your hopes for your child.
                </p>
              </div>
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  Can I combine multiple virtues in one name?
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Many names carry multiple positive meanings across different cultures. For example, 
                  'Sophia' means both wisdom and beauty. Some names even have layered meanings in 
                  their original languages.
                </p>
              </div>
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  How do cultural meanings differ?
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  The same name can have different meanings across cultures. Islamic names often 
                  relate to faith, Hindu names to cosmic energies, and Christian names to biblical 
                  virtues. We specify origins to ensure accurate understanding.
                </p>
              </div>
            </div>

            {/* FAQ Schema */}
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  '@context': 'https://schema.org',
                  '@type': 'FAQPage',
                  mainEntity: [
                    {
                      '@type': 'Question',
                      name: 'Do names really influence personality?',
                      acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'While there\'s no scientific proof that names determine personality, studies suggest names can influence first impressions and self-perception. A meaningful name can serve as inspiration throughout life.'
                      }
                    },
                    {
                      '@type': 'Question',
                      name: 'Can I combine multiple virtues in one name?',
                      acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'Many names carry multiple positive meanings across different cultures. Some names even have layered meanings in their original languages.'
                      }
                    },
                    {
                      '@type': 'Question',
                      name: 'How do cultural meanings differ?',
                      acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'The same name can have different meanings across cultures. Islamic names often relate to faith, Hindu names to cosmic energies, and Christian names to biblical virtues.'
                      }
                    }
                  ]
                })
              }}
            />
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-rose-500 to-pink-600">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-6">
              Find Names with Beautiful Meanings
            </h2>
            <p className="text-lg text-rose-100 mb-8 max-w-2xl mx-auto">
              Explore our database of 60,000+ verified names organized by meaning. Find the perfect name 
              that reflects your values, honors your heritage, and inspires your child throughout their life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/names-by-meaning"
                className="px-8 py-4 bg-white text-rose-600 rounded-xl font-bold text-lg hover:bg-rose-50 transition-all shadow-lg hover:shadow-xl"
              >
                Explore Names by Meaning
              </Link>
              <Link
                href="/names/religion/islamic/1"
                className="px-8 py-4 bg-rose-500 text-white rounded-xl font-bold text-lg hover:bg-rose-400 transition-all border-2 border-white/20 shadow-lg hover:shadow-xl"
              >
                Browse All Names
              </Link>
            </div>
          </div>
        </section>
      </main>
    </Suspense>
  );
}