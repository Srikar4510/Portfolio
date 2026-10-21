import { useEffect, useState } from 'react';
import emailjs from '@emailjs/browser';
import { AnimatePresence, motion } from 'framer-motion';
import { HiOutlineClipboardDocument, HiCheck, HiOutlinePaperAirplane, HiArrowPath, HiArrowUpRight } from 'react-icons/hi2';
import { profile, socials } from '../data/profile';
import { Page, Reveal, SectionHeading } from '../components/Motion';
import SocialIcon from '../components/SocialIcon';
import { useConfetti } from '../components/Fun';

// EmailJS public identifiers (safe to ship in the browser; abuse is limited in the EmailJS dashboard).
const EMAILJS = {
  service: 'service_31qu5rb',
  template: 'template_9548mnl',
  publicKey: 'AT9wnz5IoRSM3hQEz',
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const empty = { name: '', email: '', message: '', website: '' };

const validate = ({ name, email, message }) => {
  const errors = {};
  if (name.trim().length < 2) errors.name = 'Please tell me your name.';
  if (!EMAIL_RE.test(email.trim())) errors.email = 'That email address does not look right.';
  if (message.trim().length < 10) errors.message = 'A few more words, please (at least 10 characters).';
  if (message.length > 3000) errors.message = 'Please keep it under 3000 characters.';
  return errors;
};

const useBangaloreTime = () => {
  const format = () =>
    new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'Asia/Kolkata' });
  const [time, setTime] = useState(format);
  useEffect(() => {
    const id = setInterval(() => setTime(format()), 30000);
    return () => clearInterval(id);
  }, []);
  return time;
};

