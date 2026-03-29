import { Twitter, Linkedin, Github, Share2 } from 'lucide-react';

const socials = [
  { icon: Twitter, label: 'Follow on X', href: '#', color: '#1DA1F2' },
  { icon: Linkedin, label: 'Follow on LinkedIn', href: '#', color: '#0A66C2' },
  { icon: Github, label: 'Star on GitHub', href: '#', color: '#F2F2F2' },
];

export default function SocialShareSection() {
  const shareText = encodeURIComponent("Just discovered Finch — AI that tailors your resume and autofills internship applications in 60 seconds. Check it out:");
  const shareURL = encodeURIComponent(typeof window !== 'undefined' ? window.location.origin : 'https://finch.app');

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: 'Finch', text: 'AI internship applications in 60 seconds', url: window.location.origin });
    } else {
      window.open(`https://twitter.com/intent/tweet?text=${shareText}%20${shareURL}`, '_blank');
    }
  };

  return (
    <section style={{ padding: '80px 24px', background: 'var(--surface-1)' }}>
      <div style={{
        maxWidth: '820px', margin: '0 auto',
        background: 'linear-gradient(135deg, rgba(212,60,51,0.08), rgba(224,150,67,0.06))',
        border: '1px solid rgba(212,60,51,0.15)',
        borderRadius: '24px', padding: 'clamp(32px, 5vw, 52px)',
        display: 'flex', gap: '40px', alignItems: 'center', flexWrap: 'wrap',
      }}>
        <div style={{ flex: '1 1 280px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(212,60,51,0.1)', border: '1px solid rgba(212,60,51,0.25)',
            borderRadius: '999px', padding: '5px 14px', marginBottom: '16px',
            fontFamily: 'Nunito Sans, sans-serif', fontSize: '12px', color: '#D43C33', fontWeight: 700,
          }}>🎁 REFER A FRIEND</div>

          <h3 style={{ fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: 'clamp(22px, 3vw, 32px)', color: 'var(--text-primary)', lineHeight: 1.2, marginBottom: '12px' }}>
            Know someone grinding<br />internship applications?
          </h3>
          <p style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '16px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '24px' }}>
            Share Finch with a friend who deserves more interviews.
          </p>

          <button onClick={handleShare} style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '12px 22px', borderRadius: '12px',
            background: 'linear-gradient(135deg, #D43C33, #E09643)',
            border: 'none', color: '#fff', cursor: 'pointer',
            fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: '15px',
            boxShadow: '0 4px 20px rgba(212,60,51,0.3)',
            transition: 'transform 0.15s',
          }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            <Share2 size={16} /> Share Finch
          </button>
        </div>

        <div style={{ flex: '1 1 220px' }}>
          <div style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '12px', color: 'var(--text-tertiary)', letterSpacing: '1.5px', marginBottom: '16px', fontWeight: 700 }}>FOLLOW FOR UPDATES</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {socials.map(({ icon: Icon, label, href, color }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                style={{
                  display: 'flex', alignItems: 'center', gap: '12px',
                  padding: '12px 16px', borderRadius: '12px',
                  background: 'var(--card-bg)', border: '1px solid var(--border)',
                  textDecoration: 'none', color: 'var(--text-primary)',
                  fontFamily: 'Nunito Sans, sans-serif', fontSize: '14px', fontWeight: 600,
                  transition: 'border-color 0.2s, transform 0.15s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = color; e.currentTarget.style.transform = 'translateX(4px)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateX(0)'; }}
              >
                <Icon size={18} style={{ color }} />
                {label}
                <span style={{ marginLeft: 'auto', color: 'var(--text-tertiary)', fontSize: '12px' }}>→</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}