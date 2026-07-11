/**
 * NameVerse Enterprise FAQ Engine
 *
 * Generates 8–15 unique, data-driven FAQs per name page.
 * - Conditional: only emits questions when real source data exists.
 * - Varied: 15+ answer-template families with deterministic rotation.
 * - Duplicate-safe: stable hash selection keeps answers consistent per name
 *   while varying across the 65,000-page corpus.
 * - SEO-optimized: targets Featured Snippets, People Also Ask, AI Overviews,
 *   and voice search with natural-language, semantically rich answers.
 */

const SITE_NAME = 'NameVerse';

/* -----------------------------------
   TEXT UTILITIES
----------------------------------- */
function clean(text = '') {
  return String(text).replace(/\s+/g, ' ').trim();
}

function stableHash(str = '') {
  let h = 0;
  for (let i = 0; i < str.length; i += 1) {
    h = (h * 31 + str.charCodeAt(i)) >>> 0;
  }
  return h;
}

function pick(arr, seed = 0) {
  if (!arr.length) return '';
  return arr[seed % arr.length];
}

/* -----------------------------------
   FIELD EXTRACTORS
----------------------------------- */
function getName(data) {
  return clean(data.name || data.full_name || 'This name');
}

function getMeaning(data) {
  return clean(data.short_meaning || data.meaning || data.core_meaning || '');
}

function getLongMeaning(data) {
  return clean(data.long_meaning || '');
}

function getOrigin(data) {
  return clean(data.origin || data.root_origin || data.etymological_origin || '');
}

function getReligion(data) {
  return clean(data.religion || data.faith_tradition || '').toLowerCase();
}

function getReligionLabel(data) {
  const r = getReligion(data);
  if (r === 'islamic' || r === 'islam' || r === 'muslim') return 'Islamic';
  if (r === 'christian' || r === 'christianity') return 'Christian';
  if (r === 'hindu' || r === 'hinduism') return 'Hindu';
  return clean(data.religion || 'Cultural');
}

function getGender(data) {
  const g = clean(data.gender || '').toLowerCase();
  if (g.includes('female')) return 'girl';
  if (g.includes('unisex') || g.includes('neutral')) return 'unisex';
  if (g.includes('male')) return 'boy';
  return 'baby';
}

function getGenderLabel(data) {
  const g = clean(data.gender || '').toLowerCase();
  if (g.includes('female')) return 'Female';
  if (g.includes('unisex') || g.includes('neutral')) return 'Unisex';
  if (g.includes('male')) return 'Male';
  return clean(data.gender || 'Unisex');
}

function getPronunciation(data) {
  return clean(data.pronunciation?.english || data.pronunciation?.ipa || '');
}

function getLanguages(data) {
  const langs = Array.isArray(data.language) ? data.language.map(clean).filter(Boolean) : [];
  const translationKeys = {
    in_arabic: 'Arabic', in_urdu: 'Urdu', in_hindi: 'Hindi', in_sanskrit: 'Sanskrit',
    in_english: 'English', in_hebrew: 'Hebrew', in_greek: 'Greek', in_latin: 'Latin',
    in_pashto: 'Pashto', in_tamil: 'Tamil', in_telugu: 'Telugu', in_marathi: 'Marathi',
    in_bengali: 'Bengali', in_punjabi: 'Punjabi', in_turkish: 'Turkish', in_persian: 'Persian',
    in_malay: 'Malay', in_indonesian: 'Indonesian', in_french: 'French', in_spanish: 'Spanish',
    in_german: 'German', in_italian: 'Italian', in_chinese: 'Chinese', in_japanese: 'Japanese',
    in_korean: 'Korean', in_russian: 'Russian',
  };
  Object.entries(translationKeys).forEach(([key, label]) => {
    if (data[key]?.name || data[key]?.meaning || data[key]?.long_meaning) {
      if (!langs.includes(label)) langs.push(label);
    }
  });
  return langs;
}

