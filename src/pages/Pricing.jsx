import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import FinchFooter from '../components/FinchFooter';
import { Check } from 'lucide-react';
import SignupModal from '../components/SignupModal';

const plans = [
  {
    name: 'Starter',
    price: '$0',
    per: '/month',
    badge: null,
    desc: 'Perfect for testing the waters and getting your first interviews.',
    features: [
      '5 AI-tailored applications per month',
      'Resume keyword optimizer',
      'Basic cover letter generation',
      'Chrome extension (limited)',
      'Application tracker',
      'Email support',
    ],
    cta: 'Get Started Free',
    primary: false,
  },
  {
    name: 'Pro',
    price: '$12',
    per: '/month',
    badge: 'MOST POPULAR',
    desc: 'For students serious about landing internships this season.',
    features: [
      'Unlimited AI-tailored applications',
      'Advanced resume rewriting',
      'Premium cover letter generation',
      'Full autofill — all ATS platforms',
      'Interview probability score',
      'Application pipeline analytics',
      'Performance insights dashboard',
      'Priority support',
    ],
    cta: 'Start 7-Day Free Trial',
    primary: true,
  },
  {
    name: 'Team',
    price: '$29',
    per: '/month',
    badge: null,
    desc: 'For university clubs, bootcamps, or small groups applying together.',
    features: [
      'Everything in Pro',
      'Up to 5 team members',
      'Shared application dashboard',
      'Admin controls',
      'Group analytics',
      'Dedicated onboarding',
    ],
    cta: 'Contact Us',
    primary: false,
  },
];

const freeVsPro = [
  { feature: 'AI-tailored applications', free: '5/month', pro: 'Unlimited' },
  { feature: 'Resume rewriting', free: 'Basic', pro: 'Advanced' },
  { feature: 'Cover letter generation', free: '✓', pro: '✓ Premium' },
  { feature: 'Chrome extension autofill', free: 'Limited', pro: 'All ATS platforms' },
  { feature: 'Application tracker', free: '✓', pro: '✓' },
  { feature: 'Performance analytics', free: '✗', pro: '✓' },
  { feature: 'Interview probability score', free: '✗', pro: '✓' },
  { feature: 'Priority support', free: '✗', pro: '✓' },
];

