import { useEffect, useState, useRef } from 'react';

function ProductCard() {
  const [progress, setProgress] = useState(0);
  const [checks, setChecks] = useState([false, false, false]);
  const [showBadge, setShowBadge] = useState(false);
  const rafRef = useRef(null);
  const startRef = useRef(null);

  useEffect(() => {
    const FILL_DURATION = 2400;
    const PAUSE_DURATION = 1200;
    let pauseTimer = null;

    const animate = (ts) => {
      if (!startRef.current) startRef.current = ts;
      const elapsed = ts - startRef.current;
      // Ease out: fast until 90%, then slow to 99%
      let p;
      if (elapsed < FILL_DURATION * 0.85) {
        p = (elapsed / (FILL_DURATION * 0.85)) * 90;
      } else {
        const remaining = elapsed - FILL_DURATION * 0.85;
        p = 90 + Math.min((remaining / (FILL_DURATION * 0.7)) * 9, 9);
      }
      p = Math.min(p, 99);
      setProgress(p);

      if (p < 99) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        // Pause at 99%, then restart
        pauseTimer = setTimeout(() => {
          startRef.current = null;
          setProgress(0);
          rafRef.current = requestAnimationFrame(animate);
        }, PAUSE_DURATION);
      }
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(rafRef.current);
      if (pauseTimer) clearTimeout(pauseTimer);
    };
  }, []);

  useEffect(() => {
    const timers = [
      setTimeout(() => setChecks(c => [true, c[1], c[2]]), 600),
      setTimeout(() => setChecks(c => [c[0], true, c[2]]), 1200),
      setTimeout(() => setChecks(c => [c[0], c[1], true]), 1800),
      setTimeout(() => setShowBadge(true), 2400),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const checkItems = ['Resume keywords matched', 'Cover letter generated', 'Autofill ready'];

  return (
    <div style={{
      background: '#1A2A3A',
      borderRadius: '20px',
      padding: '28px',
      boxShadow: '0 0 60px rgba(212,60,51,0.25), 0 20px 60px rgba(0,0,0,0.4)',
      animation: 'float 4s ease-in-out infinite',
      maxWidth: '380px',
      width: '100%',
    }}>
      {/* Resume header */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '11px', color: '#7A8FA0', letterSpacing: '1px', marginBottom: '4px' }}>APPLICANT</div>
        <div style={{ fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: '18px', color: '#F2F2F2' }}>Alex Chen</div>
        <div style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '13px', color: '#D4D4D4' }}>Computer Science · UC Berkeley</div>
      </div>

      <div style={{ height: '1px', background: 'rgba(212,212,212,0.10)', marginBottom: '20px' }} />

      {/* Progress */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '12px', color: '#7A8FA0', marginBottom: '10px' }}>
          Finch is tailoring your application...
        </div>
        <div style={{ height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '999px', overflow: 'hidden' }}
          aria-live="polite" aria-label={`Progress: ${Math.round(progress)}%`}>
          <div style={{
            height: '100%',
            width: `${progress}%`,
            background: 'linear-gradient(90deg, #D43C33, #E09643)',
            borderRadius: '999px',
            transition: 'width 0.05s linear',
          }} />
        </div>
      </div>

      {/* Checklist */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
        {checkItems.map((item, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: '10px',
            opacity: checks[i] ? 1 : 0,
            transform: checks[i] ? 'translateY(0)' : 'translateY(8px)',
            transition: 'opacity 0.4s, transform 0.4s',
          }}>
            <span style={{ color: '#3DB87A', fontSize: '16px' }}>✓</span>
            <span style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '14px', color: '#F2F2F2' }}>{item}</span>
          </div>
        ))}
      </div>

      {/* Timer */}
      <div style={{ textAlign: 'center', marginBottom: '16px' }}>
        <div style={{
          fontFamily: 'JetBrains Mono, monospace', fontSize: '48px', fontWeight: 700,
          background: 'linear-gradient(135deg, #D43C33, #E09643)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
        }}>0:52</div>
        <div style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '13px', color: '#7A8FA0' }}>seconds to complete</div>
      </div>

      {/* Success badge */}
      <div style={{
        display: 'flex', justifyContent: 'center',
        opacity: showBadge ? 1 : 0,
        transform: showBadge ? 'translateY(0)' : 'translateY(8px)',
        transition: 'opacity 0.5s, transform 0.5s',
      }}>
        <div style={{
          background: 'rgba(61,184,122,0.15)',
          border: '1px solid rgba(61,184,122,0.4)',
          borderRadius: '999px',
          padding: '8px 18px',
          fontFamily: 'Nunito Sans, sans-serif',
          fontSize: '13px',
          color: '#3DB87A',
          fontWeight: 600,
        }}>✓ Application Optimized</div>
      </div>
    </div>
  );
}

export default function HeroSection({ onGetAccess }) {
  return (
    <section style={{ paddingTop: '120px', paddingBottom: '80px', padding: '120px 24px 80px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '60px', flexWrap: 'wrap' }}>
        {/* Left col */}
        <div style={{ flex: '1 1 420px', minWidth: '280px' }}>
          <div style={{
            fontFamily: 'Nunito Sans, sans-serif', fontSize: '12px', color: '#D43C33',
            letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 600, marginBottom: '20px'
          }}>AI-POWERED INTERNSHIP APPLICATIONS</div>

          <h1 style={{
            fontFamily: 'Sora, sans-serif', fontWeight: 700,
            fontSize: 'clamp(36px, 6vw, 68px)', lineHeight: 1.1,
            color: '#F2F2F2', margin: '0 0 16px',
          }}>
            Stop mass applying.<br />
            Start{' '}
            <span style={{
              background: 'linear-gradient(90deg, #D43C33, #E09643)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>getting interviews.</span>
          </h1>

          <div style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '13px', color: '#7A8FA0', marginBottom: '20px' }}>
            ✦ Trusted by students at MIT, Stanford, Georgia Tech & 40+ universities
          </div>

          <p style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '19px', color: '#D4D4D4', lineHeight: 1.6, marginBottom: '32px' }}>
            Finch uses AI to tailor every application in{' '}
            <span style={{ fontFamily: 'JetBrains Mono, monospace', color: '#F2F2F2', fontWeight: 600 }}>under 60 seconds</span>
            {' '}— so you apply smarter, not more.
          </p>

          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '16px' }}>
            <button onClick={onGetAccess} className="btn-primary" style={{ height: '52px', padding: '0 28px', fontSize: '15px' }}>
              Get Early Access →
            </button>
            <button className="btn-secondary" style={{ height: '52px', padding: '0 28px', fontSize: '15px' }}>
              See how it works ↓
            </button>
          </div>

          <div style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '13px', color: '#7A8FA0' }}>
            Free to start · No credit card required · Chrome extension
          </div>
        </div>

        {/* Right col */}
        <div style={{ flex: '1 1 340px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
          <ProductCard />

          {/* Stat chips */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {[
              { icon: '📈', stat: '3.2×', label: 'more interview callbacks' },
              { icon: '⏱', stat: '94%', label: 'less time per application' },
            ].map((chip, i) => (
              <div key={i} style={{
                background: 'rgba(26,42,58,0.8)',
                border: '1px solid rgba(212,60,51,0.3)',
                borderRadius: '999px',
                padding: '10px 18px',
                fontFamily: 'Nunito Sans, sans-serif',
                fontSize: '13px',
                color: '#D4D4D4',
                display: 'flex', alignItems: 'center', gap: '8px',
              }}>
                <span>{chip.icon}</span>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', color: '#E09643', fontWeight: 700 }}>{chip.stat}</span>
                <span>{chip.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}