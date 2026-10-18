import { useEffect, useState, type ReactNode } from 'react';
import { EvaRobot } from './EvaRobot';
import './PageLoader.css';

const DESKTOP_MIN_VISIBLE_MS = 1600;
const MOBILE_MIN_VISIBLE_MS = 720;
const EXIT_MS = 420;

type PageLoaderProps = {
  children: ReactNode;
};

function getMinVisibleMs() {
  if (typeof window === 'undefined') return DESKTOP_MIN_VISIBLE_MS;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return 0;
  if (window.matchMedia('(max-width: 767px)').matches) return MOBILE_MIN_VISIBLE_MS;
  return DESKTOP_MIN_VISIBLE_MS;
}

function shouldShowLoader() {
  if (typeof window === 'undefined') return true;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  if (window.matchMedia('(max-width: 767px)').matches) return false;
  return true;
}

export function PageLoader({ children }: PageLoaderProps) {
  const [mounted, setMounted] = useState(shouldShowLoader);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (!mounted) return;

    const startedAt = performance.now();
    const minVisibleMs = getMinVisibleMs();
    let exitTimer = 0;
    let removeTimer = 0;
    let cancelled = false;

    let dismissed = false;

    const dismiss = () => {
      if (cancelled || dismissed) return;
      dismissed = true;
      const elapsed = performance.now() - startedAt;
      const wait = Math.max(0, minVisibleMs - elapsed);

      exitTimer = window.setTimeout(() => {
        if (cancelled) return;
        setExiting(true);
        removeTimer = window.setTimeout(() => {
          if (!cancelled) setMounted(false);
        }, EXIT_MS);
      }, wait);
    };

    const maxWaitTimer = window.setTimeout(dismiss, 8000);

    if (minVisibleMs === 0) {
      dismiss();
    } else if (document.readyState === 'complete' || document.readyState === 'interactive') {
      dismiss();
    } else {
      window.addEventListener('DOMContentLoaded', dismiss, { once: true });
      window.addEventListener('load', dismiss, { once: true });
    }

    return () => {
      cancelled = true;
      window.removeEventListener('DOMContentLoaded', dismiss);
      window.removeEventListener('load', dismiss);
      window.clearTimeout(maxWaitTimer);
      window.clearTimeout(exitTimer);
      window.clearTimeout(removeTimer);
    };
  }, [mounted]);

  return (
    <>
      {children}
      {mounted ? (
        <div
          className={`page-loader${exiting ? ' is-exiting' : ''}`}
          role="status"
          aria-live="polite"
          aria-busy={!exiting}
          aria-label="טוען"
        >
          <EvaRobot />
          <span className="page-loader-sr">טוען…</span>
        </div>
      ) : null}
    </>
  );
}
