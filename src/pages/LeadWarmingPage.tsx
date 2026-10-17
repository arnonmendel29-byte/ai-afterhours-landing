import { instantLeadPricing } from '../callbotProducts';
import { leadWarmingFlow } from '../content';
import { LeadCtaStrip, SiteLeadCtas } from '../SiteLeadCtas';
import { siteConfig } from '../siteConfig';
import { ServicePageLayout, ServiceRelatedLinks } from './ServicePageLayout';
import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react';

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

function EssayScrollTimeline({ children }: { children: ReactNode }) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;

    const sync = () => {
      const node = trackRef.current;
      if (!node) return;
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
    };

    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(sync);
    };

    schedule();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    reduced.addEventListener('change', schedule);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      reduced.removeEventListener('change', schedule);
    };
  }, []);

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

export function LeadWarmingPage() {
  return (
    <ServicePageLayout
      path={PATH}
      currentPath={PATH}
      serviceName="Kolid Flash — תגובה מיידית ללידים"
    >
      <article className="essay">
        <div className="essay-waves">
          <header className="essay-band essay-band--open">
            <div className="essay-inner">
              <div className="essay-header">
                <h1 id="lw-hero-title">תגובה מיידית ללידים — אנחנו כבר על הקו</h1>
              </div>
              <p className="essay-lede">
                בוט קולי מבוסס AI שמתקשר ללידים חדשים באופן אוטומטי, מנהל שיחה ראשונית ומסייע
                לעסק להגיב בזמן ולנצל טוב יותר את ההזדמנויות שמגיעות מהשיווק.
              </p>
              <LeadCtaStrip align="start" className="essay-cta" />
            </div>
          </header>

          <section className="essay-band" aria-labelledby="lw-speed-title">
            <div className="essay-inner">
              <h2 id="lw-speed-title">ליד שהשאיר פרטים מצפה למענה</h2>
              <p>
                לקוח שהשאיר פרטים מצפה שיחזרו אליו. ככל שהמענה מתעכב, גדל הסיכון שהוא יאבד
                עניין או יפנה למקום אחר. בוט שמתקשר לפי ההגדרות שלכם פותח את השיחה בשלב הזה,
                כדי שההזדמנות לא תישאר ממתינה עד שנציג פנוי.
              </p>
            </div>
          </section>
        </div>

        <section className="essay-band essay-band--tint" id="how-it-works" aria-labelledby="lw-how-title">
          <div className="essay-inner">
            <h2 id="lw-how-title">מתהליך קצר: מפרטים — לשיחה — להמשך טיפול</h2>
            <p>
              השירות מתבסס על בוט שיחות שפועל לפי ההגדרות שלכם, יוצר קשר קולי עם הליד ואוסף
              מידע רלוונטי לפני שהנציג האנושי נכנס לתמונה.
            </p>
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
            <LeadCtaStrip align="start" className="essay-cta" />
          </div>
        </section>

        <section className="essay-band" aria-labelledby="lw-benefits-title">
          <div className="essay-inner">
            <h2 id="lw-benefits-title">יתרונות של תגובה מיידית ללידים</h2>
            {benefits.map((item) => (
              <div key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="essay-band essay-band--tint" aria-labelledby="lw-fit-title">
          <div className="essay-inner">
            <h2 id="lw-fit-title">דוגמאות לקהלים שבהם המענה המהיר רלוונטי</h2>
            <p>
              הרשימה מתארת קהלי יעד אפשריים. היא לא קובעת שכל סוג עסק נתמך, ולא מחליפה
              בדיקה של תהליך העבודה אצלכם.
            </p>
            {audiences.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </div>
        </section>

        <section className="essay-band" id="pricing" aria-labelledby="lw-pricing-title">
          <div className="essay-inner">
            <h2 id="lw-pricing-title">{instantLeadPricing.title}</h2>
            {instantLeadPricing.plans.map((plan) => (
              <div key={plan.id}>
                <h3>{plan.name}</h3>
                <p>
                  {plan.priceLabel}. {plan.description}
                </p>
                {plan.features.length > 0 ? (
                  plan.features.map((feature) => <p key={feature}>{feature}</p>)
                ) : (
                  <p>{plan.featuresPendingNote}</p>
                )}
                <p>
                  <a href={plan.ctaHref}>{plan.ctaLabel}</a>
                </p>
              </div>
            ))}
            <p>{instantLeadPricing.footnote}</p>
          </div>
        </section>

        <section className="essay-band essay-band--tint">
          <div className="essay-inner">
            <h2>מחפשים ליצור קשר עם לידים קרים או רשימות קיימות?</h2>
            <p>
              לשיחות יזומות ולחימום רשימות יש פתרון נפרד — Kolid Spark, בוט שיוצא לשיחה ומסנן
              עניין לפני שהנציג נכנס. <a href="/outbound-call-bot">לפרטים על Kolid Spark</a>
            </p>
          </div>
        </section>

        <section className="essay-band essay-band--close" aria-labelledby="lw-cta-title">
          <div className="essay-inner">
            <h2 id="lw-cta-title">רוצים לראות איך Kolid Flash עובד אצלכם?</h2>
            <p>
              השאירו פרטים, או התקשרו ל־
              <a href={`tel:${siteConfig.contact.phoneE164}`}>{siteConfig.contact.phoneDisplay}</a>
              . נציג של {siteConfig.brandName} יחזור לתיאום.
            </p>
            <LeadCtaStrip align="start" className="essay-cta essay-cta--page-end" />
          </div>
        </section>
      </article>

      <ServiceRelatedLinks exclude={PATH} />
    </ServicePageLayout>
  );
}