const Contact = () => {
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sent | failed
  const [copied, setCopied] = useState(false);
  const time = useBangaloreTime();
  const [confetti, fire] = useConfetti();

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (form.website) return; // honeypot: bots fill hidden fields
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length) return;

    setStatus('sending');
    try {
      await emailjs.send(
        EMAILJS.service,
        EMAILJS.template,
        {
          from_name: form.name.trim(),
          to_name: profile.firstName,
          reply_to: form.email.trim(),
          to_email: profile.email,
          message: form.message.trim(),
        },
        { publicKey: EMAILJS.publicKey },
      );
      setStatus('sent');
      setTimeout(() => fire('50%', '35%', 40), 450);
      setForm(empty);
    } catch (error) {
      console.error(error);
      setStatus('failed');
    }
  };

  return (
    <Page>
      <SectionHeading eyebrow="Contact" title={<>Let's <em>talk</em></>}>
        Roles, projects, or the last race weekend. Write me a note and I'll reply by email.
      </SectionHeading>

      <div className="grid gap-8 lg:grid-cols-[1.35fr_0.65fr]">
        {/* The letter */}
        <Reveal className="h-full">
          <div className="relative h-full">
            {confetti}
            <AnimatePresence mode="wait">
              {status !== 'sent' ? (
                <motion.form
                  key="letter"
                  onSubmit={onSubmit}
                  noValidate
                  className="card relative flex h-full flex-col overflow-hidden p-6 sm:p-8"
                  exit={{ x: 260, y: -220, rotate: 18, scale: 0.3, opacity: 0, transition: { duration: 0.7, ease: [0.5, 0, 0.75, 0] } }}
                >
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent-soft text-accent">
                      <HiOutlinePaperAirplane className="h-5 w-5" />
                    </span>
                    <div>
                      <h2 className="text-xl">Send a message</h2>
                      <p className="text-sm text-ink-muted">It lands straight in my inbox.</p>
                    </div>
                  </div>

                  <div className="mt-8 grid gap-5 sm:grid-cols-2">
                    {[
                      { name: 'name', label: 'Name', type: 'text', auto: 'name', placeholder: 'Your name' },
                      { name: 'email', label: 'Email', type: 'email', auto: 'email', placeholder: 'you@company.com' },
                    ].map((f) => (
                      <label key={f.name} className="block">
                        <span className="mb-2 block text-sm font-semibold text-ink">{f.label}</span>
                        <input
                          name={f.name}
                          type={f.type}
                          value={form[f.name]}
                          onChange={onChange}
                          autoComplete={f.auto}
                          placeholder={f.placeholder}
                          className={`field ${errors[f.name] ? '!border-rose-400' : ''}`}
                        />
                        {errors[f.name] && <span className="mt-1.5 block text-xs text-rose-500">{errors[f.name]}</span>}
                      </label>
                    ))}
                  </div>

                  <label className="mt-5 flex flex-1 flex-col">
                    <span className="mb-2 flex items-baseline justify-between text-sm font-semibold text-ink">
                      Message <span className="text-xs font-normal text-ink-muted">{form.message.length}/3000</span>
                    </span>
                    <textarea
                      name="message"
                      rows={6}
                      value={form.message}
                      onChange={onChange}
                      placeholder="What would you like to talk about?"
                      className={`field min-h-[160px] flex-1 resize-none leading-relaxed ${errors.message ? '!border-rose-400' : ''}`}
                    />
                    {errors.message && <span className="mt-1.5 block text-xs text-rose-500">{errors.message}</span>}
                  </label>

                  <input name="website" value={form.website} onChange={onChange} className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />

                  <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
                    {status === 'failed' ? (
                      <p className="text-sm text-rose-500">
                        Couldn't send right now. Email me at{' '}
                        <a href={`mailto:${profile.email}`} className="underline">
                          {profile.email}
                        </a>
                        .
                      </p>
                    ) : (
                      <p className="text-sm text-ink-muted">Replies come to your email.</p>
                    )}
                    <motion.button
                      type="submit"
                      disabled={status === 'sending'}
                      whileTap={{ scale: 0.96 }}
                      className="btn-primary group px-6 py-3 disabled:opacity-60"
                    >
                      {status === 'sending' ? (
                        <>
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-on-brand/30 border-t-on-brand" /> Sending…
                        </>
                      ) : (
                        <>
                          Send message <HiOutlinePaperAirplane className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-1" />
                        </>
                      )}
                    </motion.button>
                  </div>
                </motion.form>
              ) : (
                <motion.div
                  key="sent"
                  className="card grid h-full min-h-[460px] place-items-center p-10 text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <div>
                    <motion.span
                      className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-brand text-on-brand"
                      initial={{ scale: 0, rotate: -90 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', stiffness: 260, damping: 14, delay: 0.3 }}
                    >
                      <HiCheck className="h-10 w-10" />
                    </motion.span>
                    <h3 className="mt-6 text-3xl">Your note is on its way</h3>
                    <p className="mt-2 text-ink-muted">Thanks for writing. I'll reply to you by email.</p>
                    <button type="button" onClick={() => setStatus('idle')} className="btn-ghost mt-8">
                      <HiArrowPath /> Write another
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Reveal>

        {/* Side info */}
        <div className="flex flex-col gap-5">
          <Reveal delay={0.1}>
            <div className="card overflow-hidden">
              <div className="bg-night px-6 py-5 text-white">
                <p className="text-xs uppercase tracking-[0.14em] text-white/50">My local time</p>
                <p className="mt-1 font-display text-3xl font-semibold">{time}</p>
                <p className="text-sm text-white/60">Bangalore, India (IST)</p>
              </div>
              <div className="p-6">
                <p className="text-xs uppercase tracking-[0.14em] text-ink-muted">Prefer email?</p>
                <a href={`mailto:${profile.email}`} className="link-underline mt-1 inline-block break-all font-semibold text-ink">
                  {profile.email}
                </a>
                <button type="button" onClick={copyEmail} className="mt-3 flex items-center gap-1.5 text-sm text-ink-muted hover:text-ink">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span key={copied ? 'y' : 'n'} initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                      {copied ? <HiCheck className="text-accent" /> : <HiOutlineClipboardDocument />}
                    </motion.span>
                  </AnimatePresence>
                  {copied ? 'Copied' : 'Copy address'}
                </button>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="card p-6">
              <p className="text-xs uppercase tracking-[0.14em] text-ink-muted">Find me elsewhere</p>
              <ul className="mt-4 space-y-2">
                {socials.map((s, i) => (
                  <motion.li
                    key={s.name}
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.25 + i * 0.07 }}
                  >
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-center gap-3 rounded-2xl border border-line bg-paper/60 px-4 py-3 text-ink-soft transition hover:border-brand/50 hover:bg-surface hover:text-ink"
                    >
                      <span className="grid h-9 w-9 place-items-center rounded-xl bg-surface text-ink transition group-hover:scale-110 group-hover:text-accent">
                        <SocialIcon icon={s.icon} />
                      </span>
                      <span className="font-semibold">{s.name}</span>
                      <HiArrowUpRight className="ml-auto h-4 w-4 opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100" />
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </Page>
  );
};

export default Contact;
