#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const PUBLIC = path.join(process.cwd(), 'public');
const DATA = path.join(PUBLIC, 'data');
const SRC = path.join(process.cwd(), 'src');

const URL_REGEX = /^[a-z0-9-]+$/;
const errors = [];
const warnings = [];

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

function checkBlogPosts() {
  const blogFile = path.join(DATA, 'blog-posts.json');
  if (!fs.existsSync(blogFile)) {
    warnings.push('blog-posts.json not found, skipping');
    return;
  }

  const posts = JSON.parse(fs.readFileSync(blogFile, 'utf8'));
  const slugs = new Set();

  posts.forEach((post, idx) => {
    const slug = createSafeSlug(post.id);
    if (!validateSlug(slug, 'blog-posts.json[' + idx + '].id')) return;
    if (slugs.has(slug)) {
      errors.push('Duplicate blog slug in blog-posts.json: "' + slug + '"');
    }
    slugs.add(slug);
  });
}

function checkSitemapXml() {
  const sitemapFile = path.join(PUBLIC, 'sitemap.xml');
  if (!fs.existsSync(sitemapFile)) {
    warnings.push('sitemap.xml not found, skipping');
    return;
  }

  const sitemap = fs.readFileSync(sitemapFile, 'utf8');
  const urlRegex = /https:\/\/nameverse\.com\/([^<]+)/g;
  let match;

  while ((match = urlRegex.exec(sitemap)) !== null) {
    const pathPart = match[1];
    if (pathPart.startsWith('blog/') || pathPart.startsWith('names/')) {
      const slug = pathPart.split('/').pop();
      if (!validateSlug(slug, 'sitemap.xml path: ' + pathPart)) {
        errors.push('Invalid sitemap URL slug in: "' + pathPart + '"');
      }
    }
  }
}

function checkCodebaseUrls() {
  function walkDir(dir, callback) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
      const filePath = path.join(dir, file);
      if (fs.statSync(filePath).isDirectory()) {
        walkDir(filePath, callback);
      } else if (/\.(js|jsx|ts|tsx)$/.test(file)) {
        callback(filePath);
      }
    });
  }

  walkDir(SRC, (filePath) => {
    const content = fs.readFileSync(filePath, 'utf8');
    const relativePath = path.relative(process.cwd(), filePath);
    
    // Only check for URL path issues (not search/filter operations)
    // Pattern: .toLowerCase() inside href template literal for /names/ paths
    const urlLowercasePattern = /href=`\/names\/[^$]*\$\{[^}]*\.name[^}]*\.toLowerCase/g;
    
    if (urlLowercasePattern.test(content)) {
      errors.push('Unsafe .name.toLowerCase() in URL href in ' + relativePath);
    }
  });
}

function checkBlogScripts() {
  const scriptsDir = process.cwd();
  const blogScripts = ['add-blog-posts.js', 'build-blogs.js', 'gen-blogs-v2.mjs'];

  blogScripts.forEach(script => {
    const scriptPath = path.join(scriptsDir, script);
    if (!fs.existsSync(scriptPath)) return;

    const content = fs.readFileSync(scriptPath, 'utf8');
    const hardcodedSlugRegex = /(?:id|slug):\s*['"`]([a-zA-Z0-9-]+)['"`]/g;
    let match;

    while ((match = hardcodedSlugRegex.exec(content)) !== null) {
      const slug = match[1];
      if (!validateSlug(slug, script + ' hardcoded slug "' + slug + '"')) {
        errors.push('Invalid hardcoded slug in ' + script + ': "' + slug + '"');
      }
    }
  });
}

function main() {
  console.log('🔍 CI: Validating all slugs and URLs...\n');

  checkBlogPosts();
  checkSitemapXml();
  checkCodebaseUrls();
  checkBlogScripts();

  if (errors.length > 0) {
    console.log('❌ ERRORS:');
    errors.forEach(e => console.log('  - ' + e));
  }

  if (warnings.length > 0) {
    console.log('\n⚠️  WARNINGS:');
    warnings.forEach(w => console.log('  - ' + w));
  }

  if (errors.length === 0 && warnings.length === 0) {
    console.log('✅ All slugs and URLs are valid!');
    process.exit(0);
  } else {
    console.log('\n' + errors.length + ' error(s), ' + warnings.length + ' warning(s) found.');
    process.exit(errors.length > 0 ? 1 : 0);
  }
}

main();