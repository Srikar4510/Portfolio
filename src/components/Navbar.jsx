import { useEffect, useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { socials } from '../data/profile';
import SocialIcon from './SocialIcon';
import ThemeToggle from './ThemeToggle';

export const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/experience', label: 'Experience' },
  { to: '/projects', label: 'Projects' },
  { to: '/hobbies', label: 'Hobbies' },
  { to: '/contact', label: 'Contact' },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });

  useEffect(() => {
    window.scrollTo(0, 0);
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock page scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open ? 'border-b border-line bg-paper/85 backdrop-blur-md' : 'border-b border-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-10" aria-label="Main">
        <Link to="/" className="group flex items-center gap-3" aria-label="Srikar Ambula, home">
          <span className="grid h-9 w-9 place-items-center rounded-full border border-ink font-display text-base text-ink transition group-hover:bg-ink group-hover:text-paper">
            SA
          </span>
          <span className="font-display text-lg text-ink">Srikar Ambula</span>
        </Link>

        <ul className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `relative block py-1 text-sm transition ${isActive ? 'text-ink' : 'text-ink-muted hover:text-ink'}`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute inset-x-0 -bottom-0.5 h-px bg-ink"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1">
          <div className="hidden items-center gap-1 lg:flex">
          {socials.map((s) => (
            <a
              key={s.name}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              aria-label={s.name}
              className="rounded-full p-2 text-ink-muted transition hover:text-ink"
            >
              <SocialIcon icon={s.icon} className="h-[18px] w-[18px]" />
            </a>
          ))}
          </div>
          <ThemeToggle className="ml-2" />
          <button
            type="button"
            className="ml-1 rounded-full p-2 text-2xl text-ink md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <HiX /> : <HiMenuAlt3 />}
          </button>
        </div>
      </nav>
      <motion.div className="h-px origin-left bg-ink/60" style={{ scaleX: progress }} />

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-x-0 bottom-0 top-[69px] flex flex-col bg-paper px-6 pt-8 md:hidden"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <ul className="divide-y divide-line border-y border-line">
              {links.map((link, i) => (
                <motion.li key={link.to} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.04 * i }}>
                  <NavLink
                    to={link.to}
                    end={link.to === '/'}
                    className={({ isActive }) =>
                      `flex items-center justify-between py-4 font-display text-2xl ${isActive ? 'text-ink' : 'text-ink-muted'}`
                    }
                  >
                    {link.label}
                    <span className="font-mono text-xs text-ink-muted">0{i + 1}</span>
                  </NavLink>
                </motion.li>
              ))}
            </ul>
            <div className="mt-8 flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.name}
                  className="rounded-full border border-line bg-surface p-3 text-ink"
                >
                  <SocialIcon icon={s.icon} className="h-5 w-5" />
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
