import { pillars } from './pillars';
import {
  motion,
  useMotionTemplate,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const REVEAL_WINDOWS: Array<[number, number]> = [
  [0.05, 0.2],
  [0.2, 0.35],
  [0.35, 0.5],
  [0.5, 0.65],
  [0.65, 0.8],
];

function useIsMobile(maxWidth = 767) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(`(max-width: ${maxWidth}px)`);
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, [maxWidth]);

  return isMobile;
}

function useReveal(
  progress: MotionValue<number>,
  range: [number, number],
  fromY: number,
  fromX = 0,
) {
  const opacity = useTransform(progress, [range[0], range[1]], [0, 1]);
  const y = useTransform(progress, [range[0], range[1]], [fromY, 0]);
  const x = useTransform(progress, [range[0], range[1]], [fromX, 0]);
  return { opacity, x, y };
}

function PillarCard({
  index,
  progress,
  isMobile,
}: {
  index: number;
  progress: MotionValue<number>;
  isMobile: boolean;
}) {
  const pillar = pillars[index];
  const offsets = [
    { y: -48, x: 0 },
    { y: 0, x: 56 },
    { y: 0, x: -56 },
    { y: 48, x: 40 },
    { y: 48, x: -40 },
  ][index];

  const reveal = useReveal(
    progress,
    REVEAL_WINDOWS[index],
    offsets.y,
    offsets.x,
  );

  const numeralDrift = useTransform(
    progress,
    [0.8, 1],
    [0, index % 2 === 0 ? -18 : 18],
  );

  const motionStyle = isMobile
    ? undefined
    : {
        opacity: reveal.opacity,
        x: reveal.x,
        y: reveal.y,
      };

  return (
    <motion.article
      className={`pillar pillar--${index + 1}${pillar.italic ? ' is-italic' : ''}${
        pillar.style === 'outline' ? ' is-outline' : ''
      }`}
      style={motionStyle}
    >
      <motion.span
        className="pillar-numeral"
        aria-hidden="true"
        style={isMobile ? undefined : { y: numeralDrift }}
      >
        {pillar.id}
      </motion.span>
      <div className="pillar-label">
        <p className="pillar-eyebrow">עמוד תווך · {pillar.id}</p>
        <h3 className="pillar-word">{pillar.word}</h3>
      </div>
    </motion.article>
  );
}

export function PillarsSection() {
  const isMobile = useIsMobile();
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    mass: 0.35,
  });

  const headlineScale = useTransform(smoothProgress, [0, 0.5, 1], [1, 1.02, 1]);
  const glowOpacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0.35, 0.55, 0.7, 0.45]);
  const glow = useMotionTemplate`radial-gradient(ellipse 55% 45% at 50% 48%, rgba(233, 213, 255, ${glowOpacity}), transparent 70%)`;

  if (isMobile) {
    return (
      <section
        className="pillars-section pillars-section--mobile"
        id="use-cases"
        aria-labelledby="use-cases-title"
      >
        <div className="pillars-center">
          <p className="pillars-eyebrow">יתרונות</p>
          <h2 id="use-cases-title">
            מה בוט השיחות עושה בשביל{' '}
            <span className="pillars-gradient-text">צוות המכירות</span>
          </h2>
          <p className="pillars-sub">
            חמישה עמודי תווך של קוליד — משיחה ראשונה ועד ליד מוכן למכירה.
          </p>
        </div>
        <div className="pillars-mobile-stack">
          {pillars.map((pillar, index) => (
            <motion.article
              className={`pillar pillar--${index + 1}${pillar.italic ? ' is-italic' : ''}${
                pillar.style === 'outline' ? ' is-outline' : ''
              }`}
              key={pillar.id}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="pillar-numeral" aria-hidden="true">
                {pillar.id}
              </span>
              <div className="pillar-label">
                <p className="pillar-eyebrow">עמוד תווך · {pillar.id}</p>
                <h3 className="pillar-word">{pillar.word}</h3>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    );
  }

  return (
    <div className="pillars-track" ref={trackRef} id="use-cases">
      <section className="pillars-section" aria-labelledby="use-cases-title">
        <motion.div className="pillars-glow" style={{ background: glow }} aria-hidden="true" />

        {pillars.map((_, index) => (
          <PillarCard
            key={pillars[index].id}
            index={index}
            progress={smoothProgress}
            isMobile={false}
          />
        ))}

        <motion.div className="pillars-center" style={{ scale: headlineScale }}>
          <p className="pillars-eyebrow">יתרונות</p>
          <h2 id="use-cases-title">
            מה בוט השיחות עושה בשביל{' '}
            <span className="pillars-gradient-text">צוות המכירות</span>
          </h2>
          <p className="pillars-sub">
            חמישה עמודי תווך של קוליד — משיחה ראשונה ועד ליד מוכן למכירה.
          </p>
        </motion.div>

        <div className="pillars-hint" aria-hidden="true">
          <span>גללו כדי ללמוד עוד</span>
          <span className="pillars-hint-arrow">↓</span>
        </div>
      </section>
    </div>
  );
}
