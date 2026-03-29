import { Twitter, Linkedin, Github } from 'lucide-react';
import { useState } from 'react';

export default function FinchFooter() {
  const [hovered, setHovered] = useState(null);

  const links = ['Product', 'How It Works', 'Pricing', 'Team', 'Blog'];
  const socials = [
    { Icon: Twitter, href: '#' },
    { Icon: Linkedin, href: '#' },
    { Icon: Github, href: '#' },
  ];

  return (
    <footer style={{ background: 'var(--surface-1)', borderTop: '1px solid var(--border)', padding: '60px 24px 0' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap', paddingBottom: '48px' }}>
          {/* Left */}
          <div style={{ flex: '1 1 200px' }}>
            <div style={{ fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: '20px', color: '#F2F2F2', marginBottom: '8px' }}>Finch</div>
            <div style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '14px', color: '#7A8FA0' }}>Fewer applications. Better outcomes.</div>
          </div>

          {/* Center */}
          <div style={{ flex: '1 1 200px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {links.map(l => (
                <a key={l} href="#" style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '14px', color: '#D4D4D4', textDecoration: 'none', width: 'fit-content' }}
                  onMouseEnter={e => e.target.style.color = '#F2F2F2'}
                  onMouseLeave={e => e.target.style.color = '#D4D4D4'}
                >{l}</a>
              ))}
            </div>
          </div>

          {/* Right */}
          <div style={{ flex: '1 1 200px' }}>
            <div style={{ display: 'flex', gap: '16px', marginBottom: '20px' }}>
              {socials.map(({ Icon, href }, i) => (
                <a key={i} href={href}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  style={{ color: hovered === i ? '#F2F2F2' : '#7A8FA0', transition: 'color 0.2s' }}>
                  <Icon size={20} />
                </a>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              {['Privacy Policy', 'Terms of Service'].map(l => (
                <a key={l} href="#" style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '13px', color: '#7A8FA0', textDecoration: 'none' }}
                  onMouseEnter={e => e.target.style.color = '#D4D4D4'}
                  onMouseLeave={e => e.target.style.color = '#7A8FA0'}
                >{l}</a>
              ))}
            </div>
          </div>
        </div>

        <div style={{ height: '1px', background: 'rgba(212,212,212,0.08)' }} />

        <div style={{ textAlign: 'center', padding: '20px 0', fontFamily: 'Nunito Sans, sans-serif', fontSize: '13px', color: '#7A8FA0' }}>
          © 2025 Finch Technologies, Inc. · Made for CS students everywhere.
        </div>
      </div>
    </footer>
  );
}