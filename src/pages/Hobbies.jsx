import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiArrowDown } from 'react-icons/hi2';
import OotyMe from '../assets/ooty-me.jpg';
import { Page, Reveal, SectionHeading } from '../components/Motion';
import CricketNets from '../components/hobbies/CricketNets';
import LightsOut from '../components/hobbies/LightsOut';
import F1Car from '../components/hobbies/F1Car';
import { CricketScene, NilgirisPhoto } from '../components/hobbies/Scenes';

const hobbies = [
  {
    title: 'Cricket',
    tag: 'Watching & playing',
    text: 'Weekend matches with friends and late nights following big games. Few things beat a close chase in the last over.',
    href: '#cricket',
    scene: <CricketScene />,
    tint: 'from-[#2c5a45]/15',
  },
  {
    title: 'Formula 1',
    tag: 'Watching',
    text: 'Qualifying laps, strategy calls and lights out on Sunday. The engineering behind it is half the fun.',
    href: '#f1',
    scene: <F1Car compact />,
    tint: 'from-[#e10600]/10',
  },
  {
    title: 'Travel',
    tag: 'Exploring',
    text: 'Hills, tea gardens and road trips with friends, usually decided at the last minute.',
    href: '#travel',
    scene: <NilgirisPhoto />,
    tint: 'from-[#ffb15e]/20',
  },
];

const Hobbies = () => {
  const { hash } = useLocation();

  // Links like /hobbies#f1 land on that section once the page has rendered.
  useEffect(() => {
    if (!hash) return undefined;
    const timer = setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' }), 150);
    return () => clearTimeout(timer);
  }, [hash]);

  return (
    <Page>
      <SectionHeading eyebrow="Off the clock" title={<>When I'm not <em>shipping code</em></>}>
        A few things that keep me busy away from the keyboard. Two of them you can play right here.
      </SectionHeading>

      <section className="grid gap-6 md:grid-cols-3">
        {hobbies.map(({ title, tag, text, href, scene, tint }, i) => (
          <motion.a
            key={title}
            href={href}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -8, rotate: i === 1 ? 0 : i === 0 ? -1 : 1 }}
            className={`card group flex flex-col overflow-hidden bg-gradient-to-b ${tint} to-transparent transition-shadow hover:shadow-lift`}
          >
            <div className="h-44 overflow-hidden">{scene}</div>
            <div className="flex flex-1 flex-col p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">{tag}</p>
              <h3 className="mt-1 text-2xl">{title}</h3>
              <p className="mt-2 leading-relaxed text-ink-muted">{text}</p>
              <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-accent">
                {i < 2 ? 'Play' : 'Read'}
                <HiArrowDown className="h-4 w-4 transition group-hover:translate-y-1" />
              </span>
            </div>
          </motion.a>
        ))}
      </section>

      <section id="cricket" className="mt-32 scroll-mt-28">
        <SectionHeading eyebrow="Cricket" title={<>Net <em>session</em></>}>
          Bowl a few deliveries and see whether the batter clears the rope or loses the stumps.
        </SectionHeading>
        <Reveal>
          <CricketNets />
        </Reveal>
      </section>

      <section id="f1" className="mt-32 scroll-mt-28">
        <SectionHeading eyebrow="Formula 1" title={<>Lights out and <em>away we go</em></>}>
          Test your reactions like a driver on the grid. The average human reaction is around 250 ms.
        </SectionHeading>
        <div className="grid gap-6 lg:grid-cols-2">
          <Reveal>
            <LightsOut />
          </Reveal>
          <Reveal delay={0.1} className="flex flex-col gap-6">
            <div className="card overflow-hidden p-2">
              <F1Car />
            </div>
            <div className="card grid grid-cols-3 divide-x divide-line py-6 text-center">
              {[
                ['24', 'races a season'],
                ['~350', 'km/h top speed'],
                ['~2 s', 'pit stops'],
              ].map(([v, l], i) => (
                <motion.div
                  key={l}
                  className="px-2"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                >
                  <p className="font-display text-3xl font-semibold text-ink">{v}</p>
                  <p className="mt-1 text-xs text-ink-muted">{l}</p>
                </motion.div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section id="travel" className="mt-32 scroll-mt-28">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] shadow-lift">
            <div className="h-[460px] sm:h-[520px]">
              <NilgirisPhoto />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex flex-col gap-6 p-6 sm:flex-row sm:items-end sm:justify-between sm:p-10">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="max-w-xl text-white"
              >
                <span className="inline-flex rounded-full border border-white/30 bg-white/10 px-3.5 py-1 font-display text-xs font-medium uppercase tracking-[0.14em] backdrop-blur">
                  Travel
                </span>
                <h2 className="mt-4 text-4xl leading-tight !text-white sm:text-5xl">Misty hills over city lights</h2>
                <p className="mt-3 text-lg leading-relaxed text-white/85">
                  Give me a hill station, a winding road and good company. I rarely plan ahead: most trips are decided at the last minute
                  and figured out along the way.
                </p>
              </motion.div>
              <motion.figure
                initial={{ opacity: 0, rotate: 8, scale: 0.8 }}
                whileInView={{ opacity: 1, rotate: -4, scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 120, damping: 14, delay: 0.4 }}
                whileHover={{ rotate: 0, scale: 1.04 }}
                className="w-40 shrink-0 rounded-2xl bg-white p-2 pb-3 shadow-lift sm:w-48"
              >
                <img src={OotyMe} alt="Srikar by a waterfall in Ooty" className="aspect-square w-full rounded-xl object-cover object-[28%_50%]" />
                <figcaption className="mt-2 text-center font-display text-xs font-medium text-night">Me, in Ooty</figcaption>
              </motion.figure>
            </div>
          </div>
        </Reveal>
      </section>
    </Page>
  );
};

export default Hobbies;
