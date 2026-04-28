import Link from 'next/link';
import { BookOpen, Heart, Star, ArrowRight, Sparkles, Award, CheckCircle, Users, Globe } from 'lucide-react';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://nameverse.vercel.app';

export const metadata = {
  title: 'Expert Baby Naming Guide | How to Choose the Perfect Name | NameVerse',
  description: 'Complete expert guide to choosing the perfect baby name. Learn naming traditions across Islamic, Christian, and Hindu cultures with tips from naming specialists.',
  keywords: 'baby naming guide, how to choose baby name, expert naming tips, Islamic naming traditions, Christian naming traditions, Hindu naming traditions, baby name selection',
  alternates: {
    canonical: `${SITE_URL}/guides/expert-naming-guide`,
  },
  openGraph: {
    title: 'Expert Baby Naming Guide | NameVerse',
    description: 'Complete expert guide to choosing the perfect baby name across all religions and cultures.',
    type: 'article',
    url: `${SITE_URL}/guides/expert-naming-guide`,
  },
  robots: { index: true, follow: true },
};

export default function ExpertNamingGuidePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="relative py-16 px-4 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Award className="w-4 h-4" />
            <span>Expert Guide</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            The Ultimate Guide to Choosing a Baby Name
          </h1>
          <p className="text-lg text-purple-100 max-w-2xl mx-auto">
            Everything you need to know about selecting a meaningful name for your baby
          </p>
        </div>
      </section>

      {/* Breadcrumb */}
      <nav className="max-w-4xl mx-auto px-4 py-4" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-sm">
          <li><Link href="/" className="text-purple-600 hover:text-purple-800">Home</Link></li>
          <li className="text-gray-400">/</li>
          <li><Link href="/blog" className="text-purple-600 hover:text-purple-800">Blog</Link></li>
          <li className="text-gray-400">/</li>
          <li className="text-purple-700 font-semibold">Expert Naming Guide</li>
        </ol>
      </nav>

      {/* Content */}
      <article className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-purple-100">
          
          {/* Introduction */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Your Baby's Name Matters</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Choosing a name for your baby is one of the most significant decisions you'll make as a parent. 
              A name is more than just a label—it carries meaning, cultural heritage, and spiritual significance 
              that will accompany your child throughout their life.
            </p>
            <p className="text-gray-600 leading-relaxed">
              In this comprehensive guide, we'll explore naming traditions across different religions and cultures, 
              provide expert tips for selecting the perfect name, and help you avoid common pitfalls.
            </p>
          </section>

          {/* Tips Section */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Top 10 Tips for Choosing a Baby Name</h2>
            <div className="space-y-4">
              {[
                { tip: 'Consider the meaning carefully', desc: 'A name with a positive meaning can inspire your child throughout their life.' },
                { tip: 'Think about pronunciation', desc: 'Choose a name that is easy to pronounce in your community.' },
                { tip: 'Check the initials', desc: 'Make sure the initials don\'t spell anything undesirable.' },
                { tip: 'Consider family traditions', desc: 'Honor family heritage while choosing a name that feels modern.' },
                { tip: 'Say it out loud', desc: 'Test how the name sounds with your surname.' },
                { tip: 'Research cultural significance', desc: 'Understand the cultural and religious context of the name.' },
                { tip: 'Think about nicknames', desc: 'Consider potential nicknames and whether you like them.' },
                { tip: 'Check popularity trends', desc: 'Decide if you want a unique name or a popular one.' },
                { tip: 'Get feedback from family', desc: 'Share your choices with trusted family members.' },
                { tip: 'Trust your instincts', desc: 'Ultimately, choose a name that feels right to you.' },
              ].map((item, index) => (
                <div key={index} className="flex gap-4 p-4 bg-gray-50 rounded-xl">
                  <CheckCircle className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900">{item.tip}</h3>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Religion Sections */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Naming Traditions by Religion</h2>
            
            {/* Islamic */}
            <div className="mb-6 p-6 bg-emerald-50 rounded-2xl border border-emerald-100">
              <h3 className="text-xl font-bold text-emerald-800 mb-3 flex items-center gap-2">
                <Star className="w-5 h-5" /> Islamic Naming Traditions
              </h3>
              <p className="text-emerald-700 mb-3">
                In Islam, names carry deep spiritual significance. Parents often choose names with positive meanings 
                that reflect Islamic values and connect children to their faith heritage.
              </p>
              <Link href="/islamic/boy-names" className="text-emerald-600 font-medium flex items-center gap-1 hover:text-emerald-800">
                Browse Islamic Names <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Christian */}
            <div className="mb-6 p-6 bg-blue-50 rounded-2xl border border-blue-100">
              <h3 className="text-xl font-bold text-blue-800 mb-3 flex items-center gap-2">
                <Star className="w-5 h-5" /> Christian Naming Traditions
              </h3>
              <p className="text-blue-700 mb-3">
                Christian names often draw from Biblical sources, honoring prophets, saints, and virtuous qualities. 
                These names connect children to their spiritual heritage and faith community.
              </p>
              <Link href="/christian/boy-names" className="text-blue-600 font-medium flex items-center gap-1 hover:text-blue-800">
                Browse Christian Names <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Hindu */}
            <div className="mb-6 p-6 bg-orange-50 rounded-2xl border border-orange-100">
              <h3 className="text-xl font-bold text-orange-800 mb-3 flex items-center gap-2">
                <Star className="w-5 h-5" /> Hindu Naming Traditions
              </h3>
              <p className="text-orange-700 mb-3">
                Hindu names are often derived from Sanskrit and connected to deities, virtues, and natural elements. 
                The Namakaran ceremony is a sacred ritual for naming a child.
              </p>
              <Link href="/hindu/boy-names" className="text-orange-600 font-medium flex items-center gap-1 hover:text-orange-800">
                Browse Hindu Names <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </section>

          {/* CTA */}
          <section className="text-center bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Find the Perfect Name?</h2>
            <p className="text-gray-600 mb-6">
              Explore our database of 60,000+ baby names with meanings, origins, and numerology.
            </p>
            <Link
              href="/names/religion/islamic/1"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-purple-700 font-semibold rounded-xl hover:bg-purple-50 transition-colors"
            >
              <Heart className="w-5 h-5" />
              Browse All Names
            </Link>
          </section>
        </div>
      </article>
    </main>
  );
}