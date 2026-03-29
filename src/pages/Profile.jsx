import { useState } from 'react';
import Navbar from '../components/Navbar';
import FinchFooter from '../components/FinchFooter';
import SignupModal from '../components/SignupModal';
import { getStoredAccount, isLoggedIn, updateLocalAccountCredentials, updateLocalAccountProfile, USERNAME_REGEX } from '@/lib/local-account';

const LINKEDIN_PROFILE_REGEX = /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[A-Za-z0-9-]+\/?(?:\?.*)?(?:#.*)?$/i;

const passwordChecksFor = (password) => [
  { label: 'At least 8 characters', valid: password.length >= 8 },
  { label: 'One uppercase letter', valid: /[A-Z]/.test(password) },
  { label: 'One lowercase letter', valid: /[a-z]/.test(password) },
  { label: 'One number', valid: /\d/.test(password) },
  { label: 'One special character', valid: /[^A-Za-z0-9]/.test(password) },
];

export default function Profile() {
  const [showModal, setShowModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [account, setAccount] = useState(() => getStoredAccount());
  const [form, setForm] = useState({
    username: account?.username || '',
    universityEmail: account?.universityEmail || '',
    linkedin: account?.linkedin || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({ username: '', universityEmail: '', linkedin: '', currentPassword: '', newPassword: '', confirmPassword: '' });
  const [saved, setSaved] = useState(false);

  const openSignupModal = () => { setAuthMode('signup'); setShowModal(true); };
  const openLoginModal = () => { setAuthMode('login'); setShowModal(true); };
  const handleAuthSuccess = () => {
    setShowModal(false);
    window.location.href = '/profile';
  };

  const handleSave = (e) => {
    e.preventDefault();
    const nextErrors = {};
    const wantsPasswordChange = Boolean(form.currentPassword || form.newPassword || form.confirmPassword);
    const passwordChecks = passwordChecksFor(form.newPassword);

    if (!USERNAME_REGEX.test(form.username.trim())) {
      nextErrors.username = 'Username must be 3-20 characters and use only letters, numbers, or underscores';
    }
    if (form.universityEmail.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.universityEmail.trim())) {
      nextErrors.universityEmail = 'Enter a valid email address';
    }
    if (form.linkedin.trim() && !LINKEDIN_PROFILE_REGEX.test(form.linkedin.trim())) {
      nextErrors.linkedin = 'Enter a valid LinkedIn URL';
    }
    if (wantsPasswordChange) {
      if (!form.currentPassword) {
        nextErrors.currentPassword = 'Enter your current password';
      }
      if (!passwordChecks.every(check => check.valid)) {
        nextErrors.newPassword = 'New password does not meet the required constraints';
      }
      if (form.confirmPassword !== form.newPassword) {
        nextErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const credentialsResult = updateLocalAccountCredentials({
      username: form.username.trim(),
      currentPassword: form.currentPassword,
      newPassword: wantsPasswordChange ? form.newPassword : '',
    });

    if (!credentialsResult.ok) {
      setErrors(current => ({ ...current, [credentialsResult.field || 'currentPassword']: credentialsResult.error }));
      return;
    }

    const profileResult = updateLocalAccountProfile({
      universityEmail: form.universityEmail.trim(),
      linkedin: form.linkedin.trim(),
    });

    if (!profileResult.ok) {
      setErrors(current => ({ ...current, linkedin: profileResult.error }));
      return;
    }

    setAccount(profileResult.account);
    setForm(current => ({
      ...current,
      username: profileResult.account.username || current.username,
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    }));
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  };

  if (!isLoggedIn()) {
    return (
      <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
        <Navbar onGetAccess={openSignupModal} onSignIn={openLoginModal} />
        <div style={{ paddingTop: '96px' }}>
          <section style={{ padding: '100px 24px', maxWidth: '680px', margin: '0 auto', textAlign: 'center' }}>
            <h1 style={{ fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: 'clamp(28px, 5vw, 48px)', color: 'var(--text-primary)', marginBottom: '16px' }}>
              Log in to view your profile
            </h1>
            <p style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '17px', color: 'var(--text-secondary)', marginBottom: '32px' }}>
              Create an account or log in to manage your university email and LinkedIn details.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button onClick={openLoginModal} className="btn-primary" style={{ height: '52px', padding: '0 28px', fontSize: '15px' }}>
                Log In →
              </button>
              <button onClick={openSignupModal} style={{
                height: '52px', padding: '0 28px', borderRadius: '12px', border: '1px solid var(--border)', background: 'var(--card-bg)',
                color: 'var(--text-primary)', fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: '15px', cursor: 'pointer',
              }}>
                Create Account
              </button>
            </div>
          </section>
          <FinchFooter />
        </div>

        {showModal && (
          <SignupModal
            onClose={() => setShowModal(false)}
            onSuccess={handleAuthSuccess}
            initialMode={authMode}
          />
        )}
      </div>
    );
  }

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <Navbar onGetAccess={openSignupModal} onSignIn={openLoginModal} />
      <div style={{ paddingTop: '96px' }}>
        <section style={{ padding: '80px 24px 100px', maxWidth: '760px', margin: '0 auto' }}>
          <div className="eyebrow" style={{ marginBottom: '18px' }}>PROFILE</div>
          <h1 style={{ fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: 'clamp(28px, 5vw, 48px)', color: 'var(--text-primary)', marginBottom: '12px' }}>
            Your Finch profile
          </h1>
          <p style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '17px', color: 'var(--text-secondary)', marginBottom: '36px' }}>
            Update your username, password, and optional profile details whenever you need.
          </p>

          <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: '24px', padding: '32px' }}>
            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div>
                <label style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '12px', color: 'var(--text-tertiary)', letterSpacing: '1px', display: 'block', marginBottom: '6px' }}>
                  USERNAME
                </label>
                <input
                  type="text"
                  value={form.username}
                  onChange={e => setForm(current => ({ ...current, username: e.target.value }))}
                  placeholder="your_username"
                  style={{
                    width: '100%', height: '48px', padding: '0 16px', borderRadius: '12px', boxSizing: 'border-box',
                    border: `1px solid ${errors.username ? '#D43C33' : 'var(--border)'}`,
                    background: 'var(--surface-2)', color: 'var(--text-primary)', fontFamily: 'Nunito Sans, sans-serif', fontSize: '15px', outline: 'none',
                  }}
                />
                {errors.username && <div style={{ marginTop: '6px', fontFamily: 'Nunito Sans, sans-serif', fontSize: '12px', color: '#D43C33' }}>{errors.username}</div>}
              </div>

              <div>
                <label style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '12px', color: 'var(--text-tertiary)', letterSpacing: '1px', display: 'block', marginBottom: '6px' }}>
                  UNIVERSITY EMAIL (OPTIONAL)
                </label>
                <input
                  type="email"
                  value={form.universityEmail}
                  onChange={e => setForm(current => ({ ...current, universityEmail: e.target.value }))}
                  placeholder="you@university.edu"
                  style={{
                    width: '100%', height: '48px', padding: '0 16px', borderRadius: '12px', boxSizing: 'border-box',
                    border: `1px solid ${errors.universityEmail ? '#D43C33' : 'var(--border)'}`,
                    background: 'var(--surface-2)', color: 'var(--text-primary)', fontFamily: 'Nunito Sans, sans-serif', fontSize: '15px', outline: 'none',
                  }}
                />
                {errors.universityEmail && <div style={{ marginTop: '6px', fontFamily: 'Nunito Sans, sans-serif', fontSize: '12px', color: '#D43C33' }}>{errors.universityEmail}</div>}
              </div>

              <div>
                <label style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '12px', color: 'var(--text-tertiary)', letterSpacing: '1px', display: 'block', marginBottom: '6px' }}>
                  LINKEDIN URL (OPTIONAL)
                </label>
                <input
                  type="text"
                  value={form.linkedin}
                  onChange={e => setForm(current => ({ ...current, linkedin: e.target.value }))}
                  placeholder="https://linkedin.com/in/yourname"
                  style={{
                    width: '100%', height: '48px', padding: '0 16px', borderRadius: '12px', boxSizing: 'border-box',
                    border: `1px solid ${errors.linkedin ? '#D43C33' : 'var(--border)'}`,
                    background: 'var(--surface-2)', color: 'var(--text-primary)', fontFamily: 'Nunito Sans, sans-serif', fontSize: '15px', outline: 'none',
                  }}
                />
                {errors.linkedin && <div style={{ marginTop: '6px', fontFamily: 'Nunito Sans, sans-serif', fontSize: '12px', color: '#D43C33' }}>{errors.linkedin}</div>}
              </div>

              <div style={{ marginTop: '12px', paddingTop: '20px', borderTop: '1px solid var(--border)' }}>
                <div style={{ fontFamily: 'Sora, sans-serif', fontSize: '18px', color: 'var(--text-primary)', fontWeight: 700, marginBottom: '8px' }}>
                  Change password
                </div>
                <div style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                  Leave these blank if you want to keep your current password.
                </div>

                <div style={{ display: 'grid', gap: '18px', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
                  <div>
                    <label style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '12px', color: 'var(--text-tertiary)', letterSpacing: '1px', display: 'block', marginBottom: '6px' }}>
                      CURRENT PASSWORD
                    </label>
                    <input
                      type="password"
                      value={form.currentPassword}
                      onChange={e => setForm(current => ({ ...current, currentPassword: e.target.value }))}
                      placeholder="Enter current password"
                      style={{
                        width: '100%', height: '48px', padding: '0 16px', borderRadius: '12px', boxSizing: 'border-box',
                        border: `1px solid ${errors.currentPassword ? '#D43C33' : 'var(--border)'}`,
                        background: 'var(--surface-2)', color: 'var(--text-primary)', fontFamily: 'Nunito Sans, sans-serif', fontSize: '15px', outline: 'none',
                      }}
                    />
                    {errors.currentPassword && <div style={{ marginTop: '6px', fontFamily: 'Nunito Sans, sans-serif', fontSize: '12px', color: '#D43C33' }}>{errors.currentPassword}</div>}
                  </div>

                  <div>
                    <label style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '12px', color: 'var(--text-tertiary)', letterSpacing: '1px', display: 'block', marginBottom: '6px' }}>
                      NEW PASSWORD
                    </label>
                    <input
                      type="password"
                      value={form.newPassword}
                      onChange={e => setForm(current => ({ ...current, newPassword: e.target.value }))}
                      placeholder="Enter new password"
                      style={{
                        width: '100%', height: '48px', padding: '0 16px', borderRadius: '12px', boxSizing: 'border-box',
                        border: `1px solid ${errors.newPassword ? '#D43C33' : 'var(--border)'}`,
                        background: 'var(--surface-2)', color: 'var(--text-primary)', fontFamily: 'Nunito Sans, sans-serif', fontSize: '15px', outline: 'none',
                      }}
                    />
                    {errors.newPassword && <div style={{ marginTop: '6px', fontFamily: 'Nunito Sans, sans-serif', fontSize: '12px', color: '#D43C33' }}>{errors.newPassword}</div>}
                  </div>

                  <div>
                    <label style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '12px', color: 'var(--text-tertiary)', letterSpacing: '1px', display: 'block', marginBottom: '6px' }}>
                      CONFIRM NEW PASSWORD
                    </label>
                    <input
                      type="password"
                      value={form.confirmPassword}
                      onChange={e => setForm(current => ({ ...current, confirmPassword: e.target.value }))}
                      placeholder="Confirm new password"
                      style={{
                        width: '100%', height: '48px', padding: '0 16px', borderRadius: '12px', boxSizing: 'border-box',
                        border: `1px solid ${errors.confirmPassword ? '#D43C33' : 'var(--border)'}`,
                        background: 'var(--surface-2)', color: 'var(--text-primary)', fontFamily: 'Nunito Sans, sans-serif', fontSize: '15px', outline: 'none',
                      }}
                    />
                    {errors.confirmPassword && <div style={{ marginTop: '6px', fontFamily: 'Nunito Sans, sans-serif', fontSize: '12px', color: '#D43C33' }}>{errors.confirmPassword}</div>}
                  </div>
                </div>

                <div style={{ marginTop: '14px', display: 'grid', gap: '6px' }}>
                  {passwordChecksFor(form.newPassword).map(check => (
                    <div key={check.label} style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '13px', color: check.valid ? '#3DB87A' : 'var(--text-secondary)' }}>
                      {check.valid ? '✓' : '•'} {check.label}
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginTop: '6px' }}>
                <button type="submit" className="btn-primary" style={{ height: '50px', padding: '0 24px', fontSize: '15px' }}>
                  Save Profile
                </button>
                {saved && (
                  <div style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '14px', color: '#3DB87A', fontWeight: 700 }}>
                    Saved
                  </div>
                )}
              </div>
            </form>
          </div>
        </section>
        <FinchFooter />
      </div>

      {showModal && (
        <SignupModal
          onClose={() => setShowModal(false)}
          onSuccess={handleAuthSuccess}
          initialMode={authMode}
        />
      )}
    </div>
  );
}
