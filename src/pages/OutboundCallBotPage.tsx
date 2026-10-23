import { useEffect, useRef } from 'react';
import { LeadCtaStrip } from '../SiteLeadCtas';
import { siteConfig } from '../siteConfig';
import { ServicePageLayout } from './ServicePageLayout';

const PATH = '/outbound-call-bot';

function ReadingProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let frame = 0;
    const sync = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      bar.style.transform = `scaleX(${progress})`;
    };
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(sync);
    };

    sync();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, []);

  return <div className="spark-progress" ref={barRef} aria-hidden="true" />;
}

export function OutboundCallBotPage() {
  const { phoneDisplay, phoneE164 } = siteConfig.contact;
  const { whatsAppUrl } = siteConfig;

  return (
    <ServicePageLayout
      path={PATH}
      currentPath={PATH}
      serviceName="Kolid Spark — שיחות יזומות וחימום לידים"
    >
      <article className="essay essay--spark">
        <ReadingProgress />
        <div className="spark-frame">
        <header className="essay-band essay-band--open spark-open">
          <div className="essay-inner">
            <div className="essay-header">
              <p className="essay-kicker">Kolid Spark</p>
              <h1>שיחות יזומות מתחילות ברשימה, <span className="spark-title-accent">לא בנציג</span></h1>
            </div>

            <p className="essay-lede">
              רוב העסקים שמדברים איתנו על שיחות יזומות לא מחפשים עוד ערוץ. יש להם כבר רשימה:
              לידים ישנים, פניות שלא נסגרו, אנשים שנרשמו פעם ולא חזרו. מה שחסר הוא מי שמוכן
              לפתוח את השיחה הראשונה ולבדוק אם בכלל יש עם מי לדבר.
            </p>

            <p>
              כשהנציג הוא זה שפותח, חלק גדול מהיום הולך על אנשים שלא זוכרים את הפנייה, לא
              פנויים, או אומרים מיד שזה לא רלוונטי. מה שנשאר לצוות המכירות הוא לא השיחה. זה
              הסינון שלפניה.
            </p>
          </div>
        </header>

        <div className="spark-body">
        <section className="essay-band essay-band--tint" id="spark-cold">
          <div className="essay-inner">
            <h2>מה קורה כשמתקשרים לרשימה קרה</h2>
            <p>
              ליד קר הוא לא בהכרח אדם שלא מתעניין. לפעמים הוא לא זוכר שהשאיר פרטים. לפעמים
              השאיר אותם בעונה אחרת, לעסק אחר, מסיבה שכבר לא קיימת. בגיליון כולם נראים אותו
              דבר: שם, טלפון, סטטוס ישן. בטלפון ההבדל נשמע תוך דקה.
            </p>
            <p>
              מישהו אומר לחזור בעוד חודשיים. מישהו אחר אומר שאין לו מושג מי אתם. בגיליון שניהם
              היו יכולים להופיע כ״לא ענה״ או כ״לחזור״. השיחה היא מה שמפריד ביניהם.
            </p>
            <p>
              Kolid Spark הוא בוט קולי שיוצא לרשימה הזו. הוא מתקשר, מציג את עצמו, ומנהל שיחה
              קצרה שמטרתה אחת: להבין אם יש עניין להמשיך. מי שמביע עניין עובר לנציג. מי שלא,
              השיחה נגמרת שם.
            </p>
            <p>
              אין כאן הבטחה שכל רשומה תהפוך לפגישה. יש ציפייה צנועה יותר: הנציג נכנס אחרי
              שמישהו כבר דיבר עם האדם בצד השני.
            </p>
            <LeadCtaStrip align="start" className="essay-cta" />
          </div>
        </section>

        <section className="essay-band" id="spark-short">
          <div className="essay-inner">
            <h2>השיחה קצרה בכוונה</h2>
            <p>
              בוט שיוצא החוצה לא אמור לסגור עסקה. הוא אמור לשאול את מה שנציג היה שואל בדקה
              הראשונה, ולהקשיב לתשובה. מתעניין. לא מתעניין. תתקשרו בעוד חודש. תורידו אותי
              מהרשימה. כל אחת מהתשובות האלה שווה יותר משורה ריקה.
            </p>
            <p>
              את מה שנחשב עניין קובעים מראש, לפי מה שהעסק באמת רוצה לדעת. אצל אחד זו שאלה על
              לוח זמנים. אצל אחר, אם בכלל נשאר תקציב השנה. הבוט לא אמור לאלתר תסריט שנשמע
              סביר בכל תחום.
            </p>
            <p>
              כשהשיחה רלוונטית, היא עוברת לנציג אנושי. הנציג מקבל אדם שכבר דיבר, לא מספר
              טלפון מתוך רשימה.
            </p>
          </div>
        </section>

        <section className="essay-band essay-band--tint" id="spark-start">
          <div className="essay-inner">
            <h2>מאיפה זה מתחיל אצלכם</h2>
            <p>
              מתחילים בחיבור הרשימה. אחר כך קובעים מה הבוט שואל, מתי הוא מתקשר, ומתי שיחה
              נחשבת בשלה להעברה. מכאן השיחות יוצאות, והצוות רואה את מי שכדאי לחזור אליו.
            </p>
            <p>
              זה מתאים כשיש מאגר: פניות ישנות, לידים מקמפיין שכבר נגמר, לקוחות שלא דיברתם
              איתם תקופה. זה פחות העניין כשהליד השאיר פרטים עכשיו ומחכה שמישהו יחזור אליו.
              בשביל זה יש{' '}
              <a href="/lead-warming">Kolid Flash</a>, שמתקשר לליד חדש אחרי הטופס.
            </p>
          </div>
        </section>

        <section className="essay-band essay-band--close" id="spark-wait">
          <div className="essay-inner">
            <h2>אם הרשימה כבר מחכה</h2>
            <p>
              אפשר לשמוע איך Spark נשמע על שיחה כזאת.{' '}
              <a href="/#demo-form">השאירו פרטים</a>
              {whatsAppUrl ? (
                <>
                  , כתבו <a href={whatsAppUrl}>בוואטסאפ</a>
                </>
              ) : null}
              , או התקשרו ל־<a href={`tel:${phoneE164}`}>{phoneDisplay}</a>.
            </p>
            <p>
              הסבר רחב יותר על בוטי שיחות, בלי קשר למוצר הזה, נמצא{' '}
              <a href="/ai-call-bots">במדריך</a>.
            </p>
            <LeadCtaStrip align="start" className="essay-cta essay-cta--page-end" />
          </div>
        </section>
        </div>
        </div>
      </article>
    </ServicePageLayout>
  );
}