function getTranslationText(data, language) {
  const keyMap = {
    Urdu: 'in_urdu', Arabic: 'in_arabic', Hindi: 'in_hindi', Sanskrit: 'in_sanskrit',
    English: 'in_english', Hebrew: 'in_hebrew', Greek: 'in_greek', Latin: 'in_latin',
    Pashto: 'in_pashto', Tamil: 'in_tamil', Telugu: 'in_telugu', Marathi: 'in_marathi',
    Bengali: 'in_bengali', Punjabi: 'in_punjabi', Turkish: 'in_turkish', Persian: 'in_persian',
    Malay: 'in_malay', Indonesian: 'in_indonesian', French: 'in_french', Spanish: 'in_spanish',
    German: 'in_german', Italian: 'in_italian', Chinese: 'in_chinese', Japanese: 'in_japanese',
    Korean: 'in_korean', Russian: 'in_russian',
  };
  const key = keyMap[language];
  if (!key || !data[key]) return '';
  return clean(data[key].meaning || data[key].long_meaning || data[key].name || '');
}

function getLuckyNumber(data) {
  return clean(data.lucky_number || data.luckyNumber || '');
}

function getLuckyDay(data) {
  return clean(data.lucky_day || '');
}

function getLuckyColors(data) {
  return Array.isArray(data.lucky_colors) ? data.lucky_colors.map(clean).filter(Boolean) : [];
}

function getLuckyStone(data) {
  return clean(data.lucky_stone || '');
}

function getLifePathNumber(data) {
  return clean(data.life_path_number || '');
}

function getNumerologyMeaning(data) {
  return clean(data.numerology_meaning || '');
}

function getPersonalityTraits(data) {
  const traits = [];
  if (Array.isArray(data.emotional_traits)) traits.push(...data.emotional_traits.map(clean));
  if (Array.isArray(data.hidden_personality_traits)) traits.push(...data.hidden_personality_traits.map(clean));
  if (clean(data.personality_traits)) traits.push(clean(data.personality_traits));
  return Array.from(new Set(traits.filter(Boolean))).slice(0, 6);
}

function getCulturalImpact(data) {
  return clean(data.cultural_impact || data.cultural_context || '');
}

function getSpiritualMeaning(data) {
  return clean(data.spiritual_meaning || data.spiritual_significance || '');
}

function getSimilarNames(data) {
  const names = [];
  if (Array.isArray(data.similar_sounding_names)) names.push(...data.similar_sounding_names.map(clean));
  if (Array.isArray(data.related_names)) names.push(...data.related_names.map(clean));
  return Array.from(new Set(names.filter(Boolean))).slice(0, 8);
}

function getNameVariations(data) {
  return Array.isArray(data.name_variations) ? data.name_variations.map(clean).filter(Boolean).slice(0, 8) : [];
}

function getHistoricalReferences(data) {
  if (!Array.isArray(data.historical_references)) return [];
  return data.historical_references
    .map(ref => {
      if (typeof ref === 'string') return { text: clean(ref), period: '' };
      if (!ref || typeof ref !== 'object') return null;
      return {
        text: clean(ref.reference || ref.notes || ref.text || ''),
        period: clean(ref.time_period || ref.era || ref.period || ''),
      };
    })
    .filter(ref => ref && ref.text.length >= 80);
}

function getCelebrityUsage(data) {
  if (!Array.isArray(data.celebrity_usage)) return [];
  return data.celebrity_usage
    .map(person => {
      if (typeof person === 'string') return clean(person);
      if (!person || typeof person !== 'object') return '';
      return clean(person.name || person.full_name || person.description || JSON.stringify(person));
    })
    .filter(Boolean);
}

function getPopularityByRegion(data) {
  if (!Array.isArray(data.popularity_by_region)) return [];
  return data.popularity_by_region
    .map(region => ({
      region: clean(region.region || region.country || region.location || ''),
      score: Number(region.score || region.rank || region.popularity || 0),
    }))
    .filter(item => item.region && item.score > 0);
}

function getBiblicalReference(data) {
  if (!data.biblical_reference || typeof data.biblical_reference !== 'object') return null;
  return {
    isBiblical: Boolean(data.biblical_reference.is_biblical),
    verse: clean(data.biblical_reference.verse_reference || data.biblical_reference.verse || ''),
    note: clean(data.biblical_reference.note || data.biblical_reference.description || ''),
    testament: clean(data.biblical_reference.testament || ''),
  };
}

function getQuranicReference(data) {
  if (!data.islamic_reference || typeof data.islamic_reference !== 'object') return null;
  return {
    isQuranic: Boolean(data.islamic_reference.is_quranic),
    note: clean(data.islamic_reference.note || data.islamic_reference.description || ''),
    chapter: clean(data.islamic_reference.chapter || ''),
    verse: clean(data.islamic_reference.verse || ''),
  };
}

