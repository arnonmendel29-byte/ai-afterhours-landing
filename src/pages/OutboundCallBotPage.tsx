import { useEffect, useRef, type ReactNode } from 'react';
import { Reveal } from '../Reveal';
import { LeadCtaStrip } from '../SiteLeadCtas';
import { ServicePageLayout } from './ServicePageLayout';

const PATH = '/outbound-call-bot';

function ReadingProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    let frame = 0;
    let lastProgress = -1;
    const sync = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      if (progress === lastProgress) return;
      lastProgress = progress;
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

  return (
    <div
      className="spark-progress"
      ref={barRef}
      role="progressbar"
      aria-label="התקדמות קריאה"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-hidden="true"
    />
  );
}

function SparkWaveField({ idPrefix }: { idPrefix: string }) {
  return (
    <svg
      className="spark-backdrop__waves"
      viewBox="0 0 360 2200"
      preserveAspectRatio="xMinYMin slice"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={`${idPrefix}-fade`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#5b21b6" stopOpacity="0.62" />
          <stop offset="42%" stopColor="#7c3aed" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${idPrefix}-fade-soft`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
          <stop offset="55%" stopColor="#8b5cf6" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#5b21b6" stopOpacity="0" />
        </linearGradient>
      </defs>
      <g className="spark-backdrop__quiet" stroke={`url(#${idPrefix}-fade-soft)`} strokeLinecap="round">
        <path d="M0 90c28 18 52 18 80 0s52-18 80 0 52 18 80 0 52-18 80 0 40 14 40 0" strokeWidth="1.1" />
        <path d="M0 250c22-22 48-22 70 0s48 22 70 0 48-22 70 0 48 22 70 0 40-16 40 0" strokeWidth="0.8" />
        <path d="M0 460c36 10 54 10 90 0s54-10 90 0 54 10 90 0 50-8 50 0" strokeWidth="1.2" />
        <path d="M0 720c18 26 40 26 58 0s40-26 58 0 40 26 58 0 40-26 58 0 40 26 58 0 30-18 30 0" strokeWidth="0.75" />
        <path d="M0 980c40-14 62-14 102 0s62 14 102 0 56-12 90 0" strokeWidth="1" />
        <path d="M0 1240c24 20 46 20 70 0s46-20 70 0 46 20 70 0 46-20 70 0 40 16 40 0" strokeWidth="0.9" />
        <path d="M0 1520c32-8 58-8 90 0s58 8 90 0 58-8 90 0 48 6 50 0" strokeWidth="1.15" />
        <path d="M0 1780c16 24 38 24 54 0s38-24 54 0 38 24 54 0 38-24 54 0 38 24 54 0 34-16 40 0" strokeWidth="0.7" />
        <path d="M0 2040c34 12 56 12 90 0s56-12 90 0 56 12 90 0" strokeWidth="1" />
      </g>
      <g stroke={`url(#${idPrefix}-fade)`} strokeLinecap="round">
        <path d="M0 120c40-28 70-28 110 0s70 28 110 0 70-28 100 0" strokeWidth="1.35" />
        <path d="M0 128c40-16 70-16 110 0s70 16 110 0 70-16 100 0" strokeWidth="0.6" opacity="0.7" />
        <path d="M0 310c26 24 48 24 74 0s48-24 74 0 48 24 74 0 48-24 74 0" strokeWidth="1.15" />
        <path d="M0 520c48-12 72-12 120 0s72 12 120 0 60-10 80 0" strokeWidth="1.25" />
        <path d="M0 760c20-30 42-30 62 0s42 30 62 0 42-30 62 0 42 30 62 0 36-22 40 0" strokeWidth="1.05" />
        <path d="M0 1020c36 16 60 16 96 0s60-16 96 0 56 14 88 0" strokeWidth="1.3" />
        <path d="M0 1288c22-18 44-18 66 0s44 18 66 0 44-18 66 0 44 18 66 0 40-14 46 0" strokeWidth="0.95" />
        <path d="M0 1560c44 10 68 10 112 0s68-10 112 0 52 8 70 0" strokeWidth="1.2" />
        <path d="M0 1824c18 28 40 28 58 0s40-28 58 0 40 28 58 0 40-28 58 0 36 20 42 0" strokeWidth="1" />
        <path d="M0 2088c38-14 64-14 102 0s64 14 102 0 50-12 70 0" strokeWidth="1.15" />
      </g>
      <g fill="#7c3aed">
        <circle cx="18" cy="120" r="1.6" opacity="0.55" />
        <circle cx="46" cy="520" r="1.3" opacity="0.4" />
        <circle cx="28" cy="1020" r="1.7" opacity="0.45" />
        <circle cx="62" cy="1560" r="1.2" opacity="0.35" />
        <circle cx="22" cy="1824" r="1.5" opacity="0.4" />
      </g>
      <g fill="#3b82f6">
        <circle cx="86" cy="310" r="1.1" opacity="0.35" />
        <circle cx="70" cy="760" r="1.2" opacity="0.28" />
        <circle cx="54" cy="1288" r="1.1" opacity="0.3" />
      </g>
    </svg>
  );
}

function SparkBackdrop() {
  return (
    <div className="spark-backdrop" aria-hidden="true">
      <div className="spark-backdrop__wash" />
      <div className="spark-backdrop__side spark-backdrop__side--start">
        <div className="spark-backdrop__drift">
          <SparkWaveField idPrefix="spark-wave-a" />
        </div>
      </div>
      <div className="spark-backdrop__side spark-backdrop__side--end">
        <div className="spark-backdrop__drift spark-backdrop__drift--end">
          <SparkWaveField idPrefix="spark-wave-b" />
        </div>
      </div>
    </div>
  );
}

function SparkSignalMark() {
  return (
    <svg
      className="spark-signal"
      viewBox="0 0 160 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M8 28c8-14 16-14 24 0s16 14 24 0 16-14 24 0 16 14 24 0 16-14 24 0 16 14 24 0"
        stroke="url(#spark-signal-grad)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M8 28c8-8 16-8 24 0s16 8 24 0 16-8 24 0 16 8 24 0 16-8 24 0 16 8 24 0"
        stroke="url(#spark-signal-grad)"
        strokeWidth="1.25"
        strokeLinecap="round"
        opacity="0.55"
      />
      <circle cx="80" cy="28" r="3.5" fill="#5b21b6" />
      <circle cx="80" cy="28" r="8" stroke="#7c3aed" strokeWidth="1" opacity="0.35" />
      <defs>
        <linearGradient id="spark-signal-grad" x1="8" y1="28" x2="152" y2="28" gradientUnits="userSpaceOnUse">
          <stop stopColor="#5b21b6" stopOpacity="0.15" />
          <stop offset="0.5" stopColor="#7c3aed" />
          <stop offset="1" stopColor="#3b82f6" stopOpacity="0.35" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function SparkHeroVisual() {
  return (
    <div className="spark-hero-visual" aria-hidden="true">
      <div className="spark-hero-visual__orb" />
      <div className="spark-hero-visual__panel spark-hero-visual__panel--bot">
        <span className="spark-hero-visual__icon">AI</span>
        <span />
        <span />
        <span />
      </div>
      <div className="spark-hero-visual__panel spark-hero-visual__panel--list">
        <i />
        <i />
        <i />
        <i />
      </div>
      <div className="spark-hero-visual__signal">
        <SparkSignalMark />
      </div>
    </div>
  );
}

function SparkCallout({
  icon,
  children,
  delayStep = 1,
}: {
  icon: string;
  children: ReactNode;
  delayStep?: 0 | 1 | 2 | 3;
}) {
  return (
    <Reveal as="aside" className="spark-callout" variant="fade" delayStep={delayStep}>
      <span className="spark-callout__icon" aria-hidden="true">
        {icon}
      </span>
      <p>{children}</p>
    </Reveal>
  );
}

export function OutboundCallBotPage() {
  return (
    <ServicePageLayout
      path={PATH}
      currentPath={PATH}
      serviceName="Kolid Spark — שיחות יזומות וחימום לידים"
    >
      <article className="essay essay--spark">
        <ReadingProgress />
        <SparkBackdrop />
        <header className="spark-hero">
          <div className="spark-hero__inner">
            <Reveal className="spark-hero__copy">
              <div className="essay-header">
                <p className="essay-kicker">Kolid Spark</p>
                <h1>
                  שיחות יזומות מתחילות ברשימה,{' '}
                  <span className="spark-title-accent">לא בנציג</span>
                </h1>
              </div>
            </Reveal>
            <Reveal className="spark-hero__visual-wrap" delayStep={1} variant="fade">
              <SparkHeroVisual />
            </Reveal>
          </div>
        </header>
        <div className="spark-shell">
          <div className="spark-frame">
            <div className="spark-intro essay-inner">
              <Reveal>
                <p className="essay-lede">
                  רוב העסקים שמדברים איתנו על שיחות יזומות לא מחפשים עוד ערוץ. יש להם כבר רשימה:
                  לידים ישנים, פניות שלא נסגרו, אנשים שנרשמו פעם ולא חזרו. מה שחסר הוא מי שמוכן
                  לפתוח את השיחה הראשונה ולבדוק אם בכלל יש עם מי לדבר.
                </p>
              </Reveal>

              <Reveal delayStep={1}>
                <p>
                  כשהנציג הוא זה שפותח, חלק גדול מהיום הולך על אנשים שלא זוכרים את הפנייה, לא
                  פנויים, או אומרים מיד שזה לא רלוונטי. מה שנשאר לצוות המכירות הוא לא השיחה. זה
                  הסינון שלפניה.
                </p>
              </Reveal>
            </div>

            <div className="spark-body">
              <section className="essay-band essay-band--tint" id="spark-cold">
                <div className="essay-inner">
                  <Reveal>
                    <h2>מה קורה כשמתקשרים לרשימה קרה</h2>
                  </Reveal>
                  <Reveal delayStep={1}>
                    <p>
                      ליד קר הוא לא בהכרח אדם שלא מתעניין. לפעמים הוא לא זוכר שהשאיר פרטים. לפעמים
                      השאיר אותם בעונה אחרת, לעסק אחר, מסיבה שכבר לא קיימת. בגיליון כולם נראים אותו
                      דבר: שם, טלפון, סטטוס ישן. בטלפון ההבדל נשמע תוך דקה.
                    </p>
                  </Reveal>
                  <Reveal delayStep={2}>
                    <p>
                      מישהו אומר לחזור בעוד חודשיים. מישהו אחר אומר שאין לו מושג מי אתם. בגיליון
                      שניהם היו יכולים להופיע כ״לא ענה״ או כ״לחזור״. השיחה היא מה שמפריד ביניהם.
                    </p>
                  </Reveal>
                  <Reveal delayStep={3}>
                    <p>
                      Kolid Spark הוא בוט קולי שיוצא לרשימה הזו. הוא מתקשר, מציג את עצמו, ומנהל שיחה
                      קצרה שמטרתה אחת: להבין אם יש עניין להמשיך. מי שמביע עניין עובר לנציג. מי שלא,
                      השיחה נגמרת שם.
                    </p>
                  </Reveal>
                  <SparkCallout icon="01" delayStep={2}>
                    הערך של שיחה יזומה הוא לא בכמות המספרים שחויגו, אלא בהפרדה בין רשומות שעדיין
                    שוות חזרה לבין רשומות שכדאי להוציא מהתור.
                  </SparkCallout>
                  <Reveal delayStep={1}>
                    <p>
                      אין כאן הבטחה שכל רשומה תהפוך לפגישה. יש ציפייה צנועה יותר: הנציג נכנס אחרי
                      שמישהו כבר דיבר עם האדם בצד השני.
                    </p>
                  </Reveal>
                </div>
              </section>

              <section className="essay-band" id="spark-short">
                <div className="essay-inner">
                  <Reveal>
                    <h2>השיחה קצרה בכוונה</h2>
                  </Reveal>
                  <Reveal delayStep={1}>
                    <p>
                      בוט שיוצא החוצה לא אמור לסגור עסקה. הוא אמור לשאול את מה שנציג היה שואל בדקה
                      הראשונה, ולהקשיב לתשובה. מתעניין. לא מתעניין. תתקשרו בעוד חודש. תורידו אותי
                      מהרשימה. כל אחת מהתשובות האלה שווה יותר משורה ריקה.
                    </p>
                  </Reveal>
                  <Reveal delayStep={2}>
                    <p>
                      את מה שנחשב עניין קובעים מראש, לפי מה שהעסק באמת רוצה לדעת. אצל אחד זו שאלה על
                      לוח זמנים. אצל אחר, אם בכלל נשאר תקציב השנה. הבוט לא אמור לאלתר תסריט שנשמע
                      סביר בכל תחום.
                    </p>
                  </Reveal>
                  <Reveal delayStep={1} variant="fade">
                    <blockquote className="spark-pullquote">
                      “שיחה יזומה טובה לא מנסה למכור מוקדם מדי. היא מסדרת לצוות המכירות את מי שכבר
                      שווה שיחה אנושית.”
                    </blockquote>
                  </Reveal>
                  <Reveal delayStep={2}>
                    <p>
                      כשהשיחה רלוונטית, היא עוברת לנציג אנושי. הנציג מקבל אדם שכבר דיבר, לא מספר
                      טלפון מתוך רשימה.
                    </p>
                  </Reveal>
                  <SparkCallout icon="02" delayStep={3}>
                    תסריט קצר ומתוחם מקטין רעש: הוא מאפשר למדוד עניין, לתעד תשובות, ולהעביר לנציג
                    רק הקשר שהצוות באמת יכול לעבוד איתו.
                  </SparkCallout>
                </div>
              </section>

              <section className="essay-band essay-band--tint" id="spark-start">
                <div className="essay-inner">
                  <Reveal>
                    <h2>מאיפה זה מתחיל אצלכם</h2>
                  </Reveal>
                  <Reveal delayStep={1}>
                    <p>
                      מתחילים בחיבור הרשימה. אחר כך קובעים מה הבוט שואל, מתי הוא מתקשר, ומתי שיחה
                      נחשבת בשלה להעברה. מכאן השיחות יוצאות, והצוות רואה את מי שכדאי לחזור אליו.
                    </p>
                  </Reveal>
                  <Reveal delayStep={2}>
                    <p>
                      זה מתאים כשיש מאגר: פניות ישנות, לידים מקמפיין שכבר נגמר, לקוחות שלא דיברתם
                      איתם תקופה. זה פחות העניין כשהליד השאיר פרטים עכשיו ומחכה שמישהו יחזור אליו.
                      בשביל זה יש{' '}
                      <a href="/lead-warming">Kolid Flash</a>, שמתקשר לליד חדש אחרי הטופס.
                    </p>
                  </Reveal>
                  <SparkCallout icon="03" delayStep={2}>
                    Spark מתאים במיוחד לרשימות קיימות: לידים ישנים, קמפיינים שנגמרו, לקוחות רדומים
                    או מאגרים שצריכים בדיקת עניין לפני טיפול אנושי.
                  </SparkCallout>
                </div>
              </section>

              <section className="essay-band spark-cta-band" id="spark-wait" aria-label="יצירת קשר">
                <div className="essay-inner">
                  <Reveal variant="fade">
                    <LeadCtaStrip align="start" className="essay-cta essay-cta--page-end" />
                  </Reveal>
                </div>
              </section>
            </div>
          </div>
        </div>
      </article>
    </ServicePageLayout>
  );
}
