import { Link } from 'react-router-dom';
import { HiArrowUp } from 'react-icons/hi';
import { profile, socials } from '../data/profile';
import { links } from './Navbar';
import SocialIcon from './SocialIcon';

const Footer = () => (
  <footer className="bg-night text-white/70">
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-10">
      <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-display text-3xl text-white sm:text-4xl">
            Let's build something <span className="underline decoration-white/30 decoration-4 underline-offset-8">good</span>.
          </p>
          <a href={`mailto:${profile.email}`} className="link-underline mt-4 inline-block text-white">
            {profile.email}
          </a>
        </div>
        <div className="flex items-center gap-2">
          {socials.map((s) => (
            <a
              key={s.name}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              aria-label={s.name}
              className="rounded-full border border-white/15 p-2.5 transition hover:border-white/60 hover:text-white"
            >
              <SocialIcon icon={s.icon} className="h-4 w-4" />
            </a>
          ))}
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="ml-2 rounded-full bg-white p-2.5 text-night transition hover:-translate-y-0.5"
            aria-label="Back to top"
          >
            <HiArrowUp className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm md:flex-row md:items-center md:justify-between">
        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2">
          {links.map((l) => (
            <Link key={l.to} to={l.to} className="transition hover:text-white">
              {l.label}
            </Link>
          ))}
        </nav>
        <p className="text-white/45">
          © {new Date().getFullYear()} {profile.name} ·{' '}
          <a
            href="https://commons.wikimedia.org/wiki/File:Tea_Fields_Nilgiris_Ranges_Mynala_Dec25_A7CR_09866.jpg"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white"
          >
            Nilgiris photo: Timothy A. Gonsalves, CC BY-SA 4.0
          </a>
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
