import { BrandLogo } from './BrandLogo';
import { leadFormHref } from './leadForm';
import { CtaStar } from './StarBorder';
import { isNavItemCurrent, navHrefForPage, navItems } from './content';
import { useEffect, useState } from 'react';

type SiteHeaderProps = {
  /** true בעמוד הבית — קישורי עוגן (#top וכו') */
  home?: boolean;
  /** נתיב נוכחי לסימון aria-current (למשל /lead-warming) */
  currentPath?: string;
  /** מחלקה נוספת — למשל כשה-header מחוץ ל-hero */
  className?: string;
};

export function SiteHeader({ home = false, currentPath = '/', className = '' }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [locationHash, setLocationHash] = useState(() =>
    typeof window !== 'undefined' ? window.location.hash.replace(/^#/, '') : '',
  );

  useEffect(() => {
    const syncHash = () => setLocationHash(window.location.hash.replace(/^#/, ''));
    window.addEventListener('hashchange', syncHash);
    syncHash();
    return () => window.removeEventListener('hashchange', syncHash);
  }, [currentPath]);

  useEffect(() => {
    if (!menuOpen) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    const onResize = () => {
      if (window.matchMedia('(min-width: 1024px)').matches) setMenuOpen(false);
    };

    document.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);
  const logoHref = home ? '#top' : '/';
  const ctaHref = leadFormHref(home ? '/' : currentPath);

  const resolveHref = (href: string) => (home ? href : navHrefForPage(href));

  const rootClass = ['site-header', menuOpen ? 'is-menu-open' : '', className].filter(Boolean).join(' ');

  return (
    <header className={rootClass} aria-label="ניווט ראשי">
      <div className="header-brand">
        <BrandLogo href={logoHref} />
      </div>
      <nav className="desktop-nav" aria-label="קישורי עמוד">
        {navItems.map((item) => {
          const href = resolveHref(item.href);
          const current = isNavItemCurrent(item.href, currentPath, locationHash);
          return (
            <a href={href} key={item.href} aria-current={current ? 'page' : undefined}>
              {item.label}
            </a>
          );
        })}
      </nav>
      <div className="header-actions">
        <CtaStar as="a" className="header-cta" href={ctaHref}>
          דבר איתנו
        </CtaStar>
        <button
          type="button"
          className="nav-toggle"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav-panel"
          aria-label={menuOpen ? 'סגירת תפריט' : 'פתיחת תפריט'}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="nav-toggle-bar" aria-hidden="true" />
          <span className="nav-toggle-bar" aria-hidden="true" />
          <span className="nav-toggle-bar" aria-hidden="true" />
        </button>
      </div>
      <div
        className={`mobile-nav-backdrop${menuOpen ? ' is-open' : ''}`}
        hidden={!menuOpen}
        onClick={closeMenu}
        aria-hidden="true"
      />
      <nav
        id="mobile-nav-panel"
        className={`mobile-nav${menuOpen ? ' is-open' : ''}`}
        aria-label="תפריט נייד"
        hidden={!menuOpen}
        onClick={(event) => {
          const anchor = (event.target as HTMLElement).closest('a');
          if (!anchor) return;
          const href = anchor.getAttribute('href') || '';
          if (href.startsWith('/')) {
            event.preventDefault();
            window.location.assign(href);
            return;
          }
          closeMenu();
        }}
      >
        {navItems.map((item) => {
          const current = isNavItemCurrent(item.href, currentPath, locationHash);
          return (
            <a
              href={resolveHref(item.href)}
              key={item.href}
              aria-current={current ? 'page' : undefined}
            >
              {item.label}
            </a>
          );
        })}
        <CtaStar as="a" className="mobile-nav-cta" href={ctaHref}>
          דבר איתנו
        </CtaStar>
      </nav>
    </header>
  );
}
