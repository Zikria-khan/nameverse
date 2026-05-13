const fs = require('fs');

const posts = JSON.parse(fs.readFileSync('public/data/blog-posts.json', 'utf8'));

// Remove duplicates by id — keep last occurrence
const seen = new Map();
posts.forEach(p => seen.set(p.id, p));
const uniquePosts = [...seen.values()];

console.log('Total before dedup:', posts.length, 'After:', uniquePosts.length);

const imageMap = {
  'ultimate-guide-islamic-names': 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=1200&h=630&fit=crop&auto=format&q=80',
  'christian-biblical-names-guide': 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1200&h=630&fit=crop&auto=format&q=80',
  'hindu-vedic-naming-guide': 'https://images.unsplash.com/photo-1587135941948-670b381f08ce?w=1200&h=630&fit=crop&auto=format&q=80',
  'baby-name-trends-2026': 'https://images.unsplash.com/photo-1544568100-847a948585b9?w=1200&h=630&fit=crop&auto=format&q=80',
  'how-to-choose-baby-name': 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=1200&h=630&fit=crop&auto=format&q=80',
  'unique-rare-baby-names': 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&h=630&fit=crop&auto=format&q=80',
  'nature-inspired-baby-names': 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&h=630&fit=crop&auto=format&q=80',
  'vintage-baby-names-comeback': 'https://images.unsplash.com/photo-1520637836862-4d197d17c15a?w=1200&h=630&fit=crop&auto=format&q=80',
  'gender-neutral-baby-names': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=630&fit=crop&auto=format&q=80',
  'baby-name-numerology-guide': 'https://images.unsplash.com/photo-1518152006812-edab29b069ac?w=1200&h=630&fit=crop&auto=format&q=80',
  'sibling-name-combinations': 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=1200&h=630&fit=crop&auto=format&q=80',
  'best-baby-names-2026': 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=1200&h=630&fit=crop&auto=format&q=80',
  'baby-names-start-with-a': 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200&h=630&fit=crop&auto=format&q=80',
  'baby-names-by-zodiac-sign': 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=1200&h=630&fit=crop&auto=format&q=80',
  'celebrity-baby-names-2026': 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=1200&h=630&fit=crop&auto=format&q=80',
  'why-islamic-names-popular-2026': 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=1200&h=630&fit=crop&auto=format&q=80',
  'hindu-nature-element-names': 'https://images.unsplash.com/photo-1517849845537-4d257902454a?w=1200&h=630&fit=crop&auto=format&q=80',
  'baby-name-shape-personality': 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=1200&h=630&fit=crop&auto=format&q=80',
  'reasons-biblical-names-2026': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=630&fit=crop&auto=format&q=80',
  'islamic-names-light-hope': 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=1200&h=630&fit=crop&auto=format&q=80',
  'psychology-baby-name-regret': 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=1200&h=630&fit=crop&auto=format&q=80',
  'christian-warrior-names': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=630&fit=crop&auto=format&q=80',
  'hindu-moon-stars': 'https://images.unsplash.com/photo-1517849845537-4d257902454a?w=1200&h=630&fit=crop&auto=format&q=80',
  'islamic-prophetic-comeback': 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=1200&h=630&fit=crop&auto=format&q=80',
  'honor-cultural-heritage': 'https://images.unsplash.com/photo-1528164344705-47542687000d?w=1200&h=630&fit=crop&auto=format&q=80',
  'mispronounced-names-2026': 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=1200&h=630&fit=crop&auto=format&q=80',
  'sanskrit-names-revival': 'https://images.unsplash.com/photo-1517849845537-4d257902454a?w=1200&h=630&fit=crop&auto=format&q=80',
  'secret-name-grows-child': 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=1200&h=630&fit=crop&auto=format&q=80',
  'islamic-girl-names-2026': 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=1200&h=630&fit=crop&auto=format&q=80',
  'christian-saint-names': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=630&fit=crop&auto=format&q=80',
  'baby-numerology-2026': 'https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?w=1200&h=630&fit=crop&auto=format&q=80',
  'winter-baby-names': 'https://images.unsplash.com/photo-1518895496757-32b11564e7f1?w=1200&h=630&fit=crop&auto=format&q=80',
  'arabic-powerful-meanings': 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=1200&h=630&fit=crop&auto=format&q=80',
  'indian-hindu-meanings': 'https://images.unsplash.com/photo-1517849845537-4d257902454a?w=1200&h=630&fit=crop&auto=format&q=80',
  'celebrity-inspired-names': 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&h=630&fit=crop&auto=format&q=80',
  'names-meaning-strong': 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=1200&h=630&fit=crop&auto=format&q=80',
  'islamic-boy-names-guide': 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=1200&h=630&fit=crop&auto=format&q=80',
  'sibling-name-harmony': 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=1200&h=630&fit=crop&auto=format&q=80',
  'unisex-cross-cultural': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=630&fit=crop&auto=format&q=80',
  'names-meaning-flower': 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&h=630&fit=crop&auto=format&q=80',
  'bible-names-trending-2026': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=630&fit=crop&auto=format&q=80',
  'lucky-colors-names': 'https://images.unsplash.com/photo-1518152006812-edab29b069ac?w=1200&h=630&fit=crop&auto=format&q=80',
  'powerful-hindu-names': 'https://images.unsplash.com/photo-1587135941948-670b381f08ce?w=1200&h=630&fit=crop&auto=format&q=80',
  'islamic-names-usa-uk': 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=1200&h=630&fit=crop&auto=format&q=80',
  'parenting-naming-mistakes': 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=1200&h=630&fit=crop&auto=format&q=80',
  'ancient-mesopotamian-names': 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=1200&h=630&fit=crop&auto=format&q=80',
  'names-meaning-love-peace': 'https://images.unsplash.com/photo-1544568100-847a948585b9?w=1200&h=630&fit=crop&auto=format&q=80',
  'rising-names-2026': 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=630&fit=crop&auto=format&q=80',
  'christian-girl-names-bible': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=630&fit=crop&auto=format&q=80',
  'vishnu-lakshmi-ganesha': 'https://images.unsplash.com/photo-1587135941948-670b381f08ce?w=1200&h=630&fit=crop&auto=format&q=80',
  'trends-predictions-2026-2030': 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=630&fit=crop&auto=format&q=80',
  'holy-quran-names-with-tafseer': 'https://images.unsplash.com/photo-1611689342806-0863700ce1f0?w=1200&h=630&fit=crop&auto=format&q=80',
  'unique-rare-names-2026': 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&h=630&fit=crop&auto=format&q=80',
  'holy-quran-names': 'https://images.unsplash.com/photo-1611689342806-0863700ce1f0?w=1200&h=630&fit=crop&auto=format&q=80',
};

