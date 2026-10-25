/**
 * בדיקת SEO על תוצרי ה-build (dist): מטא-דאטה, H1, canonical, JSON-LD,
 * sitemap, robots, קישורים פנימיים ו-alt לתמונות. הרצה: node scripts/check-seo.mjs
 */
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(fileURLToPath(new URL('.', import.meta.url)), '..');
const distDir = join(root, 'dist');
const siteUrl = 'https://kolid.co.il';
const pages = JSON.parse(readFileSync(join(root, 'src/seo/pages.meta.json'), 'utf8'));

const errors = [];
const fail = (path, message) => errors.push(`${path}: ${message}`);

const routeFile = (path) =>
  path === '/' ? join(distDir, 'index.html') : join(distDir, path.slice(1), 'index.html');
const canonicalFor = (path) => (path === '/' ? `${siteUrl}/` : `${siteUrl}${path}/`);
const decode = (value) =>
  value
    .replaceAll('&quot;', '"')
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&#x27;', "'")
    .replaceAll('&amp;', '&');
const stripTags = (html) =>
  decode(html.replace(/<br\s*\/?>/g, ' ').replace(/<[^>]+>/g, ''))
    .replace(/\s+/g, ' ')
    .trim();

const seenTitles = new Map();
const seenDescriptions = new Map();
const linkedPaths = new Set();

for (const [path, meta] of Object.entries(pages)) {
  const file = routeFile(path);
  if (!existsSync(file)) {
    fail(path, `missing ${file}`);
    continue;
  }
  const html = readFileSync(file, 'utf8');
  const head = html.slice(0, html.indexOf('</head>'));
  const body = html.slice(html.indexOf('<body'));

  if (!/<html lang="he" dir="rtl">/.test(html)) fail(path, 'missing lang="he" dir="rtl"');

  const title = decode(head.match(/<title>([^<]*)<\/title>/)?.[1] ?? '');
  const description = decode(head.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? '');
  const canonical = head.match(/<link rel="canonical" href="([^"]*)"/)?.[1];
  const robots = head.match(/<meta name="robots" content="([^"]*)"/)?.[1] ?? '';
  const ogUrl = head.match(/<meta property="og:url" content="([^"]*)"/)?.[1];
  const ogImage = head.match(/<meta property="og:image" content="([^"]*)"/)?.[1] ?? '';
  if (!/\.(png|jpe?g|webp)$/.test(ogImage)) fail(path, `og:image not a raster image: ${ogImage}`);

  if (title !== meta.title) fail(path, `title mismatch: ${title}`);
  if (description !== meta.description) fail(path, 'description mismatch');
  if (description.length < 70 || description.length > 170) {
    fail(path, `description length ${description.length}`);
  }
  if (canonical !== canonicalFor(path)) fail(path, `canonical ${canonical}`);
  if (ogUrl !== canonical) fail(path, `og:url ${ogUrl} differs from canonical`);
  if (/noindex/.test(robots)) fail(path, `robots blocks indexing: ${robots}`);
  if ((head.match(/rel="canonical"/g) ?? []).length !== 1) fail(path, 'canonical count != 1');

  for (const [map, value, label] of [
    [seenTitles, title, 'title'],
    [seenDescriptions, description, 'description'],
  ]) {
    if (map.has(value)) fail(path, `duplicate ${label} with ${map.get(value)}`);
    map.set(value, path);
  }

  const h1s = [...body.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/g)].map((m) => stripTags(m[1]));
  if (h1s.length !== 1) fail(path, `expected 1 <h1>, found ${h1s.length}`);

  if (!/<main\b/.test(body)) fail(path, 'missing <main>');

  const jsonLdBlocks = [...head.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)];
  if (jsonLdBlocks.length !== 1) fail(path, `expected 1 JSON-LD block, found ${jsonLdBlocks.length}`);
  let types = [];
  try {
    const data = JSON.parse(jsonLdBlocks[0]?.[1] ?? '');
    types = data['@graph'].map((item) => item['@type']);
    const ids = new Set(data['@graph'].map((item) => item['@id']).filter(Boolean));
    const refs = JSON.stringify(data).match(/\{"@id":"[^"]+"\}/g) ?? [];
    for (const ref of refs) {
      const id = JSON.parse(ref)['@id'];
      if (!ids.has(id)) fail(path, `JSON-LD references undefined @id ${id}`);
    }
    for (const url of JSON.stringify(data).match(/https:\/\/[^"]+/g) ?? []) {
      if (url.includes('vercel.app')) fail(path, `JSON-LD points to preview host ${url}`);
    }
  } catch (error) {
    fail(path, `invalid JSON-LD: ${error.message}`);
  }

  for (const [, tag] of body.matchAll(/(<img\b[^>]*>)/g)) {
    if (!/\salt="/.test(tag)) fail(path, `img without alt: ${tag.slice(0, 80)}`);
  }

  for (const [, href] of body.matchAll(/<a\b[^>]*\shref="([^"]+)"/g)) {
    if (!href.startsWith('/') || href.startsWith('//')) continue;
    const [pathPart] = href.split('#');
    if (pathPart === '/' || pathPart === '') continue;
    if (!pathPart.endsWith('/')) fail(path, `internal link without trailing slash: ${href}`);
    const target = pathPart.replace(/\/+$/, '');
    if (!pages[target]) fail(path, `internal link to unknown page: ${href}`);
    linkedPaths.add(target);
  }

  for (const [, src] of html.matchAll(/(?:src|href)="(\/[^"#?]+\.(?:png|webp|jpg|svg|css|js|woff2))"/g)) {
    if (!existsSync(join(distDir, src))) fail(path, `missing asset ${src}`);
  }

  console.log(`${path}\n  title: ${title} (${title.length})\n  h1: ${h1s.join(' | ')}\n  schema: ${types.join(', ')}`);
}

for (const path of Object.keys(pages)) {
  if (path !== '/' && !linkedPaths.has(path)) fail(path, 'no internal links point to this page');
}

const sitemap = readFileSync(join(distDir, 'sitemap.xml'), 'utf8');
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const expectedUrls = Object.keys(pages).map(canonicalFor);
for (const url of expectedUrls) {
  if (!sitemapUrls.includes(url)) fail('sitemap.xml', `missing ${url}`);
}
for (const url of sitemapUrls) {
  if (!expectedUrls.includes(url)) fail('sitemap.xml', `unexpected ${url}`);
}

const robotsTxt = readFileSync(join(distDir, 'robots.txt'), 'utf8');
if (!robotsTxt.includes(`Sitemap: ${siteUrl}/sitemap.xml`)) fail('robots.txt', 'sitemap line missing');
if (/^Disallow:\s*\/\s*$/m.test(robotsTxt)) fail('robots.txt', 'site-wide Disallow');

if (errors.length) {
  console.error(`\n${errors.length} SEO issue(s):`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}
console.log(`\nSEO check OK: ${Object.keys(pages).length} pages, ${sitemapUrls.length} sitemap URLs.`);
