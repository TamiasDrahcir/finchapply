const ACCOUNT_KEY = 'finch-user';
const SIGNUP_KEY = 'finch-signed-up';
const SESSION_KEY = 'finch-session';
export const ACCOUNT_EVENT = 'finch-signup-updated';
export const USERNAME_REGEX = /^[a-zA-Z0-9_]{3,20}$/;

function canUseStorage() {
  return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
}

export function getStoredAccount() {
  if (!canUseStorage()) return null;
  try {
    const raw = localStorage.getItem(ACCOUNT_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function hasStoredAccount() {
  if (!canUseStorage()) return false;
  return !!getStoredAccount() || localStorage.getItem(SIGNUP_KEY) === '1';
}

export function isLoggedIn() {
  if (!canUseStorage()) return false;
  return localStorage.getItem(SESSION_KEY) === '1';
}

export function registerLocalAccount({ username, password, universityEmail = '', linkedin = '' }) {
  if (!canUseStorage()) return;
  const account = {
    username,
    password,
    universityEmail,
    linkedin,
    createdAt: new Date().toISOString(),
  };
  localStorage.setItem(ACCOUNT_KEY, JSON.stringify(account));
  localStorage.setItem(SIGNUP_KEY, '1');
  localStorage.setItem(SESSION_KEY, '1');
  window.dispatchEvent(new Event(ACCOUNT_EVENT));
}

export function updateLocalAccountCredentials({ username, currentPassword, newPassword }) {
  if (!canUseStorage()) {
    return { ok: false, error: 'Storage is unavailable' };
  }

  const account = getStoredAccount();
  if (!account) {
    return { ok: false, error: 'No account found' };
  }

  const trimmedUsername = username?.trim() ?? account.username;
  const wantsPasswordChange = Boolean(newPassword);

  if (!USERNAME_REGEX.test(trimmedUsername)) {
    return { ok: false, field: 'username', error: 'Username must be 3-20 characters and use only letters, numbers, or underscores' };
  }

  if (wantsPasswordChange && account.password !== currentPassword) {
    return { ok: false, field: 'currentPassword', error: 'Current password is incorrect' };
  }

  const nextAccount = {
    ...account,
    username: trimmedUsername,
    password: wantsPasswordChange ? newPassword : account.password,
    updatedAt: new Date().toISOString(),
  };

  localStorage.setItem(ACCOUNT_KEY, JSON.stringify(nextAccount));
  localStorage.setItem(SIGNUP_KEY, '1');
  localStorage.setItem(SESSION_KEY, '1');
  window.dispatchEvent(new Event(ACCOUNT_EVENT));
  return { ok: true, account: nextAccount };
}

export function updateLocalAccountProfile({ universityEmail, linkedin }) {
  if (!canUseStorage()) {
    return { ok: false, error: 'Storage is unavailable' };
  }

  const account = getStoredAccount();
  if (!account) {
    return { ok: false, error: 'No account found' };
  }

  const nextAccount = {
    ...account,
    universityEmail: universityEmail ?? account.universityEmail ?? '',
    linkedin: linkedin ?? account.linkedin ?? '',
    updatedAt: new Date().toISOString(),
  };

  localStorage.setItem(ACCOUNT_KEY, JSON.stringify(nextAccount));
  window.dispatchEvent(new Event(ACCOUNT_EVENT));
  return { ok: true, account: nextAccount };
}

export function loginLocalAccount({ username, password }) {
  if (!canUseStorage()) {
    return { ok: false, error: 'Storage is unavailable' };
  }

  const account = getStoredAccount();
  if (!account) {
    return { ok: false, error: 'No account found. Create an account first.' };
  }

  if (account.username !== username.trim()) {
    return { ok: false, error: 'Username not found' };
  }

  if (account.password !== password) {
    return { ok: false, error: 'Incorrect password' };
  }

  localStorage.setItem(SESSION_KEY, '1');
  window.dispatchEvent(new Event(ACCOUNT_EVENT));
  return { ok: true, account };
}

export function logoutLocalAccount() {
  if (!canUseStorage()) return;
  localStorage.removeItem(SESSION_KEY);
  window.dispatchEvent(new Event(ACCOUNT_EVENT));
}
