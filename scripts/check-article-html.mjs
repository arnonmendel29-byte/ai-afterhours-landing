import { existsSync, readFileSync, readdirSync } from 'node:fs';

for (const path of ['how-to-get-more-leads', 'improve-sales-process']) {
  const html = readFileSync(new URL(`../dist/${path}/index.html`, import.meta.url), 'utf8');
  const match = html.match(
    /<script type="application\/ld\+json" id="kolid-jsonld">([\s\S]*?)<\/script>/,
  );
  const data = JSON.parse(match[1]);
  const types = data['@graph'].map((item) => item['@type']);
  const faq = data['@graph'].find((item) => item['@type'] === 'FAQPage');
  const posting = data['@graph'].find((item) => item['@type'] === 'BlogPosting');
  const title = html.match(/<title>([^<]+)<\/title>/)[1];
  const robots = html.match(/name="robots" content="([^"]+)"/);
  const canonical = html.match(/rel="canonical" href="([^"]+)"/)[1];
  const ogType = html.match(/property="og:type" content="([^"]+)"/)[1];
  const htmlTag = html.match(/<html[^>]*>/)[0];
  const jsonLdCount = html.match(/id="kolid-jsonld"/g).length;
  if (!posting?.headline || !posting.datePublished || !posting.image || faq.mainEntity.length !== 4) {
    throw new Error(`Incomplete schema for ${path}`);
  }
  if (jsonLdCount !== 1) throw new Error(`Duplicate JSON-LD on ${path}`);
  console.log(`${path}: ${types.join(', ')}; faq=${faq.mainEntity.length}`);
  console.log(`  title=${title}`);
  console.log(`  canonical=${canonical}`);
  console.log(`  robots=${robots?.[1] ?? 'missing'}`);
  console.log(`  og=${ogType}; image=${posting.image}`);
  console.log(`  ${htmlTag}`);
}

for (const name of readdirSync(new URL('../dist/articles', import.meta.url))) {
  const text = readFileSync(new URL(`../dist/articles/${name}`, import.meta.url), 'utf8');
  if (!text.trimEnd().endsWith('</svg>')) throw new Error(`Bad svg ${name}`);
  console.log(`dist/articles/${name} ok`);
}

console.log(`schema bundle leftover: ${existsSync(new URL('../dist/.seo-articles.mjs', import.meta.url))}`);
