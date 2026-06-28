import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../../..');
const publicDir = path.join(rootDir, 'public');
const dataDir = path.join(publicDir, 'data');
const today = new Date().toISOString().split('T')[0];
const RELIGIONS = ['islamic', 'christian', 'hindu'];
const RELIGION_LABELS = { islamic: 'Islamic', christian: 'Christian', hindu: 'Hindu' };
const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const STATIC_CATEGORIES = ['modern', 'traditional', 'nature', 'religious', 'classical', 'unique'];
const STATIC_ORIGINS = ['arabic', 'persian', 'turkish', 'indian', 'english', 'other'];
const STATIC_ROUTES = [
  '/', '/names', '/search', '/blog', '/about', '/privacy', '/terms', '/languages',
  '/popularity', '/name-meanings', '/names-by-meaning', '/unique-names',
  '/trending-names', '/advanced-search', '/my-names', '/popular-by-state',
  '/viral-names', '/guides/expert-naming-guide', '/top-islamic-names',
  '/top-christian-names', '/top-hindu-names', '/popular-baby-names',
  '/names-by-origin', '/names-by-letter'
];
const MAX_SITEMAP_URLS = 45000;
const API_BASE = (process.env.NEXT_PUBLIC_API_BASE || 'https://name-meaning-site-backend.vercel.app').replace(/\/+$/, '');

function readJson(file, fallback) {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch {
    return fallback;
  }
}

function writeJson(file, data) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`);
}

function lastmodFor(file) {
  try {
    return new Date(fs.statSync(file).mtimeMs).toISOString().split('T')[0];
  } catch {
    return today;
  }
}

function cleanText(value = '') {
  return String(value || '').replace(/\s+/g, ' ').trim();
}

function createSlug(input = '') {
  return cleanText(input)
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9\s-]/g, '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function normalizeReligion(value) {
  const r = cleanText(value).toLowerCase();
  if (['islam', 'muslim', 'islamic'].includes(r)) return 'islamic';
  if (['christianity', 'christian'].includes(r)) return 'christian';
  if (['hinduism', 'hindu'].includes(r)) return 'hindu';
  return RELIGIONS.includes(r) ? r : null;
}

function normalizeOrigin(value) {
  const raw = cleanText(value).toLowerCase();
  if (!raw) return 'other';
  const exact = STATIC_ORIGINS.find((origin) => origin === raw);
  if (exact) return exact;
  if (raw.includes('arabic')) return 'arabic';
  if (raw.includes('persian') || raw.includes('farsi')) return 'persian';
  if (raw.includes('turkish') || raw.includes('ottoman')) return 'turkish';
  if (raw.includes('sanskrit') || raw.includes('vedic') || raw.includes('hindi') || raw.includes('indian')) return 'indian';
  if (raw.includes('hebrew') || raw.includes('greek') || raw.includes('latin') || raw.includes('english')) return 'english';
  return 'other';
}

function normalizeName(item, religion) {
  if (typeof item === 'string') return { name: item, religion, origin: 'Unknown', short_meaning: '', slug: createSlug(item) };
  const name = cleanText(item.name || item.title);
  if (!name) return null;
  const slug = cleanText(item.slug) || createSlug(name);
  if (!slug) return null;
  return {
    name,
    slug,
    religion: normalizeReligion(item.religion) || religion,
    origin: cleanText(item.origin || item.origins || 'Unknown'),
    gender: cleanText(item.gender || item.sex || ''),
    short_meaning: cleanText(item.short_meaning || item.meaning || item.meaning_summary || ''),
    meaning: cleanText(item.meaning || item.long_meaning || item.short_meaning || ''),
    lucky_number: item.lucky_number ?? item.luckyNumber,
    updated_at: item.updated_at || item.lastUpdated || item.last_modified,
  };
}

export function loadDetailedNames() {
  const files = [
    ['islamic', 'islamic-boy-names.json'],
    ['islamic', 'islamic-girl-names.json'],
    ['christian', 'christian-boy-names.json'],
    ['christian', 'christian-girl-names.json'],
    ['hindu', 'hindu-boy-names.json'],
    ['hindu', 'hindu-girl-names.json'],
  ];
  const names = [];
  const seen = new Set();
  for (const [religion, file] of files) {
    const raw = readJson(path.join(dataDir, file), []);
    for (const item of raw) {
      const normalized = normalizeName(item, religion);
      if (!normalized) continue;
      const key = `${normalized.religion}|${normalized.slug}`;
      if (!seen.has(key)) {
        seen.add(key);
        names.push(normalized);
      }
    }
  }
  return names;
}

export function loadMixedNames() {
  const files = [
    ['islamic', 'islamic_names.json'],
    ['christian', 'christians_names.json'],
    ['hindu', 'hindu_names.json'],
  ];
  const names = [];
  const seen = new Set();
  for (const [religion, file] of files) {
    const raw = readJson(path.join(publicDir, file), []);
    for (const item of raw) {
      const normalized = normalizeName(item, religion);
      if (!normalized) continue;
      const key = `${normalized.religion}|${normalized.slug}`;
      if (!seen.has(key)) {
        seen.add(key);
        names.push(normalized);
      }
    }
  }
  return names;
}

export const loadAllNames = loadMixedNames;

export function loadBlogPosts() {
  return readJson(path.join(dataDir, 'blog-posts.json'), [])
    .filter((post) => post.id && post.title)
    .map((post) => ({ ...post, slug: post.id }));
}

function getEntry(pathname, type, lastmod = today, changefreq = 'weekly', priority = 0.7) {
  return {
    loc: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://nameverse.vercel.app'}${pathname}`,
    lastmod,
    changefreq,
    priority,
    type,
    path: pathname,
  };
}

