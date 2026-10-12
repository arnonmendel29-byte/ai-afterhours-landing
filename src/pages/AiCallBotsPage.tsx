import { LeadCtaStrip, SiteLeadCtas } from '../SiteLeadCtas';
import { siteConfig } from '../siteConfig';
import { ServicePageLayout, ServiceRelatedLinks } from './ServicePageLayout';

const PATH = '/ai-call-bots';

export function AiCallBotsPage() {
  return (
    <ServicePageLayout
      title="בוטים לשיחות AI"
      description="מהם בוטים לשיחות AI, כיצד הם פועלים, יתרונות אפשריים ושימושים בעסקים — ואיך קוליד עוזרת לנהל שיחות קוליות עם לידים."
      path={PATH}
      currentPath={PATH}
    >
      <section className="svc-hero" aria-labelledby="acb-hero-title">
        <div className="container svc-hero-inner">
          <p className="svc-eyebrow">שירות · בוטים לשיחות</p>
          <h1 id="acb-hero-title">בוטים לשיחות AI לעסקים</h1>
          <p className="svc-lede">
            בוטים לשיחות (Call Bots) הם מערכות מבוססות בינה מלאכותית שמסוגלות לנהל שיחות
            טלפון עם לקוחות פוטנציאליים או קיימים. בניגוד לצ׳אטבוטים הפועלים בטקסט, בוטי
            שיחות מתמחים בתקשורת קולית ויכולים לנהל דיאלוג בהתאם להקשר השיחה.
          </p>
          <div className="svc-hero-actions svc-hero-actions--lead">
            <SiteLeadCtas />
            <div className="svc-hero-actions-row">
              <a className="svc-link-quiet" href="/lead-warming">
                לשירות חימום לידים
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="svc-section" aria-labelledby="acb-what-title">
        <div className="container">
          <div className="svc-section-head">
            <p className="svc-eyebrow">מה זה</p>
            <h2 id="acb-what-title">מה הם בוטים לשיחות AI</h2>
            <p>
              בוט שיחות הוא סוכן קולי מבוסס AI שמנהל שיחה טלפונית: מקשיב, מבין ומגיב
              בדיבור. המטרה היא לטפל בחלק מהשיחות הראשוניות או החוזרות באופן עקבי, ולשחרר
              את הצוות האנושי לטיפול במקרים שדורשים שיקול דעת או סגירה.
            </p>
          </div>
        </div>
      </section>

      <section className="svc-section svc-section--soft" aria-labelledby="acb-how-title">
        <div className="container">
          <div className="svc-section-head">
            <p className="svc-eyebrow">איך זה עובד</p>
            <h2 id="acb-how-title">זיהוי דיבור, הבנת שפה ותגובה קולית</h2>
            <p>
              באופן כללי, בוטי שיחות משלבים טכנולוגיות כמו זיהוי דיבור (Speech-to-Text),
              עיבוד שפה טבעית והפקת דיבור (Text-to-Speech), יחד עם לוגיקת שיחה שמוגדרת
              לפי הצורך העסקי. הפרטים הטכניים וההגדרות המדויקות נקבעים לפי תהליך העבודה
              של כל עסק.
            </p>
          </div>
          <div className="svc-grid-3">
            <article className="svc-card">
              <h3>זיהוי דיבור</h3>
              <p>הבוט ממיר את דברי הדובר לטקסט כדי להבין את תוכן השיחה.</p>
            </article>
            <article className="svc-card">
              <h3>עיבוד שפה</h3>
              <p>המערכת מפרשת כוונה והקשר, ומתאימה את המשך השיחה בהתאם.</p>
            </article>
            <article className="svc-card">
              <h3>תגובה קולית</h3>
              <p>הבוט משיב בדיבור טבעי וממשיך את הדיאלוג לפי התסריט שהוגדר.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="svc-section" aria-labelledby="acb-benefits-title">
        <div className="container">
          <div className="svc-section-head">
            <p className="svc-eyebrow">יתרונות אפשריים</p>
            <h2 id="acb-benefits-title">למה עסקים בוחנים בוטי שיחות</h2>
            <p>
              היתרונות תלויים בתהליך, בנפח השיחות ובהגדרות. להלן כיוונים נפוצים — לא
              הבטחות תוצאה ספציפיות.
            </p>
          </div>
          <div className="svc-grid-2">
            <article className="svc-card">
              <h3>זמינות</h3>
              <p>אפשרות לטפל בפניות גם בשעות שבהן הצוות פחות זמין, לפי הגדרות המערכת.</p>
            </article>
            <article className="svc-card">
              <h3>יעילות</h3>
              <p>טיפול שיטתי בשיחות חוזרות או ראשוניות, כדי שהצוות יתמקד בשיחות מורכבות יותר.</p>
            </article>
            <article className="svc-card">
              <h3>התאמה לתהליך</h3>
              <p>תסריטי שיחה שמותאמים לשאלות ולמטרות העסקיות שלכם.</p>
            </article>
            <article className="svc-card">
              <h3>תיעוד ומעקב</h3>
              <p>אפשרות לתעד ולסכם מידע מהשיחה לצורך המשך טיפול — בהתאם ליכולות שיוגדרו.</p>
            </article>
            <article className="svc-card">
              <h3>טיפול במקביל</h3>
              <p>יכולת לטפל במספר שיחות במקביל, בהתאם לתשתית ולהגדרות השירות.</p>
            </article>
            <article className="svc-card">
              <h3>העברה לנציג</h3>
              <p>
                במקרים מורכבים ניתן להעביר את השיחה או את הליד לנציג אנושי, כשהיכולת
                הזו מוגדרת בתהליך העבודה.
              </p>
            </article>
          </div>
          <LeadCtaStrip />
        </div>
      </section>

      <section className="svc-section svc-section--soft" aria-labelledby="acb-uses-title">
        <div className="container">
          <div className="svc-section-head">
            <p className="svc-eyebrow">שימושים</p>
            <h2 id="acb-uses-title">תחומים שבהם בוטי שיחות יכולים לסייע</h2>
            <p>
              השימוש בפועל נקבע לפי סוג העסק, הרגולציה והתהליך. להלן דוגמאות כלליות
              לתחומים שבהם בוטי שיחות נבחנים לעיתים קרובות.
            </p>
          </div>
          <div className="svc-grid-2">
            <article className="svc-card">
              <h3>נדל״ן</h3>
              <p>מענה ראשוני לפניות על נכסים, תיאום מידע בסיסי והעברה לנציג.</p>
            </article>
            <article className="svc-card">
              <h3>שירותי בריאות</h3>
              <p>טיפול בפניות כלליות ותיאום מידע ראשוני — בהתאם לדרישות הפרטיות והרגולציה.</p>
            </article>
            <article className="svc-card">
              <h3>מכירות</h3>
              <p>חימום לידים, סינון ראשוני והעברת מתעניינים לצוות המכירות.</p>
            </article>
            <article className="svc-card">
              <h3>תמיכת לקוחות</h3>
              <p>מענה לשאלות נפוצות והכוונה, עם אפשרות להעברה לנציג במקרים מורכבים.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="svc-section svc-section--purple" aria-labelledby="acb-cta-title">
        <div className="container">
          <div className="svc-cta-panel">
            <div>
              <h2 id="acb-cta-title">רוצים לבחון בוט שיחות לעסק שלכם?</h2>
              <p>
                צרו קשר עם {siteConfig.brandName} להדגמה:{' '}
                {siteConfig.contact.phoneDisplay}, או השאירו פרטים בטופס בעמוד הבית.
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
