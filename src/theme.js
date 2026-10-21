import { useEffect, useState } from 'react';

// Light/dark theme lives on <html class="dark">. The starting theme is applied by a small script in
// public/index.html before React loads (night by default), so there is no flash.
const KEY = 'theme-v2';

export const isDark = () => document.documentElement.classList.contains('dark');

export const setTheme = (dark, remember = true) => {
  document.documentElement.classList.toggle('dark', dark);
  if (!remember) return;
  try {
    window.localStorage.setItem(KEY, dark ? 'dark' : 'light');
  } catch {
    /* storage blocked: the choice lasts for this visit */
  }
};

export const toggleTheme = () => setTheme(!isDark());

// Re-renders whenever the theme changes, wherever the change came from.
export const useIsDark = () => {
  const [dark, setDark] = useState(isDark);
  useEffect(() => {
    const observer = new MutationObserver(() => setDark(isDark()));
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    return () => observer.disconnect();
  }, []);
  return dark;
};
