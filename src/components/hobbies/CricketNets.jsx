import { useState } from 'react';
import { AnimatePresence, motion, useAnimationControls } from 'framer-motion';
import { useConfetti } from '../Fun';

// A tiny nets session: bowl a delivery and see what the batter does with it.
const OUTCOMES = [
  { key: 'dot', runs: 0, label: 'Dot ball', weight: 22 },
  { key: 'single', runs: 1, label: 'Quick single', weight: 18 },
  { key: 'four', runs: 4, label: 'FOUR!', weight: 22 },
  { key: 'six', runs: 6, label: 'SIX!', weight: 18 },
  { key: 'bowled', runs: 0, label: 'BOWLED!', weight: 20, wicket: true },
];

const pick = () => {
  let r = Math.random() * OUTCOMES.reduce((s, o) => s + o.weight, 0);
  return OUTCOMES.find((o) => (r -= o.weight) < 0) || OUTCOMES[0];
};

// Ball path in SVG units (viewBox 480 x 240). Release -> bounce -> reaches the batter.
const DELIVERY = { x: [40, 250, 382], y: [96, 168, 140] };
const AFTER = {
  dot: { x: [382, 420, 455], y: [140, 150, 152] },
  single: { x: [382, 330, 250], y: [140, 190, 205] },
  four: { x: [382, 220, -30], y: [140, 200, 214] },
  six: { x: [382, 220, -40], y: [140, -10, -80] },
  bowled: { x: [382, 412, 418], y: [140, 150, 152] },
};

