import { useEffect, useRef, useState } from 'react';

const steps = [
  { num: '01', title: 'Import Your Profile', desc: 'Connect your LinkedIn or upload your resume. Finch builds your master profile and identifies your strongest selling points.' },
  { num: '02', title: 'Browse Matched Roles', desc: 'Explore curated listings or paste any job URL. Finch scores each role for fit so you know which ones are worth applying to.' },
  { num: '03', title: 'AI Tailors Your Materials', desc: 'Finch rewrites your resume and generates a fresh cover letter specific to this company, this role, and its requirements.' },
  { num: '04', title: 'One-Click Autofill', desc: 'Open the job application in your browser. Click the Finch extension button. Watch it fill every field instantly.' },
  { num: '05', title: 'Submit and Track', desc: 'Submit with confidence. Finch logs every application and tracks your response rates across your whole pipeline.' },
];

export default function HowItWorksSection() {
  const [visibleSteps, setVisibleSteps] = useState(new Set());
  const stepRefs = useRef([]);

  useEffect(() => {
    const observers = stepRefs.current.map((el, i) => {
      if (!el) return null;
      const obs = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) setVisibleSteps(prev => new Set([...prev, i]));
      }, { threshold: 0.3 });
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(obs => obs?.disconnect());
  }, []);

  return (
    <section id="how-it-works" style={{ padding: '100px 24px', background: '#24364C' }}>
      <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
        <div className="eyebrow">HOW FINCH WORKS</div>
        <h2 style={{ fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: 'clamp(28px, 4vw, 44px)', color: '#F2F2F2', lineHeight: 1.2, margin: '0 0 60px' }}>
          From job listing to submitted application<br />in under 60 seconds.
        </h2>

        <div style={{ position: 'relative' }}>
          {/* Gradient line */}
          <div style={{
            position: 'absolute', left: '28px', top: '24px', bottom: '24px', width: '2px',
            background: 'linear-gradient(180deg, #24364C 0%, #D43C33 40%, #E09643 100%)',
            borderRadius: '999px',
          }} className="hidden md:block" />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {steps.map((step, i) => (
              <div
                key={i}
                ref={el => stepRefs.current[i] = el}
                style={{
                  display: 'flex', gap: '28px', alignItems: 'flex-start',
                  padding: '32px 0',
                  borderBottom: i < steps.length - 1 ? '1px solid rgba(212,212,212,0.06)' : 'none',
                  opacity: visibleSteps.has(i) ? 1 : 0,
                  transform: visibleSteps.has(i) ? 'translateY(0)' : 'translateY(20px)',
                  transition: `opacity 0.5s ${i * 150}ms, transform 0.5s ${i * 150}ms`,
                  textAlign: 'left',
                }}
              >
                <div style={{ flexShrink: 0, width: '56px', display: 'flex', justifyContent: 'center' }}>
                  <div style={{
                    fontFamily: 'JetBrains Mono, monospace', fontSize: '36px', fontWeight: 700,
                    background: visibleSteps.has(i) ? 'linear-gradient(135deg, #D43C33, #E09643)' : 'rgba(122,143,160,0.4)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                    transition: 'background 0.5s',
                  }}>{step.num}</div>
                </div>
                <div>
                  <div style={{ fontFamily: 'Sora, sans-serif', fontSize: '18px', color: '#F2F2F2', fontWeight: 700, marginBottom: '8px' }}>{step.title}</div>
                  <div style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '16px', color: '#D4D4D4', lineHeight: 1.65 }}>{step.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}