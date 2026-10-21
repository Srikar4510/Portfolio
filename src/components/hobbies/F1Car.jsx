import { motion } from 'framer-motion';
import { SiRedbull } from 'react-icons/si';

// A side-on F1 car that keeps lapping across a strip of track.
const Wheel = ({ cx, cy, r }) => (
  <motion.g
    style={{ originX: `${cx}px`, originY: `${cy}px` }}
    animate={{ rotate: 360 }}
    transition={{ duration: 0.35, repeat: Infinity, ease: 'linear' }}
  >
    <circle cx={cx} cy={cy} r={r} fill="#0a0a0a" />
    <circle cx={cx} cy={cy} r={r - 4} fill="none" stroke="#2f6bff" strokeWidth="1.6" />
    <circle cx={cx} cy={cy} r={r - 7} fill="#18181b" />
    {[0, 36, 72, 108, 144].map((a) => (
      <rect key={a} x={cx - 0.9} y={cy - (r - 7)} width="1.8" height={(r - 7) * 2} fill="#3f3f46" transform={`rotate(${a} ${cx} ${cy})`} />
    ))}
    <circle cx={cx} cy={cy} r="2.2" fill="#a1a1aa" />
  </motion.g>
);

const NAVY = '#1b2650';
const NAVY_LIGHT = '#22316a';
const CARBON = '#111318';
// Carbon parts get a faint edge so they stay visible on the dark track.
const EDGE = { stroke: '#3a3d48', strokeWidth: 0.8 };
const YELLOW = '#ffc906';

const BODY =
  'M44 62 L46 46 L100 40 L148 30 L150 24 Q152 20 158 20 L168 20 Q172 20 172 26 L174 36 L214 38 L300 52 Q334 58 336 62 L300 64 L60 66 Z';
const SIDEPOD = 'M100 44 L176 40 L198 44 L198 56 Q150 60 102 60 Z';

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
      className={`absolute bottom-[14px] ${compact ? 'w-[240px]' : 'w-[300px] sm:w-[360px]'}`}
      initial={{ left: '-90%' }}
      animate={{ left: ['-90%', '110%'] }}
      transition={{ duration: 3.2, repeat: Infinity, ease: [0.45, 0, 0.2, 1], repeatDelay: 0.6 }}
    >
      <motion.svg
        viewBox="0 0 360 90"
        className="w-full"
        animate={{ y: [0, -1, 0, 1, 0] }}
        transition={{ duration: 0.2, repeat: Infinity }}
        role="img"
        aria-label="Formula 1 car, number SA 3, in a navy and yellow livery"
      >
        <defs>
          {/* the speckled finish on the navy panels */}
          <pattern id="f1-speckle" width="9" height="9" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="#4a6fd6" opacity="0.45" />
            <circle cx="6.5" cy="5" r="0.8" fill="#4a6fd6" opacity="0.35" />
            <circle cx="3.5" cy="7.5" r="0.6" fill="#0b1230" opacity="0.6" />
          </pattern>
        </defs>

        {/* rear wing: navy endplate, carbon planes, beam wing and pylon */}
        <rect x="34" y="18" width="5" height="32" fill={CARBON} {...EDGE} />
        <rect x="20" y="44" width="26" height="4" rx="1" fill={CARBON} {...EDGE} />
        <rect x="4" y="13" width="50" height="7" rx="2" fill={CARBON} {...EDGE} />
        <rect x="8" y="4" width="44" height="5" rx="2" fill={CARBON} {...EDGE} />
        <path d="M6 8 L22 8 L22 58 L10 58 Z" fill={NAVY_LIGHT} />
        <path d="M6 8 L22 8 L22 58 L10 58 Z" fill="url(#f1-speckle)" />

        {/* diffuser and floor */}
        <path d="M44 62 L60 64 L56 70 L38 68 Z" fill={CARBON} {...EDGE} />
        <path d="M50 64 L300 62 L300 67 L56 68 Z" fill={CARBON} />

        {/* suspension */}
        <g stroke={CARBON} strokeWidth="2" strokeLinecap="round">
          <line x1="74" y1="66" x2="100" y2="50" />
          <line x1="74" y1="66" x2="104" y2="60" />
          <line x1="270" y1="67" x2="232" y2="48" />
          <line x1="270" y1="67" x2="228" y2="60" />
        </g>

        {/* shark fin */}
        <path d="M58 38 L150 26 L150 32 L58 44 Z" fill={NAVY} />
        <path d="M58 38 L150 26 L150 32 L58 44 Z" fill="url(#f1-speckle)" />

        {/* body with speckle */}
        <path d={BODY} fill={NAVY} />
        <path d={BODY} fill="url(#f1-speckle)" />

        {/* onboard camera pod on the airbox */}
        <rect x="160" y="14" width="3" height="6" fill={CARBON} />
        <rect x="153" y="12" width="17" height="3" rx="1" fill={CARBON} />

        {/* sidepod with a carbon undercut */}
        <path d={SIDEPOD} fill={NAVY_LIGHT} />
        <path d={SIDEPOD} fill="url(#f1-speckle)" />
        <path d="M102 60 Q150 60 198 56 L198 62 L104 64 Z" fill={CARBON} />

        {/* yellow airbox and engine cover */}
        <path d="M92 41 L100 40 L148 30 L150 24 Q152 20 158 20 L168 20 Q172 20 172 26 L174 36 Q140 45 92 49 Z" fill={YELLOW} />
        <SiRedbull x={110} y={22} size={36} color="#e10600" aria-hidden="true" />

        {/* yellow nose */}
        <path d="M286 49.7 L300 52 Q334 58 336 62 L300 64 L286 64.4 Z" fill={YELLOW} />
        <SiRedbull x={294} y={47} size={18} color="#e10600" aria-hidden="true" />

        {/* driver and halo */}
        <circle cx="186" cy="31" r="7" fill={YELLOW} />
        <path d="M179 29 Q186 25 193 29" stroke="#e10600" strokeWidth="2" fill="none" />
        <rect x="186" y="29.5" width="7" height="3" rx="1.5" fill="#0f172a" />
        <path d="M166 28 Q186 20 212 38" stroke="#52525b" strokeWidth="3" fill="none" strokeLinecap="round" />

        {/* car number */}
        <text x="236" y="56" fill="#ffffff" fontSize="10" fontFamily="Poppins, sans-serif" fontWeight="700" textAnchor="middle">
          SA 3
        </text>

        {/* front wing: carbon elements, navy endplate, pylon */}
        <line x1="320" y1="62" x2="320" y2="72" stroke={CARBON} strokeWidth="2" />
        <path d="M296 69 L350 67 L350 71 L298 72 Z" fill={CARBON} {...EDGE} />
        <path d="M290 74 L352 72 L352 77 L292 79 Z" fill={CARBON} {...EDGE} />
        <rect x="344" y="60" width="8" height="20" rx="1" fill={NAVY_LIGHT} />

        <Wheel cx={74} cy={66} r={20} />
        <Wheel cx={270} cy={67} r={19} />
      </motion.svg>
    </motion.div>
  </div>
);

export default F1Car;
