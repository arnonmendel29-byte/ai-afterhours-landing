import { leadFormHref } from './leadForm';
import { siteConfig } from './siteConfig';
import './SiteLeadCtas.css';

function PhoneSparkIcon() {
  return (
    <svg className="site-lead-ctas__icon site-lead-ctas__icon--flash" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1C10.07 21 3 13.93 3 5a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.25 1.01l-2.2 2.2z"
      />
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        d="M14.5 4.5c2.2.75 3.9 2.45 4.65 4.65M14.5 7.2c1.2.4 2.15 1.35 2.55 2.55"
      />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg className="site-lead-ctas__icon" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.884 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
      />
    </svg>
  );
}

type WhatsAppLeadButtonProps = {
  className?: string;
  children?: string;
};

export const FLASH_TRY_CTA_LABEL = 'נסו את Kolid Flash עכשיו';
export const WHATSAPP_CTA_LABEL = 'דברו איתנו בוואטסאפ';

type FlashTryLeadButtonProps = {
  className?: string;
  onClick: () => void;
};

/** כפתור «נסו את Kolid Flash» — פותח טופס webhook (contact: 0) */
export function FlashTryLeadButton({ className = '', onClick }: FlashTryLeadButtonProps) {
  return (
    <button
      type="button"
      className={['site-lead-ctas__btn', 'site-lead-ctas__btn--flash-try', className].filter(Boolean).join(' ')}
      onClick={onClick}
    >
      <PhoneSparkIcon />
      <span>{FLASH_TRY_CTA_LABEL}</span>
    </button>
  );
}

/** כפתור וואטסאפ בודד — לשילוב בתוך בלוקים (למשל סוף timeline) */
export function WhatsAppLeadButton({
  className = '',
  children = WHATSAPP_CTA_LABEL,
}: WhatsAppLeadButtonProps) {
  const { whatsAppUrl } = siteConfig;
  if (!whatsAppUrl) {
    return null;
  }

  const btnClass = ['site-lead-ctas__btn', 'site-lead-ctas__btn--wa', className].filter(Boolean).join(' ');

  return (
    <a
      className={btnClass}
      href={whatsAppUrl}
      target="_blank"
      rel="noopener noreferrer"
    >
      <WhatsAppIcon />
      <span>{children}</span>
    </a>
  );
}

type SiteLeadCtasProps = {
  className?: string;
  formHref?: string;
  /** ברירת מחדל: וואטסאפ + «להשארת פרטים». flash-try-and-form: ניסיון Kolid Flash + «להשארת פרטים» */
  layout?: 'whatsapp-and-form' | 'flash-try-and-form';
  /** נדרש כש-layout הוא flash-try-and-form — פותח את טופס הניסיון */
  onFlashTry?: () => void;
  /** מחליף את קישור «להשארת פרטים» בכפתור פעולה, למשל ניסיון Kolid Flash */
  secondaryAction?: {
    label: string;
    onClick: () => void;
    /** עיצוב בולט לניסיון Kolid Flash */
    variant?: 'default' | 'flash-try';
  };
};

export function SiteLeadCtas({
  className = '',
  formHref: formHrefProp,
  layout = 'whatsapp-and-form',
  onFlashTry,
  secondaryAction,
}: SiteLeadCtasProps) {
  const { whatsAppUrl } = siteConfig;
  const formHref = formHrefProp ?? leadFormHref();
  const flashTryAndForm = layout === 'flash-try-and-form';
  const flashPromo = !flashTryAndForm && secondaryAction?.variant === 'flash-try';
  const rootClass = [
    'site-lead-ctas',
    'site-lead-ctas--inline',
    flashPromo ? 'site-lead-ctas--flash-promo' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const formLink = (
    <a
      className="site-lead-ctas__btn site-lead-ctas__btn--form"
      href={formHref}
      aria-label="להשארת פרטים"
    >
      <span>להשארת פרטים</span>
    </a>
  );

  const flashTryButton = secondaryAction ? (
    flashPromo ? (
      <FlashTryLeadButton onClick={secondaryAction.onClick} />
    ) : (
      <button
        type="button"
        className="site-lead-ctas__btn site-lead-ctas__btn--form"
        onClick={secondaryAction.onClick}
      >
        <span>{secondaryAction.label}</span>
      </button>
    )
  ) : (
    formLink
  );

  const whatsAppButton =
    whatsAppUrl ? (
      <a
        className={[
          'site-lead-ctas__btn site-lead-ctas__btn--wa',
          flashPromo ? 'site-lead-ctas__btn--wa-secondary' : '',
        ]
          .filter(Boolean)
          .join(' ')}
        href={whatsAppUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        <WhatsAppIcon />
        <span>{WHATSAPP_CTA_LABEL}</span>
      </a>
    ) : null;

  if (flashTryAndForm) {
    return (
      <div className={rootClass} role="group" aria-label="יצירת קשר">
        <FlashTryLeadButton onClick={onFlashTry ?? (() => {})} />
        {formLink}
      </div>
    );
  }

  return (
    <div className={rootClass} role="group" aria-label="יצירת קשר">
      {flashPromo ? (
        <>
          {flashTryButton}
          {whatsAppButton}
        </>
      ) : (
        <>
          {whatsAppButton}
          {flashTryButton}
        </>
      )}
    </div>
  );
}

type LeadCtaStripProps = {
  className?: string;
  align?: 'center' | 'start';
  tone?: 'default' | 'on-purple';
  formHref?: string;
  secondaryAction?: SiteLeadCtasProps['secondaryAction'];
};

/** שורת כפתורי וואטסאפ + טופס — לשילוב אחרי בלוקי תוכן */
export function LeadCtaStrip({
  className = '',
  align = 'center',
  tone = 'default',
  formHref,
  secondaryAction,
}: LeadCtaStripProps) {
  const rootClass = [
    'lead-cta-strip',
    align === 'start' ? 'lead-cta-strip--start' : '',
    tone === 'on-purple' ? 'lead-cta-strip--on-purple' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={rootClass}>
      <SiteLeadCtas formHref={formHref} secondaryAction={secondaryAction} />
    </div>
  );
}