function addEntry(entries, seen, pathname, type, lastmod, changefreq, priority) {
  const clean = `/${String(pathname || '').replace(/^\/+/, '').replace(/\/+$/, '')}`;
  if (!clean || clean === '/') return;
  if (seen.has(clean)) return;
  seen.add(clean);
  entries.push(getEntry(clean, type, lastmod, changefreq, priority));
}

function splitMeaning(value) {
  return cleanText(value)
    .split(/[,;·|]/)
    .map((part) => cleanText(part).replace(/^(and|or)\s+/i, '').replace(/[.]+$/, ''))
    .filter(Boolean)
    .slice(0, 4);
}

function buildMeaningContent(names) {
  const map = new Map();
  for (const name of names) {
    const meaning = cleanText(name.short_meaning || name.meaning);
    if (!meaning || meaning.length < 3) continue;
    for (const part of splitMeaning(meaning)) {
      if (part.length < 3 || part.length > 80) continue;
      const slug = createSlug(part);
      if (!slug) continue;
      if (!map.has(slug)) {
        map.set(slug, {
          slug,
          title: part.charAt(0).toUpperCase() + part.slice(1),
          description: '',
          faq: [],
          relatedMeanings: [],
          seo: { title: '', description: '' },
          schema: {},
          names: [],
        });
      }
      map.get(slug).names.push(name);
    }
  }
  const allSlugs = Array.from(map.keys());
  return Array.from(map.values())
    .map((meaning) => {
      const relatedMeanings = allSlugs
        .filter((slug) => slug !== meaning.slug)
        .slice(0, 8);
      const nameCount = meaning.names.length;
      const religions = RELIGIONS
        .map((religion) => ({ religion, count: meaning.names.filter((name) => name.religion === religion).length }))
        .filter((item) => item.count > 0);
      const topNames = meaning.names.slice(0, 12).map((name) => ({
        name: name.name,
        slug: name.slug,
        religion: name.religion,
        origin: name.origin,
        meaning: name.short_meaning || name.meaning,
      }));
      meaning.description = `${meaning.title} is a meaningful name theme found across ${nameCount} NameVerse entries, with ${religions.map((item) => `${item.religion} (${item.count})`).join(', ')}.`;
      meaning.faq = [
        { question: `What names mean ${meaning.title.toLowerCase()}?`, answer: `NameVerse lists ${nameCount} names with meanings related to ${meaning.title.toLowerCase()}, including ${topNames.slice(0, 3).map((name) => name.name).join(', ')}.` },
        { question: `Which religions use names that mean ${meaning.title.toLowerCase()}?`, answer: `These names appear across ${religions.map((item) => item.religion).join(', ')} collections on NameVerse.` },
        { question: `How do I choose a name that means ${meaning.title.toLowerCase()}?`, answer: `Compare pronunciation, origin, religion, gender, and cultural context before choosing a name from this meaning collection.` },
      ];
      meaning.seo = {
        title: `Names That Mean ${meaning.title} | NameVerse`,
        description: `Explore ${nameCount} names that mean ${meaning.title.toLowerCase()} across Islamic, Christian, and Hindu traditions. Browse meanings, origins, religion breakdowns, FAQs, and related meaning pages.`,
      };
      meaning.schema = { relatedMeanings, topNames, religions, nameCount };
      return { ...meaning, names: undefined, relatedMeanings };
    })
    .sort((a, b) => b.schema.nameCount - a.schema.nameCount);
}

