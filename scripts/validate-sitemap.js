const fs = require('fs');
const path = require('path');

const PUBLIC = path.join(process.cwd(), 'public');
const DATA   = path.join(PUBLIC, 'data');

function createSafeSlug(input = "") {
  return String(input || '')
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9\s-]/g, "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

const URL_REGEX = /^[a-z0-9-]+$/;
const errors = [];
const warnings = [];

function validateSlug(slug, context) {
  if (!slug) {
    errors.push('Empty slug in ' + context);
    return false;
  }
  if (!URL_REGEX.test(slug)) {
    errors.push('Invalid slug in ' + context + ': "' + slug + '" does not match ^[a-z0-9-]+$');
    return false;
  }
  return true;
}

function checkBlogSlugs() {
  const blogFile = path.join(DATA, 'blog-posts.json');
  if (!fs.existsSync(blogFile)) return;

  const posts = JSON.parse(fs.readFileSync(blogFile, 'utf8'));
  const slugs = new Set();

  posts.forEach((post, idx) => {
    const slug = createSafeSlug(post.id);
    if (!validateSlug(slug, 'blog-posts.json[' + idx + '].id')) return;
    if (slugs.has(slug)) {
      errors.push('Duplicate blog slug collision: "' + slug + '"');
    }
    slugs.add(slug);
  });
}

function checkSitemapUrls() {
  const sitemapFile = path.join(PUBLIC, 'sitemap.xml');
  if (!fs.existsSync(sitemapFile)) return;

  const sitemap = fs.readFileSync(sitemapFile, 'utf8');
  const blogUrlRegex = /https:\/\/nameverse\.com\/blog\/([^<]+)/g;
  const namesUrlRegex = /https:\/\/nameverse\.com\/names\/([^<]+)/g;

  let match;
  while ((match = blogUrlRegex.exec(sitemap)) !== null) {
    const slug = match[1];
    if (!validateSlug(slug, 'sitemap.xml blog URL')) {
      errors.push('Invalid blog sitemap URL slug: "' + slug + '"');
    }
  }

  while ((match = namesUrlRegex.exec(sitemap)) !== null) {
    const slug = match[1];
    const cleanSlug = slug.includes('/') ? slug.split('/').pop() : slug;
    if (!validateSlug(cleanSlug, 'sitemap.xml names URL')) {
      warnings.push('Check names sitemap URL slug: "' + slug + '"');
    }
  }
}

function checkBlogScripts() {
  const scripts = ['add-blog-posts.js', 'build-blogs.js', 'gen-blogs.mjs', 'gen-blogs-v2.mjs', 'gen-blogs-v3.mjs', 'gen-blogs-final.mjs'];

  scripts.forEach(script => {
    const scriptPath = path.join(process.cwd(), script);
    if (!fs.existsSync(scriptPath)) return;

    const content = fs.readFileSync(scriptPath, 'utf8');
    const hardcodedSlugRegex = /(?:slug|id):\s*['"`]([a-zA-Z0-9-]+)['"`]/g;
    let match;

    while ((match = hardcodedSlugRegex.exec(content)) !== null) {
      const slug = match[1];
      if (!validateSlug(slug, script + ' hardcoded slug "' + slug + '"')) {
        errors.push('Invalid hardcoded slug in ' + script + ': "' + slug + '"');
      }
    }
  });
}

console.log('\uD83D\uDD0D Validating sitemap URLs and slugs...\n');

checkBlogSlugs();
checkSitemapUrls();
checkBlogScripts();

if (errors.length > 0) {
  console.log('\u274C ERRORS:');
  errors.forEach(e => console.log('  - ' + e));
}

if (warnings.length > 0) {
  console.log('\n\u26A0\uFE0F  WARNINGS:');
  warnings.forEach(w => console.log('  - ' + w));
}

if (errors.length === 0 && warnings.length === 0) {
  console.log('\u2705 All slugs and sitemap URLs are valid!');
  process.exit(0);
} else {
  console.log('\n' + errors.length + ' error(s), ' + warnings.length + ' warning(s) found.');
  process.exit(errors.length > 0 ? 1 : 0);
}