function getVedicReference(data) {
  if (!data.vedic_reference || typeof data.vedic_reference !== 'object') return null;
  return {
    isVedic: Boolean(data.vedic_reference.is_vedic),
    note: clean(data.vedic_reference.note || data.vedic_reference.description || ''),
    rootOrigin: clean(data.vedic_reference.root_origin || ''),
    scripture: clean(data.vedic_reference.scripture || ''),
  };
}

function getSaintReference(data) {
  if (!data.saint_reference || typeof data.saint_reference !== 'object') return null;
  return {
    isSaint: Boolean(data.saint_reference.is_saint_name),
    saintName: clean(data.saint_reference.saint_name || ''),
    note: clean(data.saint_reference.note || data.saint_reference.description || ''),
    century: clean(data.saint_reference.century || ''),
  };
}

/* -----------------------------------
   TEMPLATE BANKS
   Each bank has 3–4 variants keyed by a stable hash so the same name
   always gets the same variant, but different names naturally vary.
----------------------------------- */

const MEANING_TEMPLATES = [
  (n, m, o, r, g) => `The ${r.toLowerCase()} ${g} name ${n} means "${m}". With ${o} origins, this name carries a meaning that resonates across cultural and linguistic traditions.`,
  (n, m, o, r, g) => `"${m}" is the meaning behind the name ${n}. Rooted in ${o} heritage, this ${r.toLowerCase()} ${g} name connects identity to cultural tradition.`,
  (n, m, o, r, g) => `Derived from ${o} linguistic roots, ${n} means "${m}". As a ${r.toLowerCase()} ${g} name, it reflects naming traditions that value meaningful identity.`,
  (n, m, o, r, g) => `Linguistically, ${n} translates to "${m}" from its ${o} origin. Within ${r.toLowerCase()} naming customs, this ${g} name emphasizes clarity of purpose.`,
];

const ORIGIN_TEMPLATES = [
  (n, o, r, langs) => `The name ${n} originates from ${o} tradition${langs.length ? ` and appears in ${langs.join(', ')} language contexts` : ''}. NameVerse classifies it as a ${r.toLowerCase()} name with deep cultural roots.`,
  (n, o, r, langs) => `${n} traces back to ${o} origins${langs.length ? `, with documented usage in ${langs.join(' and ')}` : ''}. This ${r.toLowerCase()} name reflects centuries of naming heritage.`,
  (n, o, r, langs) => `Historically, ${n} emerges from ${o} cultural background${langs.length ? ` and is attested in ${langs.join(', ')}` : ''}. The ${r.toLowerCase()} tradition preserves this name for its meaningful roots.`,
];

const PRONUNCIATION_TEMPLATES = [
  (n, p, o) => `The name ${n} is pronounced "${p}". The IPA notation clarifies stress and vowel sounds, helping speakers of different languages pronounce this ${o} name accurately.`,
  (n, p, o) => `In English, ${n} is pronounced "${p}". This pronunciation guide reflects the common spoken form while preserving the name's ${o} character.`,
  (n, p, o) => `To say ${n} correctly, use the pronunciation "${p}". This form balances the original ${o} phonetics with natural English speech patterns.`,
];

function getOriginLabelFromData(data) {
  return clean(data.origin || data.root_origin || 'cultural');
}

const PERSONALITY_TEMPLATES = [
  (n, traits, r) => `Traits traditionally associated with ${n} include ${traits}. In ${r.toLowerCase()} naming traditions, these qualities reflect the aspirations parents hold for a child.`,
  (n, traits, r) => `Within ${r.toLowerCase()} culture, the name ${n} is linked to characteristics such as ${traits}. These personality associations shape how the name is perceived and chosen.`,
  (n, traits, r) => `Names like ${n} often carry connotations of ${traits}. The ${r.toLowerCase()} naming tradition uses these associations to connect identity with valued character traits.`,
];

const CULTURAL_SIGNIFICANCE_TEMPLATES = [
  (n, impact, o, r, m) => `Within ${r.toLowerCase()} tradition, ${n} signifies ${impact || 'meaningful cultural identity'}. Its ${o} origin and meaning "${m}" make it a name that bridges heritage and modern identity.`,
  (n, impact, o, r, m) => `The cultural weight of ${n} comes from its ${o} roots and ${r.toLowerCase()} context. ${impact ? `Specifically, ${impact}.` : `It represents a link to ancestral naming practices.`} The meaning "${m}" reinforces this connection.`,
  (n, impact, o, r, m) => `In ${r.toLowerCase()} society, ${n} carries cultural meaning beyond its literal definition. From ${o} origins, the name "${m}" has come to represent shared values and community identity.`,
];

