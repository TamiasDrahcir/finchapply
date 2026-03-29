import { base44 } from '@/api/base44Client';

const normalizeEmail = (email) => email.trim().toLowerCase();
const LOCAL_WAITLIST_EMAILS_KEY = 'finch-waitlist-emails';

const getStoredEmails = () => {
  if (typeof window === 'undefined') return new Set();
  try {
    const raw = localStorage.getItem(LOCAL_WAITLIST_EMAILS_KEY);
    const arr = raw ? JSON.parse(raw) : [];
    return new Set(Array.isArray(arr) ? arr : []);
  } catch {
    return new Set();
  }
};

const storeEmail = (email) => {
  if (typeof window === 'undefined') return;
  const next = getStoredEmails();
  next.add(email);
  localStorage.setItem(LOCAL_WAITLIST_EMAILS_KEY, JSON.stringify(Array.from(next)));
};

const submitToWebhook = async (payload) => {
  const url = import.meta.env.VITE_WAITLIST_WEBHOOK_URL;
  if (!url) return null;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...payload,
      source: 'finch_waitlist',
      createdAt: new Date().toISOString(),
    }),
  });

  if (!response.ok) {
    const text = await response.text().catch(() => '');
    throw new Error(`waitlist_webhook_failed:${response.status}:${text}`);
  }

  const data = await response.json().catch(() => ({}));
  return { emailSent: data?.emailSent ?? true };
};

export async function createWaitlistSignup({ email, university }) {
  const normalizedEmail = normalizeEmail(email || '');
  if (!normalizedEmail) {
    throw new Error('Email is required');
  }

  const stored = getStoredEmails();
  if (stored.has(normalizedEmail)) {
    return { duplicate: true, emailSent: false };
  }

  const payload = { email: normalizedEmail };
  if (university?.trim()) {
    payload.university = university.trim();
  }

  const webhookResult = await submitToWebhook(payload);
  if (webhookResult) {
    storeEmail(normalizedEmail);
    return { duplicate: false, emailSent: webhookResult.emailSent };
  }

  const existing = await base44.entities.WaitlistSignup.filter({ email: normalizedEmail });
  if (existing.length > 0) {
    storeEmail(normalizedEmail);
    return { duplicate: true, emailSent: false };
  }

  await base44.entities.WaitlistSignup.create(payload);

  let emailSent = false;
  try {
    await base44.functions.invoke('sendWaitlistConfirmationEmail', {
      email: normalizedEmail,
      university: payload.university || null,
    });
    emailSent = true;
  } catch (error) {
    console.warn('Waitlist signup saved, but confirmation email failed to send.', error);
  }

  storeEmail(normalizedEmail);

  return { duplicate: false, emailSent };
}
