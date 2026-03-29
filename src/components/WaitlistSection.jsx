import { useState, useRef } from 'react';
import { createWaitlistSignup } from '@/api/waitlistSignup';

export default function WaitlistSection() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | duplicate | auth | error
  const [shake, setShake] = useState(false);
  const inputRef = useRef(null);

  const validate = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate(email)) {
      triggerShake();
      return;
    }
    setStatus('loading');
    try {
      const result = await createWaitlistSignup({ email });
      if (result.duplicate) {
        setStatus('duplicate');
        return;
      }
      setStatus('success');
    } catch (error) {
      const message = String(error?.message || '');
      if (message.includes('logged in') || message.includes('auth_required')) {
        setStatus('auth');
        return;
      }
      setStatus('error');
    }
  };

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 600);
  };

  return (
    <section id="waitlist" style={{
      padding: '120px 24px',
      background: 'var(--surface-1)',
      position: 'relative',
      overflow: 'hidden',
      textAlign: 'center',
    }}>
      {/* Radial glow */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%,-50%)',
        width: '600px', height: '400px',
        background: 'radial-gradient(ellipse, rgba(212,60,51,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', maxWidth: '700px', margin: '0 auto' }}>
        <h2 style={{ fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: 'clamp(32px, 6vw, 56px)', color: '#F2F2F2', lineHeight: 1.15, marginBottom: '20px' }}>
          Get more interviews.<br />Start in 60 seconds.
        </h2>

        <p style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '20px', color: '#D4D4D4', marginBottom: '44px' }}>
          Join{' '}
          <span style={{ color: '#E09643', fontWeight: 700 }}>4,000+</span>
          {' '}students already on the waitlist.
        </p>

        {/* Form / Success */}
        <div style={{ position: 'relative', minHeight: '80px' }}>
          {status === 'success' ? (
            <div style={{ animation: 'slideUp 0.4s ease' }}>
              <div style={{ fontFamily: 'Sora, sans-serif', fontSize: '22px', color: 'var(--text-primary)', marginBottom: '20px' }}>🎉 You're on the list! We'll be in touch soon.</div>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent("Just joined @getfinchapp — AI that tailors my resume and autofills internship applications in 60 seconds. Check it out:")}`} target="_blank" rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '10px 18px', borderRadius: '10px', background: '#1DA1F2', color: '#fff', textDecoration: 'none', fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: '14px' }}>
                  🐦 Share on X
                </a>
                <button onClick={() => { if (navigator.share) navigator.share({ title: 'Finch', text: 'AI internship apps in 60s', url: window.location.origin }); }} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '10px 18px', borderRadius: '10px', border: '1px solid var(--border)', background: 'none', color: 'var(--text-primary)', cursor: 'pointer', fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: '14px' }}>
                  📤 Share with a friend
                </button>
              </div>
            </div>
          ) : status === 'duplicate' ? (
            <div style={{ fontFamily: 'Sora, sans-serif', fontSize: '20px', color: '#E09643' }}>
              You're already on the list! We'll be in touch soon.
            </div>
          ) : status === 'auth' ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px' }}>
              <div style={{ fontFamily: 'Sora, sans-serif', fontSize: '20px', color: '#E09643' }}>
                Waitlist signup is temporarily unavailable while backend auth is enabled.
              </div>
              <div style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '14px', color: 'var(--text-secondary)' }}>
                No login is required on this page. Please try again shortly.
              </div>
            </div>
          ) : status === 'error' ? (
            <div style={{ fontFamily: 'Sora, sans-serif', fontSize: '20px', color: '#D43C33' }}>
              Something went wrong. Please try again in a moment.
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={{
                display: 'flex', maxWidth: '560px', margin: '0 auto',
                flexWrap: 'wrap', gap: '0',
                animation: shake ? 'shake 0.5s ease' : 'none',
              }}>
                <input
                  ref={inputRef}
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Enter your university email"
                  style={{
                    flex: '1 1 240px',
                    height: '52px', padding: '0 20px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(212,212,212,0.15)',
                    borderRight: 'none',
                    borderRadius: '999px 0 0 999px',
                    color: '#F2F2F2',
                    fontFamily: 'Nunito Sans, sans-serif', fontSize: '15px',
                    outline: 'none',
                    minWidth: '200px',
                  }}
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  style={{
                    height: '52px', padding: '0 28px',
                    background: '#D43C33',
                    border: 'none',
                    borderRadius: '0 999px 999px 0',
                    color: '#fff',
                    fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: '15px',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'background 0.2s',
                    minWidth: '180px',
                  }}
                >{status === 'loading' ? 'Joining...' : 'Get Early Access →'}</button>
              </div>

              {/* Mobile stack fallback handled via flex-wrap */}
            </form>
          )}
        </div>

        <div style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '13px', color: '#7A8FA0', marginTop: '20px' }}>
          🔒 No spam — just product updates and your early access invite
        </div>
      </div>
    </section>
  );
}