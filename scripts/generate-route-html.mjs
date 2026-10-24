/**
 * אחרי vite build: יוצר HTML סטטי לכל נתיב עם Title/Description/Canonical נכונים,
 * כדי שסורקים יקבלו מטא-דאטה גם לפני הרצת JavaScript.
 */
import { build } from 'esbuild';
import { copyFileSync, mkdirSync, readFileSync, unlinkSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const distDir = join(root, 'dist');
const siteUrl = 'https://num8.vercel.app';
const ogImage = `${siteUrl}/hero-robot.png`;

const pages = JSON.parse(
  readFileSync(join(root, 'src/seo/pages.meta.json'), 'utf8'),
);

function absoluteUrl(path) {
  if (!path || path === '/') return `${siteUrl}/`;
  return `${siteUrl}${path}`;
}

function replaceMeta(html, { title, description, path, image = ogImage, ogType = 'website', jsonLd }) {
  const canonical = absoluteUrl(path);
  let out = html;

  out = out.replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(title)}</title>`);

  out = out.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/>/,
    `<meta name="description" content="${escapeAttr(description)}" />`,
  );

  out = out.replace(
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/>/,
    `<link rel="canonical" href="${canonical}" />`,
  );

  out = out.replace(
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/>/,
    `<meta property="og:title" content="${escapeAttr(title)}" />`,
  );
  out = out.replace(
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/>/,
    `<meta property="og:description" content="${escapeAttr(description)}" />`,
  );
  out = out.replace(
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/>/,
    `<meta property="og:url" content="${canonical}" />`,
  );
  out = out.replace(
    /<meta\s+property="og:type"\s+content="[^"]*"\s*\/>/,
    `<meta property="og:type" content="${ogType}" />`,
  );
  out = out.replace(
    /<meta\s+property="og:image"\s+content="[^"]*"\s*\/>/,
    `<meta property="og:image" content="${image}" />`,
  );

  out = out.replace(
    /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/>/,
    `<meta name="twitter:title" content="${escapeAttr(title)}" />`,
  );
  out = out.replace(
    /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/>/,
    `<meta name="twitter:description" content="${escapeAttr(description)}" />`,
  );
  out = out.replace(
    /<meta\s+name="twitter:image"\s+content="[^"]*"\s*\/>/,
    `<meta name="twitter:image" content="${image}" />`,
  );

  if (jsonLd) {
    out = out.replace(
      /<script type="application\/ld\+json" id="kolid-jsonld">[\s\S]*?<\/script>/,
      `<script type="application/ld+json" id="kolid-jsonld">${JSON.stringify(jsonLd)}</script>`,
    );
  }

  return out;
}

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

function escapeAttr(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

const articleBundle = join(distDir, '.seo-articles.mjs');
await build({
  entryPoints: [join(root, 'src/articles/seoArticles.ts')],
  bundle: true,
  format: 'esm',
  platform: 'node',
  outfile: articleBundle,
  logLevel: 'silent',
  define: {
    'import.meta.env.VITE_FORM_ACTION_URL': 'undefined',
    'import.meta.env.VITE_LEAD_WEBHOOK_URL': 'undefined',
  },
});
const { seoArticles, buildArticleJsonLd } = await import(pathToFileURL(articleBundle).href);
const articlesByPath = new Map(seoArticles.map((article) => [article.path, article]));

const template = readFileSync(join(distDir, 'index.html'), 'utf8');

for (const [path, meta] of Object.entries(pages)) {
  const article = articlesByPath.get(path);
  const html = replaceMeta(template, {
    ...meta,
    path,
    ...(article
      ? {
          image: absoluteUrl(article.hero.src),
          ogType: 'article',
          jsonLd: buildArticleJsonLd(article),
        }
      : {}),
  });

  if (path === '/') {
    writeFileSync(join(distDir, 'index.html'), html, 'utf8');
    continue;
  }

  const routeDir = join(distDir, path.replace(/^\//, ''));
  mkdirSync(routeDir, { recursive: true });
  writeFileSync(join(routeDir, 'index.html'), html, 'utf8');
}

// ודא ש-404 נשאר זמין אם הועתק מ-public
try {
  copyFileSync(join(root, 'public/404.html'), join(distDir, '404.html'));
} catch {
  // ignore
}

unlinkSync(articleBundle);

console.log(
  `SEO route HTML generated for ${Object.keys(pages).length} pages → ${distDir}`,
);
