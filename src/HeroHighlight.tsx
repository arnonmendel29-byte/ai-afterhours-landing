import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
} from 'framer-motion';
import { useState, type MouseEvent, type ReactNode } from 'react';
import './HeroHighlight.css';

type HeroHighlightProps = {
  children: ReactNode;
  className?: string;
};

type HighlightProps = {
  children: ReactNode;
};

export function HeroHighlight({ children, className = '' }: HeroHighlightProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [active, setActive] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const mask = useMotionTemplate`radial-gradient(220px circle at ${mouseX}px ${mouseY}px, black 0%, transparent 100%)`;

  const onMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    mouseX.set(event.clientX - bounds.left);
    mouseY.set(event.clientY - bounds.top);
    if (!active) setActive(true);
  };

  return (
    <div
      className={`hero-highlight${active ? ' is-active' : ''}${className ? ` ${className}` : ''}`}
      onMouseMove={prefersReducedMotion ? undefined : onMouseMove}
    >
      <div className="hero-highlight-dots" aria-hidden="true" />
      <motion.div
        className="hero-highlight-dots-hover"
        aria-hidden="true"
        style={
          prefersReducedMotion
            ? undefined
            : { WebkitMaskImage: mask, maskImage: mask }
        }
      />
      <div className="hero-highlight-content">{children}</div>
    </div>
  );
}

export function Highlight({ children }: HighlightProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.span
      className="hero-highlight-mark"
      initial={prefersReducedMotion ? false : { backgroundSize: '0% 100%' }}
      animate={{ backgroundSize: '100% 100%' }}
      transition={{ duration: 2, ease: 'linear', delay: 0.5 }}
      style={{
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right center',
      }}
    >
      {children}
    </motion.span>
  );
}
