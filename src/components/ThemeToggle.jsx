import { AnimatePresence, motion } from 'framer-motion';
import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi2';
import { toggleTheme, useIsDark } from '../theme';

const ThemeToggle = ({ className = '' }) => {
  const dark = useIsDark();
  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`relative grid h-9 w-9 place-items-center overflow-hidden rounded-full border border-line bg-surface text-ink transition hover:border-brand/60 ${className}`}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={dark ? 'Light mode' : 'Dark mode'}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={dark ? 'sun' : 'moon'}
          initial={{ y: 14, opacity: 0, rotate: -40 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: -14, opacity: 0, rotate: 40 }}
          transition={{ duration: 0.2 }}
        >
          {dark ? <HiOutlineSun className="h-[18px] w-[18px]" /> : <HiOutlineMoon className="h-[18px] w-[18px]" />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
};

export default ThemeToggle;
