# Waitlist email setup

The frontend now uses this order:

1. If `VITE_WAITLIST_WEBHOOK_URL` is set, submit waitlist signup to that webhook (public path, no Base44 login required).
2. If webhook URL is not set, fallback to Base44 entities + `sendWaitlistConfirmationEmail` function.

Both forms use the same helper:

- `src/components/SignupModal.jsx`
- `src/components/WaitlistSection.jsx`

## Recommended path (no login): webhook

Set in local env and deployment env:

- `VITE_WAITLIST_WEBHOOK_URL=https://your-endpoint.example.com/waitlist`

Payload sent by frontend:

- `email`
- `university` (optional)
- `source` (`finch_waitlist`)
- `createdAt` (ISO string)

Webhook should return `2xx` on success. Optional JSON response:

- `{ "emailSent": true }`

## Base44 fallback path (optional)

If you do not set `VITE_WAITLIST_WEBHOOK_URL`, configure Base44:

1) Create backend function `sendWaitlistConfirmationEmail`

- Paste code from `docs/base44/sendWaitlistConfirmationEmail.ts`

2) Set Base44 env vars:

- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `WAITLIST_REPLY_TO` (optional)

3) Publish Base44 changes

## Test

- Submit a new email from either signup form.
- Confirm webhook receives request and email is sent.
