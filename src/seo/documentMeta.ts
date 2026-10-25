import {
  absoluteUrl,
  defaultOgImagePath,
  getSeoPage,
  type SeoPage,
} from './pages';

const JSON_LD_ID = 'kolid-jsonld';

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertCanonical(href: string | null) {
  let link = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!href) {
    link?.remove();
    return;
  }
  if (!link) {
    link = document.createElement('link');
    link.rel = 'canonical';
    document.head.appendChild(link);
  }
  link.href = href;
}

function upsertJsonLd(data: object | null) {
  const existing = document.getElementById(JSON_LD_ID);
  if (!data) {
    existing?.remove();
    return;
  }
  let script = existing as HTMLScriptElement | null;
  if (!script) {
    script = document.createElement('script');
    script.id = JSON_LD_ID;
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(data);
}

export type ApplyDocumentMetaOptions = {
  /** Override title/description/path from registry */
  page?: SeoPage;
  path?: string;
  jsonLd?: object | null;
  ogImage?: string;
};

/** מעדכן Title, Description, Canonical, Open Graph ו-JSON-LD בעמוד הנוכחי */
export function applyDocumentMeta(options: ApplyDocumentMetaOptions = {}) {
  const page = options.page ?? getSeoPage(options.path ?? '/');
  const canonical = absoluteUrl(page.path);
  const ogImage = absoluteUrl(options.ogImage ?? page.image ?? defaultOgImagePath);
  const robots = page.robots ?? 'index, follow, max-image-preview:large';

  document.title = page.title;
  upsertMeta('name', 'description', page.description);
  upsertMeta('name', 'robots', robots);

  upsertMeta('property', 'og:type', page.ogType ?? 'website');
  upsertMeta('property', 'og:locale', 'he_IL');
  upsertMeta('property', 'og:site_name', 'קוליד');
  upsertMeta('property', 'og:title', page.title);
  upsertMeta('property', 'og:description', page.description);
  upsertMeta('property', 'og:url', canonical);
  upsertMeta('property', 'og:image', ogImage);

  upsertMeta('name', 'twitter:card', 'summary_large_image');
  upsertMeta('name', 'twitter:title', page.title);
  upsertMeta('name', 'twitter:description', page.description);
  upsertMeta('name', 'twitter:image', ogImage);

  upsertCanonical(robots.includes('noindex') ? null : canonical);

  if (options.jsonLd !== undefined) {
    upsertJsonLd(options.jsonLd);
  }
}