const CricketNets = () => {
  const ball = useAnimationControls();
  const bat = useAnimationControls();
  const stumps = useAnimationControls();
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState(null);
  const [score, setScore] = useState({ runs: 0, wickets: 0, balls: 0 });
  const [confetti, fire] = useConfetti();

  const bowl = async () => {
    if (busy) return;
    const outcome = pick();
    setBusy(true);
    setResult(null);
    await stumps.start({ rotate: 0, x: 0, transition: { duration: 0 } });
    await ball.start({ x: DELIVERY.x[0], y: DELIVERY.y[0], opacity: 1, transition: { duration: 0 } });

    const swing = outcome.key !== 'bowled' && outcome.key !== 'dot';
    if (swing) bat.start({ rotate: [0, -80, 25, 0], transition: { duration: 0.9, delay: 0.45, times: [0, 0.35, 0.7, 1] } });
    else bat.start({ rotate: [0, -20, 0], transition: { duration: 0.6, delay: 0.5 } });

    await ball.start({ x: DELIVERY.x, y: DELIVERY.y, transition: { duration: 0.75, ease: 'linear', times: [0, 0.6, 1] } });
    if (outcome.key === 'bowled') stumps.start({ rotate: 28, x: 14, transition: { type: 'spring', stiffness: 200, damping: 8 } });
    await ball.start({
      x: AFTER[outcome.key].x,
      y: AFTER[outcome.key].y,
      transition: { duration: outcome.key === 'six' ? 1 : 0.7, ease: 'easeOut' },
    });

    setResult(outcome);
    if (outcome.runs >= 4) fire('50%', '30%', outcome.runs === 6 ? 40 : 22);
    setScore((s) => ({
      runs: s.runs + outcome.runs,
      wickets: s.wickets + (outcome.wicket ? 1 : 0),
      balls: s.balls + 1,
    }));
    setBusy(false);
  };

  const overs = `${Math.floor(score.balls / 6)}.${score.balls % 6}`;

  return (
    <div className="card overflow-hidden">
      <div className="relative bg-[#2c5a45]">
        {confetti}
        <svg viewBox="0 0 480 240" className="mx-auto block h-auto max-h-[380px] w-full" role="img" aria-label="Cricket pitch with a batter and stumps">
          <defs>
            <linearGradient id="pitch" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#c8a96a" stopOpacity="0.55" />
              <stop offset="1" stopColor="#a8854a" stopOpacity="0.8" />
            </linearGradient>
          </defs>
          {/* outfield stripes */}
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <rect key={i} x={i * 80} y="120" width="40" height="120" fill="#16a34a" opacity="0.12" />
          ))}
          <ellipse cx="240" cy="236" rx="300" ry="70" fill="#15803d" opacity="0.25" />
          {/* pitch */}
          <polygon points="60,150 440,150 470,215 30,215" fill="url(#pitch)" />
          <line x1="110" y1="150" x2="95" y2="215" stroke="#fff" strokeOpacity="0.6" strokeWidth="2" />
          <line x1="370" y1="150" x2="385" y2="215" stroke="#fff" strokeOpacity="0.6" strokeWidth="2" />

          {/* bowler's end stumps */}
          <g opacity="0.7">
            {[0, 7, 14].map((dx) => (
              <rect key={dx} x={62 + dx} y="112" width="3.5" height="44" rx="1" fill="#f5f5f4" />
            ))}
          </g>

          {/* batter's stumps */}
          <motion.g animate={stumps} style={{ originX: '418px', originY: '160px' }}>
            {[0, 8, 16].map((dx) => (
              <rect key={dx} x={408 + dx} y="108" width="4" height="52" rx="1.2" fill="#fafaf9" />
            ))}
            <rect x="406" y="105" width="11" height="3" rx="1.5" fill="#fbbf24" />
            <rect x="418" y="105" width="11" height="3" rx="1.5" fill="#fbbf24" />
          </motion.g>

          {/* batter: simple silhouette with a swinging bat */}
          <g>
            <circle cx="392" cy="88" r="9" fill="#e2e8f0" />
            <rect x="383" y="80" width="18" height="6" rx="3" fill="#2563eb" />
            <rect x="385" y="98" width="15" height="34" rx="6" fill="#e2e8f0" />
            <rect x="386" y="130" width="6" height="28" rx="3" fill="#f8fafc" />
            <rect x="394" y="130" width="6" height="28" rx="3" fill="#f8fafc" />
            <motion.g animate={bat} style={{ originX: '388px', originY: '110px' }}>
              <rect x="372" y="108" width="5" height="16" rx="2" fill="#78350f" />
              <rect x="369" y="122" width="11" height="34" rx="3" fill="#fde68a" />
            </motion.g>
          </g>

          {/* ball */}
          <motion.circle animate={ball} initial={{ x: 40, y: 96, opacity: 0 }} cx="0" cy="0" r="5.5" fill="#dc2626" stroke="#fecaca" strokeWidth="1" />
        </svg>

        <AnimatePresence>
          {result && (
            <motion.div
              key={score.balls}
              className={`pointer-events-none absolute left-1/2 top-6 -translate-x-1/2 rounded-full px-5 py-2 font-display text-xl shadow-lift sm:text-2xl ${
                result.wicket ? 'bg-rose-700 text-white' : result.runs >= 4 ? 'bg-night text-white' : 'bg-white text-night'
              }`}
              initial={{ opacity: 0, scale: 0.4, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 15 }}
            >
              {result.label}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 p-5">
        <div className="flex gap-6 font-mono">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-muted">Score</p>
            <p className="font-display text-3xl text-ink">
              {score.runs}/{score.wickets}
            </p>
          </div>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-muted">Overs</p>
            <p className="font-display text-3xl text-ink">{overs}</p>
          </div>
        </div>
        <div className="flex gap-2">
          {score.balls > 0 && (
            <button type="button" onClick={() => setScore({ runs: 0, wickets: 0, balls: 0 })} className="btn-ghost px-4 py-2.5" disabled={busy}>
              Reset
            </button>
          )}
          <button type="button" onClick={bowl} disabled={busy} className="btn-primary px-5 py-2.5 disabled:opacity-60">
            {busy ? 'In play…' : 'Bowl a delivery'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CricketNets;
