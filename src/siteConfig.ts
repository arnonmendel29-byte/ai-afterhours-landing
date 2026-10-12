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
  policyLastUpdated: '2026-10-09',
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
  whatsAppUrl: 'https://wa.me/972544460533',
  /** נקודת קצה לשליחת טופס (HTTPS). ניתן לדרוס עם VITE_FORM_ACTION_URL */
  formActionUrl:
    import.meta.env.VITE_FORM_ACTION_URL ?? 'https://formspree.io/f/xyekppay',
} as const;

export function isOwnerPlaceholder(value: string): boolean {
  return value.includes('[REQUIRES OWNER INPUT]');
}
