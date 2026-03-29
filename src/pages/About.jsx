import { useEffect, useRef, useState } from 'react';
import Navbar from '../components/Navbar';
import FinchFooter from '../components/FinchFooter';
import FoundersMarquee from '../components/FoundersMarquee';
import SignupModal from '../components/SignupModal';

function useInView() {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, v];
}

export default function About() {
  const [heroRef, heroV] = useInView();
  const [aboutRef, aboutV] = useInView();
  const [originRef, originV] = useInView();
  const [showModal, setShowModal] = useState(false);
  const [authMode, setAuthMode] = useState('signup');

  const openSignupModal = () => { setAuthMode('signup'); setShowModal(true); };
  const openLoginModal = () => { setAuthMode('login'); setShowModal(true); };
  const handleSignupSuccess = () => {
    setShowModal(false);
    window.location.href = '/';
  };

  return (
    <div style={{ background: '#24364C', minHeight: '100vh' }}>
      <Navbar onGetAccess={openSignupModal} onSignIn={openLoginModal} />
      <div style={{ paddingTop: '96px' }}>

        {/* Hero */}
        <section ref={heroRef} style={{
          padding: '100px 24px 80px',
          textAlign: 'center',
          background: 'linear-gradient(180deg, #1A2A3A 0%, #24364C 100%)',
          opacity: heroV ? 1 : 0,
          transform: heroV ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity 0.6s, transform 0.6s',
        }}>
          <div className="eyebrow" style={{ justifyContent: 'center', display: 'flex' }}>OUR STORY</div>
          <h1 style={{
            fontFamily: 'Sora, sans-serif', fontWeight: 700,
            fontSize: 'clamp(36px, 6vw, 72px)', color: '#F2F2F2',
            lineHeight: 1.1, margin: '0 auto 24px', maxWidth: '700px',
          }}>
            About{' '}
            <span style={{
              background: 'linear-gradient(90deg, #D43C33, #E09643)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>Finch</span>
          </h1>
          <p style={{
            fontFamily: 'Nunito Sans, sans-serif', fontSize: '20px', color: '#D4D4D4',
            lineHeight: 1.6, maxWidth: '600px', margin: '0 auto',
          }}>
            Built by a student who was tired of sending 100 applications and hearing nothing back.
          </p>
        </section>

        {/* Divider */}
        <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(212,60,51,0.4), transparent)' }} />

        {/* About Finch */}
        <section ref={aboutRef} style={{ padding: '80px 24px', maxWidth: '860px', margin: '0 auto' }}>
          <div style={{
            opacity: aboutV ? 1 : 0, transform: aboutV ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.6s, transform 0.6s',
          }}>
            <h2 style={{ fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: 'clamp(24px, 4vw, 40px)', color: '#F2F2F2', marginBottom: '32px' }}>
              What Finch Is
            </h2>

            <div style={{
              background: '#1A2A3A', borderRadius: '20px',
              border: '1px solid rgba(255,255,255,0.06)',
              padding: '40px',
              display: 'flex', flexDirection: 'column', gap: '24px',
            }}>
              {[
                "Finch (Easy Apply) is an intentional internship platform built for engineering, computer science, and high-volume student applicants who are tired of mass applying with little return. Instead of helping students submit more applications, Finch optimizes for interview probability — matching them to high-signal roles, tailoring their materials, and integrating structured networking to increase recruiter visibility.",
                "Finch streamlines the internship application process by combining AI-powered resume tailoring with automated form-filling. Users sign up, connect their LinkedIn profile, and the system generates a rich candidate profile. When browsing job postings on major ATS platforms (Greenhouse, Lever, Workday), the Chrome extension detects the application, generates a tailored resume and cover letter in seconds, and autofills the entire form — turning what takes 20–30 minutes into under 60 seconds.",
              ].map((para, i) => (
                <p key={i} style={{
                  fontFamily: 'Nunito Sans, sans-serif', fontSize: '17px', color: '#D4D4D4',
                  lineHeight: 1.8, margin: 0,
                }}>{para}</p>
              ))}
            </div>

            {/* Stat pills */}
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginTop: '32px' }}>
              {[
                { val: '< 60s', label: 'Per application' },
                { val: '3.2×', label: 'More callbacks' },
                { val: '40+', label: 'Hrs saved/semester' },
                { val: '40+', label: 'Universities' },
              ].map((s, i) => (
                <div key={i} style={{
                  background: '#1A2A3A', borderRadius: '999px',
                  border: '1px solid rgba(212,60,51,0.25)',
                  padding: '10px 20px', display: 'flex', gap: '10px', alignItems: 'center',
                }}>
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', color: '#E09643', fontWeight: 700, fontSize: '15px' }}>{s.val}</span>
                  <span style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '13px', color: '#7A8FA0' }}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Divider */}
        <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(212,212,212,0.08), transparent)', margin: '0 24px' }} />

        {/* Origin Story */}
        <section ref={originRef} style={{ padding: '80px 24px', maxWidth: '860px', margin: '0 auto' }}>
          <div style={{
            opacity: originV ? 1 : 0, transform: originV ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.6s 0.1s, transform 0.6s 0.1s',
          }}>
            <div className="eyebrow">ORIGIN STORY</div>
            <h2 style={{ fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: 'clamp(24px, 4vw, 40px)', color: '#F2F2F2', marginBottom: '40px' }}>
              How Finch Started
            </h2>

            <div style={{ position: 'relative', paddingLeft: '40px' }}>
              {/* Timeline line */}
              <div style={{
                position: 'absolute', left: '12px', top: '8px', bottom: '8px', width: '2px',
                background: 'linear-gradient(180deg, #D43C33, #E09643)',
                borderRadius: '999px',
              }} />

              {/* Timeline dot */}
              <div style={{
                position: 'absolute', left: '6px', top: '8px',
                width: '14px', height: '14px', borderRadius: '999px',
                background: '#D43C33',
                boxShadow: '0 0 12px rgba(212,60,51,0.6)',
              }} />

              <div style={{
                background: '#1A2A3A', borderRadius: '20px',
                border: '1px solid rgba(255,255,255,0.06)',
                padding: '36px',
              }}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px',
                }}>
                  <div style={{
                    width: '48px', height: '48px', borderRadius: '999px',
                    background: 'linear-gradient(135deg, #D43C33, #E09643)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: '18px', color: '#fff', flexShrink: 0,
                  }}>C</div>
                  <div>
                    <div style={{ fontFamily: 'Sora, sans-serif', fontSize: '16px', color: '#F2F2F2', fontWeight: 700 }}>Carlos, Founder</div>
                    <div style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '13px', color: '#E09643' }}>CS Major → Builder</div>
                  </div>
                </div>
                <p style={{
                  fontFamily: 'Nunito Sans, sans-serif', fontSize: '17px', color: '#D4D4D4',
                  lineHeight: 1.8, margin: 0,
                }}>
                  Carlos was trying to apply to internships as a CS major and was not getting any responses from mass applications. He understood his own pain points and thought of a more efficient way to approach the process. He built a functioning backend that minimized the number of applications he had to fill out while maximizing his success rate for interviews. That's how Finch was born.
                </p>
              </div>
            </div>
          </div>
        </section>

        <FoundersMarquee />

        {/* CTA */}
        <section style={{ padding: '60px 24px 100px', textAlign: 'center' }}>
          <p style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '18px', color: '#7A8FA0', marginBottom: '24px' }}>
            Ready to apply smarter?
          </p>
          <button onClick={openSignupModal} className="btn-primary" style={{ height: '52px', padding: '0 36px', fontSize: '16px' }}>
            Join the Waitlist →
          </button>
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