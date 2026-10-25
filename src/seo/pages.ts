import { siteConfig } from '../siteConfig';
import { about, faqs } from '../content';
import pagesMeta from './pages.meta.json';

export type SeoPage = {
  path: string;
  title: string;
  description: string;
  /** Open Graph type */
  ogType?: 'website' | 'article';
  /** Optional robots override */
  robots?: string;
  /** Open Graph image path (defaults to the hero robot) */
  image?: string;
};

/** מקור אמת ל-Title, Description ו-Canonical לכל עמוד מרכזי */
export const seoPages: Record<string, SeoPage> = Object.fromEntries(
  Object.entries(pagesMeta).map(([path, meta]) => [
    path,
    {
      path,
      title: meta.title,
      description: meta.description,
      ...('image' in meta ? { image: meta.image } : {}),
    },
  ]),
);

export const defaultOgImagePath = '/hero-robot.png';

/**
 * כתובת מלאה לעמוד. השרת בפרודקשן מפנה (301) נתיבי עמודים ללא לוכסן סופי,
 * לכן הכתובת הקנונית של כל עמוד (פרט לקבצים) מסתיימת ב-/.
 */
export function absoluteUrl(path: string): string {
  const base = siteConfig.siteUrl.replace(/\/$/, '');
  if (!path || path === '/') return `${base}/`;
  const normalized = path.startsWith('/') ? path : `/${path}`;
  const isFile = /\.[a-z0-9]+$/i.test(normalized);
  return `${base}${isFile || normalized.endsWith('/') ? normalized : `${normalized}/`}`;
}

export function getSeoPage(path: string): SeoPage {
  const normalized = path.replace(/\/+$/, '') || '/';
  return seoPages[normalized] ?? seoPages['/'];
}

const organizationId = `${siteConfig.siteUrl}/#organization`;
const founderId = `${siteConfig.siteUrl}/about/#founder`;

export function buildOrganizationGraph() {
  return {
    '@type': 'Organization',
    '@id': organizationId,
    name: siteConfig.brandName,
    alternateName: 'Kolid',
    url: `${siteConfig.siteUrl}/`,
    telephone: siteConfig.contact.phoneE164,
    logo: absoluteUrl(siteConfig.logoSrc),
    description:
      'בוט שיחות AI לעסקים: בוט קולי לסינון לידים ולאוטומציה של השיחה הראשונה מול צוות המכירות.',
    founder: { '@type': 'Person', '@id': founderId, name: about.name },
  };
}

export function buildWebSiteGraph() {
  return {
    '@type': 'WebSite',
    '@id': `${siteConfig.siteUrl}/#website`,
    name: siteConfig.brandName,
    url: `${siteConfig.siteUrl}/`,
    inLanguage: 'he',
    publisher: { '@id': organizationId },
  };
}

export function buildPersonGraph() {
  return {
    '@type': 'Person',
    '@id': founderId,
    name: about.name,
    jobTitle: about.role,
    url: absoluteUrl('/about'),
    image: absoluteUrl('/niv-ashour.png'),
    worksFor: { '@id': organizationId },
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
    provider: { '@id': organizationId },
    areaServed: 'IL',
    availableLanguage: ['he'],
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

/** שם השירות לכל עמוד שירות — משמש ל-Schema מסוג Service */
export const serviceNames: Record<string, string> = {
  '/lead-warming': 'Kolid Flash — תגובה מיידית ללידים',
  '/outbound-call-bot': 'Kolid Spark — שיחות יזומות וחימום לידים',
  '/ai-call-bots': 'בוטים לשיחות AI לעסקים',
};

export function buildServicePageJsonLdForPath(path: string) {
  const page = getSeoPage(path);
  return {
    '@context': 'https://schema.org',
    '@graph': [
      buildOrganizationGraph(),
      buildWebSiteGraph(),
      buildServiceGraph({
        name: serviceNames[page.path] ?? page.title,
        description: page.description,
        path: page.path,
      }),
    ],
  };
}

export function buildAboutPageJsonLd() {
  const page = getSeoPage('/about');
  return {
    '@context': 'https://schema.org',
    '@graph': [
      buildOrganizationGraph(),
      buildWebSiteGraph(),
      buildPersonGraph(),
      {
        '@type': 'AboutPage',
        '@id': `${absoluteUrl(page.path)}#webpage`,
        url: absoluteUrl(page.path),
        name: page.title,
        description: page.description,
        inLanguage: 'he',
        isPartOf: { '@id': `${siteConfig.siteUrl}/#website` },
        about: { '@id': organizationId },
        mainEntity: { '@id': founderId },
      },
    ],
  };
}

/** JSON-LD בסיסי לעמודים בלי סכמה ייעודית (מדיניות וכו') */
export function buildBaseJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [buildOrganizationGraph(), buildWebSiteGraph()],
  };
}
