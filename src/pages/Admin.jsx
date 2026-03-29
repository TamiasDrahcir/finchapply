import { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Download, Lock } from 'lucide-react';

export default function Admin() {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState('');
  const [pwError, setPwError] = useState(false);
  const [signups, setSignups] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (pw === 'finch2025admin') {
      setAuthed(true);
    } else {
      setPwError(true);
      setTimeout(() => setPwError(false), 2000);
    }
  };

  useEffect(() => {
    if (!authed) return;
    setLoading(true);
    base44.entities.WaitlistSignup.list('-created_date', 500).then(data => {
      setSignups(data);
      setLoading(false);
    });
  }, [authed]);

  const exportCSV = () => {
    const rows = [['Email', 'University', 'Date Submitted'], ...signups.map(s => [s.email, s.university || '', new Date(s.created_date).toLocaleDateString()])];
    const csv = rows.map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'finch-waitlist.csv'; a.click();
  };

  if (!authed) {
    return (
      <div style={{
        minHeight: '100vh', background: 'var(--bg)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: '20px', padding: '48px', width: '100%', maxWidth: '400px', textAlign: 'center' }}>
          <div style={{ width: '48px', height: '48px', background: 'rgba(212,60,51,0.15)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
            <Lock size={24} style={{ color: '#D43C33' }} />
          </div>
          <div style={{ fontFamily: 'Sora, sans-serif', fontSize: '24px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>Admin Access</div>
          <div style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '28px' }}>Enter the admin password to continue</div>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              value={pw}
              onChange={e => setPw(e.target.value)}
              placeholder="Password"
              style={{
                width: '100%', height: '48px', padding: '0 16px',
                background: 'var(--surface-2)',
                border: `1px solid ${pwError ? '#D43C33' : 'var(--border)'}`,
                borderRadius: '14px', color: 'var(--text-primary)',
                fontFamily: 'Nunito Sans, sans-serif', fontSize: '15px',
                marginBottom: '16px', boxSizing: 'border-box',
                outline: 'none',
                animation: pwError ? 'shake 0.5s ease' : 'none',
              }}
            />
            {pwError && <div style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '13px', color: '#D43C33', marginBottom: '12px' }}>Incorrect password</div>}
            <button type="submit" className="btn-primary" style={{ width: '100%', height: '48px', fontSize: '15px' }}>
              Unlock →
            </button>
          </form>
        </div>
      </div>
    );
  }

  const today = new Date().toDateString();
  const todayCount = signups.filter(s => new Date(s.created_date).toDateString() === today).length;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', padding: '40px 24px' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '40px' }}>
          <div>
            <div style={{ fontFamily: 'Sora, sans-serif', fontSize: '28px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>Finch Admin</div>
            <div style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '14px', color: 'var(--text-secondary)' }}>Waitlist signups dashboard</div>
          </div>
          <button onClick={exportCSV} className="btn-secondary" style={{ height: '44px', padding: '0 20px', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Download size={16} /> Export CSV
          </button>
        </div>

        {/* Stats row */}
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginBottom: '32px' }}>
          {[
            { label: 'Total Signups', val: signups.length, mono: true },
            { label: 'Signups Today', val: todayCount, mono: true },
          ].map((s, i) => (
            <div key={i} style={{ flex: '1 1 180px', background: 'var(--card-bg)', borderRadius: '16px', padding: '24px', border: '1px solid var(--border)' }}>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '40px', fontWeight: 700, background: 'linear-gradient(135deg,#D43C33,#E09643)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                {s.val}
              </div>
              <div style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '14px', color: 'var(--text-secondary)', marginTop: '4px' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Table */}
        <div style={{ background: 'var(--card-bg)', borderRadius: '20px', overflow: 'hidden', border: '1px solid var(--border)' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: 'var(--surface-2)' }}>
                  {['#', 'Email', 'University', 'Date Submitted'].map(h => (
                    <th key={h} style={{ padding: '16px 20px', textAlign: 'left', fontFamily: 'Nunito Sans, sans-serif', fontSize: '12px', color: 'var(--text-secondary)', letterSpacing: '1px', fontWeight: 600 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={4} style={{ padding: '40px', textAlign: 'center', fontFamily: 'Nunito Sans, sans-serif', color: 'var(--text-secondary)' }}>Loading...</td></tr>
                ) : signups.length === 0 ? (
                  <tr><td colSpan={4} style={{ padding: '40px', textAlign: 'center', fontFamily: 'Nunito Sans, sans-serif', color: 'var(--text-secondary)' }}>No signups yet.</td></tr>
                ) : signups.map((s, i) => (
                  <tr key={s.id} style={{ background: i % 2 === 0 ? 'var(--card-bg)' : 'var(--surface-2)', borderTop: '1px solid var(--border)' }}>
                    <td style={{ padding: '14px 20px', fontFamily: 'JetBrains Mono, monospace', fontSize: '13px', color: 'var(--text-tertiary)' }}>{i + 1}</td>
                    <td style={{ padding: '14px 20px', fontFamily: 'Nunito Sans, sans-serif', fontSize: '14px', color: 'var(--text-primary)' }}>{s.email}</td>
                    <td style={{ padding: '14px 20px', fontFamily: 'Nunito Sans, sans-serif', fontSize: '14px', color: 'var(--text-secondary)' }}>{s.university || '—'}</td>
                    <td style={{ padding: '14px 20px', fontFamily: 'JetBrains Mono, monospace', fontSize: '13px', color: 'var(--text-tertiary)' }}>{new Date(s.created_date).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}