const SIMILAR_NAMES_TEMPLATES = [
  (n, similar, o) => `Names similar to ${n} include ${similar}. These share linguistic roots in ${o || 'multiple traditions'} and often carry related meanings or sounds.`,
  (n, similar, o) => `If you like ${n}, you may also appreciate ${similar}. These names echo ${o || 'cultural'} naming patterns and offer comparable meanings or phonetic appeal.`,
  (n, similar, o) => `Variations and names akin to ${n} are ${similar}. Rooted in ${o || 'shared linguistic heritage'}, they provide alternatives while preserving the name's essential character.`,
];

const VARIATIONS_TEMPLATES = [
  (n, vars) => `Spelling variations of ${n} include ${vars}. These alternate forms reflect how the name adapts across languages while keeping its core meaning intact.`,
  (n, vars) => `Across different cultures, ${n} appears as ${vars}. Each variation preserves the name's identity while adapting to local phonetic and orthographic conventions.`,
];

const HISTORICAL_TEMPLATES = [
  (n, ref, period) => `Historical records describe ${n} as follows: ${ref}${period ? ` This period corresponds to ${period}.` : ''}`,
  (n, ref, period) => `Historically, ${n} has a documented background: ${ref}${period ? ` The timeframe is ${period}.` : ''}`,
  (n, ref, period) => `The historical usage of ${n} is recorded as: ${ref}${period ? ` This situates the name in ${period}.` : ''}`,
];

const BIBLICAL_TEMPLATES = [
  (n, verse, note) => `The Biblical name ${n} appears in ${verse}.${note ? ` ${note}` : ''} This reference anchors the name in Christian scripture and tradition.`,
  (n, verse, note) => `In the Bible, ${n} is found at ${verse}.${note ? ` The context notes: ${note}` : ''} This makes it a recognized Biblical name with scriptural backing.`,
  (n, verse, note) => `Scripture mentions ${n} in ${verse}.${note ? ` Additional context: ${note}` : ''} For Christian families, this Biblical connection adds spiritual depth to the name.`,
];

const QURANIC_TEMPLATES = [
  (n, note) => `The name ${n} is mentioned in the Quran.${note ? ` ${note}` : ''} This Quranic origin gives the name special significance in Islamic naming tradition.`,
  (n, note) => `Within Islamic tradition, ${n} holds Quranic importance.${note ? ` ${note}` : ''} Muslim parents often choose this name for its direct connection to the holy text.`,
  (n, note) => `Quranic references include the name ${n}.${note ? ` ${note}` : ''} This links the name to divine revelation and elevates its status in Muslim culture.`,
];

const NON_QURANIC_ISLAMIC_TEMPLATES = [
  (n, note) => `The name ${n} is a traditional Islamic name, though not directly mentioned in the Quran.${note ? ` ${note}` : ''} It remains widely respected in Muslim communities.`,
  (n, note) => `While ${n} does not appear in the Quran, it is an established Islamic name.${note ? ` ${note}` : ''} Its use spans cultures and centuries within the Muslim world.`,
];

const VEDIC_TEMPLATES = [
  (n, note, root) => `The name ${n} is connected to Vedic traditions.${note ? ` ${note}` : ''}${root ? ` Its root meaning is "${root}".` : ''} This gives it spiritual depth in Hindu naming practice.`,
  (n, note, root) => `Within Hindu tradition, ${n} carries Vedic significance.${note ? ` ${note}` : ''}${root ? ` The root "${root}" underscores its ancient linguistic heritage.` : ''}`,
];

const NON_VEDIC_HINDU_TEMPLATES = [
  (n, note) => `The name ${n} is recognized in Hindu culture but is not classified as Vedic.${note ? ` ${note}` : ''} It is used across Hindu communities for its meaning and sound.`,
];

const SAINT_TEMPLATES = [
  (n, saint, note) => `There is a recognized Christian saint named ${saint}.${note ? ` ${note}` : ''} The name ${n} shares this saintly connection, making it meaningful in Catholic and Orthodox tradition.`,
  (n, saint, note) => `Saint ${saint} is an important figure in Christian history.${note ? ` ${note}` : ''} The name ${n} honors this legacy within Christian naming customs.`,
];

