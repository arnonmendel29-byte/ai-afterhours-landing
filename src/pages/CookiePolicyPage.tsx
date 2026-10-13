import { LegalLayout } from './LegalLayout';

export function CookiePolicyPage() {
  return (
    <LegalLayout path="/cookie-policy">
      <section aria-labelledby="ck-summary">
        <h2 id="ck-summary">1. סיכום</h2>
        <p>
          בבדיקת הקוד, התלויות והתנהגות האתר <strong>לא אותרו</strong> Google Analytics, Meta
          Pixel, Hotjar, Clarity או סקריפטי פרסום דומים. לא הוטמע באנר הסכמה לעוגיות —{' '}
          <strong>מכיוון שלא אותרה טכנולוגיה שדורשת הסכמה לפי הממצאים</strong>, בכפוף לייעוץ
          משפטי ולבדיקה ב-Production (כולל Vercel Web Analytics אם יופעל בלוח הבקרה).
        </p>
      </section>

      <section aria-labelledby="ck-what">
        <h2 id="ck-what">2. מה נבדק</h2>
        <ul>
          <li>package.json ו-lockfile — ללא חבילות analytics.</li>
          <li>
            קוד מקור — localStorage רק להעדפות נגישות (`kolid-a11y-prefs`), לא למעקב או פרסום.
          </li>
          <li>index.html — ללא תגיות צד שלישי למעקב.</li>
          <li>משאבים חיצוניים: Google Fonts בלבד (גופנים).</li>
        </ul>
        <p>
          <em>מגבלה:</em> לא נבדקו הגדרות Vercel שלא נגישות מהמאגר (Analytics, Speed Insights,
          Firewall logs). יש לאמת בלוח הבקרה לפני פרסום.
        </p>
      </section>

      <section aria-labelledby="ck-types">
        <h2 id="ck-types">3. עוגיות ואחסון — לפי סוג</h2>
        <h3>3.1 הכרחיות / תפעול</h3>
        <p>
          האתר עצמו (SPA סטטי) לא מגדיר עוגיות application משלו בקוד שנבדק. Vercel עשוי להגדיר
          עוגיות תשתית (למשל _vercel_jwt ב-preview) — רלוונטי בעיקר לסביבות preview, לא בהכרח
          ל-production הציבורי.
        </p>
        <h3>3.2 צד שלישי — Google Fonts</h3>
        <p>
          טעינת גופנים מ-Google עשויה לכלול בקשות לדומיינים של Google. מדיניות העוגיות של Google
          חלה על השירות. אין שימוש ב-Cookie Consent Mode בפרויקט.
        </p>
        <h3>3.3 מעקב ופרסום</h3>
        <p>לא אותרו — אם יוספו בעתיד, יש לעדכן מדיניות זו ולהעריך מחדש צורך בהסכמה.</p>
      </section>

      <section aria-labelledby="ck-control">
        <h2 id="ck-control">4. שליטה בדפדפן</h2>
        <p>
          ניתן לחסום עוגיות או משאבים של צד שלישי בהגדרות הדפדפן. חסימה עלולה לשנות את מראה
          האתר (גופנים).
        </p>
      </section>

      <section aria-labelledby="ck-more">
        <h2 id="ck-more">5. קישורים</h2>
        <p>
          <a href="/privacy-policy">מדיניות פרטיות</a> ·{' '}
          <a href="/accessibility">הצהרת נגישות</a>
        </p>
      </section>
    </LegalLayout>
  );
}