async function fetchJson(url) {
  const response = await fetch(url, { headers: { accept: 'application/json' } });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
}

async function fetchFilters(religion) {
  try {
    const data = await fetchJson(`${API_BASE}/api/v1/names/${religion}/filters`);
    const filters = data.data || {};
    return {
      totalNames: Number(filters.total_names || data.totalNames || 0),
      origins: (filters.origins || []).map((origin) => normalizeOrigin(origin)),
      categories: (filters.categories || []).map((category) => createSlug(category)).filter(Boolean),
      letters: (filters.letters || []).map((letter) => String(letter).slice(0, 1).toUpperCase()).filter((letter) => /^[A-Z]$/.test(letter)),
    };
  } catch {
    return null;
  }
}

async function fetchCollectionPages(religion, params) {
  try {
    const query = new URLSearchParams({ page: '1', limit: '1', sort: 'asc', ...params });
    const data = await fetchJson(`${API_BASE}/api/v1/names/${religion}?${query.toString()}`);
    const pagination = data.pagination || {};
    const total = Number(pagination.total || data.totalCount || data.total || 0);
    const pages = Number(pagination.pages || data.totalPages || Math.ceil(total / 50) || (total > 0 ? 1 : 0));
    return Math.max(0, Math.min(pages, Number(process.env.SEO_MAX_PAGES_PER_COLLECTION || 1000)));
  } catch {
    return 0;
  }
}

function localCounts(allNames, detailedNames) {
  const counts = {};
  for (const religion of RELIGIONS) {
    const religionNames = allNames.filter((name) => name.religion === religion);
    const religionDetailed = detailedNames.filter((name) => name.religion === religion);
    const letters = {};
    const origins = {};
    for (const name of religionNames) {
      const first = (name.name || '').charAt(0).toUpperCase();
      if (/^[A-Z]$/.test(first)) letters[first] = (letters[first] || 0) + 1;
      origins[normalizeOrigin(name.origin)] = (origins[normalizeOrigin(name.origin)] || 0) + 1;
    }
    counts[religion] = {
      total: religionNames.length,
      letters,
      origins: Object.fromEntries(Object.entries(origins).map(([origin, count]) => [origin, { count, pages: Math.max(1, Math.ceil(count / 50)) }])),
      categories: Object.fromEntries(STATIC_CATEGORIES.map((category) => [category, { count: Math.max(1, Math.floor(religionNames.length / STATIC_CATEGORIES.length)), pages: 1 }])),
    };
    counts[religion].detailedCount = religionDetailed.length;
  }
  return counts;
}

