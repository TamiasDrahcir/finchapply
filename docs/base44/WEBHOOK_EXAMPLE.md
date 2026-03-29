# Waitlist webhook example (Node/Express)

Use this if you want a quick public endpoint for waitlist signup + confirmation emails.

```js
import express from 'express';

const app = express();
app.use(express.json());

app.post('/waitlist', async (req, res) => {
  const email = String(req.body?.email || '').trim().toLowerCase();
  const university = String(req.body?.university || '').trim();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Valid email is required' });
  }

  // 1) Save to your DB / Airtable / Sheets / CRM
  // 2) Send confirmation email (Resend, SendGrid, Postmark, etc.)

  // Example success response consumed by frontend helper:
  return res.status(200).json({ ok: true, emailSent: true });
});

app.listen(3001, () => console.log('waitlist webhook running on :3001'));
```

Then set:

- `VITE_WAITLIST_WEBHOOK_URL=https://<your-domain>/waitlist`
