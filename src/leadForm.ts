export const LEAD_FORM_ID = 'demo-form';

const LOCAL_LEAD_FORM_PATHS = new Set(['/', '/lead-warming']);

export function leadFormHref(pathname = typeof window !== 'undefined' ? window.location.pathname : '/'): string {
  const path = pathname.replace(/\/+$/, '') || '/';
  return LOCAL_LEAD_FORM_PATHS.has(path) ? `#${LEAD_FORM_ID}` : `/#${LEAD_FORM_ID}`;
}

export function isLeadFormHash(hash = typeof window !== 'undefined' ? window.location.hash : ''): boolean {
  return hash.replace(/^#/, '') === LEAD_FORM_ID;
}

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** גלילה לטופס הלידים; מחזיר true אם האלמנט נמצא */
export function scrollToLeadForm(behavior?: ScrollBehavior): boolean {
  const target = document.getElementById(LEAD_FORM_ID);
  if (!target) {
    return false;
  }

  const scrollBehavior = behavior ?? (prefersReducedMotion() ? 'auto' : 'smooth');
  target.scrollIntoView({ behavior: scrollBehavior, block: 'start' });
  return true;
}

/** ממתין ל-mount של עמוד הבית (אחרי loader) ואז גולל לטופס */
export function scrollToLeadFormWhenReady(maxAttempts = 16, intervalMs = 80): () => void {
  if (!isLeadFormHash()) {
    return () => {};
  }

  let attempts = 0;
  let timer = 0;
  let cancelled = false;

  const tick = () => {
    if (cancelled || !isLeadFormHash()) {
      return;
    }
    attempts += 1;
    if (scrollToLeadForm()) {
      return;
    }
    if (attempts < maxAttempts) {
      timer = window.setTimeout(tick, intervalMs);
    }
  };

  tick();

  return () => {
    cancelled = true;
    window.clearTimeout(timer);
  };
}