export async function buildSitemapEntries() {
  const detailedNames = loadDetailedNames();
  const allNames = loadMixedNames();
  const posts = loadBlogPosts();
  const counts = localCounts(allNames, detailedNames);
  const entries = [];
  const seen = new Set();

  for (const route of STATIC_ROUTES) addEntry(entries, seen, route, 'page', today, 'weekly', 0.8);
  for (const religion of RELIGIONS) {
    addEntry(entries, seen, `/religions/${religion}`, 'religion', today, 'weekly', 0.9);
    addEntry(entries, seen, `/${religion}/boy-names`, 'gender', today, 'weekly', 0.8);
    addEntry(entries, seen, `/${religion}/girl-names`, 'gender', today, 'weekly', 0.8);
  }

  for (const name of allNames) addEntry(entries, seen, `/names/${name.religion}/${name.slug}`, 'name', today, 'weekly', 0.8);

  const meaningContent = buildMeaningContent(detailedNames);
  for (const meaning of meaningContent) addEntry(entries, seen, `/meaning/${meaning.slug}`, 'meaning', today, 'weekly', 0.9);

  for (const post of posts) {
    addEntry(entries, seen, `/blog/${post.slug}`, 'blog', post.lastUpdated || post.publishDate || today, 'weekly', 0.8);
    addEntry(entries, seen, `/stories/${post.slug}`, 'story', post.lastUpdated || post.publishDate || today, 'weekly', 0.7);
  }

  for (const religion of RELIGIONS) {
    const filters = await fetchFilters(religion).catch(() => null);
    const religionCounts = counts[religion] || {};
    const total = filters?.totalNames || religionCounts.total || 0;
    const popularityPages = filters?.totalNames ? Math.min(Math.ceil(total / 50), Number(process.env.SEO_MAX_PAGES_PER_COLLECTION || 1000)) : Math.max(1, Math.ceil((religionCounts.total || 0) / 50));
    for (let page = 1; page <= popularityPages; page += 1) addEntry(entries, seen, `/names/religion/${religion}/${page}`, 'popularity', today, 'weekly', page === 1 ? 0.9 : 0.5);

    const letters = filters?.letters?.length ? filters.letters : LETTERS;
    for (const letter of letters) {
      const letterCount = religionCounts.letters?.[letter] || 0;
      const pages = filters ? await fetchCollectionPages(religion, { alphabet: letter.toLowerCase() }) : Math.max(1, Math.ceil(letterCount / 50));
      const safePages = Math.max(1, Math.min(pages || 1, Number(process.env.SEO_MAX_PAGES_PER_COLLECTION || 1000)));
      for (let page = 1; page <= safePages; page += 1) addEntry(entries, seen, `/names/${religion}/letter/${letter}/${page}`, 'letter', today, 'weekly', page === 1 ? 0.8 : 0.5);
    }

    const origins = filters?.origins?.length ? Array.from(new Set(filters.origins)) : Object.keys(religionCounts.origins || {});
    for (const origin of origins) {
      const pages = filters ? await fetchCollectionPages(religion, { origin }) : (religionCounts.origins?.[origin]?.pages || 1);
      const safePages = Math.max(1, Math.min(pages || 1, Number(process.env.SEO_MAX_PAGES_PER_COLLECTION || 1000)));
      for (let page = 1; page <= safePages; page += 1) addEntry(entries, seen, `/names/${religion}/origin/${origin}/${page}`, 'origin', today, 'weekly', page === 1 ? 0.8 : 0.5);
    }

    const categories = filters?.categories?.length ? Array.from(new Set(filters.categories.map((category) => createSlug(category)).filter(Boolean))) : STATIC_CATEGORIES;
    for (const category of categories) {
      const pages = filters ? await fetchCollectionPages(religion, { category }) : (religionCounts.categories?.[category]?.pages || 1);
      const safePages = Math.max(1, Math.min(pages || 1, Number(process.env.SEO_MAX_PAGES_PER_COLLECTION || 1000)));
      for (let page = 1; page <= safePages; page += 1) addEntry(entries, seen, `/names/${religion}/categories/${category}/${page}`, 'category', today, 'weekly', page === 1 ? 0.8 : 0.5);
    }
  }

  return { entries, allNames, detailedNames, posts, meaningContent, counts };
}

