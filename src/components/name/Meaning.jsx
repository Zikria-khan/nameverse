import { Globe, Languages, Volume2, Shield, Clock, Award, BookOpen, BookText, Sparkles, Hash, Calendar, Palette, Gem, Heart, TrendingUp } from 'lucide-react';

const getLanguageFlag = (langKey) => {
  const flags = {
    sanskrit: '🕉️', english: '🇺🇸', urdu: '🇵🇰', arabic: '🇸🇦', hindi: '🇮🇳', hebrew: '🇮🇱', greek: '🇬🇷', latin: '🇮🇹',
    pashto: '🇦🇫', tamil: '🇮🇳', telugu: '🇮🇳', marathi: '🇮🇳', bengali: '🇧🇩', punjabi: '🇮🇳', turkish: '🇹🇷', persian: '🇮🇷',
    malay: '🇲🇾', indonesian: '🇮🇩', french: '🇫🇷', spanish: '🇪🇸', german: '🇩🇪', italian: '🇮🇹', chinese: '🇨🇳', japanese: '🇯🇵', korean: '🇰🇷', russian: '🇷🇺'
  };
  return flags[langKey?.toLowerCase()] || '🌐';
};

const getLanguageName = (key) => {
  const names = {
    sanskrit: 'Sanskrit', english: 'English', urdu: 'Urdu', arabic: 'Arabic', hindi: 'Hindi', hebrew: 'Hebrew', greek: 'Greek', latin: 'Latin',
    pashto: 'Pashto', tamil: 'Tamil', telugu: 'Telugu', marathi: 'Marathi', bengali: 'Bengali', punjabi: 'Punjabi', turkish: 'Turkish', persian: 'Persian',
    malay: 'Malay', indonesian: 'Indonesian', french: 'French', spanish: 'Spanish', german: 'German', italian: 'Italian', chinese: 'Chinese', japanese: 'Japanese', korean: 'Korean', russian: 'Russian'
  };
  return names[key?.toLowerCase()] || key;
};

function cleanText(text = '') {
  return String(text || '').replace(/\s+/g, ' ').trim();
}

function getReligionLabel(religion) {
  if (religion === 'islamic') return 'Islamic';
  if (religion === 'christian') return 'Christian';
  if (religion === 'hindu') return 'Hindu';
  return cleanText(religion);
}

function getGenderLabel(gender) {
  const value = cleanText(gender).toLowerCase();
  if (value.includes('male')) return 'Male';
  if (value.includes('female')) return 'Female';
  if (value.includes('unisex') || value.includes('neutral')) return 'Unisex';
  return cleanText(gender) || 'Unisex';
}

function getCoreMeaning(data) {
  const meaning = cleanText(data.short_meaning || data.meaning);
  if (!meaning) return 'meaningful cultural name';
  return cleanText(meaning.split(',')[0].split('·')[0].split(';')[0]);
}

function getLanguages(data) {
  const keys = ['in_sanskrit', 'in_english', 'in_urdu', 'in_arabic', 'in_hindi', 'in_hebrew', 'in_greek', 'in_latin', 'in_pashto', 'in_tamil', 'in_telugu', 'in_marathi', 'in_bengali', 'in_punjabi', 'in_turkish', 'in_persian', 'in_malay', 'in_indonesian', 'in_french', 'in_spanish', 'in_german', 'in_italian', 'in_chinese', 'in_japanese', 'in_korean', 'in_russian'];
  return keys
    .map((key) => ({ key, value: data[key] }))
    .filter(({ value }) => value && Object.keys(value).length > 0)
    .map(({ key, value }) => ({
      code: key.replace('in_', ''),
      flag: getLanguageFlag(key.replace('in_', '')),
      name: getLanguageName(key.replace('in_', '')),
      value,
    }));
}

