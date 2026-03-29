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

function ResumeBuilderPreview() {
  return (
    <div style={{
      background: '#1A2535', borderRadius: '16px', padding: '24px',
      fontFamily: 'Nunito Sans, sans-serif', fontSize: '12px', color: '#D4D4D4',
      position: 'relative', overflow: 'hidden',
      boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '16px' }}>
        {['#FF5F57','#FFBD2E','#28CA41'].map(c => <div key={c} style={{ width: '10px', height: '10px', borderRadius: '999px', background: c }} />)}
        <div style={{ marginLeft: 'auto', background: 'rgba(255,255,255,0.08)', borderRadius: '6px', padding: '3px 10px', fontSize: '10px', color: '#7A8FA0' }}>AI RESUME BUILDER</div>
      </div>
      {/* Name header */}
      <div style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '12px', marginBottom: '12px' }}>
        <div style={{ fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: '16px', color: '#F2F2F2' }}>SARAH J. MILLER</div>
        <div style={{ color: '#7A8FA0', fontSize: '11px' }}>Product Manager</div>
        <div style={{ display: 'flex', gap: '6px', marginTop: '8px', flexWrap: 'wrap' }}>
          {['Strategic Leader','Technical Coordination','Performance Metrics & KPI'].map(t => (
            <span key={t} style={{ background: 'rgba(212,60,51,0.15)', border: '1px solid rgba(212,60,51,0.3)', borderRadius: '4px', padding: '2px 7px', fontSize: '9px', color: '#E09643' }}>{t}</span>
          ))}
        </div>
      </div>
      {/* Two col */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
        <div>
          <div style={{ fontSize: '9px', color: '#7A8FA0', letterSpacing: '1px', marginBottom: '6px' }}>ROLE-SPECIFIC OPT.</div>
          {['Senior prioritization','Keywords + Achievements','Product Strategy'].map(i => (
            <div key={i} style={{ display: 'flex', gap: '5px', alignItems: 'center', marginBottom: '4px' }}>
              <span style={{ color: '#3DB87A', fontSize: '10px' }}>✓</span>
              <span style={{ fontSize: '10px' }}>{i}</span>
            </div>
          ))}
        </div>
        <div>
          <div style={{ fontSize: '9px', color: '#7A8FA0', letterSpacing: '1px', marginBottom: '6px' }}>ATS ALIGNMENT</div>
          <div style={{ position: 'relative', width: '60px', height: '60px', margin: '0 auto' }}>
            <svg viewBox="0 0 60 60" style={{ transform: 'rotate(-90deg)' }}>
              <circle cx="30" cy="30" r="24" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="6" />
              <circle cx="30" cy="30" r="24" fill="none" stroke="#D43C33" strokeWidth="6" strokeDasharray={`${2 * Math.PI * 24 * 0.94} ${2 * Math.PI * 24 * 0.06}`} strokeLinecap="round" />
            </svg>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'JetBrains Mono, monospace', fontSize: '12px', fontWeight: 700, color: '#F2F2F2' }}>94%</div>
          </div>
        </div>
        <div>
          <div style={{ fontSize: '9px', color: '#7A8FA0', letterSpacing: '1px', marginBottom: '6px' }}>KEYWORD GAPS</div>
          {[['project mgmt','product roadmap'],['SaaS metric','project skills']].map(([from, to], i) => (
            <div key={i} style={{ display: 'flex', gap: '4px', alignItems: 'center', marginBottom: '5px', fontSize: '9px' }}>
              <span style={{ background: 'rgba(212,60,51,0.2)', padding: '2px 5px', borderRadius: '3px', color: '#D43C33' }}>{from}</span>
              <span style={{ color: '#7A8FA0' }}>→</span>
              <span style={{ background: 'rgba(61,184,122,0.2)', padding: '2px 5px', borderRadius: '3px', color: '#3DB87A' }}>{to}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function JobMatchPreview() {
  const jobs = [
    { title: 'Software Engineer Intern', company: 'Notion', loc: 'San Francisco, CA', score: 83, date: '2/4/2026' },
    { title: 'Frontend Engineer Intern', company: 'Figma', loc: 'New York, NY', score: 79, date: '2/3/2026' },
    { title: 'Product Engineer Intern', company: 'Linear', loc: 'Remote', score: 86, date: '2/1/2026' },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {jobs.map((job, i) => (
        <div key={i} style={{
          background: '#1A2535', borderRadius: '14px', padding: '16px 18px',
          border: '1px solid rgba(255,255,255,0.06)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
            <div>
              <div style={{ fontFamily: 'Sora, sans-serif', fontSize: '14px', color: '#F2F2F2', fontWeight: 600 }}>{job.title}</div>
              <div style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '12px', color: '#7A8FA0' }}>{job.company}</div>
              <div style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '12px', color: '#7A8FA0' }}>{job.loc}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '18px', fontWeight: 700, color: job.score >= 83 ? '#3DB87A' : '#E09643' }}>{job.score}</div>
              <div style={{ fontSize: '9px', color: '#7A8FA0', letterSpacing: '1px' }}>ATS</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            {['Resume', 'Cover Letter'].map(l => (
              <button key={l} style={{ padding: '5px 10px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.12)', background: 'none', cursor: 'pointer', fontFamily: 'Nunito Sans, sans-serif', fontSize: '11px', color: '#D4D4D4', display: 'flex', gap: '4px', alignItems: 'center' }}>
                ↓ {l}
              </button>
            ))}
            <button style={{ padding: '5px 12px', borderRadius: '6px', border: 'none', background: '#D43C33', cursor: 'pointer', fontFamily: 'Nunito Sans, sans-serif', fontSize: '11px', color: '#fff', fontWeight: 600, display: 'flex', gap: '4px', alignItems: 'center', marginLeft: 'auto' }}>
              ↗ Apply
            </button>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: '#7A8FA0' }}>{job.date}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

const features = [
  {
    badge: '🤖 AI RESUME BUILDER',
    title: 'Craft a tailored resume for every role',
    desc: 'Generate role-specific resume versions, improve ATS alignment, and close keyword gaps before you submit.',
    cta: 'Get a Free Resume →',
    preview: <ResumeBuilderPreview />,
    reverse: false,
  },
  {
    badge: '🎯 JOB MATCHES',
    title: 'Get matched to relevant jobs, personalized to you',
    desc: 'Set your preferences once and discover high-fit opportunities instead of searching endlessly across job boards.',
    cta: 'Get Matched Now →',
    preview: <JobMatchPreview />,
    reverse: true,
  },
];

export default function FeatureCards() {
  return (
    <section style={{ padding: '80px 24px', background: 'var(--surface-1)' }}>
      <div style={{ maxWidth: '1060px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {features.map((feat, i) => {
          const [ref, inView] = useInView();
          return (
            <div key={i} ref={ref} style={{
              background: 'var(--card-bg)',
              border: '1px solid var(--border)',
              borderRadius: '24px',
              padding: 'clamp(28px, 4vw, 48px)',
              display: 'flex', flexDirection: feat.reverse ? 'row-reverse' : 'row',
              gap: '48px', alignItems: 'center', flexWrap: 'wrap',
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(28px)',
              transition: `opacity 0.6s ${i * 100}ms, transform 0.6s ${i * 100}ms`,
            }}>
              {/* Text */}
              <div style={{ flex: '1 1 280px', minWidth: '240px' }}>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: '6px',
                  background: 'rgba(212,60,51,0.1)', border: '1px solid rgba(212,60,51,0.25)',
                  borderRadius: '999px', padding: '5px 14px', marginBottom: '20px',
                  fontFamily: 'Nunito Sans, sans-serif', fontSize: '12px', color: '#D43C33', fontWeight: 700, letterSpacing: '0.5px',
                }}>
                  {feat.badge}
                </div>
                <h3 style={{ fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: 'clamp(22px, 3vw, 32px)', color: 'var(--text-primary)', lineHeight: 1.2, marginBottom: '16px' }}>
                  {feat.title}
                </h3>
                <p style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '16px', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '28px' }}>
                  {feat.desc}
                </p>
                <button style={{
                  padding: '10px 22px', borderRadius: '10px',
                  border: '1.5px solid var(--border)',
                  background: 'none', cursor: 'pointer',
                  fontFamily: 'Nunito Sans, sans-serif', fontSize: '14px', fontWeight: 700,
                  color: 'var(--text-primary)',
                  display: 'inline-flex', alignItems: 'center', gap: '6px',
                  transition: 'all 0.2s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#D43C33'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = '#D43C33'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.borderColor = 'var(--border)'; }}
                >
                  {feat.cta}
                </button>
              </div>
              {/* Preview */}
              <div style={{ flex: '1 1 320px', minWidth: '280px' }}>
                {feat.preview}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}