const FAMOUS_PEOPLE_TEMPLATES = [
  (n, people) => `Notable figures named ${n} include ${people}. Their achievements highlight the name's cultural presence and the diverse paths bearers of this name have taken.`,
  (n, people) => `Famous people named ${n} span fields such as arts, leadership, and scholarship. Examples include ${people}, showing the name's broad appeal.`,
];

const POPULARITY_TEMPLATES = [
  (n, regions) => `The name ${n} sees strong usage in ${regions}. This geographic spread reflects cultural exchange and the name's adaptability across different communities.`,
  (n, regions) => `Today, ${n} is most commonly used in ${regions}. Regional popularity patterns show how the name travels across cultures while retaining its core meaning.`,
];

const NUMEROLOGY_TEMPLATES = [
  (n, num, day, stone) => `In numerology, ${n} is associated with the number ${num}${day ? `, and the lucky day ${day}` : ''}${stone ? `, with ${stone} as the lucky stone` : ''}. These associations come from traditional name-number systems.`,
  (n, num, day, stone) => `Numerological analysis links ${n} to ${num}${day ? ` and the day ${day}` : ''}${stone ? `, pointing to ${stone} as its lucky gem` : ''}. Such systems assign meaning to the letters and sounds of a name.`,
  (n, num, day, stone) => `Traditional numerology assigns the number ${num} to ${n}${day ? ` and connects it with ${day}` : ''}${stone ? `, suggesting ${stone} as a meaningful talisman` : ''}. These beliefs vary by tradition.`,
];

const LUCKY_TEMPLATES = [
  (n, num, day, colors, stone, o) => `The lucky associations for ${n} include number ${num}, day ${day}${colors.length ? `, colors ${colors.join(' and ')}` : ''}${stone ? `, and stone ${stone}` : ''}. These details come from traditional naming lore linked to ${o} culture.`,
  (n, num, day, colors, stone, o) => `For ${n}, traditional lore lists lucky number ${num}${day ? `, lucky day ${day}` : ''}${colors.length ? `, lucky colors ${colors.join(', ')}` : ''}${stone ? `, and lucky stone ${stone}` : ''}. Such details are common in ${o} name analysis.`,
];

const TRANSLATION_TEMPLATES = [
  (n, lang, text) => `In ${lang}, the name ${n} is rendered as "${text}". This translation preserves the name's meaning while adapting to ${lang.toLowerCase()} phonetics and script conventions.`,
  (n, lang, text) => `The ${lang} form of ${n} is "${text}". Cross-linguistic renderings like this show how the name maintains identity across writing systems.`,
  (n, lang, text) => `When written in ${lang}, ${n} becomes "${text}". This reflects the name's cross-cultural reach and its adaptation to ${lang.toLowerCase()} linguistic norms.`,
];

/* -----------------------------------
   FAQ DECISION TREE
----------------------------------- */

function buildMeaningFAQ(data, seed) {
  const n = getName(data);
  const m = getMeaning(data);
  const o = getOrigin(data);
  const r = getReligionLabel(data);
  const g = getGender(data);
  if (!m) return null;
  const template = pick(MEANING_TEMPLATES, seed);
  return {
    question: `What does ${n} mean?`,
    answer: template(n, m, o, r, g),
  };
}

function buildOriginFAQ(data, seed) {
  const n = getName(data);
  const o = getOrigin(data);
  const r = getReligionLabel(data);
  const langs = getLanguages(data);
  if (!o && langs.length === 0) return null;
  const template = pick(ORIGIN_TEMPLATES, seed);
  return {
    question: `What is the origin of the name ${n}?`,
    answer: template(n, o || 'multiple linguistic traditions', r, langs),
  };
}

function buildPronunciationFAQ(data, seed) {
  const n = getName(data);
  const p = getPronunciation(data);
  const o = getOriginLabelFromData(data);
  if (!p) return null;
  const template = pick(PRONUNCIATION_TEMPLATES, seed);
  return {
    question: `How do you pronounce ${n}?`,
    answer: template(n, p, o),
  };
}

function buildGenderFAQ(data) {
  const n = getName(data);
  const g = getGenderLabel(data);
  const r = getReligionLabel(data);
  return {
    question: `Is ${n} a boy, girl, or unisex name?`,
    answer: `NameVerse lists ${n} as a ${g} name within ${r.toLowerCase()} naming traditions. Gender associations can vary by culture and era.`,
  };
}

