/**
 * אחרי vite build: יוצר HTML סטטי לכל נתיב עם Title/Description/Canonical/JSON-LD נכונים
 * ועם תוכן העמוד המרונדר מראש, כדי שסורקים יקבלו את המטא-דאטה והתוכן לפני הרצת JavaScript.
 * בנוסף יוצר sitemap.xml מאותו מקור אמת (src/seo/pages.meta.json).
 */
import { build } from 'esbuild';
import { copyFileSync, mkdirSync, readFileSync, rmSync, unlinkSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const distDir = join(root, 'dist');

const pages = JSON.parse(
  readFileSync(join(root, 'src/seo/pages.meta.json'), 'utf8'),
);

/** מודול ה-lazy של כל עמוד (routes.tsx) — לטעינה מוקדמת של ה-CSS/JS שלו */
const routeModules = {
  '/about': 'src/pages/AboutPage.tsx',
  '/lead-warming': 'src/pages/LeadWarmingPage.tsx',
  '/outbound-call-bot': 'src/pages/OutboundCallBotPage.tsx',
  '/ai-call-bots': 'src/pages/AiCallBotsPage.tsx',
  '/how-to-get-more-leads': 'src/pages/HowToGetMoreLeadsPage.tsx',
  '/improve-sales-process': 'src/pages/ImproveSalesProcessPage.tsx',
  '/privacy-policy': 'src/pages/PrivacyPolicyPage.tsx',
  '/accessibility': 'src/pages/AccessibilityPage.tsx',
  '/cookie-policy': 'src/pages/CookiePolicyPage.tsx',
};

const manifestPath = join(distDir, '.vite/manifest.json');
const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));

