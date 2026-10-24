/**
 * פרטי עסק ותצורת אתר — עדכנו לפני פרסום.
 * אל תפרסמו ערכי [REQUIRES OWNER INPUT] בלי השלמה.
 */
export const siteConfig = {
  brandName: 'קוליד',
  logoSrc: '/kolid-logo.png',
  logoAlt: 'קוליד — לוגו עם סמל רובוט ואוזניות',
  siteUrl: 'https://num8.vercel.app',
  /** תאריך עדכון מדיניות (ISO) — עדכנו בכל שינוי מהותי */
  policyLastUpdated: '2026-10-24',
  contact: {
    phoneDisplay: '054-4460533',
    phoneE164: '+972544460533',
    email: '[REQUIRES OWNER INPUT]',
  },
  business: {
    legalName: '[REQUIRES OWNER INPUT]',
    registrationNumber: '[REQUIRES OWNER INPUT]',
    address: '[REQUIRES OWNER INPUT]',
  },
  /**
   * קישור WhatsApp רשמי (wa.me). השאירו null עד לאימות מספר וטקסט פתיחה.
   * דוגמה: https://wa.me/972544460533?text=...
   */
  whatsAppUrl: 'https://wa.me/972557720398',
  /** נקודת קצה לשליחת טופס (HTTPS). ניתן לדרוס עם VITE_FORM_ACTION_URL */
  formActionUrl:
    import.meta.env.VITE_FORM_ACTION_URL ?? 'https://formspree.io/f/xyekppay',
  /**
   * Webhook ליצירת קשר: name, phone, contact.
   * contact 0 — הבוט מתקשר (נסו את Kolid Flash). contact 1 — השארת פרטים בלי שיחה.
   */
  leadWebhookUrl:
    import.meta.env.VITE_LEAD_WEBHOOK_URL ??
    'https://hook.eu2.make.com/yt3nkb3crcq5c5qf6b5x4mex288dfivt',
} as const;

export function isOwnerPlaceholder(value: string): boolean {
  return value.includes('[REQUIRES OWNER INPUT]');
}
