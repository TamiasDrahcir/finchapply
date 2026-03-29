import { useState, useEffect, useRef } from 'react';

const TIME_OPTIONS = [10, 20, 30, 45, 60];
const FINCH_TIME = 1; // ~1 min per app
const APPS_PER_CYCLE = 20;

function AnimatedNumber({ value }) {
  const [display, setDisplay] = useState(0);
  const prevRef = useRef(0);
  useEffect(() => {
    const start = prevRef.current;
    const end = value;
    const duration = 500;
    const startTime = performance.now();
    const animate = (now) => {
      const prog = Math.min((now - startTime) / duration, 1);
      const cur = start + (end - start) * prog;
      setDisplay(Math.round(cur * 10) / 10);
      if (prog < 1) requestAnimationFrame(animate);
      else prevRef.current = end;
    };
    requestAnimationFrame(animate);
  }, [value]);
  return <>{display}</>;
}

export default function TimeSavedCalculator() {
  const [selected, setSelected] = useState(20);

  const manualHours = (selected * APPS_PER_CYCLE) / 60;
  const finchHours = (FINCH_TIME * APPS_PER_CYCLE) / 60;
  const savedHours = manualHours - finchHours;
  const pctSaved = Math.round(((manualHours - finchHours) / manualHours) * 100);

  return (
    <section style={{ padding: '100px 24px', background: 'var(--surface-1)' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        <div className="eyebrow">TIME SAVINGS</div>
        <h2 style={{ fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: 'clamp(28px, 4vw, 44px)', color: 'var(--text-primary)', lineHeight: 1.2, marginBottom: '16px' }}>
          How much time would you save?
        </h2>
        <p style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '17px', color: 'var(--text-secondary)', marginBottom: '44px' }}>
          Select your average time per manual application
        </p>

        {/* Time option pills */}
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '44px' }}>
          {TIME_OPTIONS.map(t => (
            <button key={t} onClick={() => setSelected(t)} style={{
              padding: '12px 24px', borderRadius: '999px', border: 'none', cursor: 'pointer',
              background: selected === t ? '#D43C33' : 'rgba(255,255,255,0.06)',
              color: selected === t ? '#fff' : 'var(--text-secondary)',
              fontFamily: 'JetBrains Mono, monospace', fontSize: '15px', fontWeight: 700,
              transition: 'all 0.2s',
              transform: selected === t ? 'scale(1.05)' : 'scale(1)',
            }}>
              {t} min
            </button>
          ))}
        </div>

        {/* Comparison cards */}
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginBottom: '32px' }}>
          {/* Manual */}
          <div style={{
            flex: '1 1 220px',
            background: 'rgba(212,60,51,0.08)',
            border: '1px solid rgba(212,60,51,0.25)',
            borderRadius: '20px', padding: '28px', textAlign: 'center',
          }}>
            <div style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '12px', color: '#D43C33', letterSpacing: '1.5px', marginBottom: '12px' }}>WITHOUT FINCH</div>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '48px', fontWeight: 700, color: '#D43C33', lineHeight: 1 }}>
              <AnimatedNumber value={manualHours} />h
            </div>
            <div style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '14px', color: 'var(--text-secondary)', marginTop: '8px' }}>
              for {APPS_PER_CYCLE} applications
            </div>
            <div style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '13px', color: 'var(--text-secondary)', marginTop: '12px', padding: '8px 12px', background: 'rgba(212,60,51,0.08)', borderRadius: '8px' }}>
              {selected} min × {APPS_PER_CYCLE} apps
            </div>
          </div>

          {/* Finch */}
          <div style={{
            flex: '1 1 220px',
            background: 'rgba(61,184,122,0.08)',
            border: '1px solid rgba(61,184,122,0.25)',
            borderRadius: '20px', padding: '28px', textAlign: 'center',
          }}>
            <div style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '12px', color: '#3DB87A', letterSpacing: '1.5px', marginBottom: '12px' }}>WITH FINCH</div>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '48px', fontWeight: 700, color: '#3DB87A', lineHeight: 1 }}>
              <AnimatedNumber value={finchHours} />h
            </div>
            <div style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '14px', color: 'var(--text-secondary)', marginTop: '8px' }}>
              for {APPS_PER_CYCLE} applications
            </div>
            <div style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '13px', color: 'var(--text-secondary)', marginTop: '12px', padding: '8px 12px', background: 'rgba(61,184,122,0.08)', borderRadius: '8px' }}>
              ~60s × {APPS_PER_CYCLE} apps
            </div>
          </div>
        </div>

        {/* Result */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(212,60,51,0.15), rgba(224,150,67,0.15))',
          border: '1px solid rgba(224,150,67,0.3)',
          borderRadius: '20px', padding: '28px',
          textAlign: 'center',
        }}>
          <div style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '8px' }}>YOU SAVE</div>
          <div style={{
            fontFamily: 'JetBrains Mono, monospace', fontSize: '52px', fontWeight: 700,
            background: 'linear-gradient(90deg, #D43C33, #E09643)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            lineHeight: 1,
          }}>
            ~<AnimatedNumber value={savedHours} />h
          </div>
          <div style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '16px', color: 'var(--text-primary)', marginTop: '10px' }}>
            per application cycle — that's{' '}
            <span style={{ fontFamily: 'JetBrains Mono, monospace', color: '#E09643', fontWeight: 700 }}>{pctSaved}%</span>{' '}
            of your time back
          </div>
        </div>

        <div style={{ marginTop: '32px' }}>
          <button className="btn-primary" onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
            style={{ height: '52px', padding: '0 32px', fontSize: '15px' }}>
            Start saving time →
          </button>
        </div>
      </div>
    </section>
  );
}