/**
 * SEO Content Enhancement Helpers
 * Generate additional contextual content for better SEO
 */

/**
 * Generate comprehensive introduction text for name pages
 * @param {Object} name - Name data object
 * @returns {string} SEO-rich introduction paragraph
 */
export function generateNameIntroduction(name) {
  const parts = [];

  // Opening sentence with primary keyword
  parts.push(
    `${name.name} is a ${name.gender || 'beautiful'} baby name of ${name.origin || 'cultural'} origin, commonly used in ${name.religion || 'various'} communities around the world.`
  );

  // Meaning explanation
  if (name.short_meaning || name.meaning) {
    parts.push(
      `The name ${name.name} carries the profound meaning of "${name.short_meaning || name.meaning}", making it a meaningful choice for parents seeking names with deep spiritual and cultural significance.`
    );
  }

  // Cultural context
  if (name.religion && name.origin) {
    parts.push(
      `In ${name.religion} tradition, ${name.name} represents important values and has been cherished by ${name.origin}-speaking families for generations. This name embodies the rich heritage and timeless wisdom passed down through ${name.religion} culture.`
    );
  }

  // Personality and traits
  if (name.emotional_traits && name.emotional_traits.length > 0) {
    parts.push(
      `Parents who choose ${name.name} for their baby often appreciate its association with qualities such as ${name.emotional_traits.slice(0, 3).join(', ')}. The name reflects a personality that is both distinctive and admired in many cultures.`
    );
  }

  return parts.join(' ');
}

/**
 * Generate "Why Choose This Name" section content
 * @param {Object} name - Name data
 * @returns {string} Persuasive content
 */
export function generateWhyChooseContent(name) {
  const reasons = [];

  if (name.spiritual_meaning) {
    reasons.push(`**Spiritual Significance:** ${name.spiritual_meaning}`);
  }

  if (name.cultural_impact) {
    reasons.push(`**Cultural Heritage:** ${name.name} carries a rich cultural legacy, ${name.cultural_impact.substring(0, 150)}...`);
  }

  if (name.lucky_number || name.lucky_day || name.lucky_stone) {
    const luckyDetails = [];
    if (name.lucky_number) luckyDetails.push(`lucky number ${name.lucky_number}`);
    if (name.lucky_day) luckyDetails.push(`lucky day ${name.lucky_day}`);
    if (name.lucky_stone) luckyDetails.push(`lucky stone ${name.lucky_stone}`);

    reasons.push(`**Numerology & Fortune:** Associated with ${luckyDetails.join(', ')}, adding a special dimension to this name's significance.`);
  }

  if (name.themes && name.themes.length > 0) {
    reasons.push(`**Thematic Connections:** This name resonates with themes of ${name.themes.join(', ')}, perfect for parents seeking names with specific symbolic meanings.`);
  }

  return reasons.join('\n\n');
}

/**
 * Generate pronunciation guide text
 * @param {Object} name - Name data
 * @returns {string} Pronunciation guide
 */
export function generatePronunciationGuide(name) {
  const guides = [];

  if (name.pronunciation) {
    if (name.pronunciation.english) {
      guides.push(`**English:** ${name.pronunciation.english}`);
    }
    if (name.pronunciation.urdu) {
      guides.push(`**Urdu:** ${name.pronunciation.urdu}`);
    }
    if (name.pronunciation.arabic) {
      guides.push(`**Arabic:** ${name.pronunciation.arabic}`);
    }
    if (name.pronunciation.hindi) {
      guides.push(`**Hindi:** ${name.pronunciation.hindi}`);
    }
    if (name.pronunciation.ipa) {
      guides.push(`**IPA:** ${name.pronunciation.ipa}`);
    }
  }

  if (guides.length === 0) {
    return `The name ${name.name} is pronounced clearly and distinctly across different languages and dialects.`;
  }

  return `### How to Pronounce ${name.name}\n\n` + guides.join('\n\n');
}

/**
 * Generate FAQ section for name pages
 * @param {Object} name - Name data
 * @returns {Array} FAQ items
 */
