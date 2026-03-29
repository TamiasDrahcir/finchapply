import { useEffect, useRef, useState } from 'react';

function useInView() {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, v];
}

/* INSERT CHROME EXTENSION URL HERE — replace the href in the button below */
const CHROME_EXTENSION_URL = '#chrome-extension'; // placeholder

export default function ChromeExtensionSection() {
  const [ref, inView] = useInView();

  return (
    <section style={{ padding: '100px 24px', background: 'var(--bg)', position: 'relative', overflow: 'hidden' }}>
      {/* Background glow */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '800px', height: '400px',
        background: 'radial-gradient(ellipse, rgba(212,60,51,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div ref={ref} style={{
        maxWidth: '1060px', margin: '0 auto',
        display: 'flex', gap: '60px', alignItems: 'center', flexWrap: 'wrap',
        opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(32px)',
        transition: 'opacity 0.7s, transform 0.7s',
      }}>
        {/* Extension visual */}
        <div style={{ flex: '1 1 340px' }}>
          {/* Browser mock */}
          <div style={{
            background: 'var(--card-bg)', borderRadius: '20px',
            border: '1px solid var(--border)',
            overflow: 'hidden',
            boxShadow: '0 24px 64px rgba(0,0,0,0.2)',
          }}>
            {/* Browser chrome bar */}
            <div style={{
              background: 'var(--surface-2)', padding: '12px 16px',
              borderBottom: '1px solid var(--border)',
              display: 'flex', alignItems: 'center', gap: '10px',
            }}>
              <div style={{ display: 'flex', gap: '6px' }}>
                {['#FF5F57','#FFBD2E','#28CA41'].map(c => <div key={c} style={{ width: '10px', height: '10px', borderRadius: '999px', background: c }} />)}
              </div>
              <div style={{
                flex: 1, background: 'var(--surface-1)', border: '1px solid var(--border)',
                borderRadius: '6px', padding: '4px 12px',
                fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: 'var(--text-tertiary)',
              }}>greenhouse.io/apply/notion</div>
              {/* Extension badge */}
              <div style={{
                background: 'linear-gradient(135deg, #D43C33, #E09643)',
                borderRadius: '8px', padding: '4px 10px',
                fontFamily: 'Sora, sans-serif', fontSize: '11px', fontWeight: 700, color: '#fff',
                display: 'flex', alignItems: 'center', gap: '5px',
              }}>
                <span>🐦</span> finch
              </div>
            </div>

            {/* Page content mock */}
            <div style={{ padding: '24px', minHeight: '200px', position: 'relative' }}>
              {/* Fake form fields */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', opacity: 0.5 }}>
                {['Full Name', 'Email', 'LinkedIn URL', 'Resume'].map(field => (
                  <div key={field}>
                    <div style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '11px', color: 'var(--text-tertiary)', marginBottom: '4px' }}>{field}</div>
                    <div style={{ height: '32px', background: 'var(--surface-2)', borderRadius: '6px', border: '1px solid var(--border)' }} />
                  </div>
                ))}
              </div>

              {/* Finch autofill overlay */}
              <div style={{
                position: 'absolute', inset: '16px',
                background: 'rgba(0,0,0,0.5)',
                backdropFilter: 'blur(4px)',
                borderRadius: '12px',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                gap: '12px',
              }}>
                <div style={{
                  background: 'linear-gradient(135deg, #D43C33, #E09643)',
                  borderRadius: '16px', padding: '16px 24px', textAlign: 'center',
                  boxShadow: '0 8px 32px rgba(212,60,51,0.4)',
                }}>
                  <div style={{ fontFamily: 'Sora, sans-serif', fontSize: '14px', fontWeight: 700, color: '#fff', marginBottom: '4px' }}>🐦 Finch detected this form</div>
                  <div style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '12px', color: 'rgba(255,255,255,0.85)', marginBottom: '12px' }}>ATS Score: 94% · Tailoring ready</div>
                  <div style={{
                    background: '#fff', borderRadius: '8px', padding: '8px 16px',
                    fontFamily: 'Sora, sans-serif', fontSize: '13px', fontWeight: 700, color: '#D43C33',
                    cursor: 'pointer',
                  }}>⚡ Autofill Application</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Text */}
        <div style={{ flex: '1 1 320px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(212,60,51,0.1)', border: '1px solid rgba(212,60,51,0.3)',
            borderRadius: '999px', padding: '6px 16px', marginBottom: '20px',
            fontFamily: 'Nunito Sans, sans-serif', fontSize: '12px', color: '#D43C33', fontWeight: 700,
          }}>🔌 CHROME EXTENSION</div>

          <h2 style={{
            fontFamily: 'Sora, sans-serif', fontWeight: 700,
            fontSize: 'clamp(28px, 4vw, 44px)', color: 'var(--text-primary)',
            lineHeight: 1.15, marginBottom: '20px',
          }}>
            One click to fill<br />
            <span style={{
              background: 'linear-gradient(90deg, #D43C33, #E09643)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>any application form.</span>
          </h2>

          <p style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '17px', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '20px' }}>
            The Finch Chrome extension detects application forms on Greenhouse, Lever, Workday, and more — then fills every field with your AI-optimized profile in seconds.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '32px' }}>
            {[
              'Works on Greenhouse, Lever, Workday, iCIMS',
              'ATS score shown before you submit',
              'One-click autofill after tailoring',
            ].map(item => (
              <div key={item} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <div style={{ width: '20px', height: '20px', borderRadius: '999px', background: 'rgba(61,184,122,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ color: '#3DB87A', fontSize: '11px' }}>✓</span>
                </div>
                <span style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '15px', color: 'var(--text-secondary)' }}>{item}</span>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <a
              href={CHROME_EXTENSION_URL} /* INSERT CHROME EXTENSION URL HERE */
              target="_blank" rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '14px 24px', borderRadius: '12px',
                background: 'linear-gradient(135deg, #D43C33, #E09643)',
                color: '#fff', textDecoration: 'none',
                fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: '15px',
                boxShadow: '0 4px 20px rgba(212,60,51,0.35)',
                transition: 'transform 0.15s, box-shadow 0.15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.03)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(212,60,51,0.5)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(212,60,51,0.35)'; }}
            >
              🐦 Add to Chrome — Free
            </a>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              padding: '14px 20px', borderRadius: '12px',
              border: '1px solid var(--border)', color: 'var(--text-secondary)',
              fontFamily: 'Nunito Sans, sans-serif', fontSize: '14px',
            }}>
              ⭐⭐⭐⭐⭐ <span style={{ color: 'var(--text-tertiary)' }}>4.9 · Chrome Web Store</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}