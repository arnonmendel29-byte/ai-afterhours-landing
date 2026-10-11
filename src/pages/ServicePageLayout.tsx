import { BrandLogo } from '../BrandLogo';
import { CtaStar } from '../StarBorder';
import { siteConfig } from '../siteConfig';
import { useEffect, type ReactNode } from 'react';
import './ServicePage.css';

export type ServiceNavItem = {
  href: string;
  label: string;
};

const SERVICE_NAV: ServiceNavItem[] = [
  { href: '/', label: 'בית' },
  { href: '/lead-warming', label: 'תגובה מיידית' },
  { href: '/outbound-call-bot', label: 'שיחות יזומות' },
  { href: '/lead-warming#pricing', label: 'תמחור' },
];

const RELATED_PAGES: ServiceNavItem[] = [
  { href: '/lead-warming', label: 'תגובה מיידית ללידים' },
  { href: '/outbound-call-bot', label: 'שיחות יזומות וחימום לידים' },
  { href: '/lead-warming#pricing', label: 'תמחור' },
  { href: '/ai-call-bots', label: 'בוטי שיחות AI' },
];

type ServicePageLayoutProps = {
  title: string;
  description: string;
  path: string;
  currentPath: string;
  children: ReactNode;
};

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertCanonical(href: string) {
  let link = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement('link');
    link.rel = 'canonical';
    document.head.appendChild(link);
  }
  link.href = href;
}

function isCurrentNavItem(href: string, currentPath: string): boolean {
  if (href.includes('#')) {
    const [path, hash] = href.split('#');
    return (
      path === currentPath &&
      typeof window !== 'undefined' &&
      window.location.hash.replace(/^#/, '') === hash
    );
  }
  return href === currentPath;
}

export function ServicePageLayout({
  title,
  description,
  path,
  currentPath,
  children,
}: ServicePageLayoutProps) {
  useEffect(() => {
    const fullTitle = `${title} | ${siteConfig.brandName}`;
    const canonical = `${siteConfig.siteUrl}${path}`;

    document.title = fullTitle;
    upsertMeta('name', 'description', description);
    upsertMeta('property', 'og:title', fullTitle);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:url', canonical);
    upsertMeta('property', 'og:type', 'website');
    upsertMeta('name', 'twitter:title', fullTitle);
    upsertMeta('name', 'twitter:description', description);
    upsertCanonical(canonical);

    return () => {
      // Leave homepage SEO to index.html when leaving; do not rewrite home meta here.
    };
  }, [title, description, path]);

  return (
    <div className="site-shell svc-page">
      <a className="skip-link" href="#svc-main">
        דילוג לתוכן
      </a>
      <header className="svc-header" aria-label="ניווט עמוד שירות">
        <div className="container svc-header-inner">
          <BrandLogo href="/" />
          <nav className="svc-nav" aria-label="עמודי שירות">
            <div className="svc-nav-links">
              {SERVICE_NAV.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  aria-current={isCurrentNavItem(item.href, currentPath) ? 'page' : undefined}
                >
                  {item.label}
                </a>
              ))}
            </div>
            <CtaStar as="a" className="svc-header-cta" href="/#demo-form">
              דבר איתנו
            </CtaStar>
          </nav>
        </div>
      </header>
      <main id="svc-main" className="svc-main" tabIndex={-1}>
        {children}
      </main>
      <footer className="svc-footer">
        <div className="container svc-footer-inner">
          <p>
            © {new Date().getFullYear()} {siteConfig.brandName}.{' '}
            <a href="/">חזרה לעמוד הבית</a>
          </p>
          <div className="svc-footer-links">
            <a href="/lead-warming">תגובה מיידית ללידים</a>
            <a href="/outbound-call-bot">שיחות יזומות</a>
            <a href="/lead-warming#pricing">תמחור</a>
            <a href="/ai-call-bots">בוטי שיחות AI</a>
            <a href={`tel:${siteConfig.contact.phoneE164}`}>{siteConfig.contact.phoneDisplay}</a>
            <a href="/privacy-policy">מדיניות פרטיות</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export function ServiceRelatedLinks({ exclude }: { exclude: string }) {
  const links = RELATED_PAGES.filter((item) => {
    const pathOnly = item.href.split('#')[0];
    return pathOnly !== exclude || item.href.includes('#');
  });
  return (
    <nav className="svc-related container" aria-label="עמודי שירות נוספים">
      {links.map((item) => (
        <a key={item.href} href={item.href}>
          {item.label}
        </a>
      ))}
      <a href="/">עמוד הבית</a>
      <a href="/#demo-form">קבל הדגמה</a>
    </nav>
  );
}

export function ServiceCrossSell({
  title,
  body,
  href,
  cta,
}: {
  title: string;
  body: string;
  href: string;
  cta: string;
}) {
  return (
    <section className="svc-section svc-section--soft" aria-labelledby="svc-cross-title">
      <div className="container">
        <div className="svc-cross">
          <div>
            <p className="svc-eyebrow">שירות נוסף</p>
            <h2 id="svc-cross-title">{title}</h2>
            <p>{body}</p>
          </div>
          <a className="svc-cross-link" href={href}>
            {cta}
          </a>
        </div>
      </div>
    </section>
  );
}
