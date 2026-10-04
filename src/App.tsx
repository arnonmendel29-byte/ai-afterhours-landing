import {
  about,
  faqSection,
  faqs,
  formFields,
  integrations,
  navItems,
  productFlow,
} from './content';
import { PillarsSection } from './PillarsSection';
import { useEffect, useRef, useState, type CSSProperties, type FormEvent } from 'react';

function App() {
  return (
    <div className="site-shell">
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
      <main>
        <div className="grid-band">
          <Problem />
          <ProductDemo />
        </div>
        <PillarsSection />
        <Integrations />
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
  return (
    <header className="site-header" aria-label="ניווט ראשי">
      <a className="brand" href="#top" aria-label="קוליד">
        קוליד
      </a>
      <div className="header-end">
        <nav className="desktop-nav" aria-label="קישורי עמוד">
          {navItems.map((item) => (
            <a href={item.href} key={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <a className="hero-btn header-cta" href="#demo-form">
          דבר איתנו
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero-layout">
        <div className="hero-phones">
          <img
            className="hero-robot"
            src="/hero-robot.png"
            alt="איור של בוט שיחות AI של קוליד"
            width={560}
            height={560}
            decoding="async"
            fetchPriority="high"
          />
        </div>
        <div className="hero-copy">
          <h1 id="hero-title">
            הבוט שמדבר
            <br />
            עם הלידים שלך
            <br />
            <span className="hero-accent">ומביא לקוחות</span>
          </h1>
          <p className="hero-lede">
            בוט שיחות מבוסס AI שמנהל שיחות טבעיות עם הלידים שלך, מסנן את
            המתעניינים ומעביר לצוות המכירות רק את מי שבאמת רלוונטי.
          </p>
          <a className="hero-btn" href="#demo-form">
            קבל הדגמה
          </a>
        </div>
      </div>
    </section>
  );
}

function Problem() {
  return (
    <section className="section problem" aria-labelledby="problem-title">
      <div className="container split-grid">
        <div className="section-copy reveal">
          <p className="eyebrow">הבעיה</p>
          <h2 id="problem-title">
            צוות המכירות מבזבז זמן על{' '}
            <span className="text-highlight">לידים קרים</span>.
          </h2>
        </div>
        <div className="problem-flow reveal delay-1" aria-label="איך זמן מכירה מתבזבז">
          <span>ליד נכנס בלי סינון</span>
          <i />
          <span>שיחה עם מי שלא בשל</span>
          <i />
          <span>הזמן של הצוות מתבזבז</span>
        </div>
      </div>
    </section>
  );
}

function ProductDemo() {
  const trackRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Array<HTMLLIElement | null>>([]);
  const activeRef = useRef(0);
  const [activeCount, setActiveCount] = useState(0);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    let scrollEndTimer = 0;

    const update = () => {
      const track = trackRef.current;
      if (!track) return;

      if (reducedMotion.matches) {
        track.style.setProperty('--progress', '1');
        if (activeRef.current !== productFlow.length) {
          activeRef.current = productFlow.length;
          setActiveCount(productFlow.length);
        }
        return;
      }

      const rect = track.getBoundingClientRect();
      const trigger = window.innerHeight * 0.7;
      const nextProgress = Math.min(
        1,
        Math.max(0, (trigger - rect.top) / Math.max(rect.height, 1)),
      );
      track.style.setProperty('--progress', nextProgress.toFixed(4));

      let nextActive = 0;
      itemRefs.current.forEach((item, index) => {
        if (!item) return;
        const marker = item.querySelector('.timeline-dot');
        const bounds = (marker ?? item).getBoundingClientRect();
        if (bounds.top + bounds.height / 2 <= trigger + 12) {
          nextActive = index + 1;
        }
      });

      if (nextActive !== activeRef.current) {
        activeRef.current = nextActive;
        setActiveCount(nextActive);
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
      window.clearTimeout(scrollEndTimer);
      scrollEndTimer = window.setTimeout(() => {
        requestAnimationFrame(update);
      }, 140);
    };

    update();
    const startup = requestAnimationFrame(() => {
      requestAnimationFrame(update);
    });
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    reducedMotion.addEventListener('change', onScroll);

    return () => {
      cancelAnimationFrame(frame);
      cancelAnimationFrame(startup);
      window.clearTimeout(scrollEndTimer);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      reducedMotion.removeEventListener('change', onScroll);
    };
  }, []);

  return (
    <section className="section" id="product-demo" aria-labelledby="demo-title">
      <div className="container">
        <div className="section-heading reveal">
          <p className="eyebrow">הבוט בפעולה</p>
          <h2 id="demo-title">
            כך שיחה הופכת <span className="text-highlight">לליד רלוונטי</span>
          </h2>
          <p>
            בוט שיחות AI פותח שיחה, שואל, מזהה התעניינות ומעביר לצוות המכירות רק
            את מי שרלוונטי.
          </p>
        </div>
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
              const isActive = index < activeCount;
              const isCurrent = activeCount > 0 && index === activeCount - 1;
              return (
                <li
                  className={`timeline-item timeline-item--${side}${isActive ? ' is-active' : ''}${isCurrent ? ' is-current' : ''}`}
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
        <div className="section-copy reveal">
          <p className="eyebrow">הטכנולוגיה</p>
          <h2 id="integrations-title">
            הטכנולוגיה שמאחורי <span className="text-highlight">השיחות</span>
          </h2>
          <p>
            פלטפורמת קוליד משתמשת בטכנולוגיית AI מתקדמת לניהול שיחות טבעיות, זיהוי
            הזדמנויות עסקיות וסינון לידים איכותיים.
          </p>
        </div>
        <div className="integration-cloud reveal delay-1" aria-label="מערכות נתמכות">
          {integrations.map((name) => (
            <span key={name}>{name}</span>
          ))}
        </div>
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
      <div className="container pricing-panel reveal">
        <div>
          <p className="eyebrow">הדגמה</p>
          <h2 id="pricing-title">רוצים לראות איך הבוט עובד אצלכם?</h2>
          <p>
            המודל המסחרי יוצג בהדגמה, אחרי שנבין את תהליך המכירה ואת כמות הלידים.
          </p>
        </div>
        <a className="button button-secondary" href="#demo-form">
          קבל הדגמה
        </a>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section className="section about-section" id="about" aria-labelledby="about-title">
      <div className="container about-grid">
        <div className="about-copy section-copy reveal">
          <p className="eyebrow">{about.eyebrow}</p>
          <h2 id="about-title">{about.title}</h2>
          <div className="about-founder">
            <h3>{about.name}</h3>
            <p>{about.role}</p>
          </div>
          {about.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <figure className="about-portrait reveal delay-1">
          <img
            src="/niv-ashour.png"
            alt={about.portraitAlt}
            width={420}
            height={525}
            sizes="(max-width: 767px) min(100vw - 48px, 320px), (max-width: 1023px) 360px, 400px"
            loading="lazy"
            decoding="async"
          />
        </figure>
      </div>
    </section>
  );
}

function FaqSection() {
  return (
    <section className="section faq-section" id="faq" aria-labelledby="faq-title">
      <div className="container">
        <div className="section-heading reveal">
          <p className="eyebrow">{faqSection.eyebrow}</p>
          <h2 id="faq-title">{faqSection.title}</h2>
        </div>
        <div className="faq-list faq-list-standalone">
          {faqs.map((item) => (
            <details className="faq-item reveal" key={item.question}>
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <section className="section final-cta" id="demo-form" aria-labelledby="final-title">
      <div className="container final-grid">
        <div className="section-copy reveal">
          <p className="eyebrow">הדגמה</p>
          <h2 id="final-title">
            מוכנים להפוך לידים קרים <span className="text-highlight">ללקוחות</span>?
          </h2>
          <p>מלאו את הפרטים ונציג שלנו יחזור אליכם לתיאום הדגמה אישית של הבוט.</p>
        </div>
        <form className="demo-form reveal delay-1" onSubmit={handleSubmit}>
          {formFields.map((field) => (
            <label key={field}>
              <span>{field}</span>
              <input
                type={
                  field.includes('אימייל') ? 'email' : field.includes('טלפון') ? 'tel' : 'text'
                }
                placeholder={field.includes('אימייל') ? 'name@company.co.il' : field}
                required={field !== 'הודעה'}
              />
            </label>
          ))}
          <p className="form-note">אפשר גם להתקשר: 054-4460533. זמינות 24/7.</p>
          <button className="button button-primary" type="submit">
            קבל הדגמה
          </button>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <a className="brand" href="#top" aria-label="קוליד">
          <span className="brand-mark">ק</span>
          <span>קוליד</span>
        </a>
        <div className="footer-links">
          <a href="#product-demo">איך זה עובד</a>
          <a href="#use-cases">יתרונות</a>
          <a href="#faq">שאלות</a>
          <a href="#demo-form">יצירת קשר</a>
        </div>
        <p>© 2026 קוליד. כל הזכויות שמורות. 054-4460533 · זמינות 24/7.</p>
      </div>
    </footer>
  );
}

export default App;
