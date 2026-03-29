import { useEffect, useRef, useState } from 'react';
import Navbar from '../components/Navbar';
import FinchFooter from '../components/FinchFooter';
import { Link } from 'react-router-dom';
import { Search, Cpu, FileText, CheckSquare, Chrome, BarChart2, ArrowRight, Zap } from 'lucide-react';
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

const STEPS = [
  {
    num: '01',
    icon: Search,
    color: '#D43C33',
    title: 'Search once. Target many.',
    desc: 'Paste a LinkedIn search URL or describe the role you want. Set your job count target — 5, 10, or 15. Finch does the rest.',
    detail: 'Traditional job hunting means opening 20 tabs, copying 20 JDs, and applying to all of them with the same resume. Finch collapses that entire process into a single search prompt.',
    tag: '10 SECONDS',
  },
  {
    num: '02',
    icon: Cpu,
    color: '#E09643',
    title: 'Finch identifies your best matches.',
    desc: 'Using your profile and the job descriptions, Finch scores and ranks roles by your personal fit score — so you\'re only applying where you have a real shot.',
    detail: 'Fit scoring considers your experience level, tech stack, location, and past success patterns. You\'ll never waste a tailored application on a role you\'re not qualified for.',
    tag: 'AI MATCHING',
  },
  {
    num: '03',
    icon: FileText,
    color: '#9B7FE8',
    title: 'Your resume rewrites itself.',
    desc: 'For each role, Finch takes your base profile and rewrites every bullet point, section header, and keyword to align with that specific job description.',
    detail: 'ATS systems reject 75% of resumes before a human sees them. Finch optimizes for ATS pass-through first, then for recruiter impact second. You\'ll see a score before it goes out.',
    tag: 'ATS OPTIMIZED',
  },
  {
    num: '04',
    icon: Zap,
    color: '#3DB87A',
    title: 'Cover letter in seconds, not hours.',
    desc: 'A personalized, role-specific cover letter is generated for each application — referencing the company name, the team, and your most relevant experiences.',
    detail: 'Generic cover letters are a waste of time. Finch writes in your voice, pulls specific details from the JD, and keeps it under 300 words. Compelling, concise, and human-sounding.',
    tag: 'PERSONALIZED',
  },
  {
    num: '05',
    icon: CheckSquare,
    color: '#D43C33',
    title: 'Review, refine, and apply.',
    desc: 'A clean application card shows you the resume, cover letter, ATS score, and apply link all in one place. Download, review, or send directly.',
    detail: 'You stay in control. Every application is a clean card with all the assets in one place. One click to apply. No copy-pasting between tabs. No formatting nightmares.',
    tag: 'ONE CARD',
  },
  {
    num: '06',
    icon: Chrome,
    color: '#E09643',
    title: 'Chrome extension autofills the form.',
    desc: 'When you land on a Greenhouse, Lever, or Workday page, the Finch extension detects the form and fills every field with your tailored profile instantly.',
    detail: 'The average application form takes 25 minutes. With Finch, it\'s under 60 seconds. The extension shows your ATS score as an overlay — so you know before you click submit.',
    tag: '60 SECONDS',
  },
  {
    num: '07',
    icon: BarChart2,
    color: '#9B7FE8',
    title: 'Track, learn, improve.',
    desc: 'Your analytics dashboard shows what\'s working. Response rates, ghost detection, funnel drop-off — all tracked automatically so your next batch is even better.',
    detail: 'Most students apply blindly. Finch turns your application history into a feedback loop. See which roles respond, which companies ghost, and which keywords are driving callbacks.',
    tag: 'ANALYTICS',
  },
];

const WHY_ITEMS = [
  { label: 'Relevance over volume', desc: 'A targeted application beats 10 generic ones. Every time.', icon: '🎯' },
  { label: 'ATS pass-through', desc: '75% of resumes are filtered before a human sees them. Finch fixes this.', icon: '🤖' },
  { label: 'Time efficiency', desc: 'Applications that used to take 30 min now take under 60 seconds.', icon: '⚡' },
  { label: 'Higher interview rate', desc: 'Beta users saw 3.2x more callbacks vs. unoptimized applications.', icon: '📈' },
];

