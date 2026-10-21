import { motion } from 'framer-motion';
import { HiOutlineDocumentArrowDown } from 'react-icons/hi2';
import Photo from '../assets/Profile.jpg';
import { profile, about, education, skillGroups } from '../data/profile';
import { Page, Reveal, SectionHeading } from '../components/Motion';
import SkillIcon from '../components/SkillIcon';
import LeetCodeStats from '../components/LeetCodeStats';

const facts = [
  ['Currently', `Software Engineer I, ${profile.company}`],
  ['Based in', profile.location],
  ['From', profile.hometown],
  ['Studied', `B.Tech CSE, ${education.short}`],
];

const SkillCard = ({ group, delay, wide = false }) => (
  <Reveal delay={delay} className={`card p-6 ${wide ? 'md:col-span-2' : ''}`}>
    <h3 className="mb-5 text-lg">{group.title}</h3>
    <ul className="flex flex-wrap justify-center gap-3">
      {group.items.map((name, i) => (
        <motion.li
          key={name}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.03 * i, duration: 0.35 }}
          whileHover={{ y: -4 }}
          className="group flex h-[104px] w-[112px] flex-col items-center justify-center gap-2 rounded-2xl border border-line bg-paper text-center transition-colors duration-300 hover:border-ink/30 hover:bg-surface hover:shadow-soft"
        >
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-surface shadow-sm transition group-hover:scale-110">
            <SkillIcon name={name} className="h-6 w-6" brand />
          </span>
          <span className="text-xs font-semibold text-ink-soft">{name}</span>
        </motion.li>
      ))}
    </ul>
  </Reveal>
);

const About = () => (
  <Page>
    <section className="grid items-center gap-14 lg:grid-cols-[0.8fr_1.2fr]">
      <motion.figure
        className="relative mx-auto w-[86%] max-w-sm sm:w-full"
        initial={{ opacity: 0, y: 20, rotate: -2 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="absolute -inset-3 rotate-3 rounded-[2rem] bg-gradient-to-br from-[#9cc97a]/45 to-[#3d6b45]/35" aria-hidden="true" />
        <img src={Photo} alt="Srikar Ambula in a tea garden" className="relative aspect-[4/5] w-full rounded-[1.75rem] object-cover shadow-lift" />
        <motion.div
          className="absolute -bottom-5 -right-3 flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-[#2f5233] shadow-lift ring-1 ring-[#2f5233]/15 dark:bg-[#2f5233] dark:text-white dark:ring-white/10 sm:-right-6"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#4c9a5a] opacity-60 dark:bg-[#b6e38f]" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#4c9a5a] dark:bg-[#b6e38f]" />
          </span>
          <span className="text-sm font-semibold">Ooty, Tamil Nadu</span>
        </motion.div>
      </motion.figure>

      <div>
        <SectionHeading eyebrow="About me" title={<>Hi, I'm Srikar. I build platforms and <em>products</em>.</>} />
        <div className="space-y-5 text-[17px] leading-relaxed text-ink-soft">
          {about.map((para, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <p>{para}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <dl className="mt-9 grid gap-3 sm:grid-cols-2">
            {facts.map(([k, v]) => (
              <div key={k} className="rounded-2xl border border-line bg-surface px-4 py-3">
                <dt className="text-xs font-semibold uppercase tracking-wider text-ink-muted">{k}</dt>
                <dd className="mt-0.5 text-ink">{v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal delay={0.2} className="mt-9 flex flex-wrap gap-3">
          <a href={profile.resume} target="_blank" rel="noreferrer" className="btn-primary">
            <HiOutlineDocumentArrowDown className="h-4 w-4" /> Download resume
          </a>
          <a href={`mailto:${profile.email}`} className="btn-ghost">
            Email me
          </a>
        </Reveal>
      </div>
    </section>

    <section className="mt-32">
      <SectionHeading eyebrow="Toolbox" title="Skills">
        What I use at work and on side projects.
      </SectionHeading>
      <div className="grid gap-5 md:grid-cols-2">
        {skillGroups.map((group, gi) => (
          <SkillCard key={group.title} group={group} delay={gi * 0.06} wide={group.items.length > 8} />
        ))}
      </div>
    </section>

    <section className="mt-32">
      <SectionHeading eyebrow="Practice" title="Problem solving">
        I keep my fundamentals sharp with data structures and algorithms on LeetCode.
      </SectionHeading>
      <Reveal>
        <LeetCodeStats />
      </Reveal>
    </section>
  </Page>
);

export default About;
