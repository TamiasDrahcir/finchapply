import { useState } from 'react';
import { Eye, EyeOff, X } from 'lucide-react';
import { getStoredAccount, loginLocalAccount, registerLocalAccount } from '@/lib/local-account';

const LINKEDIN_PROFILE_REGEX = /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[A-Za-z0-9-]+\/?(?:\?.*)?(?:#.*)?$/i;

export default function SignupModal({ onClose, onSuccess, pendingPrompt = '', initialMode = 'signup' }) {
  const [mode, setMode] = useState(initialMode);
  const [form, setForm] = useState({ username: '', password: '', confirmPassword: '', universityEmail: '', linkedin: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [doneMessage, setDoneMessage] = useState('Account created! Taking you home...');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [forgotPasswordMessage, setForgotPasswordMessage] = useState('');

  const passwordChecks = [
    { label: 'At least 8 characters', valid: form.password.length >= 8 },
    { label: 'One uppercase letter', valid: /[A-Z]/.test(form.password) },
    { label: 'One lowercase letter', valid: /[a-z]/.test(form.password) },
    { label: 'One number', valid: /\d/.test(form.password) },
    { label: 'One special character', valid: /[^A-Za-z0-9]/.test(form.password) },
  ];
  const passwordStrengthScore = passwordChecks.filter(check => check.valid).length;
  const passwordStrengthLabel = ['Very weak', 'Weak', 'Fair', 'Good', 'Strong', 'Excellent'][passwordStrengthScore];
  const passwordStrengthColor = ['#D43C33', '#D43C33', '#E09643', '#E09643', '#3DB87A', '#3DB87A'][passwordStrengthScore];

  const validate = () => {
    const nextErrors = {};
    if (!/^[a-zA-Z0-9_]{3,20}$/.test(form.username.trim())) {
      nextErrors.username = 'Username must be 3-20 characters and use only letters, numbers, or underscores';
    }
    if (mode === 'signup') {
      if (form.universityEmail.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.universityEmail.trim())) {
        nextErrors.universityEmail = 'Enter a valid email address';
      }
      if (form.linkedin.trim() && !LINKEDIN_PROFILE_REGEX.test(form.linkedin.trim())) {
        nextErrors.linkedin = 'Enter a valid LinkedIn URL';
      }
      if (!passwordChecks.every(check => check.valid)) {
        nextErrors.password = 'Password does not meet the required constraints';
      }
      if (form.confirmPassword !== form.password) {
        nextErrors.confirmPassword = 'Passwords do not match';
      }
      if (getStoredAccount()?.username === form.username.trim()) {
        nextErrors.username = 'That username is already taken';
      }
    } else if (!form.password) {
      nextErrors.password = 'Password is required';
    }
    return nextErrors;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setForgotPasswordMessage('');
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setLoading(true);
    if (mode === 'signup') {
      registerLocalAccount({
        username: form.username.trim(),
        password: form.password,
        universityEmail: form.universityEmail.trim(),
        linkedin: form.linkedin.trim(),
      });
      setDoneMessage('Account created! Taking you home...');
      setDone(true);
      setTimeout(() => {
        setLoading(false);
        onSuccess?.();
      }, 900);
      return;
    }

    const result = loginLocalAccount({ username: form.username.trim(), password: form.password });
    if (!result.ok) {
      setErrors({ password: result.error });
      setLoading(false);
      return;
    }

    setDoneMessage('Welcome back! Taking you home...');
    setDone(true);
    setTimeout(() => {
      setLoading(false);
      onSuccess?.();
    }, 900);
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 500,
      background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px',
      animation: 'slideUp 0.25s ease',
    }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{
        background: 'var(--card-bg)', border: '1px solid var(--border)',
        borderRadius: '24px', padding: '40px', width: '100%', maxWidth: mode === 'signup' ? '760px' : '460px',
        position: 'relative',
      }}>
        <button onClick={onClose} style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-tertiary)' }}>
          <X size={20} />
        </button>

        {done ? (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎉</div>
            <div style={{ fontFamily: 'Sora, sans-serif', fontSize: '22px', color: 'var(--text-primary)', fontWeight: 700 }}>
              {doneMessage}
            </div>
          </div>
        ) : (
          <>
            <div style={{ marginBottom: '24px' }}>
              <div style={{ fontFamily: 'Sora, sans-serif', fontSize: '24px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
                {mode === 'signup' ? 'Create your profile' : 'Log in to Finch'}
              </div>
              {pendingPrompt && (
                <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: '10px', padding: '10px 14px', marginBottom: '16px' }}>
                  <div style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '12px', color: 'var(--text-tertiary)', marginBottom: '4px' }}>Your search</div>
                  <div style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '14px', color: 'var(--text-primary)' }}>"{pendingPrompt}"</div>
                </div>
              )}
              <p style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '15px', color: 'var(--text-secondary)' }}>
                {mode === 'signup'
                  ? 'Create your account to save your profile and get started.'
                  : 'Use your existing username and password to continue.'}
              </p>
            </div>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
              {['signup', 'login'].map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    setMode(option);
                    setErrors({});
                    setForgotPasswordMessage('');
                    setForm({ username: '', password: '', confirmPassword: '', universityEmail: '', linkedin: '' });
                    setShowPassword(false);
                    setShowConfirmPassword(false);
                  }}
                  style={{
                    flex: 1,
                    height: '42px',
                    borderRadius: '12px',
                    border: mode === option ? '1px solid #D43C33' : '1px solid var(--border)',
                    background: mode === option ? 'rgba(212,60,51,0.1)' : 'var(--surface-2)',
                    color: mode === option ? '#D43C33' : 'var(--text-secondary)',
                    fontFamily: 'Sora, sans-serif', fontSize: '13px', fontWeight: 700, cursor: 'pointer',
                  }}
                >
                  {option === 'signup' ? 'Create Account' : 'Log In'}
                </button>
              ))}
            </div>

            <>
                <div style={{
                  background: 'linear-gradient(135deg, rgba(10,102,194,0.08), rgba(212,60,51,0.06))',
                  border: '1px solid rgba(10,102,194,0.2)',
                  borderRadius: '12px', padding: '12px 16px', marginBottom: '16px',
                  display: 'flex', gap: '10px', alignItems: 'flex-start',
                }}>
                  <span style={{ fontSize: '20px' }}>💼</span>
                  <div>
                    <div style={{ fontFamily: 'Sora, sans-serif', fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '3px' }}>
                      {mode === 'signup' ? 'Create a secure Finch account' : 'Log in to your Finch account'}
                    </div>
                    <div style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                      {mode === 'signup'
                        ? 'Your password must include upper and lowercase letters, a number, and a special character.'
                        : 'Enter the username and password you created earlier.'}
                    </div>
                  </div>
                </div>

                <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {mode === 'signup' ? (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '18px', alignItems: 'start' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                        {[
                          { key: 'username', label: 'Username *', placeholder: 'your_username', type: 'text' },
                          { key: 'universityEmail', label: 'University Email (Optional)', placeholder: 'you@university.edu', type: 'email' },
                          { key: 'linkedin', label: 'LinkedIn URL (Optional)', placeholder: 'https://linkedin.com/in/yourname', type: 'text' },
                        ].map(f => (
                          <div key={f.key}>
                            <label style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '12px', color: 'var(--text-tertiary)', letterSpacing: '1px', display: 'block', marginBottom: '6px' }}>
                              {f.label.toUpperCase()}
                            </label>
                            <div style={{ position: 'relative' }}>
                              <input
                                type={f.type}
                                placeholder={f.placeholder}
                                value={form[f.key]}
                                onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                                style={{
                                  width: '100%', height: '48px', padding: '0 16px',
                                  background: 'var(--surface-2)', border: `1px solid ${errors[f.key] ? '#D43C33' : 'var(--border)'}`,
                                  borderRadius: '12px', color: 'var(--text-primary)',
                                  fontFamily: 'Nunito Sans, sans-serif', fontSize: '15px',
                                  outline: 'none', boxSizing: 'border-box',
                                }}
                              />
                            </div>
                            {errors[f.key] && (
                              <div style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '12px', color: '#D43C33', marginTop: '6px' }}>
                                {errors[f.key]}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                        {[
                          { key: 'password', label: 'Password *', placeholder: 'Create a strong password', type: 'password' },
                          { key: 'confirmPassword', label: 'Confirm Password *', placeholder: 'Re-enter your password', type: 'password' },
                        ].map(f => (
                          <div key={f.key}>
                            <label style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '12px', color: 'var(--text-tertiary)', letterSpacing: '1px', display: 'block', marginBottom: '6px' }}>
                              {f.label.toUpperCase()}
                            </label>
                            <div style={{ position: 'relative' }}>
                              <input
                                type={f.key === 'password' ? (showPassword ? 'text' : 'password') : (showConfirmPassword ? 'text' : 'password')}
                                placeholder={f.placeholder}
                                value={form[f.key]}
                                onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                                style={{
                                  width: '100%', height: '48px', padding: '0 48px 0 16px',
                                  background: 'var(--surface-2)', border: `1px solid ${errors[f.key] ? '#D43C33' : 'var(--border)'}`,
                                  borderRadius: '12px', color: 'var(--text-primary)',
                                  fontFamily: 'Nunito Sans, sans-serif', fontSize: '15px',
                                  outline: 'none', boxSizing: 'border-box',
                                }}
                              />
                              <button
                                type="button"
                                onClick={() => f.key === 'password' ? setShowPassword(v => !v) : setShowConfirmPassword(v => !v)}
                                style={{
                                  position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)',
                                  background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-tertiary)', padding: 0,
                                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                                }}
                              >
                                {(f.key === 'password' ? showPassword : showConfirmPassword) ? <EyeOff size={18} /> : <Eye size={18} />}
                              </button>
                            </div>
                            {errors[f.key] && (
                              <div style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '12px', color: '#D43C33', marginTop: '6px' }}>
                                {errors[f.key]}
                              </div>
                            )}
                          </div>
                        ))}

                        <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: '12px', padding: '12px 14px' }}>
                          <div style={{ fontFamily: 'Sora, sans-serif', fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px' }}>
                            Password requirements
                          </div>
                          <div style={{ marginBottom: '12px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                              <span style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '12px', color: 'var(--text-secondary)' }}>Strength</span>
                              <span style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '12px', color: passwordStrengthColor, fontWeight: 700 }}>{passwordStrengthLabel}</span>
                            </div>
                            <div style={{ height: '8px', borderRadius: '999px', background: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
                              <div style={{ height: '100%', width: `${(passwordStrengthScore / 5) * 100}%`, background: passwordStrengthColor, borderRadius: '999px', transition: 'width 0.2s ease' }} />
                            </div>
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            {passwordChecks.map((check) => (
                              <div key={check.label} style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '12px', color: check.valid ? '#3DB87A' : 'var(--text-secondary)' }}>
                                {check.valid ? '✓' : '•'} {check.label}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      {[
                        { key: 'username', label: 'Username *', placeholder: 'your_username', type: 'text' },
                        { key: 'password', label: 'Password *', placeholder: 'Enter your password', type: 'password' },
                      ].map(f => (
                        <div key={f.key}>
                          <label style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '12px', color: 'var(--text-tertiary)', letterSpacing: '1px', display: 'block', marginBottom: '6px' }}>
                            {f.label.toUpperCase()}
                          </label>
                          <div style={{ position: 'relative' }}>
                            <input
                              type={f.key === 'password' ? (showPassword ? 'text' : 'password') : f.type}
                              placeholder={f.placeholder}
                              value={form[f.key]}
                              onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                              style={{
                                width: '100%', height: '48px', padding: f.key === 'password' ? '0 48px 0 16px' : '0 16px',
                                background: 'var(--surface-2)', border: `1px solid ${errors[f.key] ? '#D43C33' : 'var(--border)'}`,
                                borderRadius: '12px', color: 'var(--text-primary)',
                                fontFamily: 'Nunito Sans, sans-serif', fontSize: '15px',
                                outline: 'none', boxSizing: 'border-box',
                              }}
                            />
                            {f.key === 'password' && (
                              <button
                                type="button"
                                onClick={() => setShowPassword(v => !v)}
                                style={{
                                  position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)',
                                  background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-tertiary)', padding: 0,
                                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                                }}
                              >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                              </button>
                            )}
                          </div>
                          {errors[f.key] && (
                            <div style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '12px', color: '#D43C33', marginTop: '6px' }}>
                              {errors[f.key]}
                            </div>
                          )}
                        </div>
                      ))}
                    </>
                  )}
                  <button type="submit" className="btn-primary" style={{ height: '52px', fontSize: '15px', width: '100%', marginTop: '4px' }}>
                    {loading ? (mode === 'signup' ? 'Creating account...' : 'Logging in...') : (mode === 'signup' ? 'Get Started →' : 'Log In →')}
                  </button>
                  {mode === 'login' && (
                    <>
                      <button
                        type="button"
                        onClick={() => setForgotPasswordMessage('Password reset is not available yet. For now, create a new local account or use your existing saved password.')}
                        style={{
                          alignSelf: 'flex-start',
                          background: 'none', border: 'none', padding: 0, cursor: 'pointer',
                          fontFamily: 'Nunito Sans, sans-serif', fontSize: '13px', color: '#D43C33', textDecoration: 'underline',
                        }}
                      >
                        Forgot password?
                      </button>
                      {forgotPasswordMessage && (
                        <div style={{ background: 'rgba(224,150,67,0.1)', border: '1px solid rgba(224,150,67,0.35)', borderRadius: '10px', padding: '10px 12px', fontFamily: 'Nunito Sans, sans-serif', fontSize: '13px', color: 'var(--text-secondary)' }}>
                          {forgotPasswordMessage}
                        </div>
                      )}
                    </>
                  )}
                </form>
              </>
          </>
        )}
      </div>
    </div>
  );
}