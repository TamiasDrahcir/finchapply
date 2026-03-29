import { useEffect, useRef, useState } from 'react';
import Navbar from '../components/Navbar';
import FinchFooter from '../components/FinchFooter';
import { Link } from 'react-router-dom';
import { FileText, Target, Chrome, BarChart2, Zap, CheckCircle, ArrowRight, Star } from 'lucide-react';
import SignupModal from '../components/SignupModal';

function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, v];
}

function SectionReveal({ children, delay = 0 }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? 'translateY(0)' : 'translateY(32px)',
      transition: `opacity 0.7s ${delay}ms ease, transform 0.7s ${delay}ms ease`,
    }}>
      {children}
    </div>
  );
}

const FEATURES = [
  {
    icon: FileText,
    color: '#D43C33',
    badge: 'AI RESUME TAILORING',
    title: 'Resumes that speak the recruiter\'s language.',
    desc: 'Finch rewrites your resume for every role — not with templates, but with intelligent rewriting that mirrors the job description\'s keywords, tone, and priorities.',
    bullets: [
      'Role-specific keyword injection across every bullet point',
      'ATS alignment scored before submission (target: 90%+)',
      'Gap analysis shows exactly what\'s missing vs. the JD',
      'Preserves your authentic voice while improving match rate',
    ],
    visual: (
      <div style={{ background: 'linear-gradient(135deg, #0F1A2A, #1A2535)', borderRadius: '16px', padding: '24px', fontFamily: 'monospace', fontSize: '12px' }}>
        <div style={{ display: 'flex', gap: '6px', marginBottom: '16px' }}>
          {['#FF5F57','#FFBD2E','#28CA41'].map(c => <div key={c} style={{ width: '10px', height: '10px', borderRadius: '50%', background: c }} />)}
          <span style={{ marginLeft: '8px', color: '#7A8FA0', fontSize: '10px', letterSpacing: '1px' }}>RESUME OPTIMIZER</span>
        </div>
        {[
          { label: 'ATS Score', val: '94%', color: '#3DB87A', w: '94%' },
          { label: 'Keyword Match', val: '87%', color: '#E09643', w: '87%' },
          { label: 'Tone Alignment', val: '91%', color: '#D43C33', w: '91%' },
        ].map(s => (
          <div key={s.label} style={{ marginBottom: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#D4D4D4', marginBottom: '5px' }}>
              <span>{s.label}</span><span style={{ color: s.color, fontWeight: 700 }}>{s.val}</span>
            </div>
            <div style={{ height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '999px' }}>
              <div style={{ height: '100%', width: s.w, background: s.color, borderRadius: '999px', transition: 'width 1.2s ease' }} />
            </div>
          </div>
        ))}
        <div style={{ marginTop: '16px', background: 'rgba(212,60,51,0.08)', borderRadius: '10px', padding: '10px 12px', border: '1px solid rgba(212,60,51,0.2)' }}>
          <div style={{ color: '#D43C33', fontSize: '10px', letterSpacing: '1px', marginBottom: '4px' }}>KEYWORD GAPS FILLED</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {['project mgmt', 'cross-functional', 'data-driven', 'stakeholder'].map(kw => (
              <span key={kw} style={{ background: 'rgba(61,184,122,0.15)', color: '#3DB87A', borderRadius: '4px', padding: '2px 8px', fontSize: '10px' }}>+{kw}</span>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    icon: Zap,
    color: '#E09643',
    badge: 'COVER LETTER AI',
    title: 'Cover letters that actually get read.',
    desc: 'Stop sending the same generic letter. Finch writes a fresh, specific cover letter for each application — referencing the company, the role, and what makes you the right fit.',
    bullets: [
      'Generated from your actual experience, not a template',
      'References specific company details and role requirements',
      'Adapts tone: formal, startup-casual, creative, technical',
      'Under 300 words, well-structured, compelling opening hook',
    ],
    visual: (
      <div style={{ background: 'linear-gradient(135deg, #0F1A2A, #1A2535)', borderRadius: '16px', padding: '24px' }}>
        <div style={{ background: '#1E2D3D', borderRadius: '10px', padding: '16px', fontFamily: 'Nunito Sans, sans-serif' }}>
          <div style={{ fontSize: '10px', color: '#7A8FA0', letterSpacing: '1px', marginBottom: '8px' }}>AI-GENERATED COVER LETTER</div>
          <div style={{ fontSize: '13px', color: '#D4D4D4', lineHeight: 1.7 }}>
            Dear Hiring Team at <span style={{ color: '#E09643' }}>Notion</span>,<br /><br />
            I'm drawn to <span style={{ color: '#E09643' }}>Notion</span>'s mission to build a connected workspace because I've spent the past year solving exactly the same problem at a smaller scale...
          </div>
          <div style={{ marginTop: '14px', display: 'flex', gap: '8px' }}>
            {['Personalized','On-brand','Under 300w'].map(tag => (
              <span key={tag} style={{ background: 'rgba(224,150,67,0.12)', color: '#E09643', borderRadius: '999px', padding: '3px 10px', fontSize: '10px', fontWeight: 700 }}>{tag}</span>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    icon: Target,
    color: '#3DB87A',
    badge: 'JOB MATCHING',
    title: 'Find roles worth your time.',
    desc: 'Paste a LinkedIn search or role keywords. Finch filters for high-fit opportunities and ranks them by your likelihood of success — so you apply fewer but better.',
    bullets: [
      'Fit score based on your profile vs. JD requirements',
      'Filters for seniority, location, tech stack, and culture',
      'Ranks roles by interview probability, not just recency',
      'Learns from your application history over time',
    ],
    visual: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {[
          { company: 'Linear', role: 'Product Engineer Intern', score: 94, tag: 'Top Match' },
          { company: 'Figma', role: 'Frontend Intern', score: 86, tag: 'Strong Fit' },
          { company: 'Notion', role: 'Software Intern', score: 79, tag: 'Good Fit' },
        ].map((job, i) => (
          <div key={i} style={{
            background: 'linear-gradient(135deg, #0F1A2A, #1A2535)',
            borderRadius: '12px', padding: '14px 16px',
            border: i === 0 ? '1px solid rgba(61,184,122,0.3)' : '1px solid rgba(255,255,255,0.06)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div>
              <div style={{ fontFamily: 'Sora, sans-serif', fontSize: '13px', color: '#F2F2F2', fontWeight: 700 }}>{job.role}</div>
              <div style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '11px', color: '#7A8FA0' }}>{job.company}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '18px', fontWeight: 700, color: job.score > 90 ? '#3DB87A' : job.score > 80 ? '#E09643' : '#D4D4D4' }}>{job.score}</div>
              <div style={{ fontSize: '9px', color: i === 0 ? '#3DB87A' : '#7A8FA0', letterSpacing: '0.5px' }}>{job.tag}</div>
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    icon: Chrome,
    color: '#D43C33',
    badge: '🔌 CHROME EXTENSION',
    title: 'One click to autofill any form.',
    desc: 'The Finch Chrome extension detects application forms across every major ATS platform and fills them instantly with your AI-optimized profile.',
    bullets: [
      'Works on Greenhouse, Lever, Workday, iCIMS, Taleo',
      'Autofills from your tailored profile — not raw resume',
      'Shows ATS score overlay before you submit',
      'Saves ~25 minutes per application on form work alone',
    ],
    highlight: true,
    visual: (
      <div style={{ background: 'linear-gradient(135deg, #1A0A0A, #2A1515)', borderRadius: '16px', padding: '20px', border: '1px solid rgba(212,60,51,0.2)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'linear-gradient(135deg, #D43C33, #E09643)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>🐦</div>
          <div>
            <div style={{ fontFamily: 'Sora, sans-serif', fontSize: '14px', color: '#F2F2F2', fontWeight: 700 }}>Finch Extension Active</div>
            <div style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '11px', color: '#3DB87A' }}>● Greenhouse detected</div>
          </div>
          <div style={{ marginLeft: 'auto', background: 'rgba(212,60,51,0.12)', border: '1px solid rgba(212,60,51,0.3)', borderRadius: '6px', padding: '4px 10px', fontFamily: 'JetBrains Mono, monospace', fontSize: '12px', color: '#D43C33', fontWeight: 700 }}>94%</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '14px' }}>
          {['Full Name', 'Email', 'LinkedIn', 'Resume'].map(f => (
            <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: '#3DB87A', fontSize: '12px' }}>✓</span>
              <span style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '12px', color: '#D4D4D4' }}>{f} filled</span>
            </div>
          ))}
        </div>
        <div style={{ background: 'linear-gradient(135deg, #D43C33, #E09643)', borderRadius: '8px', padding: '10px', textAlign: 'center', fontFamily: 'Sora, sans-serif', fontSize: '13px', fontWeight: 700, color: '#fff', cursor: 'pointer' }}>
          ⚡ Submit Application
        </div>
      </div>
    ),
  },
  {
    icon: BarChart2,
    color: '#9B7FE8',
    badge: 'PERFORMANCE ANALYTICS',
    title: 'Know what\'s working — and what isn\'t.',
    desc: 'Track every application, response rate, and funnel stage. Finch\'s analytics dashboard turns your application history into actionable insights.',
    bullets: [
      'Real-time response rate tracking by company and role',
      'Ghost detector flags no-responses after 14 days',
      'Funnel visualization: Applied → Screen → Interview → Offer',
      'Streak tracker and motivation system built in',
    ],
    visual: (
      <div style={{ background: 'linear-gradient(135deg, #0F1A2A, #1A2535)', borderRadius: '16px', padding: '20px' }}>
        <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
          {[
            { label: 'Apps Sent', val: '47', color: '#9B7FE8' },
            { label: 'Responses', val: '12', color: '#3DB87A' },
            { label: 'Rate', val: '25.5%', color: '#E09643' },
          ].map(s => (
            <div key={s.label} style={{ flex: '1 1 60px', background: 'rgba(255,255,255,0.04)', borderRadius: '10px', padding: '10px 12px', textAlign: 'center' }}>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '18px', fontWeight: 700, color: s.color }}>{s.val}</div>
              <div style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '10px', color: '#7A8FA0' }}>{s.label}</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '4px', alignItems: 'flex-end', height: '50px' }}>
          {[30, 55, 40, 70, 85, 60, 90, 75, 95].map((h, i) => (
            <div key={i} style={{ flex: 1, background: `linear-gradient(180deg, #D43C33, #E09643)`, height: `${h}%`, borderRadius: '3px 3px 0 0', opacity: 0.7 + i * 0.03 }} />
          ))}
        </div>
        <div style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '10px', color: '#7A8FA0', textAlign: 'center', marginTop: '6px' }}>Weekly application activity</div>
      </div>
    ),
  },
];

export default function Features() {
  const [heroRef, heroInView] = useInView(0.05);
  const [showModal, setShowModal] = useState(false);
  const [authMode, setAuthMode] = useState('signup');

  const openSignupModal = () => { setAuthMode('signup'); setShowModal(true); };
  const openLoginModal = () => { setAuthMode('login'); setShowModal(true); };
  const handleSignupSuccess = () => {
    setShowModal(false);
    window.location.href = '/';
  };

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <Navbar onGetAccess={openSignupModal} onSignIn={openLoginModal} />

      {/* Hero */}
      <section style={{ paddingTop: '140px', paddingBottom: '80px', paddingLeft: '24px', paddingRight: '24px', textAlign: 'center' }}>
        <div ref={heroRef} style={{
          opacity: heroInView ? 1 : 0,
          transform: heroInView ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity 0.7s ease, transform 0.7s ease',
        }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(212,60,51,0.1)', border: '1px solid rgba(212,60,51,0.25)',
            borderRadius: '999px', padding: '7px 18px', marginBottom: '28px',
            fontFamily: 'Sora, sans-serif', fontSize: '12px', color: '#D43C33', fontWeight: 700,
          }}>✦ PRODUCT FEATURES</div>
          <h1 style={{
            fontFamily: 'Sora, sans-serif', fontWeight: 700,
            fontSize: 'clamp(36px, 6vw, 68px)', lineHeight: 1.1,
            color: 'var(--text-primary)', marginBottom: '20px', maxWidth: '760px', margin: '0 auto 20px',
          }}>
            Everything you need to<br />
            <span style={{ background: 'linear-gradient(90deg, #D43C33, #E09643)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              land the interview.
            </span>
          </h1>
          <p style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: 'clamp(16px, 2vw, 18px)', color: 'var(--text-secondary)', maxWidth: '520px', margin: '0 auto 40px', lineHeight: 1.7 }}>
            Finch is a full application engine — from finding the right roles to submitting a tailored application in under 60 seconds.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => document.getElementById('features-list')?.scrollIntoView({ behavior: 'smooth' })} style={{
              padding: '13px 28px', borderRadius: '12px', border: 'none', cursor: 'pointer',
              background: 'linear-gradient(135deg, #D43C33, #E09643)', color: '#fff',
              fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: '15px',
              boxShadow: '0 4px 20px rgba(212,60,51,0.3)',
            }}>Explore Features →</button>
            <Link to="/pricing" style={{
              padding: '13px 28px', borderRadius: '12px',
              border: '1px solid var(--border)', color: 'var(--text-primary)',
              fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: '15px',
              textDecoration: 'none', display: 'inline-flex', alignItems: 'center',
              background: 'var(--card-bg)',
            }}>See Pricing</Link>
          </div>
        </div>
      </section>

      {/* Features list */}
      <div id="features-list" style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px 100px' }}>
        {FEATURES.map((feat, i) => {
          const Icon = feat.icon;
          const isEven = i % 2 === 1;
          return (
            <SectionReveal key={i} delay={0}>
              <div style={{
                display: 'flex', flexDirection: isEven ? 'row-reverse' : 'row',
                gap: '60px', alignItems: 'center', flexWrap: 'wrap',
                padding: 'clamp(48px, 6vw, 80px) 0',
                borderBottom: i < FEATURES.length - 1 ? '1px solid var(--border)' : 'none',
              }}>
                {/* Text */}
                <div style={{ flex: '1 1 320px' }}>
                  <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                    background: `${feat.color}15`, border: `1px solid ${feat.color}30`,
                    borderRadius: '999px', padding: '5px 14px', marginBottom: '18px',
                    fontFamily: 'Sora, sans-serif', fontSize: '11px', color: feat.color, fontWeight: 700, letterSpacing: '0.5px',
                  }}>{feat.badge}</div>

                  <h2 style={{
                    fontFamily: 'Sora, sans-serif', fontWeight: 700,
                    fontSize: 'clamp(24px, 3.5vw, 38px)', color: 'var(--text-primary)',
                    lineHeight: 1.2, marginBottom: '16px',
                  }}>{feat.title}</h2>

                  <p style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '17px', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '24px' }}>
                    {feat.desc}
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px' }}>
                    {feat.bullets.map((b, j) => (
                      <div key={j} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                        <div style={{
                          width: '20px', height: '20px', borderRadius: '50%', flexShrink: 0, marginTop: '2px',
                          background: `${feat.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                          <CheckCircle size={12} style={{ color: feat.color }} />
                        </div>
                        <span style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{b}</span>
                      </div>
                    ))}
                  </div>

                  {feat.highlight && (
                    <a href="#chrome-extension" style={{
                      display: 'inline-flex', alignItems: 'center', gap: '8px',
                      padding: '12px 22px', borderRadius: '10px',
                      background: 'linear-gradient(135deg, #D43C33, #E09643)',
                      color: '#fff', textDecoration: 'none',
                      fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: '14px',
                      boxShadow: '0 4px 20px rgba(212,60,51,0.3)',
                    }}>🔌 Add to Chrome — Free</a>
                  )}
                </div>

                {/* Visual */}
                <div style={{ flex: '1 1 300px' }}>{feat.visual}</div>
              </div>
            </SectionReveal>
          );
        })}
      </div>

      {/* CTA */}
      <section style={{ padding: '80px 24px', background: 'var(--surface-1)' }}>
        <SectionReveal>
          <div style={{
            maxWidth: '700px', margin: '0 auto', textAlign: 'center',
            background: 'linear-gradient(135deg, rgba(212,60,51,0.08), rgba(224,150,67,0.06))',
            border: '1px solid rgba(212,60,51,0.2)', borderRadius: '24px', padding: 'clamp(40px, 5vw, 64px)',
          }}>
            <h2 style={{ fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: 'clamp(28px, 4vw, 40px)', color: 'var(--text-primary)', marginBottom: '16px' }}>
              Ready to apply smarter?
            </h2>
            <p style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '17px', color: 'var(--text-secondary)', marginBottom: '32px', lineHeight: 1.6 }}>
              Join thousands of students getting more interviews with fewer applications.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/" style={{
                padding: '14px 28px', borderRadius: '12px', border: 'none', cursor: 'pointer',
                background: 'linear-gradient(135deg, #D43C33, #E09643)', color: '#fff',
                fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: '15px',
                textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px',
                boxShadow: '0 4px 20px rgba(212,60,51,0.3)',
              }}>Start Free <ArrowRight size={16} /></Link>
              <Link to="/how-it-works" style={{
                padding: '14px 28px', borderRadius: '12px', border: '1px solid var(--border)',
                color: 'var(--text-primary)', fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: '15px',
                textDecoration: 'none', display: 'inline-flex', alignItems: 'center', background: 'var(--card-bg)',
              }}>See How It Works</Link>
            </div>
          </div>
        </SectionReveal>
      </section>

      <FinchFooter />

      {showModal && (
        <SignupModal
          onClose={() => setShowModal(false)}
          onSuccess={handleSignupSuccess}
          initialMode={authMode}
        />
      )}
    </div>
  );
}