export default function Pricing() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [authMode, setAuthMode] = useState('signup');

  const openSignupModal = () => { setAuthMode('signup'); setShowModal(true); };
  const openLoginModal = () => { setAuthMode('login'); setShowModal(true); };
  const handleSignupSuccess = () => {
    setShowModal(false);
    navigate('/', { state: { scrollToTop: Date.now() } });
  };

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <Navbar onGetAccess={openSignupModal} onSignIn={openLoginModal} />
      <div style={{ paddingTop: '96px' }}>

        {/* Hero */}
        <section style={{ padding: '80px 24px 60px', textAlign: 'center', background: 'var(--surface-1)' }}>
          <div style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '12px', color: '#D43C33', letterSpacing: '2px', fontWeight: 700, marginBottom: '16px' }}>PRICING</div>
          <h1 style={{ fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: 'clamp(32px, 5vw, 60px)', color: 'var(--text-primary)', lineHeight: 1.1, marginBottom: '16px' }}>
            Start free.<br />
            Upgrade when you're{' '}
            <span style={{ background: 'linear-gradient(90deg, #D43C33, #E09643)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              getting interviews.
            </span>
          </h1>
          <p style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '18px', color: 'var(--text-secondary)', maxWidth: '480px', margin: '0 auto' }}>
            No credit card required to start. Cancel anytime.
          </p>
        </section>

        {/* Plans */}
        <section style={{ padding: '60px 24px', maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '60px' }}>
            {plans.map((plan, i) => (
              <div key={i} style={{
                flex: '1 1 280px', maxWidth: '340px',
                background: plan.primary ? 'var(--card-bg)' : 'var(--card-bg)',
                borderRadius: '24px',
                border: plan.primary ? '2px solid #D43C33' : '1px solid var(--border)',
                padding: '36px 30px',
                position: 'relative',
                boxShadow: plan.primary ? '0 0 40px rgba(212,60,51,0.15)' : 'none',
              }}>
                {plan.badge && (
                  <div style={{
                    position: 'absolute', top: '-13px', left: '50%', transform: 'translateX(-50%)',
                    background: '#D43C33', borderRadius: '999px', padding: '4px 16px',
                    fontFamily: 'Nunito Sans, sans-serif', fontSize: '11px', color: '#fff', fontWeight: 700, whiteSpace: 'nowrap',
                  }}>{plan.badge}</div>
                )}
                <div style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '12px', color: 'var(--text-tertiary)', letterSpacing: '2px', marginBottom: '10px' }}>{plan.name.toUpperCase()}</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '8px' }}>
                  <span style={{ fontFamily: 'Sora, sans-serif', fontSize: '52px', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1 }}>{plan.price}</span>
                  <span style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '16px', color: 'var(--text-tertiary)' }}>{plan.per}</span>
                </div>
                <p style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '28px', lineHeight: 1.5 }}>{plan.desc}</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {plan.features.map((f, j) => (
                    <li key={j} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                      <Check size={15} style={{ color: '#3DB87A', flexShrink: 0, marginTop: '2px' }} />
                      <span style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '14px', color: 'var(--text-secondary)' }}>{f}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={openSignupModal}
                  style={{
                    width: '100%', height: '50px',
                    borderRadius: '12px', border: plan.primary ? 'none' : '1.5px solid var(--border)',
                    background: plan.primary ? '#D43C33' : 'none',
                    color: plan.primary ? '#fff' : 'var(--text-primary)',
                    fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: '15px',
                    cursor: 'pointer', transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => { if (!plan.primary) { e.currentTarget.style.background = '#D43C33'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = '#D43C33'; } else e.currentTarget.style.background = '#b83029'; }}
                  onMouseLeave={e => { if (!plan.primary) { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.borderColor = 'var(--border)'; } else e.currentTarget.style.background = '#D43C33'; }}
                >
                  {plan.cta} →
                </button>
              </div>
            ))}
          </div>

          {/* Comparison table */}
          <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: '20px', overflow: 'hidden' }}>
            <div style={{ padding: '28px 32px', borderBottom: '1px solid var(--border)' }}>
              <div style={{ fontFamily: 'Sora, sans-serif', fontSize: '20px', color: 'var(--text-primary)', fontWeight: 700 }}>Free vs Pro — Full Comparison</div>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: 'var(--surface-2)' }}>
                    <th style={{ padding: '14px 32px', textAlign: 'left', fontFamily: 'Nunito Sans, sans-serif', fontSize: '13px', color: 'var(--text-tertiary)', fontWeight: 600 }}>Feature</th>
                    <th style={{ padding: '14px 24px', textAlign: 'center', fontFamily: 'Nunito Sans, sans-serif', fontSize: '13px', color: 'var(--text-tertiary)', fontWeight: 600 }}>Free</th>
                    <th style={{ padding: '14px 24px', textAlign: 'center', fontFamily: 'Nunito Sans, sans-serif', fontSize: '13px', color: '#D43C33', fontWeight: 700 }}>Pro</th>
                  </tr>
                </thead>
                <tbody>
                  {freeVsPro.map((row, i) => (
                    <tr key={i} style={{ borderTop: '1px solid var(--border)' }}>
                      <td style={{ padding: '14px 32px', fontFamily: 'Nunito Sans, sans-serif', fontSize: '14px', color: 'var(--text-primary)' }}>{row.feature}</td>
                      <td style={{ padding: '14px 24px', textAlign: 'center', fontFamily: 'JetBrains Mono, monospace', fontSize: '13px', color: row.free === '✗' ? 'var(--text-tertiary)' : 'var(--text-secondary)' }}>{row.free}</td>
                      <td style={{ padding: '14px 24px', textAlign: 'center', fontFamily: 'JetBrains Mono, monospace', fontSize: '13px', color: '#3DB87A', fontWeight: row.pro.includes('✓') || row.pro === 'Unlimited' ? 700 : 400 }}>{row.pro}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Footer note */}
          <p style={{ textAlign: 'center', marginTop: '32px', fontFamily: 'Nunito Sans, sans-serif', fontSize: '14px', color: 'var(--text-tertiary)' }}>
            Cancel anytime · No hidden fees · Student-friendly pricing · Free tier stays free forever
          </p>
        </section>

        <FinchFooter />
      </div>

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