import { Reveal } from '../Reveal';
import { SiteHeader } from '../SiteHeader';
import { siteConfig } from '../siteConfig';
import { applyDocumentMeta } from '../seo/documentMeta';
import { buildServicePageJsonLd, getSeoPage } from '../seo/pages';
import { useEffect, type ReactNode } from 'react';
import './ServicePage.css';

export type ServiceNavItem = {
  href: string;
  label: string;
};

const RELATED_PAGES: ServiceNavItem[] = [
  { href: '/lead-warming', label: 'תגובה מיידית — Kolid Flash' },
  { href: '/outbound-call-bot', label: 'שיחות יזומות — Kolid Spark' },
  { href: '/lead-warming#pricing', label: 'תמחור Kolid Flash' },
  { href: '/ai-call-bots', label: 'מדריך בוטי שיחות AI' },
];

type ServicePageLayoutProps = {
  path: string;
  currentPath: string;
  /** תווית לפירורי לחם ול-Schema */
  serviceName: string;
  children: ReactNode;
};

export function ServicePageLayout({
  path,
  currentPath,
  serviceName,
  children,
}: ServicePageLayoutProps) {
  useEffect(() => {
    const page = getSeoPage(path);
    applyDocumentMeta({
      page,
      jsonLd: buildServicePageJsonLd({
        name: serviceName,
        description: page.description,
        path: page.path,
        crumbLabel: serviceName,
      }),
    });
  }, [path, serviceName]);

  return (
    <div className="site-shell svc-page">
      <a className="skip-link" href="#svc-main">
        דילוג לתוכן
      </a>
      <SiteHeader className="site-header--standalone" currentPath={currentPath} />
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
            <a href="/lead-warming">תגובה מיידית — Kolid Flash</a>
            <a href="/outbound-call-bot">שיחות יזומות — Kolid Spark</a>
            <a href="/lead-warming#pricing">תמחור Kolid Flash</a>
            <a href="/ai-call-bots">מדריך בוטי שיחות AI</a>
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
    <Reveal as="nav" className="svc-related container" aria-label="עמודי שירות נוספים" variant="fade">
      {links.map((item) => (
        <a key={item.href} href={item.href}>
          {item.label}
        </a>
      ))}
      <a href="/">עמוד הבית</a>
      <a href="/#demo-form">קבל הדגמה</a>
    </Reveal>
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
        <Reveal className="svc-cross">
          <div>
            <p className="svc-eyebrow">שירות נוסף</p>
            <h2 id="svc-cross-title">{title}</h2>
            <p>{body}</p>
          </div>
          <a className="svc-cross-link" href={href}>
            {cta}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
