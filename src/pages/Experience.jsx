import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { HiArrowUpRight, HiOutlineAcademicCap, HiOutlineCalendar, HiOutlineMapPin } from 'react-icons/hi2';
import { experience, education, schooling } from '../data/profile';
import { Page, SectionHeading } from '../components/Motion';

const Logo = ({ src, className = 'h-11 w-11' }) => (
  <motion.span
    className={`grid ${className} shrink-0 place-items-center overflow-hidden rounded-xl bg-white p-1 ring-1 ring-line`}
    whileHover={{ rotate: -8, scale: 1.08 }}
    transition={{ type: 'spring', stiffness: 300, damping: 15 }}
  >
    <img src={src} alt="" className="h-full w-full rounded-lg object-contain" />
  </motion.span>
);

const Meta = ({ icon: Icon, children }) => (
  <span className="inline-flex items-center gap-1.5 rounded-full bg-paper px-3 py-1.5 text-xs text-ink-muted">
    <Icon className="h-3.5 w-3.5" /> {children}
  </span>
);

const Experience = () => {
  const timeline = useRef(null);
  const { scrollYProgress } = useScroll({ target: timeline, offset: ['start 70%', 'end 60%'] });
  const grow = useSpring(scrollYProgress, { stiffness: 90, damping: 22 });

  return (
    <Page>
      <SectionHeading eyebrow="Experience" title={<>Where I've <em>worked</em></>}>
        From trading systems to the deployment platform behind Meesho's services.
      </SectionHeading>

      <div ref={timeline} className="relative pl-8 sm:pl-12">
        {/* Line that fills in as you scroll */}
        <div className="absolute bottom-6 left-[7px] top-6 w-0.5 rounded-full bg-line sm:left-[11px]" />
        <motion.div
          className="absolute bottom-6 left-[7px] top-6 w-0.5 origin-top rounded-full bg-brand sm:left-[11px]"
          style={{ scaleY: grow }}
        />

        <ol className="space-y-6">
          {experience.map((job, index) => (
            <li key={`${job.company}-${job.role}`} className="relative">
              <motion.span
                className="absolute -left-8 top-9 grid h-4 w-4 place-items-center rounded-full bg-brand/25 sm:-left-12 sm:h-6 sm:w-6"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ type: 'spring', stiffness: 300, damping: 14 }}
              >
                <span className="h-2 w-2 rounded-full bg-brand sm:h-2.5 sm:w-2.5" />
              </motion.span>

              <motion.article
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4 }}
                className="card group p-6 transition-shadow hover:shadow-lift sm:p-8"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <Logo src={job.logo} />
                    <div>
                      <h3 className="text-lg sm:text-2xl">{job.role}</h3>
                      <p className="mt-0.5 font-semibold text-accent">
                        {job.link ? (
                          <a href={job.link} target="_blank" rel="noreferrer" className="link-underline inline-flex items-center gap-1">
                            {job.company} <HiArrowUpRight className="h-3.5 w-3.5" />
                          </a>
                        ) : (
                          job.company
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Meta icon={HiOutlineCalendar}>{job.period}</Meta>
                    <Meta icon={HiOutlineMapPin}>{job.location}</Meta>
                  </div>
                </div>

                <ul className="mt-6 space-y-3">
                  {job.points.map((p, i) => (
                    <motion.li
                      key={p}
                      className="flex gap-3 leading-relaxed text-ink-soft"
                      initial={{ opacity: 0, x: 12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.15 + i * 0.06, duration: 0.4 }}
                    >
                      <span className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                      {p}
                    </motion.li>
                  ))}
                </ul>

                <ul className="mt-6 flex flex-wrap gap-2">
                  {job.tags.map((t, i) => (
                    <motion.li
                      key={t}
                      className="chip"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.04 }}
                      whileHover={{ y: -2 }}
                    >
                      {t}
                    </motion.li>
                  ))}
                </ul>
                <span className="sr-only">Role {index + 1} of {experience.length}</span>
              </motion.article>
            </li>
          ))}
        </ol>
      </div>

      <section className="mt-28">
        <SectionHeading eyebrow="Education" title={<>Where I <em>studied</em></>} />
        <div className="space-y-4">
          {[
            { logo: education.logo, title: education.degree, place: education.school, period: education.period, score: education.score },
            ...schooling.map((sc) => ({ logo: sc.logo || null, title: sc.degree, place: sc.school, period: sc.period, score: sc.score })),
          ].map((e, i) => (
            <motion.article
              key={e.place}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4 }}
              className="card flex flex-col gap-4 p-6 transition-shadow hover:shadow-lift sm:flex-row sm:items-center sm:gap-6"
            >
              {e.logo ? (
                <Logo src={e.logo} className="h-14 w-14" />
              ) : (
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent">
                  <HiOutlineAcademicCap className="h-7 w-7" />
                </span>
              )}
              <div className="flex-1">
                <h3 className="text-xl sm:text-2xl">{e.title}</h3>
                <p className="mt-0.5 text-ink-soft">{e.place}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Meta icon={HiOutlineCalendar}>{e.period}</Meta>
                {e.score && <Meta icon={HiOutlineAcademicCap}>{e.score}</Meta>}
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </Page>
  );
};

export default Experience;
