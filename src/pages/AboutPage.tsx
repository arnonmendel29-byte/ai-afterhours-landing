import { about } from '../content';
import { Reveal } from '../Reveal';
import { SiteHeader } from '../SiteHeader';
import { BrandLogo } from '../BrandLogo';
import { siteConfig } from '../siteConfig';
import { applyDocumentMeta } from '../seo/documentMeta';
import { buildAboutPageJsonLd, getSeoPage } from '../seo/pages';
import { useEffect } from 'react';

const PATH = '/about';

export function AboutPage() {
  useEffect(() => {
    applyDocumentMeta({
      page: getSeoPage(PATH),
      jsonLd: buildAboutPageJsonLd(),
    });
  }, []);

  return (
    <div className="site-shell">
      <a className="skip-link" href="#about-main">
        דילוג לתוכן
      </a>
      <SiteHeader className="site-header--standalone" currentPath={PATH} />
      <main id="about-main" tabIndex={-1}>
        <section className="section about-section" id="about" aria-labelledby="about-title">
          <div className="container about-grid">
            <Reveal className="about-copy section-copy">
              <p className="eyebrow">{about.eyebrow}</p>
              <h1 id="about-title" className="about-title">
                {about.title}
              </h1>
              <div className="about-founder">
                <h3>{about.name}</h3>
                <p>{about.role}</p>
              </div>
              {about.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </Reveal>
            <Reveal as="figure" className="about-portrait" delay>
              <picture>
                <source
                  srcSet="/niv-ashour.webp"
                  type="image/webp"
                  sizes="(max-width: 767px) min(100vw - 48px, 320px), (max-width: 1023px) 360px, 400px"
                />
                <img
                  src="/niv-ashour.png"
                  alt={about.portraitAlt}
                  width={420}
                  height={525}
                  sizes="(max-width: 767px) min(100vw - 48px, 320px), (max-width: 1023px) 360px, 400px"
                  loading="lazy"
                  decoding="async"
                />
              </picture>
            </Reveal>
          </div>
        </section>
      </main>
      <footer className="footer">
        <div className="container footer-inner">
          <BrandLogo href="/" compact />
          <p>
            © {new Date().getFullYear()} {siteConfig.brandName}.{' '}
            <a href="/">חזרה לעמוד הבית</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
