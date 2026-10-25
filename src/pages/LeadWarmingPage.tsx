import { leadWarmingFlow } from '../content';
import { FlashTryDialog } from '../FlashTryDialog';
import { LEAD_FORM_ID, isLeadFormHash, scrollToLeadForm, scrollToLeadFormWhenReady } from '../leadForm';
import { LeadDemoFormSection } from '../LeadDemoFormSection';
import { FLASH_TRY_CTA_LABEL, FlashTryLeadButton, LeadCtaStrip } from '../SiteLeadCtas';
import { useInViewScrollSync } from '../useInViewScrollSync';
import { ServicePageLayout } from './ServicePageLayout';
import { useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';

const PATH = '/lead-warming';

const benefits = [
  {
    title: 'תגובה אוטומטית ומהירה',
    body: 'הבוט יוצר קשר עם ליד חדש בלי להמתין שנציג יתפנה.',
  },
  {
    title: 'זמינות לפי ההגדרות',
    body: 'אופן הפנייה והזמינות נקבעים לפי הכללים שתגדירו במערכת.',
  },
  {
    title: 'פחות פניות שנשארות בלי מענה',
    body: 'מענה קולי בשלב מוקדם מצמצם את הסיכון שפנייה תישאר בלי טיפול.',
  },
  {
    title: 'תשאול ראשוני',
    body: 'השיחה אוספת מידע על הצורך של הלקוח לפני שהצוות ממשיך.',
  },
  {
    title: 'העברה מסודרת לצוות',
    body: 'המידע מהשיחה זמין להמשך תהליך המכירה אצלכם.',
  },
  {
    title: 'ניצול הפניות מהשיווק',
    body: 'ליד שכבר הגיע מפרסום מקבל שיחה ראשונית במקום להמתין.',
  },
];

const audiences = [
  'עסקים שמקבלים פניות מקמפיינים ממומנים.',
  'עסקים שמשתמשים בדפי נחיתה לאיסוף לידים.',
  'חברות עם צוותי מכירות שמטפלים בכמות גדולה של פניות.',
  'עסקים שרוצים לשפר את מהירות התגובה לפניות חדשות.',
];

const flashHeroSteps = [
  { number: '01', title: 'ליד חדש', body: 'הפרטים התקבלו' },
  { number: '02', title: 'Kolid Flash מתקשר', body: 'שיחה יוצאת' },
  { number: '03', title: 'הבוט מנהל את השיחה', body: 'שיחה טבעית עם הלקוח' },
  { number: '04', title: 'הלקוח מגלה עניין', body: 'הזדמנות עסקית עוברת אליכם' },
];

const flashPhoneMessages = ['ליד חדש', 'מתקשר', 'מנהל שיחה', 'מגלה עניין'];

function EssayScrollTimeline({ children }: { children: ReactNode }) {
  const trackRef = useRef<HTMLDivElement>(null);

  const syncTimeline = useCallback(() => {
    const node = trackRef.current;
    if (!node) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const reduceMotion =
      reduced.matches || document.documentElement.classList.contains('a11y-reduce-motion');
    if (reduceMotion) {
      node.style.setProperty('--progress', '1');
      return;
    }

    const rect = node.getBoundingClientRect();
    const start = window.innerHeight * 0.72;
    const progress = Math.min(1, Math.max(0, (start - rect.top) / Math.max(rect.height, 1)));
    node.style.setProperty('--progress', progress.toFixed(4));
  }, []);

  useInViewScrollSync(trackRef, syncTimeline);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => syncTimeline();
    reduced.addEventListener('change', onChange);
    syncTimeline();
    return () => reduced.removeEventListener('change', onChange);
  }, [syncTimeline]);

  return (
    <div
      className="essay-timeline"
      ref={trackRef}
      style={{ '--progress': 0 } as CSSProperties}
    >
      <div className="essay-timeline__track" aria-hidden="true">
        <div className="essay-timeline__fill" />
      </div>
      {children}
    </div>
  );
}

function FlashHeroVisual() {
  return (
    <div className="flash-hero-visual" aria-label="המחשה של תהליך Kolid Flash">
      <div className="flash-phone-card" aria-hidden="true">
        <div className="flash-phone-speaker" />
        <div className="flash-phone-screen">
          <span className="flash-phone-brand">Kolid Flash</span>
          <div className="flash-phone-status">
            {flashPhoneMessages.map((message) => (
              <span key={message}>{message}</span>
            ))}
          </div>
          <div className="flash-phone-waves">
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
        </div>
      </div>

      <ol className="flash-hero-steps">
        {flashHeroSteps.map((step) => (
          <li key={step.number}>
            <span>{step.number}</span>
            <strong>{step.title}</strong>
            <em>{step.body}</em>
          </li>
        ))}
      </ol>
    </div>
  );
}

const flashTryAction = {
  label: FLASH_TRY_CTA_LABEL,
  variant: 'flash-try' as const,
};

