import { useState } from 'react';
import { Zap, Lock, Clock, ArrowRight } from 'lucide-react';

const DEMO_RESPONSES = [
  { role: 'assistant', text: "Hi! I'm Finch. Tell me which job you're applying to and I'll tailor your application instantly." },
];

export default function FreemiumSection() {
  const [messages, setMessages] = useState(DEMO_RESPONSES);
  const [input, setInput] = useState('');
  const [step, setStep] = useState('chat'); // chat | locked | preview

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = { role: 'user', text: input };
    setMessages(m => [...m, userMsg]);
    setInput('');
    setStep('locked');
  };

  return (
    <section style={{ padding: '100px 24px', background: '#24364C' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '52px' }}>
          <div className="eyebrow">HOW IT FEELS</div>
          <h2 style={{ fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: 'clamp(28px, 4vw, 44px)', color: '#F2F2F2', lineHeight: 1.2, marginBottom: '16px' }}>
            Apply in a conversation.
            <br />
            <span style={{ background: 'linear-gradient(90deg, #D43C33, #E09643)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Not a 30-minute ordeal.
            </span>
          </h2>
          <p style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '17px', color: '#7A8FA0', maxWidth: '520px', margin: '0 auto' }}>
            Finch's AI assistant handles your entire application flow. Try a demo interaction below.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '28px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
          {/* Chat window */}
          <div style={{
            flex: '1 1 380px',
            background: '#1A2A3A', borderRadius: '20px',
            border: '1px solid rgba(255,255,255,0.06)',
            overflow: 'hidden',
          }}>
            {/* Header */}
            <div style={{
              padding: '16px 20px', background: '#131F2B',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              display: 'flex', alignItems: 'center', gap: '10px',
            }}>
              <div style={{
                width: '32px', height: '32px', borderRadius: '999px',
                background: 'linear-gradient(135deg, #D43C33, #E09643)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'Sora, sans-serif', fontSize: '14px', fontWeight: 700, color: '#fff',
              }}>F</div>
              <div>
                <div style={{ fontFamily: 'Sora, sans-serif', fontSize: '14px', color: '#F2F2F2', fontWeight: 700 }}>Finch AI</div>
                <div style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '11px', color: '#3DB87A' }}>● Online</div>
              </div>
            </div>

            {/* Messages */}
            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px', minHeight: '240px' }}>
              {messages.map((msg, i) => (
                <div key={i} style={{
                  display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                }}>
                  <div style={{
                    maxWidth: '80%',
                    background: msg.role === 'user' ? '#D43C33' : '#2E4560',
                    borderRadius: msg.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                    padding: '10px 16px',
                    fontFamily: 'Nunito Sans, sans-serif', fontSize: '14px', color: '#F2F2F2', lineHeight: 1.5,
                  }}>
                    {msg.text}
                  </div>
                </div>
              ))}

              {step === 'locked' && (
                <div style={{
                  background: 'rgba(212,60,51,0.08)', borderRadius: '16px',
                  border: '1px solid rgba(212,60,51,0.2)',
                  padding: '16px', textAlign: 'center',
                }}>
                  <Lock size={18} style={{ color: '#D43C33', marginBottom: '8px' }} />
                  <div style={{ fontFamily: 'Sora, sans-serif', fontSize: '14px', color: '#F2F2F2', fontWeight: 700, marginBottom: '4px' }}>Create a free account to continue</div>
                  <div style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '12px', color: '#7A8FA0', marginBottom: '12px' }}>5 free applications per month, no credit card</div>
                  <button className="btn-primary" style={{ height: '38px', padding: '0 18px', fontSize: '13px' }}
                    onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}>
                    Get started free →
                  </button>
                </div>
              )}
            </div>

            {/* Input */}
            {step === 'chat' && (
              <div style={{
                padding: '12px 16px', borderTop: '1px solid rgba(255,255,255,0.06)',
                display: 'flex', gap: '10px',
              }}>
                <input
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSend()}
                  placeholder="Paste a job URL or describe the role..."
                  style={{
                    flex: 1, height: '40px', padding: '0 14px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(212,212,212,0.12)',
                    borderRadius: '999px', color: '#F2F2F2',
                    fontFamily: 'Nunito Sans, sans-serif', fontSize: '14px',
                    outline: 'none',
                  }}
                />
                <button onClick={handleSend} style={{
                  width: '40px', height: '40px', borderRadius: '999px',
                  background: '#D43C33', border: 'none', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <ArrowRight size={16} style={{ color: '#fff' }} />
                </button>
              </div>
            )}
          </div>

          {/* Freemium tiers */}
          <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              {
                icon: Zap, color: '#3DB87A',
                tier: 'FREE',
                title: 'Start applying smarter',
                features: ['5 AI applications/month', 'Resume tailoring', 'Cover letter generation', 'Basic autofill'],
                note: null,
              },
              {
                icon: Clock, color: '#E09643',
                tier: 'LIMIT REACHED',
                title: 'Out of free credits',
                features: ['Wait 5 hours for credits to reset', 'Or upgrade to Pro for unlimited access'],
                note: '⏱ 4h 23m until reset',
                muted: true,
              },
              {
                icon: Zap, color: '#D43C33',
                tier: 'PRO',
                title: 'Unlimited applications',
                features: ['Unlimited AI applications', 'All ATS platforms', 'Analytics dashboard', 'Priority support'],
                note: null,
                highlight: true,
              },
            ].map((tier, i) => {
              const Icon = tier.icon;
              return (
                <div key={i} style={{
                  background: tier.highlight ? 'rgba(212,60,51,0.08)' : '#1A2A3A',
                  borderRadius: '16px',
                  border: `1px solid ${tier.highlight ? 'rgba(212,60,51,0.3)' : 'rgba(255,255,255,0.06)'}`,
                  padding: '20px',
                  opacity: tier.muted ? 0.6 : 1,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '10px', background: `${tier.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Icon size={16} style={{ color: tier.color }} />
                    </div>
                    <div>
                      <div style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '10px', color: tier.color, letterSpacing: '1.5px' }}>{tier.tier}</div>
                      <div style={{ fontFamily: 'Sora, sans-serif', fontSize: '14px', color: '#F2F2F2', fontWeight: 700 }}>{tier.title}</div>
                    </div>
                  </div>
                  {tier.features.map((f, j) => (
                    <div key={j} style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '6px' }}>
                      <span style={{ color: tier.color, fontSize: '12px' }}>✓</span>
                      <span style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '13px', color: '#D4D4D4' }}>{f}</span>
                    </div>
                  ))}
                  {tier.note && (
                    <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '12px', color: tier.color, marginTop: '10px', background: `${tier.color}12`, borderRadius: '8px', padding: '6px 10px', display: 'inline-block' }}>
                      {tier.note}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}