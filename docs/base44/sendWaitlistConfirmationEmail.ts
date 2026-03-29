// Base44 Backend Function: sendWaitlistConfirmationEmail
// Provider: Resend (https://resend.com)
//
// Setup in Base44 dashboard:
// 1) Create a backend function named exactly: sendWaitlistConfirmationEmail
// 2) Paste this file's contents into that function
// 3) Add env vars in Base44:
//    - RESEND_API_KEY
//    - RESEND_FROM_EMAIL (e.g. Finch <hello@yourdomain.com>)
//    - WAITLIST_REPLY_TO (optional)
//
// Called from frontend via:
// base44.functions.invoke('sendWaitlistConfirmationEmail', { email, university })

export default async function handler(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const email = String(body?.email || '').trim().toLowerCase();
    const university = String(body?.university || '').trim();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json({ error: 'Valid email is required' }, { status: 400 });
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const from = process.env.RESEND_FROM_EMAIL;
    const replyTo = process.env.WAITLIST_REPLY_TO;

    if (!resendApiKey || !from) {
      return Response.json(
        { error: 'Missing email config. Set RESEND_API_KEY and RESEND_FROM_EMAIL.' },
        { status: 500 }
      );
    }

    const html = `
      <div style="font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; line-height: 1.6; color: #111827;">
        <h2 style="margin: 0 0 12px;">You’re on the Finch waitlist 🎉</h2>
        <p style="margin: 0 0 12px;">Thanks for signing up. We’ll email you as soon as your early access is ready.</p>
        ${university ? `<p style="margin: 0 0 12px;"><strong>University:</strong> ${escapeHtml(university)}</p>` : ''}
        <p style="margin: 16px 0 0; color: #6B7280; font-size: 14px;">If you didn’t request this, you can ignore this email.</p>
      </div>
    `;

    const payload: Record<string, unknown> = {
      from,
      to: [email],
      subject: 'You’re on the Finch waitlist',
      html,
    };

    if (replyTo) {
      payload.reply_to = replyTo;
    }

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      return Response.json(
        { error: 'Resend request failed', details: data },
        { status: 502 }
      );
    }

    return Response.json({ ok: true, provider: 'resend', id: data?.id || null });
  } catch (error) {
    return Response.json(
      { error: 'Unexpected error sending confirmation email', details: String(error) },
      { status: 500 }
    );
  }
}

function escapeHtml(input: string) {
  return input
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}
