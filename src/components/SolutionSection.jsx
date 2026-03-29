import { FileText, PenLine, Zap } from 'lucide-react';
import { useState } from 'react';

const pillars = [
  {
    Icon: FileText,
    label: 'Tailored, not templated',
    desc: 'Finch rewrites your resume bullets to match each job description, targeting the exact keywords ATS systems are scanning for.',
  },
  {
    Icon: PenLine,
    label: 'Written in seconds, reads like hours',
    desc: 'Each cover letter is generated fresh from your profile and the job posting. No copy-paste. No "Dear Hiring Manager" filler.',
  },
  {
    Icon: Zap,
    label: 'One click to autofill',
    desc: 'Our Chrome extension fills application forms instantly with your optimized profile. Works with Greenhouse, Workday, Lever, and more.',
  },
];

export default function SolutionSection() {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  return (
    <section id="product" style={{
      padding: '100px 24px',
      background: '#1F3045',
      backgroundImage: `
        linear-gradient(rgba(242,242,242,0.04) 1px, transparent 1px),
        linear-gradient(90deg, rgba(242,242,242,0.04) 1px, transparent 1px)
      `,
      backgroundSize: '40px 40px',
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>
        <div className="eyebrow">THE FINCH APPROACH</div>

        <h2 style={{ fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: 'clamp(30px, 5vw, 52px)', color: '#F2F2F2', lineHeight: 1.15, margin: '0 0 20px' }}>
          Fewer applications.<br />
          Smarter targeting.<br />
          Better outcomes.
        </h2>

        <p style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '20px', color: '#D4D4D4', lineHeight: 1.6, marginBottom: '60px', maxWidth: '600px', margin: '0 auto 60px' }}>
          Finch doesn't help you apply to more jobs.<br />
          It helps you{' '}
          <em style={{
            background: 'linear-gradient(90deg, #D43C33, #E09643)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            fontStyle: 'italic',
          }}>actually get them.</em>
        </p>

        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {pillars.map(({ Icon, label, desc }, i) => (
            <div key={i}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              style={{
                flex: '1 1 280px', maxWidth: '320px',
                background: '#1A2A3A',
                borderRadius: '20px',
                border: '1px solid rgba(255,255,255,0.06)',
                padding: '36px 28px',
                textAlign: 'center',
                transition: 'border-color 0.3s',
                borderColor: hoveredIdx === i ? 'rgba(212,60,51,0.3)' : 'rgba(255,255,255,0.06)',
              }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                width: '64px', height: '64px', marginBottom: '20px',
                transform: hoveredIdx === i ? 'scale(1.08)' : 'scale(1)',
                transition: 'transform 0.3s',
              }}>
                <Icon size={44} style={{
                  stroke: 'url(#iconGrad)',
                  filter: hoveredIdx === i ? 'drop-shadow(0 0 8px rgba(212,60,51,0.5))' : 'none',
                }} />
              </div>
              <svg width="0" height="0" style={{ position: 'absolute' }}>
                <defs>
                  <linearGradient id="iconGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#D43C33" />
                    <stop offset="100%" stopColor="#E09643" />
                  </linearGradient>
                </defs>
              </svg>
              <div style={{ fontFamily: 'Sora, sans-serif', fontSize: '18px', color: '#F2F2F2', fontWeight: 700, marginBottom: '12px' }}>{label}</div>
              <div style={{
                fontFamily: 'Nunito Sans, sans-serif', fontSize: '15px', lineHeight: 1.65,
                color: hoveredIdx === i ? '#F2F2F2' : '#D4D4D4',
                transition: 'color 0.3s',
              }}>{desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}