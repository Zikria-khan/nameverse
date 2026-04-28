"use client"

import { useState, useEffect, useMemo, useCallback, useRef } from 'react'
import {
  Sparkles, BookOpen, Book, Heart, Brain, Gem, Calendar, Palette, Hash,
  Languages, Volume2, Users, Link2, Share2, Bookmark, TrendingUp,
  Globe, ChevronDown, ChevronUp, Home, AlignLeft, History, Star,
  MessageCircle, Copy, Check, ExternalLink
} from 'lucide-react'

// Religion-based theme configuration
const religionThemes = {
  islamic: {
    primary: "#059669",
    secondary: "#047857",
    accent: "#D97706",
    gradient: "from-emerald-600 to-teal-600",
    light: "bg-emerald-50",
    border: "border-emerald-200",
    text: "text-emerald-700",
    bgSoft: "bg-emerald-50/50"
  },
  christian: {
    primary: "#2563eb",
    secondary: "#1d4ed8",
    accent: "#dc2626",
    gradient: "from-blue-600 to-indigo-600",
    light: "bg-blue-50",
    border: "border-blue-200",
    text: "text-blue-700",
    bgSoft: "bg-blue-50/50"
  },
  hindu: {
    primary: "#ea580c",
    secondary: "#c2410c",
    accent: "#fbbf24",
    gradient: "from-orange-600 to-amber-600",
    light: "bg-orange-50",
    border: "border-orange-200",
    text: "text-orange-700",
    bgSoft: "bg-orange-50/50"
  }
}

// Tab configuration with proper semantic structure
const tabConfig = [
  { id: 'meaning', label: 'Meaning', icon: AlignLeft },
  { id: 'origin', label: 'Origin', icon: History },
  { id: 'personality', label: 'Personality', icon: Brain },
  { id: 'similar', label: 'Similar', icon: Link2 },
  { id: 'faq', label: 'FAQ', icon: MessageCircle },
]

// Accessible Badge Component
const Badge = ({ children, variant = 'default', className = '', icon: Icon, ...props }) => {
  const variants = {
    default: 'bg-gray-100 text-gray-700',
    primary: 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white',
    outline: 'bg-transparent border-2 border-gray-200 text-gray-700',
  }
  
  return (
    <span 
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium transition-all ${variants[variant]} ${className}`}
      {...props}
    >
      {Icon && <Icon size={14} />}
      {children}
    </span>
  )
}

// Card Component with consistent styling
const Card = ({ children, className = '', hover = true, ...props }) => (
  <div 
    className={`bg-white rounded-2xl p-6 shadow-sm border border-gray-100 ${hover ? 'hover:shadow-lg hover:border-gray-200 transition-all duration-300' : ''} ${className}`}
    {...props}
  >
    {children}
  </div>
)

// Section Title Component
const SectionTitle = ({ icon: Icon, title, subtitle, theme }) => (
  <div className="mb-6">
    <div className="flex items-center gap-3 mb-2">
      {Icon && (
        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${theme.gradient} flex items-center justify-center shadow-sm`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
      )}
      <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
    </div>
    {subtitle && <p className="text-gray-600 ml-13">{subtitle}</p>}
  </div>
)

// Translation Card Component
const TranslationCard = ({ language, nativeName, meaning, longMeaning, flag }) => {
  const [expanded, setExpanded] = useState(false)
  const isRTL = ['Arabic', 'Urdu', 'Pashto', 'Hebrew'].includes(language)

  return (
    <Card className="h-full">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl" role="img" aria-label={`${language} flag`}>{flag}</span>
          <div>
            <h4 className="font-semibold text-gray-900">{language}</h4>
          </div>
        </div>
      </div>

      <div className={`space-y-3 ${isRTL ? 'text-right' : 'text-left'}`} dir={isRTL ? 'rtl' : 'ltr'}>
        <div>
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">Name</span>
          <p className={`text-xl font-bold text-gray-900 ${isRTL ? 'font-arabic' : ''}`}>{nativeName}</p>
        </div>

        <div>
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">Meaning</span>
          <p className="text-sm text-gray-700 leading-relaxed">{meaning}</p>
        </div>

        {longMeaning && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 mt-2"
            aria-expanded={expanded}
          >
            {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            {expanded ? 'Show Less' : 'More Details'}
          </button>
        )}
        {expanded && longMeaning && (
          <p className="text-sm text-gray-600 leading-relaxed mt-2 pt-2 border-t border-gray-100">
            {longMeaning}
          </p>
        )}
      </div>
    </Card>
  )
}