export function groupEntries(entries) {
  const groups = { pages: [], names: [], blog: [], story: [], meaning: [], religion: [], gender: [], popularity: [], letter: [], origin: [], category: [] };
  for (const entry of entries) {
    if (groups[entry.type]) groups[entry.type].push(entry);
    else groups.pages.push(entry);
  }
  return groups;
}

function chunk(list, size) {
  const chunks = [];
  for (let i = 0; i < list.length; i += size) chunks.push(list.slice(i, i + size));
  return chunks.length ? chunks : [list];
}

function sitemapXml(urls) {
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map((url) => `\n  <url>\n    <loc>${url.loc}</loc>\n    <lastmod>${url.lastmod}</lastmod>\n    <changefreq>${url.changefreq}</changefreq>\n    <priority>${url.priority}</priority>\n  </url>`).join('')}\n</urlset>\n`;
}

function indexXml(locs) {
  return `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${locs.map((loc) => `\n  <sitemap>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n  </sitemap>`).join('')}\n</sitemapindex>\n`;
}

export async function writeSitemapFiles() {
  const { entries } = await buildSitemapEntries();
  const groups = groupEntries(entries);
  const sitemapLocs = [];
  const writeGroup = async (name, items) => {
    const chunksOfItems = chunk(items, MAX_SITEMAP_URLS);
    for (let i = 0; i < chunksOfItems.length; i += 1) {
      const file = chunksOfItems.length === 1 ? `sitemap-${name}.xml` : `sitemap-${name}-${i + 1}.xml`;
      writeJson(path.join(publicDir, file), sitemapXml(chunksOfItems[i]));
      sitemapLocs.push(`${process.env.NEXT_PUBLIC_SITE_URL || 'https://nameverse.vercel.app'}/${file}`);
    }
  };
  for (const [name, items] of Object.entries(groups)) if (items.length) await writeGroup(name, items);
  const useIndex = entries.length > MAX_SITEMAP_URLS || sitemapLocs.length > 1;
  writeJson(path.join(publicDir, 'sitemap.xml'), useIndex ? indexXml(sitemapLocs) : sitemapXml(entries));
  writeJson(path.join(publicDir, 'seo-sitemap-manifest.json'), { generatedAt: new Date().toISOString(), totalUrls: entries.length, sitemapCount: sitemapLocs.length, sitemaps: sitemapLocs });
  return { totalUrls: entries.length, sitemapCount: sitemapLocs.length, sitemaps: sitemapLocs };
}

export function parseSitemapUrls(xml) {
  return Array.from(xml.matchAll(/<loc>(.*?)<\/loc>/g)).map((match) => match[1]);
}

export function buildExpectedUrls() {
  const detailedNames = loadDetailedNames();
  const allNames = loadMixedNames();
  const posts = loadBlogPosts();
  const meanings = buildMeaningContent(detailedNames);
  const urls = new Set(STATIC_ROUTES);
  for (const religion of RELIGIONS) {
    urls.add(`/religions/${religion}`);
    urls.add(`/${religion}/boy-names`);
    urls.add(`/${religion}/girl-names`);
  }
  for (const name of allNames) urls.add(`/names/${name.religion}/${name.slug}`);
  for (const meaning of meanings) urls.add(`/meaning/${meaning.slug}`);
  for (const post of posts) {
    urls.add(`/blog/${post.slug}`);
    urls.add(`/stories/${post.slug}`);
  }
  return Array.from(urls).sort();
}
