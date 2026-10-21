import { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

// F1 start-lights reaction test: five reds come on, then go out after a random pause.
const BEST_KEY = 'lights-out-best';
const readBest = () => {
  try {
    const v = Number(window.localStorage.getItem(BEST_KEY));
    return Number.isFinite(v) && v > 0 ? v : null;
  } catch {
    return null;
  }
};
const saveBest = (ms) => {
  try {
    window.localStorage.setItem(BEST_KEY, String(ms));
  } catch {
    /* storage unavailable: keep the best only for this visit */
  }
};

const verdict = (ms) => {
  if (ms < 200) return 'Pole position reflexes!';
  if (ms < 260) return 'F1-driver quick.';
  if (ms < 330) return 'Solid launch.';
  return 'Bogged down off the line.';
};

const LightsOut = () => {
  const [phase, setPhase] = useState('idle'); // idle | arming | waiting | go | done | jump
  const [lit, setLit] = useState(0);
  const [time, setTime] = useState(null);
  const [best, setBest] = useState(readBest);
  const timers = useRef([]);
  const goAt = useRef(0);

  const clear = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };
  useEffect(() => clear, []);

  const start = () => {
    clear();
    setTime(null);
    setLit(0);
    setPhase('arming');
    for (let i = 1; i <= 5; i += 1) {
      timers.current.push(setTimeout(() => setLit(i), i * 800));
    }
    const hold = 800 * 5 + 400 + Math.random() * 2600;
    timers.current.push(setTimeout(() => setPhase('waiting'), 800 * 5));
    timers.current.push(
      setTimeout(() => {
        setLit(0);
        goAt.current = performance.now();
        setPhase('go');
      }, hold),
    );
  };

  const react = useCallback(() => {
    if (phase === 'idle' || phase === 'done' || phase === 'jump') return start();
    if (phase === 'arming' || phase === 'waiting') {
      clear();
      setLit(0);
      setPhase('jump');
      return undefined;
    }
    const ms = Math.round(performance.now() - goAt.current);
    setTime(ms);
    setPhase('done');
    if (!best || ms < best) {
      setBest(ms);
      saveBest(ms);
    }
    return undefined;
  }, [phase, best]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const onKey = (e) => {
      if (e.code !== 'Space' || e.target.closest('input, textarea, button')) return;
      e.preventDefault();
      react();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [react]);

  const message = {
    idle: 'Tap Start, wait for the five lights, and react the moment they go out.',
    arming: 'Wait for it…',
    waiting: 'Wait for it…',
    go: 'GO GO GO!',
    done: time !== null ? `${time} ms · ${verdict(time)}` : '',
    jump: 'Jump start! Drive-through penalty. Try again.',
  }[phase];

  return (
    <div className="card p-6">
      <div
        className="mx-auto flex max-w-md cursor-pointer select-none justify-center gap-2 rounded-2xl bg-night p-4 sm:gap-3"
        onClick={react}
        role="button"
        tabIndex={-1}
        aria-label="Start lights"
      >
        {[1, 2, 3, 4, 5].map((n) => (
          <div key={n} className="flex flex-col gap-2 rounded-xl bg-zinc-900 p-2 ring-1 ring-white/5">
            {[0, 1].map((row) => (
              <motion.span
                key={row}
                className="block h-8 w-8 rounded-full sm:h-10 sm:w-10"
                animate={{
                  backgroundColor: lit >= n ? '#ef4444' : '#27272a',
                  boxShadow: lit >= n ? '0 0 22px 4px rgba(239,68,68,0.65)' : '0 0 0 0 rgba(0,0,0,0)',
                }}
                transition={{ duration: 0.12 }}
              />
            ))}
          </div>
        ))}
      </div>

      <p
        className={`mt-5 min-h-[28px] text-center font-display text-xl ${
          phase === 'go' ? 'text-accent' : phase === 'jump' ? 'text-rose-700' : 'text-ink'
        }`}
        aria-live="polite"
      >
        {message}
      </p>

      <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
        <button type="button" onClick={react} className="btn-primary min-w-[160px] px-6">
          {phase === 'idle' ? 'Start' : phase === 'done' || phase === 'jump' ? 'Go again' : 'React!'}
        </button>
        <span className="chip">Best: {best ? `${best} ms` : '-'}</span>
      </div>
      <p className="mt-3 text-center text-xs text-ink-muted">Tip: press Space to start and to react.</p>
    </div>
  );
};

export default LightsOut;
