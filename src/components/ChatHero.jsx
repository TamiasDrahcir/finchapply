import { useState, useRef } from 'react';
import { ArrowUp } from 'lucide-react';

const QUICK_OPTS = ['5 jobs', '10 jobs', '15 jobs'];

export default function ChatHero({ onPromptSubmit }) {
  const [input, setInput] = useState('');
  const [selected, setSelected] = useState('10 jobs');
  const inputRef = useRef(null);

  const handleSubmit = () => {
    if (!input.trim()) return;
    onPromptSubmit?.(input, selected);
    setInput('');
  };

  return (
    <section style={{
      minHeight: '92vh',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '100px 24px 60px',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Subtle radial glow */}
      <div style={{
        position: 'absolute', top: '40%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '700px', height: '400px',
        background: 'radial-gradient(ellipse, rgba(212,60,51,0.07) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Eyebrow */}
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: '8px',
        background: 'linear-gradient(135deg, rgba(212,60,51,0.12), rgba(224,150,67,0.08))',
        border: '1px solid rgba(212,60,51,0.3)',
        borderRadius: '999px', padding: '7px 18px', marginBottom: '32px',
        fontFamily: 'Sora, sans-serif', fontSize: '12px',
        color: '#D43C33', fontWeight: 700, letterSpacing: '0.5px',
      }}>
        ✦ AI-Powered Internship Applications
      </div>

      {/* Headline */}
      <h1 style={{
        fontFamily: 'Sora, sans-serif', fontWeight: 700,
        fontSize: 'clamp(40px, 7vw, 80px)',
        lineHeight: 1.08, marginBottom: '20px',
        color: 'var(--text-primary)',
        maxWidth: '820px',
        animation: 'heroReveal 0.9s cubic-bezier(0.22,1,0.36,1) both',
      }}>
        <span style={{ display: 'block', animation: 'heroLine1 0.8s cubic-bezier(0.22,1,0.36,1) 0.05s both' }}>Turn Applications</span>
        <span style={{ display: 'block' }}>
          <span style={{ display: 'inline-block', animation: 'heroWipe 0.67s cubic-bezier(0.22,1,0.36,1) 0.2s both', clipPath: 'inset(0 100% 0 0)' }}>
            Into{' '}
          </span>
          <span style={{
            display: 'inline-block',
            animation: 'heroWipe 0.48s cubic-bezier(0.22,1,0.36,1) 0.7s both',
            clipPath: 'inset(0 100% 0 0)',
            fontStyle: 'italic',
            background: 'linear-gradient(90deg, #D43C33, #E09643)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>Interviews.</span>
        </span>
      </h1>
      <style>{`
        @keyframes heroLine1 {
          from { opacity: 0; transform: translateY(28px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes heroLine2 {
          from { opacity: 0; transform: translateY(28px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes heroWipe {
          from { clip-path: inset(0 100% 0 0); opacity: 0.6; }
          to { clip-path: inset(0 0 0 0); opacity: 1; }
        }
      `}</style>

      {/* Subtitle */}
      <p style={{
        fontFamily: 'Nunito Sans, sans-serif', fontSize: 'clamp(16px, 2vw, 19px)',
        color: 'var(--text-secondary)', maxWidth: '460px', lineHeight: 1.6,
        marginBottom: '40px',
        animation: 'heroLine2 0.8s cubic-bezier(0.22,1,0.36,1) 0.35s both',
      }}>
        AI-tailored applications in under 60 seconds. Target smarter. Hear back more.
      </p>

      {/* Search box */}
      <div style={{
        width: '100%', maxWidth: '620px',
        background: 'var(--surface-2)',
        border: '1px solid var(--border)',
        borderRadius: '18px',
        padding: '16px 20px',
        boxShadow: '0 8px 40px rgba(0,0,0,0.15)',
        position: 'relative',
      }}>
        <input
          ref={inputRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSubmit()}
          placeholder="Search for jobs — enter keywords or a LinkedIn job search URL"
          style={{
            width: '100%', background: 'none', border: 'none', outline: 'none',
            fontFamily: 'Nunito Sans, sans-serif', fontSize: '16px',
            color: 'var(--text-primary)',
            marginBottom: '14px',
            caretColor: '#D43C33',
          }}
        />
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {QUICK_OPTS.map(opt => (
            <button key={opt} onClick={() => setSelected(opt)} style={{
              padding: '6px 14px', borderRadius: '999px', border: 'none', cursor: 'pointer',
              fontFamily: 'Nunito Sans, sans-serif', fontSize: '13px', fontWeight: 600,
              background: selected === opt ? '#D43C33' : 'var(--chip-bg)',
              color: selected === opt ? '#fff' : 'var(--text-secondary)',
              transition: 'all 0.2s',
            }}>{opt}</button>
          ))}
          <div style={{ flex: 1 }} />
          <button onClick={handleSubmit} style={{
            width: '40px', height: '40px', borderRadius: '999px',
            background: '#D43C33', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'transform 0.15s, background 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = '#b83029'; e.currentTarget.style.transform = 'scale(1.05)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = '#D43C33'; e.currentTarget.style.transform = 'scale(1)'; }}
          >
            <ArrowUp size={18} color="#fff" />
          </button>
        </div>
      </div>

      {/* Chrome extension CTA */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <a
          href="#chrome-extension" /* INSERT CHROME EXTENSION URL HERE */
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            padding: '9px 18px', borderRadius: '10px',
            border: 'none', background: 'var(--surface-2)',
            textDecoration: 'none', color: 'var(--text-secondary)',
            fontFamily: 'Nunito Sans, sans-serif', fontSize: '13px', fontWeight: 600,
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.color = '#D43C33'; }}
          onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-secondary)'; }}
        >
          🔌 Add Chrome Extension
        </a>
        <span style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '13px', color: 'var(--text-tertiary)' }}>·</span>
        <span
          style={{ cursor: 'pointer', fontFamily: 'Nunito Sans, sans-serif', fontSize: '13px', color: '#D43C33', textDecoration: 'underline', textDecorationColor: 'rgba(212,60,51,0.4)' }}
          onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
        >
          See how it works →
        </span>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute', bottom: '32px', left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
        animation: 'float 2.5s ease-in-out infinite',
        opacity: 0.4,
      }}>
        <div style={{ width: '1.5px', height: '40px', background: 'var(--text-tertiary)', borderRadius: '999px' }} />
      </div>
    </section>
  );
}