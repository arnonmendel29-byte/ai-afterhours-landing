import { AnimatePresence, motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from 'react';
import type { RoadmapStage } from './content';
import './RoadmapScrollSection.css';

gsap.registerPlugin(ScrollTrigger);

if (typeof window !== 'undefined') {
  ScrollTrigger.config({ ignoreMobileResize: true });
}

/** מסלול מלמעלה למטה: 01 בראש, 04 בתחתית — עקומה אנכית רגילה */
const PATH_DESKTOP =
  'M 360 56 C 540 56, 648 120, 648 208 C 648 296, 108 336, 108 424 C 108 512, 648 552, 648 640 C 648 728, 360 768, 360 856';

/** מובייל: מרכז 260, זיגזג סימטרי ±216px (44 ↔ 476) */
const PATH_MOBILE =
  'M 260 52 C 352 52, 476 108, 476 204 C 476 300, 44 340, 44 436 C 44 532, 476 572, 476 668 C 476 764, 352 820, 260 868';

type LayoutMode = 'desktop' | 'mobile';

function useLayoutMode(): LayoutMode {
  const [mode, setMode] = useState<LayoutMode>(() =>
    typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches
      ? 'mobile'
      : 'desktop',
  );

  useLayoutEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const sync = () => setMode(mq.matches ? 'mobile' : 'desktop');
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  return mode;
}

type RoadmapScrollSectionProps = {
  id?: string;
  ariaLabelledBy: string;
  eyebrow: string;
  title: string;
  intro: string;
  stages: RoadmapStage[];
  className?: string;
};

export function RoadmapScrollSection({
  id,
  ariaLabelledBy,
  eyebrow,
  title,
  intro,
  stages,
  className = '',
}: RoadmapScrollSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const pathBgRef = useRef<SVGPathElement>(null);
  const pathFillRef = useRef<SVGPathElement>(null);
  const orbARef = useRef<HTMLDivElement>(null);
  const orbBRef = useRef<HTMLDivElement>(null);

  const layout = useLayoutMode();
  const pathD = layout === 'mobile' ? PATH_MOBILE : PATH_DESKTOP;
  const viewBox = layout === 'mobile' ? '0 0 520 920' : '0 0 720 896';

  const [activeIndex, setActiveIndex] = useState(0);
  const [nodePoints, setNodePoints] = useState<Array<{ x: number; y: number }>>([]);
  const [reducedMotion, setReducedMotion] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );

  const stage = stages[activeIndex] ?? stages[0];

  const nodeSize = layout === 'mobile' ? 62 : 64;

  useLayoutEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const applyReduced = () => setReducedMotion(reduced.matches);
    applyReduced();
    reduced.addEventListener('change', applyReduced);
    return () => reduced.removeEventListener('change', applyReduced);
  }, []);

  useLayoutEffect(() => {
    const path = pathBgRef.current;
    if (!path || stages.length < 2) return;

    const length = path.getTotalLength();
    const points = stages.map((_, index) => {
      const t = index / (stages.length - 1);
      return path.getPointAtLength(length * t);
    });
    setNodePoints(points);
  }, [pathD, stages.length]);

  useLayoutEffect(() => {
    if (reducedMotion) return;

    const section = sectionRef.current;
    const pin = pinRef.current;
    const fillPath = pathFillRef.current;
    const orbA = orbARef.current;
    const orbB = orbBRef.current;
    if (!section || !pin || !fillPath) return;

    const length = fillPath.getTotalLength();
    gsap.set(fillPath, {
      strokeDasharray: length,
      strokeDashoffset: length,
    });

    const ctx = gsap.context(() => {
      const isMobile = layout === 'mobile';
      const scrollEnd = () =>
        `+=${window.innerHeight * (stages.length * (isMobile ? 0.72 : 0.95) + (isMobile ? 0.2 : 0.35))}`;

      gsap.to(fillPath, {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: scrollEnd,
          scrub: isMobile ? 0.45 : 0.85,
          pin,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const idx = Math.min(
              stages.length - 1,
              Math.max(0, Math.floor(self.progress * stages.length)),
            );
            setActiveIndex(idx);
          },
        },
      });

      if (!isMobile && orbA) {
        gsap.fromTo(
          orbA,
          { y: 24 },
          {
            y: -36,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: scrollEnd,
              scrub: true,
            },
          },
        );
      }
      if (!isMobile && orbB) {
        gsap.fromTo(
          orbB,
          { y: -18 },
          {
            y: 42,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: scrollEnd,
              scrub: true,
            },
          },
        );
      }
    }, section);

    return () => ctx.revert();
  }, [layout, reducedMotion, stages.length]);

  const nodeStates = useMemo(() => {
    if (reducedMotion) {
      return stages.map((_, index) => ({
        isActive: index === stages.length - 1,
        isPassed: index < stages.length - 1,
      }));
    }
    return stages.map((_, index) => ({
      isActive: index === activeIndex,
      isPassed: index < activeIndex,
    }));
  }, [activeIndex, reducedMotion, stages]);

  const textVariants = {
    initial: { opacity: 0, y: 18, filter: 'blur(6px)' },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
    exit: { opacity: 0, y: -14, filter: 'blur(4px)' },
  };

  return (
    <section
      ref={sectionRef}
      className={`roadmap-scroll section ${reducedMotion ? 'roadmap-scroll--static' : ''} ${className}`.trim()}
      id={id}
      aria-labelledby={ariaLabelledBy}
    >
      <div className="roadmap-scroll__ambient" aria-hidden="true">
        <div ref={orbARef} className="roadmap-scroll__orb roadmap-scroll__orb--a" />
        <div ref={orbBRef} className="roadmap-scroll__orb roadmap-scroll__orb--b" />
      </div>

      <div ref={pinRef} className="roadmap-scroll__pin">
        <header className="roadmap-scroll__head">
          <p className="eyebrow">{eyebrow}</p>
          <h2 id={ariaLabelledBy}>{title}</h2>
          <p>{intro}</p>
        </header>

        <div className="roadmap-scroll__copy" aria-live="polite">
          {reducedMotion ? (
            <div className="roadmap-scroll__copy-inner">
              <h3 className="roadmap-scroll__stage-title">{stage.title}</h3>
              <p className="roadmap-scroll__stage-desc">{stage.description}</p>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={stage.title}
                className="roadmap-scroll__copy-inner"
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <motion.h3
                  className="roadmap-scroll__stage-title"
                  variants={textVariants}
                  transition={{ duration: 0.42, delay: 0.04 }}
                >
                  {stage.title}
                </motion.h3>
                <motion.p
                  className="roadmap-scroll__stage-desc"
                  variants={textVariants}
                  transition={{ duration: 0.48, delay: 0.1 }}
                >
                  {stage.description}
                </motion.p>
                {stage.href && stage.linkLabel ? (
                  <motion.a
                    className="roadmap-scroll__stage-link"
                    href={stage.href}
                    variants={textVariants}
                    transition={{ duration: 0.4, delay: 0.16 }}
                  >
                    {stage.linkLabel}
                  </motion.a>
                ) : null}
              </motion.div>
            </AnimatePresence>
          )}
        </div>

        <div className="roadmap-scroll__canvas">
          <div className="roadmap-scroll__svg-wrap">
            <svg
              className="roadmap-scroll__svg"
              viewBox={viewBox}
              preserveAspectRatio="xMidYMid meet"
              role="img"
              aria-label="מפת שלבי התהליך"
            >
              <defs>
                <linearGradient id="roadmap-purple-gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#7c3aed" />
                  <stop offset="50%" stopColor="#9333ea" />
                  <stop offset="100%" stopColor="#a855f7" />
                </linearGradient>
              </defs>
              <path className="roadmap-scroll__path-rail" d={pathD} />
              <path ref={pathBgRef} className="roadmap-scroll__path-bg" d={pathD} />
              <path ref={pathFillRef} className="roadmap-scroll__path-fill" d={pathD} />
            {nodePoints.map((point, index) => {
              const state = nodeStates[index];
              const half = nodeSize / 2;
              const glowR = nodeSize * 0.72;
              return (
                <g
                  key={stages[index].number}
                  className={`roadmap-scroll__node${state.isActive ? ' is-active' : ''}${state.isPassed ? ' is-passed' : ''}`}
                  transform={`translate(${point.x}, ${point.y})`}
                  style={
                    {
                      '--node-pulse': state.isActive ? 1 : 0,
                    } as CSSProperties
                  }
                >
                  <circle
                    className={`roadmap-scroll__node-glow${state.isActive ? ' is-active' : ''}`}
                    r={glowR}
                    cx={0}
                    cy={0}
                  />
                  <rect
                    className="roadmap-scroll__node-box"
                    x={-half}
                    y={-half}
                    width={nodeSize}
                    height={nodeSize}
                    rx={14}
                    ry={14}
                  />
                  <text
                    className="roadmap-scroll__node-label"
                    x={0}
                    y={5}
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    {stages[index].number}
                  </text>
                </g>
              );
            })}
            </svg>
          </div>
          <ol className="visually-hidden">
            {stages.map((item) => (
              <li key={item.number}>
                {item.number}: {item.title}. {item.description}
              </li>
            ))}
          </ol>
        </div>

        {reducedMotion ? (
          <div className="roadmap-scroll__static-stages">
            {stages.map((item) => (
              <article key={item.number} className="roadmap-scroll__static-stage">
                <h3>
                  {item.number} · {item.title}
                </h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
