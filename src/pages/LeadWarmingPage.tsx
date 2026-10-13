import { instantLeadPricing } from '../callbotProducts';
import { leadWarmingFlow } from '../content';
import { RoadmapScrollSection } from '../RoadmapScrollSection';
import { LeadCtaStrip, SiteLeadCtas } from '../SiteLeadCtas';
import { Reveal } from '../Reveal';
import { CtaStar } from '../StarBorder';
import { siteConfig } from '../siteConfig';
import { ServiceCrossSell, ServicePageLayout, ServiceRelatedLinks } from './ServicePageLayout';

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

function staggerStep(index: number): 0 | 1 | 2 {
  return (index % 3) as 0 | 1 | 2;
}

export function LeadWarmingPage() {
  return (
    <ServicePageLayout
      path={PATH}
      currentPath={PATH}
      serviceName="Kolid Flash — תגובה מיידית ללידים"
    >
      <section className="svc-hero" aria-labelledby="lw-hero-title">
        <div className="container svc-hero-inner">
          <Reveal>
            <p className="svc-eyebrow">הפתרון המרכזי · Kolid Flash</p>
            <h1 id="lw-hero-title">תגובה מיידית ללידים — אנחנו כבר על הקו</h1>
            <p className="svc-lede">
              בוט קולי מבוסס AI שמתקשר ללידים חדשים באופן אוטומטי, מנהל שיחה ראשונית ומסייע
              לעסק להגיב בזמן ולנצל טוב יותר את ההזדמנויות שמגיעות מהשיווק.
            </p>
          </Reveal>
          <Reveal delay>
            <div className="svc-hero-actions svc-hero-actions--lead">
              <SiteLeadCtas />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="svc-section" aria-labelledby="lw-speed-title">
        <div className="container">
          <Reveal className="svc-section-head">
            <p className="svc-eyebrow">למה המהירות חשובה</p>
            <h2 id="lw-speed-title">ליד שהשאיר פרטים מצפה למענה</h2>
            <p>
              לקוח שהשאיר פרטים מצפה שיחזרו אליו. ככל שהמענה מתעכב, גדל הסיכון שהוא יאבד
              עניין או יפנה למקום אחר. בוט שמתקשר לפי ההגדרות שלכם פותח את השיחה בשלב הזה,
              כדי שההזדמנות לא תישאר ממתינה עד שנציג פנוי.
            </p>
          </Reveal>
        </div>
      </section>

      <RoadmapScrollSection
        id="how-it-works"
        ariaLabelledBy="lw-how-title"
        eyebrow="איך זה עובד"
        title="מתהליך קצר: מפרטים — לשיחה — להמשך טיפול"
        intro="השירות מתבסס על בוט שיחות שפועל לפי ההגדרות שלכם, יוצר קשר קולי עם הליד ואוסף מידע רלוונטי לפני שהנציג האנושי נכנס לתמונה."
        stages={leadWarmingFlow}
      />

      <div className="container">
        <Reveal variant="fade">
          <LeadCtaStrip />
        </Reveal>
      </div>

      <section className="svc-section" aria-labelledby="lw-benefits-title">
        <div className="container">
          <Reveal className="svc-section-head">
            <p className="svc-eyebrow">יתרונות</p>
            <h2 id="lw-benefits-title">יתרונות של תגובה מיידית ללידים</h2>
          </Reveal>
          <div className="svc-grid-2">
            {benefits.map((item, index) => (
              <Reveal
                as="article"
                className="svc-card"
                key={item.title}
                delayStep={staggerStep(index)}
              >
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="svc-section svc-section--soft" aria-labelledby="lw-fit-title">
        <div className="container">
          <Reveal className="svc-section-head">
            <p className="svc-eyebrow">למי זה מתאים</p>
            <h2 id="lw-fit-title">דוגמאות לקהלים שבהם המענה המהיר רלוונטי</h2>
            <p>
              הרשימה מתארת קהלי יעד אפשריים. היא לא קובעת שכל סוג עסק נתמך, ולא מחליפה
              בדיקה של תהליך העבודה אצלכם.
            </p>
          </Reveal>
          <Reveal as="ul" className="svc-audience" delay>
            {audiences.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="svc-section" id="pricing" aria-labelledby="lw-pricing-title">
        <div className="container">
          <Reveal className="svc-section-head">
            <p className="svc-eyebrow">{instantLeadPricing.eyebrow}</p>
            <h2 id="lw-pricing-title">{instantLeadPricing.title}</h2>
          </Reveal>
          <div className="svc-pricing">
            {instantLeadPricing.plans.map((plan, index) => (
              <Reveal
                as="article"
                className="svc-plan"
                key={plan.id}
                delayStep={staggerStep(index)}
              >
                <h3>{plan.name}</h3>
                <p className="svc-plan-price">{plan.priceLabel}</p>
                <p className="svc-plan-desc">{plan.description}</p>
                {plan.features.length > 0 ? (
                  <ul className="svc-plan-features">
                    {plan.features.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="svc-plan-pending">{plan.featuresPendingNote}</p>
                )}
                <CtaStar as="a" className="cta-block" href={plan.ctaHref}>
                  {plan.ctaLabel}
                </CtaStar>
              </Reveal>
            ))}
          </div>
          <Reveal variant="fade" delay>
            <p className="svc-pricing-note">{instantLeadPricing.footnote}</p>
          </Reveal>
        </div>
      </section>

      <ServiceCrossSell
        title="מחפשים ליצור קשר עם לידים קרים או רשימות קיימות?"
        body="לשיחות יזומות ולחימום רשימות יש פתרון נפרד — Kolid Spark, בוט שיוצא לשיחה ומסנן עניין לפני שהנציג נכנס."
        href="/outbound-call-bot"
        cta="לפרטים על Kolid Spark"
      />

      <section className="svc-section svc-section--purple" aria-labelledby="lw-cta-title">
        <div className="container">
          <Reveal className="svc-cta-panel">
            <div>
              <h2 id="lw-cta-title">רוצים לראות איך Kolid Flash עובד אצלכם?</h2>
              <p>
                השאירו פרטים, או התקשרו ל־{siteConfig.contact.phoneDisplay}. נציג של{' '}
                {siteConfig.brandName} יחזור לתיאום.
              </p>
            </div>
            <LeadCtaStrip align="start" tone="on-purple" />
          </Reveal>
        </div>
      </section>

      <ServiceRelatedLinks exclude={PATH} />
    </ServicePageLayout>
  );
}
