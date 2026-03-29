import { useEffect, useRef, useState } from 'react';
import { Search, BarChart2, FileText } from 'lucide-react';

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

const steps = [
  {
    icon: Search, badge: '10 SEC', badgeColor: '#D43C33',
    title: 'Start from one search prompt',
    desc: 'Paste a LinkedIn search URL or role keywords in the dashboard, choose how many jobs to run, and launch.',
  },
  {
    icon: BarChart2, badge: 'REAL-TIME', badgeColor: '#E09643',
    title: 'Track generation in one place',
    desc: 'Your dashboard keeps generation status, completed applications, and history in a single clean thread.',
  },
  {
    icon: FileText, badge: 'ALL IN ONE', badgeColor: '#3DB87A',
    title: 'Review and apply from cards',
    desc: 'Each generated application includes ATS score, resume, cover letter, and direct apply link in the same card layout.',
  },
];

const jobs = [
  { title: 'Software Engineer Intern', company: 'Notion', loc: 'San Francisco, CA', score: 83, date: '2/4/2026' },
  { title: 'Frontend Engineer Intern', company: 'Figma', loc: 'New York, NY', score: 79, date: '2/3/2026' },
  { title: 'Product Engineer Intern', company: 'Linear', loc: 'Remote', score: 86, date: '2/1/2026' },
];

export default function HowItWorksNew() {
  const [ref, inView] = useInView();

  return (
    <section id="how-it-works" style={{ padding: '100px 24px', background: 'var(--bg)' }}>
      <div ref={ref} style={{
        maxWidth: '1060px', margin: '0 auto',
        display: 'flex', gap: '60px', flexWrap: 'wrap', alignItems: 'flex-start',
      }}>
        {/* Left */}
        <div style={{ flex: '1 1 380px' }}>
          <div style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '12px', color: '#D43C33', letterSpacing: '2px', marginBottom: '16px', fontWeight: 700 }}>HOW IT WORKS</div>
          <h2 style={{ fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: 'clamp(28px, 4vw, 44px)', color: 'var(--text-primary)', lineHeight: 1.15, marginBottom: '40px' }}>
            A cleaner workflow<br />from search to apply
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={i} style={{
                  background: 'var(--card-bg)', border: '1px solid var(--border)',
                  borderRadius: '16px', padding: '20px 22px',
                  display: 'flex', gap: '16px', alignItems: 'flex-start',
                  opacity: inView ? 1 : 0,
                  transform: inView ? 'translateY(0)' : 'translateY(16px)',
                  transition: `opacity 0.5s ${i * 120}ms, transform 0.5s ${i * 120}ms`,
                }}>
                  <div style={{
                    width: '40px', height: '40px', borderRadius: '10px', flexShrink: 0,
                    background: `${step.badgeColor}18`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Icon size={20} style={{ color: step.badgeColor }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                      <div style={{ fontFamily: 'Sora, sans-serif', fontSize: '15px', color: 'var(--text-primary)', fontWeight: 700 }}>{step.title}</div>
                      <div style={{
                        background: `${step.badgeColor}18`, color: step.badgeColor,
                        borderRadius: '6px', padding: '3px 8px',
                        fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', fontWeight: 700,
                        marginLeft: '12px', flexShrink: 0,
                      }}>{step.badge}</div>
                    </div>
                    <p style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: job cards */}
        <div style={{
          flex: '1 1 340px',
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity 0.6s 300ms, transform 0.6s 300ms',
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {jobs.map((job, i) => (
              <div key={i} style={{
                background: 'var(--card-bg)', border: '1px solid var(--border)',
                borderRadius: '14px', padding: '18px 20px',
                boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <div>
                    <div style={{ fontFamily: 'Sora, sans-serif', fontSize: '14px', color: 'var(--text-primary)', fontWeight: 600 }}>{job.title}</div>
                    <div style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '12px', color: 'var(--text-secondary)' }}>{job.company}</div>
                    <div style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '12px', color: 'var(--text-tertiary)' }}>{job.loc}</div>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '20px', fontWeight: 700, color: job.score >= 83 ? '#3DB87A' : '#E09643' }}>{job.score}</div>
                    <div style={{ fontSize: '9px', color: 'var(--text-tertiary)', letterSpacing: '1px' }}>ATS</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                  {['Resume', 'Cover Letter'].map(l => (
                    <button key={l} style={{ padding: '5px 10px', borderRadius: '6px', border: '1px solid var(--border)', background: 'none', cursor: 'pointer', fontFamily: 'Nunito Sans, sans-serif', fontSize: '11px', color: 'var(--text-secondary)', display: 'flex', gap: '4px', alignItems: 'center' }}>
                      ↓ {l}
                    </button>
                  ))}
                  <button style={{ marginLeft: 'auto', padding: '5px 12px', borderRadius: '6px', border: 'none', background: '#D43C33', cursor: 'pointer', fontFamily: 'Nunito Sans, sans-serif', fontSize: '11px', color: '#fff', fontWeight: 600, display: 'flex', gap: '4px', alignItems: 'center' }}>
                    ↗ Apply
                  </button>
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: 'var(--text-tertiary)' }}>{job.date}</span>
                </div>
              </div>
            ))}

            {/* Mini input at bottom like reference */}
            <div style={{
              background: 'var(--card-bg)', border: '1px solid var(--border)',
              borderRadius: '14px', padding: '12px 16px',
              display: 'flex', alignItems: 'center', gap: '10px',
            }}>
              <span style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '13px', color: 'var(--text-tertiary)', flex: 1 }}>software engineer intern</span>
              <div style={{ display: 'flex', gap: '6px' }}>
                {['5 jobs', '10 jobs', '15 jobs'].map((o, i) => (
                  <span key={o} style={{
                    padding: '4px 10px', borderRadius: '999px',
                    background: i === 1 ? '#D43C33' : 'var(--chip-bg)',
                    color: i === 1 ? '#fff' : 'var(--text-secondary)',
                    fontFamily: 'Nunito Sans, sans-serif', fontSize: '11px', fontWeight: 600,
                  }}>{o}</span>
                ))}
              </div>
              <div style={{ width: '30px', height: '30px', borderRadius: '999px', background: '#D43C33', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: '#fff', fontSize: '14px' }}>↑</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}