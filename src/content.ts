export const navItems = [
  { label: 'בית', href: '#top' },
  { label: 'הפתרונות', href: '#solutions' },
  { label: 'תגובה מיידית', href: '/lead-warming' },
  { label: 'שיחות יזומות', href: '/outbound-call-bot' },
  { label: 'תמחור', href: '/lead-warming#pricing' },
  { label: 'אודות', href: '#about' },
] as const;

/** קישורי עוגן מעמוד הבית → קישורים מלאים מדפי משנה */
export function navHrefForPage(href: string): string {
  if (href.startsWith('#')) return `/${href}`;
  return href;
}

export function isNavItemCurrent(
  href: string,
  currentPath: string,
  locationHash = typeof window !== 'undefined' ? window.location.hash.replace(/^#/, '') : '',
): boolean {
  if (href.includes('#')) {
    const hashIndex = href.indexOf('#');
    const path = href.slice(0, hashIndex) || '/';
    const anchor = href.slice(hashIndex + 1);
    if (path !== currentPath) return false;
    return locationHash === anchor;
  }

  if (href.startsWith('#')) {
    if (currentPath !== '/') return false;
    const anchor = href.slice(1);
    if (anchor === 'top') return locationHash === '' || locationHash === 'top';
    return locationHash === anchor;
  }

  if (href.startsWith('/')) {
    if (href !== currentPath) return false;
    return locationHash === '';
  }

  return false;
}

export const faqSection = {
  eyebrow: 'שאלות נפוצות',
  title: 'כל מה שרציתם לדעת על קוליד',
};

export const about = {
  eyebrow: 'אודות',
  title: 'מי אנחנו',
  name: 'ניב אשור',
  role: 'מייסד ו-CEO',
  portraitAlt: 'ניב אשור, מייסד ו-CEO קוליד',
  paragraphs: [
    'אני מאמין שלכל עסק מגיע לקבל את הלידים החמים ביותר בלי לבזבז שעות על שיחות קרות.',
    'קוליד נולדה מתוך רצון לעזור לעסקים לנהל שיחות אנושיות, חכמות ומדויקות באמצעות AI — לבצע את שלב השיחה והסינון הראשוני, ולחבר את צוות המכירות רק למי שבאמת מתעניין.',
    'המטרה שלנו היא לחסוך לעסקים זמן, כסף ומשאבים, ולאפשר לצוותי המכירות להתמקד במה שהכי חשוב — סגירת עסקאות.',
  ],
};

export type RoadmapStage = {
  number: string;
  title: string;
  description: string;
  href?: string;
  linkLabel?: string;
};

/** שלבי «איך זה עובד» — דף חימום לידים */
export const leadWarmingFlow: RoadmapStage[] = [
  {
    number: '01',
    title: 'ליד משאיר פרטים',
    description:
      'הפנייה מגיעה מפרסום, טופס דיגיטלי או ערוץ שיווק אחר שאתם מפעילים.',
  },
  {
    number: '02',
    title: 'הבוט יוצר קשר טלפוני',
    description:
      'בהתאם להגדרות המערכת, הבוט מתקשר לליד ומנהל שיחה קולית — לא מסתפק בהודעת טקסט בלבד.',
  },
  {
    number: '03',
    title: 'שיחה ואיסוף מידע',
    description:
      'הבוט שואל שאלות לפי תסריט, מזהה רמת עניין ואוסף מידע רלוונטי להמשך הטיפול.',
  },
  {
    number: '04',
    title: 'העברה להמשך טיפול',
    description:
      'לידים רלוונטיים מועברים לצוות המכירות שלכם, כדי שהזמן שלהם יושקע בשיחות שיכולות להתקדם.',
    href: '/#demo-form',
    linkLabel: 'קבל הדגמה',
  },
];

export const productFlow = [
  {
    eyebrow: '01',
    title: 'שיחה נפתחת',
    body: 'בוט השיחות פונה לליד ומנהל איתו שיחה טבעית, בלי להמתין לנציג.',
  },
  {
    eyebrow: '02',
    title: 'שאלות בזמן אמת',
    body: 'הבוט שואל לפי תסריט שיחה חכם, ומתאים את ההמשך לתשובות של הליד.',
  },
  {
    eyebrow: '03',
    title: 'זיהוי התעניינות',
    body: 'תוך כדי השיחה הבוט מזהה אם מדובר במתעניין רלוונטי או בליד שעדיין לא בשל.',
  },
  {
    eyebrow: '04',
    title: 'העברה למכירות',
    body: 'רק ליד רלוונטי עובר לצוות המכירות, כדי שהזמן שלהם יישאר על שיחות שיכולות להתקדם.',
  },
];

export const useCases = [
  {
    name: 'תסריטי שיחה חכמים',
    pain: 'תסריטי שיחה מותאמים אישית שמאפשרים לבוט להתאים את השיחה בזמן אמת בהתאם לתשובות ולצרכים של כל ליד.',
    result: 'כל ליד מקבל שיחה שמתקדמת לפי מה שהוא עונה.',
  },
  {
    name: 'סינון לידים יעיל',
    pain: 'הבוט מזהה באופן חכם את הלידים הרלוונטיים ומעביר לצוות המכירות את המתעניינים המתאימים ביותר.',
    result: 'צוות המכירות פוגש קודם את מי שבאמת מתעניין.',
  },
  {
    name: 'אינטגרציה חלקה',
    pain: 'התממשקות למערכות CRM ולפלטפורמות מכירה קיימות, כדי לשלב את הבוט בתהליך העבודה של העסק ללא שינויים טכניים מורכבים.',
    result: 'הבוט נכנס לתהליך המכירה שכבר קיים בעסק.',
  },
];

// TODO: VERIFY BUSINESS CLAIM — שמות המערכות בפועל לא אושרו. מוצגות קטגוריות, לא ספקים.
export const integrations = ['CRM', 'מערכות מכירה', 'אימייל', 'ניהול לידים', 'צוות מכירות'];

export const faqs = [
  {
    question: 'מה בוט השיחות של קוליד עושה?',
    answer:
      'הבוט מנהל את השיחה הראשונית עם הליד, שואל שאלות, מזהה את רמת ההתעניינות ומעביר לצוות המכירות את המתעניינים הרלוונטיים.',
  },
  {
    question: 'איך זה חוסך זמן לצוות המכירות?',
    answer:
      'במקום שכל ליד יגיע ישר לשיחה אנושית, הבוט מבצע סינון ראשוני. הצוות מתמקד במי שכבר הראה עניין.',
  },
  {
    question: 'מה קורה אם הבוט לא מזהה בבירור את הליד?',
    answer:
      'המטרה של השיחה היא להבין התעניינות, לא לנחש. את אופן הסימון וההעברה במקרים לא חד-משמעיים נציג בהדגמה.',
  },
  {
    question: 'איך הליד מגיע לצוות?',
    answer:
      'ליד רלוונטי מועבר לצוות המכירות. החיבור למערכת CRM או לפלטפורמת המכירה הקיימת נקבע לפי תהליך העבודה של העסק.',
  },
  {
    question: 'איך קובעים הדגמה?',
    answer:
      'משאירים פרטים בטופס, או מתקשרים ל-054-4460533. נציג חוזר לתיאום הדגמה אישית של הבוט. המענה זמין 24/7.',
  },
];

export const formFields = ['שם מלא', 'טלפון', 'אימייל', 'הודעה'];
