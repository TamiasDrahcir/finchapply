import { createClient } from '@base44/sdk';
const base44 = createClient({ appId: '69c81d5f864154982a5a748a', appBaseUrl: 'https://finch-career-path.base44.app/', requiresAuth: false });
try {
  const res = await base44.functions.invoke('sendWaitlistConfirmationEmail', { email: 'test@example.com' });
  console.log('invoke ok', JSON.stringify(res?.data || res));
} catch (e) {
  console.error('ERR_MESSAGE', e?.message || String(e));
  console.error('ERR_STATUS', e?.response?.status);
  console.error('ERR_DATA', JSON.stringify(e?.response?.data || null));
}
