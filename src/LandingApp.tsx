import {
  faqSection,
  faqs,
  integrations,
  productFlow,
} from './content';
import { SiteHeader } from './SiteHeader';
import { HomeProductsSection } from './HomeProductsSection';
import { Reveal } from './Reveal';
import { SiteLeadCtas, WhatsAppLeadButton } from './SiteLeadCtas';
import { BrandLogo } from './BrandLogo';
import GradientText from './GradientText';
import { siteConfig } from './siteConfig';
import { applyDocumentMeta } from './seo/documentMeta';
import { buildHomeJsonLd, getSeoPage } from './seo/pages';
import { LeadDemoFormSection } from './LeadDemoFormSection';
import { isLeadFormHash, scrollToLeadForm, scrollToLeadFormWhenReady } from './leadForm';
import { lazy, Suspense, useEffect, useRef, useState, type CSSProperties } from 'react';

const PillarsSection = lazy(() =>
  import('./PillarsSection').then((module) => ({ default: module.PillarsSection })),
);

export default function LandingApp() {
  useEffect(() => {
    applyDocumentMeta({
      page: getSeoPage('/'),
      jsonLd: buildHomeJsonLd(),
    });
  }, []);

  useEffect(() => {
    const cancelReadyScroll = scrollToLeadFormWhenReady();
    const onHashChange = () => {
      if (isLeadFormHash()) {
        scrollToLeadForm();
      }
    };
    window.addEventListener('hashchange', onHashChange);
    return () => {
      cancelReadyScroll();
      window.removeEventListener('hashchange', onHashChange);
    };
  }, []);

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">
        דילוג לתוכן הראשי
      </a>
      <div className="hero-stage">
        <div className="hero-card">
          <svg className="hero-blob" viewBox="0 0 1000 1000" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <linearGradient id="hero-blob-fill" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
                <stop offset="0%" stopColor="#9333EA" />
                <stop offset="55%" stopColor="#9333EA" />
                <stop offset="70%" stopColor="#9333EA" stopOpacity="0.75" />
                <stop offset="82%" stopColor="#9333EA" stopOpacity="0.35" />
                <stop offset="92%" stopColor="#9333EA" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#9333EA" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              fill="url(#hero-blob-fill)"
              d="M1000 0v1000H470C640 980 580 820 710 700c130-120 40-170 160-280C980 300 920 90 1000 0Z"
            />
          </svg>
          <SiteHeader home currentPath="/" />
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
        <FaqSection />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}

function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero-layout">
        <div className="hero-phones">
          <picture>
            <source
              media="(max-width: 767px)"
              srcSet="/hero-robot-mobile.webp"
              type="image/webp"
            />
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
            הבוט הקולי שהופך
            <br />
            <GradientText
              className="hero-accent"
              colors={['#5227FF', '#FF9FFC', '#B497CF']}
              animationSpeed={8}
              variant="linear"
              glow={0}
            >
              לידים ללקוחות
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
          <div className="timeline-cta">
            <WhatsAppLeadButton>דברו איתנו בוואטסאפ</WhatsAppLeadButton>
          </div>
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
  return (
    <section className="section final-cta" id="demo-form" aria-labelledby="final-title">
      <div className="container final-grid">
        <LeadDemoFormSection />
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <Reveal className="container footer-inner" variant="fade">
        <BrandLogo href="#top" compact />
        <div className="footer-links">
          <a href="#solutions">הפתרונות</a>
          <a href="/lead-warming">תגובה מיידית — Kolid Flash</a>
          <a href="/lead-warming#pricing">תמחור Kolid Flash</a>
          <a href="/outbound-call-bot">שיחות יזומות — Kolid Spark</a>
          <a href="/ai-call-bots">מדריך בוטי שיחות AI</a>
          <a href="/about">אודות</a>
          <a href="#faq">שאלות</a>
          <a href="#demo-form">יצירת קשר</a>
          <a href="/privacy-policy">מדיניות פרטיות</a>
          <a href="/accessibility">הצהרת נגישות</a>
          <a href="/cookie-policy">מידע על עוגיות</a>
        </div>
        <p>
          © {new Date().getFullYear()} {siteConfig.brandName}. כל הזכויות שמורות.{' '}
          <a href={`tel:${siteConfig.contact.phoneE164}`}>{siteConfig.contact.phoneDisplay}</a>.
        </p>
      </Reveal>
    </footer>
  );
}

