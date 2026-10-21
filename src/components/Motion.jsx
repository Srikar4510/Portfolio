import { useEffect, useRef, useState } from 'react';
import { motion, animate, useInView, useMotionValue, useSpring } from 'framer-motion';

// Fades and lifts its children into view the first time they scroll on screen.
export const Reveal = ({ children, delay = 0, y = 24, className = '', as = 'div' }) => {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Tag>
  );
};

// Wraps every route so pages fade in and out when navigating.
export const Page = ({ children, className = '' }) => (
  <motion.main
    className={`mx-auto w-full max-w-7xl px-4 pb-24 pt-28 sm:px-6 lg:px-10 ${className}`}
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -12 }}
    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.main>
);

const ease = [0.22, 1, 0.36, 1];

// Eyebrow pops in, the title slides up from behind a mask, then the description fades in.
export const SectionHeading = ({ eyebrow, title, children, center = false }) => (
  <motion.div
    className={`mb-10 sm:mb-12 ${center ? 'text-center' : ''}`}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, margin: '-60px' }}
  >
    {eyebrow && (
      <motion.span
        className="eyebrow"
        variants={{ hidden: { opacity: 0, scale: 0.8 }, show: { opacity: 1, scale: 1, transition: { duration: 0.4, ease } } }}
      >
        {eyebrow}
      </motion.span>
    )}
    <div className="overflow-hidden pb-1">
      <motion.h2
        className="mt-4 text-4xl leading-[1.1] sm:text-5xl"
        variants={{ hidden: { y: '110%' }, show: { y: 0, transition: { duration: 0.7, delay: 0.1, ease } } }}
      >
        {title}
      </motion.h2>
    </div>
    {children && (
      <motion.p
        className={`mt-4 max-w-2xl text-ink-muted sm:text-lg ${center ? 'mx-auto' : ''}`}
        variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.25, ease } } }}
      >
        {children}
      </motion.p>
    )}
  </motion.div>
);

// A hand-drawn underline that draws itself under a word.
export const Scribble = ({ className = '', delay = 0.8 }) => (
  <svg viewBox="0 0 300 24" preserveAspectRatio="none" className={`pointer-events-none absolute left-0 w-full ${className}`} aria-hidden="true">
    <motion.path
      d="M4 16 C 60 6, 120 4, 170 10 S 260 20, 296 8"
      fill="none"
      stroke="rgb(var(--brand))"
      strokeWidth="5"
      strokeLinecap="round"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 0.9, delay, ease: 'easeInOut' }}
    />
  </svg>
);

// Tilts its child in 3D towards the pointer.
export const useTilt = (strength = 8) => {
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 200, damping: 18 });
  const springY = useSpring(rotateY, { stiffness: 200, damping: 18 });
  const onMouseMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    rotateY.set(((e.clientX - r.left) / r.width - 0.5) * strength);
    rotateX.set(-((e.clientY - r.top) / r.height - 0.5) * strength);
  };
  const onMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };
  return { style: { rotateX: springX, rotateY: springY, transformPerspective: 900 }, onMouseMove, onMouseLeave };
};

// Counts up from 0 to `to` once the number scrolls into view.
export const Counter = ({ to, decimals = 0, suffix = '' }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return undefined;
    const controls = animate(0, to, { duration: 1.6, ease: 'easeOut', onUpdate: setValue });
    return () => controls.stop();
  }, [inView, to]);

  return (
    <span ref={ref}>
      {value.toLocaleString('en-IN', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
      {suffix}
    </span>
  );
};

// Types each phrase, pauses, deletes it and moves on to the next.
export const Typewriter = ({ words }) => {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[index % words.length];
    let delay = deleting ? 35 : 70;
    if (!deleting && text === word) delay = 1600;
    if (deleting && text === '') delay = 300;

    const timer = setTimeout(() => {
      if (!deleting && text === word) setDeleting(true);
      else if (deleting && text === '') {
        setDeleting(false);
        setIndex((i) => i + 1);
      } else setText(word.slice(0, text.length + (deleting ? -1 : 1)));
    }, delay);
    return () => clearTimeout(timer);
  }, [text, deleting, index, words]);

  return (
    <span aria-label={words[index % words.length]}>
      <span aria-hidden="true">{text}</span>
      <span className="caret h-[0.9em] align-[-0.1em]" aria-hidden="true" />
    </span>
  );
};