export function LeadWarmingPage() {
  const [tryOpen, setTryOpen] = useState(false);
  const openTry = useCallback(() => setTryOpen(true), []);
  const closeTry = useCallback(() => setTryOpen(false), []);
  const secondaryAction = { ...flashTryAction, onClick: openTry };

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
    <ServicePageLayout path={PATH} currentPath={PATH}>
      <article className="essay essay--flash">
        <header className="essay-band essay-band--open flash-hero">
          <div className="essay-inner flash-hero__grid">
            <div className="flash-hero__copy">
              <div className="essay-header">
                <h1 id="lw-hero-title">
                  <span className="flash-hero__title-line">תגובה מיידית ללידים</span>{' '}
                  <span className="flash-hero__title-line">אנחנו כבר על הקו</span>
                </h1>
              </div>
              <div className="flash-hero__aside">
                <p className="essay-lede">
                  בוט קולי מבוסס AI שמתקשר ללידים חדשים באופן אוטומטי, מנהל שיחה ראשונית ומסייע
                  לעסק להגיב בזמן ולנצל טוב יותר את ההזדמנויות שמגיעות מהשיווק.
                </p>
                <LeadCtaStrip align="start" className="essay-cta" secondaryAction={secondaryAction} />
              </div>
            </div>
            <FlashHeroVisual />
          </div>
        </header>

        <section className="essay-band flash-split" aria-labelledby="lw-speed-title">
          <div className="essay-inner flash-split__grid">
            <h2 id="lw-speed-title">ליד שהשאיר פרטים מצפה למענה</h2>
            <p>
              לקוח שהשאיר פרטים מצפה שיחזרו אליו. ככל שהמענה מתעכב, גדל הסיכון שהוא יאבד
              עניין או יפנה למקום אחר. בוט שמתקשר לפי ההגדרות שלכם פותח את השיחה בשלב הזה,
              כדי שההזדמנות לא תישאר ממתינה עד שנציג פנוי.
            </p>
          </div>
        </section>

        <section className="essay-band essay-band--tint flash-process" id="how-it-works" aria-labelledby="lw-how-title">
          <div className="essay-inner">
            <div className="flash-process__intro">
              <h2 id="lw-how-title">מתהליך קצר: מפרטים — לשיחה — להמשך טיפול</h2>
              <p>
                השירות מתבסס על בוט שיחות שפועל לפי ההגדרות שלכם, יוצר קשר קולי עם הליד ואוסף
                מידע רלוונטי לפני שהנציג האנושי נכנס לתמונה.
              </p>
            </div>
            <EssayScrollTimeline>
              {leadWarmingFlow.map((step) => (
                <div className="essay-timeline__item" key={step.number}>
                  <span className="essay-timeline__dot" aria-hidden="true" />
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                  {step.href && step.linkLabel ? (
                    <p>
                      <a href={step.href}>{step.linkLabel}</a>
                    </p>
                  ) : null}
                </div>
              ))}
            </EssayScrollTimeline>
            <LeadCtaStrip align="start" className="essay-cta" secondaryAction={secondaryAction} />
          </div>
        </section>

        <section className="essay-band flash-benefits" aria-labelledby="lw-benefits-title">
          <div className="essay-inner">
            <h2 id="lw-benefits-title">יתרונות של תגובה מיידית ללידים</h2>
            <div className="flash-benefit-list">
              {benefits.map((item) => (
                <div className="flash-benefit" key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="essay-band essay-band--tint flash-audiences" aria-labelledby="lw-fit-title">
          <div className="essay-inner flash-audiences__grid">
            <div className="flash-audiences__copy">
              <h2 id="lw-fit-title">דוגמאות לקהלים שבהם המענה המהיר רלוונטי</h2>
              <p>
                הרשימה מתארת קהלי יעד אפשריים. היא לא קובעת שכל סוג עסק נתמך, ולא מחליפה
                בדיקה של תהליך העבודה אצלכם.
              </p>
              <div className="flash-audiences__cta">
                <FlashTryLeadButton onClick={openTry} />
              </div>
            </div>
            <div className="flash-audience-list">
              {audiences.map((item) => (
                <p key={item}>{item}</p>
              ))}
            </div>
          </div>
        </section>

        <section className="essay-band flash-bridge">
          <div className="essay-inner flash-bridge__grid">
            <h2>מחפשים ליצור קשר עם לידים קרים או רשימות קיימות?</h2>
            <p>
              לשיחות יזומות ולחימום רשימות יש פתרון נפרד — Kolid Spark, בוט שיוצא לשיחה ומסנן
              עניין לפני שהנציג נכנס. <a href="/outbound-call-bot/">לפרטים על Kolid Spark</a>
            </p>
          </div>
        </section>

        <section
          className="essay-band essay-band--close flash-close flash-lead-form final-cta"
          id={LEAD_FORM_ID}
          aria-labelledby="lw-final-title"
        >
          <div className="essay-inner final-grid">
            <LeadDemoFormSection titleId="lw-final-title" fieldIdPrefix="lw-" />
          </div>
        </section>
      </article>

      <FlashTryDialog open={tryOpen} onClose={closeTry} />
    </ServicePageLayout>
  );
}
