/* Founders marquee — infinite smooth scroll. Add PNG files to /public and update src below. */
import { useRef } from 'react';

const founders = [
  {
    name: 'Carlos Mendoza',
    role: 'Founder & CEO',
    desc: 'CS major who got tired of mass applying. Built the backend that became Finch.',
    initials: 'CM',
    /* INSERT FOUNDER IMAGE HERE — replace imageSrc with: imageSrc: '/founders/carlos.png' */
    imageSrc: null,
  },
  {
    name: 'Co-founder',
    role: 'Engineering',
    desc: 'Leads the core AI pipeline and resume tailoring engine.',
    initials: 'TBD',
    /* INSERT FOUNDER IMAGE HERE — replace imageSrc with: imageSrc: '/founders/cofounder1.png' */
    imageSrc: null,
  },
  {
    name: 'Co-founder',
    role: 'Product & Design',
    desc: 'Shapes the Finch product experience and growth strategy.',
    initials: 'TBD',
    /* INSERT FOUNDER IMAGE HERE — replace imageSrc with: imageSrc: '/founders/cofounder2.png' */
    imageSrc: null,
  },
  {
    name: 'Co-founder',
    role: 'Operations',
    desc: 'Runs partnerships, university outreach, and community growth.',
    initials: 'TBD',
    /* INSERT FOUNDER IMAGE HERE — replace imageSrc with: imageSrc: '/founders/cofounder3.png' */
    imageSrc: null,
  },
];

function FounderCard({ founder }) {
  return (
    <div style={{
      flexShrink: 0,
      width: '260px',
      background: '#1A2A3A',
      border: '1px solid rgba(255,255,255,0.07)',
      borderRadius: '20px',
      padding: '28px 24px',
      margin: '0 10px',
      transition: 'border-color 0.3s, transform 0.3s',
    }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(212,60,51,0.35)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.transform = 'translateY(0)'; }}
    >
      {/* Image placeholder */}
      <div style={{
        width: '72px', height: '72px', borderRadius: '999px',
        background: 'linear-gradient(135deg, #D43C33, #E09643)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: '16px', overflow: 'hidden',
        /* INSERT FOUNDER IMAGE HERE — set background to 'none' when image is added */
      }}>
        {founder.imageSrc ? (
          <img src={founder.imageSrc} alt={founder.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <span style={{ fontFamily: 'Sora, sans-serif', fontSize: '20px', fontWeight: 700, color: '#fff' }}>{founder.initials}</span>
        )}
      </div>

      <div style={{ fontFamily: 'Sora, sans-serif', fontSize: '16px', color: '#F2F2F2', fontWeight: 700, marginBottom: '4px' }}>{founder.name}</div>
      <div style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '12px', color: '#E09643', marginBottom: '12px', fontWeight: 600 }}>{founder.role}</div>
      <p style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '14px', color: '#7A8FA0', lineHeight: 1.6, margin: 0 }}>{founder.desc}</p>
    </div>
  );
}

export default function FoundersMarquee() {
  const doubled = [...founders, ...founders]; // duplicate for seamless loop

  return (
    <section style={{ padding: '100px 0', background: '#24364C', overflow: 'hidden' }}>
      <div style={{ textAlign: 'center', marginBottom: '52px', padding: '0 24px' }}>
        <div className="eyebrow">THE TEAM</div>
        <h2 style={{ fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: 'clamp(28px, 4vw, 44px)', color: '#F2F2F2', marginBottom: '16px' }}>
          Built by students,<br />for students.
        </h2>
        <p style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '17px', color: '#7A8FA0', maxWidth: '480px', margin: '0 auto' }}>
          We've been through the internship grind. That's why we built Finch.
        </p>
      </div>

      {/* Marquee track */}
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        {/* Fade edges */}
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0, width: '120px', zIndex: 2,
          background: 'linear-gradient(90deg, #24364C, transparent)', pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', right: 0, top: 0, bottom: 0, width: '120px', zIndex: 2,
          background: 'linear-gradient(270deg, #24364C, transparent)', pointerEvents: 'none',
        }} />

        <div style={{
          display: 'flex', alignItems: 'stretch',
          animation: 'marquee 28s linear infinite',
          width: 'max-content',
        }}
          onMouseEnter={e => e.currentTarget.style.animationPlayState = 'paused'}
          onMouseLeave={e => e.currentTarget.style.animationPlayState = 'running'}
        >
          {doubled.map((founder, i) => (
            <FounderCard key={i} founder={founder} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}