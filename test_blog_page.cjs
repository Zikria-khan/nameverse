// Quick test: verify blog post data structure doesn't crash
const blogPostsData = require('./public/data/blog-posts.json').default || require('./public/data/blog-posts.json');

const slug = 'best-baby-names-2026';
const post = blogPostsData.find(p => p.id === slug);

if (!post) {
  console.log('POST NOT FOUND');
  process.exit(1);
}

console.log('post.id:', post.id);
console.log('post.title type:', typeof post.title, post.title?.slice(0, 80));
console.log('post.category:', post.category);
console.log('post.author:', post.author);
console.log('post.featuredImage type:', typeof post.featuredImage, post.featuredImage?.slice(0, 60));
console.log('post.publishDate:', post.publishDate);
console.log('post.readTime:', post.readTime);

console.log('');
console.log('content.introduction type:', typeof post.content.introduction);
console.log('content.sections count:', post.content.sections?.length);
post.content.sections?.forEach((s, i) => {
  console.log(`  section[${i}]:`, typeof s.title, s.title?.slice(0, 50), `| featuredNames:`, Array.isArray(s.featuredNames) ? s.featuredNames.length : typeof s.featuredNames, `| subsections:`, Array.isArray(s.subsections) ? s.subsections.length : typeof s.subsections);
});

console.log('');
console.log('content.faqs:', Array.isArray(post.content.faqs) ? post.content.faqs.length + ' items' : typeof post.content.faqs);
console.log('content.relatedNames:', Array.isArray(post.content.relatedNames) ? post.content.relatedNames.length + ' items' : typeof post.content.relatedNames);
console.log('post.tags:', post.tags?.length || 0);

console.log('');
// Check for object-as-child candidates
function findObjAsChild(obj, path = '') {
  for (const [k, v] of Object.entries(obj || {})) {
    if (v && typeof v === 'object' && !Array.isArray(v)) {
      if ('name' in v && 'profession' in v && 'country' in v) {
        console.log(`FOUND BUG at ${path}.${k}:`, JSON.stringify(v));
      }
      findObjAsChild(v, `${path}.${k}`);
    }
  }
}
findObjAsChild(post, 'post');
console.log('NO object-as-child bugs found in blog post data');

// Verify getSiteUrl
const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://nameverse.vercel.app').replace(/\/$/, '');
console.log('siteUrl:', SITE_URL);