function buildLuckyNumberFAQ(data, seed) {
  const n = getName(data);
  const num = getLuckyNumber(data);
  const o = getOriginLabelFromData(data);
  if (!num) return null;
  const day = getLuckyDay(data);
  const colors = getLuckyColors(data);
  const stone = getLuckyStone(data);
  if (day || colors.length || stone) {
    const template = pick(LUCKY_TEMPLATES, seed);
    return {
      question: `What are the lucky details for ${n}?`,
      answer: template(n, num, day, colors, stone, o),
    };
  }
  return {
    question: `What is the lucky number for ${n}?`,
    answer: `The lucky number associated with ${n} is ${num}. This comes from traditional ${o} name analysis.`,
  };
}

function buildNumerologyFAQ(data, seed) {
  const n = getName(data);
  const num = getLuckyNumber(data);
  const meaning = getNumerologyMeaning(data);
  const lifePath = getLifePathNumber(data);
  if (!num && !meaning && !lifePath) return null;
  const day = getLuckyDay(data);
  const stone = getLuckyStone(data);
  const template = pick(NUMEROLOGY_TEMPLATES, seed);
  return {
    question: `What is the numerology of ${n}?`,
    answer: template(n, num || 'varies by system', day, stone),
  };
}

function buildPersonalityFAQ(data, seed) {
  const n = getName(data);
  const traits = getPersonalityTraits(data);
  if (traits.length === 0) return null;
  const r = getReligionLabel(data);
  const template = pick(PERSONALITY_TEMPLATES, seed);
  return {
    question: `What personality traits are associated with ${n}?`,
    answer: template(n, traits.slice(0, 4).join(', '), r),
  };
}

function buildCulturalSignificanceFAQ(data, seed) {
  const n = getName(data);
  const impact = getCulturalImpact(data);
  const o = getOrigin(data);
  const r = getReligionLabel(data);
  const m = getMeaning(data);
  if (!impact && !o && !r) return null;
  const template = pick(CULTURAL_SIGNIFICANCE_TEMPLATES, seed);
  return {
    question: `What is the cultural significance of ${n}?`,
    answer: template(n, impact, o, r, m),
  };
}

function buildSpiritualSignificanceFAQ(data, seed) {
  const n = getName(data);
  const spiritual = getSpiritualMeaning(data);
  if (!spiritual) return null;
  const r = getReligionLabel(data);
  const m = getMeaning(data);
  const openings = [
    `Spiritually, ${n} means "${m}". Beyond the literal definition, ${r.toLowerCase()} tradition associates deeper significance: ${spiritual}`,
    `In spiritual terms, ${n} carries the meaning "${m}". ${r.toLowerCase()} sources add that ${spiritual.toLowerCase()}`,
    `The spiritual dimension of ${n} goes beyond its basic meaning. Within ${r.toLowerCase()} thought, ${spiritual}`,
  ];
  return {
    question: `What is the spiritual meaning of ${n}?`,
    answer: pick(openings, seed),
  };
}

function buildSimilarNamesFAQ(data, seed) {
  const n = getName(data);
  const similar = getSimilarNames(data);
  if (similar.length === 0) return null;
  const o = getOrigin(data);
  const template = pick(SIMILAR_NAMES_TEMPLATES, seed);
  return {
    question: `What names are similar to ${n}?`,
    answer: template(n, similar.slice(0, 6).join(', '), o),
  };
}

function buildVariationsFAQ(data, seed) {
  const n = getName(data);
  const vars = getNameVariations(data);
  if (vars.length === 0) return null;
  const template = pick(VARIATIONS_TEMPLATES, seed);
  return {
    question: `What are the spelling variations of ${n}?`,
    answer: template(n, vars.slice(0, 6).join(', ')),
  };
}

function buildHistoricalFAQ(data, seed) {
  const n = getName(data);
  const refs = getHistoricalReferences(data);
  if (refs.length === 0) return null;
  const primary = refs[0];
  const template = pick(HISTORICAL_TEMPLATES, seed);
  return {
    question: `What is the historical background of ${n}?`,
    answer: template(n, primary.text, primary.period),
  };
}

function buildFamousPeopleFAQ(data, seed) {
  const n = getName(data);
  const people = getCelebrityUsage(data);
  if (people.length === 0) return null;
  const template = pick(FAMOUS_PEOPLE_TEMPLATES, seed);
  return {
    question: `Which famous people are named ${n}?`,
    answer: template(n, people.slice(0, 5).join('; ')),
  };
}

