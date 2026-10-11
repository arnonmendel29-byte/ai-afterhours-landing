import { BrandLogo } from '../BrandLogo';
import { siteConfig } from '../siteConfig';
import { useEffect, type ReactNode } from 'react';

type LegalLayoutProps = {
  title: string;
  description: string;
  children: ReactNode;
};

export function LegalLayout({ title, description, children }: LegalLayoutProps) {
  useEffect(() => {
    document.title = `${title} | ${siteConfig.brandName}`;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', description);
  }, [title, description]);

  return (
    <div className="site-shell legal-page">
      <a className="skip-link" href="#legal-main">
        דילוג לתוכן
      </a>
      <header className="legal-header">
        <div className="container legal-header-inner">
          <BrandLogo href="/" />
          <nav className="legal-nav" aria-label="ניווט משני">
            <a href="/">עמוד הבית</a>
            <a href="/privacy-policy">מדיניות פרטיות</a>
            <a href="/accessibility">הצהרת נגישות</a>
            <a href="/cookie-policy">מידע על עוגיות</a>
          </nav>
        </div>
      </header>
      <main id="legal-main" className="legal-main container" tabIndex={-1}>
        <header className="legal-title-block">
          <h1>{title}</h1>
          <p className="legal-lede">{description}</p>
          <p className="legal-updated">
            עודכן לאחרונה:{' '}
            {new Date(siteConfig.policyLastUpdated).toLocaleDateString('he-IL', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </p>
        </header>
        <div className="legal-prose">{children}</div>
      </main>
      <footer className="footer legal-footer">
        <div className="container footer-inner">
          <p>
            © {new Date().getFullYear()} {siteConfig.brandName}.{' '}
            <a href="/">חזרה לעמוד הבית</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
