import { useState, useEffect, useRef } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Navbar from '../components/Navbar';
import FinchFooter from '../components/FinchFooter';
import { TrendingUp, Clock, AlertCircle, Zap, Target, Flame, Plus } from 'lucide-react';
import SignupModal from '../components/SignupModal';

// ── Animated counter ──
function CountUp({ target, suffix = '', duration = 1200 }) {
  const [val, setVal] = useState(0);
  const started = useRef(false);
  const rafRef = useRef(null);
  const startRef = useRef(null);

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    const num = parseFloat(String(target).replace(/[^0-9.]/g, ''));
    const isDecimal = String(target).includes('.');
    const animate = (ts) => {
      if (!startRef.current) startRef.current = ts;
      const prog = Math.min((ts - startRef.current) / duration, 1);
      const cur = num * prog;
      setVal(isDecimal ? parseFloat(cur.toFixed(1)) : Math.round(cur));
      if (prog < 1) rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target]);

  return <>{val}{suffix}</>;
}

// ── Skeleton loader ──
function Skeleton({ w = '100%', h = 20, radius = 8 }) {
  return (
    <div style={{ width: w, height: h, borderRadius: radius, background: 'linear-gradient(90deg, var(--surface-2) 25%, var(--card-bg) 50%, var(--surface-2) 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.5s infinite' }} />
  );
}

// ── Status pill ──
const STATUS_COLORS = {
  Applied: '#9B7FE8',
  'Phone Screen': '#E09643',
  Interview: '#3DB87A',
  Offer: '#D43C33',
  Rejected: '#FF6B6B',
  Ghosted: '#5A5A6A',
};

function StatusPill({ status }) {
  const color = STATUS_COLORS[status] || '#7A8FA0';
  return (
    <span style={{
      background: `${color}18`, color, border: `1px solid ${color}35`,
      borderRadius: '999px', padding: '3px 10px',
      fontFamily: 'Sora, sans-serif', fontSize: '11px', fontWeight: 700,
    }}>{status}</span>
  );
}

// ── Sample data ──
const weeklyData = [
  { week: 'Jan W1', apps: 3, responses: 0 },
  { week: 'Jan W2', apps: 7, responses: 1 },
  { week: 'Jan W3', apps: 5, responses: 2 },
  { week: 'Feb W1', apps: 10, responses: 3 },
  { week: 'Feb W2', apps: 8, responses: 4 },
  { week: 'Feb W3', apps: 12, responses: 5 },
  { week: 'Mar W1', apps: 9, responses: 4 },
  { week: 'Mar W2', apps: 6, responses: 3 },
];

const statusData = [
  { name: 'Applied', value: 23, color: '#9B7FE8' },
  { name: 'Ghosted', value: 14, color: '#5A5A6A' },
  { name: 'Phone Screen', value: 5, color: '#E09643' },
  { name: 'Interview', value: 3, color: '#3DB87A' },
  { name: 'Offer', value: 1, color: '#D43C33' },
  { name: 'Rejected', value: 1, color: '#FF6B6B' },
];

const funnelData = [
  { stage: 'Applied', count: 47, color: '#9B7FE8' },
  { stage: 'Viewed', count: 31, color: '#7B6FD8' },
  { stage: 'Screen', count: 10, color: '#E09643' },
  { stage: 'Interview', count: 4, color: '#3DB87A' },
  { stage: 'Offer', count: 1, color: '#D43C33' },
];

const sourceData = [
  { name: 'LinkedIn', apps: 28, responses: 8 },
  { name: 'Handshake', apps: 10, responses: 2 },
  { name: 'Referral', apps: 5, responses: 3 },
  { name: 'Direct', apps: 4, responses: 1 },
];

const heatmapData = [
  { day: 'Mon', vals: [2, 0, 1, 3, 4, 2, 0, 1] },
  { day: 'Tue', vals: [3, 1, 2, 5, 3, 4, 1, 2] },
  { day: 'Wed', vals: [1, 0, 4, 2, 5, 3, 2, 1] },
  { day: 'Thu', vals: [4, 2, 3, 1, 2, 5, 3, 4] },
  { day: 'Fri', vals: [5, 3, 2, 4, 3, 1, 2, 3] },
  { day: 'Sat', vals: [1, 0, 1, 0, 2, 1, 0, 1] },
  { day: 'Sun', vals: [0, 1, 0, 1, 0, 0, 1, 0] },
];

const recentApps = [
  { company: 'Notion', role: 'Software Intern', status: 'Interview', date: 'Mar 25', ats: 94 },
  { company: 'Figma', role: 'Frontend Intern', status: 'Phone Screen', date: 'Mar 22', ats: 86 },
  { company: 'Linear', role: 'Product Intern', status: 'Applied', date: 'Mar 20', ats: 91 },
  { company: 'Stripe', role: 'Engineering Intern', status: 'Ghosted', date: 'Mar 10', ats: 79 },
  { company: 'Vercel', role: 'SWE Intern', status: 'Rejected', date: 'Mar 5', ats: 82 },
];

