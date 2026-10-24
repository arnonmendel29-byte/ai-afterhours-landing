import { useEffect, useId, useRef, useState, type FormEvent } from 'react';
import { createPortal } from 'react-dom';
import { submitLeadWebhook } from './leadWebhook';
import './FlashTryDialog.css';

type FlashTryDialogProps = {
  open: boolean;
  onClose: () => void;
};

export function FlashTryDialog({ open, onClose }: FlashTryDialogProps) {
  const titleId = useId();
  const descriptionId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle');
  const statusRef = useRef(status);
  statusRef.current = status;

  useEffect(() => {
    if (!open) {
      setStatus('idle');
      return;
    }

    const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const frame = requestAnimationFrame(() => nameRef.current?.focus());
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && statusRef.current !== 'sending') {
        onClose();
        return;
      }
      if (event.key !== 'Tab' || !dialogRef.current) return;
      const focusable = [...dialogRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), input:not([disabled])')];
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
      previous?.focus();
    };
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  const close = () => {
    if (status === 'sending') return;
    onClose();
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get('name') ?? '').trim();
    const phone = String(data.get('phone') ?? '').trim();
    if (!name || !phone) return;

    setStatus('sending');
    try {
      await submitLeadWebhook({ name, phone, contact: 0 });
      setStatus('ok');
      form.reset();
    } catch {
      setStatus('error');
    }
  };

  return createPortal(
    <div className="flash-try" role="presentation" onMouseDown={close}>
      <div
        ref={dialogRef}
        className="flash-try__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button type="button" className="flash-try__close" onClick={close} aria-label="סגירה">
          ×
        </button>
        <h2 id={titleId}>נסו את Kolid Flash עכשיו</h2>
        <p id={descriptionId}>השאירו שם וטלפון, ו-Kolid Flash יתקשר אליכם.</p>
        <form className="flash-try__form" onSubmit={handleSubmit}>
          <label className="flash-try__field">
            <span>שם</span>
            <input
              ref={nameRef}
              name="name"
              type="text"
              autoComplete="name"
              required
              disabled={status === 'sending' || status === 'ok'}
            />
          </label>
          <label className="flash-try__field">
            <span>טלפון</span>
            <input
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              required
              disabled={status === 'sending' || status === 'ok'}
            />
          </label>
          <p className="flash-try__privacy">
            שליחת הטופס מתחילה שיחה מ-Kolid Flash. פרטים נוספים ב{' '}
            <a href="/privacy-policy">מדיניות הפרטיות</a>.
          </p>
          <p className="flash-try__status" role="status" aria-live="polite">
            {status === 'sending' && 'שולח…'}
            {status === 'ok' && 'הפרטים נשלחו. Kolid Flash יתקשר אליכם בעוד רגע.'}
            {status === 'error' && 'לא הצלחנו לשלוח. נסו שוב.'}
          </p>
          {status === 'ok' ? (
            <button type="button" className="flash-try__submit" onClick={close}>
              סגירה
            </button>
          ) : (
            <button type="submit" className="flash-try__submit" disabled={status === 'sending'}>
              נסו את Kolid Flash עכשיו
            </button>
          )}
        </form>
      </div>
    </div>,
    document.body,
  );
}
