import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  HiArrowUpRight, HiArrowRight, HiOutlineDocumentArrowDown, HiOutlineServerStack, HiOutlineRocketLaunch, HiOutlineCodeBracket,
} from 'react-icons/hi2';
import { profile, socials, projects, experience, education } from '../data/profile';
import { Page, Reveal, SectionHeading, Typewriter } from '../components/Motion';
import HeroTerminal from '../components/HeroTerminal';
import SocialIcon from '../components/SocialIcon';

const focus = [
  {
    icon: HiOutlineServerStack,
    title: 'Developer platforms',
    text: 'Self-service tooling that turns tickets and runbooks into one-click workflows for hundreds of services.',
  },
  {
    icon: HiOutlineRocketLaunch,
    title: 'CI/CD & Kubernetes',
    text: 'Safe releases at scale: canaries, auto-rollbacks, multi-zone deploys and zero-downtime cluster moves.',
  },
  {
    icon: HiOutlineCodeBracket,
    title: 'Full-stack products',
    text: 'End-to-end apps with React and Node.js: payments, auth, role-based portals and a clean UI.',
  },
];

// One card per organisation, newest first.
const places = [
  ...[...new Map(experience.map((e) => [e.company, e])).values()].map((e) => ({
    name: e.company,
    logo: e.logo,
    note: e.company === 'Meesho' ? 'Software Engineer' : e.role.includes('Intern') ? 'Internship' : e.role,
  })),
  { name: education.short, logo: education.logo, note: 'B.Tech CSE' },
];

const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const Home = () => (
  <Page className="pt-32 sm:pt-40">
    {/* Hero */}
    <section className="grid items-center gap-14 lg:grid-cols-[1.1fr_1fr]">
      <motion.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.1 } } }}>
        <motion.p variants={item} className="flex items-center gap-2 text-sm text-ink-muted">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
          </span>
          Software Engineer at {profile.company} · {profile.location}
        </motion.p>
        <motion.h1 variants={item} className="mt-6 text-5xl leading-[1.05] sm:text-6xl lg:text-7xl">
          Hi, I'm <em>Srikar</em>
        </motion.h1>
        <motion.p variants={item} className="mt-6 h-7 font-mono text-sm text-ink sm:text-base">
          <Typewriter words={profile.typewriter} />
        </motion.p>
        <motion.p variants={item} className="mt-6 max-w-xl text-lg leading-relaxed text-ink-muted">
          {profile.intro}
        </motion.p>
        <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-3">
          <Link to="/projects" className="btn-primary">
            See my work <HiArrowRight />
          </Link>
          <a href={profile.resume} target="_blank" rel="noreferrer" className="btn-ghost">
            <HiOutlineDocumentArrowDown className="h-4 w-4" /> Resume
          </a>
          <span className="mx-2 hidden h-6 w-px bg-line sm:block" />
          <div className="flex items-center gap-1">
            {socials.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.name}
                className="rounded-full p-2 text-ink-muted transition hover:-translate-y-0.5 hover:text-accent"
              >
                <SocialIcon icon={s.icon} className="h-[18px] w-[18px]" />
              </a>
            ))}
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <HeroTerminal />
      </motion.div>
    </section>

    {/* Where I've been */}
    <section className="mt-24">
      <Reveal className="mb-5 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-ink-muted">Where I've been</p>
      </Reveal>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {places.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            whileHover={{ y: -4 }}
          >
            <Link to="/experience" className="card group flex items-center gap-3 p-4 transition-shadow hover:shadow-lift">
              <motion.img
                src={p.logo}
                alt=""
                className="h-11 w-11 shrink-0 rounded-xl bg-white object-contain p-1 ring-1 ring-line"
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
                whileHover={{ rotate: -8, scale: 1.12 }}
              />
              <div className="min-w-0">
                <p className="truncate font-display text-sm font-semibold text-ink">{p.name}</p>
                <p className="truncate text-xs text-ink-muted">{p.note}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>

    {/* What I do */}
    <section className="mt-28">
      <SectionHeading eyebrow="What I do" title={<>Platforms by day, <em>products</em> by night</>} center>
        Most of my time goes into the infrastructure other engineers rely on. The rest goes into building things end to end.
      </SectionHeading>
      <div className="grid gap-5 md:grid-cols-3">
        {focus.map(({ icon: Icon, title, text }, i) => (
          <Reveal key={title} delay={i * 0.08}>
            <motion.div whileHover={{ y: -6 }} className="card group h-full p-7 transition-shadow hover:shadow-lift">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-accent-soft text-accent transition group-hover:rotate-6 group-hover:scale-110">
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="mt-5 text-xl">{title}</h3>
              <p className="mt-2 leading-relaxed text-ink-muted">{text}</p>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </section>

    {/* Selected work */}
    <section className="mt-28">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeading eyebrow="Featured project" title={<>Built <em>end to end</em></>} />
        <Reveal className="mb-10 sm:mb-12">
          <Link to="/projects" className="link-underline inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
            All projects <HiArrowUpRight />
          </Link>
        </Reveal>
      </div>
      {(() => {
        const p = projects[0];
        return (
          <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-14">
            <motion.a
              href={p.live}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6 }}
              className="group block overflow-hidden rounded-2xl border border-line shadow-soft transition-shadow hover:shadow-lift"
            >
              <img
                src={p.image}
                alt={`${p.title} screenshot`}
                loading="lazy"
                className="aspect-[16/10] w-full object-cover object-top transition duration-700 group-hover:scale-[1.03]"
              />
            </motion.a>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-sm font-semibold text-ink-muted">{p.period}</p>
              <h3 className="mt-2 text-3xl sm:text-4xl">{p.title}</h3>
              <p className="mt-1 font-semibold text-ink-soft">{p.subtitle}</p>
              <p className="mt-4 leading-relaxed text-ink-muted">{p.description}</p>
              <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                {p.highlights.map((h) => (
                  <li key={h} className="flex items-center gap-2 text-sm font-semibold text-ink">
                    <span className="h-1.5 w-1.5 rounded-full bg-ink" />
                    {h}
                  </li>
                ))}
              </ul>
              <div className="mt-7 flex flex-wrap gap-3">
                <a href={p.live} target="_blank" rel="noreferrer" className="btn-primary">
                  Live demo <HiArrowUpRight />
                </a>
                <a href={p.repo} target="_blank" rel="noreferrer" className="btn-ghost">
                  Source
                </a>
              </div>
            </motion.div>
          </div>
        );
      })()}
    </section>

    {/* Contact */}
    <Reveal className="mt-28 border-t border-line pt-14">
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-accent">Get in touch</p>
          <h2 className="mt-3 max-w-xl text-3xl leading-tight sm:text-4xl">Have a role, a project, or just want to chat? Let's talk.</h2>
          <a href={`mailto:${profile.email}`} className="link-underline mt-4 inline-block text-ink-soft hover:text-ink">
            {profile.email}
          </a>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link to="/contact" className="btn-primary">
            Write to me <HiArrowRight />
          </Link>
          <Link to="/hobbies" className="btn-ghost">
            Off the clock
          </Link>
        </div>
      </div>
    </Reveal>
  </Page>
);

export default Home;
