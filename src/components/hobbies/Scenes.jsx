import { motion } from 'framer-motion';
import Nilgiris from '../../assets/nilgiris.jpg';

// Small looping illustrations for the hobby cards.

const LOOP = { duration: 3.2, repeat: Infinity, repeatDelay: 0.4 };

// Bowler's delivery, the batter pulls it, and the ball sails over the rope for six.
export const CricketScene = () => (
  <svg viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice" className="h-full w-full" role="img" aria-label="A batter playing a pull shot for six">
    <rect width="320" height="180" fill="#2c5a45" />
    {[0, 1, 2, 3].map((i) => (
      <rect key={i} x={i * 80} y="0" width="40" height="180" fill="#ffffff" opacity="0.04" />
    ))}
    {/* boundary rope and crowd glow */}
    <path d="M0 34 Q160 18 320 34" fill="none" stroke="#fff" strokeOpacity="0.5" strokeWidth="2" strokeDasharray="6 5" />
    <polygon points="70,122 250,122 280,180 40,180" fill="#c8a96a" opacity="0.7" />
    <line x1="232" y1="122" x2="246" y2="180" stroke="#fff" strokeOpacity="0.6" strokeWidth="2" />
    {/* stumps behind the batter */}
    {[0, 7, 14].map((dx) => (
      <rect key={dx} x={262 + dx} y="104" width="3.5" height="46" rx="1.5" fill="#fafaf9" opacity="0.9" />
    ))}
    <rect x="260" y="101" width="9" height="2.5" rx="1" fill="#fbbf24" />
    <rect x="270" y="101" width="9" height="2.5" rx="1" fill="#fbbf24" />

    {/* batter */}
    <g>
      <circle cx="246" cy="82" r="8" fill="#f1f5f9" />
      <rect x="237" y="75" width="18" height="5" rx="2.5" className="fill-brand" />
      <rect x="239" y="91" width="14" height="30" rx="6" fill="#f1f5f9" />
      <rect x="240" y="119" width="5" height="27" rx="2.5" fill="#fff" />
      <rect x="247" y="119" width="5" height="27" rx="2.5" fill="#fff" />
      {/* the pull: bat swings from behind, across the body, and finishes high */}
      <motion.g
        style={{ originX: '244px', originY: '100px' }}
        animate={{ rotate: [40, 40, -150, -150, 40] }}
        transition={{ ...LOOP, times: [0, 0.38, 0.5, 0.85, 1], ease: 'easeOut' }}
      >
        <rect x="241" y="98" width="4" height="13" rx="2" fill="#78350f" />
        <rect x="238.5" y="110" width="9" height="30" rx="3" fill="#fde68a" />
      </motion.g>
    </g>

    {/* ball: delivered, bounces, then pulled high over the rope */}
    <motion.circle
      r="5"
      fill="#dc2626"
      stroke="#fecaca"
      animate={{ cx: [40, 165, 232, 140, 30], cy: [70, 140, 112, 30, -30], opacity: [1, 1, 1, 1, 0] }}
      transition={{ ...LOOP, times: [0, 0.3, 0.46, 0.7, 0.9], ease: 'linear' }}
    />

    {/* SIX! pops when the ball clears the rope */}
    <motion.g
      style={{ originX: '110px', originY: '70px' }}
      animate={{ scale: [0, 0, 1.15, 1, 0], opacity: [0, 0, 1, 1, 0] }}
      transition={{ ...LOOP, times: [0, 0.66, 0.74, 0.88, 1] }}
    >
      <rect x="78" y="54" width="64" height="30" rx="15" className="fill-brand" />
      <text x="110" y="75" textAnchor="middle" fontFamily="Poppins, sans-serif" fontWeight="700" fontSize="17" fill="#fff">
        SIX!
      </text>
    </motion.g>
  </svg>
);

// A real photo of the Nilgiris with a slow drift so it feels alive.
export const NilgirisPhoto = ({ className = '' }) => (
  <div className={`relative h-full w-full overflow-hidden ${className}`}>
    <motion.img
      src={Nilgiris}
      alt="Tea fields and misty ranges in the Nilgiris, near Ooty"
      className="absolute inset-0 h-full w-full object-cover"
      loading="lazy"
      animate={{ scale: [1.05, 1.15, 1.05], x: ['0%', '-3%', '0%'] }}
      transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
    />
  </div>
);
