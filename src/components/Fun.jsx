import { useCallback, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;

// useConfetti: returns [layer, fire]. Render `layer` inside a relatively positioned element and call fire(x, y).
const CONFETTI_COLORS = ['#ff1a81', '#ffc700', '#809fff', '#3ddc84', '#e6b3ff', '#ff7a45'];
export const useConfetti = () => {
  const [bursts, setBursts] = useState([]);
  const counter = useRef(0);
  const fire = useCallback((x = '50%', y = '50%', count = 26) => {
    counter.current += 1;
    const id = counter.current;
    const pieces = Array.from({ length: count }, (_, i) => {
      const angle = (Math.PI * 2 * i) / count + Math.random() * 0.4;
      const dist = 60 + Math.random() * 90;
      return {
        dx: Math.cos(angle) * dist,
        dy: Math.sin(angle) * dist - 40,
        rotate: random(-360, 360),
        color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
        w: random(6, 10),
        h: random(3, 6),
      };
    });
    setBursts((b) => [...b, { id, x, y, pieces }]);
    setTimeout(() => setBursts((b) => b.filter((burst) => burst.id !== id)), 1300);
  }, []);

  const layer = (
    <span className="pointer-events-none absolute inset-0 z-20 overflow-visible" aria-hidden="true">
      {bursts.map((burst) =>
        burst.pieces.map((p, i) => (
          <motion.span
            key={`${burst.id}-${i}`}
            className="absolute rounded-sm"
            style={{ left: burst.x, top: burst.y, width: p.w, height: p.h, background: p.color }}
            initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
            animate={{ x: p.dx, y: [0, p.dy, p.dy + 80], opacity: [1, 1, 0], rotate: p.rotate }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          />
        )),
      )}
    </span>
  );
  return [layer, fire];
};
