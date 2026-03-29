import { useState, useEffect } from 'react';

function getDefaultTheme() {
  // 1. Check localStorage first
  const stored = localStorage.getItem('finch-theme');
  if (stored) return stored;
  // 2. System preference
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) return 'light';
  // 3. Time of day: 6am-7pm = light
  const hour = new Date().getHours();
  if (hour >= 6 && hour < 19) return 'light';
  return 'dark';
}

export function useTheme() {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const t = getDefaultTheme();
    setTheme(t);
    document.documentElement.setAttribute('data-theme', t);
  }, []);

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    localStorage.setItem('finch-theme', next);
    document.documentElement.setAttribute('data-theme', next);
  };

  return { theme, toggle };
}