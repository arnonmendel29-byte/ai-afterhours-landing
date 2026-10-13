import { LeadCtaStrip, SiteLeadCtas } from '../SiteLeadCtas';
import { Reveal } from '../Reveal';
import { siteConfig } from '../siteConfig';
import { ServicePageLayout, ServiceRelatedLinks } from './ServicePageLayout';

const PATH = '/ai-call-bots';

function staggerStep(index: number): 0 | 1 | 2 {
  return (index % 3) as 0 | 1 | 2;
}

export function AiCallBotsPage() {
  return (
    <ServicePageLayout
      path={PATH}
      currentPath={PATH}
      serviceName="בוטים לשיחות AI לעסקים"
    >
      <section className="svc-hero" aria-labelledby="acb-hero-title">
        <div className="container svc-hero-inner">
          <Reveal>
            <p className="svc-eyebrow">שירות · בוטים לשיחות</p>
            <h1 id="acb-hero-title">בוטים לשיחות AI לעסקים</h1>
            <p className="svc-lede">
              בוטים לשיחות (Call Bots) הם מערכות מבוססות בינה מלאכותית שמסוגלות לנהל שיחות
              טלפון עם לקוחות פוטנציאליים או קיימים. בניגוד לצ׳אטבוטים הפועלים בטקסט, בוטי
              שיחות מתמחים בתקשורת קולית ויכולים לנהל דיאלוג בהתאם להקשר השיחה.
            </p>
          </Reveal>
          <Reveal delay>
            <div className="svc-hero-actions svc-hero-actions--lead">
              <SiteLeadCtas />
              <div className="svc-hero-actions-row">
                <a className="svc-link-quiet" href="/lead-warming">
                  ל-Kolid Flash
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="svc-section" aria-labelledby="acb-what-title">
        <div className="container">
          <Reveal className="svc-section-head">
            <p className="svc-eyebrow">מה זה</p>
            <h2 id="acb-what-title">מה הם בוטים לשיחות AI</h2>
            <p>
              בוט שיחות הוא סוכן קולי מבוסס AI שמנהל שיחה טלפונית: מקשיב, מבין ומגיב
              בדיבור. המטרה היא לטפל בחלק מהשיחות הראשוניות או החוזרות באופן עקבי, ולשחרר
              את הצוות האנושי לטיפול במקרים שדורשים שיקול דעת או סגירה.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="svc-section svc-section--soft" aria-labelledby="acb-how-title">
        <div className="container">
          <Reveal className="svc-section-head">
            <p className="svc-eyebrow">איך זה עובד</p>
            <h2 id="acb-how-title">זיהוי דיבור, הבנת שפה ותגובה קולית</h2>
            <p>
              באופן כללי, בוטי שיחות משלבים טכנולוגיות כמו זיהוי דיבור (Speech-to-Text),
              עיבוד שפה טבעית והפקת דיבור (Text-to-Speech), יחד עם לוגיקת שיחה שמוגדרת
              לפי הצורך העסקי. הפרטים הטכניים וההגדרות המדויקות נקבעים לפי תהליך העבודה
              של כל עסק.
            </p>
          </Reveal>
          <div className="svc-grid-3">
            <Reveal as="article" className="svc-card" delayStep={0}>
              <h3>זיהוי דיבור</h3>
              <p>הבוט ממיר את דברי הדובר לטקסט כדי להבין את תוכן השיחה.</p>
            </Reveal>
            <Reveal as="article" className="svc-card" delayStep={1}>
              <h3>עיבוד שפה</h3>
              <p>המערכת מפרשת כוונה והקשר, ומתאימה את המשך השיחה בהתאם.</p>
            </Reveal>
            <Reveal as="article" className="svc-card" delayStep={2}>
              <h3>תגובה קולית</h3>
              <p>הבוט משיב בדיבור טבעי וממשיך את הדיאלוג לפי התסריט שהוגדר.</p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="svc-section" aria-labelledby="acb-benefits-title">
        <div className="container">
          <Reveal className="svc-section-head">
            <p className="svc-eyebrow">יתרונות אפשריים</p>
            <h2 id="acb-benefits-title">למה עסקים בוחנים בוטי שיחות</h2>
            <p>
              היתרונות תלויים בתהליך, בנפח השיחות ובהגדרות. להלן כיוונים נפוצים — לא
              הבטחות תוצאה ספציפיות.
            </p>
          </Reveal>
          <div className="svc-grid-2">
            {[
              {
                title: 'זמינות',
                body: 'אפשרות לטפל בפניות גם בשעות שבהן הצוות פחות זמין, לפי הגדרות המערכת.',
              },
              {
                title: 'יעילות',
                body: 'טיפול שיטתי בשיחות חוזרות או ראשוניות, כדי שהצוות יתמקד בשיחות מורכבות יותר.',
              },
              {
                title: 'התאמה לתהליך',
                body: 'תסריטי שיחה שמותאמים לשאלות ולמטרות העסקיות שלכם.',
              },
              {
                title: 'תיעוד ומעקב',
                body: 'אפשרות לתעד ולסכם מידע מהשיחה לצורך המשך טיפול — בהתאם ליכולות שיוגדרו.',
              },
              {
                title: 'טיפול במקביל',
                body: 'יכולת לטפל במספר שיחות במקביל, בהתאם לתשתית ולהגדרות השירות.',
              },
              {
                title: 'העברה לנציג',
                body: 'במקרים מורכבים ניתן להעביר את השיחה או את הליד לנציג אנושי, כשהיכולת הזו מוגדרת בתהליך העבודה.',
              },
            ].map((item, index) => (
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
          <Reveal variant="fade">
            <LeadCtaStrip />
          </Reveal>
        </div>
      </section>

      <section className="svc-section svc-section--soft" aria-labelledby="acb-uses-title">
        <div className="container">
          <Reveal className="svc-section-head">
            <p className="svc-eyebrow">שימושים</p>
            <h2 id="acb-uses-title">תחומים שבהם בוטי שיחות יכולים לסייע</h2>
            <p>
              השימוש בפועל נקבע לפי סוג העסק, הרגולציה והתהליך. להלן דוגמאות כלליות
              לתחומים שבהם בוטי שיחות נבחנים לעיתים קרובות.
            </p>
          </Reveal>
          <div className="svc-grid-2">
            {[
              {
                title: 'נדל״ן',
                body: 'מענה ראשוני לפניות על נכסים, תיאום מידע בסיסי והעברה לנציג.',
              },
              {
                title: 'שירותי בריאות',
                body: 'טיפול בפניות כלליות ותיאום מידע ראשוני — בהתאם לדרישות הפרטיות והרגולציה.',
              },
              {
                title: 'מכירות',
                body: 'חימום לידים, סינון ראשוני והעברת מתעניינים לצוות המכירות.',
              },
              {
                title: 'תמיכת לקוחות',
                body: 'מענה לשאלות נפוצות והכוונה, עם אפשרות להעברה לנציג במקרים מורכבים.',
              },
            ].map((item, index) => (
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

      <section className="svc-section svc-section--purple" aria-labelledby="acb-cta-title">
        <div className="container">
          <Reveal className="svc-cta-panel">
            <div>
              <h2 id="acb-cta-title">רוצים לבחון בוט שיחות לעסק שלכם?</h2>
              <p>
                צרו קשר עם {siteConfig.brandName} להדגמה:{' '}
                {siteConfig.contact.phoneDisplay}, או השאירו פרטים בטופס בעמוד הבית.
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
