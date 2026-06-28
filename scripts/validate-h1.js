import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const appDir = path.join(rootDir, 'src', 'app');
const componentDir = path.join(rootDir, 'src', 'components');

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) results.push(...walk(full));
    else if (/\.jsx?$/.test(entry.name)) results.push(full);
  }
  return results;
}

function countH1(text) {
  return (text.match(/<h1\b/gi) || []).length;
}

const pages = walk(appDir).filter((file) => /page\.jsx?$/.test(path.basename(file)));
const reports = pages.map((file) => {
  const text = fs.readFileSync(file, 'utf8');
  const h1Count = countH1(text);
  const importsClient = /ClientComponent|GlobalSearchClient|HomepageClient/.test(text);
  const hasGenerateMetadata = /generateMetadata/.test(text);
  const hasMetadata = /\bmetadata\s*=/.test(text);
  const relative = path.relative(rootDir, file).replaceAll(path.sep, '/');
  return {
    file: relative,
    h1Count,
    hasH1: h1Count === 1,
    missingH1: h1Count === 0 && !importsClient,
    duplicateH1: h1Count > 1,
    hasMetadata: hasMetadata || hasGenerateMetadata,
  };
});

const componentReports = walk(componentDir).filter((file) => /NameHero\.jsx?$/.test(path.basename(file))).map((file) => {
  const text = fs.readFileSync(file, 'utf8');
  return { file: path.relative(rootDir, file).replaceAll(path.sep, '/'), h1Count: countH1(text) };
});

const failures = reports.filter((page) => page.missingH1 || page.duplicateH1);
const report = {
  generatedAt: new Date().toISOString(),
  passed: failures.length === 0,
  pageCount: reports.length,
  failures,
  components: componentReports,
};
fs.writeFileSync(path.join(rootDir, 'seo-h1-validation-report.json'), `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify({ passed: report.passed, pageCount: report.pageCount, failureCount: failures.length }, null, 2));
if (!report.passed) process.exitCode = 1;