function buildPopularityFAQ(data, seed) {
  const n = getName(data);
  const regions = getPopularityByRegion(data);
  if (regions.length === 0) return null;
  const top = regions.slice(0, 4);
  const regionText = top.map(r => `${r.region} (score ${r.score})`).join(', ');
  const template = pick(POPULARITY_TEMPLATES, seed);
  return {
    question: `Where is ${n} most commonly used today?`,
    answer: template(n, regionText),
  };
}

function buildBiblicalFAQ(data, seed) {
  const n = getName(data);
  const ref = getBiblicalReference(data);
  if (!ref || !ref.isBiblical) return null;
  if (!ref.verse) return null;
  const template = pick(BIBLICAL_TEMPLATES, seed);
  return {
    question: `Is ${n} a Biblical name?`,
    answer: template(n, ref.verse, ref.note),
  };
}

function buildQuranicFAQ(data, seed) {
  const n = getName(data);
  const ref = getQuranicReference(data);
  if (!ref) return null;
  if (ref.isQuranic) {
    const template = pick(QURANIC_TEMPLATES, seed);
    return {
      question: `Is ${n} mentioned in the Quran?`,
      answer: template(n, ref.note),
    };
  }
  const template = pick(NON_QURANIC_ISLAMIC_TEMPLATES, seed);
  return {
    question: `Is ${n} a Quranic name?`,
    answer: template(n, ref.note),
  };
}

function buildVedicFAQ(data, seed) {
  const n = getName(data);
  const ref = getVedicReference(data);
  if (!ref) return null;
  if (ref.isVedic) {
    return {
      question: `Is ${n} connected to Vedic traditions?`,
      answer: `The name ${n} is connected to Vedic traditions.${ref.note ? ` ${ref.note}` : ''}${ref.rootOrigin ? ` Its root meaning is "${ref.rootOrigin}".` : ''} This gives it spiritual depth in Hindu naming practice.`,
    };
  }
  const template = pick(NON_VEDIC_HINDU_TEMPLATES, seed);
  return {
    question: `Is ${n} a Vedic name?`,
    answer: template(n, ref.note),
  };
}

function buildSaintFAQ(data, seed) {
  const n = getName(data);
  const ref = getSaintReference(data);
  if (!ref || !ref.isSaint) return null;
  const saintDisplay = ref.saintName || n;
  const template = pick(SAINT_TEMPLATES, seed);
  return {
    question: `Is there a saint named ${n}?`,
    answer: template(n, saintDisplay, ref.note),
  };
}

function buildTranslationFAQ(data, language, seed) {
  const n = getName(data);
  const text = getTranslationText(data, language);
  if (!text) return null;
  const template = pick(TRANSLATION_TEMPLATES, seed);
  return {
    question: `How is ${n} written in ${language}?`,
    answer: template(n, language, text),
  };
}

/* -----------------------------------
   DUPLICATE PREVENTION
----------------------------------- */
function computeSimilarity(a, b) {
  const wordsA = new Set(a.toLowerCase().split(/\s+/));
  const wordsB = new Set(b.toLowerCase().split(/\s+/));
  const intersection = [...wordsA].filter(w => wordsB.has(w));
  const union = new Set([...wordsA, ...wordsB]);
  return union.size === 0 ? 0 : intersection.length / union.size;
}

function filterDuplicates(items, maxSimilarity = 0.6) {
  const filtered = [];
  for (const item of items) {
    const isDuplicate = filtered.some(existing => computeSimilarity(item.answer, existing.answer) > maxSimilarity);
    if (!isDuplicate) {
      filtered.push(item);
    }
  }
  return filtered;
}

