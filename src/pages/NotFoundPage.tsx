import { useEffect } from 'react';
import { BrandLogo } from '../BrandLogo';
import { applyDocumentMeta } from '../seo/documentMeta';

export function NotFoundPage() {
  useEffect(() => {
    applyDocumentMeta({
      page: {
        path: '/404',
        title: 'העמוד לא נמצא | קוליד',
        description: 'הכתובת לא קיימת באתר של קוליד.',
        robots: 'noindex, follow',
      },
      jsonLd: null,
    });
  }, []);

  return (
    <div className="site-shell legal-page">
      <a className="skip-link" href="#not-found-main">
        דילוג לתוכן
      </a>
      <header className="legal-header">
        <div className="container legal-header-inner">
          <BrandLogo href="/" />
        </div>
      </header>
      <main id="not-found-main" className="legal-main container" tabIndex={-1}>
        <header className="legal-title-block">
          <h1>העמוד לא נמצא</h1>
          <p className="legal-lede">הכתובת לא קיימת באתר של קוליד.</p>
          <p>
            <a href="/">חזרה לעמוד הבית</a>
            {' · '}
            <a href="/lead-warming">תגובה מיידית — Kolid Flash</a>
          </p>
        </header>
      </main>
    </div>
  );
}
