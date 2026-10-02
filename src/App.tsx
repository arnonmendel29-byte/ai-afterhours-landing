import {
  faqs,
  formFields,
  integrations,
  productFlow,
  useCases,
} from './content';
import { useEffect, useRef, useState, type CSSProperties, type FormEvent } from 'react';

function App() {
  return (
    <div className="site-shell">
      <div className="hero-stage">
        <div className="hero-card">
          <svg className="hero-blob" viewBox="0 0 1000 1000" preserveAspectRatio="none" aria-hidden="true">
            <path
              fill="#1E4BD8"
              d="M1000 0v1000H470C640 980 580 820 710 700c130-120 40-170 160-280C980 300 920 90 1000 0Z"
            />
          </svg>
          <Header />
          <Hero />
        </div>
      </div>
      <main>
        <Problem />
        <ProductDemo />
        <UseCases />
        <Integrations />
        <PricingPreview />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="site-header" aria-label="ניווט ראשי">
      <a className="brand" href="#top" aria-label="LOGO">
        LOGO
      </a>
      <div className="header-end">
        <nav className="desktop-nav" aria-label="קישורי עמוד">
          <a href="#top">עמוד הבית</a>
          <a href="#product-demo">אודות</a>
          <a href="#use-cases">פרויקטים</a>
          <a href="#demo-form">צור קשר</a>
        </nav>
        <a className="hero-btn header-cta" href="#demo-form">
          דברו איתנו
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero-layout">
        <div className="hero-phones" aria-hidden="true">
          <img
            className="hero-robot"
            src="/hero-robot.png"
            alt=""
            width={560}
            height={560}
            decoding="async"
          />
        </div>
        <div className="hero-copy">
          <h1 id="hero-title">
            אתרים
            <br />
            שמעוררים
            <br />
            <span className="hero-accent">לחיים</span>
          </h1>
          <p className="hero-lede">
            הדגמות לבני אתרים – אלגנטיות, סטוריטלינג, ויזואליזציה וכל מה
            שצריך לדעת כדי לבנות אווירה פרימיום אנרגטית לאלגוריתמים
          </p>
          <a className="hero-btn" href="#demo-form">
            דברו איתנו
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
            שיחה שלא נענתה היא לא רק פספוס. היא{' '}
            <span className="text-highlight">לקוח אבוד</span>.
          </h2>
        </div>
        <div className="problem-flow reveal delay-1" aria-label="זרימת פספוס שיחה">
          <span>שיחה אחרי שעות הפעילות</span>
          <i />
          <span>אין מענה</span>
          <i />
          <span>הלקוח עובר למתחרה</span>
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
          <p className="eyebrow">Product Demo</p>
          <h2 id="demo-title">
            כך שיחה הופכת <span className="text-highlight">לליד שאפשר לטפל בו</span>
          </h2>
          <p>
            במקום לדבר על AI, הדמו מראה את ההתנהגות של המוצר: מענה, הבנה, איסוף
            פרטים והעברה לתהליך הקיים.
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

function UseCases() {
  return (
    <section className="section" id="use-cases" aria-labelledby="use-cases-title">
      <div className="container">
        <div className="section-heading reveal">
          <p className="eyebrow">Use Cases</p>
          <h2 id="use-cases-title">אותו מוצר, בעיות שונות לכל עסק</h2>
        </div>
        <div className="use-case-list">
          {useCases.map((item) => (
            <article className="use-case-row reveal" key={item.name}>
              <h3>{item.name}</h3>
              <p>{item.pain}</p>
              <strong>{item.result}</strong>
            </article>
          ))}
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
          <p className="eyebrow">Integrations</p>
          <h2 id="integrations-title">
            מתחבר ל<span className="text-highlight">תהליך הקיים שלך</span>
          </h2>
          <p>
            המטרה היא לא להוסיף עוד מערכת לצוות, אלא להעביר כל ליד למקום שבו כבר
            מנהלים עבודה ומכירות.
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
    <section className="section compact" id="pricing" aria-labelledby="pricing-title">
      <div className="container pricing-panel reveal">
        <div>
          <p className="eyebrow">Pricing Preview</p>
          <h2 id="pricing-title">תמחור לפי שיחה, בלי להמציא חבילות לפני שיש נתונים</h2>
          <p>
            הבריף מגדיר מודל per-call. המחירים, המגבלות ומה כלול בכל מסלול יוצגו
            רק אחרי אישור עסקי.
          </p>
        </div>
        <a className="button button-secondary" href="#demo-form">
          דברו איתי על תמחור
        </a>
      </div>
    </section>
  );
}

function Faq() {
  return (
    <section className="section" id="faq" aria-labelledby="faq-title">
      <div className="container faq-grid">
        <div className="section-copy reveal">
          <p className="eyebrow">FAQ</p>
          <h2 id="faq-title">שאלות שמורידות חסמים לפני הדמו</h2>
        </div>
        <div className="faq-list">
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
          <p className="eyebrow">Demo של 15 דקות</p>
          <h2 id="final-title">
            ראה איך זה נשמע כשהבוט{' '}
            <span className="text-highlight">עונה ללקוחות שלך בעברית</span>
          </h2>
          <p>
            השאר פרטים ונחזור עם דמו ממוקד לתרחיש העסקי שלך. אימייל עסקי נדרש
            כדי להתאים את ההדגמה לחברה.
          </p>
        </div>
        <form className="demo-form reveal delay-1" onSubmit={handleSubmit}>
          {formFields.map((field) => (
            <label key={field}>
              <span>{field}</span>
              <input
                type={field.includes('אימייל') ? 'email' : 'text'}
                placeholder={field.includes('אימייל') ? 'name@company.co.il' : field}
                required
              />
            </label>
          ))}
          <p className="form-note">נא להשתמש באימייל עסקי. Gmail/פרטי ייבדק ידנית.</p>
          <button className="button button-primary" type="submit">
            הזמן דמו של 15 דקות
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
        <a className="brand" href="#top" aria-label="AI AfterHours">
          <span className="brand-mark">AI</span>
          <span>AfterHours</span>
        </a>
        <div className="footer-links">
          <a href="#product-demo">המוצר</a>
          <a href="#pricing">תמחור</a>
          <a href="#faq">שאלות</a>
          <a href="#demo-form">יצירת קשר</a>
        </div>
        <p>© 2026 AI AfterHours. כל הזכויות שמורות.</p>
      </div>
    </footer>
  );
}

export default App;
