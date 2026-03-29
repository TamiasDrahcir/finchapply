import { createServer } from 'node:http';

const port = Number(process.env.WAITLIST_WEBHOOK_PORT || 8787);
const seenEmails = new Set();

const json = (res, status, body) => {
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS, GET',
    'Access-Control-Allow-Headers': 'Content-Type',
  });
  res.end(JSON.stringify(body));
};

const parseBody = (req) => new Promise((resolve, reject) => {
  let raw = '';
  req.on('data', (chunk) => {
    raw += chunk;
    if (raw.length > 1_000_000) {
      reject(new Error('Payload too large'));
      req.destroy();
    }
  });
  req.on('end', () => {
    if (!raw) {
      resolve({});
      return;
    }
    try {
      resolve(JSON.parse(raw));
    } catch {
      reject(new Error('Invalid JSON body'));
    }
  });
  req.on('error', reject);
});

const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const server = createServer(async (req, res) => {
  if (req.method === 'OPTIONS') {
    json(res, 204, {});
    return;
  }

  if (req.method === 'GET' && req.url === '/health') {
    json(res, 200, { ok: true, service: 'waitlist-webhook-local' });
    return;
  }

  if (req.method === 'POST' && req.url === '/waitlist') {
    try {
      const body = await parseBody(req);
      const email = String(body?.email || '').trim().toLowerCase();
      const university = String(body?.university || '').trim();

      if (!validateEmail(email)) {
        json(res, 400, { ok: false, error: 'Valid email is required' });
        return;
      }

      const duplicate = seenEmails.has(email);
      if (!duplicate) {
        seenEmails.add(email);
      }

      console.log(`[waitlist] ${duplicate ? 'duplicate' : 'new'}: ${email}${university ? ` | ${university}` : ''}`);

      json(res, 200, {
        ok: true,
        duplicate,
        emailSent: true,
      });
    } catch (error) {
      json(res, 400, { ok: false, error: String(error?.message || error) });
    }
    return;
  }

  json(res, 404, { ok: false, error: 'Not found' });
});

server.listen(port, () => {
  console.log(`Local waitlist webhook listening on http://127.0.0.1:${port}`);
  console.log(`POST endpoint: http://127.0.0.1:${port}/waitlist`);
});
