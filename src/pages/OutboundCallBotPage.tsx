import { LeadCtaStrip, SiteLeadCtas } from '../SiteLeadCtas';
import { siteConfig } from '../siteConfig';
import { ServiceCrossSell, ServicePageLayout, ServiceRelatedLinks } from './ServicePageLayout';

const PATH = '/outbound-call-bot';

const steps = [
  {
    title: 'חיבור רשימת לידים',
    body: 'מזינים או מחברים רשימת לידים בהתאם ליכולות המערכת.',
  },
  {
    title: 'שיחות יזומות',
    body: 'הבוט יוצר קשר באמצעות שיחות יזומות.',
  },
  {
    title: 'בחינת רמת העניין',
    body: 'הבוט מנהל שיחה ובוחן את רמת העניין.',
  },
  {
    title: 'העברה לנציג',
    body: 'לידים רלוונטיים מועברים לנציג אנושי בהתאם להגדרות המערכת.',
  },
];

const benefits = [
  {
    title: 'אוטומציה של השיחות הראשוניות',
    body: 'הבוט מבצע את שלב השיחה הראשוני במקום לפתוח כל שיחה ידנית.',
  },
  {
    title: 'טיפול בהיקף פניות',
    body: 'אפשר לטפל בכמויות פניות בהתאם לקיבולת המערכת, בלי להגדיר מראש מכסה שלא אושרה.',
  },
  {
    title: 'סינון ראשוני',
    body: 'השיחה עוזרת להבין מי מביע עניין לפני שהשיחה עוברת לצוות.',
  },
  {
    title: 'חיסכון בזמן',
    body: 'צוות המכירות משקיע פחות זמן בשיחות שעדיין לא בשלות.',
  },
  {
    title: 'העברה לנציג אנושי',
    body: 'שיחות רלוונטיות מועברות לנציג בהתאם להגדרות שתקבעו.',
  },
];

export function OutboundCallBotPage() {
  return (
    <ServicePageLayout
      title="בוט קולי לשיחות יזומות וחימום לידים"
      description="בוט קולי מבוסס AI של קוליד שמבצע שיחות יזומות ללידים קרים ולרשימות קיימות, בוחן רמת עניין ומעביר לידים רלוונטיים לנציג אנושי."
      path={PATH}
      currentPath={PATH}
    >
      <section className="svc-hero" aria-labelledby="ob-hero-title">
        <div className="container svc-hero-inner">
          <p className="svc-eyebrow">שירות · שיחות יזומות</p>
          <h1 id="ob-hero-title">הפסיקו לבזבז זמן על שיחות שלא מובילות לשום מקום.</h1>
          <p className="svc-lede">
            בוט קולי מבוסס AI שמבצע שיחות יזומות, מנהל שיחה טבעית עם לידים ומסייע לצוות
            המכירות להתמקד בהזדמנויות הרלוונטיות.
          </p>
          <div className="svc-hero-actions svc-hero-actions--lead">
            <SiteLeadCtas />
            <div className="svc-hero-actions-row">
              <a className="svc-link-quiet" href={`tel:${siteConfig.contact.phoneE164}`}>
                להתקשר: {siteConfig.contact.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="svc-section" aria-labelledby="ob-challenge-title">
        <div className="container">
          <div className="svc-section-head">
            <p className="svc-eyebrow">האתגר</p>
            <h2 id="ob-challenge-title">שיחות יזומות דורשות זמן לפני שהן מגיעות להזדמנות</h2>
            <p>
              פנייה לרשימות ישנות או ללידים קרים דורשת זמן ומשאבים מצוות המכירות. חלק גדול
              מהשיחות עדיין לא בשל. סינון ראשוני קולי עוזר לצוות להתמקד בשיחות שיש להן
              פוטנציאל להמשיך, במקום לפתוח כל רשומה מאפס.
            </p>
          </div>
        </div>
      </section>

      <section className="svc-section svc-section--soft" aria-labelledby="ob-how-title">
        <div className="container">
          <div className="svc-section-head">
            <p className="svc-eyebrow">איך זה עובד</p>
            <h2 id="ob-how-title">מרשימה — לשיחה — לנציג</h2>
          </div>
          <ol className="svc-steps">
            {steps.map((step) => (
              <li className="svc-step" key={step.title}>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <LeadCtaStrip />
        </div>
      </section>

      <section className="svc-section" aria-labelledby="ob-benefits-title">
        <div className="container">
          <div className="svc-section-head">
            <p className="svc-eyebrow">יתרונות</p>
            <h2 id="ob-benefits-title">מה הבוט משנה בשלב הראשון של המכירה</h2>
          </div>
          <div className="svc-grid-2">
            {benefits.map((item) => (
              <article className="svc-card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="svc-section svc-section--soft" aria-labelledby="ob-fit-title">
        <div className="container">
          <div className="svc-section-head">
            <p className="svc-eyebrow">למי זה מתאים</p>
            <h2 id="ob-fit-title">עסקים שרוצים ליצור קשר עם קהל קיים או לידים קרים</h2>
            <p>
              הפתרון רלוונטי כשיש רשימות לידים, פניות ישנות או קהל שעדיין לא הביע עניין פעיל,
              ורוצים לסנן לפני שהנציג האנושי ממשיך.
            </p>
          </div>
          <ul className="svc-audience">
            <li>עסקים עם רשימות לידים או מאגרי פניות קיימים</li>
            <li>צוותי מכירות שרוצים לצמצם שיחות קרות לא רלוונטיות</li>
            <li>ארגונים שמחפשים סינון ראשוני לפני העברה לנציג</li>
          </ul>
        </div>
      </section>

      <ServiceCrossSell
        title="מקבלים לידים חדשים שמשאירים פרטים?"
        body="לתגובה מהירה אחרי טופס או קמפיין יש פתרון נפרד — בוט שמתקשר אוטומטית ומנהל שיחה ראשונית."
        href="/lead-warming"
        cta="לפרטים על בוט לתגובה מיידית"
      />

      <section className="svc-section svc-section--purple" aria-labelledby="ob-cta-title">
        <div className="container">
          <div className="svc-cta-panel">
            <div>
              <h2 id="ob-cta-title">תנו לצוות המכירות להתמקד בהזדמנויות הנכונות.</h2>
              <p>
                השאירו פרטים להדגמה, או התקשרו ל־{siteConfig.contact.phoneDisplay}. נציג של{' '}
                {siteConfig.brandName} יחזור אליכם.
              </p>
            </div>
            <LeadCtaStrip align="start" tone="on-purple" />
          </div>
        </div>
      </section>

      <ServiceRelatedLinks exclude={PATH} />
    </ServicePageLayout>
  );
}
