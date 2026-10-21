import { motion } from 'framer-motion';
import { FaGithub } from 'react-icons/fa';
import { HiArrowUpRight, HiCheck } from 'react-icons/hi2';
import { projects } from '../data/profile';
import { Page, Reveal, SectionHeading, useTilt } from '../components/Motion';

const ease = [0.22, 1, 0.36, 1];

// Screenshot inside a small browser window frame.
const BrowserFrame = ({ project }) => {
  const tilt = useTilt(4);
  const host = project.live.replace(/^https?:\/\//, '').split('/')[0];
  return (
    <motion.a
      href={project.live}
      target="_blank"
      rel="noreferrer"
      {...tilt}
      whileHover={{ y: -6 }}
      className="group block overflow-hidden rounded-2xl border border-line bg-surface shadow-lift"
    >
      <div className="flex items-center gap-2 border-b border-line bg-paper px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff6b6b]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#ffd166]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#6dd39b]" />
        <span className="ml-3 flex-1 truncate rounded-md bg-surface px-3 py-1 text-[11px] text-ink-muted">{host}</span>
      </div>
      <div className="relative overflow-hidden">
        <img
          src={project.image}
          alt={`${project.title} screenshot`}
          loading="lazy"
          className="aspect-[16/10] w-full object-cover object-top transition duration-700 ease-out group-hover:scale-[1.03]"
        />
        <span className="absolute bottom-4 right-4 translate-y-2 rounded-full bg-surface px-4 py-2 text-sm font-semibold text-ink opacity-0 shadow-lift transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          Visit site ↗
        </span>
      </div>
    </motion.a>
  );
};

// Screenshot and details side by side; the details swap sides on every other project.
const Showcase = ({ project, index }) => {
  const flip = index % 2 === 1;
  return (
    <article className="grid items-center gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
      <motion.div
        className={flip ? 'lg:order-2' : ''}
        initial={{ opacity: 0, x: flip ? 50 : -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, ease }}
      >
        <BrowserFrame project={project} />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        variants={{ show: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } } }}
      >
        {[
          <div key="meta" className="flex flex-wrap items-center gap-2 text-xs font-semibold">
            <span className="rounded-full bg-accent-soft px-3 py-1 text-accent">{project.category}</span>
            {project.period && <span className="rounded-full border border-line px-3 py-1 text-ink-muted">{project.period}</span>}
          </div>,
          <h2 key="t" className="mt-4 text-3xl sm:text-4xl">
            {project.title}
          </h2>,
          <p key="s" className="mt-1 font-semibold text-ink-soft">
            {project.subtitle}
          </p>,
          <p key="d" className="mt-4 leading-relaxed text-ink-muted">
            {project.description}
          </p>,
          project.highlights && (
            <ul key="h" className="mt-5 grid gap-2.5 sm:grid-cols-2">
              {project.highlights.map((h) => (
                <li key={h} className="flex items-center gap-2.5 text-sm font-semibold text-ink">
                  <HiCheck className="h-4 w-4 shrink-0 text-accent" />
                  {h}
                </li>
              ))}
            </ul>
          ),
          <p key="st" className="mt-5 text-sm text-ink-muted">
            {project.stack.join(' · ')}
          </p>,
          <div key="b" className="mt-7 flex flex-wrap gap-3">
            <a href={project.live} target="_blank" rel="noreferrer" className="btn-primary">
              Live demo <HiArrowUpRight />
            </a>
            <a href={project.repo} target="_blank" rel="noreferrer" className="btn-ghost">
              <FaGithub /> Source
            </a>
          </div>,
        ]
          .filter(Boolean)
          .map((node) => (
            <motion.div
              key={node.key}
              variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } } }}
            >
              {node}
            </motion.div>
          ))}
      </motion.div>
    </article>
  );
};

const SmallCard = ({ project, index }) => (
  <motion.article
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.08, duration: 0.5, ease }}
    whileHover={{ y: -6 }}
    className="card group flex flex-col overflow-hidden transition-shadow hover:shadow-lift"
  >
    <a href={project.live} target="_blank" rel="noreferrer" className="block overflow-hidden">
      <img
        src={project.image}
        alt={`${project.title} screenshot`}
        loading="lazy"
        className="aspect-[16/10] w-full object-cover object-top transition duration-700 group-hover:scale-105"
      />
    </a>
    <div className="flex flex-1 flex-col p-5">
      <h3 className="text-lg">{project.title}</h3>
      <p className="mt-1 text-sm leading-relaxed text-ink-muted">{project.description}</p>
      <p className="mt-3 text-xs text-ink-muted">{project.stack.join(' · ')}</p>
      <div className="mt-auto flex items-center gap-4 pt-4 text-sm font-semibold">
        <a href={project.live} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-accent hover:underline">
          Live <HiArrowUpRight />
        </a>
        <a href={project.repo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-ink-muted hover:text-ink">
          <FaGithub /> Code
        </a>
      </div>
    </div>
  </motion.article>
);

const Projects = () => {
  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);

  return (
    <Page>
      <SectionHeading eyebrow="Projects" title={<>Things I've <em>built</em></>}>
        From a full booking platform with payments to small React experiments. Click any screenshot to open the live site.
      </SectionHeading>

      <div className="space-y-24 sm:space-y-32">
        {featured.map((project, i) => (
          <Showcase key={project.title} project={project} index={i} />
        ))}
      </div>

      <section className="mt-32">
        <Reveal className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl">Smaller builds</h2>
            <p className="mt-2 text-ink-muted">Utilities and React experiments from along the way.</p>
          </div>
        </Reveal>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {others.map((project, i) => (
            <SmallCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </section>
    </Page>
  );
};

export default Projects;
