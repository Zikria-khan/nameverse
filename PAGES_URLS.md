# NameVerse Page URLs

This file lists all page routes found in the current `src/app` code and what each page contains.

## Static pages

- `/`
  - Home page
  - Contains the main landing experience, name categories, featured search, trending names, and quick navigation to religion-specific name lists.

- `/about`
  - About page
  - Contains biography and professional details for Zakriya Khan, consultations, expertise, and contact links.

- `/privacy`
  - Privacy Policy page
  - Contains the privacy policy text, data collection details, cookie usage, and user privacy rights.

- `/terms`
  - Terms of Service page
  - Contains terms and conditions, allowed use, disclaimers, limitations, and contact information.

- `/blog`
  - Blog / articles landing page
  - Contains featured blog posts, recent articles, and links to individual blog posts.

- `/guides/expert-naming-guide`
  - Expert naming guide page
  - Contains a full guide for choosing baby names, naming tradition tips, and religion-specific naming advice.

- `/search`
  - Search landing page
  - Contains the search UI and search component for entering queries.

- `/christian/boy-names`
  - Christian boy names collection page
  - Contains a list of Christian boy names, meanings, origins, and related structured data.

- `/christian/girl-names`
  - Christian girl names collection page
  - Contains a list of Christian girl names, meanings, origins, and related structured data.

- `/hindu/boy-names`
  - Hindu boy names collection page
  - Contains a list of Hindu boy names, meanings, origins, and related structured data.

- `/hindu/girl-names`
  - Hindu girl names collection page
  - Contains a list of Hindu girl names, meanings, origins, and related structured data.

- `/islamic/boy-names`
  - Islamic boy names collection page
  - Contains a list of Islamic boy names, meanings, origins, and related structured data.

- `/islamic/girl-names`
  - Islamic girl names collection page
  - Contains a list of Islamic girl names, meanings, origins, and related structured data.

## Dynamic pages

- `/blog/[slug]`
  - Blog post detail page
  - Displays a specific blog/article from `public/data/blog-posts.json`, using the `slug` as the post id.

- `/guides/[slug]`
  - Guide detail page
  - Displays a specific guide or article from `public/data/blog-posts.json`, using the `slug` as the post id.

- `/search/[term]`
  - Search results page
  - Displays search results for the provided search term, including names matching the query.

- `/names/[religion]/[slug]`
  - Name detail page
  - Displays detailed information for a single name, loaded from the API by religion and name slug.
  - `[religion]` can be `islamic`, `christian`, or `hindu`.

- `/names/[religion]/origin/[origin]/[page]`
  - Origin-filtered names list page
  - Shows names filtered by religion and origin, with pagination.
  - Example: `/names/islamic/origin/arabic/1`

- `/names/[religion]/letter/[letter]/[page]`
  - Letter-filtered names list page
  - Shows names starting with a specific letter and page number.
  - Example: `/names/hindu/letter/A/1`

- `/names/[religion]/categories/[category]/[page]`
  - Category-filtered names list page
  - Shows names in a category with pagination.
  - Example: `/names/christian/categories/traditional/1`

- `/names/religion/[religion]/[page]`
  - Religion-filtered name collection page
  - Shows paginated names for a full religion listing.
  - Example: `/names/religion/islamic/1`

## Notes

- The code now includes a matching page file for `/names/religion/[religion]/[page]`.
- Dynamic route values are generally normalized to lowercase and must be valid religion categories: `islamic`, `christian`, or `hindu`.

## Non-page routes

- `/sitemap.xml`
  - Served by `src/app/sitemap.xml/route.js`.

- `/feed.xml`
  - Served by `src/app/feed.xml/route.js`.
