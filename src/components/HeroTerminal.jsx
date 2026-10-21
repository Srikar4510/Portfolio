import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { profile, socials, projects, education } from '../data/profile';
import { toggleTheme, isDark } from '../theme';

// A small "ask me anything" shell: visitors type (or tap) commands and get friendly answers about me.

const linkedin = socials.find((s) => s.icon === 'linkedin').href;
const suggestions = ['whoami', 'projects', 'hobbies', 'f1', 'contact', 'help'];

// Each command returns lines. A line is a string or { text, to } (internal route) or { text, href } (external).
const commands = {
  help: () => [
    'Things you can ask me:',
    '  whoami     who I am',
    '  now        what I am up to',
    '  projects   things I have built',
    '  education  where I studied',
    '  hobbies    life outside work',
    '  cricket    bowl a few in the nets',
    '  f1         test your reaction time',
    '  travel     how I travel',
    '  contact    say hello',
    '  resume     open my resume',
    '  theme      switch light / dark',
    '  clear      clean the screen',
  ],
  whoami: () => [
    `${profile.name}`,
    `Software Engineer at ${profile.company}, living in Bangalore.`,
    `Originally from ${profile.hometown}.`,
  ],
  now: () => [
    'Working on   developer platforms and CI/CD at Meesho',
    'Shipped      Vihari, a bus and tour booking platform',
    'Weekends     cricket, F1 and last-minute trips',
  ],
  projects: () => [
    ...projects.filter((p) => p.featured).map((p) => `• ${p.title.padEnd(9)} ${p.subtitle}`),
    { text: '→ see all projects', to: '/projects' },
  ],
  education: () => [`${education.degree}`, `${education.school}, ${education.period}`],
  hobbies: () => [
    '• Cricket   watching and playing',
    '• F1        watching race weekends',
    '• Travel    hills, tea gardens, road trips',
    { text: '→ off the clock', to: '/hobbies' },
  ],
  cricket: () => ['Fancy a net session?', { text: '→ bowl a delivery', to: '/hobbies#cricket' }],
  f1: () => ['Lights out and away we go.', { text: '→ test your reaction time', to: '/hobbies#f1' }],
  travel: () => ['I rarely plan ahead: most trips are decided at the last minute', 'and figured out along the way.'],
  contact: () => [
    { text: profile.email, href: `mailto:${profile.email}` },
    { text: 'LinkedIn', href: linkedin },
    { text: '→ or write to me here', to: '/contact' },
  ],
  resume: () => [{ text: '→ open resume (PDF)', href: profile.resume }],
  theme: () => {
    toggleTheme();
    return [`Switched to ${isDark() ? 'dark' : 'light'} mode.`];
  },
  sudo: () => ['Nice try.'],
  hello: () => ['Hey! Type `help` to see what you can ask.'],
  hi: () => ['Hey! Type `help` to see what you can ask.'],
};

const Prompt = () => (
  <span className="select-none">
    <span className="font-semibold text-white">guest</span>
    <span className="text-white/40">@</span>
    <span className="text-[#f2c48d]">srikar</span>
    <span className="text-white/40">:~$ </span>
  </span>
);

const Line = ({ line, onRoute }) => {
  if (typeof line === 'string') return <p className="whitespace-pre-wrap text-white/80">{line}</p>;
  if (line.to) {
    return (
      <button type="button" onClick={() => onRoute(line.to)} className="text-left text-white underline decoration-white/30 underline-offset-4 hover:decoration-white">
        {line.text}
      </button>
    );
  }
  return (
    <a href={line.href} target="_blank" rel="noreferrer" className="block text-white underline decoration-white/30 underline-offset-4 hover:decoration-white">
      {line.text}
    </a>
  );
};

const HeroTerminal = () => {
  const [entries, setEntries] = useState([]); // { cmd, lines }
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(true);
  const history = useRef([]);
  const histIndex = useRef(-1);
  const inputRef = useRef(null);
  const screenRef = useRef(null);
  const navigate = useNavigate();

  const run = useCallback((raw) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;
    history.current = [cmd, ...history.current].slice(0, 30);
    histIndex.current = -1;
    if (cmd === 'clear') {
      setEntries([]);
      return;
    }
    const handler = commands[cmd] || commands[cmd.split(/\s+/)[0]];
    const lines = handler ? handler() : [`command not found: ${cmd}`, 'Type `help` to see what you can ask.'];
    setEntries((e) => [...e.slice(-12), { cmd, lines }]);
  }, []);

  const onRoute = (to) => navigate(to);

  // Type `whoami` once on load so the terminal explains itself.
  useEffect(() => {
    const word = 'whoami';
    let i = 0;
    let timer = setTimeout(function tick() {
      i += 1;
      setInput(word.slice(0, i));
      if (i < word.length) timer = setTimeout(tick, 110);
      else {
        timer = setTimeout(() => {
          run(word);
          setInput('');
          setTyping(false);
        }, 350);
      }
    }, 900);
    return () => clearTimeout(timer);
  }, [run]);

  // Keep the newest output in view without scrolling the page.
  useEffect(() => {
    const el = screenRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [entries]);

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      run(input);
      setInput('');
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault();
      const next = histIndex.current + (e.key === 'ArrowUp' ? 1 : -1);
      if (next < -1 || next >= history.current.length) return;
      histIndex.current = next;
      setInput(next === -1 ? '' : history.current[next]);
    } else if (e.key === 'Tab') {
      const match = Object.keys(commands).find((c) => input && c.startsWith(input.toLowerCase()));
      if (match) {
        e.preventDefault();
        setInput(match);
      }
    }
  };

  return (
    <div className="overflow-hidden rounded-3xl bg-night shadow-lift ring-1 ring-black/5 dark:ring-white/10">
      <div className="flex items-center gap-2 border-b border-white/10 px-5 py-3.5">
        <span className="h-3 w-3 rounded-full bg-[#ff6b6b]" />
        <span className="h-3 w-3 rounded-full bg-[#ffd166]" />
        <span className="h-3 w-3 rounded-full bg-[#4ade80]" />
        <span className="ml-3 font-mono text-xs text-white/40">ask-srikar — zsh</span>
      </div>

      <div
        ref={screenRef}
        className="term-scroll h-[300px] cursor-text space-y-3 overflow-y-auto px-5 py-4 font-mono text-[12.5px] leading-relaxed sm:h-[320px] sm:text-[13px]"
        onClick={() => inputRef.current?.focus({ preventScroll: true })}
        role="log"
        aria-live="polite"
      >
        <p className="text-white/45">Type a command, or tap one below. Try `help`.</p>
        {entries.map((entry, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
            <p className="text-white">
              <Prompt />
              {entry.cmd}
            </p>
            <div className="mt-1 space-y-0.5">
              {entry.lines.map((line, j) => (
                <Line key={j} line={line} onRoute={onRoute} />
              ))}
            </div>
          </motion.div>
        ))}
        <label className="flex items-center text-white">
          <Prompt />
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            readOnly={typing}
            className="min-w-0 flex-1 bg-transparent text-white caret-white outline-none"
            aria-label="Terminal command"
            autoComplete="off"
            autoCapitalize="off"
            spellCheck="false"
          />
        </label>
      </div>

      <div className="flex flex-wrap gap-2 border-t border-white/10 px-5 py-3.5">
        {suggestions.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => run(s)}
            className="rounded-full border border-white/15 px-3 py-1 font-mono text-xs text-white/70 transition hover:border-white/60 hover:text-white"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
};

export default HeroTerminal;
