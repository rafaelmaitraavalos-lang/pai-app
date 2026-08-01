# Rafa — please do these before you leave Monday (15 minutes, no code)

Everything is in your Groq account (console.groq.com) — nobody else can see
or change these settings, which is why this needs you.

## 1. Confirm the spend cap (2 min)
Sonali says you already set the ~$50/month cap — please confirm and reply
with a screenshot: **console.groq.com → Settings → Billing / Spend Limits**.
The screenshot is so we have the number on record, not because we doubt you.

## 2. CRITICAL — confirm the account is on the paid "Developer" tier (5 min)
Groq's **free** tier allows only **1,000 requests per day** (and 30/minute)
for `llama-3.3-70b-versatile`. Every student question uses TWO requests (a
scope check + the answer). With 5,000 kids, a free-tier account dies in the
first classroom hour and every kid after that gets an error.

Check: **console.groq.com → Settings → Limits** — it shows the exact
requests-per-minute and per-day for your org.
- If it says anything like 1K requests/day for the 70b model, you are on the
  free tier: add a payment method to move to Developer tier (that's also
  what makes the spend cap meaningful).
- Reply with a screenshot of the Limits page — that answers the old
  "why did 37 of 56 requests fail" question definitively too.

For scale: at Groq's current 70b pricing, even 25,000 questions/day costs
roughly $20–25/month — comfortably inside the $50 cap.

## 3. Nothing else needs you
- Deploys, env vars, database: all working, verified today (2026-08-01).
- The Portuguese language/grade bugs Sonali found are fixed and verified on
  paiforkids.com with a new automated suite (39/39) plus the full journey
  matrix (first ever 11/11 runs, English AND Portuguese).
- One content item waits for your OK (no rush, after camp is fine):
  `PAI-suggested-connections-puzzle.md` — kid-level replacement for the
  graduate-level Connections puzzle, EN + PT.

Have a great camp. — Sonali & Claude
