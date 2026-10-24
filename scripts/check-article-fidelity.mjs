import { readFileSync } from 'node:fs';

const extract = readFileSync(new URL('../_article_extract.txt', import.meta.url), 'utf8');
const source = [
  readFileSync(new URL('../src/articles/seoArticles.ts', import.meta.url), 'utf8'),
  readFileSync(new URL('../src/pages/SeoArticlePage.tsx', import.meta.url), 'utf8'),
].join('\n');

const lines = extract
  .split('\n')
  .map((line) => line.replace(/^\[[^\]]*\]\s?/, '').trim())
  .filter(Boolean);

const start = lines.findIndex((line) => line.startsWith('איך להשיג עוד לידים? תתחילו'));
const published = lines.slice(start).filter((line) => {
  if (line.startsWith('תמונה ')) return false;
  if (line.startsWith('קישורים בסוף')) return false;
  if (line.startsWith('כתובת:') || line.startsWith('Meta ') || line.startsWith('כתבה ')) return false;
  return true;
});

const missing = published.filter((line) => !source.includes(line));
if (missing.length) {
  console.error('Missing article lines:');
  missing.forEach((line) => console.error(`- ${line}`));
  process.exit(1);
}

const alts = [...extract.matchAll(/Alt: ([^\n]+)/g)].map((match) => match[1].trim());
const missingAlts = alts.filter((alt) => !source.includes(alt));
if (missingAlts.length) {
  console.error('Missing alt text:');
  missingAlts.forEach((alt) => console.error(`- ${alt}`));
  process.exit(1);
}

console.log(`Article fidelity OK: ${published.length} source lines and ${alts.length} alt texts found in code.`);
