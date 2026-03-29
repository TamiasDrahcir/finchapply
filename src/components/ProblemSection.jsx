import { useEffect, useRef, useState } from 'react';

function useInView(threshold = 0.2) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

const painCards = [
  { stat: '100+', label: 'Applications sent', sub: 'Just to get 2-3 callbacks. Mass applying floods your time and signals nothing special to employers.' },
  { stat: '< 2%', label: 'Average response rate', sub: 'The industry average for generic, untailored applications. ATS filters reject templated resumes instantly.' },
  { stat: '25 min', label: 'Per manual application', sub: "At 100 applications, that's 40+ hours of your semester. Gone. And still no interviews." },
];

export default function ProblemSection() {
  const [cardsRef, cardsInView] = useInView(0.1);
  const [toggle, setToggle] = useState('without');

  return (
    <section style={{ padding: '100px 24px', background: '#24364C' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
        <div className="eyebrow">THE BROKEN PLAYBOOK</div>

        <h2 style={{ fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: 'clamp(32px, 5vw, 52px)', color: '#F2F2F2', lineHeight: 1.15, margin: '0 0 24px' }}>
          You're doing everything right.<br />
          And still getting{' '}
          <span style={{ color: '#E09643' }}>ghosted.</span>
        </h2>

        <p style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '18px', color: '#D4D4D4', lineHeight: 1.7, maxWidth: '680px', margin: '0 auto 32px' }}>
          Most students follow the same advice: apply to everything, optimize later. So they spend 20-30 minutes tailoring each application, submit 100 or more, and wait. The inbox stays empty.
        </p>

        <p style={{ fontFamily: 'Sora, sans-serif', fontSize: '22px', color: '#F2F2F2', fontWeight: 600, padding: '24px 0', borderTop: '1px solid rgba(212,212,212,0.08)', borderBottom: '1px solid rgba(212,212,212,0.08)', marginBottom: '60px' }}>
          "It's not a volume problem. It's a relevance problem."
        </p>

        {/* Pain cards */}
        <div ref={cardsRef} style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '60px' }}>
          {painCards.map((card, i) => (
            <div key={i} style={{
              flex: '1 1 240px', maxWidth: '280px',
              background: '#1A2A3A',
              borderRadius: '20px',
              border: '1px solid rgba(255,255,255,0.06)',
              padding: '32px 24px',
              textAlign: 'center',
              opacity: cardsInView ? 1 : 0,
              transform: cardsInView ? 'translateY(0)' : 'translateY(20px)',
              transition: `opacity 0.5s ${i * 100}ms, transform 0.5s ${i * 100}ms`,
            }}>
              <div style={{
                fontFamily: 'JetBrains Mono, monospace', fontSize: '40px', fontWeight: 700,
                background: 'linear-gradient(135deg, #D43C33, #E09643)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                marginBottom: '8px',
              }}>{card.stat}</div>
              <div style={{ fontFamily: 'Sora, sans-serif', fontSize: '16px', color: '#F2F2F2', fontWeight: 700, marginBottom: '12px' }}>{card.label}</div>
              <div style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '14px', color: '#7A8FA0', lineHeight: 1.6 }}>{card.sub}</div>
            </div>
          ))}
        </div>

        {/* Before/After toggle */}
        <div style={{ background: '#1A2A3A', borderRadius: '20px', padding: '32px', textAlign: 'left' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '28px' }}>
            <div style={{ display: 'flex', background: 'rgba(255,255,255,0.05)', borderRadius: '999px', padding: '4px', gap: '4px' }}>
              {['without', 'with'].map(mode => (
                <button key={mode} onClick={() => setToggle(mode)} style={{
                  fontFamily: 'Nunito Sans, sans-serif', fontWeight: 600, fontSize: '14px',
                  padding: '8px 20px', borderRadius: '999px', border: 'none', cursor: 'pointer',
                  background: toggle === mode ? '#D43C33' : 'transparent',
                  color: toggle === mode ? '#fff' : '#7A8FA0',
                  transition: 'all 0.3s',
                }}>
                  {mode === 'without' ? 'Without Finch' : 'With Finch'}
                </button>
              ))}
            </div>
          </div>

          <div style={{ position: 'relative', minHeight: '220px' }}>
            {/* Without Finch */}
            <div style={{
              opacity: toggle === 'without' ? 1 : 0,
              transition: 'opacity 0.3s',
              position: toggle === 'with' ? 'absolute' : 'relative',
              width: '100%', top: 0,
            }}>
              <div style={{ fontFamily: 'Sora, sans-serif', fontSize: '16px', color: '#F2F2F2', fontWeight: 700, marginBottom: '16px' }}>❌ Without Finch</div>
              <div style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '14px', color: '#D4D4D4', lineHeight: 2 }}>
                <div style={{ color: '#7A8FA0', marginBottom: '4px' }}>Monday:</div>
                <div>• Job board scrolling: 6 hrs</div>
                <div>• Application 1: 28 min</div>
                <div>• Application 2: 22 min</div>
                <div>• Application 3: gave up</div>
                <div style={{ marginTop: '16px', color: '#7A8FA0', fontStyle: 'italic' }}>Result: 2 applications. Exhausted. No interviews.</div>
              </div>
            </div>

            {/* With Finch */}
            <div style={{
              opacity: toggle === 'with' ? 1 : 0,
              transition: 'opacity 0.3s',
              position: toggle === 'without' ? 'absolute' : 'relative',
              width: '100%', top: 0,
            }}>
              <div style={{ fontFamily: 'Sora, sans-serif', fontSize: '16px', color: '#F2F2F2', fontWeight: 700, marginBottom: '16px' }}>✅ With Finch</div>
              <div style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '14px', color: '#D4D4D4', lineHeight: 2 }}>
                <div style={{ color: '#7A8FA0', marginBottom: '4px' }}>Monday:</div>
                <div>• Browse matched roles: 8 min</div>
                <div>• Application 1: 52 sec <span style={{ color: '#E09643' }}>←</span></div>
                <div>• Application 2: 47 sec <span style={{ color: '#E09643' }}>←</span></div>
                <div>• Application 3: 58 sec <span style={{ color: '#E09643' }}>←</span></div>
                <div>• Applications 4 through 12...</div>
                <div style={{ marginTop: '16px', color: '#3DB87A', fontWeight: 600 }}>Result: 12 applications. 3 interview invites. 🎉</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}