const fs = require('fs');
const path = require('path');

// Load all name datasets
const islamicNames = new Set(JSON.parse(fs.readFileSync('./public/islamic_names.json', 'utf8')).map(n => n.toLowerCase()));
const hinduNames = new Set(JSON.parse(fs.readFileSync('./public/hindu_names.json', 'utf8')).map(n => n.toLowerCase()));
const christianNames = new Set(JSON.parse(fs.readFileSync('./public/christians_names.json', 'utf8')).map(n => n.toLowerCase()));

// All names combined set
const allNames = new Set([...islamicNames, ...hinduNames, ...christianNames]);

// Load blog posts
const blogPosts = JSON.parse(fs.readFileSync('./public/data/blog-posts.json', 'utf8'));

let totalNamesRemoved = 0;
let totalPostsModified = 0;
let totalNamesKept = 0;

// Process each blog post
const updatedPosts = blogPosts.map(post => {
  let modified = false;

  // Process content.sections[].featuredNames
  if (post.content && post.content.sections) {
    post.content.sections = post.content.sections.map(section => {
      if (section.featuredNames && Array.isArray(section.featuredNames)) {
        const original = [...section.featuredNames];
        // Handle both string names and object names
        section.featuredNames = section.featuredNames.filter(name => {
          const nameStr = typeof name === 'string' ? name : name.name;
          if (!nameStr) return false;
          const normalized = nameStr.toLowerCase().trim();
          const exists = allNames.has(normalized);
          if (!exists) {
            totalNamesRemoved++;
          } else {
            totalNamesKept++;
          }
          return exists;
        });
        if (section.featuredNames.length !== original.length) {
          modified = true;
          console.log(`  [${post.id}] Section "${section.title}": Removed ${original.length - section.featuredNames.length} featuredNames`);
          const removed = original.filter(n => {
            const ns = typeof n === 'string' ? n : n.name;
            return ns && !allNames.has(ns.toLowerCase().trim());
          });
          console.log(`    Removed: ${removed.map(n => typeof n === 'string' ? n : n.name).join(', ')}`);
        }
      }
      return section;
    });
  }

  // Process content.relatedNames
  if (post.content && post.content.relatedNames && Array.isArray(post.content.relatedNames)) {
    const originalRns = [...post.content.relatedNames];
    // Handle both string and object
    post.content.relatedNames = post.content.relatedNames.filter(name => {
      const nameStr = typeof name === 'string' ? name : name.name;
      if (!nameStr) return false;
      const normalized = nameStr.toLowerCase().trim();
      const exists = allNames.has(normalized);
      if (!exists) {
        totalNamesRemoved++;
      } else {
        totalNamesKept++;
      }
      return exists;
    });
    if (post.content.relatedNames.length !== originalRns.length) {
      modified = true;
      console.log(`  [${post.id}] relatedNames: Removed ${originalRns.length - post.content.relatedNames.length}`);
      const removed = originalRns.filter(n => {
        const ns = typeof n === 'string' ? n : n.name;
        return ns && !allNames.has(ns.toLowerCase().trim());
      });
      console.log(`    Removed: ${removed.map(n => typeof n === 'string' ? n : n.name).join(', ')}`);
    }
  }

  if (modified) {
    totalPostsModified++;
    console.log(`  => Modified post: ${post.id}`);
  }

  return post;
});

// Write updated blog posts
fs.writeFileSync('./public/data/blog-posts.json', JSON.stringify(updatedPosts, null, 2), 'utf8');

console.log('\n=== RESULTS ===');
console.log(`Total names kept: ${totalNamesKept}`);
console.log(`Total names removed: ${totalNamesRemoved}`);
console.log(`Total posts modified: ${totalPostsModified}`);
console.log(`Total posts: ${blogPosts.length}`);
console.log('\nDone! Updated blog-posts.json has been written.');