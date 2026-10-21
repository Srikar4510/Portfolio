import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { SiLeetcode } from 'react-icons/si';
import { HiArrowUpRight } from 'react-icons/hi2';
import { Counter } from './Motion';
import saved from '../data/leetcode.json';

// Live stats come from the Netlify function; the copy saved at build time shows instantly and is the fallback.
const LIVE_URL = '/.netlify/functions/leetcode';
const COLORS = { Easy: '#1cbbba', Medium: '#ffb800', Hard: '#f63737' };
const GREENS = ['rgb(var(--line))', '#bfe8c8', '#7fd394', '#40b863', '#1f8f44'];
const level = (n) => (n === 0 ? 0 : n < 2 ? 1 : n < 4 ? 2 : n < 7 ? 3 : 4);

const useLeetCode = () => {
  const [stats, setStats] = useState(saved);
  const [live, setLive] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 8000);
    fetch(LIVE_URL, { signal: controller.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`))))
      .then((data) => {
        if (typeof data?.solved === 'number' && Array.isArray(data.calendar)) {
          setStats(data);
          setLive(true);
        }
      })
      .catch(() => {
        /* not deployed on Netlify (e.g. local dev) or LeetCode unavailable: keep the saved copy */
      })
      .finally(() => clearTimeout(timer));
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, []);
  return { stats, live };
};

const Ring = ({ solved, total }) => {
  const r = 52;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative h-36 w-36 shrink-0">
      <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
        <circle cx="60" cy="60" r={r} fill="none" stroke="rgb(var(--line))" strokeWidth="8" />
        <motion.circle
          cx="60"
          cy="60"
          r={r}
          fill="none"
          stroke="#ffa116"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          whileInView={{ strokeDashoffset: c * (1 - solved / total) }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: 'easeOut' }}
        />
      </svg>
      <div className="absolute inset-0 grid place-content-center text-center">
        <p className="font-display text-3xl font-semibold text-ink">
          <Counter to={solved} />
        </p>
        <p className="text-xs text-ink-muted">solved</p>
      </div>
    </div>
  );
};

const Heatmap = ({ stats }) => {
  // Pad the start so columns line up as weeks (Sunday first).
  const end = new Date(`${stats.calendarEnd}T00:00:00Z`);
  const start = new Date(end);
  start.setUTCDate(end.getUTCDate() - (stats.calendar.length - 1));
  const cells = [...Array(start.getUTCDay()).fill(null), ...stats.calendar];
  const weeks = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));

  return (
    <div className="overflow-x-auto pb-1">
      <div className="flex min-w-[560px] gap-[3px]">
        {weeks.map((week, wi) => (
          <motion.div
            key={wi}
            className="flex flex-1 flex-col gap-[3px]"
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: wi * 0.012, duration: 0.3 }}
          >
            {week.map((n, di) => (
              <span
                key={di}
                className="aspect-square w-full rounded-[3px] transition-transform hover:scale-125"
                style={{ background: n === null ? 'transparent' : GREENS[level(n)] }}
                title={n === null ? undefined : `${n} submission${n === 1 ? '' : 's'}`}
              />
            ))}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const LeetCodeStats = () => {
  const { stats, live } = useLeetCode();
  return (
    <div className="card overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line px-6 py-5 sm:px-8">
        <div className="flex items-center gap-3">
          <motion.span
            className="grid h-11 w-11 place-items-center rounded-2xl bg-[#ffa116]/15 text-[#ffa116]"
            whileHover={{ rotate: -12, scale: 1.1 }}
          >
            <SiLeetcode className="h-5 w-5" />
          </motion.span>
          <div>
            <h3 className="text-lg">LeetCode</h3>
            <p className="text-sm text-ink-muted">@{stats.username}</p>
          </div>
        </div>
        <a href={`https://leetcode.com/u/${stats.username}/`} target="_blank" rel="noreferrer" className="btn-ghost">
          View profile <HiArrowUpRight />
        </a>
      </div>

      <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[auto_1fr_auto] lg:items-center lg:gap-12">
        <Ring solved={stats.solved} total={stats.total} />

        <div className="space-y-4">
          {stats.difficulty.map((d, i) => (
            <div key={d.name}>
              <div className="flex justify-between text-sm">
                <span className="font-semibold" style={{ color: COLORS[d.name] }}>
                  {d.name}
                </span>
                <span className="text-ink-muted">
                  <span className="font-semibold text-ink">{d.solved}</span> / {d.total}
                </span>
              </div>
              <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-line">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: COLORS[d.name] }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${(d.solved / d.total) * 100}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.2 + i * 0.12, ease: 'easeOut' }}
                />
              </div>
            </div>
          ))}
        </div>

        <dl className="grid grid-cols-2 gap-4 lg:grid-cols-1">
          {[
            ['Active days', `${stats.activeDays} in the past year`],
            ['Main language', stats.languages[0]?.name],
          ].map(([k, v]) => (
            <div key={k}>
              <dt className="text-xs uppercase tracking-wider text-ink-muted">{k}</dt>
              <dd className="font-display text-lg font-semibold text-ink">{v}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="border-t border-line px-6 py-5 sm:px-8">
        <div className="mb-3 flex items-center justify-between text-xs text-ink-muted">
          <span>Submissions in the past year</span>
          {live ? (
            <span className="inline-flex items-center gap-1.5 font-semibold text-[#1f8f44]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#40b863] opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#40b863]" />
              </span>
              Live
            </span>
          ) : (
            <span>
              As of{' '}
              {new Date(`${stats.updated}T00:00:00Z`).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
            </span>
          )}
        </div>
        <Heatmap stats={stats} />
      </div>
    </div>
  );
};

export default LeetCodeStats;
