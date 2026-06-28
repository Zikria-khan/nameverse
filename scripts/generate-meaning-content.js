import fs from 'node:fs';
import path from 'node:path';
import { buildMeaningContent } from '../src/lib/seo/sitemap-data.mjs';
import { loadDetailedNames } from '../src/lib/seo/sitemap-data.mjs';

const rootDir = process.cwd();
const publicDataDir = path.join(rootDir, 'public', 'data');
const detailedNames = loadDetailedNames();
const meaningContent = buildMeaningContent(detailedNames);
const outputFile = path.join(publicDataDir, 'meaning-content.json');
fs.mkdirSync(publicDataDir, { recursive: true });
fs.writeFileSync(outputFile, `${JSON.stringify(meaningContent, null, 2)}\n`);
console.log(JSON.stringify({ generated: meaningContent.length, outputFile }, null, 2));