function routeAssetTags(path) {
  const source = routeModules[path];
  if (!source) return '';
  if (!manifest[source]) {
    throw new Error(`generate-route-html: ${source} not found in Vite manifest`);
  }

  const css = new Set();
  const js = new Set();
  const visit = (key) => {
    const chunk = manifest[key];
    if (!chunk || chunk.isEntry || js.has(chunk.file)) return;
    js.add(chunk.file);
    chunk.css?.forEach((file) => css.add(file));
    chunk.imports?.forEach(visit);
  };
  visit(source);

  return [
    ...[...css].map((file) => `<link rel="stylesheet" crossorigin href="/${file}">`),
    ...[...js].map((file) => `<link rel="modulepreload" crossorigin href="/${file}">`),
  ]
    .map((tag) => `    ${tag}\n`)
    .join('');
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

/** JSON בתוך <script> — מונע סגירה מוקדמת של התגית */
function serializeJsonLd(data) {
  return JSON.stringify(data).replaceAll('<', '\\u003c');
}

function replaceOrFail(html, pattern, replacement, label) {
  if (!pattern.test(html)) {
    throw new Error(`generate-route-html: missing ${label} in dist/index.html`);
  }
  return html.replace(pattern, replacement);
}

const prerenderBundle = join(distDir, '.prerender.mjs');
await build({
  entryPoints: [join(root, 'src/prerender.tsx')],
  bundle: true,
  format: 'esm',
  platform: 'node',
  packages: 'external',
  jsx: 'automatic',
  outfile: prerenderBundle,
  logLevel: 'warning',
  loader: { '.css': 'empty' },
  define: {
    'import.meta.env.VITE_FORM_ACTION_URL': 'undefined',
    'import.meta.env.VITE_LEAD_WEBHOOK_URL': 'undefined',
  },
});

const { renderPage, buildJsonLdForPath, seoArticles, absoluteUrl, defaultOgImagePath } =
  await import(pathToFileURL(prerenderBundle).href);
const articlesByPath = new Map(seoArticles.map((article) => [article.path, article]));

const template = readFileSync(join(distDir, 'index.html'), 'utf8');

function renderRouteHtml(path, meta) {
  const article = articlesByPath.get(path);
  const canonical = absoluteUrl(path);
  // תמונות המאמרים הן SVG, שרשתות חברתיות לא מציגות בכרטיס שיתוף
  const image = absoluteUrl(meta.image ?? defaultOgImagePath);
  const ogType = article ? 'article' : 'website';
  const title = escapeHtml(meta.title);
  const titleAttr = escapeAttr(meta.title);
  const description = escapeAttr(meta.description);

  const metaReplacements = [
    [/<title>[^<]*<\/title>/, `<title>${title}</title>`, 'title'],
    [/<meta\s+name="description"\s+content="[^"]*"\s*\/>/, `<meta name="description" content="${description}" />`, 'description'],
    [/<link\s+rel="canonical"\s+href="[^"]*"\s*\/>/, `<link rel="canonical" href="${canonical}" />`, 'canonical'],
    [/<meta\s+property="og:type"\s+content="[^"]*"\s*\/>/, `<meta property="og:type" content="${ogType}" />`, 'og:type'],
    [/<meta\s+property="og:title"\s+content="[^"]*"\s*\/>/, `<meta property="og:title" content="${titleAttr}" />`, 'og:title'],
    [/<meta\s+property="og:description"\s+content="[^"]*"\s*\/>/, `<meta property="og:description" content="${description}" />`, 'og:description'],
    [/<meta\s+property="og:url"\s+content="[^"]*"\s*\/>/, `<meta property="og:url" content="${canonical}" />`, 'og:url'],
    [/<meta\s+property="og:image"\s+content="[^"]*"\s*\/>/, `<meta property="og:image" content="${image}" />`, 'og:image'],
    [/<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/>/, `<meta name="twitter:title" content="${titleAttr}" />`, 'twitter:title'],
    [/<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/>/, `<meta name="twitter:description" content="${description}" />`, 'twitter:description'],
    [/<meta\s+name="twitter:image"\s+content="[^"]*"\s*\/>/, `<meta name="twitter:image" content="${image}" />`, 'twitter:image'],
    [
      /<script type="application\/ld\+json" id="kolid-jsonld">[\s\S]*?<\/script>/,
      `<script type="application/ld+json" id="kolid-jsonld">${serializeJsonLd(buildJsonLdForPath(path))}</script>`,
      'JSON-LD',
    ],
    [/<div id="root"><\/div>/, `<div id="root">${renderPage(path)}</div>`, '#root'],
  ];

  let out = template;
  for (const [pattern, replacement, label] of metaReplacements) {
    out = replaceOrFail(out, pattern, () => replacement, label);
  }

  if (path !== '/') {
    out = out.replace(
      /\s*<link\s+rel="preload"\s+as="image"[\s\S]*?fetchpriority="high"\s*\/>/,
      '',
    );
  }

  out = replaceOrFail(out, /<\/head>/, () => `${routeAssetTags(path)}  </head>`, '</head>');

  return out;
}

for (const [path, meta] of Object.entries(pages)) {
  const html = renderRouteHtml(path, meta);

  if (path === '/') {
    writeFileSync(join(distDir, 'index.html'), html, 'utf8');
    continue;
  }

  const routeDir = join(distDir, path.replace(/^\//, ''));
  mkdirSync(routeDir, { recursive: true });
  writeFileSync(join(routeDir, 'index.html'), html, 'utf8');
}

const sitemapEntries = Object.entries(pages)
  .filter(([, meta]) => !meta.robots?.includes('noindex'))
  .map(
    ([path, meta]) =>
      `  <url>\n    <loc>${absoluteUrl(path)}</loc>\n${
        meta.lastmod ? `    <lastmod>${meta.lastmod}</lastmod>\n` : ''
      }  </url>`,
  );
writeFileSync(
  join(distDir, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapEntries.join('\n')}\n</urlset>\n`,
  'utf8',
);

// ודא ש-404 נשאר זמין אם הועתק מ-public
try {
  copyFileSync(join(root, 'public/404.html'), join(distDir, '404.html'));
} catch {
  // ignore
}

unlinkSync(prerenderBundle);
rmSync(join(distDir, '.vite'), { recursive: true, force: true });

console.log(
  `SEO route HTML (prerendered) generated for ${Object.keys(pages).length} pages; sitemap.xml with ${sitemapEntries.length} URLs → ${distDir}`,
);
