import {
  about,
  faqSection,
  faqs,
  formFields,
  integrations,
  navItems,
  productFlow,
} from './content';
import { HomeProductsSection } from './HomeProductsSection';
import { Reveal } from './Reveal';
import { SiteLeadCtas } from './SiteLeadCtas';
import { CtaStar } from './StarBorder';
import { BrandLogo } from './BrandLogo';
import GradientText from './GradientText';
import { siteConfig } from './siteConfig';
import { lazy, Suspense, useEffect, useRef, useState, type CSSProperties, type FormEvent } from 'react';

const FORM_FIELD_ATTR: Record<
  string,
  { id: string; name: string; autoComplete?: string; inputMode?: 'text' | 'tel' | 'email' }
> = {
  'שם מלא': { id: 'field-full-name', name: 'fullName', autoComplete: 'name' },
  'שם החברה': { id: 'field-company', name: 'company', autoComplete: 'organization' },
  אימייל: { id: 'field-email', name: 'email', autoComplete: 'email', inputMode: 'email' },
  טלפון: { id: 'field-phone', name: 'phone', autoComplete: 'tel', inputMode: 'tel' },
  'תחום עיסוק': { id: 'field-industry', name: 'industry', autoComplete: 'organization-title' },
  'כמות לידים חודשית': { id: 'field-leads', name: 'monthlyLeads' },
  הודעה: { id: 'field-message', name: 'message', autoComplete: 'off' },
};

const PillarsSection = lazy(() =>
  import('./PillarsSection').then((module) => ({ default: module.PillarsSection })),
);

export default function LandingApp() {
  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">
        דילוג לתוכן הראשי
      </a>
      <div className="hero-stage">
        <div className="hero-card">
          <svg className="hero-blob" viewBox="0 0 1000 1000" preserveAspectRatio="none" aria-hidden="true">
            <path
              fill="#9333EA"
              d="M1000 0v1000H470C640 980 580 820 710 700c130-120 40-170 160-280C980 300 920 90 1000 0Z"
            />
          </svg>
          <Header />
          <Hero />
        </div>
      </div>
      <main id="main-content" tabIndex={-1}>
        <div className="grid-band">
          <Problem />
          <ProductDemo />
        </div>
        <Suspense fallback={<div className="pillars-suspense" aria-hidden="true" />}>
          <PillarsSection />
        </Suspense>
        <Integrations />
        <HomeProductsSection />
        <PricingPreview />
        <AboutSection />
        <FaqSection />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

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

  return (
    <header className={`site-header${menuOpen ? ' is-menu-open' : ''}`} aria-label="ניווט ראשי">
      <div className="header-brand">
        <BrandLogo href="#top" />
      </div>
      <nav className="desktop-nav" aria-label="קישורי עמוד">
        {navItems.map((item) => (
          <a href={item.href} key={item.href}>
            {item.label}
          </a>
        ))}
      </nav>
      <div className="header-actions">
        <CtaStar as="a" className="header-cta" href="#demo-form">
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
        {navItems.map((item) => (
          <a href={item.href} key={item.href}>
            {item.label}
          </a>
        ))}
        <CtaStar as="a" className="mobile-nav-cta" href="#demo-form">
          דבר איתנו
        </CtaStar>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero-layout">
        <div className="hero-phones">
          <picture>
            <source srcSet="/hero-robot.webp" type="image/webp" />
            <img
              className="hero-robot"
              src="/hero-robot.png"
              alt="איור של בוט שיחות AI של קוליד"
              width={560}
              height={560}
              decoding="async"
              fetchPriority="high"
            />
          </picture>
        </div>
        <div className="hero-copy">
          <h1 id="hero-title">
            הבוט שמדבר
            <br />
            עם הלידים שלך
            <br />
            <GradientText
              className="hero-accent"
              colors={['#5227FF', '#FF9FFC', '#B497CF']}
              animationSpeed={8}
              variant="linear"
              glow={0}
            >
              ומביא לקוחות
            </GradientText>
          </h1>
          <p className="hero-lede">
            בוט שיחות מבוסס AI שמנהל שיחות טבעיות עם הלידים שלך, מסנן את
            המתעניינים ומעביר לצוות המכירות רק את מי שבאמת רלוונטי.
          </p>
          <SiteLeadCtas className="hero-actions" formHref="#demo-form" />
        </div>
      </div>
    </section>
  );
}

function Problem() {
  return (
    <section className="section problem" aria-labelledby="problem-title">
      <div className="container split-grid">
        <Reveal className="section-copy">
          <p className="eyebrow">הבעיה</p>
          <h2 id="problem-title">
            צוות המכירות מבזבז זמן על{' '}
            <span className="text-highlight">לידים קרים</span>.
          </h2>
        </Reveal>
        <Reveal className="problem-flow" delay aria-label="איך זמן מכירה מתבזבז">
          <span>ליד נכנס בלי סינון</span>
          <i aria-hidden="true" />
          <span>שיחה עם מי שלא בשל</span>
          <i aria-hidden="true" />
          <span>הזמן של הצוות מתבזבז</span>
        </Reveal>
      </div>
    </section>
  );
}

