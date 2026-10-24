import { useEffect, useRef, type RefObject } from 'react';

type Options = {
  rootMargin?: string;
};

/** Runs `sync` on scroll/resize only while `target` intersects the viewport (passive, rAF-throttled). */
export function useInViewScrollSync(
  targetRef: RefObject<HTMLElement | null>,
  sync: () => void,
  options: Options = {},
) {
  const syncRef = useRef(sync);
  syncRef.current = sync;

  useEffect(() => {
    const target = targetRef.current;
    if (!target) return;

    const inViewRef = { current: false };
    let frame = 0;

    const run = () => {
      syncRef.current();
    };

    const schedule = () => {
      if (!inViewRef.current) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(run);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        inViewRef.current = entry.isIntersecting;
        if (entry.isIntersecting) schedule();
      },
      { rootMargin: options.rootMargin ?? '100px 0px', threshold: 0 },
    );
    observer.observe(target);

    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    schedule();

    return () => {
      inViewRef.current = false;
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [targetRef, options.rootMargin]);
}