function getOriginTranslation(data) {
  const origin = cleanText(data.origin).toLowerCase();
  const originMap = {
    arabic: 'in_arabic',
    urdu: 'in_urdu',
    hindi: 'in_hindi',
    sanskrit: 'in_sanskrit',
    english: 'in_english',
    hebrew: 'in_hebrew',
    greek: 'in_greek',
    latin: 'in_latin',
    biblical: 'in_greek',
    persian: 'in_persian',
    turkish: 'in_turkish',
  };
  const key = originMap[origin];
  if (key && data[key]) return { key, label: getLanguageName(key.replace('in_', '')), value: data[key] };

  const preferred = ['in_arabic', 'in_sanskrit', 'in_hindi', 'in_english', 'in_urdu', 'in_hebrew', 'in_greek', 'in_latin'];
  const found = preferred.find(item => data[item]);
  if (found) return { key: found, label: getLanguageName(found.replace('in_', '')), value: data[found] };
  return null;
}

function getTraits(data) {
  const traits = [];
  if (Array.isArray(data.emotional_traits)) traits.push(...data.emotional_traits.map(cleanText));
  if (Array.isArray(data.hidden_personality_traits)) traits.push(...data.hidden_personality_traits.map(cleanText));
  if (cleanText(data.personality_traits)) traits.push(cleanText(data.personality_traits));
  return Array.from(new Set(traits.filter(Boolean)));
}

function getLuckyColors(data) {
  return Array.isArray(data.lucky_colors) ? data.lucky_colors.map(cleanText).filter(Boolean) : [];
}

function getReferenceText(item) {
  if (typeof item === 'string') return item;
  if (!item || typeof item !== 'object') return '';
  return item.reference || item.notes || (item.name ? `${item.name}${item.profession ? ` — ${item.profession}` : ''}${item.country ? ` (${item.country})` : ''}` : '');
}

function getReferencePeriod(item) {
  return item && typeof item === 'object' ? cleanText(item.time_period) : '';
}

