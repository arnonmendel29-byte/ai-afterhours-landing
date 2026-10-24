import { formFields } from './content';
import { submitLeadWebhook } from './leadWebhook';
import { Reveal } from './Reveal';
import { CtaStar } from './StarBorder';
import { siteConfig } from './siteConfig';
import { useState, type FormEvent } from 'react';

const FORM_FIELD_ATTR: Record<
  string,
  { id: string; name: string; autoComplete?: string; inputMode?: 'text' | 'tel' | 'email' }
> = {
  'שם מלא': { id: 'field-full-name', name: 'fullName', autoComplete: 'name' },
  אימייל: { id: 'field-email', name: 'email', autoComplete: 'email', inputMode: 'email' },
  טלפון: { id: 'field-phone', name: 'phone', autoComplete: 'tel', inputMode: 'tel' },
  הודעה: { id: 'field-message', name: 'message', autoComplete: 'off' },
};

type LeadDemoFormSectionProps = {
  titleId?: string;
  fieldIdPrefix?: string;
};

/** עמודת תוכן + טופס הדגמה — כמו בתחתית עמוד הבית */
export function LeadDemoFormSection({
  titleId = 'final-title',
  fieldIdPrefix = '',
}: LeadDemoFormSectionProps) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'offline' | 'error'>('idle');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const action = siteConfig.formActionUrl;

    if (!action) {
      setStatus('offline');
      form.querySelector<HTMLElement>('[data-form-status]')?.focus();
      return;
    }

    setStatus('sending');
    try {
      const body = new FormData(form);
      const name = String(body.get('fullName') ?? '');
      const phone = String(body.get('phone') ?? '');
      const [response] = await Promise.all([
        fetch(action, {
          method: 'POST',
          body,
          headers: { Accept: 'application/json' },
        }),
        submitLeadWebhook({ name, phone, contact: 1 }),
      ]);
      if (!response.ok) throw new Error('submit failed');
      setStatus('ok');
      form.reset();
    } catch {
      setStatus('error');
    }
    form.querySelector<HTMLElement>('[data-form-status]')?.focus();
  };

  return (
    <>
      <Reveal className="section-copy">
        <h2 id={titleId}>
          מוכנים להפוך לידים קרים <span className="text-highlight">ללקוחות</span>?
        </h2>
        <p>מלאו את הפרטים ונציג שלנו יחזור אליכם לתיאום הדגמה אישית של הבוט.</p>
      </Reveal>
      <Reveal
        as="form"
        className="demo-form"
        delay
        onSubmit={handleSubmit}
        action={siteConfig.formActionUrl ?? undefined}
        method="post"
        aria-labelledby={titleId}
      >
        <input type="hidden" name="_subject" value={`בקשת הדגמה — ${siteConfig.brandName}`} />
        {formFields.map((field) => {
          const meta = FORM_FIELD_ATTR[field] ?? {
            id: `field-${field}`,
            name: field,
          };
          const fieldId = `${fieldIdPrefix}${meta.id}`;
          const isOptional = field === 'הודעה' || field === 'אימייל';
          const optionalHintId = `${fieldId}-optional-hint`;
          return (
            <label
              key={field}
              htmlFor={fieldId}
              className={isOptional ? 'demo-form__field demo-form__field--optional' : 'demo-form__field'}
            >
              <span className="demo-form__label">
                {field}
                {isOptional ? <span className="demo-form__optional-badge">אופציונלי</span> : null}
              </span>
              <input
                id={fieldId}
                name={meta.name}
                type={field.includes('אימייל') ? 'email' : field.includes('טלפון') ? 'tel' : 'text'}
                inputMode={meta.inputMode}
                autoComplete={meta.autoComplete}
                placeholder={field.includes('אימייל') ? 'name@company.co.il' : field}
                required={!isOptional}
                aria-required={!isOptional}
                aria-describedby={isOptional ? optionalHintId : undefined}
              />
              {isOptional ? (
                <span id={optionalHintId} className="demo-form__optional-hint">
                  לא חובה למלא
                </span>
              ) : null}
            </label>
          );
        })}
        <p className="form-privacy-note">
          שליחת הטופס מהווה פנייה לקבלת הדגמה. פרטים נוספים ב{' '}
          <a href="/privacy-policy">מדיניות הפרטיות</a>.
        </p>
        <p className="form-note">
          אפשר גם להתקשר:{' '}
          <a href={`tel:${siteConfig.contact.phoneE164}`}>{siteConfig.contact.phoneDisplay}</a>. זמינות 24/7.
        </p>
        <div className="form-status" data-form-status tabIndex={-1} role="status" aria-live="polite">
          {status === 'offline' && (
            <>
              שליחת טופס אינה פעילה עדיין באתר. התקשרו או השאירו פרטים בטלפון:{' '}
              <a href={`tel:${siteConfig.contact.phoneE164}`}>{siteConfig.contact.phoneDisplay}</a>.
            </>
          )}
          {status === 'ok' && 'הפרטים נשלחו. נחזור אליכם בהקדם.'}
          {status === 'error' && 'לא הצלחנו לשלוח. נסו שוב או התקשרו אלינו.'}
          {status === 'sending' && 'שולח…'}
        </div>
        <CtaStar className="cta-block" type="submit" disabled={status === 'sending'}>
          השאר פרטים
        </CtaStar>
      </Reveal>
    </>
  );
}