/* -----------------------------------
   MAIN EXPORT
----------------------------------- */
export function generateFAQs(nameData, religion) {
  const data = { ...(nameData || {}) };
  const r = getReligion(data);
  const seed = stableHash(getName(data) + '|' + r);

  const candidates = [];

  // --- Core identity (always-on when data exists) ---
  const meaningFAQ = buildMeaningFAQ(data, seed + 1);
  if (meaningFAQ) candidates.push(meaningFAQ);

  const originFAQ = buildOriginFAQ(data, seed + 2);
  if (originFAQ) candidates.push(originFAQ);

  const genderFAQ = buildGenderFAQ(data);
  candidates.push(genderFAQ);

  const pronunciationFAQ = buildPronunciationFAQ(data, seed + 3);
  if (pronunciationFAQ) candidates.push(pronunciationFAQ);

  const luckyFAQ = buildLuckyNumberFAQ(data, seed + 4);
  if (luckyFAQ) candidates.push(luckyFAQ);

  const numerologyFAQ = buildNumerologyFAQ(data, seed + 5);
  if (numerologyFAQ) candidates.push(numerologyFAQ);

  // --- Traits & significance ---
  const personalityFAQ = buildPersonalityFAQ(data, seed + 6);
  if (personalityFAQ) candidates.push(personalityFAQ);

  const culturalFAQ = buildCulturalSignificanceFAQ(data, seed + 7);
  if (culturalFAQ) candidates.push(culturalFAQ);

  const spiritualFAQ = buildSpiritualSignificanceFAQ(data, seed + 8);
  if (spiritualFAQ) candidates.push(spiritualFAQ);

  // --- Names & variants ---
  const similarFAQ = buildSimilarNamesFAQ(data, seed + 9);
  if (similarFAQ) candidates.push(similarFAQ);

  const variationsFAQ = buildVariationsFAQ(data, seed + 10);
  if (variationsFAQ) candidates.push(variationsFAQ);

  // --- Translations ---
  const translations = getLanguages(data);
  const priorityLangs = ['Arabic', 'Hebrew', 'Greek', 'Sanskrit', 'Latin', 'English', 'Urdu', 'Hindi'];
  const selectedLangs = priorityLangs.filter(lang => translations.includes(lang)).slice(0, 3);
  selectedLangs.forEach((lang, idx) => {
    const tFAQ = buildTranslationFAQ(data, lang, seed + 11 + idx);
    if (tFAQ) candidates.push(tFAQ);
  });

  // --- Historical ---
  const historicalFAQ = buildHistoricalFAQ(data, seed + 15);
  if (historicalFAQ) candidates.push(historicalFAQ);

  // --- Famous people ---
  const famousFAQ = buildFamousPeopleFAQ(data, seed + 16);
  if (famousFAQ) candidates.push(famousFAQ);

  // --- Popularity ---
  const popularityFAQ = buildPopularityFAQ(data, seed + 17);
  if (popularityFAQ) candidates.push(popularityFAQ);

  // --- Religion-specific ---
  if (r === 'christian') {
    const biblicalFAQ = buildBiblicalFAQ(data, seed + 18);
    if (biblicalFAQ) candidates.push(biblicalFAQ);
    const saintFAQ = buildSaintFAQ(data, seed + 19);
    if (saintFAQ) candidates.push(saintFAQ);
  }

  if (r === 'islamic') {
    const quranicFAQ = buildQuranicFAQ(data, seed + 18);
    if (quranicFAQ) candidates.push(quranicFAQ);
  }

  if (r === 'hindu') {
    const vedicFAQ = buildVedicFAQ(data, seed + 18);
    if (vedicFAQ) candidates.push(vedicFAQ);
  }

  // --- Deduplicate ---
  let unique = filterDuplicates(candidates);

  // --- Ensure minimum 8, cap at 15 ---
  if (unique.length < 8) {
    const fallbacks = [
      {
        question: `What is ${getName(data)} best known for?`,
        answer: `${getName(data)} is best known as a ${getGender(data)} name with ${getOrigin(data) || 'cultural'} origins meaning "${getMeaning(data)}". It belongs to ${getReligionLabel(data).toLowerCase()} naming traditions and carries associations of ${getPersonalityTraits(data).slice(0, 3).join(', ') || 'meaningful identity'}.`,
      },
      {
        question: `How does ${getName(data)} fit into ${getReligionLabel(data)} tradition?`,
        answer: `Within ${getReligionLabel(data).toLowerCase()} naming customs, ${getName(data)} represents a choice grounded in ${getOrigin(data) || 'cultural'} heritage. Its meaning, "${getMeaning(data)}", aligns with values important to families in this tradition.`,
      },
    ];
    for (const fb of fallbacks) {
      if (unique.length >= 8) break;
      const isDup = unique.some(item => computeSimilarity(fb.answer, item.answer) > 0.6);
      if (!isDup) unique.push(fb);
    }
  }

  unique = unique.slice(0, 15);

  // Final pass: remove any that still slipped through
  unique = filterDuplicates(unique);

  return unique.map(item => ({
    question: clean(item.question),
    answer: clean(item.answer),
  }));
}

export default { generateFAQs };
