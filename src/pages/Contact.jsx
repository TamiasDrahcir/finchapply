import { useState } from 'react';
import Navbar from '../components/Navbar';
import FinchFooter from '../components/FinchFooter';
import SignupModal from '../components/SignupModal';
import FinchFloatingIcon from '../components/FinchFloatingIcon';
import FinchChatBubble from '../components/FinchChatBubble';

export default function Contact() {
  const [form, setForm] = useState({ email: '', phone: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [authMode, setAuthMode] = useState('signup');

  const openSignupModal = () => { setAuthMode('signup'); setShowModal(true); };
  const openLoginModal = () => { setAuthMode('login'); setShowModal(true); };
  const handleSignupSuccess = () => {
    setShowModal(false);
    window.location.href = '/';
  };

  const validate = () => {
    const e = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Please enter a valid email';
    if (!form.message.trim()) e.message = 'Message is required';
    return e;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setSubmitted(true);
  };

  const inputStyle = (field) => ({
    width: '100%', height: field === 'message' ? 'auto' : '52px',
    padding: field === 'message' ? '16px 20px' : '0 20px',
    background: 'rgba(255,255,255,0.05)',
    border: `1px solid ${errors[field] ? '#D43C33' : 'rgba(212,212,212,0.15)'}`,
    borderRadius: '14px', color: '#F2F2F2',
    fontFamily: 'Nunito Sans, sans-serif', fontSize: '15px',
    outline: 'none', boxSizing: 'border-box',
    resize: field === 'message' ? 'vertical' : 'none',
    minHeight: field === 'message' ? '140px' : 'auto',
    transition: 'border-color 0.2s',
  });

  return (
    <div style={{ background: '#24364C', minHeight: '100vh' }}>
      <Navbar onGetAccess={openSignupModal} onSignIn={openLoginModal} />
      <div style={{ paddingTop: '96px', position: 'relative' }}>
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: '17vw',
            bottom: 'clamp(220px, 23vw, 320px)',
            transform: 'translateX(-50%)',
            width: 'clamp(360px, 40vw, 620px)',
            height: 'clamp(240px, 28vw, 420px)',
            zIndex: 0,
            pointerEvents: 'none',
          }}
        >
          <FinchFloatingIcon
            style={{
              position: 'absolute',
              left: 0,
              bottom: 0,
              transform: 'rotate(-15deg)',
              opacity: 0.48,
            }}
            imageStyle={{
              height: 'clamp(180px, 22vw, 360px)',
              width: 'auto',
            }}
          />
          <FinchChatBubble
            style={{
              left: '39%',
              bottom: '51%',
              transform: 'rotate(-8deg)',
              opacity: 0.92,
            }}
          />
        </div>
        <section style={{ padding: '100px 24px', maxWidth: '600px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', marginBottom: '52px' }}>
            <div className="eyebrow" style={{ justifyContent: 'center', display: 'flex' }}>GET IN TOUCH</div>
            <h1 style={{ fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: 'clamp(28px, 5vw, 48px)', color: '#F2F2F2', margin: '0 0 16px' }}>
              We'd love to hear from you.
            </h1>
            <p style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '16px', color: '#7A8FA0' }}>
              Questions, feedback, or partnership inquiries — we read every message.
            </p>
          </div>

          {submitted ? (
            <div style={{
              background: '#1A2A3A', borderRadius: '20px', padding: '48px',
              textAlign: 'center',
              border: '1px solid rgba(61,184,122,0.3)',
              animation: 'slideUp 0.4s ease',
            }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎉</div>
              <div style={{ fontFamily: 'Sora, sans-serif', fontSize: '22px', color: '#F2F2F2', fontWeight: 700, marginBottom: '8px' }}>
                Message received!
              </div>
              <div style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '15px', color: '#7A8FA0' }}>
                We'll get back to you within 24 hours.
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ background: '#1A2A3A', borderRadius: '20px', padding: '40px', border: '1px solid rgba(255,255,255,0.06)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '13px', color: '#7A8FA0', letterSpacing: '1px', display: 'block', marginBottom: '8px' }}>EMAIL *</label>
                <input
                  type="email" placeholder="you@university.edu"
                  value={form.email}
                  onChange={e => { setForm(f => ({ ...f, email: e.target.value })); setErrors(er => ({ ...er, email: '' })); }}
                  style={inputStyle('email')}
                />
                {errors.email && <div style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '12px', color: '#D43C33', marginTop: '4px' }}>{errors.email}</div>}
              </div>

              <div>
                <label style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '13px', color: '#7A8FA0', letterSpacing: '1px', display: 'block', marginBottom: '8px' }}>PHONE NUMBER <span style={{ color: '#7A8FA0', fontSize: '11px' }}>(optional)</span></label>
                <input
                  type="tel" placeholder="+1 (555) 000-0000"
                  value={form.phone}
                  onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                  style={inputStyle('phone')}
                />
              </div>

              <div>
                <label style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '13px', color: '#7A8FA0', letterSpacing: '1px', display: 'block', marginBottom: '8px' }}>MESSAGE / QUESTIONS / CONCERNS *</label>
                <textarea
                  placeholder="Tell us what's on your mind..."
                  value={form.message}
                  onChange={e => { setForm(f => ({ ...f, message: e.target.value })); setErrors(er => ({ ...er, message: '' })); }}
                  style={inputStyle('message')}
                />
                {errors.message && <div style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '12px', color: '#D43C33', marginTop: '4px' }}>{errors.message}</div>}
              </div>

              <button type="submit" className="btn-primary" style={{ height: '52px', fontSize: '15px', width: '100%' }}>
                Send Message →
              </button>
            </form>
          )}
        </section>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <FinchFooter />
        </div>
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