import { motion } from 'framer-motion';

// A side-on F1 car that keeps lapping across a strip of track.
const Wheel = ({ cx }) => (
  <motion.g
    style={{ originX: `${cx}px`, originY: '62px' }}
    animate={{ rotate: 360 }}
    transition={{ duration: 0.35, repeat: Infinity, ease: 'linear' }}
  >
    <circle cx={cx} cy="62" r="15" fill="#111" />
    <circle cx={cx} cy="62" r="9" fill="#3f3f46" />
    {[0, 60, 120].map((a) => (
      <rect key={a} x={cx - 1} y="53" width="2" height="18" fill="#a1a1aa" transform={`rotate(${a} ${cx} 62)`} />
    ))}
  </motion.g>
);

// `compact` fills its parent (used on the hobby cards); otherwise it is a standalone strip.
const F1Car = ({ compact = false }) => (
  <div className={`relative overflow-hidden bg-night ${compact ? 'h-full' : 'h-40 rounded-2xl sm:h-48'}`}>
    {/* kerbs and track */}
    <div className="absolute inset-x-0 bottom-10 h-1 bg-[repeating-linear-gradient(90deg,#ef4444_0_24px,#fafafa_24px_48px)] opacity-80" />
    <div className="speed-lines absolute inset-x-0 bottom-[70px] h-px opacity-30" />
    <div className="speed-lines absolute inset-x-0 bottom-[110px] h-px opacity-20" style={{ animationDuration: '0.9s' }} />
    <div className="absolute inset-x-0 bottom-0 h-10 bg-zinc-800" />
    <div className="speed-lines absolute inset-x-0 bottom-5 h-0.5 opacity-60" />

    <motion.div
      className={`absolute bottom-[18px] ${compact ? 'w-[200px]' : 'w-[260px] sm:w-[300px]'}`}
      initial={{ left: '-90%' }}
      animate={{ left: ['-90%', '110%'] }}
      transition={{ duration: 3.2, repeat: Infinity, ease: [0.45, 0, 0.2, 1], repeatDelay: 0.6 }}
    >
      <motion.svg
        viewBox="0 0 300 80"
        className="w-full"
        animate={{ y: [0, -1, 0, 1, 0] }}
        transition={{ duration: 0.2, repeat: Infinity }}
        role="img"
        aria-label="Formula 1 car"
      >
        {/* rear wing */}
        <rect x="14" y="14" width="8" height="34" rx="2" fill="#e10600" />
        <rect x="6" y="12" width="40" height="8" rx="2" fill="#c2410c" />
        {/* body */}
        <path d="M24 50 L60 34 L150 32 L180 22 L196 22 L206 34 L262 40 L292 50 L292 58 L24 58 Z" fill="#f7f6f2" />
        <path d="M60 46 L262 46 L262 52 L60 52 Z" fill="#c2410c" />
        {/* cockpit + halo */}
        <path d="M150 32 Q168 14 196 22" stroke="#e4e4e7" strokeWidth="4" fill="none" />
        <circle cx="178" cy="26" r="6" fill="#fbbf24" />
        {/* front wing */}
        <rect x="262" y="54" width="34" height="5" rx="2" fill="#c2410c" />
        <text x="110" y="45" fill="#16181d" fontSize="11" fontFamily="JetBrains Mono, monospace" fontWeight="700">
          SA 07
        </text>
        <Wheel cx="66" />
        <Wheel cx="236" />
      </motion.svg>
    </motion.div>
  </div>
);

export default F1Car;
