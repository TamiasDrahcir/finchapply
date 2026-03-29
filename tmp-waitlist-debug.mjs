import { createClient } from '@base44/sdk';

const base44 = createClient({
  appId: '69c81d5f864154982a5a748a',
  appBaseUrl: 'https://finch-career-path.base44.app/',
  requiresAuth: false,
});

try {
  const email = `debug+${Date.now()}@example.com`;
  const existing = await base44.entities.WaitlistSignup.filter({ email });
  console.log('filter ok', Array.isArray(existing), existing.length);
  const created = await base44.entities.WaitlistSignup.create({ email });
  console.log('create ok', created?.id || created);
} catch (e) {
  console.error('ERROR_STATUS', e?.response?.status);
  console.error('ERROR_DATA', JSON.stringify(e?.response?.data || null));
  console.error('ERROR_MESSAGE', e?.message || String(e));
  process.exitCode = 1;
}