function StepCard({ step, index }) {
  const [ref, inView] = useInView(0.15);
  const Icon = step.icon;
  const isEven = index % 2 === 1;

  return (
    <div ref={ref} style={{
      display: 'flex', gap: '40px', alignItems: 'flex-start',
      flexDirection: isEven ? 'row-reverse' : 'row', flexWrap: 'wrap',
      padding: '48px 0',
      borderBottom: '1px solid var(--border)',
      opacity: inView ? 1 : 0,
      transform: inView ? 'translateX(0)' : `translateX(${isEven ? 24 : -24}px)`,
      transition: 'opacity 0.6s ease, transform 0.6s ease',
    }}>
      {/* Step number + icon */}
      <div style={{ flex: '0 0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', paddingTop: '4px' }}>
        <div style={{
          width: '56px', height: '56px', borderRadius: '16px',
          background: `${step.color}15`, border: `1.5px solid ${step.color}30`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          <Icon size={24} style={{ color: step.color }} />
        </div>
        <div style={{
          fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: step.color,
          background: `${step.color}12`, borderRadius: '6px', padding: '3px 8px', fontWeight: 700,
        }}>{step.tag}</div>
      </div>

      {/* Content */}
      <div style={{ flex: '1 1 300px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '13px', color: 'var(--text-tertiary)' }}>{step.num}</span>
          <h3 style={{ fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: 'clamp(20px, 2.5vw, 28px)', color: 'var(--text-primary)', margin: 0 }}>{step.title}</h3>
        </div>
        <p style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '17px', color: 'var(--text-primary)', lineHeight: 1.6, marginBottom: '12px', fontWeight: 600 }}>
          {step.desc}
        </p>
        <p style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>
          {step.detail}
        </p>
      </div>
    </div>
  );
}

export default function HowItWorks() {
  const [heroRef, heroInView] = useInView(0.05);
  const [whyRef, whyInView] = useInView(0.1);
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
          transform: heroInView ? 'translateY(0)' : 'translateY(28px)',
          transition: 'opacity 0.7s ease, transform 0.7s ease',
        }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(212,60,51,0.1)', border: '1px solid rgba(212,60,51,0.25)',
            borderRadius: '999px', padding: '7px 18px', marginBottom: '28px',
            fontFamily: 'Sora, sans-serif', fontSize: '12px', color: '#D43C33', fontWeight: 700,
          }}>✦ HOW IT WORKS</div>

          <h1 style={{
            fontFamily: 'Sora, sans-serif', fontWeight: 700,
            fontSize: 'clamp(36px, 6vw, 68px)', lineHeight: 1.1,
            color: 'var(--text-primary)', marginBottom: '20px', maxWidth: '820px', margin: '0 auto 20px',
          }}>
            From search to submitted.<br />
            <span style={{ background: 'linear-gradient(90deg, #D43C33, #E09643)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Under 60 seconds.
            </span>
          </h1>

          <p style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: 'clamp(16px, 2vw, 18px)', color: 'var(--text-secondary)', maxWidth: '500px', margin: '0 auto 40px', lineHeight: 1.7 }}>
            A complete breakdown of how Finch handles your application from first keyword to final submission.
          </p>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => document.getElementById('steps')?.scrollIntoView({ behavior: 'smooth' })} style={{
              padding: '13px 28px', borderRadius: '12px', border: 'none', cursor: 'pointer',
              background: 'linear-gradient(135deg, #D43C33, #E09643)', color: '#fff',
              fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: '15px',
              boxShadow: '0 4px 20px rgba(212,60,51,0.3)',
            }}>Walk Me Through It →</button>
            <Link to="/features" style={{
              padding: '13px 28px', borderRadius: '12px', border: '1px solid var(--border)',
              color: 'var(--text-primary)', fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: '15px',
              textDecoration: 'none', display: 'inline-flex', alignItems: 'center', background: 'var(--card-bg)',
            }}>See All Features</Link>
          </div>
        </div>
      </section>

      {/* Quick stats */}
      <section style={{ padding: '0 24px 80px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {[
            { val: '7', label: 'Steps from search to submitted' },
            { val: '60s', label: 'Average time per application' },
            { val: '3.2×', label: 'More interview callbacks' },
            { val: '94%', label: 'Average ATS score achieved' },
          ].map((s, i) => (
            <div key={i} style={{
              flex: '1 1 160px', background: 'var(--card-bg)', border: '1px solid var(--border)',
              borderRadius: '16px', padding: '20px', textAlign: 'center',
            }}>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '28px', fontWeight: 700, background: 'linear-gradient(135deg, #D43C33, #E09643)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', marginBottom: '6px' }}>{s.val}</div>
              <div style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Steps */}
      <section id="steps" style={{ padding: '0 24px 80px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <div className="eyebrow">THE WORKFLOW</div>
            <h2 style={{ fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: 'clamp(28px, 4vw, 44px)', color: 'var(--text-primary)' }}>
              7 steps. One engine.
            </h2>
          </div>
          {STEPS.map((step, i) => <StepCard key={i} step={step} index={i} />)}
        </div>
      </section>

      {/* Why Finch section */}
      <section style={{ padding: '80px 24px', background: 'var(--surface-1)' }}>
        <div ref={whyRef} style={{ maxWidth: '1060px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '52px' }}>
            <div className="eyebrow">WHY IT WORKS</div>
            <h2 style={{ fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: 'clamp(28px, 4vw, 44px)', color: 'var(--text-primary)' }}>
              Relevance beats volume.<br />Every single time.
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
            {WHY_ITEMS.map((item, i) => (
              <div key={i} style={{
                background: 'var(--card-bg)', border: '1px solid var(--border)',
                borderRadius: '20px', padding: '28px 24px',
                opacity: whyInView ? 1 : 0,
                transform: whyInView ? 'translateY(0)' : 'translateY(24px)',
                transition: `opacity 0.6s ${i * 100}ms ease, transform 0.6s ${i * 100}ms ease`,
              }}>
                <div style={{ fontSize: '32px', marginBottom: '16px' }}>{item.icon}</div>
                <div style={{ fontFamily: 'Sora, sans-serif', fontSize: '17px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>{item.label}</div>
                <p style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: 'clamp(28px, 4vw, 44px)', color: 'var(--text-primary)', marginBottom: '16px' }}>
            Ready to try it yourself?
          </h2>
          <p style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '17px', color: 'var(--text-secondary)', marginBottom: '32px' }}>
            Start with 5 free AI applications per month. No credit card required.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/" style={{
              padding: '14px 28px', borderRadius: '12px', textDecoration: 'none',
              background: 'linear-gradient(135deg, #D43C33, #E09643)', color: '#fff',
              fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: '15px',
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              boxShadow: '0 4px 20px rgba(212,60,51,0.3)',
            }}>Start Free <ArrowRight size={16} /></Link>
            <Link to="/features" style={{
              padding: '14px 28px', borderRadius: '12px', border: '1px solid var(--border)',
              color: 'var(--text-primary)', fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: '15px',
              textDecoration: 'none', display: 'inline-flex', alignItems: 'center', background: 'var(--card-bg)',
            }}>See Features</Link>
          </div>
        </div>
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