export const homeProducts = {
  eyebrow: 'הפתרונות שלנו',
  title: 'שני פתרונות קוליים. שתי מטרות עסקיות ברורות.',
  subtitle:
    'קוליד מציעה בוטים קוליים מבוססי AI שמנהלים שיחות טלפון ומייעלים את הטיפול בלידים. בחרו לפי סוג הלידים שאתם מטפלים בהם.',
} as const;

export const productChooser = [
  {
    question: 'לידים חדשים שהשאירו פרטים?',
    answer: 'Kolid Flash',
    href: '/lead-warming',
    featured: true,
  },
  {
    question: 'לידים קרים או רשימות קיימות?',
    answer: 'Kolid Spark',
    href: '/outbound-call-bot',
    featured: false,
  },
] as const;

export type HomeProduct = {
  id: string;
  href: string;
  title: string;
  fit: string;
  description: string;
  points: string[];
  cta: string;
  secondaryCta?: { label: string; href: string };
  featured: boolean;
};

/** המוצר המרכזי (Kolid Flash — תגובה מיידית) ראשון ברשימה */
export const homeProductCards: HomeProduct[] = [
  {
    id: 'instant',
    href: '/lead-warming',
    title: 'Kolid Flash — תגובה מיידית ללידים',
    fit: 'מתאים לעסקים שמקבלים פניות ורוצים לחזור לליד במהירות.',
    description:
      'פתרון AI שמתקשר אוטומטית ללידים חדשים לאחר שהשאירו פרטים, מנהל שיחה ראשונית ואוסף מידע להמשך טיפול.',
    points: [
      'יצירת קשר מהירה לאחר השארת פרטים.',
      'זמינות בהתאם להגדרות המערכת.',
      'תשאול ראשוני ואיסוף מידע.',
      'צמצום הסיכון לאובדן לידים בגלל עיכוב במענה.',
    ],
    cta: 'לפרטים על Kolid Flash',
    secondaryCta: { label: 'למסלולי תמחור', href: '/lead-warming#pricing' },
    featured: true,
  },
  {
    id: 'outbound',
    href: '/outbound-call-bot',
    title: 'Kolid Spark — שיחות יזומות וחימום לידים',
    fit: 'מתאים לעסקים שרוצים ליצור קשר עם קהל קיים או עם לידים שעדיין לא הביעו עניין פעיל.',
    description:
      'פתרון AI שמבצע שיחות יזומות ללידים קרים או לרשימות קיימות, מסנן את רמת העניין ומעביר לידים רלוונטיים לנציג מכירות.',
    points: [
      'יצירת קשר יזום עם רשימות לידים.',
      'ניהול שיחה קולית וסינון ראשוני.',
      'זיהוי לקוחות שהביעו עניין.',
      'העברת לידים רלוונטיים לנציג אנושי.',
    ],
    cta: 'לפרטים על Kolid Spark',
    featured: false,
  },
];

export type PricingPlan = {
  id: string;
  name: string;
  /** מקום שמור למחיר — אין מחיר מספרי עד אישור הלקוח */
  priceLabel: string;
  description: string;
  /** רשימה ריקה עד שהלקוח יאשר תכונות לכל מסלול */
  features: string[];
  featuresPendingNote: string;
  ctaLabel: string;
  ctaHref: string;
};

export const instantLeadPricing = {
  eyebrow: 'תמחור',
  title: 'פתרון שמתאים לצרכים ולהיקף הפעילות של העסק שלכם.',
  footnote: 'צרו איתנו קשר לקבלת פרטים והתאמה של המסלול לפעילות העסקית שלכם.',
  plans: [
    {
      id: 'starter',
      name: 'Starter',
      priceLabel: 'בהתאמה אישית',
      description: 'לקבלת הצעת מחיר',
      features: [],
      featuresPendingNote: 'פירוט התכונות יעודכן לאחר אישור פרטי המסלול.',
      ctaLabel: 'לקבלת הצעה',
      ctaHref: '/#demo-form',
    },
    {
      id: 'growth',
      name: 'Growth',
      priceLabel: 'בהתאמה אישית',
      description: 'לקבלת הצעת מחיר',
      features: [],
      featuresPendingNote: 'פירוט התכונות יעודכן לאחר אישור פרטי המסלול.',
      ctaLabel: 'לקבלת הצעה',
      ctaHref: '/#demo-form',
    },
    {
      id: 'scale',
      name: 'Scale',
      priceLabel: 'בהתאמה אישית',
      description: 'לקבלת הצעת מחיר',
      features: [],
      featuresPendingNote: 'פירוט התכונות יעודכן לאחר אישור פרטי המסלול.',
      ctaLabel: 'לקבלת הצעה',
      ctaHref: '/#demo-form',
    },
  ] satisfies PricingPlan[],
} as const;
