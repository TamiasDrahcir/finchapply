import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { Link } from 'react-router-dom';
import logoLight from '@/assets/Logo-Light.png';
import logoDark from '@/assets/Logo-Dark.png';
import { ACCOUNT_EVENT, getStoredAccount, isLoggedIn, logoutLocalAccount } from '@/lib/local-account';

function getInitialTheme() {
  const stored = localStorage.getItem('finch-theme');
  if (stored) return stored;
  if (window.matchMedia?.('(prefers-color-scheme: dark)').matches) return 'dark';
  const h = new Date().getHours();
  return (h >= 6 && h < 19) ? 'light' : 'dark';
}

export default function Navbar({ onGetAccess, onSignIn }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [logosPreloaded, setLogosPreloaded] = useState(false);
  const [account, setAccount] = useState(() => getStoredAccount());
  const [isAuthenticated, setIsAuthenticated] = useState(() => isLoggedIn());
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'dark';
    return getInitialTheme();
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, []);

  useEffect(() => {
    const refreshSignupState = () => {
      setAccount(getStoredAccount());
      setIsAuthenticated(isLoggedIn());
    };

    window.addEventListener('storage', refreshSignupState);
    window.addEventListener(ACCOUNT_EVENT, refreshSignupState);

    return () => {
      window.removeEventListener('storage', refreshSignupState);
      window.removeEventListener(ACCOUNT_EVENT, refreshSignupState);
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    const preload = (src) => new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = src;
    });

    Promise.all([preload(logoLight), preload(logoDark)]).then(() => {
      if (!cancelled) setLogosPreloaded(true);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    localStorage.setItem('finch-theme', next);
    document.documentElement.setAttribute('data-theme', next);
  };

  const handleLogout = () => {
    logoutLocalAccount();
    setMobileOpen(false);
    if (window.location.pathname !== '/') {
      window.location.href = '/';
    }
  };

  const logoTransition = logosPreloaded ? 'opacity 0.18s ease' : 'none';
  const logoWrapStyle = {
    position: 'relative',
    width: 'clamp(74px, 7.5vw, 90px)',
    height: 'clamp(62px, 6.8vw, 80px)',
    display: 'block',
  };
  const darkLogoStyle = {
    position: 'absolute',
    left: 0,
    top: '50%',
    transform: 'translateY(-50%)',
    height: 'clamp(22px, 2.4vw, 28px)',
    width: 'auto',
    opacity: theme === 'dark' ? 1 : 0,
    transition: logoTransition,
    pointerEvents: 'none',
  };
  const lightLogoStyle = {
    position: 'absolute',
    left: 0,
    top: '50%',
    transform: 'translateY(-50%)',
    height: 'clamp(62px, 6.8vw, 80px)',
    width: 'auto',
    opacity: theme === 'light' ? 1 : 0,
    transition: logoTransition,
    pointerEvents: 'none',
  };

  const links = [
    { label: 'How It Works', href: '/how-it-works', internal: true },
    { label: 'Features', href: '/features', internal: true },
    { label: 'Pricing', href: '/pricing', internal: true },
    { label: 'Contact', href: '/contact', internal: true },
    { label: 'Analytics', href: '/analytics', internal: true },
    { label: 'About', href: '/about', internal: true },
  ];

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: 'var(--surface-1)',
        backdropFilter: 'none',
        borderBottom: '1px solid var(--border)',
        transition: 'all 0.3s ease',
        padding: '0 clamp(12px, 2vw, 24px)',
        height: '96px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        {/* Logo */}
        <Link to="/" style={{ textDecoration: 'none' }}>
          <span style={logoWrapStyle}>
            <img src={logoDark} alt="Finch" style={darkLogoStyle} />
            <img src={logoLight} alt="Finch" style={lightLogoStyle} />
          </span>
        </Link>

        {/* Center links - desktop */}
        <div className="hidden md:flex" style={{ gap: 'clamp(10px, 1.7vw, 28px)', alignItems: 'center', flexShrink: 1 }}>
          {links.map(l => (
            <Link key={l.label} to={l.href}
              style={{ fontFamily: 'Nunito Sans, sans-serif', color: 'var(--text-secondary)', fontSize: 'clamp(11px, 0.95vw, 15px)', textDecoration: 'none', fontWeight: 600, position: 'relative', padding: '4px 0', transition: 'color 0.25s ease', whiteSpace: 'nowrap' }}
              onMouseEnter={e => {
                e.currentTarget.style.color = 'var(--text-primary)';
                const line = e.currentTarget.querySelector('.nav-line');
                if (line) { line.style.width = '100%'; line.style.opacity = '1'; }
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = 'var(--text-secondary)';
                const line = e.currentTarget.querySelector('.nav-line');
                if (line) { line.style.width = '0%'; line.style.opacity = '0'; }
              }}
            >
              {l.label}
              <span className="nav-line" style={{ position: 'absolute', bottom: 0, left: 0, width: '0%', height: '1.5px', background: 'linear-gradient(90deg, #D43C33, #E09643)', borderRadius: '999px', opacity: 0, transition: 'width 0.3s ease, opacity 0.3s ease' }} />
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div className="hidden md:flex" style={{ gap: 'clamp(8px, 1.1vw, 16px)', alignItems: 'center', flexShrink: 0 }}>
          {isAuthenticated ? (
            <Link to="/profile" style={{ fontFamily: 'Nunito Sans, sans-serif', color: 'var(--text-secondary)', fontSize: 'clamp(11px, 0.95vw, 15px)', fontWeight: 600, textDecoration: 'none', whiteSpace: 'nowrap' }}>
              {account?.username || 'Account'}
            </Link>
          ) : (
            <button onClick={onSignIn || onGetAccess} style={{ fontFamily: 'Nunito Sans, sans-serif', color: 'var(--text-secondary)', fontSize: 'clamp(11px, 0.95vw, 15px)', background: 'none', border: 'none', padding: 0, textDecoration: 'none', fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' }}>
              Sign In
            </button>
          )}
          {/* INSERT CHROME EXTENSION URL HERE — update href */}
          <a href="#chrome-extension" target="_blank" rel="noopener noreferrer" style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            height: 'clamp(34px, 3vw, 40px)', padding: '0 clamp(10px, 1.1vw, 16px)', borderRadius: '10px',
            border: '1.5px solid var(--border)', background: 'none',
            fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: 'clamp(11px, 0.85vw, 13px)',
            color: 'var(--text-primary)', textDecoration: 'none',
            transition: 'all 0.2s', whiteSpace: 'nowrap',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#D43C33'; e.currentTarget.style.color = '#D43C33'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
          >🔌 Extension</a>
          <button onClick={isAuthenticated ? handleLogout : onGetAccess} style={{
            height: 'clamp(34px, 3vw, 40px)', padding: '0 clamp(12px, 1.3vw, 20px)', borderRadius: '10px',
            border: 'none', cursor: 'pointer',
            fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: 'clamp(11px, 0.92vw, 14px)',
            background: 'linear-gradient(135deg, #D43C33, #E09643)',
            color: '#fff',
            boxShadow: '0 2px 12px rgba(212,60,51,0.3)',
            transition: 'transform 0.15s, box-shadow 0.15s', whiteSpace: 'nowrap',
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.03)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(212,60,51,0.45)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(212,60,51,0.3)'; }}
          >
            {isAuthenticated ? 'Logout' : 'Sign Up Free'}
          </button>
        </div>

        {/* Hamburger */}
        <div className="md:hidden" style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <button onClick={toggleTheme} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)', padding: '6px' }}>
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button onClick={() => setMobileOpen(true)} style={{ background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', padding: '8px' }}>
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 200,
          background: 'var(--surface-1)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          gap: '32px',
        }}>
          <button onClick={() => setMobileOpen(false)} style={{ position: 'absolute', top: '20px', right: '24px', background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer' }}>
            <X size={28} />
          </button>
          <Link to="/" onClick={() => setMobileOpen(false)} style={{ textDecoration: 'none', marginBottom: '8px' }}>
            <span style={logoWrapStyle}>
              <img src={logoDark} alt="Finch" style={darkLogoStyle} />
              <img src={logoLight} alt="Finch" style={lightLogoStyle} />
            </span>
          </Link>
          {links.map(l => (
            l.internal ? (
              <Link key={l.label} to={l.href} onClick={() => setMobileOpen(false)}
                style={{ fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: '24px', color: 'var(--text-primary)', textDecoration: 'none' }}
              >{l.label}</Link>
            ) : (
              <a key={l.label} href={l.href} onClick={() => setMobileOpen(false)}
                style={{ fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: '24px', color: 'var(--text-primary)', textDecoration: 'none' }}
              >{l.label}</a>
            )
          ))}
          {isAuthenticated && (
            <Link to="/profile" onClick={() => setMobileOpen(false)} style={{ fontFamily: 'Nunito Sans, sans-serif', color: 'var(--text-secondary)', fontSize: '16px', fontWeight: 600, textDecoration: 'none' }}>
              {account?.username || 'Account'}
            </Link>
          )}
          <button onClick={() => { if (isAuthenticated) { handleLogout(); } else { setMobileOpen(false); onGetAccess(); } }} className="btn-primary" style={{ height: '52px', padding: '0 32px', fontSize: '16px', marginTop: '12px', borderRadius: '12px' }}>
            {isAuthenticated ? 'Logout' : 'Sign Up Free →'}
          </button>
        </div>
      )}
    </>
  );
}