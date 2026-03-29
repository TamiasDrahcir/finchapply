/* Founders marquee — infinite smooth scroll. Add PNG files to /public and update src below. */

import { useRef } from 'react';
import NicanorImg from '../assets/Nicanor-Garza-Zazueta-headshot.png';
import JoseImg from '../assets/Jose-Tirado-Headshot.jpeg';
import CarlosImg from '../assets/Carlos-Luna-Headshot.jpeg';

const founders = [
  {
    name: 'Nicanor Garza-Zazueta',
    role: 'CEO & Co-founder',
    desc: `An Industrial Distribution Engineering student at Texas A&M focused on building ventures that create measurable, lasting impact. A Meloy Fellows Grant recipient, he operates at the intersection of entrepreneurship, strategy, and execution. Known for assembling high-performing teams and driving growth through relationship-building and disciplined sales leadership.\n\nEmail: nicanor14gz@tamu.edu`,
    imageSrc: NicanorImg,
  },
  {
    name: 'Jose Tirado',
    role: 'CTO & Co-founder',
    desc: `An Industrial Engineering student at Texas A&M who enjoys solving problems and improving how systems operate. Driven by analytical thinking to create practical, measurable impact. Thrives best when encountering nuanced problems that need outside-the-box solutions — focused on streamlining all people and operations within Finch.\n\nEmail: jmtirador@tamu.edu`,
    imageSrc: JoseImg,
  },
  {
    name: 'Carlos Luna Pena',
    role: 'CTO & Co-founder',
    desc: `A junior Computer Science student at Texas A&M with a cybersecurity minor and statistics emphasis. Technical Lead for AIPHRODITE (a computer vision project built with FastAPI, PostgreSQL, and Hugging Face) and co-founder of Finch. His work spans Python, LangChain, LaTeX resume generation, LinkedIn scraping, and automated outreach systems. Placed 2nd in the Accenture Case Competition leading his team's AI operations research.\n\nEmail: carlunpen@tamu.edu`,
    imageSrc: CarlosImg,
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
        background: founder.imageSrc ? 'none' : 'linear-gradient(135deg, #D43C33, #E09643)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: '16px', overflow: 'hidden',
      }}>
        {founder.imageSrc ? (
          <img src={founder.imageSrc} alt={founder.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : null}
      </div>

      <div style={{ fontFamily: 'Sora, sans-serif', fontSize: '16px', color: '#F2F2F2', fontWeight: 700, marginBottom: '4px' }}>{founder.name}</div>
      <div style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '12px', color: '#E09643', marginBottom: '12px', fontWeight: 600 }}>{founder.role}</div>
      <p style={{ whiteSpace: 'pre-line', fontFamily: 'Nunito Sans, sans-serif', fontSize: '14px', color: '#7A8FA0', lineHeight: 1.6, margin: 0 }}>{founder.desc}</p>
    </div>
  );
}

export default function FoundersMarquee() {
  const doubled = [...founders, ...founders]; // duplicate for seamless loop

  return (
    <section style={{ padding: '100px 0', background: '#181F2A', overflow: 'hidden' }}>
      <div style={{ textAlign: 'center', marginBottom: '52px', padding: '0 24px' }}>
        <div className="eyebrow">THE TEAM</div>
        <h2 style={{ fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: 'clamp(28px, 4vw, 44px)', color: '#F2F2F2', marginBottom: '16px', letterSpacing: '-1px' }}>
          Built by students,<br />for students.
        </h2>
        <p style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '17px', color: '#C7D0E0', maxWidth: '480px', margin: '0 auto' }}>
          We've been through the internship grind. That's why we built Finch.
        </p>
      </div>

      {/* Marquee track */}
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        {/* Fade edges */}
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0, width: '120px', zIndex: 2,
          background: 'linear-gradient(90deg, #181F2A, transparent)', pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', right: 0, top: 0, bottom: 0, width: '120px', zIndex: 2,
          background: 'linear-gradient(270deg, #181F2A, transparent)', pointerEvents: 'none',
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