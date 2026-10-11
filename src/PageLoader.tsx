import { useEffect, useState, type ReactNode } from 'react';
import { EvaRobot } from './EvaRobot';
import './PageLoader.css';

const MIN_VISIBLE_MS = 1600;
const EXIT_MS = 420;

type PageLoaderProps = {
  children: ReactNode;
};

export function PageLoader({ children }: PageLoaderProps) {
  const [mounted, setMounted] = useState(true);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const startedAt = performance.now();
    let exitTimer = 0;
    let removeTimer = 0;
    let cancelled = false;

    const dismiss = () => {
      if (cancelled) return;
      const elapsed = performance.now() - startedAt;
      const wait = Math.max(0, MIN_VISIBLE_MS - elapsed);

      exitTimer = window.setTimeout(() => {
        if (cancelled) return;
        setExiting(true);
        removeTimer = window.setTimeout(() => {
          if (!cancelled) setMounted(false);
        }, EXIT_MS);
      }, wait);
    };

    if (document.readyState === 'complete') {
      dismiss();
    } else {
      window.addEventListener('load', dismiss, { once: true });
    }

    return () => {
      cancelled = true;
      window.removeEventListener('load', dismiss);
      window.clearTimeout(exitTimer);
      window.clearTimeout(removeTimer);
    };
  }, []);

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
