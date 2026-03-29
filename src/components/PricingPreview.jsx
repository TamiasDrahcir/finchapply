import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';

export default function PricingPreview() {
  return (
    <section id="pricing" style={{ padding: '100px 24px', background: 'var(--surface-1)' }}>
      <div style={{ maxWidth: '960px', margin: '0 auto', textAlign: 'center' }}>
        <div className="eyebrow">PRICING</div>
        <h2 style={{ fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: 'clamp(28px, 4vw, 48px)', color: 'var(--text-primary)', lineHeight: 1.15, marginBottom: '16px' }}>
          Start free.<br />Upgrade when you're landing interviews.
        </h2>
        <p style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '17px', color: 'var(--text-secondary)', marginBottom: '48px' }}>
          No credit card required. Student-friendly pricing.
        </p>

        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '32px' }}>
          {/* Free */}
          <div style={{
            flex: '1 1 260px', maxWidth: '320px',
            background: 'var(--card-bg)', border: '1px solid var(--border)',
            borderRadius: '20px', padding: '32px 28px',
          }}>
            <div style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '12px', color: 'var(--text-tertiary)', letterSpacing: '2px', marginBottom: '10px' }}>STARTER</div>
            <div style={{ fontFamily: 'Sora, sans-serif', fontSize: '44px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '24px' }}>$0<span style={{ fontSize: '16px', color: 'var(--text-tertiary)', fontWeight: 400 }}>/mo</span></div>
            {['5 AI-tailored apps/month', 'Resume optimizer', 'Cover letter gen', 'Application tracker'].map(f => (
              <div key={f} style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '10px' }}>
                <Check size={14} style={{ color: '#3DB87A', flexShrink: 0 }} />
                <span style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '14px', color: 'var(--text-secondary)' }}>{f}</span>
              </div>
            ))}
          </div>

          {/* Pro */}
          <div style={{
            flex: '1 1 260px', maxWidth: '320px',
            background: 'var(--card-bg)',
            border: '2px solid #D43C33',
            borderRadius: '20px', padding: '32px 28px',
            position: 'relative',
            boxShadow: '0 0 32px rgba(212,60,51,0.12)',
          }}>
            <div style={{ position: 'absolute', top: '-13px', left: '50%', transform: 'translateX(-50%)', background: '#D43C33', borderRadius: '999px', padding: '4px 14px', fontFamily: 'Nunito Sans, sans-serif', fontSize: '11px', color: '#fff', fontWeight: 700, whiteSpace: 'nowrap' }}>MOST POPULAR</div>
            <div style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '12px', color: 'var(--text-tertiary)', letterSpacing: '2px', marginBottom: '10px' }}>PRO</div>
            <div style={{ fontFamily: 'Sora, sans-serif', fontSize: '44px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '24px' }}>$12<span style={{ fontSize: '16px', color: 'var(--text-tertiary)', fontWeight: 400 }}>/mo</span></div>
            {['Unlimited AI-tailored apps', 'All ATS platform autofill', 'Analytics dashboard', 'Priority support'].map(f => (
              <div key={f} style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '10px' }}>
                <Check size={14} style={{ color: '#3DB87A', flexShrink: 0 }} />
                <span style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '14px', color: 'var(--text-secondary)' }}>{f}</span>
              </div>
            ))}
          </div>
        </div>

        <Link to="/pricing">
          <button style={{
            padding: '14px 32px', borderRadius: '12px',
            border: 'none',
            background: 'linear-gradient(135deg, #D43C33, #E09643)',
            fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: '15px',
            color: '#fff', cursor: 'pointer',
            boxShadow: '0 4px 20px rgba(212,60,51,0.3)',
            transition: 'all 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = '#D43C33'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = '#D43C33'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.borderColor = 'var(--border)'; }}
          >
            See Full Pricing →
          </button>
        </Link>
      </div>
    </section>
  );
}