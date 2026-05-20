function generateHreflangTags({ canonicalUrl, localizedUrls = [] }) {
  const tags = [
    { rel: 'alternate', hrefLang: 'en', href: canonicalUrl },
    ...localizedUrls.map(({ lang, url }) => ({
      rel: 'alternate',
      hrefLang: lang,
      href: url,
    })),
    { rel: 'alternate', hrefLang: 'x-default', href: canonicalUrl },
  ];
  return tags;
}

function getDefaultHreflang(canonicalUrl) {
  return generateHreflangTags({ canonicalUrl, localizedUrls: [] });
}

export { generateHreflangTags, getDefaultHreflang };
