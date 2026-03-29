export default function PricingSection({ onGetAccess }) {
  const starterFeatures = [
    '5 AI-tailored applications per month',
    'Resume keyword optimizer',
    'Basic cover letter generation',
    'Chrome extension (limited)',
    'Application tracker',
  ];
  const proFeatures = [
    'Unlimited AI-tailored applications',
    'Advanced resume rewriting',
    'Premium cover letter generation',
    'Full autofill — all ATS platforms',
    'Interview probability score',
    'Application pipeline analytics',
    'Priority support',
  ];

  return (
    <section id="pricing" style={{ padding: '100px 24px', background: '#24364C' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
        <div className="eyebrow">PRICING</div>
        <h2 style={{ fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: 'clamp(28px, 4vw, 44px)', color: '#F2F2F2', lineHeight: 1.2, marginBottom: '60px' }}>
          Start free. Upgrade when<br />you're getting interviews.
        </h2>

        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '24px' }}>
          {/* Starter */}
          <div style={{
            flex: '1 1 300px', maxWidth: '380px',
            background: '#1A2A3A', borderRadius: '20px',
            border: '1px solid rgba(255,255,255,0.06)',
            padding: '36px 32px',
          }}>
            <div style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '12px', color: '#7A8FA0', letterSpacing: '2px', marginBottom: '12px' }}>STARTER</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '8px' }}>
              <span style={{ fontFamily: 'Sora, sans-serif', fontSize: '48px', fontWeight: 700, color: '#F2F2F2' }}>$0</span>
              <span style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '16px', color: '#7A8FA0' }}>/month</span>
            </div>
            <div style={{
              display: 'inline-block', background: 'rgba(122,143,160,0.15)',
              borderRadius: '999px', padding: '4px 14px', marginBottom: '28px',
              fontFamily: 'Nunito Sans, sans-serif', fontSize: '12px', color: '#7A8FA0',
            }}>No credit card needed</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px', display: 'flex', flexDirection: 'column', gap: '12px', textAlign: 'left' }}>
              {starterFeatures.map((f, i) => (
                <li key={i} style={{ display: 'flex', gap: '10px', fontFamily: 'Nunito Sans, sans-serif', fontSize: '15px', color: '#D4D4D4' }}>
                  <span style={{ color: '#3DB87A', flexShrink: 0 }}>✓</span>{f}
                </li>
              ))}
            </ul>
            <button className="btn-secondary" style={{ width: '100%', height: '52px', fontSize: '15px' }}>Get Started Free →</button>
          </div>

          {/* Pro */}
          <div style={{
            flex: '1 1 300px', maxWidth: '380px',
            background: '#1A2A3A', borderRadius: '20px',
            border: '1.5px solid transparent',
            backgroundClip: 'padding-box',
            padding: '36px 32px',
            position: 'relative',
            boxShadow: '0 0 40px rgba(212,60,51,0.2)',
            outline: '1.5px solid',
            outlineColor: '#D43C33',
          }}>
            <div style={{
              position: 'absolute', top: '16px', right: '16px',
              background: 'rgba(224,150,67,0.2)', borderRadius: '999px',
              padding: '4px 12px',
              fontFamily: 'Nunito Sans, sans-serif', fontSize: '11px', color: '#E09643', fontWeight: 600,
            }}>MOST POPULAR</div>
            <div style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '12px', color: '#7A8FA0', letterSpacing: '2px', marginBottom: '12px' }}>PRO</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '36px' }}>
              <span style={{ fontFamily: 'Sora, sans-serif', fontSize: '48px', fontWeight: 700, color: '#F2F2F2' }}>$12</span>
              <span style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '16px', color: '#7A8FA0' }}>/month</span>
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px', display: 'flex', flexDirection: 'column', gap: '12px', textAlign: 'left' }}>
              {proFeatures.map((f, i) => (
                <li key={i} style={{ display: 'flex', gap: '10px', fontFamily: 'Nunito Sans, sans-serif', fontSize: '15px', color: '#D4D4D4' }}>
                  <span style={{ color: '#3DB87A', flexShrink: 0 }}>✓</span>{f}
                </li>
              ))}
            </ul>
            <button onClick={onGetAccess} className="btn-primary" style={{ width: '100%', height: '52px', fontSize: '15px' }}>
              Start 7-Day Free Trial →
            </button>
          </div>
        </div>

        <div style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '13px', color: '#7A8FA0' }}>
          Cancel anytime · No hidden fees · Student-friendly pricing
        </div>
      </div>
    </section>
  );
}