function ProductDemo() {
  const trackRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Array<HTMLLIElement | null>>([]);
  const activeRef = useRef(0);
  const rafRef = useRef(0);
  const inViewRef = useRef(false);

  const applyActiveClasses = (nextActive: number) => {
    if (nextActive === activeRef.current) return;
    activeRef.current = nextActive;
    itemRefs.current.forEach((item, index) => {
      if (!item) return;
      item.classList.toggle('is-active', index < nextActive);
      item.classList.toggle('is-current', nextActive > 0 && index === nextActive - 1);
    });
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    const syncTimeline = () => {
      const node = trackRef.current;
      if (!node || !inViewRef.current) return;

      if (reducedMotion.matches) {
        node.style.setProperty('--progress', '1');
        applyActiveClasses(productFlow.length);
        return;
      }

      const rect = node.getBoundingClientRect();
      const trigger = window.innerHeight * 0.68;
      const nextProgress = Math.min(
        1,
        Math.max(0, (trigger - rect.top) / Math.max(rect.height, 1)),
      );
      node.style.setProperty('--progress', nextProgress.toFixed(4));

      const steps = productFlow.length;
      const nextActive = Math.min(
        steps,
        Math.max(0, Math.floor(nextProgress * steps + 0.08)),
      );
      applyActiveClasses(nextActive);
    };

    const scheduleSync = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(syncTimeline);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        inViewRef.current = entry.isIntersecting;
        if (entry.isIntersecting) scheduleSync();
      },
      { rootMargin: '120px 0px', threshold: 0 },
    );
    observer.observe(track);

    window.addEventListener('scroll', scheduleSync, { passive: true });
    window.addEventListener('resize', scheduleSync);
    reducedMotion.addEventListener('change', scheduleSync);
    scheduleSync();

    return () => {
      inViewRef.current = false;
      cancelAnimationFrame(rafRef.current);
      observer.disconnect();
      window.removeEventListener('scroll', scheduleSync);
      window.removeEventListener('resize', scheduleSync);
      reducedMotion.removeEventListener('change', scheduleSync);
    };
  }, []);

  return (
    <section className="section" id="product-demo" aria-labelledby="demo-title">
      <div className="container">
        <Reveal className="section-heading">
          <p className="eyebrow">הבוט בפעולה</p>
          <h2 id="demo-title">
            כך שיחה הופכת <span className="text-highlight">לליד רלוונטי</span>
          </h2>
          <p>
            בוט שיחות AI פותח שיחה, שואל, מזהה התעניינות ומעביר לצוות המכירות רק
            את מי שרלוונטי.
          </p>
        </Reveal>
        <div
          className="timeline"
          ref={trackRef}
          style={{ '--progress': 0 } as CSSProperties}
        >
          <div className="timeline-track" aria-hidden="true">
            <div className="timeline-track-fill" />
          </div>
          <ol className="timeline-list">
            {productFlow.map((step, index) => {
              const side = index % 2 === 0 ? 'right' : 'left';
              return (
                <li
                  className={`timeline-item timeline-item--${side}`}
                  key={step.title}
                  ref={(node) => {
                    itemRefs.current[index] = node;
                  }}
                >
                  <article className="timeline-card">
                    <h3>{step.title}</h3>
                    <p>{step.body}</p>
                  </article>
                  <div className="timeline-marker">
                    <span className="timeline-step">{step.eyebrow}</span>
                    <span className="timeline-dot" />
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

function Integrations() {
  return (
    <section className="section integrations" id="integrations" aria-labelledby="integrations-title">
      <div className="container split-grid">
        <Reveal className="section-copy">
          <p className="eyebrow">הטכנולוגיה</p>
          <h2 id="integrations-title">
            הטכנולוגיה שמאחורי <span className="text-highlight">השיחות</span>
          </h2>
          <p>
            פלטפורמת קוליד משתמשת בטכנולוגיית AI מתקדמת לניהול שיחות טבעיות, זיהוי
            הזדמנויות עסקיות וסינון לידים איכותיים.
          </p>
        </Reveal>
        <Reveal className="integration-cloud" delay aria-label="מערכות נתמכות">
          {integrations.map((name) => (
            <span key={name}>{name}</span>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

function PricingPreview() {
  return (
    <section
      className="section compact section-surface-purple pricing-section"
      id="pricing"
      aria-labelledby="pricing-title"
    >
      <Reveal className="container pricing-panel">
        <div>
          <p className="eyebrow">הדגמה</p>
          <h2 id="pricing-title">רוצים לראות איך הבוט עובד אצלכם?</h2>
          <p>
            המודל המסחרי יוצג בהדגמה, אחרי שנבין את תהליך המכירה ואת כמות הלידים.
          </p>
        </div>
        <SiteLeadCtas className="pricing-lead-ctas" formHref="#demo-form" />
      </Reveal>
    </section>
  );
}

function AboutSection() {
  return (
    <section className="section about-section" id="about" aria-labelledby="about-title">
      <div className="container about-grid">
        <Reveal className="about-copy section-copy">
          <p className="eyebrow">{about.eyebrow}</p>
          <h2 id="about-title">{about.title}</h2>
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
  );
}

function FaqSection() {
  return (
    <section className="section faq-section" id="faq" aria-labelledby="faq-title">
      <div className="container">
        <Reveal className="section-heading">
          <p className="eyebrow">{faqSection.eyebrow}</p>
          <h2 id="faq-title">{faqSection.title}</h2>
        </Reveal>
        <div className="faq-list faq-list-standalone">
          {faqs.map((item) => (
            <Reveal as="details" className="faq-item" key={item.question}>
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'offline' | 'error'>('idle');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const action = siteConfig.formActionUrl;

    if (!action) {
      setStatus('offline');
      form.querySelector<HTMLElement>('[data-form-status]')?.focus();
      return;
    }

    setStatus('sending');
    try {
      const body = new FormData(form);
      const response = await fetch(action, {
        method: 'POST',
        body,
        headers: { Accept: 'application/json' },
      });
      if (!response.ok) throw new Error('submit failed');
      setStatus('ok');
      form.reset();
    } catch {
      setStatus('error');
    }
    form.querySelector<HTMLElement>('[data-form-status]')?.focus();
  };

  return (
    <section className="section final-cta" id="demo-form" aria-labelledby="final-title">
      <div className="container final-grid">
        <Reveal className="section-copy">
          <p className="eyebrow">הדגמה</p>
          <h2 id="final-title">
            מוכנים להפוך לידים קרים <span className="text-highlight">ללקוחות</span>?
          </h2>
          <p>מלאו את הפרטים ונציג שלנו יחזור אליכם לתיאום הדגמה אישית של הבוט.</p>
        </Reveal>
        <Reveal
          as="form"
          className="demo-form"
          delay
          onSubmit={handleSubmit}
          action={siteConfig.formActionUrl ?? undefined}
          method="post"
        >
          <input type="hidden" name="_subject" value={`בקשת הדגמה — ${siteConfig.brandName}`} />
          {formFields.map((field) => {
            const meta = FORM_FIELD_ATTR[field] ?? {
              id: `field-${field}`,
              name: field,
            };
            const isOptional = field === 'הודעה';
            return (
              <label key={field} htmlFor={meta.id}>
                <span>{field}</span>
                <input
                  id={meta.id}
                  name={meta.name}
                  type={
                    field.includes('אימייל') ? 'email' : field.includes('טלפון') ? 'tel' : 'text'
                  }
                  inputMode={meta.inputMode}
                  autoComplete={meta.autoComplete}
                  placeholder={field.includes('אימייל') ? 'name@company.co.il' : field}
                  required={!isOptional}
                  aria-required={!isOptional}
                />
              </label>
            );
          })}
          <p className="form-privacy-note">
            שליחת הטופס מהווה פנייה לקבלת הדגמה. פרטים נוספים ב{' '}
            <a href="/privacy-policy">מדיניות הפרטיות</a>.
          </p>
          <p className="form-note">
            אפשר גם להתקשר:{' '}
            <a href={`tel:${siteConfig.contact.phoneE164}`}>{siteConfig.contact.phoneDisplay}</a>.
            זמינות 24/7.
          </p>
          <div
            className="form-status"
            data-form-status
            tabIndex={-1}
            role="status"
            aria-live="polite"
          >
            {status === 'offline' && (
              <>
                שליחת טופס אינה פעילה עדיין באתר. התקשרו או השאירו פרטים בטלפון:{' '}
                <a href={`tel:${siteConfig.contact.phoneE164}`}>
                  {siteConfig.contact.phoneDisplay}
                </a>
                .
              </>
            )}
            {status === 'ok' && 'הפרטים נשלחו. נחזור אליכם בהקדם.'}
            {status === 'error' && 'לא הצלחנו לשלוח. נסו שוב או התקשרו אלינו.'}
            {status === 'sending' && 'שולח…'}
          </div>
          <CtaStar className="cta-block" type="submit" disabled={status === 'sending'}>
            השאר פרטים
          </CtaStar>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <BrandLogo href="#top" compact />
        <div className="footer-links">
          <a href="#solutions">הפתרונות</a>
          <a href="/lead-warming">תגובה מיידית ללידים</a>
          <a href="/lead-warming#pricing">תמחור</a>
          <a href="/outbound-call-bot">שיחות יזומות</a>
          <a href="/ai-call-bots">בוטי שיחות AI</a>
          <a href="#about">אודות</a>
          <a href="#faq">שאלות</a>
          <a href="#demo-form">יצירת קשר</a>
          <a href="/privacy-policy">מדיניות פרטיות</a>
          <a href="/accessibility">הצהרת נגישות</a>
          <a href="/cookie-policy">מידע על עוגיות</a>
        </div>
        <p>
          © {new Date().getFullYear()} {siteConfig.brandName}. כל הזכויות שמורות.{' '}
          <a href={`tel:${siteConfig.contact.phoneE164}`}>{siteConfig.contact.phoneDisplay}</a> ·
          זמינות 24/7.
        </p>
      </div>
    </footer>
  );
}

