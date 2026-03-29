import { useEffect, useState } from 'react';
import iconDark from '@/assets/Icon-Dark.png';
import iconLight from '@/assets/Icon-Light.png';

function getTheme() {
  if (typeof document === 'undefined') return 'dark';
  const attrTheme = document.documentElement.getAttribute('data-theme');
  if (attrTheme === 'light' || attrTheme === 'dark') return attrTheme;
  const stored = localStorage.getItem('finch-theme');
  if (stored === 'light' || stored === 'dark') return stored;
  return 'dark';
}

export default function FinchFloatingIcon({ style = {}, imageStyle = {} }) {
  const [theme, setTheme] = useState(() => getTheme());

  useEffect(() => {
    if (typeof document === 'undefined') return undefined;

    const refreshTheme = () => setTheme(getTheme());
    const observer = new MutationObserver(refreshTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });
    window.addEventListener('storage', refreshTheme);

    return () => {
      observer.disconnect();
      window.removeEventListener('storage', refreshTheme);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        left: '30vw',
        bottom: '130px',
        transform: 'translateX(-50%)',
        zIndex: 1,
        pointerEvents: 'none',
        opacity: 0.32,
        ...style,
      }}
    >
      <img
        src={theme === 'light' ? iconDark : iconLight}
        alt=""
        style={{
          display: 'block',
          height: '40vh',
          width: 'auto',
          ...imageStyle,
        }}
      />
    </div>
  );
}