// Deterministic hash so the same name always gets the same filler variant
// (stable across renders/SSG), but different names generally get different text.
function hashString(str) {
  let hash = 0;
  const value = String(str || '');
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function shouldShowHistoricalReference(ref) {
  const fakePhrases = [
    'various islamic scholars',
    'has been used throughout',
    'faithful believers who exemplified',
    'carried significant weight in that era',
    'throughout islamic history',
    'throughout christian history',
    'throughout hindu history',
  ];

  const refText = String(ref?.reference || ref?.notes || ref || '').toLowerCase();
  const isFake = fakePhrases.some(phrase => refText.includes(phrase));
  const isTooShort = String(ref?.reference || ref?.notes || ref || '').length < 80;

  return !isFake && !isTooShort;
}

function isGenericSpiritualSymbolism(data) {
  const symbolism = String(data.spiritual_symbolism || '').toLowerCase();
  const longMeaning = String(data.long_meaning || '').toLowerCase();
  const shortMeaning = String(data.short_meaning || data.meaning || '').toLowerCase();

  if (!symbolism) return true;

  const repeatsLongMeaning = longMeaning.length > 20 && symbolism.includes(longMeaning.substring(0, 40).toLowerCase());
  const isTemplate = symbolism.includes('the meaning') && symbolism.includes('symbolizes') && (
    symbolism.includes('in christian spirituality') ||
    symbolism.includes('in islamic spirituality') ||
    symbolism.includes('in hindu spirituality')
  );

  return repeatsLongMeaning || isTemplate;
}

function isGenericModernUsage(modernContext) {
  const genericPhrases = [
    'remains relevant in modern',
    'representing a bridge between traditional',
    'widely discussed on digital platforms',
    'continues to be a popular choice',
    'is a name that embodies',
  ];

  const text = String(modernContext || '').toLowerCase();
  return genericPhrases.some(phrase => text.includes(phrase));
}

function hasRealPopularityData(popularityByRegion) {
  if (!popularityByRegion || popularityByRegion.length === 0) return false;
  const allRound = popularityByRegion.every(p => Number(p.score) % 5 === 0);
  return !allRound;
}

function buildSnippet(data) {
  const name = cleanText(data.name || 'This name');
  const meaning = getCoreMeaning(data);
  const origin = cleanText(data.origin) || 'multiple linguistic traditions';
  const religion = getReligionLabel(data.religion);
  const gender = getGenderLabel(data.gender).toLowerCase();
  const languages = getLanguages(data).map(item => item.name);
  const pronunciation = cleanText(data.pronunciation?.english || data.pronunciation?.ipa);
  const luckyNumber = data.lucky_number || data.luckyNumber;
  let text = `${name} is a ${gender} name from ${origin} origin meaning "${meaning}". It is used in ${religion} naming contexts${languages.length ? ` and appears in ${languages.join(', ')}` : ''}.${pronunciation ? ` Pronunciation: ${pronunciation}.` : ''}${luckyNumber ? ` Lucky number: ${luckyNumber}.` : ''}`;

  if (data.emotional_traits?.length) {
    text += ` ${name} is sometimes associated with qualities such as ${data.emotional_traits.slice(0, 2).join(', ')} in different cultural interpretations.`;
  }

  return text.split(/\s+/).slice(0, 58).join(' ');
}

function SectionHeading({ icon: Icon, eyebrow, title, description }) {
  return (
    <div className="mb-5 flex items-start gap-3 text-slate-900">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-amber-700 shadow-sm">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        {eyebrow && <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{eyebrow}</p>}
        <h2 className="text-xl font-semibold">{title}</h2>
        {description && <p className="mt-1 text-sm text-slate-500">{description}</p>}
      </div>
    </div>
  );
}

function TranslationCard({ language }) {
  if (!language?.value) return null;
  return (
    <div className="nv-card-solid p-4">
      <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-900">
        <span>{language.flag}</span>
        <span>{language.name}</span>
      </div>
      <p className="font-semibold text-slate-900">{language.value.name || 'Name translation'}</p>
      {language.value.meaning ? <p className="mt-1 text-sm leading-6 text-slate-700">{language.value.meaning}</p> : null}
      {language.value.long_meaning ? <p className="mt-2 text-sm leading-6 text-slate-600">{language.value.long_meaning}</p> : null}
    </div>
  );
}

export default function LinguisticOriginPanel({ data, nativeBanner }) {
  const languages = getLanguages(data);
  const originTranslation = getOriginTranslation(data);
  const traits = getTraits(data);
  const luckyColors = getLuckyColors(data);
  const pronunciation = data.pronunciation?.english || data.pronunciation?.ipa;
  const religionLabel = getReligionLabel(data.religion);
  const genderLabel = getGenderLabel(data.gender);
  const origin = cleanText(data.origin) || 'Multiple linguistic traditions';
  const meaning = getCoreMeaning(data);
  const luckyNumber = data.lucky_number || data.luckyNumber;
  const lifePathNumber = cleanText(data.life_path_number);
  const numerologyMeaning = cleanText(data.numerology_meaning);

  return (
    <div className="nv-stack">
      <section className="nv-card">
        <SectionHeading icon={BookOpen} eyebrow="Quick Answer" title="Meaning Summary" description="A concise answer for featured snippets and voice search." />
        <div className="rounded-3xl bg-amber-50 p-5 text-slate-800 ring-1 ring-amber-100">
          <h3 className="text-lg font-semibold text-slate-900">What does {data.name} mean?</h3>
          <p className="mt-2 leading-7">{buildSnippet(data)}</p>
        </div>
      </section>

      {data.in_urdu && (
        <section className="nv-card">
          <SectionHeading icon={Languages} eyebrow="Translation" title="Meaning in Urdu" />
          <TranslationCard language={{ code: 'urdu', flag: getLanguageFlag('urdu'), name: 'Urdu', value: data.in_urdu }} />
        </section>
      )}

      {originTranslation && (
        <section className="nv-card">
          <SectionHeading icon={Globe} eyebrow="Source Language" title={`Meaning in ${originTranslation.label}`} description={`${originTranslation.label} is used to show the source-language meaning and cultural nuance.`} />
          <TranslationCard language={originTranslation} />
        </section>
      )}

      <section className="nv-card">
        <SectionHeading icon={Volume2} eyebrow="Pronunciation" title="How to Pronounce the Name" />
        <div className="grid gap-4 md:grid-cols-2">
          {data.pronunciation?.english && (
            <div className="rounded-3xl border border-slate-100 bg-slate-50 p-4">
              <p className="text-sm uppercase tracking-[0.18em] text-slate-500">English Pronunciation</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">{data.pronunciation.english}</p>
            </div>
          )}
          {data.pronunciation?.ipa && (
            <div className="rounded-3xl border border-slate-100 bg-slate-50 p-4">
              <p className="text-sm uppercase tracking-[0.18em] text-slate-500">IPA</p>
              <p className="mt-2 text-xl font-semibold text-slate-900">{data.pronunciation.ipa}</p>
            </div>
          )}
          {!pronunciation && <p className="text-slate-700">NameVerse does not list a pronunciation guide for this name.</p>}
        </div>
      </section>

      <section className="nv-card">
        <SectionHeading icon={Globe} eyebrow="Origin" title="Name Origin" />
        <div className="space-y-3">
          <div className="rounded-3xl bg-slate-50 p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Root Origin</p>
            <p className="text-slate-900 font-medium">{origin}</p>
          </div>
          {data.language_family || data.origin_language ? (
            <div className="rounded-3xl bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Source Language</p>
              <p className="text-slate-900 font-medium">{data.language_family || data.origin_language}</p>
            </div>
          ) : null}
          {languages.length > 0 && (
            <div className="rounded-3xl bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-500 mb-3">Language Usage</p>
              <div className="flex flex-wrap gap-2">
                {languages.map((language) => (
                  <span key={language.code} className="rounded-full bg-white px-3 py-1 text-sm text-slate-700 ring-1 ring-slate-200">
                    {language.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="nv-card">
        <SectionHeading icon={Shield} eyebrow="Religion" title={`${religionLabel} Name Context`} />
        <div className="rounded-3xl bg-slate-50 p-4 leading-7 text-slate-700">
          {data.name} is listed as a {religionLabel.toLowerCase()} {genderLabel.toLowerCase()} name with {origin} origin. Its meaning is {meaning}.
          {data.category ? ` Category: ${data.category}.` : ''}
        </div>
      </section>

      {(luckyNumber || data.lucky_day || luckyColors.length > 0 || data.lucky_stone || lifePathNumber) && (
        <section className="nv-card-solid">
          <SectionHeading icon={Sparkles} eyebrow="Lucky Details" title="Lucky Number, Day and Color" />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {luckyNumber && (
              <div className="rounded-3xl border border-slate-100 bg-slate-50 p-4">
                <p className="text-sm uppercase tracking-[0.18em] text-slate-500">Lucky Number</p>
                <p className="mt-2 text-3xl font-semibold text-slate-900">{luckyNumber}</p>
              </div>
            )}
            {data.lucky_day && (
              <div className="rounded-3xl border border-slate-100 bg-slate-50 p-4">
                <p className="text-sm uppercase tracking-[0.18em] text-slate-500">Lucky Day</p>
                <p className="mt-2 text-2xl font-semibold text-slate-900">{data.lucky_day}</p>
              </div>
            )}
            {luckyColors.length > 0 && (
              <div className="rounded-3xl border border-slate-100 bg-slate-50 p-4">
                <p className="text-sm uppercase tracking-[0.18em] text-slate-500">Lucky Colors</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {luckyColors.map((color) => (
                    <span key={color} className="rounded-full bg-white px-3 py-1 text-sm text-slate-700 ring-1 ring-slate-200">{color}</span>
                  ))}
                </div>
              </div>
            )}
            {data.lucky_stone && (
              <div className="rounded-3xl border border-slate-100 bg-slate-50 p-4">
                <p className="text-sm uppercase tracking-[0.18em] text-slate-500">Lucky Stone</p>
                <p className="mt-2 text-lg font-semibold text-slate-900">{data.lucky_stone}</p>
              </div>
            )}
            {lifePathNumber && (
              <div className="rounded-3xl border border-slate-100 bg-slate-50 p-4">
                <p className="text-sm uppercase tracking-[0.18em] text-slate-500">Life Path Number</p>
                <p className="mt-2 text-2xl font-semibold text-slate-900">{lifePathNumber}</p>
              </div>
            )}
          </div>
          {numerologyMeaning && (
            <div className="mt-4 rounded-3xl bg-amber-50 p-4 text-sm leading-6 text-slate-700">
              <span className="font-semibold text-slate-900">Numerology meaning:</span> {numerologyMeaning}
            </div>
          )}
        </section>
      )}

      {traits.length > 0 && (
        <section className="nv-card">
          <SectionHeading icon={Heart} eyebrow="Personality" title="Personality Traits" />
          <div className="flex flex-wrap gap-2">
            {traits.map((trait) => (
              <span key={trait} className="rounded-full bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-800 ring-1 ring-emerald-100">{trait}</span>
            ))}
          </div>
        </section>
      )}

      {data.spiritual_meaning && (
        <section className="nv-card">
          <SectionHeading icon={BookText} eyebrow="Spiritual" title="Spiritual Significance" />
          <div className="rounded-3xl bg-amber-50 p-4 text-slate-800 leading-7">
            {data.spiritual_meaning}
          </div>
        </section>
      )}

      {(data.cultural_impact || data.spiritual_significance || data.islamic_reference || data.vedic_reference || data.biblical_reference || data.saint_reference) && (
        <section className="nv-card">
          <SectionHeading icon={Shield} eyebrow="Cultural Context" title="Cultural Significance" />
          <div className="space-y-4 text-slate-700 leading-7">
            {data.cultural_impact && <div className="rounded-3xl bg-slate-50 p-4">{data.cultural_impact}</div>}
            {data.spiritual_significance && <div className="rounded-3xl bg-slate-50 p-4">{data.spiritual_significance}</div>}
            {data.islamic_reference && (
              <p className="rounded-3xl bg-emerald-50 p-4 text-sm text-emerald-800">
                {data.islamic_reference.is_quranic ? 'Quranic Arabic origin' : 'Traditional Islamic naming context'}{data.islamic_reference.note ? ` — ${data.islamic_reference.note}` : ''}
              </p>
            )}
            {data.vedic_reference && (
              <p className="rounded-3xl bg-amber-50 p-4 text-sm text-amber-800">
                {data.vedic_reference.is_vedic ? 'Vedic Sanskrit origin' : 'Cultural Hindu name'}{data.vedic_reference.root_origin ? ` · Root: ${data.vedic_reference.root_origin}` : ''}{data.vedic_reference.note ? ` · ${data.vedic_reference.note}` : ''}
              </p>
            )}
            {data.biblical_reference?.is_biblical && data.biblical_reference?.verse_reference && (
              <p className="rounded-3xl bg-blue-50 p-4 text-sm text-blue-800">
                Biblical reference: {data.biblical_reference.verse_reference}{data.biblical_reference.note ? ` — ${data.biblical_reference.note}` : ''}
              </p>
            )}
            {data.saint_reference?.is_saint_name && data.saint_reference?.saint_name && (
              <p className="rounded-3xl bg-purple-50 p-4 text-sm text-purple-800">
                Saint connection: {data.saint_reference.saint_name}{data.saint_reference.note ? ` — ${data.saint_reference.note}` : ''}
              </p>
            )}
          </div>
        </section>
      )}

      {nativeBanner}

      {data.historical_references?.length > 0 && (() => {
        const validRefs = data.historical_references.filter(ref => shouldShowHistoricalReference(ref));
        if (validRefs.length === 0) return null;
        return (
          <section className="nv-card">
            <SectionHeading icon={Clock} eyebrow="Historical Usage" title="Historical References" />
            <div className="space-y-4">
              {validRefs.map((item, idx) => {
                const refText = getReferenceText(item);
                const refPeriod = getReferencePeriod(item);
                if (!refText) return null;
                return (
                  <div key={idx} className="rounded-3xl border border-slate-100 bg-slate-50 p-4">
                    <p className="text-sm leading-6 text-slate-700">{refText}</p>
                    {refPeriod && <p className="mt-2 text-xs uppercase tracking-[0.18em] text-slate-500">{refPeriod}</p>}
                  </div>
                );
              })}
            </div>
          </section>
        );
      })()}

      {data.spiritual_symbolism && !isGenericSpiritualSymbolism(data) && (
        <section className="nv-card">
          <SectionHeading icon={Sparkles} eyebrow="Spiritual" title="Spiritual Symbolism" />
          <div className="rounded-3xl bg-amber-50 p-4 text-slate-800 leading-7">
            {data.spiritual_symbolism}
          </div>
        </section>
      )}

      {data.modern_usage && !isGenericModernUsage(data.modern_usage?.modern_context) && (
        <section className="nv-card">
          <SectionHeading icon={TrendingUp} eyebrow="Modern Usage" title="Modern Usage" />
          <div className="rounded-3xl bg-slate-50 p-4 text-slate-700 leading-7">
            {data.modern_usage.modern_context || JSON.stringify(data.modern_usage)}
          </div>
        </section>
      )}

      {hasRealPopularityData(data.popularity_by_region) && (
        <section className="nv-card">
          <SectionHeading icon={TrendingUp} eyebrow="Popularity" title="Popularity by Region" />
          <div className="rounded-3xl bg-slate-50 p-4 text-slate-700 leading-7">
            {data.popularity_by_region.map((region, idx) => (
              <div key={idx} className="flex justify-between py-2 border-b border-slate-200 last:border-0">
                <span className="font-medium">{region.region || region.country || 'Region'}</span>
                <span className="text-slate-600">Score: {region.score}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.celebrity_usage?.length > 0 && (() => {
        const realCelebrities = data.celebrity_usage.filter(person => {
          const text = String(typeof person === 'object' ? JSON.stringify(person) : person).toLowerCase();
          return !text.includes('fictional') && !text.includes('example') && !text.includes('sample');
        });
        if (realCelebrities.length === 0) return null;
        return (
          <section className="nv-card">
            <SectionHeading icon={Award} eyebrow="Famous People" title="Famous People and Real-World Usage" />
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500 mb-3">Historical Figures & Cultural References</p>
            <div className="flex flex-wrap gap-2">
              {realCelebrities.map((person, idx) => {
                const label = typeof person === 'object' ? JSON.stringify(person) : person;
                return <span key={idx} className="rounded-2xl bg-slate-100 px-3 py-2 text-sm text-slate-700">{label}</span>;
              })}
            </div>
          </section>
        );
      })()}

      {data.name_variations?.length > 0 && (
        <section className="nv-card">
          <SectionHeading icon={Languages} eyebrow="Variations" title="Name Variations" />
          <div className="flex flex-wrap gap-2">
            {data.name_variations.map((variation, idx) => (
              <span key={idx} className="rounded-2xl bg-indigo-50 px-3 py-2 text-sm text-indigo-800 ring-1 ring-indigo-100">{variation}</span>
            ))}
          </div>
        </section>
      )}

      {languages.length > 0 && (
        <section className="nv-card-solid">
          <SectionHeading icon={Languages} eyebrow="Translations" title="Name Translations" description="Additional language translations available for this name." />
          <div className="grid gap-4 sm:grid-cols-2">
            {languages.map((language) => (
              <TranslationCard key={language.code} language={language} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
