import { LegalLayout } from './LegalLayout';
import { isOwnerPlaceholder, siteConfig } from '../siteConfig';

export function PrivacyPolicyPage() {
  const { contact, business, formActionUrl, whatsAppUrl } = siteConfig;
  const hasFormBackend = Boolean(formActionUrl);
  const emailLine = isOwnerPlaceholder(contact.email)
    ? '[REQUIRES OWNER INPUT — כתובת אימייל לפניות פרטיות]'
    : contact.email;
  const legalName = isOwnerPlaceholder(business.legalName)
    ? '[REQUIRES OWNER INPUT — שם משפטי של בעל העסק]'
    : business.legalName;

  return (
    <LegalLayout path="/privacy-policy">
      <section aria-labelledby="pp-controller">
        <h2 id="pp-controller">1. מי אחראי על המידע</h2>
        <p>
          בעל השליטה במידע (בהתאם לחוק הגנת הפרטיות, התשמ&quot;א-1981): {legalName}, מפעיל/ת
          המותג {siteConfig.brandName}.
        </p>
        <ul>
          <li>
            טלפון:{' '}
            <a href={`tel:${contact.phoneE164}`}>{contact.phoneDisplay}</a>
          </li>
          <li>דוא&quot;ל לפניות פרטיות: {emailLine}</li>
          {!isOwnerPlaceholder(business.address) && <li>כתובת: {business.address}</li>}
        </ul>
      </section>

      <section aria-labelledby="pp-collect">
        <h2 id="pp-collect">2. אילו מידעים נאספים ומאיפה</h2>
        <h3>2.1 טופס יצירת קשר / הדגמה</h3>
        {hasFormBackend ? (
          <p>
            בעת שליחת הטופס באתר, הנתונים שמולאו (למשל שם, חברה, אימייל, טלפון, תחום עיסוק,
            כמות לידים והודעה) נשלחים לכתובת השרת שהוגדרה לטופס ({formActionUrl}). סוג
            העיבוד, השמירה והגישה בצד השרת תלויים בספק שבחר בעל העסק — יש לוודא הסכם
            מתאים עם ספק זה.
          </p>
        ) : (
          <p>
            <strong>מצב נוכחי (נבדק בקוד):</strong> טופס ההדגמה באתר אינו מחובר לשרת שליחה.
            לחיצה על &quot;קבל הדגמה&quot; אינה מעבירה את הנתונים ליעד חיצוני דרך האתר. עם
            זאת, מילוי שדות בדפדפן עדיין מתרחש במכשיר המשתמש; מומלץ לא להזין מידע רגיש עד
            שחיבור טופס מאובטח יופעל.
          </p>
        )}
        <h3>2.2 פנייה בטלפון</h3>
        <p>
          אם אתם מתקשרים למספר המופיע באתר, המידע (מספר מתקשר, תוכן השיחה) מעובד על ידי
          ספק התקשורת ועל ידי בעל העסק — לא על ידי האתר עצמו.
        </p>
        {whatsAppUrl ? (
          <>
            <h3>2.3 WhatsApp</h3>
            <p>
              קישור WhatsApp באתר מעביר אתכם לשירות WhatsApp (Meta). מידע שתשלחו בשיחה,
              ומידע טכני (כגון מספר טלפון, מטא-דאטה של המכשיר) עשוי להיות מעובד על ידי Meta
              בהתאם למדיניות שלהם. האתר עצמו אינו שולט בשיחה לאחר המעבר.
            </p>
          </>
        ) : (
          <p>
            <em>נכון לבדיקה: לא אותרו קישורי WhatsApp פעילים בקוד האתר.</em>
          </p>
        )}
        <h3>2.4 מידע טכני אוטומטי</h3>
        <p>
          בעת גלישה באתר, ספק האירוח (Vercel) ורשתות תשתית עשויים לעבד נתונים טכניים כגון
          כתובת IP, סוג דפדפן, מערכת הפעלה, זמן בקשה ו-URL — לצורכי אבטחה, תפעול ומניעת
          שימוש לרעה. לא אותרו בקוד האתר כלי Analytics (Google Analytics, Meta Pixel וכו&apos;)
          או מנגנוני פרסום.
        </p>
        <h3>2.5 גופנים</h3>
        <p>
          גופן Rubik מוגש מהאתר עצמו (קבצים מקומיים). אין טעינה של גופנים מ-Google Fonts
          ואין העברת כתובת IP ל-Google לצורך הצגת הטקסט.
        </p>
      </section>

      <section aria-labelledby="pp-purpose">
        <h2 id="pp-purpose">3. מטרות השימוש והבסיס המשפטי</h2>
        <ul>
          <li>טיפול בפניות והדגמות — מימוש עניין לגיטימי / ביצוע צעדים לפני כריכה בחוזה.</li>
          <li>תפעול ואבטחת האתר — מימוש עניין לגיטימי / חובה חוקית (אבטחת מידע).</li>
          <li>עמידה בדרישות רגולטוריות — ככל שיחולו.</li>
        </ul>
        <p>
          ייעוץ משפטי ספציפי לעסק (למשל לגבי הסכמה מפורשת, דיוור, או תיקון 13) —{' '}
          [REQUIRES OWNER INPUT — ייעוץ משפטי].
        </p>
      </section>

      <section aria-labelledby="pp-sharing">
        <h2 id="pp-sharing">4. העברת מידע לצדדים שלישיים</h2>
        <ul>
          <li>
            <strong>Vercel</strong> — אירוח ופריסת האתר (עשוי לכלול עיבוד בשרתים מחוץ
            לישראל).
          </li>
          {hasFormBackend && (
            <li>
              <strong>ספק טופס</strong> — יעד השליחה שהוגדר ב-VITE_FORM_ACTION_URL.
            </li>
          )}
          {whatsAppUrl && (
            <li>
              <strong>Meta / WhatsApp</strong> — בעת שימוש בקישור WhatsApp.
            </li>
          )}
        </ul>
        <p>לא נמכר מידע אישי לצדדים שלישיים לצורכי פרסום על בסיס הבדיקה הנוכחית.</p>
      </section>

      <section aria-labelledby="pp-retention">
        <h2 id="pp-retention">5. שמירת מידע</h2>
        <p>
          תקופות שמירה נקבעות לפי מטרת העיבוד וחובות חוקיות. פרטי פנייה בטופס (כאשר יחובר
          שרת) — [REQUIRES OWNER INPUT — מדיניות שמירה פנימית]. לוגי אירוח — בהתאם להגדרות
          Vercel ובקשות חוקיות.
        </p>
      </section>

      <section aria-labelledby="pp-rights">
        <h2 id="pp-rights">6. זכויותיכם</h2>
        <p>
          בכפוף לדין החל (כולל חוק הגנת הפרטיות ותיקון 13, ככל שחל), עשויות להיות לכם זכויות
          לעיון, תיקון, מחיקה, הגבלת עיבוד והתנגדות — בהתאם לנסיבות. לפניות: {emailLine} או{' '}
          <a href={`tel:${contact.phoneE164}`}>{contact.phoneDisplay}</a>.
        </p>
      </section>

      <section aria-labelledby="pp-security">
        <h2 id="pp-security">7. אבטחת מידע</h2>
        <p>
          האתר מוגש ב-HTTPS באמצעות Vercel. בוצעו התאמות headers בסיסיות ב-vercel.json
          (ראו דוח הביקורת). אין מערכת אחת &quot;מאובטחת לחלוטין&quot; — נדרשת תחזוקה,
          עדכון תלויות והגדרות Production.
        </p>
      </section>

      <section aria-labelledby="pp-changes">
        <h2 id="pp-changes">8. שינויים במדיניות</h2>
        <p>נעדכן מדיניות זו כאשר ישתנה התנהגות האתר או הדין. תאריך העדכון מופיע בראש העמוד.</p>
      </section>
    </LegalLayout>
  );
}