// Category fallbacks
const fallbackByCategory = {
  'Islamic Names': 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=1200&h=630&fit=crop&auto=format&q=80',
  'Christian Names': 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1200&h=630&fit=crop&auto=format&q=80',
  'Hindu Names': 'https://images.unsplash.com/photo-1587135941948-670b381f08ce?w=1200&h=630&fit=crop&auto=format&q=80',
  'Trends': 'https://images.unsplash.com/photo-1544568100-847a948585b9?w=1200&h=630&fit=crop&auto=format&q=80',
  'Unique': 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&h=630&fit=crop&auto=format&q=80',
};

// Apply fixes
let fixedCount = 0;
let missingOgCount = 0;

const fixedPosts = uniquePosts.map(post => {
  // Use specific image if mapped
  if (imageMap[post.id]) {
    post.featuredImage = imageMap[post.id];
    fixedCount++;
  } else if (fallbackByCategory[post.category]) {
    post.featuredImage = fallbackByCategory[post.category];
    fixedCount++;
  } else {
    // Fallback to Names image
    post.featuredImage = 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200&h=630&fit=crop&auto=format&q=80';
    fixedCount++;
  }

  // Add ogImage if missing
  if (!post.ogImage) {
    post.ogImage = post.featuredImage;
    missingOgCount++;
  }

  return post;
});

// Sort by publishDate descending
fixedPosts.sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));

fs.writeFileSync('public/data/blog-posts.json', JSON.stringify(fixedPosts, null, 2));

console.log('✅ Total unique blog posts:', fixedPosts.length);
console.log('✅ Images fixed:', fixedCount);
console.log('✅ ogImage added for:', missingOgCount, 'posts');

// Verify no fake URLs
const content = fs.readFileSync('public/data/blog-posts.json', 'utf8');
const fakePattern = /photo-15\d{8,}/g;
const fakeMatches = content.match(fakePattern);
if (fakeMatches) {
  console.log('❌ FAKE URLs still found:', fakeMatches.length);
} else {
  console.log('✅ No fake URLs remain');
}