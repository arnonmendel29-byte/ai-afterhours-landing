import { siteConfig } from '../siteConfig';
import { faqs } from '../content';
import pagesMeta from './pages.meta.json';

export type SeoPage = {
  path: string;
  title: string;
  description: string;
  /** Open Graph type */
  ogType?: 'website' | 'article';
  /** Optional robots override */
  robots?: string;
};

/** מקור אמת ל-Title, Description ו-Canonical לכל עמוד מרכזי */
export const seoPages: Record<string, SeoPage> = Object.fromEntries(
  Object.entries(pagesMeta).map(([path, meta]) => [
    path,
    { path, title: meta.title, description: meta.description },
  ]),
);

export const defaultOgImagePath = '/hero-robot.png';

export function absoluteUrl(path: string): string {
  const base = siteConfig.siteUrl.replace(/\/$/, '');
  if (!path || path === '/') return `${base}/`;
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}

export function getSeoPage(path: string): SeoPage {
  const normalized = path.replace(/\/+$/, '') || '/';
  return seoPages[normalized] ?? seoPages['/'];
}

export function buildOrganizationGraph() {
  return {
    '@type': 'Organization',
    '@id': `${siteConfig.siteUrl}/#organization`,
    name: siteConfig.brandName,
    alternateName: 'Kolid',
    url: `${siteConfig.siteUrl}/`,
    telephone: siteConfig.contact.phoneE164,
    logo: absoluteUrl(siteConfig.logoSrc),
    description:
      'בוט שיחות AI לסינון לידים ולאוטומציה של השיחה הראשונה מול צוות המכירות.',
  };
}

export function buildWebSiteGraph() {
  return {
    '@type': 'WebSite',
    '@id': `${siteConfig.siteUrl}/#website`,
    name: siteConfig.brandName,
    url: `${siteConfig.siteUrl}/`,
    inLanguage: 'he',
    publisher: { '@id': `${siteConfig.siteUrl}/#organization` },
  };
}

export function buildPersonGraph() {
  return {
    '@type': 'Person',
    name: 'ניב אשור',
    jobTitle: 'מייסד ו-CEO',
    worksFor: { '@id': `${siteConfig.siteUrl}/#organization` },
  };
}

export function buildFaqPageGraph() {
  return {
    '@type': 'FAQPage',
    '@id': `${siteConfig.siteUrl}/#faq`,
    mainEntity: faqs.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export function buildServiceGraph(input: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    '@type': 'Service',
    '@id': `${absoluteUrl(input.path)}#service`,
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    provider: { '@id': `${siteConfig.siteUrl}/#organization` },
    areaServed: 'IL',
    availableLanguage: ['he'],
  };
}

export function buildBreadcrumbGraph(
  items: Array<{ name: string; path: string }>,
) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function buildHomeJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      buildOrganizationGraph(),
      buildWebSiteGraph(),
      buildPersonGraph(),
      buildFaqPageGraph(),
      buildServiceGraph({
        name: 'Kolid Flash — תגובה מיידית ללידים',
        description:
          'בוט קולי מבוסס AI שמתקשר אוטומטית ללידים חדשים לאחר השארת פרטים, מנהל שיחה ראשונית ואוסף מידע להמשך טיפול.',
        path: '/lead-warming',
      }),
      buildServiceGraph({
        name: 'Kolid Spark — שיחות יזומות וחימום לידים',
        description:
          'בוט קולי מבוסס AI שמבצע שיחות יזומות ללידים קרים או לרשימות קיימות, מסנן רמת עניין ומעביר לידים רלוונטיים לנציג.',
        path: '/outbound-call-bot',
      }),
    ],
  };
}

export function buildServicePageJsonLd(input: {
  name: string;
  description: string;
  path: string;
  crumbLabel: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      buildOrganizationGraph(),
      buildWebSiteGraph(),
      buildServiceGraph({
        name: input.name,
        description: input.description,
        path: input.path,
      }),
      buildBreadcrumbGraph([
        { name: 'עמוד הבית', path: '/' },
        { name: input.crumbLabel, path: input.path },
      ]),
    ],
  };
}
