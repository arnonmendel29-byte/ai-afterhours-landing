import {
  useEffect,
  useRef,
  type ComponentPropsWithoutRef,
  type ElementType,
  type ReactNode,
} from 'react';

type RevealVariant = 'slide' | 'fade';
type RevealDelayStep = 0 | 1 | 2 | 3;

type RevealProps<T extends ElementType = 'div'> = {
  as?: T;
  children: ReactNode;
  className?: string;
  /** @deprecated Prefer delayStep */
  delay?: boolean;
  delayStep?: RevealDelayStep;
  variant?: RevealVariant;
} & Omit<
  ComponentPropsWithoutRef<T>,
  'as' | 'className' | 'children' | 'delay' | 'delayStep' | 'variant'
>;

function shouldRevealImmediately() {
  if (typeof window === 'undefined') return false;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return true;
  return document.documentElement.classList.contains('a11y-reduce-motion');
}

export function Reveal<T extends ElementType = 'div'>({
  children,
  className = '',
  delay = false,
  delayStep,
  variant = 'slide',
  as,
  ...rest
}: RevealProps<T>) {
  const Tag = (as ?? 'div') as ElementType;
  const ref = useRef<HTMLElement>(null);
  const step: RevealDelayStep = delayStep ?? (delay ? 1 : 0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (shouldRevealImmediately()) {
      el.classList.add('is-visible');
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible');
          observer.disconnect();
        }
      },
      { rootMargin: '0px 0px -6% 0px', threshold: 0.05 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const classes = [
    'reveal',
    variant === 'fade' ? 'reveal--fade' : '',
    step > 0 ? `delay-${step}` : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Tag ref={ref} className={classes} {...rest}>
      {children}
    </Tag>
  );
}