const ghostedApps = [
  { company: 'Airbnb', role: 'Product Intern', daysAgo: 22, ats: 76 },
  { company: 'Meta', role: 'ML Intern', daysAgo: 18, ats: 68 },
];

// ── Card wrapper ──
function Card({ children, style = {} }) {
  return (
    <div style={{
      background: 'var(--card-bg)', border: '1px solid var(--border)',
      borderRadius: '20px', padding: '24px',
      ...style,
    }}>{children}</div>
  );
}

function CardTitle({ children }) {
  return <div style={{ fontFamily: 'Sora, sans-serif', fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '20px' }}>{children}</div>;
}

export default function Analytics() {
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState('overview');
  const [showConfetti, setShowConfetti] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [authMode, setAuthMode] = useState('signup');

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  const tabs = ['overview', 'applications', 'insights'];
  const openSignupModal = () => { setAuthMode('signup'); setShowModal(true); };
  const openLoginModal = () => { setAuthMode('login'); setShowModal(true); };
  const handleSignupSuccess = () => {
    setShowModal(false);
    window.location.href = '/';
  };

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <style>{`
        @keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
        @keyframes confettiFall { 0%{transform:translateY(-20px) rotate(0deg);opacity:1} 100%{transform:translateY(100vh) rotate(720deg);opacity:0} }
        @keyframes streakPulse { 0%,100%{box-shadow:0 0 0 0 rgba(224,150,67,0.4)} 50%{box-shadow:0 0 0 8px rgba(224,150,67,0)} }
      `}</style>

      <Navbar onGetAccess={openSignupModal} onSignIn={openLoginModal} />

      <div style={{ paddingTop: '100px', paddingBottom: '80px', paddingLeft: '24px', paddingRight: '24px', maxWidth: '1200px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <div className="eyebrow">PERFORMANCE ANALYTICS</div>
              <h1 style={{ fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: 'clamp(28px, 4vw, 42px)', color: 'var(--text-primary)', margin: '0 0 8px' }}>
                Your Application Dashboard
              </h1>
              <p style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '16px', color: 'var(--text-secondary)' }}>
                Track, analyze, and optimize your internship search in real time.
              </p>
            </div>
            <button style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '12px 20px', borderRadius: '12px',
              background: 'linear-gradient(135deg, #D43C33, #E09643)', border: 'none', cursor: 'pointer',
              fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: '14px', color: '#fff',
              boxShadow: '0 4px 20px rgba(212,60,51,0.3)',
            }}>
              <Plus size={16} /> Log Application
            </button>
          </div>

          {/* Streak banner */}
          <div style={{
            marginTop: '16px', padding: '12px 20px', borderRadius: '12px',
            background: 'linear-gradient(135deg, rgba(224,150,67,0.12), rgba(212,60,51,0.08))',
            border: '1px solid rgba(224,150,67,0.25)',
            display: 'flex', alignItems: 'center', gap: '10px',
            animation: 'streakPulse 3s infinite',
          }}>
            <Flame size={18} style={{ color: '#E09643' }} />
            <span style={{ fontFamily: 'Sora, sans-serif', fontSize: '14px', color: 'var(--text-primary)', fontWeight: 700 }}>
              7-day streak! 🔥 You're in the top 10% of applicants this week.
            </span>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '4px', marginBottom: '28px', background: 'var(--surface-2)', borderRadius: '12px', padding: '4px', width: 'fit-content' }}>
          {tabs.map(tab => (
            <button key={tab} onClick={() => setActiveView(tab)} style={{
              padding: '8px 20px', borderRadius: '9px', border: 'none', cursor: 'pointer',
              background: activeView === tab ? 'var(--card-bg)' : 'none',
              color: activeView === tab ? 'var(--text-primary)' : 'var(--text-secondary)',
              fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: '13px',
              transition: 'all 0.2s',
              boxShadow: activeView === tab ? '0 1px 4px rgba(0,0,0,0.15)' : 'none',
              textTransform: 'capitalize',
            }}>{tab}</button>
          ))}
        </div>

        {loading ? (
          /* Skeleton loaders */
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
              {[1,2,3,4].map(i => <Card key={i}><Skeleton h={60} /></Card>)}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <Card><Skeleton h={200} /></Card>
              <Card><Skeleton h={200} /></Card>
            </div>
          </div>
        ) : activeView === 'overview' ? (
          <>
            {/* Summary stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
              {[
                { label: 'Total Applied', val: 47, suffix: '', icon: Target, color: '#9B7FE8', sub: '+8 this week' },
                { label: 'Response Rate', val: 25.5, suffix: '%', icon: TrendingUp, color: '#3DB87A', sub: 'Industry avg: 8%' },
                { label: 'Avg Response Time', val: 4.2, suffix: 'd', icon: Clock, color: '#E09643', sub: 'Days to hear back' },
                { label: 'Active Offers', val: 1, suffix: '', icon: Zap, color: '#D43C33', sub: '🎉 Congrats!' },
              ].map((s, i) => {
                const Icon = s.icon;
                return (
                  <Card key={i}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '12px' }}>
                      <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: `${s.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Icon size={18} style={{ color: s.color }} />
                      </div>
                      <span style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '11px', color: 'var(--text-tertiary)' }}>{s.sub}</span>
                    </div>
                    <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '32px', fontWeight: 700, color: s.color, lineHeight: 1 }}>
                      <CountUp target={s.val} suffix={s.suffix} />
                    </div>
                    <div style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '13px', color: 'var(--text-secondary)', marginTop: '6px' }}>{s.label}</div>
                  </Card>
                );
              })}
            </div>

            {/* Charts row 1 */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', marginBottom: '24px' }}>
              {/* Line chart */}
              <Card>
                <CardTitle>Weekly Activity</CardTitle>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="week" tick={{ fontSize: 10, fill: '#7A8FA0' }} />
                    <YAxis tick={{ fontSize: 10, fill: '#7A8FA0' }} />
                    <Tooltip contentStyle={{ background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: '10px', fontFamily: 'Sora, sans-serif' }} />
                    <Line type="monotone" dataKey="apps" stroke="#9B7FE8" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="responses" stroke="#3DB87A" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
                <div style={{ display: 'flex', gap: '16px', marginTop: '10px', justifyContent: 'center' }}>
                  {[{c:'#9B7FE8',l:'Applications'},{c:'#3DB87A',l:'Responses'}].map(x => (
                    <div key={x.l} style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                      <div style={{ width: '10px', height: '3px', background: x.c, borderRadius: '2px' }} />
                      <span style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '11px', color: 'var(--text-secondary)' }}>{x.l}</span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Pie chart */}
              <Card>
                <CardTitle>Application Status Breakdown</CardTitle>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
                  <PieChart width={140} height={140}>
                    <Pie data={statusData} cx={65} cy={65} innerRadius={40} outerRadius={65} paddingAngle={2} dataKey="value">
                      {statusData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                    </Pie>
                    <Tooltip contentStyle={{ background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: '10px', fontFamily: 'Sora, sans-serif', fontSize: '12px' }} />
                  </PieChart>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '7px', flex: 1 }}>
                    {statusData.map((s, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                        <div style={{ display: 'flex', gap: '7px', alignItems: 'center' }}>
                          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: s.color }} />
                          <span style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '12px', color: 'var(--text-secondary)' }}>{s.name}</span>
                        </div>
                        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '12px', color: 'var(--text-primary)', fontWeight: 700 }}>{s.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>

            {/* Charts row 2 */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', marginBottom: '24px' }}>
              {/* Funnel */}
              <Card>
                <CardTitle>Application Funnel</CardTitle>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {funnelData.map((f, i) => (
                    <div key={i}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <span style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '13px', color: 'var(--text-secondary)' }}>{f.stage}</span>
                        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '13px', color: f.color, fontWeight: 700 }}>{f.count}</span>
                      </div>
                      <div style={{ height: '8px', background: 'var(--surface-2)', borderRadius: '999px' }}>
                        <div style={{
                          height: '100%', background: f.color, borderRadius: '999px',
                          width: `${(f.count / funnelData[0].count) * 100}%`,
                          transition: 'width 1s ease',
                        }} />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Source breakdown */}
              <Card>
                <CardTitle>Best Sources</CardTitle>
                <ResponsiveContainer width="100%" height={180}>
                  <BarChart data={sourceData} barGap={4}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#7A8FA0' }} />
                    <YAxis tick={{ fontSize: 11, fill: '#7A8FA0' }} />
                    <Tooltip contentStyle={{ background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: '10px', fontFamily: 'Sora, sans-serif', fontSize: '12px' }} />
                    <Bar dataKey="apps" fill="#9B7FE8" radius={[4,4,0,0]} />
                    <Bar dataKey="responses" fill="#3DB87A" radius={[4,4,0,0]} />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </div>

            {/* Activity heatmap */}
            <Card style={{ marginBottom: '24px' }}>
              <CardTitle>Activity Heatmap — Applications by Day</CardTitle>
              <div style={{ overflowX: 'auto' }}>
                <div style={{ display: 'flex', gap: '6px', minWidth: '500px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', paddingTop: '20px' }}>
                    {heatmapData.map(d => (
                      <div key={d.day} style={{ height: '20px', display: 'flex', alignItems: 'center', fontFamily: 'Nunito Sans, sans-serif', fontSize: '11px', color: 'var(--text-tertiary)', width: '30px' }}>{d.day}</div>
                    ))}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', gap: '6px', marginBottom: '6px' }}>
                      {['W1','W2','W3','W4','W5','W6','W7','W8'].map(w => (
                        <div key={w} style={{ flex: 1, textAlign: 'center', fontFamily: 'Nunito Sans, sans-serif', fontSize: '10px', color: 'var(--text-tertiary)' }}>{w}</div>
                      ))}
                    </div>
                    {heatmapData.map(d => (
                      <div key={d.day} style={{ display: 'flex', gap: '6px', marginBottom: '6px' }}>
                        {d.vals.map((v, i) => (
                          <div key={i} style={{
                            flex: 1, height: '20px', borderRadius: '4px',
                            background: v === 0 ? 'var(--surface-2)' : `rgba(212,60,51,${v * 0.18 + 0.05})`,
                            border: v > 3 ? '1px solid rgba(212,60,51,0.3)' : 'none',
                            title: `${v} applications`,
                          }} />
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            {/* Ghost detector */}
            {ghostedApps.length > 0 && (
              <Card style={{ marginBottom: '24px', borderColor: 'rgba(255,107,107,0.2)', background: 'rgba(255,107,107,0.04)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                  <AlertCircle size={18} style={{ color: '#FF6B6B' }} />
                  <CardTitle>👻 Ghost Detector — No response in 14+ days</CardTitle>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {ghostedApps.map((g, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 14px', background: 'rgba(255,107,107,0.06)', borderRadius: '10px', border: '1px solid rgba(255,107,107,0.15)', flexWrap: 'wrap', gap: '8px' }}>
                      <div>
                        <div style={{ fontFamily: 'Sora, sans-serif', fontSize: '14px', color: 'var(--text-primary)', fontWeight: 700 }}>{g.company}</div>
                        <div style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '12px', color: 'var(--text-secondary)' }}>{g.role} · ATS {g.ats}%</div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '12px', color: '#FF6B6B' }}>{g.daysAgo} days ago</span>
                        <button style={{ padding: '6px 12px', borderRadius: '8px', border: '1px solid rgba(255,107,107,0.3)', background: 'none', cursor: 'pointer', fontFamily: 'Sora, sans-serif', fontSize: '12px', color: '#FF6B6B', fontWeight: 700 }}>Follow Up</button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </>
        ) : activeView === 'applications' ? (
          <Card>
            <CardTitle>Recent Applications</CardTitle>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {recentApps.map((app, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px', background: 'var(--surface-2)', borderRadius: '12px', border: '1px solid var(--border)', flexWrap: 'wrap', gap: '10px' }}>
                  <div>
                    <div style={{ fontFamily: 'Sora, sans-serif', fontSize: '14px', color: 'var(--text-primary)', fontWeight: 700 }}>{app.company}</div>
                    <div style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '12px', color: 'var(--text-secondary)' }}>{app.role}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <StatusPill status={app.status} />
                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '12px', color: app.ats >= 90 ? '#3DB87A' : '#E09643', fontWeight: 700 }}>{app.ats}%</span>
                    <span style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '12px', color: 'var(--text-tertiary)' }}>{app.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        ) : (
          /* Insights tab */
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {[
              { icon: '🎯', title: 'Your best platform', body: 'Applications via referral convert at 60% — 5× better than cold LinkedIn. Ask your network first.', color: '#3DB87A' },
              { icon: '⚡', title: 'Apply on Tuesdays', body: 'Your Tuesday applications have a 35% higher response rate. Recruiters are most active midweek.', color: '#E09643' },
              { icon: '📝', title: 'Cover letter impact', body: 'Applications with Finch cover letters have a 2.4× higher screen rate vs. submitted-without.', color: '#9B7FE8' },
              { icon: '🔍', title: 'ATS sweet spot', body: 'Your applications with ATS scores 88–95 have the best response rates. Stay in that range.', color: '#D43C33' },
              { icon: '📈', title: 'Growing streak', body: 'You\'ve applied 3 days in a row. Users with 5+ day streaks see 40% more responses on average.', color: '#E09643' },
              { icon: '🚀', title: 'Top performing role', body: '"Product Engineer Intern" has your highest response rate at 40%. Apply more of these.', color: '#3DB87A' },
            ].map((ins, i) => (
              <Card key={i} style={{ borderLeft: `3px solid ${ins.color}` }}>
                <div style={{ fontSize: '28px', marginBottom: '12px' }}>{ins.icon}</div>
                <div style={{ fontFamily: 'Sora, sans-serif', fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>{ins.title}</div>
                <p style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>{ins.body}</p>
              </Card>
            ))}
          </div>
        )}
      </div>

      <FinchFooter />

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