import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import './PageLoader.css';

const EXIT_MS = 380;
const COMPLETE_MS = 320;
const FAILSAFE_MS = 7000;
const RING_RADIUS = 58;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

type PageLoaderProps = {
  children: ReactNode;
};

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function documentIsReady() {
  return document.readyState === 'interactive' || document.readyState === 'complete';
}

export function PageLoader({ children }: PageLoaderProps) {
  const [mounted, setMounted] = useState(true);
  const [exiting, setExiting] = useState(false);
  const [progress, setProgress] = useState(0);

  const rootRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const readyRef = useRef(false);
  const finishingRef = useRef(false);
  const cancelledRef = useRef(false);

  useEffect(() => {
    cancelledRef.current = false;
    const reduceMotion = prefersReducedMotion();
    let raf = 0;
    let removeTimer = 0;
    let failsafeTimer = 0;
    let lastPaint = 0;
    const startedAt = performance.now();

    const paintProgress = (value: number, force = false) => {
      const next = Math.min(1, Math.max(0, value));
      progressRef.current = next;
      rootRef.current?.style.setProperty('--loader-progress', next.toFixed(4));

      const now = performance.now();
      if (force || now - lastPaint > 48) {
        lastPaint = now;
        setProgress(Math.round(next * 100));
      }
    };

    const hide = () => {
      if (cancelledRef.current) return;
      setExiting(true);
      removeTimer = window.setTimeout(() => {
        if (!cancelledRef.current) setMounted(false);
      }, EXIT_MS);
    };

    const finish = () => {
      if (finishingRef.current || cancelledRef.current) return;
      finishingRef.current = true;
      cancelAnimationFrame(raf);

      if (reduceMotion) {
        paintProgress(1, true);
        hide();
        return;
      }

      const from = progressRef.current;
      const begin = performance.now();

      const tickComplete = (now: number) => {
        if (cancelledRef.current) return;
        const t = Math.min(1, (now - begin) / COMPLETE_MS);
        const eased = 1 - (1 - t) ** 3;
        paintProgress(from + (1 - from) * eased, t === 1);
        if (t < 1) {
          raf = requestAnimationFrame(tickComplete);
          return;
        }
        hide();
      };

      raf = requestAnimationFrame(tickComplete);
    };

    const markReady = () => {
      if (readyRef.current) return;
      readyRef.current = true;
      finish();
    };

    const tickIndicative = (now: number) => {
      if (cancelledRef.current || finishingRef.current) return;
      const elapsed = now - startedAt;
      // Indicative only — not a measured percentage of total resources.
      const target = 0.88 * (1 - Math.exp(-elapsed / 1400));
      if (target > progressRef.current) paintProgress(target);
      raf = requestAnimationFrame(tickIndicative);
    };

    const onDomReady = () => {
      void (async () => {
        if (!reduceMotion && document.fonts?.ready) {
          try {
            await Promise.race([
              document.fonts.ready,
              new Promise<void>((resolve) => {
                window.setTimeout(resolve, 900);
              }),
            ]);
          } catch {
            // Optional; never block content on font failures.
          }
        }
        markReady();
      })();
    };

    paintProgress(reduceMotion ? 1 : 0.04, true);

    if (!reduceMotion) {
      raf = requestAnimationFrame(tickIndicative);
    }

    if (documentIsReady()) {
      onDomReady();
    } else {
      window.addEventListener('DOMContentLoaded', onDomReady, { once: true });
    }

    window.addEventListener('load', markReady, { once: true });
    failsafeTimer = window.setTimeout(markReady, FAILSAFE_MS);

    return () => {
      cancelledRef.current = true;
      cancelAnimationFrame(raf);
      window.clearTimeout(removeTimer);
      window.clearTimeout(failsafeTimer);
      window.removeEventListener('DOMContentLoaded', onDomReady);
      window.removeEventListener('load', markReady);
    };
  }, []);

  const dashOffset = RING_CIRCUMFERENCE * (1 - progress / 100);

  return (
    <>
      {children}
      {mounted ? (
        <div
          ref={rootRef}
          className={`page-loader${exiting ? ' is-exiting' : ''}`}
          style={{ '--loader-progress': progress / 100 } as CSSProperties}
          role="status"
          aria-live="polite"
          aria-busy={!exiting}
          aria-label="טוען"
        >
          <div className="page-loader__stage">
            <div className="page-loader__orb" aria-hidden="true">
              <span className="page-loader__halo" />
              <svg className="page-loader__ring" viewBox="0 0 140 140">
                <circle
                  className="page-loader__ring-track"
                  cx="70"
                  cy="70"
                  r={RING_RADIUS}
                  fill="none"
                />
                <circle
                  className="page-loader__ring-value"
                  cx="70"
                  cy="70"
                  r={RING_RADIUS}
                  fill="none"
                  strokeDasharray={RING_CIRCUMFERENCE}
                  strokeDashoffset={dashOffset}
                  transform="rotate(-90 70 70)"
                />
              </svg>
              <img
                className="page-loader__robot"
                src="/hero-robot-mobile.webp"
                alt=""
                width={160}
                height={160}
                decoding="async"
                fetchPriority="high"
              />
            </div>

            <p className="page-loader__label">טוען...</p>
            <p className="page-loader__percent" aria-hidden="true">
              {progress}%
            </p>
            <div className="page-loader__bar" aria-hidden="true">
              <span className="page-loader__bar-fill" />
            </div>
          </div>

          <span className="page-loader-sr">טוען…</span>
        </div>
      ) : null}
    </>
  );
}
