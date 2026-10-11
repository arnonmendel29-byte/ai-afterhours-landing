import { LegalLayout } from './LegalLayout';
import { isOwnerPlaceholder, siteConfig } from '../siteConfig';

export function AccessibilityPage() {
  const emailLine = isOwnerPlaceholder(siteConfig.contact.email)
    ? '[REQUIRES OWNER INPUT — אימייל לפניות נגישות]'
    : siteConfig.contact.email;

  return (
    <LegalLayout
      title="הצהרת נגישות"
      description="מידע על מאמצי הנגישות באתר קוליד, מגבלות ידועות ודרכי פנייה."
    >
      <section aria-labelledby="a11y-commitment">
        <h2 id="a11y-commitment">1. מחויבות</h2>
        <p>
          {siteConfig.brandName} פועל/ת להנגשת האתר לקהל רחב, בהתאם לעקרונות WCAG 2.x ולדרישות
          הרלוונטיות בישראל (תקנות שוויון זכויות לאנשים עם מוגבלות — נגישות שירות).{' '}
          <strong>הצהרה זו אינה תעודת תאימות מלאה</strong> — נדרשות בדיקות ידניות ומקצועיות
          לפני פרסום.
        </p>
      </section>

      <section aria-labelledby="a11y-standard">
        <h2 id="a11y-standard">2. תקן יעד</h2>
        <p>
          יעד העבודה: רמה AA של WCAG 2.1, ככל שניתן בלי לפגוע במיתוג ובאנימציות קיימות.
          פטור מנגישות לפי גודל עסק — [REQUIRES OWNER INPUT — אימות זכאות לפטור אם רלוונטי].
        </p>
      </section>

      <section aria-labelledby="a11y-features">
        <h2 id="a11y-features">3. מה בוצע באתר (נבדק בקוד)</h2>
        <ul>
          <li>שפת עמוד: עברית, כיוון RTL (lang=&quot;he&quot;, dir=&quot;rtl&quot;).</li>
          <li>מבנה סמנטי: כותרות, main, nav, section, aria-labelledby במקומות רבים.</li>
          <li>קישור &quot;דילוג לתוכן&quot; לתחילת התוכן הראשי.</li>
          <li>טקסט חלופי לתמונות תוכן עיקריות.</li>
          <li>תמיכה ב-prefers-reduced-motion לאנימציות גלילה ו-Reveal.</li>
          <li>שיפור focus גלוי לקישורים, שדות טופס וכפתורי CTA.</li>
          <li>שדות טופס עם תוויות ו-autocomplete מתאים.</li>
          <li>
            כפתור נגישות קבוע (סמל כיסא גלגלים) — תפריט התאמות: גודל טקסט, ריווח שורות, גופן
            קריא, ניגודיות גבוהה, גווני אפור, הדגשת קישורים, הדגשת focus, דילוג לתוכן, עצירת
            אנימציות, איפוס והצהרת נגישות (העדפות ב-localStorage).
          </li>
        </ul>
      </section>

      <section aria-labelledby="a11y-limits">
        <h2 id="a11y-limits">4. מגבלות ידועות</h2>
        <ul>
          <li>
            אנימציות Canvas (מסגרת כוכבים בכפתורי CTA) — מושבתות/מופחתות במצב reduced motion
            חלקית; ייתכן שעדיין נראית תנועה מסוימת.
          </li>
          <li>
            מקטע &quot;עמודי תווך&quot; (Pillars) בדסקטופ — אפקט sticky/scroll; במובייל מוצג
            layout פשוט יותר.
          </li>
          <li>לא בוצעה ביקורת נגישות ידנית מלאה עם קורא מסך וכל דפדפן.</li>
          <li>ניגודיות צבעים — לא נמדדה בכלי אוטומטי בכל הרכיבים.</li>
        </ul>
      </section>

      <section aria-labelledby="a11y-contact">
        <h2 id="a11y-contact">5. פניות ותיקונים</h2>
        <p>
          נתקלתם בבעיית נגישות? נשמח לסייע:
          <br />
          דוא&quot;ל: {emailLine}
          <br />
          טלפון:{' '}
          <a href={`tel:${siteConfig.contact.phoneE164}`}>{siteConfig.contact.phoneDisplay}</a>
        </p>
        <p>
          רכז/ת נגישות (אם מונה): [REQUIRES OWNER INPUT — שם ופרטי קשר]
        </p>
      </section>
    </LegalLayout>
  );
}
