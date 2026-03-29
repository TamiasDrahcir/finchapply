import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: 'Is this just another resume builder?',
    a: "Not at all. Finch doesn't give you a template. It tailors your existing experience to each specific job posting — rewriting bullet points to match keywords and framing, then generates a matching cover letter and autofills the form. It's an application engine, not a resume editor.",
  },
  {
    q: 'Will recruiters know I used AI?',
    a: "Finch writes in your voice, based on your real experience. The output reads like a well-crafted human application — because it starts from you.",
  },
  {
    q: 'Which platforms does it work with?',
    a: "The Chrome extension works with Greenhouse, Workday, Lever, iCIMS, Taleo, and direct company portals. We're adding more every week.",
  },
  {
    q: 'Does it actually improve response rates?',
    a: "In beta testing with 200+ students, Finch users saw a 3.2x improvement in interview callback rates compared to their previous unoptimized applications.",
  },
  {
    q: 'How does the free plan work?',
    a: "You get 5 fully AI-tailored applications per month at no cost, forever. No trial countdown, no credit card required. Upgrade when you're ready.",
  },
  {
    q: 'Is my resume data secure?',
    a: "Yes. Your data is encrypted, never sold or shared with employers, and you can delete everything from your account settings at any time.",
  },
  {
    q: 'Does it work for non-CS majors?',
    a: "Absolutely. Finch was designed with CS and engineering students in mind, but it works for any discipline — business, design, data science, pre-med research, and more.",
  },
  {
    q: 'How did Finch start?',
    a: "Carlos was trying to apply to internships as a CS major and was not getting any responses from mass applications. He understood his own pain points and thought of a more efficient way to approach the process. He built a functioning backend that minimized the number of applications he had to fill out while maximizing his success rate for interviews. That's how Finch was born.",
  },
];

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState(null);

  return (
    <section style={{ padding: '100px 24px', background: 'var(--bg)' }}>
      <div style={{ maxWidth: '760px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center' }}>
          <div className="eyebrow">QUESTIONS</div>
          <h2 style={{ fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: 'clamp(28px, 4vw, 44px)', color: 'var(--text-primary)', marginBottom: '48px' }}>
            We figured you'd ask.
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {faqs.map((faq, i) => {
            const isOpen = openIdx === i;
            return (
              <div key={i} style={{ borderBottom: '1px solid rgba(212,212,212,0.08)' }}>
                <button
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  style={{
                    width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '24px 0', background: 'none', border: 'none', cursor: 'pointer',
                  textAlign: 'left', gap: '16px',
                }}
                >
                  <span style={{ fontFamily: 'Sora, sans-serif', fontSize: '18px', color: 'var(--text-primary)', fontWeight: 600 }}>{faq.q}</span>
                  <ChevronDown size={20} style={{
                    color: '#7A8FA0', flexShrink: 0,
                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.25s ease',
                  }} />
                </button>

                <div style={{
                  overflow: 'hidden',
                  maxHeight: isOpen ? '500px' : '0',
                  transition: 'max-height 0.25s ease',
                }}>
                  <div style={{
                    fontFamily: 'Nunito Sans, sans-serif', fontSize: '16px', color: 'var(--text-secondary)', lineHeight: 1.7,
                    paddingBottom: '24px',
                    paddingLeft: '16px',
                    borderLeft: '2px solid #D43C33',
                  }}>{faq.a}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}