export function generateNameFAQ(name) {
  return [
    {
      question: `What does the name ${name.name} mean?`,
      answer: name.long_meaning || name.short_meaning || `${name.name} is a meaningful name with cultural significance in ${name.religion} tradition.`
    },
    {
      question: `What is the origin of ${name.name}?`,
      answer: `${name.name} originates from ${name.origin || 'ancient cultural roots'} and is primarily used in ${name.religion || 'various'} communities. The name has ${name.language ? `roots in ${name.language.join(' and ')} languages` : 'a rich linguistic heritage'}.`
    },
    {
      question: `Is ${name.name} a good name for a baby?`,
      answer: `Yes, ${name.name} is an excellent choice for a baby name. It carries positive meanings${name.emotional_traits ? `, represents qualities like ${name.emotional_traits.slice(0, 3).join(', ')}` : ''}, and has cultural significance in ${name.religion || 'multiple'} traditions. Many parents choose ${name.name} for its ${name.spiritual_meaning ? 'spiritual depth' : 'beautiful meaning'} and timeless appeal.`
    },
    {
      question: `How popular is the name ${name.name}?`,
      answer: `${name.name} is a${name.category?.includes('Popular') ? ' popular' : 'n increasingly chosen'} name in ${name.religion || 'various'} communities. Its timeless appeal and meaningful significance make it a cherished choice for parents seeking ${name.gender ? `${name.gender} ` : ''}names with cultural depth.`
    },
    {
      question: `What are similar names to ${name.name}?`,
      answer: name.similar_sounding_names?.length > 0
        ? `Names similar to ${name.name} include ${name.similar_sounding_names.slice(0, 5).join(', ')}. ${name.related_names?.length > 0 ? `Related names with similar meanings are ${name.related_names.slice(0, 3).join(', ')}.` : ''}`
        : `${name.name} is a unique name. Browse our collection of ${name.religion} ${name.gender} names to discover similar meaningful options.`
    }
  ];
}

/**
 * Generate rich cultural context paragraph
 * @param {Object} name - Name data
 * @returns {string} Cultural context content
 */
export function generateCulturalContext(name) {
  const paragraphs = [];

  // Historical context
  if (name.historical_references && name.historical_references.length > 0) {
    const ref = name.historical_references[0];
    paragraphs.push(
      `The name ${name.name} has deep historical roots dating back to ${ref.time_period || 'ancient times'}. ${ref.context ? ref.context.substring(0, 200) + '...' : ''}`
    );
  }

  // Modern usage
  if (name.modern_usage && name.modern_usage.modern_context) {
    paragraphs.push(
      `In contemporary society, ${name.name} continues to be relevant. ${name.modern_usage.modern_context.substring(0, 250)}...`
    );
  }

  // Cultural impact
  if (name.cultural_impact) {
    paragraphs.push(name.cultural_impact.substring(0, 300) + '...');
  }

  if (paragraphs.length === 0) {
    paragraphs.push(
      `${name.name} represents the beautiful intersection of tradition and modernity in ${name.religion} naming customs. This name has been treasured by families seeking to honor their cultural heritage while giving their children names that resonate in contemporary society.`
    );
  }

  return paragraphs.join('\n\n');
}

/**
 * Generate SEO-rich conclusion paragraph
 * @param {Object} name - Name data
 * @returns {string} Conclusion content
 */
export function generateConclusion(name) {
  return `Choosing ${name.name} for your baby connects them to a rich ${name.religion || 'cultural'} heritage while giving them a name with profound meaning. Whether you're drawn to its ${name.short_meaning ? `beautiful meaning of "${name.short_meaning}"` : 'cultural significance'}, its ${name.origin || 'traditional'} roots, or its ${name.spiritual_meaning ? 'spiritual depth' : 'timeless appeal'}, ${name.name} is a name that will serve your child well throughout their life. Explore more ${name.religion} ${name.gender} names on NameVerse to find the perfect name for your baby.`;
}

/**
 * Generate article introduction with SEO keywords
 * @param {Object} article - Article data
 * @returns {string} Content introduction
 */
export function generateContentIntroduction(content) {
  const parts = [];

  if (!content) return '';

  // If it's a name object
  if (content.name) {
    if (content.subtitle) parts.push(content.subtitle);
    if (content.short_meaning) parts.push(content.short_meaning);
    parts.push(`Explore the meaning, origin, and usage of the name ${content.name} across cultures and traditions.`);
  } else {
    // Generic content (previously article)
    if (content.subtitle) parts.push(content.subtitle);
    if (content.category) {
      parts.push(
        `This guide on ${content.category} provides insights into naming traditions, cultural meanings, and practical advice for parents.`
      );
    }
    if (content.excerpt) parts.push(content.excerpt);
    if (parts.length === 0) {
      parts.push(
        `Discover valuable insights about baby names, cultural traditions, and naming practices from NameVerse.`
      );
    }
  }

  return parts.join(' ');
}

/**
 * Generate "In This Article" table of contents
 * @param {Array} headings - Article headings
 * @returns {string} TOC HTML
 */
export function generateTableOfContents(headings) {
  if (!headings || headings.length === 0) return '';

  const items = headings.map((heading, index) =>
    `<li><a href="#${heading.id}" class="text-indigo-600 hover:underline">${heading.text}</a></li>`
  ).join('\n');

  return `
<nav aria-label="Table of Contents" class="bg-gray-50 rounded-lg p-6 mb-8">
  <h2 class="text-xl font-bold mb-4">In This Article</h2>
  <ol class="space-y-2 list-decimal list-inside">
    ${items}
  </ol>
</nav>
  `.trim();
}

export default {
  generateNameIntroduction,
  generateWhyChooseContent,
  generatePronunciationGuide,
  generateNameFAQ,
  generateCulturalContext,
  generateConclusion,
  generateContentIntroduction,
  generateTableOfContents,
};
