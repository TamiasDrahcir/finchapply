import { useEffect, useRef, useState } from 'react';

function useInView() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function CountUp({ target, suffix = '', duration = 800 }) {
  const [val, setVal] = useState('0');
  const startRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const isDecimal = target.includes('.');
    const numericTarget = parseFloat(target.replace(/[^0-9.]/g, ''));
    const animate = (ts) => {
      if (!startRef.current) startRef.current = ts;
      const prog = Math.min((ts - startRef.current) / duration, 1);
      const cur = numericTarget * prog;
      if (isDecimal) setVal(cur.toFixed(1));
      else setVal(Math.round(cur).toString());
      if (prog < 1) rafRef.current = requestAnimationFrame(animate);
      else setVal(numericTarget % 1 === 0 ? numericTarget.toString() : numericTarget.toFixed(1));
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration]);

  return <>{val}{suffix}</>;
}

const stats = [
  { num: '94', suffix: '%', label: 'Less time per application', sub: '20-30 min → under 60 seconds' },
  { num: '3.2', suffix: '×', label: 'More interview callbacks', sub: 'vs. unoptimized applications' },
  { num: '40', suffix: '+', label: 'Hours saved per semester', sub: 'Based on 100 applications submitted' },
];

const testimonials = [
  { quote: 'I went from 0 interviews in 3 months to 4 in 2 weeks. The resume tailoring alone is worth it.', initials: 'PM', name: 'Priya M.', school: 'University of Michigan, CS Junior' },
  { quote: 'I applied to 80 internships last semester. 1 interview. With Finch, I applied to 20 and got 5 callbacks.', initials: 'JT', name: 'James T.', school: 'Georgia Tech, ECE' },
  { quote: "It reads the job description better than I do. My cover letters actually sound like I wrote them.", initials: 'SK', name: 'Sara K.', school: 'UCLA, Data Science' },
];

export default function NumbersSection() {
  const [statsRef, statsInView] = useInView();
  const [barsRef, barsInView] = useInView();

  return (
    <section style={{ padding: '100px 24px', background: 'var(--bg)' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>
        <div className="eyebrow">THE NUMBERS</div>
        <h2 style={{ fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: 'clamp(28px, 4vw, 48px)', color: '#F2F2F2', lineHeight: 1.2, marginBottom: '60px' }}>
          Less time. More interviews.<br />The math is simple.
        </h2>

        {/* Stat blocks */}
        <div ref={statsRef} style={{ display: 'flex', gap: '40px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '60px' }}>
          {stats.map((s, i) => (
            <div key={i} style={{ flex: '1 1 200px', textAlign: 'center' }}>
              <div style={{
                fontFamily: 'JetBrains Mono, monospace', fontSize: 'clamp(48px, 7vw, 72px)', fontWeight: 700,
                background: 'linear-gradient(135deg, #D43C33, #E09643)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                lineHeight: 1,
              }}>
                {statsInView ? <CountUp target={s.num} suffix={s.suffix} /> : `0${s.suffix}`}
              </div>
              <div style={{ fontFamily: 'Sora, sans-serif', fontSize: '18px', color: '#F2F2F2', fontWeight: 700, margin: '12px 0 6px' }}>{s.label}</div>
              <div style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '14px', color: '#7A8FA0' }}>{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Bar chart */}
        <div ref={barsRef} style={{ background: '#1A2A3A', borderRadius: '20px', padding: '36px', marginBottom: '60px', textAlign: 'left' }}>
          {[
            { label: 'Without Finch', width: '100%', color: '#7A8FA0', endLabel: '46 hrs', glow: false },
            { label: 'With Finch  ⚡', width: '3.3%', color: 'linear-gradient(90deg, #D43C33, #E09643)', endLabel: '1.5 hrs', glow: true },
          ].map((bar, i) => (
            <div key={i} style={{ marginBottom: i === 0 ? '20px' : 0 }}>
              <div style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '14px', color: '#D4D4D4', marginBottom: '8px', fontWeight: 600 }}>{bar.label}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ flex: 1, height: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '999px', overflow: 'hidden' }}>
                  <div style={{
                    height: '100%',
                    width: barsInView ? bar.width : '0%',
                    background: bar.color,
                    borderRadius: '999px',
                    transition: 'width 1.2s ease-out',
                    boxShadow: bar.glow ? '0 0 12px rgba(212,60,51,0.5)' : 'none',
                  }} />
                </div>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '13px', color: '#D4D4D4', minWidth: '45px' }}>{bar.endLabel}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Chrome extension mid-page CTA */}
        <div style={{
          margin: '0 0 48px',
          background: 'linear-gradient(135deg, rgba(212,60,51,0.1), rgba(224,150,67,0.08))',
          border: '1px solid rgba(212,60,51,0.2)',
          borderRadius: '16px', padding: '24px 28px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px',
        }}>
          <div>
            <div style={{ fontFamily: 'Sora, sans-serif', fontSize: '17px', color: 'var(--text-primary)', fontWeight: 700, marginBottom: '4px' }}>🔌 Finch Chrome Extension</div>
            <div style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '14px', color: 'var(--text-secondary)' }}>Autofill any internship form in one click. Works on Greenhouse, Lever, Workday.</div>
          </div>
          <a href="#chrome-extension" /* INSERT CHROME EXTENSION URL HERE */ target="_blank" rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '11px 22px', borderRadius: '10px',
              background: 'linear-gradient(135deg, #D43C33, #E09643)',
              color: '#fff', textDecoration: 'none',
              fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: '14px',
              whiteSpace: 'nowrap', boxShadow: '0 4px 16px rgba(212,60,51,0.3)',
              transition: 'transform 0.15s',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >Add to Chrome — Free →</a>
        </div>

        {/* Testimonials */}
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center', overflowX: 'auto' }}>
          {testimonials.map((t, i) => (
            <div key={i} style={{
              flex: '1 1 280px', maxWidth: '340px',
              background: '#1A2A3A', borderRadius: '20px', padding: '28px',
              border: '1px solid rgba(255,255,255,0.06)',
              textAlign: 'left',
            }}>
              <p style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '15px', color: '#D4D4D4', lineHeight: 1.7, marginBottom: '20px', fontStyle: 'italic' }}>
                "{t.quote}"
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '40px', height: '40px', borderRadius: '999px', flexShrink: 0,
                  background: 'linear-gradient(135deg, #D43C33, #E09643)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'Sora, sans-serif', fontSize: '14px', fontWeight: 700, color: '#fff',
                }}>{t.initials}</div>
                <div>
                  <div style={{ fontFamily: 'Sora, sans-serif', fontSize: '14px', color: '#F2F2F2', fontWeight: 700 }}>{t.name}</div>
                  <div style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '12px', color: '#E09643' }}>{t.school}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}