// FAQ Item Component with proper accessibility
const FAQItem = ({ question, answer, isOpen, onToggle }) => (
  <div className="border border-gray-200 rounded-xl overflow-hidden transition-all duration-200">
    <button
      onClick={onToggle}
      className="w-full px-6 py-4 text-left font-semibold text-gray-900 hover:bg-gray-50 flex justify-between items-center transition-colors"
      aria-expanded={isOpen}
    >
      <span className="pr-8">{question}</span>
      <ChevronDown 
        size={20} 
        className={`flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
      />
    </button>
    {isOpen && (
      <div className="px-6 pb-4 text-gray-700 leading-relaxed border-t border-gray-200 animate-in slide-in-from-top-2">
        {answer}
      </div>
    )}
  </div>
)

// Main Component
export default function NameDetailClient({ data, initialLanguage }) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeTab, setActiveTab] = useState('meaning')
  const [openFAQ, setOpenFAQ] = useState(0)
  const [copied, setCopied] = useState(false)
  const [mounted, setMounted] = useState(false)
  const tabRefs = useRef({})

  const religion = data.religion?.toLowerCase() || 'islamic'
  const theme = religionThemes[religion] || religionThemes.islamic
  
  // Compute hover gradient class separately to avoid Turbopack parsing issues
  const hoverGradientClass = `hover:bg-gradient-to-r hover:${theme.gradient} hover:text-white hover:border-transparent`
  
  // Pre-compute related name link classes to avoid multi-line template literal issues
  const relatedNameLinkClass = `inline-flex items-center px-4 py-2 rounded-full font-medium transition-all bg-white border-2 ${theme.border} text-gray-700 ${hoverGradientClass}`

  // Track scroll position
  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Get native script name
  const nativeScriptName = data.in_arabic?.name || data.in_hebrew?.name || data.in_sanskrit?.name || data.name

  // Available translations
  const availableTranslations = useMemo(() => {
    const translations = []
    if (data.in_arabic) translations.push({ key: 'in_arabic', language: 'Arabic', flag: '🇸🇦', ...data.in_arabic })
    if (data.in_urdu) translations.push({ key: 'in_urdu', language: 'Urdu', flag: '🇵🇰', ...data.in_urdu })
    if (data.in_hindi) translations.push({ key: 'in_hindi', language: 'Hindi', flag: '🇮🇳', ...data.in_hindi })
    if (data.in_pashto) translations.push({ key: 'in_pashto', language: 'Pashto', flag: '🇦🇫', ...data.in_pashto })
    if (data.in_hebrew) translations.push({ key: 'in_hebrew', language: 'Hebrew', flag: '🇮🇱', ...data.in_hebrew })
    if (data.in_greek) translations.push({ key: 'in_greek', language: 'Greek', flag: '🇬🇷', ...data.in_greek })
    if (data.in_latin) translations.push({ key: 'in_latin', language: 'Latin', flag: '🏛️', ...data.in_latin })
    if (data.in_sanskrit) translations.push({ key: 'in_sanskrit', language: 'Sanskrit', flag: '🕉️', ...data.in_sanskrit })
    if (data.in_tamil) translations.push({ key: 'in_tamil', language: 'Tamil', flag: '🇮🇳', ...data.in_tamil })
    if (data.in_telugu) translations.push({ key: 'in_telugu', language: 'Telugu', flag: '🇮🇳', ...data.in_telugu })
    return translations
  }, [data])

  // Load favorites
  useEffect(() => {
    if (!mounted) return
    try {
      const favorites = JSON.parse(localStorage.getItem('favoriteNames') || '[]')
      setIsFavorite(favorites.includes(data.slug || data.name.toLowerCase()))
    } catch (error) {
      console.error('Error loading favorites:', error)
    }
  }, [data, mounted])

  // Toggle favorite
  const handleFavoriteToggle = useCallback(() => {
    try {
      const favorites = JSON.parse(localStorage.getItem('favoriteNames') || '[]')
      const nameId = data.slug || data.name.toLowerCase()

      if (favorites.includes(nameId)) {
        const updated = favorites.filter(id => id !== nameId)
        localStorage.setItem('favoriteNames', JSON.stringify(updated))
        setIsFavorite(false)
      } else {
        favorites.push(nameId)
        localStorage.setItem('favoriteNames', JSON.stringify(favorites))
        setIsFavorite(true)
      }
    } catch (error) {
      console.error('Error toggling favorite:', error)
    }
  }, [data])

  // Share handler
  const handleShare = useCallback(async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `${data.name} - Baby Name Meaning`,
          text: `${data.name}: ${data.short_meaning}`,
          url: window.location.href
        })
      } else {
        await navigator.clipboard.writeText(window.location.href)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('Error sharing:', error)
      }
    }
  }, [data])

  // Copy name to clipboard
  const handleCopyName = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(data.name)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Error copying:', error)
    }
  }, [data.name])

  // Get color hex
  const getColorHex = (colorName) => {
    const colors = {
      red: '#EF4444', blue: '#3B82F6', green: '#10B981', yellow: '#F59E0B',
      purple: '#A855F7', pink: '#EC4899', orange: '#F97316', teal: '#14B8A6',
      indigo: '#6366F1', emerald: '#10B981', rose: '#F43F5E', amber: '#F59E0B'
    }
    return colors[colorName?.toLowerCase()] || '#6B7280'
  }

  // Generate FAQ data
  const faqData = useMemo(() => data.seo?.faq || [
    {
      q: `What does the name ${data.name} mean?`,
      a: data.long_meaning || data.short_meaning || `${data.name} is a beautiful ${religion} name.`
    },
    {
      q: `What is the origin of ${data.name}?`,
      a: `${data.name} originates from ${data.origin || 'ancient traditions'} and is commonly used in ${religion} cultures.`
    },
    {
      q: `Is ${data.name} a ${data.gender} name?`,
      a: `Yes, ${data.name} is traditionally used as a ${data.gender} name in ${religion} families.`
    },
    {
      q: `How do you pronounce ${data.name}?`,
      a: data.pronunciation?.english 
        ? `${data.name} is pronounced as "${data.pronunciation.english}" in English.`
        : `${data.name} has a unique pronunciation that varies by culture and region.`
    }
  ], [data, religion])

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sticky Mini Header for Mobile */}
      <div className={`fixed top-0 left-0 right-0 z-50 bg-white shadow-sm transition-all duration-300 ${isScrolled ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <a
              href={`/names/religion/${religion}/1`}
              className="text-gray-500 hover:text-gray-900 transition-colors flex-shrink-0"
              aria-label="Back to names list"
            >
              <Home size={20} />
            </a>
            <div className="min-w-0">
              <h2 className="font-bold text-gray-900 truncate">{data.name}</h2>
              <p className="text-xs text-gray-500 truncate">{data.short_meaning}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={handleShare}
              className="p-2 text-gray-500 hover:text-gray-900 transition-colors rounded-full hover:bg-gray-100"
              aria-label="Share this name"
            >
              <Share2 size={18} />
            </button>
            <button
              onClick={handleFavoriteToggle}
              className={`p-2 transition-colors rounded-full hover:bg-gray-100 ${isFavorite ? 'text-red-500' : 'text-gray-500 hover:text-red-500'}`}
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              aria-pressed={isFavorite}
            >
              <Bookmark size={18} className={isFavorite ? 'fill-current' : ''} />
            </button>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <header className={`bg-gradient-to-br ${theme.gradient} pt-24 pb-16 px-4`}>
        <div className="max-w-5xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm mb-8 text-white/80 flex-wrap" aria-label="Breadcrumb">
            <a href="/" className="hover:text-white transition-colors flex items-center gap-1">
              <Home size={14} />
              <span>Home</span>
            </a>
            <span className="text-white/60">/</span>
            <a href={`/names/religion/${religion}/1`} className="hover:text-white transition-colors">Names</a>
            <span className="text-white/60">/</span>
            <a href={`/names/religion/${religion}/1`} className="hover:text-white transition-colors capitalize">{religion}</a>
            {data.gender && (
              <>
                <span className="text-white/60">/</span>
                <span className="text-white/80 capitalize">{data.gender}</span>
              </>
            )}
            <span className="text-white/60">/</span>
            <span className="text-white font-semibold">{data.name}</span>
          </nav>

          {/* Main Content */}
          <div className="text-center">
            {/* Name */}
            <div className="flex items-center justify-center gap-4 mb-4 flex-wrap">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white">
                {data.name}
              </h1>
              <button
                onClick={handleCopyName}
                className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors text-white"
                aria-label="Copy name to clipboard"
                title="Copy name"
              >
                {copied ? <Check size={24} /> : <Copy size={24} />}
              </button>
            </div>

            {/* Native Script */}
            {nativeScriptName !== data.name && (
              <p className="text-2xl sm:text-3xl text-white/90 mb-6 font-arabic">
                {nativeScriptName}
              </p>
            )}

            {/* Quick Info Badges */}
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              <Badge variant="default" className="bg-white/20 text-white backdrop-blur-sm border-0">
                <Globe size={14} />
                {data.origin || 'Ancient'}
              </Badge>
              <Badge variant="default" className="bg-white/20 text-white backdrop-blur-sm border-0">
                <Users size={14} />
                {data.gender || 'Unisex'}
              </Badge>
              <Badge variant="default" className="bg-white/20 text-white backdrop-blur-sm border-0">
                {religion}
              </Badge>
              {data.luckyNumber && (
                <Badge variant="default" className="bg-white/20 text-white backdrop-blur-sm border-0">
                  <Star size={14} />
                  Lucky: {data.luckyNumber}
                </Badge>
              )}
            </div>

            {/* Meaning */}
            <p className="text-xl sm:text-2xl text-white/95 mb-8 max-w-2xl mx-auto font-medium">
              &ldquo;{data.short_meaning || data.meaning}&rdquo;
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={handleShare}
                className="px-6 py-3 bg-white text-gray-900 rounded-full font-semibold hover:bg-gray-100 transition-all flex items-center gap-2 shadow-lg hover:shadow-xl"
              >
                <Share2 size={18} />
                Share
              </button>
              <button
                onClick={handleFavoriteToggle}
                className={`px-6 py-3 rounded-full font-semibold transition-all flex items-center gap-2 shadow-lg hover:shadow-xl ${
                  isFavorite
                    ? 'bg-red-500 text-white hover:bg-red-600'
                    : 'bg-white text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Bookmark size={18} className={isFavorite ? 'fill-white' : ''} />
                {isFavorite ? 'Saved' : 'Save'}
              </button>
              {data.pronunciation && (
                <button 
                  className="px-6 py-3 bg-white/20 text-white backdrop-blur-sm rounded-full font-semibold hover:bg-white/30 transition-all flex items-center gap-2"
                  aria-label="Listen to pronunciation"
                >
                  <Volume2 size={18} />
                  Pronounce
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Quick Info Bar */}
      {(data.category || data.themes || data.language) && (
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-5xl mx-auto px-4 py-4">
            <div className="flex flex-wrap gap-4">
              {data.category && data.category.length > 0 && (
                <div>
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">Categories</span>
                  <div className="flex flex-wrap gap-2">
                    {data.category.map((cat, idx) => (
                      <Badge key={idx} className="bg-blue-50 text-blue-700">{cat}</Badge>
                    ))}
                  </div>
                </div>
              )}
              {data.themes && data.themes.length > 0 && (
                <div>
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">Themes</span>
                  <div className="flex flex-wrap gap-2">
                    {data.themes.map((themeItem, idx) => (
                      <Badge key={idx} className="bg-purple-50 text-purple-700">{themeItem}</Badge>
                    ))}
                  </div>
                </div>
              )}
              {data.language && data.language.length > 0 && (
                <div>
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">Languages</span>
                  <div className="flex flex-wrap gap-2">
                    {data.language.map((lang, idx) => (
                      <Badge key={idx} className="bg-green-50 text-green-700">{lang}</Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Tab Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-14 z-40" aria-label="Name information tabs">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex gap-0 overflow-x-auto scrollbar-hide">
            {tabConfig.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  ref={el => tabRefs.current[tab.id] = el}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center gap-2 px-4 py-4 text-sm font-semibold whitespace-nowrap transition-all relative
                    border-b-2 min-w-fit
                    ${isActive 
                      ? `border-${theme.primary?.replace('#', '')} text-gray-900` 
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200'}
                  `}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`tab-panel-${tab.id}`}
                  id={`tab-${tab.id}`}
                >
                  <Icon size={16} />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </nav>

      {/* Tab Content */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Meaning Tab */}
        {activeTab === 'meaning' && (
          <div 
            id="tab-panel-meaning" 
            role="tabpanel" 
            aria-labelledby="tab-meaning"
            className="animate-in fade-in duration-200"
          >
            {/* Main Meaning */}
            <Card className="mb-6">
              <SectionTitle icon={BookOpen} title="Name Meaning" theme={theme} />
              <p className="text-lg text-gray-700 leading-relaxed">
                {data.long_meaning || data.short_meaning}
              </p>
            </Card>

            {/* Additional Meanings Grid */}
            {(data.spiritual_meaning || data.numerology_meaning) && (
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                {data.spiritual_meaning && (
                  <Card>
                    <div className="flex items-center gap-3 mb-3">
                      <Heart className={theme.text} size={20} />
                      <h3 className="font-bold text-gray-900">Spiritual Significance</h3>
                    </div>
                    <p className="text-gray-700">{data.spiritual_meaning}</p>
                  </Card>
                )}
                {data.numerology_meaning && (
                  <Card>
                    <div className="flex items-center gap-3 mb-3">
                      <Sparkles className={theme.text} size={20} />
                      <h3 className="font-bold text-gray-900">Numerology</h3>
                    </div>
                    <p className="text-gray-700">{data.numerology_meaning}</p>
                  </Card>
                )}
              </div>
            )}

            {/* Translations */}
            {availableTranslations.length > 0 && (
              <div className="mb-6">
                <SectionTitle icon={Languages} title="Translations" subtitle="How the name is written and understood in different languages" theme={theme} />
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {availableTranslations.map(trans => (
                    <TranslationCard
                      key={trans.key}
                      language={trans.language}
                      nativeName={trans.name}
                      meaning={trans.meaning}
                      longMeaning={trans.long_meaning}
                      flag={trans.flag}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Pronunciation */}
            {data.pronunciation && (
              <Card className="mb-6">
                <SectionTitle icon={Volume2} title="Pronunciation" theme={theme} />
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6">
                    <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider block mb-2">English</span>
                    <p className="text-2xl font-bold text-gray-900 mb-1">
                      {data.pronunciation.english || data.pronunciation}
                    </p>
                    {data.pronunciation.ipa && (
                      <p className="text-sm text-gray-600">IPA: {data.pronunciation.ipa}</p>
                    )}
                  </div>
                  {data.pronunciation.urdu && (
                    <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-6 text-right">
                      <span className="text-xs font-semibold text-orange-600 uppercase tracking-wider block mb-2">Urdu</span>
                      <p className="text-2xl font-bold text-gray-900 font-arabic mb-1">
                        {data.pronunciation.urdu}
                      </p>
                    </div>
                  )}
                </div>
              </Card>
            )}
          </div>
        )}

        {/* Origin Tab */}
        {activeTab === 'origin' && (
          <div 
            id="tab-panel-origin" 
            role="tabpanel" 
            aria-labelledby="tab-origin"
            className="animate-in fade-in duration-200"
          >
            {/* Origin Card */}
            <Card className="mb-6">
              <SectionTitle icon={Globe} title="Origin & History" theme={theme} />
              <div className="flex items-start gap-4">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${theme.gradient} flex items-center justify-center flex-shrink-0`}>
                  <Globe className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{data.origin || 'Ancient Origin'}</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    The name <strong>{data.name}</strong> has its roots in {data.origin || 'ancient traditions'} 
                    and is predominantly used in {religion} cultures. {data.long_meaning && `It carries the beautiful meaning "${data.short_meaning}" and has been cherished for generations.`}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-gray-100 text-gray-700">Origin: {data.origin || 'Ancient'}</Badge>
                    <Badge className="bg-gray-100 text-gray-700">Religion: {religion}</Badge>
                    <Badge className="bg-gray-100 text-gray-700">Gender: {data.gender || 'Unisex'}</Badge>
                  </div>
                </div>
              </div>
            </Card>

            {/* Biblical Reference */}
            {data.biblical_reference && data.biblical_reference.is_biblical && (
              <Card className="mb-6 bg-blue-50 border-blue-100">
                <SectionTitle icon={Book} title="Biblical Reference" theme={theme} />
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <Badge className="bg-blue-100 text-blue-800 mb-4">
                    {data.biblical_reference.verse_reference}
                  </Badge>
                  <p className="text-lg text-gray-700 mb-3 italic border-l-4 border-blue-400 pl-4">
                    {data.biblical_reference.origin_scripture}
                  </p>
                  <p className="text-sm text-gray-600">{data.biblical_reference.note}</p>
                </div>
              </Card>
            )}

            {/* Vedic Reference */}
            {data.vedic_reference && data.vedic_reference.is_vedic && (
              <Card className="mb-6 bg-orange-50 border-orange-100">
                <SectionTitle icon={Book} title="Vedic Origin" theme={theme} />
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <Badge className="bg-orange-100 text-orange-800 mb-4">
                    {data.vedic_reference.root_origin}
                  </Badge>
                  <p className="text-lg text-gray-700">{data.vedic_reference.note}</p>
                </div>
              </Card>
            )}

            {/* Celebrity Usage */}
            {data.celebrity_usage && data.celebrity_usage.length > 0 && (
              <Card className="mb-6">
                <SectionTitle icon={Users} title={`Famous People Named ${data.name}`} theme={theme} />
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {data.celebrity_usage.map((celebrity, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                      <div className={`w-10 h-10 bg-gradient-to-br ${theme.gradient} rounded-full flex items-center justify-center text-white font-bold flex-shrink-0`}>
                        {celebrity.charAt(0)}
                      </div>
                      <span className="font-medium text-gray-900">{celebrity}</span>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>
        )}

        {/* Personality Tab */}
        {activeTab === 'personality' && (
          <div 
            id="tab-panel-personality" 
            role="tabpanel" 
            aria-labelledby="tab-personality"
            className="animate-in fade-in duration-200"
          >
            {/* Lucky Number */}
            {data.luckyNumber && (
              <Card className="mb-6 text-center">
                <div className="py-4">
                  <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider block mb-2">Lucky Number</span>
                  <div className="text-7xl font-bold bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                    {data.luckyNumber}
                  </div>
                </div>
              </Card>
            )}

            {/* Personality Traits */}
            {(data.emotional_traits || data.hidden_personality_traits) && (
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                {data.emotional_traits && data.emotional_traits.length > 0 && (
                  <Card>
                    <div className="flex items-center gap-3 mb-4">
                      <Heart className="text-rose-500" size={24} />
                      <h3 className="font-bold text-gray-900 text-lg">Emotional Traits</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {data.emotional_traits.map((trait, idx) => (
                        <Badge key={idx} className="bg-rose-50 text-rose-700">{trait}</Badge>
                      ))}
                    </div>
                  </Card>
                )}
                {data.hidden_personality_traits && data.hidden_personality_traits.length > 0 && (
                  <Card>
                    <div className="flex items-center gap-3 mb-4">
                      <Sparkles className="text-amber-500" size={24} />
                      <h3 className="font-bold text-gray-900 text-lg">Hidden Traits</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {data.hidden_personality_traits.map((trait, idx) => (
                        <Badge key={idx} className="bg-amber-50 text-amber-700">{trait}</Badge>
                      ))}
                    </div>
                  </Card>
                )}
              </div>
            )}

            {/* Lucky Attributes */}
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              {data.lucky_day && (
                <Card className="text-center">
                  <Calendar className={`mx-auto mb-3 ${theme.text}`} size={28} />
                  <span className="text-sm text-gray-500 block mb-1">Lucky Day</span>
                  <span className="font-bold text-gray-900 text-lg">{data.lucky_day}</span>
                </Card>
              )}
              {data.life_path_number && (
                <Card className="text-center">
                  <Hash className={`mx-auto mb-3 ${theme.text}`} size={28} />
                  <span className="text-sm text-gray-500 block mb-1">Life Path Number</span>
                  <span className="font-bold text-gray-900 text-lg">{data.life_path_number}</span>
                </Card>
              )}
              {data.lucky_stone && (
                <Card className="text-center">
                  <Gem className="text-purple-500" size={28} />
                  <span className="text-sm text-gray-500 block mb-1">Lucky Stone</span>
                  <span className="font-bold text-gray-900 text-lg">{data.lucky_stone}</span>
                </Card>
              )}
            </div>

            {/* Lucky Colors */}
            {data.lucky_colors && data.lucky_colors.length > 0 && (
              <Card className="mb-6">
                <SectionTitle icon={Palette} title="Lucky Colors" theme={theme} />
                <div className="flex flex-wrap gap-4">
                  {data.lucky_colors.map((color, idx) => (
                    <div key={idx} className="text-center">
                      <div
                        className="w-16 h-16 rounded-full shadow-md mb-2 border-2 border-white"
                        style={{ backgroundColor: getColorHex(color) }}
                        title={color}
                        role="img"
                        aria-label={`Lucky color: ${color}`}
                      />
                      <span className="text-xs text-gray-600 capitalize">{color}</span>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>
        )}

        {/* Similar Names Tab */}
        {activeTab === 'similar' && (
          <div 
            id="tab-panel-similar" 
            role="tabpanel" 
            aria-labelledby="tab-similar"
            className="animate-in fade-in duration-200"
          >
            <div className="grid md:grid-cols-2 gap-8">
              {/* Related Names */}
              {data.related_names && data.related_names.length > 0 && (
                <div>
                  <SectionTitle icon={Link2} title="Related Names" subtitle="Names with similar origins or meanings" theme={theme} />
                  <div className="flex flex-wrap gap-3">
                    {data.related_names.map((relatedName, idx) => (
                      <a
                        key={idx}
                        href={`/names/religion/${religion}/1`}
                        className={relatedNameLinkClass}
                      >
                        {relatedName}
                        <ExternalLink size={14} className="ml-1" />
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Similar Sounding Names */}
              {data.similar_sounding_names && data.similar_sounding_names.length > 0 && (
                <div>
                  <SectionTitle icon={Volume2} title="Similar Sounding" subtitle="Names that sound alike" theme={theme} />
                  <div className="flex flex-wrap gap-3">
                    {data.similar_sounding_names.map((similarName, idx) => (
                      <a
                        key={idx}
                        href={`/names/religion/${religion}/1`}
                        className="inline-flex items-center px-4 py-2 rounded-full font-medium transition-all bg-white border-2 border-gray-200 text-gray-700 hover:border-emerald-500 hover:text-emerald-600 hover:shadow-md"
                      >
                        {similarName}
                        <ExternalLink size={14} className="ml-1" />
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Empty state */}
              {!data.related_names?.length && !data.similar_sounding_names?.length && (
                <div className="col-span-2 text-center py-12">
                  <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-br ${theme.gradient} flex items-center justify-center mb-4`}>
                    <Link2 className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Similar Names</h3>
                  <p className="text-gray-600">Similar names for {data.name} will be available soon.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* FAQ Tab */}
        {activeTab === 'faq' && (
          <div 
            id="tab-panel-faq" 
            role="tabpanel" 
            aria-labelledby="tab-faq"
            className="animate-in fade-in duration-200"
          >
            <SectionTitle icon={MessageCircle} title="Frequently Asked Questions" theme={theme} />
            <div className="space-y-4 max-w-3xl">
              {faqData.map((faq, idx) => (
                <FAQItem
                  key={idx}
                  question={faq.q}
                  answer={faq.a}
                  isOpen={openFAQ === idx}
                  onToggle={() => setOpenFAQ(openFAQ === idx ? -1 : idx)}
                />
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Footer CTA */}
      <footer className="bg-gradient-to-r from-gray-50 to-gray-100 border-t border-gray-200 py-12 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Found the Perfect Name?
          </h2>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Share {data.name} with your loved ones or save it to your favorites for later.
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={handleShare}
              className={`px-6 py-3 bg-gradient-to-r ${theme.gradient} text-white rounded-full font-semibold hover:shadow-lg transition-all flex items-center gap-2`}
            >
              <Share2 size={18} />
              Share Name
            </button>
            <button
              onClick={handleFavoriteToggle}
              className={`px-6 py-3 rounded-full font-semibold transition-all flex items-center gap-2 border-2 ${
                isFavorite
                  ? 'bg-red-500 border-red-500 text-white'
                  : 'border-gray-300 text-gray-700 hover:border-gray-400'
              }`}
            >
              <Bookmark size={18} className={isFavorite ? 'fill-white' : ''} />
              {isFavorite ? 'Saved' : 'Save Name'}
            </button>
          </div>
        </div>
      </footer>

      {/* AdSense Script */}
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1510675468129183" crossOrigin="anonymous" />

      {/* Custom Styles */}
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .font-arabic {
          font-family: 'Noto Sans Arabic', 'Noto Nastaliq Urdu', serif;
        }
      `}</style>
    </div>
  )
}